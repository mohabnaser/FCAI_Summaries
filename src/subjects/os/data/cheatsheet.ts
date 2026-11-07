import type { LText } from '../types'

export interface CheatSheetTable {
  headers: string[]
  rows: LText[][]
}

export interface CheatSheetGroup {
  id: string
  title: string
  subtitle: string
  points?: LText[]
  table?: CheatSheetTable
  traps?: LText[]
}

export const cheatSheetGroups: CheatSheetGroup[] = [
  {
    id: 'os-kernel',
    title: 'The OS and the kernel',
    subtitle: 'Definitions, views, and the four-component model',
    points: [
      {
        en: '**Operating system:** an intermediary between a user and the hardware; from the system view it is a **resource allocator** and a **control program**.',
        ar: '**الـ OS:** وسيط بين المستخدم والـ hardware؛ ومن system view هو **resource allocator** و**control program**.',
      },
      {
        en: '**User view** optimizes convenience and problem solving. **System view** optimizes efficient, fair resource use and error prevention.',
        ar: '**user view** بتحسن السهولة وحل المشاكل. **system view** بتحسن الاستخدام الكفء والعادل ومنع الأخطاء.',
      },
      {
        en: '**Kernel:** the one program running at all times — the OS core. Loadable kernel modules are allowed, so “cannot be extended while running” is false.',
        ar: '**kernel:** البرنامج الوحيد الشغال طول الوقت — قلب الـ OS. الـ loadable modules مسموحة، فجملة “مش قابل للتوسيع وهو شغال” غلط.',
      },
      {
        en: 'Four components: **hardware → operating system → application programs → users**. A system program ships with the OS but is not the kernel.',
        ar: 'أربع مكونات: **hardware → OS → applications → users**. والsystem program بييجي مع الـ OS لكن مش الkernel.',
      },
    ],
    traps: [
      {
        en: '“The OS is everything the vendor ships” is only an approximation. A browser or game bundled with the OS is still an application program.',
        ar: '“الـ OS هو كل حاجة الvendor بيبعتها” تقريب فقط. المتصفح أو اللعبة المرفقة تفضل application programs.',
      },
    ],
  },
  {
    id: 'boot-interrupts',
    title: 'Boot and interrupts',
    subtitle: 'From firmware to an interrupt-driven OS',
    table: {
      headers: ['Event', 'Source', 'Examples'],
      rows: [
        [
          { en: 'Hardware interrupt', ar: 'hardware interrupt' },
          { en: 'Device controller / hardware', ar: 'device controller / hardware' },
          { en: 'I/O completion, network packet, keystroke', ar: 'I/O completion وnetwork packet وkeystroke' },
        ],
        [
          { en: 'Trap / exception', ar: 'trap / exception' },
          { en: 'Software', ar: 'software' },
          { en: 'Divide by zero, invalid access, system call', ar: 'division by zero وinvalid access وsystem call' },
        ],
      ],
    },
    points: [
      {
        en: '**Bootstrap program** is stored in ROM/EPROM firmware. It initializes CPU registers, device controllers, and memory; then locates the kernel and loads it.',
        ar: '**bootstrap program** متخزن في ROM/EPROM firmware. بيهيئ CPU registers وdevice controllers وmemory، وبعدين يلاقي الkernel ويحمله.',
      },
      {
        en: 'An interrupt saves the interrupted instruction address, identifies the source (vectored interrupt or polling), runs the ISR, then restores and resumes.',
        ar: 'الـ interrupt بيحفظ عنوان التعليمة المقطوعة، يحدد المصدر (vector أو polling)، يشغل الISR، وبعدين يرجع ويكمل.',
      },
      {
        en: 'The OS is **interrupt driven**: devices, errors, and system calls reach it through interrupts/traps.',
        ar: 'الـ OS **interrupt driven**: الأجهزة والأخطاء والsystem calls بتوصل له عن طريق interrupts/traps.',
      },
    ],
    traps: [
      {
        en: 'The course term is **bootstrap program**. “Bootloader” is a synonym trap when the original wording asks specifically for the bootstrap.',
        ar: 'مصطلح الكورس **bootstrap program**. و“bootloader” فخ مرادف لو السؤال بيطلب الbootstrap بالتحديد.',
      },
    ],
  },
  {
    id: 'architecture',
    title: 'Computer-system architecture',
    subtitle: 'Multiprocessors, multi-core, and clusters',
    table: {
      headers: ['Design', 'What is shared?', 'What is private?', 'Exam cue'],
      rows: [
        [
          { en: 'SMP', ar: 'SMP' },
          { en: 'Memory; all processors are peers', ar: 'memory وكل الprocessors متساويين' },
          { en: 'Registers and caches', ar: 'registers وcaches' },
          { en: 'All can run OS code.', ar: 'كلهم يشغلوا OS code.' },
        ],
        [
          { en: 'Multi-core', ar: 'multi-core' },
          { en: 'Chip and memory', ar: 'chip وmemory' },
          { en: 'Per-core registers/cache', ar: 'registers/cache لكل core' },
          { en: 'Several cores, one chip — not a cluster.', ar: 'أكتر من core على chip واحدة — مش cluster.' },
        ],
        [
          { en: 'Cluster', ar: 'cluster' },
          { en: 'Storage via SAN; coordination', ar: 'storage عبر SAN وتنسيق' },
          { en: 'Separate complete computers', ar: 'أجهزة كاملة منفصلة' },
          { en: 'Asymmetric = hot standby; symmetric = all active; DLM.', ar: 'asymmetric = hot standby؛ symmetric = كلهم شغالين؛ DLM.' },
        ],
      ],
    },
    points: [
      {
        en: 'Three multiprocessor advantages: **increased throughput**, **economy of scale**, **increased reliability** (graceful degradation / fault tolerance).',
        ar: 'تلات مميزات: **throughput أعلى**، **economy of scale**، **reliability أعلى** (graceful degradation / fault tolerance).',
      },
      {
        en: '**UMA:** uniform memory access time. **NUMA:** local memory is faster than remote memory.',
        ar: '**UMA:** access time متساوي. **NUMA:** الlocal memory أسرع من الremote.',
      },
    ],
    traps: [
      {
        en: 'Multiprocessors usually **share** the bus, clock, memory, and peripherals — they do not have separate copies of all of them.',
        ar: 'الmultiprocessors عادة **بتشارك** bus وclock وmemory وperipherals — مش كل واحد ليه نسخة منفصلة.',
      },
    ],
  },
  {
    id: 'multiprogramming',
    title: 'Multiprogramming and time-sharing',
    subtitle: 'The efficiency core of Chapter 1',
    table: {
      headers: ['Term', 'Definition', 'Do not confuse with'],
      rows: [
        [
          { en: 'Multiprogramming', ar: 'multiprogramming' },
          { en: 'Several jobs in memory; switch when one waits; maximize CPU utilization.', ar: 'أكتر من job في الmemory؛ تبديل لما واحدة تستنى؛ maximize utilization.' },
          { en: 'Parallel execution on one CPU', ar: 'تنفيذ متوازي على CPU واحدة' },
        ],
        [
          { en: 'Time-sharing', ar: 'time-sharing' },
          { en: 'Rapid timer-driven switching for interactive response, usually < 1 s.', ar: 'تبديل سريع بالtimer لاستجابة تفاعلية، عادة أقل من ثانية.' },
          { en: 'The opposite of multiprogramming', ar: 'عكس الmultiprogramming' },
        ],
        [
          { en: 'Degree of multiprogramming', ar: 'degree of multiprogramming' },
          { en: 'Number of processes resident in memory.', ar: 'عدد الprocesses في الmemory.' },
          { en: 'Ready-queue length or throughput', ar: 'طول الready queue أو throughput' },
        ],
        [
          { en: 'Swapping', ar: 'swapping' },
          { en: 'Move processes in/out when they do not all fit.', ar: 'نقل processes داخل/خارج لما مش كلها تدخل.' },
          { en: 'Context switching', ar: 'context switching' },
        ],
        [
          { en: 'Virtual memory', ar: 'virtual memory' },
          { en: 'Run processes that are **not completely** in memory.', ar: 'تشغيل processes **مش كاملة** في الmemory.' },
          { en: '“Whole process must be resident”', ar: '“كل الprocess لازم تكون resident”' },
        ],
      ],
    },
    traps: [
      {
        en: 'The objective of multiprogramming is to **maximize CPU utilization** (keep some process running at all times), not to minimize it or merely fill a ready queue.',
        ar: 'هدف الmultiprogramming إنه **maximize CPU utilization** (process شغالة طول الوقت)، مش يقللها أو يملا ready queue بس.',
      },
    ],
  },
  {
    id: 'dual-mode',
    title: 'Dual-mode operation and the timer',
    subtitle: 'How hardware protects the kernel',
    points: [
      {
        en: 'A **mode bit** records user mode (1) or kernel mode (0). There are two fundamental modes; a VMM may add a third for virtualization.',
        ar: '**mode bit** بتسجل user mode (1) أو kernel mode (0). فيه وضعين أساسيين؛ والVMM ممكن يضيف تالت للvirtualization.',
      },
      {
        en: '**Privileged instructions** execute only in kernel mode: direct I/O, enabling/disabling interrupts, setting the timer, changing protection state.',
        ar: '**privileged instructions** في kernel mode فقط: I/O مباشر، تمكين/تعطيل interrupts، ضبط timer، تغيير protection state.',
      },
      {
        en: 'A **system call/trap** is the controlled entry to the kernel; return-from-call resets the mode to user. User code cannot directly set the mode bit.',
        ar: '**system call/trap** هي المدخل المتحكم فيه للkernel؛ والرجوع يعيد الوضع لuser. والuser code مش بيغير mode bit مباشرة.',
      },
      {
        en: 'The **timer** interrupts a process that exceeds its time slice. It is privileged and is set before the process runs.',
        ar: '**الtimer** بيعمل interrupt للprocess اللي تعدت وقتها. وهو privileged وبيتضبط قبل تشغيل الprocess.',
      },
    ],
    traps: [
      {
        en: 'Dual mode alone does not stop an infinite user-mode loop; the timer is what returns control to the OS.',
        ar: 'الdual mode لوحدها مش بتمنع infinite loop في user mode؛ الtimer هو اللي بيرجع التحكم للOS.',
      },
    ],
  },
  {
    id: 'process-memory',
    title: 'Process and memory management',
    subtitle: 'Two core OS responsibilities at Chapter 1 depth',
    table: {
      headers: ['Concept', 'Must-know statement'],
      rows: [
        [
          { en: 'Process', ar: 'process' },
          { en: 'A program in execution; an active entity and the unit of work. A program is passive.', ar: 'program in execution؛ active entity ووحدة العمل. والprogram passive.' },
        ],
        [
          { en: 'Process resources', ar: 'موارد الprocess' },
          { en: 'CPU time, memory, I/O devices, files, initialization data. Reclaim reusable resources on termination.', ar: 'CPU time وmemory وI/O devices وfiles وinitialization data. واستعيد الموارد عند الانتهاء.' },
        ],
        [
          { en: 'Threads', ar: 'threads' },
          { en: 'Single-threaded: one program counter. Multithreaded: one program counter per thread.', ar: 'single-threaded: program counter واحدة. multithreaded: program counter لكل thread.' },
        ],
        [
          { en: 'Memory activities', ar: 'أنشطة الmemory' },
          { en: 'Track use; decide what moves in/out; allocate and deallocate space.', ar: 'تتبع الاستخدام؛ تحديد إيه يدخل/يخرج؛ تخصيص وتحرير المساحة.' },
        ],
        [
          { en: 'Why memory matters', ar: 'ليه الmemory مهمة' },
          { en: 'All instructions must be in memory to execute. Main memory is directly CPU-accessible, random access, typically volatile.', ar: 'كل التعليمات لازم تكون في الmemory عشان تتنفذ. والmain memory يوصله الCPU مباشرة، random access، وعادة volatile.' },
        ],
      ],
    },
    traps: [
      {
        en: 'A process does not need to own every resource for its whole lifetime; it needs access while executing. Programs are passive; processes are active.',
        ar: 'الprocess مش لازم تملك كل مورد طول حياتها؛ محتاجة الوصول وقت التنفيذ. البرنامج passive والprocess active.',
      },
    ],
  },
  {
    id: 'files-storage',
    title: 'Files and mass storage',
    subtitle: 'The uniform logical view and what lies beneath',
    points: [
      {
        en: 'A **file** is a logical storage unit that abstracts physical media. The OS organizes files into **directories**, provides file primitives, maps files to secondary storage, backs them up, and applies access control.',
        ar: '**الfile** logical storage unit بتجرد الmedia. والOS ينظمها في **directories**، يوفر primitives، يحولها لsecondary storage، يعمل backup، ويطبق access control.',
      },
      {
        en: 'Mass-storage management: **free-space management**, **storage allocation**, **disk scheduling**. Overall system speed hinges on the disk subsystem.',
        ar: 'إدارة الmass storage: **free-space management** و**storage allocation** و**disk scheduling**. وسرعة النظام تعتمد على disk subsystem.',
      },
      {
        en: '**Tertiary storage** includes optical media and magnetic tape. **WORM** = write once, read many; **RW** = rewritable.',
        ar: '**tertiary storage** فيه optical media وmagnetic tape. **WORM** = write once, read many؛ **RW** = rewritable.',
      },
    ],
    traps: [
      {
        en: 'WORM is not rewritable, but it is still managed storage. The file abstraction hides device properties rather than eliminating them.',
        ar: 'WORM مش rewritable، لكنه برضه managed storage. والfile abstraction بتخفي خصائص الأجهزة مش بتلغيها.',
      },
    ],
  },
  {
    id: 'hierarchy-caching',
    title: 'Storage hierarchy and caching',
    subtitle: 'Speed, size, cost, and the copy that makes reuse fast',
    table: {
      headers: ['Level', 'Typical size', 'Access time', 'Managed by'],
      rows: [
        [{ en: 'Registers', ar: 'registers' }, { en: '< 1 KB', ar: '< 1 KB' }, { en: '0.25–0.5 ns', ar: '0.25–0.5 ns' }, { en: 'Compiler', ar: 'compiler' }],
        [{ en: 'Cache', ar: 'cache' }, { en: '< 16 MB', ar: '< 16 MB' }, { en: '0.5–25 ns', ar: '0.5–25 ns' }, { en: 'Hardware', ar: 'hardware' }],
        [{ en: 'Main memory', ar: 'main memory' }, { en: '< 64 GB', ar: '< 64 GB' }, { en: '80–250 ns', ar: '80–250 ns' }, { en: 'OS', ar: 'OS' }],
        [{ en: 'Solid-state disk', ar: 'solid-state disk' }, { en: '< 1 TB', ar: '< 1 TB' }, { en: '25,000–50,000 ns', ar: '25,000–50,000 ns' }, { en: 'OS', ar: 'OS' }],
        [{ en: 'Magnetic disk', ar: 'magnetic disk' }, { en: '< 10 TB', ar: '< 10 TB' }, { en: '5,000,000 ns', ar: '5,000,000 ns' }, { en: 'OS', ar: 'OS' }],
      ],
    },
    points: [
      {
        en: '**Hit:** data is already in the faster level. **Miss:** copy it in, then use it. Cache size and replacement policy determine effectiveness.',
        ar: '**hit:** البيانات موجودة في المستوى الأسرع. **miss:** تنقلها وتستخدمها. وحجم الcache وسياسة الاستبدال بيحددوا الفايدة.',
      },
      {
        en: 'Main memory can be viewed as a cache for secondary storage. **Cache coherence** ensures multiprocessors see the most recent value.',
        ar: 'الmain memory ممكن تكون cache للsecondary storage. و**cache coherence** بتضمن إن كل الprocessors تشوف أحدث قيمة.',
      },
    ],
    traps: [
      {
        en: 'Caching does not delete the original; it keeps a temporary copy in faster storage. Faster levels are smaller, not larger.',
        ar: 'الcaching مش بتمسح الأصل؛ بتحتفظ بنسخة مؤقتة في storage أسرع. والمستويات الأسرع أصغر مش أكبر.',
      },
    ],
  },
  {
    id: 'io',
    title: 'I/O, DMA, and device management',
    subtitle: 'Synchronous, asynchronous, and buffering vs. spooling',
    table: {
      headers: ['Concept', 'Key distinction'],
      rows: [
        [
          { en: 'Synchronous I/O', ar: 'synchronous I/O' },
          { en: 'Control returns only after the I/O completes; the program waits.', ar: 'التحكم يرجع بعد ما الI/O يخلص؛ البرنامج يستنى.' },
        ],
        [
          { en: 'Asynchronous I/O', ar: 'asynchronous I/O' },
          { en: 'Control returns before I/O completes; an interrupt/status check signals completion.', ar: 'التحكم يرجع قبل ما الI/O يخلص؛ interrupt/status check بيبلغ بالإكمال.' },
        ],
        [
          { en: 'DMA', ar: 'DMA' },
          { en: 'High-speed controller transfers blocks directly to/from memory; one interrupt per block.', ar: 'controller سريع ينقل blocks مباشرة للمemory/منها؛ interrupt لكل block.' },
        ],
        [
          { en: 'Buffering', ar: 'buffering' },
          { en: 'Temporary storage during transfer; smooths speed mismatch.', ar: 'تخزين مؤقت أثناء النقل؛ بيقلل فرق السرعة.' },
        ],
        [
          { en: 'Caching', ar: 'caching' },
          { en: 'Faster copy for reuse; relies on locality and replacement policy.', ar: 'نسخة أسرع لإعادة الاستخدام؛ تعتمد على locality وreplacement policy.' },
        ],
        [
          { en: 'Spooling', ar: 'spooling' },
          { en: 'Overlap one job’s output with another job’s input, e.g. a print queue.', ar: 'تداخل output job مع input job تاني، زي print queue.' },
        ],
      ],
    },
    points: [
      {
        en: 'A **device-status table** tracks each device’s type, address, and state (idle/busy) and any queued request. **Device drivers** hide device-specific details behind a common interface.',
        ar: '**device-status table** بتتابع نوع كل جهاز وعنوانه وحالته (idle/busy) وأي request في الqueue. وال**device drivers** بتخفي تفاصيل الجهاز ورا common interface.',
      },
    ],
    traps: [
      {
        en: 'DMA generates one interrupt per block, not one per byte. Async does not mean “no completion signal”; it means control returns earlier.',
        ar: 'الDMA بيعمل interrupt لكل block مش لكل byte. والasync مش معناها “مفيش إشارة إكمال”؛ معناها التحكم يرجع بدري.',
      },
    ],
  },
  {
    id: 'protection',
    title: 'Protection and security',
    subtitle: 'Internal access control vs. defense against attack',
    table: {
      headers: ['Term', 'Definition', 'Scope'],
      rows: [
        [
          { en: 'Protection', ar: 'protection' },
          { en: 'Mechanism controlling access of processes/users to OS-defined resources.', ar: 'آلية تتحكم في وصول الprocesses/users لموارد الOS.' },
          { en: 'Inside the system', ar: 'داخل النظام' },
        ],
        [
          { en: 'Security', ar: 'security' },
          { en: 'Defense against internal and external attacks.', ar: 'الدفاع ضد الهجمات الداخلية والخارجية.' },
          { en: 'Whole system', ar: 'النظام كله' },
        ],
      ],
    },
    points: [
      {
        en: 'A **UID** is a user name plus an associated number; a **GID** groups users. Both are attached to files and processes to support access decisions.',
        ar: '**UID** اسم مستخدم ورقم مرتبط؛ و**GID** بيجمع users. والاتنين بيتربطوا بالfiles والprocesses لدعم قرارات الوصول.',
      },
      {
        en: '**Privilege escalation** changes to an effective ID with more rights. Controlled escalation is legitimate; uncontrolled escalation is a security failure.',
        ar: '**privilege escalation** بتحول لeffective ID بصلاحيات أكبر. المتحكم فيه شرعي؛ وغير المتحكم فيه فشل أمني.',
      },
    ],
    traps: [
      {
        en: 'Protection is necessary but not sufficient for security. A valid access-control design can still be bypassed by a vulnerability or stolen credential.',
        ar: 'الprotection ضرورية لكن مش كافية للأمان. تصميم access control سليم ممكن يتجاوز بـ vulnerability أو credential مسروق.',
      },
    ],
  },
  {
    id: 'environments',
    title: 'Computing environments',
    subtitle: 'Distributed, virtualized, cloud, real-time, and open source',
    table: {
      headers: ['Model', 'Key idea'],
      rows: [
        [
          { en: 'Client–server', ar: 'client–server' },
          { en: 'Servers provide services; clients request them. Compute server or file server.', ar: 'servers بتوفر خدمات وclients بتطلبها. compute server أو file server.' },
        ],
        [
          { en: 'Peer-to-peer', ar: 'peer-to-peer' },
          { en: 'All nodes are peers; a node can be client, server, or both.', ar: 'كل الnodes peers؛ والnode ممكن client أو server أو الاتنين.' },
        ],
        [
          { en: 'Virtualization', ar: 'virtualization' },
          { en: 'A VMM runs guest OSs on shared hardware; same instruction set can run natively.', ar: 'VMM بيشغل guest OSs على hardware مشترك؛ ونفس instruction set ممكن تشتغل natively.' },
        ],
        [
          { en: 'Emulation', ar: 'emulation' },
          { en: 'Translates a different instruction set; generally the slowest option.', ar: 'بتترجم instruction set مختلف؛ عادة أبطأ خيار.' },
        ],
        [
          { en: 'Cloud', ar: 'cloud' },
          { en: 'Public/private/hybrid; SaaS = application, PaaS = stack, IaaS = servers/storage.', ar: 'public/private/hybrid؛ SaaS = application، PaaS = stack، IaaS = servers/storage.' },
        ],
        [
          { en: 'Real-time embedded', ar: 'real-time embedded' },
          { en: 'Fixed time constraints; correct only if deadlines are met. Often little/no UI.', ar: 'time constraints ثابتة؛ صحيح فقط لو المواعيد اتحققت. وغالبًا UI قليل/معدوم.' },
        ],
        [
          { en: 'Open source', ar: 'open source' },
          { en: 'Source code available; FSF/GPL copyleft; Linux and BSD are examples.', ar: 'source code متاح؛ FSF/GPL copyleft؛ وأمثلة Linux وBSD.' },
        ],
      ],
    },
    traps: [
      {
        en: 'Virtualization abstracts **one** computer into **several** execution environments. Emulation is for a **different** CPU instruction set; it is not the same as virtualization.',
        ar: 'الvirtualization بتجرد **جهاز واحد** لـ **عدة** بيئات. والemulation لـ **instruction set مختلف**؛ مش نفس الvirtualization.',
      },
    ],
  },
]

