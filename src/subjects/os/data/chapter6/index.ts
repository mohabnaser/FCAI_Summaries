import type { ChapterMeta, Section } from '../../types'
import { basics } from './sections/s1-basics'
import { fcfsSjf } from './sections/s2-fcfs-sjf'
import { priorityRr } from './sections/s3-priority-rr'
import { multilevel } from './sections/s4-multilevel'
import { evaluation } from './sections/s5-evaluation'

/**
 * Chapter 6 follows its table of contents (basic concepts → evaluation), grouped into
 * five lessons:
 *
 *  1 Basics: burst cycle, scheduler and decision points, dispatcher, criteria
 *  2 FCFS, SJF, burst prediction, SRTF
 *  3 Priority scheduling and round robin
 *  4 Multilevel (feedback) queues and multiple-processor scheduling
 *  5 Algorithm evaluation and the exam problem clinic
 */
export const chapter6Sections: Section[] = [basics, fcfsSjf, priorityRr, multilevel, evaluation].sort((a, b) => a.order - b.order)

export const chapter6Meta: ChapterMeta = {
  id: 'chapter-6',
  number: '06',
  title: 'CPU Scheduling',
  shortTitle: 'CPU Scheduling',
  subtitle:
    'The CPU–I/O burst cycle, preemptive and nonpreemptive scheduling, the dispatcher and the criteria; FCFS, SJF, SRTF, priority, round robin and multilevel queues; multiprocessor scheduling; and how algorithms are evaluated — with every past-exam problem solved step by step.',
  lede: {
    en: 'Who gets the CPU next, and why: scheduling criteria, seven algorithms with every Gantt chart worked out, multiple-processor scheduling, and the four ways to evaluate an algorithm.',
    ar: 'مين ياخد الـ CPU بعد كده وليه: معايير الـ scheduling، وسبع algorithms وكل Gantt chart محلول، والـ multiple-processor scheduling، والأربع طرق لتقييم أي algorithm.',
  },
  slideCount: 45,
  sourceFile: 'chapter6.md',
  sourceLabel: 'Operating System Concepts, 9th ed. · Chapter 6 · Dr. Khaled Wassif',
  theme: 'garnet',
}

/** A 19-question historical paper sampling every Chapter 6 lesson (no flagged items). */
export const chapter6FinalAssessmentQuestionIds = [
  // 1 · Basics & criteria
  'c6-objective-2024',
  'c6-dispatch-latency',
  'c6-preemptive-difference',
  'c6-response-time',
  // 2 · FCFS, SJF, SRTF
  'c6-convoy-algorithm',
  'c6-fcfs-starvation-tf',
  'c6-sjf-optimal-tf-2020',
  'c6-calc-fcfs',
  'c6-calc-srtf',
  // 3 · Priority & RR
  'c6-aging-2020',
  'c6-rr-large-quantum-2024',
  'c6-response-interactive',
  'c6-calc-priority',
  'c6-rr3-calc',
  // 4 · Multilevel & multiprocessor
  'c6-mlq-starvation-tf',
  'c6-mlfq-fill',
  'c6-multiprocessor-challenge',
  // 5 · Evaluation & clinic
  'c6-evaluation-essay',
  'c6-b-minimum',
]
