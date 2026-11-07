import { useState } from 'react'
import type { LText } from '../../../types'
import { BilingualProse } from '../../ui/Text'
import { cn } from '../../../lib/cn'
import { StepControls, VisualFrame } from '../VisualFrame'

type Who = 'P' | 'C'
type Op = { who: Who; text: string; apply: (s: Regs) => Regs }
type Regs = { counter: number; r1: number | null; r2: number | null }

const load1: Op = { who: 'P', text: 'register1 = counter', apply: (s) => ({ ...s, r1: s.counter }) }
const add1: Op = { who: 'P', text: 'register1 = register1 + 1', apply: (s) => ({ ...s, r1: (s.r1 ?? 0) + 1 }) }
const store1: Op = { who: 'P', text: 'counter = register1', apply: (s) => ({ ...s, counter: s.r1 ?? s.counter }) }
const load2: Op = { who: 'C', text: 'register2 = counter', apply: (s) => ({ ...s, r2: s.counter }) }
const sub2: Op = { who: 'C', text: 'register2 = register2 - 1', apply: (s) => ({ ...s, r2: (s.r2 ?? 0) - 1 }) }
const store2: Op = { who: 'C', text: 'counter = register2', apply: (s) => ({ ...s, counter: s.r2 ?? s.counter }) }

const modes: Array<{ id: string; label: string; ops: Op[]; verdict: LText }> = [
  {
    id: 'race',
    label: 'Interleaved (S0–S5)',
    ops: [load1, add1, load2, sub2, store1, store2],
    verdict: {
      en: 'counter = **4**, but one item was produced and one consumed, so it should still be 5. Both processes read 5 before either wrote — the consumer’s write overwrote the producer’s.',
      ar: 'الـ counter = **4**، مع إن اتعمل item واتستهلك item، فالمفروض يفضل 5. الاتنين قروا 5 قبل ما حد فيهم يكتب — وكتابة الـ consumer مسحت كتابة الـ producer.',
    },
  },
  {
    id: 'race6',
    label: 'Swap S4 and S5',
    ops: [load1, add1, load2, sub2, store2, store1],
    verdict: {
      en: 'counter = **6** — wrong in the other direction. Same six instructions, a different order, a different answer: **a race condition**.',
      ar: 'الـ counter = **6** — غلط في الاتجاه التاني. نفس الست تعليمات، بترتيب مختلف، ونتيجة مختلفة: ده الـ **race condition**.',
    },
  },
  {
    id: 'serial',
    label: 'One after the other',
    ops: [load1, add1, store1, load2, sub2, store2],
    verdict: {
      en: 'counter = **5** — correct. Running each update as a whole (a critical section) gives the right result.',
      ar: 'الـ counter = **5** — صح. لما كل تعديل يتنفّذ كوحدة كاملة (critical section) النتيجة بتطلع صح.',
    },
  },
]

const start: Regs = { counter: 5, r1: null, r2: null }

export function RaceConditionVisual({ title, hint }: { title: LText; hint?: LText }) {
  const [modeId, setModeId] = useState('race')
  const [step, setStep] = useState(0)
  const mode = modes.find((entry) => entry.id === modeId) ?? modes[0]
  const regs = mode.ops.slice(0, step).reduce((state, op) => op.apply(state), start)
  const done = step === mode.ops.length

  return (
    <VisualFrame title={title} hint={hint ?? { en: 'Pick an order, then step through it.' }}>
      <div className="grid grid-cols-3 gap-2" role="radiogroup" aria-label="Execution order">
        {modes.map((entry) => (
          <button
            key={entry.id}
            type="button"
            role="radio"
            aria-checked={entry.id === modeId}
            onClick={() => {
              setModeId(entry.id)
              setStep(0)
            }}
            className={cn(
              'rounded-xl border px-2 py-2 text-[0.8rem] font-semibold transition-all',
              entry.id === modeId ? 'border-cyan-neon bg-cyan-neon/15 text-mist-50' : 'border-line bg-ink-850 text-mist-300 hover:border-cyan-neon/50',
            )}
          >
            {entry.label}
          </button>
        ))}
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <ol className="space-y-1.5">
          {mode.ops.map((op, index) => {
            const executed = index < step
            const next = index === step
            return (
              <li
                key={`${modeId}-${index}`}
                className={cn(
                  'flex items-center gap-3 rounded-lg border px-3 py-2 font-mono text-[0.8rem] transition-all',
                  next ? 'border-amber-neon bg-amber-neon/12' : executed ? 'border-line bg-ink-850' : 'border-line-soft bg-ink-900 opacity-60',
                )}
              >
                <span className="w-7 flex-none text-mist-500">S{index}</span>
                <span className={cn('w-20 flex-none text-[0.7rem] font-bold uppercase', op.who === 'P' ? 'text-cyan-neon' : 'text-rose-neon')}>
                  {op.who === 'P' ? 'producer' : 'consumer'}
                </span>
                <span className="text-mist-100">{op.text}</span>
              </li>
            )
          })}
        </ol>
        <div className="grid grid-cols-3 gap-2 md:grid-cols-1">
          {[
            { label: 'register1', value: regs.r1, tone: 'text-cyan-neon border-cyan-neon/50' },
            { label: 'register2', value: regs.r2, tone: 'text-rose-neon border-rose-neon/50' },
            { label: 'counter (shared)', value: regs.counter, tone: 'text-amber-neon border-amber-neon/60' },
          ].map((box) => (
            <div key={box.label} className={cn('rounded-xl border bg-ink-850 px-3 py-2.5', box.tone)}>
              <p className="font-mono text-[0.64rem] uppercase tracking-[0.12em] text-mist-400">{box.label}</p>
              <p className="mt-0.5 font-display text-[1.6rem] font-bold leading-none">{box.value ?? '—'}</p>
            </div>
          ))}
        </div>
      </div>

      <div
        className={cn(
          'mt-3 min-h-[3.5rem] rounded-xl border p-3.5',
          done ? (modeId === 'serial' ? 'border-teal-neon/60 bg-teal-neon/10' : 'border-rose-neon/60 bg-rose-neon/10') : 'border-line bg-ink-850',
        )}
        aria-live="polite"
      >
        {done ? (
          <BilingualProse text={mode.verdict} className="text-[0.92rem]" />
        ) : (
          <p className="text-[0.9rem] text-mist-300">
            Start: counter = 5. Next: <span className="font-mono text-mist-50">{mode.ops[step].text}</span>
          </p>
        )}
      </div>

      <StepControls
        step={step}
        total={mode.ops.length + 1}
        label="Position"
        onPrev={() => setStep((value) => Math.max(0, value - 1))}
        onNext={() => setStep((value) => Math.min(mode.ops.length, value + 1))}
        onReset={() => setStep(0)}
      />
    </VisualFrame>
  )
}
