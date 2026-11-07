import type { Section } from '../../../types'
import { part, t } from '../../sections/helpers'

/** Slides 25–39: cooperating processes, shared memory (bounded buffer) and message passing. */
export const ipc: Section = {
  id: 'c3-ipc',
  chapterId: 'chapter-3',
  order: 4,
  kicker: 'Lesson 04',
  title: 'Interprocess Communication',
  shortTitle: 'IPC',
  summary: t(
    'Why processes cooperate, the two IPC models, the bounded-buffer producer–consumer solution with shared memory, and message passing in full: direct and indirect naming, mailboxes, blocking and non-blocking operations, and the three buffering capacities.',
    'ليه الـ processes بتتعاون، وموديلين الـ IPC، وحل الـ producer–consumer بالـ bounded buffer والـ shared memory، والـ message passing بالكامل: الـ direct والـ indirect، والـ mailboxes، والـ blocking والـ non-blocking، وتلات أنواع الـ buffering.',
  ),
  objectives: [
    t('Give the four reasons for cooperating processes and the two IPC models.', 'تذكر الأربع أسباب لتعاون الـ processes وموديلين الـ IPC.'),
    t('Trace the bounded-buffer producer and consumer and explain why only BUFFER_SIZE − 1 slots are used.', 'تتابع الـ producer والـ consumer في الـ bounded buffer وتشرح ليه بنستخدم BUFFER_SIZE − 1 بس.'),
    t('Contrast direct and indirect communication, including mailbox operations and sharing.', 'تقارن الـ direct بالـ indirect، ومعاهم عمليات الـ mailbox والمشاركة فيه.'),
    t('Explain blocking vs non-blocking, rendezvous, and zero/bounded/unbounded buffering.', 'تشرح الـ blocking والـ non-blocking والـ rendezvous، والـ buffering الـ zero والـ bounded والـ unbounded.'),
  ],
  estimatedMinutes: 20,
  quizId: 'quiz-c3-ipc',
  crossRefQuestionIds: [
    'c2-ipc-models-mcq',
    'c2-ipc-models-fill',
    'c2-ipc-operations-2024',
    'c2-ipc-operations-2020',
    'c2-ipc-models-direct-short',
  ],
  blocks: [
    {
      kind: 'lead',
      text: t(
        'Processes are either **independent** or **cooperating**. A cooperating process can affect or be affected by other processes, including by sharing data — and cooperating processes need an **interprocess communication (IPC)** mechanism.',
        'الـ processes يا إما **independent** يا إما **cooperating**. الـ cooperating process ممكن تأثّر أو تتأثّر بـ processes تانية، ومن ضمنها مشاركة الداتا — والـ cooperating processes محتاجة آلية **interprocess communication (IPC)**.',
      ),
    },

    part(t('Why cooperate, and how', 'ليه يتعاونوا، وإزاي')),
    {
      kind: 'cards',
      columns: 4,
      items: [
        { icon: 'link', title: 'Information sharing', body: t('Several processes need the same data.', 'كذا process محتاجين نفس الداتا.'), tone: 'cyan' },
        { icon: 'zap', title: 'Computation speedup', body: t('Split a task into parts that run in parallel.', 'تقسّم المهمة لأجزاء تشتغل مع بعض.'), tone: 'amber' },
        { icon: 'puzzle', title: 'Modularity', body: t('Build a system from separate processes.', 'تبني النظام من processes منفصلة.'), tone: 'violet' },
        { icon: 'handshake', title: 'Convenience', body: t('A user works on many tasks at once.', 'المستخدم يشتغل على كذا حاجة في نفس الوقت.'), tone: 'teal' },
      ],
    },
    {
      kind: 'versus',
      title: t('Two models of IPC', 'موديلين الـ IPC'),
      left: { title: '(a) Message passing', icon: 'send', tone: 'rose', tagline: t('A message queue m0 … mn in the kernel', 'Message queue من m0 لـ mn في الـ kernel') },
      right: { title: '(b) Shared memory', icon: 'memory', tone: 'violet', tagline: t('A region both processes access', 'منطقة الاتنين بيوصلولها') },
      rows: [
        { aspect: 'How data moves', left: t('Process A sends; the **kernel** queues the message; process B receives', 'الـ A بتبعت؛ الـ **kernel** بيحط الرسالة في queue؛ والـ B بتستقبل'), right: t('A and B read and write the **shared region** directly', 'الـ A والـ B بيقروا ويكتبوا في **المنطقة المشتركة** على طول') },
        { aspect: 'Shared variables', left: t('None — communication **without resorting to shared variables**', 'مفيش — تواصل **من غير shared variables**'), right: t('Yes — the buffer itself is shared', 'أيوه — الـ buffer نفسه مشترك') },
      ],
    },

    part(t('Producer–consumer with shared memory', 'الـ Producer–consumer بالـ shared memory')),
    {
      kind: 'cards',
      columns: 2,
      intro: t(
        'The paradigm for cooperating processes: a **producer** produces information that a **consumer** consumes — a compiler produces assembly code for the assembler; a web server produces HTML files for the browser. To run them concurrently, use a **buffer** in shared memory, filled by the producer and emptied by the consumer.',
        'النموذج الأساسي للتعاون: **producer** بيطلّع معلومات و**consumer** بيستهلكها — الـ compiler بيطلّع assembly code للـ assembler؛ والـ web server بيطلّع HTML files للـ browser. وعشان يشتغلوا مع بعض، بنستخدم **buffer** في shared memory، الـ producer يملاه والـ consumer يفضّيه.',
      ),
      items: [
        { icon: 'trending', title: 'Unbounded buffer', body: t('Places **no practical limit** on the size of the buffer.', '**مفيش حد عملي** لحجم الـ buffer.'), tone: 'teal' },
        { icon: 'archive', title: 'Bounded buffer', body: t('Assumes a **fixed buffer size** — the case the lecture codes.', 'بيفترض **حجم ثابت** للـ buffer — ودي الحالة اللي المحاضرة كاتبة كودها.'), tone: 'amber' },
      ],
    },
    {
      kind: 'code',
      title: 'Bounded buffer — shared data, producer, consumer',
      language: 'c',
      code: `#define BUFFER_SIZE 10
typedef struct {
    . . .
} item;

item buffer[BUFFER_SIZE];
int in = 0;
int out = 0;

/* Producer */
item next_produced;
while (true) {
    /* produce an item in next_produced */
    while (((in + 1) % BUFFER_SIZE) == out)
        ;   /* do nothing -- no free buffers */
    buffer[in] = next_produced;
    in = (in + 1) % BUFFER_SIZE;
}

/* Consumer */
item next_consumed;
while (true) {
    while (in == out)
        ;   /* do nothing -- empty buffers */
    next_consumed = buffer[out];
    out = (out + 1) % BUFFER_SIZE;
    /* consume the item in next_consumed */
}`,
      caption: t(
        '`in` = next free slot, `out` = first full slot. Empty when **in == out**; full when **(in + 1) % BUFFER_SIZE == out**.',
        '`in` = الخانة الفاضية الجاية، `out` = أول خانة مليانة. فاضي لما **in == out**؛ ومليان لما **(in + 1) % BUFFER_SIZE == out**.',
      ),
    },
    {
      kind: 'visual',
      id: 'bounded-buffer',
      title: t('Run the circular buffer', 'شغّل الـ circular buffer'),
      caption: t(
        'Produce and consume and watch in and out chase each other. Try to fill all the slots — you can’t: the solution is correct, but uses only BUFFER_SIZE − 1 elements.',
        'اعمل produce وconsume وشوف in وout بيجروا ورا بعض. جرّب تملا كل الخانات — مش هتعرف: الحل صحيح، بس بيستخدم BUFFER_SIZE − 1 عنصر بس.',
      ),
    },
    {
      kind: 'callout',
      tone: 'insight',
      title: t('Why only BUFFER_SIZE − 1?', 'ليه BUFFER_SIZE − 1 بس؟'),
      body: t(
        'With only `in` and `out`, a completely full buffer would also give **in == out** — the same test as empty. So the producer stops one slot early, keeping full and empty distinguishable.',
        'بـ `in` و`out` بس، لو الـ buffer اتملى كله هيبقى **in == out** — نفس شرط الفاضي بالظبط. فالـ producer بيقف قبلها بخانة، عشان نفرّق بين المليان والفاضي.',
      ),
    },

    part(t('Message passing', 'الـ Message passing')),
    {
      kind: 'flow',
      title: t('Communicate and synchronize without shared variables', 'تواصل وتزامن من غير shared variables'),
      steps: [
        { icon: 'link', label: 'Establish a link', detail: t('If P and Q wish to communicate, a **communication link** must exist between them.', 'لو P وQ عايزين يتواصلوا، لازم يبقى فيه **communication link** بينهم.'), tone: 'violet' },
        { icon: 'send', label: 'send(message)', detail: t('Message size fixed or variable.', 'حجم الرسالة ثابت أو متغيّر.'), tone: 'cyan' },
        { icon: 'inbox', label: 'receive(message)', detail: t('The IPC facility provides at least these two operations.', 'الـ IPC facility بيوفّر العمليتين دول على الأقل.'), tone: 'teal' },
      ],
      caption: t(
        'Logical implementation of the link: **direct or indirect** · **synchronous or asynchronous** · **automatic or explicit buffering**. Design questions: how are links established? can a link serve more than two processes? how many links per pair? what is its capacity? fixed or variable message size? unidirectional or bidirectional?',
        'التنفيذ المنطقي للـ link: **direct أو indirect** · **synchronous أو asynchronous** · **automatic أو explicit buffering**. أسئلة التصميم: الـ links بتتعمل إزاي؟ الـ link ينفع لأكتر من اتنين processes؟ كام link بين كل اتنين؟ سعته قد إيه؟ حجم الرسالة ثابت ولا متغيّر؟ اتجاه واحد ولا اتجاهين؟',
      ),
    },
    {
      kind: 'versus',
      title: t('Direct vs indirect communication', 'الـ Direct مقابل الـ Indirect'),
      left: { title: 'Direct', icon: 'user', tone: 'cyan', tagline: t('Name the process', 'سمّي الـ process') },
      right: { title: 'Indirect', icon: 'inbox', tone: 'amber', tagline: t('Name the mailbox (port)', 'سمّي الـ mailbox (port)') },
      rows: [
        { aspect: 'Primitives', left: t('`send(P, message)` · `receive(Q, message)`', '`send(P, message)` · `receive(Q, message)`'), right: t('`send(A, message)` · `receive(A, message)` — A is a mailbox with a unique id', '`send(A, message)` · `receive(A, message)` — الـ A ده mailbox ليه id فريد') },
        { aspect: 'Link established', left: t('**Automatically**', '**Automatically**'), right: t('Only if the processes **share a common mailbox**', 'بس لو الـ processes **بيشاركوا mailbox واحد**') },
        { aspect: 'Processes per link', left: t('**Exactly one pair**', '**اتنين بالظبط**'), right: t('**Many** processes', 'processes **كتير**') },
        { aspect: 'Links per pair', left: t('**Exactly one**', '**واحد بالظبط**'), right: t('**Several** links', 'links **كتير**') },
        { aspect: 'Direction', left: t('May be unidirectional, **usually bidirectional**', 'ممكن اتجاه واحد، بس **غالبًا اتجاهين**'), right: t('Unidirectional or bidirectional', 'اتجاه واحد أو اتجاهين') },
      ],
    },
    {
      kind: 'cards',
      columns: 2,
      items: [
        {
          icon: 'inbox',
          tag: '',
          title: 'Mailbox operations',
          body: t('**Create** a new mailbox — created (and then owned) by a process or by the OS · **send and receive** through it — only the owner process can receive through its mailbox · **destroy** it (by the owner).', '**Create** mailbox جديد — بيعمله (ويمتلكه) process أو الـ OS · **send وreceive** من خلاله — الـ owner بس هو اللي يستقبل من الـ mailbox بتاعه · **destroy** (من الـ owner).'),
          tone: 'amber',
        },
        {
          icon: 'split',
          tag: '',
          title: 'Mailbox sharing: who gets the message?',
          body: t('P1, P2 and P3 share mailbox A (owned by the OS); P1 sends, P2 and P3 receive. Solutions: allow a link to be associated with **at most two processes** · allow **only one process at a time** to execute a receive · let the system **select the receiver arbitrarily** and notify the sender who it was.', 'P1 وP2 وP3 بيشاركوا mailbox A (الـ OS هو الـ owner)؛ P1 بيبعت، وP2 وP3 بيستقبلوا. الحلول: الـ link يرتبط بـ **اتنين processes بالكتير** · **process واحدة بس في المرة** تعمل receive · النظام **يختار الـ receiver عشوائي** ويقول للـ sender مين استقبل.'),
          tone: 'violet',
        },
      ],
    },

    part(t('Synchronization and buffering', 'الـ Synchronization والـ Buffering')),
    {
      kind: 'table',
      caption: t('Blocking is synchronous; non-blocking is asynchronous', 'الـ Blocking = synchronous؛ والـ non-blocking = asynchronous'),
      headers: ['', 'send', 'receive'],
      rows: [
        [t('Blocking (synchronous)'), t('Sender **blocks until the message is received**', 'الـ sender **بيتعطّل لحد ما الرسالة تتستلم**'), t('Receiver **blocks until a message is available**', 'الـ receiver **بيتعطّل لحد ما رسالة تبقى متاحة**')],
        [t('Non-blocking (asynchronous)'), t('Sender **sends and continues**', 'الـ sender **بيبعت ويكمّل**'), t('Receiver gets **a valid message or null**', 'الـ receiver بياخد **رسالة صحيحة أو null**')],
      ],
    },
    {
      kind: 'code',
      title: 'Rendezvous: producer–consumer becomes trivial',
      language: 'c',
      code: `/* Producer */
message next_produced;
while (true) {
    /* produce an item in next_produced */
    send(next_produced);
}

/* Consumer */
message next_consumed;
while (true) {
    receive(next_consumed);
    /* consume the item in next_consumed */
}`,
      caption: t(
        'If both send and receive are blocking, we have a **rendezvous** — no buffer bookkeeping is needed.',
        'لو الـ send والـ receive الاتنين blocking، يبقى عندنا **rendezvous** — ومش محتاجين نحسب أي حاجة في الـ buffer.',
      ),
    },
    {
      kind: 'visual',
      id: 'message-buffering',
      title: t('Buffering lab: when does the sender wait?', 'معمل الـ Buffering: الـ sender بيستنى إمتى؟'),
      caption: t(
        'Pick a capacity, send a few messages and receive some. Zero capacity forces a rendezvous; bounded waits only when full; unbounded never waits.',
        'اختار السعة، وابعت كام رسالة واستقبل شوية. الـ zero capacity بتفرض rendezvous؛ والـ bounded بيستنى لما تتملي بس؛ والـ unbounded عمره ما بيستنى.',
      ),
    },
    {
      kind: 'cards',
      columns: 3,
      intro: t('A **queue of messages** is attached to the link, implemented in one of three ways:', 'فيه **queue of messages** مربوطة بالـ link، بتتنفّذ بطريقة من التلاتة دول:'),
      items: [
        { icon: 'x', tag: '0 messages', title: 'Zero capacity', body: t('Sender **must wait for the receiver** (rendezvous). No buffering.', 'الـ sender **لازم يستنى الـ receiver** (rendezvous). مفيش buffering.'), tone: 'rose' },
        { icon: 'archive', tag: 'n messages', title: 'Bounded capacity', body: t('Finite length of n messages. Sender **must wait if the link is full**.', 'طول محدود n رسالة. الـ sender **لازم يستنى لو الـ link مليان**.'), tone: 'amber' },
        { icon: 'trending', tag: '∞ messages', title: 'Unbounded capacity', body: t('Infinite length. Sender **never waits**.', 'طول لا نهائي. الـ sender **عمره ما بيستنى**.'), tone: 'teal' },
      ],
    },
    {
      kind: 'hook',
      title: t('Buffering in one line', 'الـ Buffering في سطر واحد'),
      phrase: 'Zero waits always, bounded waits when full, unbounded never waits.',
    },
    {
      kind: 'confusions',
      items: [
        {
          wrong: t('“Direct communication uses mailboxes or ports.”', '“الـ direct communication بيستخدم mailboxes أو ports.”'),
          right: t('Mailboxes/ports are **indirect**. Direct names the process: send(P, …).', 'الـ mailboxes/ports دول **indirect**. الـ direct بيسمّي الـ process: send(P, …).'),
        },
        {
          wrong: t('“A zero-capacity queue holds one message.”', '“الـ zero-capacity queue بتشيل رسالة واحدة.”'),
          right: t('It holds **none**: the sender blocks until the receiver takes the message — a system **without buffering**.', 'مش بتشيل **ولا رسالة**: الـ sender بيتعطّل لحد ما الـ receiver ياخدها — نظام **من غير buffering**.'),
        },
        {
          wrong: t('“Blocking send + blocking receive is an asynchronous message.”', '“Blocking send + blocking receive = asynchronous message.”'),
          right: t('Blocking is synchronous, and the pair is called a **rendezvous**.', 'الـ Blocking هو الـ synchronous، والتركيبة اسمها **rendezvous**.'),
        },
      ],
    },
    {
      kind: 'exam',
      title: t('Exam radar: direct vs indirect and zero capacity', 'رادار الامتحان: الـ direct مقابل الـ indirect والـ zero capacity'),
      body: t(
        'Fourteen items. **Six** are about naming: a T/F that puts mailboxes in direct communication, the indirect-mailbox MCQ (in two papers), two direct-link MCQs with different options, a “link must exist” T/F, and a written direct-vs-indirect question. **Three** are about buffering and synchronization: zero capacity (three papers share one item), “without buffering”, and rendezvous. Five more — the two IPC models and the two operations (send and receive), plus the Midterm 2022 essay on models and naming — are implemented in Chapter 2 and included here.',
        'أربعتاشر سؤال. **ستة** عن التسمية: T/F بيحط الـ mailboxes في الـ direct، وMCQ الـ indirect mailbox (في امتحانين)، واتنين MCQ عن الـ direct link باختيارات مختلفة، وT/F “لازم يبقى فيه link”، وسؤال مكتوب direct مقابل indirect. **تلاتة** عن الـ buffering والـ synchronization: الـ zero capacity (تلات امتحانات بيشاركوا نفس السؤال)، و“without buffering”، والـ rendezvous. وخمسة كمان — موديلين الـ IPC والعمليتين (send وreceive)، ومعاهم مقال Midterm 2022 عن الموديلات والتسمية — متنفّذين في Chapter 2 ومعروضين هنا.',
      ),
      refs: [
        'c3-direct-mailbox-tf',
        'c3-link-must-exist-tf',
        'c3-indirect-mailbox',
        'c3-direct-link-2020',
        'c3-direct-link-2021',
        'c3-zero-capacity-blocks',
        'c3-zero-capacity-no-buffering',
        'c3-rendezvous',
        'c3-direct-indirect-essay',
        'c2-ipc-models-mcq',
        'c2-ipc-models-fill',
        'c2-ipc-operations-2024',
        'c2-ipc-operations-2020',
        'c2-ipc-models-direct-short',
      ],
    },
    {
      kind: 'recap',
      items: [
        t('Cooperate for: information sharing, computation speedup, modularity, convenience.', 'بيتعاونوا عشان: information sharing وcomputation speedup وmodularity وconvenience.'),
        t('Two IPC models: message passing and shared memory.', 'موديلين الـ IPC: message passing وshared memory.'),
        t('Bounded buffer: empty when in == out, full when (in+1) % SIZE == out → uses SIZE − 1 slots.', 'الـ Bounded buffer: فاضي لما in == out، ومليان لما (in+1) % SIZE == out ← بيستخدم SIZE − 1 خانة.'),
        t('Message passing: a link, then send(message) / receive(message).', 'الـ Message passing: link، وبعدين send(message) / receive(message).'),
        t('Direct: name the process, one pair, one link. Indirect: mailbox, many processes, several links.', 'الـ Direct: سمّي الـ process، اتنين، link واحد. الـ Indirect: mailbox، processes كتير، links كتير.'),
        t('Blocking = synchronous; both blocking = rendezvous. Zero / bounded / unbounded capacity.', 'الـ Blocking = synchronous؛ الاتنين blocking = rendezvous. والسعة: zero / bounded / unbounded.'),
      ],
    },
  ],
  examFocus: [
    t('Indirect communication uses mailboxes (ports); direct communication names the other process.', 'الـ indirect بيستخدم mailboxes (ports)؛ والـ direct بيسمّي الـ process التانية.'),
    t('A direct link is associated with exactly two processes, and each pair has exactly one link.', 'الـ direct link بيرتبط باتنين processes بالظبط، وكل اتنين ليهم link واحد بالظبط.'),
    t('Zero capacity: the sender blocks until the receiver receives — no buffering, a rendezvous.', 'الـ Zero capacity: الـ sender بيتعطّل لحد ما الـ receiver يستلم — من غير buffering، rendezvous.'),
  ],
  keyTerms: [
    { term: 'Cooperating process', definition: t('A process that can affect or be affected by other processes.', 'Process ممكن تأثّر أو تتأثّر بـ processes تانية.') },
    { term: 'Bounded buffer', definition: t('A fixed-size shared buffer between producer and consumer.', 'Buffer مشترك حجمه ثابت بين الـ producer والـ consumer.') },
    { term: 'Direct communication', definition: t('Processes name each other explicitly: send(P, m), receive(Q, m).', 'الـ processes بتسمّي بعض صراحة: send(P, m) وreceive(Q, m).') },
    { term: 'Mailbox (port)', definition: t('A uniquely identified object that indirect messages are sent to and received from.', 'Object ليه id فريد، رسايل الـ indirect بتتبعت له وتتستقبل منه.') },
    { term: 'Rendezvous', definition: t('Both send and receive are blocking.', 'الـ send والـ receive الاتنين blocking.') },
    { term: 'Zero capacity', definition: t('The link queue holds 0 messages; the sender must wait for the receiver.', 'الـ queue بتاعة الـ link بتشيل صفر رسايل؛ والـ sender لازم يستنى الـ receiver.') },
  ],
}
