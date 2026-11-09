import { describe, expect, it } from 'vitest'
import type { ProgressState, QuizAttempt } from '../types'
import { getQuestion } from '../data/questions'
import { getChapter } from '../data/chapters'
import {
  formatDuration,
  getMissedQuestions,
  getProgressOverview,
  getQuestionTypeLabel,
  getStatusLabel,
  getWeakSections,
  percent,
} from './progress'

function attempt(results: Record<string, boolean>, attemptedAt: number): QuizAttempt {
  return {
    answers: {},
    results,
    submitted: true,
    score: Object.values(results).filter(Boolean).length,
    total: Object.keys(results).length,
    attemptedAt,
  }
}

function baseProgress(): ProgressState {
  return {
    sections: {},
    quizzes: {},
    bookmarks: { sections: [], questions: [] },
    bestScores: {},
  }
}

describe('formatDuration', () => {
  it('formats seconds, minutes, and hours without inventing precision', () => {
    expect(formatDuration(0)).toBe('0s')
    expect(formatDuration(45)).toBe('45s')
    expect(formatDuration(60)).toBe('1m')
    expect(formatDuration(65)).toBe('1m')
    expect(formatDuration(3661)).toBe('1h 1m')
  })
})

describe('percent', () => {
  it('rounds and guards a zero denominator', () => {
    expect(percent(3, 4)).toBe(75)
    expect(percent(2, 3)).toBe(67)
    expect(percent(0, 0)).toBe(0)
  })
})

describe('getProgressOverview', () => {
  it('summarises sections, study time, best scores, and graded accuracy', () => {
    const progress = baseProgress()
    progress.sections = {
      'os-intro': {
        visited: true,
        completed: true,
        lastVisitedAt: 1,
        elapsedSeconds: 120,
      },
      'system-architecture': {
        visited: true,
        completed: false,
        lastVisitedAt: 2,
        elapsedSeconds: 300,
      },
    }
    progress.bestScores = {
      'quiz-os-intro': { score: 8, total: 10, at: 10 },
      'quiz-system-architecture': { score: 1, total: 2, at: 11 },
    }
    progress.quizzes = {
      first: attempt({ 's1-kernel-not-true': true, 's2-trap-mcq': false }, 10),
      second: attempt({ 's1-define-os': true }, 11),
    }

    const overview = getProgressOverview(progress)
    expect(overview.sectionsVisited).toBe(2)
    expect(overview.sectionsCompleted).toBe(1)
    // Without a chapter, the overview spans every chapter (9 + 6 + 5 + 4 + 5 sections).
    expect(overview.totalSections).toBe(29)
    expect(overview.completionPercent).toBe(3)
    const chapterOne = getProgressOverview(progress, getChapter('chapter-1'))
    expect(chapterOne.totalSections).toBe(9)
    expect(chapterOne.completionPercent).toBe(11)
    expect(getProgressOverview(progress, getChapter('chapter-2')).sectionsVisited).toBe(0)
    expect(overview.studySeconds).toBe(420)
    expect(overview.quizzesAttempted).toBe(2)
    expect(overview.averageBestPercent).toBe(65)
    expect(overview.questionsGraded).toBe(3)
    expect(overview.questionsCorrect).toBe(2)
    expect(overview.accuracyPercent).toBe(67)
  })

  it('returns null rather than a fake zero for unscored dimensions', () => {
    const overview = getProgressOverview(baseProgress())
    expect(overview.sectionsVisited).toBe(0)
    expect(overview.completionPercent).toBe(0)
    expect(overview.averageBestPercent).toBeNull()
    expect(overview.accuracyPercent).toBeNull()
  })
})

describe('getMissedQuestions', () => {
  it('uses each question’s latest result and ignores unscored review items', () => {
    const progress = baseProgress()
    progress.quizzes = {
      older: attempt(
        { 's1-kernel-not-true': false, 's2-bootstrap-mcq': false },
        100,
      ),
      newer: attempt(
        {
          's1-kernel-not-true': true,
          's5-mode-switch-tf': false,
        },
        200,
      ),
      flagged: attempt({ 's5-mode-switch-tf': false }, 300),
    }

    const missed = getMissedQuestions(progress)
    expect(missed.map((entry) => entry.question.id)).toEqual(['s2-bootstrap-mcq'])
    expect(missed[0]?.section.id).toBe('startup-interrupts')
  })

  it('clears a miss when a later attempt answers correctly', () => {
    const progress = baseProgress()
    progress.quizzes = {
      older: attempt({ 's1-kernel-not-true': false }, 100),
      newer: attempt({ 's1-kernel-not-true': true }, 200),
    }
    expect(getMissedQuestions(progress)).toEqual([])
    expect(getWeakSections(progress)).toEqual([])
  })

  it('groups unresolved misses by section and sorts the weakest first', () => {
    const progress = baseProgress()
    progress.quizzes = {
      attempt: attempt(
        {
          's1-kernel-not-true': false,
          's1-kernel-fill': false,
          's5-privileged-tf': false,
        },
        100,
      ),
    }
    const weak = getWeakSections(progress)
    expect(weak).toHaveLength(2)
    expect(weak[0]?.section.id).toBe('os-intro')
    expect(weak[0]?.totalMissed).toBe(2)
    expect(weak[1]?.section.id).toBe('dual-mode')
  })
})

describe('question labels', () => {
  it('describes the answer format', () => {
    expect(getQuestionTypeLabel(getQuestion('s1-kernel-not-true'))).toBe('Multiple choice')
    expect(getQuestionTypeLabel(getQuestion('s1-kernel-fill'))).toBe('Fill in the blank')
    expect(getQuestionTypeLabel(getQuestion('s1-define-os'))).toBe('Short answer')
    expect(getQuestionTypeLabel(getQuestion('s5-privileged-tf'))).toBe('True / false')
  })

  it('makes scoring status explicit', () => {
    expect(getStatusLabel(getQuestion('s5-mode-switch-tf'))).toBe('Review · unscored')
    expect(getStatusLabel(getQuestion('s1-kernel-not-true'))).toBe('Independently verified')
  })
})

describe('cross-referenced questions', () => {
  it('attribute a miss to the section whose quiz it was answered in', () => {
    const progress = baseProgress()
    progress.quizzes = { 'quiz-c2-debug-boot': attempt({ 's2-bootstrap-mcq': false }, 100) }
    const missed = getMissedQuestions(progress)
    expect(missed[0]?.section.id).toBe('c2-debug-boot')
    expect(getWeakSections(progress, getChapter('chapter-2'))[0]?.section.id).toBe('c2-debug-boot')
    expect(getWeakSections(progress, getChapter('chapter-1'))).toEqual([])
  })
})
