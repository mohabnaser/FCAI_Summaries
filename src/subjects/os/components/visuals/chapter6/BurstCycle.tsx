import { useState } from 'react'
import type { LText } from '../../../types'
import { BilingualProse } from '../../ui/Text'
import { cn } from '../../../lib/cn'
import { VisualFrame } from '../VisualFrame'

type Kind = 'io' | 'cpu'

/** Burst-duration histogram, read off the lecture's frequency curve (ms → frequency). */
const curve: Array<[number, number]> = [
  [0, 18], [1, 95], [2, 152], [3, 130], [4, 82], [5, 48], [6, 30], [7, 21], [8, 15], [10, 11], [12, 9], [16, 6], [20, 5], [24, 4], [28, 3], [32, 2], [36, 2], [40, 1],
]

/** One program as an alternating sequence of CPU and I/O bursts (time units). */
const programs: Record<Kind, { label: string; bursts: Array<{ type: 'cpu' | 'io'; length: number }>; note: LText }> = {
  io: {
    label: 'I/O-bound program',
    bursts: [
      { type: 'cpu', length: 1 }, { type: 'io', length: 4 }, { type: 'cpu', length: 2 }, { type: 'io', length: 5 },
      { type: 'cpu', length: 1 }, { type: 'io', length: 4 }, { type: 'cpu', length: 1 }, { type: 'io', length: 5 },
      { type: 'cpu', length: 2 }, { type: 'io', length: 4 }, { type: 'cpu', length: 1 },
    ],
    note: {
      en: 'An **I/O-bound** program (an editor, a shell) spends most of its time waiting for I/O, so it has **many very short CPU bursts**. They make up the tall peak on the left of the histogram.',
      ar: 'البرنامج الـ **I/O-bound** (زي editor أو shell) بيقضي أغلب وقته مستني I/O، فعنده **CPU bursts كتير جدًا وقصيرة جدًا**. ودول القمة العالية على شمال الـ histogram.',
    },
  },
  cpu: {
    label: 'CPU-bound program',
    bursts: [
      { type: 'cpu', length: 12 }, { type: 'io', length: 2 }, { type: 'cpu', length: 14 }, { type: 'io', length: 2 }, { type: 'cpu', length: 6 },
    ],
    note: {
      en: 'A **CPU-bound** program (a long computation) has **a few very long CPU bursts** — the thin tail on the right of the histogram.',
      ar: 'البرنامج الـ **CPU-bound** (حسابات طويلة) عنده **شوية CPU bursts طويلة جدًا** — الذيل الرفيع على يمين الـ histogram.',
    },
  },
}

const X = (ms: number) => 44 + (ms / 40) * 520
const Y = (freq: number) => 196 - (freq / 160) * 170

