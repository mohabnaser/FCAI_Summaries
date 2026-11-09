import type { Section } from '../../../types'
import { part, t } from '../../sections/helpers'

const workload = [
  { id: 'P1', arrival: 0, burst: 10 },
  { id: 'P2', arrival: 0, burst: 29 },
  { id: 'P3', arrival: 0, burst: 3 },
  { id: 'P4', arrival: 0, burst: 7 },
  { id: 'P5', arrival: 0, burst: 12 },
]

/** Algorithm evaluation (deterministic, queueing, simulation, implementation) and the problem clinic. */
export const evaluation: Section = {
  id: 'c6-evaluation',
  chapterId: 'chapter-6',
  order: 5,
  kicker: 'Lesson 05',
  title: 'Evaluating Algorithms & the Exam Problem Clinic',
  shortTitle: 'Evaluation & Clinic',
  summary: t(
    'How to choose an algorithm for a real OS: define the criteria, then evaluate with deterministic modeling, queueing models (Little’s formula), simulation or implementation — each with its advantages and disadvantages, exactly as the essay question asks. The lesson ends with a full problem clinic: every past-exam process set, every algorithm, compared side by side.',
    'إزاي تختار algorithm لـ OS حقيقي: حدد المعايير، وبعدين قيّم بالـ deterministic modeling أو الـ queueing models (قانون Little) أو الـ simulation أو الـ implementation — ولكل واحدة مميزاتها وعيوبها، بالظبط زي ما سؤال المقال بيطلب. والدرس بيخلص بعيادة مسائل كاملة: كل مجموعات processes الامتحانات، وكل الـ algorithms، متقارنين جنب بعض.',
  ),
  objectives: [
    t('Explain why criteria must be defined before an algorithm is chosen.', 'تشرح ليه لازم نحدد المعايير قبل ما نختار algorithm.'),
    t('Evaluate FCFS, SJF and RR on one workload by deterministic modeling.', 'تقيّم FCFS وSJF وRR على workload واحدة بالـ deterministic modeling.'),
    t('State and apply Little’s formula n = λ × W.', 'تقول قانون Little n = λ × W وتطبقه.'),
    t('Give an advantage and a disadvantage of each of the four evaluation methods.', 'تدّي ميزة وعيب لكل طريقة من الأربع طرق.'),
  ],
  estimatedMinutes: 18,
  quizId: 'quiz-c6-evaluation',
  blocks: [
    {
      kind: 'lead',
      text: t(
        'How do you select a CPU-scheduling algorithm for an OS? There are many algorithms, each with parameters. **First determine the criteria** (for example: maximize CPU utilization under the constraint that response time stays below 1 second), **then evaluate** the candidates.',
        'إزاي تختار CPU-scheduling algorithm لـ OS؟ فيه algorithms كتير، وكل واحدة ليها parameters. **حدد المعايير الأول** (مثلًا: أقصى CPU utilization بشرط إن الـ response time يفضل أقل من ثانية)، **وبعدين قيّم** المرشحين.',
      ),
    },
    {
      kind: 'cards',
      columns: 4,
      items: [
        { icon: 'list', tag: '1', title: 'Deterministic modeling', body: t('Exact numbers for one fixed workload.', 'أرقام دقيقة لـ workload واحدة ثابتة.'), tone: 'cyan' },
        { icon: 'network', tag: '2', title: 'Queueing models', body: t('Probabilities and formulas.', 'احتمالات ومعادلات.'), tone: 'violet' },
        { icon: 'refresh', tag: '3', title: 'Simulation', body: t('A programmed model of the system.', 'موديل متبرمج للنظام.'), tone: 'teal' },
        { icon: 'server', tag: '4', title: 'Implementation', body: t('Put it in a real OS and measure.', 'حطه في OS حقيقي وقيس.'), tone: 'amber' },
      ],
    },

    part(t('Deterministic modeling', 'الـ Deterministic modeling'), t('Analytic evaluation on a predetermined workload.', 'تقييم analytic على workload محددة مسبقًا.')),
    {
      kind: 'definition',
      term: 'Deterministic modeling',
      definition: t(
        'A type of **analytic evaluation**: take a **particular predetermined workload** and define the performance of each algorithm for that workload.',
        'نوع من الـ **analytic evaluation**: خد **workload معينة محددة مسبقًا** واحسب أداء كل algorithm عليها.',
      ),
    },
    {
      kind: 'gantt',
      title: t('Five processes at time 0 — FCFS', 'خمس processes عند 0 — FCFS'),
      algorithm: 'fcfs',
      processes: workload,
      caption: t('Average waiting **28 ms**.', 'متوسط الـ waiting = **28 ms**.'),
    },
    {
      kind: 'gantt',
      title: t('The same workload — non-preemptive SJF', 'نفس الـ workload — SJF الـ non-preemptive'),
      algorithm: 'sjf',
      processes: workload,
      caption: t('Average waiting **13 ms** — the minimum.', 'متوسط الـ waiting = **13 ms** — الأقل.'),
    },
    {
      kind: 'gantt',
      title: t('The same workload — RR, q = 10', 'نفس الـ workload — RR، q = 10'),
      algorithm: 'rr',
      quantum: 10,
      processes: workload,
      caption: t('Average waiting **23 ms**.', 'متوسط الـ waiting = **23 ms**.'),
    },
    {
      kind: 'versus',
      left: { title: 'Advantages', icon: 'check', tone: 'teal', tagline: t('Simple and fast', 'بسيط وسريع') },
      right: { title: 'Disadvantages', icon: 'x', tone: 'rose', tagline: t('Too specific', 'محدد زيادة') },
      rows: [
        { aspect: 'Result', left: t('**Exact numbers** that are easy to compare', '**أرقام دقيقة** وسهلة المقارنة'), right: t('Requires **exact numbers for input**', 'محتاج **أرقام دقيقة كمدخل**') },
        { aspect: 'Scope', left: t('Shows trends with many examples', 'بيوضّح اتجاهات لو عملت أمثلة كتير'), right: t('Its answers **apply only to those cases**', 'الإجابات **بتنطبق على الحالات دي بس**') },
      ],
    },

    part(t('Queueing models', 'الـ Queueing models'), t('When the exact workload is unknown, describe it statistically.', 'لما الـ workload الدقيقة مش معروفة، اوصفها إحصائيًا.')),
    {
      kind: 'lead',
      text: t(
        'Describe the **arrival of processes, and CPU and I/O bursts, probabilistically** — commonly exponential, described by the mean. The computer becomes a **network of servers, each with a queue of waiting processes**; knowing arrival and service rates, you compute utilization, average queue length and average wait time.',
        'اوصف **وصول الـ processes والـ CPU والـ I/O bursts بالاحتمالات** — غالبًا exponential، ويتوصف بالـ mean. والكمبيوتر بيبقى **شبكة servers، كل واحد عنده queue من الـ processes المستنية**؛ ولما تعرف معدل الوصول ومعدل الخدمة، تحسب الـ utilization ومتوسط طول الـ queue ومتوسط الانتظار.',
      ),
    },
    {
      kind: 'stats',
      title: t('Little’s formula: n = λ × W', 'قانون Little: n = λ × W'),
      items: [
        { value: 'n', label: t('Average queue length', 'متوسط طول الـ queue'), tone: 'cyan', icon: 'list' },
        { value: 'λ', label: t('Average arrival rate into the queue', 'متوسط معدل الوصول للـ queue'), tone: 'violet', icon: 'inbox' },
        { value: 'W', label: t('Average waiting time in the queue', 'متوسط وقت الانتظار في الـ queue'), tone: 'amber', icon: 'hourglass' },
      ],
    },
    {
      kind: 'callout',
      tone: 'insight',
      title: t('Why it holds — and a worked example', 'ليه صحيح — ومثال محلول'),
      body: t(
        'In **steady state**, processes leaving the queue must equal processes arriving, so n = λ × W. It is valid for **any scheduling algorithm and arrival distribution**. Example: on average 7 processes arrive per second and 14 are in the queue → W = n / λ = 14 / 7 = **2 seconds**.',
        'في الـ **steady state**، اللي بيخرج من الـ queue لازم يساوي اللي بيدخل، فـ n = λ × W. وده صحيح مع **أي scheduling algorithm وأي arrival distribution**. مثال: في المتوسط 7 processes بتوصل كل ثانية و14 في الـ queue ← W = n / λ = 14 / 7 = **2 ثانية**.',
      ),
    },
    {
      kind: 'versus',
      left: { title: 'Advantages', icon: 'check', tone: 'teal', tagline: t('No need to run anything', 'مش محتاج تشغّل حاجة') },
      right: { title: 'Disadvantages', icon: 'x', tone: 'rose', tagline: t('Only approximations', 'تقريبية بس') },
      rows: [
        { aspect: 'Use', left: t('Compare algorithms using arrival and service rates; Little’s formula is general', 'قارن الـ algorithms بمعدلات الوصول والخدمة؛ وقانون Little عام'), right: t('Classes of algorithms and distributions that can be handled are **limited**', 'أنواع الـ algorithms والـ distributions اللي ينفع تتحل **محدودة**') },
        { aspect: 'Accuracy', left: t('Mathematical, repeatable', 'رياضي ويتكرر'), right: t('The math of complex algorithms is difficult, so distributions are often **unrealistic** simplifications', 'رياضيات الـ algorithms المعقدة صعبة، فالـ distributions بتبقى تبسيطات **مش واقعية**') },
      ],
    },

    part(t('Simulation', 'الـ Simulation'), t('A programmed model of the computer system.', 'موديل متبرمج لنظام الكمبيوتر.')),
    {
      kind: 'cards',
      columns: 3,
      items: [
        { icon: 'boxes', title: 'Model', body: t('**Data structures** represent the major components of the system; the **clock is a variable**.', '**Data structures** بتمثل المكونات الأساسية للنظام؛ والـ **clock عبارة عن variable**.'), tone: 'cyan' },
        { icon: 'gauge', title: 'Measure', body: t('Gather **statistics** indicating algorithm performance.', 'اجمع **إحصائيات** بتوضّح أداء الـ algorithm.'), tone: 'violet' },
        { icon: 'database', title: 'Input data', body: t('**Random numbers** by probability, distributions defined **mathematically or empirically**, or **trace tapes** of real event sequences.', '**أرقام عشوائية** بالاحتمالات، أو distributions متعرّفة **رياضيًا أو تجريبيًا**، أو **trace tapes** لأحداث حقيقية متسجلة.'), tone: 'teal' },
      ],
    },
    {
      kind: 'flow',
      title: t('Evaluating schedulers with a trace tape', 'تقييم الـ schedulers بالـ trace tape'),
      steps: [
        { icon: 'cpu', label: 'Actual process execution', detail: t('record a real system', 'سجّل نظام حقيقي'), tone: 'cyan' },
        { icon: 'tape', label: 'Trace tape', detail: t('CPU 10 · I/O 213 · CPU 12 · I/O 112 · CPU 2 · I/O 147 · CPU 173 …', 'CPU 10 · I/O 213 · CPU 12 · I/O 112 · CPU 2 · I/O 147 · CPU 173 …'), tone: 'violet' },
        { icon: 'split', label: 'Simulations', detail: t('FCFS, SJF, RR (q = 14) replay the same trace', 'FCFS وSJF وRR (q = 14) بيعيدوا نفس الـ trace'), tone: 'teal' },
        { icon: 'gauge', label: 'Performance statistics', detail: t('one set per algorithm, directly comparable', 'مجموعة لكل algorithm، وتتقارن مباشرة'), tone: 'amber' },
      ],
    },
    {
      kind: 'versus',
      left: { title: 'Advantages', icon: 'check', tone: 'teal', tagline: t('More accurate than queueing models', 'أدق من الـ queueing models') },
      right: { title: 'Disadvantages', icon: 'x', tone: 'rose', tagline: t('Expensive', 'مكلفة') },
      rows: [
        { aspect: 'Input', left: t('Trace tapes compare algorithms on the **same real input**', 'الـ Trace tapes بتقارن الـ algorithms على **نفس المدخل الحقيقي**'), right: t('Traces need large storage', 'الـ traces محتاجة مساحة تخزين كبيرة') },
        { aspect: 'Cost', left: t('Any algorithm can be modelled', 'أي algorithm ينفع يتعمل له موديل'), right: t('**High cost, high computation time**; more detail = more accurate but more expensive; still not perfect', '**تكلفة عالية ووقت حساب طويل**؛ تفاصيل أكتر = دقة أكتر بس تكلفة أكتر؛ وبرضه مش مثالية') },
      ],
    },

    part(t('Implementation', 'الـ Implementation'), t('The only completely accurate method.', 'الطريقة الوحيدة الدقيقة تمامًا.')),
    {
      kind: 'versus',
      left: { title: 'Advantages', icon: 'check', tone: 'teal', tagline: t('Real system, real users', 'نظام حقيقي ومستخدمين حقيقيين') },
      right: { title: 'Disadvantages', icon: 'x', tone: 'rose', tagline: t('High cost, high risk', 'تكلفة ومخاطرة عالية') },
      rows: [
        { aspect: 'Accuracy', left: t('Implement the new scheduler and **test it in real systems** — completely accurate', 'نفّذ الـ scheduler الجديد و**اختبره في أنظمة حقيقية** — دقيق تمامًا'), right: t('Coding the algorithm, modifying the OS, testing; **user reactions** are a risk', 'كتابة الـ algorithm وتعديل الـ OS والاختبار؛ و**رد فعل المستخدمين** مخاطرة') },
        { aspect: 'Over time', left: t('Most flexible schedulers can be **modified per site or system**; APIs let priorities be changed', 'أغلب الـ schedulers المرنة ممكن **تتعدل حسب المكان أو النظام**؛ والـ APIs بتسمح بتغيير الأولويات'), right: t('The **environment varies** — users adapt their programs to the scheduler', 'الـ **بيئة بتتغير** — المستخدمين بيكيّفوا برامجهم على الـ scheduler') },
      ],
    },
    {
      kind: 'table',
      caption: t('The essay answer in one table', 'إجابة سؤال المقال في جدول واحد'),
      headers: ['Method', 'How', 'Advantage', 'Disadvantage'],
      rows: [
        [t('Deterministic modeling'), t('Compute each algorithm on one fixed workload (Gantt charts)', 'احسب كل algorithm على workload ثابتة (Gantt charts)'), t('Simple, fast, exact numbers', 'بسيطة وسريعة وأرقام دقيقة'), t('Needs exact input; results only for that workload', 'محتاجة مدخل دقيق؛ والنتايج للـ workload دي بس')],
        [t('Queueing models'), t('Probabilistic arrivals and bursts; network of servers; Little’s n = λ × W', 'وصول وbursts بالاحتمالات؛ شبكة servers؛ وLittle n = λ × W'), t('Analyse without running; general formulas', 'تحليل من غير تشغيل؛ ومعادلات عامة'), t('Approximations; complex cases hard, distributions unrealistic', 'تقريبية؛ والحالات المعقدة صعبة والـ distributions مش واقعية')],
        [t('Simulation'), t('Programmed model, clock variable, random / empirical / trace-tape input', 'موديل متبرمج، وclock variable، ومدخل عشوائي / تجريبي / trace tape'), t('More accurate; same real trace for every algorithm', 'أدق؛ ونفس الـ trace الحقيقي لكل algorithm'), t('Expensive, long computation; still a model', 'مكلفة ووقت حساب طويل؛ وبرضه موديل')],
        [t('Implementation'), t('Code it into a real OS and measure', 'اكتبه في OS حقيقي وقيس'), t('The only completely accurate evaluation', 'التقييم الوحيد الدقيق تمامًا'), t('High cost and risk; environment changes', 'تكلفة ومخاطرة عالية؛ والبيئة بتتغير')],
      ],
    },

    part(t('Exam problem clinic', 'عيادة مسائل الامتحانات'), t('Every past-exam set, every algorithm, side by side.', 'كل مجموعات الامتحانات، وكل الـ algorithms، جنب بعض.')),
    {
      kind: 'visual',
      id: 'scheduling-lab',
      title: t('The full scheduling lab', 'معمل الـ scheduling الكامل'),
      caption: t(
        'Load a past-exam set, choose an algorithm and step through the decisions — or press **Compare all** for deterministic modeling of every algorithm at once (Undated B Q6d asks exactly which one gives the minimum). The tie-rule switch reproduces both readings of an RR problem.',
        'حمّل مجموعة من الامتحانات، واختار algorithm وامشي في القرارات خطوة بخطوة — أو دوس **Compare all** عشان تعمل deterministic modeling لكل الـ algorithms مرة واحدة (Undated B Q6d بيسأل بالظبط مين بيدّي الأقل). ومفتاح قاعدة التعادل بيطلّعلك القراءتين لأي مسألة RR.',
      ),
    },
    {
      kind: 'checklist',
      title: t('Before you hand in a scheduling answer', 'قبل ما تسلّم إجابة مسألة scheduling'),
      items: [
        t('At every decision, only processes with arrival ≤ t were candidates.', 'عند كل قرار، المرشحين كانوا بس اللي arrival بتاعهم ≤ t.'),
        t('Preemptive algorithms were re-checked at every arrival (SRTF: remaining time).', 'الـ preemptive اتراجع عند كل وصول (SRTF: الوقت المتبقي).'),
        t('Ties broken by arrival order (FCFS); RR same-instant tie stated.', 'التعادل اتكسر بترتيب الوصول (FCFS)؛ وتعادل الـ RR في نفس اللحظة مكتوب.'),
        t('Every boundary time written under the Gantt chart; the chart ends at Σ bursts (plus idle).', 'كل أوقات الحدود مكتوبة تحت الـ Gantt chart؛ والـ chart بيخلص عند مجموع الـ bursts (+ الـ idle).'),
        t('TAT = F − A and WT = TAT − B for every process; no negative waiting time.', 'TAT = F − A وWT = TAT − B لكل process؛ ومفيش waiting بالسالب.'),
        t('For one workload, the algorithm with the minimum average waiting also has the minimum average turnaround.', 'لنفس الـ workload، الـ algorithm اللي عنده أقل متوسط waiting عنده كمان أقل متوسط turnaround.'),
      ],
    },
    {
      kind: 'confusions',
      items: [
        {
          wrong: t('“Deterministic modeling uses probability distributions.”', '“الـ Deterministic modeling بيستخدم probability distributions.”'),
          right: t('It uses one **fixed, known** workload. Probabilities belong to **queueing models**.', 'بيستخدم workload واحدة **ثابتة ومعروفة**. والاحتمالات تبع الـ **queueing models**.'),
        },
        {
          wrong: t('“Little’s formula only holds for FCFS.”', '“قانون Little بيشتغل مع FCFS بس.”'),
          right: t('It holds for **any** scheduling algorithm and arrival distribution, in steady state.', 'بيشتغل مع **أي** scheduling algorithm وأي arrival distribution، في الـ steady state.'),
        },
        {
          wrong: t('“Simulation is the completely accurate method.”', '“الـ Simulation هي الطريقة الدقيقة تمامًا.”'),
          right: t('Only **implementation** is completely accurate; simulation is still a model.', '**الـ implementation** بس هي الدقيقة تمامًا؛ والـ simulation برضه موديل.'),
        },
      ],
    },
    {
      kind: 'exam',
      title: t('Exam radar: the evaluation essay and the four-algorithm problem', 'رادار الامتحان: مقال التقييم ومسألة الأربع algorithms'),
      body: t(
        'Five items. The **evaluation-methods essay** appears in two papers (10 and 8 marks): name the four methods with an advantage and a disadvantage each — the table above is the answer. Undated B Q6 gives five processes with arrivals and priorities and asks for (a) four Gantt charts — FCFS, preemptive SJF, non-preemptive priority, RR q = 3 — (b) every turnaround time, (c) every waiting time and (d) which algorithm minimizes each average.',
        'خمس أسئلة. **مقال طرق التقييم** جه في امتحانين (10 و8 درجات): اذكر الأربع طرق ولكل واحدة ميزة وعيب — والجدول اللي فوق هو الإجابة. وUndated B Q6 بيدّيك خمس processes بـ arrivals وpriorities وبيطلب (a) أربع Gantt charts — FCFS وSJF الـ preemptive والـ priority الـ non-preemptive وRR q = 3 — و(b) كل الـ turnaround times، و(c) كل الـ waiting times، و(d) أنهي algorithm بيقلل كل متوسط.',
      ),
      refs: ['c6-evaluation-essay', 'c6-b-gantt', 'c6-b-turnaround', 'c6-b-waiting', 'c6-b-minimum'],
    },
    {
      kind: 'recap',
      items: [
        t('Define the criteria first, then evaluate.', 'حدد المعايير الأول، وبعدين قيّم.'),
        t('Deterministic: one fixed workload, exact — FCFS 28, SJF 13, RR(10) 23 ms.', 'Deterministic: workload واحدة ثابتة ودقيق — FCFS 28 وSJF 13 وRR(10) 23 ms.'),
        t('Queueing: probabilistic, network of servers; Little n = λ × W (14 / 7 = 2 s).', 'Queueing: بالاحتمالات وشبكة servers؛ وLittle n = λ × W (14 / 7 = 2 ثانية).'),
        t('Simulation: model + clock variable + random / empirical / trace-tape input; accurate but expensive.', 'Simulation: موديل + clock variable + مدخل عشوائي / تجريبي / trace tape؛ دقيقة بس مكلفة.'),
        t('Implementation: completely accurate, high cost and risk, environment changes.', 'Implementation: دقيقة تمامًا، وتكلفة ومخاطرة عالية، والبيئة بتتغير.'),
      ],
    },
  ],
  examFocus: [
    t('Four evaluation methods, each with an advantage and a disadvantage.', 'أربع طرق تقييم، ولكل واحدة ميزة وعيب.'),
    t('Little’s formula n = λ × W holds for any algorithm and arrival distribution.', 'قانون Little n = λ × W صحيح مع أي algorithm وأي arrival distribution.'),
    t('A four-algorithm problem is deterministic modeling: same workload, compare the averages.', 'مسألة الأربع algorithms هي deterministic modeling: نفس الـ workload وقارن المتوسطات.'),
  ],
  keyTerms: [
    { term: 'Deterministic modeling', definition: t('Analytic evaluation on a particular predetermined workload.', 'تقييم analytic على workload معينة محددة مسبقًا.') },
    { term: 'Queueing model', definition: t('The system as a network of servers with queues, described probabilistically.', 'النظام كشبكة servers بـ queues، متوصف بالاحتمالات.') },
    { term: 'Little’s formula', definition: t('n = λ × W in steady state.', 'n = λ × W في الـ steady state.') },
    { term: 'Simulation', definition: t('A programmed model of the system driven by random, empirical or trace input.', 'موديل متبرمج للنظام بمدخل عشوائي أو تجريبي أو trace.') },
    { term: 'Trace tape', definition: t('A recording of a real sequence of events, replayed into each simulation.', 'تسجيل لأحداث حقيقية بيتعاد في كل simulation.') },
  ],
}
