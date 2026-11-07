import { describe, expect, it } from 'vitest'
import { chapter3Questions, getQuestion } from './questions'
import { chapter1Coverage, chapter3Coverage, duplicateSourceKeyList } from './coverage'
import { chapter3FinalAssessmentQuiz, chapter3SectionQuizzes, questionsForSection } from './quizzes'
import { chapter3Sections } from './chapter3'
import { getChapter, sectionInChapter } from './chapters'

const arabicPattern = /[؀-ۿݐ-ݿ]/

describe('Chapter 3 question bank', () => {
  it('has 40 historical implementations, all owned by Chapter 3', () => {
    expect(chapter3Questions).toHaveLength(40)
    for (const question of chapter3Questions) {
      expect(question.origin).toBe('historical')
      expect(question.chapterId).toBe('chapter-3')
      expect(question.id.startsWith('c3-'), question.id).toBe(true)
      expect(question.sourceRefs.length, question.id).toBeGreaterThan(0)
    }
  })

  it('keeps stems, options and model answers in English with Arabic explanations', () => {
    for (const question of chapter3Questions) {
      expect(question.prompt, question.id).not.toMatch(arabicPattern)
      if (question.type === 'mcq') for (const option of question.options) expect(option.text).not.toMatch(arabicPattern)
      if (question.type === 'short') expect(question.modelAnswer).not.toMatch(arabicPattern)
      expect(question.explanation.ar, question.id).toBeTruthy()
      expect(question.takeaway.ar, question.id).toBeTruthy()
    }
  })

  it('flags only the 2020 CPU-bound reversal for review and excludes it from scoring', () => {
    const review = chapter3Questions.filter((question) => question.answerStatus === 'needs-review')
    expect(review.map((question) => question.id)).toEqual(['c3-cpu-bound-ready-queue'])
    expect(review[0].unscored).toBe(true)
  })
})

describe('Chapter 3 coverage ledger', () => {
  it('reconciles every paper and the totals', () => {
    expect(chapter3Coverage.validate()).toEqual([])
    expect(duplicateSourceKeyList).toEqual([])
    expect(chapter3Coverage.summary).toMatchObject({
      total: 356,
      relevant: 64,
      implemented: 64,
      excluded: 292,
      unique: 52,
      owned: 40,
      crossRef: 15,
      duplicatePairs: 10,
      duplicateOccurrences: 12,
      review: 1,
    })
    expect(chapter1Coverage.summary.total).toBe(chapter3Coverage.summary.total)
  })

  it('records the expected relevant items per paper', () => {
    const relevant = Object.fromEntries(chapter3Coverage.examCoverage.map((entry) => [entry.audit.examId, entry.relevant]))
    expect(relevant).toEqual({
      final_2024: 12,
      final_2023: 8,
      final_nodate: 8,
      final_nodate2: 6,
      final_2020: 17,
      midterm_2022: 3,
      midterm_2021: 10,
    })
  })

  it('maps items already built in Chapters 1 and 2 to those implementations', () => {
    const crossRefs = chapter3Coverage.examCoverage
      .flatMap((entry) => entry.mappings)
      .filter((mapping) => mapping.crossRef)
      .map((mapping) => `${mapping.examId}:${mapping.sourceQuestion}→${mapping.implementationId}`)
    expect(crossRefs.sort()).toEqual(
      [
        'final_2024:Q1.39→c2-fork-create',
        'final_2024:Q1.47→s4-degree-mcq',
        'final_2024:Q1.49→c2-ipc-operations-2024',
        'final_2023:Q2.37→c2-fork-exit',
        'final_2023:Q2.38→c2-ipc-models-mcq',
        'final_nodate:Q2.37→c2-fork-exit',
        'final_nodate:Q2.38→c2-ipc-models-mcq',
        'final_nodate2:Q1.5→s6-process-fill',
        'final_nodate2:Q1.8→c2-ipc-models-fill',
        'final_2020:Q2.23→c2-fork-create-2020',
        'final_2020:Q2.27→s4-degree-mcq',
        'final_2020:Q2.33→c2-ipc-operations-2020',
        'midterm_2022:Q3.2→s6-define-process',
        'midterm_2022:Q4→c2-ipc-models-direct-short',
        'midterm_2021:Q1.11→s6-program-vs-process',
      ].sort(),
    )
  })
})

describe('Chapter 3 quizzes', () => {
  it('has five sections, each with its own past-exam questions', () => {
    expect(chapter3Sections).toHaveLength(5)
    expect(chapter3Sections.map((section) => [section.id, questionsForSection(section.id).length])).toEqual([
      ['c3-process-concept', 13],
      ['c3-scheduling', 15],
      ['c3-operations', 5],
      ['c3-ipc', 14],
      ['c3-client-server', 5],
    ])
  })

  it('places every Chapter 3 question in exactly one section quiz', () => {
    const quizIds = chapter3SectionQuizzes.flatMap((quiz) => quiz.questionIds)
    for (const question of chapter3Questions) {
      expect(quizIds.filter((id) => id === question.id), question.id).toHaveLength(1)
    }
  })

  it('has a final assessment that samples every section with scored historical items', () => {
    const chapter = getChapter('chapter-3')
    const questions = chapter3FinalAssessmentQuiz.questionIds.map((id) => getQuestion(id))
    expect(questions).toHaveLength(18)
    expect(new Set(chapter3FinalAssessmentQuiz.questionIds).size).toBe(18)
    expect(questions.every((question) => !question.unscored)).toBe(true)
    const sampled = new Set(questions.map((question) => sectionInChapter(chapter, question)?.id))
    expect(sampled.size).toBe(chapter3Sections.length)
  })

  it('uses the Sunset theme by default', () => {
    expect(getChapter('chapter-3').meta.theme).toBe('sunset')
  })
})
