import type { Question } from '../../types'
export const section5Questions: Question[] = [
  {
    id: 's5-three-modes-tf',
    sectionId: 'dual-mode',
    topic: 'Operating-system operations',
    concept: 'Dual-mode operation',
    difficulty: 'core',
    type: 'tf',
    origin: 'historical',
    prompt:
      'To prevent user programs from interfering with the proper operation of the system, the hardware has three modes: user mode, system mode, and kernel mode.',
    correct: false,
    sourceRefs: [
      { examId: 'final_2023', question: 'Q1.30' },
      { examId: 'final_nodate', question: 'Q1.30' },
    ],
    answerStatus: 'independently-verified',
    explanation: {
      en: 'False. The basic dual-mode design has two modes: user mode and kernel mode. “System mode” is commonly used as a synonym for kernel mode, not a third distinct mode. Some CPUs add extra modes (for example, a VMM mode for virtual machines), but that is not the three-mode scheme stated here.',
      ar: 'غلط. التصميم الأساسي dual-mode فيه وضعين: user mode وkernel mode. “system mode” غالبًا مرادف لـ kernel mode، مش وضع ثالث منفصل. بعض الـ CPUs بتضيف أوضاع إضافية زي VMM mode، لكن ده مش النظام الثلاثي اللي الجملة بتقوله.',
    },
    optionNotes: {
      true: { en: 'Incorrect: user and kernel are the two fundamental modes.', ar: 'غلط: user وkernel هما الوضعين الأساسيين.' },
      false: { en: 'Correct: system mode is not a separate third mode in the basic scheme.', ar: 'صح: system mode مش وضع ثالث منفصل في التصميم الأساسي.' },
    },
    takeaway: {
      en: 'Dual-mode = user + kernel. “System mode” is a synonym, not an extra mode.',
      ar: 'dual-mode = user + kernel، و“system mode” مرادف مش وضع زيادة.',
    },
  },
  {
    id: 's5-privileged-tf',
    sectionId: 'dual-mode',
    topic: 'Operating-system operations',
    concept: 'Privileged instructions',
    difficulty: 'core',
    type: 'tf',
    origin: 'historical',
    prompt: 'The hardware allows privileged instructions to be executed only in user mode.',
    correct: false,
    sourceRefs: [{ examId: 'final_2020', question: 'Q1.3' }],
    answerStatus: 'independently-verified',
    explanation: {
      en: 'False. Privileged instructions execute only in kernel mode. The hardware checks the mode bit and traps an attempt to execute a privileged instruction in user mode. This protects the OS and other processes.',
      ar: 'غلط. الـ privileged instructions بتتنفذ في kernel mode فقط. الـ hardware بيتأكد من الـ mode bit ويعمل trap لو user mode حاول ينفذ privileged instruction. ده بيحمي الـ OS والـ processes.',
    },
    optionNotes: {
      true: { en: 'Incorrect: this reverses the protection.', ar: 'غلط: ده بيعكس الحماية.' },
      false: { en: 'Correct: privileged means kernel-mode-only.', ar: 'صح: privileged معناها kernel mode فقط.' },
    },
    takeaway: {
      en: 'Privileged instruction = can execute only when the mode bit says kernel.',
      ar: 'privileged instruction = تتنفذ بس لما الـ mode bit تكون kernel.',
    },
  },
  {
    id: 's5-mode-switch-tf',
    sectionId: 'dual-mode',
    topic: 'Operating-system operations',
    concept: 'User-to-kernel transition',
    difficulty: 'stretch',
    type: 'tf',
    origin: 'historical',
    prompt: 'Switching from User mode to kernel mode is a non-privileged instruction.',
    correct: true,
    sourceRefs: [{ examId: 'midterm_2022', question: 'Q1.2' }],
    answerStatus: 'needs-review',
    unscored: true,
    explanation: {
      en: 'This wording is genuinely ambiguous and is flagged for review. Under the literal reading, user code can invoke a system call or trap instruction, which is executable in user mode; the trap then causes the hardware to switch to kernel mode. So the transition mechanism is not itself a privileged instruction. Under a looser reading, “switching mode” is controlled by the hardware/kernel and cannot be done arbitrarily by user code, which would make the statement false. The key exam-safe fact is: user code cannot directly set the mode bit; it requests a transition through a trap/system call, and privileged instructions then run in kernel mode. The textbook has an exercise listing “switch from user to kernel mode” among instructions to classify, and published solution sets for it disagree — which is why this review item is not counted in your score.',
      ar: 'الصيغة دي فيها ambiguity ومسجلة للمراجعة. لو خدناها حرفيًا، الـ user code يقدر ينادي system call أو trap instruction، والـ trap بعدها بيخلي الـ hardware يحول لـ kernel mode، فوسيلة الانتقال نفسها مش privileged instruction. لو خدناها بمعنى أوسع، “تبديل الـ mode” بيتحكم فيه الـ hardware/الـ kernel ومش أي user code يعمله، فتبقى false. المهم للامتحان: الـ user code مش بيقدر يغير الـ mode bit مباشرة؛ بيطلب الانتقال عن طريق trap/system call، وبعدها الـ privileged instructions بتشتغل في kernel mode. الكتاب فيه تمرين بيطلب تصنيف “switch from user to kernel mode”، وحلول التمرين المنشورة مختلفة مع بعض — وعشان كده السؤال ده مش محسوب في الدرجة.',
    },
    optionNotes: {
      true: { en: 'Best-supported literal reading: a system call/trap is user-executable.', ar: 'القراءة الحرفية الأقرب: system call/trap يقدر user ينفذها.' },
      false: { en: 'Defensible if “switching mode” itself is treated as privileged/controlled.', ar: 'ممكن تكون صح لو “تبديل الـ mode” نفسه considered privileged.' },
    },
    takeaway: {
      en: 'Do not say user code can set the mode bit. It requests a controlled transition via a trap/system call.',
      ar: 'متقولش إن user code بيغير الـ mode bit. هو بيطلب transition من خلال trap/system call.',
    },
  },
  {
    id: 's5-dual-mode-short',
    sectionId: 'dual-mode',
    topic: 'Operating-system operations',
    concept: 'Dual-mode operation, privileged instructions, and protection',
    difficulty: 'stretch',
    type: 'short',
    origin: 'historical',
    prompt:
      'Explain the dual mode operation in operating system. Why and how is it used? What are privileged instructions? Give examples.',
    modelAnswer:
      'Dual-mode operation provides hardware support that distinguishes user code from kernel code using a mode bit. User mode is for application code; kernel mode is for the operating system. The OS runs in kernel mode so it can execute privileged instructions and access protected resources. A system call or trap changes the mode to kernel, runs the requested service, and a return-from-call resets the mode to user. Privileged instructions are instructions that can execute only in kernel mode, such as setting the timer, enabling/disabling interrupts, performing I/O, and changing certain control registers. The mode bit and privileged instructions protect the OS and other processes from erroneous or malicious user programs. A timer is also used to prevent a user program from hogging the CPU: the OS sets a counter, and when it reaches zero the hardware raises an interrupt that returns control to the kernel.',
    keywordGroups: [
      { label: 'user mode', patterns: ['user mode'] },
      { label: 'kernel mode', patterns: ['kernel mode', 'system mode', 'supervisor'] },
      { label: 'mode bit', patterns: ['mode bit'] },
      { label: 'privileged instructions', patterns: ['privileged'] },
      { label: 'system call / trap', patterns: ['system call', 'trap', 'interrupt'] },
      { label: 'protection', patterns: ['protect', 'security', 'isolat'] },
      { label: 'examples', patterns: ['timer', 'i/o', 'interrupt', 'register'] },
    ],
    passRatio: 0.6,
    sourceRefs: [{ examId: 'final_nodate2', question: 'Q2' }],
    answerStatus: 'independently-verified',
    explanation: {
      en: 'A complete answer has four moves: (1) define the two modes and the mode bit; (2) explain why — protection and controlled access to hardware; (3) explain how — system calls/traps enter the kernel and return; (4) define privileged instructions and give examples. Mentioning the timer shows you understand how the OS regains control.',
      ar: 'الإجابة الكاملة فيها أربع خطوات: (1) تعريف الوضعين والـ mode bit؛ (2) ليه — حماية وتحكم في الوصول للـ hardware؛ (3) إزاي — system calls/traps تدخل الـ kernel وترجع؛ (4) تعريف privileged instructions مع أمثلة. ذكر الـ timer بيوضح إنك فاهم إزاي الـ OS يستعيد التحكم.',
    },
    takeaway: {
      en: 'Mode bit + privileged instructions + trap/system call + timer = the complete protection story.',
      ar: 'mode bit + privileged instructions + trap/system call + timer = قصة الحماية كاملة.',
    },
  },
]
