import type { ExamAudit } from '../../types'

/**
 * Chapter 2 audit of the same seven papers, using the Chapter 1 counting convention
 * (one item per MCQ/TF prompt, per fill-in sentence, per definition or essay part).
 * Totals per paper therefore match the Chapter 1 audit exactly.
 *
 * “Relevant” = tests a concept taught in the 51-slide Chapter 2 transcript.
 * Items that Chapter 1 already implements (boot, kernel) are relevant here too and are
 * mapped to the Chapter 1 implementation as cross-references, never re-implemented.
 */
export const chapter2ExamAudits: ExamAudit[] = [
  {
    chapterId: 'chapter-2',
    examId: 'final_2024',
    totalItems: 66,
    relevantIds: ['Q1.39', 'Q1.40', 'Q1.49', 'Q1.54', 'Q1.55', 'Q1.56'],
    excludedGroups: [
      { ids: 'Q1.1–Q1.8', count: 8, reason: 'CPU scheduling.' },
      { ids: 'Q1.9–Q1.37', count: 29, reason: 'Memory management and virtual memory.' },
      { ids: 'Q1.38', count: 1, reason: 'Race condition (process synchronization).' },
      { ids: 'Q1.41–Q1.43', count: 3, reason: 'Process states, process stack, schedulers (Chapter 3).' },
      { ids: 'Q1.44–Q1.47', count: 4, reason: 'Multiprogramming (Chapter 1); I/O-bound processes and context switch (Chapter 3).' },
      { ids: 'Q1.48', count: 1, reason: 'Critical-section requirements (process synchronization).' },
      { ids: 'Q1.50–Q1.53', count: 4, reason: 'Indirect communication, zero-capacity queues, RPC stubs, RMI (Chapter 3).' },
      { ids: 'Q1.57–Q1.60', count: 4, reason: 'Semaphores and readers–writers (process synchronization).' },
      { ids: 'Q2.1', count: 1, reason: 'CPU-scheduling evaluation methods.' },
      { ids: 'Q2.2a–Q2.2c', count: 3, reason: 'Logical-to-physical address translation.' },
      { ids: 'Q2.3a', count: 1, reason: 'Round-robin scheduling calculation.' },
      { ids: 'Q2.3b', count: 1, reason: 'Page-replacement calculation.' },
    ],
    notes: [
      'Q1.39 (fork) and Q1.49 (send & receive) are taught; Chapter 3 revisits both.',
      'Q1.40, Q1.54, Q1.55 and Q1.56 repeat in Final 2020 or Midterm 2021 with different option sets and keep separate implementations.',
    ],
  },
  {
    chapterId: 'chapter-2',
    examId: 'final_2023',
    totalItems: 74,
    relevantIds: ['Q1.29', 'Q2.31', 'Q2.37', 'Q2.38', 'Q2.40', 'Q2.41', 'Q4'],
    excludedGroups: [
      { ids: 'Q1.1–Q1.28', count: 28, reason: 'Virtual memory, memory allocation, scheduling, synchronization, direct IPC.' },
      { ids: 'Q1.30', count: 1, reason: 'Dual-mode operation (Chapter 1).' },
      { ids: 'Q2.32–Q2.36', count: 5, reason: 'Process termination, schedulers, PCB (Chapter 3); multiprogramming and time-sharing (Chapter 1).' },
      { ids: 'Q2.39', count: 1, reason: 'Semaphores in the producer–consumer problem.' },
      { ids: 'Q2.42–Q2.60', count: 19, reason: 'Scheduling, memory, virtual memory, zero-capacity queues, ready queue.' },
      { ids: 'Q3.61–Q3.70', count: 10, reason: 'Scheduling, paging and page-replacement calculations.' },
      { ids: 'Q5a–Q5c', count: 3, reason: 'Address translation diagrams.' },
    ],
    notes: [
      'Q2.31 (kernel modules) and Q2.41 (system boot) are implemented by Chapter 1 and cross-referenced in Chapter 2 sections 5 and 6.',
      'Q4 is the three-part essay on system calls, system programs and parameter passing; implemented as one short answer.',
    ],
  },
  {
    chapterId: 'chapter-2',
    examId: 'final_nodate',
    totalItems: 74,
    relevantIds: ['Q1.29', 'Q2.31', 'Q2.37', 'Q2.38', 'Q2.40', 'Q2.41', 'Q4'],
    excludedGroups: [
      { ids: 'Q1.1–Q1.28', count: 28, reason: 'Virtual memory, memory allocation, scheduling, synchronization, direct IPC.' },
      { ids: 'Q1.30', count: 1, reason: 'Dual-mode operation (Chapter 1).' },
      { ids: 'Q2.32–Q2.36', count: 5, reason: 'Process termination, schedulers, PCB (Chapter 3); multiprogramming and time-sharing (Chapter 1).' },
      { ids: 'Q2.39', count: 1, reason: 'Semaphores in the producer–consumer problem.' },
      { ids: 'Q2.42–Q2.60', count: 19, reason: 'Scheduling, memory, virtual memory, zero-capacity queues, ready queue.' },
      { ids: 'Q3.61–Q3.70', count: 10, reason: 'Scheduling, paging and page-replacement calculations.' },
      { ids: 'Q5a–Q5c', count: 3, reason: 'Address translation diagrams.' },
    ],
    notes: [
      'All seven Chapter 2 items repeat Final 2023 and share its implementations. Q2.37 prints “creat()” instead of “create()” in option a.',
      'Q4 carries a handwritten student answer (registers; block/table with its address in a register; push/pop on the stack) — consistent with the lecture, but not treated as an official key.',
    ],
  },
  {
    chapterId: 'chapter-2',
    examId: 'final_nodate2',
    totalItems: 27,
    relevantIds: ['Q1.6', 'Q1.8', 'Q1.10'],
    excludedGroups: [
      { ids: 'Q1.1–Q1.5', count: 5, reason: 'Kernel, trap, caching, DMA, process (Chapter 1).' },
      { ids: 'Q1.7', count: 1, reason: 'Context switch (Chapter 3).' },
      { ids: 'Q1.9', count: 1, reason: 'Response time in time-sharing (Chapter 1).' },
      { ids: 'Q1.11–Q1.16', count: 6, reason: 'Scheduling, process states, fragmentation, segmentation, local replacement.' },
      { ids: 'Q2', count: 1, reason: 'Dual-mode operation (Chapter 1).' },
      { ids: 'Q3', count: 1, reason: 'Direct vs indirect communication (Chapter 3; not in the Chapter 2 lecture).' },
      { ids: 'Q4', count: 1, reason: 'Client–server communication techniques: sockets, RPC, pipes, RMI (Chapter 3).' },
      { ids: 'Q5', count: 1, reason: 'Atomic hardware instructions and critical sections.' },
      { ids: 'Q6a–Q6d', count: 4, reason: 'CPU-scheduling Gantt charts and metrics.' },
      { ids: 'Q7', count: 1, reason: 'CPU-scheduling evaluation methods.' },
      { ids: 'Q8', count: 1, reason: 'Paging and segmentation properties.' },
      { ids: 'Q9', count: 1, reason: 'Page-replacement ranking.' },
    ],
    notes: [
      'Q1.10 (“the ___ program must locate the kernel”) is implemented by Chapter 1 and matches the lecture’s bootstrap loader; it is cross-referenced in Chapter 2 section 6.',
    ],
  },
  {
    chapterId: 'chapter-2',
    examId: 'final_2020',
    totalItems: 77,
    relevantIds: ['Q1.7', 'Q1.8', 'Q2.21', 'Q2.23', 'Q2.33', 'Q2.38', 'Q2.41'],
    excludedGroups: [
      { ids: 'Q1.1–Q1.6', count: 6, reason: 'Drivers, multiprocessors, privileged instructions, files, main memory, synchronous I/O (Chapter 1).' },
      { ids: 'Q1.9–Q1.10', count: 2, reason: 'Virtual machines and multiprogramming objective (Chapter 1).' },
      { ids: 'Q1.11–Q1.20', count: 10, reason: 'Schedulers, IPC links, scheduling, synchronization, MMU, page tables, FIFO.' },
      { ids: 'Q2.22', count: 1, reason: 'Uniprogramming (Chapter 1).' },
      { ids: 'Q2.24–Q2.32', count: 9, reason: 'Process states, stack, PCB, context switch (Chapter 3); multiprogramming (Chapter 1); synchronization.' },
      { ids: 'Q2.34–Q2.37', count: 4, reason: 'Direct communication, zero-capacity queue, RPC, RMI (Chapter 3).' },
      { ids: 'Q2.39–Q2.40', count: 2, reason: 'Trap and DMA (Chapter 1).' },
      { ids: 'Q2.42–Q2.60', count: 19, reason: 'Scheduling, memory, paging, TLB, segmentation, thrashing.' },
      { ids: 'Q3.61–Q3.75', count: 15, reason: 'Semaphores, round robin, paging bits, allocation, page replacement.' },
      { ids: 'Q4', count: 1, reason: 'Paging and segmentation properties.' },
      { ids: 'Q5', count: 1, reason: 'Alternative page-table structures.' },
    ],
    notes: [
      'Q2.38 (bootstrap program) is implemented by Chapter 1 and cross-referenced in Chapter 2 section 6.',
      'Q1.7, Q2.21, Q2.23, Q2.33 and Q2.41 restate items from other papers with different wording or option order; each keeps its own implementation.',
    ],
  },
  {
    chapterId: 'chapter-2',
    examId: 'midterm_2022',
    totalItems: 20,
    relevantIds: ['Q2.2', 'Q4'],
    excludedGroups: [
      { ids: 'Q1.1–Q1.7', count: 7, reason: 'Chapter 1 true/false items.' },
      { ids: 'Q1.8', count: 1, reason: 'Ready-state definition (Chapter 3).' },
      { ids: 'Q2.1', count: 1, reason: 'Kernel (Chapter 1).' },
      { ids: 'Q2.3–Q2.4', count: 2, reason: 'Multiprocessor types and file-system management (Chapter 1).' },
      { ids: 'Q3.1–Q3.3', count: 3, reason: 'Definitions of OS, process and caching (Chapter 1).' },
      { ids: 'Q5.1–Q5.4', count: 4, reason: 'Readers–writers problem and semaphores.' },
    ],
    notes: [
      'Q2.2 (software stored in EPROM and loaded at power-up) is implemented by Chapter 1 and matches the lecture (“stored in ROM or EEPROM”); cross-referenced in section 6.',
      'Q4 is half Chapter 2 (IPC models) and half Chapter 3 (direct vs indirect). It is implemented here, scored, and cross-referenced by the Chapter 3 IPC section.',
    ],
  },
  {
    chapterId: 'chapter-2',
    examId: 'midterm_2021',
    totalItems: 18,
    relevantIds: ['Q1.2', 'Q1.4', 'Q1.8', 'Q3'],
    excludedGroups: [
      { ids: 'Q1.1', count: 1, reason: 'Process stack (Chapter 3).' },
      { ids: 'Q1.3', count: 1, reason: 'Device queue (Chapter 3).' },
      { ids: 'Q1.5–Q1.7', count: 3, reason: 'Child processes, dispatcher, ready transitions (Chapter 3).' },
      { ids: 'Q1.9–Q1.10', count: 2, reason: 'Rendezvous and indirect communication (Chapter 3).' },
      { ids: 'Q1.11', count: 1, reason: 'Program vs process (Chapter 1).' },
      { ids: 'Q1.12–Q1.14', count: 3, reason: 'Concurrent access, short-term scheduler, direct communication.' },
      { ids: 'Q2.1–Q2.2', count: 2, reason: 'Multiprocessor vs multi-core; multiprogramming vs multitasking (Chapter 1).' },
      { ids: 'Q4', count: 1, reason: 'Semaphore implementation and readers–writers.' },
    ],
    notes: [
      'Q3 asks only for the three parameter-passing methods, so it has its own implementation instead of sharing the three-part Final 2023 essay.',
    ],
  },
]
