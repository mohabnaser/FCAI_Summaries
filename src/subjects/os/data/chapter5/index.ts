import type { ChapterMeta, Section } from '../../types'
import { criticalSection } from './sections/s1-critical-section'
import { hardware } from './sections/s2-hardware'
import { semaphores } from './sections/s3-semaphores'
import { classic } from './sections/s4-classic'

/**
 * Chapter 5 follows its table of contents (background → classic problems), grouped into
 * four lessons:
 *
 *  1 Race conditions & the critical-section problem
 *  2 Peterson's solution & synchronization hardware
 *  3 Mutex locks & semaphores (incl. deadlock, starvation, misuse)
 *  4 Classic problems: bounded buffer, readers–writers, dining philosophers
 */
export const chapter5Sections: Section[] = [criticalSection, hardware, semaphores, classic].sort((a, b) => a.order - b.order)

export const chapter5Meta: ChapterMeta = {
  id: 'chapter-5',
  number: '05',
  title: 'Process Synchronization',
  shortTitle: 'Synchronization',
  subtitle:
    'Race conditions and the critical-section problem, Peterson’s solution, atomic hardware instructions, mutex locks, semaphores and the classic synchronization problems.',
  lede: {
    en: 'The critical-section problem, Peterson’s solution, synchronization hardware, mutex locks, semaphores, and the classic problems of synchronization.',
    ar: 'يتناول هذا الفصل مشكلة الـ critical section، وحل Peterson، ودعم الـ hardware للتزامن، والـ mutex locks، والـ semaphores، والمشكلات الكلاسيكية للتزامن.',
  },
  slideCount: 39,
  sourceFile: 'chapter5.md',
  sourceLabel: 'Operating System Concepts, 9th ed. · Chapter 5 · Dr. Khaled Wassif',
  theme: 'jade',
}

/** A 15-question historical paper sampling every Chapter 5 lesson. */
export const chapter5FinalAssessmentQuestionIds = [
  // 1 · Critical section
  'c5-race-condition',
  'c5-concurrent-access-tf',
  'c5-only-bounded-waiting-tf',
  'c5-mutual-exclusion',
  'c5-not-a-requirement',
  // 2 · Peterson & hardware
  'c5-peterson-tf',
  'c5-cas-interruptible-tf',
  'c5-hardware-software-levels',
  // 3 · Mutex & semaphores
  'c5-busy-waiting-cost',
  'c5-semaphore-busy-waiting-tf',
  'c5-signal-then-wait',
  'c5-wait-then-wait',
  // 4 · Classic problems
  'c5-producer-consumer-semaphores',
  'c5-readers-writers-first',
  'c5-rw-initial-values',
]
