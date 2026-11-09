import { useMemo, useState } from 'react'
import { Minus, Plus, RotateCcw, SkipForward, Trash2 } from 'lucide-react'
import type { LText } from '../../../types'
import {
  algorithmLabels,
  fmt,
  schedule,
  type Algorithm,
  type Decision,
  type ProcSpec,
  type RrTieRule,
  type Schedule,
} from '../../../lib/scheduling'
import { BilingualProse } from '../../ui/Text'
import { cn } from '../../../lib/cn'
import { StepControls, VisualFrame } from '../VisualFrame'
import { GanttChart, ResultsTable, procTone } from './gantt'

export interface LabPreset {
  id: string
  label: string
  /** Where the set comes from, e.g. "Lecture example" or "Final 2023 Q3". */
  source: string
  processes: ProcSpec[]
  algorithm: Algorithm
  quantum?: number
  rrTie?: RrTieRule
  /** Exam sets start with the answers hidden so students can try first. */
  exam?: boolean
}

const P = (id: string, arrival: number, burst: number, priority?: number): ProcSpec => ({ id, arrival, burst, priority })

const final2023Set = [P('P1', 0, 5, 2), P('P2', 1, 3, 1), P('P3', 2, 8, 4), P('P4', 3, 6, 3)]
const undatedBSet = [P('P1', 0, 10, 2), P('P2', 1, 29, 3), P('P3', 2, 3, 4), P('P4', 3, 7, 3), P('P5', 4, 12, 1)]

export const labPresets: Record<string, LabPreset> = {
  'fcfs-1': { id: 'fcfs-1', label: 'FCFS: P1, P2, P3', source: 'Lecture example', algorithm: 'fcfs', processes: [P('P1', 0, 24), P('P2', 0, 3), P('P3', 0, 3)] },
  'fcfs-2': { id: 'fcfs-2', label: 'FCFS: P2, P3, P1', source: 'Lecture example', algorithm: 'fcfs', processes: [P('P2', 0, 3), P('P3', 0, 3), P('P1', 0, 24)] },
  sjf: { id: 'sjf', label: 'SJF: 6, 8, 7, 3', source: 'Lecture example', algorithm: 'sjf', processes: [P('P1', 0, 6), P('P2', 0, 8), P('P3', 0, 7), P('P4', 0, 3)] },
  'sjf-arrivals': { id: 'sjf-arrivals', label: 'SJF with arrivals', source: 'Lecture example', algorithm: 'sjf', processes: [P('P1', 0, 7), P('P2', 2, 4), P('P3', 4, 1), P('P4', 5, 4)] },
  srtf: { id: 'srtf', label: 'SRTF with arrivals', source: 'Lecture example', algorithm: 'srtf', processes: [P('P1', 0, 7), P('P2', 2, 4), P('P3', 4, 1), P('P4', 5, 4)] },
  'srtf-2': { id: 'srtf-2', label: 'SRTF: 8, 4, 9, 5', source: 'Lecture example', algorithm: 'srtf', processes: [P('P1', 0, 8), P('P2', 1, 4), P('P3', 2, 9), P('P4', 3, 5)] },
  priority: {
    id: 'priority',
    label: 'Priority: five processes',
    source: 'Lecture example',
    algorithm: 'priority',
    processes: [P('P1', 0, 10, 3), P('P2', 0, 1, 1), P('P3', 0, 2, 4), P('P4', 0, 1, 5), P('P5', 0, 5, 2)],
  },
  'rr-4': { id: 'rr-4', label: 'RR q = 4: 24, 3, 3', source: 'Lecture example', algorithm: 'rr', quantum: 4, processes: [P('P1', 0, 24), P('P2', 0, 3), P('P3', 0, 3)] },
  'rr-20': { id: 'rr-20', label: 'RR q = 20: 53, 17, 68, 24', source: 'Lecture example', algorithm: 'rr', quantum: 20, processes: [P('P1', 0, 53), P('P2', 0, 17), P('P3', 0, 68), P('P4', 0, 24)] },
  deterministic: {
    id: 'deterministic',
    label: 'Deterministic model: 10, 29, 3, 7, 12',
    source: 'Lecture example',
    algorithm: 'fcfs',
    quantum: 10,
    processes: [P('P1', 0, 10), P('P2', 0, 29), P('P3', 0, 3), P('P4', 0, 7), P('P5', 0, 12)],
  },
  'f23-fcfs': { id: 'f23-fcfs', label: 'Final 2023 Q3 set', source: 'Final 2023 / Undated A · Q3.61–Q3.64', algorithm: 'fcfs', quantum: 2, processes: final2023Set, exam: true },
  'f24-rr': {
    id: 'f24-rr',
    label: 'Final 2024 Q2.3a (RR q = 3)',
    source: 'Final 2024 · Q2.3a',
    algorithm: 'rr',
    quantum: 3,
    processes: [P('P1', 0, 6), P('P2', 1, 3), P('P3', 2, 8), P('P4', 3, 4)],
    exam: true,
  },
  'f20-rr': {
    id: 'f20-rr',
    label: 'Final 2020 Q3.63–66 (RR q = 2)',
    source: 'Final 2020 · Q3.63–Q3.66',
    algorithm: 'rr',
    quantum: 2,
    rrTie: 'preempted-first',
    processes: [P('P1', 0, 6), P('P2', 2, 8), P('P3', 5, 7), P('P4', 7, 3)],
    exam: true,
  },
  'undated-b': { id: 'undated-b', label: 'Undated B Q6 (five processes)', source: 'Undated scan B · Q6', algorithm: 'fcfs', quantum: 3, processes: undatedBSet, exam: true },
}

