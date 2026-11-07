import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  BarChart3,
  BookOpen,
  CheckCircle2,
  Circle,
  Clock3,
  LayoutDashboard,
  RotateCcw,
  Target,
  Trophy,
} from 'lucide-react'
import { quizzesById, getSectionQuiz } from '../data/quizzes'
import { allSectionsById, chapterOfQuiz, chapters, chaptersById } from '../data/chapters'
import { useActiveChapter } from '../lib/activeChapter'
import type { ChapterId } from '../types'
import { useProgress } from '../context/ProgressContext'
import {
  formatDate,
  formatDuration,
  getMissedQuestions,
  getProgressOverview,
  getWeakSections,
  percent,
} from '../lib/progress'
import { ProgressRing } from '../components/ui/ProgressRing'
import { cn } from '../lib/cn'
import { osPath } from '../paths'

function quizDestination(quizId: string): { label: string; to: string } {
  const owner = chapterOfQuiz(quizId)
  if (owner && owner.finalAssessment.id === quizId) {
    return { label: `Chapter ${Number(owner.meta.number)} final assessment`, to: `${owner.path}/assessment` }
  }
  if (quizId.startsWith('bookmarked-practice')) {
    return { label: 'Bookmarked practice', to: osPath('/bookmarks/practice') }
  }
  const quiz = quizzesById.get(quizId)
  if (quiz) {
    const section = allSectionsById.get(quiz.sectionId)
    if (section) {
      return { label: `${section.shortTitle} quiz`, to: osPath(`/section/${section.id}#quiz`) }
    }
  }
  return { label: 'Quiz attempt', to: osPath('/progress') }
}

