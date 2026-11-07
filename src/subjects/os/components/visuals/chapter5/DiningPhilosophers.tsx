import { useState } from 'react'
import { RotateCcw, Users } from 'lucide-react'
import type { LText } from '../../../types'
import { BilingualProse } from '../../ui/Text'
import { cn } from '../../../lib/cn'
import { VisualFrame } from '../VisualFrame'

type Phase = 'thinking' | 'has-left' | 'eating'

interface Table {
  phase: Phase[]
  /** Who holds chopstick k (null = free). Philosopher i uses chopstick i (left) and (i+1)%5 (right). */
  holder: Array<number | null>
  /** Which chopstick each philosopher is blocked on, if any. */
  waitingFor: Array<number | null>
  log: LText
}

const N = 5
const fresh = (): Table => ({
  phase: Array(N).fill('thinking'),
  holder: Array(N).fill(null),
  waitingFor: Array(N).fill(null),
  log: { en: 'Everyone is thinking. Click a philosopher to run their next line of code.', ar: 'الكل بيفكر. اضغط على فيلسوف عشان ينفّذ السطر اللي بعده.' },
})

const left = (i: number) => i
const right = (i: number) => (i + 1) % N

function acquired(table: Table, i: number) {
  table.waitingFor[i] = null
  table.phase[i] = table.phase[i] === 'thinking' ? 'has-left' : 'eating'
}

/** signal(chopstick[k]): hand it straight to a philosopher blocked on it, if any. */
function release(table: Table, k: number) {
  table.holder[k] = null
  const waiter = table.waitingFor.findIndex((wanted) => wanted === k)
  if (waiter >= 0) {
    table.holder[k] = waiter
    acquired(table, waiter)
  }
}

function stepPhilosopher(table: Table, i: number): LText {
  if (table.waitingFor[i] !== null) return { en: `P${i} is blocked on chopstick ${table.waitingFor[i]}.`, ar: `P${i} متعطّل على chopstick ${table.waitingFor[i]}.` }
  const phase = table.phase[i]
  if (phase === 'eating') {
    release(table, left(i))
    release(table, right(i))
    table.phase[i] = 'thinking'
    return { en: `P${i} signals both chopsticks and goes back to thinking.`, ar: `P${i} عمل signal للـ chopsticks الاتنين ورجع يفكر.` }
  }
  const k = phase === 'thinking' ? left(i) : right(i)
  if (table.holder[k] === null) {
    table.holder[k] = i
    acquired(table, i)
    return table.phase[i] === 'eating'
      ? { en: `P${i} picks up chopstick ${k} (right) — it has both and **eats**.`, ar: `P${i} مسك chopstick ${k} (اليمين) — بقى معاه الاتنين و**بياكل**.` }
      : { en: `P${i}: wait(chopstick[${k}]) — picks up its left chopstick.`, ar: `P${i}: wait(chopstick[${k}]) — مسك الـ chopstick الشمال.` }
  }
  table.waitingFor[i] = k
  return { en: `P${i}: wait(chopstick[${k}]) — held by P${table.holder[k]}, so P${i} **blocks**.`, ar: `P${i}: wait(chopstick[${k}]) — مع P${table.holder[k]}، فـ P${i} **اتعطّل**.` }
}

