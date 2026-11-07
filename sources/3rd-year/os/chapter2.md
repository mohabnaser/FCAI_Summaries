DOCUMENT: CHAPTER 2 — OPERATING-SYSTEM STRUCTURES
SOURCE: Operating System Concepts, 9th Edition
AUTHORS: Silberschatz, Galvin and Gagne
COPYRIGHT: ©2013
MODIFIED BY: Dr. Khaled Wassif
TOTAL SLIDES: 51

============================================================
IMPORTANT INSTRUCTIONS FOR UNDERSTANDING THIS DOCUMENT
============================================================

This document is a complete textual reconstruction of a 51-slide PowerPoint/PDF presentation.

Each slide is represented separately and in its original order.

For every slide:
1. Preserve the original title.
2. Preserve all textual information, definitions, examples, and bullet points.
3. Preserve the original terminology.
4. Treat diagram descriptions as part of the slide content.
5. Pay attention to the relationships, directions, hierarchy, arrows, and connections described in diagrams.
6. Do not ignore screenshots, tables, illustrations, or labels embedded inside images.
7. Do not assume that an image is decorative when it contains technical information.
8. Do not remove repeated information when it appears on different slides.
9. Do not silently correct the original presentation's statements.
10. Slide numbers refer to the PDF page numbers.

VISUAL DESIGN USED THROUGHOUT THE PRESENTATION:

- White background.
- Large blue titles, generally with a subtle shadow.
- Thin horizontal blue line beneath the title.
- Vertical blue decorative strip along the left edge, with darker and lighter blue sections.
- A small dinosaur illustration near the upper-left title area on most slides.
- Another dinosaur illustration near the bottom-right corner.
- Main bullet points use dark reddish-brown square bullets.
- Secondary bullets use orange circular bullets.
- Tertiary bullets sometimes use small green arrow-shaped bullets.
- Important terminology is frequently highlighted in bright blue.
- Technical diagrams generally use light blue, gray, white, and black.
- Footer contains the textbook title, authors, copyright, slide number, and modification credit.

============================================================
SLIDE 1 — CHAPTER TITLE
============================================================

Title:
Chapter 2: Operating-System Structures

VISUAL DESCRIPTION:

A minimal introductory slide.

- White background.
- Large centered blue title: "Chapter 2: Operating-System Structures".
- A horizontal blue decorative line beneath the title.
- In the center is a framed illustration of a colorful dinosaur.
- The dinosaur is displayed inside a rectangular picture frame with multiple blue borders.
- Footer:
  Operating System Concepts – 9th Edition
  Silberschatz, Galvin and Gagne ©2013

============================================================
SLIDE 2 — CHAPTER CONTENTS
============================================================

Title:
Chapter 2: Operating-System Structures

Topics covered:

1. Operating System Services
2. User Operating System Interface
3. System Calls
4. Types of System Calls
5. System Programs
6. Operating System Design and Implementation
7. Operating System Structure
8. Operating System Debugging
9. Operating System Generation
10. System Boot

VISUAL DESCRIPTION:

- White background with the standard blue slide template.
- The chapter title appears at the top.
- A vertical list of ten topics appears on the left and center.
- Each topic has a small dark reddish-brown square bullet.
- A small dinosaur illustration appears near the lower-right corner.

============================================================
SLIDE 3 — OBJECTIVES
============================================================

Title:
Objectives

The objectives of this chapter are:

- To describe the services an operating system provides to users, processes, and other systems.
- To discuss the various ways of structuring an operating system.
- To explain how operating systems are installed and customized and how they boot.

VISUAL DESCRIPTION:

- Three main objectives arranged vertically.
- Each objective starts with a dark reddish-brown square bullet.
- The text is positioned mostly on the left side.
- Significant empty white space remains on the right.
- Standard blue title and dinosaur illustrations.

============================================================
SLIDE 4 — OPERATING SYSTEM SERVICES
============================================================

Title:
Operating System Services

Operating systems provide an environment for execution of programs and services to programs and users.

One set of operating-system services provides functions that are helpful to the user:

1. User interface

   Almost all operating systems have a user interface (UI).

   Varies between:
   - Command-Line Interface (CLI)
   - Batch
   - Graphics User Interface (GUI)

2. Program execution

   The system must be able to load a program into memory and to run that program, end execution, either normally or abnormally (indicating error).

3. I/O operations

   A running program may require I/O, which may involve a file or an I/O device.

4. File-system manipulation

   The file system is of particular interest.

   Programs need to:
   - Read and write files and directories.
   - Create and delete files and directories.
   - Search files and directories.
   - List file information.
   - Manage permissions.

VISUAL DESCRIPTION:

Text-based slide.

- Large blue title at the top.
- Introductory statement followed by a list of four operating-system services.
- Service names are visually emphasized.
- User Interface, Program Execution, I/O Operations, and File-System Manipulation are explained individually.
- The text occupies most of the slide.

============================================================
SLIDE 5 — OPERATING SYSTEM SERVICES (CONT.)
============================================================

Title:
Operating System Services (Cont.)

Operating systems provide an environment for execution of programs and services to programs and users.

One set of operating-system services provides functions that are helpful to the user:

1. Communications

   Processes may exchange information, on the same computer or on different computers over a network.

   Communications may be via:
   - Shared memory.
   - Message passing (packets moved by the OS).

2. Error detection

   The OS needs to be constantly aware of possible errors.

   Errors may occur in:
   - CPU and memory hardware.
   - I/O devices.
   - User programs.

   For each type of error, the OS should take the appropriate action to ensure correct and consistent computing.

   Debugging facilities can greatly enhance the user's and programmer's abilities to efficiently use the system.

VISUAL DESCRIPTION:

- Text-heavy slide.
- Communications and Error Detection are the two major sections.
- Supporting explanations are indented beneath each section.
- Additional nested bullets explain the possible locations of errors and the role of debugging.
- Orange bullets are used for major points.
- Green arrow bullets indicate additional details.

============================================================
SLIDE 6 — OPERATING SYSTEM SERVICES (CONT.)
============================================================

Title:
Operating System Services (Cont.)

Another set of OS functions exists for ensuring the efficient operation of the system itself via resource sharing.

1. Resource allocation

   When multiple users or multiple jobs are running concurrently, resources must be allocated to each of them.

   Many types of resources exist.

   Some, such as:
   - CPU cycles.
   - Main memory.
   - File storage.

   May have special allocation code.

   Others, such as I/O devices, may have general request and release code.

