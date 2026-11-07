CHAPTER 3: PROCESSES — FULL PDF TEXT TRANSCRIPTION
Source: Chapter 3 - Processes.pdf (51 PDF pages).
Extraction note: Text is transcribed in PDF page order. Image-only diagrams are described where present; two image-only code examples are manually transcribed from the slide images. Minor layout/line wrapping from the PDF is retained where practical.
RECURRING VISUAL TEMPLATE: Most content slides use a white background, a large blue title with a horizontal blue rule, a narrow blue vertical band at the left, brown square bullets with orange sub-bullets, a small dinosaur at the upper left, a dinosaur at the lower right, and a footer with ‘Operating System Concepts – 9th Edition’, ‘Silberschatz, Galvin and Gagne ©2013’, the book slide number, and ‘Modified By Dr. Khaled Wassif’.

========================
PDF PAGE 1 OF 51
========================
Chapter 3: Processes




Operating System Concepts – 9th Edit9on   Silberschatz, Galvin and Gagne ©2013

IMAGE DESCRIPTION: Cover slide. White background; centered blue title ‘Chapter 3: Processes’ above a thick blue horizontal line. Below it is a framed color illustration of a dinosaur. The standard footer names Operating System Concepts, 9th Edition and Silberschatz, Galvin and Gagne ©2013.

========================
PDF PAGE 2 OF 51
========================
Chapter 3: Processes
          Process Concept

          Process Scheduling

          Operations on Processes

          Interprocess Communication (IPC)
                  Examples of IPC Systems

                  Communication in Client-Server Systems



Operating System Concepts – 9th Edition
Silberschatz, Galvin and Gagne ©2013      3.2    Modified By Dr. Khaled Wassif

========================
PDF PAGE 3 OF 51
========================
Objectives
       To introduce the notion of a process -- a
           program in execution, which forms the basis of
           all computation

       To describe the various features of processes,
           including scheduling, creation and termination,
           and communication

       To explore interprocess communication using
           shared memory and message passing

       To describe communication in client-server
           systems
Operating System Concepts – 9th Edition
Silberschatz, Galvin and Gagne ©2013          3.3      Modified By Dr. Khaled Wassif

========================
PDF PAGE 4 OF 51
========================
Process Concept
        An operating system executes a variety of
            programs:
               Batch system – jobs
               Time-shared systems – user programs or tasks

        Textbook uses the terms job and process
            almost interchangeably
        Program is passive entity stored on disk
            (executable file), process is active
               Program     becomes process when executable file
                  loaded into memory
        Execution of program started via GUI mouse
            clicks, command line entry of its name, etc
Operating System Concepts – 9th Edition
Silberschatz, Galvin and Gagne ©2013      3.4        Modified By Dr. Khaled Wassif

========================
PDF PAGE 5 OF 51
========================
Process Concept
      One program can be several processes
        Consider multiple users executing the same program
      Process – a program in execution; process
       execution must progress in sequential fashion
      Process includes multiple parts
             The program code, also called text section
             Current activity involving program counter, processor
              registers
             Stack containing temporary data
                   Function parameters, return addresses, local variables

             Data section containing global variables
             Heap containing memory dynamically allocated during
                 run time
Operating System Concepts – 9th Edition
Silberschatz, Galvin and Gagne ©2013       3.5                    Modified By Dr. Khaled Wassif

========================
PDF PAGE 6 OF 51
========================
Process in Memory




Operating System Concepts – 9th Edition
Silberschatz, Galvin and Gagne ©2013      3.6      Modified By Dr. Khaled Wassif

IMAGE DESCRIPTION: A vertical process-memory layout, with address labels ‘max’ at the top and ‘0’ at the bottom. From top downward are stack, a large free/gap area labeled heap (with an arrow indicating heap growth upward), data, and text. The stack has an arrow showing growth downward. The figure separates the stack, heap, global data, and program code within a process address space.

