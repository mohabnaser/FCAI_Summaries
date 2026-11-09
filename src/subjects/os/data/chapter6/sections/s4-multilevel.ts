import type { Section } from '../../../types'
import { part, t } from '../../sections/helpers'

/** Multilevel queue, multilevel feedback queue, multiple-processor scheduling, NUMA, load balancing. */
export const multilevel: Section = {
  id: 'c6-multilevel',
  chapterId: 'chapter-6',
  order: 4,
  kicker: 'Lesson 04',
  title: 'Multilevel Queues & Multiple-Processor Scheduling',
  shortTitle: 'Multilevel & Multiprocessor',
  summary: t(
    'Combining algorithms: the multilevel queue (fixed queues, each with its own algorithm, scheduled by fixed priority or time slices) and the multilevel feedback queue, where processes move between queues. Then scheduling with several CPUs: asymmetric vs symmetric multiprocessing, processor affinity, NUMA memory and load balancing by push and pull migration.',
    'دمج الـ algorithms: الـ multilevel queue (queues ثابتة، كل واحدة ليها algorithm، وبينهم fixed priority أو time slices) والـ multilevel feedback queue اللي الـ processes بتتنقل فيها بين الـ queues. وبعدين الـ scheduling مع كذا CPU: الـ asymmetric قصاد الـ symmetric multiprocessing، والـ processor affinity، وذاكرة الـ NUMA، والـ load balancing بالـ push والـ pull migration.',
  ),
  objectives: [
    t('Describe a multilevel queue and the two ways of scheduling between its queues.', 'توصف الـ multilevel queue والطريقتين اللي بيتعمل بيهم scheduling بين الـ queues.'),
    t('List the parameters of a multilevel feedback queue and trace a job through the three-queue example.', 'تذكر parameters الـ multilevel feedback queue وتتابع job في مثال التلات queues.'),
    t('Contrast asymmetric multiprocessing and SMP, and define processor affinity (soft / hard).', 'تفرّق بين الـ asymmetric multiprocessing والـ SMP، وتعرّف الـ processor affinity (soft / hard).'),
    t('Explain NUMA locality and load balancing with push and pull migration.', 'تشرح الـ locality في الـ NUMA والـ load balancing بالـ push والـ pull migration.'),
  ],
  estimatedMinutes: 14,
  quizId: 'quiz-c6-multilevel',
  blocks: [
    {
      kind: 'lead',
      text: t(
        'Real systems run very different kinds of work at once — interactive editors next to overnight batch jobs. Instead of forcing one algorithm on all of them, split the ready queue into **several queues** and give each kind of work the algorithm that suits it.',
        'الأنظمة الحقيقية بتشغّل أنواع شغل مختلفة جدًا في نفس الوقت — editors تفاعلية جنب batch jobs بالليل. فبدل ما تفرض algorithm واحد على الكل، قسّم الـ ready queue لـ **كذا queue** وادّي كل نوع شغل الـ algorithm اللي يناسبه.',
      ),
    },

    part(t('Multilevel queue', 'الـ Multilevel queue'), t('Permanent queues, each with its own algorithm.', 'queues ثابتة، كل واحدة ليها algorithm.')),
    {
      kind: 'versus',
      left: { title: 'Foreground (interactive)', icon: 'keyboard', tone: 'cyan', tagline: t('Needs quick response', 'محتاج استجابة سريعة') },
      right: { title: 'Background (batch)', icon: 'archive', tone: 'violet', tagline: t('Needs throughput', 'محتاج throughput') },
      rows: [
        { aspect: 'Algorithm', left: t('**RR**', '**RR**'), right: t('**FCFS**', '**FCFS**') },
        { aspect: 'Membership', left: t('A process is **permanently** in its queue', 'الـ process بتفضل في الـ queue بتاعتها **على طول**'), right: t('A process is **permanently** in its queue', 'الـ process بتفضل في الـ queue بتاعتها **على طول**') },
      ],
      verdict: t(
        'The ready queue is partitioned into separate queues, and **each queue has its own scheduling algorithm**.',
        'الـ ready queue بتتقسم لـ queues منفصلة، و**كل queue ليها scheduling algorithm خاص بيها**.',
      ),
    },
    {
      kind: 'cards',
      columns: 2,
      intro: t('Scheduling must also be done **between** the queues:', 'ولازم يتعمل scheduling **بين** الـ queues كمان:'),
      items: [
        {
          icon: 'trending',
          tag: 'option 1',
          title: 'Fixed-priority scheduling',
          body: t('Serve all from foreground, then from background. **Possibility of starvation**: background never runs while foreground work exists.', 'اخدم كل الـ foreground، وبعدين الـ background. **احتمال starvation**: الـ background عمره ما يشتغل طول ما فيه شغل foreground.'),
          tone: 'rose',
        },
        {
          icon: 'split',
          tag: 'option 2',
          title: 'Time slice',
          body: t('Each queue gets a certain amount of CPU time, e.g. **80% to foreground in RR, 20% to background in FCFS**.', 'كل queue بتاخد نسبة من وقت الـ CPU، زي **80% للـ foreground بالـ RR و20% للـ background بالـ FCFS**.'),
          tone: 'teal',
        },
      ],
    },
    {
      kind: 'layers',
      title: t('Five queues, from highest to lowest priority', 'خمس queues من الأعلى أولوية للأقل'),
      axis: { top: 'highest priority', bottom: 'lowest priority' },
      layers: [
        { label: 'system processes', icon: 'settings', tone: 'rose' },
        { label: 'interactive processes', icon: 'keyboard', tone: 'amber' },
        { label: 'interactive editing processes', icon: 'file', tone: 'cyan' },
        { label: 'batch processes', icon: 'archive', tone: 'violet' },
        { label: 'student processes', icon: 'users', tone: 'teal' },
      ],
      caption: t(
        'With fixed priority, a batch process runs only when the three queues above it are empty — and a student process only when all four are.',
        'مع الـ fixed priority، الـ batch process مبتشتغلش غير لما التلات queues اللي فوقها يفضوا — والـ student process غير لما الأربعة يفضوا.',
      ),
    },

    part(t('Multilevel feedback queue', 'الـ Multilevel feedback queue'), t('Processes can move between the queues.', 'الـ processes تقدر تتنقل بين الـ queues.')),
    {
      kind: 'definition',
      term: 'Multilevel feedback queue',
      definition: t(
        'A process **can move between the various queues**. Moving a process that waited too long to a higher queue implements **aging**.',
        'الـ process **تقدر تتنقل بين الـ queues المختلفة**. ونقل process استنت كتير لـ queue أعلى هو تنفيذ للـ **aging**.',
      ),
    },
    {
      kind: 'cards',
      columns: 3,
      intro: t('A multilevel-feedback-queue scheduler is defined by:', 'الـ scheduler بتاع الـ multilevel feedback queue بيتحدد بـ:'),
      items: [
        { icon: 'layers', title: 'Number of queues', body: t('How many levels.', 'كام مستوى.'), tone: 'cyan' },
        { icon: 'settings', title: 'Algorithm per queue', body: t('The scheduling algorithm of each queue.', 'الـ scheduling algorithm لكل queue.'), tone: 'violet' },
        { icon: 'trending', title: 'When to upgrade', body: t('The method to move a process up.', 'إمتى ننقل process لفوق.'), tone: 'teal' },
        { icon: 'refresh', title: 'When to demote', body: t('The method to move a process down.', 'إمتى ننقل process لتحت.'), tone: 'amber' },
        { icon: 'inbox', title: 'Where to enter', body: t('Which queue a process enters when it needs service.', 'الـ process تدخل أنهي queue لما تحتاج خدمة.'), tone: 'rose' },
      ],
    },
    {
      kind: 'layers',
      title: t('The three-queue example', 'مثال التلات queues'),
      layers: [
        { label: 'Q0 — RR, quantum 8 ms', tone: 'cyan', detail: t('New jobs enter here and get **8 ms** when they gain the CPU. Not finished → moved to Q1.', 'الـ jobs الجديدة بتدخل هنا وبتاخد **8 ms** لما تمسك الـ CPU. مخلصتش ← تنزل Q1.') },
        { label: 'Q1 — RR, quantum 16 ms', tone: 'violet', detail: t('Served only when Q0 is empty; the job gets **16 more ms**. Not finished → preempted and moved to Q2.', 'بتتخدم بس لما Q0 تبقى فاضية؛ والـ job بتاخد **16 ms كمان**. مخلصتش ← preempt وتنزل Q2.') },
        { label: 'Q2 — FCFS', tone: 'amber', detail: t('Served only when Q0 and Q1 are empty; runs to completion.', 'بتتخدم بس لما Q0 وQ1 يفضوا؛ وبتكمّل لحد ما تخلص.') },
      ],
      caption: t(
        'Short, interactive bursts finish in Q0 with excellent response; long CPU-bound jobs sink to the bottom. The scheduler learns a process’s behaviour from how it uses its quantum.',
        'الـ bursts القصيرة التفاعلية بتخلص في Q0 بـ response ممتاز؛ والـ jobs الطويلة الـ CPU-bound بتنزل لتحت. الـ scheduler بيتعلم طبيعة الـ process من طريقة استخدامها للـ quantum.',
      ),
    },
    {
      kind: 'visual',
      id: 'mlfq-sim',
      title: t('Follow three jobs through the feedback queues', 'تابع تلات jobs في الـ feedback queues'),
      caption: t(
        'All three jobs start in Q0. Watch who is demoted, and notice that a lower queue runs only when every queue above it is empty.',
        'التلات jobs بيبدأوا في Q0. شوف مين بينزل، وخد بالك إن الـ queue اللي تحت مبتشتغلش غير لما كل اللي فوقها يفضى.',
      ),
    },

    part(t('Multiple-processor scheduling', 'الـ Multiple-processor scheduling'), t('More CPUs, more decisions.', 'CPUs أكتر، قرارات أكتر.')),
    {
      kind: 'lead',
      text: t(
        'CPU scheduling becomes **more complex** when multiple CPUs are available. The lecture assumes **homogeneous processors** — any of them can run any process.',
        'الـ CPU scheduling بيبقى **أعقد** لما يبقى فيه كذا CPU. والمحاضرة بتفترض **homogeneous processors** — أي واحد فيهم يقدر يشغّل أي process.',
      ),
    },
    {
      kind: 'versus',
      left: { title: 'Asymmetric multiprocessing', icon: 'server', tone: 'violet', tagline: t('One master processor', 'processor واحد master') },
      right: { title: 'Symmetric multiprocessing (SMP)', icon: 'boxes', tone: 'cyan', tagline: t('Each processor is self-scheduling', 'كل processor بيعمل scheduling لنفسه') },
      rows: [
        { aspect: 'System data structures', left: t('Only **one processor** accesses them — no sharing problems', '**processor واحد بس** بيوصل لها — مفيش مشاكل مشاركة'), right: t('Every processor accesses them', 'كل processor بيوصل لها') },
        { aspect: 'Other processors', left: t('Execute user code only', 'بينفّذوا user code بس'), right: t('Schedule themselves', 'بيعملوا scheduling لنفسهم') },
        { aspect: 'Ready queue', left: t('Kept by the master', 'مع الـ master'), right: t('One **common** ready queue, or a **private** queue per processor', 'ready queue **مشتركة** واحدة، أو queue **خاصة** لكل processor') },
      ],
      verdict: t('SMP is currently the **most common** arrangement.', 'الـ SMP هو الترتيب **الأشهر** حاليًا.'),
    },
    {
      kind: 'cards',
      columns: 3,
      items: [
        { icon: 'link', tag: 'affinity', title: 'Processor affinity', body: t('A process has an affinity for the processor on which it is **currently running** — its data is in that CPU’s cache.', 'الـ process ليها affinity للـ processor اللي **شغالة عليه دلوقتي** — لأن الداتا بتاعتها في الـ cache بتاعه.'), tone: 'cyan' },
        { icon: 'shield', tag: 'variations', title: 'Soft vs hard affinity', body: t('**Soft**: the OS tries to keep the process there but may move it. **Hard**: the process stays on its CPU (or set).', '**Soft**: الـ OS بيحاول يخليها عليه بس ممكن ينقلها. **Hard**: الـ process بتفضل على الـ CPU بتاعها (أو مجموعته).'), tone: 'violet' },
        { icon: 'boxes', tag: 'variations', title: 'Processor sets', body: t('A process may be limited to a chosen **set** of processors.', 'الـ process ممكن تتحدد بـ **مجموعة (set)** processors معينة.'), tone: 'teal' },
      ],
    },
    {
      kind: 'layers',
      title: t('NUMA: where memory lives matters', 'الـ NUMA: مكان الذاكرة بيفرق'),
      layers: [
        { label: 'CPU A → its own memory', icon: 'zap', tone: 'teal', detail: t('**Fast access** — local memory.', '**وصول سريع** — ذاكرة محلية.') },
        { label: 'CPU A → the other node’s memory', icon: 'hourglass', tone: 'rose', detail: t('**Slow access** — remote memory across the interconnect.', '**وصول بطيء** — ذاكرة بعيدة عبر الـ interconnect.') },
      ],
      caption: t(
        'In a non-uniform-memory-access computer each CPU has fast local memory and slower remote memory. **Memory-placement algorithms can also consider affinity**: keep a process on the CPU next to its memory.',
        'في كمبيوتر الـ non-uniform memory access كل CPU عنده ذاكرة محلية سريعة وذاكرة بعيدة أبطأ. و**خوارزميات وضع الذاكرة ممكن تراعي الـ affinity كمان**: خلّي الـ process على الـ CPU اللي جنب ذاكرتها.',
      ),
    },
    {
      kind: 'definition',
      term: 'Load balancing',
      definition: t(
        'With SMP, all CPUs should be loaded for efficiency: load balancing attempts to keep the workload **evenly distributed**. It is needed when each processor has its **own private ready queue**.',
        'مع الـ SMP، كل الـ CPUs لازم تبقى شغالة عشان الكفاءة: الـ load balancing بيحاول يخلّي الشغل **متوزع بالتساوي**. ومحتاجينه لما كل processor يبقى ليه **ready queue خاصة بيه**.',
      ),
    },
    {
      kind: 'versus',
      left: { title: 'Push migration', icon: 'send', tone: 'amber', tagline: t('A periodic checker pushes work away', 'مهمة دورية بتزق الشغل') },
      right: { title: 'Pull migration', icon: 'inbox', tone: 'teal', tagline: t('An idle CPU pulls work in', 'CPU فاضي بيسحب الشغل') },
      rows: [
        { aspect: 'Who acts', left: t('A periodic task checks the load on each processor', 'مهمة دورية بتشيك الحِمل على كل processor'), right: t('The **idle** processor itself', 'الـ processor الـ **فاضي** نفسه') },
        { aspect: 'Action', left: t('Pushes tasks from an **overloaded** CPU to other CPUs', 'بتزق tasks من CPU **عليه ضغط** لـ CPUs تانية'), right: t('Pulls a **waiting** task from a busy processor', 'بيسحب task **مستنية** من processor مشغول') },
      ],
      verdict: t(
        'Load balancing works **against** processor affinity: moving a process balances the load but loses its warm cache.',
        'الـ load balancing بيشتغل **ضد** الـ processor affinity: نقل الـ process بيوزّع الحِمل بس بيضيّع الـ cache بتاعها.',
      ),
    },
    {
      kind: 'confusions',
      items: [
        {
          wrong: t('“A multilevel queue can never starve a process.”', '“الـ multilevel queue عمرها ما تجوّع process.”'),
          right: t('With **fixed priority** between queues, lower queues can starve; time slicing prevents it.', 'مع الـ **fixed priority** بين الـ queues، الـ queues اللي تحت ممكن تتجوّع؛ والـ time slice بيمنع ده.'),
        },
        {
          wrong: t('“In a multilevel queue, processes move between queues.”', '“في الـ multilevel queue، الـ processes بتتنقل بين الـ queues.”'),
          right: t('That is the multilevel **feedback** queue. In a plain multilevel queue membership is permanent.', 'ده الـ multilevel **feedback** queue. في الـ multilevel queue العادية الـ process بتفضل في مكانها.'),
        },
        {
          wrong: t('“In asymmetric multiprocessing every CPU schedules itself.”', '“في الـ asymmetric multiprocessing كل CPU بيعمل scheduling لنفسه.”'),
          right: t('That is **SMP**. Asymmetric = one master accesses the system data structures.', 'ده الـ **SMP**. الـ Asymmetric = master واحد بس بيوصل للـ system data structures.'),
        },
      ],
    },
    {
      kind: 'exam',
      title: t('Exam radar: starvation in queues and moving between them', 'رادار الامتحان: الـ starvation في الـ queues والتنقل بينها'),
      body: t(
        'Four items. A T/F claims a multilevel queue **cannot** starve; a fill-in asks which algorithm lets a process **move between queues**; an MCQ asks one reason to use a multilevel queue (flagged: two options are true); and one asks the challenge of multiprocessor scheduling — **load balancing**.',
        'أربع أسئلة. T/F بيقول إن الـ multilevel queue **مستحيل** تعمل starvation؛ وfill-in بيسأل أنهي algorithm بيخلّي الـ process **تتنقل بين الـ queues**؛ وMCQ بيسأل عن سبب لاستخدام الـ multilevel queue (للمراجعة: فيه اختيارين صح)؛ وواحد عن التحدي في الـ multiprocessor scheduling — الـ **load balancing**.',
      ),
      refs: ['c6-mlq-starvation-tf', 'c6-mlfq-fill', 'c6-mlq-reason', 'c6-multiprocessor-challenge'],
    },
    {
      kind: 'recap',
      items: [
        t('Multilevel queue: fixed queues (foreground RR, background FCFS), each with its own algorithm.', 'Multilevel queue: queues ثابتة (foreground بالـ RR وbackground بالـ FCFS)، كل واحدة ليها algorithm.'),
        t('Between queues: fixed priority (may starve) or time slice (80 / 20).', 'بين الـ queues: fixed priority (ممكن starvation) أو time slice (80 / 20).'),
        t('Feedback queue: processes move; Q0 RR 8 → Q1 RR 16 → Q2 FCFS; aging possible.', 'Feedback queue: الـ processes بتتنقل؛ Q0 RR 8 ← Q1 RR 16 ← Q2 FCFS؛ والـ aging ممكن.'),
        t('Asymmetric: one master; SMP: each CPU self-schedules (most common).', 'Asymmetric: master واحد؛ وSMP: كل CPU بيعمل scheduling لنفسه (الأشهر).'),
        t('Affinity (soft / hard, processor sets); NUMA: fast local, slow remote memory.', 'Affinity (soft / hard، وprocessor sets)؛ وNUMA: ذاكرة محلية سريعة وبعيدة بطيئة.'),
        t('Load balancing with private queues: push and pull migration.', 'الـ Load balancing مع الـ queues الخاصة: push وpull migration.'),
      ],
    },
  ],
  examFocus: [
    t('A multilevel queue with fixed priority between its queues can starve the lower queues.', 'الـ multilevel queue بـ fixed priority بين الـ queues ممكن تجوّع الـ queues اللي تحت.'),
    t('Moving between queues = multilevel feedback queue.', 'التنقل بين الـ queues = multilevel feedback queue.'),
    t('The scheduling challenge of multiprocessors is load balancing (push / pull migration).', 'التحدي في الـ multiprocessor scheduling هو الـ load balancing (push / pull migration).'),
  ],
  keyTerms: [
    { term: 'Multilevel queue', definition: t('Ready queue split into permanent queues, each with its own algorithm.', 'ready queue متقسمة لـ queues ثابتة، كل واحدة ليها algorithm.') },
    { term: 'Multilevel feedback queue', definition: t('A multilevel queue in which processes move between queues.', 'multilevel queue الـ processes فيها بتتنقل بين الـ queues.') },
    { term: 'SMP', definition: t('Each processor is self-scheduling, with a common or private ready queue.', 'كل processor بيعمل scheduling لنفسه، بـ ready queue مشتركة أو خاصة.') },
    { term: 'Processor affinity', definition: t('A process tends to stay on the processor it is running on.', 'الـ process بتميل إنها تفضل على الـ processor اللي شغالة عليه.') },
    { term: 'NUMA', definition: t('Non-uniform memory access: local memory fast, remote memory slow.', 'Non-uniform memory access: الذاكرة المحلية سريعة والبعيدة بطيئة.') },
    { term: 'Push / pull migration', definition: t('Move tasks off an overloaded CPU / an idle CPU takes a waiting task.', 'نقل tasks من CPU عليه ضغط / CPU فاضي بياخد task مستنية.') },
  ],
}
