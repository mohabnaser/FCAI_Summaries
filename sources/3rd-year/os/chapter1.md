CHAPTER 1: INTRODUCTION — COMPLETE SLIDE TRANSCRIPTION
Source: Chapter 1 - Introduction.pdf (58 pages)

TRANSCRIPTION NOTES
Slides 2–57 share the same visual template: white background, blue title and horizontal rule, blue vertical strip at the left, brown square bullets, a small dinosaur near the upper-left, a dinosaur at lower-right, and a footer reading “Operating System Concepts – 9th Edition”, “Silberschatz, Galvin and Gagne ©2013”, the slide number, and “Modified By Dr. Khaled Wassif”. Slide-specific page numbers and visual descriptions are listed below. Text is preserved in slide order; diagram descriptions summarize the visual relationships and labels.

SLIDE 1 — PDF PAGE 1
Title: Chapter 1: Introduction
Footer: Operating System Concepts – 9th Edition; Silberschatz, Galvin and Gagne ©2013.
Visual: White cover slide with centered blue title, a thick horizontal blue line, and a framed color illustration of a dinosaur beneath it. The dinosaur illustration is reused as a visual motif throughout the deck.

SLIDE 2 — PDF PAGE 2 — 1.2
Title: Chapter 1: Introduction
• What Operating Systems Do
• Computer-System Organization
• Computer-System Architecture
• Operating-System Structure
• Operating-System Operations
  – Process Management
  – Memory Management
  – Storage Management
  – Protection and Security
• Computing Environments
• Open-Source Operating Systems
Visual: Table-of-contents slide with nested bullets and the standard dinosaur-themed template.

SLIDE 3 — PDF PAGE 3 — 1.3
Title: Objectives
• To describe the basic organization of computer systems
• To provide a grand tour of the major components of operating systems
• To give an overview of the many types of computing environments
• To explore several open-source operating systems
Visual: Four objectives arranged vertically as bullet points; no central diagram.

SLIDE 4 — PDF PAGE 4 — 1.4
Title: What is an Operating System?
• A program that acts as an intermediary between a user of a computer and the computer hardware
• Operating system goals:
  – Execute user programs and make solving user problems easier
  – Make the computer system convenient to use
  – Use the computer hardware in an efficient manner
Visual: Text-only explanatory slide. The words “convenient” and “efficient” are emphasized in blue.

SLIDE 5 — PDF PAGE 5 — 1.5
Title: Computer System Structure
• Computer system can be divided into four components:
  – Hardware – provides basic computing resources
    ▸ CPU, memory, I/O devices
  – Operating system
    ▸ Controls and coordinates use of hardware among various applications and users
  – Application programs – define the ways in which the system resources are used to solve the computing problems of the users
    ▸ Word processors, compilers, web browsers, database systems, video games
  – Users
    ▸ People, machines, other computers
Visual: Four components are explained as nested bullet points; no central diagram.

SLIDE 6 — PDF PAGE 6 — 1.6
Title: Four Components of a Computer System
Visual description: Layered architecture diagram. At the top are multiple users labeled user 1, user 2, user 3, …, user n. Beneath them are application-program examples such as compiler, assembler, text editor, and database system. These are grouped into a layer labeled “system and application programs”. Below that is an “operating system” layer, and at the bottom is “computer hardware”. The diagram communicates that users interact with programs, which rely on the operating system and hardware.

SLIDE 7 — PDF PAGE 7 — 1.7
Title: What Operating Systems Do
Label: User View
• Depends on the point of view
• Users want convenience, ease of use
  – Don’t care about resource utilization
• But shared computer such as mainframe or minicomputer must keep all users happy
• Users of dedicated systems such as workstations have dedicated resources but frequently use shared resources from servers
• Handheld computers are resource poor, optimized for usability and battery life
• Some computers have little or no user interface, such as embedded computers in devices and automobiles
Visual: Text slide with a highlighted “User View” label. The emphasis is on how different kinds of users and computers affect the expected role of an OS.