const MAX_PROCS = 6

interface LabState {
  processes: ProcSpec[]
  algorithm: Algorithm
  quantum: number
  rrTie: RrTieRule
}

const fresh = (preset: LabPreset): LabState => ({
  processes: preset.processes.map((process) => ({ ...process, priority: process.priority ?? 1 })),
  algorithm: preset.algorithm,
  quantum: preset.quantum ?? 4,
  rrTie: preset.rrTie ?? 'arrival-first',
})

function explain(decision: Decision, algorithm: Algorithm, quantum: number): LText {
  const t = `t = ${decision.time}`
  if (decision.cause === 'idle' || !decision.chosen) {
    return { en: `${t} · Nothing has arrived yet, so the CPU is **idle** until the next arrival.`, ar: `${t} · مفيش process وصلت لسه، فالـ CPU **فاضي (idle)** لحد أول وصول.` }
  }
  const chosen = decision.chosen
  const prev = decision.previous
  const why: Record<string, LText> = {
    start: { en: 'The CPU is free.', ar: 'الـ CPU فاضي.' },
    complete: { en: `${prev ?? 'The running process'} has **finished**.`, ar: `${prev ?? 'الـ process الشغالة'} **خلصت**.` },
    quantum: { en: `${prev}'s quantum (${quantum}) **expired** — it goes to the **tail** of the ready queue.`, ar: `الـ quantum بتاع ${prev} (${quantum}) **خلص** — فبيروح **آخر** الـ ready queue.` },
    arrival: prev
      ? { en: `A new process arrived while ${prev} was running.`, ar: `process جديدة وصلت و${prev} شغالة.` }
      : { en: 'A process arrived.', ar: 'process وصلت.' },
  }
  const reason = why[decision.cause] ?? why.start
  const listing = decision.ready
    .map((entry) =>
      algorithm === 'priority' || algorithm === 'priority-p'
        ? `${entry.id} (pri ${entry.priority})`
        : algorithm === 'fcfs' || algorithm === 'rr'
          ? entry.id
          : `${entry.id} (${entry.remaining})`,
    )
    .join(algorithm === 'rr' ? ' → ' : ', ')
  const queueLabel = algorithm === 'rr' ? 'Ready queue (head → tail)' : 'Ready'
  const queueLabelAr = algorithm === 'rr' ? 'الـ Ready queue (من الأول للآخر)' : 'الجاهزين'
  const rule: Record<Algorithm, LText> = {
    fcfs: { en: `**${chosen}** came first, so it runs to completion.`, ar: `**${chosen}** وصلت الأول، فبتشتغل لحد ما تخلص.` },
    sjf: { en: `**${chosen}** has the shortest next CPU burst; nonpreemptive, so it keeps the CPU until it finishes.`, ar: `**${chosen}** عندها أقصر CPU burst؛ ومفيش preemption، فبتفضل ماسكة الـ CPU لحد ما تخلص.` },
    srtf: prev && decision.cause === 'arrival'
      ? { en: `**${chosen}** needs less than ${prev}'s remaining time, so it **preempts** ${prev}.`, ar: `**${chosen}** محتاجة وقت أقل من الباقي لـ ${prev}، فبتعمل **preempt** لـ ${prev}.` }
      : { en: `**${chosen}** has the shortest remaining time.`, ar: `**${chosen}** الباقي ليها أقل وقت.` },
    priority: { en: `**${chosen}** has the highest priority (smallest number); it runs to completion.`, ar: `**${chosen}** أولويتها الأعلى (أصغر رقم)؛ وبتشتغل لحد ما تخلص.` },
    'priority-p': prev && decision.cause === 'arrival'
      ? { en: `**${chosen}** has a higher priority than ${prev}, so it **preempts** it.`, ar: `**${chosen}** أولويتها أعلى من ${prev}، فبتعمل لها **preempt**.` }
      : { en: `**${chosen}** has the highest priority (smallest number).`, ar: `**${chosen}** أولويتها الأعلى (أصغر رقم).` },
    rr: { en: `**${chosen}** is at the head of the queue and gets up to **${quantum}** time units.`, ar: `**${chosen}** في أول الـ queue وبتاخد لحد **${quantum}** وحدة زمن.` },
  }
  return {
    en: `${t} · ${reason.en} ${queueLabel}: ${listing}. ${rule[algorithm].en}`,
    ar: `${t} · ${reason.ar} ${queueLabelAr}: ${listing}. ${rule[algorithm].ar}`,
  }
}

