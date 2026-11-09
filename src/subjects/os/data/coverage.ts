import type { ChapterId, ExamAudit, ExamId, Question } from '../types'
import { examAudits, exams } from './exams'
import { chapter2ExamAudits } from './chapter2/exams'
import { chapter3ExamAudits } from './chapter3/exams'
import { chapter5ExamAudits } from './chapter5/exams'
import { chapter6ExamAudits } from './chapter6/exams'
import { allQuestions } from './questions'

export interface SourceMapping {
  examId: ExamId
  sourceQuestion: string
  implementationId: string
  question: Question
  /** True when the implementation is owned by a different chapter. */
  crossRef: boolean
}

export interface ExamCoverage {
  audit: ExamAudit
  total: number
  relevant: number
  implemented: number
  review: number
  excluded: number
  mappings: SourceMapping[]
  missing: string[]
  duplicateOccurrences: number
}

export interface CoverageSummary {
  total: number
  relevant: number
  implemented: number
  review: number
  excluded: number
  /** Distinct implementations mapped by this chapter (own + cross-referenced). */
  unique: number
  /** Distinct implementations owned by this chapter. */
  owned: number
  /** Occurrences mapped to another chapter’s implementation. */
  crossRef: number
  /** Implementations mapped by two or more of this chapter’s occurrences. */
  duplicatePairs: number
  duplicateOccurrences: number
}

export interface ChapterCoverage {
  chapterId: ChapterId
  examCoverage: ExamCoverage[]
  summary: CoverageSummary
  validate: () => string[]
  getExamCoverage: (examId: ExamId) => ExamCoverage
}

const sourceKey = (examId: ExamId, question: string) => `${examId}:${question}`

// One printed source item → one implementation, across every chapter.
const sourceToQuestion = new Map<string, Question>()
const duplicateSourceKeys = new Set<string>()
for (const question of allQuestions) {
  for (const ref of question.sourceRefs) {
    const key = sourceKey(ref.examId, ref.question)
    if (sourceToQuestion.has(key)) duplicateSourceKeys.add(key)
    sourceToQuestion.set(key, question)
  }
}

export const duplicateSourceKeyList = [...duplicateSourceKeys]

export function buildChapterCoverage(chapterId: ChapterId, audits: ExamAudit[]): ChapterCoverage {
  const examCoverage: ExamCoverage[] = audits.map((audit) => {
    const mappings: SourceMapping[] = []
    const missing: string[] = []
    for (const sourceQuestion of audit.relevantIds) {
      const question = sourceToQuestion.get(sourceKey(audit.examId, sourceQuestion))
      if (!question) {
        missing.push(sourceQuestion)
        continue
      }
      mappings.push({
        examId: audit.examId,
        sourceQuestion,
        implementationId: question.id,
        question,
        crossRef: question.chapterId !== chapterId,
      })
    }
    const excluded = audit.excludedGroups.reduce((sum, group) => sum + group.count, 0)
    return {
      audit,
      total: audit.totalItems,
      relevant: audit.relevantIds.length,
      implemented: mappings.length,
      review: mappings.filter((mapping) => mapping.question.answerStatus === 'needs-review').length,
      excluded,
      mappings,
      missing,
      duplicateOccurrences: mappings.filter((mapping) => mapping.question.sourceRefs.length > 1).length,
    }
  })

  const allMappings = examCoverage.flatMap((entry) => entry.mappings)
  const perImplementation = new Map<string, number>()
  for (const mapping of allMappings) {
    perImplementation.set(mapping.implementationId, (perImplementation.get(mapping.implementationId) ?? 0) + 1)
  }
  const total = examCoverage.reduce((sum, entry) => sum + entry.total, 0)
  const relevant = examCoverage.reduce((sum, entry) => sum + entry.relevant, 0)
  const unique = perImplementation.size
  const summary: CoverageSummary = {
    total,
    relevant,
    implemented: allMappings.length,
    review: examCoverage.reduce((sum, entry) => sum + entry.review, 0),
    excluded: examCoverage.reduce((sum, entry) => sum + entry.excluded, 0),
    unique,
    owned: new Set(allMappings.filter((mapping) => !mapping.crossRef).map((mapping) => mapping.implementationId)).size,
    crossRef: allMappings.filter((mapping) => mapping.crossRef).length,
    duplicatePairs: [...perImplementation.values()].filter((count) => count > 1).length,
    duplicateOccurrences: relevant - unique,
  }

  const validate = () => {
    const problems: string[] = []
    for (const entry of examCoverage) {
      if (entry.missing.length > 0) {
        problems.push(`${exams[entry.audit.examId].shortLabel}: missing implementations for ${entry.missing.join(', ')}`)
      }
      if (entry.relevant + entry.excluded !== entry.total) {
        problems.push(
          `${exams[entry.audit.examId].shortLabel}: ${entry.relevant} relevant + ${entry.excluded} excluded ≠ ${entry.total} total`,
        )
      }
    }
    if (summary.relevant + summary.excluded !== summary.total) problems.push('Global totals do not reconcile.')
    if (duplicateSourceKeyList.length > 0) {
      problems.push(`A source question is mapped by more than one implementation: ${duplicateSourceKeyList.join(', ')}`)
    }
    return problems
  }

  const getExamCoverage = (examId: ExamId) => {
    const entry = examCoverage.find((candidate) => candidate.audit.examId === examId)
    if (!entry) throw new Error(`Unknown exam: ${examId}`)
    return entry
  }

  return { chapterId, examCoverage, summary, validate, getExamCoverage }
}

export const chapter1Coverage = buildChapterCoverage('chapter-1', examAudits)
export const chapter2Coverage = buildChapterCoverage('chapter-2', chapter2ExamAudits)
export const chapter3Coverage = buildChapterCoverage('chapter-3', chapter3ExamAudits)
export const chapter5Coverage = buildChapterCoverage('chapter-5', chapter5ExamAudits)
export const chapter6Coverage = buildChapterCoverage('chapter-6', chapter6ExamAudits)

// Chapter 1 names kept for existing callers and tests.
export const examCoverage = chapter1Coverage.examCoverage
export const coverageSummary = chapter1Coverage.summary
export const validateCoverage = chapter1Coverage.validate
export const getExamCoverage = chapter1Coverage.getExamCoverage

export function sourceLabel(examId: ExamId): string {
  return exams[examId].shortLabel
}
