DOCUMENT: 11- Final (No Date).pdf
DOCUMENT TYPE: Scanned Computer Science examination paper
SUBJECT MATTER: Operating Systems
SOURCE FILE: 7 scanned pages, corresponding to original document pages 2 through 8 of 8.

TRANSCRIPTION AND VISUAL-RECONSTRUCTION NOTES
- The content below transcribes the printed examination text and visible handwritten annotations.
- Questions, options, question numbers, mark allocations, and their original ordering have been preserved.
- Handwritten T/F answers and circled options are recorded as markings visible in the scan, not as a verified answer key.
- Where the original scan cuts off text or where a mark is ambiguous, this is stated explicitly rather than silently guessed.
- The document consists of photographed/scanned paper pages, not digitally generated presentation slides.
- Common visual characteristics: slightly skewed pages, white backgrounds, strong black printed text, occasional handwritten blue/black ink, some red-ink corrections, paper folds and shadows near the upper-left corners, dark scan borders, and a "CS CamScanner" logo at the lower-right of each page.
- No actual diagrams or photographs of subject matter appear in these pages. The content is primarily examination text, handwritten selections, and handwritten explanatory answers.

============================================================
SOURCE PAGE 1 OF 7
ORIGINAL DOCUMENT PAGE 2 OF 8
============================================================

VISUAL DESCRIPTION:
A portrait-oriented scanned examination page. The upper-left corner has a triangular shadow/fold and a handwritten Arabic note running diagonally above the printed question area. The note appears to read: "ممنوع الكتابة في هذا المكان" (roughly, "Writing is prohibited in this area"). A long diagonal line runs under/alongside this note. The examination text is bold, mostly black, and arranged in a single column. A dark, slightly irregular vertical line runs near the right edge of the page. The page is skewed slightly. Handwritten T/F marks appear beside statements, mostly in dark ink, with a red mark around statement 6. The printed footer reads "Page 2 of 8". A "CS CamScanner" watermark/logo appears at bottom-right.

PRINTED TEXT:

Attempt ALL Questions:

Q1) Mark each statement with T or F on the Bubble Sheet: [15 Marks]

1. Virtual memory increases the system throughput.
   Handwritten mark: T

2. During MMU address translation, a page fault routine will be executed if the page is a memory resident.
   Handwritten mark: F

3. The operating system executes the page fault routine through a software interrupt.
   Handwritten mark: T

4. During the demand paging the operating system doesn't need to perform a context switch.
   Handwritten mark: F

5. Effective access time is a measure to evaluate the demand paging implementation.
   Handwritten mark: T

6. Zero-fill-on-demand pages have been zeroed out while being allocated thus erasing the previous contents.
   Handwritten mark: Red mark; appears to be F, but the handwriting is not entirely clear.

7. Page replacement algorithms make use of a dirty bit to reduce the overhead of page transfer.
   Handwritten mark: T

8. The frame allocation algorithm determines how many frames to be given for each process.
   Handwritten mark: T

9. LRU page replacement algorithm with a second chance if the page to be replaced has reference bit = 1, it will be left in memory and updated to 0.
   Handwritten mark: T

10. If there are 100 frames and 5 processes, a fixed frame allocation algorithm will allocate 20 frames for each process.
    Handwritten mark: T

11. The thrashing phenomenon occurs when a process has more frames than it needs.
    Handwritten mark: F

12. If the request address is less than the value within the base register, the CPU checks the value against the limit register to grant access.
    Handwritten mark: F

13. External fragmentation could be reduced by using Compaction techniques.
    Handwritten mark: T

14. Mapping of two-dimensional logical addresses of each process into one-dimensional physical addresses is done using a page table.
    Handwritten mark: F

15. STLR register points to the segment table's location in memory.
    Handwritten mark: F

16. Segmentation is a memory-management scheme that supports the user view of memory, while paging is a memory-management scheme that supports the system view of memory.
    Handwritten mark: T

17. TLB is used to solve the double memory access problem in paging-based memory management systems.
    Handwritten mark: T

18. Paging eliminates external fragmentation, while segmentation eliminates internal fragmentation.
    Handwritten mark: T

19. The time it takes for a dispatcher to stop one process and start another one is called dispatcher latency.
    Handwritten mark: T

FOOTER:
Page 2 of 8
CS CamScanner

