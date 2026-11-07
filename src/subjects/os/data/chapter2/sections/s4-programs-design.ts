import type { Section } from '../../../types'
import { part, t } from '../../sections/helpers'

/** Slides 26–32: system programs, design goals, policy vs mechanism, implementation languages. */
export const programsDesign: Section = {
  id: 'c2-programs-design',
  chapterId: 'chapter-2',
  order: 4,
  kicker: 'Lesson 04',
  title: 'System Programs, Design & Implementation',
  shortTitle: 'Programs & Design',
  summary: t(
    'The software most users actually see — system programs — then how an OS is designed: user goals vs system goals, the principle of separating policy from mechanism, and the languages operating systems are written in.',
    'الـ software اللي معظم المستخدمين بيشوفوه فعلًا — الـ system programs — وبعدين الـ OS بيتصمم إزاي: أهداف المستخدم مقابل أهداف النظام، ومبدأ فصل الـ policy عن الـ mechanism، واللغات اللي الـ operating systems بتتكتب بيها.',
  ),
  objectives: [
    t('State the purpose of system programs and list their categories with examples.', 'تقول هدف الـ system programs وتذكر فئاتها بأمثلة.'),
    t('Contrast background services (daemons) with application programs.', 'تقارن الـ background services (daemons) بالـ application programs.'),
    t('Separate user goals from system goals in OS design.', 'تفصل أهداف المستخدم عن أهداف النظام في تصميم الـ OS.'),
    t('Define policy and mechanism and explain why they are separated.', 'تعرّف الـ policy والـ mechanism وتشرح ليه بنفصلهم.'),
    t('Describe the language mix of a modern OS and the portability–speed trade-off.', 'توصف خليط اللغات في الـ OS الحديث والمقايضة بين الـ portability والسرعة.'),
  ],
  estimatedMinutes: 15,
  quizId: 'quiz-c2-programs-design',
  blocks: [
    part(
      t('System programs', 'الـ System programs'),
      t(
        'System programs **provide a convenient environment for program development and execution**.',
        'الـ system programs **بتوفّر بيئة مريحة لتطوير وتنفيذ البرامج**.',
      ),
    ),
    {
      kind: 'cards',
      columns: 2,
      items: [
        {
          icon: 'layers',
          title: 'Thin or thick',
          body: t('**Some are simply user interfaces to system calls; others are considerably more complex.**', '**بعضها مجرد user interfaces للـ system calls؛ وبعضها أعقد بكتير.**'),
          tone: 'cyan',
        },
        {
          icon: 'eye',
          title: 'What users see',
          body: t('**Most users’ view of the OS is defined by system programs**, not the actual system calls.', '**نظرة معظم المستخدمين للـ OS بتتحدد بالـ system programs**، مش بالـ system calls الحقيقية.'),
          tone: 'violet',
        },
      ],
    },
    {
      kind: 'cards',
      title: t('Types of system programs', 'أنواع الـ system programs'),
      columns: 4,
      items: [
        { icon: 'folder', tag: 'file management', title: 'File management', body: t('Create, delete, copy, rename, print, dump, list and manipulate files and directories.', 'إنشاء وحذف ونسخ وتغيير اسم وطباعة وdump وعرض الـ files والـ directories.'), tone: 'cyan' },
        { icon: 'gauge', tag: 'status', title: 'Status information', body: t('Date, time, free memory, disk space, number of users; detailed performance, logging and debugging info. Some systems keep a **registry** of configuration information.', 'التاريخ والوقت والـ memory الفاضية ومساحة الـ disk وعدد المستخدمين؛ ومعلومات أداء وlogging وdebugging مفصلة. وبعض الأنظمة فيها **registry** لمعلومات الإعدادات.'), tone: 'teal' },
        { icon: 'file', tag: 'file modification', title: 'File modification', body: t('**Text editors**; commands to search file contents or transform the text.', '**Text editors**؛ وcommands للبحث في محتوى الـ files أو تحويل النص.'), tone: 'violet' },
        { icon: 'code', tag: 'language support', title: 'Programming-language support', body: t('**Compilers, assemblers, debuggers and interpreters** are sometimes provided.', '**Compilers وassemblers وdebuggers وinterpreters** ساعات بتكون موجودة.'), tone: 'amber' },
        { icon: 'package', tag: 'loading', title: 'Program loading & execution', body: t('Absolute loaders, relocatable loaders, **linkage editors**, overlay loaders, debugging systems.', 'Absolute loaders وrelocatable loaders و**linkage editors** وoverlay loaders وأنظمة debugging.'), tone: 'rose' },
        { icon: 'network', tag: 'communications', title: 'Communications', body: t('Create **virtual connections** among processes, users and computer systems.', 'بتعمل **connections افتراضية** بين الـ processes والمستخدمين والأجهزة.'), tone: 'lime' },
        { icon: 'settings', tag: 'background', title: 'Background services', body: t('Launch at boot; known as **services, subsystems, daemons**.', 'بتشتغل مع الـ boot؛ واسمها **services أو subsystems أو daemons**.'), tone: 'cyan' },
        { icon: 'app', tag: 'applications', title: 'Application programs', body: t('Run by users; **not typically considered part of the OS**.', 'المستخدمين بيشغّلوها؛ و**عادة مش بتعتبر جزء من الـ OS**.'), tone: 'violet' },
      ],
    },
    {
      kind: 'versus',
      title: t('Background services vs application programs', 'Background services مقابل application programs'),
      left: { title: 'Background services', icon: 'settings', tone: 'teal', tagline: t('services · subsystems · daemons', 'services · subsystems · daemons') },
      right: { title: 'Application programs', icon: 'app', tone: 'amber', tagline: t('Don’t pertain to the system', 'مالهاش علاقة بالنظام نفسه') },
      rows: [
        { aspect: 'Started', left: t('**Launch at boot time**', '**بتشتغل وقت الـ boot**'), right: t('By the user: command line, mouse click, **finger poke**', 'المستخدم: command line أو click أو **لمسة صباع**') },
        { aspect: 'Lifetime', left: t('Some do startup work and terminate; some run **from boot to shutdown**', 'بعضها يعمل شغل البداية ويخلص؛ وبعضها يفضل **من الـ boot لحد الـ shutdown**'), right: t('As long as the user wants', 'طول ما المستخدم عايز') },
        { aspect: 'Examples', left: t('Disk checking, process scheduling, error logging, printing', 'فحص الـ disk والـ process scheduling وتسجيل الأخطاء والطباعة'), right: t('Browsers, games, word processors', 'Browsers وألعاب وword processors') },
        { aspect: 'Context', left: t('Run in **user context, not kernel context**', 'بتشتغل في **user context، مش kernel context**'), right: t('User context', 'User context') },
      ],
    },

    part(
      t('Design goals', 'أهداف التصميم'),
      t(
        'OS design and implementation is **not “solvable”**, but some approaches have proven successful. Start by defining goals and specifications — affected by the hardware and the type of system.',
        'تصميم وتنفيذ الـ OS **مش مشكلة “ليها حل واحد”**، بس فيه طرق أثبتت نجاحها. ابدأ بتحديد الأهداف والمواصفات — وده بيتأثر بالـ hardware ونوع النظام.',
      ),
    ),
    {
      kind: 'versus',
      left: { title: 'User goals', icon: 'user', tone: 'amber', tagline: t('What the OS should feel like', 'الـ OS المفروض يحسسك بإيه') },
      right: { title: 'System goals', icon: 'settings', tone: 'cyan', tagline: t('What the OS should be to build', 'الـ OS المفروض يبقى عامل إزاي للي بيبنيه') },
      rows: [
        { aspect: 'Use', left: t('**Convenient to use, easy to learn**', '**مريح في الاستخدام، سهل تتعلمه**'), right: t('**Easy to design, implement and maintain**', '**سهل في التصميم والتنفيذ والصيانة**') },
        { aspect: 'Quality', left: t('**Reliable, safe, fast**', '**Reliable وآمن وسريع**'), right: t('**Flexible, reliable, error-free, efficient**', '**مرن وreliable ومن غير أخطاء وefficient**') },
      ],
      verdict: t('“Reliable” is the one goal on both lists.', 'كلمة “Reliable” هي الهدف الوحيد اللي في القايمتين.'),
    },

    part(
      t('Policy vs mechanism', 'الـ Policy مقابل الـ Mechanism'),
      t('An important principle to separate.', 'مبدأ مهم لازم نفصله.'),
    ),
    {
      kind: 'versus',
      left: { title: 'Policy', icon: 'target', tone: 'violet', tagline: t('**What** will be done?', '**إيه** اللي هيتعمل؟') },
      right: { title: 'Mechanism', icon: 'settings', tone: 'teal', tagline: t('**How** to do it?', '**إزاي** هيتعمل؟') },
      rows: [
        { aspect: '', left: t('Policies **decide what will be done**', 'الـ policies **بتقرر إيه اللي هيتعمل**'), right: t('Mechanisms **determine how to do something**', 'الـ mechanisms **بتحدد إزاي الحاجة تتعمل**') },
        { aspect: 'Changes?', left: t('Often — between sites and over time', 'كتير — من مكان لمكان ومع الوقت'), right: t('Rarely; built once, reused', 'نادرًا؛ بتتبني مرة وتتستخدم كتير') },
        { aspect: 'Example', left: t('How long each user’s time slice should be', 'الـ time slice لكل مستخدم تبقى قد إيه'), right: t('The timer that enforces a time slice', 'الـ timer اللي بيطبّق الـ time slice') },
      ],
      verdict: t(
        'Separating them **allows maximum flexibility if policy decisions are to be changed later**. (The timer example is from the textbook.)',
        'فصلهم **بيدّي أقصى مرونة لو قرارات الـ policy اتغيرت بعدين**. (مثال الـ timer من الكتاب.)',
      ),
    },
    {
      kind: 'hook',
      title: t('Two questions, two words', 'سؤالين، كلمتين'),
      phrase: 'Policy asks WHAT; Mechanism answers HOW.',
      body: t(
        'Specifying and designing an OS is a highly creative task of software engineering.',
        'تحديد وتصميم الـ OS شغلانة software engineering محتاجة إبداع كبير.',
      ),
    },

    part(
      t('Implementation', 'التنفيذ'),
      t('Much variation — and usually a mix of languages.', 'اختلافات كتير — وغالبًا خليط من اللغات.'),
    ),
    {
      kind: 'flow',
      title: t('How OS implementation languages evolved', 'لغات تنفيذ الـ OS اتطورت إزاي'),
      steps: [
        { icon: 'chip', label: 'Assembly language', detail: t('Early operating systems.', 'الـ operating systems الأولانية.'), tone: 'rose' },
        { icon: 'code', label: 'Algol, PL/1', detail: t('Then system programming languages.', 'بعدين لغات system programming.'), tone: 'amber' },
        { icon: 'terminal', label: 'C, C++', detail: t('Now.', 'دلوقتي.'), tone: 'teal' },
      ],
    },
    {
      kind: 'layers',
      title: t('A modern OS is a mix of languages', 'الـ OS الحديث خليط من اللغات'),
      layers: [
        { label: 'Systems programs', icon: 'app', tone: 'violet', detail: t('C, C++ and scripting languages.', 'C وC++ ولغات scripting.'), chips: ['PERL', 'Python', 'shell scripts'] },
        { label: 'Main body', icon: 'code', tone: 'teal', detail: t('Written in C.', 'مكتوب بـ C.'), chips: ['C'] },
        { label: 'Lowest levels', icon: 'chip', tone: 'rose', detail: t('Written in assembly.', 'مكتوبة بـ assembly.'), chips: ['assembly'] },
      ],
    },
    {
      kind: 'versus',
      left: { title: 'More high-level language', icon: 'code', tone: 'teal', tagline: t('C, C++', 'C وC++') },
      right: { title: 'Assembly', icon: 'chip', tone: 'rose', tagline: t('Machine-specific', 'خاص بالجهاز') },
      rows: [
        { aspect: 'Portability', left: t('**Easier to port to other hardware**', '**أسهل تنقله لـ hardware تاني**'), right: t('Rewritten for each CPU', 'لازم يتكتب من الأول لكل CPU') },
        { aspect: 'Speed', left: t('**But slower**', '**بس أبطأ**'), right: t('Fastest', 'الأسرع') },
      ],
      verdict: t('**Emulation** can also allow an OS to run on non-native hardware.', 'والـ **emulation** كمان ممكن تخلّي الـ OS يشتغل على hardware مش بتاعه.'),
    },
    {
      kind: 'confusions',
      items: [
        {
          wrong: t('“Policy determines how to do something.”', '“الـ policy بتحدد إزاي الحاجة تتعمل.”'),
          right: t('That is **mechanism**. Policy decides **what** will be done.', 'ده الـ **mechanism**. الـ policy بتقرر **إيه** اللي هيتعمل.'),
        },
        {
          wrong: t('“Separating policy from mechanism is mainly about speed.”', '“فصل الـ policy عن الـ mechanism أساسًا عشان السرعة.”'),
          right: t('It is about **flexibility** when policy decisions change.', 'الهدف **المرونة** لما قرارات الـ policy تتغير.'),
        },
        {
          wrong: t('“Daemons run in the kernel.”', '“الـ daemons بتشتغل جوه الـ kernel.”'),
          right: t('Background services **run in user context, not kernel context**.', 'الـ background services **بتشتغل في user context، مش kernel context**.'),
        },
      ],
    },
    {
      kind: 'exam',
      title: t('Exam radar: programs and design', 'رادار الامتحان: البرامج والتصميم'),
      body: t(
        'A T/F statement repeats the lecture about how complex system programs can be. Two MCQs test policy vs mechanism: one asks what policy **determines**, the other the **benefit** of separating it from mechanism. The purpose of system programs is also part one of the three-part essay in Section 2.',
        'جملة T/F بتكرر المحاضرة عن تعقيد الـ system programs. واتنين MCQ بيختبروا الـ policy مقابل الـ mechanism: واحد بيسأل الـ policy **بتحدد** إيه، والتاني عن **فايدة** فصلها عن الـ mechanism. وهدف الـ system programs كمان جزء من السؤال المكتوب ذو التلات أجزاء في Section 2.',
      ),
      refs: ['c2-system-programs-tf', 'c2-policy-definition', 'c2-policy-mechanism-benefit'],
    },
    {
      kind: 'recap',
      items: [
        t('System programs: a convenient environment for program development and execution.', 'الـ system programs: بيئة مريحة لتطوير وتنفيذ البرامج.'),
        t('Users mostly see the OS through system programs, not system calls.', 'المستخدمين غالبًا بيشوفوا الـ OS من خلال الـ system programs، مش الـ system calls.'),
        t('Daemons launch at boot and run in user context.', 'الـ daemons بتشتغل مع الـ boot وفي user context.'),
        t('User goals: convenient, easy to learn, reliable, safe, fast.', 'أهداف المستخدم: مريح، سهل، reliable، آمن، سريع.'),
        t('Policy = what; mechanism = how; separation → flexibility.', 'الـ Policy = إيه؛ الـ mechanism = إزاي؛ والفصل ← مرونة.'),
        t('Lowest levels in assembly, main body in C; high-level = portable but slower.', 'المستويات السفلى بـ assembly، والجسم الأساسي بـ C؛ والـ high-level = portable بس أبطأ.'),
      ],
    },
  ],
  examFocus: [
    t('Some system programs are thin interfaces to system calls; others are considerably more complex.', 'بعض الـ system programs واجهات بسيطة للـ system calls؛ وبعضها أعقد بكتير.'),
    t('Policy decides what will be done; mechanism determines how.', 'الـ policy بتقرر إيه اللي هيتعمل؛ والـ mechanism بتحدد إزاي.'),
    t('Separating policy from mechanism allows maximum flexibility if policy decisions change later.', 'فصل الـ policy عن الـ mechanism بيدّي أقصى مرونة لو قرارات الـ policy اتغيرت بعدين.'),
  ],
  keyTerms: [
    { term: 'System programs', definition: t('Provide a convenient environment for program development and execution.', 'بتوفّر بيئة مريحة لتطوير وتنفيذ البرامج.') },
    { term: 'Daemon', definition: t('A background service launched at boot, running in user context.', 'Background service بتشتغل مع الـ boot في user context.') },
    { term: 'Registry', definition: t('Store for system configuration information.', 'مكان تخزين معلومات إعدادات النظام.') },
    { term: 'Policy', definition: t('Decides what will be done.', 'بتقرر إيه اللي هيتعمل.') },
    { term: 'Mechanism', definition: t('Determines how to do something.', 'بتحدد إزاي الحاجة تتعمل.') },
  ],
}