export function CpuIoBurstsVisual({ title, hint }: { title: LText; hint?: LText }) {
  const [kind, setKind] = useState<Kind>('io')
  const program = programs[kind]
  const total = program.bursts.reduce((sum, burst) => sum + burst.length, 0)
  const path = curve.map(([ms, freq], index) => `${index ? 'L' : 'M'} ${X(ms).toFixed(1)} ${Y(freq).toFixed(1)}`).join(' ')
  const highlight = kind === 'io' ? { from: 0, to: 8 } : { from: 8, to: 40 }

  return (
    <VisualFrame title={title} hint={hint ?? { en: 'Switch between the two kinds of program.' }}>
      <svg viewBox="0 0 580 228" className="w-full" role="img" aria-label="Histogram of CPU-burst durations: very many short bursts, few long ones">
        <rect
          x={X(highlight.from)}
          y={22}
          width={X(highlight.to) - X(highlight.from)}
          height={174}
          rx={6}
          style={{ fill: kind === 'io' ? 'color-mix(in srgb, var(--color-cyan-neon) 10%, transparent)' : 'color-mix(in srgb, var(--color-amber-neon) 10%, transparent)', transition: 'all 300ms ease' }}
        />
        {[0, 40, 80, 120, 160].map((freq) => (
          <g key={freq}>
            <line x1={44} x2={564} y1={Y(freq)} y2={Y(freq)} strokeWidth={1} style={{ stroke: 'var(--color-line-soft)' }} />
            <text x={36} y={Y(freq) + 4} textAnchor="end" fontSize="11" fontFamily="var(--font-mono)" style={{ fill: 'var(--color-mist-500)' }}>
              {freq}
            </text>
          </g>
        ))}
        {[0, 8, 16, 24, 32, 40].map((ms) => (
          <text key={ms} x={X(ms)} y={214} textAnchor="middle" fontSize="11" fontFamily="var(--font-mono)" style={{ fill: 'var(--color-mist-500)' }}>
            {ms}
          </text>
        ))}
        <text x={564} y={226} textAnchor="end" fontSize="11" fontFamily="var(--font-mono)" style={{ fill: 'var(--color-mist-400)' }}>
          burst duration (ms)
        </text>
        <text x={8} y={14} fontSize="11" fontFamily="var(--font-mono)" style={{ fill: 'var(--color-mist-400)' }}>
          frequency
        </text>
        <path d={path} fill="none" strokeWidth={3} strokeLinejoin="round" style={{ stroke: 'var(--color-cyan-neon)' }} />
        <text x={X(3) + 14} y={Y(150)} fontSize="12" fontWeight={700} fontFamily="var(--font-sans)" style={{ fill: 'var(--color-mist-100)' }}>
          many short bursts
        </text>
        <text x={X(26)} y={Y(26)} textAnchor="middle" fontSize="12" fontWeight={700} fontFamily="var(--font-sans)" style={{ fill: 'var(--color-mist-300)' }}>
          few long bursts
        </text>
      </svg>

      <div className="mt-3 grid gap-2 sm:grid-cols-2" role="radiogroup" aria-label="Program type">
        {(['io', 'cpu'] as Kind[]).map((entry) => (
          <button
            key={entry}
            type="button"
            role="radio"
            aria-checked={entry === kind}
            onClick={() => setKind(entry)}
            className={cn(
              'rounded-xl border px-3 py-2 text-[0.86rem] font-semibold transition-all',
              entry === kind ? 'border-cyan-neon bg-cyan-neon/12 text-mist-50' : 'border-line bg-ink-850 text-mist-300 hover:border-cyan-neon/50',
            )}
          >
            {programs[entry].label}
          </button>
        ))}
      </div>

      <div className="mt-3">
        <div className="flex h-10 overflow-hidden rounded-lg border border-line" role="img" aria-label={`${program.label}: ${program.bursts.map((burst) => `${burst.type.toUpperCase()} ${burst.length}`).join(', ')}`}>
          {program.bursts.map((burst, index) => (
            <div
              key={index}
              className={cn(
                'flex items-center justify-center border-r border-ink-950/60 font-mono text-[0.68rem] font-bold last:border-r-0',
                burst.type === 'cpu' ? 'bg-cyan-neon/30 text-cyan-neon' : 'bg-[repeating-linear-gradient(135deg,transparent_0_6px,rgba(255,255,255,0.07)_6px_8px)] text-mist-500',
              )}
              style={{ width: `${(burst.length / total) * 100}%` }}
            >
              {burst.length >= 2 || burst.type === 'cpu' ? (burst.type === 'cpu' ? 'CPU' : 'I/O') : ''}
            </div>
          ))}
        </div>
        <div className="mt-1.5 flex flex-wrap gap-3 text-[0.74rem] text-mist-400">
          <span className="inline-flex items-center gap-1.5"><span className="h-2.5 w-4 rounded-sm bg-cyan-neon/40" aria-hidden="true" /> CPU burst</span>
          <span className="inline-flex items-center gap-1.5"><span className="h-2.5 w-4 rounded-sm border border-line bg-ink-800" aria-hidden="true" /> I/O burst (waiting)</span>
          <span>{program.bursts.filter((burst) => burst.type === 'cpu').length} CPU bursts</span>
        </div>
      </div>

      <div className="mt-3 rounded-xl border border-line bg-ink-850 p-3.5" aria-live="polite">
        <BilingualProse text={program.note} className="text-[0.92rem]" />
      </div>
    </VisualFrame>
  )
}
