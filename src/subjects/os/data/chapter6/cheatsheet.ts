import type { LText } from '../../types'
import type { CheatSheetGroup } from '../cheatsheet'

const t = (en: string, ar: string): LText => ({ en, ar })

export const chapter6CheatSheetGroups: CheatSheetGroup[] = [
  {
    id: 'c6-basics',
    title: 'Basics & criteria',
    subtitle: 'Scheduler, dispatcher, formulas',
    points: [
      t('Goal: **maximum CPU utilization**; CPU–I/O burst cycle; most CPU bursts are short (I/O-bound → many short bursts).', 'الهدف: **أقصى CPU utilization**؛ ودورة CPU–I/O burst؛ وأغلب الـ CPU bursts قصيرة (I/O-bound ← bursts قصيرة كتير).'),
      t('**Short-term scheduler** picks from the ready queue; **dispatcher**: switch context, user mode, jump. **Dispatch latency** = stop one, start another.', 'الـ **Short-term scheduler** بيختار من الـ ready queue؛ والـ **dispatcher**: context switch وuser mode وjump. والـ **Dispatch latency** = وقّف واحدة وشغّل التانية.'),
      t('Decisions: 1 run→wait, 4 exit = **nonpreemptive**; 2 run→ready, 3 wait→ready = **preemptive**.', 'القرارات: 1 run←wait و4 exit = **nonpreemptive**؛ و2 run←ready و3 wait←ready = **preemptive**.'),
      t('Max utilization & throughput; min turnaround, waiting, response (first response, not full output).', 'Max للـ utilization والـ throughput؛ وmin للـ turnaround والـ waiting والـ response (أول رد، مش الـ output كله).'),
    ],
    table: {
      headers: ['Quantity', 'Formula'],
      rows: [
        [t('Turnaround', 'Turnaround'), t('finish − arrival', 'finish − arrival')],
        [t('Waiting', 'Waiting'), t('turnaround − burst = finish − (arrival + burst)', 'turnaround − burst = finish − (arrival + burst)')],
        [t('Response', 'Response'), t('first start − arrival', 'first start − arrival')],
      ],
    },
  },
  {
    id: 'c6-fcfs-sjf',
    title: 'FCFS · SJF · SRTF',
    subtitle: 'Lecture results to remember',
    table: {
      headers: ['Example', 'Avg waiting'],
      rows: [
        [t('FCFS 24, 3, 3 in that order', 'FCFS 24 و3 و3 بالترتيب ده'), t('17 (order 3, 3, 24 → 3)', '17 (بترتيب 3 و3 و24 ← 3)')],
        [t('SJF 6, 8, 7, 3', 'SJF 6 و8 و7 و3'), t('7', '7')],
        [t('SJF with arrivals (0/7, 2/4, 4/1, 5/4)', 'SJF بـ arrivals (0/7 و2/4 و4/1 و5/4)'), t('4 non-preemptive · 3 SRTF', '4 non-preemptive · 3 SRTF')],
        [t('SRTF 0/8, 1/4, 2/9, 3/5', 'SRTF 0/8 و1/4 و2/9 و3/5'), t('6.5', '6.5')],
      ],
    },
    points: [
      t('FCFS → **convoy effect** (not starvation). SJF → **optimal** minimum average waiting, but the next burst must be predicted.', 'FCFS ← **convoy effect** (مش starvation). SJF ← **الأمثل** في متوسط الـ waiting، بس الـ burst الجاي لازم يتوقع.'),
      t('**τ(n+1) = α·t(n) + (1 − α)·τ(n)**; α = 0 → τ(n+1) = τ(n); α = 1 → τ(n+1) = t(n); usually α = ½.', '**τ(n+1) = α·t(n) + (1 − α)·τ(n)**؛ α = 0 ← τ(n+1) = τ(n)؛ α = 1 ← τ(n+1) = t(n)؛ وغالبًا α = ½.'),
    ],
  },
  {
    id: 'c6-priority-rr',
    title: 'Priority · Round robin',
    subtitle: 'Starvation, aging, the quantum',
    points: [
      t('Priority: smallest number = highest. SJF = priority with **inverse** of the predicted burst. Starvation → **aging**.', 'Priority: أصغر رقم = أعلى أولوية. SJF = priority بـ **معكوس** الـ burst المتوقع. Starvation ← **aging**.'),
      t('RR: q = 10–100 ms; expired → **tail of the ready queue**; each gets 1/n; wait ≤ (n − 1)·q; timer every q.', 'RR: q = 10–100 ms؛ لما يخلص ← **آخر الـ ready queue**؛ كل واحدة 1/n؛ والانتظار ≤ (n − 1)·q؛ والـ timer كل q.'),
      t('q large → **FCFS**; q small → overhead; 80% of bursts < q. RR: worse turnaround than SJF, **better response**; used in time-sharing.', 'q كبير ← **FCFS**؛ q صغير ← overhead؛ و80% من الـ bursts < q. الـ RR: turnaround أسوأ من الـ SJF، و**response أحسن**؛ وبيستخدم في الـ time-sharing.'),
      t('Lecture: priority example 8.2 · RR q = 4 → 5.66 · RR q = 20 → 73 · 10-unit job: q 12/6/1 → 0/1/9 switches.', 'المحاضرة: مثال الـ priority = 8.2 · RR q = 4 ← 5.66 · RR q = 20 ← 73 · job طولها 10: q 12/6/1 ← 0/1/9 switches.'),
    ],
    traps: [t('RR tie at the same instant: new arrival first (common) vs preempted first — state your rule.', 'تعادل الـ RR في نفس اللحظة: الجديد الأول (المشهور) أو اللي اتعمله preempt الأول — اكتب قاعدتك.')],
  },
  {
    id: 'c6-multilevel',
    title: 'Multilevel & multiprocessor',
    subtitle: 'Queues of queues, many CPUs',
    points: [
      t('**MLQ**: permanent queues (foreground RR, background FCFS); between them fixed priority (may **starve**) or time slice (80/20).', '**MLQ**: queues ثابتة (foreground بالـ RR وbackground بالـ FCFS)؛ وبينهم fixed priority (ممكن **starvation**) أو time slice (80/20).'),
      t('**MLFQ**: processes **move between queues** (aging); Q0 RR 8 ms → Q1 RR 16 ms → Q2 FCFS.', '**MLFQ**: الـ processes **بتتنقل بين الـ queues** (aging)؛ Q0 RR 8 ms ← Q1 RR 16 ms ← Q2 FCFS.'),
      t('Asymmetric: one master. **SMP**: self-scheduling (most common). Affinity soft / hard, processor sets. NUMA: fast local, slow remote.', 'Asymmetric: master واحد. **SMP**: كل واحد بيعمل scheduling لنفسه (الأشهر). Affinity soft / hard وprocessor sets. NUMA: محلي سريع وبعيد بطيء.'),
      t('**Load balancing** (private queues): push migration (overloaded → others) and pull migration (idle takes a task).', '**الـ Load balancing** (queues خاصة): push migration (عليه ضغط ← غيره) وpull migration (الفاضي ياخد task).'),
    ],
  },
  {
    id: 'c6-evaluation',
    title: 'Evaluation',
    subtitle: 'Criteria first, then one of four methods',
    table: {
      headers: ['Method', 'Pro · con'],
      rows: [
        [t('Deterministic modeling', 'Deterministic modeling'), t('Simple, exact · only for that workload (FCFS 28, SJF 13, RR 23)', 'بسيط ودقيق · للـ workload دي بس (FCFS 28 وSJF 13 وRR 23)')],
        [t('Queueing models', 'Queueing models'), t('No run needed, n = λ × W · approximations', 'مش محتاج تشغيل وn = λ × W · تقريبية')],
        [t('Simulation', 'Simulation'), t('More accurate, trace tapes · expensive, slow', 'أدق والـ trace tapes · مكلفة وبطيئة')],
        [t('Implementation', 'Implementation'), t('Completely accurate · high cost and risk, environment changes', 'دقيقة تمامًا · تكلفة ومخاطرة عالية والبيئة بتتغير')],
      ],
    },
    points: [t('Little: n = λ × W, any algorithm and distribution; 14 in queue at 7/s → W = 2 s.', 'Little: n = λ × W مع أي algorithm وdistribution؛ 14 في الـ queue بمعدل 7/s ← W = 2 s.')],
  },
]

