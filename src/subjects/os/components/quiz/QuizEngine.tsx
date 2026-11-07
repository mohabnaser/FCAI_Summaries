import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  Cloud,
  Flag,
  RotateCcw,
  Send,
  Sparkles,
  Target,
  Trophy,
} from 'lucide-react'
import type { Question, Quiz, QuizAttempt } from '../../types'
import type { AnswerValue } from '../../lib/grading'
import { getQuestion } from '../../data/questions'
import { allSectionsById, chapterOfQuiz, sectionInChapter } from '../../data/chapters'
import { useProgress } from '../../context/ProgressContext'
import { buildQuizResult, answerIsEmpty, type QuizResult } from '../../lib/quiz'
import { formatDate, percent } from '../../lib/progress'
import { cn } from '../../lib/cn'
import { TakingQuestion } from './TakingQuestion'
import { ReviewQuestion } from './ReviewQuestion'
import { osPath } from '../../paths'

const DRAFT_PREFIX = 'os-atlas:quiz-draft:v1:'

interface Draft {
  version: 1
  answers: Record<string, AnswerValue>
  current: number
  savedAt: number
}

type ReviewFilter = 'all' | 'incorrect' | 'flagged'

function draftKey(quizId: string): string {
  return `${DRAFT_PREFIX}${quizId}`
}

function isAnswerValue(value: unknown): value is AnswerValue {
  if (typeof value === 'string' || typeof value === 'boolean') return true
  if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
    return Object.values(value as Record<string, unknown>).every(
      (entry) => typeof entry === 'string',
    )
  }
  return false
}

function readDraft(quizId: string, questions: Question[]): Draft | null {
  try {
    const raw = window.localStorage.getItem(draftKey(quizId))
    if (!raw) return null
    const parsed = JSON.parse(raw) as Partial<Draft>
    if (parsed.version !== 1 || typeof parsed !== 'object' || !parsed.answers) return null
    const validIds = new Set(questions.map((question) => question.id))
    const answers: Record<string, AnswerValue> = {}
    for (const [id, value] of Object.entries(parsed.answers)) {
      if (validIds.has(id) && isAnswerValue(value)) answers[id] = value
    }
    const current =
      typeof parsed.current === 'number' && parsed.current >= 0 && parsed.current < questions.length
        ? parsed.current
        : 0
    return {
      version: 1,
      answers,
      current,
      savedAt: typeof parsed.savedAt === 'number' ? parsed.savedAt : Date.now(),
    }
  } catch {
    return null
  }
}

function writeDraft(quizId: string, answers: Record<string, AnswerValue>, current: number): number {
  const savedAt = Date.now()
  try {
    const draft: Draft = { version: 1, answers, current, savedAt }
    window.localStorage.setItem(draftKey(quizId), JSON.stringify(draft))
  } catch {
    // The quiz still works for this session if storage is unavailable.
  }
  return savedAt
}

function clearDraft(quizId: string) {
  try {
    window.localStorage.removeItem(draftKey(quizId))
  } catch {
    // Ignore unavailable storage.
  }
}

function normaliseAttemptAnswers(attempt: QuizAttempt | undefined, questions: Question[]) {
  if (!attempt) return {}
  const validIds = new Set(questions.map((question) => question.id))
  const answers: Record<string, AnswerValue> = {}
  for (const [id, value] of Object.entries(attempt.answers)) {
    if (validIds.has(id) && isAnswerValue(value)) answers[id] = value
  }
  return answers
}

function attemptDate(timestamp: number): string {
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(timestamp))
}

function scoreHeadline(value: number): { title: string; body: string } {
  if (value >= 90) {
    return {
      title: 'Exam-ready',
      body: 'Strong command of this material. Review any remaining misses, then move on with confidence.',
    }
  }
  if (value >= 75) {
    return {
      title: 'Solid foundation',
      body: 'Most concepts are landing. Focus on the explanations for missed questions before your next attempt.',
    }
  }
  if (value >= 60) {
    return {
      title: 'Getting there',
      body: 'The core is present, but several distinctions are still fragile. Revisit the linked sections and retry.',
    }
  }
  return {
    title: 'Needs revision',
    body: 'Use the explanations and section links below, then attempt the quiz again. Do not just memorise the answers.',
  }
}

