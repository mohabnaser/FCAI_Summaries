import { useState } from 'react'
import { RotateCcw } from 'lucide-react'
import type { LText } from '../../../types'
import { BilingualProse } from '../../ui/Text'
import { cn } from '../../../lib/cn'
import { VisualFrame } from '../VisualFrame'

type State = 'new' | 'ready' | 'running' | 'waiting' | 'terminated'
type EventId = 'admitted' | 'dispatch' | 'interrupt' | 'io-wait' | 'io-done' | 'exit'

/** Node positions in the 600 × 300 viewBox, laid out like slide 8. */
const nodes: Record<State, { x: number; y: number; queue: string }> = {
  new: { x: 80, y: 48, queue: 'job queue' },
  terminated: { x: 520, y: 48, queue: 'resources released' },
  ready: { x: 175, y: 150, queue: 'ready queue' },
  running: { x: 425, y: 150, queue: 'on the CPU' },
  waiting: { x: 300, y: 256, queue: 'device queue' },
}

const events: Array<{
  id: EventId
  label: string
  from: State
  to: State
  path: string
  labelAt: [number, number]
  note: LText
}> = [
  {
    id: 'admitted',
    label: 'admitted',
    from: 'new',
    to: 'ready',
    path: 'M 112 70 L 148 126',
    labelAt: [92, 104],
    note: { en: 'The long-term scheduler **admits** the new process into the ready queue.', ar: 'الـ long-term scheduler **بيقبل** الـ process الجديدة ويدخّلها الـ ready queue.' },
  },
  {
    id: 'dispatch',
    label: 'scheduler dispatch',
    from: 'ready',
    to: 'running',
    path: 'M 238 136 Q 300 104 362 136',
    labelAt: [300, 106],
    note: { en: 'The **short-term scheduler** picks it and allocates the CPU.', ar: 'الـ **short-term scheduler** اختارها وادّاها الـ CPU.' },
  },
  {
    id: 'interrupt',
    label: 'interrupt',
    from: 'running',
    to: 'ready',
    path: 'M 362 164 Q 300 190 238 164',
    labelAt: [300, 196],
    note: { en: 'An **interrupt** (e.g. its time slice expired) takes it off the CPU. It can still run, so it goes back to **ready**.', ar: '**Interrupt** (زي إن الـ time slice خلص) شالها من على الـ CPU. لسه تقدر تشتغل، فبترجع **ready**.' },
  },
  {
    id: 'io-wait',
    label: 'I/O or event wait',
    from: 'running',
    to: 'waiting',
    path: 'M 430 175 L 352 238',
    labelAt: [462, 214],
    note: { en: 'It requested I/O or must wait for an event, so it **cannot run** until the event occurs: **waiting** (device queue).', ar: 'طلبت I/O أو لازم تستنى حدث، فـ **مش هتقدر تشتغل** لحد ما الحدث يحصل: **waiting** (الـ device queue).' },
  },
  {
    id: 'io-done',
    label: 'I/O or event completion',
    from: 'waiting',
    to: 'ready',
    path: 'M 248 238 L 170 175',
    labelAt: [132, 214],
    note: { en: 'The event completed. It goes to **ready**, not straight to running — it must wait for dispatch.', ar: 'الحدث خلص. بتروح **ready**، مش running على طول — لازم تستنى الـ dispatch.' },
  },
  {
    id: 'exit',
    label: 'exit',
    from: 'running',
    to: 'terminated',
    path: 'M 452 126 L 492 72',
    labelAt: [494, 108],
    note: { en: 'It executed its last statement and called **exit()**: terminated, and the OS deallocates its resources.', ar: 'نفّذت آخر سطر ونادت **exit()**: terminated، والـ OS بيرجّع مواردها.' },
  },
]

const stateNote: Record<State, LText> = {
  new: { en: '**new** — the process is being created.', ar: '**new** — الـ process بتتعمل.' },
  ready: { en: '**ready** — waiting to be assigned to a processor.', ar: '**ready** — مستنية يتخصصلها processor.' },
  running: { en: '**running** — instructions are being executed.', ar: '**running** — التعليمات بتتنفّذ.' },
  waiting: { en: '**waiting** — waiting for some event to occur.', ar: '**waiting** — مستنية حدث يحصل.' },
  terminated: { en: '**terminated** — the process has finished execution.', ar: '**terminated** — الـ process خلصت تنفيذ.' },
}

