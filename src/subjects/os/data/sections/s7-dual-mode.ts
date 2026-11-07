import type { Section } from '../../types'
import { part, t } from './helpers'

/** Slides 33–34: interrupts and traps in operation, dual mode, privileged instructions, multi-mode, timer. */
export const dualMode: Section = {
  id: 'dual-mode',
  order: 7,
  kicker: 'Lesson 07',
  title: 'Dual-Mode Operation & the Timer',
  shortTitle: 'Dual Mode & Timer',
  summary: t(
    'How the OS protects itself from the programs it runs: a hardware mode bit separates user mode from kernel mode, privileged instructions only run in kernel mode, system calls cross the boundary in a controlled way, and a timer guarantees the OS gets the CPU back.',
    'إزاي الـ OS بيحمي نفسه من البرامج اللي بيشغّلها: mode bit في الـ hardware بيفصل user mode عن kernel mode، والـ privileged instructions بتشتغل في kernel mode بس، والـ system calls بتعدّي الحدود بطريقة متحكم فيها، والـ timer بيضمن إن الـ OS ياخد الـ CPU تاني.',
  ),
  objectives: [
    t('Name the problems dual mode protects against: errors, infinite loops, processes modifying each other or the OS.', 'تذكر المشاكل اللي الـ dual mode بيحمي منها: الأخطاء، الـ infinite loops، والـ processes اللي بتعدّل في بعض أو في الـ OS.'),
    t('Explain user mode, kernel mode, the mode bit and privileged instructions, with examples.', 'تشرح user mode وkernel mode والـ mode bit والـ privileged instructions، بأمثلة.'),
    t('Trace a system call from user mode to kernel mode and back.', 'تتابع system call من user mode لـ kernel mode والرجوع.'),
    t('Explain multi-mode CPUs (VMM mode) and how the timer prevents a process from hogging the CPU.', 'تشرح الـ multi-mode CPUs (VMM mode) وإزاي الـ timer بيمنع process إنها تحتكر الـ CPU.'),
  ],
  estimatedMinutes: 14,
  quizId: 'quiz-dual-mode',
  blocks: [
    part(
      t('What the OS must defend against', 'الـ OS لازم يدافع ضد إيه'),
      t(
        'The lecture begins by recalling that the OS is **interrupt driven by hardware** — and that software creates interrupts too.',
        'المحاضرة بتبدأ بتذكيرك إن الـ OS **interrupt driven بالـ hardware** — وإن الـ software كمان بيعمل interrupts.',
      ),
    ),
    {
      kind: 'cards',
      columns: 3,
      items: [
        {
          icon: 'zap',
          tag: 'hardware',
          title: 'Interrupts',
          body: t('Devices interrupt the CPU to get the OS’s attention.', 'الأجهزة بتعمل interrupt للـ CPU عشان تلفت نظر الـ OS.'),
          tone: 'cyan',
        },
        {
          icon: 'bug',
          tag: 'software',
          title: 'Exceptions / traps',
          body: t('A software **error** or **request** creates an exception or trap — e.g. **division by zero**, or a **request for an OS service**.', '**Error** أو **طلب** من الـ software بيعمل exception أو trap — زي **القسمة على صفر**، أو **طلب خدمة من الـ OS**.'),
          tone: 'amber',
        },
        {
          icon: 'alert',
          tag: 'process problems',
          title: 'Misbehaving processes',
          body: t('An **infinite loop**, or processes **modifying each other or the operating system**.', '**Infinite loop**، أو processes **بتعدّل في بعض أو في الـ operating system**.'),
          tone: 'rose',
        },
      ],
    },

    part(
      t('Dual-mode operation', 'الـ Dual-mode operation'),
      t(
        'Dual mode **allows the OS to protect itself and other system components**.',
        'الـ dual mode **بيخلّي الـ OS يحمي نفسه ويحمي باقي مكونات النظام**.',
      ),
    ),
    {
      kind: 'versus',
      left: { title: 'User mode', icon: 'user', tone: 'amber', tagline: t('Where application code runs', 'المكان اللي الـ application code بيشتغل فيه') },
      right: { title: 'Kernel mode', icon: 'shield', tone: 'cyan', tagline: t('Where the OS runs — also called system, supervisor or privileged mode', 'المكان اللي الـ OS بيشتغل فيه — واسمه كمان system أو supervisor أو privileged mode') },
      rows: [
        { aspect: 'Mode bit', left: t('**1** (textbook convention)', '**1** (حسب الكتاب)'), right: t('**0** (textbook convention)', '**0** (حسب الكتاب)') },
        { aspect: 'Runs', left: t('User code', 'User code'), right: t('Kernel code', 'Kernel code') },
        { aspect: 'Privileged instructions', left: t('**Not allowed** — attempting one traps to the OS', '**مش مسموح** — لو حاول يبقى trap للـ OS'), right: t('**Allowed** — the only mode that may execute them', '**مسموح** — الـ mode الوحيد اللي ينفذهم') },
        { aspect: 'Entered by', left: t('Return from a system call', 'الرجوع من system call'), right: t('A system call, trap or interrupt', 'System call أو trap أو interrupt') },
      ],
      verdict: t(
        'The **mode bit is provided by hardware** so the system can always tell whether it is running user code or kernel code — the OS cannot be talked out of it by software.',
        'الـ **mode bit بييجي من الـ hardware** عشان النظام يعرف دايمًا هو شغال user code ولا kernel code — والـ software ما يقدرش يضحك عليه.',
      ),
    },
    {
      kind: 'definition',
      term: 'Privileged instruction',
      definition: t(
        'An instruction **designated as privileged**: executable **only in kernel mode**.',
        'Instruction **متصنفة privileged**: ينفع تتنفذ **في kernel mode بس**.',
      ),
      detail: t(
        'Typical examples (textbook): setting the timer, turning interrupts off, doing I/O directly, modifying the device-status table, clearing memory, and changing memory-protection registers. If user code tries one, the hardware treats it as illegal and traps to the OS.',
        'أمثلة معتادة (من الكتاب): ضبط الـ timer، قفل الـ interrupts، عمل I/O مباشرة، تعديل الـ device-status table، مسح الـ memory، وتغيير registers حماية الـ memory. لو user code حاول ينفّذ واحدة، الـ hardware بيعتبرها illegal ويعمل trap للـ OS.',
      ),
    },
    {
      kind: 'visual',
      id: 'dual-mode',
      title: t('Mode transitions: system call, timer, illegal instruction', 'انتقالات الـ mode: system call وtimer وinstruction غير مسموحة'),
      caption: t(
        'For each scenario, note who causes the switch into kernel mode — it is always a trap or interrupt, never user code flipping the bit itself.',
        'في كل سيناريو، لاحظ مين بيسبب التحويل لـ kernel mode — دايمًا trap أو interrupt، عمره ما يكون user code بيقلب الـ bit بنفسه.',
      ),
    },
    {
      kind: 'flow',
      title: t('Transition from user to kernel mode', 'الانتقال من user mode لـ kernel mode'),
      steps: [
        { icon: 'user', label: 'User process executing', detail: t('Mode bit = 1 (user).', 'Mode bit = 1 (user).'), tone: 'amber' },
        { icon: 'send', label: 'Calls a system call', detail: t('The program asks the OS for a service.', 'البرنامج بيطلب خدمة من الـ OS.'), tone: 'violet' },
        { icon: 'zap', label: 'Trap — mode bit = 0', detail: t('**System call changes mode to kernel.**', '**الـ system call بتغيّر الـ mode لـ kernel.**'), tone: 'rose' },
        { icon: 'shield', label: 'Execute system call', detail: t('Kernel code runs with full privilege.', 'كود الـ kernel بيشتغل بكل الصلاحيات.'), tone: 'cyan' },
        { icon: 'refresh', label: 'Return — mode bit = 1', detail: t('**Return from call resets it to user.**', '**الرجوع من الـ call بيرجّعه user.**'), tone: 'teal' },
      ],
    },
    {
      kind: 'cards',
      title: t('Beyond two modes', 'أكتر من وضعين'),
      columns: 2,
      items: [
        {
          icon: 'layers',
          title: 'Multi-mode operation',
          tag: 'increasingly common',
          body: t(
            'Increasingly, CPUs support **multi-mode operations** — for example a **virtual machine manager (VMM) mode** for guest VMs. This is an extra hardware mode for virtualization.',
            'الـ CPUs بقت بشكل متزايد بتدعم **multi-mode operations** — زي **virtual machine manager (VMM) mode** للـ guest VMs. وده mode إضافي في الـ hardware عشان الـ virtualization.',
          ),
          tone: 'violet',
        },
        {
          icon: 'scale',
          title: 'The basic protection model is still two modes',
          tag: 'user + kernel',
          body: t(
            'Dual-mode operation is defined by exactly two modes, **user mode and kernel mode** — “system mode” is just another name for kernel mode, not a third mode.',
            'الـ dual-mode operation متعرّف بوضعين بالظبط، **user mode وkernel mode** — و“system mode” ده اسم تاني للـ kernel mode، مش mode تالت.',
          ),
          tone: 'cyan',
        },
      ],
    },

    part(
      t('The timer', 'الـ timer'),
      t(
        'Dual mode alone cannot stop an **infinite loop** running happily in user mode. The timer can.',
        'الـ dual mode لوحده ما يقدرش يوقف **infinite loop** شغال بمزاجه في user mode. الـ timer يقدر.',
      ),
    ),
    {
      kind: 'flow',
      title: t('Timer to prevent infinite loops and resource hogging', 'الـ timer عشان يمنع الـ infinite loops واحتكار الموارد'),
      steps: [
        { icon: 'settings', label: 'Set before scheduling', detail: t('The OS sets the timer **before scheduling** a process.', 'الـ OS بيضبط الـ timer **قبل ما يعمل schedule** للـ process.'), tone: 'cyan' },
        { icon: 'timer', label: 'Fixed or variable period', detail: t('Interrupt after a specific period; the OS **initializes a counter**.', 'Interrupt بعد مدة معيّنة؛ والـ OS **بيبدأ counter**.'), tone: 'violet' },
        { icon: 'clock', label: 'Counter decremented', detail: t('Every clock tick lowers the counter.', 'كل clock tick بيقلّل الـ counter.'), tone: 'amber' },
        { icon: 'bell', label: 'Reaches zero → interrupt', detail: t('**When the counter reaches zero, an interrupt is generated.**', '**لما الـ counter يوصل صفر، بيتعمل interrupt.**'), tone: 'rose' },
        { icon: 'shield', label: 'OS regains control', detail: t('Reschedule, or **terminate a program that exceeds its agreed time**.', 'يعمل reschedule، أو **ينهي برنامج عدّى الوقت المتفق عليه**.'), tone: 'teal' },
      ],
    },
    {
      kind: 'hook',
      title: t('Two locks on the machine', 'قفلين على الجهاز'),
      phrase: 'Dual mode guards the instructions; the timer guards the CPU time.',
      body: t(
        'Setting the timer is itself privileged — otherwise a program could simply switch it off.',
        'ضبط الـ timer نفسه privileged — وإلا أي برنامج كان هيقفله وخلاص.',
      ),
    },
    {
      kind: 'confusions',
      items: [
        {
          wrong: t('“Privileged instructions are for user programs that need power.”', '“الـ privileged instructions للبرامج اللي محتاجة صلاحيات.”'),
          right: t('Privileged instructions execute **only in kernel mode**; user programs must ask through a system call.', 'الـ privileged instructions بتتنفذ **في kernel mode بس**؛ والبرامج لازم تطلب عن طريق system call.'),
        },
        {
          wrong: t('“A program enters kernel mode by setting the mode bit to 0.”', '“البرنامج بيدخل kernel mode لما يحط الـ mode bit بـ 0.”'),
          right: t('Only a **trap, system call or interrupt** switches the mode; the hardware changes the bit.', 'بس **trap أو system call أو interrupt** هو اللي بيغيّر الـ mode؛ والـ hardware هو اللي بيغيّر الـ bit.'),
        },
        {
          wrong: t('“The timer is needed only for time-sharing.”', '“الـ timer محتاجينه في الـ time-sharing بس.”'),
          right: t('It exists to **prevent infinite loops and resource hogging** in any system — time-sharing just uses it often.', 'موجود عشان **يمنع الـ infinite loops واحتكار الموارد** في أي نظام — الـ time-sharing بس بيستخدمه كتير.'),
        },
      ],
    },
    {
      kind: 'callout',
      tone: 'warning',
      title: t('One past-exam statement here is genuinely ambiguous', 'فيه جملة من امتحان قديم هنا ملتبسة فعلًا'),
      body: t(
        'Midterm 2022 asks whether switching from user mode to kernel mode is a non-privileged instruction. The instruction user code runs to get there (the system-call/trap instruction) is not privileged, yet the mode change itself is performed by hardware and is never done freely by user code. Published answer sets disagree, so the quiz shows both readings and does not count it in your score.',
        'امتحان الـ Midterm 2022 بيسأل هل التحويل من user mode لـ kernel mode instruction مش privileged. الـ instruction اللي الـ user code بينفّذها عشان يوصل (system-call/trap instruction) مش privileged، بس تغيير الـ mode نفسه بيعمله الـ hardware وعمر الـ user code ما بيعمله بحرية. إجابات المراجع المنشورة مختلفة، فالـ quiz بيعرض القراءتين ومش بيحسبه في درجتك.',
      ),
    },
    {
      kind: 'exam',
      title: t('Exam radar: modes and privileges', 'رادار الامتحان: الأوضاع والصلاحيات'),
      body: t(
        'Two T/F statements change one word of the lecture: the number and names of the modes, and the mode in which privileged instructions run. The written question asks you to explain dual mode — **why** (protection), **how** (mode bit, system call/trap, return), **privileged instructions**, and **examples**. Add the timer for full marks.',
        'جملتين T/F كل واحدة بتغيّر كلمة واحدة من المحاضرة: عدد وأسامي الـ modes، والـ mode اللي الـ privileged instructions بتشتغل فيه. والسؤال المكتوب بيطلب تشرح الـ dual mode — **ليه** (protection)، **إزاي** (mode bit وsystem call/trap والرجوع)، **privileged instructions**، و**أمثلة**. ضيف الـ timer عشان الدرجة الكاملة.',
      ),
      refs: ['s5-three-modes-tf', 's5-privileged-tf', 's5-mode-switch-tf', 's5-dual-mode-short'],
    },
    {
      kind: 'recap',
      items: [
        t('Dual mode lets the OS protect itself and other components.', 'الـ dual mode بيخلّي الـ OS يحمي نفسه وباقي المكونات.'),
        t('Two modes: user and kernel; the mode bit is provided by hardware.', 'وضعين: user وkernel؛ والـ mode bit بييجي من الـ hardware.'),
        t('Privileged instructions run only in kernel mode.', 'الـ privileged instructions بتشتغل في kernel mode بس.'),
        t('System call → kernel mode; return from call → user mode.', 'System call ← kernel mode؛ الرجوع من الـ call ← user mode.'),
        t('Multi-mode CPUs add e.g. a VMM mode for guest VMs.', 'الـ multi-mode CPUs بتضيف مثلًا VMM mode للـ guest VMs.'),
        t('Timer: counter set before scheduling → zero → interrupt → OS regains control.', 'الـ timer: counter بيتضبط قبل الـ scheduling ← صفر ← interrupt ← الـ OS بياخد التحكم.'),
      ],
    },
  ],
  examFocus: [
    t('Dual-mode operation has two modes — user mode and kernel mode — distinguished by a hardware mode bit.', 'الـ dual-mode operation فيه وضعين — user mode وkernel mode — والـ mode bit في الـ hardware بيفرّق بينهم.'),
    t('Privileged instructions are executable only in kernel mode; give examples (timer, interrupts, I/O).', 'الـ privileged instructions بتتنفذ في kernel mode بس؛ واذكر أمثلة (timer وinterrupts وI/O).'),
    t('A system call changes the mode to kernel; the return resets it to user.', 'الـ system call بتغيّر الـ mode لـ kernel؛ والرجوع بيرجّعه user.'),
    t('The timer interrupts after a set period so the OS regains control from a looping or hogging process.', 'الـ timer بيعمل interrupt بعد مدة محددة عشان الـ OS ياخد التحكم من process عالقة في loop أو محتكرة.'),
  ],
  keyTerms: [
    { term: 'Dual-mode operation', definition: t('Hardware-supported split between user mode and kernel mode.', 'تقسيم مدعوم من الـ hardware بين user mode وkernel mode.') },
    { term: 'Mode bit', definition: t('Hardware bit telling whether user code or kernel code is running.', 'Bit في الـ hardware بيقول هل اللي شغال user code ولا kernel code.') },
    { term: 'Privileged instruction', definition: t('Instruction executable only in kernel mode.', 'Instruction بتتنفذ في kernel mode بس.') },
    { term: 'System call', definition: t('Request for an OS service; switches the CPU to kernel mode.', 'طلب خدمة من الـ OS؛ بيحوّل الـ CPU لـ kernel mode.') },
    { term: 'VMM mode', definition: t('An extra CPU mode for virtual machine managers (multi-mode operation).', 'Mode إضافي في الـ CPU للـ virtual machine managers (multi-mode operation).') },
    { term: 'Timer', definition: t('Counter that interrupts after a period so the OS regains control.', 'Counter بيعمل interrupt بعد مدة عشان الـ OS ياخد التحكم تاني.') },
  ],
}
