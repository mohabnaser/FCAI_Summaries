import { describe, expect, it } from 'vitest'
import { chapter5Questions, getQuestion } from './questions'
import { chapter1Coverage, chapter5Coverage, duplicateSourceKeyList } from './coverage'
import { chapter5FinalAssessmentQuiz, chapter5SectionQuizzes, questionsForSection } from './quizzes'
import { chapter5Sections } from './chapter5'
import { chapters, getChapter, sectionInChapter } from './chapters'
import type { Block, LText } from '../types'

const arabicPattern = /[؀-ۿݐ-ݿ]/

describe('Chapter 5 question bank', () => {
  it('has 23 historical implementations, all owned by Chapter 5', () => {
    expect(chapter5Questions).toHaveLength(23)
    for (const question of chapter5Questions) {
      expect(question.origin).toBe('historical')
      expect(question.chapterId).toBe('chapter-5')
      expect(question.id.startsWith('c5-'), question.id).toBe(true)
      expect(question.explanation.ar, question.id).toBeTruthy()
      expect(question.prompt, question.id).not.toMatch(arabicPattern)
    }
  })

  it('has no review items', () => {
    expect(chapter5Questions.filter((question) => question.answerStatus === 'needs-review')).toEqual([])
  })
})

describe('Chapter 5 coverage ledger', () => {
  it('reconciles every paper and the totals', () => {
    expect(chapter5Coverage.validate()).toEqual([])
    expect(duplicateSourceKeyList).toEqual([])
    expect(chapter5Coverage.summary).toMatchObject({
      total: 356,
      relevant: 31,
      implemented: 31,
      excluded: 325,
      unique: 23,
      owned: 23,
      crossRef: 0,
      duplicatePairs: 8,
      duplicateOccurrences: 8,
      review: 0,
    })
    expect(chapter1Coverage.summary.total).toBe(chapter5Coverage.summary.total)
  })

  it('records the expected relevant items per paper', () => {
    const relevant = Object.fromEntries(chapter5Coverage.examCoverage.map((entry) => [entry.audit.examId, entry.relevant]))
    expect(relevant).toEqual({
      final_2024: 6,
      final_2023: 6,
      final_nodate: 6,
      final_nodate2: 1,
      final_2020: 6,
      midterm_2022: 4,
      midterm_2021: 2,
    })
  })
})

describe('Chapter 5 quizzes', () => {
  it('has four lessons, each with its own past-exam questions', () => {
    expect(chapter5Sections.map((section) => [section.id, questionsForSection(section.id).length])).toEqual([
      ['c5-critical-section', 7],
      ['c5-hardware', 4],
      ['c5-semaphores', 5],
      ['c5-classic', 7],
    ])
  })

  it('places every Chapter 5 question in exactly one section quiz', () => {
    const quizIds = chapter5SectionQuizzes.flatMap((quiz) => quiz.questionIds)
    for (const question of chapter5Questions) expect(quizIds.filter((id) => id === question.id), question.id).toHaveLength(1)
  })

  it('has a final assessment sampling every lesson', () => {
    const chapter = getChapter('chapter-5')
    const questions = chapter5FinalAssessmentQuiz.questionIds.map((id) => getQuestion(id))
    expect(questions).toHaveLength(15)
    expect(new Set(questions.map((question) => sectionInChapter(chapter, question)?.id)).size).toBe(chapter5Sections.length)
    expect(chapter.meta.theme).toBe('jade')
  })
})

function texts(value: unknown): string[] {
  if (typeof value === 'string') return [value]
  if (Array.isArray(value)) return value.flatMap(texts)
  if (value && typeof value === 'object') return Object.values(value as Record<string, unknown>).flatMap(texts)
  return []
}

describe('study text never cites slide numbers', () => {
  it.each(chapters.map((chapter) => [chapter.meta.id, chapter] as const))('%s', (_id, chapter) => {
    const pattern = /\bslides?\s*\d/i
    for (const section of chapter.sections) {
      const all = [
        section.kicker,
        ...texts(section.summary),
        ...texts(section.objectives),
        ...texts(section.examFocus),
        ...texts(section.keyTerms),
        ...section.blocks.flatMap((block: Block) => texts(block)),
      ]
      for (const text of all) expect(text, `${section.id}: ${text}`).not.toMatch(pattern)
    }
    for (const question of chapter.ownedQuestions) {
      const all = [question.prompt, ...texts(question.explanation as LText), ...texts(question.takeaway), ...texts('optionNotes' in question ? question.optionNotes : {})]
      for (const text of all) expect(text, `${question.id}: ${text}`).not.toMatch(pattern)
    }
  })
})
