import type { FillBlank, Question } from '../../types'

/**
 * Chapter 6 historical question bank (owned implementations).
 *
 * Same rules as the other chapters: printed wording is preserved, one printed item →
 * one implementation, near-verbatim reprints share an implementation through a second
 * sourceRef, and items with different wording or options keep their own.
 *
 * Every numerical answer below was computed with `lib/scheduling.ts` and is pinned by
 * `chapter6.test.ts`, so an explanation can never disagree with the simulator.
 *
 * Items Chapters 1 and 3 already implement (short-term scheduler, ready queue,
 * I/O-bound bursts, the dispatcher/context-switch fill-in, response time, “time slot
 * completed → ready”) are cross-referenced by the Chapter 6 sections instead.
 */

/** Accepted spellings of a number: "9", "9 ms", "9ms", "9 units", and "8.50" for 8.5. */
const num = (...values: Array<number | string>): string[] =>
  values.flatMap((value) => {
    const text = String(value)
    const forms = [text, `${text} ms`, `${text}ms`, `${text} units`]
    if (/^\d+\.\d$/.test(text)) forms.push(`${text}0`, `${text}0 ms`)
    return forms
  })

const blank = (id: string, label: string, ...values: Array<number | string>): FillBlank => ({ id, label, accepted: num(...values) })

const final2023Table = `| Process | Arrival Time | Burst Time | Priority |
| P1 | 0 | 5 | 2 |
| P2 | 1 | 3 | 1 |
| P3 | 2 | 8 | 4 |
| P4 | 3 | 6 | 3 |`

const final2020Table = `| Process | Arrival time | Burst time |
| P1 | 0 | 6 |
| P2 | 2 | 8 |
| P3 | 5 | 7 |
| P4 | 7 | 3 |`

const undatedBStem = `Consider the following set of processes, with the length of the CPU burst given in milliseconds:
| Process | Burst Time | Arrival Time | Priority |
| P1 | 10 | 0 | 2 |
| P2 | 29 | 1 | 3 |
| P3 | 3 | 2 | 4 |
| P4 | 7 | 3 | 3 |
| P5 | 12 | 4 | 1 |
a. Draw four Gantt charts that illustrate the execution of these processes using the following scheduling algorithms: FCFS, preemptive SJF, non-preemptive priority (a smallest priority number implies a higher priority), and RR (quantum = 3).`

const undatedBSolution = {
  en: 'FCFS: P1 0–10 · P2 10–39 · P3 39–42 · P4 42–49 · P5 49–61. Preemptive SJF (SRTF): P1 0–2 · P3 2–5 · P4 5–12 · P1 12–20 · P5 20–32 · P2 32–61 (P3’s burst 3 is shorter than P1’s remaining 8 at t = 2). Non-preemptive priority: P1 0–10 (alone at t = 0) · P5 10–22 · P2 22–51 · P4 51–58 · P3 58–61 (P2 and P4 tie at priority 3; P2 arrived first). RR q = 3: P1 0–3 · P2 3–6 · P3 6–9 (done) · P4 9–12 · P1 12–15 · P5 15–18 · P2 18–21 · P4 21–24 · P1 24–27 · P5 27–30 · P2 30–33 · P4 33–34 (done) · P1 34–35 (done) · P5 35–38 · P2 38–41 · P5 41–44 (done) · P2 44–61 (done).',
  ar: 'FCFS: P1 0–10 · P2 10–39 · P3 39–42 · P4 42–49 · P5 49–61. الـ SJF الـ preemptive (SRTF): P1 0–2 · P3 2–5 · P4 5–12 · P1 12–20 · P5 20–32 · P2 32–61 (عند t = 2 الـ burst بتاع P3 = 3 أقصر من الباقي لـ P1 = 8). الـ Priority الـ non-preemptive: P1 0–10 (لوحدها عند t = 0) · P5 10–22 · P2 22–51 · P4 51–58 · P3 58–61 (P2 وP4 نفس الأولوية 3؛ وP2 وصلت الأول). RR q = 3: P1 0–3 · P2 3–6 · P3 6–9 (خلصت) · P4 9–12 · P1 12–15 · P5 15–18 · P2 18–21 · P4 21–24 · P1 24–27 · P5 27–30 · P2 30–33 · P4 33–34 (خلصت) · P1 34–35 (خلصت) · P5 35–38 · P2 38–41 · P5 41–44 (خلصت) · P2 44–61 (خلصت).',
}

