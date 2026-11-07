import type { Section } from '../../types'
import { part, t } from './helpers'

/** Slides 16–19 and 41–42: storage structure, hierarchy, caching, cache management, migration. */
export const storageCaching: Section = {
  id: 'storage-caching',
  order: 3,
  kicker: 'Lesson 03',
  title: 'Storage Structure, Hierarchy & Caching',
  shortTitle: 'Storage & Caching',
  summary: t(
    'Why there is not just one kind of memory: the CPU can only reach main memory directly, storage is arranged in a speed–cost–volatility pyramid, and caching copies what is in use into a faster level.',
    'ليه مفيش نوع memory واحد بس: الـ CPU توصل للـ main memory بس مباشرة، والـ storage مترتب في هرم سرعة–تكلفة–volatility، والـ caching بينسخ اللي بيتستخدم لمستوى أسرع.',
  ),
  objectives: [
    t('Compare main memory with secondary storage (direct access, volatility, capacity).', 'تقارن الـ main memory بالـ secondary storage (الوصول المباشر، الـ volatility، السعة).'),
    t('Describe magnetic disks (platters, tracks, sectors, controller) and solid-state disks.', 'توصف الـ magnetic disks (platters وtracks وsectors وcontroller) والـ solid-state disks.'),
    t('Order the storage hierarchy and read the lecture’s table: size, access time, manager, backing store.', 'ترتب الـ storage hierarchy وتقرا جدول الحجم، الـ access time، مين بيديره، وإيه اللي وراه.'),
    t('Define caching and explain hits, misses, cache size and replacement policy.', 'تعرّف الـ caching وتشرح الـ hits والـ misses وحجم الـ cache والـ replacement policy.'),
    t('Explain data migration and why multiprocessors need cache coherency.', 'تشرح نقل الداتا بين المستويات وليه الـ multiprocessors محتاجة cache coherency.'),
  ],
  estimatedMinutes: 15,
  quizId: 'quiz-storage-caching',
  blocks: [
    part(
      t('Storage structure', 'تركيب الـ storage'),
      t('One storage the CPU can touch directly, and the larger storage behind it.', 'Storage واحد الـ CPU تلمسه مباشرة، والـ storage الأكبر اللي وراه.'),
    ),
    {
      kind: 'versus',
      left: { title: 'Main memory', icon: 'memory', tone: 'teal', tagline: t('Where programs actually run', 'المكان اللي البرامج بتشتغل فيه فعلًا') },
      right: { title: 'Secondary storage', icon: 'disk', tone: 'violet', tagline: t('An extension of main memory', 'امتداد للـ main memory') },
      rows: [
        { aspect: 'CPU access', left: t('The **only large storage the CPU can access directly**', '**الـ storage الكبير الوحيد اللي الـ CPU توصله مباشرة**'), right: t('Not directly — data is first brought into memory', 'مش مباشرة — الداتا لازم تتنقل للـ memory الأول') },
        { aspect: 'Access', left: t('**Random access**', '**Random access**'), right: t('Depends on the device (disk, SSD…)', 'حسب الجهاز (disk وSSD…)') },
        { aspect: 'Volatility', left: t('Typically **volatile** — lost at power-off', 'غالبًا **volatile** — بتضيع لما الجهاز يطفي'), right: t('**Nonvolatile** — survives power-off', '**Nonvolatile** — بتفضل بعد ما الجهاز يطفي') },
        { aspect: 'Capacity', left: t('Smaller', 'أصغر'), right: t('**Large** storage capacity', 'سعة **كبيرة**') },
      ],
    },
    {
      kind: 'cards',
      title: t('Two kinds of secondary storage', 'نوعين من الـ secondary storage'),
      columns: 2,
      items: [
        {
          icon: 'disk',
          title: 'Magnetic disks',
          tag: 'rigid platters',
          body: t(
            'Rigid metal or glass **platters** covered with magnetic recording material. Each disk surface is logically divided into **tracks**, which are subdivided into **sectors**. The **disk controller** determines the logical interaction between the device and the computer.',
            '**Platters** من معدن أو زجاج متغطية بمادة تسجيل مغناطيسية. كل سطح متقسم منطقيًا لـ **tracks**، وكل track متقسم لـ **sectors**. والـ **disk controller** هو اللي بيحدد التعامل المنطقي بين الجهاز والكمبيوتر.',
          ),
          chips: ['platter', 'track', 'sector', 'disk controller'],
          tone: 'violet',
        },
        {
          icon: 'zap',
          title: 'Solid-state disks',
          tag: 'SSD',
          body: t(
            '**Faster than magnetic disks**. Built with various technologies and becoming more popular.',
            '**أسرع من الـ magnetic disks**. معمولة بتقنيات مختلفة وبتنتشر أكتر.',
          ),
          chips: ['faster', 'nonvolatile', 'flash memory'],
          tone: 'cyan',
        },
      ],
    },

    part(
      t('The storage hierarchy', 'الـ storage hierarchy'),
      t(
        'Storage systems are organized in a hierarchy by **speed, cost and volatility**.',
        'أنظمة التخزين مترتبة في hierarchy حسب **السرعة والتكلفة والـ volatility**.',
      ),
    ),
    {
      kind: 'visual',
      id: 'storage-pyramid',
      title: t('Storage-device hierarchy: click a level', 'الـ storage-device hierarchy: دوس على أي مستوى'),
      caption: t(
        'Going down: slower, larger, cheaper per byte. The dashed line marks where storage stops being volatile.',
        'وأنت نازل: أبطأ، أكبر، أرخص لكل byte. والخط المتقطع بيوضّح فين الـ storage بيبطّل يبقى volatile.',
      ),
    },
    {
      kind: 'stats',
      title: t('Feel the gaps (access times)', 'حس بالفرق (الـ access times)'),
      items: [
        { value: '0.25 ns', label: t('register access — the fastest level', 'الوصول للـ register — أسرع مستوى'), icon: 'zap', tone: 'cyan' },
        { value: '80–250 ns', label: t('main memory — the CPU’s direct storage', 'الـ main memory — الـ storage المباشر للـ CPU'), icon: 'memory', tone: 'teal' },
        { value: '5,000,000 ns', label: t('magnetic disk — 5 milliseconds', 'الـ magnetic disk — 5 milliseconds'), icon: 'disk', tone: 'rose' },
        { value: '×10⁷', label: t('disk vs register: ten million times slower', 'الـ disk مقابل الـ register: أبطأ بعشرة مليون مرة'), icon: 'trending', tone: 'amber' },
      ],
    },
    {
      kind: 'table',
      caption: t(
        'The full table. The values are representative of the textbook’s era, not universal constants. (The transcript prints “CMOS SRAM” for main memory; the textbook figure shows DRAM.)',
        'المحاضرة كامل. القيم تمثيلية لوقت الكتاب، مش ثوابت عالمية. (نص المحاضرة مكتوب فيه “CMOS SRAM” للـ main memory؛ لكن شكل الكتاب مكتوب فيه DRAM.)',
      ),
      headers: ['Level', 'Name', 'Typical size', 'Technology', 'Access (ns)', 'Bandwidth (MB/s)', 'Managed by', 'Backed by'],
      rows: [
        [t('1'), t('Registers'), t('< 1 KB'), t('custom memory, multiple ports, CMOS'), t('0.25 – 0.5'), t('20,000 – 100,000'), t('compiler'), t('cache')],
        [t('2'), t('Cache'), t('< 16 MB'), t('on-/off-chip CMOS SRAM'), t('0.5 – 25'), t('5,000 – 10,000'), t('hardware'), t('main memory')],
        [t('3'), t('Main memory'), t('< 64 GB'), t('CMOS DRAM'), t('80 – 250'), t('1,000 – 5,000'), t('operating system'), t('disk')],
        [t('4'), t('Solid-state disk'), t('< 1 TB'), t('flash memory'), t('25,000 – 50,000'), t('500'), t('operating system'), t('disk')],
        [t('5'), t('Magnetic disk'), t('< 10 TB'), t('magnetic disk'), t('5,000,000'), t('20 – 150'), t('operating system'), t('disk or tape')],
      ],
    },
    {
      kind: 'hook',
      title: t('Who manages each level? (row “Managed by”)', 'مين بيدير كل مستوى؟ (صف “Managed by”)'),
      phrase: 'Compiler, Hardware, then the OS all the way down.',
      letters: [
        { letter: 'C', word: 'registers → compiler' },
        { letter: 'H', word: 'cache → hardware' },
        { letter: 'O', word: 'main memory, SSD, disk → operating system' },
      ],
    },

    part(
      t('Caching', 'الـ caching'),
      t('An important principle, performed at many levels — in hardware, the OS and software.', 'مبدأ مهم بيتعمل على مستويات كتير — في الـ hardware والـ OS والـ software.'),
    ),
    {
      kind: 'definition',
      term: 'Caching',
      definition: t(
        'Copying information that is **in use** from a **slower** storage system into a **faster** one, **temporarily**.',
        'نسخ المعلومات اللي **بتتستخدم حاليًا** من storage **أبطأ** لـ storage **أسرع**، **بشكل مؤقت**.',
      ),
      detail: t(
        'Main memory itself can be viewed as a cache for secondary storage.',
        'الـ main memory نفسها ممكن نعتبرها cache للـ secondary storage.',
      ),
    },
    {
      kind: 'flow',
      title: t('Every access, in order', 'كل access بالترتيب'),
      steps: [
        { icon: 'search', label: 'Check the cache first', detail: t('The faster storage is checked first.', 'الـ storage الأسرع بيتشيك الأول.'), tone: 'cyan' },
        { icon: 'check', label: 'Hit → use it', detail: t('If the information is there, it is used **directly from the cache** (fast).', 'لو المعلومة موجودة، بتتستخدم **مباشرة من الـ cache** (سريع).'), tone: 'teal' },
        { icon: 'refresh', label: 'Miss → copy, then use', detail: t('If not, the data is **copied to the cache and used there**.', 'لو مش موجودة، الداتا **بتتنسخ للـ cache وتتستخدم من هناك**.'), tone: 'amber' },
        { icon: 'trash', label: 'Full → replace', detail: t('The cache is smaller than what it caches, so something must leave.', 'الـ cache أصغر من اللي بيعمله cache، فلازم حاجة تخرج.'), tone: 'rose' },
      ],
    },
    {
      kind: 'visual',
      id: 'cache-lookup',
      title: t('Cache simulator: hits, misses and replacement', 'محاكي الـ cache: hits وmisses وreplacement'),
      caption: t(
        'Play the same request string under both policies. The hit rate changes even though nothing else did — that is the “replacement policy” design problem.',
        'شغّل نفس سلسلة الطلبات بالسياستين. الـ hit rate بيتغير مع إن مفيش حاجة تانية اتغيرت — ودي مشكلة تصميم الـ “replacement policy” في المحاضرة.',
      ),
    },
    {
      kind: 'cards',
      title: t('Cache management: the two design decisions', 'إدارة الـ cache: قرارين تصميم'),
      columns: 2,
      items: [
        {
          icon: 'gauge',
          title: 'Cache size',
          body: t('How much faster storage to spend. Too small and useful data keeps being evicted.', 'هتصرف قد إيه من الـ storage الأسرع. لو صغيرة أوي الداتا المفيدة هتفضل تتطرد.'),
          tone: 'cyan',
        },
        {
          icon: 'repeat',
          title: 'Replacement policy',
          body: t('Which entry leaves when the cache is full. Careful selection of size and policy **can result in greatly increased performance**.', 'أنهي entry تخرج لما الـ cache يتملي. الاختيار الكويس للحجم والسياسة **ممكن يزوّد الأداء جدًا**.'),
          tone: 'violet',
        },
      ],
    },

    part(
      t('Moving data through the hierarchy', 'حركة الداتا في الـ hierarchy'),
      t(
        'Movement between levels can be **explicit or implicit** — and every copy must stay consistent.',
        'الحركة بين المستويات ممكن تبقى **explicit أو implicit** — وكل نسخة لازم تفضل متسقة.',
      ),
    ),
    {
      kind: 'flow',
      title: t('Migration of integer A from disk to register', 'رحلة الـ integer A من الـ disk للـ register'),
      steps: [
        { icon: 'disk', label: 'Magnetic disk', detail: t('A starts here.', 'الـ A بيبدأ هنا.'), tone: 'rose' },
        { icon: 'memory', label: 'Main memory', detail: t('Copied in by the OS.', 'بيتنسخ هنا عن طريق الـ OS.'), tone: 'teal' },
        { icon: 'zap', label: 'Cache', detail: t('Copied in by the hardware.', 'بيتنسخ هنا عن طريق الـ hardware.'), tone: 'cyan' },
        { icon: 'chip', label: 'Hardware register', detail: t('Used by the instruction.', 'بتستخدمه الـ instruction.'), tone: 'violet' },
      ],
      caption: t(
        'After the trip, A exists in up to four places at once. If one copy changes, the others are stale.',
        'بعد الرحلة دي، الـ A موجود في لحد أربع أماكن في نفس الوقت. لو نسخة اتغيرت، الباقي بيبقى قديم.',
      ),
    },
    {
      kind: 'cards',
      title: t('Keeping the most recent value', 'الحفاظ على أحدث قيمة'),
      columns: 3,
      items: [
        {
          icon: 'layers',
          tag: 'multitasking',
          title: 'Use the latest copy',
          body: t('Multitasking environments must be careful to use the **most recent value, no matter where it is stored** in the hierarchy.', 'بيئات الـ multitasking لازم تاخد بالها تستخدم **أحدث قيمة، مهما كانت متخزنة فين** في الـ hierarchy.'),
          tone: 'cyan',
        },
        {
          icon: 'cpu',
          tag: 'multiprocessor',
          title: 'Cache coherency',
          body: t('A multiprocessor must provide **cache coherency in hardware**, so all CPUs have the most recent value in their caches.', 'الـ multiprocessor لازم يوفّر **cache coherency في الـ hardware**، عشان كل الـ CPUs يبقى عندهم أحدث قيمة في الـ caches.'),
          tone: 'violet',
        },
        {
          icon: 'network',
          tag: 'distributed',
          title: 'Even harder',
          body: t('In a distributed environment **several copies of a datum can exist** on different machines.', 'في البيئة الـ distributed ممكن **يبقى فيه نسخ كتير من نفس الداتا** على أجهزة مختلفة.'),
          tone: 'amber',
        },
      ],
    },
    {
      kind: 'confusions',
      items: [
        {
          wrong: t('“The CPU can execute an instruction straight from the disk.”', '“الـ CPU تقدر تنفّذ instruction من الـ disk على طول.”'),
          right: t('Only **main memory** is large storage the CPU accesses directly; disk contents must be brought into memory first.', 'الـ **main memory** بس هي الـ storage الكبير اللي الـ CPU توصله مباشرة؛ ومحتوى الـ disk لازم يتنقل للـ memory الأول.'),
        },
        {
          wrong: t('“Caching moves data to the faster level.”', '“الـ caching بينقل الداتا للمستوى الأسرع.”'),
          right: t('Caching **copies** it there **temporarily**; the original stays in the slower level.', 'الـ caching بي**نسخها** هناك **بشكل مؤقت**؛ والأصل بيفضل في المستوى الأبطأ.'),
        },
        {
          wrong: t('“The OS manages the CPU cache.”', '“الـ OS هو اللي بيدير الـ CPU cache.”'),
          right: t('Per the lecture the cache is managed by **hardware**; registers by the **compiler**; main memory and below by the **OS**.', 'حسب المحاضرة الـ cache بيديره الـ **hardware**؛ والـ registers الـ **compiler**؛ والـ main memory وتحت الـ **OS**.'),
        },
      ],
    },
    {
      kind: 'exam',
      title: t('Exam radar: storage and caching', 'رادار الامتحان: الـ storage والـ caching'),
      body: t(
        'Past papers ask you to complete the lecture’s definition of caching word for word, to define caching briefly, and to judge a statement about which storage the processor can reach directly. Learn the definition’s four ingredients: **in use · slower → faster · copied · temporarily**.',
        'الامتحانات القديمة بتطلب تكمّل تعريف الـ caching بتاع المحاضرة بالحرف، وتعرّف الـ caching باختصار، وتحكم على جملة عن أنهي storage الـ processor توصله مباشرة. احفظ مكونات التعريف الأربعة: **in use · slower → faster · copied · temporarily**.',
      ),
      refs: ['s9-caching-fill', 's9-define-caching', 's9-main-memory-tf'],
    },
    {
      kind: 'recap',
      items: [
        t('Main memory: only large storage the CPU reaches directly; random access; volatile.', 'الـ main memory: الـ storage الكبير الوحيد اللي الـ CPU توصله مباشرة؛ random access؛ volatile.'),
        t('Disk: platters → tracks → sectors; SSD is faster.', 'الـ disk: platters ← tracks ← sectors؛ والـ SSD أسرع.'),
        t('Hierarchy by speed, cost, volatility: registers → cache → memory → SSD → disk → optical → tape.', 'الـ hierarchy حسب السرعة والتكلفة والـ volatility: registers ← cache ← memory ← SSD ← disk ← optical ← tape.'),
        t('Caching: copy in-use data from slower to faster storage, temporarily.', 'الـ caching: نسخ الداتا المستخدمة من storage أبطأ لأسرع، بشكل مؤقت.'),
        t('Cache first → hit uses it; miss copies it in; size + replacement policy matter.', 'الـ cache الأول ← hit يستخدمها؛ miss ينسخها؛ والحجم والسياسة مهمين.'),
        t('Multiprocessors need hardware cache coherency.', 'الـ multiprocessors محتاجة cache coherency في الـ hardware.'),
      ],
    },
  ],
  examFocus: [
    t('Main memory is the only large storage the CPU can access directly; it is random access and typically volatile.', 'الـ main memory هي الـ storage الكبير الوحيد اللي الـ CPU توصله مباشرة؛ random access وغالبًا volatile.'),
    t('Caching = copying in-use information from slower to faster storage temporarily; the cache is checked first.', 'الـ caching = نسخ المعلومات المستخدمة من storage أبطأ لأسرع بشكل مؤقت؛ والـ cache بيتشيك الأول.'),
    t('The cache is smaller than what it caches, so cache size and replacement policy are design problems.', 'الـ cache أصغر من اللي بيعمله cache، فحجمه والـ replacement policy مشاكل تصميم.'),
    t('“Managed by”: compiler (registers), hardware (cache), OS (memory, SSD, disk).', '“Managed by” في compiler (registers)، hardware (cache)، OS (memory وSSD وdisk).'),
  ],
  keyTerms: [
    { term: 'Main memory', definition: t('Only large storage the CPU can access directly; random access, typically volatile.', 'الـ storage الكبير الوحيد اللي الـ CPU توصله مباشرة؛ random access، وغالبًا volatile.') },
    { term: 'Secondary storage', definition: t('Extension of main memory that provides large nonvolatile capacity.', 'امتداد للـ main memory بيوفّر سعة nonvolatile كبيرة.') },
    { term: 'Track / sector', definition: t('A disk surface is divided into tracks; each track into sectors.', 'سطح الـ disk متقسم لـ tracks؛ وكل track لـ sectors.') },
    { term: 'Caching', definition: t('Temporarily copying in-use information from slower to faster storage.', 'نسخ المعلومات المستخدمة مؤقتًا من storage أبطأ لأسرع.') },
    { term: 'Replacement policy', definition: t('Rule for choosing what leaves a full cache.', 'القاعدة اللي بتحدد إيه اللي يخرج من cache مليان.') },
    { term: 'Cache coherency', definition: t('Hardware guarantee that all CPUs see the most recent value.', 'ضمان من الـ hardware إن كل الـ CPUs تشوف أحدث قيمة.') },
  ],
}
