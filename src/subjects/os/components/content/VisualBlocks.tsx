import { Fragment } from 'react'
import { Brain, Check, ChevronDown, ChevronRight, Sparkles, X } from 'lucide-react'
import type { Block, LText, Tone } from '../../types'
import { useLanguage } from '../../context/LanguageContext'
import { BilingualInline, BilingualProse, RichText } from '../ui/Text'
import { cn } from '../../lib/cn'
import { Icon, toneClasses, toneCycle } from './icons'

type BlockOf<K extends Block['kind']> = Extract<Block, { kind: K }>

function toneAt(tone: Tone | undefined, index: number): Tone {
  return tone ?? toneCycle[index % toneCycle.length]
}

/** Arabic explanation of an English heading, shown only in Arabic mode. */
function ArabicLine({ text, className }: { text?: LText; className?: string }) {
  const { isArabic } = useLanguage()
  if (!isArabic || !text?.ar) return null
  return (
    <p className={cn('arabic-note mt-1.5 text-[0.9rem]', className)} lang="ar" dir="rtl">
      <RichText text={text.ar} />
    </p>
  )
}

function BlockHeading({ title, intro, label }: { title?: LText; intro?: LText; label: string }) {
  if (!title && !intro) return null
  return (
    <header className="mb-4">
      <p className="vb-label">{label}</p>
      {title ? (
        <>
          <h3 className="concept-heading mt-1.5">
            <RichText text={title.en} />
          </h3>
          <ArabicLine text={title} />
        </>
      ) : null}
      {intro ? <BilingualProse text={intro} className="mt-2 max-w-[78ch] text-[0.98rem] text-mist-300" /> : null}
    </header>
  )
}

export function LeadBlock({ block }: { block: BlockOf<'lead'> }) {
  return (
    <div className="vb-lead">
      <BilingualProse text={block.text} />
    </div>
  )
}

const columnClass = {
  2: 'lg:grid-cols-2',
  3: 'lg:grid-cols-3',
  4: 'lg:grid-cols-4',
} as const

