FILE: 9- Midterm 2022.pdf
TITLE: 2022_OS_midterm
SUBJECT: Operating Systems
PAGES: 2

PAGE 1

Visual layout: Centered title "2022_OS_midterm". Three sections arranged vertically: True/False, fill-in-the-blanks, and definitions. The definition terms have large blank spaces beneath them for handwritten answers. No diagrams, images, or handwritten answers.

Q1) True or False?

1. An Operating system is considered an Interrupt Driven System.
2. Switching from User mode to kernel mode is a non-privileged instruction.
3. In the asynchronous I/O method, the OS returns the control to the user program before the request is completed.
4. Multiprocessor architecture increases the overall system throughput and decreases the system reliability.
5. Virtual memory allows the execution of processes that are stored completely in memory.
6. The multi-threaded process has one program counter for all its threads.
7. Creating and deleting both user and system processes are considered one.
8. The ready process state describes the process that is being waited for some events to occur.

Q2) Complete the following statements:

1. The one program running at all times on the computer is called _______.
2. _______ is a piece of software that is stored in EPROM and is loaded when a computer is powered up or rebooted.
3. _______ and _______ multiprocessing are the two types of multiprocessor systems.
4. Mapping files onto secondary storage is one of the activities of the _______ component of the OS.

Q3) Briefly Define each of the following terms:

- Operating System

- Process

- Caching


PAGE 2

Visual layout: Q4 appears near the top, followed by a large blank answer area. Q5 appears around the middle of the page, with shared-variable declarations and four numbered subquestions. Large blank spaces are provided for answers. No diagrams, images, or handwritten answers.

Q4) Briefly explain the fundamental models of interprocess communication and the difference between direct and indirect communication.

Q5) Regarding the Readers-Writers Problem:

The following variables are shared among all processes:

int readCount;
FILE *sharedFile;
semaphore mutex, writeBlock;

1. How should the shared variable readCount, and the semaphores mutex and writeBlock be initialized so that the system would work properly?

2. Suppose that when a writer is updating, three new readers have arrived and they are the only reader processes at that time. Show where the readers are blocked.

3. Suppose that some readers are reading, explain what happens to a newly arrived writer.

4. Are writers subject to starvation in this solution? Justify your answer.

END OF DOCUMENT