SLIDE 8 — PDF PAGE 8 — 1.8
Title: What Operating Systems Do
Label: System View
• OS is a resource allocator
  – Manages all resources (CPU time, memory space, file-storage space, I/O devices, … …)
  – Decides between conflicting requests for efficient and fair resource use
• OS is a control program
  – Controls execution of programs to prevent errors and improper use of the computer
Visual: Text slide with a highlighted “System View” label, contrasting resource allocation with program control.

SLIDE 9 — PDF PAGE 9 — 1.9
Title: Operating System Definition
• No universally accepted definition of what is part of the operating system
• “Everything a vendor ships when you order an operating system” is good approximation
  – But varies wildly
• “The one program running at all times on the computer” is the kernel.
  – Everything else is either a system program (ships with the operating system) or an application program.
Visual: Text-only definition slide. The words “kernel” and the quoted definition are emphasized.

SLIDE 10 — PDF PAGE 10 — 1.10
Title: Computer Startup
• Bootstrap program is loaded when a computer is powered up or rebooted
  – Typically stored in ROM or EPROM, generally known as firmware
  – Initializes all aspects of system
    ▸ CPU registers, device controllers, and memory contents
  – Loads operating system kernel and starts execution
Visual: Text-only slide explaining the boot process, from firmware initialization to loading the kernel.

SLIDE 11 — PDF PAGE 11 — 1.11
Title: Computer-System Organization
Visual description: Block diagram showing computer hardware components connected through a common bus. A CPU and memory are shown along with a disk controller connected to disks, a USB controller connected to devices such as a mouse, keyboard, and printer, and a graphics adapter connected to a monitor. The diagram illustrates controllers and processors sharing access to memory through the system interconnect.
• One or more CPUs, device controllers connect through common bus providing access to shared memory
• CPUs and device controllers can execute in parallel, competing for memory cycles

SLIDE 12 — PDF PAGE 12 — 1.12
Title: Computer-System Operation
• I/O devices and the CPU can execute concurrently
• Each device controller is in charge of a particular device type
• Each device controller has a local buffer
• CPU moves data from/to main memory to/from local buffers
• I/O is from the device to local buffer of controller
• Device controller informs CPU that it has finished its operation by causing an interrupt
Visual: Text slide describing the cooperation between the CPU and I/O controllers.

SLIDE 13 — PDF PAGE 13 — 1.13
Title: Common Functions of Interrupts
• Interrupt transfers control to the appropriate interrupt service routine, through the interrupt vector, which contains the addresses of all the service routines
• Interrupt architecture must save the address of the interrupted instruction
• A trap or exception is a software-generated interrupt caused either by an error or a user request
Emphasized statement: An operating system is interrupt driven
Visual: A prominent blue right-pointing arrow highlights the concluding statement.

SLIDE 14 — PDF PAGE 14 — 1.14
Title: Interrupt Handling
• The operating system preserves the state of the CPU by storing registers and the program counter
• Determines which type of interrupt has occurred:
  – polling
  – vectored interrupt system
• Separate segments of code determine what action should be taken for each type of interrupts
Visual: Text-only explanation of the steps used to identify and handle an interrupt.

SLIDE 15 — PDF PAGE 15 — 1.15
Title: Interrupt Timeline
Visual description: A time-line chart with time progressing from left to right and three horizontal activity traces: “CPU user process executing”, “I/O interrupt processing”, and “I/O device idle / transferring”. The blue step traces show periods of CPU execution, I/O processing, device transfer, and idle time. Vertical markers align events such as I/O request, transfer done, another I/O request, and transfer done, illustrating that CPU work and I/O activity overlap.

SLIDE 16 — PDF PAGE 16 — 1.16
Title: Storage Structure
• Main memory – only large storage media that the CPU can access directly
  – Random access
  – Typically volatile
• Secondary storage – extension of main memory that provides large nonvolatile storage capacity
  – Magnetic disks – rigid metal or glass platters covered with magnetic recording material
    ▸ Disk surface is logically divided into tracks, which are subdivided into sectors
    ▸ The disk controller determines the logical interaction between the device and the computer
  – Solid-state disks – faster than magnetic disks
    ▸ Various technologies
    ▸ Becoming more popular
