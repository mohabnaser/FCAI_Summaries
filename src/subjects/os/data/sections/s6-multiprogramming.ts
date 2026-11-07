import type { Section } from '../../types'
import { part, t } from './helpers'

/** Slides 30–32: multiprogramming, job scheduling, memory layout, time-sharing. */
export const multiprogramming: Section = {
  id: 'multiprogramming',
  order: 6,
  kicker: 'Lesson 06',
  title: 'Multiprogramming & Time-Sharing',
  shortTitle: 'Multiprogramming',
  summary: t(
    'The efficiency idea at the heart of every OS: keep several jobs in memory so the CPU always has one to run — then switch so fast that every user feels the machine is theirs.',
    'فكرة الكفاءة اللي في قلب أي OS: خلّي كذا job في الـ memory عشان الـ CPU يبقى عندها دايمًا حاجة تشغّلها — وبعدين بدّل بسرعة لدرجة إن كل مستخدم يحس إن الجهاز بتاعه.',
  ),
  objectives: [
    t('Explain why a single user cannot keep the CPU and I/O devices busy.', 'تشرح ليه مستخدم واحد ما يقدرش يخلّي الـ CPU والـ I/O devices مشغولين.'),
    t('Describe how multiprogramming organizes jobs: job pool, job scheduling, memory layout, switching on I/O wait.', 'توصف إزاي الـ multiprogramming بينظّم الـ jobs: job pool وjob scheduling وmemory layout والتبديل وقت انتظار الـ I/O.'),
    t('State the objective of multiprogramming precisely, and define degree of multiprogramming.', 'تقول هدف الـ multiprogramming بدقة، وتعرّف degree of multiprogramming.'),
    t('Explain time-sharing (multitasking): interactive computing, response time < 1 s, process, CPU scheduling.', 'تشرح الـ time-sharing (multitasking): interactive computing وresponse time أقل من ثانية وprocess وCPU scheduling.'),
    t('Distinguish swapping from virtual memory.', 'تفرّق بين الـ swapping والـ virtual memory.'),
  ],
  estimatedMinutes: 20,
  quizId: 'quiz-multiprogramming',
  blocks: [
    part(
      t('Why multiprogramming?', 'ليه multiprogramming؟'),
      t(
        'Multiprogramming is **needed for efficiency** — a single user cannot keep the CPU and I/O devices busy at all times.',
        'الـ multiprogramming **ضروري عشان الكفاءة** — مستخدم واحد ما يقدرش يخلّي الـ CPU والـ I/O devices مشغولين طول الوقت.',
      ),
    ),
    {
      kind: 'lead',
      text: t(
        'A program computes for a while, then waits — for a disk, a network reply, a key press. With only that program in memory, the CPU sits idle during every wait. Multiprogramming keeps **other jobs ready in memory** so the wait is filled with someone else’s work.',
        'البرنامج بيحسب شوية وبعدين يستنى — disk أو رد من الشبكة أو زرار. لو هو بس اللي في الـ memory، الـ CPU هتقعد فاضية في كل انتظار. الـ multiprogramming بيخلّي **jobs تانية جاهزة في الـ memory** عشان وقت الانتظار يتملي بشغل حد تاني.',
      ),
    },
    {
      kind: 'visual',
      id: 'multiprogramming',
      title: t('Uniprogramming vs multiprogramming: the same two jobs', 'Uniprogramming مقابل multiprogramming: نفس الـ jobs الاتنين'),
      caption: t(
        'Compare the idle stripes on the CPU lane. The CPU still runs one job at a time — it simply never waits for one job’s I/O while another is ready.',
        'قارن الخطوط الـ idle في سطر الـ CPU. الـ CPU لسه بتشغّل job واحدة في المرة — بس عمرها ما بتستنى I/O بتاع job وفيه واحدة تانية جاهزة.',
      ),
    },
    {
      kind: 'flow',
      title: t('How multiprogramming organizes jobs', 'الـ multiprogramming بينظّم الـ jobs إزاي'),
      steps: [
        { icon: 'archive', label: 'Job pool', detail: t('All jobs (code and data) waiting in the system.', 'كل الـ jobs (code وdata) المستنية في النظام.'), tone: 'violet' },
        { icon: 'list', label: 'Job scheduling', detail: t('A set of jobs is **selected from the pool**.', 'مجموعة jobs **بتتختار من الـ pool**.'), tone: 'amber' },
        { icon: 'memory', label: 'Kept in memory', detail: t('A **subset of total jobs** is kept in memory.', '**جزء من إجمالي الـ jobs** بيتحفظ في الـ memory.'), tone: 'teal' },
        { icon: 'cpu', label: 'CPU runs one', detail: t('The CPU always has a job to execute.', 'الـ CPU دايمًا عندها job تنفّذها.'), tone: 'cyan' },
        { icon: 'refresh', label: 'Job waits → switch', detail: t('When a job has to wait (e.g. for I/O), the **OS switches to another job**.', 'لما الـ job تستنى (مثلًا I/O)، **الـ OS بيبدّل لـ job تانية**.'), tone: 'rose' },
      ],
    },
    {
      kind: 'layers',
      title: t('Memory layout for a multiprogrammed system', 'Memory layout لنظام multiprogrammed'),
      axis: { top: '0', bottom: '512M' },
      caption: t(
        'Several jobs are resident in main memory at the same time, alongside the operating system.',
        'كذا job موجودين في الـ main memory في نفس الوقت، جنب الـ operating system.',
      ),
      layers: [
        { label: 'operating system', tone: 'cyan', icon: 'chip' },
        { label: 'job 1', tone: 'violet' },
        { label: 'job 2', tone: 'amber' },
        { label: 'job 3', tone: 'teal' },
        { label: 'job 4', tone: 'rose' },
      ],
    },
    {
      kind: 'versus',
      title: t('Uniprogramming vs multiprogramming', 'Uniprogramming مقابل multiprogramming'),
      left: { title: 'Uniprogramming', icon: 'user', tone: 'rose', tagline: t('Only one process can execute at a time (supplementary term)', 'Process واحدة بس تقدر تتنفّذ في المرة (مصطلح إضافي)') },
      right: { title: 'Multiprogramming', icon: 'layers', tone: 'teal', tagline: t('Several jobs resident; switch on wait', 'كذا job موجودين؛ وتبديل وقت الانتظار') },
      rows: [
        { aspect: 'In memory', left: t('One job (+ the OS)', 'Job واحدة (+ الـ OS)'), right: t('**More than one process resides in memory**', '**أكتر من process موجودة في الـ memory**') },
        { aspect: 'On an I/O wait', left: t('CPU idles', 'الـ CPU بتقعد فاضية'), right: t('OS switches to another job', 'الـ OS بيبدّل لـ job تانية') },
        { aspect: 'CPU utilization', left: t('Low', 'قليل'), right: t('**Maximized**', '**أقصى حاجة**') },
      ],
    },
    {
      kind: 'hook',
      title: t('The objective, in the words the exams use', 'الهدف، بنفس كلام الامتحانات'),
      phrase: 'Maximize CPU utilization — have some process running at all times.',
      body: t(
        'Both phrases describe the same goal. A queue of waiting programs is part of the **mechanism**, not the objective.',
        'الجملتين بيوصفوا نفس الهدف. والـ queue بتاع البرامج المستنية جزء من **الآلية**، مش الهدف.',
      ),
    },
    {
      kind: 'definition',
      term: 'Degree of multiprogramming',
      definition: t(
        'The **number of processes in memory**.',
        '**عدد الـ processes الموجودة في الـ memory**.',
      ),
      detail: t(
        'Supplementary term (defined formally in Chapter 3). It counts what is resident in memory — not what is in one particular queue, and not a rate of processes per unit of time.',
        'مصطلح إضافي (بيتعرّف رسميًا في Chapter 3). بيعِد اللي موجود في الـ memory — مش اللي في queue معيّنة، ومش معدل processes لكل وحدة زمن.',
      ),
    },

    part(
      t('Time-sharing (multitasking)', 'الـ Time-sharing (multitasking)'),
      t(
        '**a logical extension of multiprogramming**.',
        '**امتداد منطقي للـ multiprogramming**.',
      ),
    ),
    {
      kind: 'lead',
      text: t(
        'In time-sharing the CPU switches jobs **so frequently** that users can **interact with each job while it is running** — this is **interactive computing**.',
        'في الـ time-sharing الـ CPU بتبدّل بين الـ jobs **بسرعة كبيرة جدًا** لدرجة إن المستخدمين يقدروا **يتفاعلوا مع كل job وهي شغالة** — وده اسمه **interactive computing**.',
      ),
    },
    {
      kind: 'cards',
      title: t('One idea per card', 'فكرة في كل كارت'),
      columns: 3,
      items: [
        { icon: 'timer', tag: 'response', title: 'Short response time', body: t('Response time should be short — **typically < 1 second**.', 'الـ response time لازم يبقى قصير — **عادة أقل من ثانية**.'), tone: 'amber' },
        { icon: 'user', tag: 'process', title: 'One program each', body: t('Each user has at least one program executing in memory → a **process**.', 'كل مستخدم عنده على الأقل برنامج شغال في الـ memory ← **process**.'), tone: 'cyan' },
        { icon: 'list', tag: 'scheduling', title: 'CPU scheduling', body: t('If several jobs are ready to run at the same time → **CPU scheduling**.', 'لو كذا job جاهزين يشتغلوا في نفس الوقت ← **CPU scheduling**.'), tone: 'violet' },
        { icon: 'repeat', tag: 'swapping', title: 'Swapping', body: t('If processes don’t fit in memory, **swapping** moves them in and out to run.', 'لو الـ processes مش داخلة في الـ memory، الـ **swapping** بيدخّلهم ويطلّعهم عشان يشتغلوا.'), tone: 'teal' },
        { icon: 'layers', tag: 'virtual memory', title: 'Virtual memory', body: t('Allows execution of processes **not completely in memory**.', 'بتسمح بتنفيذ processes **مش موجودة بالكامل في الـ memory**.'), tone: 'rose' },
        { icon: 'users', tag: 'interactive', title: 'Interactive computing', body: t('Rapid switching gives every user the feel of a dedicated machine.', 'التبديل السريع بيدّي كل مستخدم إحساس إن الجهاز بتاعه لوحده.'), tone: 'lime' },
      ],
    },
    {
      kind: 'versus',
      title: t('Multiprogramming vs time-sharing', 'Multiprogramming مقابل time-sharing'),
      left: { title: 'Multiprogramming', icon: 'layers', tone: 'teal', tagline: t('Keep the CPU busy', 'خلّي الـ CPU مشغولة') },
      right: { title: 'Time-sharing / multitasking', icon: 'timer', tone: 'amber', tagline: t('Keep the user happy', 'خلّي المستخدم مبسوط') },
      rows: [
        { aspect: 'Goal', left: t('Maximize CPU utilization', 'أقصى CPU utilization'), right: t('Short response time for interactive users', 'Response time قصير للمستخدمين التفاعليين') },
        { aspect: 'Switches when', left: t('The running job has to wait (e.g. for I/O)', 'الـ job الشغالة تضطر تستنى (مثلًا I/O)'), right: t('Very frequently — typically forced by a **timer interrupt** (Section 7)', 'كتير جدًا — غالبًا بإجبار من **timer interrupt** (Section 7)') },
        { aspect: 'Users', left: t('Not necessarily interactive', 'مش لازم يبقوا تفاعليين'), right: t('Many users interact with their jobs while they run', 'كذا مستخدم بيتفاعلوا مع الـ jobs وهي شغالة') },
        { aspect: 'Relationship', left: t('The base idea', 'الفكرة الأساسية'), right: t('A **logical extension** of multiprogramming', '**امتداد منطقي** للـ multiprogramming') },
      ],
      verdict: t(
        'Both run several processes on one CPU by switching. Time-sharing adds frequent, timer-driven switching so the response time stays short.',
        'الاتنين بيشغّلوا كذا process على CPU واحدة بالتبديل. والـ time-sharing بيضيف تبديل متكرر بالـ timer عشان الـ response time يفضل قصير.',
      ),
    },
    {
      kind: 'versus',
      title: t('Two answers to “processes don’t fit in memory”', 'إجابتين لـ “الـ processes مش داخلة في الـ memory”'),
      left: { title: 'Swapping', icon: 'repeat', tone: 'violet', tagline: t('Move whole processes in and out', 'دخّل وطلّع processes كاملة') },
      right: { title: 'Virtual memory', icon: 'layers', tone: 'cyan', tagline: t('Run a process that is only partly in memory', 'شغّل process موجودة جزئيًا بس في الـ memory') },
      rows: [
        { aspect: 'What moves', left: t('Processes, between memory and disk', 'Processes، بين الـ memory والـ disk'), right: t('Only the needed parts are in memory', 'الأجزاء المطلوبة بس هي اللي في الـ memory') },
        { aspect: 'Key phrase', left: t('“moves them in and out to run”', '“moves them in and out to run”'), right: t('“processes **not completely** in memory”', '“processes **not completely** in memory”') },
        { aspect: 'Detail in', left: t('Chapter 8', 'Chapter 8'), right: t('Chapter 9', 'Chapter 9') },
      ],
    },
    {
      kind: 'confusions',
      items: [
        {
          wrong: t('“In multiprogramming one CPU executes several processes at the same instant.”', '“في الـ multiprogramming الـ CPU الواحدة بتنفّذ كذا process في نفس اللحظة.”'),
          right: t('Several processes **reside in memory**; the CPU runs one at a time and switches.', 'كذا process **موجودين في الـ memory**؛ والـ CPU بتشغّل واحدة في المرة وبتبدّل.'),
        },
        {
          wrong: t('“Multiprogramming means many people wrote the programs.”', '“Multiprogramming يعني ناس كتير كتبوا البرامج.”'),
          right: t('It is about how many jobs are **in memory**, not who developed them.', 'الموضوع عن عدد الـ jobs اللي **في الـ memory**، مش مين كتبها.'),
        },
        {
          wrong: t('“Time-sharing is the opposite of multiprogramming.”', '“الـ time-sharing عكس الـ multiprogramming.”'),
          right: t('It is a **logical extension** of it.', 'هو **امتداد منطقي** ليه.'),
        },
      ],
    },
    {
      kind: 'exam',
      title: t('Exam radar: the largest cluster in Chapter 1', 'رادار الامتحان: أكبر مجموعة أسئلة في Chapter 1'),
      body: t(
        'Eleven past-exam items live here. Several MCQs share the stem “What is the objective of multiprogramming?” but with **different option sets** — read every option, because one paper offers “maximize” and another offers “some process running at all times”. Also expect: what is true *in* a multiprogramming environment, the definition of degree of multiprogramming, the name for one-process-at-a-time systems, two wordings of “multiprogramming vs time-sharing”, a T/F about virtual memory, the time that must be short in time-sharing, and a written “multiprogramming vs multitasking”.',
        'فيه 11 سؤال من الامتحانات هنا. كذا MCQ ليهم نفس السؤال “What is the objective of multiprogramming?” بس **الاختيارات مختلفة** — اقرا كل اختيار، لأن ورقة بتدّي “maximize” وورقة تانية بتدّي “some process running at all times”. واستنى كمان: إيه اللي صح *جوه* بيئة multiprogramming، وتعريف degree of multiprogramming، واسم الأنظمة اللي بتشغّل process واحدة في المرة، وصياغتين لـ “multiprogramming vs time-sharing”، وT/F عن الـ virtual memory، والوقت اللي لازم يبقى قصير في الـ time-sharing، وسؤال مكتوب “multiprogramming vs multitasking”.',
      ),
      refs: [
        's4-objective-multiprogramming',
        's4-objective-f20',
        's4-objective-tf',
        's4-multiprogramming-env',
        's4-degree-mcq',
        's4-uniprogramming',
        's4-timesharing-f23',
        's4-timesharing-fnd',
        's4-virtual-memory-tf',
        's4-response-fill',
        's4-multiprogramming-short',
      ],
    },
    {
      kind: 'recap',
      items: [
        t('One user cannot keep CPU and I/O busy → multiprogramming.', 'مستخدم واحد ما يقدرش يشغّل الـ CPU والـ I/O ← multiprogramming.'),
        t('Job pool → job scheduling → subset in memory → switch on wait.', 'Job pool ← job scheduling ← جزء في الـ memory ← تبديل وقت الانتظار.'),
        t('Objective: maximize CPU utilization / some process always running.', 'الهدف: أقصى CPU utilization / process شغالة دايمًا.'),
        t('Degree of multiprogramming = number of processes in memory.', 'Degree of multiprogramming = عدد الـ processes في الـ memory.'),
        t('Time-sharing = multiprogramming + very frequent switching; response < 1 s.', 'Time-sharing = multiprogramming + تبديل متكرر جدًا؛ response أقل من ثانية.'),
        t('Swapping moves processes in/out; virtual memory runs processes not completely in memory.', 'الـ swapping بيدخّل ويطلّع processes؛ والـ virtual memory بتشغّل processes مش كاملة في الـ memory.'),
      ],
    },
  ],
  examFocus: [
    t('Objective of multiprogramming: maximize CPU utilization, i.e. have some process running at all times.', 'هدف الـ multiprogramming: أقصى CPU utilization، يعني process شغالة طول الوقت.'),
    t('In a multiprogramming environment more than one process resides in memory; the OS switches when a job waits.', 'في بيئة multiprogramming أكتر من process موجودة في الـ memory؛ والـ OS بيبدّل لما job تستنى.'),
    t('Time-sharing (multitasking) is a logical extension with frequent switching and response time < 1 second.', 'الـ time-sharing (multitasking) امتداد منطقي بتبديل متكرر وresponse time أقل من ثانية.'),
    t('Virtual memory allows execution of processes not completely in memory; swapping moves processes in and out.', 'الـ virtual memory بتسمح بتنفيذ processes مش كاملة في الـ memory؛ والـ swapping بيدخّل ويطلّع processes.'),
  ],
  keyTerms: [
    { term: 'Multiprogramming', definition: t('Keeping several jobs in memory so the CPU always has one to execute.', 'إن كذا job يبقوا في الـ memory عشان الـ CPU دايمًا تلاقي حاجة تنفّذها.') },
    { term: 'Job scheduling', definition: t('Selecting which jobs from the pool are brought into memory.', 'اختيار أنهي jobs من الـ pool تدخل الـ memory.') },
    { term: 'Degree of multiprogramming', definition: t('Number of processes in memory.', 'عدد الـ processes في الـ memory.') },
    { term: 'Time-sharing (multitasking)', definition: t('Switching jobs so frequently that users interact with each while it runs.', 'تبديل الـ jobs بسرعة لدرجة إن المستخدمين يتفاعلوا مع كل واحدة وهي شغالة.') },
    { term: 'Response time', definition: t('Time until the system responds to the user; < 1 s in time-sharing.', 'الوقت لحد ما النظام يرد على المستخدم؛ أقل من ثانية في الـ time-sharing.') },
    { term: 'Swapping', definition: t('Moving processes in and out of memory when they don’t all fit.', 'إدخال وإخراج processes من الـ memory لما مش كلها تدخل.') },
    { term: 'Virtual memory', definition: t('Allows execution of processes not completely in memory.', 'بتسمح بتنفيذ processes مش كاملة في الـ memory.') },
  ],
}