============================================================
SOURCE PAGE 2 OF 7
ORIGINAL DOCUMENT PAGE 3 OF 8
============================================================

VISUAL DESCRIPTION:
A portrait-oriented scanned paper page with the upper-left corner partially covered by a triangular folded-paper shadow. The topmost line is partly obscured/cropped, so the beginning of statement 20 is not completely visible. Statements 20–30 continue the true/false section. The multiple-choice section begins around the middle of the page. Several answer options in questions 31–35 are circled or outlined in dark ink. The final question on this page, question 36, has only its first option visible; the remaining options continue on the next page. The footer reads "Page 3 of 8". A "CS CamScanner" watermark/logo appears at bottom-right.

CONTINUATION OF Q1:

20. [The question number and the beginning of the line are partly obscured by the folded/cropped top-left area.] SJF is the optimal CPU scheduling algorithm for minimizing the average waiting time.
    Handwritten mark: T

21. FCFS CPU scheduling is the same as RR with Infinite quantum.
    Handwritten mark: T

22. Multilevel queue CPU scheduling algorithm cannot suffer from starvation.
    Handwritten mark: F

23. Within the context of the critical section problem, each process must ask permission to enter the critical section in the entry section.
    Handwritten mark: T

24. The solution to the critical section problem should satisfy only bounded waiting.
    Handwritten mark: F

25. Peterson Algorithms for critical section problem guarantees mutual exclusion, progress, and bounded waiting.
    Handwritten mark: T

26. The compare and swap hardware instructions could be interruptible.
    Handwritten mark: F

27. Incorrect use of semaphore operations might lead to deadlock.
    Handwritten mark: T

28. With direct Inter-process communication, the messages are sent to and received from mailboxes, or ports.
    Handwritten mark: F

29. Program execution and resource allocation are examples of operating-system services that provide functions that are helpful to the user.
    Handwritten mark: F

30. To prevent user programs from interfering with the proper operation of the system, the hardware has three modes: user mode, system mode, and kernel mode.
    Handwritten mark: F

Q2) Select an appropriate choice for each of the following sentences on the Bubble Sheet: [15 Marks]

31. Which one of the following is not true?

    a. The kernel is the program that constitutes the central core of the operating system.

    b. The kernel is the first part of the operating system to load into memory during booting.

    c. The kernel is made of various modules which cannot be loaded into the running operating system.

    d. The kernel remains in the memory during the entire computer session.

    Hand-marked selection: c, circled.

32. A process can be terminated due to ______

    a. normal exit

    b. fatal error

    c. killed by another process

    d. all of the mentioned

    Hand-marked selection: d, circled.

33. The primary distinction between the short-term scheduler and the long-term scheduler is ______

    a. The length of their queues

    b. The type of processes they schedule

    c. The frequency of their execution

    d. None of the mentioned

    Hand-marked selection: c, circled.

34. In a multiprogramming environment ______

    a. the processor executes more than one process at a time

    b. the programs are developed by more than one person

    c. more than one process resides in the memory

    d. a single user can execute many programs at the same time

    Hand-marked selection: c, circled.

35. What is the purpose of a process control block (PCB)?

    a. To control the execution of a process by issuing commands to the CPU, memory, and I/O devices.

    b. To allocate and deallocate the resources needed by a process, such as memory, CPU time, and I/O devices.

    c. To store the information about the process state, program counter, CPU registers, and other attributes of a process.

    d. To communicate with other processes by sending and receiving messages.

    Hand-marked selection: c, circled.

36. What is the difference between multiprogramming and time-sharing?

    a. Multiprogramming allows multiple processes to run concurrently on a single CPU, while time-sharing allows multiple users to share a single CPU.

    [Options b, c, and d continue on the next scanned page.]

FOOTER:
Page 3 of 8
CS CamScanner

============================================================
SOURCE PAGE 3 OF 7
ORIGINAL DOCUMENT PAGE 4 OF 8
============================================================

VISUAL DESCRIPTION:
A portrait-oriented scanned page continuing the multiple-choice questions. A triangular fold/shadow covers part of the upper-left corner. The printed question text is dark and bold, and the page is slightly tilted. Questions 36–44 are visible, with question 36 continuing from the previous page. Several selected options have hand-drawn elliptical outlines. The outline around option b in question 36 is prominent. The selected answer to question 43 is outlined across two lines. The selected answer to question 44 has a long hand-drawn oval extending across much of the page width. The footer reads "Page 4 of 8". A "CS CamScanner" watermark/logo appears at bottom-right.