========================
PDF PAGE 7 OF 51
========================
Process State
       As a process executes, it changes state
              new: The process is being created

              running: Instructions are being executed

              waiting: The process is waiting for some event
                 to occur
              ready: The process is waiting to be assigned to
                 a processor
              terminated: The process has finished execution



Operating System Concepts – 9th Edition
Silberschatz, Galvin and Gagne ©2013           3.7        Modified By Dr. Khaled Wassif

========================
PDF PAGE 8 OF 51
========================
Diagram of Process State




Operating System Concepts – 9th Edition
Silberschatz, Galvin and Gagne ©2013      3.8   Modified By Dr. Khaled Wassif

IMAGE DESCRIPTION: Process-state transition diagram made of oval nodes: new, ready, running, waiting, and terminated. ‘admitted’ leads from new to ready; ‘scheduler dispatch’ leads ready to running; an ‘interrupt’ returns running to ready; ‘I/O or event wait’ leads running to waiting; ‘I/O or event completion’ returns waiting to ready; and ‘exit’ leads running to terminated.

========================
PDF PAGE 9 OF 51
========================
Process Control Block (PCB)
        Information associated with each process
           Process state – running, waiting, etc
           Program counter – location of instruction to next
            execute
           CPU registers – contents of all process-centric
            registers
           CPU scheduling information – priorities, scheduling
            queue pointers
           Memory-management information – memory
            allocated to the process
           Accounting information – CPU used, clock time
            elapsed since start, time limits
           I/O status information – I/O devices allocated to
            process, list of open files
Operating System Concepts – 9th Edition
Silberschatz, Galvin and Gagne ©2013      3.9      Modified By Dr. Khaled Wassif

========================
PDF PAGE 10 OF 51
========================
Process Control Block (PCB)




Operating System Concepts – 9th Edition
Silberschatz, Galvin and Gagne ©2013      3.10   Modified By Dr. Khaled Wassif

IMAGE DESCRIPTION: Vertical Process Control Block (PCB) structure drawn as stacked rectangular fields labeled process state, process number, program counter, registers, memory limits, list of open files, and an ellipsis for additional fields. Upper fields are gray; registers and lower entries are blue-shaded.

========================
PDF PAGE 11 OF 51
========================
CPU Switch From Process to Process




Operating System Concepts – 9th Edition
Silberschatz, Galvin and Gagne ©2013      3.11   Modified By Dr. Khaled Wassif

IMAGE DESCRIPTION: Timeline/swimlane diagram for a CPU switch between process P0 and process P1, with the operating system in the middle. The timeline shows P0 executing, an interrupt or system call entering the OS, saving P0’s state into PCB0, reloading P1’s state from PCB1, and then P1 executing. The vertical timeline indicates transitions among execution, OS handling, and idle periods.

========================
PDF PAGE 12 OF 51
========================
Process Scheduling
       Maximize CPU use, quickly switch processes
           onto CPU for time sharing
       Process scheduler selects among available
           processes for next execution on CPU
       Maintains scheduling queues of processes
              Job queue – set of all processes in the system

              Ready queue – set of all processes residing in main
                  memory, ready and waiting to execute
              Device queues – set of processes waiting for an I/O
                  device
       Processes migrate among the various queues
Operating System Concepts – 9th Edition
Silberschatz, Galvin and Gagne ©2013      3.14           Modified By Dr. Khaled Wassif

========================
PDF PAGE 13 OF 51
========================
Ready Queue and Various
                                     I/O Device Queues




Operating System Concepts – 9th Edition
Silberschatz, Galvin and Gagne ©2013      3.15        Modified By Dr. Khaled Wassif

IMAGE DESCRIPTION: Queue diagram showing a ready queue with head/tail pointers and several PCBs, plus separate I/O queues for devices such as a message/keyboard/mouse/disk/terminal. Each queue links to process-control blocks containing register/state information. Arrows show processes moving between queues and device-related waiting states.

========================
PDF PAGE 14 OF 51
========================
Representation of Process Scheduling
     Queuing diagram represents queues, resources, flows




