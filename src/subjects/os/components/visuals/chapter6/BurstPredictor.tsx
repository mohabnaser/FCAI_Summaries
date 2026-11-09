import { useState } from 'react'
import type { LText } from '../../../types'
import { fmt, predictBursts } from '../../../lib/scheduling'
import { BilingualProse } from '../../ui/Text'
import { cn } from '../../../lib/cn'
import { VisualFrame } from '../VisualFrame'

const ALPHAS = [0, 0.25, 0.5, 0.75, 1]
const DEFAULT_BURSTS = [6, 4, 6, 4, 13, 13, 13]

const alphaNote: Record<string, LText> = {
  '0': {
    en: '**α = 0:** τ(n+1) = τ(n). Recent history does not count — the guess never moves from τ0.',
    ar: '**α = 0:** τ(n+1) = τ(n). التاريخ القريب مالهوش أي وزن — التخمين عمره ما يتحرك من τ0.',
  },
  '1': {
    en: '**α = 1:** τ(n+1) = t(n). Only the actual last CPU burst counts — the guess just copies it, one step late.',
    ar: '**α = 1:** τ(n+1) = t(n). آخر CPU burst حقيقي هو بس اللي بيتحسب — التخمين بينسخه متأخر خطوة.',
  },
  mid: {
    en: 'Between the two, older bursts still count but with weights (1 − α)^j that **shrink** the further back they are. With α = ½ the guess reacts quickly yet smoothly.',
    ar: 'في النص، الـ bursts القديمة لسه بتتحسب بس بأوزان (1 − α)^j بتـ**صغر** كل ما ترجع لورا. ومع α = ½ التخمين بيستجيب بسرعة وبنعومة.',
  },
}