export const chapter6HighYieldTraps: LText[] = [
  t('Main objective: maximize CPU utilization; CPU time allocated by criteria.', 'الهدف الأساسي: أقصى CPU utilization؛ والـ CPU بيتوزع حسب معايير.'),
  t('Dispatch(er) latency = time to stop one process and start another.', 'الـ Dispatch(er) latency = وقت إيقاف process وتشغيل التانية.'),
  t('Response time ends at the first response; turnaround at completion.', 'الـ Response time بيخلص عند أول رد؛ والـ turnaround عند الانتهاء.'),
  t('Preemptive = a runnable process may be suspended; running → waiting is nonpreemptive.', 'Preemptive = process تقدر تشتغل ممكن تتوقف؛ وrunning ← waiting ده nonpreemptive.'),
  t('Convoy effect → FCFS. FCFS does not starve.', 'Convoy effect ← FCFS. والـ FCFS مبيجوّعش.'),
  t('SJF is optimal for average waiting time; SRTF is its preemptive form.', 'الـ SJF هو الأمثل لمتوسط الـ waiting؛ والـ SRTF نسخته الـ preemptive.'),
  t('Starvation (the problem) → aging (the solution).', 'Starvation (المشكلة) ← aging (الحل).'),
  t('Large quantum → FCFS; RR(∞) = FCFS; RR for time-sharing and best response.', 'Quantum كبير ← FCFS؛ وRR(∞) = FCFS؛ والـ RR للـ time-sharing وأحسن response.'),
  t('MLQ with fixed priority can starve; MLFQ lets processes move.', 'الـ MLQ بـ fixed priority ممكن تجوّع؛ والـ MLFQ بيخلّي الـ processes تتنقل.'),
  t('Multiprocessor challenge: load balancing.', 'تحدي الـ multiprocessor: الـ load balancing.'),
  t('Four evaluation methods, each with a pro and a con.', 'أربع طرق تقييم، ولكل واحدة ميزة وعيب.'),
]