export const chapter6Questions: Question[] = [
  // ───────────────────── Lesson 1 · Basics: scheduler, dispatcher, criteria ─────────────────────
  {
    id: 'c6-objective-2024',
    chapterId: 'chapter-6',
    sectionId: 'c6-basics',
    topic: 'Scheduling criteria',
    concept: 'Main objective: keep the CPU busy',
    difficulty: 'core',
    type: 'mcq',
    origin: 'historical',
    prompt: 'What is the main objective of CPU scheduling?',
    options: [
      { id: 'a', text: 'Minimize throughput' },
      { id: 'b', text: 'Minimize waiting time' },
      { id: 'c', text: 'Maximize CPU utilization' },
      { id: 'd', text: 'Maximize turnaround time' },
    ],
    correct: 'c',
    sourceRefs: [{ examId: 'final_2024', question: 'Q1.1' }],
    answerStatus: 'independently-verified',
    explanation: {
      en: 'CPU scheduling exists because of multiprogramming, whose goal is **maximum CPU utilization**: whenever one process waits for I/O, another should use the CPU. That is also the first item of the optimization list (max CPU utilization, max throughput, min turnaround, min waiting, min response). Minimizing waiting time is a real criterion too, but it is one of several targets, not the main objective; (a) and (d) are backwards.',
      ar: 'الـ CPU scheduling موجود عشان الـ multiprogramming، وهدفه **أقصى CPU utilization**: كل ما process تستنى I/O، واحدة تانية تستخدم الـ CPU. وده كمان أول بند في قايمة الأهداف (max CPU utilization وmax throughput وmin turnaround وmin waiting وmin response). تقليل الـ waiting time معيار حقيقي برضه، بس هو واحد من أهداف كتير مش الهدف الأساسي؛ و(a) و(d) معكوسين.',
    },
    optionNotes: {
      a: { en: 'Throughput should be maximized.', ar: 'الـ throughput المفروض يزيد مش يقل.' },
      b: { en: 'A valid criterion, but not the main objective.', ar: 'معيار صحيح، بس مش الهدف الأساسي.' },
      d: { en: 'Turnaround time should be minimized.', ar: 'الـ turnaround time المفروض يقل.' },
    },
    takeaway: { en: 'Main goal: maximize CPU utilization.', ar: 'الهدف الأساسي: أقصى CPU utilization.' },
  },
  {
    id: 'c6-objective-2023',
    chapterId: 'chapter-6',
    sectionId: 'c6-basics',
    topic: 'Scheduling criteria',
    concept: 'Allocate CPU time according to criteria',
    difficulty: 'core',
    type: 'mcq',
    origin: 'historical',
    prompt: 'What is the main objective of CPU scheduling?',
    options: [
      { id: 'a', text: 'To minimize CPU utilization' },
      { id: 'b', text: 'To maximize turnaround time' },
      { id: 'c', text: 'To balance the load among different processes' },
      { id: 'd', text: 'To allocate CPU time according to some criteria' },
    ],
    correct: 'd',
    sourceRefs: [
      { examId: 'final_2023', question: 'Q2.42' },
      { examId: 'final_nodate', question: 'Q2.42' },
    ],
    answerStatus: 'independently-verified',
    explanation: {
      en: 'The scheduler decides which ready process gets the CPU next, and it does so to optimize **criteria**: CPU utilization, throughput, turnaround, waiting and response time. (a) and (b) state the criteria backwards; load balancing (c) is a separate multiprocessor concern.',
      ar: 'الـ scheduler بيقرر أنهي process جاهزة تاخد الـ CPU بعد كده، وبيعمل كده عشان يحسّن **معايير (criteria)**: الـ CPU utilization والـ throughput والـ turnaround والـ waiting والـ response time. (a) و(b) بيقولوا المعايير بالعكس؛ والـ load balancing (c) موضوع تاني خاص بالـ multiprocessors.',
    },
    optionNotes: {
      a: { en: 'Utilization is maximized.', ar: 'الـ utilization بيتعمل له maximize.' },
      b: { en: 'Turnaround is minimized.', ar: 'الـ turnaround بيتعمل له minimize.' },
      c: { en: 'Load balancing belongs to multiple-processor scheduling.', ar: 'الـ load balancing تبع الـ multiple-processor scheduling.' },
    },
    takeaway: { en: 'Scheduling = allocating the CPU to optimize the criteria.', ar: 'الـ Scheduling = توزيع الـ CPU عشان نحسّن المعايير.' },
  },
  {
    id: 'c6-dispatch-latency',
    chapterId: 'chapter-6',
    sectionId: 'c6-basics',
    topic: 'Dispatcher',
    concept: 'Dispatch latency',
    difficulty: 'core',
    type: 'mcq',
    origin: 'historical',
    prompt: 'What is the term for the time it takes for the dispatcher to stop one process and start another?',
    options: [
      { id: 'a', text: 'Dispatch latency' },
      { id: 'b', text: 'Turnaround time' },
      { id: 'c', text: 'Waiting time' },
      { id: 'd', text: 'Response time' },
    ],
    correct: 'a',
    sourceRefs: [{ examId: 'final_2024', question: 'Q1.5' }],
    answerStatus: 'independently-verified',
    explanation: {
      en: '**Dispatch latency** is the time the dispatcher needs to stop one process and start another running (switch context, switch to user mode, jump to the right place). The other three are per-process scheduling criteria.',
      ar: '**Dispatch latency** هو الوقت اللي الـ dispatcher محتاجه عشان يوقف process ويشغّل التانية (يبدّل الـ context، ويرجع user mode، وينط للمكان الصح). والتلاتة التانيين معايير scheduling خاصة بكل process.',
    },
    takeaway: { en: 'Stop one, start another = dispatch latency.', ar: 'توقّف واحدة وتشغّل التانية = dispatch latency.' },
  },
  {
    id: 'c6-dispatcher-latency-tf',
    chapterId: 'chapter-6',
    sectionId: 'c6-basics',
    topic: 'Dispatcher',
    concept: 'Dispatch latency (true/false)',
    difficulty: 'core',
    type: 'tf',
    origin: 'historical',
    prompt: 'The time it takes for a dispatcher to stop one process and start another one is called dispatcher latency.',
    correct: true,
    sourceRefs: [
      { examId: 'final_2023', question: 'Q1.19' },
      { examId: 'final_nodate', question: 'Q1.19' },
    ],
    answerStatus: 'independently-verified',
    explanation: {
      en: 'True. The lecture calls it **dispatch latency**; “dispatcher latency” is the same term with the module’s name in it, and the definition is exactly right. (The scanned copy also marks T.)',
      ar: 'صح. المحاضرة بتسميه **dispatch latency**؛ و“dispatcher latency” هو نفس المصطلح بس باسم الـ module، والتعريف صح بالظبط. (والنسخة المتصورة متعلّم عليها T برضه.)',
    },
    optionNotes: {
      true: { en: 'Correct.', ar: 'صح.' },
      false: { en: 'Only the wording “dispatcher” vs “dispatch” differs; the definition is correct.', ar: 'الفرق بس في كلمة “dispatcher” بدل “dispatch”؛ التعريف صح.' },
    },
    takeaway: { en: 'Dispatch latency = stop one process, start another.', ar: 'Dispatch latency = توقّف process وتشغّل التانية.' },
  },
  {
    id: 'c6-preemptive-difference',
    chapterId: 'chapter-6',
    sectionId: 'c6-basics',
    topic: 'Preemptive vs nonpreemptive',
    concept: 'What preemption means and what it implies',
    difficulty: 'core',
    type: 'mcq',
    origin: 'historical',
    prompt: 'What is the difference between preemptive and non-preemptive scheduling?',
    options: [
      { id: 'a', text: 'Preemptive scheduling allows a process to be interrupted by the scheduler, while non-preemptive scheduling does not' },
      { id: 'b', text: 'Preemptive scheduling requires a timer interrupt, while non-preemptive scheduling does not' },
      { id: 'c', text: 'Preemptive scheduling is more responsive, while non-preemptive scheduling is more predictable' },
      { id: 'd', text: 'All of the above' },
    ],
    correct: 'd',
    sourceRefs: [
      { examId: 'final_2023', question: 'Q2.46' },
      { examId: 'final_nodate', question: 'Q2.46' },
    ],
    answerStatus: 'independently-verified',
    explanation: {
      en: 'All three statements hold. (a) is the definition: a preemptive scheduler can take the CPU from a running process; a nonpreemptive one lets it run until it waits or terminates. (b) To take the CPU back the OS needs control even when the process does not give it up — the **timer interrupt** (round robin interrupts every q time units). (c) Preemption lets an urgent or short process run sooner (better response); nonpreemptive runs are easier to predict. The scanned copy circles (a) in ink but marks (d) in red.',
      ar: 'التلات جمل صح. (a) هي التعريف: الـ scheduler الـ preemptive يقدر ياخد الـ CPU من process شغالة؛ والـ nonpreemptive بيسيبها لحد ما تستنى أو تخلص. (b) عشان الـ OS ياخد الـ CPU تاني لازم يرجعله التحكم حتى لو الـ process مسابتهوش — وده الـ **timer interrupt** (الـ round robin بيعمل interrupt كل q). (c) الـ preemption بيخلّي process مستعجلة أو قصيرة تشتغل بدري (response أحسن)؛ والـ nonpreemptive أسهل في التوقع. النسخة المتصورة معلّمة (a) بالقلم بس (d) بالأحمر.',
    },
    optionNotes: {
      a: { en: 'True, but (b) and (c) are true as well.', ar: 'صح، بس (b) و(c) صح كمان.' },
      d: { en: 'Correct — each of (a), (b), (c) is a valid difference.', ar: 'صح — كل واحدة من (a) و(b) و(c) فرق صحيح.' },
    },
    takeaway: { en: 'Preemptive: can interrupt (timer), more responsive. Nonpreemptive: runs until it blocks or exits.', ar: 'Preemptive: يقدر يقاطع (timer) واستجابته أحسن. Nonpreemptive: بتفضل شغالة لحد ما تستنى أو تخلص.' },
  },
  {
    id: 'c6-preemptive-cases',
    chapterId: 'chapter-6',
    sectionId: 'c6-basics',
    topic: 'Decision points',
    concept: 'Which transitions are preemptive',
    difficulty: 'stretch',
    type: 'mcq',
    origin: 'historical',
    prompt: 'In the following cases preemptive scheduling occurs?',
    options: [
      { id: 'a', text: 'When a process switches from the running state to the ready state' },
      { id: 'b', text: 'When a process goes from the running state to the waiting state' },
      { id: 'c', text: 'When a process switches from the waiting state to the ready state' },
      { id: 'd', text: 'All of the mentioned' },
    ],
    correct: 'a',
    sourceRefs: [
      {
        examId: 'final_2020',
        question: 'Q2.43',
        note: 'Two printed options (a and c) are preemptive decision points, so no single option is fully right.',
      },
    ],
    answerStatus: 'needs-review',
    unscored: true,
    explanation: {
      en: 'Scheduling decisions happen in four cases: (1) running → waiting, (2) running → ready, (3) waiting → ready, (4) terminate. Cases 1 and 4 are **nonpreemptive**; cases 2 and 3 are **preemptive**. So both (a) and (c) describe preemptive scheduling, (b) does not, and (d) is wrong because it includes (b). The item looks like a reversal of the common question “in which case does **non**-preemptive scheduling occur?” (answer: running → waiting). If one option must be chosen, (a) — a running process forced back to ready — is the clearest case of preemption. It is shown for review and not scored.',
      ar: 'قرارات الـ scheduling بتحصل في أربع حالات: (1) running ← waiting، (2) running ← ready، (3) waiting ← ready، (4) terminate. الحالتين 1 و4 **nonpreemptive**؛ والحالتين 2 و3 **preemptive**. يبقى (a) و(c) الاتنين preemptive، و(b) لأ، و(d) غلط عشان فيها (b). السؤال شكله معكوس من السؤال المشهور “إمتى الـ **non**-preemptive scheduling بيحصل؟” (الإجابة: running ← waiting). لو لازم تختار واحدة، (a) — process شغالة اترجعت ready غصب عنها — أوضح مثال للـ preemption. السؤال معروض للمراجعة ومش محسوب في الدرجة.',
    },
    optionNotes: {
      a: { en: 'Preemptive (circumstance 2).', ar: 'Preemptive (الحالة 2).' },
      b: { en: 'Nonpreemptive (circumstance 1): the process gives up the CPU itself.', ar: 'Nonpreemptive (الحالة 1): الـ process سابت الـ CPU بنفسها.' },
      c: { en: 'Also preemptive (circumstance 3).', ar: 'Preemptive كمان (الحالة 3).' },
      d: { en: 'Includes (b), which is nonpreemptive.', ar: 'فيها (b) وهي nonpreemptive.' },
    },
    takeaway: { en: 'Preemptive points: running → ready and waiting → ready. Nonpreemptive: running → waiting and terminate.', ar: 'نقط الـ preemptive: running ← ready وwaiting ← ready. والـ nonpreemptive: running ← waiting وterminate.' },
  },
  {
    id: 'c6-response-time',
    chapterId: 'chapter-6',
    sectionId: 'c6-basics',
    topic: 'Scheduling criteria',
    concept: 'Response time definition',
    difficulty: 'core',
    type: 'mcq',
    origin: 'historical',
    prompt: 'What is Response time?',
    options: [
      { id: 'a', text: 'the total time taken from the submission time till the completion time' },
      { id: 'b', text: 'the total time taken from submission time till first response is produced' },
      { id: 'c', text: 'the total time taken from submission time till the response is output' },
      { id: 'd', text: 'none of the mentioned' },
    ],
    correct: 'b',
    sourceRefs: [{ examId: 'final_2020', question: 'Q2.45' }],
    answerStatus: 'independently-verified',
    explanation: {
      en: '**Response time** runs from submitting a request until the **first** response is produced — not until all output is finished (that is the trap in (c)). From submission to completion (a) is **turnaround time**.',
      ar: 'الـ **Response time** من وقت تقديم الطلب لحد ما **أول** response يطلع — مش لحد ما كل الـ output يخلص (ودي الفخ في (c)). ومن التقديم لحد الانتهاء (a) ده الـ **turnaround time**.',
    },
    optionNotes: {
      a: { en: 'That is turnaround time.', ar: 'ده الـ turnaround time.' },
      c: { en: 'Response time ends at the first response, not when output is complete.', ar: 'الـ response time بيخلص عند أول response، مش لما الـ output يكمل.' },
    },
    takeaway: { en: 'Response = submission → first response. Turnaround = submission → completion.', ar: 'Response = من التقديم ← أول رد. Turnaround = من التقديم ← الانتهاء.' },
  },
  {
    id: 'c6-preemptive-definition',
    chapterId: 'chapter-6',
    sectionId: 'c6-basics',
    topic: 'Preemptive vs nonpreemptive',
    concept: 'Suspending a runnable process = preemption',
    difficulty: 'core',
    type: 'mcq',
    origin: 'historical',
    prompt: 'The strategy of making processes that are logically runnable to be temporarily suspended is called ______',
    options: [
      { id: 'a', text: 'Non preemptive scheduling' },
      { id: 'b', text: 'Preemptive scheduling' },
      { id: 'c', text: 'Shortest job first' },
      { id: 'd', text: 'First come First served' },
    ],
    correct: 'b',
    sourceRefs: [{ examId: 'final_2020', question: 'Q2.47' }],
    answerStatus: 'independently-verified',
    explanation: {
      en: 'A process that is still runnable but is taken off the CPU and sent back to ready (by a timer interrupt or a better arrival) has been **preempted**. Nonpreemptive scheduling never does that; FCFS and non-preemptive SJF are nonpreemptive algorithms.',
      ar: 'الـ process اللي لسه تقدر تشتغل بس اتشالت من على الـ CPU ورجعت ready (بـ timer interrupt أو بوصول process أحسن) كده اتعملها **preempt**. والـ nonpreemptive scheduling عمره ما بيعمل كده؛ والـ FCFS والـ SJF الـ non-preemptive خوارزميات nonpreemptive.',
    },
    takeaway: { en: 'Suspending a runnable process = preemptive scheduling.', ar: 'إيقاف process تقدر تشتغل = preemptive scheduling.' },
  },

  // ───────────────────── Lesson 2 · FCFS, SJF and SRTF ─────────────────────
  {
    id: 'c6-convoy-algorithm',
    chapterId: 'chapter-6',
    sectionId: 'c6-fcfs-sjf',
    topic: 'FCFS',
    concept: 'Convoy effect',
    difficulty: 'core',
    type: 'mcq',
    origin: 'historical',
    prompt: 'Which CPU scheduling algorithm can result in a "convoy effect"?',
    options: [
      { id: 'a', text: 'SJF' },
      { id: 'b', text: 'Round Robin' },
      { id: 'c', text: 'FCFS' },
      { id: 'd', text: 'Priority Scheduling' },
    ],
    correct: 'c',
    sourceRefs: [{ examId: 'final_2024', question: 'Q1.2' }],
    answerStatus: 'independently-verified',
    explanation: {
      en: 'The **convoy effect** is FCFS’s weakness: short processes queue up behind one long process, like cars behind a slow truck. With bursts 24, 3, 3 the average wait is 17 in that order but only 3 when the short ones go first. SJF and RR exist precisely to avoid it.',
      ar: 'الـ **convoy effect** هو عيب الـ FCFS: الـ processes القصيرة بتقف ورا process واحدة طويلة، زي العربيات ورا تريلا بطيئة. مع bursts 24 و3 و3 متوسط الانتظار 17 بالترتيب ده، و3 بس لو القصيرين اشتغلوا الأول. والـ SJF والـ RR معمولين عشان يتجنبوه.',
    },
    takeaway: { en: 'Convoy effect → FCFS.', ar: 'Convoy effect ← FCFS.' },
  },
  {
    id: 'c6-fcfs-disadvantage',
    chapterId: 'chapter-6',
    sectionId: 'c6-fcfs-sjf',
    topic: 'FCFS',
    concept: 'The disadvantage of FCFS',
    difficulty: 'core',
    type: 'mcq',
    origin: 'historical',
    prompt: 'What is the disadvantage of using the first-come, first-served (FCFS) scheduling algorithm?',
    options: [
      { id: 'a', text: 'It may cause starvation, where low-priority processes never get the CPU' },
      { id: 'b', text: 'It may cause the convoy effect, where short processes wait behind long processes' },
      { id: 'c', text: 'It may cause thrashing, where processes switch between ready and waiting states frequently' },
      { id: 'd', text: 'All of the above' },
    ],
    correct: 'b',
    sourceRefs: [
      { examId: 'final_2023', question: 'Q2.43' },
      { examId: 'final_nodate', question: 'Q2.43' },
    ],
    answerStatus: 'independently-verified',
    explanation: {
      en: 'FCFS suffers from the **convoy effect**. It does not starve anyone — every process eventually reaches the head of the queue — and starvation of low-priority processes is the problem of **priority** scheduling. Thrashing is a virtual-memory phenomenon (excessive paging), not a scheduling one.',
      ar: 'الـ FCFS عيبه الـ **convoy effect**. هو مش بيجوّع حد — كل process هتوصل لأول الـ queue في الآخر — والـ starvation للـ processes قليلة الأولوية دي مشكلة الـ **priority** scheduling. والـ thrashing ظاهرة في الـ virtual memory (paging زيادة عن اللزوم)، مش scheduling.',
    },
    optionNotes: {
      a: { en: 'Starvation belongs to priority scheduling.', ar: 'الـ starvation تبع الـ priority scheduling.' },
      c: { en: 'Thrashing is excessive paging (virtual memory).', ar: 'الـ thrashing هو paging زيادة (virtual memory).' },
    },
    takeaway: { en: 'FCFS → convoy effect, not starvation.', ar: 'FCFS ← convoy effect، مش starvation.' },
  },
  {
    id: 'c6-fcfs-problem-fill',
    chapterId: 'chapter-6',
    sectionId: 'c6-fcfs-sjf',
    topic: 'FCFS',
    concept: 'Convoy effect (fill-in)',
    difficulty: 'core',
    type: 'fill',
    origin: 'historical',
    prompt: 'A major problem with FCFS scheduling algorithms is {{1}}.',
    blanks: [{ id: 'b1', label: 'Blank 1', accepted: ['convoy effect', 'the convoy effect', 'convoy', 'convoy problem'] }],
    sourceRefs: [{ examId: 'final_nodate2', question: 'Q1.11' }],
    answerStatus: 'independently-verified',
    explanation: {
      en: 'The **convoy effect**: short processes stuck behind a long one, which makes the average waiting time large and sensitive to arrival order.',
      ar: 'الـ **convoy effect**: processes قصيرة متعطلة ورا process طويلة، وده بيخلّي متوسط الانتظار كبير وبيتغير حسب ترتيب الوصول.',
    },
    takeaway: { en: 'Fill-in: convoy effect.', ar: 'الإجابة: convoy effect.' },
  },
  {
    id: 'c6-fcfs-starvation-tf',
    chapterId: 'chapter-6',
    sectionId: 'c6-fcfs-sjf',
    topic: 'FCFS',
    concept: 'FCFS does not starve',
    difficulty: 'core',
    type: 'tf',
    origin: 'historical',
    prompt: 'A major problem with FCFS scheduling algorithms is starvation.',
    correct: false,
    sourceRefs: [{ examId: 'final_2020', question: 'Q1.14' }],
    answerStatus: 'independently-verified',
    explanation: {
      en: 'False. FCFS serves processes strictly in arrival order, so each one is reached after a finite wait — no starvation. Its major problem is the **convoy effect**. Starvation is the problem of priority (and SJF) scheduling, solved by aging.',
      ar: 'غلط. الـ FCFS بيخدم الـ processes بترتيب الوصول بالظبط، فكل واحدة هيجي دورها بعد وقت محدود — مفيش starvation. مشكلته الكبيرة هي الـ **convoy effect**. أما الـ starvation فمشكلة الـ priority (والـ SJF)، وحلها الـ aging.',
    },
    optionNotes: {
      true: { en: 'Starvation is not FCFS’s problem.', ar: 'الـ starvation مش مشكلة الـ FCFS.' },
      false: { en: 'Correct.', ar: 'صح.' },
    },
    takeaway: { en: 'FCFS: convoy effect. Priority: starvation.', ar: 'FCFS: convoy effect. Priority: starvation.' },
  },
  {
    id: 'c6-sjf-advantage',
    chapterId: 'chapter-6',
    sectionId: 'c6-fcfs-sjf',
    topic: 'SJF',
    concept: 'SJF minimizes average waiting time',
    difficulty: 'core',
    type: 'mcq',
    origin: 'historical',
    prompt: 'What is the key advantage of the Shortest Job First (SJF) algorithm?',
    options: [
      { id: 'a', text: 'Simplifies process execution' },
      { id: 'b', text: 'Minimizes average waiting time' },
      { id: 'c', text: 'Ensures equal priority for all processes' },
      { id: 'd', text: 'Improves throughput for longer processes' },
    ],
    correct: 'b',
    sourceRefs: [{ examId: 'final_2024', question: 'Q1.3' }],
    answerStatus: 'independently-verified',
    explanation: {
      en: 'SJF is **optimal**: it gives the **minimum average waiting time** for a given set of processes. Running a short job first delays the others only a little, while running a long job first delays everyone a lot. It is not simple to implement (the next burst length is unknown) and it hurts long processes rather than helping them.',
      ar: 'الـ SJF **optimal**: بيدّي **أقل متوسط waiting time** لمجموعة processes معينة. لو شغّلت الشغلانة القصيرة الأول بتأخّر الباقيين شوية صغيرين، لكن لو شغّلت الطويلة الأول بتأخّر الكل كتير. ومش سهل تنفيذه (طول الـ burst الجاي مش معروف)، وبيضر الـ processes الطويلة مش بيساعدها.',
    },
    takeaway: { en: 'SJF = minimum average waiting time.', ar: 'SJF = أقل متوسط waiting time.' },
  },
  {
    id: 'c6-sjf-optimal-tf-2023',
    chapterId: 'chapter-6',
    sectionId: 'c6-fcfs-sjf',
    topic: 'SJF',
    concept: 'SJF is optimal',
    difficulty: 'core',
    type: 'tf',
    origin: 'historical',
    prompt: 'SJF is the optimal CPU scheduling algorithm for minimizing the average waiting time.',
    correct: true,
    sourceRefs: [
      { examId: 'final_2023', question: 'Q1.20' },
      { examId: 'final_nodate', question: 'Q1.20', note: 'The start of the line is partly hidden by the fold in the scan.' },
    ],
    answerStatus: 'independently-verified',
    explanation: {
      en: 'True — the lecture’s own words: “SJF is optimal — gives minimum average waiting time for a given set of processes.” Its catch is that the length of the next CPU request is hard to know.',
      ar: 'صح — دي كلمات المحاضرة نفسها: “SJF is optimal — gives minimum average waiting time for a given set of processes.” المشكلة بس إن طول الـ CPU request الجاي صعب تعرفه.',
    },
    optionNotes: {
      true: { en: 'Correct.', ar: 'صح.' },
      false: { en: 'SJF is provably optimal for average waiting time.', ar: 'الـ SJF مثبت إنه optimal لمتوسط الـ waiting time.' },
    },
    takeaway: { en: 'SJF is optimal for average waiting time.', ar: 'الـ SJF هو الأمثل لمتوسط الـ waiting time.' },
  },
  {
    id: 'c6-sjf-optimal-tf-2020',
    chapterId: 'chapter-6',
    sectionId: 'c6-fcfs-sjf',
    topic: 'SJF',
    concept: 'SJF is optimal for any given set',
    difficulty: 'core',
    type: 'tf',
    origin: 'historical',
    prompt: 'SJF is the optimal scheduling technique because it gives the minimum average waiting time for any given set of processes.',
    correct: true,
    sourceRefs: [{ examId: 'final_2020', question: 'Q1.15' }],
    answerStatus: 'independently-verified',
    explanation: {
      en: 'True. For any fixed set of processes, ordering them shortest-first minimizes the average waiting time (moving a short job ahead of a long one always lowers the total). In practice the next burst must be predicted, but the optimality statement is exactly as taught.',
      ar: 'صح. لأي مجموعة processes ثابتة، ترتيبها من الأقصر للأطول بيدّي أقل متوسط waiting time (تقديم شغلانة قصيرة قبل طويلة دايمًا بيقلل المجموع). عمليًا لازم نتوقع الـ burst الجاي، بس جملة الـ optimal صح زي ما اتشرحت بالظبط.',
    },
    optionNotes: {
      true: { en: 'Correct.', ar: 'صح.' },
      false: { en: 'This is the lecture’s optimality statement.', ar: 'دي جملة الـ optimality بتاعة المحاضرة.' },
    },
    takeaway: { en: 'Shortest first → minimum average waiting.', ar: 'الأقصر الأول ← أقل متوسط انتظار.' },
  },
  {
    id: 'c6-min-avg-waiting',
    chapterId: 'chapter-6',
    sectionId: 'c6-fcfs-sjf',
    topic: 'SJF',
    concept: 'Which algorithm minimizes average waiting time',
    difficulty: 'core',
    type: 'mcq',
    origin: 'historical',
    prompt: 'Which of the following scheduling algorithms gives minimum average waiting time?',
    options: [
      { id: 'a', text: 'FCFS' },
      { id: 'b', text: 'SJF' },
      { id: 'c', text: 'Round-robin' },
      { id: 'd', text: 'Priority' },
    ],
    correct: 'b',
    sourceRefs: [{ examId: 'final_2020', question: 'Q2.50' }],
    answerStatus: 'independently-verified',
    explanation: {
      en: '**SJF.** In the lecture’s deterministic model (bursts 10, 29, 3, 7, 12) the averages are FCFS 28, SJF 13 and RR (q = 10) 23 ms.',
      ar: '**SJF.** في الـ deterministic model بتاع المحاضرة (bursts 10 و29 و3 و7 و12) المتوسطات: FCFS = 28 وSJF = 13 وRR (q = 10) = 23 ms.',
    },
    takeaway: { en: 'Minimum average waiting time → SJF.', ar: 'أقل متوسط waiting time ← SJF.' },
  },
  {
    id: 'c6-calc-fcfs',
    chapterId: 'chapter-6',
    sectionId: 'c6-fcfs-sjf',
    topic: 'Scheduling calculation',
    concept: 'FCFS average waiting time with arrivals',
    difficulty: 'core',
    type: 'mcq',
    origin: 'historical',
    prompt: `Consider the following set of processes:
${final2023Table}
What is the average waiting time for the process set if the first-come, first-served (FCFS) scheduling algorithm is used?`,
    options: [
      { id: 'a', text: '5.75' },
      { id: 'b', text: '6.75' },
      { id: 'c', text: '7.25' },
      { id: 'd', text: '8.25' },
    ],
    correct: 'a',
    sourceRefs: [
      { examId: 'final_2023', question: 'Q3.61' },
      { examId: 'final_nodate', question: 'Q3.61' },
    ],
    answerStatus: 'independently-verified',
    explanation: {
      en: 'Gantt: P1 0–5 · P2 5–8 · P3 8–16 · P4 16–22. Waiting = finish − arrival − burst: P1 = 5 − 0 − 5 = 0, P2 = 8 − 1 − 3 = 4, P3 = 16 − 2 − 8 = 6, P4 = 22 − 3 − 6 = 13. Average = (0 + 4 + 6 + 13) / 4 = **5.75**. Priorities are ignored by FCFS.',
      ar: 'الـ Gantt: P1 0–5 · P2 5–8 · P3 8–16 · P4 16–22. الـ Waiting = finish − arrival − burst: P1 = 5 − 0 − 5 = 0، P2 = 8 − 1 − 3 = 4، P3 = 16 − 2 − 8 = 6، P4 = 22 − 3 − 6 = 13. المتوسط = (0 + 4 + 6 + 13) / 4 = **5.75**. والـ FCFS مبيبصش على الـ priority خالص.',
    },
    takeaway: { en: 'With arrivals, subtract the arrival time: WT = start − arrival for FCFS.', ar: 'مع وجود arrival، اطرح وقت الوصول: في الـ FCFS الـ WT = start − arrival.' },
  },
  {
    id: 'c6-calc-srtf',
    chapterId: 'chapter-6',
    sectionId: 'c6-fcfs-sjf',
    topic: 'Scheduling calculation',
    concept: 'Preemptive SJF (SRTF) average waiting time',
    difficulty: 'core',
    type: 'mcq',
    origin: 'historical',
    prompt: `Consider the following set of processes:
${final2023Table}
What is the average waiting time for the process set if the preemptive shortest-job-first (SJF) scheduling algorithm is used?`,
    options: [
      { id: 'a', text: '3' },
      { id: 'b', text: '4' },
      { id: 'c', text: '5' },
      { id: 'd', text: '6' },
    ],
    correct: 'c',
    sourceRefs: [
      { examId: 'final_2023', question: 'Q3.62' },
      { examId: 'final_nodate', question: 'Q3.62' },
    ],
    answerStatus: 'independently-verified',
    explanation: {
      en: 't = 0: only P1 (5). t = 1: P2 arrives with 3 < P1’s remaining 4 → **preempt**, P2 runs 1–4. t = 4: P1 (4), P3 (8), P4 (6) → P1 4–8, then P4 8–14, then P3 14–22. Waiting: P1 = 8 − 0 − 5 = 3, P2 = 4 − 1 − 3 = 0, P3 = 22 − 2 − 8 = 12, P4 = 14 − 3 − 6 = 5. Average = (3 + 0 + 12 + 5) / 4 = **5**.',
      ar: 'عند t = 0: P1 بس (5). عند t = 1: P2 وصلت بـ 3 أقل من الباقي لـ P1 (4) ← **preempt**، وP2 تشتغل 1–4. عند t = 4: P1 (4) وP3 (8) وP4 (6) ← P1 4–8، بعدين P4 8–14، بعدين P3 14–22. الـ Waiting: P1 = 8 − 0 − 5 = 3، P2 = 4 − 1 − 3 = 0، P3 = 22 − 2 − 8 = 12، P4 = 14 − 3 − 6 = 5. المتوسط = (3 + 0 + 12 + 5) / 4 = **5**.',
    },
    takeaway: { en: 'SRTF: re-check at every arrival; compare with the remaining time.', ar: 'SRTF: راجع عند كل وصول؛ وقارن بالوقت الباقي.' },
  },

  // ───────────────────── Lesson 3 · Priority and round robin ─────────────────────
  {
    id: 'c6-aging-2024',
    chapterId: 'chapter-6',
    sectionId: 'c6-priority-rr',
    topic: 'Priority scheduling',
    concept: 'Aging prevents starvation',
    difficulty: 'core',
    type: 'mcq',
    origin: 'historical',
    prompt: 'In Priority Scheduling, what solution is used to prevent starvation?',
    options: [
      { id: 'a', text: 'Round Robin scheduling' },
      { id: 'b', text: 'Aging' },
      { id: 'c', text: 'Increasing time quantum' },
      { id: 'd', text: 'None of the above' },
    ],
    correct: 'b',
    sourceRefs: [{ examId: 'final_2024', question: 'Q1.6' }],
    answerStatus: 'independently-verified',
    explanation: {
      en: 'Problem: **starvation** — low-priority processes may never execute. Solution: **aging** — as time progresses, increase the priority of the waiting process until it eventually runs.',
      ar: 'المشكلة: **starvation** — الـ processes قليلة الأولوية ممكن عمرها ما تشتغل. الحل: **aging** — كل ما الوقت يعدّي، نزوّد أولوية الـ process المستنية لحد ما تشتغل في الآخر.',
    },
    takeaway: { en: 'Starvation → aging.', ar: 'Starvation ← aging.' },
  },
  {
    id: 'c6-aging-2020',
    chapterId: 'chapter-6',
    sectionId: 'c6-priority-rr',
    topic: 'Priority scheduling',
    concept: 'Aging solves indefinite blocking',
    difficulty: 'core',
    type: 'mcq',
    origin: 'historical',
    prompt: 'A solution to the problem of indefinite blockage of low-priority processes is ______',
    options: [
      { id: 'a', text: 'Starvation' },
      { id: 'b', text: 'Wait queue' },
      { id: 'c', text: 'Ready queue' },
      { id: 'd', text: 'Aging' },
    ],
    correct: 'd',
    sourceRefs: [{ examId: 'final_2020', question: 'Q2.49' }],
    answerStatus: 'independently-verified',
    explanation: {
      en: '“Indefinite blockage of low-priority processes” is **starvation** — the problem, not the solution (the trap in (a)). The solution is **aging**: raise the priority of a process the longer it waits.',
      ar: '“Indefinite blockage of low-priority processes” ده الـ **starvation** — يعني المشكلة نفسها مش الحل (وده الفخ في (a)). الحل هو الـ **aging**: تزوّد أولوية الـ process كل ما تستنى أكتر.',
    },
    optionNotes: {
      a: { en: 'Starvation is the problem itself.', ar: 'الـ starvation هي المشكلة نفسها.' },
    },
    takeaway: { en: 'Problem: starvation. Solution: aging.', ar: 'المشكلة: starvation. الحل: aging.' },
  },
  {
    id: 'c6-sjf-as-priority',
    chapterId: 'chapter-6',
    sectionId: 'c6-priority-rr',
    topic: 'Priority scheduling',
    concept: 'SJF is priority scheduling by burst length',
    difficulty: 'stretch',
    type: 'mcq',
    origin: 'historical',
    prompt: 'An SJF algorithm is simply a priority algorithm where the priority is ______',
    options: [
      { id: 'a', text: 'the predicted next CPU burst' },
      { id: 'b', text: 'the inverse of the predicted next CPU burst' },
      { id: 'c', text: 'the current CPU burst' },
      { id: 'd', text: 'anything the user wants' },
    ],
    correct: 'b',
    sourceRefs: [{ examId: 'final_2020', question: 'Q2.48' }],
    answerStatus: 'independently-verified',
    explanation: {
      en: 'The lecture: “SJF is priority scheduling where priority is the **inverse of predicted next CPU burst time**.” The shorter the predicted burst, the higher the priority. (Some books phrase it as “the priority number is the predicted burst”, because a smaller number means higher priority — but as a priority it is the inverse, which is what the lecture states.)',
      ar: 'المحاضرة: “SJF is priority scheduling where priority is the **inverse of predicted next CPU burst time**.” كل ما الـ burst المتوقع يقصر، الأولوية تعلى. (فيه كتب بتقولها “رقم الأولوية هو الـ burst المتوقع” لأن الرقم الأصغر = أولوية أعلى — بس كأولوية هي المعكوس، وده اللي المحاضرة بتقوله.)',
    },
    optionNotes: {
      a: { en: 'That is the priority number, not the priority; the lecture says inverse.', ar: 'ده رقم الأولوية مش الأولوية نفسها؛ والمحاضرة بتقول inverse.' },
    },
    takeaway: { en: 'SJF = priority ∝ 1 / predicted next burst.', ar: 'SJF = الأولوية ∝ 1 / الـ burst الجاي المتوقع.' },
  },
  {
    id: 'c6-timesharing-rr',
    chapterId: 'chapter-6',
    sectionId: 'c6-priority-rr',
    topic: 'Round robin',
    concept: 'Time-sharing uses round robin',
    difficulty: 'core',
    type: 'mcq',
    origin: 'historical',
    prompt: 'What scheduling algorithm is used in a time-sharing system?',
    options: [
      { id: 'a', text: 'Priority scheduling' },
      { id: 'b', text: 'Round Robin' },
      { id: 'c', text: 'FCFS' },
      { id: 'd', text: 'SJF' },
    ],
    correct: 'b',
    sourceRefs: [{ examId: 'final_2024', question: 'Q1.4' }],
    answerStatus: 'independently-verified',
    explanation: {
      en: 'Time-sharing switches the CPU among users so frequently that each can interact with their program. That is **round robin**: every process gets a small time quantum in turn, enforced by a timer interrupt.',
      ar: 'الـ time-sharing بيبدّل الـ CPU بين المستخدمين بسرعة جدًا لدرجة إن كل واحد يقدر يتفاعل مع برنامجه. وده بالظبط الـ **round robin**: كل process بتاخد time quantum صغير بالدور، والـ timer interrupt هو اللي بيفرضه.',
    },
    takeaway: { en: 'Time-sharing → RR.', ar: 'Time-sharing ← RR.' },
  },
  {
    id: 'c6-rr-large-quantum-2024',
    chapterId: 'chapter-6',
    sectionId: 'c6-priority-rr',
    topic: 'Round robin',
    concept: 'Large quantum → FCFS',
    difficulty: 'core',
    type: 'mcq',
    origin: 'historical',
    prompt: 'In the Round Robin algorithm, what happens if the time quantum is too large?',
    options: [
      { id: 'a', text: 'It behaves like SJF' },
      { id: 'b', text: 'It behaves like FCFS' },
      { id: 'c', text: 'Processes experience starvation' },
      { id: 'd', text: 'CPU utilization decreases' },
    ],
    correct: 'b',
    sourceRefs: [{ examId: 'final_2024', question: 'Q1.7' }],
    answerStatus: 'independently-verified',
    explanation: {
      en: '“q large ⇒ FIFO”: if the quantum is longer than every burst, no process is ever preempted, so RR serves them in queue order — FCFS. (A too **small** q is the other extreme: too many context switches.)',
      ar: '“q large ⇒ FIFO”: لو الـ quantum أطول من كل الـ bursts، مفيش process هيتعملها preempt، فالـ RR بيخدمهم بترتيب الـ queue — يعني FCFS. (والـ q الـ**صغير** جدًا هو الطرف التاني: context switches كتير.)',
    },
    takeaway: { en: 'q → ∞: RR = FCFS.', ar: 'q ← ∞: الـ RR = FCFS.' },
  },
  {
    id: 'c6-rr-large-slices-2020',
    chapterId: 'chapter-6',
    sectionId: 'c6-priority-rr',
    topic: 'Round robin',
    concept: 'Very large time slices → FCFS',
    difficulty: 'core',
    type: 'mcq',
    origin: 'historical',
    prompt: 'With round robin scheduling algorithm in a time shared system ______',
    options: [
      { id: 'a', text: 'using very large time slices converts it into First come First served scheduling algorithm' },
      { id: 'b', text: 'using very small time slices converts it into First come First served scheduling algorithm' },
      { id: 'c', text: 'using extremely small time slices increases performance' },
      { id: 'd', text: 'using very small time slices converts it into Shortest Job First algorithm' },
    ],
    correct: 'a',
    sourceRefs: [{ examId: 'final_2020', question: 'Q2.46' }],
    answerStatus: 'independently-verified',
    explanation: {
      en: 'Very **large** slices → no preemption → FCFS. Very small slices do not turn RR into anything else; they cause so many context switches that overhead hurts performance — q must be large compared with the context-switch time.',
      ar: 'شرائح **كبيرة** جدًا ← مفيش preemption ← FCFS. والشرائح الصغيرة جدًا مبتحوّلش الـ RR لحاجة تانية؛ هي بتعمل context switches كتير لدرجة إن الـ overhead بيبوّظ الأداء — لازم الـ q يكون كبير بالنسبة لوقت الـ context switch.',
    },
    optionNotes: {
      b: { en: 'Small slices = more switching, not FCFS.', ar: 'الشرائح الصغيرة = تبديل أكتر، مش FCFS.' },
      c: { en: 'Extremely small slices waste time on context switches.', ar: 'الشرائح الصغيرة جدًا بتضيّع الوقت في الـ context switches.' },
    },
    takeaway: { en: 'Large q → FCFS; tiny q → overhead.', ar: 'q كبير ← FCFS؛ q صغير جدًا ← overhead.' },
  },
  {
    id: 'c6-fcfs-rr-infinite-tf',
    chapterId: 'chapter-6',
    sectionId: 'c6-priority-rr',
    topic: 'Round robin',
    concept: 'RR with infinite quantum = FCFS',
    difficulty: 'core',
    type: 'tf',
    origin: 'historical',
    prompt: 'FCFS CPU scheduling is the same as RR with infinite quantum.',
    correct: true,
    sourceRefs: [
      { examId: 'final_2023', question: 'Q1.21' },
      { examId: 'final_nodate', question: 'Q1.21' },
    ],
    answerStatus: 'independently-verified',
    explanation: {
      en: 'True. With an infinite quantum the timer never preempts anyone; each process runs its whole burst in queue (arrival) order — exactly FCFS.',
      ar: 'صح. مع quantum لا نهائي الـ timer عمره ما هيعمل preempt لحد؛ وكل process هتشتغل الـ burst كله بترتيب الـ queue (الوصول) — يعني FCFS بالظبط.',
    },
    optionNotes: {
      true: { en: 'Correct.', ar: 'صح.' },
      false: { en: 'An infinite quantum removes all preemption, leaving FCFS.', ar: 'الـ quantum اللانهائي بيلغي أي preemption، فيفضل FCFS.' },
    },
    takeaway: { en: 'RR(q = ∞) = FCFS.', ar: 'RR(q = ∞) = FCFS.' },
  },
  {
    id: 'c6-response-interactive',
    chapterId: 'chapter-6',
    sectionId: 'c6-priority-rr',
    topic: 'Round robin',
    concept: 'RR gives the best response',
    difficulty: 'core',
    type: 'mcq',
    origin: 'historical',
    prompt: 'Which scheduling algorithm minimizes the response time for interactive users?',
    options: [
      { id: 'a', text: 'SJF' },
      { id: 'b', text: 'Round Robin' },
      { id: 'c', text: 'FCFS' },
      { id: 'd', text: 'Priority Scheduling' },
    ],
    correct: 'b',
    sourceRefs: [{ examId: 'final_2024', question: 'Q1.8' }],
    answerStatus: 'independently-verified',
    explanation: {
      en: 'The lecture: RR typically has a **higher average turnaround than SJF, but better response**. Every ready process gets the CPU within (n − 1)·q time units, so an interactive user never waits behind a long job. SJF minimizes average **waiting**, not response.',
      ar: 'المحاضرة: الـ RR عادةً الـ **average turnaround بتاعه أعلى من الـ SJF، بس الـ response أحسن**. كل process جاهزة بتاخد الـ CPU خلال (n − 1)·q وحدة زمن بالكتير، فالمستخدم التفاعلي عمره ما يستنى ورا شغلانة طويلة. والـ SJF بيقلل متوسط الـ **waiting**، مش الـ response.',
    },
    optionNotes: {
      a: { en: 'SJF minimizes average waiting time, not response time.', ar: 'الـ SJF بيقلل متوسط الـ waiting، مش الـ response.' },
    },
    takeaway: { en: 'Best response → RR. Best average waiting → SJF.', ar: 'أحسن response ← RR. أحسن متوسط waiting ← SJF.' },
  },
  {
    id: 'c6-calc-rr',
    chapterId: 'chapter-6',
    sectionId: 'c6-priority-rr',
    topic: 'Scheduling calculation',
    concept: 'Round robin (q = 2) average waiting time',
    difficulty: 'stretch',
    type: 'mcq',
    origin: 'historical',
    prompt: `Consider the following set of processes:
${final2023Table}
What is the average waiting time for the process set if the round-robin (RR) scheduling algorithm is used with a time quantum of 2?`,
    options: [
      { id: 'a', text: '5.25' },
      { id: 'b', text: '6.75' },
      { id: 'c', text: '8.25' },
      { id: 'd', text: '10.25' },
    ],
    correct: '',
    sourceRefs: [
      { examId: 'final_2023', question: 'Q3.63', note: 'The transcript prints the quantum as “27”, an OCR slip for “2?”; with q = 27 the answer would be the FCFS value 5.75, which is not an option either.' },
      { examId: 'final_nodate', question: 'Q3.63', note: 'The scan circles (d) and adds the handwritten note “9.75 is the correct answer”.' },
    ],
    answerStatus: 'needs-review',
    unscored: true,
    explanation: {
      en: 'None of the printed options is right. Gantt (new arrivals join the queue before the preempted process): P1 0–2 · P2 2–4 · P3 4–6 · P1 6–8 · P4 8–10 · P2 10–11 (done) · P3 11–13 · P1 13–14 (done) · P4 14–16 · P3 16–18 · P4 18–20 (done) · P3 20–22 (done). Waiting: P1 = 14 − 0 − 5 = 9, P2 = 11 − 1 − 3 = 7, P3 = 22 − 2 − 8 = 12, P4 = 20 − 3 − 6 = 11 → (9 + 7 + 12 + 11) / 4 = **9.75**, matching the handwritten note on the scan. With the other tie rule (P1 re-queued ahead of P3 at t = 2) the average is 9.25 — still not an option. In the exam pick the nearest option and write the computed value beside it.',
      ar: 'ولا اختيار من المطبوعين صح. الـ Gantt (اللي يوصل جديد يدخل الـ queue قبل اللي اتعمله preempt): P1 0–2 · P2 2–4 · P3 4–6 · P1 6–8 · P4 8–10 · P2 10–11 (خلصت) · P3 11–13 · P1 13–14 (خلصت) · P4 14–16 · P3 16–18 · P4 18–20 (خلصت) · P3 20–22 (خلصت). الـ Waiting: P1 = 14 − 0 − 5 = 9، P2 = 11 − 1 − 3 = 7، P3 = 22 − 2 − 8 = 12، P4 = 20 − 3 − 6 = 11 ← (9 + 7 + 12 + 11) / 4 = **9.75**، وده نفس الملاحظة المكتوبة بخط اليد على الورقة. ولو استخدمت قاعدة التعادل التانية (P1 ترجع الـ queue قبل P3 عند t = 2) المتوسط 9.25 — برضه مش موجود. في الامتحان اختار أقرب اختيار واكتب القيمة اللي حسبتها جنبه.',
    },
    takeaway: { en: 'RR q = 2 on this set: 9.75 (not among the options).', ar: 'RR q = 2 على المجموعة دي: 9.75 (مش من الاختيارات).' },
  },
  {
    id: 'c6-calc-priority',
    chapterId: 'chapter-6',
    sectionId: 'c6-priority-rr',
    topic: 'Scheduling calculation',
    concept: 'Non-preemptive priority average waiting time',
    difficulty: 'core',
    type: 'mcq',
    origin: 'historical',
    prompt: `Consider the following set of processes:
${final2023Table}
What is the average waiting time for the process set if the nonpreemptive priority scheduling algorithm is used given that (a lower value means a higher priority)?`,
    options: [
      { id: 'a', text: '5.25' },
      { id: 'b', text: '6.75' },
      { id: 'c', text: '7.5' },
      { id: 'd', text: '8.25' },
    ],
    correct: 'a',
    sourceRefs: [
      { examId: 'final_2023', question: 'Q3.64' },
      { examId: 'final_nodate', question: 'Q3.64' },
    ],
    answerStatus: 'independently-verified',
    explanation: {
      en: 'At t = 0 only P1 has arrived, so it runs 0–5 even though P2 (priority 1) arrives at t = 1 — nonpreemptive. At t = 5 the ready set is P2 (1), P4 (3), P3 (4) → P2 5–8, P4 8–14, P3 14–22. Waiting: P1 = 0, P2 = 5 − 1 = 4, P3 = 14 − 2 = 12, P4 = 8 − 3 = 5 → (0 + 4 + 12 + 5) / 4 = **5.25**.',
      ar: 'عند t = 0 مفيش غير P1، فبتشتغل 0–5 حتى لو P2 (أولوية 1) وصلت عند t = 1 — لأنه nonpreemptive. عند t = 5 الجاهزين P2 (1) وP4 (3) وP3 (4) ← P2 5–8، وP4 8–14، وP3 14–22. الـ Waiting: P1 = 0، P2 = 5 − 1 = 4، P3 = 14 − 2 = 12، P4 = 8 − 3 = 5 ← (0 + 4 + 12 + 5) / 4 = **5.25**.',
    },
    takeaway: { en: 'Nonpreemptive priority: decide only when the CPU becomes free.', ar: 'الـ Priority الـ nonpreemptive: القرار بس لما الـ CPU يفضى.' },
  },
  {
    id: 'c6-rr2-p1-waiting',
    chapterId: 'chapter-6',
    sectionId: 'c6-priority-rr',
    topic: 'Scheduling calculation',
    concept: 'RR (q = 2) waiting time of P1',
    difficulty: 'stretch',
    type: 'mcq',
    origin: 'historical',
    prompt: `Consider the following set of processes, the arrival time and the length of the CPU burst time given in milliseconds:
${final2020Table}
Assume the processes are scheduled with the RR (time quantum: 2) scheduling algorithm.
The waiting time for process P1 is ______`,
    options: [
      { id: 'a', text: '9 MS' },
      { id: 'b', text: '13 MS' },
      { id: 'c', text: '15 MS' },
      { id: 'd', text: '21 MS' },
    ],
    correct: '',
    sourceRefs: [{ examId: 'final_2020', question: 'Q3.63', note: 'A USB drive covers part of the printed table in the scan; the transcribed values do not give any printed option.' }],
    answerStatus: 'needs-review',
    unscored: true,
    explanation: {
      en: 'No printed option matches. The paper’s other options (Q3.64 = 21, Q3.66 = 15) only work if a process whose quantum expires is re-queued **before** a process arriving at the same instant. Then: P1 0–2 · P1 2–4 · P2 4–6 · P1 6–8 (done) · P3 8–10 · P2 10–12 · P4 12–14 · P3 14–16 · P2 16–18 · P4 18–19 (done) · P3 19–21 · P2 21–23 (done) · P3 23–24 (done), so P1 waits 8 − 0 − 6 = **2 ms**. With new arrivals first, P1 waits 6 ms. 13 ms is the waiting time of **P2**, which suggests the item meant another process or a table cell is misread.',
      ar: 'ولا اختيار مطبوع مظبوط. باقي اختيارات الورقة (Q3.64 = 21 وQ3.66 = 15) مبتشتغلش غير لو الـ process اللي الـ quantum بتاعها خلص بترجع الـ queue **قبل** process واصلة في نفس اللحظة. ساعتها: P1 0–2 · P1 2–4 · P2 4–6 · P1 6–8 (خلصت) · P3 8–10 · P2 10–12 · P4 12–14 · P3 14–16 · P2 16–18 · P4 18–19 (خلصت) · P3 19–21 · P2 21–23 (خلصت) · P3 23–24 (خلصت)، فـ P1 بتستنى 8 − 0 − 6 = **2 ms**. ولو الجديد يدخل الأول، P1 بتستنى 6 ms. والـ 13 ms ده waiting time بتاع **P2**، فغالبًا السؤال كان قصده process تانية أو فيه رقم في الجدول متقري غلط.',
    },
    takeaway: { en: 'P1 waits 2 ms (paper’s tie rule) — not among the options.', ar: 'P1 بتستنى 2 ms (بقاعدة الورقة) — مش من الاختيارات.' },
  },
  {
    id: 'c6-rr2-p2-turnaround',
    chapterId: 'chapter-6',
    sectionId: 'c6-priority-rr',
    topic: 'Scheduling calculation',
    concept: 'RR (q = 2) turnaround time of P2',
    difficulty: 'stretch',
    type: 'mcq',
    origin: 'historical',
    prompt: `Consider the following set of processes, the arrival time and the length of the CPU burst time given in milliseconds:
${final2020Table}
Assume the processes are scheduled with the RR (time quantum: 2) scheduling algorithm.
The turnaround time for process P2 is ______`,
    options: [
      { id: 'a', text: '13 MS' },
      { id: 'b', text: '15 MS' },
      { id: 'c', text: '21 MS' },
      { id: 'd', text: '23 MS' },
    ],
    correct: 'c',
    sourceRefs: [{ examId: 'final_2020', question: 'Q3.64' }],
    answerStatus: 'independently-verified',
    explanation: {
      en: 'At t = 2 P1’s quantum expires exactly when P2 arrives; the options fit the rule “the preempted process re-enters the queue first”. Gantt: P1 0–2 · P1 2–4 · P2 4–6 · P1 6–8 · P3 8–10 · P2 10–12 · P4 12–14 · P3 14–16 · P2 16–18 · P4 18–19 · P3 19–21 · P2 21–23 · P3 23–24. P2 finishes at 23, so turnaround = 23 − 2 = **21 ms**. (With “new arrival first”, P2 finishes at 21 and the turnaround is 19 — not an option, which is how you can tell the paper’s rule.)',
      ar: 'عند t = 2 الـ quantum بتاع P1 بيخلص في نفس لحظة وصول P2؛ والاختيارات ماشية على قاعدة “اللي اتعمله preempt يرجع الـ queue الأول”. الـ Gantt: P1 0–2 · P1 2–4 · P2 4–6 · P1 6–8 · P3 8–10 · P2 10–12 · P4 12–14 · P3 14–16 · P2 16–18 · P4 18–19 · P3 19–21 · P2 21–23 · P3 23–24. الـ P2 بتخلص عند 23، فالـ turnaround = 23 − 2 = **21 ms**. (ولو “الجديد الأول”، P2 بتخلص عند 21 والـ turnaround = 19 — مش موجود في الاختيارات، ومن هنا تعرف قاعدة الورقة.)',
    },
    takeaway: { en: 'Turnaround = finish − arrival = 23 − 2 = 21.', ar: 'Turnaround = finish − arrival = 23 − 2 = 21.' },
  },
  {
    id: 'c6-rr2-p4-waiting',
    chapterId: 'chapter-6',
    sectionId: 'c6-priority-rr',
    topic: 'Scheduling calculation',
    concept: 'RR (q = 2) waiting time of P4',
    difficulty: 'stretch',
    type: 'mcq',
    origin: 'historical',
    prompt: `Consider the following set of processes, the arrival time and the length of the CPU burst time given in milliseconds:
${final2020Table}
Assume the processes are scheduled with the RR (time quantum: 2) scheduling algorithm.
The waiting time for process P4 is ______`,
    options: [
      { id: 'a', text: '2 MS' },
      { id: 'b', text: '3 MS' },
      { id: 'c', text: '5 MS' },
      { id: 'd', text: '12 MS' },
    ],
    correct: '',
    sourceRefs: [{ examId: 'final_2020', question: 'Q3.65', note: 'The computed value (9 ms under either tie rule) is not printed.' }],
    answerStatus: 'needs-review',
    unscored: true,
    explanation: {
      en: 'No printed option matches. P4 arrives at 7 and runs 12–14 and 18–19, finishing at 19 under either tie rule, so its waiting time is 19 − 7 − 3 = **9 ms**. The printed 2 and 12 are the waiting times of **P1** (2) and **P3** (12) under the paper’s tie rule — the options seem to belong to other processes.',
      ar: 'ولا اختيار مطبوع مظبوط. P4 بتوصل عند 7 وبتشتغل 12–14 و18–19، وبتخلص عند 19 بأي قاعدة تعادل، فالـ waiting time = 19 − 7 − 3 = **9 ms**. والـ 2 والـ 12 المطبوعين هما waiting time بتاع **P1** (2) و**P3** (12) بقاعدة الورقة — يعني الاختيارات شكلها تبع processes تانية.',
    },
    takeaway: { en: 'P4 waits 9 ms — not among the options.', ar: 'P4 بتستنى 9 ms — مش من الاختيارات.' },
  },
  {
    id: 'c6-rr2-avg-turnaround',
    chapterId: 'chapter-6',
    sectionId: 'c6-priority-rr',
    topic: 'Scheduling calculation',
    concept: 'RR (q = 2) average turnaround time',
    difficulty: 'stretch',
    type: 'mcq',
    origin: 'historical',
    prompt: `Consider the following set of processes, the arrival time and the length of the CPU burst time given in milliseconds:
${final2020Table}
Assume the processes are scheduled with the RR (time quantum: 2) scheduling algorithm.
The average turnaround time is ______`,
    options: [
      { id: 'a', text: '7.5 MS' },
      { id: 'b', text: '9 MS' },
      { id: 'c', text: '15 MS' },
      { id: 'd', text: '25 MS' },
    ],
    correct: 'c',
    sourceRefs: [{ examId: 'final_2020', question: 'Q3.66' }],
    answerStatus: 'independently-verified',
    explanation: {
      en: 'Same Gantt as Q3.64 (preempted process re-queued first). Finish times: P1 8, P2 23, P3 24, P4 19. Turnaround: P1 8 − 0 = 8, P2 23 − 2 = 21, P3 24 − 5 = 19, P4 19 − 7 = 12 → (8 + 21 + 19 + 12) / 4 = **15 ms**. (New-arrival-first gives 15.5 — not an option.)',
      ar: 'نفس الـ Gantt بتاع Q3.64 (اللي اتعمله preempt يرجع الأول). أوقات الانتهاء: P1 8 وP2 23 وP3 24 وP4 19. الـ Turnaround: P1 8 − 0 = 8، P2 23 − 2 = 21، P3 24 − 5 = 19، P4 19 − 7 = 12 ← (8 + 21 + 19 + 12) / 4 = **15 ms**. (لو الجديد الأول بتطلع 15.5 — مش من الاختيارات.)',
    },
    takeaway: { en: 'Average turnaround = Σ(finish − arrival) / n = 15.', ar: 'متوسط الـ turnaround = Σ(finish − arrival) / n = 15.' },
  },
  {
    id: 'c6-rr3-calc',
    chapterId: 'chapter-6',
    sectionId: 'c6-priority-rr',
    topic: 'Scheduling calculation',
    concept: 'Round robin q = 3: waiting and turnaround of each process',
    difficulty: 'stretch',
    type: 'fill',
    origin: 'historical',
    prompt: `Consider the following set of processes with their arrival times and burst times:
| Process | Arrival Time | Burst Time |
| P1 | 0 | 6 |
| P2 | 1 | 3 |
| P3 | 2 | 8 |
| P4 | 3 | 4 |
Assume the time quantum for Round Robin scheduling is 3 units. Calculate average waiting time and turnaround time for each process.`,
    blanks: [
      blank('w1', 'Waiting · P1', 9, 6),
      blank('w2', 'Waiting · P2', 2),
      blank('w3', 'Waiting · P3', 11),
      blank('w4', 'Waiting · P4', 12),
      blank('wa', 'Average waiting', 8.5, 7.75),
      blank('t1', 'Turnaround · P1', 15, 12),
      blank('t2', 'Turnaround · P2', 5),
      blank('t3', 'Turnaround · P3', 19),
      blank('t4', 'Turnaround · P4', 16),
      blank('ta', 'Average turnaround', 13.75, 13),
    ],
    sourceRefs: [{ examId: 'final_2024', question: 'Q2.3a' }],
    answerStatus: 'independently-verified',
    explanation: {
      en: 'Gantt (new arrivals join before the preempted process): P1 0–3 · P2 3–6 (done) · P3 6–9 · P4 9–12 · P1 12–15 (done) · P3 15–18 · P4 18–19 (done) · P3 19–21 (done). Turnaround = finish − arrival: P1 15, P2 6 − 1 = 5, P3 21 − 2 = 19, P4 19 − 3 = 16 → average **13.75**. Waiting = turnaround − burst: P1 9, P2 2, P3 11, P4 12 → average **8.5**. At t = 3 P1’s quantum ends just as P4 arrives; if P1 is re-queued first, the order becomes P1 0–3 · P2 3–6 · P3 6–9 · P1 9–12 · P4 12–15 · P3 15–18 · P4 18–19 · P3 19–21, so P1 = 12 / 6 and the averages are 13 / 7.75 — both readings are accepted.',
      ar: 'الـ Gantt (الجديد يدخل الـ queue قبل اللي اتعمله preempt): P1 0–3 · P2 3–6 (خلصت) · P3 6–9 · P4 9–12 · P1 12–15 (خلصت) · P3 15–18 · P4 18–19 (خلصت) · P3 19–21 (خلصت). الـ Turnaround = finish − arrival: P1 = 15، P2 = 6 − 1 = 5، P3 = 21 − 2 = 19، P4 = 19 − 3 = 16 ← المتوسط **13.75**. الـ Waiting = turnaround − burst: P1 = 9، P2 = 2، P3 = 11، P4 = 12 ← المتوسط **8.5**. عند t = 3 الـ quantum بتاع P1 بيخلص في نفس لحظة وصول P4؛ لو P1 رجعت الأول الترتيب بيبقى P1 0–3 · P2 3–6 · P3 6–9 · P1 9–12 · P4 12–15 · P3 15–18 · P4 18–19 · P3 19–21، فـ P1 = 12 / 6 والمتوسطات 13 / 7.75 — والقراءتين مقبولين.',
    },
    takeaway: { en: 'TAT = finish − arrival; WT = TAT − burst; say which tie rule you used.', ar: 'TAT = finish − arrival؛ WT = TAT − burst؛ وقول استخدمت أنهي قاعدة تعادل.' },
  },

  // ───────────────────── Lesson 4 · Multilevel queues and multiprocessors ─────────────────────
  {
    id: 'c6-mlq-starvation-tf',
    chapterId: 'chapter-6',
    sectionId: 'c6-multilevel',
    topic: 'Multilevel queue',
    concept: 'Fixed-priority MLQ can starve',
    difficulty: 'core',
    type: 'tf',
    origin: 'historical',
    prompt: 'Multilevel queue CPU scheduling algorithm cannot suffer from starvation.',
    correct: false,
    sourceRefs: [
      { examId: 'final_2023', question: 'Q1.22' },
      { examId: 'final_nodate', question: 'Q1.22' },
    ],
    answerStatus: 'independently-verified',
    explanation: {
      en: 'False. With **fixed-priority** scheduling between the queues (serve all foreground, then background) there is a **possibility of starvation**: as long as foreground work keeps arriving, background processes never run. Time slicing between queues (e.g. 80% / 20%) avoids it.',
      ar: 'غلط. مع الـ scheduling بـ **fixed priority** بين الـ queues (اخدم الـ foreground كله وبعدين الـ background) فيه **احتمال starvation**: طول ما فيه شغل foreground جاي، الـ background عمره ما يشتغل. والـ time slice بين الـ queues (زي 80% / 20%) بيتجنّب ده.',
    },
    optionNotes: {
      true: { en: 'Fixed priority between queues can starve the lower queues.', ar: 'الـ fixed priority بين الـ queues ممكن يجوّع الـ queues اللي تحت.' },
      false: { en: 'Correct.', ar: 'صح.' },
    },
    takeaway: { en: 'MLQ with fixed priority → possible starvation.', ar: 'MLQ بـ fixed priority ← ممكن starvation.' },
  },
  {
    id: 'c6-mlq-reason',
    chapterId: 'chapter-6',
    sectionId: 'c6-multilevel',
    topic: 'Multilevel queue',
    concept: 'Why use a multilevel queue',
    difficulty: 'stretch',
    type: 'mcq',
    origin: 'historical',
    prompt: 'What is one reason to use a multilevel queue over a single queue for CPU scheduling?',
    options: [
      { id: 'a', text: 'It allows processes to be grouped by priority, memory size, or other attributes' },
      { id: 'b', text: 'It allows processes to move between queues based on their changing characteristics' },
      { id: 'c', text: 'It allows processes to have different time quanta for round-robin scheduling' },
      { id: 'd', text: 'It allows different scheduling algorithms to be used for different queues' },
    ],
    correct: 'd',
    sourceRefs: [
      { examId: 'final_2023', question: 'Q2.44' },
      { examId: 'final_nodate', question: 'Q2.44', note: 'The scanned copy circles (a).' },
    ],
    answerStatus: 'needs-review',
    unscored: true,
    explanation: {
      en: 'Two options describe a multilevel queue correctly. The lecture stresses (d): “each queue has its own scheduling algorithm — foreground RR, background FCFS.” The textbook definition supports (a): processes are permanently assigned to a queue “based on some property of the process, such as memory size, process priority, or process type” — and the scanned copy marks (a). (b) describes the multilevel **feedback** queue. Because two answers are defensible the item is shown for review and not scored; (d) is the reason the slides give.',
      ar: 'فيه اختيارين بيوصفوا الـ multilevel queue صح. المحاضرة بتركز على (d): “each queue has its own scheduling algorithm — foreground RR وbackground FCFS.” وتعريف الكتاب بيدعم (a): الـ processes بتتحط في queue ثابتة “based on some property of the process, such as memory size, process priority, or process type” — والنسخة المتصورة معلّمة (a). أما (b) فده وصف الـ multilevel **feedback** queue. وعشان فيه إجابتين ليهم وجهة نظر، السؤال معروض للمراجعة ومش محسوب؛ و(d) هو السبب اللي في السلايدز.',
    },
    optionNotes: {
      a: { en: 'Also true of a multilevel queue (textbook wording; marked on the scan).', ar: 'صح برضه عن الـ multilevel queue (كلام الكتاب؛ ومتعلّم على الورقة).' },
      b: { en: 'Moving between queues = multilevel feedback queue.', ar: 'التنقل بين الـ queues = multilevel feedback queue.' },
      d: { en: 'The reason the lecture states.', ar: 'السبب اللي المحاضرة بتقوله.' },
    },
    takeaway: { en: 'MLQ: fixed queues, each with its own algorithm. Moving between queues = MLFQ.', ar: 'MLQ: queues ثابتة، كل واحدة ليها algorithm. التنقل بين الـ queues = MLFQ.' },
  },
  {
    id: 'c6-mlfq-fill',
    chapterId: 'chapter-6',
    sectionId: 'c6-multilevel',
    topic: 'Multilevel feedback queue',
    concept: 'Processes move between queues',
    difficulty: 'core',
    type: 'fill',
    origin: 'historical',
    prompt: 'The {{1}} scheduling algorithm allows a process to move between queues.',
    blanks: [
      {
        id: 'b1',
        label: 'Blank 1',
        accepted: ['multilevel feedback queue', 'multi-level feedback queue', 'multilevel feedback', 'mlfq', 'multilevel feedback queue scheduling', 'multi level feedback queue'],
      },
    ],
    sourceRefs: [{ examId: 'final_nodate2', question: 'Q1.13' }],
    answerStatus: 'independently-verified',
    explanation: {
      en: 'The **multilevel feedback queue**: “a process can move between the various queues; aging can be implemented this way.” In a plain multilevel queue a process is permanently assigned to one queue.',
      ar: 'الـ **multilevel feedback queue**: “a process can move between the various queues؛ والـ aging ممكن يتنفّذ بالطريقة دي.” أما في الـ multilevel queue العادية فالـ process بتفضل في queue واحدة على طول.',
    },
    takeaway: { en: 'Moves between queues → multilevel feedback queue.', ar: 'بتتنقل بين الـ queues ← multilevel feedback queue.' },
  },
  {
    id: 'c6-multiprocessor-challenge',
    chapterId: 'chapter-6',
    sectionId: 'c6-multilevel',
    topic: 'Multiple-processor scheduling',
    concept: 'Load balancing',
    difficulty: 'core',
    type: 'mcq',
    origin: 'historical',
    prompt: 'What is one challenge of scheduling processes in a multiprocessor system?',
    options: [
      { id: 'a', text: 'Load balancing' },
      { id: 'b', text: 'Processor affinity' },
      { id: 'c', text: 'Cache coherence' },
      { id: 'd', text: 'Synchronization' },
    ],
    correct: 'a',
    sourceRefs: [
      { examId: 'final_2023', question: 'Q2.45' },
      { examId: 'final_nodate', question: 'Q2.45' },
    ],
    answerStatus: 'independently-verified',
    explanation: {
      en: 'With several CPUs the scheduler must keep the workload **evenly distributed** — **load balancing** (push and pull migration), needed when each CPU has its own private ready queue. Processor affinity is the tendency to keep a process on the same CPU (often a goal that load balancing must respect); cache coherence and synchronization are hardware / concurrency issues rather than scheduling challenges. The scan marks (a).',
      ar: 'مع كذا CPU الـ scheduler لازم يخلّي الشغل **متوزع بالتساوي** — وده الـ **load balancing** (push وpull migration)، ومحتاجينه لما كل CPU يكون ليه ready queue خاصة. الـ processor affinity هو الميل إن الـ process تفضل على نفس الـ CPU (وغالبًا هدف الـ load balancing لازم يحترمه)؛ والـ cache coherence والـ synchronization مشاكل hardware / concurrency أكتر منها تحديات scheduling. والورقة معلّمة (a).',
    },
    optionNotes: {
      b: { en: 'Affinity is a property the scheduler tries to keep, not the main challenge.', ar: 'الـ affinity خاصية الـ scheduler بيحاول يحافظ عليها، مش التحدي الأساسي.' },
    },
    takeaway: { en: 'Multiprocessor scheduling challenge → load balancing.', ar: 'تحدي الـ multiprocessor scheduling ← load balancing.' },
  },

  // ───────────────────── Lesson 5 · Evaluation and the problem clinic ─────────────────────
  {
    id: 'c6-evaluation-essay',
    chapterId: 'chapter-6',
    sectionId: 'c6-evaluation',
    topic: 'Algorithm evaluation',
    concept: 'Four evaluation methods with pros and cons',
    difficulty: 'stretch',
    type: 'short',
    origin: 'historical',
    prompt:
      'Selecting a CPU scheduling algorithm for a particular OS can be difficult. Briefly describe the different evaluation methods to select the suitable algorithm and show the advantages and disadvantages of using each method.',
    modelAnswer:
      'First define the criteria (e.g. maximize CPU utilization with response time under 1 s), then evaluate candidate algorithms with one of four methods. 1) Deterministic modeling (analytic evaluation): take a particular predetermined workload and compute the performance of each algorithm on it (e.g. Gantt charts giving average waiting FCFS 28, SJF 13, RR 23 ms). Advantages: simple, fast, gives exact numbers that are easy to compare. Disadvantage: needs exact input, and the result applies only to that workload. 2) Queueing models: describe arrivals and CPU / I/O bursts probabilistically (often exponential, by their mean); model the computer as a network of servers, each with a queue of waiting processes; from arrival and service rates compute utilization, average queue length and average wait, e.g. with Little’s formula n = λ × W (valid for any algorithm and arrival distribution). Advantage: useful for comparing algorithms without running them. Disadvantage: only approximations; realistic algorithms and distributions are hard to analyse, so the distributions are often simplified and may be unrealistic. 3) Simulation: program a model of the computer system (data structures for the components, a clock variable, statistics gathered) and drive it with random numbers from probability or empirical distributions, or with trace tapes recording real event sequences. Advantage: more accurate than queueing models; trace tapes compare algorithms on the same real input. Disadvantage: expensive in computation and storage, takes a long time, and is still only a model. 4) Implementation: code the algorithm in a real OS and measure it. Advantage: the only completely accurate method. Disadvantages: high cost and high risk (coding, testing, user reaction), and the environment changes over time; flexible, tunable schedulers and APIs that change priorities help.',
    keywordGroups: [
      { label: 'deterministic modeling', patterns: ['deterministic', 'analytic'] },
      { label: 'queueing models', patterns: ['queueing', 'queuing', 'little', 'queue model', 'probabilistic'] },
      { label: 'simulation', patterns: ['simulation', 'simulate', 'trace'] },
      { label: 'implementation', patterns: ['implementation', 'implement', 'real system', 'real os'] },
      { label: 'advantages (simple/fast/accurate)', patterns: ['simple', 'fast', 'accurate', 'exact'] },
      { label: 'disadvantages (specific/expensive/risk)', patterns: ['expensive', 'cost', 'risk', 'only for', 'specific', 'approximation', 'time consuming'] },
    ],
    passRatio: 0.67,
    sourceRefs: [
      { examId: 'final_2024', question: 'Q2.1' },
      { examId: 'final_nodate2', question: 'Q7', note: 'Printed “Describe briefly …” instead of “Briefly describe …”; otherwise identical.' },
    ],
    answerStatus: 'independently-verified',
    explanation: {
      en: 'Name **four** methods, and give a pro and a con for each: **deterministic modeling** (simple and fast; exact numbers but only for that one workload), **queueing models** (no need to run anything, Little’s formula; but approximations, distributions simplified), **simulation** (more accurate, trace tapes; but expensive and slow), **implementation** (completely accurate; but high cost, high risk, environment changes).',
      ar: 'اذكر **أربع** طرق، ولكل واحدة ميزة وعيب: **deterministic modeling** (بسيطة وسريعة؛ أرقام دقيقة بس للـ workload دي بس)، **queueing models** (مش محتاج تشغّل حاجة، وقانون Little؛ بس تقريبية والـ distributions متبسطة)، **simulation** (أدق، والـ trace tapes؛ بس مكلفة وبطيئة)، **implementation** (دقيقة تمامًا؛ بس تكلفة عالية ومخاطرة، والبيئة بتتغير).',
    },
    takeaway: { en: 'Deterministic · queueing · simulation · implementation — each with a pro and a con.', ar: 'Deterministic · queueing · simulation · implementation — ولكل واحدة ميزة وعيب.' },
  },
  {
    id: 'c6-b-gantt',
    chapterId: 'chapter-6',
    sectionId: 'c6-evaluation',
    topic: 'Scheduling calculation',
    concept: 'Four Gantt charts on one workload',
    difficulty: 'stretch',
    type: 'short',
    origin: 'historical',
    prompt: undatedBStem,
    modelAnswer:
      'FCFS: P1 0-10 | P2 10-39 | P3 39-42 | P4 42-49 | P5 49-61. Preemptive SJF: P1 0-2 | P3 2-5 | P4 5-12 | P1 12-20 | P5 20-32 | P2 32-61. Non-preemptive priority: P1 0-10 | P5 10-22 | P2 22-51 | P4 51-58 | P3 58-61. RR (q = 3): P1 0-3 | P2 3-6 | P3 6-9 | P4 9-12 | P1 12-15 | P5 15-18 | P2 18-21 | P4 21-24 | P1 24-27 | P5 27-30 | P2 30-33 | P4 33-34 | P1 34-35 | P5 35-38 | P2 38-41 | P5 41-44 | P2 44-61.',
    keywordGroups: [
      { label: 'FCFS: P1, P2, P3, P4, P5 ending at 61', patterns: ['p1 p2 p3 p4 p5', '10 39 42 49', '39 42 49 61'] },
      { label: 'Preemptive SJF: P3 preempts P1 at 2', patterns: ['p1 p3 p4 p1 p5 p2', '2 5 12 20 32', 'p3 2', '2-5'] },
      { label: 'Priority: P1, P5, P2, P4, P3', patterns: ['p1 p5 p2 p4 p3', '10 22 51 58', '22 51 58'] },
      { label: 'RR q = 3 slices', patterns: ['p1 p2 p3 p4 p1', '0 3 6 9 12', '3 6 9 12 15', '0-3'] },
    ],
    passRatio: 0.75,
    sourceRefs: [{ examId: 'final_nodate2', question: 'Q6a' }],
    answerStatus: 'independently-verified',
    explanation: undatedBSolution,
    takeaway: { en: 'Draw each chart with every boundary time; P3 preempts P1 at t = 2 in SRTF.', ar: 'ارسم كل chart بكل أوقات الحدود؛ وفي الـ SRTF الـ P3 بتعمل preempt لـ P1 عند t = 2.' },
  },
  {
    id: 'c6-b-turnaround',
    chapterId: 'chapter-6',
    sectionId: 'c6-evaluation',
    topic: 'Scheduling calculation',
    concept: 'Turnaround time of each process, four algorithms',
    difficulty: 'stretch',
    type: 'fill',
    origin: 'historical',
    prompt: `${undatedBStem}
b. What is the turnaround time of each process for each of the scheduling algorithms in part a?`,
    blanks: [
      blank('f1', 'FCFS · P1', 10), blank('f2', 'FCFS · P2', 38), blank('f3', 'FCFS · P3', 40), blank('f4', 'FCFS · P4', 46), blank('f5', 'FCFS · P5', 57), blank('fa', 'FCFS · avg', 38.2),
      blank('s1', 'SJF · P1', 20), blank('s2', 'SJF · P2', 60), blank('s3', 'SJF · P3', 3), blank('s4', 'SJF · P4', 9), blank('s5', 'SJF · P5', 28), blank('sa', 'SJF · avg', 24),
      blank('p1', 'Priority · P1', 10), blank('p2', 'Priority · P2', 50), blank('p3', 'Priority · P3', 59), blank('p4', 'Priority · P4', 55), blank('p5', 'Priority · P5', 18), blank('pa', 'Priority · avg', 38.4),
      blank('r1', 'RR · P1', 35, 34), blank('r2', 'RR · P2', 60), blank('r3', 'RR · P3', 7), blank('r4', 'RR · P4', 31, 32), blank('r5', 'RR · P5', 40), blank('ra', 'RR · avg', 34.6),
    ],
    sourceRefs: [{ examId: 'final_nodate2', question: 'Q6b' }],
    answerStatus: 'independently-verified',
    explanation: {
      en: `Turnaround = finish − arrival, from the four charts of part a. FCFS: 10, 38, 40, 46, 57 → avg 38.2. Preemptive SJF: 20, 60, 3, 9, 28 → avg **24**. Priority: 10, 50, 59, 55, 18 → avg 38.4. RR q = 3: 35, 60, 7, 31, 40 → avg 34.6 (P1 and P4 become 34 and 32 if P1 is re-queued before P4 at t = 3; the average stays 34.6). ${undatedBSolution.en}`,
      ar: `الـ Turnaround = finish − arrival من الأربع charts بتوع الجزء a. FCFS: 10 و38 و40 و46 و57 ← المتوسط 38.2. الـ SJF الـ preemptive: 20 و60 و3 و9 و28 ← المتوسط **24**. الـ Priority: 10 و50 و59 و55 و18 ← المتوسط 38.4. الـ RR q = 3: 35 و60 و7 و31 و40 ← المتوسط 34.6 (P1 وP4 بيبقوا 34 و32 لو P1 رجعت الـ queue قبل P4 عند t = 3؛ والمتوسط بيفضل 34.6). ${undatedBSolution.ar}`,
    },
    takeaway: { en: 'Turnaround = finish − arrival, for every process and every algorithm.', ar: 'Turnaround = finish − arrival، لكل process ولكل algorithm.' },
  },
  {
    id: 'c6-b-waiting',
    chapterId: 'chapter-6',
    sectionId: 'c6-evaluation',
    topic: 'Scheduling calculation',
    concept: 'Waiting time of each process, four algorithms',
    difficulty: 'stretch',
    type: 'fill',
    origin: 'historical',
    prompt: `${undatedBStem}
c. What is the waiting time of each process for each of the scheduling algorithms in part a?`,
    blanks: [
      blank('f1', 'FCFS · P1', 0), blank('f2', 'FCFS · P2', 9), blank('f3', 'FCFS · P3', 37), blank('f4', 'FCFS · P4', 39), blank('f5', 'FCFS · P5', 45), blank('fa', 'FCFS · avg', 26),
      blank('s1', 'SJF · P1', 10), blank('s2', 'SJF · P2', 31), blank('s3', 'SJF · P3', 0), blank('s4', 'SJF · P4', 2), blank('s5', 'SJF · P5', 16), blank('sa', 'SJF · avg', 11.8),
      blank('p1', 'Priority · P1', 0), blank('p2', 'Priority · P2', 21), blank('p3', 'Priority · P3', 56), blank('p4', 'Priority · P4', 48), blank('p5', 'Priority · P5', 6), blank('pa', 'Priority · avg', 26.2),
      blank('r1', 'RR · P1', 25, 24), blank('r2', 'RR · P2', 31), blank('r3', 'RR · P3', 4), blank('r4', 'RR · P4', 24, 25), blank('r5', 'RR · P5', 28), blank('ra', 'RR · avg', 22.4),
    ],
    sourceRefs: [{ examId: 'final_nodate2', question: 'Q6c' }],
    answerStatus: 'independently-verified',
    explanation: {
      en: 'Waiting = turnaround − burst. FCFS: 0, 9, 37, 39, 45 → avg 26. Preemptive SJF: 10, 31, 0, 2, 16 → avg **11.8**. Priority: 0, 21, 56, 48, 6 → avg 26.2. RR q = 3: 25, 31, 4, 24, 28 → avg 22.4 (24 and 25 for P1 and P4 under the other tie rule at t = 3; same average).',
      ar: 'الـ Waiting = turnaround − burst. FCFS: 0 و9 و37 و39 و45 ← المتوسط 26. الـ SJF الـ preemptive: 10 و31 و0 و2 و16 ← المتوسط **11.8**. الـ Priority: 0 و21 و56 و48 و6 ← المتوسط 26.2. الـ RR q = 3: 25 و31 و4 و24 و28 ← المتوسط 22.4 (P1 وP4 بيبقوا 24 و25 بقاعدة التعادل التانية عند t = 3؛ ونفس المتوسط).',
    },
    takeaway: { en: 'Waiting = turnaround − burst.', ar: 'Waiting = turnaround − burst.' },
  },
  {
    id: 'c6-b-minimum',
    chapterId: 'chapter-6',
    sectionId: 'c6-evaluation',
    topic: 'Scheduling calculation',
    concept: 'Which algorithm minimizes the averages',
    difficulty: 'core',
    type: 'fill',
    origin: 'historical',
    prompt: `${undatedBStem}
d. Highlight the algorithm results in the minimum average turnaround time and the algorithm results in the minimum average waiting time.`,
    blanks: [
      {
        id: 'b1',
        label: 'Minimum average turnaround',
        accepted: ['preemptive sjf', 'srtf', 'sjf preemptive', 'preemptive shortest job first', 'shortest remaining time first', 'shortest-remaining-time-first', 'shortest remaining time'],
      },
      {
        id: 'b2',
        label: 'Minimum average waiting',
        accepted: ['preemptive sjf', 'srtf', 'sjf preemptive', 'preemptive shortest job first', 'shortest remaining time first', 'shortest-remaining-time-first', 'shortest remaining time'],
      },
    ],
    sourceRefs: [{ examId: 'final_nodate2', question: 'Q6d' }],
    answerStatus: 'independently-verified',
    explanation: {
      en: '**Preemptive SJF** wins both: average turnaround 24 (vs FCFS 38.2, priority 38.4, RR 34.6) and average waiting 11.8 (vs 26, 26.2, 22.4). For one workload the two minima always come from the same algorithm, because waiting = turnaround − burst and the bursts do not change.',
      ar: 'الـ **SJF الـ preemptive** كسب في الاتنين: متوسط turnaround = 24 (قصاد FCFS 38.2 وpriority 38.4 وRR 34.6) ومتوسط waiting = 11.8 (قصاد 26 و26.2 و22.4). ولنفس الـ workload الأقل في الاتنين دايمًا بيبقى نفس الـ algorithm، لأن waiting = turnaround − burst والـ bursts مبتتغيرش.',
    },
    takeaway: { en: 'Same workload: minimum average turnaround ⇔ minimum average waiting.', ar: 'لنفس الـ workload: أقل متوسط turnaround ⇔ أقل متوسط waiting.' },
  },
]
