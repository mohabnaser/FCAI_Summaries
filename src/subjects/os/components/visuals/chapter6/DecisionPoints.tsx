import { useState } from 'react'
import type { LText } from '../../../types'
import { BilingualProse } from '../../ui/Text'
import { cn } from '../../../lib/cn'
import { VisualFrame } from '../VisualFrame'

type State = 'new' | 'ready' | 'running' | 'waiting' | 'terminated'
type Mode = 'nonpreemptive' | 'preemptive'

const nodes: Record<State, { x: number; y: number }> = {
  new: { x: 80, y: 48 },
  terminated: { x: 520, y: 48 },
  ready: { x: 175, y: 150 },
  running: { x: 425, y: 150 },
  waiting: { x: 300, y: 256 },
}

interface Point {
  n: 1 | 2 | 3 | 4
  from: State
  to: State
  label: string
  path: string
  badge: [number, number]
  kind: 'nonpreemptive' | 'preemptive'
  example: LText
  why: LText
}

/** The four circumstances in which a CPU-scheduling decision may take place. */
const points: Point[] = [
  {
    n: 1,
    from: 'running',
    to: 'waiting',
    label: 'I/O or event wait',
    path: 'M 430 175 L 352 238',
    badge: [418, 214],
    kind: 'nonpreemptive',
    example: { en: 'It requests I/O, or calls wait() for a child to terminate.', ar: 'بتطلب I/O، أو بتنادي wait() عشان تستنى child يخلص.' },
    why: {
      en: 'The running process gives the CPU up **by itself**, so the CPU is free and the scheduler **must** choose a new process. No process is forced off the CPU: a **nonpreemptive** decision point.',
      ar: 'الـ process الشغالة سابت الـ CPU **بنفسها**، فالـ CPU فضي والـ scheduler **لازم** يختار process جديدة. محدش اتشال غصب عنه من على الـ CPU: ده decision point **nonpreemptive**.',
    },
  },
  {
    n: 2,
    from: 'running',
    to: 'ready',
    label: 'interrupt',
    path: 'M 362 164 Q 300 190 238 164',
    badge: [300, 200],
    kind: 'preemptive',
    example: { en: 'A timer interrupt: its time quantum expired.', ar: 'Timer interrupt: الـ time quantum بتاعها خلص.' },
    why: {
      en: 'The process **could keep running**, but the OS takes the CPU away from it and sends it back to the ready queue. Taking the CPU from a runnable process is **preemption**.',
      ar: 'الـ process **كانت تقدر تكمّل**، بس الـ OS سحب منها الـ CPU ورجّعها الـ ready queue. إنك تاخد الـ CPU من process لسه تقدر تشتغل = **preemption**.',
    },
  },
  {
    n: 3,
    from: 'waiting',
    to: 'ready',
    label: 'I/O or event completion',
    path: 'M 248 238 L 170 175',
    badge: [182, 214],
    kind: 'preemptive',
    example: { en: 'Its I/O completed — and it may be more urgent than the running process.', ar: 'الـ I/O بتاعها خلص — وممكن تكون أهم من الـ process الشغالة دلوقتي.' },
    why: {
      en: 'A process becomes ready while another is running. A preemptive scheduler **may** decide the newcomer is better (shorter, higher priority) and preempt the running one — exactly what SRTF and preemptive priority do on an arrival.',
      ar: 'process بقت ready وفيه process تانية شغالة. الـ scheduler الـ preemptive **ممكن** يقرر إن الجديدة أحسن (أقصر أو أولويتها أعلى) ويعمل preempt للشغالة — وده بالظبط اللي SRTF والـ priority الـ preemptive بيعملوه لما process توصل.',
    },
  },
  {
    n: 4,
    from: 'running',
    to: 'terminated',
    label: 'exit',
    path: 'M 452 126 L 492 72',
    badge: [500, 104],
    kind: 'nonpreemptive',
    example: { en: 'It executed its last statement.', ar: 'نفّذت آخر سطر فيها.' },
    why: {
      en: 'The process is gone, so the CPU is free and the scheduler **must** pick the next process. Nothing is preempted: a **nonpreemptive** decision point.',
      ar: 'الـ process خلصت، فالـ CPU فضي والـ scheduler **لازم** يختار اللي بعدها. محدش اتعمله preempt: decision point **nonpreemptive**.',
    },
  },
]

