import type { Section } from '../../../types'
import { part, t } from '../../sections/helpers'

/** Background, the race condition, the critical-section structure and its three requirements. */
export const criticalSection: Section = {
  id: 'c5-critical-section',
  chapterId: 'chapter-5',
  order: 1,
  kicker: 'Lesson 01',
  title: 'Race Conditions & the Critical-Section Problem',
  shortTitle: 'Critical Section',
  summary: t(
    'Why concurrent access to shared data goes wrong, how counter++ and counter-- race, and the critical-section problem: entry, critical, exit and remainder sections, plus the three requirements every solution must meet.',
    'ليه الوصول المتزامن للداتا المشتركة بيبوّظها، وإزاي counter++ وcounter-- بيتسابقوا، ومشكلة الـ critical section: الـ entry والـ critical والـ exit والـ remainder sections، والتلات شروط اللي أي حل لازم يحققها.',
  ),
  objectives: [
    t('Explain why concurrent access can make shared data inconsistent.', 'تشرح ليه الوصول المتزامن ممكن يخلّي الداتا المشتركة inconsistent.'),
    t('Trace the counter++ / counter-- interleaving that produces a race condition.', 'تتابع تداخل counter++ وcounter-- اللي بيعمل race condition.'),
    t('Name the four sections of a process’s structure.', 'تذكر الأربع أجزاء في هيكل الـ process.'),
    t('State mutual exclusion, progress and bounded waiting precisely.', 'تقول تعريف الـ mutual exclusion والـ progress والـ bounded waiting بدقة.'),
  ],
  estimatedMinutes: 15,
  quizId: 'quiz-c5-critical-section',
  blocks: [
    {
      kind: 'lead',
      text: t(
        'Processes can execute **concurrently** and may be interrupted at any time, partially executed. **Concurrent access to shared data may result in data inconsistency**, so maintaining consistency requires mechanisms that ensure the **orderly execution of cooperating processes**.',
        'الـ processes ممكن تشتغل **في نفس الوقت (concurrently)** وممكن تتقطع في أي لحظة وهي لسه مخلصتش. و**الوصول المتزامن للداتا المشتركة ممكن يعمل data inconsistency**، فعشان نحافظ على الـ consistency محتاجين آليات تضمن **إن الـ cooperating processes تشتغل بترتيب**.',
      ),
    },

    part(t('The shared counter', 'الـ counter المشترك'), t('Filling all the buffers of the producer–consumer problem.', 'إزاي نملا كل خانات الـ buffer في مشكلة الـ producer–consumer.')),
    {
      kind: 'cards',
      columns: 3,
      items: [
        { icon: 'plus', tag: 'producer', title: 'counter++', body: t('After it **produces** a new buffer.', 'بعد ما **يطلّع** buffer جديد.'), tone: 'cyan' },
        { icon: 'database', tag: 'shared', title: 'int counter = 0', body: t('Keeps track of the number of **full buffers**.', 'بيعدّ الخانات **المليانة**.'), tone: 'amber' },
        { icon: 'x', tag: 'consumer', title: 'counter--', body: t('After it **consumes** a buffer.', 'بعد ما **يستهلك** buffer.'), tone: 'rose' },
      ],
    },
    {
      kind: 'code',
      title: 'Producer and consumer sharing counter',
      language: 'c',
      code: `/* Producer */
while (true) {
    /* produce an item in next_produced */
    while (counter == BUFFER_SIZE)
        ;   /* do nothing */
    buffer[in] = next_produced;
    in = (in + 1) % BUFFER_SIZE;
    counter++;
}

/* Consumer */
while (true) {
    while (counter == 0)
        ;   /* do nothing */
    next_consumed = buffer[out];
    out = (out + 1) % BUFFER_SIZE;
    counter--;
    /* consume the item in next_consumed */
}`,
      caption: t(
        'Unlike the earlier version, this one fills **all** BUFFER_SIZE slots — but counter is now shared by both processes.',
        'على عكس النسخة اللي فاتت، النسخة دي بتملا **كل** الـ BUFFER_SIZE خانات — بس الـ counter بقى مشترك بين الـ processes الاتنين.',
      ),
    },

    part(t('Race condition', 'الـ Race condition'), t('One line of C is three machine steps.', 'سطر C واحد = تلات خطوات في الماكينة.')),
    {
      kind: 'versus',
      left: { title: 'counter++', icon: 'plus', tone: 'cyan', tagline: t('Producer, using register1', 'الـ Producer، بـ register1') },
      right: { title: 'counter--', icon: 'x', tone: 'rose', tagline: t('Consumer, using register2', 'الـ Consumer، بـ register2') },
      rows: [
        { aspect: 'load', left: t('`register1 = counter`', '`register1 = counter`'), right: t('`register2 = counter`', '`register2 = counter`') },
        { aspect: 'change', left: t('`register1 = register1 + 1`', '`register1 = register1 + 1`'), right: t('`register2 = register2 - 1`', '`register2 = register2 - 1`') },
        { aspect: 'store', left: t('`counter = register1`', '`counter = register1`'), right: t('`counter = register2`', '`counter = register2`') },
      ],
      verdict: t(
        'If the processor switches between these steps, the two updates overwrite each other.',
        'لو الـ processor بدّل بين الخطوات دي، التعديلين بيمسحوا بعض.',
      ),
    },
    {
      kind: 'visual',
      id: 'race-condition',
      title: t('Watch counter = 5 become 4', 'شوف counter = 5 بيبقى 4 إزاي'),
      caption: t(
        'Step through the interleaving S0–S5, then run the same steps in order and compare. The outcome depends on the order of access — that is a race condition.',
        'امشي في التداخل من S0 لـ S5، وبعدين شغّل نفس الخطوات بالترتيب وقارن. النتيجة بتعتمد على ترتيب الوصول — وده الـ race condition.',
      ),
    },

    part(t('The critical-section problem', 'مشكلة الـ Critical section'), t('n processes {p0, p1, … pn-1}, each with a critical section.', 'n processes {p0, p1, … pn-1}، كل واحدة ليها critical section.')),
    {
      kind: 'layers',
      title: t('General structure of process Pi', 'الهيكل العام للـ process Pi'),
      caption: t(
        'The **critical section** is the code segment where the process changes common variables, updates a table, writes a file, etc. When one process is in its critical section, **no other may be in its critical section**. The problem: design a protocol the processes use to cooperate.',
        'الـ **critical section** هو جزء الكود اللي الـ process بتغيّر فيه common variables أو تحدّث جدول أو تكتب file، إلخ. ولما process تبقى في الـ critical section بتاعها، **مفيش process تانية تدخل الـ critical section بتاعتها**. والمشكلة: نصمّم protocol الـ processes تتعاون بيه.',
      ),
      layers: [
        { label: 'do {', tone: 'violet' },
        { label: 'entry section', icon: 'lock', tone: 'amber', detail: t('**Ask permission** to enter.', '**اطلب الإذن** إنك تدخل.') },
        { label: 'critical section', icon: 'alert', tone: 'rose', detail: t('Touch the shared data.', 'اتعامل مع الداتا المشتركة.') },
        { label: 'exit section', icon: 'key', tone: 'teal', detail: t('Announce that you have left.', 'أعلن إنك خرجت.') },
        { label: 'remainder section', icon: 'refresh', tone: 'cyan', detail: t('Everything else.', 'باقي الكود.') },
        { label: '} while (true);', tone: 'violet' },
      ],
    },
    {
      kind: 'cards',
      columns: 3,
      intro: t('A solution must satisfy **all three** requirements:', 'الحل لازم يحقق **التلاتة**:'),
      items: [
        {
          icon: 'lock',
          tag: '1',
          title: 'Mutual exclusion',
          body: t('If process Pi is executing in its critical section, **no other process** can be executing in its critical section.', 'لو الـ process Pi بتنفّذ الـ critical section بتاعها، **مفيش أي process تانية** تقدر تنفّذ الـ critical section بتاعتها.'),
          tone: 'rose',
        },
        {
          icon: 'play',
          tag: '2',
          title: 'Progress',
          body: t('If **no process** is in its critical section and some wish to enter, the selection of who enters next **cannot be postponed indefinitely**.', 'لو **مفيش ولا process** في الـ critical section وفيه processes عايزة تدخل، اختيار مين يدخل بعد كده **ميتأجلش للأبد**.'),
          tone: 'teal',
        },
        {
          icon: 'hourglass',
          tag: '3',
          title: 'Bounded waiting',
          body: t('After a process requests entry, there is a **bound on how many times others may enter** before its request is granted.', 'بعد ما process تطلب تدخل، فيه **حد أقصى لعدد المرات اللي غيرها يدخلوا فيها** قبل ما طلبها يتقبل.'),
          tone: 'amber',
        },
      ],
    },
    {
      kind: 'callout',
      tone: 'insight',
      title: t('Two assumptions', 'افتراضين'),
      body: t(
        'Each process executes at a **nonzero speed**, and there is **no assumption about the relative speed** of the n processes.',
        'كل process بتشتغل بـ **سرعة مش صفر**، و**مفيش أي افتراض عن السرعة النسبية** للـ n processes.',
      ),
    },
    {
      kind: 'hook',
      title: t('The three requirements', 'التلات شروط'),
      phrase: 'My Program Behaves.',
      letters: [
        { letter: 'M', word: 'Mutual exclusion — one at a time' },
        { letter: 'P', word: 'Progress — no endless postponing' },
        { letter: 'B', word: 'Bounded waiting — a limit on overtaking' },
      ],
    },
    {
      kind: 'confusions',
      items: [
        {
          wrong: t('“A solution only needs bounded waiting.”', '“الحل محتاج bounded waiting بس.”'),
          right: t('It needs **all three**: mutual exclusion, progress and bounded waiting.', 'محتاج **التلاتة**: mutual exclusion وprogress وbounded waiting.'),
        },
        {
          wrong: t('“Priority inversion is a critical-section requirement.”', '“الـ Priority inversion شرط من شروط الـ critical section.”'),
          right: t('It is a **scheduling problem** (a low-priority process holds a lock a high-priority one needs).', 'دي **مشكلة scheduling** (process أولويتها قليلة ماسكة lock محتاجاه process أولويتها أعلى).'),
        },
        {
          wrong: t('“Permission is asked in the exit section.”', '“الإذن بيتطلب في الـ exit section.”'),
          right: t('Permission is asked in the **entry** section; the exit section releases.', 'الإذن بيتطلب في الـ **entry** section؛ والـ exit section بيسيب.'),
        },
      ],
    },
    {
      kind: 'exam',
      title: t('Exam radar: definitions, word for word', 'رادار الامتحان: التعريفات بالحرف'),
      body: t(
        'Seven items. Two ask what concurrent access causes (a T/F and a fill-in: **data inconsistency**), one names the **race condition**, one the **mutual exclusion** definition, one the entry section, one says “only bounded waiting” (false), and one asks which option is **not** a requirement (priority inversion).',
        'سبع أسئلة. اتنين بيسألوا الوصول المتزامن بيعمل إيه (T/F وfill-in: **data inconsistency**)، وواحد اسمه **race condition**، وواحد تعريف الـ **mutual exclusion**، وواحد عن الـ entry section، وواحد بيقول “only bounded waiting” (غلط)، وواحد بيسأل أنهي اختيار **مش** شرط (priority inversion).',
      ),
      refs: [
        'c5-race-condition',
        'c5-concurrent-access-tf',
        'c5-concurrent-access-fill',
        'c5-entry-section-tf',
        'c5-only-bounded-waiting-tf',
        'c5-mutual-exclusion',
        'c5-not-a-requirement',
      ],
    },
    {
      kind: 'recap',
      items: [
        t('Concurrent access to shared data → data inconsistency.', 'الوصول المتزامن للداتا المشتركة ← data inconsistency.'),
        t('counter++ / counter-- are 3 steps each; interleaving gives 4 or 6 instead of 5.', 'الـ counter++ والـ counter-- كل واحدة 3 خطوات؛ والتداخل بيدّي 4 أو 6 بدل 5.'),
        t('Race condition: the outcome depends on the order of access.', 'الـ Race condition: النتيجة بتعتمد على ترتيب الوصول.'),
        t('Structure: entry → critical → exit → remainder.', 'الهيكل: entry ← critical ← exit ← remainder.'),
        t('Requirements: mutual exclusion, progress, bounded waiting.', 'الشروط: mutual exclusion وprogress وbounded waiting.'),
        t('Assume nonzero speed; nothing about relative speed.', 'افترض سرعة مش صفر؛ ومفيش افتراض عن السرعة النسبية.'),
      ],
    },
  ],
  examFocus: [
    t('Concurrent access to shared data may result in data inconsistency — a race condition.', 'الوصول المتزامن للداتا المشتركة ممكن يعمل data inconsistency — race condition.'),
    t('Each process asks permission in the entry section.', 'كل process بتطلب الإذن في الـ entry section.'),
    t('A solution needs mutual exclusion, progress and bounded waiting — not just one of them.', 'الحل محتاج mutual exclusion وprogress وbounded waiting — مش واحد بس منهم.'),
  ],
  keyTerms: [
    { term: 'Race condition', definition: t('Several processes access shared data concurrently and the result depends on the order of access.', 'كذا process بيوصلوا لداتا مشتركة في نفس الوقت والنتيجة بتعتمد على ترتيب الوصول.') },
    { term: 'Critical section', definition: t('Code where a process changes shared variables, tables or files.', 'الكود اللي الـ process بتغيّر فيه shared variables أو جداول أو files.') },
    { term: 'Entry section', definition: t('Code that asks permission to enter the critical section.', 'الكود اللي بيطلب الإذن عشان يدخل الـ critical section.') },
    { term: 'Mutual exclusion', definition: t('At most one process in its critical section at a time.', 'process واحدة بالكتير في الـ critical section في نفس الوقت.') },
    { term: 'Progress', definition: t('If none is inside and some want in, the choice cannot be postponed indefinitely.', 'لو مفيش حد جوه وفيه حد عايز يدخل، الاختيار ميتأجلش للأبد.') },
    { term: 'Bounded waiting', definition: t('A limit on how many times others enter before a waiting request is granted.', 'حد أقصى لعدد مرات دخول غيرك قبل ما طلبك يتقبل.') },
  ],
}
