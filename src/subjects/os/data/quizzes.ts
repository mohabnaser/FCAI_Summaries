import type { ChapterId, Question, Quiz, Section } from '../types'
import { allQuestions, questionsById } from './questions'
import { sections as chapter1Sections } from './sections'
import { chapter2FinalAssessmentQuestionIds, chapter2Sections } from './chapter2'
import { chapter3FinalAssessmentQuestionIds, chapter3Sections } from './chapter3'
import { chapter5FinalAssessmentQuestionIds, chapter5Sections } from './chapter5'

const allSectionList: Section[] = [...chapter1Sections, ...chapter2Sections, ...chapter3Sections, ...chapter5Sections]
const sectionById = new Map(allSectionList.map((section) => [section.id, section]))

/** Questions a section owns, in bank order. */
export function ownedQuestionsForSection(sectionId: string): Question[] {
  return allQuestions.filter((question) => question.sectionId === sectionId)
}

/** Questions owned by another chapter but also examined in this section. */
export function crossRefQuestionsForSection(sectionId: string): Question[] {
  const ids = sectionById.get(sectionId)?.crossRefQuestionIds ?? []
  return ids.map((id) => {
    const question = questionsById.get(id)
    if (!question) throw new Error(`Unknown cross-referenced question ${id} in ${sectionId}`)
    return question
  })
}

/** Everything a section’s quiz contains: its own questions, then cross-references. */
export function questionsForSection(sectionId: string): Question[] {
  return [...ownedQuestionsForSection(sectionId), ...crossRefQuestionsForSection(sectionId)]
}

export function historicalForSection(sectionId: string): Question[] {
  return questionsForSection(sectionId).filter((question) => question.origin === 'historical')
}

function buildSectionQuizzes(chapterId: ChapterId, chapterNumber: string, sections: Section[]): Quiz[] {
  return sections.map((section) => {
    const questions = questionsForSection(section.id)
    const shared = crossRefQuestionsForSection(section.id).length
    return {
      id: section.quizId,
      chapterId,
      sectionId: section.id,
      kind: 'section',
      title: `${section.shortTitle} — Exam Practice`,
      description: `${questions.length} historical Chapter ${Number(chapterNumber)} ${
        questions.length === 1 ? 'question' : 'questions'
      }${shared ? ` (${shared} shared with another chapter)` : ''}, preserved with their original wording and provenance. Answers and explanations unlock after submission.`,
      questionIds: questions.map((question) => question.id),
    }
  })
}

export const chapter1SectionQuizzes = buildSectionQuizzes('chapter-1', '01', chapter1Sections)
export const chapter2SectionQuizzes = buildSectionQuizzes('chapter-2', '02', chapter2Sections)
export const chapter3SectionQuizzes = buildSectionQuizzes('chapter-3', '03', chapter3Sections)
export const chapter5SectionQuizzes = buildSectionQuizzes('chapter-5', '05', chapter5Sections)
export const sectionQuizzes: Quiz[] = [
  ...chapter1SectionQuizzes,
  ...chapter2SectionQuizzes,
  ...chapter3SectionQuizzes,
  ...chapter5SectionQuizzes,
]

/**
 * Chapter 1 final assessment — a deliberately curated paper built only from historical
 * items. Section quizzes remain the complete source coverage; this paper samples every
 * section (weighted by how often each is examined) without inventing questions.
 */
