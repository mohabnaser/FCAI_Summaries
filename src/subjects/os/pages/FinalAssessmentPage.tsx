import { Link, useParams } from 'react-router-dom'
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Clock3,
  FileSearch,
  Flag,
  GraduationCap,
  ListChecks,
  ShieldCheck,
  Target,
  Trophy,
} from 'lucide-react'
import { getQuestion } from '../data/questions'
import { chaptersById, sectionInChapter } from '../data/chapters'
import type { ChapterId } from '../types'
import { NotFoundPage } from './NotFoundPage'
import { useProgress } from '../context/ProgressContext'
import { percent } from '../lib/progress'
import { QuizEngine } from '../components/quiz/QuizEngine'

const numberWords = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen', 'Twenty']
function spell(count: number): string {
  if (count <= 20) return numberWords[count]
  if (count < 30) return `Twenty-${numberWords[count - 20].toLowerCase()}`
  return String(count)
}

export function FinalAssessmentPage() {
  const { chapterId = '' } = useParams()
  const { progress } = useProgress()
  const chapter = chaptersById.get(chapterId as ChapterId)
  if (!chapter) return <NotFoundPage />

  const { sections, finalAssessment: quiz } = chapter
  const questions = quiz.questionIds.map((id) => getQuestion(id))
  const historical = questions.filter((question) => question.origin === 'historical').length
  const flagged = questions.filter((question) => question.unscored).length
  const reviewItemCount = chapter.coverage.summary.review
  const sectionOf = (question: (typeof questions)[number]) => sectionInChapter(chapter, question)?.id
  const sectionIds = new Set(questions.map(sectionOf))
  const best = progress.bestScores[quiz.id]
  const lastAttempt = progress.quizzes[quiz.id]

  return (
    <div className="fade-up">
      <header className="panel panel-glow relative overflow-hidden p-5 sm:p-6">
        <div className="pointer-events-none absolute right-0 top-0 h-48 w-64 bg-grid opacity-45" aria-hidden="true" />
        <p className="eyebrow">Chapter {Number(chapter.meta.number)}</p>
        <h1 className="section-title mt-2">Final assessment</h1>
        <p className="mt-2 max-w-3xl text-[0.98rem] leading-relaxed text-mist-300">
          {spell(questions.length)} historical questions across all {sections.length} sections, mixing multiple choice,
          true/false, fill-in, and short answer. Answers and explanations are shown after submission.
        </p>

        <div className="mt-4 grid grid-cols-2 gap-2 lg:grid-cols-4">
          <div className="rounded-lg border border-line-soft bg-ink-900/40 px-3 py-2.5">
            <ListChecks className="h-3.5 w-3.5 text-cyan-neon" aria-hidden="true" />
            <p className="mt-1 font-display text-lg font-semibold leading-none text-mist-50">{questions.length}</p>
            <p className="mt-1 text-[0.6rem] uppercase tracking-wider text-mist-500">questions</p>
          </div>
          <div className="rounded-lg border border-line-soft bg-ink-900/40 px-3 py-2.5">
            <GraduationCap className="h-3.5 w-3.5 text-amber-neon" aria-hidden="true" />
            <p className="mt-1 font-display text-lg font-semibold leading-none text-mist-50">{historical}</p>
            <p className="mt-1 text-[0.6rem] uppercase tracking-wider text-mist-500">historical</p>
          </div>
          <div className="rounded-lg border border-line-soft bg-ink-900/40 px-3 py-2.5">
            <Target className="h-3.5 w-3.5 text-teal-neon" aria-hidden="true" />
            <p className="mt-1 font-display text-lg font-semibold leading-none text-mist-50">
              {sectionIds.size}/{sections.length}
            </p>
            <p className="mt-1 text-[0.6rem] uppercase tracking-wider text-mist-500">sections sampled</p>
          </div>
          <div className="rounded-lg border border-line-soft bg-ink-900/40 px-3 py-2.5">
            <Clock3 className="h-3.5 w-3.5 text-violet-neon" aria-hidden="true" />
            <p className="mt-1 font-display text-lg font-semibold leading-none text-mist-50">No limit</p>
            <p className="mt-1 text-[0.6rem] uppercase tracking-wider text-mist-500">untimed paper</p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <a href="#quiz" className="btn btn-primary">
            <Target className="h-4 w-4" aria-hidden="true" />
            {lastAttempt ? 'Review or retry the paper' : 'Begin assessment'}
          </a>
          <Link to={`${chapter.path}/review`} className="btn btn-secondary">
            Final review first
          </Link>
          <Link to={`${chapter.path}/coverage`} className="btn btn-ghost">
            Verify coverage
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          {best ? (
            <span className="badge badge-amber">
              <Trophy className="h-2.5 w-2.5" aria-hidden="true" />
              Best {best.score}/{best.total} · {percent(best.score, best.total)}%
            </span>
          ) : null}
        </div>
      </header>

      <div className="mt-4 grid gap-3 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="panel p-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-teal-neon" aria-hidden="true" />
            <h2 className="font-display text-sm font-semibold text-mist-50">Assessment rules</h2>
          </div>
          <ul className="mt-2.5 space-y-2">
            {[
              'The assessment is untimed.',
              'You may move between questions and change answers before submitting.',
              'Unanswered questions count as incorrect. The navigator marks every blank.',
              `The ${reviewItemCount} flagged historical ${reviewItemCount === 1 ? 'item stays' : 'items stay'} visible in ${reviewItemCount === 1 ? 'its' : 'their'} section quiz but ${reviewItemCount === 1 ? 'is' : 'are'} excluded here.`,
              'Question stems and options stay in English in both language modes.',
            ].map((rule) => (
              <li key={rule} className="flex items-start gap-2 text-[0.75rem] leading-relaxed text-mist-400">
                <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 flex-none text-teal-neon" aria-hidden="true" />
                {rule}
              </li>
            ))}
          </ul>
          {flagged > 0 ? (
            <div className="mt-3 flex items-start gap-2 rounded-lg border border-amber-neon/25 bg-amber-neon/[0.05] p-2.5">
              <Flag className="mt-0.5 h-3.5 w-3.5 flex-none text-amber-neon" aria-hidden="true" />
              <p className="text-[0.68rem] leading-relaxed text-mist-300">
                This paper includes flagged review items. They are shown and explained but excluded
                from the score denominator.
              </p>
            </div>
          ) : (
            <div className="mt-3 flex items-start gap-2 rounded-lg border border-teal-neon/25 bg-teal-neon/[0.05] p-2.5">
              <ShieldCheck className="mt-0.5 h-3.5 w-3.5 flex-none text-teal-neon" aria-hidden="true" />
              <p className="text-[0.68rem] leading-relaxed text-mist-300">
                This assessment excludes {reviewItemCount === 1 ? 'the flagged review item' : `the ${reviewItemCount} flagged review items`}, so every
                question in the assessment is scored. Unscored items remain visible in their section
                quizzes and the coverage ledger.
              </p>
            </div>
          )}
        </div>

        <div className="panel p-4">
          <div className="flex items-center gap-2">
            <FileSearch className="h-4 w-4 text-violet-neon" aria-hidden="true" />
            <h2 className="font-display text-sm font-semibold text-mist-50">Composition by section</h2>
          </div>
          <div className="mt-2 grid grid-cols-2 gap-1.5">
            {sections.map((section) => {
              const count = questions.filter((question) => sectionOf(question) === section.id).length
              return (
                <div
                  key={section.id}
                  className="flex items-center justify-between gap-1.5 rounded-md border border-line-soft bg-ink-950/30 px-2 py-1 text-[0.62rem]"
                >
                  <span className="truncate text-mist-400">{section.shortTitle}</span>
                  <span className="font-mono text-mist-300">{count}</span>
                </div>
              )
            })}
          </div>
          <p className="mt-2.5 flex items-start gap-1.5 text-[0.62rem] leading-relaxed text-mist-500">
            <AlertTriangle className="mt-0.5 h-3 w-3 flex-none text-amber-neon" aria-hidden="true" />
            The final assessment is a sample of past-exam questions. The section quizzes contain
            every past-exam question, as listed in the coverage ledger.
          </p>
        </div>
      </div>

      <div className="mt-5">
        <QuizEngine key={quiz.id} quiz={quiz} />
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-line-soft bg-ink-900/35 px-4 py-3 text-[0.68rem] text-mist-500">
        <span>
          Need the full source-question map? Every relevant historical item is listed with its
          implementation and exam provenance.
        </span>
        <Link to={`${chapter.path}/coverage`} className="link-arrow shrink-0 text-[0.7rem]">
          Coverage ledger
          <ArrowRight className="h-3 w-3" aria-hidden="true" />
        </Link>
      </div>
    </div>
  )
}
