import type { Section } from '../../../types'
import { part, t } from '../../sections/helpers'

/** Mutex locks, semaphores, their implementation without busy waiting, deadlock, starvation and misuse. */
export const semaphores: Section = {
  id: 'c5-semaphores',
  chapterId: 'chapter-5',
  order: 3,
  kicker: 'Lesson 03',
  title: 'Mutex Locks & Semaphores',
  shortTitle: 'Mutex & Semaphores',
  summary: t(
    'The software tools OS designers give programmers: the mutex lock (a spinlock) and the semaphore — wait() and signal(), counting and binary semaphores, the implementation with a waiting queue instead of busy waiting, and what goes wrong: deadlock, starvation, priority inversion and misuse.',
    'الأدوات اللي مصممين الـ OS بيدّوها للمبرمجين: الـ mutex lock (spinlock) والـ semaphore — الـ wait() والـ signal()، والـ counting والـ binary semaphores، والتنفيذ بـ waiting queue بدل الـ busy waiting، وإيه اللي ممكن يبوظ: deadlock وstarvation وpriority inversion والاستخدام الغلط.',
  ),
  objectives: [
    t('Write acquire()/release() and explain why a mutex lock is a spinlock.', 'تكتب acquire()/release() وتشرح ليه الـ mutex lock اسمه spinlock.'),
    t('Define a semaphore, wait() and signal(), and the counting/binary kinds.', 'تعرّف الـ semaphore والـ wait() والـ signal()، والنوعين counting وbinary.'),
    t('Explain the waiting-queue implementation with block() and wakeup().', 'تشرح التنفيذ بالـ waiting queue مع block() وwakeup().'),
    t('Predict the result of signal…wait and wait…wait, and define deadlock, starvation and priority inversion.', 'تتوقع نتيجة signal…wait وwait…wait، وتعرّف الـ deadlock والـ starvation والـ priority inversion.'),
  ],
  estimatedMinutes: 18,
  quizId: 'quiz-c5-semaphores',
  blocks: [
    {
      kind: 'lead',
      text: t(
        'The hardware solutions are complicated and generally inaccessible to application programmers, so OS designers build **software tools** on top of them. The simplest is the **mutex lock**; the more powerful one is the **semaphore**.',
        'حلول الـ hardware معقدة وغالبًا مش متاحة لمبرمجي التطبيقات، فمصممين الـ OS بيبنوا **أدوات software** فوقها. أبسطها الـ **mutex lock**؛ والأقوى هو الـ **semaphore**.',
      ),
    },

    part(t('Mutex locks', 'الـ Mutex locks'), t('Protect a critical region: acquire() first, then release().', 'احمي الـ critical region: acquire() الأول، وبعدين release().')),
    {
      kind: 'code',
      title: 'acquire() and release()',
      language: 'c',
      code: `/* boolean available: is the lock free? */
acquire() {
    while (!available)
        ;   /* busy wait */
    available = false;
}

release() {
    available = true;
}

do {
    acquire lock
        critical section
    release lock
        remainder section
} while (true);`,
      caption: t(
        'Calls to acquire() and release() must be **atomic** — usually implemented with the hardware atomic instructions. Because a waiting process spins in acquire(), this lock requires **busy waiting** and is called a **spinlock**.',
        'نداءات acquire() وrelease() لازم تبقى **atomic** — وغالبًا بتتنفّذ بتعليمات الـ hardware الـ atomic. ولأن الـ process المستنية بتلف جوه acquire()، الـ lock ده محتاج **busy waiting** واسمه **spinlock**.',
      ),
    },

    part(t('Semaphores', 'الـ Semaphores'), t('An integer S changed only by two atomic operations.', 'رقم S مبيتغيّرش غير بعمليتين atomic.')),
    {
      kind: 'code',
      title: 'wait() and signal() — originally P() and V()',
      language: 'c',
      code: `wait(S) {
    while (S <= 0)
        ;   /* busy wait */
    S--;
}

signal(S) {
    S++;
}`,
      caption: t(
        'A semaphore is a synchronization tool that is **less complicated** than the hardware solutions and, in its real implementation, **does not require busy waiting**. S can only be accessed through these two **indivisible (atomic)** operations.',
        'الـ semaphore أداة synchronization **أبسط** من حلول الـ hardware، وفي التنفيذ الحقيقي بتاعها **مش محتاجة busy waiting**. والـ S مينفعش يتوصل له غير بالعمليتين دول الـ **indivisible (atomic)**.',
      ),
    },
    {
      kind: 'versus',
      left: { title: 'Counting semaphore', icon: 'list', tone: 'cyan', tagline: t('Value over an unrestricted domain', 'قيمته في مدى مفتوح') },
      right: { title: 'Binary semaphore', icon: 'lock', tone: 'amber', tagline: t('Value only 0 or 1', 'قيمته 0 أو 1 بس') },
      rows: [
        { aspect: 'Used for', left: t('Counting resources (e.g. empty / full buffers)', 'عدّ الموارد (زي الخانات الفاضية / المليانة)'), right: t('Mutual exclusion — it is then a **mutex lock**', 'الـ mutual exclusion — وساعتها بيبقى **mutex lock**') },
        { aspect: 'Note', left: t('Can be implemented using binary semaphores', 'ممكن يتنفّذ باستخدام binary semaphores'), right: t('Initialized to 1', 'قيمته الأولى 1') },
      ],
    },
    {
      kind: 'code',
      title: 'Ordering two statements: S2 only after S1',
      language: 'c',
      code: `/* shared: semaphore synch = 0; */

/* P1 */            /* P2 */
S1;                 wait(synch);
signal(synch);      S2;`,
      caption: t(
        'synch starts at 0, so P2 blocks in wait(synch) until P1 has finished S1 and signalled. Semaphores solve ordering problems as well as mutual exclusion.',
        'الـ synch بيبدأ بـ 0، فالـ P2 بتتعطّل في wait(synch) لحد ما P1 تخلص S1 وتعمل signal. الـ semaphores بتحل مشاكل الترتيب كمان، مش الـ mutual exclusion بس.',
      ),
    },

    part(t('Implementation without busy waiting', 'التنفيذ من غير busy waiting'), t('No two processes may run wait() and signal() on the same semaphore at the same time.', 'مينفعش اتنين processes يشغّلوا wait() وsignal() على نفس الـ semaphore في نفس الوقت.')),
    {
      kind: 'lead',
      text: t(
        'So the implementation itself is a critical-section problem. Busy waiting inside wait()/signal() is acceptable only because that code is short and rarely occupied — but **applications may spend lots of time in their critical sections**, so spinning there is not a good solution. Instead, each semaphore gets a **waiting queue**.',
        'يبقى التنفيذ نفسه مشكلة critical section. والـ busy waiting جوه wait()/signal() مقبول بس لأن الكود ده قصير ونادرًا ما حد بيبقى جواه — لكن **التطبيقات ممكن تقعد وقت طويل في الـ critical sections بتاعتها**، فاللف هناك مش حل كويس. بدل كده، كل semaphore بياخد **waiting queue**.',
      ),
    },
    {
      kind: 'code',
      title: 'Semaphore with a waiting queue',
      language: 'c',
      code: `typedef struct {
    int value;
    struct process *list;      /* the waiting queue */
} semaphore;

wait(semaphore S) {
    S.value--;
    if (S.value < 0) {
        add this process to S.list;
        block();               /* sleep in the waiting queue: no spinning */
    }
}

signal(semaphore S) {
    S.value++;
    if (S.value <= 0) {
        remove a process P from S.list;
        wakeup(P);             /* move P to the ready queue */
    }
}`,
      caption: t(
        '**block** places the calling process on the semaphore’s waiting queue; **wakeup** removes one process from it and places it in the ready queue. A **negative value** tells how many processes are waiting.',
        'الـ **block** بتحط الـ process اللي نادت في الـ waiting queue بتاع الـ semaphore؛ والـ **wakeup** بتشيل process واحدة منه وتحطها في الـ ready queue. والـ **قيمة السالبة** بتقول كام process مستنية.',
      ),
    },
    {
      kind: 'visual',
      id: 'semaphore-lab',
      title: t('Semaphore lab: right order, wrong order', 'معمل الـ Semaphore: الترتيب الصح والغلط'),
      caption: t(
        'Run processes through wait(mutex) … signal(mutex) and watch S.value and the waiting queue. Then try the two faulty orders the exams ask about.',
        'مشّي processes في wait(mutex) … signal(mutex) وشوف S.value والـ waiting queue. وبعدين جرّب الترتيبين الغلط اللي الامتحانات بتسأل عنهم.',
      ),
    },

    part(t('Deadlock, starvation, priority inversion', 'الـ Deadlock والـ Starvation والـ Priority inversion'), t('What can still go wrong.', 'إيه اللي لسه ممكن يبوظ.')),
    {
      kind: 'code',
      title: 'Deadlock with two semaphores S and Q (both = 1)',
      language: 'c',
      code: `/* P0 */            /* P1 */
wait(S);            wait(Q);
wait(Q);            wait(S);     /* each now waits for the other */
  ...                 ...
signal(S);          signal(Q);
signal(Q);          signal(S);`,
    },
    {
      kind: 'cards',
      columns: 3,
      items: [
        { icon: 'link', title: 'Deadlock', body: t('Two or more processes wait **indefinitely for an event that only one of the waiting processes can cause**.', 'اتنين processes أو أكتر بيستنوا **للأبد حدث محدش يقدر يعمله غير واحدة من الـ processes المستنية نفسها**.'), tone: 'rose' },
        { icon: 'hourglass', title: 'Starvation', body: t('**Indefinite blocking**: a process may never be removed from the semaphore queue in which it is suspended.', '**Blocking للأبد**: process ممكن عمرها ما تطلع من الـ semaphore queue اللي متعلّقة فيها.'), tone: 'amber' },
        { icon: 'trending', title: 'Priority inversion', body: t('A **scheduling problem**: a lower-priority process holds a lock needed by a higher-priority process.', '**مشكلة scheduling**: process أولويتها أقل ماسكة lock محتاجاه process أولويتها أعلى.'), tone: 'violet' },
      ],
    },
    {
      kind: 'table',
      caption: t('Incorrect use of semaphore operations', 'الاستخدام الغلط لعمليات الـ semaphore'),
      headers: ['Mistake', 'Result'],
      rows: [
        [t('signal(mutex) … critical section … wait(mutex)'), t('**Several processes** may be in their critical sections at once — mutual exclusion is broken.', '**كذا process** ممكن يبقوا في الـ critical section مع بعض — الـ mutual exclusion اتكسر.')],
        [t('wait(mutex) … critical section … wait(mutex)'), t('**Deadlock** — the second wait blocks forever.', '**Deadlock** — الـ wait التانية بتتعطّل للأبد.')],
        [t('Omitting wait(mutex) or signal(mutex) (or both)'), t('Mutual exclusion is violated, or processes block forever.', 'الـ mutual exclusion بيتكسر، أو الـ processes بتتعطّل للأبد.')],
      ],
    },
    {
      kind: 'confusions',
      items: [
        {
          wrong: t('“A semaphore requires busy waiting.”', '“الـ semaphore محتاج busy waiting.”'),
          right: t('It is defined to **not** require busy waiting: the waiting queue + block() replace spinning. The **mutex spinlock** is the one that spins.', 'متعرّف إنه **مش** محتاج busy waiting: الـ waiting queue مع block() بيحلّوا محل اللف. والـ **mutex spinlock** هو اللي بيلف.'),
        },
        {
          wrong: t('“signal … wait causes a deadlock.”', '“الـ signal … wait بيعمل deadlock.”'),
          right: t('signal … wait lets **several processes in**; **wait … wait** is the deadlock.', 'الـ signal … wait بيدخّل **كذا process**؛ والـ **wait … wait** هو الـ deadlock.'),
        },
        {
          wrong: t('“Busy waiting’s main cost is code complexity.”', '“العيب الأساسي للـ busy waiting هو تعقيد الكود.”'),
          right: t('Its cost is **wasted CPU cycles** while waiting.', 'عيبه هو **CPU cycles ضايعة** وهو مستني.'),
        },
      ],
    },
    {
      kind: 'exam',
      title: t('Exam radar: the two wrong orders', 'رادار الامتحان: الترتيبين الغلط'),
      body: t(
        'Five items, two of them in two papers each. **signal … wait** → several processes in the critical section; **wait … wait** → deadlock. Also: busy waiting wastes CPU cycles, “semaphores require busy waiting” (false) and “incorrect use might lead to deadlock” (true).',
        'خمس أسئلة، اتنين منهم جم في امتحانين. **signal … wait** ← كذا process في الـ critical section؛ و**wait … wait** ← deadlock. وكمان: الـ busy waiting بيضيّع CPU cycles، و“الـ semaphores محتاجة busy waiting” (غلط)، و“الاستخدام الغلط ممكن يعمل deadlock” (صح).',
      ),
      refs: ['c5-busy-waiting-cost', 'c5-semaphore-busy-waiting-tf', 'c5-signal-then-wait', 'c5-wait-then-wait', 'c5-incorrect-use-tf'],
    },
    {
      kind: 'recap',
      items: [
        t('Mutex lock: acquire() / release(), atomic, busy waits → spinlock.', 'الـ Mutex lock: acquire() / release()، atomic، وبيعمل busy wait ← spinlock.'),
        t('Semaphore S: wait() (P) and signal() (V), atomic; counting or binary (= mutex).', 'الـ Semaphore S: wait() (P) وsignal() (V)، atomic؛ counting أو binary (= mutex).'),
        t('Ordering: signal(synch) after S1, wait(synch) before S2, synch = 0.', 'الترتيب: signal(synch) بعد S1، وwait(synch) قبل S2، والـ synch = 0.'),
        t('No busy waiting: waiting queue, block() in wait, wakeup() in signal.', 'من غير busy waiting: waiting queue، وblock() في الـ wait، وwakeup() في الـ signal.'),
        t('Deadlock (wait forever for each other) · starvation (indefinite blocking) · priority inversion.', 'Deadlock (كل واحدة مستنية التانية للأبد) · starvation (blocking للأبد) · priority inversion.'),
        t('signal…wait → many inside; wait…wait → deadlock.', 'signal…wait ← كتير جوه؛ wait…wait ← deadlock.'),
      ],
    },
  ],
  examFocus: [
    t('Busy waiting wastes CPU cycles; a semaphore with a waiting queue avoids it.', 'الـ busy waiting بيضيّع CPU cycles؛ والـ semaphore بالـ waiting queue بيتجنّبه.'),
    t('signal(mutex) … wait(mutex): several processes may be in their critical sections. wait … wait: deadlock.', 'signal(mutex) … wait(mutex): كذا process ممكن يبقوا في الـ critical section. wait … wait: deadlock.'),
    t('Incorrect use of semaphore operations can lead to deadlock and starvation.', 'الاستخدام الغلط لعمليات الـ semaphore ممكن يعمل deadlock وstarvation.'),
  ],
  keyTerms: [
    { term: 'Mutex lock', definition: t('Boolean lock taken with acquire() and released with release().', 'Lock من نوع boolean بيتاخد بـ acquire() ويتساب بـ release().') },
    { term: 'Spinlock', definition: t('A lock whose waiting processes busy-wait.', 'Lock الـ processes المستنية عليه بتعمل busy wait.') },
    { term: 'Semaphore', definition: t('Integer accessed only through atomic wait() and signal().', 'رقم مبيتوصلّوش غير بـ wait() وsignal() الـ atomic.') },
    { term: 'Binary semaphore', definition: t('Semaphore whose value is only 0 or 1 — a mutex lock.', 'Semaphore قيمته 0 أو 1 بس — يعني mutex lock.') },
    { term: 'block / wakeup', definition: t('Put the caller on the waiting queue / move one waiting process to the ready queue.', 'حط اللي بينادي في الـ waiting queue / انقل process مستنية للـ ready queue.') },
    { term: 'Deadlock', definition: t('Processes waiting indefinitely for an event only one of them can cause.', 'Processes بتستنى للأبد حدث مفيش غير واحدة منهم تقدر تعمله.') },
    { term: 'Starvation', definition: t('Indefinite blocking in a semaphore queue.', 'Blocking للأبد في الـ semaphore queue.') },
  ],
}