export const finalAssessmentQuestionIds = [
  // 1 · What an OS is
  's1-kernel-not-true',
  's1-define-os',
  // 2 · Startup & interrupts
  's2-bootstrap-mcq',
  's2-trap-mcq',
  's2-interrupt-tf',
  's2-firmware-fill',
  // 3 · Storage & caching
  's9-main-memory-tf',
  's9-caching-fill',
  // 4 · I/O & DMA
  's9-dma-mcq',
  's9-sync-io-tf',
  's9-device-driver-tf',
  // 5 · System architecture
  's3-reliability-tf',
  's3-multicore-short',
  // 6 · Multiprogramming
  's4-objective-f20',
  's4-degree-mcq',
  's4-timesharing-f23',
  's4-virtual-memory-tf',
  's4-response-fill',
  // 7 · Dual mode & timer
  's5-privileged-tf',
  's5-dual-mode-short',
  // 8 · Process, memory & storage
  's6-program-vs-process',
  's6-define-process',
  's6-multithread-pc-tf',
  's8-file-abstraction-tf',
  // 9 · Protection & environments
  's11-virtual-machine-tf',
]

/** The Chapter 1 paper keeps its original ID so saved attempts still load. */
export const finalAssessmentQuiz: Quiz = {
  id: 'final-assessment',
  chapterId: 'chapter-1',
  sectionId: 'chapter-1',
  kind: 'final',
  title: 'Chapter 1 Final Assessment',
  description:
    'A 25-question mixed-format paper drawn from past examinations, sampling every Chapter 1 section. Flagged review items are excluded.',
  questionIds: finalAssessmentQuestionIds,
}

export { chapter2FinalAssessmentQuestionIds }

export const chapter2FinalAssessmentQuiz: Quiz = {
  id: 'c2-final-assessment',
  chapterId: 'chapter-2',
  sectionId: 'chapter-2',
  kind: 'final',
  title: 'Chapter 2 Final Assessment',
  description: `A ${chapter2FinalAssessmentQuestionIds.length}-question mixed-format paper drawn from past examinations, sampling every Chapter 2 section. Flagged review items are excluded.`,
  questionIds: chapter2FinalAssessmentQuestionIds,
}

export { chapter3FinalAssessmentQuestionIds }

export const chapter3FinalAssessmentQuiz: Quiz = {
  id: 'c3-final-assessment',
  chapterId: 'chapter-3',
  sectionId: 'chapter-3',
  kind: 'final',
  title: 'Chapter 3 Final Assessment',
  description: `A ${chapter3FinalAssessmentQuestionIds.length}-question mixed-format paper drawn from past examinations, sampling every Chapter 3 section. Flagged review items are excluded.`,
  questionIds: chapter3FinalAssessmentQuestionIds,
}

export { chapter5FinalAssessmentQuestionIds }

export const chapter5FinalAssessmentQuiz: Quiz = {
  id: 'c5-final-assessment',
  chapterId: 'chapter-5',
  sectionId: 'chapter-5',
  kind: 'final',
  title: 'Chapter 5 Final Assessment',
  description: `A ${chapter5FinalAssessmentQuestionIds.length}-question mixed-format paper drawn from past examinations, sampling every Chapter 5 section.`,
  questionIds: chapter5FinalAssessmentQuestionIds,
}

export const finalAssessmentQuizzes: Quiz[] = [
  finalAssessmentQuiz,
  chapter2FinalAssessmentQuiz,
  chapter3FinalAssessmentQuiz,
  chapter5FinalAssessmentQuiz,
]

export const quizzes: Quiz[] = [...sectionQuizzes, ...finalAssessmentQuizzes]

export const quizzesById = new Map(quizzes.map((quiz) => [quiz.id, quiz]))

export function getQuiz(id: string): Quiz {
  const quiz = quizzesById.get(id)
  if (!quiz) throw new Error(`Unknown quiz: ${id}`)
  return quiz
}

export function getSectionQuiz(sectionId: string): Quiz {
  const quiz = sectionQuizzes.find((candidate) => candidate.sectionId === sectionId)
  if (!quiz) throw new Error(`No quiz for section: ${sectionId}`)
  return quiz
}

/** Chapter 1 implementation count (kept for existing callers). */
export const historicalQuestionCount = allQuestions.filter(
  (question) => question.origin === 'historical' && question.chapterId === 'chapter-1',
).length
