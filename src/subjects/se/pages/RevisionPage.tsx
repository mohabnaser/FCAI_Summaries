import { Link, useParams } from 'react-router-dom'
import { BookmarkCheck, Brain, Printer } from 'lucide-react'
import type { Block, Lesson } from '../types'
import { findWeek, lessonPath } from '../data/course'
import { Inline } from '../components/Text'
import { weekTone } from '../lib/tones'
import { NotFoundPage } from './NotFoundPage'

type Memorize = Extract<Block, { kind: 'memorize' }>
type Hook = Extract<Block, { kind: 'hook' }>

const memorizeOf = (lesson: Lesson) => lesson.blocks.filter((b): b is Memorize => b.kind === 'memorize')
const hooksOf = (lesson: Lesson) => lesson.blocks.filter((b): b is Hook => b.kind === 'hook')

/** One printable page per week: summaries, must-know sentences, memory hooks, recaps and terms. */
export function RevisionPage() {
  const { weekId = '' } = useParams()
  const week = findWeek(weekId)
  if (!week) return <NotFoundPage />

  return (
    <div className="rise space-y-8">
      <header className="hero p-6 sm:p-8" data-tone={weekTone(week.number)}>
        <div className="relative z-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Week {week.number} · revision sheet</p>
            <h1 className="display mt-2 text-[2rem] font-bold text-ink sm:text-[2.5rem]">{week.title}</h1>
            <p className="mt-2 max-w-2xl text-[0.95rem] text-muted">
              The whole week on one page: the summary of each lesson, the sentences worth knowing word for word, the memory hooks and the recap. Read it the night before the exam.
            </p>
          </div>
          <button type="button" className="btn btn-ghost no-print" onClick={() => window.print()}>
            <Printer className="h-4 w-4" /> Print / save as PDF
          </button>
        </div>
      </header>

      <section className="panel p-6" data-tone="amber">
        <p className="eyebrow">The week in one minute</p>
        <ol className="mt-3 list-decimal space-y-2 ps-5 marker:font-bold marker:text-[var(--se-amber)]">
          {week.bigIdeas.map((idea, i) => (
            <li key={i} className="reading text-[0.95rem]">
              <Inline text={idea} />
            </li>
          ))}
        </ol>
      </section>

      {week.lessons.map((lesson) => {
        const memorize = memorizeOf(lesson)
        const hooks = hooksOf(lesson)
        return (
          <section key={lesson.id} className="panel overflow-hidden">
            <header className="flex flex-wrap items-baseline justify-between gap-2 border-b border-line-soft bg-surface-2 px-6 py-4">
              <h2 className="display text-[1.3rem] font-bold text-ink">
                <span className="me-2 font-mono text-[0.9rem]" style={{ color: 'var(--se-blue)' }}>
                  {String(lesson.order).padStart(2, '0')}
                </span>
                <Link to={lessonPath(lesson)} className="hover:underline">
                  {lesson.title}
                </Link>
              </h2>
            </header>
            <div className="space-y-5 p-6">
              <div className="reading text-[0.97rem]">
                <Inline text={lesson.tldr} />
              </div>

              {memorize.length > 0 ? (
                <div>
                  <p className="eyebrow mb-2 flex items-center gap-1.5" data-tone="violet">
                    <BookmarkCheck className="h-3.5 w-3.5" /> Word for word
                  </p>
                  <ul className="space-y-2">
                    {memorize.map((m) => (
                      <li key={m.text} className="rounded-xl border p-3" style={{ borderColor: 'color-mix(in srgb, var(--se-violet) 35%, transparent)', background: 'color-mix(in srgb, var(--se-violet) 6%, transparent)' }}>
                        <span className="font-mono text-[0.66rem] uppercase tracking-[0.12em]" style={{ color: 'var(--se-violet)' }}>
                          {m.label}
                        </span>
                        <p className="display mt-0.5 text-[1rem] font-semibold text-ink">“{m.text}”</p>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {hooks.length > 0 ? (
                <div>
                  <p className="eyebrow mb-2 flex items-center gap-1.5" data-tone="amber">
                    <Brain className="h-3.5 w-3.5" /> Memory hooks
                  </p>
                  <ul className="grid gap-2 md:grid-cols-2">
                    {hooks.map((hook) => (
                      <li key={hook.phrase} className="rounded-xl border border-line-soft p-3">
                        <p className="display text-[1rem] font-bold" style={{ color: 'var(--se-amber)' }}>
                          {hook.phrase}
                        </p>
                        {hook.letters ? (
                          <p className="mt-1 text-[0.85rem] text-muted">{hook.letters.map((l) => l.word).join(' · ')}</p>
                        ) : (
                          <div className="mt-1 text-[0.85rem] text-muted">
                            <Inline text={hook.title} />
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              <div>
                <p className="eyebrow mb-2" data-tone="teal">
                  Recap
                </p>
                <ul className="space-y-1.5">
                  {lesson.recap.map((item, i) => (
                    <li key={i} className="flex gap-2.5 text-[0.93rem]">
                      <span style={{ color: 'var(--se-teal)' }}>✓</span>
                      <span className="reading">
                        <Inline text={item} />
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <details className="rounded-xl border border-line-soft">
                <summary className="cursor-pointer px-4 py-2.5 text-[0.88rem] font-semibold text-ink">
                  Key terms ({lesson.keyTerms.length})
                </summary>
                <dl className="grid gap-x-6 gap-y-2 px-4 pb-4 md:grid-cols-2">
                  {lesson.keyTerms.map((term) => (
                    <div key={term.term} className="text-[0.88rem]">
                      <dt className="font-semibold text-ink">{term.term}</dt>
                      <dd className="text-muted">
                        <Inline text={term.definition} />
                      </dd>
                    </div>
                  ))}
                </dl>
              </details>
            </div>
          </section>
        )
      })}
    </div>
  )
}
