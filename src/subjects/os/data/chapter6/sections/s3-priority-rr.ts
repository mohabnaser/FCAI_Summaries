import type { Section } from '../../../types'
import { part, t } from '../../sections/helpers'

/** Priority scheduling (starvation, aging), round robin, the quantum trade-off. */
export const priorityRr: Section = {
  id: 'c6-priority-rr',
  chapterId: 'chapter-6',
  order: 3,
  kicker: 'Lesson 03',
  title: 'Priority Scheduling & Round Robin',
  shortTitle: 'Priority & RR',
  summary: t(
    'Priority scheduling — the general form of SJF — with its starvation problem and the aging cure; then round robin, the time-sharing algorithm: the time quantum, the (n − 1)·q bound, why a huge quantum becomes FCFS and a tiny one drowns in context switches, the 80% rule, and the tie rule that decides several exam answers.',
    'الـ Priority scheduling — الشكل العام للـ SJF — ومشكلة الـ starvation وعلاجها بالـ aging؛ وبعدين الـ round robin، algorithm الـ time-sharing: الـ time quantum، وحد (n − 1)·q، وليه الـ quantum الكبير جدًا بيبقى FCFS والصغير جدًا بيغرق في الـ context switches، وقاعدة الـ 80%، وقاعدة التعادل اللي بتحدد إجابات كذا سؤال في الامتحانات.',
  ),
  objectives: [
    t('Schedule by priority (smaller number = higher priority), preemptively and not.', 'تعمل scheduling بالأولوية (رقم أصغر = أولوية أعلى)، preemptive وnon-preemptive.'),
    t('Explain starvation and aging, and SJF as a priority algorithm.', 'تشرح الـ starvation والـ aging، والـ SJF كـ priority algorithm.'),
    t('Draw round-robin Gantt charts, including arrivals and the same-instant tie.', 'ترسم Gantt charts للـ round robin، بوجود arrivals والتعادل في نفس اللحظة.'),
    t('Explain the effect of the quantum size on FCFS-like behaviour, context switches and turnaround.', 'تشرح تأثير حجم الـ quantum على التحول لـ FCFS، والـ context switches، والـ turnaround.'),
  ],
  estimatedMinutes: 22,
  quizId: 'quiz-c6-priority-rr',
  crossRefQuestionIds: ['c3-timeslice-ready-fill'],
  blocks: [
    {
      kind: 'lead',
      text: t(
        'SJF ranks processes by one number — the predicted burst. **Priority scheduling** lets that number be anything: importance, cost, the user who paid. **Round robin** throws ranking away and gives everyone a fair turn of fixed length.',
        'الـ SJF بيرتّب الـ processes برقم واحد — الـ burst المتوقع. والـ **Priority scheduling** بيخلّي الرقم ده يبقى أي حاجة: الأهمية، التكلفة، المستخدم اللي دفع. أما الـ **Round robin** فبيلغي الترتيب خالص وبيدّي كل واحد دور عادل بطول ثابت.',
      ),
    },

    part(t('Priority scheduling', 'الـ Priority scheduling'), t('Highest priority first; smallest integer = highest priority.', 'الأعلى أولوية الأول؛ وأصغر رقم = أعلى أولوية.')),
    {
      kind: 'cards',
      columns: 3,
      items: [
        { icon: 'list', tag: 'rule', title: 'Priority number', body: t('A priority (integer) is associated with each process; the CPU goes to the **highest priority**. Here: **smallest integer ≡ highest priority**.', 'كل process ليها رقم أولوية (integer)؛ والـ CPU بيروح للـ **أعلى أولوية**. هنا: **أصغر رقم ≡ أعلى أولوية**.'), tone: 'cyan' },
        { icon: 'split', tag: 'kinds', title: 'Preemptive or not', body: t('**Preemptive**: a higher-priority arrival takes the CPU. **Nonpreemptive**: it waits for the running burst to finish.', '**Preemptive**: الواصل الأعلى أولوية ياخد الـ CPU. **Nonpreemptive**: يستنى لحد ما الـ burst الشغال يخلص.'), tone: 'violet' },
        { icon: 'scale', tag: 'special case', title: 'SJF is priority', body: t('SJF is priority scheduling where priority is the **inverse of the predicted next CPU burst**.', 'الـ SJF هو priority scheduling الأولوية فيه **معكوس الـ CPU burst الجاي المتوقع**.'), tone: 'teal' },
      ],
    },
    {
      kind: 'gantt',
      title: t('Priority scheduling (all at time 0)', 'Priority scheduling (كلهم عند 0)'),
      algorithm: 'priority',
      processes: [
        { id: 'P1', arrival: 0, burst: 10, priority: 3 },
        { id: 'P2', arrival: 0, burst: 1, priority: 1 },
        { id: 'P3', arrival: 0, burst: 2, priority: 4 },
        { id: 'P4', arrival: 0, burst: 1, priority: 5 },
        { id: 'P5', arrival: 0, burst: 5, priority: 2 },
      ],
      caption: t(
        'Order by priority number 1, 2, 3, 4, 5 → P2, P5, P1, P3, P4. Average waiting **(6 + 0 + 16 + 18 + 1) / 5 = 8.2**.',
        'رتّب برقم الأولوية 1 و2 و3 و4 و5 ← P2 وP5 وP1 وP3 وP4. متوسط الـ waiting = **(6 + 0 + 16 + 18 + 1) / 5 = 8.2**.',
      ),
    },
    {
      kind: 'versus',
      left: { title: 'Problem: starvation', icon: 'hourglass', tone: 'rose', tagline: t('Indefinite blocking', 'Blocking للأبد') },
      right: { title: 'Solution: aging', icon: 'trending', tone: 'teal', tagline: t('Priority grows with waiting time', 'الأولوية بتزيد مع الانتظار') },
      rows: [
        { aspect: 'What happens', left: t('Low-priority processes **may never execute** while higher-priority work keeps arriving', 'الـ processes قليلة الأولوية **ممكن عمرها ما تشتغل** طول ما فيه شغل أعلى أولوية جاي'), right: t('**As time progresses, increase the priority** of the waiting process', '**كل ما الوقت يعدّي، زوّد أولوية** الـ process المستنية') },
        { aspect: 'Result', left: t('A process waits indefinitely', 'process بتستنى للأبد'), right: t('Eventually it becomes the highest priority and runs', 'في الآخر بتبقى الأعلى أولوية وتشتغل') },
      ],
    },

    part(t('Round robin (RR)', 'الـ Round robin (RR)'), t('Everyone gets a time quantum, in turn.', 'كل واحد بياخد time quantum بالدور.')),
    {
      kind: 'definition',
      term: 'Round robin',
      definition: t(
        'Each process gets a small unit of CPU time — the **time quantum q**, usually **10–100 ms**. When it has elapsed, the process is **preempted and added to the end of the ready queue**. A **timer interrupts every quantum** to schedule the next process.',
        'كل process بتاخد وحدة صغيرة من وقت الـ CPU — الـ **time quantum q**، وغالبًا **10–100 ms**. لما الوقت ده يخلص، الـ process **بيتعملها preempt وتتحط في آخر الـ ready queue**. والـ **timer بيعمل interrupt كل quantum** عشان يشغّل اللي بعدها.',
      ),
      detail: t(
        'RR is the algorithm of **time-sharing** systems. A process whose quantum expires goes from **running back to ready** — not to waiting.',
        'الـ RR هو algorithm أنظمة الـ **time-sharing**. والـ process اللي الـ quantum بتاعها خلص بترجع من **running لـ ready** — مش لـ waiting.',
      ),
    },
    {
      kind: 'stats',
      title: t('n processes, quantum q', 'n processes وquantum q'),
      items: [
        { value: '1/n', label: t('Each process gets 1/n of the CPU time, in chunks of at most q', 'كل process بتاخد 1/n من وقت الـ CPU، على شكل قطع بالكتير q'), tone: 'cyan', icon: 'split' },
        { value: '≤ (n − 1)·q', label: t('No process waits more than this for its next turn', 'مفيش process بتستنى أكتر من كده لحد دورها الجاي'), tone: 'amber', icon: 'hourglass' },
        { value: 'every q', label: t('Timer interrupt that triggers the next decision', 'Timer interrupt بيبدأ القرار الجاي'), tone: 'violet', icon: 'timer' },
      ],
    },
    {
      kind: 'gantt',
      title: t('Round robin, q = 4', 'Round robin، q = 4'),
      algorithm: 'rr',
      quantum: 4,
      processes: [
        { id: 'P1', arrival: 0, burst: 24 },
        { id: 'P2', arrival: 0, burst: 3 },
        { id: 'P3', arrival: 0, burst: 3 },
      ],
      caption: t(
        'P2 and P3 finish inside their first quantum; P1 then runs alone, quantum after quantum. Average waiting **(6 + 4 + 7) / 3 ≈ 5.67** (the slide prints 5.66). Typically RR has a **higher average turnaround than SJF, but better response**.',
        'P2 وP3 بيخلصوا جوه أول quantum؛ وبعدين P1 بتشتغل لوحدها quantum ورا quantum. متوسط الـ waiting = **(6 + 4 + 7) / 3 ≈ 5.67** (السلايد كاتبة 5.66). وعادةً الـ RR **الـ average turnaround بتاعه أعلى من الـ SJF، بس الـ response أحسن**.',
      ),
    },
    {
      kind: 'gantt',
      title: t('Round robin, q = 20', 'Round robin، q = 20'),
      algorithm: 'rr',
      quantum: 20,
      processes: [
        { id: 'P1', arrival: 0, burst: 53 },
        { id: 'P2', arrival: 0, burst: 17 },
        { id: 'P3', arrival: 0, burst: 68 },
        { id: 'P4', arrival: 0, burst: 24 },
      ],
      caption: t(
        'Ten slices: P2 finishes in its first turn (17 < 20), P4 in its second, P1 in its third, P3 last. Average waiting **(81 + 20 + 94 + 97) / 4 = 73**.',
        'عشر شرائح: P2 بتخلص في أول دور (17 < 20)، وP4 في تاني دور، وP1 في تالت دور، وP3 في الآخر. متوسط الـ waiting = **(81 + 20 + 94 + 97) / 4 = 73**.',
      ),
    },
    {
      kind: 'callout',
      tone: 'exam',
      title: t('The same-instant tie — read this before any RR problem with arrivals', 'التعادل في نفس اللحظة — اقرا ده قبل أي مسألة RR فيها arrivals'),
      body: t(
        'When a new process arrives at **exactly** the moment the running process’s quantum expires, who enters the ready queue first? The common rule (used in this app) is **new arrival first, then the preempted process**. Some papers use the opposite. Final 2024 Q2.3a has such a tie at t = 3, and the options of Final 2020 Q3.64 and Q3.66 only work with “preempted process first”. In a written answer, state the rule you used in one line.',
        'لما process جديدة توصل في **نفس** اللحظة اللي الـ quantum بتاع الشغالة بيخلص فيها، مين يدخل الـ ready queue الأول؟ القاعدة المشهورة (والمستخدمة في الموقع) هي **الجديد الأول، وبعدين اللي اتعمله preempt**. وفيه ورق بيستخدم العكس. Final 2024 Q2.3a فيه تعادل زي ده عند t = 3، واختيارات Final 2020 Q3.64 وQ3.66 مبتشتغلش غير مع “اللي اتعمله preempt الأول”. وفي الإجابة المكتوبة، اكتب في سطر القاعدة اللي استخدمتها.',
      ),
    },

    part(t('Choosing the quantum', 'اختيار الـ quantum'), t('Too large, too small, and the 80% rule.', 'كبير زيادة، صغير زيادة، وقاعدة الـ 80%.')),
    {
      kind: 'versus',
      left: { title: 'q very large', icon: 'archive', tone: 'violet', tagline: t('q ⇒ ∞', 'q ⇒ ∞') },
      right: { title: 'q very small', icon: 'repeat', tone: 'rose', tagline: t('q ⇒ 0', 'q ⇒ 0') },
      rows: [
        { aspect: 'Behaves like', left: t('**FIFO / FCFS** — nobody is ever preempted', '**FIFO / FCFS** — محدش بيتعمله preempt') , right: t('Perfect sharing, but the CPU spends its time switching', 'مشاركة مثالية، بس الـ CPU بيقضي وقته في التبديل') },
        { aspect: 'Problem', left: t('Poor response; the convoy effect returns', 'response وحش؛ والـ convoy effect بيرجع'), right: t('**Overhead is too high**', '**الـ overhead عالي جدًا**') },
        { aspect: 'Rule', left: t('—', '—'), right: t('q must be **large with respect to the context-switch time**', 'الـ q لازم يبقى **كبير بالنسبة لوقت الـ context switch**') },
      ],
      verdict: t(
        'Rule of thumb: **80% of CPU bursts should be shorter than q** — most processes then finish inside one quantum.',
        'القاعدة: **80% من الـ CPU bursts لازم تكون أقصر من q** — فأغلب الـ processes تخلص جوه quantum واحد.',
      ),
    },
    {
      kind: 'table',
      caption: t('One process of 10 time units', 'process واحدة طولها 10 وحدات'),
      headers: ['Quantum', 'Pieces', 'Context switches'],
      rows: [
        [t('12'), t('1'), t('0')],
        [t('6'), t('2 (6 + 4)'), t('1')],
        [t('1'), t('10'), t('9')],
      ],
    },
    {
      kind: 'visual',
      id: 'quantum-explorer',
      title: t('Quantum explorer', 'مستكشف الـ quantum'),
      caption: t(
        'The lecture’s set P1 = 6, P2 = 3, P3 = 1, P4 = 7: average turnaround for q = 1 … 7 is 11, 11.5, 10.75, 11.5, 12.25, 10.5, 10.5 — it does not simply improve with q. From q = 7 on, RR is FCFS.',
        'مجموعة المحاضرة P1 = 6 وP2 = 3 وP3 = 1 وP4 = 7: متوسط الـ turnaround لـ q = 1 … 7 هو 11 و11.5 و10.75 و11.5 و12.25 و10.5 و10.5 — يعني مش بيتحسن على طول مع q. ومن q = 7 الـ RR بقى FCFS.',
      ),
    },
    {
      kind: 'visual',
      id: 'gantt-priority-rr',
      title: t('Scheduling lab: priority and round robin', 'معمل الـ Scheduling: priority وround robin'),
      caption: t(
        'Step through priority (both kinds) and RR. The past-exam sets are included: Final 2023 Q3 (q = 2 and priority), Final 2024 Q2.3a (q = 3) and Final 2020 Q3.63–66 (q = 2, preempted-first tie). Solve on paper first.',
        'امشي خطوة بخطوة في الـ priority (بنوعيه) والـ RR. ومجموعات الامتحانات موجودة: Final 2023 Q3 (q = 2 والـ priority)، وFinal 2024 Q2.3a (q = 3)، وFinal 2020 Q3.63–66 (q = 2، والتعادل: اللي اتعمله preempt الأول). حلها على ورقة الأول.',
      ),
    },
    {
      kind: 'confusions',
      items: [
        {
          wrong: t('“Starvation is the solution to indefinite blocking.”', '“الـ Starvation هو حل الـ indefinite blocking.”'),
          right: t('Starvation **is** indefinite blocking; **aging** is the solution.', 'الـ Starvation **هو** الـ indefinite blocking؛ والحل هو الـ **aging**.'),
        },
        {
          wrong: t('“Very small time slices turn RR into FCFS.”', '“الشرائح الصغيرة جدًا بتحوّل الـ RR لـ FCFS.”'),
          right: t('Very **large** slices do; very small ones only add context-switch overhead.', 'الشرائح **الكبيرة** جدًا هي اللي بتعمل كده؛ والصغيرة جدًا بتزوّد الـ overhead بتاع الـ context switch بس.'),
        },
        {
          wrong: t('“A process whose quantum expires goes to waiting.”', '“الـ process اللي الـ quantum بتاعها خلص بتروح waiting.”'),
          right: t('It goes back to **ready** (end of the ready queue); it can still run.', 'بترجع **ready** (آخر الـ ready queue)؛ لأنها لسه تقدر تشتغل.'),
        },
        {
          wrong: t('“RR gives the best average waiting time.”', '“الـ RR بيدّي أحسن متوسط waiting time.”'),
          right: t('SJF does. RR gives the best **response** time.', 'الـ SJF هو اللي بيدّي كده. الـ RR بيدّي أحسن **response** time.'),
        },
      ],
    },
    {
      kind: 'exam',
      title: t('Exam radar: aging, the quantum and the calculations', 'رادار الامتحان: الـ aging والـ quantum والمسائل'),
      body: t(
        'Sixteen items. **Priority**: aging (two MCQs, one with “starvation” as a distractor), SJF as priority with the inverse burst. **RR**: used in time-sharing, best response for interactive users, a large quantum behaves like FCFS (two MCQs and a T/F about an infinite quantum), and — shared with Chapter 3 — an expired time slot sends the process to **ready**. **Calculations**: the Final 2023 set under RR q = 2 (flagged: 9.75 is not an option) and non-preemptive priority, the Final 2020 RR q = 2 set (four items, two flagged because no option matches), and the Final 2024 RR q = 3 written problem.',
        'ستاشر سؤال. **Priority**: الـ aging (سؤالين MCQ، واحد فيهم “starvation” كتمويه)، والـ SJF كـ priority بمعكوس الـ burst. **RR**: بيستخدم في الـ time-sharing، وأحسن response للمستخدمين التفاعليين، والـ quantum الكبير بيبقى FCFS (سؤالين MCQ وT/F عن quantum لا نهائي)، و— مشترك مع Chapter 3 — لما الـ time slot يخلص الـ process بتروح **ready**. **المسائل**: مجموعة Final 2023 بالـ RR q = 2 (للمراجعة: 9.75 مش من الاختيارات) والـ priority الـ non-preemptive، ومجموعة Final 2020 بالـ RR q = 2 (أربع أسئلة، اتنين منهم للمراجعة لأن مفيش اختيار مظبوط)، ومسألة Final 2024 المكتوبة بالـ RR q = 3.',
      ),
      refs: [
        'c6-aging-2024',
        'c6-aging-2020',
        'c6-sjf-as-priority',
        'c6-timesharing-rr',
        'c6-response-interactive',
        'c6-rr-large-quantum-2024',
        'c6-rr-large-slices-2020',
        'c6-fcfs-rr-infinite-tf',
        'c3-timeslice-ready-fill',
        'c6-calc-rr',
        'c6-calc-priority',
        'c6-rr2-p1-waiting',
        'c6-rr2-p2-turnaround',
        'c6-rr2-p4-waiting',
        'c6-rr2-avg-turnaround',
        'c6-rr3-calc',
      ],
    },
    {
      kind: 'recap',
      items: [
        t('Priority: smallest number = highest priority; preemptive or not; SJF = priority by 1 / burst.', 'Priority: أصغر رقم = أعلى أولوية؛ preemptive أو لأ؛ والـ SJF = priority بـ 1 / burst.'),
        t('Starvation (low priority never runs) → aging (raise priority while waiting).', 'Starvation (الأولوية القليلة عمرها ما تشتغل) ← aging (زوّد الأولوية مع الانتظار).'),
        t('RR: quantum q (10–100 ms), preempt → tail of the ready queue, timer every q.', 'RR: quantum q (10–100 ms)، preempt ← آخر الـ ready queue، والـ timer كل q.'),
        t('n processes: 1/n of the CPU each, wait ≤ (n − 1)·q.', 'n processes: كل واحدة 1/n من الـ CPU، والانتظار ≤ (n − 1)·q.'),
        t('q large → FCFS; q small → overhead; 80% of bursts shorter than q.', 'q كبير ← FCFS؛ q صغير ← overhead؛ و80% من الـ bursts أقصر من q.'),
        t('RR: worse average turnaround than SJF, better response.', 'RR: متوسط turnaround أسوأ من الـ SJF، بس response أحسن.'),
      ],
    },
  ],
  examFocus: [
    t('Starvation of low-priority processes is solved by aging.', 'الـ starvation للـ processes قليلة الأولوية حلها الـ aging.'),
    t('Time-sharing uses RR; RR gives the best response; a very large quantum makes it FCFS.', 'الـ time-sharing بيستخدم RR؛ والـ RR بيدّي أحسن response؛ والـ quantum الكبير جدًا بيخليه FCFS.'),
    t('In RR problems watch the same-instant tie and say which rule you used.', 'في مسائل الـ RR خد بالك من التعادل في نفس اللحظة وقول استخدمت أنهي قاعدة.'),
  ],
  keyTerms: [
    { term: 'Priority scheduling', definition: t('The CPU goes to the highest-priority process (smallest number).', 'الـ CPU بيروح للـ process الأعلى أولوية (أصغر رقم).') },
    { term: 'Starvation', definition: t('Low-priority processes may never execute.', 'الـ processes قليلة الأولوية ممكن عمرها ما تشتغل.') },
    { term: 'Aging', definition: t('Increasing the priority of a process as it waits.', 'زيادة أولوية الـ process كل ما تستنى.') },
    { term: 'Time quantum', definition: t('The slice of CPU time each process gets in round robin (10–100 ms).', 'شريحة وقت الـ CPU اللي كل process بتاخدها في الـ round robin (10–100 ms).') },
    { term: 'Round robin', definition: t('Preemptive FCFS with a time quantum; the time-sharing algorithm.', 'FCFS preemptive بـ time quantum؛ وهو algorithm الـ time-sharing.') },
  ],
}
