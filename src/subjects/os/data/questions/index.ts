import type { Question } from '../../types'
import { section1Questions } from './section1'
import { section2Questions } from './section2'
import { section3Questions } from './section3'
import { section4Questions } from './section4'
import { section5Questions } from './section5'
import { section6Questions } from './section6'
import { section8Questions } from './section8'
import { section9Questions } from './section9'
import { section11Questions } from './section11'
import { chapter2Questions } from '../chapter2/questions'
import { chapter3Questions } from '../chapter3/questions'
import { chapter5Questions } from '../chapter5/questions'
import { chapter6Questions } from '../chapter6/questions'

/**
 * Question modules are grouped by the original lecture topic they were audited
 * from. Each question's `sectionId` decides which section quiz shows it:
 *
 *   section1  → os-intro            section5  → dual-mode
 *   section2  → startup-interrupts  section6  → resource-management (process)
 *   section3  → system-architecture section8  → resource-management (storage)
 *   section4  → multiprogramming    section9  → storage-caching + io-structure
 *   section11 → protection-environments
 *
 * Question IDs are stable keys for bookmarks and attempts — never rename them.
 */
export const chapter1Questions: Question[] = [
  ...section1Questions,
  ...section2Questions,
  ...section3Questions,
  ...section4Questions,
  ...section5Questions,
  ...section6Questions,
  ...section8Questions,
  ...section9Questions,
  ...section11Questions,
].map((question) => ({ ...question, chapterId: 'chapter-1' as const }))

export { chapter2Questions, chapter3Questions, chapter5Questions, chapter6Questions }

/** Every implementation across all chapters. Question IDs are globally unique. */
export const allQuestions: Question[] = [...chapter1Questions, ...chapter2Questions, ...chapter3Questions, ...chapter5Questions, ...chapter6Questions]

export const questionsById = new Map(allQuestions.map((question) => [question.id, question]))

export function getQuestion(id: string): Question {
  const question = questionsById.get(id)
  if (!question) throw new Error(`Unknown question: ${id}`)
  return question
}