2. Accounting

   To keep track of which users use how much and what kinds of computer resources.

3. Protection and security

   The owners of information stored in a multiuser or networked computer system may want to control use of that information.

   Concurrent processes should not interfere with each other.

   Protection involves ensuring that all access to system resources is controlled.

   Security of the system from outsiders requires user authentication.

   Security extends to defending external I/O devices from invalid access attempts.

   If a system is to be protected and secure, precautions must be instituted throughout it.

VISUAL DESCRIPTION:

- Three major operating-system functions.
- Resource Allocation occupies the upper part.
- Accounting appears beneath it.
- Protection and Security occupies the lower part.
- Nested bullets explain resource allocation and security.
- The slide uses the standard white background and blue theme.

============================================================
SLIDE 7 — A VIEW OF OPERATING SYSTEM SERVICES
============================================================

Title:
A View of Operating System Services

VISUAL DESCRIPTION — TECHNICAL DIAGRAM:

This slide contains a layered architectural diagram showing how operating-system services relate to users, system programs, system calls, the operating system, and hardware.

The diagram consists of the following horizontal layers:

LAYER 1 — TOP:
"user and other system programs"

This represents the programs used by users and other system-level programs.

LAYER 2 — USER INTERFACES:

A blue area containing a gray rectangular group labeled "user interfaces".

Inside it are three interface options:

- GUI
- batch
- command line

LAYER 3 — SYSTEM CALLS:

A horizontal gray bar labeled:

"system calls"

This separates the user-interface area from the operating-system services.

LAYER 4 — OPERATING SYSTEM SERVICES:

A large gray region labeled "services".

It contains the following service blocks:

- program execution
- I/O operations
- file systems
- communication
- resource allocation
- accounting
- error detection
- protection and security

The first six functions appear in a horizontal arrangement.

Error detection appears in the lower-left portion.

Protection and security appears in the lower-right portion.

LAYER 5 — OPERATING SYSTEM:

A blue horizontal layer labeled:

"operating system"

LAYER 6 — BOTTOM:

"hardware"

OVERALL RELATIONSHIP:

Users and other programs interact through interfaces such as GUI, batch, and command line.

These interfaces access operating-system functionality through system calls.

The operating system provides services such as program execution, I/O, file systems, communication, resource allocation, accounting, error detection, protection, and security.

Hardware is at the bottom.

============================================================
SLIDE 8 — USER OPERATING SYSTEM INTERFACE - CLI
============================================================

Title:
User Operating System Interface - CLI

CLI or command interpreter allows users to enter commands that are performed by OS.

Details:

- Sometimes implemented in the kernel, sometimes by a systems program.
- Maybe multiple flavors implemented – shells.

The command interpreter:

- Primarily obtains a command from the user and executes it.
- Sometimes contains the code to execute each command, or the commands are just names of programs.
- If the latter, adding new features doesn't require shell modification.

VISUAL DESCRIPTION:

- Text-based slide.
- CLI and command interpreter are emphasized in blue.
- Shells is also highlighted in blue.
- Nested green-arrow bullets describe how command interpreters execute commands.
- No major technical diagram.

============================================================
SLIDE 9 — BOURNE SHELL COMMAND INTERPRETER
============================================================

Title:
Bourne Shell Command Interpreter

VISUAL DESCRIPTION — SCREENSHOT:

A large screenshot of a graphical terminal application is displayed in the center.

The screenshot demonstrates a command interpreter environment running a shell.

Visible elements:

- A graphical application toolbar at the top.
- Buttons labeled New, Info, Close, and Bookmarks.
- An execution/input field.
- A tab or panel labeled Default.
- A terminal area showing shell commands and their outputs.

The terminal screenshot contains examples of commands and system information.

Visible command examples include:

- w
- iostat 5
- ls
- pwd
- ping 192.168.1.1

The screenshot demonstrates:

1. Viewing logged-in users and system load information.
2. Monitoring disk and CPU statistics.
3. Listing files and directories.
4. Displaying the current working directory.
5. Testing network connectivity using ping.

Example output includes user information, disk statistics, directory names, a working-directory path, and ping statistics.

The terminal prompt resembles:

PBG-Mac-Pro:~ pbg$

IMPORTANT VISUAL POINT:

The screenshot is the primary content of this slide. It demonstrates a real command-line interface embedded inside a graphical application.

============================================================
SLIDE 10 — USER OPERATING SYSTEM INTERFACE - GUI
============================================================

Title:
User Operating System Interface - GUI

A user-friendly desktop metaphor interface.

Usually uses:
- Mouse.
- Keyboard.
- Monitor.

Icons represent:
- Files.
- Programs.
- Actions.
- Other objects.

Various mouse buttons over objects in the interface cause various actions, such as:

- Providing information.
- Providing options.
- Executing a function.
- Opening a directory, known as a folder.

Invented at Xerox PARC research facility in the 1970s.

Many systems now include both CLI and GUI interfaces.

Examples:

- Microsoft Windows is GUI with CLI "command" shell.
- Apple Mac OS X is "Aqua" GUI interface with UNIX kernel underneath and shells available.
- Unix and Linux have CLI with optional GUI interfaces:
  - CDE
  - KDE
  - GNOME

VISUAL DESCRIPTION:

- Text-based explanation of graphical user interfaces.
- GUI is highlighted in blue.
- Important terms such as desktop, icons, and folder are emphasized.
- The slide explains the relationship between CLI and GUI across different operating systems.

============================================================
SLIDE 11 — THE MAC OS X GUI
============================================================

Title:
The Mac OS X GUI

VISUAL DESCRIPTION — SCREENSHOT:

A large screenshot of a historical Mac OS X graphical desktop.

The image demonstrates a desktop environment containing multiple overlapping windows.

Visible interface elements include:

- Desktop background with a blue/cyan color scheme.
- A large file manager window occupying the upper-left and center.
- A navigation/sidebar panel on the left side of the file manager.
- A file list in the main area.
- A preview/information panel on the right.
- A desktop icon area on the right side.
- A clock widget near the upper-right.
- A calculator application in the bottom-left.
- An address book/contact application near the bottom-center.
- A dictionary application near the bottom-right.
- A Trash icon near the bottom-right of the desktop.

The screenshot demonstrates the graphical desktop metaphor:

- Windows.
- Icons.
- Application windows.
- File management.
- Widgets.
- Desktop interaction.

No additional textual explanation is provided on this slide.

