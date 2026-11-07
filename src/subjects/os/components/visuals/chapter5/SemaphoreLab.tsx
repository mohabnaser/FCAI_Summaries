import { useState } from 'react'
import { RotateCcw } from 'lucide-react'
import type { LText } from '../../../types'
import { BilingualProse } from '../../ui/Text'
import { cn } from '../../../lib/cn'
import { VisualFrame } from '../VisualFrame'

type Mode = 'correct' | 'signal-wait' | 'wait-wait'
type Op = 'wait' | 'signal'

const modes: Array<{ id: Mode; label: string; entry: Op; exit: Op }> = [
  { id: 'correct', label: 'wait … signal (correct)', entry: 'wait', exit: 'signal' },
  { id: 'signal-wait', label: 'signal … wait', entry: 'signal', exit: 'wait' },
  { id: 'wait-wait', label: 'wait … wait', entry: 'wait', exit: 'wait' },
]

const NAMES = ['P1', 'P2', 'P3']

interface Proc {
  /** 0 = remainder (next op: entry), 1 = in critical section (next op: exit). */
  pc: 0 | 1
  blocked: boolean
}

interface Lab {
  value: number
  queue: number[]
  procs: Proc[]
  log: LText
}

const fresh = (): Lab => ({
  value: 1,
  queue: [],
  procs: NAMES.map(() => ({ pc: 0, blocked: false })),
  log: { en: 'mutex = 1. Step the processes through their code.', ar: 'mutex = 1. مشّي الـ processes في الكود بتاعهم.' },
})

