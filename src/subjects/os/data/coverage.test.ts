import { describe, expect, it } from 'vitest'
import { allQuestions, chapter1Questions, getQuestion } from '../data/questions'
import {
  coverageSummary,
  duplicateSourceKeyList,
  examCoverage,
  getExamCoverage,
  validateCoverage,
} from '../data/coverage'
import { exams } from '../data/exams'
import {
  finalAssessmentQuestionIds,
  getSectionQuiz,
  historicalForSection,
  questionsForSection,
  chapter1SectionQuizzes as sectionQuizzes,
} from '../data/quizzes'
import { sections } from '../data/sections'

const arabicPattern = /[\u0600-\u06ff\u0750-\u077f]/

describe('question bank integrity', () => {
  it('contains exactly 45 Chapter 1 historical questions and no invented items', () => {
    expect(chapter1Questions).toHaveLength(45)
    expect(allQuestions.every((question) => question.origin === 'historical')).toBe(true)
  })

  it('has globally unique question ids', () => {
    const ids = allQuestions.map((question) => question.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('assigns every Chapter 1 question to a real Chapter 1 section', () => {
    const sectionIds = new Set(sections.map((section) => section.id))
    for (const question of chapter1Questions) {
      expect(sectionIds.has(question.sectionId)).toBe(true)
    }
  })

  it('keeps question stems and options in English', () => {
    for (const question of allQuestions) {
      expect(question.prompt, question.id).not.toMatch(arabicPattern)
      if (question.type === 'mcq') {
        for (const option of question.options) {
          expect(option.text, question.id).not.toMatch(arabicPattern)
        }
      }
      if (question.type === 'fill') {
        for (const blank of question.blanks) {
          for (const accepted of blank.accepted) {
            expect(accepted, question.id).not.toMatch(arabicPattern)
          }
        }
      }
      if (question.type === 'short') {
        expect(question.modelAnswer, question.id).not.toMatch(arabicPattern)
      }
    }
  })

  it('contains structurally valid answer data', () => {
    for (const question of allQuestions) {
      if (question.type === 'mcq') {
        const optionIds = question.options.map((option) => option.id)
        expect(question.options.length, question.id).toBeGreaterThanOrEqual(2)
        expect(new Set(optionIds).size, question.id).toBe(optionIds.length)
        // A flagged item whose computed answer matches no printed option has no correct option.
        if (question.answerStatus !== 'needs-review' || question.correct) expect(optionIds, question.id).toContain(question.correct)
        else expect(question.unscored, question.id).toBe(true)
      }
      if (question.type === 'tf') {
        expect(typeof question.correct, question.id).toBe('boolean')
      }
      if (question.type === 'fill') {
        expect(question.blanks.length, question.id).toBeGreaterThan(0)
        const blankIds = question.blanks.map((blank) => blank.id)
        expect(new Set(blankIds).size, question.id).toBe(blankIds.length)
        for (const blank of question.blanks) {
          expect(blank.accepted.length, question.id).toBeGreaterThan(0)
          expect(blank.accepted.every((entry) => entry.trim().length > 0), question.id).toBe(true)
        }
      }
      if (question.type === 'short') {
        expect(question.keywordGroups.length, question.id).toBeGreaterThan(0)
        expect(question.passRatio, question.id).toBeGreaterThan(0)
        expect(question.passRatio, question.id).toBeLessThanOrEqual(1)
      }
    }
  })

  it('keeps provenance on every historical item', () => {
    for (const question of allQuestions) {
      expect(question.origin, question.id).toBe('historical')
      expect(question.sourceRefs.length, question.id).toBeGreaterThan(0)
    }
  })

  it('does not map one printed source item to two implementations', () => {
    const keys = new Set<string>()
    for (const question of allQuestions) {
      for (const ref of question.sourceRefs) {
        const key = `${ref.examId}:${ref.question}`
        expect(keys.has(key), `${key} duplicated across implementations`).toBe(false)
        keys.add(key)
      }
    }
    expect(duplicateSourceKeyList).toEqual([])
  })

  it('flags exactly two Chapter 1 review items and excludes both from scoring', () => {
    const review = chapter1Questions.filter((question) => question.answerStatus === 'needs-review')
    expect(review).toHaveLength(2)
    expect(review.every((question) => question.unscored === true)).toBe(true)
  })
})

describe('historical coverage', () => {
  it('reconciles the full ledger', () => {
    expect(validateCoverage()).toEqual([])
    expect(coverageSummary).toMatchObject({
      total: 356,
      relevant: 51,
      implemented: 51,
      unique: 45,
      review: 2,
      excluded: 305,
      duplicatePairs: 6,
      duplicateOccurrences: 6,
    })
    expect(coverageSummary.relevant + coverageSummary.excluded).toBe(coverageSummary.total)
    expect(coverageSummary.relevant - coverageSummary.unique).toBe(
      coverageSummary.duplicateOccurrences,
    )
  })

  it('maps every relevant source occurrence to an implementation', () => {
    for (const entry of examCoverage) {
      expect(entry.implemented, entry.audit.examId).toBe(entry.relevant)
      expect(entry.missing, entry.audit.examId).toEqual([])
      expect(entry.relevant + entry.excluded, entry.audit.examId).toBe(entry.total)
      for (const mapping of entry.mappings) {
        expect(getQuestion(mapping.implementationId).id).toBe(mapping.implementationId)
      }
    }
  })

  it('keeps every exam audit keyed to a known exam', () => {
    for (const entry of examCoverage) {
      expect(exams[entry.audit.examId]).toBeDefined()
      expect(getExamCoverage(entry.audit.examId).audit).toBe(entry.audit)
    }
  })

  it('places all 45 historical questions in their section quiz, with no omissions', () => {
    const historicalIds = new Set(chapter1Questions.map((question) => question.id))
    const quizIds = new Set<string>()
    for (const section of sections) {
      const quiz = getSectionQuiz(section.id)
      expect(quiz.questionIds).toHaveLength(questionsForSection(section.id).length)
      for (const question of historicalForSection(section.id)) {
        expect(quiz.questionIds, section.id).toContain(question.id)
      }
      for (const id of quiz.questionIds) quizIds.add(id)
    }
    expect(quizIds.size).toBe(chapter1Questions.length)
    expect(historicalIds.size).toBe(45)
    expect(sectionQuizzes).toHaveLength(sections.length)
    expect(sections).toHaveLength(9)
  })

  it('distributes historical questions across the nine sections', () => {
    expect(
      sections.map((section) => [section.id, historicalForSection(section.id).length]),
    ).toEqual([
      ['os-intro', 3],
      ['startup-interrupts', 7],
      ['storage-caching', 3],
      ['io-structure', 5],
      ['system-architecture', 4],
      ['multiprogramming', 11],
      ['dual-mode', 4],
      ['resource-management', 7],
      ['protection-environments', 1],
    ])
  })

  it('gives every section at least one past-exam question', () => {
    for (const section of sections) {
      expect(historicalForSection(section.id).length, section.id).toBeGreaterThan(0)
    }
  })

  it('maps Midterm 2022 Q1.6 (one program counter per thread) to Chapter 1', () => {
    const entry = getExamCoverage('midterm_2022')
    const mapping = entry.mappings.find((candidate) => candidate.sourceQuestion === 'Q1.6')
    expect(mapping?.implementationId).toBe('s6-multithread-pc-tf')
    expect(mapping?.question.sectionId).toBe('resource-management')
  })

  it('shares one implementation for the near-identical degree-of-multiprogramming MCQs', () => {
    const question = getQuestion('s4-degree-mcq')
    expect(question.sourceRefs.map((ref) => `${ref.examId}:${ref.question}`)).toEqual([
      'final_2024:Q1.47',
      'final_2020:Q2.27',
    ])
  })
})

describe('final assessment', () => {
  it('is a 25-question historical, scored, cross-section paper', () => {
    expect(finalAssessmentQuestionIds).toHaveLength(25)
    expect(new Set(finalAssessmentQuestionIds).size).toBe(25)
    const questions = finalAssessmentQuestionIds.map((id) => getQuestion(id))
    expect(questions.every((question) => question.origin === 'historical')).toBe(true)
    expect(questions.every((question) => !question.unscored)).toBe(true)
    expect(new Set(questions.map((question) => question.sectionId)).size).toBe(sections.length)
    const counts = new Map<string, number>()
    for (const question of questions) {
      counts.set(question.sectionId, (counts.get(question.sectionId) ?? 0) + 1)
    }
    expect([...counts.entries()]).toEqual([
      ['os-intro', 2],
      ['startup-interrupts', 4],
      ['storage-caching', 2],
      ['io-structure', 3],
      ['system-architecture', 2],
      ['multiprogramming', 5],
      ['dual-mode', 2],
      ['resource-management', 4],
      ['protection-environments', 1],
    ])
  })
})