============================================================
SLIDE 12 — TOUCHSCREEN INTERFACES
============================================================

Title:
Touchscreen Interfaces

Touchscreen devices require new interfaces.

Reasons and characteristics:

- Mouse not possible or not desired.
- Actions and selection based on motions.
- Virtual keyboard for text entry.

VISUAL DESCRIPTION:

The slide is split into two major sections.

LEFT SIDE:

Large text describing touchscreen interface requirements.

Three orange circular bullets:

1. Mouse not possible or not desired.
2. Actions and selection based on motions.
3. Virtual keyboard for text entry.

RIGHT SIDE:

A large screenshot of a touchscreen mobile device home screen.

The screenshot displays a blue-toned wallpaper and a grid of application icons.

Visible application examples include:

- App Store.
- Settings.
- Clock.
- Contacts.
- Fahrenheit.
- Maps.
- Reminders.
- Notes.
- Calculator Pro.
- Google.
- Pocket.
- Kindle.
- Wunderlist.
- Evernote.
- Travel.
- Reference.
- Safari.
- Calendar.
- Mail.

Several application folders are also visible.

A bottom dock contains frequently accessed applications.

The screenshot illustrates a touchscreen-based graphical interface where users interact directly with icons and gestures rather than relying on a mouse.

============================================================
SLIDE 13 — SYSTEM CALLS
============================================================

Title:
System Calls

- Programming interface to the services provided by the OS.
- Typically written in a high-level language (C or C++).
- Mostly accessed by programs via a high-level Application Programming Interface (API) rather than direct system call use.

Three most common APIs are:

1. Win32 API for Windows.
2. POSIX API for POSIX-based systems (including virtually all versions of UNIX, Linux, and Mac OS X).
3. Java API for the Java virtual machine (JVM).

Question presented in the original slide:

Why use APIs rather than system calls?

VISUAL DESCRIPTION:

- Text-only slide.
- API is highlighted in bright blue.
- Three APIs are listed as nested points.
- The final question appears at the bottom as a discussion prompt.

============================================================
SLIDE 14 — EXAMPLE OF SYSTEM CALLS
============================================================

Title:
Example of System Calls

Main statement:

System call sequence to copy the contents of one file to another file.

VISUAL DESCRIPTION — TECHNICAL PROCESS DIAGRAM:

At the top of the diagram:

[source file] ---------------------> [destination file]

A horizontal arrow indicates that data is copied from the source file to the destination file.

Below it is a large light-blue rounded rectangle titled:

"Example System Call Sequence"

Inside the rectangle, the following sequence appears:

1. Acquire input file name.
2. Write prompt to screen.
3. Accept input.
4. Acquire output file name.
5. Write prompt to screen.
6. Accept input.
7. Open the input file.
8. If file doesn't exist, abort.
9. Create output file.
10. If file exists, abort.
11. Loop:
    - Read from input file.
    - Write to output file.
12. Until read fails.
13. Close output file.
14. Write completion message to screen.
15. Terminate normally.

IMPORTANT RELATIONSHIP:

The diagram describes a complete file-copying operation.

The process first obtains the names of the input and output files, opens and creates the appropriate files, repeatedly reads and writes data, then closes the output file and terminates.

The flow is sequential, with a repeated read/write loop.

============================================================
SLIDE 15 — EXAMPLE OF STANDARD API
============================================================

Title:
Example of Standard API

VISUAL DESCRIPTION — TECHNICAL DOCUMENT EXCERPT:

A large light-blue rectangular panel is centered on the slide.

It contains an example of the standard UNIX/Linux read() API.

The panel begins with:

EXAMPLE OF STANDARD API

Introductory text:

As an example of a standard API, consider the read() function that is available in UNIX and Linux systems.

The API for this function is obtained from the man page by invoking the command:

man read

on the command line.

A description of this API appears below:

Code:

#include <unistd.h>

ssize_t read(int fd, void *buf, size_t count)

The diagram beneath the function declaration identifies three components:

- ssize_t = return value.
- read = function name.
- int fd, void *buf, size_t count = parameters.

Explanation:

A program that uses the read() function must include the unistd.h header file, as this file defines the ssize_t and size_t data types (among other things).

The parameters passed to read() are:

- int fd — the file descriptor to be read.
- void *buf — a buffer where the data will be read into.
- size_t count — the maximum number of bytes to be read into the buffer.

Return behavior:

On a successful read, the number of bytes read is returned.

A return value of 0 indicates end of file.

If an error occurs, read() returns -1.

IMPORTANT VISUAL POINT:

The slide presents an API documentation example, including the function signature and visual annotations identifying its return value, function name, and parameters.

============================================================
SLIDE 16 — SYSTEM CALL IMPLEMENTATION
============================================================

Title:
System Call Implementation

- Typically, a number is associated with each system call.
- System-call interface maintains a table indexed according to these numbers.

The system call interface:

- Invokes the proposed system call in the OS kernel.
- Returns the status of the system call and any return values.

The caller need know nothing about how the system call is implemented.

The caller:

- Just needs to follow the API and understand what OS will do as a result of the call.
- Does not need to understand the internal implementation.

Most details of OS interface are hidden from the programmer by API.

These details are managed by a set of functions built into libraries included with the compiler.

VISUAL DESCRIPTION:

- Text-based slide.
- System-call interface is highlighted in blue.
- The slide emphasizes the abstraction between the programmer and the operating-system implementation.
- The system-call number and indexed table are mentioned as the underlying mechanism.

============================================================
SLIDE 17 — API – SYSTEM CALL – OS RELATIONSHIP
============================================================

Title:
API – System Call – OS Relationship

VISUAL DESCRIPTION — TECHNICAL DIAGRAM:

The diagram explains how a user application interacts with the operating system through a system-call interface.

TOP:

A cloud-shaped light-blue box labeled:

"user application"

MIDDLE:

A wide gray rectangular bar labeled:

"system call interface"

A horizontal boundary line separates:

- user mode (above)
- kernel mode (below)

LEFT SIDE:

The application invokes:

open()

A curved arrow points downward from the user application toward the system-call interface.

RIGHT SIDE:

A curved arrow points upward, showing the return path to the application.

BOTTOM:

A vertical blue table-like structure represents the system-call table.

It contains several dots, representing multiple entries.

One entry is indexed by:

i

An arrow from the table points toward:

"Implementation of open() system call"

The implementation is located in the kernel.

A return arrow leads upward toward the system-call interface.

The word:

return

