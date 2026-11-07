import type { Question } from '../../types'
export const section1Questions: Question[] = [
  {
    id: 's1-kernel-not-true',
    sectionId: 'os-intro',
    topic: 'Operating system definition',
    concept: 'Kernel vs. full operating system',
    difficulty: 'core',
    type: 'mcq',
    origin: 'historical',
    prompt: 'Which one of the following is not true?',
    options: [
      { id: 'a', text: 'The kernel is the program that constitutes the central core of the operating system.' },
      { id: 'b', text: 'The kernel is the first part of the operating system to load into memory during booting.' },
      {
        id: 'c',
        text: 'The kernel is made of various modules which cannot be loaded into the running operating system.',
      },
      { id: 'd', text: 'The kernel remains in the memory during the entire computer session.' },
    ],
    correct: 'c',
    sourceRefs: [
      { examId: 'final_2023', question: 'Q2.31' },
      { examId: 'final_nodate', question: 'Q2.31' },
    ],
    answerStatus: 'independently-verified',
    explanation: {
      en: 'Option (c) is false. Modern kernels are commonly modular: loadable kernel modules can be inserted and removed while the system is running (for example, Linux `.ko` modules and Windows drivers). The other three statements describe the kernel correctly: it is the central core, it is loaded during boot, and it stays resident.',
      ar: 'الجملة الغلط هي (c). نوى أنظمة التشغيل الحديثة غالبًا modular، يعني تقدر تحمّل modules جديدة وتشيلها والـ system شغال، زي drivers في Linux وWindows. إنما الـ kernel فعلًا هو الـ central core، وبيتحمّل أثناء الـ boot، ويفضل resident في الـ memory طول الجلسة.',
    },
    optionNotes: {
      a: { en: 'True. The kernel is the core program that manages the system.', ar: 'صح: الـ kernel هو الـ core program اللي بيدير الـ system.' },
      b: { en: 'True. The bootstrap loads the kernel early in the boot sequence.', ar: 'صح: الـ bootstrap بيحمّل الـ kernel في أول الـ boot.' },
      c: {
        en: 'False — this is the exception. Loadable kernel modules can be added to a running kernel.',
        ar: 'غلط: فيه loadable kernel modules بتتحمّل والـ kernel شغال.',
      },
      d: { en: 'True. The kernel remains memory-resident while the computer is running.', ar: 'صح: الـ kernel بيفضل في الـ memory طول ما الجهاز شغال.' },
    },
    takeaway: {
      en: 'Do not confuse “the operating system” with “everything shipped on the installation media.” The kernel is the always-resident core; modules, system programs, and applications are separate layers.',
      ar: 'متخلطش بين الـ OS وبين كل حاجة بتتثبت معاه. الـ kernel هو الـ core اللي دايمًا resident، وباقي الـ modules والـ system programs والـ applications طبقات تانية.',
    },
    hint: { en: 'Think about Linux device drivers and loadable modules.', ar: 'افتكر drivers وmodules في Linux.' },
  },
  {
    id: 's1-kernel-fill',
    sectionId: 'os-intro',
    topic: 'Operating system definition',
    concept: 'The kernel',
    difficulty: 'core',
    type: 'fill',
    origin: 'historical',
    prompt: 'The one program running at all times on a computer is called a {{1}}.',
    blanks: [
      {
        id: 'b1',
        label: 'Blank 1',
        accepted: ['kernel', 'the kernel', 'operating system kernel', 'os kernel'],
      },
    ],
    sourceRefs: [
      { examId: 'final_nodate2', question: 'Q1.1' },
      { examId: 'midterm_2022', question: 'Q2.1' },
    ],
    answerStatus: 'independently-verified',
    explanation: {
      en: 'The kernel is the one program that runs at all times. Everything else is either a system program shipped with the operating system or an application program. This is the textbook’s working definition, not a universal legal definition.',
      ar: 'الـ kernel هو البرنامج الوحيد اللي بيشتغل طول الوقت. أي حاجة تانية إما system program جاية مع الـ OS أو application program. دي تعريف عملية من الكتاب، مش تعريف رسمي واحد متفق عليه.',
    },
    takeaway: {
      en: 'Kernel = always-running core. System programs and applications are not the kernel.',
      ar: 'الـ kernel هو الـ core اللي دايمًا شغال، مش كل البرامج اللي بتتثبت مع الـ OS.',
    },
  },
  {
    id: 's1-define-os',
    sectionId: 'os-intro',
    topic: 'Operating system definition',
    concept: 'Definition of an operating system',
    difficulty: 'core',
    type: 'short',
    origin: 'historical',
    prompt: 'Briefly define the following term: Operating System.',
    modelAnswer:
      'An operating system is a program that acts as an intermediary between the user of a computer and the computer hardware. It provides an environment in which user programs can execute conveniently and efficiently, and it manages the hardware resources — CPU time, memory, storage, and I/O devices — as a resource allocator and control program.',
    keywordGroups: [
      { label: 'intermediary / interface', patterns: ['intermediary', 'interface', 'between user', 'between the user'] },
      { label: 'hardware', patterns: ['hardware'] },
      { label: 'program execution / convenience', patterns: ['execute', 'execution', 'convenient', 'environment'] },
      { label: 'resource management', patterns: ['resource', 'allocat', 'manag', 'control'] },
    ],
    passRatio: 0.6,
    sourceRefs: [{ examId: 'midterm_2022', question: 'Q3.1' }],
    answerStatus: 'independently-verified',
    explanation: {
      en: 'A strong definition has two sides. From the user side, the OS is an intermediary that makes the computer convenient to use and lets programs execute. From the system side, it is a resource allocator and a control program that manages CPU time, memory, storage, and I/O. There is no single universally accepted boundary for what is “part of” the OS.',
      ar: 'التعريف القوي ليه وشين: من ناحية الـ user، الـ OS وسيط بيخلي الجهاز سهل الاستخدام وبيشغّل البرامج. ومن ناحية الـ system، هو resource allocator وcontrol program بيدير الـ CPU time والـ memory والـ storage والـ I/O. ومفيش حد رسمي واحد بيقول إيه بالظبط “جزء من الـ OS”.',
    },
    takeaway: {
      en: 'Mention both the user view (convenience, program execution) and the system view (resource allocation, control).',
      ar: 'اذكر الـ user view والـ system view مع بعض، مش تعريف واحد بس.',
    },
  },
]
