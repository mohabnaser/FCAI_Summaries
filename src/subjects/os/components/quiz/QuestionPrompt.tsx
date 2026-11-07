import { RichText } from '../ui/Text'

/**
 * Fill-in prompts use {{1}}, {{2}} markers. They are rendered as visible blank
 * chips while the actual inputs live below the stem, so the sentence stays easy
 * to read in both language modes.
 */
export function QuestionPrompt({ prompt }: { prompt: string }) {
  const parts = prompt.split(/(\{\{\d+\}\})/g)
  return (
    <p className="quiz-prompt whitespace-pre-line">
      {parts.map((part, index) => {
        const match = part.match(/^\{\{(\d+)\}\}$/)
        if (match) {
          return (
            <span key={index} className="blank-marker" aria-hidden="true">
              {match[1]}
            </span>
          )
        }
        if (!part) return null
        return <RichText key={index} text={part} />
      })}
    </p>
  )
}

export function answerText(
  question:
    | { type: 'mcq'; options: Array<{ id: string; text: string }>; correct: string }
    | { type: 'tf'; correct: boolean }
    | { type: 'fill'; blanks: Array<{ id: string; label: string; accepted: string[] }> }
    | { type: 'short'; modelAnswer: string },
): string {
  if (question.type === 'mcq') {
    return question.options.find((option) => option.id === question.correct)?.text ?? '—'
  }
  if (question.type === 'tf') return question.correct ? 'True' : 'False'
  if (question.type === 'fill') {
    return question.blanks
      .map((blank, index) => `${question.blanks.length > 1 ? `Blank ${index + 1}: ` : ''}${blank.accepted[0]}`)
      .join(' · ')
  }
  return question.modelAnswer
}
