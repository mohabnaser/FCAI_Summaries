import type { Section } from '../../types'
import { part, t } from './helpers'

/** Slides 25–29: single processors, multiprocessors (AMP/SMP), multi-core, UMA/NUMA, clusters. */
export const systemArchitecture: Section = {
  id: 'system-architecture',
  order: 5,
  kicker: 'Lesson 05',
  title: 'Computer-System Architecture',
  shortTitle: 'System Architecture',
  summary: t(
    'Three scales of parallel hardware — several processors sharing memory, several cores on one chip, several complete computers in a cluster — and the three advantages exams expect you to name.',
    'تلات مستويات من الـ hardware المتوازي — كذا processor بيشاركوا memory، كذا core على chip واحدة، كذا كمبيوتر كامل في cluster — والتلات مميزات اللي الامتحان مستنيك تذكرها.',
  ),
  objectives: [
    t('State the three advantages of multiprocessor systems, including graceful degradation.', 'تذكر التلات مميزات للـ multiprocessor systems، ومنهم graceful degradation.'),
    t('Compare asymmetric and symmetric multiprocessing.', 'تقارن asymmetric وsymmetric multiprocessing.'),
    t('Distinguish multiprocessors from multi-core chips, and UMA from NUMA.', 'تفرّق بين الـ multiprocessors والـ multi-core chips، وبين UMA وNUMA.'),
    t('Explain clustered systems: SAN, high availability, asymmetric/symmetric clustering, HPC and DLM.', 'تشرح الـ clustered systems: SAN وhigh availability وasymmetric/symmetric clustering وHPC وDLM.'),
  ],
  estimatedMinutes: 14,
  quizId: 'quiz-system-architecture',
  blocks: [
    part(
      t('From one processor to many', 'من processor واحد لكذا واحد'),
      t(
        'Most systems use a single general-purpose processor (PDAs through mainframes), and almost all have **special-purpose processors** as well. But **multiprocessor systems** — also called **parallel or multicore systems** — are growing in use and importance.',
        'معظم الأنظمة بتستخدم general-purpose processor واحد (من الـ PDAs للـ mainframes)، وتقريبًا كلها فيها كمان **special-purpose processors**. بس الـ **multiprocessor systems** — واسمها كمان **parallel أو multicore systems** — استخدامها وأهميتها بيزيدوا.',
      ),
    ),
    {
      kind: 'hook',
      title: t('Three advantages of multiprocessors', 'التلات مميزات بتوع الـ multiprocessors'),
      phrase: 'T · E · R — Throughput, Economy, Reliability',
      letters: [
        { letter: 'T', word: 'Increased throughput' },
        { letter: 'E', word: 'Economy of scale' },
        { letter: 'R', word: 'Increased reliability' },
      ],
    },
    {
      kind: 'cards',
      columns: 3,
      items: [
        {
          icon: 'trending',
          tag: 'T',
          title: 'Increased throughput',
          body: t('More work done in the same time. (Textbook nuance: N processors give less than N× speed-up because of coordination overhead.)', 'شغل أكتر في نفس الوقت. (تفصيلة من الكتاب: N processors بيدّوا أقل من N× سرعة بسبب overhead التنسيق.)'),
          tone: 'cyan',
        },
        {
          icon: 'coins',
          tag: 'E',
          title: 'Economy of scale',
          body: t('Processors **share** peripherals, storage and power, so one multiprocessor can cost less than several single-processor systems.', 'الـ processors **بيشاركوا** الـ peripherals والـ storage والكهربا، فـ multiprocessor واحد ممكن يكلّف أقل من كذا single-processor system.'),
          tone: 'amber',
        },
        {
          icon: 'shield',
          tag: 'R',
          title: 'Increased reliability',
          body: t('If one processor fails the rest continue: **graceful degradation**, or **fault tolerance** when the system keeps operating fully despite the failure.', 'لو processor وقع الباقي بيكمل: **graceful degradation**، أو **fault tolerance** لما النظام يفضل شغال تمامًا رغم العطل.'),
          tone: 'teal',
        },
      ],
    },
    {
      kind: 'visual',
      id: 'multiprocessor',
      title: t('Architecture explorer: AMP, SMP, dual-core, cluster', 'مستكشف المعماريات: AMP وSMP وdual-core وcluster'),
      caption: t(
        'In the SMP tab, fail CPUs one at a time and watch throughput fall while the system keeps running — reliability in action.',
        'في تاب الـ SMP، وقّع الـ CPUs واحدة واحدة وشوف الـ throughput بيقل والنظام لسه شغال — ده الـ reliability عمليًا.',
      ),
    },
    {
      kind: 'versus',
      title: t('The two types of multiprocessing', 'نوعين الـ multiprocessing'),
      left: { title: 'Asymmetric multiprocessing', icon: 'list', tone: 'amber', tagline: t('Each processor has its own job', 'كل processor له شغلانة') },
      right: { title: 'Symmetric multiprocessing (SMP)', icon: 'boxes', tone: 'cyan', tagline: t('All processors are peers', 'كل الـ processors زي بعض') },
      rows: [
        { aspect: 'Roles', left: t('A boss processor controls the system and assigns specific tasks to workers (textbook detail)', 'Processor واحد boss بيتحكم في النظام ويوزّع مهام معيّنة على الـ workers (تفصيلة من الكتاب)'), right: t('Every processor performs all tasks, including OS work', 'كل processor بيعمل كل المهام، ومنها شغل الـ OS') },
        { aspect: 'Memory', left: t('Shared', 'مشتركة'), right: t('One shared physical memory', 'Physical memory واحدة مشتركة') },
        { aspect: 'Per CPU', left: t('—', '—'), right: t('Its own **registers** and **cache**', '**Registers** و**cache** خاصين بيه') },
      ],
    },

    part(
      t('Multi-core chips, UMA and NUMA', 'الـ multi-core chips وUMA وNUMA'),
      t('The same idea, packed differently.', 'نفس الفكرة، بس متغلّفة بشكل مختلف.'),
    ),
    {
      kind: 'versus',
      left: { title: 'Multiprocessor', icon: 'cpu', tone: 'violet', tagline: t('Multiple chips, each with a single core', 'كذا chip، كل واحدة فيها core واحد') },
      right: { title: 'Multi-core', icon: 'chip', tone: 'cyan', tagline: t('Multiple cores on a single chip', 'كذا core على chip واحدة') },
      rows: [
        { aspect: 'Packaging', left: t('Separate processor chips', 'Chips منفصلة'), right: t('One chip; e.g. the dual-core design', 'Chip واحدة؛ زي الـ dual-core design في المحاضرة') },
        { aspect: 'Per unit', left: t('Registers + cache per processor', 'Registers + cache لكل processor'), right: t('Registers + cache per core', 'Registers + cache لكل core') },
        { aspect: 'Talk between', left: t('Across chips — slower', 'بين chips — أبطأ'), right: t('On-chip — faster, and uses less power (textbook detail)', 'جوه الـ chip — أسرع، وبيستهلك كهربا أقل (تفصيلة من الكتاب)') },
        { aspect: 'Relationship', left: t('A multiprocessor system', 'Multiprocessor system'), right: t('Also a multiprocessor — the cores are the processors', 'برضه multiprocessor — الـ cores هي الـ processors') },
      ],
    },
    {
      kind: 'cards',
      columns: 3,
      items: [
        {
          icon: 'scale',
          title: 'UMA',
          tag: 'uniform memory access',
          body: t('Every CPU reaches any memory location in the same time.', 'كل CPU بتوصل لأي مكان في الـ memory في نفس الوقت.'),
          tone: 'teal',
        },
        {
          icon: 'split',
          title: 'NUMA',
          tag: 'non-uniform memory access',
          body: t('Some memory is local and faster, some is remote and slower.', 'جزء من الـ memory local وأسرع، وجزء remote وأبطأ.'),
          tone: 'violet',
        },
        {
          icon: 'server',
          title: 'Blade servers',
          tag: 'one chassis',
          body: t('A **chassis holding multiple independent multiprocessor systems** — versus systems containing all chips.', '**Chassis فيه كذا multiprocessor system مستقل** — مقابل أنظمة فيها كل الـ chips.'),
          tone: 'amber',
        },
      ],
    },

    part(
      t('Clustered systems', 'الـ clustered systems'),
      t('Like multiprocessor systems, but **multiple systems working together**.', 'زي الـ multiprocessor systems، بس **كذا نظام كامل بيشتغلوا مع بعض**.'),
    ),
    {
      kind: 'definition',
      term: 'Clustered system',
      definition: t(
        'Multiple computer systems working together, usually **sharing storage via a storage-area network (SAN)**, providing a **high-availability** service that survives failures.',
        'كذا computer system بيشتغلوا مع بعض، وغالبًا **بيشاركوا الـ storage عن طريق storage-area network (SAN)**، وبيقدّموا خدمة **high-availability** تستحمل الأعطال.',
      ),
    },
    {
      kind: 'versus',
      left: { title: 'Asymmetric clustering', icon: 'eye', tone: 'amber', tagline: t('One machine waits in **hot-standby mode**', 'جهاز واحد مستني في **hot-standby mode**') },
      right: { title: 'Symmetric clustering', icon: 'users', tone: 'teal', tagline: t('**Multiple nodes run applications**', '**كذا node بيشغّلوا applications**') },
      rows: [
        { aspect: 'Normal work', left: t('One node runs the applications; the standby only monitors', 'Node واحدة بتشغّل الـ applications؛ والـ standby بيراقب بس'), right: t('All nodes run applications and **monitor each other**', 'كل الـ nodes بتشغّل applications و**بتراقب بعض**') },
        { aspect: 'On failure', left: t('The hot-standby machine takes over', 'جهاز الـ hot-standby بياخد المكان'), right: t('Surviving nodes absorb the work', 'الـ nodes اللي فاضلة بتشيل الشغل') },
        { aspect: 'Hardware use', left: t('Standby is idle most of the time', 'الـ standby قاعد فاضي معظم الوقت'), right: t('All hardware is used', 'كل الـ hardware مستخدم') },
      ],
    },
    {
      kind: 'cards',
      columns: 3,
      items: [
        {
          icon: 'database',
          title: 'SAN',
          tag: 'storage-area network',
          body: t('Shared storage that all cluster nodes can reach (the lecture’s diagram).', 'Storage مشترك كل الـ nodes توصله (رسمة المحاضرة).'),
          tone: 'violet',
        },
        {
          icon: 'gauge',
          title: 'HPC clusters',
          tag: 'high-performance computing',
          body: t('Some clusters exist for speed; **applications must be written to use parallelization**.', 'في clusters معمولة عشان السرعة؛ **والـ applications لازم تتكتب بحيث تستخدم الـ parallelization**.'),
          tone: 'cyan',
        },
        {
          icon: 'lock',
          title: 'DLM',
          tag: 'distributed lock manager',
          body: t('Some clusters have a DLM **to avoid conflicting operations** on shared data.', 'بعض الـ clusters فيها DLM **عشان تمنع العمليات المتعارضة** على الداتا المشتركة.'),
          tone: 'rose',
        },
      ],
    },
    {
      kind: 'confusions',
      items: [
        {
          wrong: t('“Multiprocessors have a separate clock, memory and peripherals for each CPU.”', '“الـ multiprocessors لكل CPU فيها clock وmemory وperipherals منفصلين.”'),
          right: t('Processors are in close communication and **share** the bus — and usually the clock, memory and peripherals.', 'الـ processors متواصلين بشكل قريب و**بيشاركوا** الـ bus — وغالبًا الـ clock والـ memory والـ peripherals.'),
        },
        {
          wrong: t('“Adding processors lowers reliability — more parts can fail.”', '“زيادة الـ processors بتقلل الـ reliability — أجزاء أكتر ممكن تبوظ.”'),
          right: t('Reliability **increases**: the failure of one processor does not halt the system.', 'الـ reliability **بتزيد**: وقوع processor واحد ما بيوقفش النظام.'),
        },
        {
          wrong: t('“Multi-core means several computers.”', '“Multi-core يعني كذا كمبيوتر.”'),
          right: t('Multi-core = cores on **one chip**; several computers together = **cluster**.', 'Multi-core = cores على **chip واحدة**؛ وكذا كمبيوتر مع بعض = **cluster**.'),
        },
      ],
    },
    {
      kind: 'exam',
      title: t('Exam radar: architecture', 'رادار الامتحان: المعمارية'),
      body: t(
        'Four items: two T/F statements that each twist one fact (what multiprocessors share; whether reliability goes up or down), a fill-in naming the two multiprocessing types, and a written “difference between multiprocessors and multi-core”. For the written one, contrast packaging (chips vs cores on one chip) and state that a multi-core chip is itself a multiprocessor.',
        'أربع أسئلة: جملتين T/F كل واحدة بتلف حقيقة (الـ multiprocessors بتشارك إيه؛ والـ reliability بتزيد ولا بتقل)، وfill-in بيسمّي نوعين الـ multiprocessing، وسؤال مكتوب “الفرق بين multiprocessors وmulti-core”. في المكتوب قارن التغليف (chips مقابل cores على chip واحدة) وقول إن الـ multi-core chip هي نفسها multiprocessor.',
      ),
      refs: ['s3-multiprocessor-tf', 's3-reliability-tf', 's3-smp-fill', 's3-multicore-short'],
    },
    {
      kind: 'recap',
      items: [
        t('Multiprocessor = parallel = multicore systems; processors share bus, clock, memory, peripherals.', 'Multiprocessor = parallel = multicore systems؛ الـ processors بيشاركوا الـ bus والـ clock والـ memory والـ peripherals.'),
        t('Advantages: throughput, economy of scale, reliability (graceful degradation / fault tolerance).', 'المميزات: throughput وeconomy of scale وreliability (graceful degradation / fault tolerance).'),
        t('Types: asymmetric and symmetric multiprocessing.', 'الأنواع: asymmetric وsymmetric multiprocessing.'),
        t('SMP: each CPU has its own registers + cache; one shared memory.', 'الـ SMP: كل CPU ليها registers + cache؛ وmemory واحدة مشتركة.'),
        t('Multi-core: many cores on one chip; UMA vs NUMA memory access.', 'Multi-core: كذا core على chip واحدة؛ وUMA مقابل NUMA.'),
        t('Cluster: whole systems + SAN; asymmetric (hot standby) or symmetric; HPC; DLM.', 'Cluster: أنظمة كاملة + SAN؛ asymmetric (hot standby) أو symmetric؛ HPC؛ DLM.'),
      ],
    },
  ],
  examFocus: [
    t('Multiprocessor advantages: increased throughput, economy of scale, increased reliability (graceful degradation / fault tolerance).', 'مميزات الـ multiprocessor: throughput أعلى، economy of scale، reliability أعلى (graceful degradation / fault tolerance).'),
    t('The two types are asymmetric and symmetric multiprocessing; in SMP each CPU has private registers and cache over shared memory.', 'النوعين هما asymmetric وsymmetric multiprocessing؛ وفي الـ SMP كل CPU ليها registers وcache خاصين فوق memory مشتركة.'),
    t('Multiprocessor vs multi-core: multiple single-core chips vs multiple cores on one chip.', 'Multiprocessor مقابل multi-core: كذا chip بـ core واحد مقابل كذا core على chip واحدة.'),
    t('Clusters share storage through a SAN; asymmetric clustering uses a hot-standby machine.', 'الـ clusters بتشارك الـ storage عن طريق SAN؛ والـ asymmetric clustering فيه جهاز hot-standby.'),
  ],
  keyTerms: [
    { term: 'Multiprocessor system', definition: t('Two or more processors in close communication, sharing the bus and usually memory.', 'اتنين processors أو أكتر متواصلين بشكل قريب وبيشاركوا الـ bus وغالبًا الـ memory.') },
    { term: 'Graceful degradation', definition: t('Continuing to work, at reduced capacity, after a component fails.', 'إن النظام يكمل شغل بقدرة أقل بعد ما جزء يبوظ.') },
    { term: 'SMP', definition: t('Symmetric multiprocessing: peer processors sharing one memory.', 'Symmetric multiprocessing: processors متساويين بيشاركوا memory واحدة.') },
    { term: 'Multi-core', definition: t('Multiple CPU cores on a single chip.', 'كذا CPU core على chip واحدة.') },
    { term: 'NUMA', definition: t('Non-uniform memory access: local memory faster than remote.', 'Non-uniform memory access: الـ memory الـ local أسرع من الـ remote.') },
    { term: 'Clustered system', definition: t('Multiple systems working together, usually sharing storage via a SAN.', 'كذا نظام بيشتغلوا مع بعض، وغالبًا بيشاركوا storage عن طريق SAN.') },
  ],
}
