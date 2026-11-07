import type { Question } from '../types'
import {
  gradeQuestion,
  type AnswerValue,
  type GradeDetail,
} from './grading'

export interface GradedQuestion {
  question: Question
  answer: AnswerValue | undefined
  detail: GradeDetail
  correctAnswer: string
}

export interface QuizResult {
  graded: GradedQuestion[]
  results: Record<string, boolean>
  answers: Record<string, AnswerValue>
  score: number
  total: number
  unanswered: number
  flagged: number
  attemptedAt: number
}

export function correctAnswerText(question: Question): string {
  switch (question.type) {
    case 'mcq':
      return question.options.find((option) => option.id === question.correct)?.text ?? '—'
    case 'tf':
      return question.correct ? 'True' : 'False'
    case 'fill':
      return question.blanks
        .map((blank, index) =>
          question.blanks.length > 1 ? `Blank ${index + 1}: ${blank.accepted[0]}` : blank.accepted[0],
        )
        .join(' · ')
    case 'short':
      return question.modelAnswer
  }
}

export function buildQuizResult(
  questions: Question[],
  answers: Record<string, AnswerValue>,
  attemptedAt = Date.now(),
): QuizResult {
  const graded = questions.map((question) => {
    const answer = answers[question.id]
    const detail = gradeQuestion(question, answer)
    return {
      question,
      answer,
      detail,
      correctAnswer: correctAnswerText(question),
    }
  })
  const scored = graded.filter((entry) => !entry.question.unscored)
  return {
    graded,
    results: Object.fromEntries(graded.map((entry) => [entry.question.id, entry.detail.correct])),
    answers,
    score: scored.filter((entry) => entry.detail.correct).length,
    total: scored.length,
    unanswered: graded.filter((entry) => answerIsEmpty(entry.answer)).length,
    flagged: graded.filter((entry) => entry.question.unscored).length,
    attemptedAt,
  }
}

export function answerIsEmpty(answer: AnswerValue | undefined): boolean {
  if (answer === undefined) return true
  if (typeof answer === 'string') return answer.trim().length === 0
  if (typeof answer === 'object' && answer !== null) {
    return Object.values(answer).every((value) => value.trim().length === 0)
  }
  return false
}