Visual: Text-only slide introducing main memory, magnetic disks, and solid-state disks.

SLIDE 17 — PDF PAGE 17 — 1.17
Title: Storage Hierarchy
• Storage systems organized in hierarchy
  – Speed
  – Cost
  – Volatility
• Caching – copying information into faster storage system
  – Main memory can be viewed as a cache for secondary storage
• Device Driver for each device controller to manage I/O
  – Provides interface between controller and kernel
Visual: Text slide highlighting storage hierarchy, caching, and device drivers.

SLIDE 18 — PDF PAGE 18 — 1.18
Title: Storage-Device Hierarchy
Visual description: A layered pyramid-like diagram of storage devices. From the narrow top to the wider bottom, the labels are registers, cache, main memory, solid-state disk, magnetic disk, optical disk, and magnetic tapes. The shape represents progressively larger/slower storage tiers down the hierarchy.

SLIDE 19 — PDF PAGE 19 — 1.19
Title: Caching
• Important principle, performed at many levels in a computer (in H/W, OS, S/W)
• Information in use copied from slower to faster storage temporarily
• Faster storage (cache) checked first to determine if information is there
  – If it is, information used directly from the cache (fast)
  – If not, data copied to cache and used there
• Cache smaller than storage being cached
  – Cache management important design problem
  – Cache size and replacement policy
Visual: Text-only slide describing cache hits, cache misses, and cache management.

SLIDE 20 — PDF PAGE 20 — 1.20
Title: I/O Structure
• After I/O starts, control returns to user program only upon I/O completion
  – Wait instruction idles the CPU until the next interrupt
  – Wait loop (contention for memory access)
  – At most one I/O request is outstanding at a time, no simultaneous I/O processing
• After I/O starts, control returns to user program without waiting for I/O completion
  – System call – request to the OS to allow user to wait for I/O completion
  – Device-status table contains entry for each I/O device indicating its type, address, and state
  – OS indexes into I/O device table to determine device status and to modify table entry to include interrupt
Visual: Text-only comparison of waiting for I/O completion versus returning to the program before I/O finishes.

SLIDE 21 — PDF PAGE 21 — 1.21
Title: Two I/O Methods
Diagram labels: Synchronous; Asynchronous; user; requesting process; waiting; device driver; interrupt handler; hardware data transfer; kernel; time.
Visual description: Two side-by-side sequence diagrams compare synchronous and asynchronous I/O. Each has a user area above a kernel area and shows a requesting process, device driver, interrupt handler, and hardware data-transfer stage over time. In the synchronous case, the process waits for completion; in the asynchronous case, the process can resume while hardware transfer proceeds and an interrupt handler participates in completion.

SLIDE 22 — PDF PAGE 22 — 1.22
Title: Device-Status Table
Diagram text:
• device: card reader 1; status: idle
• device: line printer 3; status: busy
• device: disk unit 1; status: idle
• device: disk unit 2; status: idle
• device: disk unit 3; status: busy
• …
Request connected to line printer 3:
  request for line printer
  address: 38546
  length: 1372
Request connected to disk unit 3:
  request for disk unit 3
  file: xxx
  operation: read
  address: 43046
  length: 20000
Second request for disk unit 3:
  request for disk unit 3
  file: yyy
  operation: write
  address: 03458
  length: 500
Visual description: A vertical device-status table appears on the left with entries for a card reader, printer, and disk units. Arrows lead from busy devices to request boxes. The printer request is shown as a single request; disk unit 3 has two queued requests, one to read file xxx and one to write file yyy. This illustrates recording device states and outstanding requests.

SLIDE 23 — PDF PAGE 23 — 1.23
Title: Direct Memory Access Structure
• Used for high-speed I/O devices able to transmit information at close to memory speeds
• Device controller transfers blocks of data from buffer storage directly to main memory without CPU intervention
• Only one interrupt is generated per block, rather than the one interrupt per byte
Visual: Text-only slide outlining DMA and its reduction in CPU intervention and interrupts.