function QuestionNavigator({
  questions,
  current,
  answers,
  onGo,
}: {
  questions: Question[]
  current: number
  answers: Record<string, AnswerValue>
  onGo: (index: number) => void
}) {
  return (
    <div className="panel p-4">
      <div className="flex items-center justify-between gap-2">
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.13em] text-mist-500">
          Question navigator
        </p>
        <span className="font-mono text-[0.72rem] text-mist-300">
          {questions.filter((question) => !answerIsEmpty(answers[question.id])).length}/
          {questions.length}
        </span>
      </div>
      <div className="mt-3 grid grid-cols-6 gap-1.5" aria-label="Jump to a question">
        {questions.map((question, index) => {
          const answered = !answerIsEmpty(answers[question.id])
          const active = index === current
          return (
            <button
              key={question.id}
              type="button"
              onClick={() => onGo(index)}
              aria-current={active ? 'step' : undefined}
              aria-label={`Question ${index + 1}${answered ? ', answered' : ', unanswered'}${
                active ? ', current' : ''
              }${question.unscored ? ', review only' : ''}`}
              className={cn(
                'relative flex h-9 items-center justify-center rounded-md border font-mono text-[0.72rem] transition-colors',
                active
                  ? 'border-cyan-neon/70 bg-cyan-neon/15 text-cyan-neon'
                  : answered
                    ? 'border-teal-neon/30 bg-teal-neon/[0.07] text-teal-100 hover:border-teal-neon/55'
                    : 'border-line bg-ink-900/55 text-mist-500 hover:border-line-soft hover:text-mist-200',
              )}
            >
              {index + 1}
              {answered ? (
                <span
                  className="absolute bottom-0.5 h-0.5 w-2.5 rounded-full bg-teal-neon"
                  aria-hidden="true"
                />
              ) : null}
              {question.unscored ? (
                <Flag
                  className="absolute right-0.5 top-0.5 h-2.5 w-2.5 text-amber-neon"
                  aria-hidden="true"
                />
              ) : null}
            </button>
          )
        })}
      </div>
      <div className="mt-3 space-y-1.5 text-[0.72rem] text-mist-500">
        <p className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-sm border border-teal-neon/35 bg-teal-neon/10" />
          Answered
        </p>
        <p className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-sm border border-line" />
          Unanswered
        </p>
        <p className="flex items-center gap-1.5">
          <Flag className="h-2.5 w-2.5 text-amber-neon" />
          Flagged review item (unscored)
        </p>
      </div>
    </div>
  )
}