export function BurstPredictorVisual({ title, hint }: { title: LText; hint?: LText }) {
  const [alpha, setAlpha] = useState(0.5)
  const [tau0, setTau0] = useState(10)
  const [bursts, setBursts] = useState(DEFAULT_BURSTS)
  const [focus, setFocus] = useState(1)
  const guesses = predictBursts(bursts, alpha, tau0)
  const n = bursts.length
  const max = Math.max(14, ...bursts, tau0) + 1
  const X = (i: number) => 40 + (i / n) * 520
  const Y = (v: number) => 180 - (v / max) * 160
  const step = bursts.flatMap((burst, i) => [`${i ? 'L' : 'M'} ${X(i)} ${Y(burst)}`, `L ${X(i + 1)} ${Y(burst)}`]).join(' ')
  const guessPath = guesses.slice(0, n + 1).map((guess, i) => `${i ? 'L' : 'M'} ${X(i) + 520 / n / 2} ${Y(guess)}`).join(' ')
  const f = Math.min(Math.max(1, focus), n)
  const note = alpha === 0 ? alphaNote['0'] : alpha === 1 ? alphaNote['1'] : alphaNote.mid

  return (
    <VisualFrame title={title} hint={hint ?? { en: 'Change α, then click a column to see how its guess is computed.' }}>
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-mist-500">α</span>
        <div role="radiogroup" aria-label="Alpha" className="flex flex-wrap gap-1.5">
          {ALPHAS.map((value) => (
            <button
              key={value}
              type="button"
              role="radio"
              aria-checked={value === alpha}
              onClick={() => setAlpha(value)}
              className={cn(
                'rounded-lg border px-2.5 py-1 font-mono text-[0.82rem] font-semibold transition-all',
                value === alpha ? 'border-cyan-neon bg-cyan-neon/15 text-mist-50' : 'border-line bg-ink-850 text-mist-300 hover:border-cyan-neon/50',
              )}
            >
              {value === 0.5 ? '½' : value}
            </button>
          ))}
        </div>
        <label className="ms-auto flex items-center gap-1.5 text-[0.8rem] text-mist-400">
          τ0 =
          <input
            type="number"
            min={0}
            max={30}
            value={tau0}
            onChange={(event) => setTau0(Math.max(0, Math.min(30, Number(event.target.value) || 0)))}
            className="w-14 rounded-md border border-line bg-ink-950/60 px-1.5 py-1 text-center font-mono text-mist-50"
            aria-label="Initial guess tau zero"
          />
        </label>
      </div>

      <svg viewBox="0 0 580 210" className="mt-3 w-full" role="img" aria-label={`Actual bursts ${bursts.join(', ')}; guesses ${guesses.map((g) => fmt(g)).join(', ')}`}>
        {[0, 4, 8, 12].filter((v) => v < max).map((v) => (
          <g key={v}>
            <line x1={40} x2={560} y1={Y(v)} y2={Y(v)} strokeWidth={1} style={{ stroke: 'var(--color-line-soft)' }} />
            <text x={32} y={Y(v) + 4} textAnchor="end" fontSize="11" fontFamily="var(--font-mono)" style={{ fill: 'var(--color-mist-500)' }}>{v}</text>
          </g>
        ))}
        {bursts.map((_, i) => (
          <rect
            key={i}
            x={X(i)}
            y={14}
            width={520 / n}
            height={170}
            onClick={() => setFocus(i + 1)}
            style={{ fill: i + 1 === f ? 'color-mix(in srgb, var(--color-cyan-neon) 9%, transparent)' : 'transparent', cursor: 'pointer' }}
          />
        ))}
        <path d={step} fill="none" strokeWidth={2.4} style={{ stroke: 'var(--color-mist-200)' }} />
        <path d={guessPath} fill="none" strokeWidth={3} strokeLinejoin="round" style={{ stroke: 'var(--color-cyan-neon)' }} />
        {guesses.slice(0, n + 1).map((guess, i) => (
          <circle key={i} cx={X(i) + 520 / n / 2} cy={Y(guess)} r={4} style={{ fill: 'var(--color-cyan-neon)' }} />
        ))}
        <text x={560} y={204} textAnchor="end" fontSize="11" fontFamily="var(--font-mono)" style={{ fill: 'var(--color-mist-400)' }}>time →</text>
      </svg>
      <div className="flex flex-wrap gap-3 text-[0.74rem] text-mist-400">
        <span className="inline-flex items-center gap-1.5"><span className="h-0.5 w-5 bg-mist-200" aria-hidden="true" /> actual CPU burst t(i)</span>
        <span className="inline-flex items-center gap-1.5"><span className="h-0.5 w-5 bg-cyan-neon" aria-hidden="true" /> guess τ(i)</span>
      </div>

      <div className="mt-3 overflow-x-auto rounded-xl border border-line">
        <table className="w-full min-w-[30rem] border-collapse text-center font-mono text-[0.84rem]">
          <tbody>
            <tr className="border-b border-line-soft">
              <th scope="row" className="bg-ink-800/80 px-2 py-1.5 text-left text-[0.72rem] text-mist-400">CPU burst (tᵢ)</th>
              {bursts.map((burst, i) => (
                <td key={i} className={cn('px-1 py-1', i + 1 === f && 'bg-cyan-neon/[0.08]')}>
                  <input
                    type="number"
                    min={1}
                    max={30}
                    value={burst}
                    aria-label={`Actual burst ${i}`}
                    onChange={(event) => {
                      const value = Math.max(1, Math.min(30, Number(event.target.value) || 1))
                      setBursts((list) => list.map((b, j) => (j === i ? value : b)))
                    }}
                    className="w-11 rounded border border-line bg-ink-950/60 py-0.5 text-center text-mist-50"
                  />
                </td>
              ))}
              <td className="px-2 text-mist-500">…</td>
            </tr>
            <tr>
              <th scope="row" className="bg-ink-800/80 px-2 py-1.5 text-left text-[0.72rem] text-mist-400">“guess” (τᵢ)</th>
              {guesses.map((guess, i) => (
                <td key={i} className={cn('px-1 py-1.5 text-cyan-neon', i === f && 'bg-cyan-neon/[0.12] font-bold')}>
                  <button type="button" onClick={() => setFocus(Math.max(1, i))} className="w-full">{fmt(guess)}</button>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-3 rounded-xl border border-cyan-neon/25 bg-cyan-neon/[0.04] p-3.5 font-mono text-[0.86rem] text-mist-100" aria-live="polite">
        τ{f} = α·t{f - 1} + (1 − α)·τ{f - 1} = {alpha}·{bursts[f - 1]} + {fmt(1 - alpha)}·{fmt(guesses[f - 1])} ={' '}
        <strong className="text-cyan-neon">{fmt(guesses[f])}</strong>
      </div>
      <div className="mt-2 rounded-xl border border-line bg-ink-850 p-3.5">
        <BilingualProse text={note} className="text-[0.9rem]" />
      </div>
      <button type="button" className="btn btn-ghost btn-sm mt-3" onClick={() => { setBursts(DEFAULT_BURSTS); setTau0(10); setAlpha(0.5); setFocus(1) }}>
        Reset to the lecture values
      </button>
    </VisualFrame>
  )
}
