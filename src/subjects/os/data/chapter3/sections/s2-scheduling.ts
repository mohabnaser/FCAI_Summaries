import type { Section } from '../../../types'
import { part, t } from '../../sections/helpers'

/** Slides 11–18: scheduling queues, the three schedulers, process mix and the context switch. */
export const scheduling: Section = {
  id: 'c3-scheduling',
  chapterId: 'chapter-3',
  order: 2,
  kicker: 'Lesson 02',
  title: 'Process Scheduling & Context Switch',
  shortTitle: 'Scheduling & Context Switch',
  summary: t(
    'How the OS keeps the CPU busy: the job, ready and device queues, the long-, short- and medium-term schedulers, why it wants a good mix of I/O-bound and CPU-bound processes, and what a context switch saves and costs.',
    'إزاي الـ OS بيخلي الـ CPU مشغول على طول: الـ job والـ ready والـ device queues، والـ long والـ short والـ medium-term schedulers، وليه عايز mix كويس من I/O-bound وCPU-bound، والـ context switch بيحفظ إيه وبيكلّف قد إيه.',
  ),
  objectives: [
    t('Name the three scheduling queues and what each holds.', 'تذكر الـ scheduling queues التلاتة وكل واحدة فيها إيه.'),
    t('Compare the long-, short- and medium-term schedulers by decision and frequency.', 'تقارن الـ long والـ short والـ medium-term schedulers بالقرار وعدد مرات التشغيل.'),
    t('Describe I/O-bound and CPU-bound processes and why a good mix matters.', 'توصف الـ I/O-bound والـ CPU-bound وليه الـ mix الكويس مهم.'),
    t('Explain what a context switch saves, where, and why it is overhead.', 'تشرح الـ context switch بيحفظ إيه، وفين، وليه هو overhead.'),
  ],
  estimatedMinutes: 15,
  quizId: 'quiz-c3-scheduling',
  crossRefQuestionIds: ['s4-degree-mcq'],
  blocks: [
    {
      kind: 'lead',
      text: t(
        'Goal of process scheduling: **maximize CPU use** and **quickly switch processes onto the CPU** for time sharing. The **process scheduler** selects among the available processes for the next execution on the CPU.',
        'هدف الـ process scheduling: **أقصى استخدام للـ CPU** و**تبديل الـ processes على الـ CPU بسرعة** عشان الـ time sharing. والـ **process scheduler** بيختار من الـ processes المتاحة مين يشتغل بعد كده على الـ CPU.',
      ),
    },

    part(t('Scheduling queues', 'الـ Scheduling queues'), t('Processes migrate among the queues.', 'الـ processes بتتنقل بين الـ queues.')),
    {
      kind: 'cards',
      columns: 3,
      items: [
        { icon: 'users', tag: 'all', title: 'Job queue', body: t('Set of **all processes in the system**.', 'كل **الـ processes اللي في النظام**.'), tone: 'violet' },
        { icon: 'hourglass', tag: 'state: ready', title: 'Ready queue', body: t('Processes **residing in main memory**, ready and waiting to execute.', 'الـ processes **اللي في الـ main memory**، جاهزة ومستنية تتنفّذ.'), tone: 'amber' },
        { icon: 'disk', tag: 'state: waiting', title: 'Device queues', body: t('Processes **waiting for an I/O device** — one queue per device.', 'الـ processes **المستنية جهاز I/O** — queue لكل جهاز.'), tone: 'rose' },
      ],
    },
    {
      kind: 'flow',
      title: t('The queueing diagram', 'الـ Queueing diagram'),
      caption: t(
        'Each queue is a linked list of PCBs with head and tail pointers. A process cycles through until it terminates.',
        'كل queue عبارة عن linked list من الـ PCBs ليها head وtail. والـ process بتلف في الدورة دي لحد ما تخلص.',
      ),
      steps: [
        { icon: 'hourglass', label: 'Ready queue', detail: t('Waits for the CPU.', 'مستنية الـ CPU.'), tone: 'amber' },
        { icon: 'cpu', label: 'CPU', detail: t('Short-term scheduler dispatches it.', 'الـ short-term scheduler بيشغّلها.'), tone: 'cyan' },
        { icon: 'disk', label: 'I/O request → I/O queue', detail: t('Waits in the device queue; on **I/O completion** returns to ready.', 'بتستنى في الـ device queue؛ ولما **الـ I/O يخلص** بترجع ready.'), tone: 'rose' },
        { icon: 'timer', label: 'Time slice expired', detail: t('Goes straight back to the **ready queue**.', 'بترجع على طول للـ **ready queue**.'), tone: 'violet' },
      ],
    },

    part(t('Three schedulers', 'التلات Schedulers')),
    {
      kind: 'cards',
      columns: 3,
      items: [
        {
          icon: 'inbox',
          tag: 'job scheduler',
          title: 'Long-term',
          body: t('Selects which processes are **brought into the ready queue**. Invoked **very infrequently** (seconds, minutes) — may be slow. **Controls the degree of multiprogramming** and strives for a good process mix.', 'بيختار أنهي processes **تدخل الـ ready queue**. بيشتغل **نادرًا جدًا** (ثواني، دقايق) — ممكن يكون بطيء. **بيتحكم في الـ degree of multiprogramming** وبيحاول يعمل process mix كويس.'),
          chips: ['seconds–minutes', 'may be slow'],
          tone: 'violet',
        },
        {
          icon: 'zap',
          tag: 'CPU scheduler',
          title: 'Short-term',
          body: t('Selects which process is **executed next and allocates the CPU**. Invoked **very frequently** (milliseconds) — must be fast. Sometimes the only scheduler in a system.', 'بيختار أنهي process **تتنفّذ بعد كده وبيدّيها الـ CPU**. بيشتغل **كتير جدًا** (milliseconds) — لازم يكون سريع. وساعات بيبقى الـ scheduler الوحيد في النظام.'),
          chips: ['milliseconds', 'must be fast'],
          tone: 'cyan',
        },
        {
          icon: 'refresh',
          tag: 'swapping',
          title: 'Medium-term',
          body: t('Added when the degree of multiprogramming must **decrease**: removes a process from memory, stores it on disk, and later brings it back to continue — **swapping**.', 'بيتضاف لما الـ degree of multiprogramming لازم **يقل**: بيشيل process من الذاكرة، يخزّنها على الـ disk، ويرجّعها بعدين تكمّل — ده الـ **swapping**.'),
          chips: ['swap out', 'swap in'],
          tone: 'teal',
        },
      ],
    },
    {
      kind: 'stats',
      title: t('The primary distinction is frequency', 'الفرق الأساسي هو عدد مرات التشغيل'),
      items: [
        { value: 'ms', label: t('Short-term scheduler: invoked very frequently, must be fast', 'الـ Short-term: بيشتغل كتير جدًا، لازم سريع'), tone: 'cyan', icon: 'zap' },
        { value: 's – min', label: t('Long-term scheduler: invoked very infrequently, may be slow', 'الـ Long-term: بيشتغل نادرًا جدًا، ممكن بطيء'), tone: 'violet', icon: 'clock' },
      ],
    },

    part(t('I/O-bound vs CPU-bound', 'الـ I/O-bound والـ CPU-bound'), t('The long-term scheduler wants a good mix.', 'الـ long-term scheduler عايز mix كويس.')),
    {
      kind: 'versus',
      left: { title: 'I/O-bound', icon: 'disk', tone: 'rose', tagline: t('More time doing I/O', 'وقت أكتر في الـ I/O') },
      right: { title: 'CPU-bound', icon: 'cpu', tone: 'amber', tagline: t('More time computing', 'وقت أكتر في الحساب') },
      rows: [
        { aspect: 'CPU bursts', left: t('**Many short** CPU bursts', 'CPU bursts **كتير وقصيرة**'), right: t('**Few very long** CPU bursts', 'CPU bursts **قليلة وطويلة جدًا**') },
        { aspect: 'If all are this kind', left: t('Ready queue almost always **empty**; short-term scheduler has **little** to do; CPU idle', 'الـ ready queue **فاضية** تقريبًا دايمًا؛ الـ short-term scheduler عنده **شغل قليل**؛ الـ CPU فاضي'), right: t('Ready queue almost always **full**; device queues empty; devices idle', 'الـ ready queue **مليانة** تقريبًا دايمًا؛ الـ device queues فاضية؛ الأجهزة عاطلة') },
      ],
      verdict: t(
        'Either extreme unbalances the system. A **good process mix** keeps the CPU and the I/O devices busy at the same time — there is no rule to prefer CPU-bound work.',
        'أي طرف من الاتنين بيخلّي النظام مش متوازن. الـ **process mix الكويس** بيخلي الـ CPU وأجهزة الـ I/O مشغولين في نفس الوقت — ومفيش قاعدة إننا نفضّل الـ CPU-bound.',
      ),
    },

    part(t('Context switch', 'الـ Context switch')),
    {
      kind: 'flow',
      title: t('CPU switch from process to process', 'الـ CPU بيتنقل من process لـ process'),
      steps: [
        { icon: 'play', label: 'P0 executing', detail: t('P1 is idle.', 'الـ P1 مستنية.'), tone: 'cyan' },
        { icon: 'bell', label: 'Interrupt or system call', detail: t('Control enters the OS.', 'التحكم بيدخل الـ OS.'), tone: 'amber' },
        { icon: 'archive', label: 'Save state into PCB0', detail: t('Program counter, registers, …', 'الـ program counter والـ registers، …'), tone: 'violet' },
        { icon: 'refresh', label: 'Reload state from PCB1', detail: t('The other process’s saved context.', 'الـ context المحفوظ للـ process التانية.'), tone: 'teal' },
        { icon: 'play', label: 'P1 executing', detail: t('P0 is now idle — and the same happens in reverse later.', 'الـ P0 دلوقتي مستنية — ونفس الحكاية بتحصل بالعكس بعدين.'), tone: 'cyan' },
      ],
    },
    {
      kind: 'cards',
      columns: 3,
      items: [
        { icon: 'archive', title: 'What is saved', body: t('The **context** of the process, represented in its **PCB**: program counter, CPU registers, state, … (A TLB is a hardware cache — it need not be saved.)', 'الـ **context** بتاع الـ process، المتمثّل في الـ **PCB**: الـ program counter والـ CPU registers والـ state، … (الـ TLB ده cache في الـ hardware — مش لازم يتحفظ.)'), tone: 'violet' },
        { icon: 'hourglass', title: 'Pure overhead', body: t('Context-switch time is overhead: the system **does no useful work while switching**. The more complex the OS and the PCB, the longer the switch.', 'وقت الـ context switch ده overhead: النظام **مش بيعمل أي شغل مفيد وهو بيبدّل**. وكل ما الـ OS والـ PCB يبقوا أعقد، الـ switch بياخد وقت أطول.'), tone: 'rose' },
        { icon: 'chip', title: 'Hardware support', body: t('Context-switch time is **dependent on hardware support**.', 'وقت الـ context switch **بيعتمد على دعم الـ hardware**.'), tone: 'teal' },
      ],
    },
    {
      kind: 'confusions',
      items: [
        {
          wrong: t('“The long-term scheduler allocates the CPU.”', '“الـ long-term scheduler هو اللي بيدّي الـ CPU.”'),
          right: t('The **short-term** (CPU) scheduler allocates the CPU; the long-term scheduler admits processes to the ready queue.', 'الـ **short-term** (CPU) scheduler هو اللي بيدّي الـ CPU؛ والـ long-term بيدخّل الـ processes الـ ready queue.'),
        },
        {
          wrong: t('“Swapping is done by the long-term scheduler.”', '“الـ swapping بيعمله الـ long-term scheduler.”'),
          right: t('Swapping is the **medium-term** scheduler.', 'الـ swapping ده شغل الـ **medium-term** scheduler.'),
        },
        {
          wrong: t('“An I/O-bound process has a few long CPU bursts.”', '“الـ I/O-bound عنده CPU bursts قليلة وطويلة.”'),
          right: t('I/O-bound: **many short** CPU bursts. CPU-bound: few very long ones.', 'الـ I/O-bound: **كتير وقصيرة**. الـ CPU-bound: قليلة وطويلة جدًا.'),
        },
      ],
    },
    {
      kind: 'exam',
      title: t('Exam radar: the busiest section of Chapter 3', 'رادار الامتحان: أكتر section مزدحم في Chapter 3'),
      body: t(
        'Fifteen items. **Five** are about the schedulers (short- vs long-term frequency appears in three papers; the short-term definition; ready queue + short-term scheduler; when the long-term scheduler runs) plus the device queue. **Four** test the process mix — including the 2020 reversal of “all I/O-bound”, shown for review and not scored. **Five** test the context switch: what is saved, what need not be (TLB), two fill-ins, and its other names. The degree-of-multiprogramming MCQ is implemented in Chapter 1 and included here.',
        'خمستاشر سؤال. **خمسة** عن الـ schedulers (الفرق في عدد مرات التشغيل جه في تلات امتحانات؛ وتعريف الـ short-term؛ والـ ready queue مع الـ short-term scheduler؛ وإمتى الـ long-term بيشتغل) ومعاهم الـ device queue. **أربعة** عن الـ process mix — منهم نسخة 2020 اللي عكست “all I/O-bound”، ودي معروضة للمراجعة ومش محسوبة. **خمسة** عن الـ context switch: بيحفظ إيه، وإيه مش لازم (الـ TLB)، واتنين fill-in، وأساميه التانية. وسؤال الـ degree of multiprogramming متنفّذ في Chapter 1 ومعروض هنا.',
      ),
      refs: [
        'c3-scheduler-frequency',
        'c3-short-term-definition',
        'c3-ready-queue-selection',
        'c3-device-queue',
        'c3-long-term-invoked-tf',
        'c3-cpu-bound-preference-tf',
        'c3-io-bound-ready-queue',
        'c3-cpu-bound-ready-queue',
        'c3-io-bound-bursts',
        'c3-context-switch-saves',
        'c3-context-switch-tlb',
        'c3-context-switch-fill',
        'c3-context-switch-names',
        'c3-context-switch-state-fill',
        's4-degree-mcq',
      ],
    },
    {
      kind: 'recap',
      items: [
        t('Queues: job (all), ready (in memory, waiting for CPU), device (waiting for I/O).', 'الـ Queues: job (الكل)، ready (في الذاكرة ومستنية الـ CPU)، device (مستنية I/O).'),
        t('Long-term: into ready queue, rare, controls degree of multiprogramming.', 'الـ Long-term: يدخّل الـ ready queue، نادر، بيتحكم في الـ degree of multiprogramming.'),
        t('Short-term: picks next process and allocates CPU, every few ms, must be fast.', 'الـ Short-term: بيختار اللي بعدها ويدّيها الـ CPU، كل كام ms، لازم سريع.'),
        t('Medium-term: swapping out to disk and back in.', 'الـ Medium-term: swapping للـ disk والرجوع.'),
        t('I/O-bound = many short CPU bursts; CPU-bound = few long ones; aim for a good mix.', 'الـ I/O-bound = bursts كتير وقصيرة؛ الـ CPU-bound = قليلة وطويلة؛ والهدف mix كويس.'),
        t('Context switch: save old state to PCB, load new from PCB — overhead, hardware-dependent.', 'الـ Context switch: احفظ القديمة في الـ PCB وحمّل الجديدة منه — overhead وبيعتمد على الـ hardware.'),
      ],
    },
  ],
  examFocus: [
    t('Short-term vs long-term scheduler: the primary distinction is the frequency of execution.', 'الـ Short-term مقابل الـ long-term: الفرق الأساسي هو عدد مرات التشغيل.'),
    t('A process is selected from the ready queue by the short-term scheduler.', 'الـ process بتتختار من الـ ready queue بواسطة الـ short-term scheduler.'),
    t('A context switch saves the registers and program counter in the PCB; it is overhead.', 'الـ context switch بيحفظ الـ registers والـ program counter في الـ PCB؛ وهو overhead.'),
  ],
  keyTerms: [
    { term: 'Ready queue', definition: t('Processes in main memory, ready and waiting to execute.', 'الـ processes اللي في الـ main memory، جاهزة ومستنية تتنفّذ.') },
    { term: 'Device queue', definition: t('Processes waiting for a particular I/O device.', 'الـ processes المستنية جهاز I/O معيّن.') },
    { term: 'Long-term scheduler', definition: t('Job scheduler: chooses which processes enter the ready queue; controls the degree of multiprogramming.', 'الـ Job scheduler: بيختار مين يدخل الـ ready queue؛ وبيتحكم في الـ degree of multiprogramming.') },
    { term: 'Short-term scheduler', definition: t('CPU scheduler: chooses the next process to run and allocates the CPU.', 'الـ CPU scheduler: بيختار الـ process اللي هتشتغل بعد كده وبيدّيها الـ CPU.') },
    { term: 'Medium-term scheduler', definition: t('Reduces the degree of multiprogramming by swapping processes out and back in.', 'بيقلل الـ degree of multiprogramming عن طريق swapping للـ processes برّه وجوّه.') },
    { term: 'Context switch', definition: t('Saving the old process’s state and loading the new one’s from their PCBs.', 'حفظ حالة الـ process القديمة وتحميل حالة الجديدة من الـ PCBs بتاعتهم.') },
  ],
}
