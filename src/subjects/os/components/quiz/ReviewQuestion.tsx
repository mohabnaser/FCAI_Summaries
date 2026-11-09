import { AlertTriangle, Check, CheckCircle2, Flag, X, XCircle } from 'lucide-react'
import type { GradedQuestion } from '../../lib/quiz'
import type { AnswerValue } from '../../lib/grading'
import { FeedbackText } from '../ui/Text'
import { QuestionBadges, QuestionBookmarkButton, QuestionSources } from './QuestionMeta'
import { QuestionPrompt } from './QuestionPrompt'
import { blankLabel } from '../../lib/quiz'
import { cn } from '../../lib/cn'

function filledAnswer(answer: AnswerValue | undefined): string | null {
  if (answer === undefined) return null
  if (typeof answer === 'string') return answer.trim() || null
  if (typeof answer === 'boolean') return answer ? 'True' : 'False'
  return null
}

function YourAnswer({ entry }: { entry: GradedQuestion }) {
  const { question, answer } = entry

  if (question.type === 'mcq') {
    const chosen = question.options.find((option) => option.id === answer)
    return chosen ? (
      <p className="text-[0.95rem] text-mist-200">
        <span className="font-mono text-[0.72rem] text-mist-500">{chosen.id.toUpperCase()} · </span>
        {chosen.text}
      </p>
    ) : (
      <p className="text-[0.95rem] italic text-mist-500">Not answered</p>
    )
  }

  if (question.type === 'tf') {
    return typeof answer === 'boolean' ? (
      <p className="text-[0.95rem] text-mist-200">{answer ? 'True' : 'False'}</p>
    ) : (
      <p className="text-[0.95rem] italic text-mist-500">Not answered</p>
    )
  }

  if (question.type === 'fill') {
    const values = typeof answer === 'object' && answer !== null && !Array.isArray(answer) ? answer : {}
    return (
      <div className="space-y-1">
        {question.blanks.map((blank, index) => (
          <p key={blank.id} className="text-[0.95rem] text-mist-200">
            <span className="text-mist-500">
              {question.blanks.length > 1 ? `${blankLabel(blank, index, question.blanks.length)}: ` : 'Answer: '}
            </span>
            {values[blank.id]?.trim() ? (
              values[blank.id]
            ) : (
              <span className="italic text-mist-500">Not answered</span>
            )}
          </p>
        ))}
      </div>
    )
  }

  const text = filledAnswer(answer)
  return text ? (
    <p className="whitespace-pre-wrap text-[0.95rem] leading-relaxed text-mist-200">{text}</p>
  ) : (
    <p className="text-[0.95rem] italic text-mist-500">Not answered</p>
  )
}