appears near the bottom-right of the implementation path.

IMPORTANT RELATIONSHIP:

1. The user application calls open().
2. The request enters the system-call interface.
3. The system-call interface identifies the relevant system-call entry.
4. The corresponding kernel implementation executes.
5. The result returns through the system-call interface to the user application.

The diagram emphasizes the boundary between user mode and kernel mode.

============================================================
SLIDE 18 — SYSTEM CALL PARAMETER PASSING
============================================================

Title:
System Call Parameter Passing

Often, more information is required than simply the identity of the desired system call.

- Exact type and amount of information vary according to OS and call.

Three general methods are used to pass parameters to the OS:

1. Registers

   Simplest method: pass the parameters in registers.

   In some cases, there may be more parameters than registers.

2. Memory block or table

   Parameters are stored in a block, or table, in memory, and the block address is passed as a parameter in a register.

   This approach is taken by Linux and Solaris.

3. Stack

   Parameters are pushed onto the stack by the program and popped off the stack by the operating system.

Important point:

Block and stack methods do not limit the number or length of parameters being passed.

VISUAL DESCRIPTION:

- Three methods appear as nested bullets.
- Registers are presented as the simplest method.
- Memory block/table and stack are explained as alternative mechanisms.
- Linux and Solaris are specifically associated with the memory-table approach.

============================================================
SLIDE 19 — PARAMETER PASSING VIA TABLE
============================================================

Title:
Parameter Passing via Table

VISUAL DESCRIPTION — TECHNICAL DIAGRAM:

The slide shows how a user program passes parameters to the operating system using a memory table.

LEFT SIDE:

A large light-blue rectangular box labeled:

"user program"

Inside the box:

"X: parameters for call"

The box contains the following text:

load address X

system call 13

An arrow from "load address X" points toward a register.

CENTER TOP:

A small rectangular register box containing:

X

The word "register" appears beneath it.

The register holds the address X of the parameter table.

RIGHT SIDE:

A large light-blue vertical rectangular region labeled:

"operating system"

Inside it is a gray horizontal area containing:

"use parameters from table X"

An arrow connects the user program's system-call information to this region.

A bracket to the right identifies:

"code for system call 13"

FLOW:

1. The user program stores parameters in memory at address X.
2. The user program loads address X into a register.
3. The user program invokes system call 13.
4. The operating system uses the address to access the parameter table.
5. The operating system executes the code for system call 13 using those parameters.

IMPORTANT:

The diagram illustrates that the actual parameters can be stored in memory while only their address is passed through a register.

============================================================
SLIDE 20 — TYPES OF SYSTEM CALLS
============================================================

Title:
Types of System Calls

Category 1: Process control

Examples:

- end, abort
- load, execute
- create process, terminate process
- get process attributes, set process attributes
- wait for time
- wait event, signal event
- allocate and free memory
- Dump memory if error
- Debugger for determining bugs, single step execution
- Locks for managing access to shared data between processes

VISUAL DESCRIPTION:

- Text-based slide.
- Process control is the primary category.
- A vertical list of process-related system-call operations is displayed.
- Debugger and Locks are emphasized in blue.

============================================================
SLIDE 21 — TYPES OF SYSTEM CALLS
============================================================

Title:
Types of System Calls

Category 1: File management

- create file, delete file
- open, close file
- read, write, reposition
- get and set file attributes

Category 2: Device management

- request device, release device
- read, write, reposition
- get device attributes, set device attributes
- logically attach or detach devices

VISUAL DESCRIPTION:

Two main sections appear vertically.

TOP:

File management, followed by four operations.

BOTTOM:

Device management, followed by four operations.

The slide uses orange circular bullets for individual operations and reddish-brown square bullets for the two categories.

============================================================
SLIDE 22 — TYPES OF SYSTEM CALLS
============================================================

Title:
Types of System Calls

Category 1: Information maintenance

- get time or date, set time or date
- get system data, set system data
- get and set process, file, or device attributes

Category 2: Communications

- create, delete communication connection
- Message passing model: send, receive messages to host name or process name
  - From client to server
- Shared-memory model: create and gain access to memory regions
- transfer status information
- attach and detach remote devices

VISUAL DESCRIPTION:

The slide is divided into two vertically arranged categories.

Information maintenance appears in the upper section.

Communications appears in the lower section.

The phrases "Message passing model", "host name", "process name", "Shared-memory model", and "client to server" are emphasized in blue.

============================================================
SLIDE 23 — TYPES OF SYSTEM CALLS
============================================================

Title:
Types of System Calls

Category: Protection

- Control access to resources.
- Get and set permissions.
- Allow and deny user access.

VISUAL DESCRIPTION:

- Minimal text-based slide.
- Protection appears as the main category.
- Three orange bullet points explain the major protection operations.
- A large amount of white space remains beneath the text.

============================================================
SLIDE 24 — EXAMPLES OF WINDOWS AND UNIX SYSTEM CALLS
============================================================

Title:
Examples of Windows and Unix System Calls

VISUAL DESCRIPTION — COMPARISON TABLE:

A large light-blue rectangular table occupies the center of the slide.

It has three conceptual columns:

1. System-call category.
2. Windows.
3. Unix.

TABLE CONTENT:

PROCESS CONTROL

Windows:
- CreateProcess()
- ExitProcess()
- WaitForSingleObject()

Unix:
- fork()
- exit()
- wait()

FILE MANIPULATION

Windows:
- CreateFile()
- ReadFile()
- WriteFile()
- CloseHandle()

Unix:
- open()
- read()
- write()
- close()

DEVICE MANIPULATION

Windows:
- SetConsoleMode()
- ReadConsole()
- WriteConsole()

Unix:
- ioctl()
- read()
- write()

INFORMATION MAINTENANCE

Windows:
- GetCurrentProcessID()
- SetTimer()
- Sleep()

Unix:
- getpid()
- alarm()
- sleep()

COMMUNICATION

Windows:
- CreatePipe()
- CreateFileMapping()
- MapViewOfFile()

Unix:
- pipe()
- shmget()
- mmap()

PROTECTION

Windows:
- SetFileSecurity()
- InitializeSecurityDescriptor()
- SetSecurityDescriptorGroup()

Unix:
- chmod()
- umask()
- chown()

IMPORTANT VISUAL RELATIONSHIP:

The table compares corresponding operating-system system-call functionality in Windows and Unix.

The categories appear in the left column.

The Windows functions appear in the middle.

The Unix functions appear in the right column.

