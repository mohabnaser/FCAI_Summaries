import { describe, expect, it } from 'vitest'
import { answerIsEmpty, buildQuizResult } from './quiz'
import {
  gradeQuestion,
  matchKeywordGroups,
  normaliseAnswer,
} from './grading'
import { getQuestion } from '../data/questions'

const mcq = getQuestion('s1-kernel-not-true')
const fill = getQuestion('s1-kernel-fill')
const short = getQuestion('s1-define-os')
const flagged = getQuestion('s5-mode-switch-tf')

describe('normaliseAnswer', () => {
  it('lowercases, strips punctuation, and collapses whitespace', () => {
    expect(normaliseAnswer('  The   KERNEL! ')).toBe('the kernel')
    expect(normaliseAnswer('I/O device!')).toBe('i o device')
  })
})

describe('gradeQuestion', () => {
  it('grades a multiple-choice answer by option id', () => {
    expect(gradeQuestion(mcq, 'c').correct).toBe(true)
    expect(gradeQuestion(mcq, 'a').correct).toBe(false)
    expect(gradeQuestion(mcq, undefined).correct).toBe(false)
  })

  it('grades true/false strictly', () => {
    expect(gradeQuestion(flagged, true).correct).toBe(true)
    expect(gradeQuestion(flagged, false).correct).toBe(false)
  })

  it('accepts any listed fill-in variant with lenient normalisation', () => {
    expect(gradeQuestion(fill, { b1: 'Kernel' }).correct).toBe(true)
    expect(gradeQuestion(fill, { b1: 'the KERNEL.' }).correct).toBe(true)
    expect(gradeQuestion(fill, { b1: 'operating system' }).correct).toBe(false)
    expect(gradeQuestion(fill, { b1: '   ' }).correct).toBe(false)
  })

  it('requires every blank in a multi-blank fill-in to be correct', () => {
    // A synthetic multi-blank question keeps this check independent of bank changes.
    const multi = {
      ...fill,
      id: 'test-multi-fill',
      blanks: [
        { id: 'b1', label: 'Blank 1', accepted: ['kernel'] },
        { id: 'b2', label: 'Blank 2', accepted: ['interrupt'] },
      ],
    }
    expect(gradeQuestion(multi, { b1: 'kernel', b2: 'interrupt' }).correct).toBe(true)
    expect(gradeQuestion(multi, { b1: 'kernel', b2: 'trap' }).correct).toBe(false)
    expect(gradeQuestion(multi, { b1: 'kernel' }).correct).toBe(false)
  })

  it('grades short answers against concept groups and a pass ratio', () => {
    const strong =
      'The operating system is an intermediary between the user and the hardware. It provides an environment where programs can execute and acts as a resource allocator and control program.'
    const detail = gradeQuestion(short, strong)
    expect(detail.correct).toBe(true)
    expect(detail.matchedGroups?.length).toBeGreaterThanOrEqual(3)
    expect(detail.missedGroups?.length).toBe(0)

    expect(gradeQuestion(short, 'It is a program.').correct).toBe(false)
  })
})

describe('matchKeywordGroups', () => {
  it('reports matched and missed labels', () => {
    const result = matchKeywordGroups('The mode bit distinguishes kernel mode from user mode.', [
      { label: 'mode bit', patterns: ['mode bit'] },
      { label: 'timer', patterns: ['timer'] },
    ])
    expect(result.matched).toEqual(['mode bit'])
    expect(result.missed).toEqual(['timer'])
  })
})

describe('buildQuizResult', () => {
  it('excludes flagged items from the score denominator and records them', () => {
    const result = buildQuizResult(
      [mcq, flagged],
      { [mcq.id]: 'c', [flagged.id]: true },
      1234,
    )
    expect(result.score).toBe(1)
    expect(result.total).toBe(1)
    expect(result.flagged).toBe(1)
    expect(result.unanswered).toBe(0)
    expect(result.attemptedAt).toBe(1234)
    expect(result.results[mcq.id]).toBe(true)
    expect(result.graded).toHaveLength(2)
  })

  it('counts empty answers as unanswered and incorrect', () => {
    const result = buildQuizResult([mcq], {}, 99)
    expect(result.score).toBe(0)
    expect(result.total).toBe(1)
    expect(result.unanswered).toBe(1)
  })
})

describe('answerIsEmpty', () => {
  it('detects empty values for every answer shape', () => {
    expect(answerIsEmpty(undefined)).toBe(true)
    expect(answerIsEmpty('   ')).toBe(true)
    expect(answerIsEmpty('kernel')).toBe(false)
    expect(answerIsEmpty(false)).toBe(false)
    expect(answerIsEmpty({ b1: '' })).toBe(true)
    expect(answerIsEmpty({ b1: ' ' })).toBe(true)
    expect(answerIsEmpty({ b1: 'kernel' })).toBe(false)
  })
})