export function ProgressPage() {
  const { progress, resetProgress } = useProgress()
  const [confirmReset, setConfirmReset] = useState(false)
  const active = useActiveChapter()
  const [chapterId, setChapterId] = useState<ChapterId>(active.meta.id)
  const chapter = chaptersById.get(chapterId) ?? active
  const { sections, totalEstimatedMinutes } = chapter
  const chapterNumber = Number(chapter.meta.number)
  const overview = getProgressOverview(progress, chapter)
  const weakSections = getWeakSections(progress, chapter)
  const missed = getMissedQuestions(progress, chapter)

  const attempts = useMemo(
    () =>
      Object.entries(progress.quizzes)
        .map(([quizId, attempt]) => ({ quizId, attempt }))
        .sort((a, b) => b.attempt.attemptedAt - a.attempt.attemptedAt),
    [progress.quizzes],
  )

  const nextSection =
    sections.find((section) => !progress.sections[section.id]?.completed) ?? sections[0]
  const finalBest = progress.bestScores[chapter.finalAssessment.id]
  const finalAttempt = progress.quizzes[chapter.finalAssessment.id]
  const targetMinutes = totalEstimatedMinutes
  const studyRatio = targetMinutes > 0 ? (overview.studySeconds / (targetMinutes * 60)) * 100 : 0

  return (
    <div className="fade-up">
      <header className="panel panel-glow relative overflow-hidden p-5 sm:p-6">
        <div
          className="pointer-events-none absolute right-0 top-0 h-48 w-64 bg-grid opacity-45"
          aria-hidden="true"
        />
        <div className="relative">
          <p className="eyebrow">Chapter {chapterNumber}</p>
          <h1 className="section-title mt-2">Progress dashboard</h1>
          <div className="mt-3 inline-flex rounded-lg border border-line-soft bg-ink-950/60 p-1" role="tablist" aria-label="Chapter">
            {chapters.map((entry) => (
              <button
                key={entry.meta.id}
                type="button"
                role="tab"
                aria-selected={entry.meta.id === chapter.meta.id}
                onClick={() => setChapterId(entry.meta.id)}
                className={cn(
                  'rounded-md px-3 py-1 text-[0.78rem] font-semibold transition-colors',
                  entry.meta.id === chapter.meta.id ? 'bg-cyan-neon/15 text-cyan-neon' : 'text-mist-400 hover:text-mist-100',
                )}
              >
                Chapter {Number(entry.meta.number)}
              </button>
            ))}
          </div>
          <p className="mt-2 max-w-3xl text-[0.98rem] leading-relaxed text-mist-300">
            Everything here comes from your own study record on this device: section completion,
            recorded study time, quiz attempts, and the questions whose latest result is a miss.
            Nothing is inferred from an invisible backend.
          </p>

          <div className="mt-4 grid grid-cols-2 gap-2 lg:grid-cols-4">
            {[
              { value: `${overview.completionPercent}%`, label: 'sections complete', icon: CheckCircle2 },
              { value: formatDuration(overview.studySeconds), label: 'study time recorded', icon: Clock3 },
              {
                value:
                  overview.averageBestPercent === null
                    ? '—'
                    : `${overview.averageBestPercent}%`,
                label: 'average best score',
                icon: Trophy,
              },
              {
                value:
                  overview.accuracyPercent === null ? '—' : `${overview.accuracyPercent}%`,
                label: 'graded accuracy',
                icon: BarChart3,
              },
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
        </div>
      </header>

      <div className="mt-4 grid gap-3 lg:grid-cols-[1.2fr_0.8fr]">
        <section className="panel p-4 sm:p-5" aria-labelledby="standing-heading">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="font-mono text-[0.58rem] uppercase tracking-[0.13em] text-mist-500">
                Chapter standing
              </p>
              <h2
                id="standing-heading"
                className="mt-1 font-display text-lg font-semibold text-mist-50"
              >
                {overview.sectionsCompleted === overview.totalSections
                  ? 'All sections marked complete'
                  : overview.sectionsVisited > 0
                    ? 'Revision in progress'
                    : 'Ready for the first section'}
              </h2>
            </div>
            <ProgressRing
              value={overview.completionPercent}
              size={82}
              stroke={7}
              sublabel="complete"
            />
          </div>

          <div className="mt-3 grid grid-cols-3 gap-2">
            <div className="rounded-lg border border-line-soft bg-ink-950/30 px-3 py-2">
              <p className="font-display text-lg font-semibold text-mist-50">
                {overview.sectionsVisited}/{overview.totalSections}
              </p>
              <p className="text-[0.58rem] uppercase tracking-wider text-mist-500">sections visited</p>
            </div>
            <div className="rounded-lg border border-line-soft bg-ink-950/30 px-3 py-2">
              <p className="font-display text-lg font-semibold text-mist-50">
                {overview.quizzesAttempted}
              </p>
              <p className="text-[0.58rem] uppercase tracking-wider text-mist-500">quiz records</p>
            </div>
            <div className="rounded-lg border border-line-soft bg-ink-950/30 px-3 py-2">
              <p className="font-display text-lg font-semibold text-mist-50">
                {overview.questionsGraded}
              </p>
              <p className="text-[0.58rem] uppercase tracking-wider text-mist-500">
                graded answers logged
              </p>
            </div>
          </div>

          <div className="mt-3">
            <div className="flex items-center justify-between text-[0.64rem] text-mist-500">
              <span>Recorded study time against the {targetMinutes}-minute core estimate</span>
              <span className="font-mono text-mist-300">
                {formatDuration(overview.studySeconds)} / {targetMinutes}m
              </span>
            </div>
            <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-ink-700">
              <div
                className="h-full rounded-full bg-gradient-to-r from-violet-neon to-cyan-neon"
                style={{ width: `${Math.min(100, studyRatio)}%` }}
              />
            </div>
            <p className="mt-1.5 text-[0.62rem] leading-relaxed text-mist-600">
              The core estimate is the sum of section reading and quiz estimates. Timer time is only
              recorded while the timer is running; it is not a deadline.
            </p>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            <Link to={osPath(`/section/${nextSection.id}`)} className="btn btn-primary btn-sm">
              <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
              {overview.sectionsVisited === 0
                ? `Start Chapter ${chapterNumber}`
                : `Continue: ${nextSection.shortTitle}`}
            </Link>
            <Link to={`${chapter.path}/review`} className="btn btn-secondary btn-sm">
              Final review
            </Link>
            <Link to={`${chapter.path}/assessment`} className="btn btn-secondary btn-sm">
              <Target className="h-3.5 w-3.5" aria-hidden="true" />
              {finalAttempt ? 'Reopen assessment' : 'Take assessment'}
            </Link>
          </div>
        </section>

        <section className="panel p-4 sm:p-5" aria-labelledby="weak-heading">
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-rose-neon" aria-hidden="true" />
            <h2 id="weak-heading" className="font-display text-sm font-semibold text-mist-50">
              Weak topics
            </h2>
          </div>
          {weakSections.length === 0 ? (
            <div className="mt-2">
              <p className="text-[0.76rem] leading-relaxed text-mist-400">
                No current weak topics. After a quiz submission, any question whose latest result is a
                miss appears here. A later correct answer clears it automatically.
              </p>
              <Link to={`${chapter.path}/assessment`} className="link-arrow mt-2.5 text-[0.7rem]">
                Generate a signal with the assessment
                <ArrowRight className="h-3 w-3" aria-hidden="true" />
              </Link>
            </div>
          ) : (
            <div className="mt-2 space-y-1.5">
              {weakSections.map(({ section, totalMissed }) => (
                <Link
                  key={section.id}
                  to={osPath(`/section/${section.id}#quiz`)}
                  className="flex items-center justify-between gap-2 rounded-lg border border-line-soft bg-ink-950/30 px-2.5 py-2 transition-colors hover:border-rose-neon/30 hover:bg-ink-900/60"
                >
                  <span className="text-[0.72rem] text-mist-300">{section.shortTitle}</span>
                  <span className="badge badge-rose">{totalMissed} missed</span>
                </Link>
              ))}
              <p className="pt-1 text-[0.62rem] leading-relaxed text-mist-600">
                {missed.length} unique question{missed.length === 1 ? '' : 's'} currently unresolved
                across {weakSections.length} section{weakSections.length === 1 ? '' : 's'}.
              </p>
            </div>
          )}
        </section>
      </div>

      <section className="mt-5" aria-labelledby="sections-heading">
        <div className="mb-2 flex flex-wrap items-end justify-between gap-2">
          <div>
            <p className="eyebrow">Section ledger</p>
            <h2
              id="sections-heading"
              className="mt-1 font-display text-lg font-semibold text-mist-50"
            >
              Every section, with its evidence
            </h2>
          </div>
          <span className="badge badge-cyan">{overview.sectionsCompleted} complete</span>
        </div>

        <div className="panel overflow-hidden">
          <div className="hidden grid-cols-[minmax(0,1.6fr)_0.7fr_0.7fr_0.8fr_0.9fr] gap-2 border-b border-line-soft bg-ink-900/40 px-4 py-2 font-mono text-[0.56rem] uppercase tracking-wider text-mist-500 md:grid">
            <span>Section</span>
            <span>Status</span>
            <span>Time</span>
            <span>Best quiz</span>
            <span className="text-right">Open</span>
          </div>
          <div className="divide-line">
            {sections.map((section) => {
              const sectionProgress = progress.sections[section.id]
              const best = progress.bestScores[section.quizId]
              const quiz = getSectionQuiz(section.id)
              const completed = sectionProgress?.completed ?? false
              const visited = sectionProgress?.visited ?? false
              return (
                <div
                  key={section.id}
                  className="grid gap-2 px-4 py-3 md:grid-cols-[minmax(0,1.6fr)_0.7fr_0.7fr_0.8fr_0.9fr] md:items-center"
                >
                  <div className="flex items-start gap-2.5">
                    <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-md border border-line bg-ink-950/50 font-mono text-[0.55rem] text-mist-500">
                      {String(section.order).padStart(2, '0')}
                    </span>
                    <div className="min-w-0">
                      <Link
                        to={osPath(`/section/${section.id}`)}
                        className="block truncate text-[0.8rem] font-semibold text-mist-200 hover:text-white"
                      >
                        {section.shortTitle}
                      </Link>
                      <p className="mt-0.5 text-[0.6rem] text-mist-600">
                        {quiz.questionIds.length} quiz Qs · ~{section.estimatedMinutes} min
                      </p>
                    </div>
                  </div>

                  <div>
                    {completed ? (
                      <span className="badge badge-teal">
                        <CheckCircle2 className="h-2.5 w-2.5" aria-hidden="true" />
                        complete
                      </span>
                    ) : visited ? (
                      <span className="badge badge-cyan">visited</span>
                    ) : (
                      <span className="badge">
                        <Circle className="h-2.5 w-2.5" aria-hidden="true" />
                        not started
                      </span>
                    )}
                  </div>

                  <div className="text-[0.68rem] text-mist-400">
                    <span className="md:hidden">Time: </span>
                    {formatDuration(sectionProgress?.elapsedSeconds ?? 0)}
                  </div>

                  <div className="text-[0.68rem]">
                    {best ? (
                      <span
                        className={cn(
                          'inline-flex items-center gap-1 font-mono',
                          percent(best.score, best.total) >= 75 ? 'text-teal-200' : 'text-amber-200',
                        )}
                      >
                        <Trophy className="h-3 w-3" aria-hidden="true" />
                        {best.score}/{best.total} · {percent(best.score, best.total)}%
                      </span>
                    ) : (
                      <span className="text-mist-600">No attempt</span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 md:justify-end">
                    <Link
                      to={osPath(`/section/${section.id}`)}
                      className="btn btn-secondary btn-sm"
                      aria-label={`Open ${section.shortTitle}`}
                    >
                      Read
                    </Link>
                    <Link
                      to={osPath(`/section/${section.id}#quiz`)}
                      className="btn btn-ghost btn-sm"
                      aria-label={`Open quiz for ${section.shortTitle}`}
                    >
                      Quiz
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <div className="mt-5 grid gap-3 lg:grid-cols-[1.15fr_0.85fr]">
        <section className="panel p-4 sm:p-5" aria-labelledby="attempts-heading">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-cyan-neon" aria-hidden="true" />
              <h2 id="attempts-heading" className="font-display text-sm font-semibold text-mist-50">
                Quiz attempts
              </h2>
            </div>
            <span className="badge">{attempts.length}</span>
          </div>

          {attempts.length === 0 ? (
            <div className="mt-3 rounded-lg border border-line-soft bg-ink-950/25 p-4">
              <p className="text-[0.76rem] leading-relaxed text-mist-400">
                No submissions yet. Each attempt is saved locally with its answers, score, and full
                review. Retaking a quiz updates the saved attempt and keeps your personal best.
              </p>
              <Link to={osPath(`/section/${nextSection.id}#quiz`)} className="link-arrow mt-2.5 text-[0.7rem]">
                Try the first section quiz
                <ArrowRight className="h-3 w-3" aria-hidden="true" />
              </Link>
            </div>
          ) : (
            <div className="mt-2.5 space-y-1.5">
              {attempts.map(({ quizId, attempt }) => {
                const destination = quizDestination(quizId)
                const best = progress.bestScores[quizId]
                const itemPercent = percent(attempt.score, attempt.total)
                return (
                  <article
                    key={quizId}
                    className="rounded-lg border border-line-soft bg-ink-950/30 p-2.5"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div className="min-w-0">
                        <AmberOrTealPercent percentValue={itemPercent} />
                        <Link
                          to={destination.to}
                          className="mt-1 block truncate text-[0.76rem] font-semibold text-mist-200 hover:text-white"
                        >
                          {destination.label}
                        </Link>
                        <p className="mt-0.5 font-mono text-[0.56rem] text-mist-600">
                          {formatDate(attempt.attemptedAt)}
                          {best ? ` · best ${best.score}/${best.total}` : ''}
                        </p>
                      </div>
                      <span className="font-display text-base font-semibold text-mist-100">
                        {attempt.score}/{attempt.total}
                        <span className="ms-1 font-mono text-[0.6rem] font-normal text-mist-500">
                          {itemPercent}%
                        </span>
                      </span>
                    </div>
                  </article>
                )
              })}
            </div>
          )}
        </section>

        <div className="space-y-3">
          {finalBest ? (
            <section className="panel p-4" aria-labelledby="final-heading">
              <div className="flex items-center gap-2">
                <Trophy className="h-4 w-4 text-amber-neon" aria-hidden="true" />
                <h2 id="final-heading" className="font-display text-sm font-semibold text-mist-50">
                  Final assessment
                </h2>
              </div>
              <div className="mt-2 flex items-center justify-between gap-3 rounded-lg border border-amber-neon/25 bg-amber-neon/[0.045] px-3 py-2.5">
                <div>
                  <p className="font-display text-2xl font-semibold leading-none text-mist-50">
                    {finalBest.score}/{finalBest.total}
                  </p>
                  <p className="mt-1 text-[0.62rem] text-mist-500">
                    Best · {percent(finalBest.score, finalBest.total)}%
                  </p>
                </div>
                <span className="text-[0.62rem] text-mist-500">{formatDate(finalBest.at)}</span>
              </div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                <Link to={`${chapter.path}/assessment`} className="btn btn-secondary btn-sm">
                  Review or retry
                </Link>
                <Link to={`${chapter.path}/review`} className="btn btn-ghost btn-sm">
                  Final review
                </Link>
              </div>
            </section>
          ) : (
            <section className="panel p-4" aria-labelledby="final-empty-heading">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-cyan-neon" aria-hidden="true" />
                <h2
                  id="final-empty-heading"
                  className="font-display text-sm font-semibold text-mist-50"
                >
                  Final assessment not attempted
                </h2>
              </div>
              <p className="mt-2 text-[0.74rem] leading-relaxed text-mist-400">
                The final assessment samples every section of the chapter.
              </p>
              <Link to={`${chapter.path}/assessment`} className="btn btn-primary btn-sm mt-2.5">
                Begin the paper
              </Link>
            </section>
          )}

          <section className="panel p-4" aria-labelledby="data-heading">
            <div className="flex items-center gap-2">
              <LayoutDashboard className="h-4 w-4 text-violet-neon" aria-hidden="true" />
              <h2 id="data-heading" className="font-display text-sm font-semibold text-mist-50">
                Local data
              </h2>
            </div>
            <p className="mt-2 text-[0.7rem] leading-relaxed text-mist-500">
              Section progress, bookmarks, quiz attempts, and best scores are stored in this browser
              only. Clearing site data or resetting below removes them permanently.
            </p>

            {confirmReset ? (
              <div
                className="mt-2.5 rounded-lg border border-rose-neon/35 bg-rose-neon/[0.06] p-2.5"
                role="alert"
              >
                <p className="flex items-start gap-1.5 text-[0.7rem] leading-relaxed text-rose-100">
                  <AlertTriangle className="mt-0.5 h-3.5 w-3.5 flex-none" aria-hidden="true" />
                  Reset all progress, quiz history, bookmarks, and study time on this device?
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  <button
                    type="button"
                    className="btn btn-danger btn-sm"
                    onClick={() => {
                      resetProgress()
                      setConfirmReset(false)
                    }}
                  >
                    Yes, reset everything
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    onClick={() => setConfirmReset(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <button
                type="button"
                className="btn btn-secondary btn-sm mt-2.5"
                onClick={() => setConfirmReset(true)}
              >
                <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                Reset progress
              </button>
            )}
          </section>
        </div>
      </div>
    </div>
  )
}

function AmberOrTealPercent({ percentValue }: { percentValue: number }) {
  return (
    <span
      className={cn(
        'font-mono text-[0.6rem] font-semibold uppercase tracking-wider',
        percentValue >= 75 ? 'text-teal-200' : 'text-amber-200',
      )}
    >
      {percentValue >= 90
        ? 'exam-ready'
        : percentValue >= 75
          ? 'solid'
          : percentValue >= 60
            ? 'getting there'
            : 'needs revision'}
    </span>
  )
}
