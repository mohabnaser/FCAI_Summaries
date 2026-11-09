import { describe, expect, it } from 'vitest'
import { chapter6Questions, getQuestion } from './questions'
import { chapter1Coverage, chapter6Coverage, duplicateSourceKeyList } from './coverage'
import { chapter6FinalAssessmentQuiz, chapter6SectionQuizzes, questionsForSection } from './quizzes'
import { chapter6Sections } from './chapter6'
import { getChapter, sectionInChapter } from './chapters'
import { fmt, predictBursts, schedule, type Algorithm, type ProcSpec, type ScheduleOptions } from '../lib/scheduling'
import { runMlfq } from '../components/visuals/chapter6/MlfqSim'
import type { McqQuestion, Question } from '../types'

const arabicPattern = /[؀-ۿݐ-ݿ]/
const P = (rows: number[][]): ProcSpec[] => rows.map((row, index) => ({ id: `P${index + 1}`, arrival: row[0], burst: row[1], priority: row[2] }))
const waits = (procs: ProcSpec[], algorithm: Algorithm, options?: ScheduleOptions) =>
  schedule(procs, algorithm, options).results.map((result) => result.waiting)

describe('Chapter 6 question bank', () => {
  it('has 42 historical implementations, all owned by Chapter 6', () => {
    expect(chapter6Questions).toHaveLength(42)
    for (const question of chapter6Questions) {
      expect(question.origin).toBe('historical')
      expect(question.chapterId).toBe('chapter-6')
      expect(question.id.startsWith('c6-'), question.id).toBe(true)
      expect(question.explanation.ar, question.id).toBeTruthy()
      expect(question.prompt, question.id).not.toMatch(arabicPattern)
    }
  })

  it('flags exactly the five ambiguous items, all unscored', () => {
    const flagged = chapter6Questions.filter((question) => question.answerStatus === 'needs-review')
    expect(flagged.map((question) => question.id).sort()).toEqual(
      ['c6-calc-rr', 'c6-mlq-reason', 'c6-preemptive-cases', 'c6-rr2-p1-waiting', 'c6-rr2-p4-waiting'].sort(),
    )
    for (const question of flagged) expect(question.unscored, question.id).toBe(true)
  })
})

describe('Chapter 6 coverage ledger', () => {
  it('reconciles every paper and the totals', () => {
    expect(chapter6Coverage.validate()).toEqual([])
    expect(duplicateSourceKeyList).toEqual([])
    expect(chapter6Coverage.summary).toMatchObject({
      total: 356,
      relevant: 63,
      implemented: 63,
      excluded: 293,
      unique: 48,
      owned: 42,
      crossRef: 7,
      duplicatePairs: 15,
      duplicateOccurrences: 15,
      review: 7,
    })
    expect(chapter1Coverage.summary.total).toBe(chapter6Coverage.summary.total)
  })

  it('records the expected relevant items per paper', () => {
    const relevant = Object.fromEntries(chapter6Coverage.examCoverage.map((entry) => [entry.audit.examId, entry.relevant]))
    expect(relevant).toEqual({
      final_2024: 10,
      final_2023: 14,
      final_nodate: 14,
      final_nodate2: 9,
      final_2020: 14,
      midterm_2022: 0,
      midterm_2021: 2,
    })
  })
})

describe('Chapter 6 quizzes', () => {
  it('has five lessons, each with its own past-exam questions', () => {
    expect(chapter6Sections.map((section) => [section.id, questionsForSection(section.id).length])).toEqual([
      ['c6-basics', 13],
      ['c6-fcfs-sjf', 10],
      ['c6-priority-rr', 16],
      ['c6-multilevel', 4],
      ['c6-evaluation', 5],
    ])
  })

  it('places every Chapter 6 question in exactly one section quiz', () => {
    const quizIds = chapter6SectionQuizzes.flatMap((quiz) => quiz.questionIds)
    for (const question of chapter6Questions) expect(quizIds.filter((id) => id === question.id), question.id).toHaveLength(1)
  })

  it('has a final assessment sampling every lesson, without flagged items', () => {
    const chapter = getChapter('chapter-6')
    const questions = chapter6FinalAssessmentQuiz.questionIds.map((id) => getQuestion(id))
    expect(questions).toHaveLength(19)
    expect(new Set(questions.map((question) => sectionInChapter(chapter, question)?.id)).size).toBe(chapter6Sections.length)
    expect(questions.filter((question) => question.unscored)).toEqual([])
    expect(chapter.meta.theme).toBe('garnet')
  })
})

