import { Link, useParams } from 'react-router-dom'
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  GraduationCap,
  ScrollText,
  Sparkles,
  Target,
  Trophy,
} from 'lucide-react'
import { chaptersById } from '../data/chapters'
import { historicalForSection, questionsForSection } from '../data/quizzes'
import type { ChapterId } from '../types'
import { NotFoundPage } from './NotFoundPage'
import { useProgress } from '../context/ProgressContext'
import { getProgressOverview, getWeakSections } from '../lib/progress'
import { BilingualInline, BilingualProse } from '../components/ui/Text'
import { QuestionSources } from '../components/quiz/QuestionMeta'
import { osPath } from '../paths'

export function FinalReviewPage() {
  const { chapterId = '' } = useParams()
  const { progress } = useProgress()
  const chapter = chaptersById.get(chapterId as ChapterId)
  if (!chapter) return <NotFoundPage />

  const { sections, totalEstimatedMinutes } = chapter
  const coverageSummary = chapter.coverage.summary
  const historicalQuestionCount = coverageSummary.unique
  const overview = getProgressOverview(progress, chapter)
  const weakSections = getWeakSections(progress, chapter)
  const visualCount = sections.reduce(
    (total, section) => total + section.blocks.filter((block) => block.kind === 'visual').length,
    0,
  )

  return (
    <div className="fade-up">
      <header className="panel panel-glow relative overflow-hidden p-5 sm:p-6">
        <div className="pointer-events-none absolute right-0 top-0 h-48 w-64 bg-grid opacity-45" aria-hidden="true" />
        <p className="eyebrow">Chapter {Number(chapter.meta.number)}</p>
        <h1 className="section-title mt-2">Final review</h1>
        <p className="mt-2 max-w-3xl text-[0.98rem] leading-relaxed text-mist-300">
          The core idea, exam focus, key terms and past-exam questions of every section.
        </p>

        <div className="mt-4 grid grid-cols-2 gap-2 lg:grid-cols-4">
          {[
            { value: sections.length, label: 'sections', icon: BookOpen },
            { value: `${totalEstimatedMinutes} min`, label: 'core study', icon: Clock3 },
            { value: `${historicalQuestionCount}`, label: 'unique historical Qs', icon: GraduationCap },
            { value: visualCount, label: 'concept visuals', icon: Sparkles },
          ].map((stat) => {
            const Icon = stat.icon
            return (
              <div key={stat.label} className="rounded-lg border border-line-soft bg-ink-900/40 px-3 py-2.5">
                <Icon className="h-3.5 w-3.5 text-cyan-neon" aria-hidden="true" />
                <p className="mt-1 font-display text-lg font-semibold leading-none text-mist-50">
                  {stat.value}
                </p>
                <p className="mt-1 text-[0.6rem] uppercase tracking-wider text-mist-500">{stat.label}</p>
              </div>
            )
          })}
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <Link to={`${chapter.path}/assessment`} className="btn btn-primary">
            <Target className="h-4 w-4" aria-hidden="true" />
            Take the final assessment
          </Link>
          <Link to={`${chapter.path}/cheat-sheet`} className="btn btn-secondary">
            <ScrollText className="h-4 w-4" aria-hidden="true" />
            Open cheat sheet
          </Link>
          <Link to={`${chapter.path}/coverage`} className="btn btn-ghost">
            Trace source coverage
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </header>

      <div className="mt-5 grid gap-3 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="panel p-4">
          <div className="flex items-center justify-between gap-2">
            <div>
              <p className="font-mono text-[0.58rem] uppercase tracking-[0.13em] text-mist-500">
                Your revision state
              </p>
              <p className="mt-0.5 font-display text-base font-semibold text-mist-50">
                {overview.sectionsCompleted}/{overview.totalSections} sections complete
              </p>
            </div>
            <span className="badge badge-cyan">
              {overview.accuracyPercent === null
                ? 'No graded questions yet'
                : `${overview.accuracyPercent}% graded accuracy`}
            </span>
          </div>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-ink-700">
            <div
              className="h-full rounded-full bg-gradient-to-r from-cyan-neon to-teal-neon"
              style={{ width: `${overview.completionPercent}%` }}
            />
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2 text-center">
            <div className="rounded-md border border-line-soft bg-ink-950/35 px-2 py-1.5">
              <p className="font-display text-base font-semibold text-mist-50">
                {overview.sectionsVisited}
              </p>
              <p className="text-[0.54rem] uppercase tracking-wider text-mist-500">visited</p>
            </div>
            <div className="rounded-md border border-line-soft bg-ink-950/35 px-2 py-1.5">
              <p className="font-display text-base font-semibold text-mist-50">
                {overview.quizzesAttempted}
              </p>
              <p className="text-[0.54rem] uppercase tracking-wider text-mist-500">quizzes</p>
            </div>
            <div className="rounded-md border border-line-soft bg-ink-950/35 px-2 py-1.5">
              <p className="font-display text-base font-semibold text-mist-50">
                {overview.averageBestPercent === null ? '—' : `${overview.averageBestPercent}%`}
              </p>
              <p className="text-[0.54rem] uppercase tracking-wider text-mist-500">avg. best</p>
            </div>
          </div>
        </div>

        <div className="panel p-4">
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-rose-neon" aria-hidden="true" />
            <p className="font-display text-sm font-semibold text-mist-50">Weak topics, from actual misses</p>
          </div>
          {weakSections.length === 0 ? (
            <p className="mt-2 text-xs leading-relaxed text-mist-500">
              No current weak topics recorded. Once you submit quiz attempts, missed questions appear
              here and on the progress dashboard. A later correct answer clears the miss.
            </p>
          ) : (
            <div className="mt-2 space-y-1.5">
              {weakSections.slice(0, 5).map(({ section, totalMissed }) => (
                <Link
                  key={section.id}
                  to={osPath(`/section/${section.id}#quiz`)}
                  className="flex items-center justify-between gap-2 rounded-md border border-line-soft bg-ink-950/35 px-2.5 py-1.5 text-[0.7rem] transition-colors hover:border-rose-neon/30 hover:bg-ink-900/60"
                >
                  <span className="text-mist-300">{section.shortTitle}</span>
                  <span className="badge badge-rose">{totalMissed} missed</span>
                </Link>
              ))}
              {weakSections.length > 5 ? (
                <p className="text-[0.62rem] text-mist-500">+{weakSections.length - 5} more in the dashboard.</p>
              ) : null}
            </div>
          )}
          <Link to={osPath('/progress')} className="link-arrow mt-2.5 text-[0.7rem]">
            Open progress dashboard
            <ArrowRight className="h-3 w-3" aria-hidden="true" />
          </Link>
        </div>
      </div>

      <nav className="panel mt-4 p-3" aria-label="Jump to review section">
        <div className="flex flex-wrap gap-1.5">
          {sections.map((section) => (
            <a
              key={section.id}
              href={`#review-${section.id}`}
              className="rounded-md border border-line-soft bg-ink-950/35 px-2 py-1 text-[0.62rem] text-mist-400 transition-colors hover:border-cyan-neon/30 hover:text-mist-100"
            >
              {String(section.order).padStart(2, '0')} · {section.shortTitle}
            </a>
          ))}
        </div>
      </nav>

      <div className="mt-5 space-y-4">
        {sections.map((section) => {
          const historical = historicalForSection(section.id)
          const questions = questionsForSection(section.id)
          const complete = progress.sections[section.id]?.completed
          return (
            <section
              key={section.id}
              id={`review-${section.id}`}
              className="panel scroll-mt-24 overflow-hidden"
            >
              <div className="flex flex-wrap items-start justify-between gap-2 border-b border-line-soft bg-ink-900/30 px-4 py-3 sm:px-5">
                <div className="flex items-start gap-2.5">
                  <span className="flex h-7 w-7 flex-none items-center justify-center rounded-lg border border-line bg-ink-950/55 font-mono text-[0.6rem] text-cyan-neon">
                    {String(section.order).padStart(2, '0')}
                  </span>
                  <div>
                    <h2 className="font-display text-base font-semibold text-mist-50">{section.title}</h2>
                    <p className="mt-0.5 text-[0.66rem] text-mist-500">
                      {section.kicker} · ~{section.estimatedMinutes} min · {questions.length} quiz questions
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  {complete ? (
                    <span className="badge badge-teal">
                      <CheckCircle2 className="h-2.5 w-2.5" aria-hidden="true" />
                      completed
                    </span>
                  ) : null}
                  <span className="badge">{historical.length} past-exam</span>
                </div>
              </div>

              <div className="p-4 sm:p-5">
                <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
                  <div>
                    <BilingualProse text={section.summary} className="text-sm" />

                    <div className="mt-3">
                      <p className="flex items-center gap-1.5 font-mono text-[0.56rem] uppercase tracking-[0.12em] text-amber-neon">
                        <Target className="h-3 w-3" aria-hidden="true" />
                        Exam focus
                      </p>
                      <ul className="mt-1.5 space-y-1.5">
                        {section.examFocus.map((focus, index) => (
                          <li key={index} className="flex items-start gap-2 text-[0.78rem] leading-relaxed">
                            <span className="mt-1.5 h-1 w-1 flex-none rounded-full bg-amber-neon/80" aria-hidden="true" />
                            <span className="text-mist-300">
                              <BilingualInline text={focus} />
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="rounded-lg border border-line-soft bg-ink-950/30 p-3">
                    <p className="flex items-center gap-1.5 font-mono text-[0.56rem] uppercase tracking-[0.12em] text-mist-500">
                      <Sparkles className="h-3 w-3 text-violet-neon" aria-hidden="true" />
                      Key distinctions
                    </p>
                    <dl className="mt-1.5 space-y-2">
                      {section.keyTerms.map((term) => (
                        <div key={term.term}>
                          <dt className="text-[0.72rem] font-semibold text-mist-100">{term.term}</dt>
                          <dd className="mt-0.5 text-[0.64rem] leading-relaxed text-mist-400">
                            {term.definition.en}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-line-soft pt-3">
                  <Link to={osPath(`/section/${section.id}`)} className="btn btn-secondary btn-sm">
                    <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
                    Re-read section
                  </Link>
                  <Link to={osPath(`/section/${section.id}#quiz`)} className="btn btn-secondary btn-sm">
                    <ClipboardCheck className="h-3.5 w-3.5" aria-hidden="true" />
                    Practise {questions.length} questions
                  </Link>
                  <span className="ms-auto text-[0.6rem] text-mist-600">{section.kicker}</span>
                </div>

                {historical.length > 0 ? (
                  <details className="group mt-3 rounded-lg border border-line-soft bg-ink-950/25">
                    <summary className="flex cursor-pointer select-none items-center gap-2 px-3 py-2 text-[0.68rem] font-medium text-mist-400 hover:text-mist-100">
                      <GraduationCap className="h-3.5 w-3.5 text-amber-neon" aria-hidden="true" />
                      Historical questions in this section ({historical.length})
                    </summary>
                    <div className="space-y-2 border-t border-line-soft px-3 py-2.5">
                      {historical.map((question) => (
                        <div key={question.id} className="rounded-md border border-line-soft/70 bg-ink-900/35 p-2.5">
                          <p className="text-[0.74rem] leading-relaxed text-mist-300">
                            {question.prompt.replace(/\{\{\d+\}\}/g, '____')}
                          </p>
                          <div className="mt-1.5">
                            <QuestionSources question={question} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </details>
                ) : null}
              </div>
            </section>
          )
        })}
      </div>

      <section className="mt-6 grid gap-3 lg:grid-cols-2">
        <div className="panel p-5">
          <div className="flex items-center gap-2">
            <Trophy className="h-4 w-4 text-amber-neon" aria-hidden="true" />
            <h2 className="font-display text-base font-semibold text-mist-50">Last-minute checklist</h2>
          </div>
          <ul className="mt-2.5 space-y-2">
            {[
              'OS = intermediary + resource allocator + control program. Kernel = always-running core.',
              'Bootstrap loads the kernel; interrupts and traps are how control reaches the OS.',
              'SMP shares memory; multi-core shares a chip; a cluster joins complete computers.',
              'Multiprogramming overlaps I/O with CPU work; time-sharing adds rapid timer-driven interaction.',
              'Dual mode + timer + privileged instructions are the protection trio.',
              'Process = program in execution; program = passive. Virtual memory = not completely resident.',
              'Caching copies to faster storage; DMA moves blocks with one interrupt per block.',
              'Protection is internal access control; security defends against attacks.',
              'Virtualization: one computer → several environments. Cloud service models map to managed layers.',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-[0.78rem] leading-relaxed text-mist-400">
                <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 flex-none text-teal-neon" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="panel p-5">
          <h2 className="font-display text-base font-semibold text-mist-50">Coverage at a glance</h2>
          <p className="mt-2 text-sm leading-relaxed text-mist-400">
            The section quizzes together contain every relevant past-exam question. The final
            assessment is a sample of them.
          </p>
          <div className="mt-3 space-y-1.5">
            {[
              ['Relevant source occurrences', coverageSummary.relevant],
              ['Unique historical implementations', coverageSummary.unique],
              ['Flagged review items (unscored)', coverageSummary.review],
              ['Exact duplicate provenance pairs', coverageSummary.duplicatePairs],
              ['Documented exclusions', coverageSummary.excluded],
            ].map(([label, value]) => (
              <div
                key={String(label)}
                className="flex items-center justify-between gap-2 rounded-md border border-line-soft bg-ink-950/30 px-2.5 py-1.5 text-[0.7rem]"
              >
                <span className="text-mist-500">{label}</span>
                <span className="font-mono text-mist-200">{value}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            <Link to={`${chapter.path}/coverage`} className="btn btn-secondary btn-sm">
              Coverage ledger
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
            <Link to={`${chapter.path}/assessment`} className="btn btn-primary btn-sm">
              Start assessment
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