export const highYieldTraps: LText[] = [
  {
    en: 'Kernel = the one program running at all times. It can still load modules at runtime.',
    ar: 'kernel = البرنامج الشغال طول الوقت. وبرضه يقدر يحمل modules وقت التشغيل.',
  },
  {
    en: 'Multiprocessors share clock, memory, and peripherals; multi-core is one chip; a cluster is separate computers.',
    ar: 'الmultiprocessors بتشارك clock وmemory وperipherals؛ والmulti-core chip واحدة؛ والcluster أجهزة منفصلة.',
  },
  {
    en: 'Multiprogramming maximizes utilization; time-sharing adds rapid interactive switching.',
    ar: 'الmultiprogramming بيعلي الاستخدام؛ والtime-sharing بيضيف تبديل تفاعلي سريع.',
  },
  {
    en: 'Virtual memory runs processes that are not completely in memory.',
    ar: 'الvirtual memory بتشغل processes مش كاملة في الmemory.',
  },
  {
    en: 'Two fundamental modes; privileged instructions only in kernel mode; timer returns control.',
    ar: 'وضعين أساسيين؛ privileged instructions في kernel mode فقط؛ والtimer بيرجع التحكم.',
  },
  {
    en: 'DMA is high-speed block transfer with one interrupt per block.',
    ar: 'الDMA نقل blocks سريع مع interrupt واحدة لكل block.',
  },
  {
    en: 'Spooling overlaps jobs; buffering smooths transfers; caching keeps a faster copy for reuse.',
    ar: 'spooling بتداخل jobs؛ buffering بتظبط النقل؛ caching بتحتفظ بنسخة أسرع لإعادة الاستخدام.',
  },
  {
    en: 'Protection is internal access control; security is defense against attacks.',
    ar: 'protection تحكم وصول داخلي؛ security دفاع ضد الهجمات.',
  },
  {
    en: 'Virtualization: one computer → several environments. Emulation translates a different instruction set and is slower.',
    ar: 'virtualization: جهاز واحد → عدة بيئات. وemulation بتترجم instruction set مختلف وأبطأ.',
  },
]