Q36) What is the difference between multiprogramming and time-sharing? (continued)

    b. Multiprogramming allows multiple processes to run concurrently on a single CPU by switching among them, while time-sharing allows multiple users to share a single CPU by using a timer interrupt.

    c. Multiprogramming allows multiple processes to run concurrently on multiple CPUs, while time-sharing allows multiple processes to run concurrently on a single CPU.

    d. Multiprogramming allows multiple processes to share a single CPU by using timer interrupt, while time-sharing allows multiple processes to run concurrently on a single CPU by switching among them.

    Hand-marked selection: b, circled.

37. What are the system calls used to create and terminate a process in UNIX?

    a. creat() and terminate()

    b. fork() and exit()

    c. spawn() and kill()

    d. exec() and wait()

    Hand-marked selection: b, circled.

38. What are the two models of Interprocess communication (IPC)?

    a. Shared memory and message passing

    b. Message queue and pipe

    c. Semaphore and mutex

    d. Signal and socket

    Hand-marked selection: a, circled.

39. How can a semaphore be used to solve the producer-consumer problem?

    a. By using two semaphores: one to lock the buffer when the producer is writing, and one to lock the buffer when the consumer is reading.

    b. By using one semaphore to count the number of items in the buffer, and to block the producer or the consumer when the buffer is full or empty.

    c. By using one semaphore: to signal the producer or the consumer when the buffer is ready for writing or reading.

    d. By using two semaphores: one to count the number of empty buffers, and one to count the number of full buffers.

    Hand-marked selection: d, circled.

40. Which of the following is an advantage of using a graphical user interface (GUI) over a command-line interface (CLI)?

    a. A GUI is more portable and compatible than a CLI.

    b. A GUI is more efficient and faster than a CLI.

    c. A GUI is more intuitive and user-friendly than a CLI.

    d. A GUI is more powerful and flexible than a CLI.

    Hand-marked selection: c, circled.

41. Which of the following is a process that loads the operating system into the main memory and starts its execution?

    a. System boot

    b. System generation

    c. System initialization

    d. System termination

    Hand-marked selection: a, circled.

42. What is the main objective of CPU scheduling?

    a. To minimize CPU utilization

    b. To maximize turnaround time

    c. To balance the load among different processes

    d. To allocate CPU time according to some criteria

    Hand-marked selection: d, circled.

43. What is the disadvantage of using the first-come, first-served (FCFS) scheduling algorithm?

    a. It may cause starvation, where low-priority processes never get the CPU.

    b. It may cause the convoy effect, where short processes wait behind long processes.

    c. It may cause thrashing, where processes switch between ready and waiting states frequently.

    d. All of the above

    Hand-marked selection: b, circled.

44. What is one reason to use a multilevel queue over a single queue for CPU scheduling?

    a. It allows processes to be grouped by priority, memory size, or other attributes.

    [Options b, c, and d continue on the next scanned page.]

    Hand-marked selection: a, circled.

FOOTER:
Page 4 of 8
CS CamScanner

============================================================
SOURCE PAGE 4 OF 7
ORIGINAL DOCUMENT PAGE 5 OF 8
============================================================

VISUAL DESCRIPTION:
A portrait scan continuing question 44 at the top and then showing questions 45–52. The upper-left corner has a prominent triangular shadow/fold. A dark irregular vertical line follows the right page edge. Many answer options are outlined with dark pen. Question 46 has option a circled in dark ink and a separate red circle around the label d. In question 50, one large rectangular hand-drawn outline encloses both options b and c, which appear to contain the same or nearly identical wording. This indicates an ambiguous marking rather than a clearly isolated single answer. The footer reads "Page 5 of 8". A "CS CamScanner" watermark/logo appears at bottom-right.

Q44) What is one reason to use a multilevel queue over a single queue for CPU scheduling? (continued)

    b. It allows processes to move between queues based on their changing characteristics.

    c. It allows processes to have different time quanta for round-robin scheduling.

    d. It allows different scheduling algorithms to be used for different queues.

45. What is one challenge of scheduling processes in a multiprocessor system?

    a. Load balancing

    b. Processor affinity

    c. Cache coherence

    d. Synchronization

    Hand-marked selection: a, circled.

