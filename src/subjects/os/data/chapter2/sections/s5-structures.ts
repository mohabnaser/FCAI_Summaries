import type { Section } from '../../../types'
import { part, t } from '../../sections/helpers'

/** Slides 33–46: simple, UNIX, layered, microkernel, modules, hybrid; Mac OS X, iOS, Android. */
export const structures: Section = {
  id: 'c2-structures',
  chapterId: 'chapter-2',
  order: 5,
  kicker: 'Lesson 05',
  title: 'Operating-System Structures',
  shortTitle: 'OS Structures',
  summary: t(
    'A general-purpose OS is a very large program, so how is it organised? Simple (MS-DOS), traditional UNIX, layered, microkernel, loadable modules and — what real systems use — hybrids such as Mac OS X, iOS and Android.',
    'الـ OS العام برنامج ضخم جدًا، فبيتنظم إزاي؟ Simple (MS-DOS)، والـ UNIX التقليدي، وlayered، وmicrokernel، وloadable modules، و— اللي الأنظمة الحقيقية بتستخدمه — الـ hybrids زي Mac OS X وiOS وAndroid.',
  ),
  objectives: [
    t('Name the five ways of structuring an OS listed.', 'تذكر الخمس طرق لتنظيم الـ OS اللي في المحاضرة.'),
    t('Describe MS-DOS and traditional UNIX and why neither is fully layered.', 'توصف MS-DOS والـ UNIX التقليدي وليه ولا واحد فيهم layered بالكامل.'),
    t('Explain the layered approach: layer 0 hardware, layer N user interface.', 'تشرح الـ layered approach: layer 0 الـ hardware، وlayer N الـ user interface.'),
    t('Give the benefits and the cost of a microkernel, and how its modules communicate.', 'تذكر مميزات وعيب الـ microkernel، وإزاي الـ modules بتاعته بتتواصل.'),
    t('Explain loadable kernel modules and classify Linux, Windows and Mac OS X as hybrids.', 'تشرح الـ loadable kernel modules وتصنّف Linux وWindows وMac OS X كـ hybrids.'),
    t('Read the Mac OS X, iOS and Android layer stacks.', 'تقرا الـ layer stacks بتوع Mac OS X وiOS وAndroid.'),
  ],
  estimatedMinutes: 22,
  quizId: 'quiz-c2-structures',
  crossRefQuestionIds: ['s1-kernel-not-true'],
  blocks: [
    part(
      t('Five ways to structure an OS', 'خمس طرق لتنظيم الـ OS'),
      t('A general-purpose OS is a very large program. Various ways to structure one:', 'الـ OS العام برنامج ضخم جدًا. وفيه طرق مختلفة لتنظيمه:'),
    ),
    {
      kind: 'flow',
      steps: [
        { icon: 'boxes', label: 'Simple structure', detail: t('MS-DOS', 'MS-DOS'), tone: 'rose' },
        { icon: 'layers', label: 'Layered approach', detail: t('Layer 0 … layer N', 'Layer 0 … layer N'), tone: 'amber' },
        { icon: 'chip', label: 'Microkernel', detail: t('Mach', 'Mach'), tone: 'violet' },
        { icon: 'puzzle', label: 'Modules', detail: t('Linux, Solaris', 'Linux وSolaris'), tone: 'teal' },
        { icon: 'split', label: 'Hybrid systems', detail: t('Most modern OSs', 'معظم الـ OSs الحديثة'), tone: 'cyan' },
      ],
    },
    {
      kind: 'visual',
      id: 'os-structure-explorer',
      title: t('Structure explorer: compare every diagram', 'مستكشف التنظيم: قارن كل رسومات المحاضرة'),
      caption: t(
        'Each tab redraws one of the lecture’s diagrams. In the layered and microkernel tabs, send a request and watch which way it is allowed to travel.',
        'كل tab بيرسم رسمة من رسومات المحاضرة. في tabs الـ layered والـ microkernel ابعت request وشوف مسموح له يمشي في أنهي اتجاه.',
      ),
    },

    part(
      t('Simple structure: MS-DOS and traditional UNIX', 'الـ Simple structure: MS-DOS والـ UNIX التقليدي'),
      t('Little separation between levels.', 'فصل قليل بين المستويات.'),
    ),
    {
      kind: 'layers',
      title: t('MS-DOS layer structure', 'تنظيم طبقات MS-DOS'),
      caption: t(
        'Written to provide **the most functionality in the least space**. Not divided into modules; although it has some structure, its **interfaces and levels of functionality are not well separated** — an application can reach the device drivers, and even the ROM BIOS, directly.',
        'اتكتب عشان يدّي **أكبر قدر من الوظايف في أقل مساحة**. مش متقسم لـ modules؛ ومع إن فيه شوية تنظيم، **الـ interfaces ومستويات الوظايف مش مفصولة كويس** — الـ application ممكن توصل للـ device drivers، وحتى للـ ROM BIOS، مباشرة.',
      ),
      layers: [
        { label: 'application program', tone: 'amber', icon: 'app' },
        { label: 'resident system program', tone: 'violet', icon: 'settings' },
        { label: 'MS-DOS device drivers', tone: 'cyan', icon: 'code' },
        { label: 'ROM BIOS device drivers', tone: 'rose', icon: 'chip' },
      ],
    },
    {
      kind: 'layers',
      title: t('Traditional UNIX system structure', 'تنظيم نظام UNIX التقليدي'),
      caption: t(
        'UNIX was limited by hardware functionality. It has **two separable parts — systems programs and the kernel**. The kernel is everything below the system-call interface and above the hardware, with **a large number of functions for one level**: “beyond simple but not fully layered”.',
        'الـ UNIX كان محدود بإمكانيات الـ hardware. وليه **جزئين منفصلين — systems programs والـ kernel**. الـ kernel هو كل حاجة تحت الـ system-call interface وفوق الـ hardware، وفيه **عدد كبير من الوظايف في مستوى واحد**: “beyond simple but not fully layered”.',
      ),
      layers: [
        { label: '(the users)', tone: 'amber', icon: 'users' },
        { label: 'shells and commands · compilers and interpreters · system libraries', tone: 'violet', icon: 'terminal' },
        { label: 'system-call interface to the kernel', tone: 'cyan', icon: 'link' },
        {
          label: 'Kernel',
          tone: 'teal',
          icon: 'chip',
          detail: t('One big level holding every OS function.', 'مستوى واحد كبير فيه كل وظايف الـ OS.'),
          chips: ['signals, terminal handling', 'character I/O, terminal drivers', 'file system', 'swapping, block I/O', 'disk & tape drivers', 'CPU scheduling', 'page replacement', 'demand paging', 'virtual memory'],
        },
        { label: 'kernel interface to the hardware', tone: 'cyan', icon: 'link' },
        { label: 'terminal controllers · device controllers · memory controllers', tone: 'rose', icon: 'cpu', chips: ['terminals', 'disks and tapes', 'physical memory'] },
      ],
    },

    part(
      t('The layered approach', 'الـ Layered approach'),
      t('The OS is divided into a number of layers (levels), each built on top of lower layers.', 'الـ OS متقسم لعدد من الـ layers (مستويات)، كل واحدة مبنية فوق اللي تحتها.'),
    ),
    {
      kind: 'layers',
      axis: { top: 'layer N', bottom: 'layer 0' },
      layers: [
        { label: 'Layer N — user interface', tone: 'amber', icon: 'user', detail: t('The highest layer.', 'أعلى layer.') },
        { label: '⋮', tone: 'violet' },
        { label: 'Layer 1', tone: 'cyan', detail: t('Uses only layer 0.', 'بتستخدم layer 0 بس.') },
        { label: 'Layer 0 — hardware', tone: 'rose', icon: 'cpu', detail: t('The bottom layer.', 'أسفل layer.') },
      ],
      caption: t(
        'With modularity, layers are selected so that **each uses functions (operations) and services of only lower-level layers**. (The lecture draws them as concentric rings with hardware at the centre.)',
        'مع الـ modularity، الـ layers بتتختار بحيث **كل واحدة تستخدم functions وservices من الـ layers اللي تحتها بس**. (المحاضرة راسماهم كحلقات حوالين بعض والـ hardware في النص.)',
      ),
    },
    {
      kind: 'hook',
      title: t('Which end is which?', 'أنهي طرف فين؟'),
      phrase: 'Zero is the hardware; N is the human.',
      body: t('Layer 0 = hardware at the bottom (centre); layer N = user interface at the top (outside).', 'Layer 0 = الـ hardware تحت (في النص)؛ وlayer N = الـ user interface فوق (برّه).'),
    },

    part(
      t('Microkernel', 'الـ Microkernel'),
      t('Move as much as possible from the kernel into user space.', 'انقل أكبر قدر ممكن من الـ kernel للـ user space.'),
    ),
    {
      kind: 'layers',
      title: t('Microkernel system structure', 'تنظيم نظام الـ Microkernel'),
      layers: [
        { label: 'User mode', tone: 'amber', icon: 'user', chips: ['Application Program', 'File System', 'Device Driver'], detail: t('Even the file system and drivers live here.', 'حتى الـ file system والـ drivers عايشين هنا.') },
        { label: 'messages ⇅', tone: 'violet', icon: 'send', detail: t('Modules talk only by **message passing** through the microkernel.', 'الـ modules بتتكلم بـ **message passing** بس عن طريق الـ microkernel.') },
        { label: 'Kernel mode — microkernel', tone: 'cyan', icon: 'chip', chips: ['Interprocess Communication', 'memory management', 'CPU scheduling'] },
        { label: 'hardware', tone: 'rose', icon: 'cpu' },
      ],
      caption: t(
        '**Mach** is an example of a microkernel; the **Mac OS X kernel (Darwin)** is partly based on Mach.',
        '**Mach** مثال على الـ microkernel؛ والـ **Mac OS X kernel (Darwin)** مبني جزئيًا على Mach.',
      ),
    },
    {
      kind: 'versus',
      left: { title: 'Benefits', icon: 'check', tone: 'teal' },
      right: { title: 'Detriment', icon: 'alert', tone: 'rose' },
      rows: [
        { aspect: 'Extend', left: t('**Easier to extend** a microkernel', '**أسهل توسّع** الـ microkernel'), right: t('—', '—') },
        { aspect: 'Port', left: t('**Easier to port** the OS to new architectures', '**أسهل تنقل** الـ OS لـ architectures جديدة'), right: t('—', '—') },
        { aspect: 'Reliability', left: t('**More reliable** — less code runs in kernel mode', '**Reliable أكتر** — كود أقل شغال في kernel mode'), right: t('—', '—') },
        { aspect: 'Security', left: t('**More secure**', '**Secure أكتر**'), right: t('—', '—') },
        { aspect: 'Cost', left: t('—', '—'), right: t('**Performance overhead** of user space to kernel space communication', '**Overhead في الأداء** بسبب التواصل بين user space وkernel space') },
      ],
    },

    part(
      t('Loadable kernel modules', 'الـ Loadable kernel modules'),
      t('Most modern operating systems implement **loadable kernel modules**.', 'معظم الـ operating systems الحديثة بتطبّق **loadable kernel modules**.'),
    ),
    {
      kind: 'cards',
      columns: 4,
      items: [
        { icon: 'boxes', title: 'Object-oriented', body: t('Uses an **object-oriented approach**.', 'بيستخدم **object-oriented approach**.'), tone: 'cyan' },
        { icon: 'puzzle', title: 'Separate cores', body: t('**Each core component is separate.**', '**كل component أساسي منفصل.**'), tone: 'violet' },
        { icon: 'link', title: 'Known interfaces', body: t('Each talks to the others **over known interfaces**.', 'كل واحد بيكلم التانيين **عن طريق interfaces معروفة**.'), tone: 'teal' },
        { icon: 'plus', title: 'Loadable as needed', body: t('Each is **loadable as needed within the kernel**.', 'كل واحد **ينفع يتحمّل وقت الحاجة جوه الـ kernel**.'), tone: 'amber' },
      ],
    },
    {
      kind: 'cards',
      title: t('Solaris modular approach: seven modules around one core', 'Solaris modular approach: سبع modules حوالين core واحد'),
      intro: t('**Overall, similar to layers but with a more flexible structure**: any module can talk to the core directly. Examples: Linux, Solaris.', '**عمومًا شبه الـ layers بس بتنظيم أمرن**: أي module تقدر تكلم الـ core مباشرة. أمثلة: Linux وSolaris.'),
      columns: 4,
      items: [
        { icon: 'chip', title: 'core Solaris kernel', body: t('The centre every module connects to.', 'المركز اللي كل الـ modules بتتوصل بيه.'), tone: 'amber' },
        { icon: 'list', title: 'scheduling classes', body: t('Loadable CPU-scheduling policies.', 'سياسات CPU scheduling ممكن تتحمّل.'), tone: 'cyan' },
        { icon: 'folder', title: 'file systems', body: t('Each file-system type as a module.', 'كل نوع file system كـ module.'), tone: 'teal' },
        { icon: 'terminal', title: 'loadable system calls', body: t('New system calls added at run time.', 'System calls جديدة بتتضاف وقت التشغيل.'), tone: 'violet' },
        { icon: 'package', title: 'executable formats', body: t('Support for different program formats.', 'دعم لأنواع برامج مختلفة.'), tone: 'rose' },
        { icon: 'workflow', title: 'STREAMS modules', body: t('Stream-based I/O processing.', 'معالجة I/O على شكل streams.'), tone: 'lime' },
        { icon: 'cable', title: 'device and bus drivers', body: t('Hardware support.', 'دعم الـ hardware.'), tone: 'cyan' },
        { icon: 'boxes', title: 'miscellaneous modules', body: t('Everything else.', 'أي حاجة تانية.'), tone: 'violet' },
      ],
    },

    part(
      t('Hybrid systems', 'الـ Hybrid systems'),
      t(
        '**most modern operating systems are actually not one pure model**. A hybrid combines approaches to address performance, security and usability needs.',
        '**معظم الـ operating systems الحديثة في الحقيقة مش موديل واحد نقي**. الـ hybrid بيجمع أكتر من طريقة عشان الأداء والأمان وسهولة الاستخدام.',
      ),
    ),
    {
      kind: 'cards',
      columns: 3,
      items: [
        { icon: 'terminal', tag: 'monolithic + modular', title: 'Linux and Solaris', body: t('Kernel in kernel address space, so **monolithic**, plus **modular** for dynamic loading of functionality.', 'الـ kernel في kernel address space، يعني **monolithic**، ومعاه **modular** لتحميل وظايف وقت التشغيل.'), tone: 'teal' },
        { icon: 'monitor', tag: 'monolithic + microkernel', title: 'Windows', body: t('**Mostly monolithic**, plus **microkernel** for different subsystem personalities.', '**غالبًا monolithic**، ومعاه **microkernel** لشخصيات subsystems مختلفة.'), tone: 'cyan' },
        { icon: 'laptop', tag: 'hybrid + layered', title: 'Apple Mac OS X', body: t('**Aqua** UI plus **Cocoa** programming environment; below, a kernel of **Mach**, BSD UNIX parts, **I/O kit** and dynamically loadable modules (**kernel extensions**).', 'واجهة **Aqua** وبيئة برمجة **Cocoa**؛ وتحتهم kernel فيه **Mach** وأجزاء من BSD UNIX و**I/O kit** وmodules بتتحمّل (**kernel extensions**).'), tone: 'violet' },
      ],
    },
    {
      kind: 'layers',
      title: t('Mac OS X structure', 'تنظيم Mac OS X'),
      layers: [
        { label: 'graphical user interface', tone: 'amber', icon: 'monitor', chips: ['Aqua'] },
        { label: 'application environments and services', tone: 'violet', icon: 'app', chips: ['Java', 'Cocoa', 'Quicktime', 'BSD'] },
        { label: 'kernel environment', tone: 'cyan', icon: 'chip', chips: ['Mach', 'BSD'] },
        { label: 'kernel environment (lower part)', tone: 'teal', icon: 'puzzle', chips: ['I/O kit', 'kernel extensions'] },
      ],
    },
    {
      kind: 'versus',
      title: t('Mobile operating systems', 'أنظمة تشغيل الموبايل'),
      left: { title: 'iOS', icon: 'phone', tone: 'cyan', tagline: t('Apple’s OS for iPhone and iPad', 'الـ OS بتاع Apple للـ iPhone والـ iPad') },
      right: { title: 'Android', icon: 'phone', tone: 'teal', tagline: t('Open Handset Alliance (mostly Google); open source', 'Open Handset Alliance (غالبًا Google)؛ open source') },
      rows: [
        { aspect: 'Based on', left: t('Structured on **Mac OS X**, with added functionality; **Core OS** based on the Mac OS X kernel', 'مبني على **Mac OS X** مع وظايف زيادة؛ والـ **Core OS** مبني على kernel الـ Mac OS X'), right: t('The **Linux kernel, but modified** — process, memory and device-driver management, plus **power management**', '**Linux kernel بس متعدّل** — process وmemory وdevice-driver management، ومعاهم **power management**') },
        { aspect: 'Layers', left: t('**Cocoa Touch** → **Media Services** → **Core Services** → **Core OS**', '**Cocoa Touch** ← **Media Services** ← **Core Services** ← **Core OS**'), right: t('**Application Framework** → **Libraries** + **Android runtime** → Linux kernel', '**Application Framework** ← **Libraries** + **Android runtime** ← Linux kernel') },
        { aspect: 'Apps written in', left: t('**Objective-C** with the Cocoa Touch API', '**Objective-C** بالـ Cocoa Touch API'), right: t('**Java + Android API**; bytecode translated to run in the **Dalvik VM**', '**Java + Android API**؛ والـ bytecode بيتترجم عشان يشتغل في **Dalvik VM**') },
        { aspect: 'Notes', left: t('Does not run OS X apps natively; different CPU (**ARM vs Intel**). Media services: graphics, audio, video; core services: cloud computing, databases', 'مبيشغّلش apps الـ OS X مباشرة؛ CPU مختلف (**ARM مقابل Intel**). Media services: صور وصوت وفيديو؛ core services: cloud computing وdatabases'), right: t('Libraries: **webkit** (browser), **SQLite** (database), multimedia, openGL, surface manager, a smaller **libc**', 'الـ Libraries: **webkit** (browser) و**SQLite** (database) وmultimedia وopenGL وsurface manager و**libc** أصغر') },
      ],
      verdict: t('Android has a stack “similar to iOS”: an app framework on top, the kernel at the bottom.', 'الـ Android عنده stack “similar to iOS”: app framework فوق والـ kernel تحت.'),
    },
    {
      kind: 'table',
      caption: t('Five structures at a glance', 'الخمس تنظيمات في نظرة'),
      headers: ['Structure', 'Core idea', 'Example', 'Plus', 'Minus'],
      rows: [
        [t('Simple'), t('Most functionality in least space; levels not well separated', 'أكبر وظايف في أقل مساحة؛ المستويات مش مفصولة'), t('MS-DOS, original UNIX'), t('Small, fast', 'صغير وسريع'), t('Fragile; little protection between levels', 'هش؛ حماية قليلة بين المستويات')],
        [t('Layered'), t('Each layer uses only lower layers', 'كل layer بتستخدم اللي تحتها بس'), t('Layer 0 hardware … N UI'), t('Modular, easy to debug layer by layer', 'Modular وسهل الـ debugging طبقة طبقة'), t('Hard to define layers; each layer adds overhead', 'صعب تحدد الـ layers؛ وكل layer بتزوّد overhead')],
        [t('Microkernel'), t('Minimal kernel; services in user space; message passing', 'Kernel صغير؛ الخدمات في user space؛ message passing'), t('Mach, Darwin'), t('Extensible, portable, reliable, secure', 'سهل التوسيع وportable وreliable وsecure'), t('User↔kernel communication overhead', 'Overhead التواصل بين user وkernel')],
        [t('Modules'), t('Core + loadable modules over known interfaces', 'Core + modules بتتحمّل عن طريق interfaces معروفة'), t('Linux, Solaris'), t('Like layers but more flexible', 'زي الـ layers بس أمرن'), t('—')],
        [t('Hybrid'), t('Combine approaches', 'جمع أكتر من طريقة'), t('Linux, Windows, Mac OS X'), t('Balances performance, security, usability', 'توازن بين الأداء والأمان وسهولة الاستخدام'), t('—')],
      ],
    },
    {
      kind: 'confusions',
      items: [
        {
          wrong: t('“In the layered approach, layer 0 is the user interface.”', '“في الـ layered approach، الـ layer 0 هي الـ user interface.”'),
          right: t('Layer 0 is the **hardware**; layer N is the user interface.', 'الـ layer 0 هي الـ **hardware**؛ وlayer N هي الـ user interface.'),
        },
        {
          wrong: t('“Microkernel modules share memory to communicate.”', '“الـ modules بتاعة الـ microkernel بتشارك memory عشان تتواصل.”'),
          right: t('They use **message passing**.', 'بتستخدم **message passing**.'),
        },
        {
          wrong: t('“A kernel’s modules cannot be loaded while it runs.”', '“الـ modules بتاعة الـ kernel مينفعش تتحمّل وهو شغال.”'),
          right: t('Loadable kernel modules are **loadable as needed within the kernel**.', 'الـ loadable kernel modules **بتتحمّل وقت الحاجة جوه الـ kernel**.'),
        },
        {
          wrong: t('“Only Mac OS X is a hybrid.”', '“Mac OS X بس هو الـ hybrid.”'),
          right: t('The lecture lists **Linux, Solaris, Windows and Mac OS X** as hybrids.', 'المحاضرة بتذكر **Linux وSolaris وWindows وMac OS X** كـ hybrids.'),
        },
      ],
    },
    {
      kind: 'exam',
      title: t('Exam radar: structures', 'رادار الامتحان: التنظيمات'),
      body: t(
        'Two papers ask which layer is the user interface in the layered approach (worded “Topmost” and “Highest”). Others ask how microkernel modules communicate and which systems are hybrids. The Chapter 1 MCQ on kernel properties is repeated here because one of its options is about **loadable kernel modules** — answer it with the lecture in mind.',
        'ورقتين بيسألوا أنهي layer هي الـ user interface في الـ layered approach (بكلمة “Topmost” وكلمة “Highest”). وتانيين بيسألوا الـ modules بتاعة الـ microkernel بتتواصل إزاي وأنهي أنظمة hybrid. وسؤال الـ MCQ بتاع Chapter 1 عن خصائص الـ kernel متكرر هنا لأن واحد من اختياراته عن **loadable kernel modules** — جاوبه وأنت فاكر المحاضرة.',
      ),
      refs: ['c2-layered-2024', 'c2-layered-2020', 'c2-microkernel-message-passing', 'c2-hybrid', 's1-kernel-not-true'],
    },
    {
      kind: 'recap',
      items: [
        t('Five structures: simple, layered, microkernel, modules, hybrid.', 'خمس تنظيمات: simple وlayered وmicrokernel وmodules وhybrid.'),
        t('MS-DOS: most functionality in least space; levels not well separated.', 'MS-DOS: أكبر وظايف في أقل مساحة؛ والمستويات مش مفصولة كويس.'),
        t('UNIX: systems programs + one big kernel — beyond simple, not fully layered.', 'UNIX: systems programs + kernel واحد كبير — أكتر من simple ومش layered بالكامل.'),
        t('Layered: layer 0 hardware, layer N user interface; use lower layers only.', 'Layered: layer 0 hardware وlayer N user interface؛ واستخدام اللي تحت بس.'),
        t('Microkernel: services in user space, message passing; overhead is the cost.', 'Microkernel: الخدمات في user space وmessage passing؛ والعيب هو الـ overhead.'),
        t('Hybrids: Linux/Solaris (monolithic + modules), Windows (+ microkernel), Mac OS X (layered, Mach + BSD).', 'Hybrids: Linux/Solaris (monolithic + modules)، Windows (+ microkernel)، Mac OS X (layered، Mach + BSD).'),
      ],
    },
  ],
  examFocus: [
    t('In the layered approach the bottom layer (0) is the hardware and the highest layer (N) is the user interface.', 'في الـ layered approach أسفل layer (0) هي الـ hardware وأعلى layer (N) هي الـ user interface.'),
    t('Microkernels communicate between user modules using message passing; benefits are extensibility, portability, reliability and security.', 'الـ microkernels بتتواصل بين الـ user modules بالـ message passing؛ ومميزاتها سهولة التوسيع والـ portability والـ reliability والـ security.'),
    t('Linux, Windows and Mac OS X are all hybrid systems.', 'Linux وWindows وMac OS X كلهم hybrid systems.'),
    t('Loadable kernel modules can be loaded into the running kernel as needed.', 'الـ loadable kernel modules ممكن تتحمّل في الـ kernel وهو شغال وقت الحاجة.'),
  ],
  keyTerms: [
    { term: 'Layered approach', definition: t('OS divided into layers, each using only lower layers; 0 = hardware, N = UI.', 'الـ OS متقسم لطبقات كل واحدة بتستخدم اللي تحتها بس؛ 0 = hardware وN = UI.') },
    { term: 'Microkernel', definition: t('Minimal kernel; other services in user space, communicating by message passing.', 'Kernel صغير؛ وباقي الخدمات في user space بتتواصل بالـ message passing.') },
    { term: 'Loadable kernel module', definition: t('Separate core component loaded into the kernel as needed.', 'Component أساسي منفصل بيتحمّل في الـ kernel وقت الحاجة.') },
    { term: 'Hybrid system', definition: t('An OS combining several structures for performance, security and usability.', 'OS بيجمع أكتر من تنظيم عشان الأداء والأمان وسهولة الاستخدام.') },
    { term: 'Darwin', definition: t('The Mac OS X kernel, partly based on Mach.', 'الـ kernel بتاع Mac OS X، مبني جزئيًا على Mach.') },
    { term: 'Dalvik VM', definition: t('Android’s virtual machine that runs translated Java bytecode.', 'الـ virtual machine بتاعة Android اللي بتشغّل Java bytecode بعد الترجمة.') },
  ],
}
