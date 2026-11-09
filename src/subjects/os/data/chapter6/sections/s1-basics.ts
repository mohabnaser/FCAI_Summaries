import type { Section } from '../../../types'
import { part, t } from '../../sections/helpers'

/** Basic concepts, the CPU scheduler and its decision points, the dispatcher, the criteria. */
export const basics: Section = {
  id: 'c6-basics',
  chapterId: 'chapter-6',
  order: 1,
  kicker: 'Lesson 01',
  title: 'CPU Scheduling Basics & Criteria',
  shortTitle: 'Basics & Criteria',
  summary: t(
    'Why the CPU needs a scheduler at all: the CPU–I/O burst cycle, the short-term scheduler and the four moments it may run (preemptive vs nonpreemptive), the dispatcher and dispatch latency, and the five criteria — with the formulas you will use in every scheduling problem.',
    'ليه الـ CPU محتاج scheduler أصلًا: دورة الـ CPU–I/O burst، والـ short-term scheduler والأربع لحظات اللي ممكن يشتغل فيهم (preemptive ولا nonpreemptive)، والـ dispatcher والـ dispatch latency، والخمس معايير — ومعاهم المعادلات اللي هتستخدمها في أي مسألة scheduling.',
  ),
  objectives: [
    t('Explain why CPU scheduling is the basis of multiprogramming, using the CPU–I/O burst cycle.', 'تشرح ليه الـ CPU scheduling هو أساس الـ multiprogramming، باستخدام دورة الـ CPU–I/O burst.'),
    t('Name the four circumstances of a scheduling decision and say which are preemptive.', 'تذكر الأربع حالات اللي بيحصل فيها قرار scheduling وتقول أنهي منهم preemptive.'),
    t('Describe the three jobs of the dispatcher and define dispatch latency.', 'توصف التلات مهام بتوع الـ dispatcher وتعرّف الـ dispatch latency.'),
    t('Define the five criteria and compute turnaround, waiting and response time.', 'تعرّف الخمس معايير وتحسب الـ turnaround والـ waiting والـ response time.'),
  ],
  estimatedMinutes: 16,
  quizId: 'quiz-c6-basics',
  crossRefQuestionIds: ['c3-io-bound-bursts', 'c3-short-term-definition', 'c3-ready-queue-selection', 'c3-context-switch-state-fill', 's4-response-fill'],
  blocks: [
    {
      kind: 'lead',
      text: t(
        'With multiprogramming several processes sit in memory, but one CPU can run only **one** of them at a time. Whenever the running process has to wait (usually for I/O), the OS hands the CPU to another one, so the CPU is never idle: **maximum CPU utilization**. Choosing *which* ready process gets the CPU next is **CPU scheduling** — the basis of every multiprogrammed operating system.',
        'مع الـ multiprogramming فيه كذا process في الـ memory، بس الـ CPU الواحد يقدر يشغّل **واحدة بس** في المرة. وكل ما الـ process الشغالة تضطر تستنى (غالبًا I/O)، الـ OS بيدّي الـ CPU لواحدة تانية، فالـ CPU عمره ما يقعد فاضي: **أقصى CPU utilization**. واختيار *أنهي* process جاهزة تاخد الـ CPU بعد كده هو الـ **CPU scheduling** — وده أساس أي multiprogrammed OS.',
      ),
    },
    {
      kind: 'callout',
      tone: 'insight',
      title: t('What this chapter covers', 'الشابتر ده بيغطي إيه'),
      body: t(
        'Basic concepts → scheduling criteria → seven scheduling algorithms → multiple-processor scheduling → how to evaluate an algorithm. Thread scheduling, real-time scheduling and the operating-system examples appear greyed out in the lecture’s outline and have no slides.',
        'المفاهيم الأساسية ← معايير الـ scheduling ← سبع scheduling algorithms ← الـ multiple-processor scheduling ← إزاي تقيّم algorithm. أما الـ thread scheduling والـ real-time scheduling وأمثلة الأنظمة فمكتوبين باهت في الفهرس ومالهمش سلايدز.',
      ),
    },

    part(t('The CPU–I/O burst cycle', 'دورة الـ CPU–I/O burst'), t('A process alternates between computing and waiting.', 'الـ process بتبدّل بين إنها تحسب وإنها تستنى.')),
    {
      kind: 'flow',
      title: t('One process, from start to exit', 'process واحدة من أولها لآخرها'),
      steps: [
        { icon: 'cpu', label: 'CPU burst', detail: t('load, store, add, read from file', 'load وstore وadd وread from file'), tone: 'cyan' },
        { icon: 'hourglass', label: 'I/O burst', detail: t('wait for I/O', 'استنى الـ I/O'), tone: 'violet' },
        { icon: 'cpu', label: 'CPU burst', detail: t('store, increment index, write to file', 'store وincrement index وwrite to file'), tone: 'cyan' },
        { icon: 'hourglass', label: 'I/O burst', detail: t('wait for I/O', 'استنى الـ I/O'), tone: 'violet' },
        { icon: 'repeat', label: '…', detail: t('the cycle repeats; the last CPU burst ends with exit', 'الدورة بتتكرر؛ وآخر CPU burst بيخلص بـ exit'), tone: 'teal' },
      ],
      caption: t(
        'Process execution is a **cycle of CPU execution and I/O wait**. A **CPU burst** is a stretch of computing; an **I/O burst** is a stretch of waiting for I/O.',
        'تنفيذ الـ process عبارة عن **دورة من تنفيذ على الـ CPU وانتظار I/O**. الـ **CPU burst** فترة حسابات؛ والـ **I/O burst** فترة انتظار I/O.',
      ),
    },
    {
      kind: 'visual',
      id: 'cpu-io-bursts',
      title: t('How long are CPU bursts?', 'الـ CPU bursts طولها قد إيه؟'),
      caption: t(
        'The distribution of CPU-burst lengths is the main concern of scheduling: there are **very many short bursts and very few long ones**. Switch between an I/O-bound and a CPU-bound program to see where each sits on the curve.',
        'توزيع أطوال الـ CPU bursts هو أهم حاجة للـ scheduling: فيه **bursts قصيرة كتير جدًا وطويلة قليلة جدًا**. بدّل بين برنامج I/O-bound وبرنامج CPU-bound وشوف كل واحد مكانه فين على المنحنى.',
      ),
    },

    part(t('The CPU scheduler', 'الـ CPU scheduler'), t('The short-term scheduler and the four moments it can act.', 'الـ short-term scheduler والأربع لحظات اللي ممكن يتدخل فيهم.')),
    {
      kind: 'definition',
      term: 'Short-term scheduler (CPU scheduler)',
      definition: t(
        'Selects one of the processes in the **ready queue** and allocates the CPU to it.',
        'بيختار process من الـ processes اللي في الـ **ready queue** ويدّيها الـ CPU.',
      ),
      detail: t(
        'The ready queue is not necessarily FIFO: it may be ordered in various ways (by arrival, by priority, by burst length…). The ordering *is* the algorithm.',
        'الـ ready queue مش لازم تبقى FIFO: ممكن تترتب بطرق مختلفة (بالوصول، بالأولوية، بطول الـ burst…). والترتيب ده *هو نفسه* الـ algorithm.',
      ),
    },
    {
      kind: 'visual',
      id: 'decision-points',
      title: t('The four scheduling decision points', 'الأربع نقط اللي بيتاخد فيها قرار scheduling'),
      caption: t(
        'A decision may take place when a process (1) switches from running to waiting, (2) switches from running to ready, (3) switches from waiting to ready, or (4) terminates. Pick a scheduler type to see which arrows wake it up.',
        'القرار ممكن يحصل لما process (1) تتحول من running لـ waiting، (2) من running لـ ready، (3) من waiting لـ ready، أو (4) تخلص. اختار نوع الـ scheduler وشوف أنهي أسهم بتصحّيه.',
      ),
    },
    {
      kind: 'table',
      caption: t('The four circumstances', 'الأربع حالات'),
      headers: ['#', 'Transition', 'Typical cause', 'Kind'],
      rows: [
        [t('1'), t('running → waiting'), t('I/O request, wait() for a child', 'طلب I/O، أو wait() لـ child'), t('**Nonpreemptive** — the CPU is free, a choice is required', '**Nonpreemptive** — الـ CPU فضي ولازم نختار')],
        [t('2'), t('running → ready'), t('Interrupt (timer: quantum expired)', 'Interrupt (الـ timer: الـ quantum خلص)'), t('**Preemptive**', '**Preemptive**')],
        [t('3'), t('waiting → ready'), t('I/O completion', 'الـ I/O خلص'), t('**Preemptive**', '**Preemptive**')],
        [t('4'), t('terminates'), t('exit()', 'exit()'), t('**Nonpreemptive** — the CPU is free, a choice is required', '**Nonpreemptive** — الـ CPU فضي ولازم نختار')],
      ],
    },
    {
      kind: 'versus',
      left: { title: 'Nonpreemptive', icon: 'lock', tone: 'cyan', tagline: t('Decides only in cases 1 and 4', 'بيقرر في الحالتين 1 و4 بس') },
      right: { title: 'Preemptive', icon: 'zap', tone: 'amber', tagline: t('May also decide in cases 2 and 3', 'ممكن يقرر كمان في الحالتين 2 و3') },
      rows: [
        { aspect: 'Running process', left: t('Keeps the CPU until it waits or terminates', 'بتفضل ماسكة الـ CPU لحد ما تستنى أو تخلص'), right: t('Can be **interrupted** and sent back to ready', 'ممكن **تتقاطع** وترجع ready') },
        { aspect: 'Needs', left: t('Nothing special', 'مفيش حاجة خاصة'), right: t('A **timer interrupt** to take the CPU back', '**Timer interrupt** عشان ياخد الـ CPU تاني') },
        { aspect: 'Strength', left: t('Simple, predictable', 'بسيط وسهل التوقع'), right: t('More responsive for short / urgent work', 'استجابة أحسن للشغل القصير / المستعجل') },
        { aspect: 'Examples', left: t('FCFS, SJF, non-preemptive priority', 'FCFS وSJF والـ priority الـ non-preemptive'), right: t('SRTF, preemptive priority, round robin', 'SRTF والـ priority الـ preemptive والـ round robin') },
      ],
      verdict: t(
        'Taking the CPU away from a process that could still run is **preemption** — “making logically runnable processes temporarily suspended”.',
        'إنك تاخد الـ CPU من process لسه تقدر تشتغل اسمه **preemption** — “making logically runnable processes temporarily suspended”.',
      ),
    },
    {
      kind: 'callout',
      tone: 'warning',
      title: t('Preemption has a price', 'الـ Preemption ليه تمن'),
      body: t(
        'The OS must consider: **access to shared data** (a process preempted in the middle of an update leaves the data inconsistent — the race conditions of Chapter 5), **preemption while in kernel mode** (kernel data structures may be half-changed), and **interrupts during crucial OS activities**.',
        'الـ OS لازم ياخد باله من: **الوصول للداتا المشتركة** (process اتعملها preempt في نص تعديل بتسيب الداتا inconsistent — الـ race conditions بتوع Chapter 5)، و**الـ preemption وهي في kernel mode** (data structures الـ kernel ممكن تكون متعدلة نصها)، و**الـ interrupts أثناء عمليات مهمة في الـ OS**.',
      ),
    },

    part(t('The dispatcher', 'الـ Dispatcher'), t('The scheduler chooses; the dispatcher hands over the CPU.', 'الـ scheduler بيختار؛ والـ dispatcher بيسلّم الـ CPU.')),
    {
      kind: 'flow',
      title: t('What the dispatcher module does', 'الـ dispatcher module بيعمل إيه'),
      steps: [
        { icon: 'refresh', label: 'Switch context', detail: t('save the old process’s state, load the new one’s', 'احفظ حالة الـ process القديمة وحمّل حالة الجديدة'), tone: 'cyan' },
        { icon: 'user', label: 'Switch to user mode', detail: t('leave kernel mode', 'اخرج من الـ kernel mode'), tone: 'violet' },
        { icon: 'target', label: 'Jump', detail: t('to the proper location in the user program to restart it', 'للمكان الصح في برنامج المستخدم عشان يكمّل'), tone: 'teal' },
      ],
    },
    {
      kind: 'definition',
      term: 'Dispatch latency',
      definition: t(
        'The time it takes for the dispatcher to **stop one process and start another** running.',
        'الوقت اللي الـ dispatcher بياخده عشان **يوقف process ويشغّل التانية**.',
      ),
      detail: t(
        'Pure overhead: no useful work is done during it. It is why a round-robin quantum must be much larger than a context switch.',
        'ده overhead صافي: مفيش شغل مفيد بيحصل فيه. وعشان كده الـ quantum في الـ round robin لازم يبقى أكبر بكتير من الـ context switch.',
      ),
    },

    part(t('Scheduling criteria', 'معايير الـ Scheduling'), t('Five numbers that decide which algorithm is “better”.', 'خمس أرقام بيحددوا أنهي algorithm “أحسن”.')),
    {
      kind: 'cards',
      columns: 3,
      items: [
        { icon: 'gauge', tag: 'maximize', title: 'CPU utilization', body: t('Keep the CPU **as busy as possible**.', 'خلّي الـ CPU **مشغول على قد ما تقدر**.'), tone: 'cyan' },
        { icon: 'trending', tag: 'maximize', title: 'Throughput', body: t('Number of processes that **complete** their execution **per time unit**.', 'عدد الـ processes اللي **بتخلص** تنفيذها **في وحدة الزمن**.'), tone: 'cyan' },
        { icon: 'clock', tag: 'minimize', title: 'Turnaround time', body: t('Amount of time to **execute a particular process**: from arrival (submission) to completion.', 'الوقت اللازم **لتنفيذ process معينة**: من الوصول (التقديم) لحد ما تخلص.'), tone: 'amber' },
        { icon: 'hourglass', tag: 'minimize', title: 'Waiting time', body: t('Amount of time a process has been waiting **in the ready queue** (not in I/O).', 'الوقت اللي الـ process قعدته مستنية **في الـ ready queue** (مش في الـ I/O).'), tone: 'amber' },
        { icon: 'zap', tag: 'minimize', title: 'Response time', body: t('From submission until the **first response** is produced — not until the output is complete (time-sharing).', 'من التقديم لحد ما **أول response** يطلع — مش لحد ما الـ output يخلص (time-sharing).'), tone: 'amber' },
      ],
    },
    {
      kind: 'hook',
      title: t('Which way each criterion goes', 'كل معيار المفروض يروح لفين'),
      phrase: 'UT up · TWR down',
      letters: [
        { letter: 'U', word: 'Utilization — maximize' },
        { letter: 'T', word: 'Throughput — maximize' },
        { letter: 'T', word: 'Turnaround — minimize' },
        { letter: 'W', word: 'Waiting — minimize' },
        { letter: 'R', word: 'Response — minimize' },
      ],
      body: t('The two “amount of work” numbers go up; the three “how long” numbers go down.', 'الرقمين بتوع “كمية الشغل” يطلعوا؛ والتلاتة بتوع “قد إيه وقت” ينزلوا.'),
    },
    {
      kind: 'stats',
      title: t('The formulas behind every problem', 'المعادلات اللي ورا أي مسألة'),
      items: [
        { value: 'TAT = F − A', label: t('Turnaround = finish (completion) time − arrival time', 'Turnaround = وقت الانتهاء − وقت الوصول'), tone: 'cyan', icon: 'clock' },
        { value: 'WT = TAT − B', label: t('Waiting = turnaround − burst, i.e. F − (A + B)', 'Waiting = turnaround − burst، يعني F − (A + B)'), tone: 'amber', icon: 'hourglass' },
        { value: 'RT = S − A', label: t('Response = first time on the CPU − arrival', 'Response = أول مرة على الـ CPU − وقت الوصول'), tone: 'violet', icon: 'zap' },
        { value: 'avg = Σ / n', label: t('Average over the n processes', 'المتوسط على الـ n processes'), tone: 'teal', icon: 'scale' },
      ],
    },
    {
      kind: 'steps',
      title: t('How to solve any scheduling problem', 'إزاي تحل أي مسألة scheduling'),
      steps: [
        { title: 'Copy the table', body: t('Process, arrival, burst (and priority). Note the rule: preemptive or not, priority direction, quantum.', 'انقل الجدول: process وarrival وburst (والـ priority). واكتب القاعدة: preemptive ولا لأ، واتجاه الأولوية، والـ quantum.') },
        { title: 'Walk the time line', body: t('At each decision point list **only the processes that have arrived** (arrival ≤ t) and are unfinished.', 'عند كل decision point اكتب **بس الـ processes اللي وصلت** (arrival ≤ t) ولسه مخلصتش.') },
        { title: 'Apply the rule and draw the Gantt chart', body: t('Pick the process the algorithm says, write its start and end under the bar. Preemptive algorithms re-check at **every arrival**; RR re-checks at every quantum.', 'اختار الـ process اللي الـ algorithm بيقول عليها، واكتب البداية والنهاية تحت الشريط. الـ preemptive بيراجع عند **كل وصول**؛ والـ RR عند كل quantum.') },
        { title: 'Read finish times, compute TAT and WT', body: t('TAT = F − A, WT = TAT − B for each process. WT is never negative.', 'TAT = F − A وWT = TAT − B لكل process. والـ WT عمره ما يبقى بالسالب.') },
        { title: 'Average and check', body: t('Average each column. Check: with no idle time the chart ends at Σ bursts (+ first arrival).', 'خد متوسط كل عمود. واتأكد: لو مفيش idle الـ chart بيخلص عند مجموع الـ bursts (+ أول وصول).') },
      ],
    },
    {
      kind: 'confusions',
      items: [
        {
          wrong: t('“Response time is until the whole output is produced.”', '“الـ Response time لحد ما الـ output كله يطلع.”'),
          right: t('Until the **first** response. Until completion is **turnaround** time.', 'لحد **أول** response. ولحد الانتهاء ده الـ **turnaround** time.'),
        },
        {
          wrong: t('“Waiting time includes time spent doing I/O.”', '“الـ Waiting time فيه الوقت اللي في الـ I/O.”'),
          right: t('Waiting time counts only time in the **ready queue**.', 'الـ Waiting time بيعدّ الوقت في الـ **ready queue** بس.'),
        },
        {
          wrong: t('“The dispatcher chooses the next process.”', '“الـ dispatcher هو اللي بيختار الـ process الجاية.”'),
          right: t('The **scheduler** chooses; the **dispatcher** gives it control (context switch, user mode, jump).', 'الـ **scheduler** بيختار؛ والـ **dispatcher** بيدّيها التحكم (context switch وuser mode وjump).'),
        },
        {
          wrong: t('“running → waiting is a preemptive decision.”', '“running ← waiting ده قرار preemptive.”'),
          right: t('The process left the CPU **itself**: nonpreemptive. Preemptive points are running → ready and waiting → ready.', 'الـ process سابت الـ CPU **بنفسها**: nonpreemptive. ونقط الـ preemptive هي running ← ready وwaiting ← ready.'),
        },
      ],
    },
    {
      kind: 'exam',
      title: t('Exam radar: definitions and decision points', 'رادار الامتحان: التعريفات ونقط القرار'),
      body: t(
        'Thirteen items. The **main objective** (two different MCQs), **dispatch latency** (an MCQ and a T/F that says “dispatcher latency”), what preemption means (two MCQs) and **when** preemptive scheduling occurs (a flagged item: two options are preemptive), and the **response time** definition. Shared with earlier chapters: the short-term scheduler picks from the **ready** queue, the “saves the state … restores the next” fill-in (context switch / dispatcher), I/O-bound programs have **many very short CPU bursts**, and response time must be short in time-sharing.',
        'تلاتاشر سؤال. **الهدف الأساسي** (سؤالين MCQ مختلفين)، والـ **dispatch latency** (MCQ وT/F مكتوب فيه “dispatcher latency”)، ومعنى الـ preemption (سؤالين) و**إمتى** الـ preemptive scheduling بيحصل (سؤال للمراجعة: فيه اختيارين preemptive)، وتعريف الـ **response time**. ومشتركين مع الشباتر اللي فاتت: الـ short-term scheduler بيختار من الـ **ready** queue، والـ fill-in بتاع “saves the state … restores the next” (context switch / dispatcher)، والبرامج الـ I/O-bound عندها **CPU bursts كتير قصيرة جدًا**، والـ response time لازم يبقى قصير في الـ time-sharing.',
      ),
      refs: [
        'c6-objective-2024',
        'c6-objective-2023',
        'c6-dispatch-latency',
        'c6-dispatcher-latency-tf',
        'c6-preemptive-difference',
        'c6-preemptive-definition',
        'c6-preemptive-cases',
        'c6-response-time',
        'c3-short-term-definition',
        'c3-ready-queue-selection',
        'c3-context-switch-state-fill',
        'c3-io-bound-bursts',
        's4-response-fill',
      ],
    },
    {
      kind: 'recap',
      items: [
        t('Goal: maximum CPU utilization — run another process whenever one waits.', 'الهدف: أقصى CPU utilization — شغّل process تانية كل ما واحدة تستنى.'),
        t('CPU–I/O burst cycle; most CPU bursts are short (I/O-bound → many short bursts).', 'دورة CPU–I/O burst؛ وأغلب الـ CPU bursts قصيرة (I/O-bound ← bursts قصيرة كتير).'),
        t('Short-term scheduler: picks from the ready queue.', 'الـ Short-term scheduler: بيختار من الـ ready queue.'),
        t('Decision points 1 (run→wait) and 4 (exit) nonpreemptive; 2 (run→ready) and 3 (wait→ready) preemptive.', 'نقط القرار 1 (run←wait) و4 (exit) nonpreemptive؛ و2 (run←ready) و3 (wait←ready) preemptive.'),
        t('Dispatcher: switch context, user mode, jump. Dispatch latency = stop one, start another.', 'الـ Dispatcher: يبدّل الـ context وuser mode وjump. والـ Dispatch latency = وقّف واحدة وشغّل التانية.'),
        t('UT up, TWR down. TAT = F − A, WT = TAT − B, RT = S − A.', 'UT لفوق وTWR لتحت. TAT = F − A وWT = TAT − B وRT = S − A.'),
      ],
    },
  ],
  examFocus: [
    t('The main objective is maximum CPU utilization — CPU time is allocated according to criteria.', 'الهدف الأساسي أقصى CPU utilization — والـ CPU بيتوزع حسب معايير.'),
    t('Dispatch latency: the time to stop one process and start another.', 'الـ Dispatch latency: الوقت اللي بيوقف فيه process ويشغّل التانية.'),
    t('Preemptive = a runnable process can be interrupted (timer); nonpreemptive decisions happen only on wait and exit.', 'Preemptive = process تقدر تشتغل ممكن تتقاطع (timer)؛ والـ nonpreemptive بيقرر بس عند الـ wait والـ exit.'),
    t('Response time ends at the first response; turnaround at completion.', 'الـ Response time بيخلص عند أول رد؛ والـ turnaround عند الانتهاء.'),
  ],
  keyTerms: [
    { term: 'CPU burst', definition: t('A period during which a process executes on the CPU.', 'فترة الـ process بتتنفّذ فيها على الـ CPU.') },
    { term: 'I/O burst', definition: t('A period during which a process waits for I/O.', 'فترة الـ process بتستنى فيها I/O.') },
    { term: 'Short-term scheduler', definition: t('Selects a process from the ready queue and allocates the CPU to it.', 'بيختار process من الـ ready queue ويدّيها الـ CPU.') },
    { term: 'Preemptive scheduling', definition: t('The CPU can be taken from a running process that could continue.', 'الـ CPU ممكن يتاخد من process شغالة كانت تقدر تكمّل.') },
    { term: 'Dispatcher', definition: t('Gives the CPU to the chosen process: context switch, user mode, jump.', 'بيدّي الـ CPU للـ process المختارة: context switch وuser mode وjump.') },
    { term: 'Dispatch latency', definition: t('Time to stop one process and start another.', 'الوقت اللي بيوقف فيه process ويشغّل التانية.') },
    { term: 'Turnaround time', definition: t('Completion time − arrival time.', 'وقت الانتهاء − وقت الوصول.') },
    { term: 'Waiting time', definition: t('Time spent in the ready queue = turnaround − burst.', 'الوقت في الـ ready queue = turnaround − burst.') },
    { term: 'Response time', definition: t('Submission until the first response.', 'من التقديم لحد أول رد.') },
  ],
}
