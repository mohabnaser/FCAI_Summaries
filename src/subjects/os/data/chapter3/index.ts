import type { ChapterMeta, Section } from '../../types'
import { processConcept } from './sections/s1-process-concept'
import { scheduling } from './sections/s2-scheduling'
import { operations } from './sections/s3-operations'
import { ipc } from './sections/s4-ipc'
import { clientServer } from './sections/s5-client-server'

/**
 * Chapter 3 follows the six topics of its slide 2, grouped into five sections:
 *
 *  1 The process ................ slides 3–10   (concept, memory, states, PCB)
 *  2 Scheduling ................. slides 11–18  (queues, schedulers, process mix, context switch)
 *  3 Operations ................. slides 19–24  (tree, pid, fork/exec/wait, termination)
 *  4 IPC ........................ slides 25–39  (shared memory, bounded buffer, message passing)
 *  5 Client–server .............. slides 40–50  (sockets, RPC, pipes, RMI)
 */
export const chapter3Sections: Section[] = [processConcept, scheduling, operations, ipc, clientServer].sort(
  (a, b) => a.order - b.order,
)

export const chapter3Meta: ChapterMeta = {
  id: 'chapter-3',
  number: '03',
  title: 'Processes',
  shortTitle: 'Processes',
  subtitle:
    'What a process is, how the OS schedules, creates and ends it, and how processes talk — shared memory, message passing and client–server channels.',
  lede: {
    en: 'The process concept, process scheduling, process creation and termination, interprocess communication through shared memory and message passing, and communication in client–server systems.',
    ar: 'يتناول هذا الفصل مفهوم الـ process، والـ process scheduling، وإنشاء العمليات وإنهاءها، والاتصال بين العمليات (IPC) عبر الـ shared memory والـ message passing، والاتصال في أنظمة الـ client–server.',
  },
  slideCount: 51,
  sourceFile: 'chapter3.md',
  sourceLabel: 'Operating System Concepts, 9th ed. · Chapter 3 · Dr. Khaled Wassif',
  theme: 'sunset',
}

/** An 18-question historical paper sampling every Chapter 3 section (no unscored items). */
export const chapter3FinalAssessmentQuestionIds = [
  // 1 · The process
  'c3-stack-not-global',
  'c3-waiting-state',
  'c3-ready-transitions',
  'c3-timeslice-ready-fill',
  'c3-pcb-purpose',
  // 2 · Scheduling & context switch
  'c3-scheduler-frequency',
  'c3-ready-queue-selection',
  'c3-io-bound-ready-queue',
  'c3-context-switch-saves',
  'c3-context-switch-fill',
  // 3 · Operations
  'c3-child-possibilities',
  'c3-termination-reasons',
  // 4 · IPC
  'c3-direct-mailbox-tf',
  'c3-indirect-mailbox',
  'c3-zero-capacity-blocks',
  'c3-rendezvous',
  // 5 · Client–server
  'c3-client-stub',
  'c3-rpc-separate-systems',
]
