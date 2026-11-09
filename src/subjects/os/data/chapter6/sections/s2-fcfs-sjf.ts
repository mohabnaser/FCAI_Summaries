import type { Section } from '../../../types'
import { part, t } from '../../sections/helpers'

const sjfArrivals = [
  { id: 'P1', arrival: 0, burst: 7 },
  { id: 'P2', arrival: 2, burst: 4 },
  { id: 'P3', arrival: 4, burst: 1 },
  { id: 'P4', arrival: 5, burst: 4 },
]

/** The algorithm map, FCFS and the convoy effect, SJF, burst prediction, SRTF. */
export const fcfsSjf: Section = {
  id: 'c6-fcfs-sjf',
  chapterId: 'chapter-6',
  order: 2,
  kicker: 'Lesson 02',
  title: 'FCFS, SJF & Shortest-Remaining-Time-First',
  shortTitle: 'FCFS & SJF',
  summary: t(
    'The first two algorithms and the preemptive variant of the second: first-come first-served and its convoy effect, shortest-job-first — optimal but needing the length of the next burst, which is predicted with exponential averaging — and SRTF, which preempts when a shorter job arrives. Every lecture example is worked out in full.',
    'أول اتنين algorithms والنسخة الـ preemptive من التاني: الـ first-come first-served والـ convoy effect بتاعه، والـ shortest-job-first — الأمثل بس محتاج يعرف طول الـ burst الجاي، اللي بنتوقعه بالـ exponential averaging — والـ SRTF اللي بيعمل preempt لما تيجي شغلانة أقصر. وكل أمثلة المحاضرة محلولة بالكامل.',
  ),
  objectives: [
    t('Draw FCFS Gantt charts and explain the convoy effect.', 'ترسم Gantt chart للـ FCFS وتشرح الـ convoy effect.'),
    t('Schedule by SJF and explain why it is optimal yet hard to implement.', 'تعمل scheduling بالـ SJF وتشرح ليه هو الأمثل بس صعب تنفيذه.'),
    t('Predict the next CPU burst with τ(n+1) = α·t(n) + (1 − α)·τ(n) and explain α = 0 and α = 1.', 'تتوقع الـ CPU burst الجاي بـ τ(n+1) = α·t(n) + (1 − α)·τ(n) وتشرح α = 0 وα = 1.'),
    t('Solve non-preemptive SJF and SRTF problems with arrival times.', 'تحل مسائل SJF الـ non-preemptive والـ SRTF بوجود arrival times.'),
  ],
  estimatedMinutes: 20,
  quizId: 'quiz-c6-fcfs-sjf',
  blocks: [
    {
      kind: 'lead',
      text: t(
        'The chapter studies seven algorithms. They differ in one thing only: **which ready process goes next** — and whether a running process can be interrupted to let it go.',
        'الشابتر بيدرس سبع algorithms. الفرق بينهم في حاجة واحدة بس: **أنهي process جاهزة تشتغل بعد كده** — وهل الـ process الشغالة ممكن تتقاطع عشانها ولا لأ.',
      ),
    },
    {
      kind: 'cards',
      columns: 4,
      items: [
        { icon: 'list', tag: 'Lesson 02', title: 'FCFS', body: t('First come, first served. Nonpreemptive.', 'اللي ييجي الأول يتخدم الأول. Nonpreemptive.'), tone: 'cyan' },
        { icon: 'scale', tag: 'Lesson 02', title: 'SJF', body: t('Shortest next CPU burst first. Nonpreemptive.', 'أقصر CPU burst جاي الأول. Nonpreemptive.'), tone: 'cyan' },
        { icon: 'zap', tag: 'Lesson 02', title: 'SRTF', body: t('Preemptive SJF: shortest remaining time.', 'SJF preemptive: أقل وقت متبقي.'), tone: 'cyan' },
        { icon: 'trending', tag: 'Lesson 03', title: 'Priority', body: t('Highest priority first. Either kind.', 'الأولوية الأعلى الأول. النوعين.'), tone: 'violet' },
        { icon: 'repeat', tag: 'Lesson 03', title: 'Round Robin', body: t('Time quantum in turn. Preemptive.', 'quantum بالدور. Preemptive.'), tone: 'violet' },
        { icon: 'layers', tag: 'Lesson 04', title: 'Multilevel Queue', body: t('Fixed queues, each with its own algorithm.', 'queues ثابتة، كل واحدة ليها algorithm.'), tone: 'teal' },
        { icon: 'workflow', tag: 'Lesson 04', title: 'Multilevel Feedback Queue', body: t('Processes move between queues.', 'الـ processes بتتنقل بين الـ queues.'), tone: 'teal' },
      ],
    },

    part(t('First-Come, First-Served (FCFS)', 'الـ First-Come, First-Served (FCFS)'), t('The simplest rule — and its biggest weakness.', 'أبسط قاعدة — وأكبر عيب فيها.')),
    {
      kind: 'definition',
      term: 'FCFS',
      definition: t(
        'The process that requests the CPU **first** is allocated the CPU first; the ready queue is a plain FIFO queue. Once a process has the CPU it keeps it until it finishes its burst — **nonpreemptive**.',
        'الـ process اللي تطلب الـ CPU **الأول** تاخده الأول؛ والـ ready queue عبارة عن FIFO عادية. ولما process تاخد الـ CPU بتفضل ماسكاه لحد ما الـ burst بتاعها يخلص — **nonpreemptive**.',
      ),
    },
    {
      kind: 'gantt',
      title: t('Arrival order P1, P2, P3 (all at time 0)', 'ترتيب الوصول P1 وP2 وP3 (كلهم عند 0)'),
      algorithm: 'fcfs',
      processes: [
        { id: 'P1', arrival: 0, burst: 24 },
        { id: 'P2', arrival: 0, burst: 3 },
        { id: 'P3', arrival: 0, burst: 3 },
      ],
      caption: t(
        'The two short processes wait behind the 24-unit one: average waiting time **17**.',
        'الـ processes القصيرين بيستنوا ورا اللي طولها 24: متوسط الـ waiting time = **17**.',
      ),
    },
    {
      kind: 'gantt',
      title: t('Same processes, arrival order P2, P3, P1', 'نفس الـ processes، ترتيب الوصول P2 وP3 وP1'),
      algorithm: 'fcfs',
      processes: [
        { id: 'P2', arrival: 0, burst: 3 },
        { id: 'P3', arrival: 0, burst: 3 },
        { id: 'P1', arrival: 0, burst: 24 },
      ],
      caption: t(
        'Average waiting time drops to **3** — much better than 17. FCFS performance depends entirely on the arrival order.',
        'متوسط الـ waiting time نزل لـ **3** — أحسن بكتير من 17. أداء الـ FCFS بيعتمد كليًا على ترتيب الوصول.',
      ),
    },
    {
      kind: 'callout',
      tone: 'definition',
      title: t('The convoy effect', 'الـ Convoy effect'),
      body: t(
        '**Short processes stuck behind a long process.** Picture one CPU-bound process and many I/O-bound processes: the CPU-bound one holds the CPU while all the I/O-bound ones finish their I/O and queue up behind it, leaving the I/O devices idle; then they all rush through the CPU and the CPU sits idle. Both CPU and device utilization drop. Note that FCFS never *starves* anyone — every process eventually reaches the head of the queue.',
        '**Processes قصيرة متعطلة ورا process طويلة.** تخيّل process واحدة CPU-bound وكتير I/O-bound: الـ CPU-bound ماسكة الـ CPU، والـ I/O-bound كلهم بيخلصوا الـ I/O ويقفوا وراها، فأجهزة الـ I/O بتقعد فاضية؛ وبعدين كلهم يعدّوا على الـ CPU بسرعة فالـ CPU هو اللي يقعد فاضي. فالـ utilization بتاع الـ CPU والأجهزة الاتنين بيقل. وخد بالك: الـ FCFS عمره ما بيـ*جوّع* حد — كل process هتوصل لأول الـ queue في الآخر.',
      ),
    },

    part(t('Shortest-Job-First (SJF)', 'الـ Shortest-Job-First (SJF)'), t('Run the shortest next CPU burst first.', 'شغّل أقصر CPU burst جاي الأول.')),
    {
      kind: 'definition',
      term: 'SJF',
      definition: t(
        'Associate with each process the length of its **next CPU burst** and schedule the process with the **shortest** one (ties: FCFS).',
        'اربط كل process بطول الـ **CPU burst الجاي** بتاعها، وشغّل الـ process اللي عندها **أقصر** واحد (ولو اتساووا: FCFS).',
      ),
      detail: t(
        '**SJF is optimal**: it gives the minimum average waiting time for a given set of processes. The difficulty is **knowing the length of the next CPU request** — one could ask the user, but in practice it must be predicted.',
        '**الـ SJF هو الأمثل**: بيدّي أقل متوسط waiting time لأي مجموعة processes. والصعوبة إنك **تعرف طول الـ CPU request الجاي** — ممكن تسأل المستخدم، بس عمليًا لازم تتوقعه.',
      ),
    },
    {
      kind: 'gantt',
      title: t('SJF on four processes (all at time 0)', 'SJF على أربع processes (كلهم عند 0)'),
      algorithm: 'sjf',
      processes: [
        { id: 'P1', arrival: 0, burst: 6 },
        { id: 'P2', arrival: 0, burst: 8 },
        { id: 'P3', arrival: 0, burst: 7 },
        { id: 'P4', arrival: 0, burst: 3 },
      ],
      caption: t(
        'Order 3, 6, 7, 8. Average waiting time **(3 + 16 + 9 + 0) / 4 = 7** — every other order gives more. The lecture writes the same rule as Waiting = Finish − (Arrival + Burst).',
        'الترتيب 3 و6 و7 و8. متوسط الـ waiting = **(3 + 16 + 9 + 0) / 4 = 7** — وأي ترتيب تاني بيدّي أكتر. والمحاضرة بتكتب نفس القاعدة كده: Waiting = Finish − (Arrival + Burst).',
      ),
    },
    {
      kind: 'callout',
      tone: 'insight',
      title: t('Why shortest-first is optimal', 'ليه الأقصر الأول هو الأمثل'),
      body: t(
        'Each process’s burst is added to the waiting time of **everyone behind it**. Putting a short burst early adds a little to many processes; putting a long burst early adds a lot to many. Swapping any long-before-short pair can only lower the total, so the sorted order is the minimum.',
        'الـ burst بتاع كل process بيتضاف على الـ waiting time لـ **كل اللي وراها**. لو حطيت burst قصير بدري بتزوّد شوية صغيرين على ناس كتير؛ ولو حطيت burst طويل بدري بتزوّد كتير على ناس كتير. وأي بدل لطويل-قبل-قصير بيقلل المجموع، فالترتيب من الأقصر للأطول هو الأقل.',
      ),
    },

    part(t('Predicting the next CPU burst', 'توقّع الـ CPU burst الجاي'), t('Exponential averaging of the past bursts.', 'الـ Exponential averaging للـ bursts اللي فاتت.')),
    {
      kind: 'stats',
      title: t('τ(n+1) = α·t(n) + (1 − α)·τ(n)', 'τ(n+1) = α·t(n) + (1 − α)·τ(n)'),
      items: [
        { value: 't(n)', label: t('Actual length of the n-th CPU burst', 'الطول الحقيقي للـ CPU burst رقم n'), tone: 'cyan', icon: 'cpu' },
        { value: 'τ(n+1)', label: t('Predicted value for the next CPU burst', 'القيمة المتوقعة للـ CPU burst الجاي'), tone: 'amber', icon: 'target' },
        { value: '0 ≤ α ≤ 1', label: t('Weight of the newest burst; commonly α = ½', 'وزن أحدث burst؛ وغالبًا α = ½'), tone: 'violet', icon: 'scale' },
      ],
    },
    {
      kind: 'visual',
      id: 'burst-predictor',
      title: t('Exponential averaging, step by step', 'الـ Exponential averaging خطوة بخطوة'),
      caption: t(
        'With α = ½ and τ0 = 10, the actual bursts 6, 4, 6, 4, 13, 13, 13 give the guesses 10, 8, 6, 6, 5, 9, 11, 12 — the lecture’s graph. Try α = 0 and α = 1.',
        'مع α = ½ وτ0 = 10، الـ bursts الحقيقية 6 و4 و6 و4 و13 و13 و13 بتدّي تخمينات 10 و8 و6 و6 و5 و9 و11 و12 — نفس جراف المحاضرة. جرّب α = 0 وα = 1.',
      ),
    },
    {
      kind: 'versus',
      left: { title: 'α = 0', icon: 'pause', tone: 'violet', tagline: t('τ(n+1) = τ(n)', 'τ(n+1) = τ(n)') },
      right: { title: 'α = 1', icon: 'play', tone: 'cyan', tagline: t('τ(n+1) = t(n)', 'τ(n+1) = t(n)') },
      rows: [
        { aspect: 'Counts', left: t('Only the old prediction — **recent history does not count**', 'التوقع القديم بس — **التاريخ القريب مالوش وزن**'), right: t('Only the **actual last CPU burst**', '**آخر CPU burst حقيقي** بس') },
        { aspect: 'Behaviour', left: t('Never adapts', 'عمره ما بيتأقلم'), right: t('Copies the last burst, jumps with every change', 'بينسخ آخر burst، وبيتنطط مع كل تغيير') },
      ],
      verdict: t(
        'Expanding the formula: τ(n+1) = α·t(n) + (1 − α)·α·t(n−1) + … + (1 − α)^j·α·t(n−j) + … + (1 − α)^(n+1)·τ0. Since α and (1 − α) are ≤ 1, **each successive term has less weight than its predecessor** — older bursts fade away.',
        'لو فكّينا المعادلة: τ(n+1) = α·t(n) + (1 − α)·α·t(n−1) + … + (1 − α)^j·α·t(n−j) + … + (1 − α)^(n+1)·τ0. ولأن α و(1 − α) ≤ 1، **كل حد وزنه أقل من اللي قبله** — يعني الـ bursts القديمة بيقل تأثيرها.',
      ),
    },

    part(t('Preemptive SJF: SRTF', 'الـ SJF الـ preemptive: SRTF'), t('What changes when processes arrive at different times.', 'إيه اللي بيتغير لما الـ processes توصل في أوقات مختلفة.')),
    {
      kind: 'versus',
      left: { title: 'Non-preemptive SJF', icon: 'lock', tone: 'cyan', tagline: t('Once given the CPU, run the whole burst', 'لما تاخد الـ CPU تكمّل الـ burst كله') },
      right: { title: 'SRTF (preemptive SJF)', icon: 'zap', tone: 'amber', tagline: t('Shortest-Remaining-Time-First', 'Shortest-Remaining-Time-First') },
      rows: [
        { aspect: 'New shorter arrival', left: t('Waits until the running burst completes', 'بتستنى لحد ما الـ burst الشغال يخلص'), right: t('**Preempts** if its burst < the running process’s **remaining** time', 'بتعمل **preempt** لو الـ burst بتاعها < الوقت **المتبقي** للشغالة') },
        { aspect: 'Decision points', left: t('Only when the CPU becomes free', 'بس لما الـ CPU يفضى'), right: t('Also at **every arrival**', 'وكمان عند **كل وصول**') },
        { aspect: 'Lecture example', left: t('Average waiting 4', 'متوسط waiting = 4'), right: t('Average waiting 3', 'متوسط waiting = 3') },
      ],
    },
    {
      kind: 'gantt',
      title: t('Non-preemptive SJF with arrival times', 'SJF الـ non-preemptive بوجود arrival times'),
      algorithm: 'sjf',
      processes: sjfArrivals,
      caption: t(
        'P1 is alone at t = 0 and, being nonpreemptive, runs all 7 units even though shorter jobs arrive meanwhile. At t = 7 the shortest is P3 (1), then P2 and P4 tie at 4 → P2 arrived first. Average **4**.',
        'P1 لوحدها عند t = 0، ولأنه nonpreemptive بتشتغل الـ 7 وحدات كلهم حتى لو وصلت شغلانات أقصر. عند t = 7 الأقصر P3 (1)، وبعدين P2 وP4 متساويين بـ 4 ← P2 وصلت الأول. المتوسط **4**.',
      ),
    },
    {
      kind: 'gantt',
      title: t('Same processes with SRTF', 'نفس الـ processes بالـ SRTF'),
      algorithm: 'srtf',
      processes: sjfArrivals,
      caption: t(
        't = 2: P2 (4) < P1’s remaining 5 → preempt. t = 4: P3 (1) < P2’s remaining 2 → preempt. t = 5: P3 done; P2 (2) is shortest. Then P4 (4), then P1 (5). Average **(9 + 1 + 0 + 2) / 4 = 3**.',
        'عند t = 2: P2 (4) أقل من الباقي لـ P1 (5) ← preempt. عند t = 4: P3 (1) أقل من الباقي لـ P2 (2) ← preempt. عند t = 5: P3 خلصت؛ وP2 (2) هي الأقصر. وبعدين P4 (4)، وبعدين P1 (5). المتوسط **(9 + 1 + 0 + 2) / 4 = 3**.',
      ),
    },
    {
      kind: 'gantt',
      title: t('Another SRTF example', 'مثال SRTF تاني'),
      algorithm: 'srtf',
      processes: [
        { id: 'P1', arrival: 0, burst: 8 },
        { id: 'P2', arrival: 1, burst: 4 },
        { id: 'P3', arrival: 2, burst: 9 },
        { id: 'P4', arrival: 3, burst: 5 },
      ],
      caption: t(
        't = 1: P2 (4) < P1’s remaining 7 → preempt. P3 (9) and P4 (5) arrive but are not shorter than P2’s remaining time. Then P4 (5), P1 (7), P3 (9). Average **(9 + 0 + 15 + 2) / 4 = 6.5**.',
        'عند t = 1: P2 (4) أقل من الباقي لـ P1 (7) ← preempt. P3 (9) وP4 (5) بيوصلوا بس مش أقصر من الباقي لـ P2. وبعدين P4 (5) وP1 (7) وP3 (9). المتوسط **(9 + 0 + 15 + 2) / 4 = 6.5**.',
      ),
    },
    {
      kind: 'visual',
      id: 'gantt-fcfs-sjf',
      title: t('Scheduling lab: FCFS, SJF, SRTF', 'معمل الـ Scheduling: FCFS وSJF وSRTF'),
      caption: t(
        'Every decision is explained: who is ready, what the rule compares, who wins. Edit the arrival and burst times to make your own exercises, or load the Final 2023 set.',
        'كل قرار متشرح: مين جاهز، والقاعدة بتقارن إيه، ومين بيكسب. عدّل أوقات الوصول والـ bursts وتعمل تمارين بنفسك، أو حمّل مجموعة Final 2023.',
      ),
    },
    {
      kind: 'confusions',
      items: [
        {
          wrong: t('“FCFS’s major problem is starvation.”', '“المشكلة الكبيرة في الـ FCFS هي الـ starvation.”'),
          right: t('It is the **convoy effect**. FCFS serves everyone eventually; starvation belongs to priority scheduling.', 'هي الـ **convoy effect**. الـ FCFS بيخدم الكل في الآخر؛ والـ starvation تبع الـ priority scheduling.'),
        },
        {
          wrong: t('“SRTF compares the new burst with the running process’s whole burst.”', '“الـ SRTF بيقارن الـ burst الجديد بالـ burst الكامل للشغالة.”'),
          right: t('It compares with the **remaining** time of the running process.', 'بيقارن بالوقت **المتبقي** للـ process الشغالة.'),
        },
        {
          wrong: t('“With arrivals, a process can be chosen before it arrives.”', '“مع الـ arrivals ممكن process تتختار قبل ما توصل.”'),
          right: t('At time t only processes with arrival ≤ t are candidates — that is why P1 runs first in the non-preemptive example.', 'عند الوقت t المرشحين بس اللي arrival بتاعهم ≤ t — وعشان كده P1 اشتغلت الأول في المثال الـ non-preemptive.'),
        },
      ],
    },
    {
      kind: 'exam',
      title: t('Exam radar: convoy effect and the optimal algorithm', 'رادار الامتحان: الـ convoy effect والـ algorithm الأمثل'),
      body: t(
        'Ten items. **FCFS**: which algorithm causes the convoy effect, its disadvantage, a fill-in (“a major problem with FCFS is ___”) and a T/F that blames starvation. **SJF**: its key advantage, two T/F “optimal for average waiting time” statements and “which gives minimum average waiting time”. Two calculations on the Final 2023 set: FCFS and preemptive SJF average waiting time.',
        'عشر أسئلة. **FCFS**: أنهي algorithm بيعمل convoy effect، وعيبه، وfill-in (“a major problem with FCFS is ___”)، وT/F بيقول إن مشكلته starvation. **SJF**: الميزة الأساسية، واتنين T/F “optimal for average waiting time”، و“مين بيدّي أقل متوسط waiting time”. ومسألتين حساب على مجموعة Final 2023: متوسط الـ waiting للـ FCFS وللـ SJF الـ preemptive.',
      ),
      refs: [
        'c6-convoy-algorithm',
        'c6-fcfs-disadvantage',
        'c6-fcfs-problem-fill',
        'c6-fcfs-starvation-tf',
        'c6-sjf-advantage',
        'c6-sjf-optimal-tf-2023',
        'c6-sjf-optimal-tf-2020',
        'c6-min-avg-waiting',
        'c6-calc-fcfs',
        'c6-calc-srtf',
      ],
    },
    {
      kind: 'recap',
      items: [
        t('FCFS: FIFO, nonpreemptive; result depends on arrival order (17 vs 3).', 'FCFS: FIFO وnonpreemptive؛ والنتيجة بتعتمد على ترتيب الوصول (17 قصاد 3).'),
        t('Convoy effect: short processes behind a long one.', 'الـ Convoy effect: processes قصيرة ورا واحدة طويلة.'),
        t('SJF: shortest next burst first — optimal average waiting time; next burst must be predicted.', 'SJF: أقصر burst جاي الأول — أقل متوسط waiting؛ والـ burst الجاي لازم يتوقع.'),
        t('τ(n+1) = α·t(n) + (1 − α)·τ(n); α = 0 ignores history, α = 1 copies the last burst.', 'τ(n+1) = α·t(n) + (1 − α)·τ(n)؛ α = 0 بيتجاهل التاريخ، وα = 1 بينسخ آخر burst.'),
        t('SRTF = preemptive SJF: re-check at every arrival against the remaining time.', 'SRTF = SJF preemptive: راجع عند كل وصول مقارنة بالوقت المتبقي.'),
      ],
    },
  ],
  examFocus: [
    t('Convoy effect → FCFS (not starvation).', 'Convoy effect ← FCFS (مش starvation).'),
    t('SJF is optimal: minimum average waiting time for a given set of processes.', 'الـ SJF هو الأمثل: أقل متوسط waiting time لمجموعة processes معينة.'),
    t('With arrival times, waiting = finish − arrival − burst; preemptive SJF compares remaining times.', 'مع الـ arrival times: waiting = finish − arrival − burst؛ والـ SJF الـ preemptive بيقارن الأوقات المتبقية.'),
  ],
  keyTerms: [
    { term: 'FCFS', definition: t('First-come, first-served: a FIFO ready queue, nonpreemptive.', 'اللي ييجي الأول يتخدم الأول: ready queue FIFO، وnonpreemptive.') },
    { term: 'Convoy effect', definition: t('Short processes waiting behind a long process.', 'Processes قصيرة مستنية ورا process طويلة.') },
    { term: 'SJF', definition: t('Schedules the process with the shortest next CPU burst.', 'بيشغّل الـ process اللي عندها أقصر CPU burst جاي.') },
    { term: 'Exponential averaging', definition: t('τ(n+1) = α·t(n) + (1 − α)·τ(n), predicting the next burst.', 'τ(n+1) = α·t(n) + (1 − α)·τ(n)، لتوقع الـ burst الجاي.') },
    { term: 'SRTF', definition: t('Preemptive SJF: a shorter arrival preempts the running process.', 'SJF الـ preemptive: الواصل الأقصر بيعمل preempt للشغالة.') },
  ],
}