describe('scheduling simulator reproduces the lecture', () => {
  it('FCFS: order matters (17 vs 3)', () => {
    expect(schedule(P([[0, 24], [0, 3], [0, 3]]), 'fcfs').avgWaiting).toBe(17)
    const reordered: ProcSpec[] = [
      { id: 'P2', arrival: 0, burst: 3 },
      { id: 'P3', arrival: 0, burst: 3 },
      { id: 'P1', arrival: 0, burst: 24 },
    ]
    expect(schedule(reordered, 'fcfs').avgWaiting).toBe(3)
  })

  it('SJF, non-preemptive SJF with arrivals, SRTF', () => {
    expect(waits(P([[0, 6], [0, 8], [0, 7], [0, 3]]), 'sjf')).toEqual([3, 16, 9, 0])
    const arrivals = P([[0, 7], [2, 4], [4, 1], [5, 4]])
    expect(schedule(arrivals, 'sjf').avgWaiting).toBe(4)
    expect(waits(arrivals, 'srtf')).toEqual([9, 1, 0, 2])
    expect(schedule(P([[0, 8], [1, 4], [2, 9], [3, 5]]), 'srtf').avgWaiting).toBe(6.5)
  })

  it('priority and round robin', () => {
    expect(schedule(P([[0, 10, 3], [0, 1, 1], [0, 2, 4], [0, 1, 5], [0, 5, 2]]), 'priority').avgWaiting).toBeCloseTo(8.2)
    expect(waits(P([[0, 24], [0, 3], [0, 3]]), 'rr', { quantum: 4 })).toEqual([6, 4, 7])
    const rr20 = schedule(P([[0, 53], [0, 17], [0, 68], [0, 24]]), 'rr', { quantum: 20 })
    expect(rr20.avgWaiting).toBe(73)
    expect(rr20.slices.map((slice) => slice.end)).toEqual([20, 37, 57, 77, 97, 117, 121, 134, 154, 162])
  })

  it('quantum vs turnaround and context switches', () => {
    const set = P([[0, 6], [0, 3], [0, 1], [0, 7]])
    expect([1, 2, 3, 4, 5, 6, 7].map((q) => schedule(set, 'rr', { quantum: q }).avgTurnaround)).toEqual([11, 11.5, 10.75, 11.5, 12.25, 10.5, 10.5])
    expect([12, 6, 1].map((q) => schedule(P([[0, 10]]), 'rr', { quantum: q }).contextSwitches)).toEqual([0, 1, 9])
  })

  it('exponential averaging and deterministic modeling', () => {
    expect(predictBursts([6, 4, 6, 4, 13, 13, 13], 0.5, 10)).toEqual([10, 8, 6, 6, 5, 9, 11, 12])
    const workload = P([[0, 10], [0, 29], [0, 3], [0, 7], [0, 12]])
    expect(schedule(workload, 'fcfs').avgWaiting).toBe(28)
    expect(schedule(workload, 'sjf').avgWaiting).toBe(13)
    expect(schedule(workload, 'rr', { quantum: 10 }).avgWaiting).toBe(23)
  })

  it('multilevel feedback queue demotes long jobs', () => {
    const runs = runMlfq([5, 20, 40])
    expect(runs.map((run) => [run.job, run.level, run.end - run.start])).toEqual([
      [0, 0, 5], [1, 0, 8], [2, 0, 8], [1, 1, 12], [2, 1, 16], [2, 2, 16],
    ])
  })
})