46. What is the difference between preemptive and non-preemptive scheduling?

    a. Preemptive scheduling allows a process to be interrupted by the scheduler, while non-preemptive scheduling does not.

    b. Preemptive scheduling requires a timer interrupt, while non-preemptive scheduling does not.

    c. Preemptive scheduling is more responsive, while non-preemptive scheduling is more predictable.

    d. All of the above

    Hand-marked selection: a is circled in dark ink. The label d also has a separate red circle around it.

47. What is the difference between logical address and physical address?

    a. Logical address is generated by the CPU, physical address is computed by the MMU.

    b. Logical address is computed by the MMU, physical address is generated by the CPU.

    c. Logical address is the address of a byte in memory, physical address is the address of a word in memory.

    d. Logical address is the address of a word in memory, physical address is the address of a byte in memory.

    Hand-marked selection: a, circled.

48. What is the benefit of dynamic loading?

    a. It allows a program to be larger than the size of physical memory.

    b. It allows a program to be executed without being completely loaded in memory.

    c. It avoids internal fragmentation.

    d. Both A and B

    Hand-marked selection: b, circled.

49. What is the disadvantage of contiguous memory allocation?

    a. It causes internal fragmentation.

    b. It causes external fragmentation.

    c. It allows a program to be larger than the size of physical memory.

    d. All of the mentioned

    Hand-marked selection: b, circled.

50. What is the difference between global and local page replacement policies?

    a. Global policy selects a victim frame from the set of frames allocated to the process that caused the page fault, local policy selects a victim frame from the set of all frames.

    b. Global policy selects a victim frame from the set of all frames, local policy selects a victim frame from the set of frames allocated to the process that caused the page fault.

    c. Global policy selects a victim frame from the set of all frames, local policy selects a victim frame from the set of frames allocated to the process that caused the page fault.

    d. Global policy selects a victim frame based on the local page reference string, local policy selects a victim frame based on the global page reference string.

    Hand-marking: a large rectangular outline encloses both options b and c. The printed text of b and c appears duplicated or nearly identical in the scan.

51. What is the purpose of a translation look-aside buffer (TLB)?

    a. It caches the translations of physical addresses to logical addresses.

    b. It caches the translations of segment numbers to page numbers.

    c. It caches the translations of logical addresses to physical addresses.

    d. It caches the translations of page numbers to segment numbers.

    Hand-marked selection: c, circled.

52. What is the difference between thrashing and swapping?

    [The four answer options continue on the next scanned page.]

FOOTER:
Page 5 of 8
CS CamScanner

============================================================
SOURCE PAGE 5 OF 7
ORIGINAL DOCUMENT PAGE 6 OF 8
============================================================

VISUAL DESCRIPTION:
A portrait scan whose top begins with the four answer options for question 52, continued from the previous page. The upper-left corner contains a broad triangular shadow/fold. Questions 52–60 occupy most of the page. Several selected options are circled with dark pen, with a few long ovals extending around an entire option. There is a prominent horizontal/curved pen outline around the selected answer to question 58. The right page edge is outlined by a dark vertical scan artifact. The footer reads "Page 6 of 8". The "CS CamScanner" logo appears at bottom-right.

Q52) What is the difference between thrashing and swapping? (continued)

    a. Thrashing is the process of moving a process from memory to disk, and swapping is the process of moving a process from disk to memory.

    b. Thrashing is the process of moving a process from disk to memory, and swapping is the process of moving a process from memory to disk.

    c. Thrashing is the phenomenon of excessive page faults due to insufficient memory, and swapping is the technique of moving processes in and out of memory to increase multiprogramming level.

    d. Thrashing is the technique of moving processes in and out of memory to increase multiprogramming level, and swapping is the phenomenon of excessive page faults due to insufficient memory.

    Hand-marked selection: c, circled.

53. What is the main advantage of virtual memory over contiguous memory allocation?

    a. It reduces external fragmentation.

    b. It reduces internal fragmentation.

    c. It allows programs to be larger than physical memory.

    d. It simplifies memory management.

    Hand-marked selection: c, circled.