Operating System Concepts – 9th Edition
Silberschatz, Galvin and Gagne ©2013      3.16   Modified By Dr. Khaled Wassif

IMAGE DESCRIPTION: Process-scheduling queuing diagram. The ready queue feeds the CPU. The CPU may send a process to an I/O queue after an I/O request, or send it back to the ready queue when a time slice expires. I/O completion/interrupts return waiting work to the ready queue. The graphic is a flow chart of queues, CPU/device resources, and process movement.

========================
PDF PAGE 15 OF 51
========================
Schedulers
       Long-term scheduler         (or job scheduler) –
            selects which processes should be brought into
            the ready queue

       Short-term scheduler (or CPU scheduler) –
            selects which process should be executed next
            and allocates CPU
               Sometimes the only scheduler in a system

       The long-term scheduler controls the degree of
            multiprogramming

Operating System Concepts – 9th Edition
Silberschatz, Galvin and Gagne ©2013          3.17     Modified By Dr. Khaled Wassif

========================
PDF PAGE 16 OF 51
========================
Schedulers
       Short-term scheduler is invoked very frequently
            (milliseconds)  (must be fast)
       Long-term scheduler is invoked very infrequently
            (seconds, minutes)  (may be slow)
       Processes can be described as either:
               I/O-bound   process – spends more time doing I/O
                  than computations, many short CPU bursts
               CPU-bound      process – spends more time doing
                  computations; few very long CPU bursts
       Long-term scheduler strives for good process mix

Operating System Concepts – 9th Edition
Silberschatz, Galvin and Gagne ©2013          3.18     Modified By Dr. Khaled Wassif

========================
PDF PAGE 17 OF 51
========================
Addition of Medium Term Scheduling
    Medium-term scheduler can be added if degree
         of multiple programming needs to decrease
            Remove process from memory, store on disk, bring
               back in from disk to continue execution: swapping




Operating System Concepts – 9th Edition
Silberschatz, Galvin and Gagne ©2013      3.19         Modified By Dr. Khaled Wassif

IMAGE DESCRIPTION: Medium-term scheduling/swapping diagram. A partially executed process can be swapped out to disk and later swapped back in. The ready queue feeds the CPU; an I/O request may send a process to an I/O waiting queue and I/O device. Arrows connect the swapped-out process, ready queue, CPU, and I/O path to illustrate changing the degree of multiprogramming.

========================
PDF PAGE 18 OF 51
========================
Context Switch
        When CPU switches to another process, the
             system must save the state of the old process
             and load the saved state for the new process
             via a context switch
                Context of a process represented in the PCB

        Context-switch time is overhead; the system
             does no useful work while switching
                The more complex the OS and the PCB

                                    => longer the context switch

        Time dependent on hardware support
Operating System Concepts – 9th Edition
Silberschatz, Galvin and Gagne ©2013             3.21              Modified By Dr. Khaled Wassif

========================
PDF PAGE 19 OF 51
========================
Operations on Processes
       System must provide mechanisms for process
           creation, termination, and so on as detailed next




Operating System Concepts – 9th Edition
Silberschatz, Galvin and Gagne ©2013      3.22   Modified By Dr. Khaled Wassif

IMAGE DESCRIPTION: A screenshot of the Google Chrome browser with several tabs open, including Wiley/Operating System, BBC homepage, The New York Times, and Google Chrome. Arrows point to the separate tabs and the caption says ‘Each tab represents a separate process’. It illustrates processes used to isolate browser tabs.

========================
PDF PAGE 20 OF 51
========================
Process Creation
        Parent process create children processes,
            which, in turn create other processes, forming
            a tree of processes
               Generally, process identified and managed via a
                  process identifier (pid)
        Resource sharing options
               Parent and children share all resources
               Children share subset of parent’s resources
               Parent and child share no resources

        Execution options
               Parent and children execute concurrently
               Parent waits until all or some children terminate
Operating System Concepts – 9th Edition
Silberschatz, Galvin and Gagne ©2013      3.23            Modified By Dr. Khaled Wassif

