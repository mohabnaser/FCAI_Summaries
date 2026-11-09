import { useState } from 'react'
import { ArrowRight, BookmarkCheck, Brain, Check, ChevronDown, Lightbulb, MessageCircleQuestionMark, Quote, Scale, Sparkles, TriangleExclamationPoint, X } from 'lucide-react'
import type { Block, Tone } from '../types'
import { Icon } from './icons'
import { Inline, Para, Rich } from './Text'
import { diagrams } from './diagrams'
import { usePrefs } from '../context/PrefsContext'
import { Highlight } from 'prism-react-renderer'
import { codeTheme } from './highlight'

const toneCycle: Tone[] = ['blue', 'teal', 'violet', 'amber', 'rose', 'lime']

function SectionTitle({ eyebrow, title, tone = 'blue' }: { eyebrow: string; title?: React.ReactNode; tone?: Tone }) {
  return (
    <div className="mb-4" data-tone={tone}>
      <p className="eyebrow">{eyebrow}</p>
      {title ? <h3 className="display mt-1.5 text-[1.3rem] font-semibold text-ink">{title}</h3> : null}
    </div>
  )
}

const columnClass = { 2: 'md:grid-cols-2', 3: 'md:grid-cols-2 xl:grid-cols-3', 4: 'sm:grid-cols-2 xl:grid-cols-4' } as const

