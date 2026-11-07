import { describe, expect, it } from 'vitest'
import { chapter2Questions, getQuestion } from './questions'
import { chapter2Coverage, chapter1Coverage, duplicateSourceKeyList } from './coverage'
import { chapter2FinalAssessmentQuiz, chapter2SectionQuizzes, questionsForSection } from './quizzes'
import { chapter2Sections } from './chapter2'
import { getChapter, sectionInChapter } from './chapters'

const arabicPattern = /[؀-ۿݐ-ݿ]/

describe('Chapter 2 question bank', () => {
  it('has 24 historical implementations, all owned by Chapter 2', () => {
    expect(chapter2Questions).toHaveLength(24)
    for (const question of chapter2Questions) {
      expect(question.origin).toBe('historical')
      expect(question.chapterId).toBe('chapter-2')
      expect(question.id.startsWith('c2-'), question.id).toBe(true)
      expect(question.sourceRefs.length, question.id).toBeGreaterThan(0)
    }
  })

  it('keeps stems, options and model answers in English', () => {
    for (const question of chapter2Questions) {
      expect(question.prompt, question.id).not.toMatch(arabicPattern)
      if (question.type === 'mcq') for (const option of question.options) expect(option.text).not.toMatch(arabicPattern)
      if (question.type === 'short') expect(question.modelAnswer).not.toMatch(arabicPattern)
      if (question.type === 'fill') for (const blank of question.blanks) for (const text of blank.accepted) expect(text).not.toMatch(arabicPattern)
      expect(question.explanation.ar, question.id).toBeTruthy()
    }
  })

  it('scores every Chapter 2 item now that Chapter 3 teaches direct vs indirect (Midterm 2022 Q4)', () => {
    expect(chapter2Questions.filter((question) => question.answerStatus === 'needs-review')).toEqual([])
    expect(chapter2Questions.some((question) => question.unscored)).toBe(false)
  })
})

describe('Chapter 2 coverage ledger', () => {
  it('reconciles every paper and the totals', () => {
    expect(chapter2Coverage.validate()).toEqual([])
    expect(duplicateSourceKeyList).toEqual([])
    expect(chapter2Coverage.summary).toMatchObject({
      total: 356,
      relevant: 36,
      implemented: 36,
      excluded: 320,
      unique: 29,
      owned: 24,
      crossRef: 7,
      duplicatePairs: 7,
      duplicateOccurrences: 7,
      review: 0,
    })
    // Both chapters audit the same 356 items.
    expect(chapter1Coverage.summary.total).toBe(chapter2Coverage.summary.total)
  })

  it('records the expected relevant items per paper', () => {
    const relevant = Object.fromEntries(chapter2Coverage.examCoverage.map((entry) => [entry.audit.examId, entry.relevant]))
    expect(relevant).toEqual({
      final_2024: 6,
      final_2023: 7,
      final_nodate: 7,
      final_nodate2: 3,
      final_2020: 7,
      midterm_2022: 2,
      midterm_2021: 4,
    })
  })

  it('maps boot and kernel items to the Chapter 1 implementations instead of duplicating them', () => {
    const crossRefs = chapter2Coverage.examCoverage
      .flatMap((entry) => entry.mappings)
      .filter((mapping) => mapping.crossRef)
      .map((mapping) => `${mapping.examId}:${mapping.sourceQuestion}→${mapping.implementationId}`)
    expect(crossRefs.sort()).toEqual(
      [
        'final_2020:Q2.38→s2-bootstrap-mcq',
        'final_2023:Q2.31→s1-kernel-not-true',
        'final_2023:Q2.41→s2-system-boot',
        'final_nodate2:Q1.10→s2-bootstrap-fill',
        'final_nodate:Q2.31→s1-kernel-not-true',
        'final_nodate:Q2.41→s2-system-boot',
        'midterm_2022:Q2.2→s2-firmware-fill',
      ].sort(),
    )
  })
})

describe('Chapter 2 quizzes', () => {
  it('has six sections, each with at least one past-exam question', () => {
    expect(chapter2Sections).toHaveLength(6)
    expect(chapter2Sections.map((section) => [section.id, questionsForSection(section.id).length])).toEqual([
      ['c2-services-interfaces', 5],
      ['c2-system-calls', 4],
      ['c2-syscall-types', 8],
      ['c2-programs-design', 3],
      ['c2-structures', 5],
      ['c2-debug-boot', 4],
    ])
  })

  it('places every Chapter 2 question in exactly one section quiz', () => {
    const quizIds = chapter2SectionQuizzes.flatMap((quiz) => quiz.questionIds)
    for (const question of chapter2Questions) {
      expect(quizIds.filter((id) => id === question.id), question.id).toHaveLength(1)
    }
  })

  it('has a final assessment that samples every section with scored historical items', () => {
    const chapter = getChapter('chapter-2')
    const questions = chapter2FinalAssessmentQuiz.questionIds.map((id) => getQuestion(id))
    expect(questions).toHaveLength(16)
    expect(new Set(chapter2FinalAssessmentQuiz.questionIds).size).toBe(16)
    expect(questions.every((question) => !question.unscored)).toBe(true)
    const sampled = new Set(questions.map((question) => sectionInChapter(chapter, question)?.id))
    expect(sampled.size).toBe(chapter2Sections.length)
  })
})