SLIDE 24 — PDF PAGE 24 — 1.24
Title: How a Modern Computer Works
Visual description: Diagram labeled “A von Neumann architecture”. It contains a CPU (N) with a “stream of execution”, a memory block containing “instructions and data”, and a device/I/O element. Arrows indicate instruction execution, data movement, I/O requests, and transfers between CPU, memory, and devices. A DMA-related path is also shown for data transfer. The diagram illustrates how instructions and data move between processor, memory, and I/O.

SLIDE 25 — PDF PAGE 25 — 1.25
Title: Computer-System Architecture
• Most systems use a single general-purpose processor (PDAs through mainframes)
  – Almost all have special-purpose processors as well
• Multiprocessors systems growing in use and importance
  – Also known as parallel or multicore systems
  – Advantages include:
    1. Increased throughput
    2. Economy of scale
    3. Increased reliability – graceful degradation or fault tolerance
  – Two types:
    1. Asymmetric Multiprocessing
    2. Symmetric Multiprocessing
Visual: Text slide with a numbered list of the multiprocessor advantages and two types.

SLIDE 26 — PDF PAGE 26 — 1.26
Title: Symmetric Multiprocessing Architecture
Visual description: Three processor blocks labeled CPU 0, CPU 1, and CPU 2. Each contains registers and a cache. All processor blocks connect to a single shared memory block at the bottom. The diagram depicts symmetric multiprocessing, where multiple CPUs share memory and have their own registers and caches.

SLIDE 27 — PDF PAGE 27 — 1.27
Title: A Dual-Core Design
• UMA (uniform memory access) vs. NUMA (non-uniform memory access) architecture variations
• Multiple chips with single cores vs. multiple cores on a single chip
• Systems containing all chips vs. blade servers
  – Chassis holding multiple independent multiprocessor systems
Visual description: Diagram on the right shows a single processor chip containing CPU core 0 and CPU core 1. Each core has registers and a cache; both connect to memory. The diagram accompanies the discussion of cores on a single chip and memory-access architectures.

SLIDE 28 — PDF PAGE 28 — 1.28
Title: Clustered Systems
• Like multiprocessor systems, but multiple systems working together
  – Usually sharing storage via a storage-area network (SAN)
  – Provides a high-availability service which survives failures
    ▸ Asymmetric clustering has one machine in hot-standby mode
    ▸ Symmetric clustering has multiple nodes running applications, monitoring each other
  – Some clusters are for high-performance computing (HPC)
    ▸ Applications must be written to use parallelization
  – Some have distributed lock manager (DLM) to avoid conflicting operations
Visual: Text-only explanation of clustered systems and their uses.

SLIDE 29 — PDF PAGE 29 — 1.29
Title: Clustered Systems
Visual description: Three rectangular computer nodes across the top are linked with interconnect connections. Each computer has a downward connection to a shared cylinder labeled “storage area network”. The diagram represents several computers sharing centralized storage.

SLIDE 30 — PDF PAGE 30 — 1.30
Title: Operating System Structure
• Multiprogramming needed for efficiency
  – Single user cannot keep CPU and I/O devices busy at all times
  – Multiprogramming organizes jobs (code and data) so CPU always has one to execute
  – A subset of total jobs in the system is kept in memory
  – A jobs set is selected from a pool via job scheduling
  – When a job has to wait (for I/O for example), OS switches to another job
Visual: Text-only explanation of multiprogramming and job scheduling.

SLIDE 31 — PDF PAGE 31 — 1.31
Title: Memory Layout for Multiprogrammed System
Visual description: A vertical memory layout is marked 0 at the top and 512M at the bottom. From top to bottom, the filled regions are “operating system”, “job 1”, “job 2”, “job 3”, and “job 4”. The diagram shows several jobs resident in main memory at the same time, alongside the operating system.

