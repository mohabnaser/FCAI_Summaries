import type { Section } from '../../types'
import { part, t } from './helpers'

/** Slides 35–40: process management, memory management, storage and mass-storage management. */
export const resourceManagement: Section = {
  id: 'resource-management',
  order: 8,
  kicker: 'Lesson 08',
  title: 'Process, Memory & Storage Management',
  shortTitle: 'Process, Memory & Storage',
  summary: t(
    'The OS’s three big management jobs at Chapter 1 level: processes (the active units of work), memory (where they must live to run), and storage (files, directories and disks). Later chapters supply the algorithms; this section gives the responsibilities.',
    'التلات شغلانات الكبار بتوع الـ OS على مستوى Chapter 1: الـ processes (وحدات الشغل النشطة)، والـ memory (لازم يبقوا فيها عشان يشتغلوا)، والـ storage (files وdirectories وdisks). الفصول الجاية بتدّي الـ algorithms؛ والجزء ده بيدّي المسؤوليات.',
  ),
  objectives: [
    t('Define a process and contrast the passive program with the active process.', 'تعرّف الـ process وتقارن البرنامج الـ passive بالـ process الـ active.'),
    t('Compare single-threaded and multi-threaded processes by their program counters.', 'تقارن الـ single-threaded والـ multi-threaded processes من حيث الـ program counters.'),
    t('List the six process-management activities and the three memory-management activities.', 'تذكر الست أنشطة بتوع process management والتلات أنشطة بتوع memory management.'),
    t('Explain the file abstraction and list the file-system and mass-storage activities.', 'تشرح الـ file abstraction وتذكر أنشطة الـ file system والـ mass storage.'),
  ],
  estimatedMinutes: 16,
  quizId: 'quiz-resource-management',
  blocks: [
    part(
      t('Process management', 'الـ Process management'),
      t('What a process is, what it needs, and what the OS does for it.', 'الـ process يعني إيه، محتاجة إيه، والـ OS بيعمل لها إيه.'),
    ),
    {
      kind: 'definition',
      term: 'Process',
      definition: t(
        'A **program in execution**. It is a **unit of work** within the system.',
        '**برنامج وهو بيتنفّذ (program in execution)**. وهي **وحدة الشغل** جوه النظام.',
      ),
    },
    {
      kind: 'versus',
      left: { title: 'Program', icon: 'file', tone: 'violet', tagline: t('A **passive** entity', 'كيان **passive**') },
      right: { title: 'Process', icon: 'play', tone: 'cyan', tagline: t('An **active** entity', 'كيان **active**') },
      rows: [
        { aspect: 'What it is', left: t('Code and data stored on disk', 'Code وdata متخزنين على الـ disk'), right: t('That program while it is running', 'نفس البرنامج وهو شغال') },
        { aspect: 'Has', left: t('Nothing that changes', 'مفيش حاجة بتتغير'), right: t('A program counter, registers, resources', 'Program counter وregisters وموارد') },
        { aspect: 'Needs', left: t('—', '—'), right: t('CPU, memory, I/O, files, initialization data', 'CPU وmemory وI/O وfiles وinitialization data') },
        { aspect: 'Ends', left: t('Never runs on its own', 'عمره ما بيشتغل لوحده'), right: t('Termination **reclaims** any reusable resources', 'الانتهاء **بيرجّع** أي موارد ممكن تتستخدم تاني') },
      ],
      verdict: t(
        'One program can become many processes — open the same editor twice and you have two processes.',
        'برنامج واحد ممكن يبقى processes كتير — افتح نفس الـ editor مرتين يبقى عندك اتنين processes.',
      ),
    },
    {
      kind: 'versus',
      title: t('Single-threaded vs multi-threaded', 'Single-threaded مقابل multi-threaded'),
      left: { title: 'Single-threaded process', icon: 'target', tone: 'amber', tagline: t('**One program counter**', '**Program counter واحد**') },
      right: { title: 'Multi-threaded process', icon: 'split', tone: 'teal', tagline: t('**One program counter per thread**', '**Program counter لكل thread**') },
      rows: [
        { aspect: 'Program counter', left: t('One PC specifies the location of the next instruction to execute', 'PC واحد بيحدد مكان الـ instruction الجاية', ), right: t('Each thread has its own PC', 'كل thread ليها PC خاص بيها') },
        { aspect: 'Execution', left: t('Executes instructions **sequentially, one at a time, until completion**', 'بتنفّذ الـ instructions **بالترتيب، واحدة واحدة، لحد ما تخلص**'), right: t('Several paths of execution inside one process', 'كذا مسار تنفيذ جوه process واحدة') },
      ],
    },
    {
      kind: 'hook',
      title: t('Count the arrows', 'عِد الأسهم'),
      phrase: 'A program counter is a “you are here” arrow — one per thread.',
      body: t(
        'Two threads cannot share one arrow: they are at different places in the code.',
        'اتنين threads ما ينفعش يشاركوا سهم واحد: كل واحدة واقفة في مكان مختلف في الكود.',
      ),
    },
    {
      kind: 'cards',
      title: t('Concurrency: many processes, one or more CPUs', 'الـ Concurrency: processes كتير على CPU واحدة أو أكتر'),
      columns: 2,
      items: [
        { icon: 'users', title: 'User and system processes', body: t('A system typically has many processes running concurrently — **some user processes, others system processes**.', 'النظام عادة فيه processes كتير شغالة concurrently — **بعضها user processes وبعضها system processes**.'), tone: 'cyan' },
        { icon: 'repeat', title: 'Multiplexing the CPUs', body: t('**Concurrency** is achieved by multiplexing the CPUs among the processes / threads.', 'الـ **concurrency** بتحصل عن طريق multiplexing الـ CPUs بين الـ processes / threads.'), tone: 'violet' },
      ],
    },
    {
      kind: 'cards',
      title: t('The OS’s six process-management activities', 'الست أنشطة بتوع process management في الـ OS'),
      columns: 3,
      items: [
        { icon: 'plus', tag: '1', title: 'Create & delete', body: t('Creating and deleting **both user and system processes**.', 'إنشاء وحذف **user processes وsystem processes**.'), tone: 'cyan' },
        { icon: 'list', tag: '2', title: 'Schedule', body: t('Scheduling processes and threads on the CPUs.', 'Scheduling للـ processes والـ threads على الـ CPUs.'), tone: 'violet' },
        { icon: 'pause', tag: '3', title: 'Suspend & resume', body: t('Suspending and resuming processes.', 'إيقاف الـ processes مؤقتًا واستكمالها.'), tone: 'amber' },
        { icon: 'workflow', tag: '4', title: 'Synchronization', body: t('Providing mechanisms for process synchronization.', 'توفير آليات للـ process synchronization.'), tone: 'teal' },
        { icon: 'send', tag: '5', title: 'Communication', body: t('Providing mechanisms for process communication.', 'توفير آليات للـ process communication.'), tone: 'rose' },
        { icon: 'lock', tag: '6', title: 'Deadlock handling', body: t('Providing mechanisms for deadlock handling.', 'توفير آليات للتعامل مع الـ deadlock.'), tone: 'lime' },
      ],
    },
    {
      kind: 'hook',
      title: t('A process’s life story, in six verbs', 'حكاية حياة الـ process في ست أفعال'),
      phrase: 'Born, scheduled, paused, synchronized, talking, stuck.',
      letters: [
        { letter: '1', word: 'create / delete' },
        { letter: '2', word: 'schedule' },
        { letter: '3', word: 'suspend / resume' },
        { letter: '4', word: 'synchronization' },
        { letter: '5', word: 'communication' },
        { letter: '6', word: 'deadlock handling' },
      ],
    },

    part(
      t('Memory management', 'الـ Memory management'),
      t('All data and all instructions must be in memory to be processed and executed.', 'كل الداتا وكل الـ instructions لازم يبقوا في الـ memory عشان يتعالجوا ويتنفّذوا.'),
    ),
    {
      kind: 'cards',
      columns: 2,
      items: [
        { icon: 'memory', title: 'Data', body: t('All data is in memory **before and after** processing.', 'كل الداتا بتبقى في الـ memory **قبل وبعد** المعالجة.'), tone: 'teal' },
        { icon: 'code', title: 'Instructions', body: t('All instructions must be in memory **in order to execute**.', 'كل الـ instructions لازم تبقى في الـ memory **عشان تتنفّذ**.'), tone: 'cyan' },
      ],
    },
    {
      kind: 'lead',
      text: t(
        'Memory management **allows keeping several programs in memory** — to **improve CPU utilization** and **speed the computer’s response to users**. That is exactly what multiprogramming and time-sharing (Section 6) need.',
        'الـ memory management **بيسمح إن كذا برنامج يبقوا في الـ memory** — عشان **يحسّن الـ CPU utilization** و**يسرّع استجابة الكمبيوتر للمستخدمين**. وده بالظبط اللي الـ multiprogramming والـ time-sharing (Section 6) محتاجينه.',
      ),
    },
    {
      kind: 'cards',
      title: t('The three memory-management activities', 'التلات أنشطة بتوع memory management'),
      columns: 3,
      items: [
        { icon: 'eye', tag: 'track', title: 'Keep track', body: t('Which parts of memory are currently being used **and by whom**.', 'أنهي أجزاء من الـ memory مستخدمة دلوقتي **ومين بيستخدمها**.'), tone: 'cyan' },
        { icon: 'refresh', tag: 'decide', title: 'Decide what moves', body: t('Which processes (or parts thereof) and data to **move into and out of memory**.', 'أنهي processes (أو أجزاء منها) وداتا **تدخل وتخرج من الـ memory**.'), tone: 'violet' },
        { icon: 'package', tag: 'allocate', title: 'Allocate & deallocate', body: t('Allocating and deallocating memory space **as needed**.', 'تخصيص وتحرير مساحة الـ memory **حسب الحاجة**.'), tone: 'teal' },
      ],
    },
    {
      kind: 'callout',
      tone: 'insight',
      title: t('Know where Chapter 1 stops', 'اعرف Chapter 1 بيقف فين'),
      body: t(
        'Chapter 1 only names these responsibilities. Base/limit registers, paging, segmentation, TLBs and page replacement are the mechanisms of Chapters 8–9 — questions about them were excluded from this chapter’s quizzes.',
        'Chapter 1 بيسمّي المسؤوليات دي بس. الـ base/limit registers والـ paging والـ segmentation والـ TLBs والـ page replacement هي آليات Chapters 8–9 — والأسئلة عنها اتشالت من quizzes الفصل ده.',
      ),
    },

    part(
      t('Storage management', 'الـ Storage management'),
      t('A uniform, logical view of storage — the file — on top of very different devices.', 'نظرة موحدة ومنطقية للـ storage — الـ file — فوق أجهزة مختلفة جدًا.'),
    ),
    {
      kind: 'layers',
      title: t('The file abstraction', 'الـ file abstraction'),
      caption: t(
        'The OS **abstracts physical properties to a logical storage unit — the file**. Each medium is controlled by a device (disk or tape drive) with its own properties.',
        'الـ OS **بيجرّد الخصائص الفيزيائية لوحدة تخزين منطقية — الـ file**. وكل medium بيتحكم فيه جهاز (disk أو tape drive) ليه خصائصه.',
      ),
      layers: [
        { label: 'File', icon: 'file', tone: 'cyan', detail: t('What programs and users see: a named, logical unit.', 'اللي البرامج والمستخدمين بيشوفوه: وحدة منطقية ليها اسم.') },
        { label: 'File system', icon: 'folder', tone: 'violet', detail: t('Files organized into **directories**, with **access control** for who can access what.', 'الـ files متنظمة في **directories**، ومعاها **access control** لمين يوصل لإيه.') },
        {
          label: 'Device (disk or tape drive)',
          icon: 'disk',
          tone: 'amber',
          detail: t('Properties vary from device to device:', 'الخصائص بتختلف من جهاز للتاني:'),
          chips: ['access speed', 'capacity', 'data-transfer rate', 'sequential or random access'],
        },
      ],
    },
    {
      kind: 'cards',
      title: t('File-system management: the OS activities', 'الـ File-system management: أنشطة الـ OS'),
      columns: 4,
      items: [
        { icon: 'plus', title: 'Create & delete', body: t('Creating and deleting files and directories.', 'إنشاء وحذف files وdirectories.'), tone: 'cyan' },
        { icon: 'terminal', title: 'Primitives', body: t('Supporting primitives to manipulate files and directories.', 'توفير primitives للتعامل مع الـ files والـ directories.'), tone: 'violet' },
        { icon: 'disk', title: 'Mapping', body: t('**Mapping files onto secondary storage.**', '**Mapping للـ files على الـ secondary storage.**'), tone: 'amber' },
        { icon: 'archive', title: 'Backup', body: t('Backing up files onto stable (non-volatile) storage media.', 'Backup للـ files على storage media ثابتة (non-volatile).'), tone: 'teal' },
      ],
    },
    {
      kind: 'cards',
      title: t('Mass-storage management', 'الـ Mass-storage management'),
      intro: t(
        'Disks hold data that does not fit in main memory or must be kept for a “long” time. **The entire speed of computer operation hinges on the disk subsystem and its algorithms.**',
        'الـ disks بتشيل الداتا اللي مش داخلة في الـ main memory أو لازم تتحفظ لفترة “طويلة”. **سرعة تشغيل الكمبيوتر كلها بتعتمد على الـ disk subsystem والـ algorithms بتاعته.**',
      ),
      columns: 3,
      items: [
        { icon: 'search', title: 'Free-space management', body: t('Knowing which blocks are free.', 'معرفة أنهي blocks فاضية.'), tone: 'cyan' },
        { icon: 'package', title: 'Storage allocation', body: t('Deciding where data goes on the disk.', 'تحديد الداتا تتحط فين على الـ disk.'), tone: 'violet' },
        { icon: 'list', title: 'Disk scheduling', body: t('Ordering pending disk requests.', 'ترتيب طلبات الـ disk المستنية.'), tone: 'teal' },
      ],
    },
    {
      kind: 'versus',
      title: t('Tertiary storage: does not need to be fast', 'الـ Tertiary storage: مش لازم يبقى سريع'),
      left: { title: 'WORM', icon: 'lock', tone: 'amber', tagline: t('Write once, read many', 'تكتب مرة، وتقرا كتير') },
      right: { title: 'RW', icon: 'refresh', tone: 'teal', tagline: t('Read–write (rewritable)', 'قراءة وكتابة (ينفع يتعاد الكتابة)') },
      rows: [
        { aspect: 'Media', left: t('Optical storage, magnetic tape', 'Optical storage وmagnetic tape'), right: t('Optical storage, magnetic tape', 'Optical storage وmagnetic tape') },
        { aspect: 'Rewrite?', left: t('No — data is written once', 'لأ — الداتا بتتكتب مرة واحدة'), right: t('Yes', 'أيوه') },
        { aspect: 'Managed by', left: t('OS or applications — still must be managed', 'الـ OS أو الـ applications — بس لازم يتدار'), right: t('OS or applications', 'الـ OS أو الـ applications') },
      ],
    },
    {
      kind: 'callout',
      tone: 'definition',
      title: t('Where are the rest of the storage topics?', 'فين باقي مواضيع الـ storage؟'),
      body: t(
        'The lecture continues storage management with cache management, data migration and the I/O subsystem. They are taught with the topics they belong to: **Section 3** (storage hierarchy and caching) and **Section 4** (I/O).',
        'المحاضرة بتكمّل الـ storage management بـ cache management وdata migration والـ I/O subsystem. اتشرحوا مع الموضوعات اللي تبعهم: **Section 3** (الـ storage hierarchy والـ caching) و**Section 4** (الـ I/O).',
      ),
    },
    {
      kind: 'confusions',
      items: [
        {
          wrong: t('“A program and a process are the same thing.”', '“البرنامج والـ process حاجة واحدة.”'),
          right: t('A program is **passive**; a process is that program **in execution** — **active**.', 'البرنامج **passive**؛ والـ process هي البرنامج ده **وهو بيتنفّذ** — **active**.'),
        },
        {
          wrong: t('“Threads of a process share one program counter.”', '“الـ threads بتوع process واحدة بيشاركوا program counter واحد.”'),
          right: t('A multi-threaded process has **one program counter per thread**.', 'الـ multi-threaded process ليها **program counter لكل thread**.'),
        },
        {
          wrong: t('“The file system stores data exactly as the disk hardware sees it.”', '“الـ file system بيخزّن الداتا زي ما الـ disk شايفها بالظبط.”'),
          right: t('The OS **abstracts** physical properties into files and **maps files onto secondary storage**.', 'الـ OS **بيجرّد** الخصائص الفيزيائية لـ files و**بيعمل mapping للـ files على الـ secondary storage**.'),
        },
      ],
    },
    {
      kind: 'exam',
      title: t('Exam radar: process and storage management', 'رادار الامتحان: إدارة الـ processes والـ storage'),
      body: t(
        'Seven items. Process: a fill-in and a definition built on “program in execution”, an MCQ on the passive/active pair, a T/F about program counters in multi-threaded processes, and an elliptical T/F about one of the listed activities (shown, but unscored). Storage: a T/F on how the OS implements the file abstraction, and a fill-in naming the OS component whose activities include mapping files onto secondary storage.',
        'سبع أسئلة. الـ process: fill-in وتعريف مبنيين على “program in execution”، وMCQ على ثنائية passive/active، وT/F عن الـ program counters في الـ multi-threaded processes، وT/F ناقص الصياغة عن نشاط من أنشطة المحاضرة (معروض بس مش محسوب). الـ storage: T/F عن إزاي الـ OS بيطبّق الـ file abstraction، وfill-in بيسمّي مكوّن الـ OS اللي من أنشطته mapping الـ files على الـ secondary storage.',
      ),
      refs: ['s6-process-fill', 's6-define-process', 's6-program-vs-process', 's6-multithread-pc-tf', 's6-process-activity-tf', 's8-file-abstraction-tf', 's8-filesystem-fill'],
    },
    {
      kind: 'recap',
      items: [
        t('Process = program in execution; program passive, process active.', 'الـ process = program in execution؛ البرنامج passive والـ process active.'),
        t('Single-threaded: one PC; multi-threaded: one PC per thread.', 'Single-threaded: PC واحد؛ multi-threaded: PC لكل thread.'),
        t('Process activities: create/delete, schedule, suspend/resume, sync, communicate, deadlock.', 'أنشطة الـ process: create/delete وschedule وsuspend/resume وsync وcommunicate وdeadlock.'),
        t('Memory activities: track use, decide moves in/out, allocate/deallocate.', 'أنشطة الـ memory: تتبّع الاستخدام، تحديد الدخول/الخروج، التخصيص/التحرير.'),
        t('File = logical storage unit; files in directories with access control.', 'الـ file = وحدة تخزين منطقية؛ والـ files في directories بـ access control.'),
        t('Mass storage: free-space management, allocation, disk scheduling; tertiary = WORM or RW.', 'الـ mass storage: free-space management وallocation وdisk scheduling؛ والـ tertiary = WORM أو RW.'),
      ],
    },
  ],
  examFocus: [
    t('A process is a program in execution — an active entity; the program is passive.', 'الـ process هي program in execution — كيان active؛ والبرنامج passive.'),
    t('Single-threaded process: one program counter; multi-threaded: one program counter per thread.', 'الـ single-threaded process: program counter واحد؛ والـ multi-threaded: program counter لكل thread.'),
    t('Process-management activities include creating and deleting both user and system processes.', 'من أنشطة الـ process management إنشاء وحذف user وsystem processes.'),
    t('File-system management maps files onto secondary storage; the OS implements files by managing mass-storage media and their devices.', 'الـ file-system management بيعمل mapping للـ files على الـ secondary storage؛ والـ OS بيطبّق الـ files بإدارة الـ mass-storage media وأجهزتها.'),
  ],
  keyTerms: [
    { term: 'Process', definition: t('A program in execution; an active unit of work.', 'Program in execution؛ وحدة شغل نشطة.') },
    { term: 'Program counter', definition: t('Specifies the location of the next instruction to execute.', 'بيحدد مكان الـ instruction الجاية اللي هتتنفّذ.') },
    { term: 'Thread', definition: t('A path of execution in a process, with its own program counter.', 'مسار تنفيذ جوه process، ليه program counter خاص بيه.') },
    { term: 'File', definition: t('Logical storage unit that abstracts the physical properties of media.', 'وحدة تخزين منطقية بتجرّد الخصائص الفيزيائية للـ media.') },
    { term: 'Mass-storage management', definition: t('Free-space management, storage allocation and disk scheduling.', 'Free-space management وstorage allocation وdisk scheduling.') },
    { term: 'WORM', definition: t('Write-once, read-many tertiary storage.', 'Tertiary storage تكتب فيه مرة وتقرا كتير.') },
  ],
}