export function ProcessStatesVisual({ title, hint }: { title: LText; hint?: LText }) {
  const [state, setState] = useState<State>('new')
  const [last, setLast] = useState<EventId | null>(null)
  const [history, setHistory] = useState<State[]>(['new'])
  const lastEvent = events.find((event) => event.id === last)

  const fire = (id: EventId) => {
    const event = events.find((entry) => entry.id === id)
    if (!event || event.from !== state) return
    setState(event.to)
    setLast(id)
    setHistory((value) => [...value, event.to].slice(-8))
  }

  const reset = () => {
    setState('new')
    setLast(null)
    setHistory(['new'])
  }


  /** Clicking a state moves there if exactly one legal event leads to it. */
  const goTo = (target: State) => {
    const event = events.find((entry) => entry.from === state && entry.to === target)
    if (event) fire(event.id)
  }

  const keyActivate = (action: () => void) => (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      action()
    }
  }

  return (
    <VisualFrame title={title} hint={hint ?? { en: 'Click a glowing arrow, a reachable state, or an event button.' }}>
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_16rem] lg:items-start">
        <svg
          viewBox="0 10 600 280"
          className="mx-auto w-full max-w-[40rem] select-none"
          role="group"
          aria-label={`Process state diagram. Current state: ${state}.`}
        >
          <defs>
            <marker id="ps-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" style={{ fill: 'var(--color-mist-500)' }} />
            </marker>
            <marker id="ps-arrow-live" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" style={{ fill: 'var(--color-amber-neon)' }} />
            </marker>
            <marker id="ps-arrow-on" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" style={{ fill: 'var(--color-cyan-neon)' }} />
            </marker>
          </defs>
          {events.map((event) => {
            const on = event.id === last
            const possible = event.from === state
            const color = possible ? 'var(--color-amber-neon)' : on ? 'var(--color-cyan-neon)' : 'var(--color-line)'
            return (
              <g
                key={event.id}
                onClick={possible ? () => fire(event.id) : undefined}
                onKeyDown={possible ? keyActivate(() => fire(event.id)) : undefined}
                role={possible ? 'button' : undefined}
                tabIndex={possible ? 0 : undefined}
                aria-label={possible ? `Fire ${event.label}` : undefined}
                style={{ cursor: possible ? 'pointer' : 'default', outline: 'none' }}
              >
                {/* Wide invisible stroke = easy click target. */}
                <path d={event.path} fill="none" stroke="transparent" strokeWidth={22} pointerEvents="stroke" />
                <path
                  d={event.path}
                  fill="none"
                  strokeWidth={possible ? 2.6 : on ? 2.6 : 1.6}
                  strokeDasharray={possible ? '7 5' : undefined}
                  markerEnd={`url(#${possible ? 'ps-arrow-live' : on ? 'ps-arrow-on' : 'ps-arrow'})`}
                  style={{ stroke: color }}
                >
                  {possible ? (
                    <animate attributeName="stroke-dashoffset" from="24" to="0" dur="0.9s" repeatCount="indefinite" />
                  ) : null}
                </path>
                <text
                  x={event.labelAt[0]}
                  y={event.labelAt[1]}
                  textAnchor="middle"
                  fontSize="13"
                  fontWeight={possible ? 700 : 400}
                  fontFamily="var(--font-mono)"
                  style={{ fill: possible ? 'var(--color-amber-neon)' : on ? 'var(--color-cyan-neon)' : 'var(--color-mist-500)' }}
                >
                  {event.label}
                </text>
              </g>
            )
          })}
          {(Object.keys(nodes) as State[]).map((id) => {
            const node = nodes[id]
            const active = id === state
            const reachable = events.some((event) => event.from === state && event.to === id)
            return (
              <g
                key={id}
                onClick={reachable ? () => goTo(id) : undefined}
                onKeyDown={reachable ? keyActivate(() => goTo(id)) : undefined}
                role={reachable ? 'button' : undefined}
                tabIndex={reachable ? 0 : undefined}
                aria-label={reachable ? `Move to ${id}` : undefined}
                style={{ cursor: reachable ? 'pointer' : 'default', outline: 'none' }}
              >
                <ellipse
                  cx={node.x}
                  cy={node.y}
                  rx={64}
                  ry={24}
                  strokeWidth={active ? 3 : reachable ? 2 : 1.5}
                  strokeDasharray={reachable ? '5 4' : undefined}
                  style={{
                    fill: active ? 'color-mix(in srgb, var(--color-cyan-neon) 24%, var(--color-ink-900))' : 'var(--color-ink-900)',
                    stroke: active ? 'var(--color-cyan-neon)' : reachable ? 'var(--color-amber-neon)' : 'var(--color-line)',
                    transition: 'fill 300ms ease, stroke 300ms ease',
                  }}
                />
                <text
                  x={node.x}
                  y={node.y + 5}
                  textAnchor="middle"
                  fontSize="16"
                  fontWeight={active ? 700 : 500}
                  fontFamily="var(--font-display)"
                  style={{ fill: active ? 'var(--color-mist-50)' : 'var(--color-mist-300)' }}
                >
                  {id}
                </text>
              </g>
            )
          })}
        </svg>

        <div className="flex flex-col gap-2.5">
          <div className="flex items-center justify-between gap-2 rounded-xl border border-line-soft bg-ink-950/50 px-3.5 py-2.5">
            <span className="font-mono text-[0.64rem] uppercase tracking-[0.14em] text-mist-500">Now in</span>
            <span className="text-right font-display text-[0.98rem] font-semibold text-mist-50">
              {state} · <span className="text-cyan-neon">{nodes[state].queue}</span>
            </span>
          </div>
          <div className="grid grid-cols-2 gap-1.5 lg:grid-cols-1" role="group" aria-label="Events">
            {events.map((event) => {
              const enabled = event.from === state
              return (
                <button
                  key={event.id}
                  type="button"
                  onClick={() => fire(event.id)}
                  disabled={!enabled}
                  className={cn(
                    'rounded-lg border px-2.5 py-1.5 text-left font-mono text-[0.76rem] font-semibold transition-all',
                    enabled
                      ? 'border-amber-neon/55 bg-amber-neon/12 text-amber-neon hover:-translate-y-0.5 hover:bg-amber-neon/20'
                      : 'cursor-not-allowed border-line-soft bg-ink-900/40 text-mist-600',
                  )}
                >
                  {enabled ? '▶ ' : ''}
                  {event.label}
                </button>
              )
            })}
          </div>
          <button type="button" className="btn btn-ghost btn-sm self-start" onClick={reset}>
            <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" /> New process
          </button>
        </div>
      </div>

      <div className="mt-3 rounded-xl border border-cyan-neon/20 bg-cyan-neon/[0.035] p-3.5" aria-live="polite">
        <BilingualProse text={lastEvent ? lastEvent.note : stateNote[state]} className="text-[0.92rem]" />
        <p className="mt-2 font-mono text-[0.72rem] text-mist-500">{history.join(' → ')}</p>
      </div>
    </VisualFrame>
  )
}
