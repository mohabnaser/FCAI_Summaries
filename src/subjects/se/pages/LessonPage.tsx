import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, CircleCheck, Circle, Clock3, Eye, EyeOff, ScrollText, Zap } from 'lucide-react'
import { allLessons, findLesson, lessonPath, weekOf, weekPath } from '../data/course'
import { BlockRenderer } from '../components/BlockRenderer'
import { FlipCard } from '../components/FlipCard'
import { Inline, Para } from '../components/Text'
import { useProgress } from '../context/ProgressContext'
import { usePrefs } from '../context/PrefsContext'
import { useScrollReveal } from '../lib/useScrollReveal'
import { weekTone } from '../lib/tones'
import { sePath } from '../paths'
import { NotFoundPage } from './NotFoundPage'

interface OutlineItem {
  id: string
  label: string
}

function Outline({ items }: { items: OutlineItem[] }) {
  const [active, setActive] = useState(items[0]?.id ?? '')
  useEffect(() => {
    const elements = items.map((item) => document.getElementById(item.id)).filter((el): el is HTMLElement => el !== null)
    if (elements.length === 0 || typeof IntersectionObserver === 'undefined') return
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: '-15% 0px -70% 0px' },
    )
    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [items])
  return (
    <nav aria-label="On this page" className="mt-3">
      {items.map((item) => (
        <a key={item.id} href={`#${item.id}`} className="rail-link" data-active={active === item.id}>
          {item.label}
        </a>
      ))}
    </nav>
  )
}