============================================================
SLIDE 25 — STANDARD C LIBRARY EXAMPLE
============================================================

Title:
Standard C Library Example

Main statement:

C program invoking printf() library call, which calls write() system call.

VISUAL DESCRIPTION — TECHNICAL DIAGRAM:

A large light-blue diagram is centered on the slide.

TOP:

A white rectangular code block showing a C program.

Visible code:

#include <stdio.h>

int main()
{
    ...
    ...
    ...
    printf("Greetings");
    ...
    ...
    ...
    return 0;
}

An arrow points from the printf() statement toward the standard C library.

MIDDLE:

A horizontal boundary separates:

- user mode
- kernel mode

A rectangular box labeled:

"standard C library"

The printf() call interacts with this library.

BOTTOM:

A cloud-shaped box labeled:

"write() system call"

An arrow labeled:

write()

connects the standard C library to the write() system call.

The return direction is represented by an upward arrow.

IMPORTANT RELATIONSHIP:

The C program does not directly invoke the low-level write() system call in this example.

Instead:

1. The program calls printf().
2. The standard C library handles the library function.
3. The library invokes the write() system call.
4. The operating system performs the underlying operation.

============================================================
SLIDE 26 — SYSTEM PROGRAMS
============================================================

Title:
System Programs

System programs provide a convenient environment for program development and execution.

- Some of them are simply user interfaces to system calls; others are considerably more complex.
- Most users' view of the operating system is defined by system programs, not the actual system calls.

System programs can be divided into these categories:

1. File manipulation and File modification.
2. Status information.
3. Programming language support.
4. Program loading and execution.
5. Communications.
6. Background services.
7. Application programs.

VISUAL DESCRIPTION:

- Introductory text at the top.
- Two main points explain the purpose of system programs.
- A list of seven categories appears underneath.
- No major technical diagram.

============================================================
SLIDE 27 — TYPES OF SYSTEM PROGRAMS
============================================================

Title:
Types of System Programs

1. File management

   Create, delete, copy, rename, print, dump, list, and generally manipulate files and directories.

2. Status information

   Some programs ask the system for information such as:

   - Date.
   - Time.
   - Amount of available memory.
   - Disk space.
   - Number of users.

   Others provide detailed:

   - Performance information.
   - Logging information.
   - Debugging information.

   Typically, these programs format and print the output to the terminal or other output devices.

   Some systems implement a registry, used to store and retrieve configuration information.

VISUAL DESCRIPTION:

- File management appears first.
- Status information appears beneath it.
- Several nested bullets explain the kinds of system information available.
- Registry is highlighted in blue.
- The text occupies most of the slide.

============================================================
SLIDE 28 — TYPES OF SYSTEM PROGRAMS
============================================================

Title:
Types of System Programs

1. File modification

   - Text editors to create and modify files.
   - Special commands to search contents of files or perform transformations of the text.

2. Programming-language support

   Compilers, assemblers, debuggers, and interpreters are sometimes provided.

3. Program loading and execution

   - Absolute loaders.
   - Relocatable loaders.
   - Linkage editors.
   - Overlay-loaders.
   - Debugging systems for higher-level and machine language.

4. Communications

   Provide the mechanism for creating virtual connections among processes, users, and computer systems.

VISUAL DESCRIPTION:

Four main categories appear vertically.

The category names are bold or visually emphasized.

The descriptions appear beside or underneath each category.

============================================================
SLIDE 29 — TYPES OF SYSTEM PROGRAMS
============================================================

Title:
Types of System Programs

1. Background Services

   - Launch at boot time.
   - Some are for system startup, then terminate.
   - Some run from system boot to shutdown.
   - Provide facilities like disk checking, process scheduling, error logging, and printing.
   - Run in user context, not kernel context.
   - Known as services, subsystems, daemons.

2. Application programs

   - Don't pertain to the system.
   - Run by users.
   - Not typically considered part of OS.
   - Launched by command line, mouse click, finger poke.

VISUAL DESCRIPTION:

The slide is divided into two major categories.

BACKGROUND SERVICES appears in the upper half.

APPLICATION PROGRAMS appears in the lower half.

The terms services, subsystems, and daemons are highlighted in blue.

============================================================
SLIDE 30 — OPERATING SYSTEM DESIGN AND IMPLEMENTATION
============================================================

Title:
Operating System Design and Implementation

Design and implementation of an OS is not "solvable", but some approaches have proven successful.

- Internal structure of different Operating Systems can vary widely.
- Start by defining goals and specifications.
- Affected by choice of hardware, type of system.

User goals and System goals:

USER GOALS:

The operating system should be:

- Convenient to use.
- Easy to learn.
- Reliable.
- Safe.
- Fast.

SYSTEM GOALS:

The operating system should be:

- Easy to design.
- Easy to implement.
- Easy to maintain.
- Flexible.
- Reliable.
- Error-free.
- Efficient.

VISUAL DESCRIPTION:

Two major sections.

The first discusses general OS design considerations.

The second compares User goals and System goals.

The phrases "User goals" and "System goals" are highlighted in blue.

============================================================
SLIDE 31 — OPERATING SYSTEM DESIGN AND IMPLEMENTATION (CONT.)
============================================================

Title:
Operating System Design and Implementation (Cont.)

Important principle to separate:

POLICY:
What will be done?

MECHANISM:
How to do it?

Mechanisms determine how to do something.

Policies decide what will be done.

The separation of policy from mechanism is a very important principle.

It allows maximum flexibility if policy decisions are to be changed later.

Specifying and designing an OS is a highly creative task of software engineering.

VISUAL DESCRIPTION:

- The words Policy and Mechanism are prominently highlighted in bright blue.
- Their definitions appear directly beside them.
- The slide emphasizes the distinction between deciding what should happen and deciding how it happens.
- The final point mentions software engineering.

============================================================
SLIDE 32 — IMPLEMENTATION
============================================================

Title:
Implementation

Much variation exists in operating-system implementation.

Historical progression:

- Early OSs in assembly language.
- Then system programming languages like Algol, PL/1.
- Now C, C++.

Actually, operating systems usually use a mix of languages:

- Lowest levels in assembly.
- Main body in C.
- Systems programs in C, C++, and scripting languages like PERL, Python, shell scripts.

More high-level language makes it easier to port to other hardware.

However:

- But slower.

Emulation can allow an OS to run on non-native hardware.

VISUAL DESCRIPTION:

