import type { Section } from '../../types'
import { part, t } from './helpers'

/** Slides 3–9: what an operating system is, its two views, and the kernel. */
export const osIntro: Section = {
  id: 'os-intro',
  order: 1,
  kicker: 'Lesson 01',
  title: 'What an Operating System Is',
  shortTitle: 'What Is an OS?',
  summary: t(
    'The mental model the whole course is built on: four components stacked from hardware to users, two ways of seeing the OS, and the one program that never stops running — the kernel.',
    'الصورة الذهنية اللي الكورس كله مبني عليها: أربع مكونات فوق بعض من الـ hardware لحد الـ users، وطريقتين تشوف بيهم الـ OS، والبرنامج الوحيد اللي عمره ما بيقف — الـ kernel.',
  ),
  objectives: [
    t(
      'Define an operating system and state its three goals.',
      'تعرّف الـ operating system وتقول أهدافه التلاتة.',
    ),
    t(
      'Draw the four components of a computer system and place any program in the right layer.',
      'ترسم المكونات الأربعة للـ computer system وتحط أي برنامج في الطبقة الصح.',
    ),
    t(
      'Contrast the user view with the system view (resource allocator and control program).',
      'تقارن الـ user view بالـ system view (resource allocator وcontrol program).',
    ),
    t(
      'Separate the kernel from system programs and application programs.',
      'تفصل الـ kernel عن الـ system programs والـ application programs.',
    ),
  ],
  estimatedMinutes: 12,
  quizId: 'quiz-os-intro',
  blocks: [
    part(
      t('The OS in one sentence', 'الـ OS في جملة واحدة'),
      t(
        'Every program needs the CPU, memory, storage and I/O devices — and they are shared. Something has to stand in the middle.',
        'كل برنامج محتاج CPU وmemory وstorage وI/O devices — وكلها مشتركة. لازم حاجة تقف في النص.',
      ),
    ),
    {
      kind: 'definition',
      term: 'Operating System',
      definition: t(
        'A program that acts as an **intermediary** between a user of a computer and the computer hardware.',
        'برنامج بيعمل كـ **وسيط (intermediary)** بين مستخدم الكمبيوتر والـ hardware.',
      ),
    },
    {
      kind: 'cards',
      title: t('Three goals of an operating system', 'التلات أهداف بتوع الـ OS'),
      columns: 3,
      items: [
        {
          icon: 'target',
          tag: 'Goal 1',
          title: 'Execute user programs',
          body: t('Run user programs and make **solving user problems easier**.', 'يشغّل برامج المستخدم ويخلّي **حل مشاكله أسهل**.'),
          tone: 'cyan',
        },
        {
          icon: 'user',
          tag: 'Goal 2',
          title: 'Convenient',
          body: t('Make the computer system **convenient** to use.', 'يخلّي النظام **سهل ومريح (convenient)** في الاستخدام.'),
          tone: 'violet',
        },
        {
          icon: 'gauge',
          tag: 'Goal 3',
          title: 'Efficient',
          body: t('Use the computer hardware in an **efficient** manner.', 'يستخدم الـ hardware بطريقة **efficient**.'),
          tone: 'teal',
        },
      ],
    },
    {
      kind: 'hook',
      title: t('Two words carry the definition', 'كلمتين شايلين التعريف'),
      phrase: 'Convenient for the user, efficient for the machine.',
      body: t(
        'The lecture highlights exactly these two words. Every later idea in the chapter serves one of them.',
        'المحاضرة معلّمة على الكلمتين دول بالظبط. وكل فكرة بعد كده في الفصل بتخدم واحدة منهم.',
      ),
    },

    part(
      t('Four components of a computer system', 'المكونات الأربعة للـ computer system'),
      t(
        'The lecture stacks the system in four layers. Each layer uses the one below it.',
        'المحاضرة بترصّ النظام في أربع طبقات. كل طبقة بتستخدم اللي تحتها.',
      ),
    ),
    {
      kind: 'visual',
      id: 'system-layers',
      title: t('The four-layer stack: who uses whom?', 'الـ stack ذو الأربع طبقات: مين بيستخدم مين؟'),
      caption: t(
        'The operating system is the only layer whose job is to coordinate the others — it sits between the programs and the hardware.',
        'الـ operating system هو الطبقة الوحيدة اللي شغلانتها تنسّق الباقيين — قاعد بين البرامج والـ hardware.',
      ),
    },
    {
      kind: 'hook',
      title: t('Read the stack from top to bottom', 'اقرا الـ stack من فوق لتحت'),
      phrase: 'Users use Apps; Apps ask the OS; the OS drives the Hardware.',
      letters: [
        { letter: 'U', word: 'Users — people, machines, other computers' },
        { letter: 'A', word: 'Application programs' },
        { letter: 'O', word: 'Operating system' },
        { letter: 'H', word: 'Hardware — CPU, memory, I/O' },
      ],
    },

    part(
      t('What operating systems do: two points of view', 'الـ OS بيعمل إيه: وجهتين نظر'),
      t(
        'What the OS should optimize “depends on the point of view”.',
        'الـ OS المفروض يحسّن إيه “بيعتمد على وجهة النظر”.',
      ),
    ),
    {
      kind: 'versus',
      left: { title: 'User view', icon: 'user', tone: 'amber', tagline: t('What the person in front of the screen wants', 'اللي الشخص قدام الشاشة عايزه') },
      right: { title: 'System view', icon: 'settings', tone: 'cyan', tagline: t('What the machine as a whole needs', 'اللي الجهاز ككل محتاجه') },
      rows: [
        {
          aspect: 'Priority',
          left: t('Convenience, ease of use', 'السهولة والراحة في الاستخدام'),
          right: t('Efficient and fair use of resources', 'استخدام efficient وعادل للموارد'),
        },
        {
          aspect: 'Utilization',
          left: t('The user does not care about resource utilization', 'المستخدم مش فارق معاه resource utilization'),
          right: t('Utilization is the whole point', 'الـ utilization هو أساس الموضوع'),
        },
        {
          aspect: 'OS acts as',
          left: t('A tool that makes the computer easy', 'أداة بتسهّل استخدام الكمبيوتر'),
          right: t('A **resource allocator** and a **control program**', '**resource allocator** و**control program**'),
        },
      ],
      verdict: t(
        'A full definition of an OS mentions both sides: intermediary for convenience, plus allocator and controller for efficiency.',
        'التعريف الكامل للـ OS بيذكر الجانبين: وسيط عشان الراحة، وكمان allocator وcontroller عشان الكفاءة.',
      ),
    },
    {
      kind: 'cards',
      title: t('The user view changes with the machine', 'الـ user view بيتغير حسب الجهاز'),
      intro: t('The lecture lists four situations. Each one wants something different from its OS.', 'المحاضرة بتذكر أربع حالات. كل واحدة عايزة حاجة مختلفة من الـ OS.'),
      columns: 4,
      items: [
        {
          icon: 'users',
          title: 'Shared computer',
          tag: 'mainframe · minicomputer',
          body: t('Must **keep all users happy** — no single user may hog resources.', 'لازم **يرضي كل المستخدمين** — محدش ياخد الموارد لوحده.'),
          tone: 'amber',
        },
        {
          icon: 'monitor',
          title: 'Workstation',
          tag: 'dedicated system',
          body: t('Has **dedicated resources** but frequently uses **shared resources from servers**.', 'عنده **موارد خاصة بيه** بس كتير بيستخدم **موارد مشتركة من servers**.'),
          tone: 'cyan',
        },
        {
          icon: 'phone',
          title: 'Handheld',
          tag: 'resource poor',
          body: t('Optimized for **usability and battery life**.', 'متظبط عشان **سهولة الاستخدام وعمر البطارية**.'),
          tone: 'violet',
        },
        {
          icon: 'car',
          title: 'Embedded',
          tag: 'devices · automobiles',
          body: t('Has **little or no user interface** at all.', 'عنده **user interface قليلة جدًا أو مفيش خالص**.'),
          tone: 'teal',
        },
      ],
    },
    {
      kind: 'cards',
      title: t('The system view: two roles', 'الـ system view: دورين'),
      columns: 2,
      items: [
        {
          icon: 'scale',
          tag: 'Role 1',
          title: 'Resource allocator',
          body: t(
            '**Manages all resources** — CPU time, memory space, file-storage space, I/O devices — and **decides between conflicting requests** for efficient and fair use.',
            '**بيدير كل الموارد** — CPU time وmemory space وfile-storage space وI/O devices — و**بيحكم بين الطلبات المتعارضة** عشان استخدام efficient وعادل.',
          ),
          chips: ['CPU time', 'memory', 'file storage', 'I/O devices'],
          tone: 'cyan',
        },
        {
          icon: 'shield',
          tag: 'Role 2',
          title: 'Control program',
          body: t(
            '**Controls the execution of programs** to prevent errors and improper use of the computer.',
            '**بيتحكم في تنفيذ البرامج** عشان يمنع الأخطاء والاستخدام الغلط للكمبيوتر.',
          ),
          chips: ['prevent errors', 'prevent misuse'],
          tone: 'rose',
        },
      ],
    },

    part(
      t('Defining the OS — and the kernel', 'تعريف الـ OS — والـ kernel'),
      t(
        'There is **no universally accepted definition** of what is part of the operating system.',
        '**مفيش تعريف متفق عليه عالميًا** لإيه اللي يعتبر جزء من الـ operating system.',
      ),
    ),
    {
      kind: 'layers',
      title: t('Everything a vendor ships, sorted', 'كل اللي الـ vendor بيبعته، مترتب'),
      caption: t(
        '“Everything a vendor ships when you order an operating system” is a **good approximation — but varies wildly**. The precise core is the kernel.',
        '“كل حاجة الـ vendor بيبعتها لما تطلب operating system” **تقريب كويس — بس بيختلف جدًا**. والقلب الدقيق هو الـ kernel.',
      ),
      layers: [
        {
          label: 'Kernel',
          icon: 'chip',
          tone: 'cyan',
          detail: t('“The one program running at all times on the computer.”', '“البرنامج الوحيد اللي شغال طول الوقت على الكمبيوتر.”'),
          chips: ['always running'],
        },
        {
          label: 'System programs',
          icon: 'settings',
          tone: 'violet',
          detail: t('Ship with the operating system, but are not the kernel.', 'بييجوا مع الـ operating system، بس مش هما الـ kernel.'),
          chips: ['ships with the OS'],
        },
        {
          label: 'Application programs',
          icon: 'app',
          tone: 'amber',
          detail: t('Everything else — even if it came bundled with the OS.', 'أي حاجة تانية — حتى لو جت مع الـ OS في نفس الباكدج.'),
          chips: ['everything else'],
        },
      ],
    },
    {
      kind: 'definition',
      term: 'Kernel',
      definition: t(
        'The one program running at all times on the computer — the central core of the operating system.',
        'البرنامج الوحيد اللي شغال طول الوقت على الكمبيوتر — القلب المركزي للـ operating system.',
      ),
      detail: t(
        'It is the first part of the OS loaded into memory during booting and it stays resident for the whole session. (Supplementary, detailed in Chapter 2: most modern kernels are built from modules, and many modules can be loaded into the kernel while it is running.)',
        'هو أول جزء من الـ OS بيتحمّل في الـ memory وقت الـ booting وبيفضل موجود طول الـ session. (معلومة إضافية بتتشرح في Chapter 2: معظم الـ kernels الحديثة معمولة من modules، وكتير منها ينفع يتحمّل جوه الـ kernel وهو شغال.)',
      ),
    },
    {
      kind: 'confusions',
      items: [
        {
          wrong: t('“The OS is exactly everything the vendor ships.”', '“الـ OS هو بالظبط كل اللي الـ vendor بيبعته.”'),
          right: t('That is only a good approximation that varies wildly; the always-running core is the **kernel**.', 'ده مجرد تقريب كويس وبيختلف جدًا؛ والقلب اللي شغال طول الوقت هو الـ **kernel**.'),
        },
        {
          wrong: t('“A browser that comes with the OS is part of the kernel.”', '“الـ browser اللي جاي مع الـ OS جزء من الـ kernel.”'),
          right: t('Bundled or not, a browser is an **application program**.', 'جاي معاه أو لأ، الـ browser هو **application program**.'),
        },
        {
          wrong: t('“Users are people.”', '“الـ users يعني ناس.”'),
          right: t('Users are **people, machines, or other computers**.', 'الـ users ممكن يبقوا **ناس أو machines أو كمبيوترات تانية**.'),
        },
        {
          wrong: t('“Every user wants high resource utilization.”', '“كل مستخدم عايز resource utilization عالي.”'),
          right: t('A single user wants **convenience** and does not care about utilization; only shared systems must keep all users happy.', 'المستخدم الواحد عايز **راحة** ومش فارق معاه الـ utilization؛ الأنظمة المشتركة بس هي اللي لازم ترضي كل المستخدمين.'),
        },
      ],
    },
    {
      kind: 'exam',
      title: t('Exam radar: definitions and the kernel', 'رادار الامتحان: التعريفات والـ kernel'),
      body: t(
        'Expect a fill-in built on the lecture’s quote about the program that runs at all times, an MCQ that lists four kernel properties and asks which one is *not* true, and a “briefly define Operating System” question. For the definition, use both views: intermediary + goals, then resource allocator + control program.',
        'استنى fill-in مبني على جملة المحاضرة عن البرنامج اللي شغال طول الوقت، وMCQ فيه أربع خصائص للـ kernel ويسألك أنهي واحدة *مش* صح، وسؤال “briefly define Operating System”. في التعريف استخدم الوجهتين: intermediary + الأهداف، وبعدين resource allocator + control program.',
      ),
      refs: ['s1-kernel-fill', 's1-kernel-not-true', 's1-define-os'],
    },
    {
      kind: 'recap',
      items: [
        t('OS = intermediary between user and hardware.', 'الـ OS = وسيط بين المستخدم والـ hardware.'),
        t('Goals: execute programs, **convenient**, **efficient**.', 'الأهداف: تشغيل البرامج، **convenient**، **efficient**.'),
        t('Stack: users → programs → OS → hardware.', 'الـ stack: users ← programs ← OS ← hardware.'),
        t('System view: resource allocator + control program.', 'الـ system view: resource allocator + control program.'),
        t('Kernel = the one program running at all times.', 'الـ kernel = البرنامج الوحيد اللي شغال طول الوقت.'),
        t('Everything else: system program (ships with OS) or application.', 'الباقي: system program (جاي مع الـ OS) أو application.'),
      ],
    },
  ],
  examFocus: [
    t(
      'Define an OS from both views: intermediary with three goals; resource allocator and control program.',
      'عرّف الـ OS من الوجهتين: وسيط بتلات أهداف؛ وresource allocator وcontrol program.',
    ),
    t(
      'Name the four components and give an example of each (CPU/memory/I/O; OS; compiler/browser; people/machines/computers).',
      'اذكر المكونات الأربعة ومثال لكل واحد (CPU/memory/I/O؛ OS؛ compiler/browser؛ ناس/أجهزة/كمبيوترات).',
    ),
    t(
      'Know the kernel’s properties: central core, first to load at boot, resident all session, extendable with modules.',
      'اعرف خصائص الـ kernel: القلب المركزي، أول حاجة بتتحمّل في الـ boot، موجود طول الـ session، وبيتوسع بـ modules.',
    ),
  ],
  keyTerms: [
    { term: 'Operating system', definition: t('Intermediary between a computer user and the hardware.', 'وسيط بين مستخدم الكمبيوتر والـ hardware.') },
    { term: 'Kernel', definition: t('The one program running at all times; the OS core.', 'البرنامج الوحيد اللي شغال طول الوقت؛ قلب الـ OS.') },
    { term: 'System program', definition: t('Ships with the OS but is not the kernel.', 'بييجي مع الـ OS بس مش الـ kernel.') },
    { term: 'Application program', definition: t('Uses system resources to solve users’ computing problems.', 'بيستخدم موارد النظام عشان يحل مشاكل المستخدمين.') },
    { term: 'Resource allocator', definition: t('Manages all resources and resolves conflicting requests fairly and efficiently.', 'بيدير كل الموارد ويحسم الطلبات المتعارضة بعدل وكفاءة.') },
    { term: 'Control program', definition: t('Controls program execution to prevent errors and improper use.', 'بيتحكم في تنفيذ البرامج عشان يمنع الأخطاء وسوء الاستخدام.') },
  ],
}
