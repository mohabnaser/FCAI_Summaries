import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, Navigate, useLocation, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  BookmarkCheck,
  BookMarked,
  Check,
  CheckCircle2,
  Circle,
  ClipboardCheck,
  Clock3,
  GraduationCap,
  ListTree,
  Target,
} from 'lucide-react'
import type { Block } from '../types'
import { useScrollReveal } from '../lib/useScrollReveal'
import { chapterOfSection, resolveSectionId } from '../data/chapters'
import {
  crossRefQuestionsForSection,
  getSectionQuiz,
  historicalForSection,
  questionsForSection,
} from '../data/quizzes'
import { useProgress } from '../context/ProgressContext'
import { StudyTimer } from '../components/study/StudyTimer'
import { BlockRenderer } from '../components/content/BlockRenderer'
import { BilingualInline, BilingualProse } from '../components/ui/Text'
import { QuizEngine } from '../components/quiz/QuizEngine'
import { formatDuration } from '../lib/progress'
import { cn } from '../lib/cn'
import { NotFoundPage } from './NotFoundPage'
import { osPath } from '../paths'

interface OutlineItem {
  id: string
  label: string
}

function outlineLabel(block: Block): string | null {
  switch (block.kind) {
    case 'subsection':
    case 'hook':
      return block.title.en
    case 'prose':
    case 'list':
    case 'steps':
    case 'cards':
    case 'flow':
    case 'layers':
    case 'versus':
    case 'stats':
    case 'confusions':
    case 'recap':
      return block.title?.en ?? null
    case 'lead':
      return null
    case 'definition':
      return block.term
    case 'callout':
    case 'visual':
    case 'exam':
    case 'checklist':
      return block.title.en
    case 'table':
      return block.caption?.en ?? 'Comparison table'
    case 'compare':
      return `${block.left.title} vs ${block.right.title}`
    case 'code':
      return block.title ?? 'Code example'
    case 'quote':
      return 'Quotation'
    case 'gantt':
      return block.title?.en ?? 'Worked example'
  }
}

function LessonOutline({ items }: { items: OutlineItem[] }) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? '')

  useEffect(() => {
    const elements = items
      .map((item) => document.getElementById(item.id))
      .filter((element): element is HTMLElement => element !== null)
    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActiveId(visible[0].target.id)
      },
      { rootMargin: '-18% 0px -68% 0px', threshold: 0 },
    )
    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [items])

  return (
    <nav aria-label="On this page" className="mt-3 space-y-0.5">
      {items.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className="rail-link"
          data-active={activeId === item.id}
          aria-current={activeId === item.id ? 'location' : undefined}
        >
          <span>{item.label}</span>
        </a>
      ))}
    </nav>
  )
}

