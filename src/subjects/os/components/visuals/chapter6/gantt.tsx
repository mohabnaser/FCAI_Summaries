import type { ProcResult, Schedule, Slice } from '../../../lib/scheduling'
import { fmt } from '../../../lib/scheduling'
import { cn } from '../../../lib/cn'

/**
 * One colour per process, in listing order. Class names are spelled out so
 * Tailwind's scanner sees every one of them.
 */
const PROC_TONES = [
  { bar: 'bg-cyan-neon/25 border-cyan-neon/70', text: 'text-cyan-neon', dot: 'bg-cyan-neon' },
  { bar: 'bg-violet-neon/25 border-violet-neon/70', text: 'text-violet-neon', dot: 'bg-violet-neon' },
  { bar: 'bg-teal-neon/25 border-teal-neon/70', text: 'text-teal-neon', dot: 'bg-teal-neon' },
  { bar: 'bg-amber-neon/25 border-amber-neon/70', text: 'text-amber-neon', dot: 'bg-amber-neon' },
  { bar: 'bg-lime-neon/25 border-lime-neon/70', text: 'text-lime-neon', dot: 'bg-lime-neon' },
  { bar: 'bg-rose-neon/25 border-rose-neon/70', text: 'text-rose-neon', dot: 'bg-rose-neon' },
] as const

export function procTone(index: number) {
  return PROC_TONES[((index % PROC_TONES.length) + PROC_TONES.length) % PROC_TONES.length]
}

/**
 * A Gantt bar with the time of every boundary underneath. `upTo` hides slices that
 * start at or after that time (used by step-through views).
 */
