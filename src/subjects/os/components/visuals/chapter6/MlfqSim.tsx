import { useMemo, useState } from 'react'
import type { LText } from '../../../types'
import { BilingualProse } from '../../ui/Text'
import { cn } from '../../../lib/cn'
import { StepControls, VisualFrame } from '../VisualFrame'
import { procTone } from './gantt'

/** The lecture's three-queue example. */
const LEVELS = [
  { name: 'Q0', rule: 'RR · quantum 8', quantum: 8 },
  { name: 'Q1', rule: 'RR · quantum 16', quantum: 16 },
  { name: 'Q2', rule: 'FCFS', quantum: Infinity },
] as const

const JOBS = ['A', 'B', 'C']
const PRESETS: Array<{ label: string; bursts: number[] }> = [
  { label: 'Short, medium, long', bursts: [5, 20, 40] },
  { label: 'All short', bursts: [3, 6, 8] },
  { label: 'All long', bursts: [30, 26, 34] },
]

interface Run {
  job: number
  level: number
  start: number
  end: number
  remainingAfter: number
}

/** All jobs arrive at time 0 in Q0; a lower queue runs only when every higher queue is empty. */
export function runMlfq(bursts: number[]): Run[] {
  const queues: number[][] = [bursts.map((_, index) => index), [], []]
  const remaining = [...bursts]
  const runs: Run[] = []
  let time = 0
  while (queues.some((queue) => queue.length)) {
    const level = queues.findIndex((queue) => queue.length)
    const job = queues[level].shift()!
    const slice = Math.min(LEVELS[level].quantum, remaining[job])
    remaining[job] -= slice
    runs.push({ job, level, start: time, end: time + slice, remainingAfter: remaining[job] })
    time += slice
    if (remaining[job] > 0) queues[Math.min(level + 1, 2)].push(job)
  }
  return runs
}