function NumberField({ value, onChange, label, min = 0 }: { value: number; onChange: (value: number) => void; label: string; min?: number }) {
  return (
    <input
      type="number"
      inputMode="numeric"
      min={min}
      max={99}
      value={value}
      aria-label={label}
      onChange={(event) => {
        const next = Math.floor(Number(event.target.value))
        if (Number.isFinite(next)) onChange(Math.min(99, Math.max(min, next)))
      }}
      className="w-14 rounded-md border border-line bg-ink-950/60 px-1.5 py-1 text-center font-mono text-[0.84rem] text-mist-50 focus:border-cyan-neon focus:outline-none"
    />
  )
}

function CompareTable({ processes, quantum, rrTie }: { processes: ProcSpec[]; quantum: number; rrTie: RrTieRule }) {
  const rows = (['fcfs', 'sjf', 'srtf', 'priority', 'rr'] as Algorithm[]).map((algorithm) => ({
    algorithm,
    result: schedule(processes, algorithm, { quantum, rrTie }),
  }))
  const bestWait = Math.min(...rows.map((row) => row.result.avgWaiting))
  const bestTat = Math.min(...rows.map((row) => row.result.avgTurnaround))
  const maxWait = Math.max(...rows.map((row) => row.result.avgWaiting)) || 1
  return (
    <div className="overflow-x-auto rounded-xl border border-line">
      <table className="w-full min-w-[28rem] border-collapse text-left text-[0.86rem]">
        <thead>
          <tr className="border-b border-line bg-ink-800/80 font-mono text-[0.68rem] uppercase tracking-[0.08em] text-mist-300">
            <th scope="col" className="px-3 py-2.5">Algorithm</th>
            <th scope="col" className="px-3 py-2.5">Avg waiting</th>
            <th scope="col" className="px-3 py-2.5">Avg turnaround</th>
            <th scope="col" className="hidden px-3 py-2.5 sm:table-cell">Waiting, relative</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(({ algorithm, result }) => (
            <tr key={algorithm} className="border-b border-line-soft/60 odd:bg-ink-950/30">
              <th scope="row" className="px-3 py-2 font-medium text-mist-100">
                {algorithm === 'rr' ? `RR (q = ${quantum})` : algorithmLabels[algorithm]}
              </th>
              <td className={cn('px-3 py-2 font-mono', result.avgWaiting === bestWait ? 'font-bold text-teal-neon' : 'text-mist-200')}>
                {fmt(result.avgWaiting)}
                {result.avgWaiting === bestWait ? ' ★' : ''}
              </td>
              <td className={cn('px-3 py-2 font-mono', result.avgTurnaround === bestTat ? 'font-bold text-teal-neon' : 'text-mist-200')}>
                {fmt(result.avgTurnaround)}
                {result.avgTurnaround === bestTat ? ' ★' : ''}
              </td>
              <td className="hidden px-3 py-2 sm:table-cell">
                <span className="block h-2 rounded-full bg-cyan-neon/70" style={{ width: `${(result.avgWaiting / maxWait) * 100}%` }} aria-hidden="true" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/**
 * The scheduling lab: pick or edit a process set, choose an algorithm, then step
 * through every scheduling decision with its reason, while the Gantt chart and the
 * turnaround/waiting table fill in.
 */
export function SchedulingLab({
  title,
  hint,
  algorithms,
  presets,
  initial,
  allowCompare = false,
}: {
  title: LText
  hint?: LText
  algorithms: Algorithm[]
  presets: string[]
  initial: string
  allowCompare?: boolean
}) {
  const [presetId, setPresetId] = useState(initial)
  const preset = labPresets[presetId]
  const [state, setState] = useState<LabState>(() => fresh(preset))
  const [step, setStep] = useState(0)

  const algorithm = algorithms.includes(state.algorithm) ? state.algorithm : algorithms[0]
  const usesPriority = algorithm === 'priority' || algorithm === 'priority-p'
  const [compare, setCompare] = useState(false)
  const editPriority = usesPriority || compare
  const showArrival = state.processes.some((process) => process.arrival !== 0) || presetId === 'custom'
  const result: Schedule = useMemo(
    () => schedule(state.processes, algorithm, { quantum: state.quantum, rrTie: state.rrTie }),
    [state, algorithm],
  )
  const order = state.processes.map((process) => process.id)
  const decisions = result.decisions
  const current = Math.min(step, decisions.length - 1)
  const decision = decisions[current]
  const nextDecision = decisions[current + 1]
  const upTo = nextDecision ? nextDecision.time : undefined
  const finishedBy = nextDecision ? nextDecision.time : undefined
  const runningSlice = result.slices.findIndex((slice) => slice.start === decision?.time && slice.pid === decision?.chosen)

  const choosePreset = (id: string) => {
    const next = labPresets[id]
    setPresetId(id)
    setState(fresh(next))
    setStep(0)
  }
  const edit = (index: number, field: 'arrival' | 'burst' | 'priority', value: number) => {
    setPresetId('custom')
    setState((prev) => ({ ...prev, processes: prev.processes.map((process, i) => (i === index ? { ...process, [field]: value } : process)) }))
    setStep(0)
  }
  const addProcess = () => {
    setPresetId('custom')
    setState((prev) => {
      const used = new Set(prev.processes.map((process) => process.id))
      let n = 1
      while (used.has(`P${n}`)) n += 1
      const last = prev.processes[prev.processes.length - 1]
      return { ...prev, processes: [...prev.processes, P(`P${n}`, last ? last.arrival + 1 : 0, 3, 1)] }
    })
    setStep(0)
  }
  const removeProcess = (index: number) => {
    setPresetId('custom')
    setState((prev) => ({ ...prev, processes: prev.processes.filter((_, i) => i !== index) }))
    setStep(0)
  }

  const presetGroups = [
    { label: 'Lecture examples', ids: presets.filter((id) => !labPresets[id].exam) },
    { label: 'Past-exam sets', ids: presets.filter((id) => labPresets[id].exam) },
  ].filter((group) => group.ids.length)

  return (
    <VisualFrame title={title} hint={hint ?? { en: 'Pick a set and an algorithm, then press Next to see each decision.' }}>
      <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
        <div className="space-y-3">
          <div>
            <label htmlFor={`${initial}-preset`} className="font-mono text-[0.66rem] uppercase tracking-[0.14em] text-mist-500">
              Process set
            </label>
            <select
              id={`${initial}-preset`}
              value={presetId}
              onChange={(event) => choosePreset(event.target.value)}
              className="field mt-1 !py-2 text-[0.9rem]"
            >
              {presetGroups.map((group) => (
                <optgroup key={group.label} label={group.label}>
                  {group.ids.map((id) => (
                    <option key={id} value={id}>
                      {labPresets[id].label}
                    </option>
                  ))}
                </optgroup>
              ))}
              {presetId === 'custom' ? <option value="custom">Your own set</option> : null}
            </select>
            {presetId !== 'custom' ? <p className="mt-1 text-[0.74rem] text-mist-500">{preset.source}</p> : null}
          </div>

          <div className="overflow-x-auto rounded-xl border border-line bg-ink-950/40">
            <table className="w-full border-collapse text-[0.82rem]">
              <thead>
                <tr className="font-mono text-[0.64rem] uppercase tracking-[0.1em] text-mist-500">
                  <th scope="col" className="px-2 py-1.5 text-left">Process</th>
                  <th scope="col" className="px-1 py-1.5">Arrival</th>
                  <th scope="col" className="px-1 py-1.5">Burst</th>
                  {editPriority ? <th scope="col" className="px-1 py-1.5">Priority</th> : null}
                  <th scope="col" className="px-1 py-1.5"><span className="sr-only">Remove</span></th>
                </tr>
              </thead>
              <tbody>
                {state.processes.map((process, index) => (
                  <tr key={process.id} className="border-t border-line-soft/60">
                    <th scope="row" className={cn('px-2 py-1 text-left font-mono font-bold', procTone(index).text)}>{process.id}</th>
                    <td className="px-1 py-1 text-center">
                      <NumberField value={process.arrival} label={`${process.id} arrival time`} onChange={(value) => edit(index, 'arrival', value)} />
                    </td>
                    <td className="px-1 py-1 text-center">
                      <NumberField value={process.burst} min={1} label={`${process.id} burst time`} onChange={(value) => edit(index, 'burst', value)} />
                    </td>
                    {editPriority ? (
                      <td className="px-1 py-1 text-center">
                        <NumberField value={process.priority ?? 1} label={`${process.id} priority`} onChange={(value) => edit(index, 'priority', value)} />
                      </td>
                    ) : null}
                    <td className="px-1 py-1 text-center">
                      <button
                        type="button"
                        className="rounded-md p-1 text-mist-500 hover:text-rose-neon disabled:opacity-30"
                        onClick={() => removeProcess(index)}
                        disabled={state.processes.length <= 1}
                        aria-label={`Remove ${process.id}`}
                      >
                        <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              type="button"
              className="flex w-full items-center justify-center gap-1 border-t border-line-soft py-1.5 text-[0.78rem] text-mist-400 hover:text-cyan-neon disabled:opacity-40"
              onClick={addProcess}
              disabled={state.processes.length >= MAX_PROCS}
            >
              <Plus className="h-3.5 w-3.5" aria-hidden="true" /> Add process
            </button>
          </div>
          {editPriority ? <p className="text-[0.74rem] text-mist-500">Smaller priority number = higher priority.</p> : null}
        </div>

        <div className="space-y-3">
          <div role="radiogroup" aria-label="Algorithm" className="flex flex-wrap gap-1.5">
            {algorithms.map((entry) => (
              <button
                key={entry}
                type="button"
                role="radio"
                aria-checked={entry === algorithm}
                onClick={() => {
                  setState((prev) => ({ ...prev, algorithm: entry }))
                  setStep(0)
                  setCompare(false)
                }}
                className={cn(
                  'rounded-lg border px-2.5 py-1.5 text-[0.8rem] font-semibold transition-all',
                  entry === algorithm && !compare ? 'border-cyan-neon bg-cyan-neon/15 text-mist-50' : 'border-line bg-ink-850 text-mist-300 hover:border-cyan-neon/50',
                )}
              >
                {algorithmLabels[entry]}
              </button>
            ))}
            {allowCompare ? (
              <button
                type="button"
                aria-pressed={compare}
                onClick={() => setCompare((value) => !value)}
                className={cn(
                  'rounded-lg border px-2.5 py-1.5 text-[0.8rem] font-semibold transition-all',
                  compare ? 'border-amber-neon bg-amber-neon/15 text-mist-50' : 'border-dashed border-amber-neon/50 bg-ink-850 text-amber-neon hover:bg-amber-neon/10',
                )}
              >
                Compare all
              </button>
            ) : null}
          </div>

          {algorithm === 'rr' || compare ? (
            <div className="flex flex-wrap items-center gap-3 rounded-xl border border-line bg-ink-850 px-3 py-2">
              <span className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-mist-500">Quantum q</span>
              <div className="flex items-center gap-1">
                <button type="button" className="icon-btn !h-7 !w-7" aria-label="Smaller quantum" onClick={() => { setState((prev) => ({ ...prev, quantum: Math.max(1, prev.quantum - 1) })); setStep(0) }}>
                  <Minus className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
                <span className="w-8 text-center font-display text-[1.2rem] font-bold text-mist-50" aria-live="polite">{state.quantum}</span>
                <button type="button" className="icon-btn !h-7 !w-7" aria-label="Larger quantum" onClick={() => { setState((prev) => ({ ...prev, quantum: Math.min(40, prev.quantum + 1) })); setStep(0) }}>
                  <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              </div>
              <label className="flex items-center gap-1.5 text-[0.76rem] text-mist-400">
                <span>Tie at the same instant:</span>
                <select
                  value={state.rrTie}
                  onChange={(event) => { setState((prev) => ({ ...prev, rrTie: event.target.value as RrTieRule })); setStep(0) }}
                  className="rounded-md border border-line bg-ink-950/60 px-1.5 py-0.5 text-[0.76rem] text-mist-100"
                >
                  <option value="arrival-first">new arrival first</option>
                  <option value="preempted-first">preempted process first</option>
                </select>
              </label>
            </div>
          ) : null}

          {compare ? (
            <>
              <CompareTable processes={state.processes} quantum={state.quantum} rrTie={state.rrTie} />
              <BilingualProse
                className="text-[0.86rem]"
                text={{
                  en: 'This is **deterministic modeling**: one fixed workload, every algorithm computed exactly. ★ marks the minimum. SJF gives the minimum average waiting time for a set that arrives together; with arrivals, preemptive SJF (SRTF) usually wins.',
                  ar: 'ده **deterministic modeling**: workload واحدة ثابتة، وكل algorithm بتتحسب بالظبط. النجمة ★ على الأقل. الـ SJF بيدّي أقل متوسط waiting time لو الكل وصل مع بعض؛ ولو فيه arrival times، الـ SJF الـ preemptive (SRTF) غالبًا هو الأحسن.',
                }}
              />
            </>
          ) : (
            <div className="rounded-xl border border-line bg-ink-850 p-3" aria-live="polite">
              {decision ? <BilingualProse text={explain(decision, algorithm, state.quantum)} className="text-[0.88rem]" /> : null}
              {!nextDecision ? (
                <p className="mt-2 text-[0.8rem] font-semibold text-teal-neon">All processes finished at t = {result.makespan}.</p>
              ) : null}
            </div>
          )}
        </div>
      </div>

      {!compare ? (
        <div className="mt-4 space-y-3">
          <GanttChart slices={result.slices} order={order} upTo={upTo} highlight={runningSlice} label={algorithmLabels[algorithm]} />
          <StepControls
            step={current}
            total={decisions.length}
            onPrev={() => setStep(Math.max(0, current - 1))}
            onNext={() => setStep(Math.min(decisions.length - 1, current + 1))}
            onReset={() => setStep(0)}
            label="Decision"
          />
          {nextDecision ? (
            <button type="button" className="btn btn-ghost btn-sm" onClick={() => setStep(Number.MAX_SAFE_INTEGER)}>
              <SkipForward className="h-3.5 w-3.5" aria-hidden="true" /> Show the full solution
            </button>
          ) : null}
          <ResultsTable schedule={result} showArrival={showArrival} showPriority={usesPriority} showResponse={algorithm === 'rr'} finishedBy={finishedBy} />
          {presetId !== 'custom' && preset.exam && step === 0 ? (
            <p className="text-[0.78rem] text-amber-neon">Exam set: solve it on paper first, then step through to check.</p>
          ) : null}
          <button type="button" className="btn btn-ghost btn-sm" onClick={() => choosePreset(presetId === 'custom' ? initial : presetId)}>
            <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" /> Reset the set
          </button>
        </div>
      ) : null}
    </VisualFrame>
  )
}

const lessonTwoPresets = ['fcfs-1', 'fcfs-2', 'sjf', 'sjf-arrivals', 'srtf', 'srtf-2', 'f23-fcfs']
const lessonThreePresets = ['priority', 'rr-4', 'rr-20', 'f23-fcfs', 'f24-rr', 'f20-rr']
const allPresets = ['deterministic', 'fcfs-1', 'sjf-arrivals', 'srtf', 'priority', 'rr-4', 'rr-20', 'f23-fcfs', 'f24-rr', 'f20-rr', 'undated-b']

export function GanttFcfsSjfVisual({ title, hint }: { title: LText; hint?: LText }) {
  return <SchedulingLab title={title} hint={hint} algorithms={['fcfs', 'sjf', 'srtf']} presets={lessonTwoPresets} initial="fcfs-1" />
}

export function GanttPriorityRrVisual({ title, hint }: { title: LText; hint?: LText }) {
  return <SchedulingLab title={title} hint={hint} algorithms={['priority', 'priority-p', 'rr']} presets={lessonThreePresets} initial="rr-4" />
}

export function SchedulingLabVisual({ title, hint }: { title: LText; hint?: LText }) {
  return (
    <SchedulingLab
      title={title}
      hint={hint}
      algorithms={['fcfs', 'sjf', 'srtf', 'priority', 'priority-p', 'rr']}
      presets={allPresets}
      initial="deterministic"
      allowCompare
    />
  )
}