export function DiningPhilosophersVisual({ title, hint }: { title: LText; hint?: LText }) {
  const [table, setTable] = useState<Table>(fresh)
  const deadlock = table.waitingFor.every((wanted) => wanted !== null)

  const click = (i: number) =>
    setTable((current) => {
      const draft: Table = { phase: [...current.phase], holder: [...current.holder], waitingFor: [...current.waitingFor], log: current.log }
      draft.log = stepPhilosopher(draft, i)
      return draft
    })

  const everyoneLeft = () =>
    setTable(() => {
      const draft = fresh()
      for (let i = 0; i < N; i += 1) stepPhilosopher(draft, i)
      for (let i = 0; i < N; i += 1) stepPhilosopher(draft, i)
      draft.log = { en: 'All five ran wait(chopstick[i]) first, then wait(chopstick[(i + 1) % 5]).', ar: 'الخمسة نفّذوا wait(chopstick[i]) الأول، وبعدين wait(chopstick[(i + 1) % 5]).' }
      return draft
    })

  const cx = 160
  const cy = 150
  const seat = (i: number, r: number) => {
    const angle = (-90 + i * 72) * (Math.PI / 180)
    return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) }
  }
  const stickAt = (k: number, r: number) => {
    const angle = (-90 + k * 72 + 36) * (Math.PI / 180)
    return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle), angle }
  }

  return (
    <VisualFrame title={title} hint={hint ?? { en: 'Click philosophers, or make everyone grab left.' }}>
      <div className="grid items-center gap-4 md:grid-cols-[minmax(0,20rem)_minmax(0,1fr)]">
        <svg viewBox="0 0 320 300" className="mx-auto w-full max-w-[20rem] select-none" role="group" aria-label="Dining philosophers table">
          <circle cx={cx} cy={cy} r={78} style={{ fill: 'var(--color-ink-850)', stroke: 'var(--color-line)' }} strokeWidth={2} />
          <circle cx={cx} cy={cy} r={26} style={{ fill: 'var(--color-ink-750)', stroke: 'var(--color-amber-neon)' }} strokeWidth={1.5} />
          <text x={cx} y={cy + 4} textAnchor="middle" fontSize="11" fontFamily="var(--font-mono)" style={{ fill: 'var(--color-amber-neon)' }}>
            RICE
          </text>
          {Array.from({ length: N }, (_, k) => {
            const a = stickAt(k, 52)
            const b = stickAt(k, 74)
            const holder = table.holder[k]
            return (
              <g key={`stick-${k}`}>
                <line
                  x1={a.x}
                  y1={a.y}
                  x2={b.x}
                  y2={b.y}
                  strokeWidth={5}
                  strokeLinecap="round"
                  style={{ stroke: holder === null ? 'var(--color-mist-400)' : 'var(--color-cyan-neon)' }}
                />
                <text x={stickAt(k, 92).x} y={stickAt(k, 92).y + 4} textAnchor="middle" fontSize="10" fontFamily="var(--font-mono)" style={{ fill: 'var(--color-mist-500)' }}>
                  c{k}
                </text>
              </g>
            )
          })}
          {Array.from({ length: N }, (_, i) => {
            const p = seat(i, 116)
            const blocked = table.waitingFor[i] !== null
            const phase = table.phase[i]
            const color = blocked ? 'var(--color-rose-neon)' : phase === 'eating' ? 'var(--color-teal-neon)' : phase === 'has-left' ? 'var(--color-amber-neon)' : 'var(--color-line)'
            return (
              <g
                key={`p-${i}`}
                role="button"
                tabIndex={0}
                aria-label={`Philosopher ${i}: ${blocked ? 'blocked' : phase}`}
                onClick={() => click(i)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault()
                    click(i)
                  }
                }}
                style={{ cursor: 'pointer', outline: 'none' }}
              >
                <circle cx={p.x} cy={p.y} r={24} strokeWidth={3} style={{ fill: 'var(--color-ink-900)', stroke: color }} />
                <text x={p.x} y={p.y + 5} textAnchor="middle" fontSize="14" fontWeight={700} fontFamily="var(--font-display)" style={{ fill: 'var(--color-mist-50)' }}>
                  P{i}
                </text>
              </g>
            )
          })}
        </svg>

        <div className="flex flex-col gap-2">
          <ul className="grid gap-1 text-[0.82rem]">
            {table.phase.map((phase, i) => {
              const blocked = table.waitingFor[i]
              return (
                <li key={i} className="flex items-center justify-between rounded-lg border border-line bg-ink-850 px-3 py-1.5">
                  <span className="font-mono font-semibold text-mist-100">P{i}</span>
                  <span
                    className={cn(
                      'font-mono text-[0.76rem]',
                      blocked !== null ? 'text-rose-neon' : phase === 'eating' ? 'text-teal-neon' : phase === 'has-left' ? 'text-amber-neon' : 'text-mist-400',
                    )}
                  >
                    {blocked !== null ? `blocked on c${blocked}` : phase === 'has-left' ? `holds c${left(i)}` : phase}
                  </span>
                </li>
              )
            })}
          </ul>
          <div className="flex flex-wrap gap-2">
            <button type="button" className="btn btn-primary btn-sm" onClick={everyoneLeft}>
              <Users className="h-3.5 w-3.5" aria-hidden="true" /> Everyone grabs left
            </button>
            <button type="button" className="btn btn-ghost btn-sm" onClick={() => setTable(fresh())}>
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" /> Reset
            </button>
          </div>
        </div>
      </div>

      <div className={cn('mt-3 rounded-xl border p-3.5', deadlock ? 'border-rose-neon bg-rose-neon/12' : 'border-line bg-ink-850')} aria-live="polite">
        <BilingualProse
          text={
            deadlock
              ? {
                  en: '**Deadlock.** Each philosopher holds its left chopstick and waits forever for the right one, which its neighbour holds. That is the problem with this algorithm.',
                  ar: '**Deadlock.** كل فيلسوف ماسك الـ chopstick الشمال ومستني اليمين للأبد، واليمين ده مع جاره. ودي المشكلة في الخوارزمية دي.',
                }
              : table.log
          }
          className="text-[0.92rem]"
        />
      </div>
    </VisualFrame>
  )
}