describe('every computed exam answer agrees with its question', () => {
  const option = (id: string) => {
    const question = getQuestion(id) as McqQuestion
    return question.options.find((entry) => entry.id === question.correct)?.text
  }
  const accepts = (question: Question, blankId: string, value: number) => {
    if (question.type !== 'fill') throw new Error(question.id)
    return question.blanks.find((entry) => entry.id === blankId)!.accepted.includes(fmt(value))
  }

  it('Final 2023 Q3.61–Q3.64', () => {
    const set = P([[0, 5, 2], [1, 3, 1], [2, 8, 4], [3, 6, 3]])
    expect(option('c6-calc-fcfs')).toBe(fmt(schedule(set, 'fcfs').avgWaiting))
    expect(option('c6-calc-srtf')).toBe(fmt(schedule(set, 'srtf').avgWaiting))
    expect(option('c6-calc-priority')).toBe(fmt(schedule(set, 'priority').avgWaiting))
    // No printed option equals the RR value under either tie rule.
    const rr = (getQuestion('c6-calc-rr') as McqQuestion).options.map((entry) => entry.text)
    expect(schedule(set, 'rr', { quantum: 2 }).avgWaiting).toBe(9.75)
    expect(rr).not.toContain(fmt(schedule(set, 'rr', { quantum: 2 }).avgWaiting))
    expect(rr).not.toContain(fmt(schedule(set, 'rr', { quantum: 2, rrTie: 'preempted-first' }).avgWaiting))
  })

  it('Final 2020 Q3.63–Q3.66 (preempted process re-queued first)', () => {
    const result = schedule(P([[0, 6], [2, 8], [5, 7], [7, 3]]), 'rr', { quantum: 2, rrTie: 'preempted-first' })
    expect(option('c6-rr2-p2-turnaround')).toBe(`${result.results[1].turnaround} MS`)
    expect(option('c6-rr2-avg-turnaround')).toBe(`${result.avgTurnaround} MS`)
    expect(result.results[0].waiting).toBe(2)
    expect(result.results[3].waiting).toBe(9)
  })

  it('Final 2024 Q2.3a under both tie rules', () => {
    const set = P([[0, 6], [1, 3], [2, 8], [3, 4]])
    const question = getQuestion('c6-rr3-calc')
    for (const rrTie of ['arrival-first', 'preempted-first'] as const) {
      const result = schedule(set, 'rr', { quantum: 3, rrTie })
      result.results.forEach((entry, index) => {
        expect(accepts(question, `w${index + 1}`, entry.waiting), `${rrTie} w${index + 1}`).toBe(true)
        expect(accepts(question, `t${index + 1}`, entry.turnaround), `${rrTie} t${index + 1}`).toBe(true)
      })
      expect(accepts(question, 'wa', result.avgWaiting)).toBe(true)
      expect(accepts(question, 'ta', result.avgTurnaround)).toBe(true)
    }
  })

  it('Undated B Q6b–Q6d', () => {
    const set = P([[0, 10, 2], [1, 29, 3], [2, 3, 4], [3, 7, 3], [4, 12, 1]])
    const algorithms = [
      ['f', 'fcfs'],
      ['s', 'srtf'],
      ['p', 'priority'],
      ['r', 'rr'],
    ] as const
    const turnaround = getQuestion('c6-b-turnaround')
    const waiting = getQuestion('c6-b-waiting')
    const averages: Record<string, number> = {}
    for (const [prefix, algorithm] of algorithms) {
      for (const rrTie of ['arrival-first', 'preempted-first'] as const) {
        const result = schedule(set, algorithm, { quantum: 3, rrTie })
        result.results.forEach((entry, index) => {
          expect(accepts(turnaround, `${prefix}${index + 1}`, entry.turnaround), `${algorithm} T${index + 1}`).toBe(true)
          expect(accepts(waiting, `${prefix}${index + 1}`, entry.waiting), `${algorithm} W${index + 1}`).toBe(true)
        })
        expect(accepts(turnaround, `${prefix}a`, result.avgTurnaround)).toBe(true)
        expect(accepts(waiting, `${prefix}a`, result.avgWaiting)).toBe(true)
        averages[algorithm] = result.avgWaiting
      }
    }
    expect(Math.min(...Object.values(averages))).toBe(averages.srtf)
  })
})
