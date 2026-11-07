import type { LText } from '../../types'
import { useLanguage } from '../../context/LanguageContext'
import { MousePointerClick, Sparkles } from 'lucide-react'
import { RichText } from '../ui/Text'

interface VisualFrameProps {
  title: LText
  hint?: LText
  children: React.ReactNode
  footer?: React.ReactNode
}

export function VisualFrame({ title, hint, children, footer }: VisualFrameProps) {
  const { isArabic } = useLanguage()
  return (
    <div className="panel overflow-hidden rounded-2xl">
      <div className="border-b border-line-soft bg-ink-900/38 px-5 py-4 sm:px-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 flex-none text-cyan-neon" aria-hidden="true" />
              <span className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-cyan-neon">
                Interactive visual
              </span>
            </div>
            <h3 className="mt-2 font-display text-xl font-semibold leading-snug tracking-tight text-mist-50 sm:text-[1.4rem]">
              <RichText text={title.en} />
            </h3>
            {isArabic && title.ar ? (
              <p className="arabic-note mt-2 text-[0.92rem]" lang="ar" dir="rtl">
                <RichText text={title.ar} />
              </p>
            ) : null}
          </div>
          {hint ? (
            <div className="hidden max-w-xs items-start gap-1.5 text-right text-[0.78rem] leading-relaxed text-mist-500 sm:flex">
              <MousePointerClick className="mt-0.5 h-4 w-4 flex-none" aria-hidden="true" />
              <span>
                <RichText text={hint.en} />
              </span>
            </div>
          ) : null}
        </div>
      </div>
      <div className="p-4 sm:p-6">{children}</div>
      {footer ? <div className="border-t border-line-soft px-5 py-3.5 sm:px-6">{footer}</div> : null}
    </div>
  )
}

export const visualTones = {
  cyan: {
    soft: 'border-cyan-neon/25 bg-cyan-neon/[0.07]',
    border: 'border-cyan-neon/45',
    text: 'text-cyan-neon',
    solid: 'bg-cyan-neon',
    faint: 'bg-cyan-neon/[0.045]',
  },
  teal: {
    soft: 'border-teal-neon/25 bg-teal-neon/[0.07]',
    border: 'border-teal-neon/45',
    text: 'text-teal-neon',
    solid: 'bg-teal-neon',
    faint: 'bg-teal-neon/[0.045]',
  },
  violet: {
    soft: 'border-violet-neon/25 bg-violet-neon/[0.07]',
    border: 'border-violet-neon/45',
    text: 'text-violet-neon',
    solid: 'bg-violet-neon',
    faint: 'bg-violet-neon/[0.045]',
  },
  amber: {
    soft: 'border-amber-neon/25 bg-amber-neon/[0.07]',
    border: 'border-amber-neon/45',
    text: 'text-amber-neon',
    solid: 'bg-amber-neon',
    faint: 'bg-amber-neon/[0.045]',
  },
  rose: {
    soft: 'border-rose-neon/25 bg-rose-neon/[0.07]',
    border: 'border-rose-neon/45',
    text: 'text-rose-neon',
    solid: 'bg-rose-neon',
    faint: 'bg-rose-neon/[0.045]',
  },
} as const

export type VisualTone = keyof typeof visualTones

export function StepControls({
  step,
  total,
  onPrev,
  onNext,
  onReset,
  playing,
  onTogglePlay,
  label = 'Step',
}: {
  step: number
  total: number
  onPrev: () => void
  onNext: () => void
  onReset: () => void
  playing?: boolean
  onTogglePlay?: () => void
  label?: string
}) {
  return (
    <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
      <div className="flex items-center gap-1.5">
        <button type="button" className="btn btn-secondary btn-sm" onClick={onPrev} disabled={step === 0}>
          Previous
        </button>
        <button
          type="button"
          className="btn btn-secondary btn-sm"
          onClick={onNext}
          disabled={step >= total - 1}
        >
          Next
        </button>
        {onTogglePlay ? (
          <button type="button" className="btn btn-secondary btn-sm" onClick={onTogglePlay}>
            {playing ? 'Pause' : 'Play'}
          </button>
        ) : null}
        <button type="button" className="btn btn-ghost btn-sm" onClick={onReset}>
          Reset
        </button>
      </div>
      <span className="font-mono text-[0.76rem] text-mist-500">
        {label} {step + 1} / {total}
      </span>
    </div>
  )
}
