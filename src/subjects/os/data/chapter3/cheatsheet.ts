import type { LText } from '../../types'
import type { CheatSheetGroup } from '../cheatsheet'

const t = (en: string, ar: string): LText => ({ en, ar })

export const chapter3CheatSheetGroups: CheatSheetGroup[] = [
  {
    id: 'c3-process',
    title: 'The process',
    subtitle: 'Program in execution',
    points: [
      t('**Process** = program in execution; program = **passive** (executable file on disk), process = **active** (loaded in memory). One program can be several processes.', '**الـ Process** = برنامج شغال؛ الـ program **passive** (executable file على الـ disk)، والـ process **active** (متحمّلة في الذاكرة). والبرنامج الواحد ممكن يبقى كذا process.'),
      t('Memory, max → 0: **stack** (params, return addresses, locals; grows ↓) · free · **heap** (run-time allocation; grows ↑) · **data** (globals) · **text** (code). PC + registers = current activity.', 'الذاكرة من max لـ 0: **stack** (params وreturn addresses وlocals؛ بيكبر ↓) · فاضي · **heap** (حجز وقت التشغيل؛ بيكبر ↑) · **data** (globals) · **text** (الكود). والـ PC والـ registers = الـ current activity.'),
    ],
    traps: [t('The stack never holds global variables or the pid.', 'الـ stack عمره ما بيشيل global variables ولا الـ pid.')],
  },
  {
    id: 'c3-states',
    title: 'Process states',
    subtitle: 'new · ready · running · waiting · terminated',
    table: {
      headers: ['Transition', 'Event'],
      rows: [
        [t('new → ready', 'new ← ready'), t('admitted', 'admitted')],
        [t('ready → running', 'ready ← running'), t('scheduler dispatch', 'scheduler dispatch')],
        [t('running → ready', 'running ← ready'), t('interrupt (e.g. time slice over)', 'interrupt (زي إن الـ time slice يخلص)')],
        [t('running → waiting', 'running ← waiting'), t('I/O or event wait', 'I/O or event wait')],
        [t('waiting → ready', 'waiting ← ready'), t('I/O or event completion', 'I/O or event completion')],
        [t('running → terminated', 'running ← terminated'), t('exit', 'exit')],
      ],
    },
    traps: [t('Ready waits for the CPU; waiting waits for an event.', 'الـ Ready مستنية الـ CPU؛ والـ waiting مستنية حدث.')],
  },
  {
    id: 'c3-pcb',
    title: 'PCB',
    subtitle: 'One data structure per process',
    points: [
      t('State · program counter · CPU registers · CPU-scheduling info · memory-management info · accounting info · I/O status (open files).', 'State · program counter · CPU registers · CPU-scheduling info · memory-management info · accounting info · I/O status (الـ files المفتوحة).'),
    ],
  },
  {
    id: 'c3-scheduling',
    title: 'Queues & schedulers',
    subtitle: 'Who decides, and how often',
    table: {
      headers: ['Scheduler', 'Decision · frequency'],
      rows: [
        [t('Long-term (job)', 'Long-term (job)'), t('Which processes enter the ready queue · seconds–minutes, may be slow · controls degree of multiprogramming', 'مين يدخل الـ ready queue · ثواني–دقايق، ممكن بطيء · بيتحكم في الـ degree of multiprogramming')],
        [t('Short-term (CPU)', 'Short-term (CPU)'), t('Which process runs next, allocates the CPU · milliseconds, must be fast', 'مين يشتغل بعد كده ويدّيله الـ CPU · milliseconds، لازم سريع')],
        [t('Medium-term', 'Medium-term'), t('Swapping out to disk and back in · reduces degree of multiprogramming', 'Swapping للـ disk والرجوع · بيقلل الـ degree of multiprogramming')],
      ],
    },
    points: [
      t('Queues: **job** (all) · **ready** (in memory, waiting for CPU) · **device** (waiting for an I/O device).', 'الـ Queues: **job** (الكل) · **ready** (في الذاكرة ومستنية الـ CPU) · **device** (مستنية جهاز I/O).'),
      t('**I/O-bound:** many short CPU bursts. **CPU-bound:** few very long CPU bursts. Aim for a good mix.', '**الـ I/O-bound:** CPU bursts كتير وقصيرة. **الـ CPU-bound:** قليلة وطويلة جدًا. والهدف mix كويس.'),
      t('**Context switch:** save old state in its PCB, load the new one — overhead; depends on OS/PCB complexity and hardware support.', '**الـ Context switch:** احفظ الحالة القديمة في الـ PCB بتاعها وحمّل الجديدة — overhead؛ بيعتمد على تعقيد الـ OS والـ PCB ودعم الـ hardware.'),
    ],
    traps: [t('Short vs long-term: the primary distinction is frequency of execution.', 'الـ Short مقابل الـ long-term: الفرق الأساسي هو عدد مرات التشغيل.')],
  },
  {
    id: 'c3-operations',
    title: 'Creation & termination',
    subtitle: 'fork · exec · wait · exit · abort',
    points: [
      t('Tree of processes, each with a **pid**; Linux root **init (pid 1)**.', 'Tree of processes، كل واحدة ليها **pid**؛ والجذر في Linux هو **init (pid 1)**.'),
      t('Resources: all · subset · none. Execution: concurrent · parent waits. Address space: duplicate · new program.', 'الموارد: الكل · جزء · ولا حاجة. التنفيذ: مع بعض · الأب يستنى. الـ Address space: نسخة · برنامج جديد.'),
      t('**fork()** creates (0 in child, child pid in parent) · **exec()** replaces memory with a new program · **wait()** collects the child’s status.', '**الـ fork()** بتعمل (0 في الابن، والـ pid بتاعه في الأب) · **الـ exec()** بتبدّل الذاكرة ببرنامج جديد · **الـ wait()** بتاخد الـ status بتاعة الابن.'),
      t('**exit()** normal end · **abort()** by parent (exceeded resources, task not needed, parent exiting) · **cascading termination**.', '**الـ exit()** نهاية طبيعية · **الـ abort()** من الأب (عدّى الموارد، المهمة مبقتش مطلوبة، الأب خارج) · **cascading termination**.'),
    ],
  },
  {
    id: 'c3-ipc',
    title: 'IPC',
    subtitle: 'Shared memory and message passing',
    points: [
      t('Cooperate for: information sharing · computation speedup · modularity · convenience.', 'بيتعاونوا عشان: information sharing · computation speedup · modularity · convenience.'),
      t('**Bounded buffer:** empty when in == out; full when (in + 1) % SIZE == out → only SIZE − 1 slots used.', '**الـ Bounded buffer:** فاضي لما in == out؛ ومليان لما (in + 1) % SIZE == out ← بيستخدم SIZE − 1 خانة بس.'),
      t('**Direct:** send(P, m), receive(Q, m) · automatic link · exactly one pair · one link per pair · usually bidirectional.', '**الـ Direct:** send(P, m) وreceive(Q, m) · link automatic · اتنين بالظبط · link واحد لكل اتنين · غالبًا اتجاهين.'),
      t('**Indirect:** mailbox/port with unique id · link only if shared · many processes · several links · create / send-receive / destroy.', '**الـ Indirect:** mailbox/port ليه id فريد · link بس لو مشترك · processes كتير · links كتير · create / send-receive / destroy.'),
      t('**Blocking = synchronous**, non-blocking = asynchronous; both blocking = **rendezvous**.', '**الـ Blocking = synchronous**، والـ non-blocking = asynchronous؛ والاتنين blocking = **rendezvous**.'),
      t('**Buffering:** zero (sender waits; no buffering) · bounded n (waits if full) · unbounded (never waits).', '**الـ Buffering:** zero (الـ sender يستنى؛ من غير buffering) · bounded n (يستنى لو مليان) · unbounded (عمره ما يستنى).'),
    ],
    traps: [t('Mailboxes are indirect, not direct.', 'الـ Mailboxes دي indirect، مش direct.')],
  },
  {
    id: 'c3-client-server',
    title: 'Client–server',
    subtitle: 'Sockets · RPC · pipes · RMI',
    points: [
      t('**Socket** = endpoint = IP + port (161.25.19.8:1625); ports < 1024 well known; 127.0.0.1 loopback. Java: Socket (TCP), DatagramSocket (UDP), MulticastSocket.', '**الـ Socket** = نقطة نهاية = IP + port (161.25.19.8:1625)؛ الـ ports < 1024 well known؛ و127.0.0.1 loopback. Java: Socket (TCP) وDatagramSocket (UDP) وMulticastSocket.'),
      t('**RPC:** procedure calls between processes on networked systems; client stub locates the server and marshals; server stub unpacks and performs.', '**الـ RPC:** procedure calls بين processes على أجهزة متوصلة بشبكة؛ الـ client stub بيحدد الـ server ويعمل marshal؛ والـ server stub بيفك وينفّذ.'),
      t('**Ordinary pipe:** one-way, parent–child, read()/write(). **Named pipe (FIFO):** two-way, no relation, many processes; Windows: full-duplex, across machines.', '**الـ Ordinary pipe:** اتجاه واحد، أب–ابن، read()/write(). **الـ Named pipe (FIFO):** اتجاهين، من غير علاقة، processes كتير؛ وفي Windows: full-duplex وعلى أجهزة مختلفة.'),
      t('**RMI** = Remote Method Invocation: Java, invoke a method on a remote object (stub + skeleton).', '**الـ RMI** = Remote Method Invocation: في Java، تنادي method على remote object (stub + skeleton).'),
    ],
  },
]

