import { useState } from 'react'
import { Highlight } from 'prism-react-renderer'
import { codeTheme, prismLanguage } from './highlight'
import {
  AlertTriangle,
  Bookmark,
  Check,
  CheckSquare,
  Copy,
  GraduationCap,
  Info,
  Lightbulb,
  Quote,
  Target,
} from 'lucide-react'
import type { Block, CalloutTone, LText } from '../../types'
import { BilingualInline, BilingualProse, RichText } from '../ui/Text'
import { VisualRenderer } from '../visuals/VisualRenderer'
import { exams } from '../../data/exams'
import { questionsById } from '../../data/questions'
import { useLanguage } from '../../context/LanguageContext'
import { cn } from '../../lib/cn'
import {
  CardsBlock,
  ConfusionsBlock,
  FlowBlock,
  HookBlock,
  LayersBlock,
  LeadBlock,
  RecapBlock,
  StatsBlock,
  VersusBlock,
} from './VisualBlocks'

/** Theme accent tokens for content-card visual variety — cycled via block index. */
const ACCENT_PALETTE = ['cyan', 'violet', 'amber', 'teal', 'rose', 'lime'] as const

/** Returns inline CSS custom properties that set the content-card accent colour from the theme. */
function accentVars(index: number): React.CSSProperties {
  const tone = ACCENT_PALETTE[index % ACCENT_PALETTE.length]
  return { '--_accent': `var(--color-${tone}-neon)` } as React.CSSProperties
}

const calloutStyles: Record<
  CalloutTone,
  { icon: typeof Info; border: string; bg: string; iconColor: string; label: string }
> = {
  exam: {
    icon: GraduationCap,
    border: 'border-amber-neon/30',
    bg: 'bg-amber-neon/[0.045]',
    iconColor: 'text-amber-neon',
    label: 'Exam focus',
  },
  warning: {
    icon: AlertTriangle,
    border: 'border-rose-neon/30',
    bg: 'bg-rose-neon/[0.04]',
    iconColor: 'text-rose-neon',
    label: 'Watch out',
  },
  insight: {
    icon: Lightbulb,
    border: 'border-violet-neon/30',
    bg: 'bg-violet-neon/[0.045]',
    iconColor: 'text-violet-neon',
    label: 'Insight',
  },
  misconception: {
    icon: Target,
    border: 'border-cyan-neon/25',
    bg: 'bg-cyan-neon/[0.035]',
    iconColor: 'text-cyan-neon',
    label: 'Misconception',
  },
  definition: {
    icon: Bookmark,
    border: 'border-teal-neon/30',
    bg: 'bg-teal-neon/[0.04]',
    iconColor: 'text-teal-neon',
    label: 'Definition',
  },
}

function ExamSourceChips({ refs }: { refs: string[] }) {
  const sources = refs.flatMap((ref) => {
    const question = questionsById.get(ref)
    return question ? question.sourceRefs : []
  })
  const unique = new Map<string, string>()
  for (const source of sources) {
    unique.set(
      `${source.examId}:${source.question}`,
      `${exams[source.examId].shortLabel} · ${source.question}`,
    )
  }
  if (unique.size === 0) return null
  return (
    <div className="mt-4 flex flex-wrap items-center gap-2">
      <span className="me-1 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-mist-500">
        Grounded in
      </span>
      {[...unique.values()].map((label) => (
        <span key={label} className="badge">
          {label}
        </span>
      ))}
    </div>
  )
}

