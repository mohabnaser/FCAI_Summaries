import { useState } from 'react'
import { Minus, Plus, RotateCcw } from 'lucide-react'
import type { LText } from '../../../types'
import { BilingualProse } from '../../ui/Text'
import { cn } from '../../../lib/cn'
import { VisualFrame } from '../VisualFrame'

const BUFFER_SIZE = 10

interface BufferState {
  slots: Array<number | null>
  in: number
  out: number
  produced: number
}

const initial: BufferState = { slots: Array(BUFFER_SIZE).fill(null), in: 0, out: 0, produced: 0 }

export function BoundedBufferVisual({ title, hint }: { title: LText; hint?: LText }) {
  const [buffer, setBuffer] = useState<BufferState>(initial)
  const [message, setMessage] = useState<LText>({
    en: 'Empty buffer: **in == out == 0**. Produce a few items.',
    ar: 'الـ buffer فاضي: **in == out == 0**. اعمل produce لكام عنصر.',
  })
  const count = (buffer.in - buffer.out + BUFFER_SIZE) % BUFFER_SIZE
  const full = (buffer.in + 1) % BUFFER_SIZE === buffer.out
  const empty = buffer.in === buffer.out

  const produce = () => {
    if (full) {
      setMessage({
        en: `**(in + 1) % BUFFER_SIZE == out** → (${buffer.in} + 1) % 10 = ${(buffer.in + 1) % BUFFER_SIZE} == ${buffer.out}. The producer spins: “do nothing — no free buffers”. One slot is still empty, yet the buffer counts as full.`,
        ar: `**(in + 1) % BUFFER_SIZE == out** ← (${buffer.in} + 1) % 10 = ${(buffer.in + 1) % BUFFER_SIZE} == ${buffer.out}. الـ producer بيلف في الـ loop: “do nothing — no free buffers”. لسه فيه خانة فاضية، بس الـ buffer بيتحسب مليان.`,
      })
      return
    }
    const item = buffer.produced + 1
    const slots = [...buffer.slots]
    slots[buffer.in] = item
    const nextIn = (buffer.in + 1) % BUFFER_SIZE
    setBuffer({ ...buffer, slots, in: nextIn, produced: item })
    setMessage({
      en: `buffer[${buffer.in}] = item ${item}; in = (${buffer.in} + 1) % 10 = **${nextIn}**.`,
      ar: `buffer[${buffer.in}] = item ${item}؛ و in = (${buffer.in} + 1) % 10 = **${nextIn}**.`,
    })
  }

  const consume = () => {
    if (empty) {
      setMessage({
        en: `**in == out** (${buffer.in} == ${buffer.out}). The consumer spins: “do nothing — empty buffers”.`,
        ar: `**in == out** (${buffer.in} == ${buffer.out}). الـ consumer بيلف في الـ loop: “do nothing — empty buffers”.`,
      })
      return
    }
    const item = buffer.slots[buffer.out]
    const slots = [...buffer.slots]
    slots[buffer.out] = null
    const nextOut = (buffer.out + 1) % BUFFER_SIZE
    setBuffer({ ...buffer, slots, out: nextOut })
    setMessage({
      en: `next_consumed = buffer[${buffer.out}] (item ${item}); out = (${buffer.out} + 1) % 10 = **${nextOut}**.`,
      ar: `next_consumed = buffer[${buffer.out}] (item ${item})؛ و out = (${buffer.out} + 1) % 10 = **${nextOut}**.`,
    })
  }

  return (
    <VisualFrame title={title} hint={hint ?? { en: 'Produce and consume.' }}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="badge">BUFFER_SIZE = {BUFFER_SIZE}</span>
        <span className={cn('badge', full ? 'badge-amber' : 'badge-teal')}>
          {count} item{count === 1 ? '' : 's'} · max {BUFFER_SIZE - 1}
        </span>
      </div>

      <div className="mt-4 grid grid-cols-10 gap-1 sm:gap-1.5" aria-label="Buffer slots">
        {buffer.slots.map((slot, index) => (
          <div key={index} className="flex flex-col items-center gap-1">
            <span className="font-mono text-[0.62rem] text-mist-500">{index}</span>
            <div
              className={cn(
                'flex aspect-square w-full max-w-16 items-center justify-center rounded-lg border font-mono text-[0.78rem] font-bold transition-all duration-300 sm:text-[0.9rem]',
                slot !== null
                  ? 'scale-100 border-cyan-neon/50 bg-cyan-neon/15 text-mist-50'
                  : 'border-line-soft bg-ink-950/50 text-mist-600',
              )}
            >
              {slot ?? '·'}
            </div>
            <span className="flex h-8 flex-col items-center font-mono text-[0.6rem] font-bold leading-tight">
              {buffer.in === index ? <span className="text-amber-neon">in</span> : null}
              {buffer.out === index ? <span className="text-teal-neon">out</span> : null}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-2 grid gap-2 sm:grid-cols-2">
        <div className={cn('rounded-xl border px-3 py-2 font-mono text-[0.74rem]', full ? 'border-amber-neon/50 bg-amber-neon/10 text-amber-neon' : 'border-line-soft text-mist-400')}>
          full? (in + 1) % 10 == out → {String(full)}
        </div>
        <div className={cn('rounded-xl border px-3 py-2 font-mono text-[0.74rem]', empty ? 'border-teal-neon/50 bg-teal-neon/10 text-teal-neon' : 'border-line-soft text-mist-400')}>
          empty? in == out → {String(empty)}
        </div>
      </div>

      <div className="mt-3 min-h-[3.5rem] rounded-xl border border-cyan-neon/20 bg-cyan-neon/[0.035] p-3.5" aria-live="polite">
        <BilingualProse text={message} className="text-[0.92rem]" />
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        <button type="button" className="btn btn-primary btn-sm" onClick={produce}>
          <Plus className="h-3.5 w-3.5" aria-hidden="true" /> Produce
        </button>
        <button type="button" className="btn btn-secondary btn-sm" onClick={consume}>
          <Minus className="h-3.5 w-3.5" aria-hidden="true" /> Consume
        </button>
        <button
          type="button"
          className="btn btn-ghost btn-sm"
          onClick={() => {
            setBuffer(initial)
            setMessage({ en: 'Reset: in = out = 0.', ar: 'Reset: in = out = 0.' })
          }}
        >
          <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" /> Reset
        </button>
      </div>
    </VisualFrame>
  )
}
