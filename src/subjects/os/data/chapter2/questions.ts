import type { Question } from '../../types'

/**
 * Chapter 2 historical question bank (owned implementations).
 *
 * Rules (same as Chapter 1):
 * - Stems and options are preserved from the printed papers, including their grammar.
 * - One printed source item → exactly one implementation. Papers that reprint an item
 *   verbatim add a second sourceRef; items whose printed wording or option order differs
 *   get their own implementation.
 * - Items already implemented by Chapter 1 (the boot and kernel questions) are NOT
 *   re-implemented here. Chapter 2 sections list them in `crossRefQuestionIds`, so the
 *   Chapter 2 ledger maps those occurrences to the Chapter 1 implementation.
 */
export const chapter2Questions: Question[] = [
  // ───────────────────────── Section 1 · Services & interfaces ─────────────────────────
  {
    id: 'c2-services-user-tf',
    chapterId: 'chapter-2',
    sectionId: 'c2-services-interfaces',
    topic: 'Operating-system services',
    concept: 'User-helpful versus system-efficiency services',
    difficulty: 'core',
    type: 'tf',
    origin: 'historical',
    prompt:
      'Program execution and resource allocation are examples of operating-system services that provide functions that are helpful to the user.',
    correct: false,
    sourceRefs: [
      { examId: 'final_2023', question: 'Q1.29' },
      { examId: 'final_nodate', question: 'Q1.29' },
    ],
    answerStatus: 'independently-verified',
    explanation: {
      en: 'False — the statement mixes the lecture’s two service groups. Program execution is one of the services “helpful to the user”, but resource allocation belongs to the second set: functions that ensure “the efficient operation of the system itself via resource sharing”, together with accounting and protection and security.',
      ar: 'غلط — الجملة بتخلط بين مجموعتين الخدمات في المحاضرة. الـ program execution من الخدمات “helpful to the user”، لكن الـ resource allocation من المجموعة التانية: الخدمات اللي بتضمن “the efficient operation of the system itself via resource sharing”، ومعاها الـ accounting والـ protection and security.',
    },
    optionNotes: {
      true: {
        en: 'Only half of the statement is right: resource allocation is not in the user-helpful group.',
        ar: 'نص الجملة بس صح: الـ resource allocation مش من مجموعة الخدمات اللي بتساعد المستخدم.',
      },
      false: {
        en: 'Correct. Program execution helps the user; resource allocation keeps the system efficient.',
        ar: 'صح. الـ program execution بتساعد المستخدم؛ والـ resource allocation بتخلي النظام efficient.',
      },
    },
    takeaway: {
      en: 'User-helpful: UI, program execution, I/O, file systems, communications, error detection. System-efficiency: resource allocation, accounting, protection & security.',
      ar: 'بتساعد المستخدم: UI وprogram execution وI/O وfile systems وcommunications وerror detection. لكفاءة النظام: resource allocation وaccounting وprotection & security.',
    },
    hint: {
      en: 'Which of the two services exists to share resources among many users or jobs?',
      ar: 'أنهي خدمة من الاتنين موجودة عشان توزّع الموارد على أكتر من user أو job؟',
    },
  },
  {
    id: 'c2-services-user-2020-tf',
    chapterId: 'chapter-2',
    sectionId: 'c2-services-interfaces',
    topic: 'Operating-system services',
    concept: 'Misclassifying resource allocation as user-helpful (2020 wording)',
    difficulty: 'core',
    type: 'tf',
    origin: 'historical',
    prompt:
      'Program execution and resource allocation are example of operating-system services provides functions that are helpful to the user.',
    correct: false,
    sourceRefs: [
      {
        examId: 'final_2020',
        question: 'Q1.7',
        note: 'Same idea as Final 2023 Q1.29 but printed with different grammar, so it keeps its own implementation.',
      },
    ],
    answerStatus: 'independently-verified',
    explanation: {
      en: 'False, for the same reason as the 2023 version (the 2020 grammar is preserved). Program execution is user-helpful; resource allocation is listed with the services that keep the system efficient when multiple users or jobs run concurrently.',
      ar: 'غلط، لنفس سبب نسخة 2023 (وسيبنا صياغة ورقة 2020 زي ما هي). الـ program execution بتساعد المستخدم؛ والـ resource allocation من الخدمات اللي بتحافظ على كفاءة النظام لما أكتر من user أو job يشتغلوا مع بعض.',
    },
    optionNotes: {
      true: {
        en: 'A statement that is half right is still false.',
        ar: 'الجملة اللي نصها صح تفضل غلط.',
      },
      false: {
        en: 'Correct. The two services come from different groups.',
        ar: 'صح. الخدمتين من مجموعتين مختلفتين.',
      },
    },
    takeaway: {
      en: 'Check every item in a list-style T/F statement against its group.',
      ar: 'في جمل الـ T/F اللي فيها قايمة، راجع كل عنصر هو تبع أنهي مجموعة.',
    },
  },
  {
    id: 'c2-gui-vs-cli',
    chapterId: 'chapter-2',
    sectionId: 'c2-services-interfaces',
    topic: 'User interface',
    concept: 'Advantage of a GUI over a CLI',
    difficulty: 'core',
    type: 'mcq',
    origin: 'historical',
    prompt:
      'Which of the following is an advantage of using a graphical user interface (GUI) over a command-line interface (CLI)?',
    options: [
      { id: 'a', text: 'A GUI is more portable and compatible than a CLI.' },
      { id: 'b', text: 'A GUI is more efficient and faster than a CLI.' },
      { id: 'c', text: 'A GUI is more intuitive and user-friendly than a CLI.' },
      { id: 'd', text: 'A GUI is more powerful and flexible than a CLI.' },
    ],
    correct: 'c',
    sourceRefs: [
      { examId: 'final_2023', question: 'Q2.40', note: 'Printed with the typo “(GU” in the stem.' },
      { examId: 'final_nodate', question: 'Q2.40' },
    ],
    answerStatus: 'independently-verified',
    explanation: {
      en: 'The lecture defines the GUI as a “user-friendly desktop metaphor interface”: icons stand for files, programs and actions, and mouse buttons over objects give information, options, execute functions or open folders. That is option (c). Portability, raw speed and power/flexibility are not the GUI’s defining advantage — an experienced CLI user is often faster and the CLI is easier to script.',
      ar: 'المحاضرة بتعرّف الـ GUI إنها “user-friendly desktop metaphor interface”: الأيقونات بتمثل files وprograms وactions، وأزرار الماوس على الكائنات بتدي معلومات أو options أو تنفّذ وظيفة أو تفتح folder. ده الاختيار (c). أما الـ portability والسرعة والقوة/المرونة فمش الميزة الأساسية للـ GUI — مستخدم الـ CLI الشاطر غالبًا أسرع والـ CLI أسهل في الـ scripting.',
    },
    optionNotes: {
      a: {
        en: 'Not generally true; GUI portability depends on the desktop toolkit.',
        ar: 'مش صح عمومًا؛ الـ portability بتاعة الـ GUI بتعتمد على الـ toolkit.',
      },
      b: {
        en: 'Not its advantage — CLIs are usually faster for experts and lighter.',
        ar: 'مش ميزتها — الـ CLI غالبًا أسرع للخبير وأخف.',
      },
      c: {
        en: 'Correct: the desktop metaphor makes the system intuitive and user-friendly.',
        ar: 'صح: الـ desktop metaphor بتخلي النظام سهل وبديهي.',
      },
      d: {
        en: 'Not generally true; the CLI exposes more precise, scriptable control.',
        ar: 'مش صح عمومًا؛ الـ CLI بيدي تحكم أدق وقابل للـ scripting.',
      },
    },
    takeaway: {
      en: 'GUI = intuitive, user-friendly. CLI = precise, scriptable, fast for experts.',
      ar: 'الـ GUI = بديهية وسهلة. الـ CLI = دقيق وقابل للـ scripting وسريع للخبير.',
    },
  },
  {
    id: 'c2-command-interpreter-2024',
    chapterId: 'chapter-2',
    sectionId: 'c2-services-interfaces',
    topic: 'Command interpreter',
    concept: 'Main function of the command interpreter',
    difficulty: 'core',
    type: 'mcq',
    origin: 'historical',
    prompt: 'What is the main function of the command interpreter?',
    options: [
      { id: 'a', text: 'to provide the interface between the API and application program' },
      { id: 'b', text: 'to get and execute the next user-specified command' },
      { id: 'c', text: 'to handle the files in the operating system' },
      { id: 'd', text: 'none of the mentioned' },
    ],
    correct: 'b',
    sourceRefs: [{ examId: 'final_2024', question: 'Q1.40' }],
    answerStatus: 'independently-verified',
    explanation: {
      en: 'The command interpreter (shell) “primarily obtains a command from the user and executes it”. Sometimes it contains the code for each command; otherwise commands are just names of programs, so new features need no shell change. Option (a) describes the API layer, and (c) is a file-system service, not the interpreter’s main job.',
      ar: 'الـ command interpreter (الـ shell) “primarily obtains a command from the user and executes it”. ساعات بيكون جواه كود كل command؛ وساعات الـ commands مجرد أسامي programs، فإضافة features جديدة مش محتاجة تعديل الـ shell. الاختيار (a) بيوصف طبقة الـ API، و(c) خدمة file system، مش وظيفة الـ interpreter الأساسية.',
    },
    optionNotes: {
      a: { en: 'That is the API’s role, not the shell’s.', ar: 'ده دور الـ API مش الـ shell.' },
      b: { en: 'Correct: get the next command and execute it.', ar: 'صح: ياخد الـ command الجاية وينفّذها.' },
      c: { en: 'File handling is a separate OS service.', ar: 'التعامل مع الـ files خدمة تانية من خدمات الـ OS.' },
      d: { en: 'Incorrect, because (b) is the definition.', ar: 'غلط، لأن (b) هي التعريف.' },
    },
    takeaway: {
      en: 'Command interpreter = read the next user command, then execute it.',
      ar: 'الـ command interpreter = يقرا الـ command الجاية من المستخدم وينفّذها.',
    },
  },
  {
    id: 'c2-command-interpreter-2020',
    chapterId: 'chapter-2',
    sectionId: 'c2-services-interfaces',
    topic: 'Command interpreter',
    concept: 'Main function of the command interpreter (2020 option order)',
    difficulty: 'core',
    type: 'mcq',
    origin: 'historical',
    prompt: 'What is the main function of the command interpreter?',
    options: [
      { id: 'a', text: 'to get and execute the next user-specified command' },
      { id: 'b', text: 'to provide the interface between the API and application program' },
      { id: 'c', text: 'to handle the files in operating system' },
      { id: 'd', text: 'none of the mentioned' },
    ],
    correct: 'a',
    sourceRefs: [
      {
        examId: 'final_2020',
        question: 'Q2.21',
        note: 'Same stem as Final 2024 Q1.40 with the options in a different order.',
      },
    ],
    answerStatus: 'independently-verified',
    explanation: {
      en: 'Same concept as the 2024 paper, but the options are reordered, so the answer is (a). The command interpreter obtains the next user-specified command and executes it.',
      ar: 'نفس فكرة ورقة 2024، بس ترتيب الاختيارات مختلف، فالإجابة (a). الـ command interpreter بياخد الـ command الجاية اللي المستخدم حددها وينفّذها.',
    },
    optionNotes: {
      a: { en: 'Correct in this ordering.', ar: 'صح بالترتيب ده.' },
      b: { en: 'Describes the API layer.', ar: 'ده وصف طبقة الـ API.' },
      c: { en: 'A file-system service, not the interpreter’s main job.', ar: 'خدمة file system، مش الوظيفة الأساسية.' },
      d: { en: 'Incorrect, because (a) is the definition.', ar: 'غلط، لأن (a) هي التعريف.' },
    },
    takeaway: {
      en: 'Memorise the function, not the option letter.',
      ar: 'احفظ الوظيفة، مش حرف الاختيار.',
    },
  },

  // ───────────────────────── Section 2 · System calls & API ─────────────────────────
  {
    id: 'c2-api-fill',
    chapterId: 'chapter-2',
    sectionId: 'c2-system-calls',
    topic: 'System calls',
    concept: 'Programs reach system calls through an API',
    difficulty: 'core',
    type: 'fill',
    origin: 'historical',
    prompt: 'System calls are mostly accessed by programs via {{1}} rather than direct system call use.',
    blanks: [
      {
        id: 'b1',
        label: 'Blank 1',
        accepted: [
          'API',
          'an API',
          'the API',
          'application programming interface',
          'an application programming interface',
          'a high-level application programming interface',
          'high-level API',
        ],
      },
    ],
    sourceRefs: [{ examId: 'final_nodate2', question: 'Q1.6' }],
    answerStatus: 'independently-verified',
    explanation: {
      en: 'Word for word from the lecture: system calls are “mostly accessed by programs via a high-level Application Programming Interface (API) rather than direct system call use”. The three common APIs are Win32 (Windows), POSIX (UNIX, Linux, Mac OS X) and the Java API (JVM).',
      ar: 'المحاضرة بالحرف: الـ system calls “mostly accessed by programs via a high-level Application Programming Interface (API) rather than direct system call use”. وأشهر تلات APIs هما Win32 (Windows) وPOSIX (UNIX وLinux وMac OS X) والـ Java API (JVM).',
    },
    takeaway: {
      en: 'Program → API (Win32 / POSIX / Java) → system-call interface → kernel.',
      ar: 'البرنامج ← API (Win32 / POSIX / Java) ← system-call interface ← kernel.',
    },
    hint: {
      en: 'Win32 and POSIX are examples of this three-letter interface.',
      ar: 'Win32 وPOSIX أمثلة على الواجهة دي اللي اسمها تلات حروف.',
    },
  },
  {
    id: 'c2-system-call-interface-fill',
    chapterId: 'chapter-2',
    sectionId: 'c2-system-calls',
    topic: 'System calls',
    concept: 'System calls are the interface to OS services',
    difficulty: 'core',
    type: 'fill',
    origin: 'historical',
    prompt: '{{1}} provides an interface to the services provided by an operating system.',
    blanks: [
      {
        id: 'b1',
        label: 'Blank 1',
        accepted: [
          'system call',
          'system calls',
          'a system call',
          'the system call',
          'system call interface',
          'the system call interface',
        ],
      },
    ],
    sourceRefs: [{ examId: 'midterm_2021', question: 'Q1.8' }],
    answerStatus: 'independently-verified',
    explanation: {
      en: 'The lecture opens: system calls are the “programming interface to the services provided by the OS”. In practice a program calls an API, and the system-call interface dispatches the request by number to the kernel.',
      ar: 'المحاضرة بتبدأ بإن الـ system calls هي “programming interface to the services provided by the OS”. عمليًا البرنامج بينادي API، والـ system-call interface بيوجّه الطلب برقمه للـ kernel.',
    },
    takeaway: {
      en: 'System calls = the interface to OS services.',
      ar: 'الـ system calls = الواجهة لخدمات الـ OS.',
    },
  },
  {
    id: 'c2-system-calls-essay',
    chapterId: 'chapter-2',
    sectionId: 'c2-system-calls',
    topic: 'System calls and system programs',
    concept: 'Purpose of system calls and system programs; three parameter-passing methods',
    difficulty: 'stretch',
    type: 'short',
    origin: 'historical',
    prompt:
      'What is the purpose of system calls? What is the purpose of system programs? Describe the three methods for passing parameters needed by system calls.',
    modelAnswer:
      'System calls provide the programming interface to the services provided by the operating system; programs use them, usually through an API, to request work from the kernel. System programs provide a convenient environment for program development and execution; some are simply user interfaces to system calls and others are considerably more complex. Parameters are passed to the OS in three ways: (1) in registers — the simplest method, but there may be more parameters than registers; (2) in a block or table in memory, with the address of the block passed in a register — used by Linux and Solaris; (3) on the stack — pushed by the program and popped off by the operating system. The block and stack methods do not limit the number or length of parameters.',
    keywordGroups: [
      { label: 'system calls: interface to OS services', patterns: ['interface', 'service', 'kernel'] },
      { label: 'system programs: convenient environment', patterns: ['convenient', 'environment', 'development'] },
      { label: 'registers', patterns: ['register'] },
      { label: 'block / table in memory', patterns: ['table', 'block'] },
      { label: 'stack (push / pop)', patterns: ['stack', 'push', 'pop'] },
    ],
    passRatio: 0.6,
    sourceRefs: [
      { examId: 'final_2023', question: 'Q4' },
      {
        examId: 'final_nodate',
        question: 'Q4',
        note: 'Same question; the scan carries a student’s handwritten answer naming the three methods.',
      },
    ],
    answerStatus: 'independently-verified',
    explanation: {
      en: 'Answer in three labelled parts. (1) System calls: the programming interface to OS services. (2) System programs: “provide a convenient environment for program development and execution”. (3) Parameter passing: registers; a memory block/table whose address goes in a register (Linux, Solaris); the stack, pushed by the program and popped by the OS. Finish with the key point: block and stack do not limit the number or length of parameters.',
      ar: 'جاوب في تلات أجزاء واضحة. (1) الـ system calls: الـ programming interface لخدمات الـ OS. (2) الـ system programs: “provide a convenient environment for program development and execution”. (3) تمرير الـ parameters: registers؛ أو block/table في الـ memory وعنوانه في register (Linux وSolaris)؛ أو الـ stack، البرنامج بيعمل push والـ OS بيعمل pop. واختم بالنقطة المهمة: الـ block والـ stack مش بيحددوا عدد أو طول الـ parameters.',
    },
    takeaway: {
      en: 'Three questions → three labelled answers. Name all three parameter methods and the Linux/Solaris detail.',
      ar: 'تلات أسئلة ← تلات إجابات متعلّمة. اذكر التلات طرق وتفصيلة Linux/Solaris.',
    },
  },
  {
    id: 'c2-parameter-methods-short',
    chapterId: 'chapter-2',
    sectionId: 'c2-system-calls',
    topic: 'System-call parameter passing',
    concept: 'The three methods for passing parameters to the OS',
    difficulty: 'core',
    type: 'short',
    origin: 'historical',
    prompt: 'Describe the three methods for passing parameters needed by system calls.',
    modelAnswer:
      'Three general methods pass parameters to the operating system. Registers: the simplest method — the parameters are placed in CPU registers, but there may be more parameters than registers. Block or table: the parameters are stored in a block, or table, in memory and the address of the block is passed as a parameter in a register; Linux and Solaris use this approach. Stack: the program pushes the parameters onto the stack and the operating system pops them off. The block and stack methods do not limit the number or length of the parameters being passed.',
    keywordGroups: [
      { label: 'registers', patterns: ['register'] },
      { label: 'block / table with its address in a register', patterns: ['table', 'block'] },
      { label: 'stack pushed by program, popped by OS', patterns: ['stack', 'push', 'pop'] },
      { label: 'block/stack do not limit parameters', patterns: ['limit', 'number', 'length', 'more parameters'] },
    ],
    passRatio: 0.75,
    sourceRefs: [{ examId: 'midterm_2021', question: 'Q3' }],
    answerStatus: 'independently-verified',
    explanation: {
      en: 'The lecture gives exactly three methods. Registers are simplest but limited by how many registers exist. With a block/table, the parameters live in memory and only the block’s address travels in a register (the lecture’s “load address X, system call 13”; Linux and Solaris). With the stack, the program pushes and the OS pops. Mention that block and stack have no limit on the number or length of parameters.',
      ar: 'المحاضرة بتدي تلات طرق بالظبط. الـ registers أبسط حاجة بس محدودة بعدد الـ registers. في الـ block/table الـ parameters بتبقى في الـ memory ويتبعت عنوان الـ block بس في register (زي المحاضرة “load address X, system call 13”؛ Linux وSolaris). وفي الـ stack البرنامج بيعمل push والـ OS بيعمل pop. واذكر إن الـ block والـ stack مالهمش حد لعدد أو طول الـ parameters.',
    },
    takeaway: {
      en: 'Registers · block/table (address in a register) · stack (push/pop).',
      ar: 'Registers · block/table (العنوان في register) · stack (push/pop).',
    },
  },

  // ───────────────────────── Section 3 · Types of system calls ─────────────────────────
  {
    id: 'c2-fork-create',
    chapterId: 'chapter-2',
    sectionId: 'c2-syscall-types',
    topic: 'Process-control system calls',
    concept: 'fork() creates a process in UNIX',
    difficulty: 'core',
    type: 'mcq',
    origin: 'historical',
    prompt: 'In Unix, which system call creates the new process?',
    options: [
      { id: 'a', text: 'new' },
      { id: 'b', text: 'fork' },
      { id: 'c', text: 'create' },
      { id: 'd', text: 'none of the mentioned' },
    ],
    correct: 'b',
    sourceRefs: [{ examId: 'final_2024', question: 'Q1.39' }],
    answerStatus: 'independently-verified',
    explanation: {
      en: 'The lecture’s process-control row: Windows CreateProcess() ↔ UNIX fork(). fork() creates a new process (a copy of the caller). “new” and “create” are not UNIX system calls for process creation. (Chapter 3 covers what the child inherits.)',
      ar: 'صف الـ process control في Windows CreateProcess() ↔ UNIX fork(). الـ fork() بتعمل process جديدة (نسخة من اللي نادتها). و“new” و“create” مش system calls لإنشاء process في UNIX. (Chapter 3 بيشرح الـ child بيورث إيه.)',
    },
    optionNotes: {
      a: { en: 'Not a UNIX system call.', ar: 'مش system call في UNIX.' },
      b: { en: 'Correct: fork() creates a process.', ar: 'صح: الـ fork() بتنشئ process.' },
      c: { en: 'Not the UNIX name; Windows uses CreateProcess().', ar: 'مش الاسم في UNIX؛ Windows بيستخدم CreateProcess().' },
      d: { en: 'Incorrect, fork is listed.', ar: 'غلط، الـ fork موجودة.' },
    },
    takeaway: {
      en: 'UNIX process control: fork() · exit() · wait(). Windows: CreateProcess() · ExitProcess() · WaitForSingleObject().',
      ar: 'الـ process control في UNIX: fork() · exit() · wait(). وفي Windows: CreateProcess() · ExitProcess() · WaitForSingleObject().',
    },
  },
  {
    id: 'c2-fork-create-2020',
    chapterId: 'chapter-2',
    sectionId: 'c2-syscall-types',
    topic: 'Process-control system calls',
    concept: 'fork() creates a process in UNIX (2020 option order)',
    difficulty: 'core',
    type: 'mcq',
    origin: 'historical',
    prompt: 'In Unix, which system call creates the new process?',
    options: [
      { id: 'a', text: 'new' },
      { id: 'b', text: 'create' },
      { id: 'c', text: 'fork' },
      { id: 'd', text: 'none of the mentioned' },
    ],
    correct: 'c',
    sourceRefs: [
      {
        examId: 'final_2020',
        question: 'Q2.23',
        note: 'Same stem as Final 2024 Q1.39 with “create” and “fork” in swapped positions.',
      },
    ],
    answerStatus: 'independently-verified',
    explanation: {
      en: 'Same fact as the 2024 paper with the options reordered: fork() is the UNIX system call that creates a new process, so the answer here is (c).',
      ar: 'نفس معلومة ورقة 2024 والاختيارات مترتبة بشكل تاني: الـ fork() هي الـ system call في UNIX اللي بتنشئ process جديدة، فالإجابة هنا (c).',
    },
    optionNotes: {
      a: { en: 'Not a UNIX system call.', ar: 'مش system call في UNIX.' },
      b: { en: 'Not the UNIX name.', ar: 'مش الاسم في UNIX.' },
      c: { en: 'Correct in this ordering.', ar: 'صح بالترتيب ده.' },
      d: { en: 'Incorrect, fork is listed.', ar: 'غلط، الـ fork موجودة.' },
    },
    takeaway: {
      en: 'fork → create. Watch the option letters across papers.',
      ar: 'fork ← إنشاء. خلي بالك من حروف الاختيارات بين الورق.',
    },
  },
  {
    id: 'c2-fork-exit',
    chapterId: 'chapter-2',
    sectionId: 'c2-syscall-types',
    topic: 'Process-control system calls',
    concept: 'UNIX calls that create and terminate a process',
    difficulty: 'core',
    type: 'mcq',
    origin: 'historical',
    prompt: 'What are the system calls used to create and terminate a process in UNIX?',
    options: [
      { id: 'a', text: 'create() and terminate ()' },
      { id: 'b', text: 'fork() and exit()' },
      { id: 'c', text: 'spawn() and kill()' },
      { id: 'd', text: 'exec() and wait()' },
    ],
    correct: 'b',
    sourceRefs: [
      { examId: 'final_2023', question: 'Q2.37' },
      { examId: 'final_nodate', question: 'Q2.37', note: 'Option a is printed “creat() and terminate()”; otherwise identical.' },
    ],
    answerStatus: 'independently-verified',
    explanation: {
      en: 'UNIX process control is fork(), exit(), wait(). fork() creates and exit() terminates. exec() loads a new program into a process and wait() waits for a child — neither creates nor terminates. spawn()/kill() are not the pair in the table.',
      ar: 'الـ process control في UNIX هو fork() وexit() وwait(). الـ fork() بتنشئ والـ exit() بتنهي. الـ exec() بتحمّل برنامج جديد في process والـ wait() بتستنى child — ولا واحدة فيهم بتنشئ أو بتنهي. والـ spawn()/kill() مش الزوج اللي في الجدول.',
    },
    optionNotes: {
      a: { en: 'Not the UNIX process calls in the lecture table.', ar: 'مش الـ calls بتاعة UNIX اللي في جدول المحاضرة.' },
      b: { en: 'Correct: fork() creates, exit() terminates.', ar: 'صح: fork() بتنشئ وexit() بتنهي.' },
      c: { en: 'Not the textbook pair; kill() sends a signal.', ar: 'مش زوج الكتاب؛ والـ kill() بتبعت signal.' },
      d: { en: 'exec() replaces the program; wait() waits.', ar: 'الـ exec() بتغيّر البرنامج؛ والـ wait() بتستنى.' },
    },
    takeaway: {
      en: 'fork → create, exit → terminate, wait → wait for a child.',
      ar: 'fork ← إنشاء، exit ← إنهاء، wait ← استنى child.',
    },
  },
  {
    id: 'c2-ipc-models-mcq',
    chapterId: 'chapter-2',
    sectionId: 'c2-syscall-types',
    topic: 'Communications system calls',
    concept: 'The two models of interprocess communication',
    difficulty: 'core',
    type: 'mcq',
    origin: 'historical',
    prompt: 'What are the two models of Interprocess communication (IPC)?',
    options: [
      { id: 'a', text: 'Shared memory and message passing' },
      { id: 'b', text: 'Message queue and pipe' },
      { id: 'c', text: 'Semaphore and mutex' },
      { id: 'd', text: 'Signal and socket' },
    ],
    correct: 'a',
    sourceRefs: [
      { examId: 'final_2023', question: 'Q2.38' },
      { examId: 'final_nodate', question: 'Q2.38' },
    ],
    answerStatus: 'independently-verified',
    explanation: {
      en: 'Chapter 2 names both models twice: as the communications service (“via shared memory or through message passing”) and as the communications system calls (“message passing model” and “shared-memory model”). Pipes and message queues are implementations; semaphores and mutexes are synchronization tools; signals and sockets are mechanisms, not the two models. (Chapter 3 studies IPC in depth.)',
      ar: 'Chapter 2 بيذكر الموديلين مرتين: كخدمة communications (“via shared memory or through message passing”) وكـ communications system calls (“message passing model” و“shared-memory model”). الـ pipes والـ message queues طرق تنفيذ؛ والـ semaphores والـ mutexes أدوات synchronization؛ والـ signals والـ sockets آليات، مش الموديلين. (Chapter 3 بيشرح الـ IPC بالتفصيل.)',
    },
    optionNotes: {
      a: { en: 'Correct: the two models.', ar: 'صح: الموديلين بتوع المحاضرة.' },
      b: { en: 'Specific mechanisms, not the models.', ar: 'آليات محددة مش الموديلات.' },
      c: { en: 'Synchronization tools.', ar: 'أدوات synchronization.' },
      d: { en: 'Mechanisms, not the two models.', ar: 'آليات، مش الموديلين.' },
    },
    takeaway: {
      en: 'IPC models: shared memory · message passing.',
      ar: 'موديلات الـ IPC: shared memory · message passing.',
    },
  },
  {
    id: 'c2-ipc-models-fill',
    chapterId: 'chapter-2',
    sectionId: 'c2-syscall-types',
    topic: 'Communications system calls',
    concept: 'Shared memory as one of the two IPC models',
    difficulty: 'core',
    type: 'fill',
    origin: 'historical',
    prompt: '{{1}} and message passing are two basic models for inter-process communication (IPC).',
    blanks: [
      {
        id: 'b1',
        label: 'Blank 1',
        accepted: ['shared memory', 'shared-memory', 'the shared memory', 'shared memory model', 'shared-memory model'],
      },
    ],
    sourceRefs: [{ examId: 'final_nodate2', question: 'Q1.8' }],
    answerStatus: 'independently-verified',
    explanation: {
      en: 'The missing model is shared memory. In the shared-memory model processes “create and gain access to memory regions”; in message passing they “send, receive messages” and the OS moves the packets.',
      ar: 'الموديل الناقص هو الـ shared memory. في الـ shared-memory model الـ processes “create and gain access to memory regions”؛ وفي الـ message passing بيعملوا “send, receive messages” والـ OS بينقل الـ packets.',
    },
    takeaway: {
      en: 'Shared memory = a common region; message passing = the OS moves messages.',
      ar: 'الـ shared memory = منطقة مشتركة؛ والـ message passing = الـ OS بينقل الرسايل.',
    },
  },
  {
    id: 'c2-ipc-operations-2024',
    chapterId: 'chapter-2',
    sectionId: 'c2-syscall-types',
    topic: 'Communications system calls',
    concept: 'The two message-passing operations',
    difficulty: 'core',
    type: 'mcq',
    origin: 'historical',
    prompt: 'Which of the following two operations are provided by the IPC facility?',
    options: [
      { id: 'a', text: 'write & send a message' },
      { id: 'b', text: 'send & receive a message' },
      { id: 'c', text: 'send & read a message' },
      { id: 'd', text: 'receive & read a message' },
    ],
    correct: 'b',
    sourceRefs: [{ examId: 'final_2024', question: 'Q1.49' }],
    answerStatus: 'independently-verified',
    explanation: {
      en: 'The lecture’s communications calls: in the message-passing model processes “send, receive messages to host name or process name”. The two operations are send and receive. “Write” and “read” are file/device operations, not the message-passing pair. (Chapter 3 develops the IPC facility further.)',
      ar: 'الـ communications calls في في الـ message-passing model الـ processes بتعمل “send, receive messages to host name or process name”. العمليتين هما send وreceive. أما “write” و“read” فدي عمليات files/devices، مش زوج الـ message passing. (Chapter 3 بيكمّل شرح الـ IPC facility.)',
    },
    optionNotes: {
      a: { en: 'write is a file/device operation.', ar: 'الـ write عملية file/device.' },
      b: { en: 'Correct: send and receive.', ar: 'صح: send وreceive.' },
      c: { en: 'read is a file/device operation.', ar: 'الـ read عملية file/device.' },
      d: { en: 'read is a file/device operation.', ar: 'الـ read عملية file/device.' },
    },
    takeaway: {
      en: 'Message passing = send() + receive().',
      ar: 'الـ message passing = send() + receive().',
    },
  },
  {
    id: 'c2-ipc-operations-2020',
    chapterId: 'chapter-2',
    sectionId: 'c2-syscall-types',
    topic: 'Communications system calls',
    concept: 'The two message-passing operations (2020 options)',
    difficulty: 'core',
    type: 'mcq',
    origin: 'historical',
    prompt: 'Which of the following two operations are provided by the IPC facility?',
    options: [
      { id: 'a', text: 'write & delete message' },
      { id: 'b', text: 'delete & receive message' },
      { id: 'c', text: 'send & delete message' },
      { id: 'd', text: 'receive & send message' },
    ],
    correct: 'd',
    sourceRefs: [
      {
        examId: 'final_2020',
        question: 'Q2.33',
        note: 'Same stem as Final 2024 Q1.49 but with a different option set.',
      },
    ],
    answerStatus: 'independently-verified',
    explanation: {
      en: 'The only option that pairs the two message-passing operations is (d), receive & send. “Delete” and “write” are not message-passing operations.',
      ar: 'الاختيار الوحيد اللي فيه عمليتين الـ message passing هو (d)، receive & send. و“delete” و“write” مش عمليات message passing.',
    },
    optionNotes: {
      a: { en: 'Neither is a message-passing operation.', ar: 'ولا واحدة عملية message passing.' },
      b: { en: 'delete is not a message-passing operation.', ar: 'الـ delete مش عملية message passing.' },
      c: { en: 'delete is not a message-passing operation.', ar: 'الـ delete مش عملية message passing.' },
      d: { en: 'Correct: receive and send.', ar: 'صح: receive وsend.' },
    },
    takeaway: {
      en: 'Look for the send/receive pair whatever order it is printed in.',
      ar: 'دوّر على زوج send/receive مهما كان ترتيبه.',
    },
  },

  {
    id: 'c2-ipc-models-direct-short',
    chapterId: 'chapter-2',
    sectionId: 'c2-syscall-types',
    topic: 'Communications system calls',
    concept: 'IPC models (Chapter 2) and direct vs indirect communication (Chapter 3)',
    difficulty: 'stretch',
    type: 'short',
    origin: 'historical',
    prompt:
      'Briefly explain the fundamental models of interprocess communication and the difference between direct and indirect communication.',
    modelAnswer:
      'The two fundamental models of interprocess communication are shared memory and message passing. In the shared-memory model, cooperating processes create and gain access to a common memory region and exchange data by reading and writing it. In the message-passing model, processes communicate by sending and receiving messages, which the operating system moves between them. In direct communication each process must explicitly name the other: send(P, message) and receive(Q, message); a link is associated with exactly two processes. In indirect communication messages are sent to and received from mailboxes (ports): send(A, message) and receive(A, message); processes communicate only if they share a mailbox, and a link may be associated with more than two processes.',
    keywordGroups: [
      { label: 'shared memory', patterns: ['shared memory', 'shared-memory'] },
      { label: 'message passing', patterns: ['message passing', 'message-passing', 'send', 'receive'] },
      { label: 'direct: name the other process', patterns: ['direct', 'name'] },
      { label: 'indirect: mailbox / port', patterns: ['mailbox', 'port'] },
    ],
    passRatio: 0.75,
    sourceRefs: [{ examId: 'midterm_2022', question: 'Q4' }],
    answerStatus: 'independently-verified',
    explanation: {
      en: 'A two-part answer. The first half — the two IPC models, shared memory and message passing — is taught in Chapter 2. The second half, direct versus indirect communication, is Chapter 3: in direct communication processes name each other explicitly and a link joins exactly one pair; in indirect communication they communicate through shared mailboxes (ports) and a link may join many processes. The question also appears in the Chapter 3 IPC quiz.',
      ar: 'إجابة من جزئين. الجزء الأول — موديلين الـ IPC، shared memory وmessage passing — اتشرح في Chapter 2. والجزء التاني، direct مقابل indirect communication، في Chapter 3: في الـ direct الـ processes بتسمّي بعض صراحة والـ link بيربط اتنين بالظبط؛ وفي الـ indirect بيتواصلوا عن طريق mailboxes (ports) مشتركة والـ link ممكن يربط processes كتير. والسؤال ده موجود كمان في quiz الـ IPC بتاع Chapter 3.',
    },
    takeaway: {
      en: 'Models: shared memory · message passing. Direct = name the process; indirect = mailbox.',
      ar: 'الموديلات: shared memory · message passing. الـ direct = سمّي الـ process؛ والـ indirect = mailbox.',
    },
  },

  // ─────────────────── Section 4 · System programs, design & implementation ───────────────────
  {
    id: 'c2-system-programs-tf',
    chapterId: 'chapter-2',
    sectionId: 'c2-programs-design',
    topic: 'System programs',
    concept: 'System programs range from thin interfaces to complex tools',
    difficulty: 'core',
    type: 'tf',
    origin: 'historical',
    prompt: 'Some system programs are simply user interfaces to system calls; others are considerably more complex.',
    correct: true,
    sourceRefs: [{ examId: 'final_2020', question: 'Q1.8' }],
    answerStatus: 'independently-verified',
    explanation: {
      en: 'True — this is the lecture nearly word for word. A file-listing command is little more than a front end to a system call, while a compiler or a linkage editor is a large, complex program.',
      ar: 'صح — دي المحاضرة تقريبًا بالحرف. أمر بيعرض الـ files مجرد واجهة لـ system call، لكن الـ compiler أو الـ linkage editor برنامج كبير ومعقد.',
    },
    optionNotes: {
      true: { en: 'Correct: the lecture states this directly.', ar: 'صح: المحاضرة بتقولها صريحة.' },
      false: { en: 'Contradicts the lecture.', ar: 'عكس المحاضرة.' },
    },
    takeaway: {
      en: 'System programs: a convenient environment for development and execution — from thin wrappers to complex tools.',
      ar: 'الـ system programs: بيئة مريحة للتطوير والتنفيذ — من wrappers بسيطة لأدوات معقدة.',
    },
  },
  {
    id: 'c2-policy-definition',
    chapterId: 'chapter-2',
    sectionId: 'c2-programs-design',
    topic: 'OS design and implementation',
    concept: 'Policy versus mechanism',
    difficulty: 'core',
    type: 'mcq',
    origin: 'historical',
    prompt: 'Policy _____',
    options: [
      { id: 'a', text: 'determines how to do something' },
      { id: 'b', text: 'determines what will be done' },
      { id: 'c', text: 'is not likely to change across places' },
      { id: 'd', text: 'is not likely to change over time' },
    ],
    correct: 'b',
    sourceRefs: [{ examId: 'midterm_2021', question: 'Q1.4' }],
    answerStatus: 'independently-verified',
    explanation: {
      en: '“Mechanisms determine how to do something, policies decide what will be done.” Policies are the part that changes — between sites and over time — which is exactly why they are separated from mechanisms. (a) is the definition of mechanism; (c) and (d) reverse the point.',
      ar: '“Mechanisms determine how to do something, policies decide what will be done.” الـ policies هي الجزء اللي بيتغير — من مكان لمكان ومع الوقت — وعشان كده بنفصلها عن الـ mechanisms. (a) تعريف الـ mechanism؛ و(c) و(d) عكس الفكرة.',
    },
    optionNotes: {
      a: { en: 'That defines mechanism.', ar: 'ده تعريف الـ mechanism.' },
      b: { en: 'Correct: policy = what.', ar: 'صح: الـ policy = إيه.' },
      c: { en: 'Policies do vary by place.', ar: 'الـ policies بتتغير من مكان لمكان.' },
      d: { en: 'Policies do change over time.', ar: 'الـ policies بتتغير مع الوقت.' },
    },
    takeaway: {
      en: 'Policy = WHAT. Mechanism = HOW.',
      ar: 'الـ Policy = إيه. والـ Mechanism = إزاي.',
    },
  },
  {
    id: 'c2-policy-mechanism-benefit',
    chapterId: 'chapter-2',
    sectionId: 'c2-programs-design',
    topic: 'OS design and implementation',
    concept: 'Benefit of separating policy from mechanism',
    difficulty: 'core',
    type: 'mcq',
    origin: 'historical',
    prompt:
      'In the context of operating system design, what is the primary benefit of separating policy from mechanism?',
    options: [
      { id: 'a', text: 'It simplifies the implementation of the operating system.' },
      { id: 'b', text: 'It allows for maximum flexibility if policy decisions need to be changed later.' },
      { id: 'c', text: 'It reduces the need for system calls.' },
      { id: 'd', text: 'It improves the performance of the operating system.' },
    ],
    correct: 'b',
    sourceRefs: [{ examId: 'final_2024', question: 'Q1.55' }],
    answerStatus: 'independently-verified',
    explanation: {
      en: 'The separation “allows maximum flexibility if policy decisions are to be changed later”. Changing a policy then needs no change to the mechanism. Simplicity, fewer system calls and speed are not the stated benefit.',
      ar: 'الفصل “allows maximum flexibility if policy decisions are to be changed later”. يعني تغيير الـ policy مش محتاج تغيير الـ mechanism. التبسيط وتقليل الـ system calls والسرعة مش الميزة المذكورة.',
    },
    optionNotes: {
      a: { en: 'Not the stated benefit.', ar: 'مش الميزة المذكورة.' },
      b: { en: 'Correct: flexibility when policies change.', ar: 'صح: مرونة لما الـ policies تتغير.' },
      c: { en: 'Unrelated to system calls.', ar: 'مالهاش علاقة بالـ system calls.' },
      d: { en: 'Not the stated benefit.', ar: 'مش الميزة المذكورة.' },
    },
    takeaway: {
      en: 'Separation of policy and mechanism buys flexibility.',
      ar: 'فصل الـ policy عن الـ mechanism بيدّيك مرونة.',
    },
  },

  // ───────────────────────── Section 5 · OS structures ─────────────────────────
  {
    id: 'c2-layered-2024',
    chapterId: 'chapter-2',
    sectionId: 'c2-structures',
    topic: 'Operating-system structure',
    concept: 'Layered approach: layer 0 hardware, layer N user interface',
    difficulty: 'core',
    type: 'mcq',
    origin: 'historical',
    prompt: 'In the layered approach of Operating Systems',
    options: [
      { id: 'a', text: 'Bottom Layer (0) is the User interface' },
      { id: 'b', text: 'Topmost Layer (N) is the User interface' },
      { id: 'c', text: 'Bottom Layer (N) is the hardware' },
      { id: 'd', text: 'Topmost Layer (N) is the hardware' },
    ],
    correct: 'b',
    sourceRefs: [{ examId: 'final_2024', question: 'Q1.54' }],
    answerStatus: 'independently-verified',
    explanation: {
      en: '“The bottom layer (layer 0) is the hardware; the highest (layer N) is the user interface.” Each layer uses functions and services of only lower-level layers. The other options swap the ends or misnumber the bottom.',
      ar: '“The bottom layer (layer 0) is the hardware; the highest (layer N) is the user interface.” وكل layer بتستخدم functions وservices من الـ layers اللي تحتها بس. باقي الاختيارات بتقلب الطرفين أو بتغلط في رقم الأسفل.',
    },
    optionNotes: {
      a: { en: 'Layer 0 is the hardware.', ar: 'الـ layer 0 هي الـ hardware.' },
      b: { en: 'Correct.', ar: 'صح.' },
      c: { en: 'The bottom is layer 0, not N.', ar: 'الأسفل layer 0 مش N.' },
      d: { en: 'The top is the user interface.', ar: 'الأعلى هو الـ user interface.' },
    },
    takeaway: {
      en: 'Layer 0 = hardware (bottom). Layer N = user interface (top).',
      ar: 'Layer 0 = hardware (تحت). Layer N = user interface (فوق).',
    },
  },
  {
    id: 'c2-layered-2020',
    chapterId: 'chapter-2',
    sectionId: 'c2-structures',
    topic: 'Operating-system structure',
    concept: 'Layered approach (2020 wording)',
    difficulty: 'core',
    type: 'mcq',
    origin: 'historical',
    prompt: 'In the layered approach of Operating Systems ______',
    options: [
      { id: 'a', text: 'Bottom Layer(0) is the User interface' },
      { id: 'b', text: 'Highest Layer(N) is the User interface' },
      { id: 'c', text: 'Bottom Layer(N) is the hardware' },
      { id: 'd', text: 'Highest Layer(N) is the hardware' },
    ],
    correct: 'b',
    sourceRefs: [
      {
        examId: 'final_2020',
        question: 'Q2.41',
        note: 'Same concept as Final 2024 Q1.54, printed with “Highest” instead of “Topmost”.',
      },
    ],
    answerStatus: 'independently-verified',
    explanation: {
      en: 'Same fact as the 2024 version: the highest layer (N) is the user interface and layer 0 is the hardware.',
      ar: 'نفس معلومة نسخة 2024: أعلى layer (N) هي الـ user interface والـ layer 0 هي الـ hardware.',
    },
    optionNotes: {
      a: { en: 'Layer 0 is the hardware.', ar: 'الـ layer 0 هي الـ hardware.' },
      b: { en: 'Correct.', ar: 'صح.' },
      c: { en: 'The bottom is layer 0.', ar: 'الأسفل layer 0.' },
      d: { en: 'The highest layer is the user interface.', ar: 'أعلى layer هي الـ user interface.' },
    },
    takeaway: {
      en: 'Hardware sits at the centre/bottom; the user interface is the outermost/top layer.',
      ar: 'الـ hardware في المركز/تحت؛ والـ user interface هي الطبقة الخارجية/فوق.',
    },
  },
  {
    id: 'c2-microkernel-message-passing',
    chapterId: 'chapter-2',
    sectionId: 'c2-structures',
    topic: 'Microkernel structure',
    concept: 'Communication between user modules',
    difficulty: 'core',
    type: 'mcq',
    origin: 'historical',
    prompt: 'Microkernels use _____ for communication.',
    options: [
      { id: 'a', text: 'message passing' },
      { id: 'b', text: 'shared memory' },
      { id: 'c', text: 'system calls' },
    ],
    correct: 'a',
    sourceRefs: [{ examId: 'midterm_2021', question: 'Q1.2', note: 'The paper prints only three options.' }],
    answerStatus: 'independently-verified',
    explanation: {
      en: 'A microkernel moves as much as possible from the kernel into user space, and “communication takes place between user modules using message passing”. The lecture draws the arrows labelled “messages” between the application, file system and device driver through the microkernel’s interprocess communication.',
      ar: 'الـ microkernel بينقل أكبر قدر ممكن من الـ kernel للـ user space، و“communication takes place between user modules using message passing”. والمحاضرة راسم أسهم مكتوب عليها “messages” بين الـ application والـ file system والـ device driver عن طريق الـ interprocess communication في الـ microkernel.',
    },
    optionNotes: {
      a: { en: 'Correct.', ar: 'صح.' },
      b: { en: 'Shared memory is an IPC model, but not the one the lecture names for microkernels.', ar: 'الـ shared memory موديل IPC، بس مش اللي المحاضرة بتذكره للـ microkernel.' },
      c: { en: 'System calls are how a program enters the kernel, not module-to-module communication.', ar: 'الـ system calls هي طريقة دخول البرنامج للـ kernel، مش التواصل بين الـ modules.' },
    },
    takeaway: {
      en: 'Microkernel = small kernel + user-space services talking by messages (benefits: extensible, portable, reliable, secure; cost: messaging overhead).',
      ar: 'الـ microkernel = kernel صغير + خدمات في user space بتتكلم برسايل (المميزات: سهل التوسيع والـ porting وأكتر reliability وsecurity؛ والعيب: overhead الرسايل).',
    },
  },
  {
    id: 'c2-hybrid',
    chapterId: 'chapter-2',
    sectionId: 'c2-structures',
    topic: 'Hybrid systems',
    concept: 'Modern operating systems combine structures',
    difficulty: 'core',
    type: 'mcq',
    origin: 'historical',
    prompt:
      'Which of the following operating systems is an example of a hybrid system that combines multiple approaches to address performance, security, and usability needs?',
    options: [
      { id: 'a', text: 'MAC OS' },
      { id: 'b', text: 'Linux' },
      { id: 'c', text: 'Windows' },
      { id: 'd', text: 'All of the above' },
    ],
    correct: 'd',
    sourceRefs: [{ examId: 'final_2024', question: 'Q1.56' }],
    answerStatus: 'independently-verified',
    explanation: {
      en: 'The lecture lists all three as hybrids: Linux (and Solaris) are monolithic plus modular; Windows is mostly monolithic plus a microkernel for subsystem personalities; Mac OS X is hybrid and layered (Aqua + Cocoa over Mach, BSD, I/O kit and kernel extensions). So “all of the above”.',
      ar: 'المحاضرة بتذكر التلاتة كـ hybrid: Linux (وSolaris) monolithic + modular؛ وWindows غالبًا monolithic + microkernel لشخصيات الـ subsystems؛ وMac OS X hybrid وlayered (Aqua + Cocoa فوق Mach وBSD وI/O kit والـ kernel extensions). فالإجابة “all of the above”.',
    },
    optionNotes: {
      a: { en: 'True, but not the only one.', ar: 'صح، بس مش الوحيد.' },
      b: { en: 'True, but not the only one.', ar: 'صح، بس مش الوحيد.' },
      c: { en: 'True, but not the only one.', ar: 'صح، بس مش الوحيد.' },
      d: { en: 'Correct: all three are hybrids.', ar: 'صح: التلاتة hybrid.' },
    },
    takeaway: {
      en: 'Most modern OSs are not one pure model.',
      ar: 'معظم الـ OSs الحديثة مش موديل واحد نقي.',
    },
  },
]
