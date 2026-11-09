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

/** A blank's display name: its own label, unless it is the generic "Blank N". */
export function blankLabel(blank: { label: string }, index: number, count: number): string {
  if (blank.label && !/^Blank \d+$/i.test(blank.label)) return blank.label
  return count > 1 ? `Blank ${index + 1}` : 'Your answer'
}

export function correctAnswerText(question: Question): string {
  switch (question.type) {
    case 'mcq':
      return (
        question.options.find((option) => option.id === question.correct)?.text ??
        'None of the printed options matches the computed answer — see the explanation.'
      )
    case 'tf':
      return question.correct ? 'True' : 'False'
    case 'fill': {
      const count = question.blanks.length
      const labelled = question.blanks.some((blank, index) => blankLabel(blank, index, count) !== `Blank ${index + 1}`)
      return question.blanks
        .map((blank, index) => (count > 1 ? `${blankLabel(blank, index, count)}: ${blank.accepted[0]}` : blank.accepted[0]))
        .join(labelled && count > 2 ? '\n' : ' · ')
    }
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
