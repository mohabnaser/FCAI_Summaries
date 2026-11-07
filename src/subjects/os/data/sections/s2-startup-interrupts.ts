import type { Section } from '../../types'
import { part, t } from './helpers'

/** Slides 10–15: bootstrap, system organization, interrupts, traps, interrupt timeline. */
export const startupInterrupts: Section = {
  id: 'startup-interrupts',
  order: 2,
  kicker: 'Lesson 02',
  title: 'Startup, Organization & Interrupts',
  shortTitle: 'Startup & Interrupts',
  summary: t(
    'Follow the machine from power-on to a running kernel, see how the CPU and device controllers share one bus, and learn the event mechanism — interrupts and traps — that makes an OS interrupt driven.',
    'تابع الجهاز من لحظة ما يشتغل لحد الـ kernel ما يبدأ، وشوف إزاي الـ CPU والـ device controllers بيشاركوا bus واحد، واتعلم آلية الأحداث — interrupts وtraps — اللي بتخلي الـ OS interrupt driven.',
  ),
  objectives: [
    t('Describe the bootstrap program: where it lives, what it initializes, and what it loads.', 'توصف الـ bootstrap program: متخزن فين، بيهيّئ إيه، وبيحمّل إيه.'),
    t('Explain how CPUs and device controllers cooperate over a common bus with local buffers.', 'تشرح إزاي الـ CPUs والـ device controllers بيتعاونوا على common bus بـ local buffers.'),
    t('Distinguish a hardware interrupt from a trap/exception.', 'تفرّق بين hardware interrupt وtrap/exception.'),
    t('Trace interrupt handling: save state, identify (polling or vectored), service, resume.', 'تتابع معالجة الـ interrupt: حفظ الحالة، التحديد (polling أو vectored)، الخدمة، الرجوع.'),
  ],
  estimatedMinutes: 17,
  quizId: 'quiz-startup-interrupts',
  blocks: [
    part(
      t('Computer startup', 'تشغيل الكمبيوتر'),
      t(
        'When the power comes on there is no OS in memory yet. A small program stored in hardware has to bring it in.',
        'أول ما الكهربا تيجي مفيش OS في الـ memory لسه. لازم برنامج صغير متخزن في الـ hardware يجيبه.',
      ),
    ),
    {
      kind: 'flow',
      title: t('From power-on to a running kernel', 'من الـ power-on لحد kernel شغال'),
      steps: [
        { icon: 'power', label: 'Power on or reboot', detail: t('The CPU starts executing at a fixed firmware address.', 'الـ CPU بتبدأ تنفّذ من عنوان ثابت في الـ firmware.'), tone: 'amber' },
        { icon: 'chip', label: 'Bootstrap program runs', detail: t('Stored in **ROM or EPROM** — known as **firmware**.', 'متخزن في **ROM أو EPROM** — ومعروف باسم **firmware**.'), tone: 'violet' },
        { icon: 'settings', label: 'Initialize the system', detail: t('CPU registers, device controllers, memory contents.', 'CPU registers وdevice controllers ومحتوى الـ memory.'), tone: 'cyan' },
        { icon: 'search', label: 'Locate & load the kernel', detail: t('Find the OS kernel and load it into memory.', 'يلاقي الـ kernel ويحمّله في الـ memory.'), tone: 'teal' },
        { icon: 'play', label: 'Start the kernel', detail: t('Jump to the kernel; from now on the OS is in charge.', 'ينقل التنفيذ للـ kernel؛ ومن هنا الـ OS هو المسؤول.'), tone: 'lime' },
      ],
      caption: t(
        'The whole procedure of starting a computer by loading the kernel is called **booting** the system.',
        'العملية كلها — تشغيل الكمبيوتر عن طريق تحميل الـ kernel — اسمها **booting** للنظام.',
      ),
    },
    {
      kind: 'definition',
      term: 'Bootstrap program',
      definition: t(
        'The initial program loaded when a computer is powered up or rebooted. It initializes all aspects of the system, then **locates and loads the operating-system kernel** and starts its execution.',
        'أول برنامج بيتحمّل لما الكمبيوتر يشتغل أو يعمل reboot. بيهيّئ كل أجزاء النظام، وبعدين **يلاقي الـ kernel ويحمّله** ويبدأ تنفيذه.',
      ),
      detail: t(
        'It is typically stored in ROM or EPROM, which is why it is generally known as **firmware**: software that lives in hardware and is there before any disk is read.',
        'غالبًا متخزن في ROM أو EPROM، وعشان كده معروف باسم **firmware**: software عايش جوه الـ hardware وموجود قبل ما أي disk يتقري.',
      ),
    },
    {
      kind: 'stats',
      items: [
        { value: '1st', label: t('program to run after power-on', 'أول برنامج يشتغل بعد التشغيل'), icon: 'power', tone: 'amber' },
        { value: 'ROM', label: t('or EPROM — so it survives power-off', 'أو EPROM — عشان ما يضيعش لما الجهاز يطفي'), icon: 'chip', tone: 'violet' },
        { value: '3', label: t('things initialized: registers, controllers, memory', 'حاجات بتتهيّأ: registers وcontrollers وmemory'), icon: 'settings', tone: 'cyan' },
        { value: '1', label: t('thing loaded: the kernel', 'حاجة واحدة بتتحمّل: الـ kernel'), icon: 'package', tone: 'teal' },
      ],
    },

    part(
      t('How the hardware is organized', 'الـ hardware متنظم إزاي'),
      t(
        'CPUs and device controllers share one bus and one memory, and work at the same time.',
        'الـ CPUs والـ device controllers بيشاركوا bus واحد وmemory واحدة، وبيشتغلوا في نفس الوقت.',
      ),
    ),
    {
      kind: 'visual',
      id: 'system-organization',
      title: t('One disk read over the common bus', 'قراءة واحدة من الـ disk على الـ common bus'),
      caption: t(
        'Notice where the data waits (the controller’s local buffer) and who announces completion (the controller, with an interrupt).',
        'لاحظ الداتا بتستنى فين (الـ local buffer بتاع الـ controller) ومين بيعلن إن العملية خلصت (الـ controller، بـ interrupt).',
      ),
    },
    {
      kind: 'cards',
      title: t('Computer-system operation in six facts', 'تشغيل النظام في ست حقائق'),
      columns: 3,
      items: [
        { icon: 'split', title: 'Concurrent execution', body: t('I/O devices and the CPU can execute **concurrently**.', 'الـ I/O devices والـ CPU ممكن يشتغلوا **concurrently**.'), tone: 'cyan' },
        { icon: 'settings', title: 'One controller per type', body: t('Each device controller is **in charge of a particular device type**.', 'كل device controller **مسؤول عن نوع جهاز معيّن**.'), tone: 'violet' },
        { icon: 'inbox', title: 'Local buffer', body: t('Each device controller has a **local buffer**.', 'كل device controller عنده **local buffer**.'), tone: 'teal' },
        { icon: 'refresh', title: 'CPU moves data', body: t('The CPU moves data from/to main memory to/from the local buffers.', 'الـ CPU بتنقل الداتا من/إلى الـ main memory إلى/من الـ local buffers.'), tone: 'amber' },
        { icon: 'disk', title: 'Device → buffer', body: t('I/O is from the device to the **local buffer of the controller**.', 'الـ I/O بيبقى من الجهاز للـ **local buffer بتاع الـ controller**.'), tone: 'rose' },
        { icon: 'zap', title: 'Done = interrupt', body: t('The controller informs the CPU it has finished **by causing an interrupt**.', 'الـ controller بيبلّغ الـ CPU إنه خلص **عن طريق interrupt**.'), tone: 'lime' },
      ],
    },
    {
      kind: 'callout',
      tone: 'insight',
      title: t('Parallel, but competing', 'بالتوازي، بس بيتنافسوا'),
      body: t(
        'Because CPUs and device controllers can execute in parallel on one bus, they **compete for memory cycles**. That shared memory is the meeting point of everything that follows.',
        'عشان الـ CPUs والـ device controllers ممكن يشتغلوا بالتوازي على bus واحد، فهما **بيتنافسوا على memory cycles**. والـ memory المشتركة دي هي نقطة الالتقاء لكل اللي جاي.',
      ),
    },

    part(
      t('Interrupts and traps', 'الـ interrupts والـ traps'),
      t(
        'How an event gets the CPU’s attention, and what happens next.',
        'إزاي الحدث بيلفت انتباه الـ CPU، وإيه اللي بيحصل بعدها.',
      ),
    ),
    {
      kind: 'definition',
      term: 'Interrupt',
      definition: t(
        'A signal that transfers control to the appropriate **interrupt service routine**, through the **interrupt vector**, which contains the addresses of all the service routines.',
        'إشارة بتنقل التحكم لـ **interrupt service routine** المناسبة، عن طريق الـ **interrupt vector** اللي فيه عناوين كل الـ service routines.',
      ),
      detail: t(
        'The interrupt architecture must **save the address of the interrupted instruction**, so execution can resume exactly where it stopped.',
        'الـ interrupt architecture لازم **تحفظ عنوان الـ instruction اللي اتقطعت**، عشان التنفيذ يرجع يكمل من نفس المكان بالظبط.',
      ),
    },
    {
      kind: 'versus',
      title: t('Two kinds of interrupt', 'نوعين من الـ interrupt'),
      left: { title: 'Hardware interrupt', icon: 'zap', tone: 'cyan', tagline: t('Something outside the program happened', 'حاجة حصلت برّه البرنامج') },
      right: { title: 'Trap / exception', icon: 'bug', tone: 'rose', tagline: t('A **software-generated** interrupt', 'Interrupt **مولّد من الـ software**') },
      rows: [
        { aspect: 'Raised by', left: t('A device controller / hardware', 'Device controller / hardware'), right: t('The running program (software)', 'البرنامج الشغال (software)') },
        { aspect: 'Cause', left: t('A device needs attention or finished its work', 'جهاز محتاج انتباه أو خلص شغله'), right: t('An **error** or a **user request**', '**Error** أو **طلب من المستخدم**') },
        { aspect: 'Examples', left: t('Disk transfer complete; key pressed', 'الـ disk خلص النقل؛ زرار اتداس'), right: t('Division by zero; a system call asking for an OS service', 'القسمة على صفر؛ system call بتطلب خدمة من الـ OS') },
      ],
      verdict: t(
        'Both end in the same place: the OS gains control. That is why the lecture concludes that **an operating system is interrupt driven**.',
        'الاتنين بيوصلوا لنفس النتيجة: الـ OS بياخد التحكم. وعشان كده المحاضرة بتختم إن **الـ operating system interrupt driven**.',
      ),
    },
    {
      kind: 'flow',
      title: t('Interrupt handling, step by step', 'معالجة الـ interrupt خطوة بخطوة'),
      steps: [
        { icon: 'archive', label: 'Save the CPU state', detail: t('Store the **registers and the program counter**.', 'خزّن **الـ registers والـ program counter**.'), tone: 'amber' },
        { icon: 'search', label: 'Identify the interrupt', detail: t('Either **polling** or a **vectored interrupt system**.', 'يا إما **polling** يا إما **vectored interrupt system**.'), tone: 'violet' },
        { icon: 'code', label: 'Run the right routine', detail: t('Separate segments of code decide the action for each interrupt type.', 'أجزاء كود منفصلة بتقرر الإجراء لكل نوع interrupt.'), tone: 'cyan' },
        { icon: 'refresh', label: 'Restore and resume', detail: t('Reload the saved state; the interrupted program continues.', 'يرجّع الحالة المحفوظة؛ والبرنامج اللي اتقطع يكمل.'), tone: 'teal' },
      ],
    },
    {
      kind: 'versus',
      title: t('Identifying the interrupt: polling vs vectored', 'تحديد الـ interrupt: polling ولا vectored'),
      left: { title: 'Polling', icon: 'search', tone: 'amber', tagline: t('Ask every device in turn', 'اسأل كل جهاز بالدور') },
      right: { title: 'Vectored interrupt system', icon: 'list', tone: 'teal', tagline: t('The interrupt brings its own number', 'الـ interrupt جاي ومعاه رقمه') },
      rows: [
        { aspect: 'How', left: t('The OS checks devices/status flags to find who interrupted', 'الـ OS بيشيك على الأجهزة/الـ status flags عشان يعرف مين عمل interrupt'), right: t('The number indexes the **interrupt vector**, which holds the routine’s address', 'الرقم بيدخل على الـ **interrupt vector** اللي فيه عنوان الـ routine') },
        { aspect: 'Speed', left: t('Slower — time grows with the number of devices', 'أبطأ — الوقت بيزيد مع عدد الأجهزة'), right: t('Fast — direct jump to the handler', 'سريع — قفزة مباشرة للـ handler') },
      ],
    },

    part(
      t('The interrupt timeline', 'الـ timeline بتاع الـ interrupt'),
      t('The lecture shows CPU work and device transfers overlapping in time.', 'المحاضرة بتوضّح شغل الـ CPU ونقل الأجهزة بيتداخلوا مع الوقت.'),
    ),
    {
      kind: 'visual',
      id: 'interrupt-timeline',
      title: t('Interrupt timeline: the CPU keeps working while the device transfers', 'Interrupt timeline: الـ CPU بتكمل شغل والجهاز بينقل'),
      caption: t(
        'The CPU only stops for the short interrupt-processing burst; the long transfer happens in the device.',
        'الـ CPU بتقف بس في فترة الـ interrupt processing القصيرة؛ والنقل الطويل بيحصل في الجهاز.',
      ),
    },
    {
      kind: 'hook',
      title: t('The sentence the lecture points an arrow at', 'الجملة اللي المحاضرة حاطّة عليها سهم'),
      phrase: 'An operating system is interrupt driven.',
      body: t(
        'Between events the OS does nothing; a device interrupt, an error or a system call is what wakes it up.',
        'بين الأحداث الـ OS مبيعملش حاجة؛ interrupt من جهاز أو error أو system call هو اللي بيصحّيه.',
      ),
    },
    {
      kind: 'confusions',
      items: [
        {
          wrong: t('“A trap is generated by the hardware.”', '“الـ trap بيتولّد من الـ hardware.”'),
          right: t('A trap/exception is **software-generated**, caused by an error or a user request.', 'الـ trap/exception **بيتولّد من الـ software**، بسبب error أو طلب من المستخدم.'),
        },
        {
          wrong: t('“The kernel is stored in ROM and runs the boot.”', '“الـ kernel متخزن في الـ ROM وهو اللي بيعمل الـ boot.”'),
          right: t('The **bootstrap** lives in ROM/EPROM (firmware); it loads the kernel from storage.', 'الـ **bootstrap** هو اللي في الـ ROM/EPROM (firmware)؛ وهو اللي بيحمّل الـ kernel من الـ storage.'),
        },
        {
          wrong: t('“The OS keeps checking every device in a loop.”', '“الـ OS فضل يشيك على كل الأجهزة في loop.”'),
          right: t('The OS is **interrupt driven**; polling is only one way to identify an interrupt’s source.', 'الـ OS **interrupt driven**؛ والـ polling مجرد طريقة من طرق تحديد مصدر الـ interrupt.'),
        },
      ],
    },
    {
      kind: 'exam',
      title: t('Exam radar: boot and interrupts', 'رادار الامتحان: الـ boot والـ interrupts'),
      body: t(
        'This section is the most-asked part of the chapter’s first half. Watch for: the name of the first program run at power-up (several near-synonyms appear as distractors — use the course term), what firmware is, the program that must locate the kernel, the name of the whole procedure of loading the OS, who generates a trap, and whether the OS is interrupt driven.',
        'الجزء ده من أكتر الأجزاء اللي بتتسأل. خلي بالك من: اسم أول برنامج بيشتغل عند التشغيل (فيه مرادفات قريبة بتظهر كـ distractors — استخدم مصطلح الكورس)، يعني إيه firmware، البرنامج اللي لازم يلاقي الـ kernel، اسم العملية كلها بتاعة تحميل الـ OS، مين بيولّد الـ trap، وهل الـ OS interrupt driven.',
      ),
      refs: ['s2-bootstrap-mcq', 's2-firmware-fill', 's2-bootstrap-fill', 's2-system-boot', 's2-trap-mcq', 's2-trap-fill', 's2-interrupt-tf'],
    },
    {
      kind: 'recap',
      items: [
        t('Bootstrap: in ROM/EPROM (firmware); initializes, then loads the kernel.', 'الـ bootstrap: في ROM/EPROM (firmware)؛ بيهيّئ وبعدين يحمّل الـ kernel.'),
        t('CPUs + controllers share a bus and memory, competing for memory cycles.', 'الـ CPUs والـ controllers بيشاركوا bus وmemory وبيتنافسوا على memory cycles.'),
        t('Device → controller’s local buffer; CPU moves buffer ↔ memory.', 'الجهاز → الـ local buffer؛ والـ CPU بتنقل بين الـ buffer والـ memory.'),
        t('Completion is signalled by an interrupt.', 'الانتهاء بيتعلن بـ interrupt.'),
        t('Trap/exception = software-generated (error or user request).', 'الـ trap/exception = مولّد من الـ software (error أو طلب مستخدم).'),
        t('Handling: save registers + PC → identify → service → resume.', 'المعالجة: حفظ الـ registers والـ PC ← تحديد ← خدمة ← رجوع.'),
      ],
    },
  ],
  examFocus: [
    t('Bootstrap program: first program at power-up, stored in ROM/EPROM (firmware), initializes the system and loads the kernel.', 'الـ bootstrap program: أول برنامج عند التشغيل، في ROM/EPROM (firmware)، بيهيّئ النظام ويحمّل الـ kernel.'),
    t('Interrupt vector = addresses of the service routines; the interrupted instruction’s address must be saved.', 'الـ interrupt vector = عناوين الـ service routines؛ ولازم عنوان الـ instruction اللي اتقطعت يتحفظ.'),
    t('Trap/exception: software-generated by an error (division by zero) or a request (system call).', 'الـ trap/exception: مولّد من الـ software بسبب error (قسمة على صفر) أو طلب (system call).'),
    t('Identification by polling or by a vectored interrupt system.', 'التحديد بالـ polling أو بالـ vectored interrupt system.'),
  ],
  keyTerms: [
    { term: 'Bootstrap program', definition: t('First program run at power-up; initializes the system and loads the kernel.', 'أول برنامج عند التشغيل؛ بيهيّئ النظام ويحمّل الـ kernel.') },
    { term: 'Firmware', definition: t('Software stored in ROM/EPROM, such as the bootstrap.', 'Software متخزن في ROM/EPROM زي الـ bootstrap.') },
    { term: 'Device controller', definition: t('Hardware in charge of one device type, with a local buffer.', 'Hardware مسؤول عن نوع جهاز واحد، وعنده local buffer.') },
    { term: 'Interrupt vector', definition: t('Table of the addresses of all interrupt service routines.', 'جدول عناوين كل الـ interrupt service routines.') },
    { term: 'Trap / exception', definition: t('Software-generated interrupt caused by an error or a user request.', 'Interrupt مولّد من الـ software بسبب error أو طلب من المستخدم.') },
    { term: 'Polling', definition: t('Identifying the interrupting device by checking devices in turn.', 'تحديد الجهاز اللي عمل interrupt بالمرور على الأجهزة بالدور.') },
  ],
}
