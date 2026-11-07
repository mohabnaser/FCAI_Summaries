import type { Section } from '../../../types'
import { part, t } from '../../sections/helpers'

/** Slides 3–12: operating-system services and user interfaces (CLI, GUI, touchscreen). */
export const servicesInterfaces: Section = {
  id: 'c2-services-interfaces',
  chapterId: 'chapter-2',
  order: 1,
  kicker: 'Lesson 01',
  title: 'OS Services & User Interfaces',
  shortTitle: 'Services & Interfaces',
  summary: t(
    'What an operating system offers: nine services in two families — six that help the user and three that keep the system itself efficient — and the three ways a person talks to it: command line, GUI and touchscreen.',
    'الـ operating system بيقدّم إيه: تسع خدمات في عيلتين — ست بيساعدوا المستخدم وتلاتة بيخلّوا النظام نفسه efficient — والتلات طرق اللي الإنسان بيكلّمه بيها: command line وGUI وtouchscreen.',
  ),
  objectives: [
    t('List the six user-helpful services and the three system-efficiency services.', 'تذكر الست خدمات اللي بتساعد المستخدم والتلات خدمات بتوع كفاءة النظام.'),
    t('Read the layered “view of OS services” diagram from users down to hardware.', 'تقرا رسمة “view of OS services” من الـ users لحد الـ hardware.'),
    t('Explain what a command interpreter does and why commands can simply be program names.', 'تشرح الـ command interpreter بيعمل إيه وليه الـ commands ممكن تبقى مجرد أسامي programs.'),
    t('Compare CLI, GUI and touchscreen interfaces, with the OS examples from the lecture.', 'تقارن الـ CLI والـ GUI والـ touchscreen، بأمثلة الـ OSs اللي في المحاضرة.'),
  ],
  estimatedMinutes: 16,
  quizId: 'quiz-c2-services-interfaces',
  blocks: [
    part(
      t('Operating-system services', 'خدمات الـ operating system'),
      t(
        'An operating system provides **an environment for execution of programs and services to programs and users**.',
        'الـ operating system بيوفّر **بيئة لتنفيذ البرامج وخدمات للبرامج والمستخدمين**.',
      ),
    ),
    {
      kind: 'visual',
      id: 'os-services-map',
      title: t('A view of operating-system services', 'نظرة على خدمات الـ operating system'),
      caption: t(
        'Every request from a GUI, a batch job or the command line crosses the system-call layer before it reaches a service.',
        'أي طلب جاي من GUI أو batch أو command line لازم يعدّي على طبقة الـ system calls قبل ما يوصل لأي خدمة.',
      ),
    },
    {
      kind: 'cards',
      title: t('Six services that help the user', 'ست خدمات بتساعد المستخدم'),
      columns: 3,
      items: [
        {
          icon: 'monitor',
          tag: 'U',
          title: 'User interface',
          body: t('Almost every OS has one. It varies between **CLI**, **batch** and **GUI**.', 'تقريبًا كل OS عنده واحدة. وبتختلف بين **CLI** و**batch** و**GUI**.'),
          chips: ['CLI', 'batch', 'GUI'],
          tone: 'cyan',
        },
        {
          icon: 'play',
          tag: 'P',
          title: 'Program execution',
          body: t('Load a program into memory, run it, and end it — **normally or abnormally** (indicating error).', 'تحمّل البرنامج في الـ memory، تشغّله، وتنهيه — **normally أو abnormally** (يعني فيه error).'),
          tone: 'teal',
        },
        {
          icon: 'printer',
          tag: 'I',
          title: 'I/O operations',
          body: t('A running program may need I/O, which may involve **a file or an I/O device**.', 'البرنامج الشغال ممكن يحتاج I/O، وده ممكن يكون **file أو I/O device**.'),
          tone: 'violet',
        },
        {
          icon: 'folder',
          tag: 'F',
          title: 'File-system manipulation',
          body: t('Read/write, create/delete and search files and directories, list file information, **manage permissions**.', 'قراءة/كتابة، إنشاء/حذف، وبحث في الـ files والـ directories، وعرض معلومات الـ files، و**إدارة الصلاحيات**.'),
          tone: 'amber',
        },
        {
          icon: 'send',
          tag: 'C',
          title: 'Communications',
          body: t('Processes exchange information on the same computer or over a network — via **shared memory** or **message passing** (packets moved by the OS).', 'الـ processes بتتبادل معلومات على نفس الجهاز أو عبر الشبكة — عن طريق **shared memory** أو **message passing** (packets الـ OS بينقلها).'),
          tone: 'rose',
        },
        {
          icon: 'alert',
          tag: 'E',
          title: 'Error detection',
          body: t('Errors can occur in CPU and memory hardware, I/O devices or user programs; the OS takes the appropriate action. **Debugging facilities** help users and programmers.', 'الأخطاء ممكن تحصل في الـ CPU والـ memory أو الـ I/O devices أو برامج المستخدم؛ والـ OS بياخد الإجراء المناسب. و**أدوات الـ debugging** بتساعد المستخدم والمبرمج.'),
          tone: 'lime',
        },
      ],
    },
    {
      kind: 'cards',
      title: t('Three services that keep the system efficient', 'تلات خدمات بتخلّي النظام efficient'),
      intro: t(
        'A second set of functions exists “for ensuring the efficient operation of the system itself via resource sharing”.',
        'فيه مجموعة تانية من الوظايف موجودة “for ensuring the efficient operation of the system itself via resource sharing”.',
      ),
      columns: 3,
      items: [
        {
          icon: 'scale',
          tag: 'R',
          title: 'Resource allocation',
          body: t('With many users or jobs running at once, resources must be allocated to each. CPU cycles, main memory and file storage may have **special allocation code**; I/O devices may have **general request and release code**.', 'لما users أو jobs كتير يشتغلوا مع بعض، لازم الموارد تتوزع عليهم. الـ CPU cycles والـ main memory والـ file storage ممكن يبقى ليهم **كود توزيع خاص**؛ والـ I/O devices ممكن يبقى ليها **كود request/release عام**.'),
          tone: 'cyan',
        },
        {
          icon: 'list',
          tag: 'A',
          title: 'Accounting',
          body: t('Keep track of **which users use how much and what kinds** of computer resources.', 'متابعة **مين بيستخدم قد إيه ونوع إيه** من موارد الكمبيوتر.'),
          tone: 'amber',
        },
        {
          icon: 'shield',
          tag: 'P',
          title: 'Protection & security',
          body: t('Owners control the use of their information; concurrent processes must not interfere. **Protection** = all access to resources is controlled. **Security** from outsiders requires **user authentication** and defends external I/O devices from invalid access.', 'أصحاب المعلومات يتحكموا في استخدامها؛ والـ processes المتزامنة ما تأثرش على بعض. الـ **protection** = كل وصول للموارد متحكم فيه. والـ **security** من الغرباء محتاجة **user authentication** وبتحمي الـ I/O devices الخارجية من الوصول الغلط.'),
          tone: 'rose',
        },
      ],
    },
    {
      kind: 'hook',
      title: t('Nine services, two families', 'تسع خدمات، عيلتين'),
      phrase: 'U-P-I-F-C-E helps you; R-A-P runs the house.',
      letters: [
        { letter: 'U', word: 'User interface' },
        { letter: 'P', word: 'Program execution' },
        { letter: 'I', word: 'I/O operations' },
        { letter: 'F', word: 'File systems' },
        { letter: 'C', word: 'Communications' },
        { letter: 'E', word: 'Error detection' },
        { letter: 'R', word: 'Resource allocation' },
        { letter: 'A', word: 'Accounting' },
        { letter: 'P', word: 'Protection & security' },
      ],
      body: t(
        'Exams love to mix one service from each family into a single sentence. Sort every item before you answer.',
        'الامتحانات بتحب تحط خدمة من كل عيلة في جملة واحدة. صنّف كل عنصر قبل ما تجاوب.',
      ),
    },

    part(
      t('The command-line interface', 'الـ Command-line interface'),
      t(
        'The **CLI or command interpreter** allows users to enter commands that are performed by the OS.',
        'الـ **CLI أو الـ command interpreter** بيخلّي المستخدم يكتب commands والـ OS ينفّذها.',
      ),
    ),
    {
      kind: 'flow',
      title: t('What the command interpreter does, over and over', 'الـ command interpreter بيعمل إيه، مرة ورا مرة'),
      steps: [
        { icon: 'terminal', label: 'Show a prompt', detail: t('e.g. `PBG-Mac-Pro:~ pbg$`.', 'زي `PBG-Mac-Pro:~ pbg$` في المحاضرة.'), tone: 'cyan' },
        { icon: 'keyboard', label: 'Obtain a command', detail: t('Read the next command the user types.', 'يقرا الـ command الجاية اللي المستخدم كتبها.'), tone: 'violet' },
        { icon: 'search', label: 'Find what it means', detail: t('Built-in code inside the shell — or just the **name of a program** to run.', 'كود جوه الـ shell نفسه — أو مجرد **اسم program** يتشغّل.'), tone: 'amber' },
        { icon: 'play', label: 'Execute it', detail: t('Run the code or the program; show its output.', 'يشغّل الكود أو البرنامج؛ ويعرض الـ output.'), tone: 'teal' },
      ],
      caption: t(
        'If commands are program names, **adding new features doesn’t require shell modification** — just add a new program.',
        'لو الـ commands أسامي programs، **إضافة features جديدة مش محتاجة تعديل الـ shell** — بس ضيف program جديد.',
      ),
    },
    {
      kind: 'visual',
      id: 'shell-demo',
      title: t('Bourne shell command interpreter', 'الـ Bourne shell command interpreter'),
      caption: t(
        'Click the commands from the lecture’s screenshot. Each one is just the name of a program the shell finds and runs.',
        'دوس على الـ commands اللي في صورة المحاضرة. كل واحد فيهم مجرد اسم program الـ shell بيلاقيه ويشغّله.',
      ),
    },
    {
      kind: 'cards',
      columns: 2,
      items: [
        {
          icon: 'chip',
          title: 'Where it lives',
          body: t('**Sometimes implemented in the kernel, sometimes by a systems program.**', '**ساعات بيتعمل جوه الـ kernel، وساعات كـ systems program.**'),
          tone: 'cyan',
        },
        {
          icon: 'layers',
          title: 'Shells',
          body: t('There may be **multiple flavors** of the interpreter, called **shells** (e.g. the Bourne shell).', 'ممكن يبقى فيه **أكتر من نوع** للـ interpreter، اسمهم **shells** (زي الـ Bourne shell).'),
          tone: 'violet',
        },
      ],
    },

    part(
      t('Graphical and touchscreen interfaces', 'الواجهات الرسومية واللمس'),
      t('From the desktop metaphor to finger gestures.', 'من الـ desktop metaphor لحد إيماءات الصباع.'),
    ),
    {
      kind: 'cards',
      title: t('The GUI: a user-friendly desktop metaphor', 'الـ GUI: desktop metaphor سهلة'),
      columns: 3,
      items: [
        { icon: 'monitor', title: 'Desktop metaphor', body: t('Usually uses a **mouse, keyboard and monitor**.', 'عادة بتستخدم **mouse وkeyboard وmonitor**.'), tone: 'cyan' },
        { icon: 'app', title: 'Icons', body: t('Icons represent **files, programs, actions** and other objects.', 'الأيقونات بتمثل **files وprograms وactions** وكائنات تانية.'), tone: 'teal' },
        { icon: 'target', title: 'Mouse buttons', body: t('Over objects they provide information or options, execute a function, or **open a directory (a folder)**.', 'على الكائنات بتدي معلومات أو options، أو تنفّذ وظيفة، أو **تفتح directory (folder)**.'), tone: 'violet' },
      ],
    },
    {
      kind: 'stats',
      items: [
        { value: '1970s', label: t('GUI invented at the **Xerox PARC** research facility', 'الـ GUI اتخترعت في **Xerox PARC**'), icon: 'book', tone: 'amber' },
        { value: 'CLI + GUI', label: t('many systems now include **both**', 'أنظمة كتير دلوقتي فيها **الاتنين**'), icon: 'layers', tone: 'cyan' },
        { value: '3', label: t('touchscreen needs: no mouse, gestures, virtual keyboard', 'احتياجات الـ touchscreen: من غير mouse، إيماءات، keyboard افتراضي'), icon: 'phone', tone: 'violet' },
      ],
    },
    {
      kind: 'cards',
      title: t('Who mixes CLI and GUI, and how', 'مين بيجمع CLI وGUI، وإزاي'),
      columns: 3,
      items: [
        { icon: 'monitor', title: 'Microsoft Windows', body: t('A **GUI** with a CLI “command” shell.', '**GUI** ومعاها CLI shell اسمه “command”.'), tone: 'cyan' },
        { icon: 'laptop', title: 'Apple Mac OS X', body: t('**“Aqua” GUI** with a **UNIX kernel** underneath and shells available.', '**“Aqua” GUI** وتحتها **UNIX kernel** والـ shells متاحة.'), tone: 'violet' },
        { icon: 'terminal', title: 'Unix and Linux', body: t('A **CLI** with optional GUI interfaces.', '**CLI** ومعاه واجهات GUI اختيارية.'), chips: ['CDE', 'KDE', 'GNOME'], tone: 'teal' },
      ],
    },
    {
      kind: 'cards',
      title: t('Touchscreen interfaces', 'واجهات اللمس'),
      columns: 3,
      items: [
        { icon: 'x', title: 'No mouse', body: t('A mouse is **not possible or not desired**.', 'الـ mouse **مش ممكن أو مش مرغوب**.'), tone: 'rose' },
        { icon: 'workflow', title: 'Motions', body: t('Actions and selection are **based on motions** (gestures).', 'الأوامر والاختيار **معتمدين على الحركات** (gestures).'), tone: 'amber' },
        { icon: 'keyboard', title: 'Virtual keyboard', body: t('A **virtual keyboard** for text entry.', '**Keyboard افتراضي** لكتابة النصوص.'), tone: 'cyan' },
      ],
    },
    {
      kind: 'versus',
      title: t('CLI vs GUI', 'CLI مقابل GUI'),
      left: { title: 'CLI', icon: 'terminal', tone: 'teal', tagline: t('Type commands', 'اكتب commands') },
      right: { title: 'GUI', icon: 'monitor', tone: 'violet', tagline: t('Point and click', 'شاور ودوس') },
      rows: [
        { aspect: 'Strength', left: t('Precise, scriptable, fast for an expert', 'دقيق، قابل للـ scripting، سريع للخبير'), right: t('**Intuitive and user-friendly** — easy to learn', '**بديهي وسهل** — سهل تتعلمه') },
        { aspect: 'You need', left: t('To remember command names', 'تفتكر أسامي الـ commands'), right: t('To recognise icons and menus', 'تتعرف على الأيقونات والقوايم') },
        { aspect: 'Devices', left: t('Keyboard', 'Keyboard'), right: t('Mouse, keyboard, monitor', 'Mouse وkeyboard وmonitor') },
      ],
      verdict: t(
        'The GUI’s advantage is ease of use, not speed or power. (Strengths beyond the lecture’s “user-friendly” are textbook background.)',
        'ميزة الـ GUI هي سهولة الاستخدام، مش السرعة أو القوة. (المميزات اللي بعد كلمة “user-friendly” في المحاضرة خلفية من الكتاب.)',
      ),
    },
    {
      kind: 'confusions',
      items: [
        {
          wrong: t('“Resource allocation is a service that helps the user.”', '“الـ resource allocation خدمة بتساعد المستخدم.”'),
          right: t('It belongs to the **system-efficiency** family, with accounting and protection & security.', 'هي من عيلة **كفاءة النظام**، مع الـ accounting والـ protection & security.'),
        },
        {
          wrong: t('“The command interpreter is the interface between the API and applications.”', '“الـ command interpreter هو الواجهة بين الـ API والـ applications.”'),
          right: t('It **gets the next user command and executes it**; the API is the programmer’s interface.', 'هو بي**جيب الـ command الجاية من المستخدم وينفّذها**؛ والـ API هي واجهة المبرمج.'),
        },
        {
          wrong: t('“Adding a command always means changing the shell.”', '“إضافة command معناها دايمًا تعديل الـ shell.”'),
          right: t('Not when commands are program names — just add the program.', 'مش لو الـ commands أسامي programs — ضيف البرنامج وخلاص.'),
        },
      ],
    },
    {
      kind: 'exam',
      title: t('Exam radar: services and interfaces', 'رادار الامتحان: الخدمات والواجهات'),
      body: t(
        'Two T/F statements (2020 and 2023 wording) pair two services and claim both help the user — sort each one into its family. Two MCQs ask for the **main function of the command interpreter** with the options in different orders, and one asks for the **advantage of a GUI over a CLI**.',
        'جملتين T/F (صياغة 2020 و2023) بيحطوا خدمتين مع بعض ويقولوا الاتنين بيساعدوا المستخدم — صنّف كل واحدة لعيلتها. واتنين MCQ بيسألوا عن **الوظيفة الأساسية للـ command interpreter** والاختيارات مترتبة بشكل مختلف، وواحد بيسأل عن **ميزة الـ GUI على الـ CLI**.',
      ),
      refs: ['c2-services-user-tf', 'c2-services-user-2020-tf', 'c2-command-interpreter-2024', 'c2-command-interpreter-2020', 'c2-gui-vs-cli'],
    },
    {
      kind: 'recap',
      items: [
        t('OS = environment for executing programs + services to programs and users.', 'الـ OS = بيئة لتنفيذ البرامج + خدمات للبرامج والمستخدمين.'),
        t('User-helpful: UI, program execution, I/O, file systems, communications, error detection.', 'بتساعد المستخدم: UI وprogram execution وI/O وfile systems وcommunications وerror detection.'),
        t('System-efficiency: resource allocation, accounting, protection & security.', 'لكفاءة النظام: resource allocation وaccounting وprotection & security.'),
        t('Command interpreter: obtain the next command and execute it; shells are its flavors.', 'الـ command interpreter: ياخد الـ command الجاية وينفّذها؛ والـ shells أنواعه.'),
        t('GUI: desktop metaphor, icons, mouse; invented at Xerox PARC in the 1970s.', 'الـ GUI: desktop metaphor وأيقونات وmouse؛ اتخترعت في Xerox PARC في السبعينات.'),
        t('Touchscreen: gestures and a virtual keyboard, no mouse.', 'الـ Touchscreen: إيماءات وkeyboard افتراضي، من غير mouse.'),
      ],
    },
  ],
  examFocus: [
    t('Sort the nine services: six help the user, three keep the system efficient.', 'صنّف التسع خدمات: ست بيساعدوا المستخدم، وتلاتة لكفاءة النظام.'),
    t('The command interpreter obtains and executes the next user-specified command; it can live in the kernel or in a systems program.', 'الـ command interpreter بياخد وينفّذ الـ command الجاية؛ وممكن يكون جوه الـ kernel أو systems program.'),
    t('The GUI’s advantage is being intuitive and user-friendly.', 'ميزة الـ GUI إنها بديهية وسهلة.'),
  ],
  keyTerms: [
    { term: 'Command interpreter', definition: t('The CLI program that obtains a user command and executes it.', 'برنامج الـ CLI اللي بياخد command من المستخدم وينفّذها.') },
    { term: 'Shell', definition: t('One of several flavors of command interpreter.', 'نوع من أنواع الـ command interpreter.') },
    { term: 'GUI', definition: t('User-friendly desktop-metaphor interface using icons and a mouse.', 'واجهة desktop metaphor سهلة بتستخدم أيقونات وmouse.') },
    { term: 'Resource allocation', definition: t('Allocating resources to concurrent users or jobs (a system-efficiency service).', 'توزيع الموارد على المستخدمين أو الـ jobs المتزامنة (خدمة كفاءة نظام).') },
    { term: 'Accounting', definition: t('Tracking which users use how much of which resources.', 'متابعة مين بيستخدم قد إيه من أنهي موارد.') },
    { term: 'Error detection', definition: t('Constant awareness of hardware, I/O and program errors, with corrective action.', 'متابعة مستمرة لأخطاء الـ hardware والـ I/O والبرامج، مع الإجراء المناسب.') },
  ],
}
