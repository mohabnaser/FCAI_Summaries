import { useState } from 'react'
import { ArrowDown, ArrowUp, Cpu, Database, Layers } from 'lucide-react'
import type { LText } from '../../../types'
import { BilingualProse } from '../../ui/Text'
import { cn } from '../../../lib/cn'
import { VisualFrame } from '../VisualFrame'

type Method = 'registers' | 'table' | 'stack'
/** Illustrative only — real register counts depend on the CPU and the OS calling convention. */
const REGISTERS = 6

const methods: Array<{ id: Method; label: string; icon: typeof Cpu }> = [
  { id: 'registers', label: '1 · Registers', icon: Cpu },
  { id: 'table', label: '2 · Block / table', icon: Database },
  { id: 'stack', label: '3 · Stack', icon: Layers },
]

function Param({ n, bad }: { n: number; bad?: boolean }) {
  return (
    <span
      className={cn(
        'flex h-8 min-w-[2.4rem] items-center justify-center rounded-md border px-1.5 font-mono text-[0.72rem] font-semibold',
        bad ? 'border-rose-neon/60 bg-rose-neon/15 text-rose-neon' : 'border-teal-neon/50 bg-teal-neon/12 text-teal-50',
      )}
    >
      P{n}
    </span>
  )
}

export function ParameterPassingVisual({ title, hint }: { title: LText; hint?: LText }) {
  const [method, setMethod] = useState<Method>('registers')
  const [count, setCount] = useState(3)
  const params = Array.from({ length: count }, (_, index) => index + 1)
  const overflow = method === 'registers' && count > REGISTERS

  const explanation: LText =
    method === 'registers'
      ? overflow
        ? {
            en: `**${count} parameters but only ${REGISTERS} registers** (illustrative count): the simplest method has run out of room. “In some cases, there may be more parameters than registers.”`,
            ar: `**${count} parameters بس فيه ${REGISTERS} registers بس** (عدد توضيحي): أبسط طريقة المكان خلص منها. “In some cases, there may be more parameters than registers.”`,
          }
        : {
            en: 'The **simplest** method: each parameter goes straight into a CPU register before the system call.',
            ar: '**أبسط** طريقة: كل parameter بيتحط في register على طول قبل الـ system call.',
          }
      : method === 'table'
        ? {
            en: 'The parameters sit in a block at address **X**; the program does **load address X**, then **system call 13**. Only X travels in a register; the OS “uses parameters from table X”. Linux and Solaris work this way.',
            ar: 'الـ parameters متخزنة في block عند العنوان **X**؛ البرنامج بيعمل **load address X** وبعدين **system call 13**. بس الـ X هو اللي بيتبعت في register؛ والـ OS بي“use parameters from table X”. وده اللي Linux وSolaris بيعملوه.',
          }
        : {
            en: 'The **program pushes** the parameters onto the stack, and the **operating system pops** them off. Like the block method, there is no limit on number or length.',
            ar: '**البرنامج بيعمل push** للـ parameters على الـ stack، و**الـ operating system بيعمل pop**. وزي طريقة الـ block، مفيش حد لعددهم أو طولهم.',
          }

  return (
    <VisualFrame title={title} hint={hint ?? { en: 'Pick a method and change the number of parameters.' }}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-1.5" role="tablist" aria-label="Parameter-passing method">
          {methods.map((entry) => (
            <button
              key={entry.id}
              type="button"
              role="tab"
              aria-selected={method === entry.id}
              onClick={() => setMethod(entry.id)}
              className={cn(
                'inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-[0.8rem] font-semibold transition-colors',
                method === entry.id
                  ? 'border-cyan-neon/50 bg-cyan-neon/10 text-cyan-neon'
                  : 'border-line-soft bg-ink-900/50 text-mist-400 hover:text-mist-100',
              )}
            >
              <entry.icon className="h-3.5 w-3.5" aria-hidden="true" />
              {entry.label}
            </button>
          ))}
        </div>
        <label className="flex items-center gap-2 text-[0.8rem] text-mist-300">
          parameters
          <input
            type="range"
            min={1}
            max={9}
            value={count}
            onChange={(event) => setCount(Number(event.target.value))}
            className="h-1.5 w-32 accent-cyan-neon"
          />
          <span className="w-4 font-mono text-mist-100">{count}</span>
        </label>
      </div>

      <div className="mt-4 rounded-xl border border-line-soft bg-ink-950/50 p-4">
        {method === 'registers' ? (
          <div className="space-y-3">
            <p className="font-mono text-[0.64rem] uppercase tracking-wider text-mist-500">CPU registers (illustrative: {REGISTERS})</p>
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
              {Array.from({ length: REGISTERS }, (_, slot) => (
                <div key={slot} className="rounded-lg border border-line bg-ink-900/60 p-1.5 text-center">
                  <p className="font-mono text-[0.6rem] text-mist-500">R{slot + 1}</p>
                  <div className="mt-1 flex justify-center">{slot < count ? <Param n={slot + 1} /> : <span className="h-8" />}</div>
                </div>
              ))}
            </div>
            {overflow ? (
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="font-mono text-[0.66rem] uppercase text-rose-neon">no register left for:</span>
                {params.slice(REGISTERS).map((n) => (
                  <Param key={n} n={n} bad />
                ))}
              </div>
            ) : null}
          </div>
        ) : null}

        {method === 'table' ? (
          <div className="grid items-center gap-3 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
            <div className="rounded-xl border border-cyan-neon/35 bg-cyan-neon/[0.06] p-3">
              <p className="font-display text-[0.9rem] font-semibold text-mist-50">user program</p>
              <div className="mt-2 rounded-lg border border-line bg-ink-900/60 p-2">
                <p className="font-mono text-[0.64rem] text-mist-400">X: parameters for call</p>
                <div className="mt-1.5 flex flex-wrap gap-1">{params.map((n) => <Param key={n} n={n} />)}</div>
              </div>
              <p className="mt-2 font-mono text-[0.72rem] text-mist-200">load address X</p>
              <p className="font-mono text-[0.72rem] text-mist-200">system call 13</p>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="rounded-md border border-amber-neon/50 bg-amber-neon/10 px-3 py-1.5 font-mono text-[0.9rem] font-bold text-amber-neon">X</span>
              <span className="font-mono text-[0.6rem] uppercase text-mist-500">register</span>
            </div>
            <div className="rounded-xl border border-violet-neon/35 bg-violet-neon/[0.06] p-3">
              <p className="font-display text-[0.9rem] font-semibold text-mist-50">operating system</p>
              <div className="mt-2 rounded-lg border border-line bg-ink-900/60 p-2 text-center font-mono text-[0.72rem] text-mist-200">
                use parameters from table X
              </div>
              <p className="mt-2 text-right font-mono text-[0.64rem] text-mist-400">{'}'} code for system call 13</p>
            </div>
          </div>
        ) : null}

        {method === 'stack' ? (
          <div className="grid items-end gap-4 sm:grid-cols-[1fr_auto_1fr]">
            <div className="flex items-center justify-end gap-2 text-[0.8rem] text-teal-neon">
              <ArrowDown className="h-4 w-4" aria-hidden="true" /> program pushes
            </div>
            <div className="mx-auto w-28 rounded-xl border border-line bg-ink-900/60 p-2">
              <p className="mb-1 text-center font-mono text-[0.6rem] uppercase text-mist-500">stack</p>
              <div className="flex flex-col-reverse gap-1">
                {params.map((n) => (
                  <div key={n} className="flex justify-center">
                    <Param n={n} />
                  </div>
                ))}
              </div>
              <p className="mt-1 text-center font-mono text-[0.58rem] text-mist-600">bottom</p>
            </div>
            <div className="flex items-center gap-2 text-[0.8rem] text-violet-neon">
              <ArrowUp className="h-4 w-4" aria-hidden="true" /> OS pops
            </div>
          </div>
        ) : null}
      </div>

      <div
        className={cn(
          'mt-3 rounded-xl border p-3.5',
          overflow ? 'border-rose-neon/30 bg-rose-neon/[0.05]' : 'border-cyan-neon/20 bg-cyan-neon/[0.035]',
        )}
        aria-live="polite"
      >
        <BilingualProse text={explanation} className="text-[0.92rem]" />
      </div>
    </VisualFrame>
  )
}