54. What is the difference between a valid bit and a dirty bit in a page table entry?

    a. Valid bit indicates whether the page is writable or not, dirty bit indicates whether the page is accessible or not.

    b. Valid bit indicates whether the page is accessible or not, dirty bit indicates whether the page is writable or not.

    c. Valid bit indicates whether the page has been modified or not, dirty bit indicates whether the page is in memory or not.

    d. Valid bit indicates whether the page is in memory or not, dirty bit indicates whether the page has been modified or not.

    Hand-marked selection: d, circled.

55. What is the basic idea of demand paging?

    a. To replace a page that is no longer needed by the process.

    b. To bring a page into memory only when it is needed by the process.

    c. To allocate a fixed number of pages to each process.

    d. To divide the virtual address space into equal-sized pages.

    Hand-marked selection: b, circled.

56. Which of the following page-replacement algorithms suffers from Belady's anomaly?

    a. LRU (Least Recently Used)

    b. LFU (Least Frequently Used)

    c. OPT (Optimal)

    d. FIFO (First-In, First-Out)

    Hand-marked selection: d, circled.

57. What is the working set of a process?

    a. The set of pages that the process is currently using.

    b. The set of pages that the process will use in the future.

    c. The set of pages that the process has used in the past.

    d. The set of pages that the process may use at some point.

    Hand-marked selection: a, circled.

58. Which of the following statements is correct regarding internal fragmentation?

    a. Internal fragmentation occurs when a process is allocated less memory than it needs.

    b. Internal fragmentation occurs when a process is allocated more memory than it needs.

    c. Internal fragmentation occurs when there is enough total memory, but it is not contiguous.

    d. None of the above

    Hand-marked selection: b, circled with a long pen outline.

59. In the Zero capacity queue ______

    a. the queue can store at least one message.

    b. the sender blocks until the receiver receives the message.

    c. the sender keeps sending and the messages don't wait in the queue.

    d. None of the mentioned

    Hand-marked selection: b, circled.

60. A process is selected from the ______ queue by the ______ scheduler, to be executed.

    a. blocked, short term

    b. wait, long term

    c. ready, short term

    d. ready, long term

    Hand-marked selection: c, circled.

FOOTER:
Page 6 of 8
CS CamScanner

============================================================
SOURCE PAGE 6 OF 7
ORIGINAL DOCUMENT PAGE 7 OF 8
============================================================

VISUAL DESCRIPTION:
A portrait-oriented scan. The top section begins with a partially cropped heading for a multiple-choice calculation section. The visible wording includes "an appropriate result for each of the following problems on the Bubble Sheet:" and "[15 Marks]". Below it is a printed table of processes and their arrival time, burst time, and priority. Questions 61–70 follow. Numerous numerical options are circled, mostly in dark pen. Question 63 includes a handwritten correction/note to the right and a dark scribbled-out area. Question 69 has both a red circle around option c and a dark circle around option d, so the scan contains conflicting markings for that item. The bottom portion contains a written question about system calls and system programs, with two handwritten explanations in blue/dark ink. The footer reads "Page 7 of 8". The "CS CamScanner" watermark/logo appears at bottom-right.

Q3) [The beginning of this heading is partly cropped in the scan.] Select an appropriate result for each of the following problems on the Bubble Sheet: [15 Marks]

Consider the following set of processes:

Process | Arrival Time | Burst Time | Priority
P1      | 0            | 5          | 2
P2      | 1            | 3          | 1
P3      | 2            | 8          | 4
P4      | 3            | 6          | 3

61. What is the average waiting time for the process set if the first-come, first-served (FCFS) scheduling algorithm is used?

    a. 5.75

    b. 6.75

    c. 7.25

    d. 8.25

    Hand-marked selection: a. 5.75, circled.

62. What is the average waiting time for the process set if the preemptive shortest-job-first (SJF) scheduling algorithm is used?

    a. 3

    b. 4

    c. 5

    d. 6

    Hand-marked selection: c. 5, circled.

63. What is the average waiting time for the process set if the round-robin (RR) scheduling algorithm is used with a time quantum of 2?

    a. 5.25

    b. 6.75

    c. 8.25

    d. 10.25

    Hand-marked selection: d. 10.25, circled. A dark scribbled area appears nearby. A handwritten note to the right says approximately: "9.75 is the correct answer."

64. What is the average waiting time for the process set if the nonpreemptive priority scheduling algorithm is used given that (a lower value means a higher priority)?

    a. 5.25

    b. 6.75

    c. 7.5

    d. 8.25

    Hand-marked selection: a. 5.25, circled.