SLIDE 32 — PDF PAGE 32 — 1.32
Title: Operating System Structure
• Timesharing (multitasking) is a logical extension to multiprogramming
  – The CPU switches jobs so frequently that users can interact with each job while it is running, creating interactive computing
  – Response time should be short (typically < 1 second)
  – Each user has at least one program executing in memory → process
  – If several jobs ready to run at the same time → CPU scheduling
  – If processes don’t fit in memory, swapping moves them in and out to run
  – Virtual memory allows execution of processes not completely in memory
Visual: Text-only slide outlining timesharing, interactive response, scheduling, swapping, and virtual memory.

SLIDE 33 — PDF PAGE 33 — 1.33
Title: Operating-System Operations
• Interrupt driven by hardware
• Software error or request creates exception or trap
  – Division by zero, request for operating system service
  – Other process problems include infinite loop, processes modifying each other or the operating system
• Dual-mode operation allows OS to protect itself and other system components
  – User mode and kernel mode
  – Mode bit provided by hardware
    ▸ Provides ability to distinguish when system is running user code or kernel code
    ▸ Some instructions designated as privileged, only executable in kernel mode
    ▸ System call changes mode to kernel, return from call resets it to user
• Increasingly CPUs support multi-mode operations
  – i.e. virtual machine manager (VMM) mode for guest VMs
Visual: Text slide explaining interrupts, exceptions, user mode, kernel mode, privileged instructions, system calls, and VMM mode.

SLIDE 34 — PDF PAGE 34 — 1.34
Title: Transition from User to Kernel Mode
Visual description: Two horizontal regions are labeled user mode and kernel mode, with a user process executing above and system-call execution below. The arrows show a system call causing a transition into kernel mode, followed by a return from the system call to user mode; the mode bit changes accordingly. A timer mechanism is described below.
• Timer to prevent infinite loop / process hogging resources
  – Set interrupt after specific period (fixed or variable)
  – Operating system initializes and decrements counter
  – When counter reaches zero generate an interrupt
  – Set up before scheduling process to regain control or terminate program that exceeds agreed time

SLIDE 35 — PDF PAGE 35 — 1.35
Title: Process Management
• A process is a program in execution.
  – It is a unit of work within the system
  – Program is a passive entity, process is an active entity
• Process needs resources to accomplish its task
  – CPU, memory, I/O, files
  – Initialization data
• Process termination requires reclaim of any reusable resources
Visual: Text-only slide introducing a process and its resource requirements.

SLIDE 36 — PDF PAGE 36 — 1.36
Title: Process Management
• Single-threaded process has one program counter specifying location of next instruction to execute
  – Process executes instructions sequentially, one at a time, until completion
• Multi-threaded process has one program counter per thread
• Typically a system has many processes running concurrently on one or more CPUs
  – Some user processes and others system processes
  – Concurrency by multiplexing the CPUs among the processes / threads
Visual: Text-only slide comparing single-threaded and multithreaded processes.

SLIDE 37 — PDF PAGE 37 — 1.37
Title: Process Management Activities
• The operating system is responsible for the following activities in connection with process management:
  – Creating and deleting both user and system processes
  – Scheduling processes and threads on the CPUs
  – Suspending and resuming processes
  – Providing mechanisms for process synchronization
  – Providing mechanisms for process communication
  – Providing mechanisms for deadlock handling
Visual: Text-only list of OS responsibilities for managing processes.

SLIDE 38 — PDF PAGE 38 — 1.38
Title: Memory Management
• All data in memory before and after processing
• All instructions in memory in order to execute
• Memory management allows keeping several programs in memory
  – To improve CPU utilization and speed computer’s response to users
• Memory management activities
  – Keeping track of which parts of memory are currently being used and by whom
  – Deciding which processes (or parts thereof) and data to move into and out of memory
  – Allocating and deallocating memory space as needed
Visual: Text-only slide describing memory management purposes and responsibilities.