========================
PDF PAGE 21 OF 51
========================
A Tree of Processes in Linux
                                                                        init
                                                                      pid = 1




                                             login                    kthreadd                    sshd
                                          pid = 8415                   pid = 2                 pid = 3028




                                bash                        khelper               pdflush                  sshd
                             pid = 8416                     pid = 6              pid = 200              pid = 3610




                                                  emacs                                                   tcsch
             ps
                                               pid = 9204                                              pid = 4005
         pid = 9298




Operating System Concepts – 9th Edition
Silberschatz, Galvin and Gagne ©2013                         3.24                            Modified By Dr. Khaled Wassif

IMAGE DESCRIPTION: A tree of Linux processes. The root is init, pid = 1. Its visible children include login (pid = 8415), kthreadd (pid = 2), and sshd (pid = 3028). Branches descend to bash (pid = 8416), khelper (pid = 6), pdflush (pid = 200), sshd (pid = 3610), and further processes such as emacs (pid = 9204), tcsch (pid = 4005), and ps (pid = 9298). Parent-child connections illustrate the process hierarchy.

========================
PDF PAGE 22 OF 51
========================
Process Creation (Cont.)
        Address space
               Child duplicate of parent program
               Child has a program loaded into it

        UNIX examples
          fork() system call creates new process
               exec() system call used after a fork() to replace
                  the process’ memory space with a new program




Operating System Concepts – 9th Edition
Silberschatz, Galvin and Gagne ©2013      3.25        Modified By Dr. Khaled Wassif

IMAGE DESCRIPTION: Process-creation flow diagram. A parent calls fork(); execution splits into parent and child branches. The child can call exec() to load a different program and then exit; the parent calls wait(), pauses until the child finishes, and then resumes.

========================
PDF PAGE 23 OF 51
========================
C Program Forking Separate Process




Operating System Concepts – 9th Edition
Silberschatz, Galvin and Gagne ©2013      3.26   Modified By Dr. Khaled Wassif

IMAGE DESCRIPTION AND IMAGE-ONLY CODE TRANSCRIPTION: The slide shows a C program titled ‘C Program Forking Separate Process’. Red outlines emphasize fork(), execlp(), and wait(). The code visible in the image is transcribed below; the original slide uses old UNIX/POSIX headers and APIs.

#include <sys/types.h>
#include <stdio.h>
#include <unistd.h>

int main()
{
    pid_t pid;

    /* fork a child process */
    pid = fork();

    if (pid < 0) { /* error occurred */
        fprintf(stderr, "Fork Failed");
        return 1;
    }
    else if (pid == 0) { /* child process */
        execlp("/bin/ls", "ls", NULL);
    }
    else { /* parent process */
        /* parent will wait for the child to complete */
        wait(NULL);
        printf("Child Complete");
    }

    return 0;
}

========================
PDF PAGE 24 OF 51
========================
Process Termination
      Process executes last statement and asks the
          operating system to delete it (exit())
             Child process return its status to parent (via wait())
             Process’ resources are deallocated by the operating
                system
      Parent may terminate execution of its children
          processes (abort()) for a variety of reasons:
             Child has exceeded allocated resources
             Task assigned to child is no longer required
             If parent is exiting
                   Some operating systems do not allow child to continue if its
                      parent terminates
                   All children must also terminated - cascading termination

Operating System Concepts – 9th Edition
Silberschatz, Galvin and Gagne ©2013       3.28                   Modified By Dr. Khaled Wassif

========================
PDF PAGE 25 OF 51
========================
Interprocess Communication
        Processes within a system may be independent
         or cooperating
        Cooperating process can affect or be affected by
         other processes, including sharing data
               Reasons for cooperating processes:
                  Information sharing
                  Computation speedup
                  Modularity
                  Convenience

        Cooperating processes require an interprocess
            communication (IPC) mechanism
               Two models of IPC:
                a) Message passing
                b) Shared memory
