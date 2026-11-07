import type { Section } from '../../../types'
import { part, t } from '../../sections/helpers'

/** Slides 3–10: what a process is, its memory layout, its five states and its PCB. */
export const processConcept: Section = {
  id: 'c3-process-concept',
  chapterId: 'chapter-3',
  order: 1,
  kicker: 'Lesson 01',
  title: 'The Process: Memory, States & PCB',
  shortTitle: 'The Process',
  summary: t(
    'A process is a program in execution. This lesson covers what it holds in memory (text, data, heap, stack), the five states it moves through, and the Process Control Block the OS keeps for it.',
    'الـ process هي برنامج شغال. الدرس ده بيشرح هي شايلة إيه في الذاكرة (text وdata وheap وstack)، والخمس حالات اللي بتعدّي بيها، والـ Process Control Block اللي الـ OS بيحتفظ بيه ليها.',
  ),
  objectives: [
    t('Explain why a program is passive and a process is active.', 'تشرح ليه الـ program passive والـ process active.'),
    t('Place every part of a process — text, data, heap, stack, PC and registers — in its correct place.', 'تحط كل جزء من الـ process — text وdata وheap وstack وPC وregisters — في مكانه الصح.'),
    t('Name the five states and the event behind every arrow of the state diagram.', 'تذكر الخمس حالات والحدث اللي ورا كل سهم في الـ state diagram.'),
    t('List what the PCB stores and why the OS needs it.', 'تعدّ الـ PCB بيخزّن إيه وليه الـ OS محتاجه.'),
  ],
  estimatedMinutes: 16,
  quizId: 'quiz-c3-process-concept',
  crossRefQuestionIds: ['s6-process-fill', 's6-define-process', 's6-program-vs-process'],
  blocks: [
    {
      kind: 'lead',
      text: t(
        'A **process** is a program in execution — the basis of all computation. Its execution must progress in a **sequential fashion**. (The textbook uses *job* and *process* almost interchangeably: batch systems run jobs, time-shared systems run user programs or tasks.)',
        'الـ **process** هي برنامج في حالة تنفيذ — وهي أساس كل الحسابات. وتنفيذها لازم يمشي **بالترتيب (sequential)**. (الكتاب بيستخدم *job* و*process* كأنهم نفس الحاجة تقريبًا: الـ batch systems بتشغّل jobs، والـ time-shared systems بتشغّل user programs أو tasks.)',
      ),
    },

    part(t('Program vs process', 'الـ Program والـ Process')),
    {
      kind: 'versus',
      left: { title: 'Program', icon: 'file', tone: 'violet', tagline: t('Passive entity', 'كيان passive') },
      right: { title: 'Process', icon: 'play', tone: 'cyan', tagline: t('Active entity', 'كيان active') },
      rows: [
        { aspect: 'Where', left: t('Stored on **disk** as an executable file', 'متخزّن على الـ **disk** كـ executable file'), right: t('Loaded into **memory** and running', 'متحمّل في الـ **memory** وشغال') },
        { aspect: 'Has', left: t('Only code', 'كود بس'), right: t('Code **plus current activity**: program counter, registers, stack, data, heap', 'كود **ومعاه current activity**: program counter وregisters وstack وdata وheap') },
        { aspect: 'Count', left: t('One program …', 'برنامج واحد …'), right: t('… can be **several processes** (many users running the same program)', '… ممكن يبقى **كذا process** (كذا user شغّالين نفس البرنامج)') },
      ],
      verdict: t(
        'A program **becomes a process when its executable file is loaded into memory** — started by a GUI mouse click, by typing its name on the command line, etc.',
        'البرنامج **بيتحوّل لـ process لما الـ executable file بتاعه يتحمّل في الذاكرة** — لما تدوس عليه بالماوس في الـ GUI، أو تكتب اسمه في الـ command line، إلخ.',
      ),
    },

    part(t('A process in memory', 'الـ Process في الذاكرة'), t('Four regions plus the current activity.', 'أربع مناطق ومعاهم الـ current activity.')),
    {
      kind: 'layers',
      title: t('Process in memory', 'الـ Process في الذاكرة'),
      axis: { top: 'max', bottom: '0' },
      layers: [
        { label: 'Stack ↓', icon: 'layers', tone: 'cyan', detail: t('Temporary data: **function parameters, return addresses, local variables**. Grows downward.', 'داتا مؤقتة: **function parameters وreturn addresses وlocal variables**. بيكبر لتحت.') },
        { label: 'free space', tone: 'violet', detail: t('The gap that the stack and the heap grow into.', 'الفراغ اللي الـ stack والـ heap بيكبروا فيه.') },
        { label: 'Heap ↑', icon: 'boxes', tone: 'amber', detail: t('Memory **dynamically allocated during run time**. Grows upward.', 'ذاكرة **بتتحجز dynamically وقت التشغيل**. بيكبر لفوق.') },
        { label: 'Data', icon: 'database', tone: 'teal', detail: t('**Global variables**.', '**الـ Global variables**.') },
        { label: 'Text', icon: 'code', tone: 'rose', detail: t('The **program code** (text section).', '**كود البرنامج** (الـ text section).') },
      ],
      caption: t(
        'Not a region: the **current activity** — the program counter and the processor registers — lives in the CPU and is saved in the PCB.',
        'مش منطقة في الذاكرة: الـ **current activity** — الـ program counter والـ processor registers — موجودة في الـ CPU وبتتحفظ في الـ PCB.',
      ),
    },
    {
      kind: 'visual',
      id: 'process-memory',
      title: t('Where does it live?', 'مكانه فين؟'),
      caption: t(
        'Pick an item and place it. Three past papers ask what the stack does — and does not — contain.',
        'اختار حاجة وحطها في مكانها. تلات امتحانات سألوا الـ stack فيه إيه — ومش فيه إيه.',
      ),
    },

    part(t('Five process states', 'الخمس حالات'), t('As a process executes, it changes state.', 'والـ process شغالة، حالتها بتتغير.')),
    {
      kind: 'cards',
      columns: 3,
      items: [
        { icon: 'plus', tag: 'state 1', title: 'new', body: t('The process is being **created**.', 'الـ process بتت**عمل**.'), tone: 'violet' },
        { icon: 'hourglass', tag: 'state 2', title: 'ready', body: t('Waiting to be **assigned to a processor**.', 'مستنية **يتخصصلها processor**.'), tone: 'amber' },
        { icon: 'cpu', tag: 'state 3', title: 'running', body: t('Instructions are **being executed**.', 'التعليمات **بتتنفّذ**.'), tone: 'cyan' },
        { icon: 'pause', tag: 'state 4', title: 'waiting', body: t('Waiting for **some event** to occur (e.g. I/O completion).', 'مستنية **حدث** يحصل (زي إن الـ I/O يخلص).'), tone: 'rose' },
        { icon: 'check', tag: 'state 5', title: 'terminated', body: t('Has **finished** execution.', '**خلصت** تنفيذ.'), tone: 'teal' },
      ],
    },
    {
      kind: 'visual',
      id: 'process-states',
      title: t('Drive a process through the state diagram', 'مشّي process في الـ state diagram'),
      caption: t(
        'Fire the events and watch which state — and which queue — the process lands in. Only legal arrows are enabled.',
        'اضغط على أحداث المحاضرة وشوف الـ process بتروح أنهي حالة — وأنهي queue. الأسهم الصح بس هي اللي شغالة.',
      ),
    },
    {
      kind: 'confusions',
      items: [
        {
          wrong: t('“Ready means waiting for an event.”', '“الـ Ready يعني مستنية حدث.”'),
          right: t('Ready waits for the **CPU**; **waiting** waits for an event.', 'الـ Ready مستنية الـ **CPU**؛ والـ **waiting** هي اللي مستنية حدث.'),
        },
        {
          wrong: t('“When its time slice ends, the process goes to waiting.”', '“لما الـ time slice يخلص، الـ process بتروح waiting.”'),
          right: t('Time slice over = **interrupt → ready**. Only an I/O or event wait leads to waiting.', 'الـ time slice خلص = **interrupt ← ready**. الـ I/O أو انتظار حدث بس هو اللي بيودّي waiting.'),
        },
        {
          wrong: t('“A waiting process goes straight back to running.”', '“الـ process اللي في waiting بترجع running على طول.”'),
          right: t('On completion it goes to **ready** and waits for scheduler dispatch.', 'لما الحدث يخلص بتروح **ready** وتستنى الـ scheduler dispatch.'),
        },
      ],
    },

    part(t('Process Control Block (PCB)', 'الـ Process Control Block (PCB)'), t('The record the OS keeps for every process.', 'السجل اللي الـ OS بيحتفظ بيه لكل process.')),
    {
      kind: 'cards',
      columns: 3,
      intro: t(
        'The PCB is a **data structure** — the “information associated with each process”. The lecture draws it as stacked fields: process state, process number, program counter, registers, memory limits, list of open files, …',
        'الـ PCB هو **data structure** — “information associated with each process”. والمحاضرة بترسمه كخانات فوق بعض: process state وprocess number وprogram counter وregisters وmemory limits وlist of open files، …',
      ),
      items: [
        { icon: 'signal', title: 'Process state', body: t('running, waiting, etc.', 'running أو waiting، إلخ.'), tone: 'cyan' },
        { icon: 'target', title: 'Program counter', body: t('Location of the **next instruction** to execute.', 'مكان **التعليمة الجاية** اللي هتتنفّذ.'), tone: 'amber' },
        { icon: 'chip', title: 'CPU registers', body: t('Contents of all process-centric registers.', 'محتوى كل الـ registers الخاصة بالـ process.'), tone: 'violet' },
        { icon: 'list', title: 'CPU-scheduling info', body: t('Priorities, scheduling-queue pointers.', 'الـ priorities ومؤشرات الـ scheduling queues.'), tone: 'rose' },
        { icon: 'memory', title: 'Memory-management info', body: t('Memory allocated to the process.', 'الذاكرة المحجوزة للـ process.'), tone: 'teal' },
        { icon: 'clock', title: 'Accounting info', body: t('CPU used, clock time elapsed since start, time limits.', 'الـ CPU المستخدم، والوقت من ساعة ما بدأت، وحدود الوقت.'), tone: 'lime' },
        { icon: 'folder', title: 'I/O status info', body: t('I/O devices allocated to the process, **list of open files**.', 'أجهزة الـ I/O المحجوزة للـ process، و**قايمة الـ files المفتوحة**.'), tone: 'amber' },
      ],
    },
    {
      kind: 'exam',
      title: t('Exam radar: states and the stack are asked every year', 'رادار الامتحان: الحالات والـ stack بيتسألوا كل سنة'),
      body: t(
        'Thirteen past-exam items. **Three** ask about the stack (two “does not contain” versions with different fourth options, one fill-in). **Five** test the states: definitions of waiting and ready, a T/F that swaps them, every arrow into ready, and the running → ready move when a time slot ends. **Two** are about the PCB. Three more — define a process, “a ___ is a program in execution”, passive vs active — are implemented in Chapter 1 and included here.',
        'تلاتاشر سؤال من الامتحانات. **تلاتة** عن الـ stack (نسختين “does not contain” باختيار رابع مختلف، وواحد fill-in). **خمسة** عن الحالات: تعريف الـ waiting والـ ready، وT/F بيبدّلهم، وكل الأسهم اللي داخلة على ready، والانتقال من running لـ ready لما الـ time slot يخلص. **اتنين** عن الـ PCB. وتلاتة كمان — عرّف الـ process، و“a ___ is a program in execution”، والـ passive مقابل active — متنفّذين في Chapter 1 ومعروضين هنا.',
      ),
      refs: [
        'c3-stack-not-global',
        'c3-stack-not-pid',
        'c3-stack-temporary-data',
        'c3-waiting-state',
        'c3-ready-state',
        'c3-ready-state-tf',
        'c3-ready-transitions',
        'c3-timeslice-ready-fill',
        'c3-pcb-purpose',
        'c3-pcb-data-structure',
        's6-process-fill',
        's6-define-process',
        's6-program-vs-process',
      ],
    },
    {
      kind: 'recap',
      items: [
        t('Process = program in execution; program passive (disk), process active (memory).', 'الـ Process = برنامج شغال؛ الـ program passive (على الـ disk)، والـ process active (في الذاكرة).'),
        t('Stack: parameters, return addresses, locals. Data: globals. Heap: run-time allocation. Text: code.', 'الـ Stack: parameters وreturn addresses وlocals. الـ Data: globals. الـ Heap: حجز وقت التشغيل. الـ Text: الكود.'),
        t('States: new · ready · running · waiting · terminated.', 'الحالات: new · ready · running · waiting · terminated.'),
        t('Into ready: admitted, I/O or event completion, interrupt. Ready → running: scheduler dispatch.', 'داخل على ready: admitted وI/O or event completion وinterrupt. من ready لـ running: scheduler dispatch.'),
        t('Running → waiting: I/O or event wait. Running → terminated: exit.', 'من running لـ waiting: I/O or event wait. من running لـ terminated: exit.'),
        t('PCB = data structure: state, PC, registers, scheduling, memory, accounting, I/O status.', 'الـ PCB = data structure: state وPC وregisters وscheduling وmemory وaccounting وI/O status.'),
      ],
    },
  ],
  examFocus: [
    t('A process stack holds function parameters, return addresses and local variables — never global variables.', 'الـ stack فيه function parameters وreturn addresses وlocal variables — عمره ما فيه global variables.'),
    t('Ready = waiting for the CPU; waiting = waiting for an event; a finished time slice sends a process to ready.', 'الـ Ready = مستنية الـ CPU؛ الـ waiting = مستنية حدث؛ ولما الـ time slice يخلص الـ process بتروح ready.'),
    t('The PCB is a data structure that stores the process state, program counter, registers and other attributes.', 'الـ PCB هو data structure بيخزّن الـ process state والـ program counter والـ registers وباقي الخصائص.'),
  ],
  keyTerms: [
    { term: 'Process', definition: t('A program in execution; an active entity.', 'برنامج في حالة تنفيذ؛ كيان active.') },
    { term: 'Text section', definition: t('The program code of a process.', 'كود البرنامج بتاع الـ process.') },
    { term: 'Stack', definition: t('Temporary data: function parameters, return addresses, local variables.', 'داتا مؤقتة: function parameters وreturn addresses وlocal variables.') },
    { term: 'Heap', definition: t('Memory dynamically allocated during run time.', 'ذاكرة بتتحجز dynamically وقت التشغيل.') },
    { term: 'Ready state', definition: t('Waiting to be assigned to a processor.', 'مستنية يتخصصلها processor.') },
    { term: 'Waiting state', definition: t('Waiting for some event to occur.', 'مستنية حدث يحصل.') },
    { term: 'PCB', definition: t('Per-process data structure holding state, PC, registers, scheduling, memory, accounting and I/O information.', 'Data structure لكل process فيه الـ state والـ PC والـ registers ومعلومات الـ scheduling والـ memory والـ accounting والـ I/O.') },
  ],
}