function CodeBlock({ block }: { block: Extract<Block, { kind: 'code' }> }) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(block.code)
      setCopied(true)
    } catch {
      setCopied(false)
    }
  }

  return (
    <figure className="overflow-hidden rounded-2xl border border-line bg-ink-950/90 shadow-xl">
      <div className="flex items-center justify-between gap-3 border-b border-line-soft bg-ink-900/90 px-4 py-2.5">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          </div>
          <span className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-cyan-neon/90 font-semibold">
            {block.language}
          </span>
          {block.title ? (
            <span className="truncate text-[0.88rem] font-medium text-mist-200">{block.title}</span>
          ) : null}
        </div>
        <button type="button" className="btn btn-ghost btn-sm" onClick={copy} aria-live="polite">
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-teal-neon" aria-hidden="true" />
              Copied
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" aria-hidden="true" />
              Copy
            </>
          )}
        </button>
      </div>
      <Highlight theme={codeTheme} code={block.code} language={prismLanguage(block.language)}>
        {({ tokens, getLineProps, getTokenProps }) => (
          <pre dir="ltr" className="code-surface overflow-x-auto py-4 font-mono text-[0.875rem] leading-7">
            <code>
              {tokens.map((line, lineIndex) => {
                const { key: _lineKey, ...lineProps } = getLineProps({ line })
                return (
                  <div key={lineIndex} {...lineProps} className="flex px-5 hover:bg-cyan-neon/[0.05]">
                    <span className="mr-4 w-6 flex-none select-none text-right text-[0.72rem] leading-7 text-mist-600" aria-hidden="true">
                      {lineIndex + 1}
                    </span>
                    <span className="whitespace-pre">
                      {line.map((token, tokenIndex) => {
                        const { key: _tokenKey, ...tokenProps } = getTokenProps({ token })
                        return <span key={tokenIndex} {...tokenProps} />
                      })}
                    </span>
                  </div>
                )
              })}
            </code>
          </pre>
        )}
      </Highlight>
      {block.caption ? (
        <figcaption className="border-t border-line-soft px-5 py-3">
          <BilingualProse text={block.caption} className="text-[0.88rem]" />
        </figcaption>
      ) : null}
    </figure>
  )
}

function ArabicTitle({ title }: { title: LText }) {
  // The heading itself stays English in both modes; the explanation is extracted
  // from the same LText so authors do not have to duplicate it.
  const { isArabic } = useLanguage()
  if (!isArabic || !title.ar) return null
  return (
    <p className="arabic-note mt-2 text-[0.9rem]" lang="ar" dir="rtl">
      <RichText text={title.ar} />
    </p>
  )
}

function BlockTitle({ title, tag }: { title?: LText; tag?: string }) {
  if (!title) return null
  return (
    <div className="mb-4">
      <div className="flex items-center gap-2 mb-2">
        <span className="content-card-tag">{tag ?? 'Topic Concept'}</span>
      </div>
      <h3 className="concept-heading">
        <RichText text={title.en} />
      </h3>
      <ArabicTitle title={title} />
    </div>
  )
}