- Text-based slide.
- Several nested bullet points explain the historical evolution of implementation languages.
- Portability is emphasized in blue.
- Emulation is also highlighted in blue.

============================================================
SLIDE 33 — OPERATING SYSTEM STRUCTURE
============================================================

Title:
Operating System Structure

A general-purpose OS is a very large program.

Various ways to structure one are:

1. Simple Structure.
2. Layered Approach.
3. Microkernel System Structure.
4. Modules.
5. Hybrid Systems.

VISUAL DESCRIPTION:

- A short introductory statement.
- Five operating-system structure approaches listed vertically.
- The list introduces the following slides.
- No major technical diagram.

============================================================
SLIDE 34 — SIMPLE STRUCTURE
============================================================

Title:
Simple Structure

Example:

MS-DOS.

MS-DOS was written to provide the most functionality in the least space.

Characteristics:

- Not divided into modules.
- Although MS-DOS has some structure, its interfaces and levels of functionality are not well separated.

VISUAL DESCRIPTION — ARCHITECTURAL DIAGRAM:

The right side of the slide contains a three-dimensional layered diagram.

It consists of four horizontal blocks arranged vertically.

TOP:
application program

SECOND:
resident system program

THIRD:
MS-DOS device drivers

BOTTOM:
ROM BIOS device drivers

The blocks have a gray three-dimensional appearance.

Arrows connect the layers vertically.

Additional vertical connections indicate that the architecture is not strictly separated into isolated levels.

IMPORTANT INTERPRETATION:

The diagram shows the structure of MS-DOS.

The application program sits at the top.

The resident system program is beneath it.

MS-DOS device drivers are below that.

ROM BIOS device drivers occupy the bottom.

The architecture has some structure, but the interfaces and functionality levels are not well separated.

============================================================
SLIDE 35 — UNIX
============================================================

Title:
UNIX

UNIX was limited by hardware functionality.

The original UNIX operating system had limited structuring.

The UNIX OS consists of two separable parts:

1. Systems programs.
2. The kernel.

The kernel:

- Consists of everything below the system-call interface and above the physical hardware.
- Provides the file system, CPU scheduling, memory management, and other operating-system functions.
- Contains a large number of functions for one level.

VISUAL DESCRIPTION:

- Text-based slide.
- UNIX is the main heading.
- Two components are listed.
- The kernel is explained in greater detail using green nested bullets.
- This slide introduces the traditional UNIX structure diagram on the next slide.

============================================================
SLIDE 36 — TRADITIONAL UNIX SYSTEM STRUCTURE
============================================================

Title:
Traditional UNIX System Structure

VISUAL DESCRIPTION — TECHNICAL ARCHITECTURAL DIAGRAM:

A large rectangular layered architecture diagram is centered on the slide.

The diagram contains several horizontal regions.

TOP LAYER:

(the users)

SECOND LAYER:

A large blue area containing:

- shells and commands
- compilers and interpreters
- system libraries

THIRD LAYER:

A gray horizontal boundary labeled:

system-call interface to the kernel

FOURTH LAYER — KERNEL:

A large blue area containing multiple operating-system components arranged in three groups.

LEFT GROUP:

- signals terminal handling
- character I/O system
- terminal drivers

CENTER GROUP:

- file system
- swapping block I/O system
- disk and tape drivers

RIGHT GROUP:

- CPU scheduling
- page replacement
- demand paging
- virtual memory

A vertical bracket on the left identifies the kernel region.

FIFTH LAYER:

A gray horizontal boundary labeled:

kernel interface to the hardware

BOTTOM LAYER:

Three hardware-related groups:

LEFT:
- terminal controllers
- terminals

CENTER:
- device controllers
- disks and tapes

RIGHT:
- memory controllers
- physical memory

RED STATEMENT BELOW THE DIAGRAM:

"Beyond simple but not fully layered"

IMPORTANT RELATIONSHIP:

Users interact with shells, commands, compilers, interpreters, and system libraries.

The system-call interface provides access to kernel functionality.

The kernel contains file-system services, CPU scheduling, memory management, terminal handling, and device drivers.

The kernel communicates with hardware through the hardware interface.

============================================================
SLIDE 37 — LAYERED APPROACH
============================================================

Title:
Layered Approach

The operating system is divided into a number of layers (levels), each built on top of lower layers.

- The bottom layer (layer 0) is the hardware.
- The highest layer (layer N) is the user interface.

With modularity, layers are selected such that each uses functions (operations) and services of only lower-level layers.

VISUAL DESCRIPTION — CONCENTRIC-LAYER DIAGRAM:

The right side contains a large diagram made of concentric circular layers.

The central circle is labeled:

layer 0
hardware

Surrounding it is a ring labeled:

layer 1

Above this are additional concentric layers represented by increasingly larger rings.

The outermost layer is labeled:

layer N
user interface

Vertical dots between the intermediate layers indicate that more layers exist.

The layers use alternating light-blue, medium-blue, and gray fills.

IMPORTANT RELATIONSHIP:

The architecture is organized as nested levels.

Hardware is at the center/bottom.

Higher layers are built around lower layers.

The user interface occupies the highest layer.

Each layer uses the functions and services of lower layers only.

============================================================
SLIDE 38 — MICROKERNEL SYSTEM STRUCTURE
============================================================

Title:
Microkernel System Structure

A microkernel moves as much from the kernel into user space as possible.

Example:

Mach is an example of a microkernel.

Mac OS X kernel (Darwin) is partly based on Mach.

Communication takes place between user modules using message passing.

BENEFITS:

- Easier to extend a microkernel.
- Easier to port the operating system to new architectures.
- More reliable (less code is running in kernel mode).
- More secure.

DETRIMENTS:

- Performance overhead of user space to kernel space communication.

VISUAL DESCRIPTION:

- Text-based slide.
- The slide explains the idea behind a microkernel.
- Benefits and detriments are separated into different sections.
- The terms Mach, microkernel, Darwin, and message passing are highlighted in blue.

============================================================
SLIDE 39 — MICROKERNEL SYSTEM STRUCTURE
============================================================

Title:
Microkernel System Structure

VISUAL DESCRIPTION — TECHNICAL ARCHITECTURAL DIAGRAM:

The diagram shows a microkernel architecture with user-mode components and kernel-mode components.

TOP AREA — USER MODE:

Three separate gray rectangular modules:

LEFT:
Application Program

CENTER:
File System

RIGHT:
Device Driver

These are positioned above the microkernel.