Operating System Concepts – 9th Edition
Silberschatz, Galvin and Gagne ©2013      3.30       Modified By Dr. Khaled Wassif

========================
PDF PAGE 26 OF 51
========================
Communications Models




Operating System Concepts – 9th Edition
Silberschatz, Galvin and Gagne ©2013      3.31   Modified By Dr. Khaled Wassif

IMAGE DESCRIPTION: Two IPC model diagrams side by side. (a) Message passing: process A and process B are separated, with a message queue (m0, m1, m2, …, mn) between them and a kernel below. (b) Shared memory: process A and process B both access a shared-memory region between them, with the kernel underneath. The figure contrasts explicit message queues with processes sharing the same memory area.

========================
PDF PAGE 27 OF 51
========================
Producer-Consumer Problem
     Paradigm for cooperating processes, a producer
          process produces information that is consumed
          by a consumer process:
             A  compiler may produce assembly code that is
              consumed by an assembler
             A web server produces HTML files which are consumed
              by the client web browser
     One solution to allow them to run concurrently,
          uses a buffer of items (shared memory) that can
          be filled by producer and emptied by consumer:
             unbounded-buffer            places no practical limit on the
              size of the buffer
             bounded-buffer assumes that there is a fixed buffer
              size
Operating System Concepts – 9th Edition
Silberschatz, Galvin and Gagne ©2013       3.32              Modified By Dr. Khaled Wassif

========================
PDF PAGE 28 OF 51
========================
Bounded-Buffer –
                              Shared-Memory Solution
              Shared data
                 #define BUFFER_SIZE 10
                          typedef struct {
                              . . .
                          } item;

                          item buffer[BUFFER_SIZE];
                          int in = 0;
                          int out = 0;
              Solution is correct, but can only use
                  BUFFER_SIZE-1 elements
Operating System Concepts – 9th Edition
Silberschatz, Galvin and Gagne ©2013      3.33        Modified By Dr. Khaled Wassif

========================
PDF PAGE 29 OF 51
========================
Bounded-Buffer – Producer
      item next_produced;
      while (true) {
                     /* produce an item in next_produced */
                     while (((in + 1) % BUFFER_SIZE) == out)
                          ;        /* do nothing -- no free buffers */
                     buffer[in] = next_produced;
                     in = (in + 1) % BUFFER_SIZE;
      }

Operating System Concepts – 9th Edition
Silberschatz, Galvin and Gagne ©2013         3.34          Modified By Dr. Khaled Wassif

========================
PDF PAGE 30 OF 51
========================
Bounded-Buffer – Consumer
        item next_consumed;
        while (true) {
                       while (in == out)
                                ;         /* do nothing – empty buffers */
                       next_consumed = buffer[out];
                       out = (out + 1) % BUFFER_SIZE;
                       /* consume the item in next_consumed */
        }

Operating System Concepts – 9th Edition
Silberschatz, Galvin and Gagne ©2013             3.35           Modified By Dr. Khaled Wassif

========================
PDF PAGE 31 OF 51
========================
Interprocess Communication –
                          Message Passing
      Mechanism for processes to communicate and
       to synchronize their actions
      Message system – processes communicate with
       each other without resorting to shared variables
      IPC facility provides at least two operations:
             send(message) – message size fixed or variable
             receive(message)
      If P and Q wish to communicate, they need to:
         establish a communication link between them
         exchange messages via send/receive
      Implementation of communication link
         logical (e.g., direct or indirect, synchronous or
          asynchronous, automatic or explicit buffering)
Operating System Concepts – 9th Edition
Silberschatz, Galvin and Gagne ©2013      3.36      Modified By Dr. Khaled Wassif

========================
PDF PAGE 32 OF 51
========================
Implementation Questions
        How are links established?

        Can a link be associated with more than two
            processes?
        How many links can there be between every
            pair of communicating processes?
        What is the capacity of a link?

        Is the size of a message that the link can
            accommodate fixed or variable?
        Is a link unidirectional or bi-directional?