export function GanttChart({
  slices,
  order,
  upTo,
  highlight,
  label = 'Gantt chart',
}: {
  slices: Slice[]
  /** Process IDs in listing order (decides the colour). */
  order: string[]
  upTo?: number
  highlight?: number
  label?: string
}) {
  const end = slices.length ? slices[slices.length - 1].end : 0
  if (!end) return null
  const shown = upTo === undefined ? slices : slices.filter((slice) => slice.start < upTo)
  const boundaries = [0, ...shown.map((slice) => slice.end)]
  const pct = (time: number) => `${(time / end) * 100}%`
  // Wide enough that every 1-unit slice is still readable; scrolls on narrow screens.
  const minWidth = `${Math.max(18, Math.min(end * 1.6, 70))}rem`

  return (
    <div className="overflow-x-auto pb-1" role="img" aria-label={`${label}: ${shown.map((slice) => `${slice.pid ?? 'idle'} ${slice.start} to ${slice.end}`).join(', ')}`}>
      <div className="relative" style={{ minWidth }}>
        <div className="relative h-12 rounded-lg border border-line bg-ink-950/50">
          {shown.map((slice, index) => {
            const tone = slice.pid ? procTone(order.indexOf(slice.pid)) : null
            return (
              <div
                key={`${slice.start}-${index}`}
                className={cn(
                  'absolute inset-y-0 flex items-center justify-center overflow-hidden border-x font-mono text-[0.78rem] font-bold transition-[opacity,transform] duration-300',
                  tone ? cn(tone.bar, tone.text) : 'border-line bg-[repeating-linear-gradient(135deg,transparent_0_6px,rgba(255,255,255,0.06)_6px_8px)] text-mist-500',
                  highlight === index && 'ring-2 ring-inset ring-mist-50/70',
                )}
                style={{ left: pct(slice.start), width: pct(slice.end - slice.start) }}
              >
                <span className="truncate px-0.5">{slice.pid ?? 'idle'}</span>
              </div>
            )
          })}
        </div>
        <div className="relative mt-1 h-5">
          {[...new Set(boundaries)].map((time) => (
            <span
              key={time}
              className={cn(
                'absolute font-mono text-[0.7rem] text-mist-400',
                time === 0 ? '' : time === end ? '-translate-x-full' : '-translate-x-1/2',
              )}
              style={{ left: pct(time) }}
            >
              {time}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

/** "(0 + 24 + 27) / 3 = 17" */
export function averageExpression(values: number[]): string {
  const total = values.reduce((sum, value) => sum + value, 0)
  return `(${values.join(' + ')}) / ${values.length} = ${fmt(total / (values.length || 1))}`
}

/**
 * The worked table under a Gantt chart: finish, turnaround = finish − arrival and
 * waiting = turnaround − burst for every process, then both averages.
 * `finishedBy` hides results of processes that have not finished yet.
 */
export function ResultsTable({
  schedule,
  showArrival = true,
  showPriority = false,
  showResponse = false,
  finishedBy,
}: {
  schedule: Schedule
  showArrival?: boolean
  showPriority?: boolean
  showResponse?: boolean
  finishedBy?: number
}) {
  const visible = (result: ProcResult) => finishedBy === undefined || result.finish <= finishedBy
  const all = schedule.results.every(visible)
  const order = schedule.results.map((result) => result.id)
  return (
    <div className="overflow-x-auto rounded-xl border border-line">
      <table className="w-full min-w-[30rem] border-collapse text-left text-[0.86rem]">
        <thead>
          <tr className="border-b border-line bg-ink-800/80 font-mono text-[0.68rem] uppercase tracking-[0.08em] text-mist-300">
            <th scope="col" className="px-3 py-2.5">Process</th>
            {showArrival ? <th scope="col" className="px-3 py-2.5">Arrival</th> : null}
            <th scope="col" className="px-3 py-2.5">Burst</th>
            {showPriority ? <th scope="col" className="px-3 py-2.5">Priority</th> : null}
            <th scope="col" className="px-3 py-2.5">Finish</th>
            <th scope="col" className="px-3 py-2.5">
              Turnaround <span className="normal-case text-mist-500">= F − A</span>
            </th>
            <th scope="col" className="px-3 py-2.5">
              Waiting <span className="normal-case text-mist-500">= TAT − B</span>
            </th>
            {showResponse ? (
              <th scope="col" className="px-3 py-2.5">
                Response <span className="normal-case text-mist-500">= start − A</span>
              </th>
            ) : null}
          </tr>
        </thead>
        <tbody>
          {schedule.results.map((result) => {
            const tone = procTone(order.indexOf(result.id))
            const shown = visible(result)
            return (
              <tr key={result.id} className="border-b border-line-soft/60 odd:bg-ink-950/30">
                <th scope="row" className="px-3 py-2 font-mono font-bold">
                  <span className={cn('inline-flex items-center gap-1.5', tone.text)}>
                    <span className={cn('h-2 w-2 rounded-full', tone.dot)} aria-hidden="true" />
                    {result.id}
                  </span>
                </th>
                {showArrival ? <td className="px-3 py-2 font-mono text-mist-300">{result.arrival}</td> : null}
                <td className="px-3 py-2 font-mono text-mist-300">{result.burst}</td>
                {showPriority ? <td className="px-3 py-2 font-mono text-mist-300">{result.priority ?? '—'}</td> : null}
                <td className="px-3 py-2 font-mono text-mist-100">{shown ? result.finish : '…'}</td>
                <td className="whitespace-nowrap px-3 py-2 font-mono text-mist-100">
                  {shown ? (
                    <>
                      <span className="text-mist-500">{result.finish} − {result.arrival} = </span>
                      <strong>{result.turnaround}</strong>
                    </>
                  ) : (
                    '…'
                  )}
                </td>
                <td className="whitespace-nowrap px-3 py-2 font-mono text-mist-100">
                  {shown ? (
                    <>
                      <span className="text-mist-500">{result.turnaround} − {result.burst} = </span>
                      <strong>{result.waiting}</strong>
                    </>
                  ) : (
                    '…'
                  )}
                </td>
                {showResponse ? (
                  <td className="whitespace-nowrap px-3 py-2 font-mono text-mist-100">
                    {shown ? (
                      <>
                        <span className="text-mist-500">{result.firstStart} − {result.arrival} = </span>
                        <strong>{result.response}</strong>
                      </>
                    ) : (
                      '…'
                    )}
                  </td>
                ) : null}
              </tr>
            )
          })}
        </tbody>
      </table>
      <div className="grid gap-1.5 border-t border-line bg-ink-900/60 px-3 py-2.5 font-mono text-[0.8rem] sm:grid-cols-2">
        <p className="text-mist-300">
          <span className="text-mist-500">Avg turnaround </span>
          {all ? <strong className="text-mist-50">{averageExpression(schedule.results.map((result) => result.turnaround))}</strong> : '…'}
        </p>
        <p className="text-mist-300">
          <span className="text-mist-500">Avg waiting </span>
          {all ? <strong className="text-cyan-neon">{averageExpression(schedule.results.map((result) => result.waiting))}</strong> : '…'}
        </p>
      </div>
    </div>
  )
}
