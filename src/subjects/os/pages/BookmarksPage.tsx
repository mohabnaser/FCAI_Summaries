import { Link } from 'react-router-dom'
import {
  ArrowRight,
  BookMarked,
  BookOpen,
  CheckCircle2,
  ClipboardCheck,
  GraduationCap,
  ListChecks,
  Target,
  Trash2,
} from 'lucide-react'
import { allSections as sections } from '../data/chapters'
import { useActiveChapter } from '../lib/activeChapter'
import { questionsById } from '../data/questions'
import { historicalForSection, questionsForSection } from '../data/quizzes'
import { useProgress } from '../context/ProgressContext'
import { getQuestionTypeLabel, getWeakSections } from '../lib/progress'
import { QuestionSources } from '../components/quiz/QuestionMeta'
import { BilingualProse } from '../components/ui/Text'
import { osPath } from '../paths'

export function BookmarksPage() {
  const activeChapter = useActiveChapter()
  const {
    progress,
    toggleSectionBookmark,
    toggleQuestionBookmark,
  } = useProgress()
  const weakSections = getWeakSections(progress)

  const savedSections = [...progress.bookmarks.sections]
    .reverse()
    .map((id) => sections.find((section) => section.id === id))
    .filter((section): section is (typeof sections)[number] => Boolean(section))

  const savedQuestions = [...progress.bookmarks.questions]
    .reverse()
    .map((id) => questionsById.get(id))
    .filter((question): question is NonNullable<typeof question> => Boolean(question))

  return (
    <div className="fade-up">
      <header className="panel panel-glow relative overflow-hidden p-5 sm:p-6">
        <div
          className="pointer-events-none absolute right-0 top-0 h-48 w-64 bg-grid opacity-45"
          aria-hidden="true"
        />
        <div className="relative">
          <p className="eyebrow">All chapters</p>
          <h1 className="section-title mt-2">Bookmarks &amp; revision</h1>
          <p className="mt-2 max-w-3xl text-[0.98rem] leading-relaxed text-mist-300">
            Saved sections, saved questions, and the topics with incorrect answers.
          </p>

          <div className="mt-4 grid grid-cols-3 gap-2">
            <div className="rounded-lg border border-line-soft bg-ink-900/40 px-3 py-2.5">
              <BookMarked className="h-3.5 w-3.5 text-amber-neon" aria-hidden="true" />
              <p className="mt-1 font-display text-lg font-semibold leading-none text-mist-50">
                {savedSections.length}
              </p>
              <p className="mt-1 text-[0.6rem] uppercase tracking-wider text-mist-500">
                saved sections
              </p>
            </div>
            <div className="rounded-lg border border-line-soft bg-ink-900/40 px-3 py-2.5">
              <ListChecks className="h-3.5 w-3.5 text-cyan-neon" aria-hidden="true" />
              <p className="mt-1 font-display text-lg font-semibold leading-none text-mist-50">
                {savedQuestions.length}
              </p>
              <p className="mt-1 text-[0.6rem] uppercase tracking-wider text-mist-500">
                saved questions
              </p>
            </div>
            <div className="rounded-lg border border-line-soft bg-ink-900/40 px-3 py-2.5">
              <Target className="h-3.5 w-3.5 text-rose-neon" aria-hidden="true" />
              <p className="mt-1 font-display text-lg font-semibold leading-none text-mist-50">
                {weakSections.length}
              </p>
              <p className="mt-1 text-[0.6rem] uppercase tracking-wider text-mist-500">
                weak sections
              </p>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <Link
              to={osPath('/bookmarks/practice')}
              className={savedQuestions.length > 0 ? 'btn btn-primary' : 'btn btn-secondary'}
              aria-disabled={savedQuestions.length === 0}
              onClick={(event) => {
                if (savedQuestions.length === 0) event.preventDefault()
              }}
            >
              <ClipboardCheck className="h-4 w-4" aria-hidden="true" />
              Practise saved questions
              {savedQuestions.length > 0 ? (
                <span className="rounded-full bg-ink-950/15 px-1.5 py-0.5 font-mono text-[0.6rem]">
                  {savedQuestions.length}
                </span>
              ) : null}
            </Link>
            <Link to={osPath('/progress')} className="btn btn-secondary">
              Open progress dashboard
            </Link>
            <Link to={`${activeChapter.path}/cheat-sheet`} className="btn btn-ghost">
              Cheat sheet
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          {savedQuestions.length === 0 ? (
            <p className="mt-2 text-[0.66rem] text-mist-500">
              Save a question with the bookmark icon during any quiz to build a practice set.
            </p>
          ) : (
            <p className="mt-2 text-[0.66rem] text-mist-500">
              The practice set uses the bookmarks present when you open it. A saved attempt is tied to
              that exact set of questions.
            </p>
          )}
        </div>
      </header>

      <div className="mt-5 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-5">
          <section aria-labelledby="saved-sections-heading">
            <div className="mb-2 flex flex-wrap items-end justify-between gap-2">
              <div>
                <p className="eyebrow">Read again</p>
                <h2
                  id="saved-sections-heading"
                  className="mt-1 font-display text-lg font-semibold text-mist-50"
                >
                  Saved sections
                </h2>
              </div>
              <span className="badge">{savedSections.length}</span>
            </div>

            {savedSections.length === 0 ? (
              <div className="panel p-5">
                <p className="font-display text-sm font-semibold text-mist-100">
                  No sections bookmarked
                </p>
                <p className="mt-1 text-[0.76rem] leading-relaxed text-mist-500">
                  Use “Bookmark section” at the top of any teaching section. Saved sections appear here
                  with their completion state and quiz count.
                </p>
                <Link to={osPath('/')} className="link-arrow mt-2.5 text-[0.72rem]">
                  Browse the sections
                  <ArrowRight className="h-3 w-3" aria-hidden="true" />
                </Link>
              </div>
            ) : (
              <div className="space-y-2">
                {savedSections.map((section) => {
                  const sectionProgress = progress.sections[section.id]
                  const historical = historicalForSection(section.id).length
                  const total = questionsForSection(section.id).length
                  return (
                    <article key={section.id} className="panel p-4">
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div className="flex items-start gap-2.5">
                          <span className="flex h-7 w-7 flex-none items-center justify-center rounded-lg border border-line bg-ink-950/50 font-mono text-[0.58rem] text-cyan-neon">
                            {String(section.order).padStart(2, '0')}
                          </span>
                          <div>
                            <h3 className="font-display text-sm font-semibold text-mist-50">
                              {section.title}
                            </h3>
                            <p className="mt-0.5 text-[0.64rem] text-mist-500">
                              {section.kicker} · ~{section.estimatedMinutes} min
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          className="icon-btn h-7 w-7 text-mist-500 hover:text-rose-200"
                          onClick={() => toggleSectionBookmark(section.id)}
                          aria-label={`Remove bookmark from ${section.title}`}
                          title="Remove section bookmark"
                        >
                          <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                        </button>
                      </div>

                      <div className="mt-2.5">
                        <BilingualProse text={section.summary} className="text-[0.76rem]" />
                      </div>

                      <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
                        {sectionProgress?.completed ? (
                          <span className="badge badge-teal">
                            <CheckCircle2 className="h-2.5 w-2.5" aria-hidden="true" />
                            completed
                          </span>
                        ) : sectionProgress?.visited ? (
                          <span className="badge badge-cyan">visited</span>
                        ) : (
                          <span className="badge">not visited</span>
                        )}
                        <span className="badge">{total} quiz Qs</span>
                        {historical > 0 ? (
                          <span className="badge badge-amber">
                            <GraduationCap className="h-2.5 w-2.5" aria-hidden="true" />
                            {historical} past-exam
                          </span>
                        ) : null}
                        <Link
                          to={osPath(`/section/${section.id}`)}
                          className="link-arrow ms-auto text-[0.68rem]"
                        >
                          Open section
                          <ArrowRight className="h-3 w-3" aria-hidden="true" />
                        </Link>
                      </div>
                    </article>
                  )
                })}
              </div>
            )}
          </section>

          <section aria-labelledby="saved-questions-heading">
            <div className="mb-2 flex flex-wrap items-end justify-between gap-2">
              <div>
                <p className="eyebrow">Targeted practice</p>
                <h2
                  id="saved-questions-heading"
                  className="mt-1 font-display text-lg font-semibold text-mist-50"
                >
                  Saved questions
                </h2>
              </div>
              <span className="badge">{savedQuestions.length}</span>
            </div>

            {savedQuestions.length === 0 ? (
              <div className="panel p-5">
                <p className="font-display text-sm font-semibold text-mist-100">
                  No questions bookmarked
                </p>
                <p className="mt-1 text-[0.76rem] leading-relaxed text-mist-500">
                  Every question card in a quiz has a bookmark button. Save the ones whose explanation
                  you want to revisit, then build a practice set from just those questions.
                </p>
                <Link to={`${activeChapter.path}/assessment`} className="link-arrow mt-2.5 text-[0.72rem]">
                  Take the final assessment
                  <ArrowRight className="h-3 w-3" aria-hidden="true" />
                </Link>
              </div>
            ) : (
              <div className="space-y-2">
                {savedQuestions.map((question) => {
                  const section = sections.find(
                    (candidate) => candidate.id === question.sectionId,
                  )
                  return (
                    <article
                      key={question.id}
                      className="panel p-3.5"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span className="badge">{getQuestionTypeLabel(question)}</span>
                          <span
                            className={
                              question.origin === 'historical' ? 'badge badge-amber' : 'badge badge-violet'
                            }
                          >
                            Past exam
                          </span>
                          {question.unscored ? (
                            <span className="badge badge-rose">Unscored review</span>
                          ) : null}
                        </div>
                        <button
                          type="button"
                          className="icon-btn h-7 w-7 text-mist-500 hover:text-rose-200"
                          onClick={() => toggleQuestionBookmark(question.id)}
                          aria-label="Remove question bookmark"
                          title="Remove question bookmark"
                        >
                          <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                        </button>
                      </div>

                      <p className="mt-1.5 text-[0.8rem] leading-relaxed text-mist-200">
                        {question.prompt.replace(/\{\{\d+\}\}/g, '____')}
                      </p>

                      <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1.5">
                        {section ? (
                          <Link
                            to={osPath(`/section/${section.id}#quiz`)}
                            className="inline-flex items-center gap-1 text-[0.64rem] font-medium text-cyan-200 hover:text-cyan-100"
                          >
                            <BookOpen className="h-3 w-3" aria-hidden="true" />
                            {section.shortTitle}
                          </Link>
                        ) : null}
                        <QuestionSources question={question} />
                      </div>
                    </article>
                  )
                })}
              </div>
            )}
          </section>
        </div>

        <aside className="space-y-3 lg:sticky lg:top-20 lg:self-start">
          <div className="panel p-4">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-rose-neon" aria-hidden="true" />
              <h2 className="font-display text-sm font-semibold text-mist-50">
                Weak topics from attempts
              </h2>
            </div>
            {weakSections.length === 0 ? (
              <p className="mt-2 text-[0.72rem] leading-relaxed text-mist-500">
                No current weak topics. Missed questions appear here after you submit a quiz; a later
                correct answer clears the miss.
              </p>
            ) : (
              <div className="mt-2 space-y-1.5">
                {weakSections.map(({ section, totalMissed, missed }) => (
                  <div
                    key={section.id}
                    className="rounded-lg border border-line-soft bg-ink-950/30 p-2.5"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <Link
                        to={osPath(`/section/${section.id}#quiz`)}
                        className="text-[0.72rem] font-semibold text-mist-200 hover:text-white"
                      >
                        {section.shortTitle}
                      </Link>
                      <span className="badge badge-rose">{totalMissed}</span>
                    </div>
                    <ul className="mt-1 space-y-0.5">
                      {missed.slice(0, 3).map(({ question }) => (
                        <li
                          key={question.id}
                          className="line-clamp-2 text-[0.63rem] leading-relaxed text-mist-500"
                        >
                          {question.prompt.replace(/\{\{\d+\}\}/g, '____')}
                        </li>
                      ))}
                    </ul>
                    {missed.length > 3 ? (
                      <p className="mt-0.5 text-[0.58rem] text-mist-600">
                        +{missed.length - 3} more
                      </p>
                    ) : null}
                  </div>
                ))}
              </div>
            )}
            <Link to={osPath('/progress')} className="link-arrow mt-2.5 text-[0.7rem]">
              Full progress dashboard
              <ArrowRight className="h-3 w-3" aria-hidden="true" />
            </Link>
          </div>

          <div className="panel p-4">
            <p className="font-mono text-[0.58rem] uppercase tracking-[0.13em] text-mist-500">
              Revision rule
            </p>
            <p className="mt-1.5 text-[0.76rem] leading-relaxed text-mist-400">
              Do not re-read a bookmarked question until you have tried to explain the answer aloud.
              Then check the explanation and source before moving on.
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              <Link to={`${activeChapter.path}/review`} className="btn btn-secondary btn-sm">
                Final review
              </Link>
              <Link to={`${activeChapter.path}/coverage`} className="btn btn-secondary btn-sm">
                Coverage
              </Link>
            </div>
          </div>

          {savedQuestions.some((question) => question.unscored) ? (
            <div className="rounded-xl border border-amber-neon/25 bg-amber-neon/[0.045] p-3 text-[0.66rem] leading-relaxed text-mist-400">
              Some saved questions are flagged review items. They remain available for study but never
              contribute to a score.
            </div>
          ) : null}
        </aside>
      </div>

      {savedQuestions.length > 0 ? (
        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-line-soft bg-ink-900/35 px-4 py-3">
          <div className="flex items-center gap-2 text-[0.7rem] text-mist-500">
            <BookMarked className="h-3.5 w-3.5 text-amber-neon" aria-hidden="true" />
            Ready to test the saved set?
          </div>
          <Link to={osPath('/bookmarks/practice')} className="btn btn-primary btn-sm">
            <ClipboardCheck className="h-3.5 w-3.5" aria-hidden="true" />
            Practise saved questions
          </Link>
        </div>
      ) : null}
    </div>
  )
}