Operating System Concepts – 9th Edition
Silberschatz, Galvin and Gagne ©2013      3.37    Modified By Dr. Khaled Wassif

========================
PDF PAGE 33 OF 51
========================
Direct Communication
         Processes must name each other explicitly:
                send (P, message) – send a message to process P

                receive(Q, message) – receive a message from
                   process Q
         Properties of communication link
                Links are established automatically

                A   link is associated with exactly one pair of
                   communicating processes
                Between each pair there exists exactly one link

                The link may be unidirectional, but is usually bi-
                   directional
Operating System Concepts – 9th Edition
Silberschatz, Galvin and Gagne ©2013      3.38           Modified By Dr. Khaled Wassif

========================
PDF PAGE 34 OF 51
========================
Indirect Communication
        Messages are directed and received from
             mailboxes (also referred to as ports)
               Each mailbox has a unique id
               Processes can communicate only if they share a
                   mailbox
        Properties of communication link
               Link established only if processes share a common
                   mailbox
               A link may be associated with many processes
               Each    pair of processes may share several
                   communication links
               Link may be unidirectional or bi-directional
Operating System Concepts – 9th Edition
Silberschatz, Galvin and Gagne ©2013      3.39            Modified By Dr. Khaled Wassif

========================
PDF PAGE 35 OF 51
========================
Indirect Communication
         Operations
                 Create a new mailbox
                       A mailbox may be created (and then owned) either by a
                          process or by the operating system
                 Send and receive messages through mailbox
                       Only   owner process can receive messages through its
                          mailbox
                 Destroy a mailbox by the owner

         Primitives are defined as:
           send(A, message) – send a message to mailbox A
                 receive(A, message) – receive a message from
                    mailbox A
Operating System Concepts – 9th Edition
Silberschatz, Galvin and Gagne ©2013           3.40             Modified By Dr. Khaled Wassif

========================
PDF PAGE 36 OF 51
========================
Indirect Communication
          Mailbox sharing
                  P1, P2, and P3 share mailbox A owned by OS

                  P1 sends; P2 and P3 receive

                  Who gets the message?

          Solutions
                  Allow a link to be associated with at most two
                     processes
                  Allow only one process at a time to execute a
                     receive operation
                  Allow the system to select arbitrarily the receiver.
                     Sender is notified who the receiver was
Operating System Concepts – 9th Edition
Silberschatz, Galvin and Gagne ©2013      3.41             Modified By Dr. Khaled Wassif

========================
PDF PAGE 37 OF 51
========================
Synchronization
        Message passing may be either blocking or
             non-blocking
        Blocking is considered synchronous
                Blocking     send has the sender block until the
                    message is received
                Blocking receive has the receiver block until a
                    message is available
        Non-blocking is considered asynchronous
                Non-blocking     send has the sender send the
                    message and continue
                Non-blocking receive has the receiver receive a
                    valid message or null
Operating System Concepts – 9th Edition
Silberschatz, Galvin and Gagne ©2013      3.42         Modified By Dr. Khaled Wassif

========================
PDF PAGE 38 OF 51
========================
Synchronization (Cont.)
           Different combinations possible
              If both send and receive are blocking, we have a
               rendezvous
          Producer-consumer problem becomes trivial
          Producermessage next_produced;
                  while (true) {
                     /* produce an item in next_produced */
                     send(next_produced);
                  }
         Consumer message next_consumed;
                  while (true) {
                     receive(next_consumed);
                     /* consume the item in next_consumed
                    */
                  }
Operating System Concepts – 9th Edition
Silberschatz, Galvin and Gagne ©2013      3.43      Modified By Dr. Khaled Wassif

========================
PDF PAGE 39 OF 51
========================
Buffering
          Queue of messages attached to the link;
               implemented in one of three ways:
                  1. Zero capacity – 0 messages
                        Sender must wait for receiver (rendezvous)
                  2. Bounded capacity – finite length of n messages
                        Sender must wait if link full
                  3. Unbounded capacity – infinite length
                        Sender never waits