function OptionBreakdown({ entry }: { entry: GradedQuestion }) {
  const { question, answer } = entry
  if (question.type !== 'mcq' && question.type !== 'tf') return null

  const options =
    question.type === 'mcq'
      ? question.options.map((option) => ({
          key: option.id,
          label: option.id.toUpperCase(),
          text: option.text,
          note: question.optionNotes?.[option.id],
          correct: option.id === question.correct,
          selected: answer === option.id,
        }))
      : (['true', 'false'] as const).map((key) => ({
          key,
          label: key === 'true' ? 'T' : 'F',
          text: key === 'true' ? 'True' : 'False',
          note: question.optionNotes?.[key],
          correct: question.correct === (key === 'true'),
          selected: answer === (key === 'true'),
        }))

  return (
    <div className="mt-3 space-y-1.5">
      <p className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-mist-500">
        Option review
      </p>
      {options.map((option) => (
        <div
          key={option.key}
          className={cn(
            'rounded-lg border p-2.5',
            option.correct
              ? 'border-teal-neon/35 bg-teal-neon/[0.055]'
              : option.selected
                ? 'border-rose-neon/35 bg-rose-neon/[0.045]'
                : 'border-line-soft bg-ink-950/30',
          )}
        >
          <div className="flex items-start gap-2">
            <span
              className={cn(
                'mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded border font-mono text-[0.7rem]',
                option.correct
                  ? 'border-teal-neon/45 text-teal-neon'
                  : option.selected
                    ? 'border-rose-neon/45 text-rose-neon'
                    : 'border-line text-mist-500',
              )}
            >
              {option.label}
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[0.9rem] leading-snug text-mist-200">{option.text}</p>
              <div className="mt-1 flex flex-wrap items-center gap-1.5">
                {option.correct ? (
                  <span className="badge badge-teal">
                    <Check className="h-2.5 w-2.5" aria-hidden="true" />
                    Correct answer
                  </span>
                ) : null}
                {option.selected ? (
                  <span className={cn('badge', option.correct ? 'badge-teal' : 'badge-rose')}>
                    Your answer
                  </span>
                ) : null}
              </div>
              {option.note ? (
                <div className="mt-1.5 text-[0.85rem]">
                  <FeedbackText text={option.note} />
                </div>
              ) : null}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function ShortAnswerBreakdown({ entry }: { entry: GradedQuestion }) {
  if (entry.question.type !== 'short') return null
  const matched = entry.detail.matchedGroups ?? []
  const missed = entry.detail.missedGroups ?? []
  return (
    <div className="mt-3 rounded-lg border border-line-soft bg-ink-950/30 p-3">
      <p className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-mist-500">
        Concept checks
      </p>
      <div className="mt-1.5 flex flex-wrap gap-1.5">
        {matched.map((group) => (
          <span key={group} className="badge badge-teal">
            <Check className="h-2.5 w-2.5" aria-hidden="true" />
            {group}
          </span>
        ))}
        {missed.map((group) => (
          <span key={group} className="badge badge-rose">
            <X className="h-2.5 w-2.5" aria-hidden="true" />
            {group}
          </span>
        ))}
      </div>
      <p className="mt-2 text-[0.78rem] text-mist-500">
        Short answers pass when they cover at least{' '}
        {Math.round(entry.question.passRatio * 100)}% of the essential concept groups.
      </p>
    </div>
  )
}

export function ReviewQuestion({
  entry,
  index,
  total,
}: {
  entry: GradedQuestion
  index: number
  total: number
}) {
  const { question, detail, correctAnswer } = entry
  const scored = !question.unscored
  const status = scored ? (detail.correct ? 'correct' : 'incorrect') : 'flagged'

  return (
    <article
      id={`review-${question.id}`}
      className={cn(
        'panel overflow-hidden border',
        status === 'correct'
          ? 'border-teal-neon/20'
          : status === 'incorrect'
            ? 'border-rose-neon/20'
            : 'border-amber-neon/25',
      )}
    >
      <div className="border-b border-line-soft bg-ink-900/40 px-4 py-3 sm:px-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-mist-500">
              {index + 1} / {total}
            </span>
            <span
              className={cn(
                'badge',
                status === 'correct'
                  ? 'badge-teal'
                  : status === 'incorrect'
                    ? 'badge-rose'
                    : 'badge-amber',
              )}
            >
              {status === 'correct' ? (
                <CheckCircle2 className="h-3 w-3" aria-hidden="true" />
              ) : status === 'incorrect' ? (
                <XCircle className="h-3 w-3" aria-hidden="true" />
              ) : (
                <Flag className="h-3 w-3" aria-hidden="true" />
              )}
              {status === 'correct'
                ? 'Correct'
                : status === 'incorrect'
                  ? 'Incorrect'
                  : 'Review only'}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <QuestionBookmarkButton questionId={question.id} />
          </div>
        </div>
        <div className="mt-2">
          <QuestionBadges question={question} />
        </div>
      </div>

      <div className="p-4 sm:p-5">
        <div className="text-[1.04rem] leading-relaxed text-mist-100">
          <QuestionPrompt prompt={question.prompt} />
        </div>

        {!scored ? (
          <div className="mt-3 flex items-start gap-2 rounded-lg border border-amber-neon/25 bg-amber-neon/[0.05] p-2.5">
            <AlertTriangle className="mt-0.5 h-3.5 w-3.5 flex-none text-amber-neon" aria-hidden="true" />
            <p className="text-[0.8rem] leading-relaxed text-mist-300">
              This source item has ambiguous or incomplete wording. It is shown with the best
              supported reading but is excluded from your score.
            </p>
          </div>
        ) : null}

        <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
          <div className="rounded-lg border border-line-soft bg-ink-950/35 p-3">
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.12em] text-mist-500">
              Your answer
            </p>
            <div className="mt-1.5">
              <YourAnswer entry={entry} />
            </div>
          </div>
          <div
            className={cn(
              'rounded-lg border p-3',
              status === 'correct'
                ? 'border-teal-neon/25 bg-teal-neon/[0.045]'
                : 'border-line-soft bg-ink-950/35',
            )}
          >
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.12em] text-teal-200">
              Correct answer
            </p>
            <div className="mt-1.5">
              <p className="whitespace-pre-wrap text-[0.95rem] leading-relaxed text-mist-100">
                {correctAnswer}
              </p>
            </div>
          </div>
        </div>

        <OptionBreakdown entry={entry} />
        <ShortAnswerBreakdown entry={entry} />

        <div className="mt-4 rounded-lg border border-line-soft bg-ink-900/40 p-3.5">
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.13em] text-cyan-neon">
            Explanation
          </p>
          <div className="mt-1.5">
            <FeedbackText text={question.explanation} />
          </div>
        </div>

        <div className="mt-2.5 rounded-lg border border-amber-neon/20 bg-amber-neon/[0.045] p-3">
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.12em] text-amber-neon">
            Exam takeaway
          </p>
          <div className="mt-1">
            <FeedbackText text={question.takeaway} />
          </div>
        </div>

        <div className="mt-3 border-t border-line-soft pt-2.5">
          <QuestionSources question={question} />
        </div>
      </div>
    </article>
  )
}