SLIDE 39 — PDF PAGE 39 — 1.39
Title: Storage Management
• OS provides uniform, logical view of information storage
  – Abstracts physical properties to logical storage unit - file
  – Each medium is controlled by device (i.e., disk or tape drive)
    ▸ Varying properties include access speed, capacity, data-transfer rate, access method (sequential or random)
• File-System management
  – Files usually organized into directories
  – Access control on most systems to determine who can access what
  – OS activities include
    ▸ Creating and deleting files and directories
    ▸ Supporting primitives to manipulate files and directories
    ▸ Mapping files onto secondary storage
    ▸ Backup files onto stable (non-volatile) storage media
Visual: Text-only slide describing files, directories, storage devices, and file-system management.

SLIDE 40 — PDF PAGE 40 — 1.40
Title: Mass-Storage Management
• Usually disks used to store data that does not fit in main memory or data that must be kept for a “long” period of time
• Proper management is of central importance
• Entire speed of computer operation hinges on disk subsystem and its algorithms
• OS activities
  – Free-space management
  – Storage allocation
  – Disk scheduling
• Some storage need not be fast
  – Tertiary storage includes optical storage, magnetic tape
  – Still must be managed – by OS or applications
  – Varies between WORM and RW
Visual: Text-only slide about mass storage, disk management, and tertiary storage.

SLIDE 41 — PDF PAGE 41 — 1.41
Title: Cache Management
• Movement of information between various levels of storage hierarchy can be explicit or implicit
Table:
Level | 1 | 2 | 3 | 4 | 5
Name | registers | cache | main memory | solid state disk | magnetic disk
Typical size | < 1 KB | < 16MB | < 64GB | < 1 TB | < 10 TB
Implementation technology | custom memory with multiple ports CMOS | on-chip or off-chip CMOS SRAM | CMOS SRAM | flash memory | magnetic disk
Access time (ns) | 0.25 - 0.5 | 0.5 - 25 | 80 - 250 | 25,000 - 50,000 | 5,000,000
Bandwidth (MB/sec) | 20,000 - 100,000 | 5,000 - 10,000 | 1,000 - 5,000 | 500 | 20 - 150
Managed by | compiler | hardware | operating system | operating system | operating system
Backed by | cache | main memory | disk | disk | disk or tape
• Careful selection of cache size and replacement policy can result in greatly increased performance
Visual description: The central table compares five levels of the storage hierarchy using name, typical size, implementation technology, access time, bandwidth, managing component, and backing storage. The bottom statement emphasizes the performance impact of selecting cache size and replacement policy.

SLIDE 42 — PDF PAGE 42 — 1.42
Title: Migration of Integer A from Disk to Register
• Multitasking environments must be careful to use most recent value, no matter where it is stored in the storage hierarchy
Visual description: A row of four boxes connected by right-pointing arrows shows the value A moving from “magnetic disk” to “main memory”, then “cache”, then “hardware register”. Each arrow is labeled A. The figure illustrates migration of data through the storage hierarchy.
• Multiprocessor environment must provide cache coherency in hardware such that all CPUs have the most recent value in their cache
• Distributed environment situation even more complex (several copies of a datum can exist)

SLIDE 43 — PDF PAGE 43 — 1.43
Title: I/O Subsystem
• One purpose of OS is to hide individuality of hardware devices from the user
• I/O subsystem responsible for
  – Memory management of I/O including
    ▸ buffering - storing data temporarily while it is being transferred
    ▸ caching - storing parts of data in faster storage for performance
    ▸ spooling - overlapping of output of one job with input of other jobs
  – General device-driver interface
  – Drivers for specific hardware devices
Visual: Text-only slide explaining buffering, caching, spooling, and device drivers.

SLIDE 44 — PDF PAGE 44 — 1.44
Title: Protection and Security
• Protection – any mechanism for controlling access of processes or users to resources defined by the OS
• Security – defense of the system against internal and external attacks
  – Huge range, including denial-of-service, worms, viruses, identity theft, theft of service
