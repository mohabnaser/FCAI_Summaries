import type { Section } from '../../../types'
import { part, t } from '../../sections/helpers'

/** Peterson's solution, disabling interrupts, test_and_set, compare_and_swap and the bounded-waiting fix. */
export const hardware: Section = {
  id: 'c5-hardware',
  chapterId: 'chapter-5',
  order: 2,
  kicker: 'Lesson 02',
  title: 'Peterson’s Solution & Synchronization Hardware',
  shortTitle: 'Peterson & Hardware',
  summary: t(
    'A software solution for two processes (Peterson) and the hardware ones: disabling interrupts on a uniprocessor and the atomic test_and_set and compare_and_swap instructions — including which requirements each one meets.',
    'حل software لاتنين processes (Peterson) وحلول الـ hardware: تعطيل الـ interrupts على uniprocessor، والتعليمات الـ atomic test_and_set وcompare_and_swap — ومعاهم أنهي شروط كل حل بيحققها.',
  ),
  objectives: [
    t('Explain Peterson’s algorithm: the roles of turn and flag[2].', 'تشرح خوارزمية Peterson: دور turn وflag[2].'),
    t('Say why disabling interrupts does not scale to multiprocessors.', 'تقول ليه تعطيل الـ interrupts مينفعش على الـ multiprocessors.'),
    t('Write test_and_set and compare_and_swap and the lock built on each.', 'تكتب test_and_set وcompare_and_swap والـ lock المبني على كل واحدة.'),
    t('Explain why the simple locks miss bounded waiting and how waiting[] fixes it.', 'تشرح ليه الـ locks البسيطة مش بتحقق الـ bounded waiting وإزاي الـ waiting[] بتصلّحها.'),
  ],
  estimatedMinutes: 16,
  quizId: 'quiz-c5-hardware',
  blocks: [
    {
      kind: 'lead',
      text: t(
        'Synchronization can be solved in **software** and in **hardware**. Peterson’s algorithm is a clean software description for two processes; modern machines add **atomic instructions** that every practical lock is built on.',
        'الـ synchronization ليها حلول **software** وحلول **hardware**. خوارزمية Peterson وصف software نضيف لاتنين processes؛ والأجهزة الحديثة بتضيف **تعليمات atomic** كل الـ locks العملية مبنية عليها.',
      ),
    },

    part(t('Peterson’s solution', 'حل Peterson'), t('A two-process solution (Pi and Pj).', 'حل لاتنين processes (Pi وPj).')),
    {
      kind: 'cards',
      columns: 3,
      items: [
        { icon: 'zap', tag: 'assumption', title: 'Atomic load & store', body: t('The **load and store** instructions are atomic — they cannot be interrupted.', 'تعليمات الـ **load والـ store** atomic — متتقطعش.'), tone: 'amber' },
        { icon: 'repeat', tag: 'int turn', title: 'turn', body: t('Whose **turn** it is to enter the critical section.', 'الـ **دور** على مين يدخل الـ critical section.'), tone: 'cyan' },
        { icon: 'signal', tag: 'boolean flag[2]', title: 'flag', body: t('Whether a process is **ready** to enter: flag[i] = true means Pi is ready.', 'هل الـ process **جاهزة** تدخل: flag[i] = true معناها Pi جاهزة.'), tone: 'violet' },
      ],
    },
    {
      kind: 'code',
      title: 'Algorithm for process Pi',
      language: 'c',
      code: `do {
    flag[i] = true;                 /* entry section: I am ready ... */
    turn = j;                       /* ... but you go first          */
    while (flag[j] && turn == j)
        ;                           /* wait while Pj is ready and it is its turn */

        /* critical section */

    flag[i] = false;                /* exit section */

        /* remainder section */
} while (true);`,
      caption: t(
        'Each process politely gives the turn away. If both want in, the one that wrote turn **last** waits — so exactly one enters. Provable: **mutual exclusion is preserved, progress is satisfied, bounded waiting is met.**',
        'كل process بتدّي الدور للتانية بأدب. لو الاتنين عايزين يدخلوا، اللي كتب turn **الأخير** هو اللي بيستنى — فواحدة بس بتدخل. وثابت إن: **الـ mutual exclusion متحقق، والـ progress متحقق، والـ bounded waiting متحقق.**',
      ),
    },

    part(t('Synchronization hardware', 'الـ Synchronization hardware'), t('All the solutions below are based on locking.', 'كل الحلول الجاية مبنية على فكرة الـ locking.')),
    {
      kind: 'versus',
      left: { title: 'Disable interrupts', icon: 'power', tone: 'rose', tagline: t('Uniprocessors', 'الـ Uniprocessors') },
      right: { title: 'Atomic instructions', icon: 'zap', tone: 'teal', tagline: t('Modern machines', 'الأجهزة الحديثة') },
      rows: [
        { aspect: 'Idea', left: t('The running code executes **without preemption**', 'الكود الشغال بيتنفّذ **من غير preemption**'), right: t('Special **atomic (non-interruptible)** instructions', 'تعليمات خاصة **atomic (non-interruptible)**') },
        { aspect: 'Forms', left: t('—', '—'), right: t('**Test** a memory word and **set** its value, or **swap** the contents of two words', '**Test** لكلمة في الذاكرة و**set** لقيمتها، أو **swap** لمحتوى كلمتين') },
        { aspect: 'Scale', left: t('**Too inefficient on multiprocessors**; OSs using it are not broadly scalable', '**غير كفء على الـ multiprocessors**؛ والأنظمة اللي بتستخدمه مش scalable'), right: t('Works on multiprocessors', 'بتشتغل على الـ multiprocessors') },
        { aspect: 'Used by', left: t('—', '—'), right: t('Every lock in the rest of the chapter', 'كل الـ locks في باقي الـ chapter') },
      ],
    },
    {
      kind: 'code',
      title: 'test_and_set — definition and lock',
      language: 'c',
      code: `boolean test_and_set(boolean *target) {
    boolean rv = *target;      /* remember the old value */
    *target = TRUE;            /* always set it          */
    return rv;                 /* ...all in one atomic step */
}

/* shared: boolean lock = FALSE; */
do {
    while (test_and_set(&lock))
        ;                      /* entry: spin while it was already true */

    /* critical section */

    lock = false;              /* exit */

    /* remainder section */
} while (true);`,
    },
    {
      kind: 'code',
      title: 'compare_and_swap — definition and lock',
      language: 'c',
      code: `int compare_and_swap(int *value, int expected, int new_value) {
    int temp = *value;
    if (*value == expected)
        *value = new_value;    /* swap only if it still holds 'expected' */
    return temp;               /* always return the original value       */
}

/* shared: int lock = 0; */
do {
    while (compare_and_swap(&lock, 0, 1) != 0)
        ;                      /* entry: spin until we change 0 -> 1 */

    /* critical section */

    lock = 0;                  /* exit */

    /* remainder section */
} while (true);`,
    },
    {
      kind: 'callout',
      tone: 'warning',
      title: t('Both simple locks: no bounded waiting', 'الـ locks البسيطين: مفيش bounded waiting'),
      body: t(
        'They give **mutual exclusion** and **progress**, but **not bounded waiting**: when the lock is released any spinning process may grab it, so an unlucky one can lose the race forever.',
        'بيحققوا **mutual exclusion** و**progress**، لكن **مش bounded waiting**: لما الـ lock يتساب أي process بتلف ممكن تاخده، فواحدة سيئة الحظ ممكن تخسر السباق على طول.',
      ),
    },
    {
      kind: 'code',
      title: 'Bounded waiting with test_and_set',
      language: 'c',
      code: `do {
    waiting[i] = true;
    key = true;
    while (waiting[i] && key)
        key = test_and_set(&lock);   /* entry: spin until the lock is free ... */
    waiting[i] = false;              /* ... or someone hands it to me          */

    /* critical section */

    j = (i + 1) % n;                 /* exit: look for the next waiting process */
    while ((j != i) && !waiting[j])
        j = (j + 1) % n;
    if (j == i)
        lock = false;                /* nobody waiting: release the lock        */
    else
        waiting[j] = false;          /* hand the critical section straight to Pj */

    /* remainder section */
} while (true);`,
      caption: t(
        'The exiting process scans the others **in cyclic order** and hands entry to the next waiting one, so any waiting process enters within **n − 1 turns** — bounded waiting.',
        'الـ process اللي خارجة بتلف على الباقيين **بالترتيب الدائري** وبتدّي الدخول لأول واحدة مستنية، فأي process مستنية بتدخل خلال **n − 1 دور** بالكتير — bounded waiting.',
      ),
    },
    {
      kind: 'table',
      caption: t('Which requirements each solution meets', 'كل حل بيحقق أنهي شروط'),
      headers: ['Solution', 'Mutual exclusion', 'Progress', 'Bounded waiting'],
      rows: [
        [t('Peterson (2 processes)'), t('✓'), t('✓'), t('✓')],
        [t('test_and_set lock'), t('✓'), t('✓'), t('✗')],
        [t('compare_and_swap lock'), t('✓'), t('✓'), t('✗')],
        [t('test_and_set + waiting[n]'), t('✓'), t('✓'), t('✓')],
      ],
    },
    {
      kind: 'confusions',
      items: [
        {
          wrong: t('“compare_and_swap can be interrupted.”', '“الـ compare_and_swap ممكن تتقطع.”'),
          right: t('It is **atomic** — non-interruptible. That is the whole point.', 'دي **atomic** — مبتتقطعش. ودي الفكرة كلها.'),
        },
        {
          wrong: t('“Peterson does not guarantee bounded waiting.”', '“Peterson مش بيضمن الـ bounded waiting.”'),
          right: t('Peterson meets **all three**. The simple TAS/CAS locks are the ones that miss bounded waiting.', 'Peterson بيحقق **التلاتة**. الـ locks البسيطة بـ TAS/CAS هي اللي مش بتحقق الـ bounded waiting.'),
        },
        {
          wrong: t('“Disabling interrupts is the modern multiprocessor solution.”', '“تعطيل الـ interrupts هو الحل الحديث للـ multiprocessors.”'),
          right: t('It works only on **uniprocessors** and is too inefficient on multiprocessors.', 'بينفع على الـ **uniprocessors** بس، وغير كفء على الـ multiprocessors.'),
        },
      ],
    },
    {
      kind: 'exam',
      title: t('Exam radar: atomicity and Peterson', 'رادار الامتحان: الـ atomicity وPeterson'),
      body: t(
        'Four items. A T/F that Peterson guarantees all three requirements (true), a T/F that compare_and_swap could be interruptible (false), an MCQ that synchronization is done at **both** hardware and software level, and a written question: explain an atomic instruction, show its code, and judge the three requirements.',
        'أربع أسئلة. T/F إن Peterson بيضمن التلات شروط (صح)، وT/F إن compare_and_swap ممكن تتقطع (غلط)، وMCQ إن الـ synchronization بيتعمل على مستوى الـ hardware والـ software **الاتنين**، وسؤال مكتوب: اشرح تعليمة atomic، واكتب كودها، واحكم على التلات شروط.',
      ),
      refs: ['c5-peterson-tf', 'c5-cas-interruptible-tf', 'c5-hardware-software-levels', 'c5-atomic-instruction-essay'],
    },
    {
      kind: 'recap',
      items: [
        t('Peterson: two processes, shared turn and flag[2]; assumes atomic load/store.', 'Peterson: اتنين processes، وturn وflag[2] مشتركين؛ وبيفترض إن الـ load/store atomic.'),
        t('Peterson entry: flag[i] = true; turn = j; while (flag[j] && turn == j);', 'الدخول في Peterson: flag[i] = true; turn = j; while (flag[j] && turn == j);'),
        t('Peterson meets mutual exclusion, progress and bounded waiting.', 'Peterson بيحقق mutual exclusion وprogress وbounded waiting.'),
        t('Disabling interrupts: uniprocessors only; not scalable.', 'تعطيل الـ interrupts: للـ uniprocessors بس؛ مش scalable.'),
        t('test_and_set / compare_and_swap are atomic; simple locks lack bounded waiting.', 'الـ test_and_set والـ compare_and_swap atomic؛ والـ locks البسيطة ناقصها الـ bounded waiting.'),
        t('waiting[n] + cyclic hand-off restores bounded waiting.', 'الـ waiting[n] مع التسليم الدائري بيرجّعوا الـ bounded waiting.'),
      ],
    },
  ],
  examFocus: [
    t('Peterson’s algorithm guarantees mutual exclusion, progress and bounded waiting.', 'خوارزمية Peterson بتضمن mutual exclusion وprogress وbounded waiting.'),
    t('Hardware instructions such as compare_and_swap are atomic — non-interruptible.', 'تعليمات الـ hardware زي compare_and_swap atomic — مبتتقطعش.'),
    t('Synchronization can be done at both the hardware and the software level.', 'الـ synchronization بيتعمل على مستوى الـ hardware والـ software الاتنين.'),
  ],
  keyTerms: [
    { term: 'turn', definition: t('Peterson variable: whose turn it is to enter.', 'متغيّر في Peterson: الدور على مين يدخل.') },
    { term: 'flag[i]', definition: t('Peterson variable: Pi is ready to enter.', 'متغيّر في Peterson: الـ Pi جاهزة تدخل.') },
    { term: 'Atomic', definition: t('Executes as one uninterruptible unit.', 'بيتنفّذ كوحدة واحدة متتقطعش.') },
    { term: 'test_and_set', definition: t('Atomically returns the old value of a word and sets it to true.', 'بيرجّع القيمة القديمة لكلمة ويخليها true في خطوة atomic واحدة.') },
    { term: 'compare_and_swap', definition: t('Atomically sets a word to new_value only if it equals expected; returns the original.', 'بيغيّر الكلمة لـ new_value بس لو كانت بتساوي expected، في خطوة atomic؛ وبيرجّع القيمة الأصلية.') },
  ],
}
