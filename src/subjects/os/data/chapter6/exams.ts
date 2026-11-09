import type { ExamAudit } from '../../types'

/**
 * Chapter 6 (CPU Scheduling) audit of the same seven papers, with the counting
 * convention of the other chapters, so every paper's total matches exactly.
 * “Relevant” = tests a concept taught in the 45-page Chapter 6 transcript.
 *
 * Items that Chapters 1 and 3 already implement and that Chapter 6 teaches again
 * (short-term scheduler, ready queue, I/O-bound bursts, the dispatcher/context-switch
 * fill-in, response time, “time slot completed → ready”) are relevant here too and
 * map to those implementations as cross-references.
 */
export const chapter6ExamAudits: ExamAudit[] = [
  {
    chapterId: 'chapter-6',
    examId: 'final_2024',
    totalItems: 66,
    relevantIds: ['Q1.1', 'Q1.2', 'Q1.3', 'Q1.4', 'Q1.5', 'Q1.6', 'Q1.7', 'Q1.8', 'Q2.1', 'Q2.3a'],
    excludedGroups: [
      { ids: 'Q1.9–Q1.37', count: 29, reason: 'Memory management and virtual memory.' },
      { ids: 'Q1.38', count: 1, reason: 'Race condition (process synchronization).' },
      { ids: 'Q1.39–Q1.47', count: 9, reason: 'fork, command interpreter, process states, stack, short- vs long-term scheduler, multiprogramming, I/O-bound ready queue, context switch, degree of multiprogramming (Chapters 1–3).' },
      { ids: 'Q1.48–Q1.60', count: 13, reason: 'Critical sections, IPC, client–server, OS structures and semaphores (Chapters 2, 3 and 5).' },
      { ids: 'Q2.2a–Q2.2c', count: 3, reason: 'Logical-to-physical address translation.' },
      { ids: 'Q2.3b', count: 1, reason: 'Page-replacement calculation.' },
    ],
    notes: [
      'Q1.1 (“main objective of CPU scheduling”) offers both “minimize waiting time” and “maximize CPU utilization”; the second is the multiprogramming goal and the first optimization criterion, so it is the answer.',
      'Q1.43 (short- vs long-term scheduler frequency) stays with Chapter 3: Chapter 6 does not cover the long-term scheduler.',
      'Q2.3a has a tie at t = 3 (P1’s quantum ends as P4 arrives); both tie rules are accepted for P1 and the averages.',
      'Q2.1 is the same essay as Undated B Q7 and shares its implementation.',
    ],
  },
  {
    chapterId: 'chapter-6',
    examId: 'final_2023',
    totalItems: 74,
    relevantIds: ['Q1.19', 'Q1.20', 'Q1.21', 'Q1.22', 'Q2.42', 'Q2.43', 'Q2.44', 'Q2.45', 'Q2.46', 'Q2.60', 'Q3.61', 'Q3.62', 'Q3.63', 'Q3.64'],
    excludedGroups: [
      { ids: 'Q1.1–Q1.18', count: 18, reason: 'Virtual memory and memory management.' },
      { ids: 'Q1.23–Q1.30', count: 8, reason: 'Synchronization, direct communication, OS services, dual mode (Chapters 1, 2, 3 and 5).' },
      { ids: 'Q2.31–Q2.41', count: 11, reason: 'Kernel, termination, scheduler frequency, multiprogramming, PCB, time-sharing, fork/exit, IPC models, semaphores, GUI vs CLI, system boot (Chapters 1–3 and 5).' },
      { ids: 'Q2.47–Q2.59', count: 13, reason: 'Memory management, virtual memory and zero-capacity queues.' },
      { ids: 'Q3.65–Q3.70', count: 6, reason: 'Paging and page-replacement calculations.' },
      { ids: 'Q4', count: 1, reason: 'System calls, system programs and parameter passing (Chapter 2).' },
      { ids: 'Q5a–Q5c', count: 3, reason: 'Address-translation diagrams.' },
    ],
    notes: [
      'Q2.60 (ready queue, short-term scheduler) is implemented in Chapter 3 and cross-referenced.',
      'Q3.63 prints the quantum as “27” in this transcript; the reprint (Undated A) reads 2, and q = 27 would make RR equal FCFS (5.75, not an option). Computed with q = 2 the average is 9.75 — none of the four options — so the item is flagged for review.',
      'Q2.44 has two defensible options (grouping by attributes, a different algorithm per queue) and is flagged for review.',
      'Q2.46 is answered (d): each of (a), (b), (c) is a valid difference.',
    ],
  },
  {
    chapterId: 'chapter-6',
    examId: 'final_nodate',
    totalItems: 74,
    relevantIds: ['Q1.19', 'Q1.20', 'Q1.21', 'Q1.22', 'Q2.42', 'Q2.43', 'Q2.44', 'Q2.45', 'Q2.46', 'Q2.60', 'Q3.61', 'Q3.62', 'Q3.63', 'Q3.64'],
    excludedGroups: [
      { ids: 'Q1.1–Q1.18', count: 18, reason: 'Virtual memory and memory management.' },
      { ids: 'Q1.23–Q1.30', count: 8, reason: 'Synchronization, direct communication, OS services, dual mode (Chapters 1, 2, 3 and 5).' },
      { ids: 'Q2.31–Q2.41', count: 11, reason: 'Kernel, termination, scheduler frequency, multiprogramming, PCB, time-sharing, fork/exit, IPC models, semaphores, GUI vs CLI, system boot (Chapters 1–3 and 5).' },
      { ids: 'Q2.47–Q2.59', count: 13, reason: 'Memory management, virtual memory and zero-capacity queues.' },
      { ids: 'Q3.65–Q3.70', count: 6, reason: 'Paging and page-replacement calculations.' },
      { ids: 'Q4', count: 1, reason: 'System calls, system programs and parameter passing (Chapter 2).' },
      { ids: 'Q5a–Q5c', count: 3, reason: 'Address-translation diagrams.' },
    ],
    notes: [
      'All fourteen items reprint Final 2023 and share its implementations.',
      'Handwritten marks: Q1.19 T, Q1.20 T, Q1.21 T, Q1.22 F, Q2.42 d, Q2.43 b, Q2.45 a, Q3.61 a, Q3.62 c, Q3.64 a agree with the implemented answers. Q2.44 is marked (a) (flagged item). Q2.46 has (a) in ink and (d) in red; (d) is implemented. Q3.63 is circled (d) with the note “9.75 is the correct answer”, which matches the computation.',
    ],
  },
  {
    chapterId: 'chapter-6',
    examId: 'final_nodate2',
    totalItems: 27,
    relevantIds: ['Q1.9', 'Q1.11', 'Q1.12', 'Q1.13', 'Q6a', 'Q6b', 'Q6c', 'Q6d', 'Q7'],
    excludedGroups: [
      { ids: 'Q1.1–Q1.8', count: 8, reason: 'Kernel, trap, caching, DMA, process, API, context switch, IPC models (Chapters 1–3).' },
      { ids: 'Q1.10', count: 1, reason: 'Bootstrap program (Chapter 1).' },
      { ids: 'Q1.14–Q1.16', count: 3, reason: 'Fragmentation, segmentation and local page replacement.' },
      { ids: 'Q2', count: 1, reason: 'Dual-mode operation (Chapter 1).' },
      { ids: 'Q3', count: 1, reason: 'Direct vs indirect communication (Chapter 3).' },
      { ids: 'Q4', count: 1, reason: 'Client–server communication techniques (Chapter 3).' },
      { ids: 'Q5', count: 1, reason: 'Atomic hardware instructions (Chapter 5).' },
      { ids: 'Q8', count: 1, reason: 'Paging and segmentation properties.' },
      { ids: 'Q9', count: 1, reason: 'Page-replacement ranking.' },
    ],
    notes: [
      'Q1.9 (response time) is implemented in Chapter 1 and Q1.12 (time slot completed → ready) in Chapter 3; both are cross-referenced.',
      'Q6a–Q6d are four separately required parts and are implemented separately; Q6b and Q6c ask for every process under every algorithm (the paper’s table also has an Average column).',
      'Q7 is the same essay as Final 2024 Q2.1 and shares its implementation.',
    ],
  },
  {
    chapterId: 'chapter-6',
    examId: 'final_2020',
    totalItems: 77,
    relevantIds: ['Q1.14', 'Q1.15', 'Q2.42', 'Q2.43', 'Q2.45', 'Q2.46', 'Q2.47', 'Q2.48', 'Q2.49', 'Q2.50', 'Q3.63', 'Q3.64', 'Q3.65', 'Q3.66'],
    excludedGroups: [
      { ids: 'Q1.1–Q1.13', count: 13, reason: 'Chapters 1–3 items (including the long-term scheduler and the CPU-bound preference).' },
      { ids: 'Q1.16–Q1.20', count: 5, reason: 'Synchronization, MMU, page tables, FIFO anomaly.' },
      { ids: 'Q2.21–Q2.41', count: 21, reason: 'Command interpreter, uniprogramming, process internals, context switch contents, synchronization, IPC, RPC, RMI, boot, trap, DMA, layered approach (Chapters 1–3 and 5).' },
      { ids: 'Q2.44', count: 1, reason: 'Names for a context switch (Chapter 3).' },
      { ids: 'Q2.51–Q2.60', count: 10, reason: 'Memory management, paging, TLB, segmentation, thrashing.' },
      { ids: 'Q3.61–Q3.62', count: 2, reason: 'Semaphore misuse (Chapter 5).' },
      { ids: 'Q3.67–Q3.75', count: 9, reason: 'Address-bit, partition and page-replacement calculations.' },
      { ids: 'Q4', count: 1, reason: 'Paging and segmentation properties.' },
      { ids: 'Q5', count: 1, reason: 'Alternative page-table structures.' },
    ],
    notes: [
      'Q2.42 (I/O-bound program → many very short CPU bursts) is implemented in Chapter 3 and cross-referenced.',
      'Q2.43 asks when preemptive scheduling occurs; options (a) and (c) are both preemptive decision points, so it is flagged for review.',
      'Q3.63–Q3.66: a USB drive covers part of the process table in the scan. With the transcribed table, Q3.64 (21) and Q3.66 (15) match their options when a preempted process re-enters the queue before a simultaneous arrival; Q3.63 (P1 waits 2) and Q3.65 (P4 waits 9) match no option and are flagged for review.',
    ],
  },
  {
    chapterId: 'chapter-6',
    examId: 'midterm_2022',
    totalItems: 20,
    relevantIds: [],
    excludedGroups: [
      { ids: 'Q1.1–Q1.8', count: 8, reason: 'Chapter 1 and Chapter 3 true/false items.' },
      { ids: 'Q2.1–Q2.4', count: 4, reason: 'Kernel, firmware, multiprocessor types, file-system management (Chapter 1).' },
      { ids: 'Q3.1–Q3.3', count: 3, reason: 'Definitions of OS, process and caching (Chapters 1 and 3).' },
      { ids: 'Q4', count: 1, reason: 'IPC models and direct vs indirect communication (Chapters 2–3).' },
      { ids: 'Q5.1–Q5.4', count: 4, reason: 'Readers–writers problem (Chapter 5).' },
    ],
    notes: ['The midterm predates CPU scheduling; no item tests Chapter 6.'],
  },
  {
    chapterId: 'chapter-6',
    examId: 'midterm_2021',
    totalItems: 18,
    relevantIds: ['Q1.6', 'Q1.13'],
    excludedGroups: [
      { ids: 'Q1.1–Q1.5', count: 5, reason: 'Stack, microkernels, device queue, policy, child processes (Chapters 2–3).' },
      { ids: 'Q1.7–Q1.12', count: 6, reason: 'Ready transitions, system-call interface, rendezvous, indirect IPC, program vs process, concurrent access (Chapters 1–3 and 5).' },
      { ids: 'Q1.14', count: 1, reason: 'Direct communication (Chapter 3).' },
      { ids: 'Q2.1–Q2.2', count: 2, reason: 'Multiprocessor vs multi-core; multiprogramming vs multitasking (Chapter 1).' },
      { ids: 'Q3', count: 1, reason: 'Parameter-passing methods (Chapter 2).' },
      { ids: 'Q4', count: 1, reason: 'Semaphore implementation and readers–writers (Chapter 5).' },
    ],
    notes: [
      'Q1.6 (“a ___ saves the state … and restores the state of the next process”) and Q1.13 (short-term scheduler) are implemented in Chapter 3; Chapter 6 teaches the dispatcher and the short-term scheduler again and cross-references both.',
    ],
  },
]