Consider a system applying paging memory allocation such that the physical memory size is 64 KB partitioned into 16 frames:

65. What is the size of each page in that system?

    a. 1 KB

    b. 2 KB

    c. 4 KB

    d. 8 KB

    Hand-marked selection: c. 4 KB, circled.

66. How many bits are there for the offset in any logical address?

    a. 9 bits

    b. 12 bits

    c. 14 bits

    d. 16 bits

    Hand-marked selection: b. 12 bits, circled.

67. What is the maximum number of pages any process can take in that system (assuming the kernel size is 12 KB)?

    a. 9 Pages

    b. 10 Pages

    c. 12 Pages

    d. 13 Pages

    Hand-marked selection: d. 13 Pages, circled.

Given the reference string 7,0,1,2,0,3,0,4,2,3,0,3,2,1,2,0,1,7,0,1 with 3 frames:

68. LRU page replacement algorithm will result in ______ page faults.

    a. 6

    b. 9

    c. 12

    d. 15

    Hand-marked selection: c. 12, circled.

69. FIFO page replacement algorithm will result in ______ page replacements.

    a. 6

    b. 9

    c. 12

    d. 15

    Handwritten marks: option c has a red circle around its label; option d. 15 also has a dark circle around it. Both markings are visible, so the selected answer is ambiguous.

70. Optimal page replacement algorithm will result in ______ page faults.

    a. 6

    b. 9

    c. 12

    d. 15

    Hand-marked selection: b. 9, circled.

Q4) What is the purpose of system calls? What is the purpose of system programs? Describe the three methods for passing parameters needed by system calls. [6 Marks]

HANDWRITTEN RESPONSE, FIRST PART:

"System Calls -> provides a programming interface for services offered by OS"

HANDWRITTEN RESPONSE, SECOND PART:

"System programs -> provide a convenient environment for program development and execution"

The handwritten explanation continues underneath:

"(think of it as bundles of system calls so that user doesn't need to write everything from scratch to solve his/her problem)"

Note: The handwritten text is reproduced as closely as possible; punctuation and capitalization may differ slightly from the handwriting.

FOOTER:
Page 7 of 8
CS CamScanner

============================================================
SOURCE PAGE 7 OF 7
ORIGINAL DOCUMENT PAGE 8 OF 8
============================================================

VISUAL DESCRIPTION:
A portrait-oriented scanned paper page with considerable blank white space. At the top, handwritten numbered points continue the answer to Q4. The handwritten text is dark blue/black and occupies only the upper portion of the page. In the middle of the page, the printed Q5 prompt asks for diagrams of logical-to-physical address translation in three memory-allocation cases. No diagrams are drawn beneath the prompt. A small handwritten boxed note below the question says "Solved in Final 2024". The lower-right area contains the printed closing phrase "With Our Best Wishes". A dark vertical scan-edge line is visible at the right, and the scan is slightly tilted. The footer reads "Page 8 of 8". The "CS CamScanner" watermark/logo appears at bottom-right.

HANDWRITTEN CONTINUATION OF Q4:
Three methods for passing parameters needed by system calls:

1. Passing parameters in registers.

2. Putting parameters in block/table and passing the address in register.

3. Pushing parameters into stack and popping out by OS.

PRINTED QUESTION:

Q5) Illustrate by drawing only the process of logical to physical address translation in the case of: [9 Marks]

    a. Contiguous Allocation

    b. Paging

    c. Segmentation

HANDWRITTEN NOTE:
A boxed handwritten annotation underneath the question reads: "Solved in Final 2024".

The area below the question is otherwise blank; no diagrams are present in the scan.

CLOSING TEXT:
With Our Best Wishes

FOOTER:
Page 8 of 8
CS CamScanner

============================================================
END OF TRANSCRIPTION
============================================================

IMPORTANT LIMITATIONS:
1. The uploaded PDF starts at original page 2, so original page 1 is missing.
2. The first statement on the second scanned page (original page 3) is partially obscured by the folded scan edge. It is transcribed as the visible SJF statement, but its question number and beginning are not entirely visible.
3. Some handwritten marks, especially the red T/F mark on question 6 and the conflicting marks on question 69, are not fully unambiguous.
4. The source paper contains handwritten answers and corrections; these are transcribed as markings actually seen in the image and are not independently verified for correctness.