MIDDLE AREA — KERNEL MODE:

A large light-blue rectangular region labeled:

microkernel

Inside are three gray oval-shaped components:

1. Interprocess Communication.
2. memory management.
3. CPU scheduling.

The three components are arranged horizontally.

MESSAGE PASSING:

Dotted arrows connect the user-mode modules to the microkernel.

The arrows are labeled:

messages

The Application Program communicates with the Interprocess Communication functionality.

The File System communicates through message-passing connections.

The Device Driver also communicates through message-passing connections.

RIGHT SIDE:

Two brackets identify the execution modes:

- user mode: top application modules.
- kernel mode: microkernel.

BOTTOM:

A wide horizontal rectangle labeled:

hardware

Vertical arrows connect the microkernel with the hardware.

IMPORTANT RELATIONSHIP:

Applications, file systems, and device drivers operate in user mode.

The microkernel contains core services such as interprocess communication, memory management, and CPU scheduling.

Communication between modules takes place through message passing.

The microkernel interacts with the underlying hardware.

============================================================
SLIDE 40 — MODULES
============================================================

Title:
Modules

Most modern operating systems implement loadable kernel modules.

Characteristics:

- Uses object-oriented approach.
- Each core component is separate.
- Each talks to the others over known interfaces.
- Each is loadable as needed within the kernel.

Overall, similar to layers but with more flexible structure.

Examples:

- Linux.
- Solaris.
- etc.

VISUAL DESCRIPTION:

- Text-based slide.
- The phrase "loadable kernel modules" is highlighted in blue.
- Four characteristics are listed beneath it.
- A concluding comparison states that modules are similar to layers but more flexible.

============================================================
SLIDE 41 — SOLARIS MODULAR APPROACH
============================================================

Title:
Solaris Modular Approach

VISUAL DESCRIPTION — RADIAL ARCHITECTURAL DIAGRAM:

A central oval-shaped component is labeled:

core Solaris kernel

Several surrounding oval modules connect directly to the central kernel.

The surrounding modules are:

TOP:
scheduling classes

UPPER RIGHT:
file systems

RIGHT:
loadable system calls

LOWER RIGHT:
executable formats

LOWER LEFT:
STREAMS modules

LEFT:
miscellaneous modules

UPPER LEFT:
device and bus drivers

All surrounding modules connect to the central core Solaris kernel using solid black lines.

The central kernel is gray.

The surrounding modules are light blue.

IMPORTANT RELATIONSHIP:

The diagram demonstrates a modular operating-system architecture.

The core Solaris kernel communicates with several independent modules.

These modules provide different functionality and connect to the kernel through defined interfaces.

The modules include device drivers, file systems, scheduling classes, system calls, executable formats, STREAMS, and miscellaneous functionality.

============================================================
SLIDE 42 — HYBRID SYSTEMS
============================================================

Title:
Hybrid Systems

Most modern operating systems are actually not one pure model.

A hybrid combines multiple approaches to address performance, security, and usability needs.

Examples:

1. Linux and Solaris

   Their kernels exist in kernel address space, so they are monolithic, plus modular for dynamic loading of functionality.

2. Windows

   Mostly monolithic, plus microkernel for different subsystem personalities.

3. Apple Mac OS X

   Hybrid and layered.

   Uses Aqua UI plus Cocoa programming environment.

   Below is a kernel consisting of:

   - Mach microkernel.
   - BSD Unix parts.
   - I/O kit.
   - Dynamically loadable modules (called kernel extensions).

VISUAL DESCRIPTION:

- Text-based explanation.
- The slide describes why modern operating systems combine different architectural models.
- Linux, Solaris, Windows, and Mac OS X are discussed as examples.
- Aqua, Cocoa, and kernel extensions are highlighted in blue.

============================================================
SLIDE 43 — MAC OS X STRUCTURE
============================================================

Title:
Mac OS X Structure

VISUAL DESCRIPTION — LAYERED ARCHITECTURAL DIAGRAM:

A large layered diagram occupies the center of the slide.

It consists of three major horizontal regions.

TOP REGION — GRAPHICAL USER INTERFACE:

A wide light-blue horizontal rectangle labeled:

graphical user interface

Inside it:

Aqua

This represents the graphical user interface.

MIDDLE REGION — APPLICATION ENVIRONMENTS AND SERVICES:

A large light-blue rectangle labeled:

application environments and services

Inside are four gray oval components arranged horizontally:

- Java
- Cocoa
- Quicktime
- BSD

The BSD component has a dotted vertical connection to the BSD area below.

BOTTOM REGION — KERNEL ENVIRONMENT:

A large rectangular region labeled:

kernel environment

It contains:

- Mach
- BSD

Mach occupies the left side.

BSD occupies the upper-right kernel area.

The bottom is divided into two components:

- I/O kit
- kernel extensions

IMPORTANT RELATIONSHIP:

Aqua is the graphical user interface.

Java, Cocoa, Quicktime, and BSD represent application environments and services.

The kernel environment contains Mach and BSD components.

The lower layer includes I/O kit and kernel extensions.

The diagram illustrates the hybrid and layered organization of Mac OS X.

============================================================
SLIDE 44 — iOS
============================================================

Title:
iOS

Apple mobile OS for iPhone and iPad.

Characteristics:

- Structured on Mac OS X, with added functionality.
- Does not run OS X applications natively.
  - Also runs on a different CPU architecture (ARM vs. Intel).
- Cocoa Touch Objective-C API for developing apps.
- Media services layer for graphics, audio, and video.
- Core services provides cloud computing and databases.
- Core operating system, based on Mac OS X kernel.

VISUAL DESCRIPTION — LAYER STACK:

The right side of the slide contains four vertically stacked blue rectangular boxes.

From TOP to BOTTOM:

1. Cocoa Touch
2. Media Services
3. Core Services
4. Core OS

These represent the major layers of iOS.

The left side contains explanatory bullets describing each layer.

IMPORTANT RELATIONSHIP:

Cocoa Touch provides the application-development API.

Media Services provides graphics, audio, and video functionality.

Core Services provides services such as cloud computing and databases.

Core OS is based on the Mac OS X kernel.

============================================================
SLIDE 45 — ANDROID
============================================================

Title:
Android

- Developed by Open Handset Alliance (mostly Google).
- Open Source.
- Similar stack to iOS.

Based on Linux kernel but modified.

The Linux kernel provides:

- Process management.
- Memory management.
- Device-driver management.

Adds power management.