export function SectionPage() {
  const { sectionId: requestedSectionId = '' } = useParams()
  const location = useLocation()
  const sectionId = resolveSectionId(requestedSectionId)
  const chapter = chapterOfSection(sectionId)
  const sections = chapter?.sections ?? []
  const section = sections.find((candidate) => candidate.id === sectionId)
  const bodyRef = useRef<HTMLDivElement>(null)
  useScrollReveal(bodyRef, section?.id)
  const { progress, visitSection, setSectionCompleted, isSectionBookmarked, toggleSectionBookmark } =
    useProgress()

  useEffect(() => {
    if (!section) return
    visitSection(section.id)
    if (location.hash === '#quiz') {
      const frame = window.requestAnimationFrame(() => {
        document.getElementById('quiz')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      })
      return () => window.cancelAnimationFrame(frame)
    }
  }, [section, visitSection, location.hash])

  const subsections = useMemo<OutlineItem[]>(() => {
    if (!section) return []
    return section.blocks.flatMap((block, index) => {
      if (block.kind !== 'subsection') return []
      const label = outlineLabel(block)
      return label ? [{ id: `block-${index}`, label }] : []
    })
  }, [section])

  const outline = useMemo<OutlineItem[]>(() => {
    if (!section) return []
    return [
      ...subsections,
      { id: 'exam-focus', label: 'Exam focus' },
      { id: 'key-terms', label: 'Key terms' },
      { id: 'quiz', label: 'Exam practice' },
    ]
  }, [section, subsections])

  if (!section || !chapter) return <NotFoundPage />
  if (requestedSectionId !== section.id) {
    return <Navigate to={osPath(`/section/${section.id}${location.hash}`)} replace />
  }

  const index = sections.findIndex((candidate) => candidate.id === section.id)
  const previous = sections[index - 1]
  const next = sections[index + 1]
  const sectionProgress = progress.sections[section.id]
  const quiz = getSectionQuiz(section.id)
  const questions = questionsForSection(section.id)
  const historical = historicalForSection(section.id)
  const shared = crossRefQuestionsForSection(section.id)
  const chapterNumber = Number(chapter.meta.number)
  const bookmarked = isSectionBookmarked(section.id)
  const completed = sectionProgress?.completed ?? false
  const studiedSeconds = sectionProgress?.elapsedSeconds ?? 0

  return (
    // Remount all section-scoped state when the route moves to another section.
    // Without this boundary, QuizEngine keeps the previous section's question
    // index and result mode, which can leave the new section's quiz empty.
    <div key={section.id} className="fade-up">
      <header className="lesson-hero">
        <div
          className="pointer-events-none absolute right-0 top-0 h-56 w-72 bg-grid opacity-40"
          aria-hidden="true"
        />
        <div className="relative p-5 sm:p-7 xl:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="eyebrow">{section.kicker}</p>
            <div className="lesson-meta">
              <span className="badge">
                <Clock3 className="h-3 w-3" aria-hidden="true" />~{section.estimatedMinutes} min
              </span>
              <span className="badge badge-amber">
                <GraduationCap className="h-3 w-3" aria-hidden="true" />
                {questions.length} past-exam {questions.length === 1 ? 'question' : 'questions'}
              </span>
              {completed ? (
                <span className="badge badge-teal">
                  <CheckCircle2 className="h-3 w-3" aria-hidden="true" />
                  Completed
                </span>
              ) : sectionProgress?.visited ? (
                <span className="badge badge-cyan">In progress</span>
              ) : null}
            </div>
          </div>

          <h1 className="lesson-title mt-5 max-w-5xl">{section.title}</h1>
          <div className="lesson-lede mt-4">
            <BilingualProse text={section.summary} />
          </div>

          <hr className="lesson-divider my-6 sm:my-7" />

          <div className="flex flex-wrap items-center gap-2">
            <a href="#quiz" className="btn btn-primary">
              <ClipboardCheck className="h-4 w-4" aria-hidden="true" />
              Jump to exam practice
            </a>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => toggleSectionBookmark(section.id)}
              aria-pressed={bookmarked}
            >
              {bookmarked ? (
                <BookmarkCheck className="h-4 w-4 text-amber-neon" aria-hidden="true" />
              ) : (
                <Bookmark className="h-4 w-4" aria-hidden="true" />
              )}
              {bookmarked ? 'Section bookmarked' : 'Bookmark section'}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setSectionCompleted(section.id, !completed)}
              aria-pressed={completed}
            >
              {completed ? (
                <CheckCircle2 className="h-4 w-4 text-teal-neon" aria-hidden="true" />
              ) : (
                <Circle className="h-4 w-4" aria-hidden="true" />
              )}
              {completed ? 'Mark as not completed' : 'Mark section complete'}
            </button>
            {studiedSeconds > 0 ? (
              <span className="inline-flex items-center gap-1.5 text-[0.78rem] text-mist-500">
                <Clock3 className="h-3.5 w-3.5" aria-hidden="true" />
                {formatDuration(studiedSeconds)} recorded
              </span>
            ) : null}
          </div>
        </div>
      </header>

      {subsections.length > 0 ? (
        <nav className="section-map mt-4" aria-label="Subsections in this lesson">
          <p className="block-label shrink-0">In this section</p>
          <ol className="section-map-list">
            {subsections.map((item, index) => (
              <li key={item.id}>
                <a href={`#${item.id}`} className="section-map-link">
                  <span className="font-mono text-[0.62rem] text-cyan-neon/75">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span>{item.label}</span>
                </a>
              </li>
            ))}
          </ol>
        </nav>
      ) : null}

      <section className="study-band mt-6" aria-label="Your study plan for this section">
        <div className="concept-card">
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-cyan-neon" aria-hidden="true" />
            <p className="block-label text-cyan-neon">Learning objectives</p>
          </div>
          <p className="mt-2 max-w-3xl text-[0.88rem] leading-relaxed text-mist-400">
            By the end of this section, you should be able to explain each of these ideas in your own
            words and recognise them in an exam question.
          </p>
          <ol className="mt-4 grid gap-x-8 gap-y-3 md:grid-cols-2">
            {section.objectives.map((objective, objectiveIndex) => (
              <li key={objectiveIndex} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-md border border-cyan-neon/25 bg-cyan-neon/[0.07] font-mono text-[0.68rem] font-semibold text-cyan-neon">
                  {objectiveIndex + 1}
                </span>
                <span className="text-[0.95rem] leading-relaxed text-mist-200">
                  <BilingualInline text={objective} />
                </span>
              </li>
            ))}
          </ol>
        </div>

        <StudyTimer sectionId={section.id} estimatedMinutes={section.estimatedMinutes} />
      </section>

      <div className="lesson-layout mt-10">
        <div className="lesson-body" ref={bodyRef}>
          {section.blocks.map((block, blockIndex) => (
            <div
              key={`${section.id}-${block.kind}-${blockIndex}`}
              id={`block-${blockIndex}`}
              className="scroll-mt-28"
              data-reveal=""
            >
              <BlockRenderer
                block={block}
                accentIndex={blockIndex}
                partNumber={
                  block.kind === 'subsection'
                    ? section.blocks.slice(0, blockIndex + 1).filter((entry) => entry.kind === 'subsection').length
                    : undefined
                }
              />
            </div>
          ))}

          <section id="exam-focus" className="exam-focus-card scroll-mt-28" data-reveal="">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-amber-neon" aria-hidden="true" />
                <p className="block-label text-amber-neon">Exam focus</p>
              </div>
              <span className="badge badge-amber">{section.examFocus.length} must-answer ideas</span>
            </div>
            <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-mist-50 sm:text-3xl">
              What this section must be able to answer
            </h2>
            <p className="mt-2 max-w-4xl text-[0.98rem] leading-relaxed text-mist-300">
              If you can answer these without notes, you have the section under control. They mirror
              the wording and distinctions that recur in the past papers.
            </p>
            <ul className="mt-5 grid gap-3 md:grid-cols-2">
              {section.examFocus.map((focus, focusIndex) => (
                <li
                  key={focusIndex}
                  className="flex items-start gap-3 rounded-xl border border-amber-neon/15 bg-ink-950/25 p-3.5"
                >
                  <Target className="mt-1 h-4 w-4 flex-none text-amber-neon" aria-hidden="true" />
                  <span className="text-[0.95rem] leading-relaxed text-mist-200">
                    <BilingualInline text={focus} />
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <section id="key-terms" className="scroll-mt-28">
            <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="eyebrow">Vocabulary</p>
                <h2 className="mt-1.5 font-display text-2xl font-semibold tracking-tight text-mist-50 sm:text-3xl">
                  Key terms to keep precise
                </h2>
                <p className="mt-1.5 max-w-3xl text-[0.95rem] leading-relaxed text-mist-400">
                  Exams reward exact terminology. Read each definition, then say it back without
                  looking.
                </p>
              </div>
              <span className="badge badge-violet">{section.keyTerms.length} terms</span>
            </div>
            <dl className="grid gap-3 md:grid-cols-2">
              {section.keyTerms.map((term) => (
                <div key={term.term} className="glossary-card">
                  <dt className="font-display text-[1.02rem] font-semibold tracking-tight text-mist-50">
                    {term.term}
                  </dt>
                  <dd className="mt-1.5 text-[0.93rem] leading-relaxed text-mist-300">
                    <BilingualInline text={term.definition} />
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="scroll-mt-28">
            <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="eyebrow">Exam practice</p>
                <h2 className="mt-1.5 font-display text-2xl font-semibold tracking-tight text-mist-50 sm:text-3xl">
                  Every question mapped to this section
                </h2>
                <p className="mt-2 max-w-3xl text-[0.95rem] leading-relaxed text-mist-400">
                  All {questions.length} historical Chapter {chapterNumber}{' '}
                  {questions.length === 1 ? 'question' : 'questions'} assigned to this section,
                  preserved with their original wording and exam provenance. There are no invented
                  practice items.
                  {shared.length > 0
                    ? ` ${shared.length} of them ${shared.length === 1 ? 'is' : 'are'} shared with another chapter that also teaches the idea — same implementation, same exam source.`
                    : null}
                </p>
              </div>
              <span className="badge badge-cyan">
                {questions.length} historical {questions.length === 1 ? 'question' : 'questions'}
              </span>
            </div>
            <QuizEngine quiz={quiz} />
          </section>

          <section className="concept-card flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-display text-lg font-semibold text-mist-50">
                {completed ? 'Section complete' : 'Finished reading and practising?'}
              </p>
              <p className="mt-1 text-[0.9rem] leading-relaxed text-mist-400">
                {completed
                  ? 'Your completion is saved in chapter progress.'
                  : 'Mark the section as complete when you finish it.'}
              </p>
            </div>
            <button
              type="button"
              className={completed ? 'btn btn-secondary' : 'btn btn-primary'}
              onClick={() => setSectionCompleted(section.id, !completed)}
            >
              {completed ? (
                <Check className="h-4 w-4 text-teal-neon" aria-hidden="true" />
              ) : (
                <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
              )}
              {completed ? 'Completed' : 'Mark complete'}
            </button>
          </section>

          <nav
            className="grid gap-3 border-t border-line-soft pt-6 sm:grid-cols-2"
            aria-label="Section navigation"
          >
            {previous ? (
              <Link
                to={osPath(`/section/${previous.id}`)}
                className="group rounded-2xl border border-line-soft bg-ink-900/35 p-4 transition-colors hover:border-cyan-neon/30 hover:bg-ink-800/50"
              >
                <span className="flex items-center gap-1.5 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-mist-500">
                  <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
                  Previous section
                </span>
                <span className="mt-1.5 block font-display text-base font-semibold text-mist-100 group-hover:text-white">
                  {previous.shortTitle}
                </span>
              </Link>
            ) : (
              <Link
                to={chapter.path}
                className="group rounded-2xl border border-line-soft bg-ink-900/35 p-4 transition-colors hover:border-cyan-neon/30 hover:bg-ink-800/50"
              >
                <span className="flex items-center gap-1.5 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-mist-500">
                  <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
                  Back to
                </span>
                <span className="mt-1.5 block font-display text-base font-semibold text-mist-100">
                  Chapter overview
                </span>
              </Link>
            )}
            {next ? (
              <Link
                to={osPath(`/section/${next.id}`)}
                className="group rounded-2xl border border-cyan-neon/25 bg-cyan-neon/[0.035] p-4 text-right transition-colors hover:border-cyan-neon/45 hover:bg-cyan-neon/[0.06]"
              >
                <span className="flex items-center justify-end gap-1.5 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-cyan-200">
                  Next section
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
                <span className="mt-1.5 block font-display text-base font-semibold text-mist-100 group-hover:text-white">
                  {next.shortTitle}
                </span>
              </Link>
            ) : (
              <Link
                to={`${chapter.path}/assessment`}
                className="group rounded-2xl border border-cyan-neon/25 bg-cyan-neon/[0.035] p-4 text-right transition-colors hover:border-cyan-neon/45 hover:bg-cyan-neon/[0.06]"
              >
                <span className="flex items-center justify-end gap-1.5 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-cyan-200">
                  Finish the chapter
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
                <span className="mt-1.5 block font-display text-base font-semibold text-mist-100">
                  Final assessment
                </span>
              </Link>
            )}
          </nav>
        </div>

        <aside className="lesson-rail no-print hidden 2xl:block" aria-label="Lesson outline and tools">
          <div className="panel p-5">
            <p className="block-label">
              <ListTree className="h-3.5 w-3.5 text-cyan-neon" aria-hidden="true" />
              On this page
            </p>
            <LessonOutline items={outline} />

            <div className="mt-5 border-t border-line-soft pt-4">
              <p className="block-label">Section at a glance</p>
              <dl className="mt-3 space-y-2 text-[0.82rem]">
                <div className="flex items-center justify-between gap-2">
                  <dt className="text-mist-500">Reading target</dt>
                  <dd className="font-mono text-mist-200">{section.estimatedMinutes} min</dd>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <dt className="text-mist-500">Historical questions</dt>
                  <dd className="font-mono text-amber-200">{historical.length}</dd>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <dt className="text-mist-500">Key terms</dt>
                  <dd className="font-mono text-mist-200">{section.keyTerms.length}</dd>
                </div>
              </dl>
            </div>

            <div className="mt-5 border-t border-line-soft pt-4">
              <p className="block-label">Continue revising</p>
              <div className="mt-3 space-y-2">
                <Link to={`${chapter.path}/review`} className="rail-link border-0 ps-0 hover:text-cyan-neon">
                  <GraduationCap className="mt-0.5 h-3.5 w-3.5 flex-none" aria-hidden="true" />
                  <span>Final review</span>
                </Link>
                <Link to={`${chapter.path}/cheat-sheet`} className="rail-link border-0 ps-0 hover:text-cyan-neon">
                  <BookMarked className="mt-0.5 h-3.5 w-3.5 flex-none" aria-hidden="true" />
                  <span>Cheat sheet</span>
                </Link>
                <Link to={osPath('/bookmarks')} className="rail-link border-0 ps-0 hover:text-cyan-neon">
                  <Bookmark className="mt-0.5 h-3.5 w-3.5 flex-none" aria-hidden="true" />
                  <span>Bookmarks &amp; revision</span>
                </Link>
              </div>
            </div>

            <Link
              to={chapter.path}
              className={cn(
                'btn btn-secondary btn-sm mt-5 w-full',
                completed && 'border-teal-neon/30 text-teal-100',
              )}
            >
              <CheckCircle2
                className={cn('h-4 w-4', completed ? 'text-teal-neon' : 'text-mist-500')}
                aria-hidden="true"
              />
              {completed ? 'Section complete' : 'Chapter overview'}
            </Link>
          </div>
        </aside>
      </div>
    </div>
  )
}