• Systems generally first distinguish among users, to determine who can do what
  – User identities (user IDs, security IDs) include name and associated number, one per user
  – User ID then associated with all files, processes of that user to determine access control
  – Group identifier (group ID) allows set of users to be defined and controls managed, then also associated with each process, file
  – Privilege escalation allows user to change to effective ID with more rights
Visual: Text-only slide distinguishing protection from security and introducing user and group identities.

SLIDE 45 — PDF PAGE 45 — 1.45
Title: Computing Environments - Traditional
• Stand-alone general purpose machines
• But indistinct as most systems interconnect with others (i.e. the Internet)
• Portals provide web access to internal systems
• Network computers (thin clients) are like Web terminals - more security or easier maintenance
• Mobile computers interconnect via wireless networks
• Networking becoming ubiquitous - even home systems use firewalls to protect home computers from Internet attacks
Visual: Text-only slide describing traditional computing and its increasingly connected environment.

SLIDE 46 — PDF PAGE 46 — 1.46
Title: Computing Environments - Mobile
• Handheld smart phones, tablet computers, etc
• What is the functional difference between them and a “traditional” laptop?
• Extra feature – more OS features (GPS, gyroscope, taking photos, and recording videos)
• Allows new types of apps like augmented reality
• Use IEEE 802.11 wireless, or cellular data networks for connectivity
• Leaders are Apple iOS and Google Android
Visual: Text-only slide covering mobile-device capabilities and connectivity.

SLIDE 47 — PDF PAGE 47 — 1.47
Title: Computing Environments – Distributed
• Collection of separate, possibly heterogeneous, systems networked together
  – Network is a communications path, TCP/IP most common
    ▸ Local Area Network (LAN)
    ▸ Wide Area Network (WAN)
    ▸ Metropolitan Area Network (MAN)
    ▸ Personal Area Network (PAN)
• Network Operating System provides features (as file sharing) between systems across network
  – Communication scheme allows systems to exchange messages
  – Impression of a single system
Visual: Text-only slide describing network types and distributed operating systems.

SLIDE 48 — PDF PAGE 48 — 1.48
Title: Computing Environments – Client-Server
• Client-Server Computing
  – Dumb terminals supplanted by smart PCs
  – Many systems now servers, responding to requests generated by clients
    ▸ Compute-server system provides an interface to client to request services (i.e., database)
    ▸ File-server system provides interface for clients to store and retrieve files
Visual description: A cloud labeled “Network” is at the center. A “Server” connects on one side, and the other side connects to “client desktop”, “client laptop”, and “client smartphone”. This depicts a central server providing services to different client devices over a network.

SLIDE 49 — PDF PAGE 49 — 1.49
Title: Computing Environments - Peer-to-Peer
• Another model of distributed system
• P2P does not distinguish clients and servers
  – Instead all nodes are considered peers
  – May each act as client, server or both
  – Node must join P2P network
    ▸ Registers its service with central lookup service on network, or
    ▸ Broadcast request for service and respond to requests for service via discovery protocol
  – Examples include Napster and Gnutella, Voice over IP (VoIP) such as Skype
Visual description: A mesh of several small computer/node icons, each labeled “client” in the illustration, connected to multiple other nodes. The many interconnections illustrate peer-to-peer communication without a single dedicated server controlling all exchanges.

SLIDE 50 — PDF PAGE 50 — 1.50
Title: Computing Environments - Virtualization
• Allows operating systems to run as applications within other OSs
  – Vast and growing industry
• Emulation used when source CPU type different from target CPU type (i.e. PowerPC to Intel x86)
  – Generally slowest method
  – When computer language not compiled to native code
    – Interpretation
• Virtualization – OS natively compiled for CPU, running guest OSs also natively compiled
  – Consider VMware running WinXP guests, each running applications, all on native WinXP host OS
  – VMM provides virtualization services
Visual: Text-only explanation of emulation and virtualization.

SLIDE 51 — PDF PAGE 51 — 1.51
Title: Computing Environments - Virtualization
Visual description: Two-part comparison. Diagram (a) shows applications/processes above a kernel and hardware in a conventional stack. Diagram (b) shows several guest environments, VM1, VM2, and VM3, each with its own kernel and processes, above a “virtual machine manager”, which runs above shared hardware. A “programming interface” arrow is shown between the diagrams. The illustration compares a conventional OS stack to multiple virtual machines sharing physical hardware.

