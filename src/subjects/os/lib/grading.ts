import type { Question } from '../types'

export type AnswerValue = string | boolean | Record<string, string>

export interface GradeDetail {
  correct: boolean
  matchedGroups?: string[]
  missedGroups?: string[]
}

export function normaliseAnswer(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9+#.\s-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function answerMatches(input: string, accepted: string[]): boolean {
  const normalised = normaliseAnswer(input)
  if (!normalised) return false
  return accepted.some((candidate) => {
    const target = normaliseAnswer(candidate)
    if (!target) return false
    if (normalised === target) return true
    // Tolerate a short, meaningful explanation around the target term.
    if (target.length >= 4 && normalised.includes(target)) return true
    return false
  })
}

export function matchKeywordGroups(
  answer: string,
  groups: Array<{ label: string; patterns: string[] }>,
): { matched: string[]; missed: string[] } {
  const normalised = normaliseAnswer(answer)
  const matched: string[] = []
  const missed: string[] = []
  for (const group of groups) {
    const hit = group.patterns.some((pattern) => normalised.includes(normaliseAnswer(pattern)))
    if (hit) matched.push(group.label)
    else missed.push(group.label)
  }
  return { matched, missed }
}

export function gradeQuestion(question: Question, answer: AnswerValue | undefined): GradeDetail {
  if (answer === undefined) return { correct: false }

  switch (question.type) {
    case 'mcq':
      return { correct: typeof answer === 'string' && answer === question.correct }
    case 'tf':
      return { correct: typeof answer === 'boolean' && answer === question.correct }
    case 'fill': {
      if (typeof answer !== 'object' || answer === null) return { correct: false }
      const allCorrect = question.blanks.every((blank) =>
        answerMatches(answer[blank.id] ?? '', blank.accepted),
      )
      return { correct: allCorrect }
    }
    case 'short': {
      if (typeof answer !== 'string') return { correct: false }
      const { matched, missed } = matchKeywordGroups(answer, question.keywordGroups)
      const ratio = question.keywordGroups.length === 0 ? 0 : matched.length / question.keywordGroups.length
      return { correct: ratio >= question.passRatio, matchedGroups: matched, missedGroups: missed }
    }
  }
}

export function isAnswered(question: Question, answer: AnswerValue | undefined): boolean {
  if (answer === undefined) return false
  switch (question.type) {
    case 'mcq':
      return typeof answer === 'string' && answer.length > 0
    case 'tf':
      return typeof answer === 'boolean'
    case 'fill':
      return (
        typeof answer === 'object' &&
        answer !== null &&
        question.blanks.some((blank) => (answer[blank.id] ?? '').trim().length > 0)
      )
    case 'short':
      return typeof answer === 'string' && answer.trim().length > 0
  }
}

export function formatClock(totalSeconds: number): string {
  const safe = Math.max(0, Math.floor(totalSeconds))
  const hours = Math.floor(safe / 3600)
  const minutes = Math.floor((safe % 3600) / 60)
  const seconds = safe % 60
  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
  }
  return `${minutes}:${String(seconds).padStart(2, '0')}`
}