export const chapter3HighYieldTraps: LText[] = [
  t('Stack = parameters, return addresses, locals — not globals, not the pid.', 'الـ Stack = parameters وreturn addresses وlocals — مش globals ولا الـ pid.'),
  t('Ready = waiting for the CPU; waiting = waiting for an event; time slice over → ready.', 'الـ Ready = مستنية الـ CPU؛ الـ waiting = مستنية حدث؛ والـ time slice لما يخلص ← ready.'),
  t('The PCB is a data structure storing state, PC, registers and other attributes.', 'الـ PCB هو data structure بيخزّن الـ state والـ PC والـ registers وباقي الخصائص.'),
  t('Short-term vs long-term scheduler: frequency of execution.', 'الـ Short-term مقابل الـ long-term: عدد مرات التشغيل.'),
  t('All I/O-bound → ready queue empty, short-term scheduler has little to do.', 'كلهم I/O-bound ← الـ ready queue فاضية، والـ short-term scheduler عنده شغل قليل.'),
  t('Context switch saves registers and PC (not the TLB).', 'الـ Context switch بيحفظ الـ registers والـ PC (مش الـ TLB).'),
  t('fork() creates, exec() replaces the program, exit() ends, wait() collects.', 'الـ fork() بتعمل، والـ exec() بتبدّل البرنامج، والـ exit() بتنهي، والـ wait() بتستنى الابن.'),
  t('Direct link: exactly two processes; indirect: a mailbox.', 'الـ Direct link: اتنين processes بالظبط؛ والـ indirect: mailbox.'),
  t('Zero capacity = sender blocks = no buffering = rendezvous.', 'الـ Zero capacity = الـ sender بيتعطّل = من غير buffering = rendezvous.'),
  t('Client stub does it all: locate, marshal, transmit. RMI = Remote Method Invocation.', 'الـ Client stub بيعمل كله: يحدد ويعمل marshal ويبعت. والـ RMI = Remote Method Invocation.'),
]