export function LessonPage() {
  const { lessonId = '' } = useParams()
  const lesson = findLesson(lessonId)
  const { isDone, setDone, visit } = useProgress()
  const { showArabic } = usePrefs()
  const bodyRef = useRef<HTMLDivElement>(null)
  const [revealAll, setRevealAll] = useState(false)
  useScrollReveal(bodyRef, lessonId)

  useEffect(() => {
    if (lesson) visit(lesson.id)
    setRevealAll(false)
  }, [lesson, visit])

  const parts = useMemo<OutlineItem[]>(() => {
    if (!lesson) return []
    return lesson.blocks.flatMap((block, index) => (block.kind === 'part' ? [{ id: `b-${index}`, label: block.title.en.replace(/\*/g, '') }] : []))
  }, [lesson])

  if (!lesson) return <NotFoundPage />

  const week = weekOf(lesson)
  const tone = weekTone(week.number)
  const index = allLessons.findIndex((entry) => entry.id === lesson.id)
  const previous = allLessons[index - 1]
  const next = allLessons[index + 1]
  const done = isDone(lesson.id)
  let partCount = 0

  const outline = [...parts, { id: 'key-terms', label: 'Key terms' }, { id: 'recap', label: '30-second recap' }]

  return (
    <div key={lesson.id} className="rise">
      <header className="hero p-6 sm:p-8" data-tone={tone}>
        <div className="relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="eyebrow">
              Week {week.number} · Lesson {lesson.order}
            </p>
            <div className="flex flex-wrap gap-1.5">
              <span className="chip" data-tone="teal">
                <Clock3 className="h-3 w-3" /> ~{lesson.minutes} min
              </span>
              {done ? (
                <span className="chip" data-tone="lime">
                  <CircleCheck className="h-3 w-3" /> Done
                </span>
              ) : null}
            </div>
          </div>
          <h1 className="display mt-4 max-w-4xl text-[2rem] font-bold leading-[1.1] text-ink sm:text-[2.6rem]">{lesson.title}</h1>

          <div className="tldr mt-6 max-w-4xl" data-tone="amber">
            <p className="eyebrow mb-1.5 flex items-center gap-1.5">
              <Zap className="h-3.5 w-3.5" /> The whole lesson in 20 seconds
            </p>
            <Para text={lesson.tldr} className="reading text-[1.02rem]" />
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-2">
            <button type="button" className={done ? 'btn btn-ghost' : 'btn btn-primary'} onClick={() => setDone(lesson.id, !done)} aria-pressed={done}>
              {done ? <CircleCheck className="h-4 w-4" style={{ color: 'var(--se-teal)' }} /> : <Circle className="h-4 w-4" />}
              {done ? 'Completed — mark as not done' : 'Mark lesson as done'}
            </button>
            <Link to={sePath(`/week/${week.id}/revision`)} className="btn btn-ghost">
              <ScrollText className="h-4 w-4" style={{ color: 'var(--se-amber)' }} />
              Week {week.number} revision sheet
            </Link>
          </div>
        </div>
      </header>

      {parts.length > 0 ? (
        <nav className="panel mt-4 flex flex-wrap items-center gap-2 px-4 py-3" aria-label="Parts of this lesson">
          <span className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-faint">In this lesson</span>
          {parts.map((item, i) => (
            <a key={item.id} href={`#${item.id}`} className="rounded-lg px-2 py-1 text-[0.82rem] text-muted hover:bg-surface-2 hover:text-ink">
              <span className="me-1.5 font-mono text-[0.68rem]" style={{ color: 'var(--se-blue)' }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              {item.label}
            </a>
          ))}
        </nav>
      ) : null}

      <div className="mt-8 grid gap-10 2xl:grid-cols-[minmax(0,1fr)_15rem]">
        <div ref={bodyRef} className="min-w-0 space-y-6">
          {lesson.blocks.map((block, i) => {
            if (block.kind === 'part') partCount += 1
            return (
              <div key={`${lesson.id}-${i}`} id={`b-${i}`} className="scroll-mt-24" data-reveal="">
                <BlockRenderer block={block} index={i} partNumber={block.kind === 'part' ? partCount : undefined} />
              </div>
            )
          })}

          <section id="key-terms" className="scroll-mt-24 pt-6" data-reveal="">
            <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
              <div data-tone="violet">
                <p className="eyebrow">Memorize</p>
                <h2 className="display mt-1 text-[1.65rem] font-bold text-ink">Key terms</h2>
                <p className="mt-1 max-w-2xl text-[0.92rem] text-muted">
                  Read the term, say its meaning out loud, then tap the card to check yourself.
                  {showArabic ? <span className="ar-inline" lang="ar" dir="rtl">اقرا المصطلح، قول معناه بصوت عالي، وبعدين دوس على الكارت تتأكد.</span> : null}
                </p>
              </div>
              <button type="button" className="btn btn-ghost btn-sm" onClick={() => setRevealAll((v) => !v)} aria-pressed={revealAll}>
                {revealAll ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                {revealAll ? 'Hide all definitions' : 'Show all definitions'}
              </button>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {lesson.keyTerms.map((term) => (
                <FlipCard key={term.term} term={term} revealAll={revealAll} />
              ))}
            </div>
          </section>

          <section id="recap" className="scroll-mt-24 panel p-6" data-reveal="" data-tone="teal">
            <p className="eyebrow">Before you leave</p>
            <h2 className="display mt-1 text-[1.65rem] font-bold text-ink">30-second recap</h2>
            <ol className="mt-4 space-y-3">
              {lesson.recap.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-md font-mono text-[0.72rem] font-bold" style={{ background: 'color-mix(in srgb, var(--se-teal) 16%, transparent)', color: 'var(--se-teal)' }}>
                    {i + 1}
                  </span>
                  <div className="reading text-[0.96rem]">
                    <Inline text={item} />
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-line-soft pt-5">
              <button type="button" className={done ? 'btn btn-ghost' : 'btn btn-primary'} onClick={() => setDone(lesson.id, !done)}>
                {done ? <CircleCheck className="h-4 w-4" style={{ color: 'var(--se-teal)' }} /> : <Circle className="h-4 w-4" />}
                {done ? 'Lesson done' : 'I understood it — mark as done'}
              </button>
            </div>
          </section>

          <nav className="grid gap-3 sm:grid-cols-2" aria-label="Lesson navigation">
            {previous ? (
              <Link to={lessonPath(previous)} className="card block">
                <span className="flex items-center gap-1.5 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-faint">
                  <ArrowLeft className="h-3.5 w-3.5" /> Previous
                </span>
                <span className="display mt-1 block font-semibold text-ink">{previous.shortTitle}</span>
              </Link>
            ) : (
              <Link to={weekPath(week)} className="card block">
                <span className="flex items-center gap-1.5 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-faint">
                  <ArrowLeft className="h-3.5 w-3.5" /> Back to
                </span>
                <span className="display mt-1 block font-semibold text-ink">Week {week.number} overview</span>
              </Link>
            )}
            {next ? (
              <Link to={lessonPath(next)} className="card block text-right" data-tone="blue" style={{ borderColor: 'color-mix(in srgb, var(--se-blue) 40%, transparent)' }}>
                <span className="flex items-center justify-end gap-1.5 font-mono text-[0.68rem] uppercase tracking-[0.12em]" style={{ color: 'var(--se-blue)' }}>
                  Next {next.weekId !== lesson.weekId ? '· new week' : ''} <ArrowRight className="h-3.5 w-3.5" />
                </span>
                <span className="display mt-1 block font-semibold text-ink">{next.shortTitle}</span>
              </Link>
            ) : (
              <Link to={sePath(`/week/${week.id}/revision`)} className="card block text-right">
                <span className="flex items-center justify-end gap-1.5 font-mono text-[0.68rem] uppercase tracking-[0.12em]" style={{ color: 'var(--se-amber)' }}>
                  Finish with <ArrowRight className="h-3.5 w-3.5" />
                </span>
                <span className="display mt-1 block font-semibold text-ink">Week {week.number} revision sheet</span>
              </Link>
            )}
          </nav>
        </div>

        <aside className="no-print hidden 2xl:block">
          <div className="panel sticky top-24 p-4">
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-faint">On this page</p>
            <Outline items={outline} />
          </div>
        </aside>
      </div>
    </div>
  )
}