SLIDE 52 — PDF PAGE 52 — 1.52
Title: Computing Environments - Virtualization
• Use cases involve laptops and desktops running multiple OSs for exploration or compatibility
  – Apple laptop running Mac OS X host, Windows as a guest
  – Developing apps for multiple OSs without having multiple systems
  – QA testing applications without having multiple systems
  – Executing and managing compute environments within data centers
• VMMs can run natively, in which case they are also the host
Visual: Text-only slide listing use cases for virtual machines and virtual machine managers.

SLIDE 53 — PDF PAGE 53 — 1.53
Title: Computing Environments – Cloud Computing
• Delivers computing, storage, even apps as a service across a network
• Logical extension of virtualization as based on virtualization
  – Amazon EC2 has thousands of servers, millions of VMs, PBs of storage available across the Internet, pay based on usage
• Cloud compute environments composed of usual OSs plus VMMs and cloud management tools
  – Internet connectivity requires security like firewalls
  – Load balancers spread traffic across multiple applications
Visual: Text-only slide introducing cloud computing and its underlying systems.

SLIDE 54 — PDF PAGE 54 — 1.54
Title: Computing Environments – Cloud Computing
Visual description: Cloud architecture diagram. At the top is an oval labeled “Internet”, with a path marked “customer requests” leading toward a firewall and a “cloud customer interface”. A “load balancer” sits below this access layer. The lower area is a large cloud containing virtual machines, storage, servers, and “cloud management services”. A labeled connection for “cloud management commands” links to the management portion of the cloud. The architecture shows Internet traffic entering through controlled interfaces and being distributed across cloud resources.

SLIDE 55 — PDF PAGE 55 — 1.55
Title: Computing Environments – Cloud Computing
• Many types
  – Public cloud – available via Internet to anyone willing to pay
  – Private cloud – run by a company for the company’s own use
  – Hybrid cloud – includes both public and private cloud components
  – Software as a Service (SaaS) – one or more applications available via the Internet (i.e. word processor)
  – Platform as a Service (PaaS) – software stack ready for application use via the Internet (i.e a database server)
  – Infrastructure as a Service (IaaS) – servers or storage available over Internet (i.e. storage available for backup)
Visual: Text-only slide defining cloud deployment models and service models.

SLIDE 56 — PDF PAGE 56 — 1.56
Title: Computing Environments – Real-Time Embedded Systems
• Real-time embedded systems most prevalent form of computers
  – Vary considerable, special purpose, limited purpose OS, real-time OS
  – Usually have little or no user interface
• Many other special computing environments as well
  – Some have OSs, some perform tasks without an OS
• Real-time OS has well-defined fixed time constraints
  – Processing must be done within constraint
  – Correct operation only if constraints met
Visual: Text-only slide about embedded devices and real-time operating systems.

SLIDE 57 — PDF PAGE 57 — 1.57
Title: Open-Source Operating Systems
• Operating systems made available in source-code format rather than just binary closed-source
• Counter to the copy protection and Digital Rights Management (DRM) movement
• Started by Free Software Foundation (FSF), which has “copyleft” GNU Public License (GPL)
• Examples include GNU/Linux and BSD UNIX (including core of Mac OS X), and many more
• Can use VMM like VMware Player (Free on Windows), Virtualbox (open source and free on many platforms)
  – Use to run guest operating systems for exploration
Visual: Text-only slide with blue emphasis on key open-source terms and examples.

SLIDE 58 — PDF PAGE 58
Title: End of Chapter 1
Footer: Operating System Concepts – 9th Edition; Silberschatz, Galvin and Gagne ©2013.
Visual: Closing slide matching the cover, with a large centered “End of Chapter 1” title, horizontal blue line, and a framed dinosaur illustration below it.

END OF TRANSCRIPTION