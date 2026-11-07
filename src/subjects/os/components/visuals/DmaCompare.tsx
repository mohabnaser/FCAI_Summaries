import { useEffect, useState } from 'react'
import { Cpu, MemoryStick, Pause, Play, RotateCcw, Zap } from 'lucide-react'
import type { LText } from '../../types'
import { BilingualProse } from '../ui/Text'
import { cn } from '../../lib/cn'
import { VisualFrame } from './VisualFrame'

type Mode = 'byte' | 'dma'
const BYTES = 16

const copy: Record<Mode, { label: string; summary: LText }> = {
  byte: {
    label: 'Interrupt per byte',
    summary: {
      en: 'Without DMA, the controller interrupts the CPU **for every byte** and the CPU itself moves each one into memory. Fine for slow devices; hopeless at disk speed.',
      ar: 'من غير DMA، الـ controller بيعمل interrupt للـ CPU **مع كل byte** والـ CPU نفسها بتنقل كل byte للـ memory. ماشي مع الأجهزة البطيئة؛ لكن مستحيل بسرعة الـ disk.',
    },
  },
  dma: {
    label: 'DMA block transfer',
    summary: {
      en: 'With **DMA**, the device controller transfers the **whole block from its buffer directly to main memory without CPU intervention**, and raises **only one interrupt per block**. The CPU keeps running other work.',
      ar: 'مع الـ **DMA**، الـ device controller بينقل **الـ block كله من الـ buffer بتاعه للـ main memory مباشرة من غير تدخل الـ CPU**، وبيعمل **interrupt واحد بس لكل block**. والـ CPU تفضل شغالة في حاجة تانية.',
    },
  },
}

export function DmaCompareVisual({ title, hint }: { title: LText; hint?: LText }) {
  const [mode, setMode] = useState<Mode>('byte')
  const [moved, setMoved] = useState(0)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    if (!playing) return
    const timer = window.setInterval(() => {
      setMoved((value) => Math.min(BYTES, value + 1))
    }, mode === 'byte' ? 320 : 120)
    return () => window.clearInterval(timer)
  }, [playing, mode])

  const done = moved >= BYTES

  useEffect(() => {
    if (done) setPlaying(false)
  }, [done])
  const interrupts = mode === 'byte' ? moved : done ? 1 : 0
  const cpuText =
    mode === 'byte'
      ? moved === 0
        ? 'running a user process'
        : done
          ? 'back to the user process'
          : `handling interrupt #${moved}, copying byte ${moved}`
      : done
        ? 'one interrupt: “block done”'
        : moved === 0
          ? 'set up the transfer, then continue'
          : 'running a user process (free)'

  return (
    <VisualFrame title={title} hint={hint ?? { en: 'Pick a mode and press Transfer.' }}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="inline-flex rounded-lg border border-line-soft bg-ink-950/60 p-1" role="group" aria-label="Transfer mode">
          {(['byte', 'dma'] as Mode[]).map((candidate) => (
            <button
              key={candidate}
              type="button"
              onClick={() => {
                setMode(candidate)
                setMoved(0)
                setPlaying(false)
              }}
              aria-pressed={mode === candidate}
              className={cn(
                'rounded-md px-3 py-1 text-[0.78rem] font-semibold transition-colors',
                mode === candidate ? 'bg-cyan-neon/15 text-cyan-neon' : 'text-mist-400 hover:text-mist-100',
              )}
            >
              {copy[candidate].label}
            </button>
          ))}
        </div>
        <div className="flex gap-1.5">
          <span className="badge badge-amber">
            <Zap className="h-3 w-3" aria-hidden="true" /> {interrupts} CPU interrupt{interrupts === 1 ? '' : 's'}
          </span>
          <span className="badge">
            {moved}/{BYTES} bytes
          </span>
        </div>
      </div>

      <div className="mt-4 space-y-3 rounded-xl border border-line-soft bg-ink-950/50 p-3.5">
        <div
          className={cn(
            'flex items-center gap-2 rounded-lg border px-3 py-2',
            mode === 'byte' && moved > 0 && !done ? 'border-amber-neon/50 bg-amber-neon/[0.07]' : 'border-line-soft bg-ink-900/55',
          )}
          aria-live="polite"
        >
          <Cpu className="h-4 w-4 text-cyan-neon" aria-hidden="true" />
          <span className="font-mono text-[0.72rem] text-mist-200">CPU: {cpuText}</span>
        </div>

        {(['Controller buffer', 'Main memory'] as const).map((row) => (
          <div key={row} className="grid grid-cols-[7.5rem_minmax(0,1fr)] items-center gap-2">
            <span className="flex items-center gap-1.5 font-mono text-[0.66rem] uppercase text-mist-400">
              {row === 'Main memory' ? <MemoryStick className="h-3.5 w-3.5" aria-hidden="true" /> : null}
              {row}
            </span>
            <div className="grid grid-cols-8 gap-1 sm:grid-cols-16">
              {Array.from({ length: BYTES }, (_, index) => {
                const inMemory = index < moved
                const filled = row === 'Main memory' ? inMemory : !inMemory
                return (
                  <span
                    key={index}
                    className={cn(
                      'h-5 rounded-sm transition-colors duration-200',
                      filled ? (row === 'Main memory' ? 'bg-teal-neon/80' : 'bg-violet-neon/70') : 'bg-ink-800',
                    )}
                  />
                )
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 rounded-xl border border-cyan-neon/20 bg-cyan-neon/[0.035] p-3.5">
        <BilingualProse text={copy[mode].summary} className="text-[0.92rem]" />
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <button
          type="button"
          className="btn btn-primary btn-sm"
          onClick={() => {
            if (done) setMoved(0)
            setPlaying((value) => !value)
          }}
        >
          {playing ? <Pause className="h-3.5 w-3.5" aria-hidden="true" /> : <Play className="h-3.5 w-3.5" aria-hidden="true" />}
          {playing ? 'Pause' : done ? 'Replay' : 'Transfer 16 bytes'}
        </button>
        <button
          type="button"
          className="btn btn-secondary btn-sm"
          onClick={() => {
            setPlaying(false)
            setMoved(0)
          }}
        >
          <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" /> Reset
        </button>
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[26rem] text-left text-[0.82rem]">
          <caption className="mb-1.5 text-left font-mono text-[0.62rem] uppercase tracking-wider text-mist-500">
            Scale it up: interrupts needed to move one block
          </caption>
          <thead>
            <tr className="text-mist-400">
              <th className="py-1 font-medium">Block size</th>
              <th className="py-1 font-medium">One interrupt per byte</th>
              <th className="py-1 font-medium">DMA</th>
            </tr>
          </thead>
          <tbody className="font-mono text-mist-200">
            {[
              ['512 bytes', '512'],
              ['4 KB', '4,096'],
              ['64 KB', '65,536'],
            ].map(([size, count]) => (
              <tr key={size} className="border-t border-line-soft/70">
                <td className="py-1.5">{size}</td>
                <td className="py-1.5 text-amber-neon">{count}</td>
                <td className="py-1.5 text-teal-neon">1</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </VisualFrame>
  )
}