Operating System Concepts – 9th Edition
Silberschatz, Galvin and Gagne ©2013         3.44           Modified By Dr. Khaled Wassif

========================
PDF PAGE 40 OF 51
========================
Communications in Client-Server Systems

      Shared memory and message passing strategies
           can be used for communication in client–server
           systems as well
      Four other used techniques for communication in
           client–server systems:
              Sockets

              Remote Procedure Calls

              Pipes

              Remote Method Invocation (Java)

Operating System Concepts – 9th Edition
Silberschatz, Galvin and Gagne ©2013      3.51   Modified By Dr. Khaled Wassif

========================
PDF PAGE 41 OF 51
========================
Sockets
       A socket is an endpoint for communication
         A pair of processes communicating over a network
          employs a pair of sockets
       A socket is identified by an IP address
            concatenated with a port number.
               The socket 161.25.19.8:1625 refers to port 1625 on
                  host 161.25.19.8
       The server waits for incoming client requests by
            listening to a specified port
               All ports below 1024 are well known, used for
                standard services
               To allow a client and server on the same host to
                communicate, a special IP address 127.0.0.1
                (loopback) is used to refer to itself
Operating System Concepts – 9th Edition
Silberschatz, Galvin and Gagne ©2013        3.52      Modified By Dr. Khaled Wassif

========================
PDF PAGE 42 OF 51
========================
Socket Communication




Operating System Concepts – 9th Edition
Silberschatz, Galvin and Gagne ©2013      3.53   Modified By Dr. Khaled Wassif

IMAGE DESCRIPTION: Socket communication diagram. A host labeled Host X (146.86.5.20) contains a socket labeled 146.86.5.20:1625. It connects across a network to a web server at 161.25.19.8, which has a socket labeled 161.25.19.8:80. The graphic illustrates that a network connection uses an IP address and port number at each endpoint.

========================
PDF PAGE 43 OF 51
========================
Sockets in Java
     Three different types
         of sockets:
            Connection-oriented
                (TCP) Socket class
            Connectionless (UDP)
                DatagramSocket
                class
            MulticastSocket
                class – data can be sent
                to multiple recipients
     Consider                       this “Date”
         server:
Operating System Concepts – 9th Edition
Silberschatz, Galvin and Gagne ©2013           3.54     Modified By Dr. Khaled Wassif

IMAGE DESCRIPTION AND IMAGE-ONLY CODE TRANSCRIPTION: The slide lists three Java socket types: connection-oriented TCP (`Socket` class), connectionless UDP (`DatagramSocket` class), and `MulticastSocket` for sending data to multiple recipients. On the right is a Java DateServer example. The code visible in the image is transcribed below.

import java.net.*;
import java.io.*;

public class DateServer
{
    public static void main(String[] args) {
        try {
            ServerSocket sock = new ServerSocket(6013);

            /* now listen for connections */
            while (true) {
                Socket client = sock.accept();

                PrintWriter pout = new
                    PrintWriter(client.getOutputStream(), true);

                /* write the Date to the socket */
                pout.println(new java.util.Date().toString());

                /* close the socket and resume */
                /* listening for connections */
                client.close();
            }
        }
        catch (IOException ioe) {
            System.err.println(ioe);
        }
    }
}

========================
PDF PAGE 44 OF 51
========================
Remote Procedure Calls
         Remote      procedure call (RPC) abstracts
             procedure calls between processes on
             networked systems
                Again uses ports for service differentiation

         Stubs – client-side proxy for the actual
             procedure on the server
                The   client-side stub locates the server and
                   marshalls the parameters
                The     server-side stub receives this message,
                   unpacks the marshalled parameters, and performs
                   the procedure on the server
Operating System Concepts – 9th Edition
Silberschatz, Galvin and Gagne ©2013      3.55            Modified By Dr. Khaled Wassif

========================
PDF PAGE 45 OF 51
========================
Execution of RPC




Operating System Concepts – 9th Edition
Silberschatz, Galvin and Gagne ©2013      3.57       Modified By Dr. Khaled Wassif

