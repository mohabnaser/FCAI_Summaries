import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowLeft,
  BookMarked,
  BookOpen,
  ClipboardCheck,
  Flag,
  GraduationCap,
  Layers,
  Sparkles,
} from 'lucide-react'
import type { Question, Quiz } from '../types'
import { questionsById } from '../data/questions'
import { allSections as sections } from '../data/chapters'
import { useActiveChapter } from '../lib/activeChapter'
import { useProgress } from '../context/ProgressContext'
import { QuizEngine } from '../components/quiz/QuizEngine'
import { osPath } from '../paths'

function hashIds(ids: string[]): string {
  let hash = 2166136261
  for (const id of [...ids].sort()) {
    for (let index = 0; index < id.length; index += 1) {
      hash ^= id.charCodeAt(index)
      hash = Math.imul(hash, 16777619)
    }
    hash ^= 31
    hash = Math.imul(hash, 16777619)
  }
  return (hash >>> 0).toString(36)
}

export function BookmarkedPracticePage() {
  const activeChapter = useActiveChapter()
  const { progress } = useProgress()
  const [questions] = useState<Question[]>(() =>
    progress.bookmarks.questions
      .map((id) => questionsById.get(id))
      .filter((question): question is Question => Boolean(question)),
  )

  const quiz = useMemo<Quiz | null>(() => {
    if (questions.length === 0) return null
    const flagged = questions.filter((question) => question.unscored).length
    return {
      id: `bookmarked-practice-${questions.length}-${hashIds(questions.map((question) => question.id))}`,
      sectionId: 'chapter-1',
      title: 'Bookmarked practice',
      description: `${questions.length} saved historical question${
        questions.length === 1 ? '' : 's'
      }${flagged > 0 ? `, including ${flagged} flagged and unscored` : ''}. This set is frozen from the bookmarks that were present when you opened the page.`,
      questionIds: questions.map((question) => question.id),
    }
  }, [questions])

  const historical = questions.filter((question) => question.origin === 'historical').length
  const flagged = questions.filter((question) => question.unscored).length
  const sectionIds = new Set(questions.map((question) => question.sectionId))
  const sectionCounts = sections
    .map((section) => ({
      section,
      count: questions.filter((question) => question.sectionId === section.id).length,
    }))
    .filter((entry) => entry.count > 0)

  return (
    <div className="fade-up">
      <header className="panel panel-glow relative overflow-hidden p-5 sm:p-6">
        <div
          className="pointer-events-none absolute right-0 top-0 h-48 w-64 bg-grid opacity-45"
          aria-hidden="true"
        />
        <div className="relative">
          <Link to={osPath('/bookmarks')} className="link-arrow text-[0.7rem]">
            <ArrowLeft className="h-3 w-3" aria-hidden="true" />
            Back to bookmarks
          </Link>
          <p className="eyebrow mt-3">All chapters</p>
          <h1 className="section-title mt-2">Bookmarked practice</h1>
          <p className="mt-2 max-w-3xl text-[0.98rem] leading-relaxed text-mist-300">
            A quiz composed of the saved questions. The question set is fixed when the page opens.
          </p>

          {questions.length > 0 ? (
            <div className="mt-4 grid grid-cols-2 gap-2 lg:grid-cols-4">
              {[
                { value: questions.length, label: 'saved questions', icon: BookMarked },
                { value: historical, label: 'past-exam items', icon: GraduationCap },
                { value: sectionIds.size, label: 'sections represented', icon: Layers },
                { value: flagged, label: 'unscored review items', icon: Flag },
              ].map((stat) => {
                const Icon = stat.icon
                return (
                  <div
                    key={stat.label}
                    className="rounded-lg border border-line-soft bg-ink-900/40 px-3 py-2.5"
                  >
                    <Icon className="h-3.5 w-3.5 text-cyan-neon" aria-hidden="true" />
                    <p className="mt-1 font-display text-lg font-semibold leading-none text-mist-50">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-[0.6rem] uppercase tracking-wider text-mist-500">
                      {stat.label}
                    </p>
                  </div>
                )
              })}
            </div>
          ) : null}
        </div>
      </header>

      {questions.length === 0 || !quiz ? (
        <section className="panel mt-5 p-8 text-center">
          <BookMarked className="mx-auto h-7 w-7 text-amber-neon" aria-hidden="true" />
          <h2 className="mt-2 font-display text-lg font-semibold text-mist-50">
            No bookmarked questions yet
          </h2>
          <p className="mx-auto mt-1 max-w-lg text-sm leading-relaxed text-mist-500">
            Open any section quiz, choose the bookmark icon on a question card, then return here to
            practise exactly those questions.
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            <Link to={osPath('/')} className="btn btn-primary btn-sm">
              <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
              Browse sections
            </Link>
            <Link to={`${activeChapter.path}/assessment`} className="btn btn-secondary btn-sm">
              <ClipboardCheck className="h-3.5 w-3.5" aria-hidden="true" />
              Final assessment
            </Link>
          </div>
        </section>
      ) : (
        <>
          <div className="mt-4 grid gap-3 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="panel p-4">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-violet-neon" aria-hidden="true" />
                <h2 className="font-display text-sm font-semibold text-mist-50">
                  What is in this set
                </h2>
              </div>
              <div className="mt-2.5 grid gap-1.5 sm:grid-cols-2">
                {sectionCounts.map(({ section, count }) => (
                  <Link
                    key={section.id}
                    to={osPath(`/section/${section.id}#quiz`)}
                    className="flex items-center justify-between gap-2 rounded-md border border-line-soft bg-ink-950/30 px-2.5 py-1.5 text-[0.68rem] transition-colors hover:border-cyan-neon/25 hover:text-mist-100"
                  >
                    <span className="truncate text-mist-400">{section.shortTitle}</span>
                    <span className="font-mono text-mist-300">{count}</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="panel p-4">
              <div className="flex items-center gap-2">
                <Flag className="h-4 w-4 text-amber-neon" aria-hidden="true" />
                <h2 className="font-display text-sm font-semibold text-mist-50">
                  How this quiz is scored
                </h2>
              </div>
              <ul className="mt-2 space-y-1.5 text-[0.72rem] leading-relaxed text-mist-400">
                <li>
                  Every saved question uses the same grading rules as its section quiz.
                </li>
                <li>
                  Flagged review items stay visible and explained but are excluded from the score.
                </li>
                <li>
                  The attempt is stored against this exact question set, so a different bookmark
                  selection starts a separate record.
                </li>
                {flagged > 0 ? (
                  <li className="text-amber-200/90">
                    This set contains {flagged} unscored item{flagged === 1 ? '' : 's'}; read their
                    ambiguity notes rather than treating them as exam truth.
                  </li>
                ) : null}
              </ul>
              <Link to={osPath('/bookmarks')} className="link-arrow mt-2.5 text-[0.7rem]">
                Edit the bookmark set
              </Link>
            </div>
          </div>

          <div className="mt-5">
            <QuizEngine quiz={quiz} questions={questions} />
          </div>
        </>
      )}
    </div>
  )
}
