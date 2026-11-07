import { useState } from 'react'
import { Check, RotateCcw, X } from 'lucide-react'
import type { LText } from '../../../types'
import { BilingualProse } from '../../ui/Text'
import { cn } from '../../../lib/cn'
import { VisualFrame } from '../VisualFrame'

type Region = 'stack' | 'heap' | 'data' | 'text' | 'pcb'

const regions: Array<{ id: Region; label: string; sub: string; tone: string; ring: string }> = [
  { id: 'stack', label: 'Stack ↓', sub: 'temporary data', tone: 'border-cyan-neon/45 text-cyan-neon', ring: 'bg-cyan-neon/[0.07]' },
  { id: 'heap', label: 'Heap ↑', sub: 'run-time allocation', tone: 'border-amber-neon/45 text-amber-neon', ring: 'bg-amber-neon/[0.07]' },
  { id: 'data', label: 'Data', sub: 'global variables', tone: 'border-teal-neon/45 text-teal-neon', ring: 'bg-teal-neon/[0.07]' },
  { id: 'text', label: 'Text', sub: 'program code', tone: 'border-rose-neon/45 text-rose-neon', ring: 'bg-rose-neon/[0.07]' },
  { id: 'pcb', label: 'PCB (kept by the OS)', sub: 'not in the address space', tone: 'border-violet-neon/45 text-violet-neon', ring: 'bg-violet-neon/[0.07]' },
]

const items: Array<{ id: string; label: string; answer: Region; why: LText }> = [
  { id: 'param', label: 'Function parameters', answer: 'stack', why: { en: 'The stack holds function parameters.', ar: 'الـ stack فيه الـ function parameters.' } },
  { id: 'global', label: 'int count; declared outside main()', answer: 'data', why: { en: 'A global variable lives in the **data section**, never on the stack.', ar: 'الـ global variable مكانه الـ **data section**، عمره ما بيبقى في الـ stack.' } },
  { id: 'ret', label: 'Return address of a call', answer: 'stack', why: { en: 'Return addresses are pushed on the stack.', ar: 'الـ return addresses بتتحط في الـ stack.' } },
  { id: 'malloc', label: 'Block returned by malloc()', answer: 'heap', why: { en: 'Memory **dynamically allocated during run time** is the heap.', ar: 'الذاكرة اللي **بتتحجز dynamically وقت التشغيل** هي الـ heap.' } },
  { id: 'code', label: 'Machine instructions of main()', answer: 'text', why: { en: 'The program code is the **text section**.', ar: 'كود البرنامج هو الـ **text section**.' } },
  { id: 'pid', label: 'Process ID (pid)', answer: 'pcb', why: { en: 'The pid is the “process number” field of the **PCB** — not stack data.', ar: 'الـ pid هو خانة “process number” في الـ **PCB** — مش داتا في الـ stack.' } },
  { id: 'local', label: 'int i; inside a function', answer: 'stack', why: { en: 'A local variable is temporary data on the stack.', ar: 'الـ local variable داتا مؤقتة في الـ stack.' } },
  { id: 'pc', label: 'Program counter (saved on a switch)', answer: 'pcb', why: { en: 'The PC is current activity in the CPU; on a context switch it is saved in the **PCB**.', ar: 'الـ PC جزء من الـ current activity في الـ CPU؛ ووقت الـ context switch بيتحفظ في الـ **PCB**.' } },
]