export function CardsBlock({ block }: { block: BlockOf<'cards'> }) {
  const columns = block.columns ?? (block.items.length >= 4 && block.items.length % 3 !== 0 ? 2 : 3)
  return (
    <section>
      <BlockHeading title={block.title} intro={block.intro} label="Concept map" />
      <ul className={cn('grid gap-3 sm:grid-cols-2', columnClass[columns])}>
        {block.items.map((item, index) => {
          const tone = toneClasses[toneAt(item.tone, index)]
          return (
            <li
              key={item.title}
              className={cn(
                'vb-card group relative flex flex-col overflow-hidden rounded-2xl border bg-ink-900/45 p-4 sm:p-5',
                tone.border,
              )}
            >
              <span className={cn('absolute inset-x-0 top-0 h-[3px] opacity-70', tone.solid)} aria-hidden="true" />
              <div className="flex items-start gap-3">
                {item.icon ? (
                  <span
                    className={cn(
                      'vb-icon flex h-11 w-11 flex-none items-center justify-center rounded-xl border',
                      tone.border,
                      tone.soft,
                      tone.text,
                      tone.glow,
                    )}
                  >
                    <Icon name={item.icon} className="h-5 w-5" />
                  </span>
                ) : null}
                <div className="min-w-0 flex-1">
                  {item.tag ? (
                    <p className={cn('font-mono text-[0.66rem] font-semibold uppercase tracking-[0.13em]', tone.text)}>
                      {item.tag}
                    </p>
                  ) : null}
                  <h4 className="font-display text-[1.1rem] font-semibold leading-snug text-mist-50">
                    <RichText text={item.title} />
                  </h4>
                </div>
              </div>
              <BilingualProse text={item.body} className="mt-3 text-[0.94rem] leading-relaxed text-mist-300" />
              {item.chips?.length ? (
                <div className="mt-auto flex flex-wrap gap-1.5 pt-3">
                  {item.chips.map((chip) => (
                    <span key={chip} className="vb-chip">
                      {chip}
                    </span>
                  ))}
                </div>
              ) : null}
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export function FlowBlock({ block }: { block: BlockOf<'flow'> }) {
  return (
    <section className="vb-panel">
      <BlockHeading title={block.title} label="Step by step" />
      <ol className="flex flex-col gap-2 lg:flex-row lg:items-stretch">
        {block.steps.map((step, index) => {
          const tone = toneClasses[toneAt(step.tone, index)]
          return (
            <Fragment key={step.label}>
              <li
                className={cn(
                  'relative flex min-w-0 flex-1 flex-col rounded-xl border bg-ink-950/45 p-3.5',
                  tone.border,
                )}
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className={cn(
                      'flex h-8 w-8 flex-none items-center justify-center rounded-lg font-mono text-[0.75rem] font-bold text-ink-950',
                      tone.solid,
                    )}
                  >
                    {step.icon ? <Icon name={step.icon} className="h-4 w-4" /> : index + 1}
                  </span>
                  <span className={cn('font-mono text-[0.62rem] font-semibold uppercase tracking-[0.12em]', tone.text)}>
                    Step {index + 1}
                  </span>
                </div>
                <h4 className="mt-2.5 font-display text-[1rem] font-semibold leading-snug text-mist-50">
                  <RichText text={step.label} />
                </h4>
                {step.detail ? (
                  <BilingualProse text={step.detail} className="mt-1.5 text-[0.86rem] leading-relaxed text-mist-300" />
                ) : null}
              </li>
              {index < block.steps.length - 1 ? (
                <li aria-hidden="true" className="flex flex-none items-center justify-center text-mist-500">
                  <ChevronDown className="h-5 w-5 lg:hidden" />
                  <ChevronRight className="hidden h-5 w-5 lg:block" />
                </li>
              ) : null}
            </Fragment>
          )
        })}
      </ol>
      {block.caption ? (
        <BilingualProse text={block.caption} className="mt-4 text-[0.9rem] text-mist-400" />
      ) : null}
    </section>
  )
}

export function LayersBlock({ block }: { block: BlockOf<'layers'> }) {
  return (
    <section className="vb-panel">
      <BlockHeading title={block.title} label="Layered view" />
      <div className={cn('grid gap-3', block.axis && 'grid-cols-[auto_minmax(0,1fr)]')}>
        {block.axis ? (
          <div className="flex flex-col items-center py-1 font-mono text-[0.7rem] text-mist-400" aria-hidden="true">
            <span>{block.axis.top}</span>
            <span className="my-1.5 w-px flex-1 bg-gradient-to-b from-cyan-neon/60 to-violet-neon/50" />
            <span>{block.axis.bottom}</span>
          </div>
        ) : null}
        <ol className="space-y-2">
          {block.layers.map((layer, index) => {
            const tone = toneClasses[toneAt(layer.tone, index)]
            return (
              <li
                key={layer.label}
                className={cn(
                  'flex flex-col gap-2 rounded-xl border border-s-4 px-4 py-3 sm:flex-row sm:items-center sm:justify-between',
                  tone.border,
                  tone.soft,
                )}
              >
                <div className="flex min-w-0 items-start gap-3">
                  {layer.icon ? (
                    <span className={cn('mt-0.5 flex-none', tone.text)}>
                      <Icon name={layer.icon} className="h-5 w-5" />
                    </span>
                  ) : null}
                  <div className="min-w-0">
                    <p className="font-display text-[1.02rem] font-semibold text-mist-50">
                      <RichText text={layer.label} />
                    </p>
                    {layer.detail ? (
                      <BilingualProse text={layer.detail} className="mt-0.5 text-[0.88rem] text-mist-300" />
                    ) : null}
                  </div>
                </div>
                {layer.chips?.length ? (
                  <div className="flex flex-wrap gap-1.5 sm:max-w-[45%] sm:justify-end">
                    {layer.chips.map((chip) => (
                      <span key={chip} className="vb-chip">
                        {chip}
                      </span>
                    ))}
                  </div>
                ) : null}
              </li>
            )
          })}
        </ol>
      </div>
      {block.caption ? (
        <BilingualProse text={block.caption} className="mt-4 text-[0.9rem] text-mist-400" />
      ) : null}
    </section>
  )
}

export function VersusBlock({ block }: { block: BlockOf<'versus'> }) {
  const left = toneClasses[block.left.tone ?? 'cyan']
  const right = toneClasses[block.right.tone ?? 'violet']
  const sides = [
    { side: block.left, tone: left },
    { side: block.right, tone: right },
  ]
  return (
    <section className="vb-panel">
      <BlockHeading title={block.title} label="Side by side" />
      <div className="hidden gap-3 md:grid md:grid-cols-[11rem_minmax(0,1fr)_minmax(0,1fr)]">
        <span />
        {sides.map(({ side, tone }) => (
          <div key={side.title} className={cn('rounded-xl border px-4 py-3', tone.border, tone.soft)}>
            <p className={cn('flex items-center gap-2 font-display text-[1.12rem] font-semibold', tone.text)}>
              <Icon name={side.icon} className="h-5 w-5" />
              {side.title}
            </p>
            {side.tagline ? <BilingualProse text={side.tagline} className="mt-1 text-[0.86rem] text-mist-300" /> : null}
          </div>
        ))}
      </div>
      <dl className="mt-2 divide-y divide-line-soft/70">
        {block.rows.map((row) => (
          <div key={row.aspect} className="grid gap-2 py-3 md:grid-cols-[11rem_minmax(0,1fr)_minmax(0,1fr)] md:gap-3">
            <dt className="font-mono text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-mist-400 md:pt-1">
              {row.aspect}
            </dt>
            {[
              { text: row.left, ...sides[0] },
              { text: row.right, ...sides[1] },
            ].map(({ text, side, tone }) => (
              <dd key={side.title} className="flex items-start gap-2.5 text-[0.95rem] leading-relaxed text-mist-200">
                <span className={cn('mt-[0.55em] h-2 w-2 flex-none rounded-full', tone.solid)} aria-hidden="true" />
                <span className="min-w-0">
                  <span className={cn('me-1.5 font-semibold md:hidden', tone.text)}>{side.title}:</span>
                  <BilingualInline text={text} />
                </span>
              </dd>
            ))}
          </div>
        ))}
      </dl>
      {block.verdict ? (
        <div className="mt-3 flex items-start gap-3 rounded-xl border border-amber-neon/25 bg-amber-neon/[0.05] px-4 py-3">
          <Sparkles className="mt-1 h-4 w-4 flex-none text-amber-neon" aria-hidden="true" />
          <div className="min-w-0">
            <p className="font-mono text-[0.66rem] font-semibold uppercase tracking-[0.13em] text-amber-neon">
              Bottom line
            </p>
            <BilingualProse text={block.verdict} className="mt-1 text-[0.96rem]" />
          </div>
        </div>
      ) : null}
    </section>
  )
}

export function StatsBlock({ block }: { block: BlockOf<'stats'> }) {
  return (
    <section>
      <BlockHeading title={block.title} label="Numbers to remember" />
      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {block.items.map((item, index) => {
          const tone = toneClasses[toneAt(item.tone, index)]
          return (
            <li key={item.value + index} className={cn('rounded-2xl border bg-ink-900/45 p-4', tone.border)}>
              <div className="flex items-center justify-between gap-2">
                <p className={cn('font-display text-[1.9rem] font-bold leading-none tracking-tight', tone.text)}>
                  {item.value}
                </p>
                <Icon name={item.icon} className={cn('h-5 w-5 opacity-70', tone.text)} />
              </div>
              <BilingualProse text={item.label} className="mt-2.5 text-[0.9rem] leading-snug text-mist-300" />
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export function HookBlock({ block }: { block: BlockOf<'hook'> }) {
  return (
    <section className="vb-hook">
      <div className="flex items-center gap-2">
        <Brain className="h-4 w-4 text-violet-neon" aria-hidden="true" />
        <p className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-violet-neon">
          Memory hook
        </p>
      </div>
      <h3 className="mt-2 font-display text-[1.15rem] font-semibold text-mist-50">
        <RichText text={block.title.en} />
      </h3>
      <ArabicLine text={block.title} />
      <p className="vb-hook-phrase mt-3 font-display text-[1.45rem] font-bold leading-tight tracking-tight text-violet-100 sm:text-[1.7rem]">
        “<RichText text={block.phrase} />”
      </p>
      {block.letters?.length ? (
        <ul className="mt-4 flex flex-wrap gap-2">
          {block.letters.map((entry) => (
            <li
              key={entry.letter + entry.word}
              className="flex items-center gap-2.5 rounded-xl border border-violet-neon/30 bg-ink-950/45 py-1.5 pe-3.5 ps-1.5"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-neon font-display text-[1.15rem] font-bold text-ink-950">
                {entry.letter}
              </span>
              <span className="text-[0.92rem] font-medium text-mist-100">{entry.word}</span>
            </li>
          ))}
        </ul>
      ) : null}
      {block.body ? <BilingualProse text={block.body} className="mt-3.5 text-[0.95rem] text-mist-300" /> : null}
    </section>
  )
}

export function ConfusionsBlock({ block }: { block: BlockOf<'confusions'> }) {
  return (
    <section>
      <BlockHeading title={block.title ?? { en: 'Say this, not that' }} label="Common confusions" />
      <ul className="space-y-2.5">
        {block.items.map((item, index) => (
          <li key={index} className="grid gap-2 md:grid-cols-2">
            <div className="flex items-start gap-3 rounded-xl border border-rose-neon/25 bg-rose-neon/[0.045] px-4 py-3">
              <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-md bg-rose-neon/15 text-rose-neon">
                <X className="h-3.5 w-3.5" aria-hidden="true" />
              </span>
              <div className="min-w-0 text-[0.94rem] leading-relaxed text-mist-300">
                <span className="sr-only">Don’t say: </span>
                <BilingualInline text={item.wrong} />
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-xl border border-teal-neon/25 bg-teal-neon/[0.045] px-4 py-3">
              <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-md bg-teal-neon/15 text-teal-neon">
                <Check className="h-3.5 w-3.5" aria-hidden="true" />
              </span>
              <div className="min-w-0 text-[0.94rem] leading-relaxed text-mist-100">
                <span className="sr-only">Say instead: </span>
                <BilingualInline text={item.right} />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

export function RecapBlock({ block }: { block: BlockOf<'recap'> }) {
  return (
    <section className="rounded-2xl border border-teal-neon/25 bg-gradient-to-br from-teal-neon/[0.06] via-ink-900/40 to-ink-950/60 p-5 sm:p-6">
      <p className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-teal-neon">Recap</p>
      <h3 className="mt-1.5 font-display text-[1.2rem] font-semibold text-mist-50">
        <RichText text={block.title?.en ?? 'Remember this part in 30 seconds'} />
      </h3>
      <ArabicLine text={block.title} />
      <ul className="mt-4 grid gap-2.5 md:grid-cols-2">
        {block.items.map((item, index) => (
          <li key={index} className="flex items-start gap-3 rounded-xl bg-ink-950/35 px-3.5 py-2.5">
            <span
              className="vb-tick mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-md border border-teal-neon/40 bg-teal-neon/10"
              style={{ animationDelay: `${index * 90}ms` }}
            >
              <Check className="h-3 w-3 text-teal-neon" aria-hidden="true" />
            </span>
            <span className="text-[0.94rem] leading-relaxed text-mist-200">
              <BilingualInline text={item} />
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}
