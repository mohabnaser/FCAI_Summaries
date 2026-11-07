import type { Section } from '../../../types'
import { part, t } from '../../sections/helpers'

/** Bounded buffer, readers–writers (and its variations), dining philosophers. */
export const classic: Section = {
  id: 'c5-classic',
  chapterId: 'chapter-5',
  order: 4,
  kicker: 'Lesson 04',
  title: 'Classic Problems of Synchronization',
  shortTitle: 'Classic Problems',
  summary: t(
    'The three problems used to test any new synchronization scheme, each solved with semaphores: the bounded buffer (mutex, full, empty), readers and writers (rw_mutex, mutex, read_count) and the dining philosophers (chopstick[5]) — and the deadlock hiding in the last one.',
    'التلات مشاكل اللي بيتختبر بيها أي أسلوب synchronization جديد، وكل واحدة متحلولة بالـ semaphores: الـ bounded buffer (mutex وfull وempty)، والـ readers والـ writers (rw_mutex وmutex وread_count)، والـ dining philosophers (chopstick[5]) — والـ deadlock اللي مستخبي في الأخيرة.',
  ),
  objectives: [
    t('Give the initial values of mutex, full and empty and trace producer and consumer.', 'تدّي القيم الأولى لـ mutex وfull وempty وتتابع الـ producer والـ consumer.'),
    t('Write the reader and writer code and explain the roles of rw_mutex, mutex and read_count.', 'تكتب كود الـ reader والـ writer وتشرح دور rw_mutex وmutex وread_count.'),
    t('Explain where readers and writers block, the two variations and why writers may starve.', 'تشرح الـ readers والـ writers بيتعطّلوا فين، والنسختين، وليه الـ writers ممكن يتجوّعوا.'),
    t('Show the deadlock in the dining-philosophers algorithm.', 'توضّح الـ deadlock في خوارزمية الـ dining philosophers.'),
  ],
  estimatedMinutes: 20,
  quizId: 'quiz-c5-classic',
  blocks: [
    {
      kind: 'lead',
      text: t(
        'Three classical problems are used to test newly proposed synchronization schemes: the **bounded-buffer** problem, the **readers and writers** problem and the **dining-philosophers** problem.',
        'فيه تلات مشاكل كلاسيكية بيتختبر بيها أي أسلوب synchronization جديد: مشكلة الـ **bounded buffer**، ومشكلة الـ **readers and writers**، ومشكلة الـ **dining philosophers**.',
      ),
    },

    part(t('Bounded-buffer problem', 'مشكلة الـ Bounded buffer'), t('n buffers, each holding one item.', 'n خانات، كل خانة بتشيل عنصر واحد.')),
    {
      kind: 'stats',
      items: [
        { value: 'mutex = 1', label: t('Protects the buffer: one process inside at a time', 'بيحمي الـ buffer: process واحدة جوه في المرة'), tone: 'violet', icon: 'lock' },
        { value: 'full = 0', label: t('Counts full buffers — none at the start', 'بيعدّ الخانات المليانة — ولا واحدة في الأول'), tone: 'teal', icon: 'archive' },
        { value: 'empty = n', label: t('Counts empty buffers — all n at the start', 'بيعدّ الخانات الفاضية — الـ n كلهم في الأول'), tone: 'amber', icon: 'inbox' },
      ],
    },
    {
      kind: 'code',
      title: 'Producer and consumer with semaphores',
      language: 'c',
      code: `/* Producer */
do {
    /* produce an item in next_produced */
    wait(empty);       /* wait for a free slot     */
    wait(mutex);       /* lock the buffer          */
    /* add next_produced to the buffer */
    signal(mutex);     /* unlock the buffer        */
    signal(full);      /* one more full slot       */
} while (true);

/* Consumer */
do {
    wait(full);        /* wait for a full slot     */
    wait(mutex);
    /* remove an item from buffer to next_consumed */
    signal(mutex);
    signal(empty);     /* one more free slot       */
    /* consume the item in next_consumed */
} while (true);`,
      caption: t(
        'The two **counting** semaphores do the waiting (empty for the producer, full for the consumer); the **binary** mutex only protects the buffer while it is changed.',
        'الـ semaphores الـ **counting** الاتنين هما اللي بيعملوا الانتظار (empty للـ producer وfull للـ consumer)؛ والـ mutex الـ **binary** بيحمي الـ buffer بس وهو بيتغيّر.',
      ),
    },

    part(t('Readers–writers problem', 'مشكلة الـ Readers–writers'), t('A data set shared among concurrent processes.', 'Data set مشتركة بين processes شغالة مع بعض.')),
    {
      kind: 'versus',
      left: { title: 'Readers', icon: 'book', tone: 'teal', tagline: t('Only read; no updates', 'بيقروا بس؛ من غير تعديل') },
      right: { title: 'Writers', icon: 'file', tone: 'rose', tagline: t('Can both read and write', 'بيقروا ويكتبوا') },
      rows: [
        { aspect: 'At the same time', left: t('**Many readers** may read at once', '**كذا reader** ممكن يقروا مع بعض'), right: t('**Only one writer**, and no readers', '**writer واحد بس**، ومن غير readers') },
        { aspect: 'Uses', left: t('mutex (to update read_count) and rw_mutex (first/last reader)', 'mutex (عشان يحدّث read_count) وrw_mutex (أول/آخر reader)'), right: t('rw_mutex only', 'rw_mutex بس') },
      ],
      verdict: t(
        'Shared data: the data set · semaphore **rw_mutex = 1** · semaphore **mutex = 1** · integer **read_count = 0**.',
        'الداتا المشتركة: الـ data set · semaphore **rw_mutex = 1** · semaphore **mutex = 1** · integer **read_count = 0**.',
      ),
    },
    {
      kind: 'code',
      title: 'Writer and reader processes',
      language: 'c',
      code: `/* Writer */
do {
    wait(rw_mutex);
    /* writing is performed */
    signal(rw_mutex);
} while (true);

/* Reader */
do {
    wait(mutex);
    read_count++;
    if (read_count == 1)
        wait(rw_mutex);     /* first reader locks writers out */
    signal(mutex);

    /* reading is performed */

    wait(mutex);
    read_count--;
    if (read_count == 0)
        signal(rw_mutex);   /* last reader lets writers in */
    signal(mutex);
} while (true);`,
      caption: t(
        'Readers hold rw_mutex **as a group**: the first one takes it, the last one gives it back. mutex only guards read_count.',
        'الـ readers ماسكين rw_mutex **كمجموعة**: أول واحد بياخده، وآخر واحد بيرجّعه. والـ mutex بيحمي read_count بس.',
      ),
    },
    {
      kind: 'visual',
      id: 'readers-writers',
      title: t('Readers–writers simulator', 'محاكي الـ Readers–writers'),
      caption: t(
        'Let readers and writers arrive and leave, and see exactly which semaphore each one is blocked on — the midterm’s “three readers arrive while a writer writes” and “a writer arrives while readers read” cases are one click away.',
        'خلّي readers وwriters ييجوا ويمشوا، وشوف كل واحد متعطّل على أنهي semaphore بالظبط — حالات الـ midterm “تلات readers جم والـ writer بيكتب” و“writer جه والـ readers بيقروا” على بعد ضغطة.',
      ),
    },
    {
      kind: 'cards',
      columns: 2,
      intro: t('Several variations exist — all involve **priorities**:', 'فيه نسخ كتير — وكلها فيها **أولويات**:'),
      items: [
        { icon: 'book', tag: 'readers first', title: 'First variation', body: t('**No reader is kept waiting unless a writer already has permission** to use the shared object. Writers may starve.', '**مفيش reader بيستنى إلا لو writer واخد الإذن فعلًا** يستخدم الداتا. والـ writers ممكن يتجوّعوا.'), tone: 'teal' },
        { icon: 'file', tag: 'writers first', title: 'Second variation', body: t('**Once a writer is ready, it performs its write ASAP.** Readers may starve.', '**أول ما الـ writer يبقى جاهز، بيكتب بأسرع وقت.** والـ readers ممكن يتجوّعوا.'), tone: 'rose' },
      ],
    },
    {
      kind: 'callout',
      tone: 'insight',
      title: t('Starvation and reader–writer locks', 'الـ Starvation والـ reader–writer locks'),
      body: t(
        'Both variations may have starvation, which leads to even more variations. Some systems solve the problem with **reader–writer locks** provided by the kernel.',
        'النسختين ممكن يحصل فيهم starvation، وده بيودّي لنسخ أكتر. وبعض الأنظمة بتحل المشكلة بـ **reader–writer locks** بيوفّرها الـ kernel.',
      ),
    },

    part(t('Dining-philosophers problem', 'مشكلة الـ Dining philosophers'), t('Five philosophers, five chopsticks, one bowl of rice.', 'خمس فلاسفة، وخمس chopsticks، وطبق رز واحد.')),
    {
      kind: 'lead',
      text: t(
        'Philosophers spend their lives **thinking and eating**. They do not interact with their neighbours, but occasionally try to pick up **2 chopsticks (one at a time)** to eat; they need both, and release both when done. Shared data: the bowl of rice (the data set) and **semaphore chopstick[5]**, each initialized to 1.',
        'الفلاسفة بيقضّوا حياتهم **يفكروا وياكلوا**. مش بيتعاملوا مع جيرانهم، بس كل شوية بيحاولوا يمسكوا **2 chopsticks (واحدة واحدة)** عشان ياكلوا؛ محتاجين الاتنين، وبيسيبوهم الاتنين لما يخلصوا. الداتا المشتركة: طبق الرز (الـ data set) و**semaphore chopstick[5]**، كل واحد قيمته الأولى 1.',
      ),
    },
    {
      kind: 'code',
      title: 'Philosopher i',
      language: 'c',
      code: `do {
    wait(chopstick[i]);             /* left  */
    wait(chopstick[(i + 1) % 5]);   /* right */

    /* eat */

    signal(chopstick[i]);
    signal(chopstick[(i + 1) % 5]);

    /* think */
} while (TRUE);`,
    },
    {
      kind: 'visual',
      id: 'dining-philosophers',
      title: t('What is the problem with this algorithm?', 'إيه المشكلة في الخوارزمية دي؟'),
      caption: t(
        'Let philosophers pick up chopsticks one at a time. If all five take their left chopstick together, each waits forever for the right one — **deadlock**.',
        'خلّي الفلاسفة يمسكوا الـ chopsticks واحدة واحدة. لو الخمسة مسكوا الشمال مع بعض، كل واحد هيستنى اليمين للأبد — **deadlock**.',
      ),
    },
    {
      kind: 'confusions',
      items: [
        {
          wrong: t('“The producer–consumer problem uses one semaphore to count items.”', '“مشكلة الـ producer–consumer بتستخدم semaphore واحد يعدّ العناصر.”'),
          right: t('Two counting semaphores — **empty** and **full** — plus mutex for the buffer.', 'اتنين counting semaphores — **empty** و**full** — ومعاهم mutex للـ buffer.'),
        },
        {
          wrong: t('“Every reader waits on rw_mutex.”', '“كل reader بيعمل wait على rw_mutex.”'),
          right: t('Only the **first** reader waits on rw_mutex and only the **last** signals it.', 'الـ reader **الأول** بس هو اللي بيعمل wait على rw_mutex، والـ **أخير** بس هو اللي بيعمل signal.'),
        },
        {
          wrong: t('“The first variation gives writers priority.”', '“النسخة الأولى بتدّي الأولوية للـ writers.”'),
          right: t('First variation = **readers** first; second = writers ASAP.', 'النسخة الأولى = الـ **readers** الأول؛ والتانية = الـ writers بأسرع وقت.'),
        },
      ],
    },
    {
      kind: 'exam',
      title: t('Exam radar: readers–writers is a full midterm question', 'رادار الامتحان: الـ readers–writers سؤال midterm كامل'),
      body: t(
        'Seven items. The producer–consumer MCQ (count **empty** and **full**), the first-variation MCQ (readers first), the four parts of the Midterm 2022 readers–writers question (initial values, where three new readers block, what a new writer does, writer starvation) and a written question on semaphores without busy waiting plus readers–writers.',
        'سبع أسئلة. MCQ الـ producer–consumer (عدّ **empty** و**full**)، وMCQ النسخة الأولى (الـ readers الأول)، والأربع أجزاء بتوع سؤال الـ readers–writers في Midterm 2022 (القيم الأولى، وتلات readers جداد بيتعطّلوا فين، والـ writer الجديد بيعمل إيه، وتجويع الـ writer)، وسؤال مكتوب عن الـ semaphores من غير busy waiting مع الـ readers–writers.',
      ),
      refs: [
        'c5-producer-consumer-semaphores',
        'c5-readers-writers-first',
        'c5-rw-initial-values',
        'c5-rw-readers-blocked',
        'c5-rw-new-writer',
        'c5-rw-writer-starvation',
        'c5-semaphore-queue-rw-essay',
      ],
    },
    {
      kind: 'recap',
      items: [
        t('Bounded buffer: mutex = 1, full = 0, empty = n.', 'الـ Bounded buffer: mutex = 1 وfull = 0 وempty = n.'),
        t('Producer: wait(empty), wait(mutex) … signal(mutex), signal(full). Consumer: the mirror image.', 'الـ Producer: wait(empty) وwait(mutex) … signal(mutex) وsignal(full). والـ Consumer: العكس.'),
        t('Readers–writers: rw_mutex = 1, mutex = 1, read_count = 0; many readers or one writer.', 'الـ Readers–writers: rw_mutex = 1 وmutex = 1 وread_count = 0؛ كذا reader أو writer واحد.'),
        t('First reader waits on rw_mutex; last reader signals it.', 'أول reader بيعمل wait على rw_mutex؛ وآخر reader بيعمل signal.'),
        t('First variation: readers first (writers may starve). Second: writers ASAP.', 'النسخة الأولى: الـ readers الأول (الـ writers ممكن يتجوّعوا). التانية: الـ writers بأسرع وقت.'),
        t('Dining philosophers: chopstick[5] = 1; all grab left → deadlock.', 'الـ Dining philosophers: chopstick[5] = 1؛ الكل يمسك الشمال ← deadlock.'),
      ],
    },
  ],
  examFocus: [
    t('Producer–consumer: two counting semaphores (empty, full) and a mutex.', 'الـ Producer–consumer: اتنين counting semaphores (empty وfull) ومعاهم mutex.'),
    t('Readers–writers: readCount = 0, mutex = 1, writeBlock (rw_mutex) = 1.', 'الـ Readers–writers: readCount = 0 وmutex = 1 وwriteBlock (rw_mutex) = 1.'),
    t('In the first variation readers have priority and writers may starve.', 'في النسخة الأولى الأولوية للـ readers والـ writers ممكن يتجوّعوا.'),
  ],
  keyTerms: [
    { term: 'empty / full', definition: t('Counting semaphores for free and used buffers (start at n and 0).', 'Counting semaphores للخانات الفاضية والمليانة (بيبدأوا بـ n و0).') },
    { term: 'rw_mutex', definition: t('Gives exclusive access to a writer or to the readers as a group.', 'بيدّي وصول حصري لـ writer أو للـ readers كمجموعة.') },
    { term: 'read_count', definition: t('Number of processes currently reading; protected by mutex.', 'عدد الـ processes اللي بتقرا دلوقتي؛ والـ mutex بيحميه.') },
    { term: 'Reader–writer lock', definition: t('Kernel-provided lock that solves the readers–writers problem.', 'Lock بيوفّره الـ kernel وبيحل مشكلة الـ readers–writers.') },
    { term: 'chopstick[5]', definition: t('Five semaphores, each initialized to 1, one per chopstick.', 'خمس semaphores، كل واحد قيمته الأولى 1، واحد لكل chopstick.') },
  ],
}
