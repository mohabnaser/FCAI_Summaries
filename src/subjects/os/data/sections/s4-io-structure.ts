import type { Section } from '../../types'
import { part, t } from './helpers'

/** Slides 17 (device drivers), 20–24 and 43: I/O structure, device-status table, DMA, I/O subsystem. */
export const ioStructure: Section = {
  id: 'io-structure',
  order: 4,
  kicker: 'Lesson 04',
  title: 'I/O Structure, Drivers & DMA',
  shortTitle: 'I/O & DMA',
  summary: t(
    'How a program talks to a device: one driver per controller, two ways to wait for I/O, a table that tracks every device, DMA for fast devices, and the I/O subsystem that hides all of it behind one interface.',
    'إزاي البرنامج بيكلّم جهاز: driver لكل controller، وطريقتين تستنى بيهم الـ I/O، وجدول بيتابع كل جهاز، والـ DMA للأجهزة السريعة، والـ I/O subsystem اللي بيخبّي ده كله ورا interface واحدة.',
  ),
  objectives: [
    t('Explain the role of a device driver and why there is one per device controller.', 'تشرح دور الـ device driver وليه فيه واحد لكل device controller.'),
    t('Compare synchronous and asynchronous I/O, including the wait instruction and wait loop.', 'تقارن synchronous وasynchronous I/O، بما فيها الـ wait instruction والـ wait loop.'),
    t('Read a device-status table and explain how the OS updates it.', 'تقرا device-status table وتشرح إزاي الـ OS بيحدّثه.'),
    t('Explain DMA: which devices use it and why it means one interrupt per block.', 'تشرح الـ DMA: أنهي أجهزة بتستخدمه وليه معناه interrupt واحد لكل block.'),
    t('Distinguish buffering, caching and spooling in the I/O subsystem.', 'تفرّق بين buffering وcaching وspooling في الـ I/O subsystem.'),
  ],
  estimatedMinutes: 17,
  quizId: 'quiz-io-structure',
  blocks: [
    part(
      t('Controllers and device drivers', 'الـ controllers والـ device drivers'),
      t(
        'There is a **device driver for each device controller** to manage I/O.',
        'فيه **device driver لكل device controller** عشان يدير الـ I/O.',
      ),
    ),
    {
      kind: 'layers',
      title: t('From the kernel down to the device', 'من الـ kernel لحد الجهاز'),
      caption: t(
        'The driver “provides an interface between the controller and the kernel”: the kernel sees one uniform interface; each driver knows the details of exactly one kind of controller.',
        'الـ driver “بيوفّر interface بين الـ controller والـ kernel”: الـ kernel بيشوف interface موحدة؛ وكل driver عارف تفاصيل نوع controller واحد بس.',
      ),
      layers: [
        { label: 'Kernel I/O subsystem', icon: 'chip', tone: 'cyan', detail: t('Wants to read, write and control devices — the same way for all of them.', 'عايز يقرا ويكتب ويتحكم في الأجهزة — بنفس الطريقة لكلهم.') },
        { label: 'General device-driver interface', icon: 'link', tone: 'teal', detail: t('One common interface every driver implements.', 'Interface واحدة مشتركة كل driver بيطبّقها.') },
        { label: 'Device drivers', icon: 'code', tone: 'violet', detail: t('One per controller — device-specific code.', 'واحد لكل controller — كود خاص بالجهاز.'), chips: ['disk driver', 'USB driver', 'graphics driver'] },
        { label: 'Device controllers', icon: 'settings', tone: 'amber', detail: t('Hardware with registers and a local buffer.', 'Hardware فيه registers وlocal buffer.'), chips: ['disk controller', 'USB controller', 'graphics adapter'] },
        { label: 'Devices', icon: 'disk', tone: 'rose', chips: ['disks', 'mouse', 'keyboard', 'printer', 'monitor'] },
      ],
    },
    {
      kind: 'hook',
      title: t('Common interface, specific drivers', 'Interface مشتركة، drivers مخصوصة'),
      phrase: 'One interface for the kernel — one driver per controller.',
      body: t(
        'What is common is the **interface**, not the driver. A disk driver cannot run a printer.',
        'اللي مشترك هو الـ **interface**، مش الـ driver. الـ disk driver ما يقدرش يشغّل printer.',
      ),
    },

    part(
      t('Two I/O methods', 'طريقتين للـ I/O'),
      t(
        'After I/O starts, does control go back to the program now, or only when the I/O completes?',
        'بعد ما الـ I/O يبدأ، التحكم يرجع للبرنامج دلوقتي، ولا بس لما الـ I/O يخلص؟',
      ),
    ),
    {
      kind: 'versus',
      left: { title: 'Synchronous I/O', icon: 'hourglass', tone: 'amber', tagline: t('Control returns **only upon I/O completion**', 'التحكم بيرجع **بس لما الـ I/O يخلص**') },
      right: { title: 'Asynchronous I/O', icon: 'zap', tone: 'cyan', tagline: t('Control returns **without waiting** for completion', 'التحكم بيرجع **من غير ما يستنى** الانتهاء') },
      rows: [
        {
          aspect: 'While waiting',
          left: t('A **wait instruction** idles the CPU until the next interrupt, or a **wait loop** spins (contention for memory access)', '**Wait instruction** بتخلّي الـ CPU idle لحد الـ interrupt الجاي، أو **wait loop** بيلف (تنافس على الوصول للـ memory)'),
          right: t('The program keeps computing; the CPU does useful work', 'البرنامج بيكمل حساب؛ والـ CPU بتعمل شغل مفيد'),
        },
        {
          aspect: 'Outstanding I/O',
          left: t('**At most one** request at a time — no simultaneous I/O processing', '**طلب واحد بالكتير** في المرة — مفيش I/O processing متزامن'),
          right: t('Many requests can be outstanding on many devices', 'طلبات كتير ممكن تبقى شغالة على أجهزة كتير'),
        },
        {
          aspect: 'To wait later',
          left: t('Not needed — the program already waited', 'مش محتاج — البرنامج استنى خلاص'),
          right: t('A **system call** lets the user wait for I/O completion', '**System call** بتخلّي المستخدم يستنى انتهاء الـ I/O'),
        },
        {
          aspect: 'Bookkeeping',
          left: t('Minimal', 'قليل'),
          right: t('A **device-status table** tracks every device', '**Device-status table** بيتابع كل جهاز'),
        },
      ],
      verdict: t(
        'The defining difference is **when control returns to the user program**: after completion (synchronous) or before it (asynchronous).',
        'الفرق الأساسي هو **إمتى التحكم يرجع للبرنامج**: بعد الانتهاء (synchronous) ولا قبله (asynchronous).',
      ),
    },
    {
      kind: 'visual',
      id: 'io-methods',
      title: t('Synchronous vs asynchronous I/O, step by step', 'Synchronous مقابل asynchronous I/O خطوة بخطوة'),
      caption: t('Watch the “control” row: it is the only thing that differs between the two methods.', 'ركّز على صف الـ “control”: هو الحاجة الوحيدة اللي بتختلف بين الطريقتين.'),
    },

    part(
      t('The device-status table', 'الـ device-status table'),
      t(
        'With asynchronous I/O the OS must remember the state of every device.',
        'مع الـ asynchronous I/O الـ OS لازم يفتكر حالة كل جهاز.',
      ),
    ),
    {
      kind: 'lead',
      text: t(
        'The **device-status table** contains an entry for each I/O device indicating its **type, address and state**. The OS **indexes into the table** to determine device status and **modifies the entry** to include the interrupt.',
        'الـ **device-status table** فيه entry لكل I/O device بتوضّح **نوعه وعنوانه وحالته**. والـ OS **بيدخل على الجدول** عشان يعرف حالة الجهاز و**يعدّل الـ entry** عشان تشمل الـ interrupt.',
      ),
    },
    {
      kind: 'visual',
      id: 'device-status',
      title: t('The device-status table', 'الـ device-status table بتاع المحاضرة'),
      caption: t(
        'Disk unit 3 starts with two queued requests (read file xxx, write file yyy). Complete them and watch the entry flip from busy to idle.',
        'الـ disk unit 3 بيبدأ وعليه طلبين في الـ queue (read للـ file xxx وwrite للـ file yyy). خلّصهم وشوف الـ entry بتتقلب من busy لـ idle.',
      ),
    },

    part(
      t('Direct memory access (DMA)', 'الـ Direct memory access (DMA)'),
      t('The trick that lets fast devices move data without bothering the CPU.', 'الحيلة اللي بتخلّي الأجهزة السريعة تنقل داتا من غير ما تزعج الـ CPU.'),
    ),
    {
      kind: 'definition',
      term: 'Direct memory access (DMA)',
      definition: t(
        'Used for **high-speed I/O devices** able to transmit information at close to memory speeds. The device controller transfers **blocks of data from buffer storage directly to main memory without CPU intervention**.',
        'بيتستخدم للـ **high-speed I/O devices** اللي بتقدر تنقل معلومات بسرعة قريبة من سرعة الـ memory. الـ device controller بينقل **blocks من الـ buffer مباشرة للـ main memory من غير تدخل الـ CPU**.',
      ),
      detail: t(
        'Only **one interrupt is generated per block**, rather than one interrupt per byte.',
        'بيتعمل **interrupt واحد بس لكل block**، بدل interrupt لكل byte.',
      ),
    },
    {
      kind: 'visual',
      id: 'dma-compare',
      title: t('Count the interrupts: per byte vs DMA', 'عِد الـ interrupts: لكل byte مقابل DMA'),
      caption: t('The same 16 bytes reach memory either way; what changes is how many times the CPU is interrupted.', 'نفس الـ 16 byte بيوصلوا للـ memory في الحالتين؛ اللي بيتغير هو عدد مرات قطع الـ CPU.'),
    },
    {
      kind: 'stats',
      items: [
        { value: '1', label: t('interrupt per **block**, not per byte', 'interrupt واحد لكل **block**، مش لكل byte'), icon: 'zap', tone: 'amber' },
        { value: '0', label: t('bytes copied by the CPU during the transfer', 'bytes الـ CPU بتنسخها أثناء النقل'), icon: 'cpu', tone: 'teal' },
        { value: '≈', label: t('memory speed — DMA is for **high-speed** devices', 'سرعة الـ memory — الـ DMA للأجهزة **السريعة**'), icon: 'gauge', tone: 'cyan' },
      ],
    },
    {
      kind: 'flow',
      title: t('How a modern computer works (von Neumann architecture)', 'إزاي الكمبيوتر الحديث بيشتغل (von Neumann architecture)'),
      steps: [
        { icon: 'memory', label: 'Instructions and data in memory', detail: t('Both live in the same main memory.', 'الاتنين في نفس الـ main memory.'), tone: 'violet' },
        { icon: 'cpu', label: 'CPU executes', detail: t('A stream of instruction-execution cycles fetches and runs instructions.', 'سلسلة من instruction-execution cycles بتجيب وتنفّذ الـ instructions.'), tone: 'cyan' },
        { icon: 'send', label: 'CPU issues an I/O request', detail: t('It programs the device controller and goes back to work.', 'بيبرمج الـ device controller ويرجع لشغله.'), tone: 'amber' },
        { icon: 'refresh', label: 'Device ↔ memory by DMA', detail: t('The controller moves the data block itself.', 'الـ controller بينقل الـ block بنفسه.'), tone: 'teal' },
        { icon: 'bell', label: 'Interrupt', detail: t('“Done” — one interrupt for the block.', '“خلصت” — interrupt واحد للـ block.'), tone: 'rose' },
      ],
    },

    part(
      t('The I/O subsystem', 'الـ I/O subsystem'),
      t(
        '**one purpose of the OS is to hide the individuality of hardware devices from the user**.',
        '**من أهداف الـ OS إنه يخبّي خصوصية كل جهاز hardware عن المستخدم**.',
      ),
    ),
    {
      kind: 'cards',
      title: t('Memory management of I/O: three different jobs', 'إدارة الـ memory للـ I/O: تلات شغلانات مختلفة'),
      columns: 3,
      items: [
        {
          icon: 'inbox',
          title: 'Buffering',
          body: t('Storing data **temporarily while it is being transferred**.', 'تخزين الداتا **مؤقتًا وهي بتتنقل**.'),
          chips: ['during transfer'],
          tone: 'cyan',
        },
        {
          icon: 'zap',
          title: 'Caching',
          body: t('Storing **parts of data in faster storage** for performance.', 'تخزين **أجزاء من الداتا في storage أسرع** عشان الأداء.'),
          chips: ['for reuse / speed'],
          tone: 'teal',
        },
        {
          icon: 'printer',
          title: 'Spooling',
          body: t('The **overlapping of output of one job with input of other jobs**.', '**تداخل الـ output بتاع job مع الـ input بتاع jobs تانية**.'),
          chips: ['e.g. printer queue'],
          tone: 'violet',
        },
      ],
    },
    {
      kind: 'cards',
      columns: 2,
      items: [
        {
          icon: 'link',
          title: 'General device-driver interface',
          body: t('The common face every driver presents to the kernel.', 'الواجهة المشتركة اللي كل driver بيقدّمها للـ kernel.'),
          tone: 'amber',
        },
        {
          icon: 'code',
          title: 'Drivers for specific hardware devices',
          body: t('The device-specific code behind that interface.', 'الكود الخاص بكل جهاز ورا الواجهة دي.'),
          tone: 'rose',
        },
      ],
    },
    {
      kind: 'confusions',
      items: [
        {
          wrong: t('“The OS has one common driver for every controller.”', '“الـ OS عنده driver واحد مشترك لكل الـ controllers.”'),
          right: t('Each controller has its **own** driver; the **interface** to the kernel is what is common.', 'كل controller ليه driver **خاص بيه**؛ والـ **interface** للـ kernel هي اللي مشتركة.'),
        },
        {
          wrong: t('“Synchronous I/O returns immediately.”', '“الـ synchronous I/O بيرجع على طول.”'),
          right: t('Synchronous returns **after** completion; asynchronous returns **before** it.', 'الـ synchronous بيرجع **بعد** الانتهاء؛ والـ asynchronous بيرجع **قبله**.'),
        },
        {
          wrong: t('“DMA is for slow devices like keyboards.”', '“الـ DMA للأجهزة البطيئة زي الكيبورد.”'),
          right: t('DMA is for **high-speed** devices that transmit at close to memory speed.', 'الـ DMA للأجهزة **السريعة** اللي بتنقل بسرعة قريبة من سرعة الـ memory.'),
        },
        {
          wrong: t('“Spooling is just another word for buffering.”', '“الـ spooling ده اسم تاني للـ buffering.”'),
          right: t('Buffering holds data during one transfer; spooling **overlaps one job’s output with other jobs’ input**.', 'الـ buffering بيمسك الداتا أثناء نقل واحد؛ والـ spooling **بيداخل output job مع input jobs تانية**.'),
        },
      ],
    },
    {
      kind: 'exam',
      title: t('Exam radar: drivers, I/O methods and DMA', 'رادار الامتحان: الـ drivers وطرق الـ I/O والـ DMA'),
      body: t(
        'Two T/F statements test **when control returns** — read each one for the word “synchronous” or “asynchronous” before deciding. Another tests whether drivers are shared. DMA appears twice: a fill-in built on the lecture’s exact wording and an MCQ about the kind of device it serves.',
        'جملتين T/F بيختبروا **إمتى التحكم بيرجع** — دوّر في كل جملة على كلمة “synchronous” أو “asynchronous” قبل ما تقرر. وجملة تانية بتختبر هل الـ drivers مشتركة. والـ DMA بييجي مرتين: fill-in مبني على كلام المحاضرة بالحرف، وMCQ عن نوع الأجهزة اللي بيخدمها.',
      ),
      refs: ['s9-sync-io-tf', 's9-async-io-tf', 's9-device-driver-tf', 's9-dma-fill', 's9-dma-mcq'],
    },
    {
      kind: 'recap',
      items: [
        t('One device driver per controller; one common interface to the kernel.', 'Device driver لكل controller؛ وinterface واحدة مشتركة للـ kernel.'),
        t('Synchronous: control returns after completion (wait instruction / wait loop).', 'Synchronous: التحكم بيرجع بعد الانتهاء (wait instruction / wait loop).'),
        t('Asynchronous: control returns before completion; system call to wait.', 'Asynchronous: التحكم بيرجع قبل الانتهاء؛ وsystem call عشان يستنى.'),
        t('Device-status table: type, address, state for every device.', 'الـ device-status table: النوع والعنوان والحالة لكل جهاز.'),
        t('DMA: high-speed devices, block straight to memory, one interrupt per block.', 'الـ DMA: أجهزة سريعة، الـ block للـ memory مباشرة، interrupt واحد لكل block.'),
        t('I/O subsystem: buffering, caching, spooling + driver interface.', 'الـ I/O subsystem: buffering وcaching وspooling + واجهة الـ drivers.'),
      ],
    },
  ],
  examFocus: [
    t('A device driver exists for each device controller and provides the interface between controller and kernel.', 'فيه device driver لكل device controller وبيوفّر الـ interface بين الـ controller والـ kernel.'),
    t('Synchronous I/O: control returns only on completion; asynchronous I/O: control returns without waiting.', 'Synchronous I/O: التحكم يرجع بس عند الانتهاء؛ asynchronous I/O: التحكم يرجع من غير انتظار.'),
    t('DMA: for high-speed devices; controller moves blocks directly to memory; one interrupt per block.', 'الـ DMA: للأجهزة السريعة؛ الـ controller بينقل blocks للـ memory مباشرة؛ interrupt واحد لكل block.'),
    t('Buffering vs caching vs spooling — definitions.', 'Buffering مقابل caching مقابل spooling — التعريفات في المحاضرة.'),
  ],
  keyTerms: [
    { term: 'Device driver', definition: t('Software for one device controller; interface between controller and kernel.', 'Software لـ device controller واحد؛ interface بين الـ controller والـ kernel.') },
    { term: 'Synchronous I/O', definition: t('Control returns to the program only upon I/O completion.', 'التحكم بيرجع للبرنامج بس لما الـ I/O يخلص.') },
    { term: 'Asynchronous I/O', definition: t('Control returns to the program without waiting for completion.', 'التحكم بيرجع للبرنامج من غير ما يستنى الانتهاء.') },
    { term: 'Device-status table', definition: t('One entry per device: type, address and state.', 'Entry لكل جهاز: النوع والعنوان والحالة.') },
    { term: 'DMA', definition: t('Block transfer between controller buffer and memory without the CPU; one interrupt per block.', 'نقل block بين الـ buffer والـ memory من غير الـ CPU؛ interrupt واحد لكل block.') },
    { term: 'Spooling', definition: t('Overlapping the output of one job with the input of other jobs.', 'تداخل الـ output بتاع job مع الـ input بتاع jobs تانية.') },
  ],
}