export function SemaphoreLabVisual({ title, hint }: { title: LText; hint?: LText }) {
  const [mode, setMode] = useState<Mode>('correct')
  const [lab, setLab] = useState<Lab>(fresh)
  const current = modes.find((entry) => entry.id === mode)!

  const step = (index: number) => {
    setLab((state) => {
      const procs = state.procs.map((proc) => ({ ...proc }))
      const proc = procs[index]
      if (proc.blocked) return state
      const op = proc.pc === 0 ? current.entry : current.exit
      const name = NAMES[index]
      let { value } = state
      let queue = [...state.queue]
      let log: LText
      if (op === 'wait') {
        value -= 1
        if (value < 0) {
          proc.blocked = true
          queue.push(index)
          log = { en: `${name}: wait(mutex) → value ${value} < 0, so **block()**: ${name} joins the waiting queue.`, ar: `${name}: wait(mutex) ← القيمة ${value} < 0، فـ **block()**: الـ ${name} دخلت الـ waiting queue.` }
        } else {
          proc.pc = proc.pc === 0 ? 1 : 0
          log = { en: `${name}: wait(mutex) → value ${value}, continues.`, ar: `${name}: wait(mutex) ← القيمة ${value}، وبتكمّل.` }
        }
      } else {
        value += 1
        proc.pc = proc.pc === 0 ? 1 : 0
        log = { en: `${name}: signal(mutex) → value ${value}.`, ar: `${name}: signal(mutex) ← القيمة ${value}.` }
        if (value <= 0 && queue.length) {
          const [woken, ...rest] = queue
          queue = rest
          procs[woken].blocked = false
          procs[woken].pc = procs[woken].pc === 0 ? 1 : 0
          log = {
            en: `${log.en} value ≤ 0, so **wakeup(${NAMES[woken]})**: it leaves the queue and continues.`,
            ar: `${log.ar} القيمة ≤ 0، فـ **wakeup(${NAMES[woken]})**: خرجت من الـ queue وكمّلت.`,
          }
        }
      }
      return { value, queue, procs, log }
    })
  }

  const inside = lab.procs.map((proc, index) => ({ proc, index })).filter(({ proc }) => proc.pc === 1 && !proc.blocked)
  const deadlock = lab.queue.length > 0 && inside.length === 0 && lab.procs.every((proc) => proc.blocked || proc.pc === 0) && mode === 'wait-wait'
  const violation = inside.length > 1

  const status: { tone: string; text: LText } | null = deadlock
    ? {
        tone: 'border-rose-neon bg-rose-neon/12',
        text: {
          en: '**Deadlock.** The blocked process is the one that would have signalled mutex — nobody can ever wake it, and every later wait(mutex) blocks too.',
          ar: '**Deadlock.** الـ process المتعطّلة هي نفسها اللي كانت هتعمل signal للـ mutex — محدش هيقدر يصحّيها أبدًا، وكل wait(mutex) بعد كده هتتعطّل كمان.',
        },
      }
    : violation
      ? {
          tone: 'border-amber-neon bg-amber-neon/12',
          text: {
            en: `**Mutual exclusion violated:** ${inside.map(({ index }) => NAMES[index]).join(', ')} are in their critical sections at the same time.`,
            ar: `**الـ Mutual exclusion اتكسر:** ${inside.map(({ index }) => NAMES[index]).join(' و')} في الـ critical section في نفس الوقت.`,
          },
        }
      : null

  return (
    <VisualFrame title={title} hint={hint ?? { en: 'Pick a code order, then step each process.' }}>
      <div className="grid gap-2 sm:grid-cols-3" role="radiogroup" aria-label="Code order">
        {modes.map((entry) => (
          <button
            key={entry.id}
            type="button"
            role="radio"
            aria-checked={entry.id === mode}
            onClick={() => {
              setMode(entry.id)
              setLab(fresh())
            }}
            className={cn(
              'rounded-xl border px-2 py-2 font-mono text-[0.78rem] font-semibold transition-all',
              entry.id === mode ? 'border-cyan-neon bg-cyan-neon/15 text-mist-50' : 'border-line bg-ink-850 text-mist-300 hover:border-cyan-neon/50',
            )}
          >
            {entry.label}
          </button>
        ))}
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-[13rem_minmax(0,1fr)]">
        <div className="rounded-xl border border-violet-neon/60 bg-ink-850 p-3.5">
          <p className="font-mono text-[0.66rem] uppercase tracking-[0.14em] text-violet-neon">semaphore mutex</p>
          <p className="mt-1 font-display text-[2rem] font-bold leading-none text-mist-50">{lab.value}</p>
          <p className="mt-1 text-[0.74rem] text-mist-400">
            {lab.value < 0 ? `${-lab.value} waiting` : lab.value === 0 ? 'taken' : 'free'}
          </p>
          <p className="mt-3 font-mono text-[0.64rem] uppercase tracking-[0.14em] text-mist-500">waiting queue</p>
          <div className="mt-1 flex min-h-[1.9rem] flex-wrap gap-1">
            {lab.queue.length ? (
              lab.queue.map((index) => (
                <span key={index} className="rounded-md border border-rose-neon/60 bg-rose-neon/12 px-2 py-0.5 font-mono text-[0.76rem] font-bold text-rose-neon">
                  {NAMES[index]}
                </span>
              ))
            ) : (
              <span className="text-[0.76rem] text-mist-500">empty</span>
            )}
          </div>
        </div>

        <div className="grid gap-2 sm:grid-cols-3">
          {lab.procs.map((proc, index) => {
            const op = proc.pc === 0 ? current.entry : current.exit
            const where = proc.blocked ? 'blocked in wait(mutex)' : proc.pc === 1 ? 'in critical section' : 'remainder section'
            return (
              <div
                key={index}
                className={cn(
                  'flex flex-col gap-2 rounded-xl border bg-ink-850 p-3',
                  proc.blocked ? 'border-rose-neon/70' : proc.pc === 1 ? 'border-amber-neon/70' : 'border-line',
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="font-display text-[1.05rem] font-semibold text-mist-50">{NAMES[index]}</span>
                  <span
                    className={cn(
                      'h-2.5 w-2.5 rounded-full',
                      proc.blocked ? 'bg-rose-neon' : proc.pc === 1 ? 'bg-amber-neon' : 'bg-teal-neon',
                    )}
                    aria-hidden="true"
                  />
                </div>
                <span className="text-[0.78rem] text-mist-300">{where}</span>
                <button
                  type="button"
                  disabled={proc.blocked}
                  onClick={() => step(index)}
                  aria-label={`${NAMES[index]}: ${op}(mutex)`}
                  className="mt-auto rounded-lg border border-cyan-neon/60 bg-cyan-neon/12 px-2 py-1.5 font-mono text-[0.76rem] font-semibold text-cyan-neon transition-all hover:bg-cyan-neon/20 disabled:cursor-not-allowed disabled:border-line-soft disabled:bg-ink-900 disabled:text-mist-600"
                >
                  {op}(mutex)
                </button>
              </div>
            )
          })}
        </div>
      </div>

      <div className="mt-3 rounded-xl border border-line bg-ink-850 p-3.5" aria-live="polite">
        <BilingualProse text={lab.log} className="text-[0.9rem]" />
      </div>
      {status ? (
        <div className={cn('mt-2 rounded-xl border p-3.5', status.tone)}>
          <BilingualProse text={status.text} className="text-[0.92rem]" />
        </div>
      ) : null}

      <button type="button" className="btn btn-ghost btn-sm mt-3" onClick={() => setLab(fresh())}>
        <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" /> Reset
      </button>
    </VisualFrame>
  )
}
