import { Bookmark, BookmarkCheck, Flag, GraduationCap } from 'lucide-react'
import type { Question } from '../../types'
import { exams } from '../../data/exams'
import { getQuestionTypeLabel } from '../../lib/progress'
import { useProgress } from '../../context/ProgressContext'
import { cn } from '../../lib/cn'

export function QuestionBadges({ question, showType = true }: { question: Question; showType?: boolean }) {
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {showType ? <span className="badge">{getQuestionTypeLabel(question)}</span> : null}
      <span className="badge badge-amber">
        <GraduationCap className="h-2.5 w-2.5" aria-hidden="true" />
        Past exam
      </span>
      <span className="badge capitalize">{question.difficulty}</span>
      {question.unscored ? (
        <span className="badge badge-rose">
          <Flag className="h-2.5 w-2.5" aria-hidden="true" />
          Review only · unscored
        </span>
      ) : null}
      {question.answerStatus === 'needs-review' ? (
        <span className="badge badge-rose">Needs review</span>
      ) : null}
    </div>
  )
}

export function QuestionSources({ question }: { question: Question }) {
  if (question.sourceRefs.length === 0) return null
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <span className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-mist-500">
        Source
      </span>
      {question.sourceRefs.map((ref) => (
        <span key={`${ref.examId}:${ref.question}`} className="badge">
          {exams[ref.examId].shortLabel} · {ref.question}
        </span>
      ))}
    </div>
  )
}

export function QuestionBookmarkButton({
  questionId,
  className,
}: {
  questionId: string
  className?: string
}) {
  const { isQuestionBookmarked, toggleQuestionBookmark } = useProgress()
  const saved = isQuestionBookmarked(questionId)
  return (
    <button
      type="button"
      className={cn('icon-btn h-8 w-8', saved ? 'text-amber-neon' : '', className)}
      onClick={() => toggleQuestionBookmark(questionId)}
      aria-pressed={saved}
      aria-label={saved ? 'Remove question bookmark' : 'Bookmark this question'}
      title={saved ? 'Remove question bookmark' : 'Bookmark this question'}
    >
      {saved ? (
        <BookmarkCheck className="h-4 w-4" aria-hidden="true" />
      ) : (
        <Bookmark className="h-4 w-4" aria-hidden="true" />
      )}
    </button>
  )
}
