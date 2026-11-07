import type { ExamAudit } from '../../types'

/**
 * Chapter 5 (Process Synchronization) audit of the same seven papers, with the counting
 * convention of the other chapters, so every paper's total matches exactly.
 * “Relevant” = tests a concept taught in the 39-page Chapter 5 transcript.
 */
export const chapter5ExamAudits: ExamAudit[] = [
  {
    chapterId: 'chapter-5',
    examId: 'final_2024',
    totalItems: 66,
    relevantIds: ['Q1.38', 'Q1.48', 'Q1.57', 'Q1.58', 'Q1.59', 'Q1.60'],
    excludedGroups: [
      { ids: 'Q1.1–Q1.8', count: 8, reason: 'CPU scheduling.' },
      { ids: 'Q1.9–Q1.37', count: 29, reason: 'Memory management and virtual memory.' },
      { ids: 'Q1.39–Q1.47', count: 9, reason: 'fork, command interpreter, process states, stack, schedulers, multiprogramming, context switch (Chapters 1–3).' },
      { ids: 'Q1.49–Q1.56', count: 8, reason: 'IPC, client–server communication and OS structures (Chapters 2–3).' },
      { ids: 'Q2.1', count: 1, reason: 'CPU-scheduling evaluation methods.' },
      { ids: 'Q2.2a–Q2.2c', count: 3, reason: 'Logical-to-physical address translation.' },
      { ids: 'Q2.3a', count: 1, reason: 'Round-robin scheduling calculation.' },
      { ids: 'Q2.3b', count: 1, reason: 'Page-replacement calculation.' },
    ],
    notes: [
      'Q1.48 prints the Progress option split across (b) and (c); the five options are kept as printed and the answer is (e) priority inversion.',
      'Q1.57 and Q1.58 reprint Final 2020 Q3.61 and Q3.62 and share their implementations.',
    ],
  },
  {
    chapterId: 'chapter-5',
    examId: 'final_2023',
    totalItems: 74,
    relevantIds: ['Q1.23', 'Q1.24', 'Q1.25', 'Q1.26', 'Q1.27', 'Q2.39'],
    excludedGroups: [
      { ids: 'Q1.1–Q1.18', count: 18, reason: 'Virtual memory and memory management.' },
      { ids: 'Q1.19–Q1.22', count: 4, reason: 'CPU scheduling.' },
      { ids: 'Q1.28–Q1.30', count: 3, reason: 'Direct communication, OS services, dual mode (Chapters 1–3).' },
      { ids: 'Q2.31–Q2.38', count: 8, reason: 'Kernel, termination, schedulers, multiprogramming, PCB, time-sharing, fork/exit, IPC models (Chapters 1–3).' },
      { ids: 'Q2.40–Q2.60', count: 21, reason: 'GUI vs CLI, system boot, CPU scheduling, memory, virtual memory, zero capacity, ready queue.' },
      { ids: 'Q3.61–Q3.70', count: 10, reason: 'Scheduling, paging and page-replacement calculations.' },
      { ids: 'Q4', count: 1, reason: 'System calls, system programs and parameter passing (Chapter 2).' },
      { ids: 'Q5a–Q5c', count: 3, reason: 'Address-translation diagrams.' },
    ],
    notes: ['Q2.39 is answered (d): two counting semaphores, empty and full; the lecture adds mutex for the buffer.'],
  },
  {
    chapterId: 'chapter-5',
    examId: 'final_nodate',
    totalItems: 74,
    relevantIds: ['Q1.23', 'Q1.24', 'Q1.25', 'Q1.26', 'Q1.27', 'Q2.39'],
    excludedGroups: [
      { ids: 'Q1.1–Q1.18', count: 18, reason: 'Virtual memory and memory management.' },
      { ids: 'Q1.19–Q1.22', count: 4, reason: 'CPU scheduling.' },
      { ids: 'Q1.28–Q1.30', count: 3, reason: 'Direct communication, OS services, dual mode (Chapters 1–3).' },
      { ids: 'Q2.31–Q2.38', count: 8, reason: 'Kernel, termination, schedulers, multiprogramming, PCB, time-sharing, fork/exit, IPC models (Chapters 1–3).' },
      { ids: 'Q2.40–Q2.60', count: 21, reason: 'GUI vs CLI, system boot, CPU scheduling, memory, virtual memory, zero capacity, ready queue.' },
      { ids: 'Q3.61–Q3.70', count: 10, reason: 'Scheduling, paging and page-replacement calculations.' },
      { ids: 'Q4', count: 1, reason: 'System calls, system programs and parameter passing (Chapter 2).' },
      { ids: 'Q5a–Q5c', count: 3, reason: 'Address-translation diagrams.' },
    ],
    notes: [
      'All six items reprint Final 2023 and share its implementations; Q1.25 is printed “… for critical section problem guarantees …”.',
      'The handwritten marks agree with the implemented answers: Q1.23 T, Q1.24 F, Q1.25 T, Q1.26 F, Q1.27 T, Q2.39 d.',
    ],
  },
  {
    chapterId: 'chapter-5',
    examId: 'final_nodate2',
    totalItems: 27,
    relevantIds: ['Q5'],
    excludedGroups: [
      { ids: 'Q1.1–Q1.16', count: 16, reason: 'Fill-in items from Chapters 1–3, CPU scheduling and memory management.' },
      { ids: 'Q2', count: 1, reason: 'Dual-mode operation (Chapter 1).' },
      { ids: 'Q3', count: 1, reason: 'Direct vs indirect communication (Chapter 3).' },
      { ids: 'Q4', count: 1, reason: 'Client–server communication techniques (Chapter 3).' },
      { ids: 'Q6a–Q6d', count: 4, reason: 'CPU-scheduling Gantt charts and metrics.' },
      { ids: 'Q7', count: 1, reason: 'CPU-scheduling evaluation methods.' },
      { ids: 'Q8', count: 1, reason: 'Paging and segmentation properties.' },
      { ids: 'Q9', count: 1, reason: 'Page-replacement ranking.' },
    ],
    notes: ['Q5 (atomic hardware instruction, its code and the three requirements) is implemented as one written answer.'],
  },
  {
    chapterId: 'chapter-5',
    examId: 'final_2020',
    totalItems: 77,
    relevantIds: ['Q1.16', 'Q1.17', 'Q2.31', 'Q2.32', 'Q3.61', 'Q3.62'],
    excludedGroups: [
      { ids: 'Q1.1–Q1.15', count: 15, reason: 'Chapters 1–3 items and CPU scheduling.' },
      { ids: 'Q1.18–Q1.20', count: 3, reason: 'MMU, page tables, FIFO anomaly.' },
      { ids: 'Q2.21–Q2.30', count: 10, reason: 'Command interpreter, uniprogramming, fork, states, stack, PCB, multiprogramming, context switch (Chapters 1–3).' },
      { ids: 'Q2.33–Q2.60', count: 28, reason: 'IPC, RPC, RMI, boot, trap, DMA, layered approach, CPU scheduling, memory management.' },
      { ids: 'Q3.63–Q3.75', count: 13, reason: 'Round-robin, address-bit, partition and page-replacement calculations.' },
      { ids: 'Q4', count: 1, reason: 'Paging and segmentation properties.' },
      { ids: 'Q5', count: 1, reason: 'Alternative page-table structures.' },
    ],
    notes: [
      'Q1.17 (“semaphore … requires busy waiting”) is false: a semaphore is defined as a tool that does not require busy waiting.',
      'Q3.61 and Q3.62 are the semaphore-misuse items reprinted in Final 2024 (Q1.57, Q1.58).',
    ],
  },
  {
    chapterId: 'chapter-5',
    examId: 'midterm_2022',
    totalItems: 20,
    relevantIds: ['Q5.1', 'Q5.2', 'Q5.3', 'Q5.4'],
    excludedGroups: [
      { ids: 'Q1.1–Q1.8', count: 8, reason: 'Chapter 1 and Chapter 3 true/false items.' },
      { ids: 'Q2.1–Q2.4', count: 4, reason: 'Kernel, firmware, multiprocessor types, file-system management (Chapter 1).' },
      { ids: 'Q3.1–Q3.3', count: 3, reason: 'Definitions of OS, process and caching (Chapters 1 and 3).' },
      { ids: 'Q4', count: 1, reason: 'IPC models and direct vs indirect communication (Chapters 2–3).' },
    ],
    notes: ['Q5 names rw_mutex “writeBlock” and read_count “readCount”; each of its four parts is implemented separately.'],
  },
  {
    chapterId: 'chapter-5',
    examId: 'midterm_2021',
    totalItems: 18,
    relevantIds: ['Q1.12', 'Q4'],
    excludedGroups: [
      { ids: 'Q1.1–Q1.11', count: 11, reason: 'Process internals, microkernels, queues, policy, fork, context switch, states, system calls, rendezvous, indirect IPC, program vs process (Chapters 1–3).' },
      { ids: 'Q1.13–Q1.14', count: 2, reason: 'Short-term scheduler and direct communication (Chapter 3).' },
      { ids: 'Q2.1–Q2.2', count: 2, reason: 'Multiprocessor vs multi-core; multiprogramming vs multitasking (Chapter 1).' },
      { ids: 'Q3', count: 1, reason: 'Parameter-passing methods (Chapter 2).' },
    ],
    notes: ['Q1.12 (“concurrent access to shared data may result in ___”) accepts “data inconsistency” and “race condition”.'],
  },
]
