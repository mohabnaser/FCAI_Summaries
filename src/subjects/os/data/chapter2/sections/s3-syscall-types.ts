import type { Section } from '../../../types'
import { part, t } from '../../sections/helpers'

/** Slides 20–25: six categories of system calls, Windows vs UNIX examples, the C library. */
export const syscallTypes: Section = {
  id: 'c2-syscall-types',
  chapterId: 'chapter-2',
  order: 3,
  kicker: 'Lesson 03',
  title: 'Types of System Calls',
  shortTitle: 'Types of System Calls',
  summary: t(
    'Six families of system calls — process control, file management, device management, information maintenance, communications and protection — with the matching Windows and UNIX names, the two communication models, and how printf() ends up as write().',
    'ست عائلات من الـ system calls — process control وfile management وdevice management وinformation maintenance وcommunications وprotection — والأسامي المقابلة في Windows وUNIX، وموديلين التواصل، وإزاي printf() بتوصل لـ write().',
  ),
  objectives: [
    t('Name the six categories and give two operations for each.', 'تذكر الست فئات ومثالين عمليات لكل واحدة.'),
    t('Match Windows and UNIX system calls in each category.', 'توصّل system calls بتاعة Windows وUNIX في كل فئة.'),
    t('Contrast the message-passing and shared-memory communication models.', 'تقارن موديل الـ message passing بموديل الـ shared memory.'),
    t('Trace printf() through the standard C library to the write() system call.', 'تتابع printf() عن طريق الـ standard C library لحد الـ write() system call.'),
  ],
  estimatedMinutes: 17,
  quizId: 'quiz-c2-syscall-types',
  blocks: [
    part(
      t('Six families of system calls', 'ست عائلات من الـ system calls'),
      t('The lecture groups every system call into one of six categories.', 'المحاضرة بتجمعوا كل system call في فئة من ست فئات.'),
    ),
    {
      kind: 'hook',
      title: t('Remember the six categories in order', 'افتكر الست فئات بالترتيب'),
      phrase: 'Please Find Devices In Cozy Places.',
      letters: [
        { letter: 'P', word: 'Process control' },
        { letter: 'F', word: 'File management' },
        { letter: 'D', word: 'Device management' },
        { letter: 'I', word: 'Information maintenance' },
        { letter: 'C', word: 'Communications' },
        { letter: 'P', word: 'Protection' },
      ],
    },
    {
      kind: 'cards',
      columns: 3,
      items: [
        {
          icon: 'play',
          tag: 'P',
          title: 'Process control',
          body: t(
            'end, abort · load, execute · create / terminate process · get / set process attributes · wait for time · wait event, signal event · allocate and free memory · **dump memory if error** · **debugger** (single-step execution) · **locks** for shared data.',
            'end وabort · load وexecute · create/terminate process · get/set process attributes · wait for time · wait event وsignal event · allocate وfree memory · **dump memory لو error** · **debugger** (single-step execution) · **locks** للداتا المشتركة.',
          ),
          chips: ['fork()', 'exit()', 'wait()'],
          tone: 'cyan',
        },
        {
          icon: 'file',
          tag: 'F',
          title: 'File management',
          body: t('create, delete file · open, close file · read, write, reposition · get and set file attributes.', 'create وdelete file · open وclose file · read وwrite وreposition · get وset file attributes.'),
          chips: ['open()', 'read()', 'close()'],
          tone: 'teal',
        },
        {
          icon: 'printer',
          tag: 'D',
          title: 'Device management',
          body: t('request, release device · read, write, reposition · get / set device attributes · **logically attach or detach** devices.', 'request وrelease device · read وwrite وreposition · get/set device attributes · **attach أو detach** للأجهزة منطقيًا.'),
          chips: ['ioctl()'],
          tone: 'violet',
        },
        {
          icon: 'clock',
          tag: 'I',
          title: 'Information maintenance',
          body: t('get / set time or date · get / set system data · get and set process, file or device attributes.', 'get/set للوقت أو التاريخ · get/set system data · get وset attributes للـ process أو الـ file أو الجهاز.'),
          chips: ['getpid()', 'alarm()', 'sleep()'],
          tone: 'amber',
        },
        {
          icon: 'send',
          tag: 'C',
          title: 'Communications',
          body: t('create, delete communication connection · **message passing**: send, receive messages to a host or process name (client to server) · **shared memory**: create and gain access to memory regions · transfer status information · attach and detach remote devices.', 'create وdelete communication connection · **message passing**: send وreceive رسايل لاسم host أو process (من client لـ server) · **shared memory**: create وgain access لمناطق memory · نقل معلومات الحالة · attach وdetach أجهزة بعيدة.'),
          chips: ['pipe()', 'shmget()', 'mmap()'],
          tone: 'rose',
        },
        {
          icon: 'lock',
          tag: 'P',
          title: 'Protection',
          body: t('**Control access to resources** · get and set permissions · allow and deny user access.', '**التحكم في الوصول للموارد** · get وset permissions · السماح أو المنع لوصول المستخدم.'),
          chips: ['chmod()', 'umask()', 'chown()'],
          tone: 'lime',
        },
      ],
    },

    part(
      t('Windows and UNIX, side by side', 'Windows وUNIX جنب بعض'),
      t('The same six jobs, two vocabularies.', 'نفس الست شغلانات، بمصطلحات مختلفة.'),
    ),
    {
      kind: 'table',
      caption: t('Examples of Windows and UNIX system calls', 'أمثلة لـ system calls في Windows وUNIX'),
      headers: ['Category', 'Windows', 'UNIX'],
      rows: [
        [t('Process control'), t('CreateProcess() · ExitProcess() · WaitForSingleObject()'), t('fork() · exit() · wait()')],
        [t('File manipulation'), t('CreateFile() · ReadFile() · WriteFile() · CloseHandle()'), t('open() · read() · write() · close()')],
        [t('Device manipulation'), t('SetConsoleMode() · ReadConsole() · WriteConsole()'), t('ioctl() · read() · write()')],
        [t('Information maintenance'), t('GetCurrentProcessID() · SetTimer() · Sleep()'), t('getpid() · alarm() · sleep()')],
        [t('Communication'), t('CreatePipe() · CreateFileMapping() · MapViewOfFile()'), t('pipe() · shmget() · mmap()')],
        [t('Protection'), t('SetFileSecurity() · InitializeSecurityDescriptor() · SetSecurityDescriptorGroup()'), t('chmod() · umask() · chown()')],
      ],
    },
    {
      kind: 'visual',
      id: 'syscall-classifier',
      title: t('Sort the system call: which family is it?', 'صنّف الـ system call: من أنهي عيلة؟'),
      caption: t(
        'Pick a call, then its category. The answer also shows its partner on the other OS — the fastest way to learn the table.',
        'اختار call وبعدين فئتها. الإجابة بتوريك كمان المقابل بتاعها في الـ OS التاني — أسرع طريقة تحفظ بيها الجدول.',
      ),
    },
    {
      kind: 'versus',
      title: t('The UNIX process-control trio', 'تلاتي الـ process control في UNIX'),
      left: { title: 'UNIX', icon: 'terminal', tone: 'teal' },
      right: { title: 'Windows', icon: 'monitor', tone: 'cyan' },
      rows: [
        { aspect: 'Create', left: t('`fork()`', '`fork()`'), right: t('`CreateProcess()`', '`CreateProcess()`') },
        { aspect: 'Terminate', left: t('`exit()`', '`exit()`'), right: t('`ExitProcess()`', '`ExitProcess()`') },
        { aspect: 'Wait', left: t('`wait()`', '`wait()`'), right: t('`WaitForSingleObject()`', '`WaitForSingleObject()`') },
      ],
      verdict: t(
        'fork creates, exit terminates, wait waits. Chapter 3 shows what fork() copies and what exec() does next.',
        'الـ fork بتنشئ، والـ exit بتنهي، والـ wait بتستنى. وChapter 3 بيوضّح الـ fork() بتنسخ إيه والـ exec() بتعمل إيه بعدها.',
      ),
    },

    part(
      t('Two models of communication', 'موديلين للتواصل'),
      t(
        'The lecture names the same two models: **message passing** and **shared memory**.',
        'المحاضرة بتذكروا نفس الموديلين: **message passing** و**shared memory**.',
      ),
    ),
    {
      kind: 'versus',
      left: { title: 'Message passing', icon: 'send', tone: 'rose', tagline: t('The OS carries the messages', 'الـ OS بينقل الرسايل') },
      right: { title: 'Shared memory', icon: 'memory', tone: 'violet', tagline: t('Processes share a region', 'الـ processes بيشاركوا منطقة') },
      rows: [
        { aspect: 'Operations', left: t('**send** and **receive** messages to a host name or process name', '**send** و**receive** رسايل لاسم host أو process'), right: t('**create and gain access to** memory regions', '**create وgain access** لمناطق memory') },
        { aspect: 'Who moves data', left: t('Packets moved **by the OS**', 'Packets **الـ OS بينقلها**'), right: t('Processes read and write the region themselves', 'الـ processes بتقرا وتكتب في المنطقة بنفسها') },
        { aspect: 'Typical use', left: t('From **client to server**; across a network', 'من **client لـ server**؛ عبر الشبكة'), right: t('Processes on the same computer', 'Processes على نفس الجهاز') },
        { aspect: 'UNIX calls', left: t('`pipe()`', '`pipe()`'), right: t('`shmget()`, `mmap()`', '`shmget()` و`mmap()`') },
      ],
      verdict: t(
        'These are the two IPC models. Chapter 3 adds the details: direct vs indirect naming, mailboxes, buffering.',
        'دول موديلين الـ IPC. وChapter 3 بيضيف التفاصيل: direct مقابل indirect naming، والـ mailboxes، والـ buffering.',
      ),
    },

    part(
      t('From printf() to write()', 'من printf() لـ write()'),
      t('A library call is not the same as a system call.', 'الـ library call مش هي نفسها الـ system call.'),
    ),
    {
      kind: 'flow',
      title: t('Standard C library example', 'مثال الـ standard C library'),
      steps: [
        { icon: 'code', label: 'printf("Greetings")', detail: t('The C program calls a **library** function — user mode.', 'برنامج الـ C بينادي function في **library** — user mode.'), tone: 'cyan' },
        { icon: 'book', label: 'Standard C library', detail: t('Formats the text, then invokes the system call.', 'بيظبط النص وبعدين بينادي الـ system call.'), tone: 'violet' },
        { icon: 'shield', label: 'write() system call', detail: t('Crosses into **kernel mode**; the OS performs the output.', 'بيعدّي لـ **kernel mode**؛ والـ OS بينفّذ الـ output.'), tone: 'amber' },
        { icon: 'refresh', label: 'Return', detail: t('Control and the result return up to the program.', 'التحكم والنتيجة بيرجعوا للبرنامج.'), tone: 'teal' },
      ],
    },
    {
      kind: 'confusions',
      items: [
        {
          wrong: t('“exec() creates a new process in UNIX.”', '“الـ exec() بتنشئ process جديدة في UNIX.”'),
          right: t('**fork()** creates; exec() loads a new program into an existing process.', '**الـ fork()** هي اللي بتنشئ؛ والـ exec() بتحمّل برنامج جديد في process موجودة.'),
        },
        {
          wrong: t('“printf() is a system call.”', '“الـ printf() system call.”'),
          right: t('printf() is a **library** call; the library invokes the **write()** system call.', 'الـ printf() **library** call؛ والـ library هي اللي بتنادي الـ **write()** system call.'),
        },
        {
          wrong: t('“The IPC operations are read and write.”', '“عمليات الـ IPC هما read وwrite.”'),
          right: t('Message passing uses **send** and **receive**; read/write belong to files and devices.', 'الـ message passing بيستخدم **send** و**receive**؛ والـ read/write بتوع الـ files والأجهزة.'),
        },
      ],
    },
    {
      kind: 'exam',
      title: t('Exam radar: the most-asked part of Chapter 2', 'رادار الامتحان: أكتر جزء بيتسأل في Chapter 2'),
      body: t(
        'Eight past-exam items. Three ask which UNIX call **creates** (and which **terminates**) a process — two of them have the same stem with the options in different orders. Two ask for the **two IPC models** (one MCQ, one fill-in) and two for the **two IPC operations** with different option sets. The last is a written midterm question whose second half — direct vs indirect communication — is taught in Chapter 3.',
        'تمن أسئلة من الامتحانات. تلاتة بيسألوا أنهي call في UNIX بت**نشئ** (وأنهي بت**نهي**) process — اتنين منهم نفس السؤال والاختيارات مترتبة بشكل مختلف. واتنين بيسألوا عن **موديلين الـ IPC** (واحد MCQ وواحد fill-in)، واتنين عن **عمليتين الـ IPC** باختيارات مختلفة. والأخير سؤال مكتوب في midterm نصه التاني — direct مقابل indirect — بيتشرح في Chapter 3.',
      ),
      refs: [
        'c2-fork-create',
        'c2-fork-create-2020',
        'c2-fork-exit',
        'c2-ipc-models-mcq',
        'c2-ipc-models-fill',
        'c2-ipc-operations-2024',
        'c2-ipc-operations-2020',
        'c2-ipc-models-direct-short',
      ],
    },
    {
      kind: 'recap',
      items: [
        t('Six families: process, file, device, information, communications, protection.', 'ست عائلات: process وfile وdevice وinformation وcommunications وprotection.'),
        t('UNIX process control: fork() · exit() · wait().', 'الـ process control في UNIX: fork() · exit() · wait().'),
        t('Windows process control: CreateProcess() · ExitProcess() · WaitForSingleObject().', 'الـ process control في Windows: CreateProcess() · ExitProcess() · WaitForSingleObject().'),
        t('Protection in UNIX: chmod() · umask() · chown().', 'الـ protection في UNIX: chmod() · umask() · chown().'),
        t('IPC models: message passing (send/receive) and shared memory.', 'موديلات الـ IPC: message passing (send/receive) وshared memory.'),
        t('printf() → C library → write() system call → kernel.', 'printf() ← C library ← write() system call ← kernel.'),
      ],
    },
  ],
  examFocus: [
    t('fork() creates a UNIX process and exit() terminates it; Windows uses CreateProcess() and ExitProcess().', 'الـ fork() بتنشئ process في UNIX والـ exit() بتنهيها؛ وWindows بيستخدم CreateProcess() وExitProcess().'),
    t('The two IPC models are shared memory and message passing; message passing provides send and receive.', 'موديلين الـ IPC هما shared memory وmessage passing؛ والـ message passing فيه send وreceive.'),
    t('Know at least one call per category in both columns.', 'اعرف على الأقل call واحدة لكل فئة في العمودين بتوع المحاضرة.'),
  ],
  keyTerms: [
    { term: 'Process control', definition: t('Calls that create, terminate, load, execute, wait and manage processes.', 'Calls بتنشئ وتنهي وتحمّل وتنفّذ وتستنى وتدير الـ processes.') },
    { term: 'fork()', definition: t('UNIX system call that creates a new process.', 'System call في UNIX بتنشئ process جديدة.') },
    { term: 'Message passing', definition: t('Processes exchange messages with send and receive; the OS moves them.', 'الـ processes بتتبادل رسايل بـ send وreceive؛ والـ OS بينقلها.') },
    { term: 'Shared memory', definition: t('Processes create and gain access to a common memory region.', 'الـ processes بتعمل وتوصل لمنطقة memory مشتركة.') },
    { term: 'ioctl()', definition: t('UNIX device-manipulation system call.', 'System call في UNIX للتحكم في الأجهزة.') },
    { term: 'chmod()', definition: t('UNIX protection call that changes permissions.', 'Call حماية في UNIX بتغيّر الصلاحيات.') },
  ],
}