const otherEdges = [
  { label: 'admitted', path: 'M 112 70 L 148 126', at: [96, 104] as [number, number] },
  { label: 'scheduler dispatch', path: 'M 238 136 Q 300 104 362 136', at: [300, 104] as [number, number] },
]

export function DecisionPointsVisual({ title, hint }: { title: LText; hint?: LText }) {
  const [selected, setSelected] = useState<Point['n']>(1)
  const [mode, setMode] = useState<Mode>('nonpreemptive')
  const point = points.find((entry) => entry.n === selected)!
  /** A nonpreemptive scheduler runs only when the CPU becomes free (1 and 4). */
  const active = (entry: Point) => mode === 'preemptive' || entry.kind === 'nonpreemptive'

  return (
    <VisualFrame title={title} hint={hint ?? { en: 'Pick a scheduler type, then click a numbered transition.' }}>
      <div className="grid gap-2 sm:grid-cols-2" role="radiogroup" aria-label="Scheduler type">
        {(['nonpreemptive', 'preemptive'] as Mode[]).map((entry) => (
          <button
            key={entry}
            type="button"
            role="radio"
            aria-checked={entry === mode}
            onClick={() => setMode(entry)}
            className={cn(
              'rounded-xl border px-3 py-2 text-left text-[0.84rem] transition-all',
              entry === mode ? 'border-cyan-neon bg-cyan-neon/12 text-mist-50' : 'border-line bg-ink-850 text-mist-300 hover:border-cyan-neon/50',
            )}
          >
            <span className="font-semibold capitalize">{entry} scheduler</span>
            <span className="block text-[0.76rem] text-mist-400">
              {entry === 'nonpreemptive' ? 'Decides only at 1 and 4 (also called cooperative)' : 'Decides at 1, 2, 3 and 4'}
            </span>
          </button>
        ))}
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1fr)_17rem] lg:items-start">
        <svg viewBox="0 10 600 280" className="mx-auto w-full max-w-[40rem] select-none" role="group" aria-label="Process state diagram with the four scheduling decision points">
          <defs>
            <marker id="dp-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" style={{ fill: 'var(--color-mist-500)' }} />
            </marker>
            <marker id="dp-arrow-on" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" style={{ fill: 'var(--color-cyan-neon)' }} />
            </marker>
            <marker id="dp-arrow-pre" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" style={{ fill: 'var(--color-amber-neon)' }} />
            </marker>
          </defs>
          {otherEdges.map((edge) => (
            <g key={edge.label}>
              <path d={edge.path} fill="none" strokeWidth={1.5} markerEnd="url(#dp-arrow)" style={{ stroke: 'var(--color-line)' }} />
              <text x={edge.at[0]} y={edge.at[1]} textAnchor="middle" fontSize="12" fontFamily="var(--font-mono)" style={{ fill: 'var(--color-mist-500)' }}>
                {edge.label}
              </text>
            </g>
          ))}
          {points.map((entry) => {
            const on = entry.n === selected
            const live = active(entry)
            const color = !live ? 'var(--color-line)' : entry.kind === 'preemptive' ? 'var(--color-amber-neon)' : 'var(--color-cyan-neon)'
            return (
              <g
                key={entry.n}
                role="button"
                tabIndex={0}
                aria-label={`Decision point ${entry.n}: ${entry.from} to ${entry.to}`}
                aria-pressed={on}
                onClick={() => setSelected(entry.n)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault()
                    setSelected(entry.n)
                  }
                }}
                style={{ cursor: 'pointer', outline: 'none' }}
              >
                <path d={entry.path} fill="none" stroke="transparent" strokeWidth={24} pointerEvents="stroke" />
                <path
                  d={entry.path}
                  fill="none"
                  strokeWidth={on ? 3.4 : 2.2}
                  strokeDasharray={live ? undefined : '5 5'}
                  markerEnd={`url(#${!live ? 'dp-arrow' : entry.kind === 'preemptive' ? 'dp-arrow-pre' : 'dp-arrow-on'})`}
                  style={{ stroke: color, transition: 'stroke 250ms ease' }}
                />
                <circle cx={entry.badge[0]} cy={entry.badge[1]} r={on ? 14 : 12} strokeWidth={2} style={{ fill: 'var(--color-ink-900)', stroke: color }} />
                <text x={entry.badge[0]} y={entry.badge[1] + 5} textAnchor="middle" fontSize="14" fontWeight={700} fontFamily="var(--font-mono)" style={{ fill: live ? 'var(--color-mist-50)' : 'var(--color-mist-600)' }}>
                  {entry.n}
                </text>
              </g>
            )
          })}
          {(Object.keys(nodes) as State[]).map((id) => {
            const node = nodes[id]
            const touched = id === point.from || id === point.to
            return (
              <g key={id}>
                <ellipse
                  cx={node.x}
                  cy={node.y}
                  rx={60}
                  ry={23}
                  strokeWidth={touched ? 2.6 : 1.5}
                  style={{
                    fill: touched ? 'color-mix(in srgb, var(--color-cyan-neon) 16%, var(--color-ink-900))' : 'var(--color-ink-900)',
                    stroke: touched ? 'var(--color-cyan-neon)' : 'var(--color-line)',
                  }}
                />
                <text x={node.x} y={node.y + 5} textAnchor="middle" fontSize="15" fontWeight={touched ? 700 : 500} fontFamily="var(--font-display)" style={{ fill: touched ? 'var(--color-mist-50)' : 'var(--color-mist-300)' }}>
                  {id}
                </text>
              </g>
            )
          })}
        </svg>

        <div className="space-y-2">
          <div className="grid grid-cols-2 gap-1.5" role="group" aria-label="Decision points">
            {points.map((entry) => (
              <button
                key={entry.n}
                type="button"
                aria-pressed={entry.n === selected}
                onClick={() => setSelected(entry.n)}
                className={cn(
                  'rounded-lg border px-2 py-1.5 text-left text-[0.74rem] transition-all',
                  entry.n === selected ? 'border-cyan-neon bg-cyan-neon/12 text-mist-50' : 'border-line bg-ink-850 text-mist-300 hover:border-cyan-neon/50',
                )}
              >
                <span className="font-mono font-bold">{entry.n}</span> · {entry.from} → {entry.to}
              </button>
            ))}
          </div>
          <div className={cn('rounded-xl border p-3', point.kind === 'preemptive' ? 'border-amber-neon/50 bg-amber-neon/[0.06]' : 'border-cyan-neon/40 bg-cyan-neon/[0.05]')}>
            <p className="font-mono text-[0.66rem] uppercase tracking-[0.14em] text-mist-500">Circumstance {point.n}</p>
            <p className={cn('mt-1 font-display text-[1.02rem] font-semibold', point.kind === 'preemptive' ? 'text-amber-neon' : 'text-cyan-neon')}>
              {point.kind === 'preemptive' ? 'Preemptive' : 'Nonpreemptive'}
            </p>
            <p className="mt-1 text-[0.8rem] text-mist-300">
              {active(point) ? 'This scheduler runs here.' : 'A nonpreemptive scheduler does nothing here: the running process keeps the CPU.'}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-3 space-y-2 rounded-xl border border-line bg-ink-850 p-3.5" aria-live="polite">
        <BilingualProse text={point.example} className="text-[0.88rem] text-mist-400" />
        <BilingualProse text={point.why} className="text-[0.92rem]" />
      </div>
    </VisualFrame>
  )
}
