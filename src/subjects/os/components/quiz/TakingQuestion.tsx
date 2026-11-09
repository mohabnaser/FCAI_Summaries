import { useId } from 'react'
import { CircleHelp, PenLine } from 'lucide-react'
import type { Question } from '../../types'
import type { AnswerValue } from '../../lib/grading'
import { FeedbackText } from '../ui/Text'
import { QuestionBadges, QuestionBookmarkButton, QuestionSources } from './QuestionMeta'
import { QuestionPrompt } from './QuestionPrompt'
import { blankLabel } from '../../lib/quiz'
import { cn } from '../../lib/cn'

interface TakingQuestionProps {
  question: Question
  index: number
  total: number
  answer: AnswerValue | undefined
  onAnswer: (value: AnswerValue) => void
}

function OptionKey({ children }: { children: React.ReactNode }) {
  return (
    <span className="option-key" aria-hidden="true">
      {children}
    </span>
  )
}

export function TakingQuestion({
  question,
  index,
  total,
  answer,
  onAnswer,
}: TakingQuestionProps) {
  const groupId = useId()
  const hintId = `${groupId}-hint`

  return (
    <section className="panel overflow-hidden" aria-labelledby={`${groupId}-prompt`}>
      <div className="border-b border-line-soft bg-ink-900/35 px-5 py-4 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-cyan-neon">
            Question {index + 1} of {total}
          </span>
          <div className="flex items-center gap-1.5">
            <QuestionBookmarkButton questionId={question.id} />
          </div>
        </div>
        <div className="mt-2">
          <QuestionBadges question={question} />
        </div>
      </div>

      <div className="p-5 sm:p-6 lg:p-7">
        <h2 id={`${groupId}-prompt`} className="sr-only">
          Question {index + 1} prompt
        </h2>
        <div className="text-mist-100">
          <QuestionPrompt prompt={question.prompt} />
        </div>

        <div className="mt-5">
          {question.type === 'mcq' ? (
            <fieldset>
              <legend className="sr-only">Choose one answer</legend>
              <div className="space-y-2.5">
                {question.options.map((option) => {
                  const selected = answer === option.id
                  return (
                    <label
                      key={option.id}
                      className="quiz-option"
                      data-selected={selected}
                    >
                      <input
                        type="radio"
                        name={groupId}
                        value={option.id}
                        checked={selected}
                        onChange={() => onAnswer(option.id)}
                        className="sr-only"
                      />
                      <OptionKey>{option.id.toUpperCase()}</OptionKey>
                      <span className="min-w-0 flex-1">{option.text}</span>
                    </label>
                  )
                })}
              </div>
            </fieldset>
          ) : null}

          {question.type === 'tf' ? (
            <fieldset>
              <legend className="sr-only">Choose True or False</legend>
              <div className="grid gap-2.5 sm:grid-cols-2">
                {(
                  [
                    { value: true, label: 'True', key: 'T' },
                    { value: false, label: 'False', key: 'F' },
                  ] as const
                ).map((option) => {
                  const selected = answer === option.value
                  return (
                    <label
                      key={option.label}
                      className="quiz-option items-center"
                      data-selected={selected}
                    >
                      <input
                        type="radio"
                        name={groupId}
                        checked={selected}
                        onChange={() => onAnswer(option.value)}
                        className="sr-only"
                      />
                      <OptionKey>{option.key}</OptionKey>
                      <span className="font-medium">{option.label}</span>
                    </label>
                  )
                })}
              </div>
            </fieldset>
          ) : null}

          {question.type === 'fill' ? (
            <fieldset>
              <legend className="mb-2 flex items-center gap-1.5 text-[0.8rem] font-medium text-mist-400">
                <PenLine className="h-4 w-4 text-cyan-neon" aria-hidden="true" />
                Complete {question.blanks.length > 1 ? 'each blank' : 'the blank'} (spelling is
                checked leniently)
              </legend>
              <div
                className={
                  question.blanks.length > 4
                    ? question.blanks.length % 6 === 0
                      ? 'grid grid-cols-2 gap-x-3 gap-y-2.5 sm:grid-cols-3 lg:grid-cols-6'
                      : 'grid grid-cols-2 gap-x-3 gap-y-2.5 sm:grid-cols-3 lg:grid-cols-5'
                    : 'space-y-3'
                }
              >
                {question.blanks.map((blank, blankIndex) => {
                  const values =
                    typeof answer === 'object' && answer !== null && !Array.isArray(answer)
                      ? answer
                      : {}
                  return (
                    <div key={blank.id}>
                      <label
                        htmlFor={`${groupId}-${blank.id}`}
                        className="mb-1.5 block text-[0.76rem] font-medium text-mist-400"
                      >
                        {blankLabel(blank, blankIndex, question.blanks.length)}
                      </label>
                      <input
                        id={`${groupId}-${blank.id}`}
                        type="text"
                        className="field"
                        value={values[blank.id] ?? ''}
                        onChange={(event) =>
                          onAnswer({ ...values, [blank.id]: event.target.value })
                        }
                        placeholder={question.blanks.length > 4 ? 'value' : 'Type the missing term…'}
                        autoComplete="off"
                        spellCheck={false}
                      />
                    </div>
                  )
                })}
              </div>
              {question.blanks.length > 1 ? (
                <p className="mt-2 text-[0.76rem] text-mist-500">
                  Every blank must be correct for this question to score.
                </p>
              ) : null}
            </fieldset>
          ) : null}

          {question.type === 'short' ? (
            <div>
              <label
                htmlFor={`${groupId}-short`}
                className="mb-1.5 flex items-center gap-1.5 text-[0.8rem] font-medium text-mist-400"
              >
                <PenLine className="h-4 w-4 text-cyan-neon" aria-hidden="true" />
                Write a concise answer
              </label>
              <textarea
                id={`${groupId}-short`}
                className="field min-h-[10rem] resize-y text-[1rem] leading-relaxed"
                value={typeof answer === 'string' ? answer : ''}
                onChange={(event) => onAnswer(event.target.value)}
                placeholder="Use the technical terms from the chapter. A few precise sentences are usually enough."
                spellCheck
              />
              <p className="mt-2 text-[0.76rem] text-mist-500">
                Short answers are graded against the essential concept groups, not exact wording.
              </p>
            </div>
          ) : null}
        </div>

        {question.hint ? (
          <details className="group mt-4 rounded-lg border border-line-soft bg-ink-950/40 px-3.5 py-2.5">
            <summary className="flex cursor-pointer select-none items-center gap-1.5 text-[0.8rem] font-medium text-mist-400 hover:text-mist-200">
              <CircleHelp className="h-4 w-4 text-violet-neon" aria-hidden="true" />
              Need a nudge?
            </summary>
            <div id={hintId} className="mt-2 text-[0.95rem]">
              <FeedbackText text={question.hint} />
            </div>
          </details>
        ) : null}

        <div className={cn('mt-5 border-t border-line-soft pt-4')}>
          <QuestionSources question={question} />
        </div>
      </div>
    </section>
  )
}