export function MlfqSimVisual({ title, hint }: { title: LText; hint?: LText }) {
  const [bursts, setBursts] = useState(PRESETS[0].bursts)
  const [step, setStep] = useState(0)
  const runs = useMemo(() => runMlfq(bursts), [bursts])
  const current = runs[Math.min(step, runs.length - 1)]
  const done = runs.slice(0, step + 1)
  const end = runs[runs.length - 1].end

  // Where every job sits after the current run.
  const position = JOBS.map((_, job) => {
    const mine = done.filter((run) => run.job === job)
    const last = mine[mine.length - 1]
    if (!last) return { level: 0, finished: false }
    if (last.remainingAfter === 0) return { level: last.level, finished: true }
    return { level: Math.min(last.level + 1, 2), finished: false }
  })

  const note: LText =
    current.remainingAfter === 0
      ? {
          en: `Job ${JOBS[current.job]} runs ${current.end - current.start} ms in ${LEVELS[current.level].name} and **finishes** at t = ${current.end}.`,
          ar: `الـ Job ${JOBS[current.job]} اشتغلت ${current.end - current.start} ms في ${LEVELS[current.level].name} و**خلصت** عند t = ${current.end}.`,
        }
      : current.level < 2
        ? {
            en: `Job ${JOBS[current.job]} uses its whole quantum (${LEVELS[current.level].quantum} ms) in ${LEVELS[current.level].name} without finishing, so it is **moved down** to ${LEVELS[current.level + 1].name} (${current.remainingAfter} ms left).`,
            ar: `الـ Job ${JOBS[current.job]} استهلكت الـ quantum كله (${LEVELS[current.level].quantum} ms) في ${LEVELS[current.level].name} ومخلصتش، فـ**نزلت** لـ ${LEVELS[current.level + 1].name} (فاضل ${current.remainingAfter} ms).`,
          }
        : {
            en: `Job ${JOBS[current.job]} runs in Q2 (FCFS).`,
            ar: `الـ Job ${JOBS[current.job]} بتشتغل في Q2 (FCFS).`,
          }

  return (
    <VisualFrame title={title} hint={hint ?? { en: 'Choose the CPU needs of three jobs, then step through.' }}>
      <div className="flex flex-wrap items-center gap-2">
        {PRESETS.map((preset) => (
          <button
            key={preset.label}
            type="button"
            aria-pressed={preset.bursts.join() === bursts.join()}
            onClick={() => {
              setBursts(preset.bursts)
              setStep(0)
            }}
            className={cn(
              'rounded-lg border px-2.5 py-1.5 text-[0.8rem] font-semibold transition-all',
              preset.bursts.join() === bursts.join() ? 'border-cyan-neon bg-cyan-neon/15 text-mist-50' : 'border-line bg-ink-850 text-mist-300 hover:border-cyan-neon/50',
            )}
          >
            {preset.label}
          </button>
        ))}
        <div className="ms-auto flex items-center gap-2">
          {JOBS.map((name, index) => (
            <label key={name} className={cn('flex items-center gap-1 font-mono text-[0.8rem] font-bold', procTone(index).text)}>
              {name}
              <input
                type="number"
                min={1}
                max={60}
                value={bursts[index]}
                aria-label={`Job ${name} CPU time`}
                onChange={(event) => {
                  const value = Math.max(1, Math.min(60, Number(event.target.value) || 1))
                  setBursts((list) => list.map((b, i) => (i === index ? value : b)))
                  setStep(0)
                }}
                className="w-12 rounded-md border border-line bg-ink-950/60 px-1 py-0.5 text-center text-mist-50"
              />
            </label>
          ))}
        </div>
      </div>

      <div className="mt-4 space-y-2">
        {LEVELS.map((level, index) => {
          const here = JOBS.map((_, job) => job).filter((job) => !position[job].finished && position[job].level === index && !(current.job === job && current.remainingAfter > 0 && current.level === index))
          const running = current.level === index
          return (
            <div key={level.name} className={cn('flex items-center gap-3 rounded-xl border px-3 py-2.5 transition-colors', running ? 'border-cyan-neon/70 bg-cyan-neon/[0.07]' : 'border-line bg-ink-850')}>
              <div className="w-32 flex-none">
                <p className="font-display text-[1rem] font-semibold text-mist-50">{level.name}</p>
                <p className="font-mono text-[0.68rem] text-mist-400">{level.rule}</p>
              </div>
              <div className="flex min-h-[2rem] flex-1 flex-wrap items-center gap-1.5">
                {here.map((job) => (
                  <span key={job} className={cn('rounded-md border px-2 py-0.5 font-mono text-[0.8rem] font-bold', procTone(job).bar, procTone(job).text)}>
                    {JOBS[job]}
                  </span>
                ))}
                {running ? (
                  <span className="ms-auto rounded-md border border-cyan-neon/60 px-2 py-0.5 font-mono text-[0.72rem] text-cyan-neon">
                    running {JOBS[current.job]}
                  </span>
                ) : null}
              </div>
              {index < 2 ? <span className="hidden font-mono text-[0.66rem] text-mist-500 sm:block">↓ unfinished</span> : null}
            </div>
          )
        })}
      </div>

      <div className="mt-4 overflow-x-auto pb-1">
        <div className="relative h-11 min-w-[24rem] rounded-lg border border-line bg-ink-950/50">
          {done.map((run, index) => (
            <div
              key={index}
              className={cn('absolute inset-y-0 flex flex-col items-center justify-center overflow-hidden border-x font-mono text-[0.7rem] font-bold leading-tight', procTone(run.job).bar, procTone(run.job).text)}
              style={{ left: `${(run.start / end) * 100}%`, width: `${((run.end - run.start) / end) * 100}%` }}
            >
              <span>{JOBS[run.job]}</span>
              <span className="text-[0.6rem] font-normal opacity-80">{LEVELS[run.level].name}</span>
            </div>
          ))}
        </div>
        <div className="relative mt-1 h-4 min-w-[24rem]">
          {[0, ...done.map((run) => run.end)].map((time) => (
            <span key={time} className={cn('absolute font-mono text-[0.66rem] text-mist-400', time === 0 ? '' : time === end ? '-translate-x-full' : '-translate-x-1/2')} style={{ left: `${(time / end) * 100}%` }}>
              {time}
            </span>
          ))}
        </div>
      </div>

      <StepControls step={Math.min(step, runs.length - 1)} total={runs.length} onPrev={() => setStep((s) => Math.max(0, s - 1))} onNext={() => setStep((s) => Math.min(runs.length - 1, s + 1))} onReset={() => setStep(0)} label="Run" />

      <div className="mt-3 rounded-xl border border-line bg-ink-850 p-3.5" aria-live="polite">
        <BilingualProse text={note} className="text-[0.92rem]" />
      </div>
    </VisualFrame>
  )
}