export function BlockRenderer({
  block,
  accentIndex = 0,
  partNumber,
}: {
  block: Block
  accentIndex?: number
  partNumber?: number
}) {
  switch (block.kind) {
    case 'lead':
      return <LeadBlock block={block} />
    case 'cards':
      return <CardsBlock block={block} />
    case 'flow':
      return <FlowBlock block={block} />
    case 'layers':
      return <LayersBlock block={block} />
    case 'versus':
      return <VersusBlock block={block} />
    case 'stats':
      return <StatsBlock block={block} />
    case 'hook':
      return <HookBlock block={block} />
    case 'confusions':
      return <ConfusionsBlock block={block} />
    case 'recap':
      return <RecapBlock block={block} />
    case 'subsection':
      return (
        <section className="subsection-block pt-6">
          <div className="flex items-center gap-3">
            <span className="flex h-6 px-2.5 items-center justify-center rounded-full border border-cyan-neon/30 bg-cyan-neon/10 font-mono text-[0.68rem] font-semibold uppercase tracking-wider text-cyan-neon">
              {partNumber ? `Part ${partNumber}` : 'Part'}
            </span>
            <span
              className="h-px flex-1 bg-gradient-to-r from-cyan-neon/40 via-cyan-neon/10 to-transparent"
              aria-hidden="true"
            />
          </div>
          <h2 className="subsection-title mt-3.5">
            <RichText text={block.title.en} />
          </h2>
          <ArabicTitle title={block.title} />
          {block.intro ? (
            <BilingualProse
              text={block.intro}
              className="mt-3.5 max-w-[70ch] text-[1.02rem] leading-relaxed text-mist-300"
            />
          ) : null}
        </section>
      )

    case 'prose':
      return (
        <section
          className={cn('content-card', !block.title && 'content-card--top')}
          style={accentVars(accentIndex)}
        >
          <BlockTitle title={block.title} tag="Concept" />
          <div className="space-y-4">
            {block.body.map((paragraph, index) => (
              <div
                key={index}
                className={cn(index > 0 && 'border-t border-line-soft/30 pt-4')}
              >
                <BilingualProse text={paragraph} className="lesson-copy" />
              </div>
            ))}
          </div>
        </section>
      )

    case 'list':
      return (
        <section className="content-card" style={accentVars(accentIndex)}>
          <BlockTitle title={block.title} tag={block.ordered ? 'Key Sequence' : 'Core Points'} />
          {block.ordered ? (
            <ol className="lesson-copy space-y-2">
              {block.items.map((item, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3.5 rounded-xl p-2.5 -mx-2.5 transition-colors hover:bg-white/[0.02]"
                >
                  <span className="content-step-num mt-0.5">{index + 1}</span>
                  <div className="flex-1 min-w-0 pt-0.5">
                    <BilingualInline text={item} />
                  </div>
                </li>
              ))}
            </ol>
          ) : (
            <ul className="lesson-copy space-y-2">
              {block.items.map((item, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3.5 rounded-xl p-2.5 -mx-2.5 transition-colors hover:bg-white/[0.02]"
                >
                  <span className="content-dot mt-2" aria-hidden="true" />
                  <div className="flex-1 min-w-0">
                    <BilingualInline text={item} />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      )

    case 'definition':
      return (
        <section
          className="content-card !border-teal-neon/30"
          style={accentVars(accentIndex)}
        >
          <div className="flex items-center justify-between gap-3 mb-3">
            <span className="content-card-tag !border-teal-neon/35 !bg-teal-neon/10 !text-teal-neon">
              <Bookmark className="h-3 w-3" aria-hidden="true" />
              Key Definition
            </span>
          </div>
          <h3 className="font-display text-[1.55rem] font-semibold leading-tight tracking-tight text-mist-50">
            {block.term}
          </h3>
          <div className="mt-3.5">
            <BilingualProse text={block.definition} className="text-[1.03rem] leading-relaxed" />
          </div>
          {block.detail ? (
            <div className="mt-4 border-t border-teal-neon/15 pt-4">
              <p className="font-mono text-[0.68rem] uppercase tracking-wider text-teal-neon/80 mb-2">
                In-depth context
              </p>
              <BilingualProse
                text={block.detail}
                className="text-[0.95rem] leading-relaxed text-mist-300"
              />
            </div>
          ) : null}
        </section>
      )

    case 'callout': {
      const tone = calloutStyles[block.tone]
      const Icon = tone.icon
      return (
        <section
          className={cn('rounded-2xl border p-5 sm:p-6', tone.border, tone.bg)}
          aria-label={tone.label}
        >
          <div className="flex items-start gap-4">
            <span
              className={cn(
                'mt-0.5 flex h-9 w-9 flex-none items-center justify-center rounded-xl border border-current/20 bg-ink-950/30',
                tone.iconColor,
              )}
            >
              <Icon className="h-4.5 w-4.5" aria-hidden="true" />
            </span>
            <div className="min-w-0 flex-1">
              <p className={cn('block-label', tone.iconColor)}>{tone.label}</p>
              <h3 className="mt-1.5 font-display text-[1.18rem] font-semibold leading-snug text-mist-50">
                <RichText text={block.title.en} />
              </h3>
              <ArabicTitle title={block.title} />
              <BilingualProse text={block.body} className="mt-2.5 text-[1rem] leading-relaxed" />
              {block.refs ? <ExamSourceChips refs={block.refs} /> : null}
            </div>
          </div>
        </section>
      )
    }

    case 'table':
      return (
        <figure className="relative overflow-hidden rounded-2xl border border-line bg-ink-900/35 shadow-lg">
          <span
            className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-cyan-neon via-teal-neon to-transparent"
            aria-hidden="true"
          />
          {block.caption ? (
            <figcaption className="border-b border-line-soft px-5 py-4 bg-ink-950/40">
              <span className="content-card-tag !border-cyan-neon/30 !bg-cyan-neon/10 !text-cyan-neon">
                Comparison Table
              </span>
              <div className="mt-2">
                <BilingualProse text={block.caption} className="text-[0.92rem]" />
              </div>
            </figcaption>
          ) : null}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[42rem] border-collapse text-left text-[0.94rem]">
              <thead>
                <tr className="bg-ink-800/90 border-b border-line">
                  {block.headers.map((header) => (
                    <th
                      key={header}
                      scope="col"
                      className="px-4 py-3.5 font-mono text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-mist-200"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows.map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className="border-b border-line-soft/60 last:border-b-0 odd:bg-ink-950/30 transition-colors hover:bg-cyan-neon/[0.03]"
                  >
                    {row.map((cell, cellIndex) => (
                      <td
                        key={cellIndex}
                        className={cn(
                          'px-4 py-3.5 align-top leading-relaxed text-mist-300',
                          cellIndex === 0 && 'font-medium text-mist-100',
                        )}
                      >
                        <BilingualInline text={cell} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </figure>
      )

    case 'code':
      return <CodeBlock block={block} />

    case 'steps':
      return (
        <section>
          <BlockTitle title={block.title} tag="Execution Flow" />
          <ol className="mt-5">
            {block.steps.map((step, index) => (
              <li key={index} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <span className="flex h-10 w-10 flex-none items-center justify-center rounded-xl border border-cyan-neon/30 bg-ink-900 font-mono text-[0.75rem] font-semibold text-cyan-neon shadow-[0_0_24px_-14px_rgba(53,216,238,0.9)]">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  {index < block.steps.length - 1 ? (
                    <span
                      className="my-2 w-px flex-1 bg-gradient-to-b from-cyan-neon/35 to-line/60"
                      aria-hidden="true"
                    />
                  ) : null}
                </div>
                <div className="min-w-0 flex-1 pb-5">
                  <div className="rounded-xl border border-line-soft bg-ink-900/35 p-4 sm:p-5 transition-colors hover:border-cyan-neon/25">
                    <h4 className="font-display text-[1.06rem] font-semibold leading-snug text-mist-100">
                      {step.title}
                    </h4>
                    <BilingualProse text={step.body} className="mt-2 text-[0.97rem]" />
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </section>
      )

    case 'compare':
      return (
        <section className="grid gap-4 lg:grid-cols-2" aria-label="Comparison">
          {[block.left, block.right].map((side, index) => (
            <div
              key={side.title}
              className={cn(
                'relative overflow-hidden rounded-2xl border p-5 sm:p-6 transition-all duration-200 hover:-translate-y-0.5',
                index === 0
                  ? 'border-cyan-neon/30 bg-gradient-to-b from-cyan-neon/[0.05] via-ink-900/60 to-ink-950/80 shadow-[0_4px_20px_-4px_rgba(53,216,238,0.12)]'
                  : 'border-violet-neon/30 bg-gradient-to-b from-violet-neon/[0.05] via-ink-900/60 to-ink-950/80 shadow-[0_4px_20px_-4px_rgba(176,154,250,0.12)]',
              )}
            >
              <span
                className={cn(
                  'absolute inset-x-0 top-0 h-1',
                  index === 0
                    ? 'bg-gradient-to-r from-cyan-neon via-cyan-neon/60 to-transparent'
                    : 'bg-gradient-to-r from-violet-neon via-violet-neon/60 to-transparent',
                )}
                aria-hidden="true"
              />
              <span
                className={cn(
                  'inline-block font-mono text-[0.68rem] font-semibold uppercase tracking-[0.14em]',
                  index === 0 ? 'text-cyan-neon/90' : 'text-violet-neon/90',
                )}
              >
                {index === 0 ? 'Side A' : 'Side B'}
              </span>
              <h3 className="mt-2 font-display text-[1.22rem] font-semibold leading-snug tracking-tight text-mist-50">
                {side.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {side.points.map((point, pointIndex) => (
                  <li
                    key={pointIndex}
                    className="flex items-start gap-2.5 rounded-xl p-2 -mx-2 text-[0.96rem] leading-relaxed text-mist-300 transition-colors hover:bg-white/[0.02]"
                  >
                    <span
                      className={cn(
                        'mt-[0.55em] h-1.5 w-1.5 flex-none rounded-full',
                        index === 0
                          ? 'bg-cyan-neon shadow-[0_0_8px_rgba(53,216,238,0.8)]'
                          : 'bg-violet-neon shadow-[0_0_8px_rgba(176,154,250,0.8)]',
                      )}
                      aria-hidden="true"
                    />
                    <div className="flex-1 min-w-0">
                      <BilingualInline text={point} />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      )

    case 'visual':
      return (
        <section>
          <VisualRenderer id={block.id} title={block.title} />
          {block.caption ? (
            <BilingualProse
              text={block.caption}
              className="mt-3 text-[0.9rem] leading-relaxed text-mist-400"
            />
          ) : null}
        </section>
      )

    case 'exam':
      return (
        <section className="relative overflow-hidden rounded-2xl border border-amber-neon/30 bg-amber-neon/[0.04] p-5 sm:p-6 shadow-[0_4px_20px_-4px_rgba(247,196,84,0.12)]">
          <span
            className="absolute inset-y-0 start-0 w-1 bg-gradient-to-b from-amber-neon via-amber-neon/40 to-transparent"
            aria-hidden="true"
          />
          <div className="flex items-start gap-4">
            <span className="mt-0.5 flex h-10 w-10 flex-none items-center justify-center rounded-xl border border-amber-neon/25 bg-amber-neon/10 text-amber-neon">
              <GraduationCap className="h-5 w-5" aria-hidden="true" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="block-label text-amber-neon">Exam briefing</p>
              <h3 className="mt-1.5 font-display text-[1.3rem] font-semibold leading-snug text-mist-50">
                <RichText text={block.title.en} />
              </h3>
              <ArabicTitle title={block.title} />
              <BilingualProse text={block.body} className="mt-2.5 text-[1rem] leading-relaxed" />
              {block.refs ? <ExamSourceChips refs={block.refs} /> : null}
            </div>
          </div>
        </section>
      )

    case 'checklist':
      return (
        <section className="rounded-2xl border border-teal-neon/20 bg-teal-neon/[0.03] p-5 sm:p-6">
          <div className="flex items-center gap-2.5">
            <CheckSquare className="h-4.5 w-4.5 text-teal-neon" aria-hidden="true" />
            <h3 className="font-display text-[1.1rem] font-semibold text-mist-50">
              <RichText text={block.title.en} />
            </h3>
          </div>
          <ArabicTitle title={block.title} />
          <ul className="mt-4 space-y-3">
            {block.items.map((item, index) => (
              <li key={index} className="flex items-start gap-3 text-[0.97rem] leading-relaxed">
                <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-md border border-teal-neon/40 bg-teal-neon/10">
                  <Check className="h-3 w-3 text-teal-neon" aria-hidden="true" />
                </span>
                <span className="text-mist-300">
                  <BilingualInline text={item} />
                </span>
              </li>
            ))}
          </ul>
        </section>
      )

    case 'quote':
      return (
        <blockquote className="relative rounded-2xl border border-violet-neon/20 bg-violet-neon/[0.03] p-6 sm:p-7">
          <Quote
            className="absolute right-5 top-5 h-8 w-8 text-violet-neon/20"
            aria-hidden="true"
          />
          <p className="max-w-4xl font-display text-[1.18rem] font-medium italic leading-8 text-mist-100">
            <RichText text={block.text.en} />
          </p>
          {block.attribution ? (
            <footer className="mt-3 text-[0.82rem] text-mist-500">— {block.attribution}</footer>
          ) : null}
        </blockquote>
      )
  }
}
