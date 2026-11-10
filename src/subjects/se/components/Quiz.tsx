import { useState } from 'react'
import { Check, RotateCcw, X } from 'lucide-react'
import type { LText, QuizLevel, QuizQuestion, Tone } from '../types'
import { usePrefs } from '../context/PrefsContext'
import { Para, Rich } from './Text'

const LEVELS: Record<QuizLevel, { label: string; tone: Tone }> = {
  recall: { label: 'Warm-up', tone: 'teal' },
  understand: { label: 'Understanding', tone: 'blue' },
  apply: { label: 'Application', tone: 'violet' },
}

const KEYS = ['A', 'B', 'C', 'D', 'E', 'F']

function verdict(score: number, total: number): LText {
  if (score === total) return { en: 'Perfect — you have really got this lesson.', ar: 'ممتاز — انت فاهم الدرس ده بجد.' }
  if (score * 2 >= total) return { en: 'Good. Re-read the explanations of the ones you missed.', ar: 'كويس. ارجع اقرا شرح الأسئلة اللي غلطت فيها.' }
  return { en: 'Go through the lesson once more, then try again.', ar: 'راجع الدرس مرة كمان وبعدين جرّب تاني.' }
}

/**
 * The "Check your understanding" section of a lesson: a few multiple-choice questions that get
 * harder as they go. Picking a choice locks the question and shows why the answer is right.
 * Nothing is saved — it is practice, not a grade.
 */
export function Quiz({ questions }: { questions: QuizQuestion[] }) {
  const { showArabic } = usePrefs()
  /** Question index → index of the choice the reader picked. */
  const [picked, setPicked] = useState<Record<number, number>>({})

  const answered = Object.keys(picked).length
  const score = questions.filter((question, i) => picked[i] === question.answer).length
  const finished = answered === questions.length

  return (
    <section id="quiz" className="scroll-mt-24 pt-6" data-reveal="">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div data-tone="blue">
          <p className="eyebrow">Test yourself</p>
          <h2 className="display mt-1 text-[1.65rem] font-bold text-ink">Check your understanding</h2>
          <p className="mt-1 max-w-2xl text-[0.92rem] text-muted">
            {questions.length} questions, from a warm-up to a real case. Decide first, then read the explanation.
            {showArabic ? (
              <span className="ar-inline" lang="ar" dir="rtl">
                {questions.length} أسئلة، من التسخين لحد حالة حقيقية. قرّر الأول، وبعدين اقرا الشرح.
              </span>
            ) : null}
          </p>
        </div>
        <span className="chip" data-tone={finished ? 'teal' : 'blue'} aria-live="polite">
          {answered === 0 ? `${questions.length} questions` : `${score} / ${answered} correct`}
        </span>
      </div>

      <ol className="space-y-4">
        {questions.map((question, i) => {
          const choice = picked[i]
          const isAnswered = choice !== undefined
          const isCorrect = choice === question.answer
          const level = LEVELS[question.level]
          return (
            <li key={i} className="quiz-q">
              <div className="flex flex-wrap items-center gap-2">
                <span className="quiz-num">Q{i + 1}</span>
                <span className="chip" data-tone={level.tone}>
                  {level.label}
                </span>
              </div>
              <Para text={question.question} className="quiz-question reading mt-3" />

              <div className="mt-4 grid gap-2" role="group" aria-label={`Choices for question ${i + 1}`}>
                {question.options.map((option, j) => {
                  const state = !isAnswered ? undefined : j === question.answer ? 'correct' : j === choice ? 'wrong' : 'dim'
                  return (
                    <button
                      key={j}
                      type="button"
                      className="quiz-option rt"
                      data-state={state}
                      disabled={isAnswered}
                      onClick={() => setPicked((current) => ({ ...current, [i]: j }))}
                    >
                      <span className="quiz-key" aria-hidden="true">
                        {KEYS[j]}
                      </span>
                      <span className="min-w-0 flex-1">
                        <Rich text={option} />
                      </span>
                      {state === 'correct' ? <Check className="quiz-mark" aria-label="Correct answer" /> : null}
                      {state === 'wrong' ? <X className="quiz-mark" aria-label="Your answer" /> : null}
                    </button>
                  )
                })}
              </div>

              {isAnswered ? (
                <div className="quiz-why" data-tone={isCorrect ? 'teal' : 'rose'} role="status">
                  <p className="eyebrow flex items-center gap-1.5">
                    {isCorrect ? <Check className="h-3.5 w-3.5" /> : <X className="h-3.5 w-3.5" />}
                    {isCorrect ? 'Correct' : `Not quite — the answer is ${KEYS[question.answer]}`}
                  </p>
                  <Para text={question.explanation} className="reading mt-1.5 text-[0.94rem]" />
                </div>
              ) : null}
            </li>
          )
        })}
      </ol>

      {finished ? (
        <div className="quiz-result mt-4" data-tone={score === questions.length ? 'teal' : 'amber'} role="status">
          <div className="min-w-0">
            <p className="display text-[1.3rem] font-bold text-ink">
              You scored {score} out of {questions.length}
            </p>
            <Para text={verdict(score, questions.length)} className="reading mt-0.5 text-[0.94rem]" />
          </div>
          <button type="button" className="btn btn-ghost btn-sm no-print" onClick={() => setPicked({})}>
            <RotateCcw className="h-4 w-4" /> Try again
          </button>
        </div>
      ) : null}
    </section>
  )
}