Runtime environment includes a core set of libraries and Dalvik virtual machine.

Applications are developed in Java plus Android API.

Java class files are compiled to Java bytecode, then translated to an executable that runs in Dalvik VM.

Libraries include frameworks for:

- Web browser (webkit).
- Database (SQLite).
- Multimedia.
- Smaller libc.

VISUAL DESCRIPTION:

- Text-based slide.
- Android's origins, kernel, runtime, and libraries are discussed.
- Open Source is highlighted in blue.
- The slide introduces the Android architecture diagram on the next page.

============================================================
SLIDE 46 — ANDROID ARCHITECTURE
============================================================

Title:
Android Architecture

VISUAL DESCRIPTION — TECHNICAL LAYERED DIAGRAM:

A large architecture diagram occupies the center.

TOP:

A wide gray rectangular box labeled:

Application Framework

This is the highest visible layer.

MIDDLE:

Two large light-blue rectangular groups are positioned side by side.

LEFT GROUP:
Libraries

Contains six smaller gray boxes:

- SQLite
- openGL
- surface manager
- media framework
- webkit
- libc

RIGHT GROUP:
Android runtime

Contains two gray boxes:

- Core Libraries
- Dalvik virtual machine

The Dalvik virtual machine is displayed as a larger rectangular component beneath Core Libraries.

IMPORTANT RELATIONSHIP:

The Application Framework sits above both the Libraries and Android runtime.

The Libraries group contains system-level libraries and frameworks.

The Android runtime contains the Core Libraries and Dalvik virtual machine.

The diagram shows the main internal software components of the Android architecture.

============================================================
SLIDE 47 — OPERATING-SYSTEM DEBUGGING
============================================================

Title:
Operating-System Debugging

Debugging is finding and fixing errors, or bugs.

- OSs generate log files containing error information.

Failure of an application can generate a core dump file capturing memory of the process.

Operating-system failure can generate a crash dump file containing kernel memory.

Beyond crashes, performance tuning can optimize system performance.

Additional techniques:

- Sometimes using trace listings of activities, recorded for analysis.
- Profiling is periodic sampling of instruction pointer to look for statistical trends.

VISUAL DESCRIPTION:

- Text-based slide.
- Debugging and bugs are highlighted in blue.
- Core dump and crash dump concepts are explained separately.
- Trace listings and Profiling appear as nested points.

============================================================
SLIDE 48 — PERFORMANCE TUNING
============================================================

Title:
Performance Tuning

- Improve performance by removing bottlenecks.
- OS must provide means of computing and displaying measures of system behavior.
- For example, "top" program or Windows Task Manager.

VISUAL DESCRIPTION — SCREENSHOT:

A screenshot of Windows Task Manager occupies the right side.

The screenshot shows the Performance tab.

Visible interface elements:

- Windows Task Manager title bar.
- Menu items: File, Options, View, Help.
- Tabs:
  - Applications
  - Processes
  - Performance
  - Networking

Performance graphs include:

- CPU Usage.
- CPU Usage History.
- PF Usage.
- Page File Usage History.

Additional information sections include:

- Handles.
- Threads.
- Processes.
- Physical Memory.
- Commit Charge.
- Kernel Memory.

The screenshot demonstrates how operating systems provide visual tools for monitoring resource usage and system performance.

IMPORTANT RELATIONSHIP:

Performance tuning involves identifying bottlenecks.

The operating system must provide mechanisms for collecting and displaying performance measurements.

Task Manager is an example of such a monitoring tool.

============================================================
SLIDE 49 — OPERATING SYSTEM GENERATION
============================================================

Title:
Operating System Generation

Operating systems are designed to run on any of a class of machines.

The system must be configured for each specific computer site.

SYSGEN program:

Obtains information concerning the specific configuration of the hardware system.

Uses:

- Used to build a system-specific compiled kernel or system-tuned kernel.
- Can generate more efficient code than one general kernel.

VISUAL DESCRIPTION:

- Text-based slide.
- SYSGEN is highlighted in blue.
- The slide explains the relationship between hardware configuration and the creation of a customized operating-system kernel.

============================================================
SLIDE 50 — SYSTEM BOOT
============================================================

Title:
System Boot

When power is initialized on a system, execution starts at a fixed memory location.

- Firmware ROM is used to hold initial boot code.

The operating system must be made available to hardware so the hardware can start it.

A small piece of code called the bootstrap loader:

- Is stored in ROM or EEPROM.
- Locates the kernel.
- Loads it into memory.
- Starts it.

Sometimes a two-step process is used:

- A boot block at a fixed location is loaded by ROM code.
- The boot block loads the bootstrap loader from disk.

Common bootstrap loader:

GRUB.

GRUB allows selection of:

- Kernel from multiple disks.
- Kernel versions.
- Kernel options.

Finally:

The kernel loads and the system is then running.

VISUAL DESCRIPTION:

- Text-based slide.
- The boot process is explained in chronological order.
- Firmware ROM, bootstrap loader, ROM, EEPROM, boot block, and GRUB are emphasized.
- No major technical diagram is included.

IMPORTANT PROCESS SEQUENCE:

1. Power is initialized.
2. Execution starts at a fixed memory location.
3. Firmware ROM provides initial boot code.
4. The bootstrap loader locates the kernel.
5. The kernel is loaded into memory.
6. The kernel starts executing.
7. The operating system becomes operational.

============================================================
SLIDE 51 — END OF CHAPTER
============================================================

Title:
End of Chapter 2

VISUAL DESCRIPTION:

- Minimal closing slide.
- White background.
- Large centered blue text: "End of Chapter 2".
- A horizontal blue decorative line beneath the title.
- A centered framed dinosaur illustration appears below the line.
- Footer:
  Operating System Concepts – 9th Edition
  Silberschatz, Galvin and Gagne ©2013

============================================================
END OF DOCUMENT
============================================================

DOCUMENT COMPLETENESS NOTES:

- Total PDF pages: 51.
- Slide sequence preserved from 1 to 51.
- All major slide headings and textual sections are represented.
- All major technical diagrams have been described, including their components, labels, hierarchy, connections, and relationships.
- The Bourne Shell screenshot, Mac OS X desktop screenshot, touchscreen interface screenshot, Windows Task Manager screenshot, and technical API example have been described.
- Technical comparison tables and architecture diagrams have been transcribed into structured text.
- Repeated topics and repeated titles have been retained in their original slide positions.
- The original presentation's terminology and framing have been maintained.

END.