export function ProcessMemoryVisual({ title, hint }: { title: LText; hint?: LText }) {
  const [selected, setSelected] = useState<string>(items[0].id)
  /** Every answered item is shown in its correct region; `ok` records the first guess. */
  const [placed, setPlaced] = useState<Record<string, { region: Region; ok: boolean }>>({})
  const [feedback, setFeedback] = useState<{ ok: boolean; text: LText } | null>(null)
  const item = items.find((entry) => entry.id === selected)
  const remaining = items.filter((entry) => !placed[entry.id])
  const correctCount = items.filter((entry) => placed[entry.id]?.ok).length

  const place = (region: Region) => {
    if (!item || placed[item.id]) return
    const ok = item.answer === region
    const answerLabel = regions.find((entry) => entry.id === item.answer)?.label ?? item.answer
    setPlaced((value) => ({ ...value, [item.id]: { region: item.answer, ok } }))
    setFeedback({
      ok,
      text: {
        en: `${ok ? 'Correct.' : `Not there — it belongs in **${answerLabel}**.`} ${item.why.en}`,
        ar: `${ok ? 'صح.' : `مش هنا — مكانه **${answerLabel}**.`} ${item.why.ar ?? ''}`,
      },
    })
    const next = items.find((entry) => entry.id !== item.id && !placed[entry.id])
    if (next) setSelected(next.id)
  }

  const reset = () => {
    setPlaced({})
    setFeedback(null)
    setSelected(items[0].id)
  }

  return (
    <VisualFrame title={title} hint={hint ?? { en: 'Pick an item, then the region it lives in.' }}>
      <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
        <div>
          <p className="font-mono text-[0.66rem] uppercase tracking-[0.14em] text-mist-500">Items · {remaining.length} left</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {items.map((entry) => {
              const done = Boolean(placed[entry.id])
              const right = Boolean(placed[entry.id]?.ok)
              return (
                <button
                  key={entry.id}
                  type="button"
                  disabled={done}
                  onClick={() => setSelected(entry.id)}
                  className={cn(
                    'rounded-lg border px-2.5 py-1.5 text-left font-mono text-[0.78rem] transition-all',
                    done
                      ? right
                        ? 'border-teal-neon/40 bg-teal-neon/10 text-teal-neon'
                        : 'border-rose-neon/40 bg-rose-neon/10 text-rose-neon'
                      : entry.id === selected
                        ? 'border-cyan-neon/60 bg-cyan-neon/15 text-mist-50 ring-2 ring-cyan-neon/30'
                        : 'border-line bg-ink-900/50 text-mist-200 hover:border-cyan-neon/40',
                  )}
                >
                  {done ? right ? <Check className="mr-1 inline h-3 w-3" aria-hidden="true" /> : <X className="mr-1 inline h-3 w-3" aria-hidden="true" /> : null}
                  {entry.label}
                </button>
              )
            })}
          </div>
          <div className="mt-4 min-h-[4.5rem] rounded-xl border border-cyan-neon/20 bg-cyan-neon/[0.035] p-3.5" aria-live="polite">
            {feedback ? (
              <BilingualProse text={feedback.text} className="text-[0.9rem]" />
            ) : remaining.length && item ? (
              <p className="text-[0.88rem] text-mist-300">
                Where does <strong className="font-mono text-mist-50">{item.label}</strong> live? Choose a region.
              </p>
            ) : null}
          </div>
          <div className="mt-3 flex items-center justify-between gap-2">
            <span className="badge badge-teal">
              {correctCount}/{items.length} correct
            </span>
            <button type="button" className="btn btn-ghost btn-sm" onClick={reset}>
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" /> Restart
            </button>
          </div>
        </div>

        <div className="flex gap-3">
          <div className="flex flex-col justify-between py-1 font-mono text-[0.66rem] text-mist-500" aria-hidden="true">
            <span>max</span>
            <span>0</span>
          </div>
          <div className="flex min-w-0 flex-1 flex-col gap-1.5">
            {regions.map((region) => {
              const inside = items.filter((entry) => placed[entry.id]?.region === region.id)
              const isPcb = region.id === 'pcb'
              return (
                <button
                  key={region.id}
                  type="button"
                  onClick={() => place(region.id)}
                  disabled={!item || Boolean(placed[item.id]) || remaining.length === 0}
                  className={cn(
                    'rounded-xl border px-3 py-2.5 text-left transition-all hover:-translate-y-0.5 disabled:hover:translate-y-0',
                    region.tone,
                    region.ring,
                    isPcb && 'mt-3 border-dashed',
                    region.id === 'stack' && 'min-h-[4.2rem]',
                  )}
                >
                  <span className="flex items-baseline justify-between gap-2">
                    <span className="font-display text-[0.98rem] font-semibold">{region.label}</span>
                    <span className="font-mono text-[0.66rem] text-mist-500">{region.sub}</span>
                  </span>
                  {inside.length ? (
                    <span className="mt-1.5 flex flex-wrap gap-1">
                      {inside.map((entry) => (
                        <span key={entry.id} className="rounded-md bg-ink-950/60 px-1.5 py-0.5 font-mono text-[0.68rem] text-mist-200">
                          {entry.label}
                        </span>
                      ))}
                    </span>
                  ) : null}
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </VisualFrame>
  )
}