export function BlockRenderer({ block, partNumber, index }: { block: Block; partNumber?: number; index: number }) {
  const { showArabic } = usePrefs()

  switch (block.kind) {
    case 'lead':
      return (
        <div className="lead-block" data-tone="blue">
          <Para text={block.text} />
        </div>
      )

    case 'part': {
      const tone = toneCycle[((partNumber ?? 1) - 1) % toneCycle.length]
      return (
        <div className="flex items-start gap-4 pt-6" data-tone={tone}>
          <span className="part-badge">{String(partNumber ?? 1).padStart(2, '0')}</span>
          <div className="min-w-0">
            <h2 className="display text-[1.65rem] font-bold leading-tight text-ink sm:text-[1.9rem]">
              <Rich text={block.title.en} />
            </h2>
            {showArabic && block.title.ar ? (
              <p className="ar-inline !mt-1 text-[1rem]" lang="ar" dir="rtl">{block.title.ar}</p>
            ) : null}
            {block.intro ? (
              <p className="rt mt-2 text-[0.95rem] text-muted">
                <Rich text={block.intro.en} />
              </p>
            ) : null}
          </div>
        </div>
      )
    }

    case 'idea':
      return (
        <article className="idea" data-tone={block.tone ?? 'blue'}>
          <div className="flex items-start gap-3">
            <span className="icon-tile">{block.icon ? <Icon name={block.icon} /> : <Lightbulb className="h-5 w-5" />}</span>
            <div className="min-w-0 flex-1">
              <p className="eyebrow">The idea</p>
              <h3 className="display mt-1 text-[1.3rem] font-semibold text-ink">{block.title}</h3>
              <Para text={block.text} className="reading mt-2" />
            </div>
          </div>
          {block.analogy ? (
            <div className="analogy" data-tone="amber">
              <p className="eyebrow mb-1.5 flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5" /> Picture it
              </p>
              <Para text={block.analogy} className="reading" />
            </div>
          ) : null}
        </article>
      )

    case 'cards':
      return (
        <div>
          {block.title ? <SectionTitle eyebrow="At a glance" title={<Inline text={block.title} />} /> : null}
          <div className={`grid gap-3 ${columnClass[block.columns ?? 3]}`}>
            {block.items.map((item, i) => {
              const tone = item.tone ?? toneCycle[i % toneCycle.length]
              return (
                <article key={item.title} className="card card-top" data-tone={tone}>
                  <div className="flex items-center justify-between gap-2">
                    {block.numbered ? (
                      <span className="part-badge !h-9 !min-w-9 !rounded-lg text-sm">{i + 1}</span>
                    ) : item.icon ? (
                      <span className="icon-tile">
                        <Icon name={item.icon} />
                      </span>
                    ) : null}
                    {item.tag ? <span className="chip">{item.tag}</span> : null}
                  </div>
                  <h4 className="display mt-3 text-[1.08rem] font-semibold text-ink">{item.title}</h4>
                  <div className="reading mt-1.5 text-[0.93rem] leading-relaxed">
                    <Inline text={item.body} />
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      )

    case 'flow':
      return (
        <div className="panel p-5">
          {block.title ? <SectionTitle eyebrow="Step by step" title={<Inline text={block.title} />} tone="teal" /> : null}
          <ol className="flow-grid">
            {block.steps.map((step, i) => (
              <li key={i} className="flow-step" data-tone={step.tone ?? toneCycle[i % toneCycle.length]}>
                <div className="flex items-center gap-2">
                  {step.icon ? (
                    <span className="icon-tile !h-8 !w-8 !rounded-lg">
                      <Icon name={step.icon} className="h-4 w-4" />
                    </span>
                  ) : null}
                  <span className="eyebrow">Step {i + 1}</span>
                </div>
                <p className="display mt-2 text-[1rem] font-semibold text-ink">{step.label}</p>
                {step.detail ? (
                  <div className="mt-1 text-[0.86rem] leading-relaxed text-muted">
                    <Inline text={step.detail} />
                  </div>
                ) : null}
              </li>
            ))}
          </ol>
          {block.caption ? <Para text={block.caption} className="mt-4 text-[0.9rem] text-muted" /> : null}
        </div>
      )

    case 'versus':
      return (
        <div className="panel p-5">
          {block.title ? <SectionTitle eyebrow="Side by side" title={<Inline text={block.title} />} tone="violet" /> : null}
          <div className="grid grid-cols-2 gap-3">
            {[block.left, block.right].map((side, i) => (
              <div key={side.title} className="versus-head" data-tone={side.tone ?? (i === 0 ? 'blue' : 'amber')}>
                <div className="flex items-center gap-2">
                  {side.icon ? (
                    <span style={{ color: 'var(--tone)' }}>
                      <Icon name={side.icon} className="h-5 w-5" />
                    </span>
                  ) : null}
                  <p className="display text-[1.05rem] font-bold text-ink">{side.title}</p>
                </div>
                {side.tagline ? (
                  <div className="mt-1 text-[0.85rem] text-muted">
                    <Inline text={side.tagline} />
                  </div>
                ) : null}
              </div>
            ))}
          </div>
          <div className="mt-3 space-y-2">
            {block.rows.map((row) => (
              <div key={row.aspect} className="rounded-xl border border-line-soft p-3">
                <p className="font-mono text-[0.68rem] uppercase tracking-[0.12em] text-faint">{row.aspect}</p>
                <div className="mt-1.5 grid grid-cols-2 gap-4 text-[0.92rem] leading-relaxed text-[var(--se-reading)]">
                  <Inline text={row.left} />
                  <Inline text={row.right} />
                </div>
              </div>
            ))}
          </div>
          {block.verdict ? (
            <div className="callout mt-3" data-tone="teal">
              <p className="eyebrow mb-1 flex items-center gap-1.5">
                <Scale className="h-3.5 w-3.5" /> Bottom line
              </p>
              <Para text={block.verdict} className="reading" />
            </div>
          ) : null}
        </div>
      )

    case 'table':
      return (
        <figure className="panel overflow-hidden">
          {block.caption ? (
            <figcaption className="border-b border-line-soft px-5 py-3.5">
              <p className="eyebrow">Table</p>
              <div className="display mt-1 text-[1.1rem] font-semibold text-ink">
                <Inline text={block.caption} />
              </div>
            </figcaption>
          ) : null}
          <div className="overflow-x-auto">
            <table className="se-table min-w-[36rem]">
              <thead>
                <tr>
                  {block.headers.map((header) => (
                    <th key={header}>{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows.map((row, r) => (
                  <tr key={r}>
                    {row.map((cell, c) => (
                      <td key={c}>
                        <Inline text={cell} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </figure>
      )

    case 'hook':
      return (
        <div className="panel p-5" data-tone="violet">
          <p className="eyebrow flex items-center gap-1.5">
            <Brain className="h-3.5 w-3.5" /> Memory hook
          </p>
          <div className="display mt-1.5 text-[1.15rem] font-semibold text-ink">
            <Inline text={block.title} />
          </div>
          <p className="display mt-3 text-[1.6rem] font-bold tracking-tight" style={{ color: 'var(--se-violet)' }}>
            {block.phrase}
          </p>
          {block.letters ? (
            <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {block.letters.map((entry, i) => (
                <div key={i} className="flex items-center gap-3" data-tone={toneCycle[i % toneCycle.length]}>
                  <span className="hook-letter">{entry.letter}</span>
                  <span className="text-[0.92rem] font-medium text-ink">{entry.word}</span>
                </div>
              ))}
            </div>
          ) : null}
          {block.body ? <Para text={block.body} className="mt-4 text-[0.92rem] text-muted" /> : null}
        </div>
      )

    case 'memorize':
      return (
        <figure className="memorize">
          <p className="eyebrow flex items-center gap-1.5" data-tone="violet">
            <BookmarkCheck className="h-3.5 w-3.5" /> {block.label}
          </p>
          <blockquote className="memorize-text mt-3">“{block.text}”</blockquote>
          {block.source ? <figcaption className="mt-2 font-mono text-[0.75rem] text-faint">— {block.source}</figcaption> : null}
          {block.note ? <Para text={block.note} className="mt-3 text-[0.92rem] text-muted" /> : null}
        </figure>
      )

    case 'callout': {
      const look = {
        insight: { tone: 'blue' as Tone, label: 'Insight', icon: Lightbulb },
        warning: { tone: 'rose' as Tone, label: 'Watch out', icon: TriangleExclamationPoint },
        key: { tone: 'amber' as Tone, label: 'Key point', icon: Sparkles },
        note: { tone: 'teal' as Tone, label: 'Good to know', icon: Lightbulb },
      }[block.tone]
      return (
        <aside className="callout" data-tone={look.tone}>
          <p className="eyebrow flex items-center gap-1.5">
            <look.icon className="h-3.5 w-3.5" /> {look.label}
          </p>
          <div className="display mt-1.5 text-[1.08rem] font-semibold text-ink">
            <Inline text={block.title} />
          </div>
          <Para text={block.body} className="reading mt-1.5 text-[0.95rem]" />
        </aside>
      )
    }

    case 'myths':
      return (
        <div className="panel p-5">
          <SectionTitle eyebrow="Don't mix these up" title={block.title ? <Inline text={block.title} /> : undefined} tone="rose" />
          <div className="space-y-3">
            {block.items.map((item, i) => (
              <div key={i} className="grid gap-2 md:grid-cols-2">
                <div className="flex gap-2.5 rounded-xl border border-line-soft p-3">
                  <X className="myth-x mt-0.5 h-4 w-4 flex-none" />
                  <div className="text-[0.92rem] leading-relaxed text-muted">
                    <Inline text={item.myth} />
                  </div>
                </div>
                <div className="flex gap-2.5 rounded-xl border p-3" style={{ borderColor: 'color-mix(in srgb, var(--se-teal) 35%, transparent)' }}>
                  <Check className="myth-check mt-0.5 h-4 w-4 flex-none" />
                  <div className="text-[0.92rem] leading-relaxed text-[var(--se-reading)]">
                    <Inline text={item.fact} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )

    case 'definition':
      return (
        <div className="card" data-tone="teal" style={{ borderLeft: '3px solid var(--se-teal)' }}>
          <p className="eyebrow">Definition</p>
          <p className="display mt-1 text-[1.2rem] font-bold text-ink">{block.term}</p>
          <Para text={block.definition} className="reading mt-1.5" />
          {block.detail ? <Para text={block.detail} className="mt-2 text-[0.9rem] text-muted" /> : null}
        </div>
      )

    case 'case':
      return (
        <article className="case">
          <header className="border-b border-line-soft px-5 py-4" data-tone="amber">
            <p className="eyebrow">{block.label}</p>
            <h3 className="display mt-1 text-[1.35rem] font-bold text-ink">{block.title}</h3>
          </header>
          <ol className="space-y-5 px-5 py-5">
            {block.beats.map((beat, i) => (
              <li key={i} className="case-beat" data-tone={beat.tone ?? toneCycle[i % toneCycle.length]}>
                <span className="case-dot">{beat.icon ? <Icon name={beat.icon} className="h-4 w-4" /> : i + 1}</span>
                <p className="eyebrow pt-0.5">{beat.label}</p>
                <Para text={beat.text} className="reading mt-1 text-[0.95rem]" />
              </li>
            ))}
          </ol>
          <footer className="callout !rounded-none !border-x-0 !border-b-0" data-tone="teal">
            <p className="eyebrow mb-1">Takeaway</p>
            <Para text={block.lesson} className="font-medium text-ink" />
          </footer>
        </article>
      )

    case 'diagram': {
      const Diagram = diagrams[block.id]
      return (
        <figure className="diagram">
          <figcaption className="flex items-start justify-between gap-3 border-b border-line-soft px-5 py-3.5">
            <div>
              <p className="eyebrow">Diagram</p>
              <div className="display mt-1 text-[1.1rem] font-semibold text-ink">
                <Inline text={block.title} />
              </div>
            </div>
          </figcaption>
          <div className="diagram-canvas">
            <Diagram />
          </div>
          {block.caption ? <Para text={block.caption} className="border-t border-line-soft px-5 py-3.5 text-[0.9rem] text-muted" /> : null}
        </figure>
      )
    }

    case 'quote':
      return (
        <figure className="quote-block">
          <Quote className="h-7 w-7" style={{ color: 'var(--se-blue)' }} />
          <blockquote className="display mt-2 text-[1.35rem] font-semibold leading-snug text-ink sm:text-[1.55rem]">{block.text}</blockquote>
          <figcaption className="mt-2 font-mono text-[0.78rem] text-faint">— {block.by}</figcaption>
          {block.note ? <Para text={block.note} className="mt-3 text-[0.93rem] text-muted" /> : null}
        </figure>
      )

    case 'dilemma':
      return <Dilemma block={block} />

    case 'code':
      return <CodeBlock block={block} />

    case 'asks':
      return (
        <div className="panel overflow-hidden" data-tone="amber">
          <div className="border-b border-line-soft px-5 py-3.5">
            <p className="eyebrow flex items-center gap-1.5">
              <MessageCircleQuestionMark className="h-3.5 w-3.5" /> Questions worth answering
            </p>
            {block.title ? (
              <div className="display mt-1 text-[1.1rem] font-semibold text-ink">
                <Inline text={block.title} />
              </div>
            ) : null}
          </div>
          <ol className="divide-y divide-[var(--se-line-soft)]">
            {block.items.map((item, i) => (
              <li key={i} className="px-5 py-4">
                <div className="flex flex-wrap items-baseline gap-2">
                  <p className="display text-[1.05rem] font-semibold" style={{ color: 'var(--se-amber)' }}>
                    {item.q}
                  </p>
                </div>
                <div className="mt-2 flex gap-2.5">
                  <ArrowRight className="mt-1 h-4 w-4 flex-none" style={{ color: 'var(--se-teal)' }} />
                  <div className="reading text-[0.94rem]">
                    <Inline text={item.a} />
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      )

    case 'list':
      return (
        <div className="panel p-5">
          {block.title ? <SectionTitle eyebrow="List" title={<Inline text={block.title} />} /> : null}
          <ul className="space-y-2.5">
            {block.items.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                {block.ordered ? (
                  <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-md font-mono text-[0.72rem] font-bold" style={{ background: 'color-mix(in srgb, var(--se-blue) 14%, transparent)', color: 'var(--se-blue)' }}>
                    {i + 1}
                  </span>
                ) : (
                  <ArrowRight className="mt-1 h-4 w-4 flex-none" style={{ color: 'var(--se-blue)' }} />
                )}
                <div className="reading text-[0.95rem]">
                  <Inline text={item} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      )

    default: {
      const exhaustive: never = block
      void index
      return exhaustive
    }
  }
}

function CodeBlock({ block }: { block: Extract<Block, { kind: 'code' }> }) {
  const tone: Tone = block.verdict === 'bad' ? 'rose' : block.verdict === 'good' ? 'teal' : 'blue'
  const marked = new Set(block.highlight ?? [])
  return (
    <figure className="code-block" data-tone={tone}>
      <figcaption className="flex flex-wrap items-center justify-between gap-2 border-b border-line-soft px-4 py-2.5">
        <span className="flex items-center gap-2 font-mono text-[0.8rem] text-ink">
          <span className="flex gap-1" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: 'color-mix(in srgb, var(--se-rose) 70%, transparent)' }} />
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: 'color-mix(in srgb, var(--se-amber) 70%, transparent)' }} />
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: 'color-mix(in srgb, var(--se-teal) 70%, transparent)' }} />
          </span>
          {block.title}
        </span>
        {block.verdict ? (
          <span className="chip">
            {block.verdict === 'bad' ? <X className="h-3 w-3" /> : <Check className="h-3 w-3" />}
            {block.verdict === 'bad' ? 'Before — the problem' : 'After — the fix'}
          </span>
        ) : null}
      </figcaption>
      <Highlight theme={codeTheme} code={block.code.trim()} language={block.language === 'text' ? 'clike' : 'java'}>
        {({ tokens, getLineProps, getTokenProps }) => (
          <pre dir="ltr" className="overflow-x-auto py-3 font-mono text-[0.82rem] leading-6">
            <code>
              {tokens.map((line, i) => {
                const { key: _lineKey, ...lineProps } = getLineProps({ line })
                return (
                  <div key={i} {...lineProps} className="code-line flex px-4" data-marked={marked.has(i + 1) || undefined}>
                    <span className="mr-4 w-6 flex-none select-none text-right text-[0.7rem] text-faint" aria-hidden="true">
                      {i + 1}
                    </span>
                    <span className="whitespace-pre">
                      {line.map((token, j) => {
                        const { key: _tokenKey, ...tokenProps } = getTokenProps({ token })
                        return <span key={j} {...tokenProps} />
                      })}
                    </span>
                  </div>
                )
              })}
            </code>
          </pre>
        )}
      </Highlight>
      {block.notes?.length ? (
        <ul className="space-y-2 border-t border-line-soft px-4 py-3.5">
          {block.notes.map((note, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full" style={{ background: 'var(--tone)' }} />
              <div className="reading text-[0.9rem]">
                <Inline text={note} />
              </div>
            </li>
          ))}
        </ul>
      ) : null}
    </figure>
  )
}

function Dilemma({ block }: { block: Extract<Block, { kind: 'dilemma' }> }) {
  const [open, setOpen] = useState(false)
  return (
    <article className="dilemma">
      <header className="px-5 pt-5" data-tone="amber">
        <p className="eyebrow">{block.label}</p>
        <h3 className="display mt-1 text-[1.3rem] font-bold text-ink">{block.title}</h3>
        <Para text={block.scenario} className="reading mt-2" />
      </header>
      <div className="grid gap-3 px-5 pt-4 md:grid-cols-2">
        {block.options.map((option, i) => (
          <div key={option.label} className="card card-top" data-tone={option.tone ?? (i === 0 ? 'blue' : 'rose')}>
            <p className="eyebrow">{option.label}</p>
            <div className="reading mt-1.5 text-[0.93rem]">
              <Inline text={option.text} />
            </div>
          </div>
        ))}
      </div>
      <p className="display px-5 pt-4 text-[1.1rem] font-semibold" style={{ color: 'var(--se-amber)' }}>
        {block.question}
      </p>
      <div className="px-5 pb-5 pt-3">
        <button type="button" className="btn btn-ghost btn-sm" onClick={() => setOpen((v) => !v)} aria-expanded={open}>
          <ChevronDown className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`} />
          {open ? 'Hide' : 'Show'} how an architect reasons about it
        </button>
        {open ? (
          <ul className="mt-3 space-y-2.5">
            {block.lens.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <Scale className="mt-1 h-4 w-4 flex-none" style={{ color: 'var(--se-teal)' }} />
                <div className="reading text-[0.94rem]">
                  <Inline text={item} />
                </div>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </article>
  )
}
