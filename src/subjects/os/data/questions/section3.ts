import type { Question } from '../../types'
export const section3Questions: Question[] = [
  {
    id: 's3-multiprocessor-tf',
    sectionId: 'system-architecture',
    topic: 'Computer-system architecture',
    concept: 'Multiprocessor organization',
    difficulty: 'core',
    type: 'tf',
    origin: 'historical',
    prompt:
      'Multiprocessor systems have two or more processors in close communication, sharing the computer bus with separate clock, memory, and peripheral devices.',
    correct: false,
    sourceRefs: [{ examId: 'final_2020', question: 'Q1.2' }],
    answerStatus: 'independently-verified',
    explanation: {
      en: 'False. Multiprocessors share the computer bus and may also share the clock, memory, and peripheral devices. The statement says “separate clock, memory, and peripheral devices,” which is the opposite of the usual shared-resource organization.',
      ar: 'غلط. الـ multiprocessors بتشارك الـ computer bus، وممكن كمان تشارك الـ clock والـ memory والـ peripheral devices. الجملة بتقول “separate” وده عكس التنظيم المعتاد القائم على المشاركة.',
    },
    optionNotes: {
      true: { en: 'Incorrect: the usual design shares the bus and often memory/peripherals.', ar: 'غلط: التصميم المعتاد بيشارك الـ bus وغالبًا الـ memory والـ peripherals.' },
      false: { en: 'Correct: “separate clock, memory, and peripherals” makes the statement false.', ar: 'صح: كلمة separate هي اللي بتخلي الجملة غلط.' },
    },
    takeaway: {
      en: 'Multiprocessors = processors in close communication sharing the bus, and often memory and peripherals.',
      ar: 'الـ multiprocessors = processors قريبة من بعضها وبتشارك الـ bus وغالبًا الـ memory والـ peripherals.',
    },
  },
  {
    id: 's3-reliability-tf',
    sectionId: 'system-architecture',
    topic: 'Computer-system architecture',
    concept: 'Advantages of multiprocessors',
    difficulty: 'core',
    type: 'tf',
    origin: 'historical',
    prompt:
      'Multiprocessor architecture increases the overall system throughput and decreases the system reliability.',
    correct: false,
    sourceRefs: [{ examId: 'midterm_2022', question: 'Q1.4' }],
    answerStatus: 'independently-verified',
    explanation: {
      en: 'False. Multiprocessors can increase throughput and economy of scale, and they increase reliability through graceful degradation or fault tolerance. They do not decrease reliability.',
      ar: 'غلط. الـ multiprocessors بترفع الـ throughput وeconomy of scale، وكمان بتزود الـ reliability عن طريق graceful degradation أو fault tolerance. مش بتقلل الـ reliability.',
    },
    optionNotes: {
      true: { en: 'Incorrect: reliability is an advantage, not a disadvantage.', ar: 'غلط: الـ reliability ميزة مش عيب.' },
      false: { en: 'Correct: the second half contradicts the reliability advantage.', ar: 'صح: الجزء التاني بيخالف ميزة الـ reliability.' },
    },
    takeaway: {
      en: 'Three classic multiprocessor advantages: increased throughput, economy of scale, increased reliability.',
      ar: 'تلات مميزات كلاسيكية: throughput أعلى، economy of scale، وreliability أعلى.',
    },
  },
  {
    id: 's3-smp-fill',
    sectionId: 'system-architecture',
    topic: 'Computer-system architecture',
    concept: 'Asymmetric vs. symmetric multiprocessing',
    difficulty: 'core',
    type: 'fill',
    origin: 'historical',
    prompt:
      '{{1}} and {{2}} multiprocessing are the two types of multiprocessor systems.',
    blanks: [
      { id: 'b1', label: 'Blank 1', accepted: ['asymmetric'] },
      { id: 'b2', label: 'Blank 2', accepted: ['symmetric'] },
    ],
    sourceRefs: [{ examId: 'midterm_2022', question: 'Q2.3' }],
    answerStatus: 'independently-verified',
    explanation: {
      en: 'The two types are asymmetric multiprocessing (AMP) and symmetric multiprocessing (SMP). In AMP, one processor may act as a master and assign work to others; in SMP, all processors are peers, each running the OS and scheduling work independently.',
      ar: 'النوعين هما asymmetric multiprocessing (AMP) وsymmetric multiprocessing (SMP). في AMP ممكن processor يكون master ويوزع الشغل على الباقي، أما في SMP كل الـ processors متساويين وكل واحد بيشغّل الـ OS ويجدول بشكل مستقل.',
    },
    takeaway: {
      en: 'AMP = master/worker roles; SMP = peer processors sharing memory and OS responsibilities.',
      ar: 'AMP = master/worker، وSMP = processors متساويين وبيشاركوا الـ memory ومسؤوليات الـ OS.',
    },
  },
  {
    id: 's3-multicore-short',
    sectionId: 'system-architecture',
    topic: 'Computer-system architecture',
    concept: 'Multiprocessors vs. multi-core',
    difficulty: 'core',
    type: 'short',
    origin: 'historical',
    prompt: 'What is the difference between Multiprocessors and Multi-core?',
    modelAnswer:
      'A multiprocessor system contains two or more processors in close communication, typically on separate chips, sharing the computer bus and often memory and peripherals. A multi-core design places multiple CPU cores on a single chip; each core has its own registers and cache, and the cores share the on-chip resources and memory. Multi-core is a compact way to obtain multiprocessor-style parallelism on one chip.',
    keywordGroups: [
      { label: 'two or more processors', patterns: ['two or more', 'multiple processors', 'several processors'] },
      { label: 'single chip for cores', patterns: ['single chip', 'same chip', 'one chip'] },
      { label: 'cores', patterns: ['core'] },
      { label: 'shared bus/memory/resources', patterns: ['share', 'shared', 'bus', 'memory'] },
      { label: 'parallelism/communication', patterns: ['parallel', 'communication', 'close'] },
    ],
    passRatio: 0.6,
    sourceRefs: [{ examId: 'midterm_2021', question: 'Q2.1' }],
    answerStatus: 'independently-verified',
    explanation: {
      en: 'The contrast is packaging and scale. Multiprocessor systems use multiple processors (often separate chips) that communicate closely and share resources. Multi-core systems put multiple cores on one chip. Both provide parallelism; do not treat “multi-core” as meaning “multiple separate computers.”',
      ar: 'الفرق في التغليف والحجم. الـ multiprocessor بيستخدم أكتر من processor، غالبًا على chips منفصلة، بيتواصلوا ويشاركوا resources. الـ multi-core بيحط أكتر من core على chip واحدة. الاتنين بيوفروا parallelism، ومش معنى multi-core إنهم أجهزة منفصلة.',
    },
    takeaway: {
      en: 'Multiprocessor = multiple processors (often chips); multi-core = multiple cores on one chip.',
      ar: 'Multiprocessor = processors متعددة غالبًا chips، وmulti-core = cores متعددة على chip واحدة.',
    },
  },
]