export function QuizEngine({
  quiz,
  questions: suppliedQuestions,
}: {
  quiz: Quiz
  questions?: Question[]
}) {
  const questions = useMemo(
    () => suppliedQuestions ?? quiz.questionIds.map((id) => getQuestion(id)),
    [quiz, suppliedQuestions],
  )
  const { progress, saveQuizAttempt } = useProgress()
  const initial = useRef<{ draft: Draft | null; attempt: QuizAttempt | undefined } | null>(null)
  if (initial.current === null) {
    initial.current = {
      draft: readDraft(quiz.id, questions),
      attempt: progress.quizzes[quiz.id],
    }
  }
  const initialDraft = initial.current.draft
  const initialAttempt = initial.current.attempt
  const initialAnswers = initialDraft?.answers ?? normaliseAttemptAnswers(initialAttempt, questions)
  const initialMode: 'taking' | 'results' =
    initialDraft || !initialAttempt ? 'taking' : 'results'

  const [answers, setAnswers] = useState<Record<string, AnswerValue>>(initialAnswers)
  const [current, setCurrent] = useState(() => initialDraft?.current ?? 0)
  const [mode, setMode] = useState<'taking' | 'results'>(initialMode)
  const [result, setResult] = useState<QuizResult | null>(() =>
    initialMode === 'results' && initialAttempt
      ? buildQuizResult(questions, initialAnswers, initialAttempt.attemptedAt)
      : null,
  )
  const [reviewFilter, setReviewFilter] = useState<ReviewFilter>('all')
  const [showSubmitWarning, setShowSubmitWarning] = useState(false)
  const [justSubmitted, setJustSubmitted] = useState(false)
  const [draftSavedAt, setDraftSavedAt] = useState<number | null>(
    initialDraft?.savedAt ?? null,
  )
  const questionTopRef = useRef<HTMLDivElement>(null)
  const resultsTopRef = useRef<HTMLDivElement>(null)
  const warningRef = useRef<HTMLDivElement>(null)
  const shouldScrollRef = useRef(false)

  const flagged = questions.filter((question) => question.unscored).length
  const answeredCount = questions.filter((question) => !answerIsEmpty(answers[question.id])).length
  const currentQuestion = questions[current]
  const section = quiz.kind === 'section' ? (allSectionsById.get(quiz.sectionId) ?? null) : null
  const quizChapter = chapterOfQuiz(quiz.id)
  /** Where to revise a missed question: this quiz’s section, else its section in the quiz’s chapter. */
  const revisionSection = (question: Question) =>
    section ?? (quizChapter ? sectionInChapter(quizChapter, question) : undefined) ?? allSectionsById.get(question.sectionId)
  const best = progress.bestScores[quiz.id]

  useEffect(() => {
    if (mode !== 'taking' || questions.length === 0) return
    const timer = window.setTimeout(() => {
      const savedAt = writeDraft(quiz.id, answers, current)
      setDraftSavedAt(savedAt)
    }, 150)
    return () => window.clearTimeout(timer)
  }, [answers, current, mode, quiz.id, questions.length])

  useEffect(() => {
    if (mode !== 'results' || !shouldScrollRef.current) return
    shouldScrollRef.current = false
    resultsTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    resultsTopRef.current?.focus({ preventScroll: true })
  }, [mode])

  if (questions.length === 0 || !currentQuestion) {
    return (
      <div className="panel p-6 text-center">
        <p className="font-display text-lg font-semibold text-mist-100">No questions available</p>
        <p className="mt-1 text-sm text-mist-400">
          This quiz has no questions yet. Choose another section or return to the chapter overview.
        </p>
      </div>
    )
  }

  const updateAnswer = (value: AnswerValue) => {
    setAnswers((previous) => ({ ...previous, [currentQuestion.id]: value }))
  }

  const goTo = (index: number) => {
    const next = Math.max(0, Math.min(questions.length - 1, index))
    setCurrent(next)
    setShowSubmitWarning(false)
    window.requestAnimationFrame(() => {
      questionTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }

  const submit = (force = false) => {
    const unanswered = questions.filter((question) => answerIsEmpty(answers[question.id]))
    if (unanswered.length > 0 && !force) {
      setShowSubmitWarning(true)
      window.requestAnimationFrame(() => {
        warningRef.current?.focus()
      })
      return
    }
    const built = buildQuizResult(questions, answers)
    setResult(built)
    setMode('results')
    setJustSubmitted(true)
    setReviewFilter('all')
    setShowSubmitWarning(false)
    clearDraft(quiz.id)
    setDraftSavedAt(null)
    saveQuizAttempt(quiz.id, {
      answers: built.answers,
      results: built.results,
      submitted: true,
      score: built.score,
      total: built.total,
      attemptedAt: built.attemptedAt,
    })
    shouldScrollRef.current = true
  }

  const retry = () => {
    const empty: Record<string, AnswerValue> = {}
    writeDraft(quiz.id, empty, 0)
    setAnswers(empty)
    setCurrent(0)
    setResult(null)
    setMode('taking')
    setJustSubmitted(false)
    setShowSubmitWarning(false)
    setReviewFilter('all')
    setDraftSavedAt(Date.now())
    window.requestAnimationFrame(() => {
      questionTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }

  const filteredReview = result
    ? result.graded
        .map((entry, index) => ({ entry, index }))
        .filter(({ entry }) => {
          if (reviewFilter === 'all') return true
          if (reviewFilter === 'incorrect') {
            return !entry.question.unscored && !entry.detail.correct
          }
          return entry.question.unscored
        })
    : []

  const percentScore = result ? percent(result.score, result.total) : 0
  const headline = result ? scoreHeadline(percentScore) : null
  const answeredIncorrect = result
    ? Math.max(0, result.total - result.score - result.unanswered)
    : 0
  const missed = result
    ? result.graded.filter((entry) => !entry.question.unscored && !entry.detail.correct)
    : []

  return (
    <div ref={questionTopRef} id="quiz" className="scroll-mt-24">
      <div className="panel panel-glow overflow-hidden">
        <div className="relative border-b border-line-soft bg-ink-900/30 px-5 py-6 sm:px-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="eyebrow">
                {quiz.id === 'final-assessment'
                  ? 'Chapter-wide assessment'
                  : quiz.id.startsWith('bookmarked-practice')
                    ? 'Personalised revision'
                    : 'Section exam lab'}
              </p>
              <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight text-mist-50 sm:text-3xl">
                {quiz.title}
              </h2>
              <p className="mt-2 max-w-3xl text-[0.95rem] leading-relaxed text-mist-400">
                {quiz.description}
              </p>
            </div>
            {mode === 'results' && result ? (
              <div className="flex items-center gap-2 rounded-xl border border-line bg-ink-950/50 px-3 py-2">
                <Trophy className="h-4 w-4 text-amber-neon" aria-hidden="true" />
                <div>
                  <p className="font-mono text-[0.64rem] uppercase tracking-wider text-mist-500">
                    Score
                  </p>
                  <p className="font-display text-base font-semibold text-mist-50">
                    {result.score}/{result.total} · {percentScore}%
                  </p>
                </div>
              </div>
            ) : null}
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-1.5">
            <span className="badge badge-amber">
              {questions.length} historical {questions.length === 1 ? 'question' : 'questions'}
            </span>
            {flagged > 0 ? (
              <span className="badge badge-rose">
                <Flag className="h-2.5 w-2.5" aria-hidden="true" />
                {flagged} unscored review
              </span>
            ) : null}
            {section ? (
              <Link to={osPath(`/section/${section.id}`)} className="badge hover:text-mist-100">
                <BookOpen className="h-2.5 w-2.5" aria-hidden="true" />
                {section.shortTitle}
              </Link>
            ) : null}
          </div>
        </div>

        {best ? (
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line-soft bg-ink-950/30 px-5 py-3 text-[0.75rem] text-mist-500">
            <span className="inline-flex items-center gap-1.5">
              <Trophy className="h-3.5 w-3.5 text-amber-neon" aria-hidden="true" />
              Personal best: <span className="font-mono text-mist-300">{best.score}/{best.total}</span>
              <span className="text-mist-600">·</span>
              {percent(best.score, best.total)}%
            </span>
            <span>Saved locally · {formatDate(best.at)}</span>
          </div>
        ) : null}
      </div>

      {mode === 'taking' ? (
        <div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1fr)_18rem]">
          <div>
            <TakingQuestion
              key={currentQuestion.id}
              question={currentQuestion}
              index={current}
              total={questions.length}
              answer={answers[currentQuestion.id]}
              onAnswer={updateAnswer}
            />
            <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => goTo(current - 1)}
                disabled={current === 0}
              >
                <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                Previous
              </button>
              <span className="font-mono text-[0.74rem] text-mist-500">
                {current + 1} / {questions.length}
              </span>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => goTo(current + 1)}
                disabled={current >= questions.length - 1}
              >
                Next
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>

          <aside className="space-y-3 lg:sticky lg:top-24 lg:self-start">
            <QuestionNavigator
              questions={questions}
              current={current}
              answers={answers}
              onGo={goTo}
            />

            <div className="panel p-4">
              <div className="flex items-center justify-between text-[0.78rem] text-mist-500">
                <span>Answered</span>
                <span className="font-mono text-mist-300">
                  {answeredCount}/{questions.length}
                </span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-ink-700">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-cyan-neon to-teal-neon transition-[width] duration-300"
                  style={{ width: `${(answeredCount / questions.length) * 100}%` }}
                />
              </div>
              <p className="mt-2.5 text-[0.76rem] leading-relaxed text-mist-500">
                Answers are not graded until you submit. You may move between questions freely.
              </p>

              {showSubmitWarning ? (
                <div
                  ref={warningRef}
                  tabIndex={-1}
                  role="alert"
                  className="mt-3 rounded-lg border border-amber-neon/35 bg-amber-neon/[0.06] p-3"
                >
                  <p className="flex items-start gap-1.5 text-[0.78rem] leading-relaxed text-amber-100">
                    <AlertTriangle className="mt-0.5 h-3.5 w-3.5 flex-none text-amber-neon" aria-hidden="true" />
                    {questions.length - answeredCount} question
                    {questions.length - answeredCount === 1 ? '' : 's'} still unanswered. Unanswered
                    questions count as incorrect in your score.
                  </p>
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm mt-2 w-full"
                    onClick={() => submit(true)}
                  >
                    Submit anyway
                  </button>
                </div>
              ) : null}

              <button
                type="button"
                className="btn btn-primary mt-3 w-full"
                onClick={() => submit(false)}
              >
                <Send className="h-4 w-4" aria-hidden="true" />
                Submit quiz
              </button>
              <p className="mt-2.5 flex items-start gap-1.5 text-[0.72rem] leading-relaxed text-mist-600">
                <Cloud className="mt-0.5 h-3 w-3 flex-none" aria-hidden="true" />
                {draftSavedAt
                  ? `Draft saved on this device at ${new Intl.DateTimeFormat('en-GB', {
                      hour: '2-digit',
                      minute: '2-digit',
                    }).format(draftSavedAt)}.`
                  : 'Answers save automatically on this device.'}
              </p>
            </div>
          </aside>
        </div>
      ) : null}

      {mode === 'results' && result ? (
        <div
          ref={resultsTopRef}
          tabIndex={-1}
          className="mt-4 scroll-mt-24 focus:outline-none"
        >
          {!justSubmitted ? (
            <div className="mb-3 flex flex-wrap items-center gap-2 rounded-xl border border-violet-neon/25 bg-violet-neon/[0.05] px-4 py-3 text-[0.8rem] text-mist-300">
              <Cloud className="h-3.5 w-3.5 flex-none text-violet-neon" aria-hidden="true" />
              <span>
                Showing your saved attempt from <strong className="text-mist-100">{attemptDate(result.attemptedAt)}</strong>.
                Your answers are locked in review.
              </span>
              <button type="button" className="btn btn-secondary btn-sm ms-auto" onClick={retry}>
                <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                Retry quiz
              </button>
            </div>
          ) : null}

          <div className="panel overflow-hidden" aria-live="polite">
            <div className="border-b border-line-soft bg-ink-900/35 px-5 py-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="eyebrow">Result summary</p>
                  <h2 className="mt-1.5 font-display text-2xl font-semibold tracking-tight text-mist-50">
                    {headline?.title}
                  </h2>
                </div>
                <span className="font-mono text-[0.74rem] text-mist-500">
                  {attemptDate(result.attemptedAt)}
                </span>
              </div>
            </div>
            <div className="grid gap-4 p-5 sm:grid-cols-[auto_1fr] sm:items-center">
              <div
                className="relative flex h-28 w-28 items-center justify-center rounded-full"
                style={{
                  background: `conic-gradient(#25d8f2 ${percentScore * 3.6}deg, rgba(32,54,83,0.8) 0deg)`,
                }}
                role="img"
                aria-label={`Score ${result.score} out of ${result.total}, ${percentScore} percent`}
              >
                <div className="flex h-[5.6rem] w-[5.6rem] flex-col items-center justify-center rounded-full bg-ink-900">
                  <span className="font-display text-2xl font-semibold leading-none text-mist-50">
                    {percentScore}%
                  </span>
                  <span className="mt-1 font-mono text-[0.68rem] text-mist-500">
                    {result.score}/{result.total}
                  </span>
                </div>
              </div>
              <div>
                <p className="text-[0.95rem] leading-relaxed text-mist-300">{headline?.body}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  <span className="badge badge-teal">
                    <CheckCircle2 className="h-3 w-3" aria-hidden="true" />
                    {result.score} correct
                  </span>
                  {answeredIncorrect > 0 ? (
                    <span className="badge badge-rose">{answeredIncorrect} incorrect</span>
                  ) : null}
                  {result.unanswered > 0 ? (
                    <span className="badge badge-amber">
                      {result.unanswered} unanswered · counted as incorrect
                    </span>
                  ) : null}
                  {result.flagged > 0 ? (
                    <span className="badge">
                      <Flag className="h-2.5 w-2.5" aria-hidden="true" />
                      {result.flagged} excluded from score
                    </span>
                  ) : null}
                  {best ? (
                    <span className="badge badge-violet">
                      <Trophy className="h-2.5 w-2.5" aria-hidden="true" />
                      Best {best.score}/{best.total}
                    </span>
                  ) : null}
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  <button type="button" className="btn btn-primary btn-sm" onClick={retry}>
                    <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                    Retry quiz
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    onClick={() => {
                      setReviewFilter('incorrect')
                      document.getElementById('quiz-review')?.scrollIntoView({ behavior: 'smooth' })
                    }}
                  >
                    <Target className="h-3.5 w-3.5" aria-hidden="true" />
                    Review misses
                  </button>
                  {section ? (
                    <Link to={osPath(`/section/${section.id}`)} className="btn btn-secondary btn-sm">
                      <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
                      Return to section
                    </Link>
                  ) : null}
                </div>
              </div>
            </div>
          </div>

          {missed.length > 0 ? (
            <div className="mt-3 rounded-xl border border-rose-neon/25 bg-rose-neon/[0.035] p-4">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-rose-neon" aria-hidden="true" />
                <h3 className="font-display text-base font-semibold text-mist-50">
                  Weak topics from this attempt
                </h3>
              </div>
              <div className="mt-2 grid gap-1.5 sm:grid-cols-2">
                {missed.slice(0, 6).map(({ question }) => {
                  const missedSection = revisionSection(question)
                  return (
                    <Link
                      key={question.id}
                      to={osPath(`/section/${missedSection?.id ?? question.sectionId}#quiz`)}
                      className="group rounded-lg border border-line-soft bg-ink-950/35 px-2.5 py-2 transition-colors hover:border-rose-neon/25 hover:bg-ink-900/60"
                    >
                      <p className="line-clamp-2 text-[0.8rem] leading-snug text-mist-300 group-hover:text-mist-100">
                        {question.prompt.replace(/\{\{\d+\}\}/g, '____')}
                      </p>
                      <p className="mt-1 font-mono text-[0.66rem] uppercase tracking-wider text-mist-500">
                        {missedSection?.shortTitle} · {question.concept}
                      </p>
                    </Link>
                  )
                })}
              </div>
              {missed.length > 6 ? (
                <p className="mt-2 text-[0.74rem] text-mist-500">
                  +{missed.length - 6} more missed questions in the full review below.
                </p>
              ) : null}
            </div>
          ) : null}

          <div id="quiz-review" className="mt-5 scroll-mt-24">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="eyebrow">Question-by-question review</p>
                <h3 className="mt-1.5 font-display text-xl font-semibold text-mist-50">
                  Every answer, explained
                </h3>
              </div>
              <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter review">
                {(
                  [
                    { id: 'all', label: `All (${result.graded.length})` },
                    { id: 'incorrect', label: `Incorrect (${missed.length})` },
                    { id: 'flagged', label: `Flagged (${result.flagged})` },
                  ] as const
                ).map((filter) => (
                  <button
                    key={filter.id}
                    type="button"
                    onClick={() => setReviewFilter(filter.id)}
                    aria-pressed={reviewFilter === filter.id}
                    className={cn(
                      'rounded-md border px-2.5 py-1.5 text-[0.72rem] font-medium transition-colors',
                      reviewFilter === filter.id
                        ? 'border-cyan-neon/45 bg-cyan-neon/10 text-cyan-neon'
                        : 'border-line bg-ink-900/55 text-mist-400 hover:text-mist-100',
                    )}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-3 space-y-3">
              {filteredReview.length === 0 ? (
                <div className="rounded-xl border border-line-soft bg-ink-900/35 p-5 text-center">
                  <Sparkles className="mx-auto h-5 w-5 text-teal-neon" aria-hidden="true" />
                  <p className="mt-2 font-display text-base font-semibold text-mist-100">
                    Nothing to show in this filter
                  </p>
                  <p className="mt-1 text-[0.85rem] text-mist-500">
                    {reviewFilter === 'incorrect'
                      ? 'No scored questions were missed in this attempt.'
                      : reviewFilter === 'flagged'
                        ? 'This quiz has no flagged review items.'
                        : 'Submit the quiz to build a review.'}
                  </p>
                </div>
              ) : (
                filteredReview.map(({ entry, index }) => (
                  <ReviewQuestion
                    key={entry.question.id}
                    entry={entry}
                    index={index}
                    total={result.graded.length}
                  />
                ))
              )}
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-line-soft bg-ink-900/35 px-4 py-3">
            <p className="text-[0.78rem] text-mist-500">
              Review is saved locally. Retrying keeps your personal best.
            </p>
            <div className="flex gap-2">
              <button type="button" className="btn btn-secondary btn-sm" onClick={retry}>
                <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                Retry
              </button>
              <Link to={osPath('/progress')} className="btn btn-secondary btn-sm">
                <ClipboardCheck className="h-3.5 w-3.5" aria-hidden="true" />
                Progress dashboard
              </Link>
            </div>
          </div>
        </div>
      ) : null}

      <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.72rem] text-mist-500">
        <span className="inline-flex items-center gap-1">
          <Check className="h-3 w-3 text-teal-neon" aria-hidden="true" />
          Questions and options remain in English in both language modes.
        </span>
        {flagged > 0 ? (
          <span className="inline-flex items-center gap-1">
            <Flag className="h-3 w-3 text-amber-neon" aria-hidden="true" />
            Flagged items are shown, explained, and excluded from the denominator.
          </span>
        ) : null}
        <span className="ms-auto hidden items-center gap-1 sm:inline-flex">
          <ArrowLeft className="h-3 w-3" aria-hidden="true" />
          Use the navigator to revisit any question
          <ArrowRight className="h-3 w-3" aria-hidden="true" />
        </span>
      </div>
    </div>
  )
}