IMAGE DESCRIPTION: RPC execution sequence diagram split into client and server sides, with messages moving horizontally between them and time progressing down the page. It shows the client calling a procedure, the client stub sending a request, the server stub receiving/unmarshalling it, the server procedure executing and returning a result, and the response traveling back to the client.

========================
PDF PAGE 46 OF 51
========================
Pipes
        Acts as a channel allowing two processes to
             communicate
        Simpler ways for communication but have
             some limitations
        Issues
                Is communication unidirectional or bidirectional?
                In the case of two-way communication, is it half or
                   full-duplex?
                Must there exist a relationship (as parent-child)
                   between the communicating processes?
                Can be used over a network or must reside on the
                   same machine?
Operating System Concepts – 9th Edition
Silberschatz, Galvin and Gagne ©2013       3.58          Modified By Dr. Khaled Wassif

========================
PDF PAGE 47 OF 51
========================
Ordinary Pipes
      Ordinary Pipes allow communication in standard
          producer-consumer style
             Producer writes to one end (the write-end of the pipe)
             Consumer reads from the other end (the read-end of
                the pipe)
             So, they allow only unidirectional communication

      Require     parent-child relationship                between
          communicating processes
             A   parent process creates a pipe and uses it to
                communicate with its child process
      UNIX treats it as a special type of file and can be
          accessed using read() and write() system calls
Operating System Concepts – 9th Edition
Silberschatz, Galvin and Gagne ©2013      3.59         Modified By Dr. Khaled Wassif

IMAGE DESCRIPTION: Small pipe diagram showing a producer process writing to the write end of a pipe and a consumer process reading from the read end. Arrows indicate one-way flow of data from producer to consumer.

========================
PDF PAGE 48 OF 51
========================
Named Pipes
        More powerful tool than ordinary pipes
          Communication can be bidirectional
          No parent–child relationship is required.
          Several processes can use it for communication
        Both UNIX and Windows systems support it,
            although implementation details differ greatly
               Referred to as FIFOs in UNIX and once created, they
                appear as typical files and manipulated with ordinary
                open(), read(), write(), and close() system calls
               Windows provide a richer communication mechanism
                     Full-duplex communication is allowed

                     May reside on either the same or different machines

                     Allow either byte- or message-oriented data
Operating System Concepts – 9th Edition
Silberschatz, Galvin and Gagne ©2013          3.60                  Modified By Dr. Khaled Wassif

========================
PDF PAGE 49 OF 51
========================
Remote Method Invocation
        Remote Method Invocation (RMI) is a Java
            mechanism similar to RPCs.
        RMI allows a Java program on one machine to
            invoke a method on a remote object.




Operating System Concepts – 9th Edition
Silberschatz, Galvin and Gagne ©2013      3.61    Modified By Dr. Khaled Wassif

IMAGE DESCRIPTION: Remote Method Invocation (RMI) diagram. A Java program running in one JVM communicates by a remote method invocation with a remote object in another JVM. Clouds label the Java program and remote object, with an arrow between them labeled ‘remote method invocation’.

========================
PDF PAGE 50 OF 51
========================
Marshalling Parameters




Operating System Concepts – 9th Edition
Silberschatz, Galvin and Gagne ©2013      3.62   Modified By Dr. Khaled Wassif

IMAGE DESCRIPTION: ‘Marshalling Parameters’ diagram with a client box on the left and a remote object box on the right. On the client, a call such as `val = server.someMethod(A, B)` goes through a stub. In the remote object box, a skeleton receives the call and invokes `someMethod(Object X, Object Y)`/its implementation. Parameter values A and B and the method name are packaged and transferred; the returned result is labeled ‘boolean return value’. The graphic shows request/response marshalling across a remote call.

========================
PDF PAGE 51 OF 51
========================
End of Chapter 3




Operating System Concepts – 9th Edit9on      Silberschatz, Galvin and Gagne ©2013

END OF TRANSCRIPTION