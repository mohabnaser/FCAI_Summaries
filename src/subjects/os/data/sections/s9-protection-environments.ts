import type { Section } from '../../types'
import { part, t } from './helpers'

/** Slides 44–57: protection & security, computing environments, virtualization, cloud, real-time, open source. */
export const protectionEnvironments: Section = {
  id: 'protection-environments',
  order: 9,
  kicker: 'Lesson 09',
  title: 'Protection, Security & Computing Environments',
  shortTitle: 'Protection & Environments',
  summary: t(
    'Who may do what inside the system (protection) and how it survives attacks (security) — then the wider world the OS runs in: mobile, distributed, client–server, peer-to-peer, virtual machines, the cloud, real-time embedded devices and open source.',
    'مين يقدر يعمل إيه جوه النظام (protection) وإزاي النظام يستحمل الهجمات (security) — وبعدين العالم الأوسع اللي الـ OS بيشتغل فيه: mobile وdistributed وclient–server وpeer-to-peer والـ virtual machines والـ cloud والـ real-time embedded devices والـ open source.',
  ),
  objectives: [
    t('Distinguish protection from security and explain user IDs, group IDs and privilege escalation.', 'تفرّق بين protection وsecurity وتشرح الـ user IDs والـ group IDs والـ privilege escalation.'),
    t('Compare traditional, mobile, distributed, client–server and peer-to-peer environments.', 'تقارن بيئات traditional وmobile وdistributed وclient–server وpeer-to-peer.'),
    t('Explain virtualization vs emulation and the role of the VMM.', 'تشرح الـ virtualization مقابل الـ emulation ودور الـ VMM.'),
    t('Describe cloud computing: architecture, public/private/hybrid, SaaS/PaaS/IaaS.', 'توصف الـ cloud computing: المعمارية، وpublic/private/hybrid، وSaaS/PaaS/IaaS.'),
    t('State the defining property of a real-time OS and the idea behind open-source OSs.', 'تقول الخاصية الأساسية للـ real-time OS والفكرة ورا الـ open-source OSs.'),
  ],
  estimatedMinutes: 22,
  quizId: 'quiz-protection-environments',
  blocks: [
    part(
      t('Protection and security', 'الـ Protection والـ security'),
      t('Two words students mix up constantly.', 'كلمتين الطلبة بيلخبطوا بينهم على طول.'),
    ),
    {
      kind: 'versus',
      left: { title: 'Protection', icon: 'lock', tone: 'cyan', tagline: t('Controlling access **inside** the system', 'التحكم في الوصول **جوه** النظام') },
      right: { title: 'Security', icon: 'shield', tone: 'rose', tagline: t('Defending the system against **attacks**', 'الدفاع عن النظام ضد **الهجمات**') },
      rows: [
        { aspect: 'Definition', left: t('Any **mechanism for controlling access** of processes or users to resources defined by the OS', 'أي **آلية للتحكم في وصول** الـ processes أو الـ users للموارد اللي الـ OS معرّفها'), right: t('**Defense of the system against internal and external attacks**', '**الدفاع عن النظام ضد الهجمات الداخلية والخارجية**') },
        { aspect: 'Question', left: t('May this user/process touch this resource?', 'هل الـ user/process ده مسموح له يلمس المورد ده؟'), right: t('Is someone trying to break, steal or abuse the system?', 'هل فيه حد بيحاول يكسر أو يسرق أو يسيء استخدام النظام؟') },
        { aspect: 'Examples', left: t('File permissions, memory protection', 'File permissions وmemory protection'), right: t('Denial-of-service, worms, viruses, identity theft, theft of service', 'Denial-of-service وworms وviruses وidentity theft وtheft of service') },
      ],
    },
    {
      kind: 'visual',
      id: 'protection',
      title: t('Identity, resources and access decisions', 'الهوية والموارد وقرارات الوصول'),
      caption: t('Pick a user and a resource; the OS maps identity to rights, then decides.', 'اختار user ومورد؛ الـ OS بيربط الهوية بالصلاحيات وبعدين يقرر.'),
    },
    {
      kind: 'flow',
      title: t('How the system decides who can do what', 'النظام بيقرر مين يعمل إيه إزاي'),
      steps: [
        { icon: 'user', label: 'User ID', detail: t('Name + associated number, **one per user** (user IDs, security IDs).', 'اسم + رقم مرتبط بيه، **واحد لكل مستخدم** (user IDs وsecurity IDs).'), tone: 'cyan' },
        { icon: 'link', label: 'Attached to everything', detail: t('The user ID is associated with **all files and processes** of that user.', 'الـ user ID بيترابط بـ **كل الـ files والـ processes** بتوع المستخدم ده.'), tone: 'violet' },
        { icon: 'users', label: 'Group ID', detail: t('Defines a **set of users** whose controls are managed together; also attached to each process and file.', 'بيعرّف **مجموعة users** صلاحياتهم بتتدار مع بعض؛ وكمان مربوط بكل process وfile.'), tone: 'teal' },
        { icon: 'key', label: 'Privilege escalation', detail: t('Lets a user change to an **effective ID with more rights**.', 'بيخلّي المستخدم يتحول لـ **effective ID بصلاحيات أكتر**.'), tone: 'amber' },
      ],
    },

    part(
      t('Computing environments', 'بيئات الحوسبة'),
      t('Where operating systems actually run.', 'الـ operating systems بتشتغل فين فعلًا.'),
    ),
    {
      kind: 'cards',
      columns: 3,
      items: [
        {
          icon: 'monitor',
          title: 'Traditional',
          tag: '',
          body: t(
            'Stand-alone general-purpose machines — but the line is blurring: **portals** give web access to internal systems, **network computers (thin clients)** act like web terminals (more security, easier maintenance), mobile computers use wireless, and even home systems use **firewalls**.',
            'أجهزة general-purpose مستقلة — بس الحدود بتتمسح: الـ **portals** بتدّي web access للأنظمة الداخلية، والـ **network computers (thin clients)** زي web terminals (أمان أكتر وصيانة أسهل)، والـ mobile بيستخدم wireless، وحتى أجهزة البيت بتستخدم **firewalls**.',
          ),
          chips: ['portals', 'thin clients', 'firewalls'],
          tone: 'cyan',
        },
        {
          icon: 'phone',
          title: 'Mobile',
          tag: '',
          body: t(
            'Smartphones and tablets add OS features a laptop lacks — **GPS, gyroscope, photos and video** — enabling apps like **augmented reality**. They connect over **IEEE 802.11** wireless or **cellular data**. Leaders: **Apple iOS** and **Google Android**.',
            'الـ smartphones والـ tablets بيضيفوا features مش في الـ laptop — **GPS وgyroscope وتصوير وفيديو** — وده بيسمح بـ apps زي **augmented reality**. بيتوصلوا بـ **IEEE 802.11** أو **cellular data**. والرواد: **Apple iOS** و**Google Android**.',
          ),
          chips: ['GPS', 'gyroscope', 'AR', 'iOS', 'Android'],
          tone: 'violet',
        },
        {
          icon: 'network',
          title: 'Distributed',
          tag: '',
          body: t(
            'A collection of separate, possibly **heterogeneous** systems networked together. The network (TCP/IP most common) is a communications path. A **network operating system** provides features such as file sharing across the network, a communication scheme for messages, and the **impression of a single system**.',
            'مجموعة أنظمة منفصلة، وممكن **heterogeneous**، متوصلة بشبكة. والشبكة (TCP/IP الأشهر) هي طريق التواصل. والـ **network operating system** بيوفّر features زي file sharing عبر الشبكة، وطريقة لتبادل الرسايل، و**إحساس إنه نظام واحد**.',
          ),
          chips: ['LAN', 'WAN', 'MAN', 'PAN', 'TCP/IP'],
          tone: 'teal',
        },
      ],
    },
    {
      kind: 'visual',
      id: 'network-models',
      title: t('Client–server vs peer-to-peer: one request in each', 'Client–server مقابل peer-to-peer: طلب واحد في كل واحد'),
      caption: t(
        'In client–server the roles are fixed. In P2P the same node is a client in one exchange and a server in the next.',
        'في الـ client–server الأدوار ثابتة. وفي الـ P2P نفس الـ node بتبقى client في تبادل وserver في التبادل اللي بعده.',
      ),
    },
    {
      kind: 'versus',
      left: { title: 'Client–server', icon: 'server', tone: 'cyan', tagline: t('Servers respond to requests generated by clients', 'الـ servers بترد على طلبات الـ clients') },
      right: { title: 'Peer-to-peer (P2P)', icon: 'network', tone: 'violet', tagline: t('Does not distinguish clients and servers', 'مش بيفرّق بين clients وservers') },
      rows: [
        { aspect: 'Roles', left: t('Fixed: a server serves, clients consume; dumb terminals were supplanted by smart PCs', 'ثابتة: الـ server بيخدم والـ clients بتستهلك؛ والـ dumb terminals اتبدلت بـ smart PCs'), right: t('**All nodes are peers**; each may act as client, server or both', '**كل الـ nodes peers**؛ وكل واحدة ممكن تبقى client أو server أو الاتنين') },
        { aspect: 'Kinds / joining', left: t('**Compute-server** (interface to request services, e.g. a database) and **file-server** (store and retrieve files)', '**Compute-server** (interface لطلب خدمات زي database) و**file-server** (تخزين وجلب files)'), right: t('A node must **join**: register with a **central lookup service**, or **broadcast** requests and respond via a **discovery protocol**', 'الـ node لازم **تنضم**: تسجّل في **central lookup service**، أو تعمل **broadcast** للطلبات وترد عن طريق **discovery protocol**') },
        { aspect: 'Examples', left: t('Database server, file server', 'Database server وfile server'), right: t('Napster, Gnutella, VoIP such as Skype', 'Napster وGnutella وVoIP زي Skype') },
      ],
      verdict: t('P2P is “another model of distributed system”.', 'الـ P2P هو “another model of distributed system”.'),
    },

    part(
      t('Virtualization', 'الـ Virtualization'),
      t('Operating systems running as applications within other operating systems.', 'Operating systems شغالة كـ applications جوه operating systems تانية.'),
    ),
    {
      kind: 'visual',
      id: 'virtualization-stack',
      title: t('Non-virtual, virtual machines, and emulation', 'Non-virtual والـ virtual machines والـ emulation'),
      caption: t('The lecture’s two stacks, plus emulation for contrast.', 'الاتنين stacks بتوع المحاضرة، ومعاهم الـ emulation في المحاضرة للمقارنة.'),
    },
    {
      kind: 'versus',
      left: { title: 'Virtualization', icon: 'layers', tone: 'teal', tagline: t('Same CPU type, native speed', 'نفس نوع الـ CPU، سرعة طبيعية') },
      right: { title: 'Emulation', icon: 'repeat', tone: 'rose', tagline: t('Different CPU type, translation', 'نوع CPU مختلف، ترجمة') },
      rows: [
        { aspect: 'When', left: t('OS **natively compiled** for the CPU, running guest OSs **also natively compiled**', 'OS **متعمل له compile native** للـ CPU، وبيشغّل guest OSs **متعمل لها compile native برضه**'), right: t('**Source CPU type differs from target CPU type** (e.g. PowerPC → Intel x86)', '**نوع الـ CPU الأصلي غير الـ CPU الهدف** (زي PowerPC → Intel x86)') },
        { aspect: 'Speed', left: t('Near native', 'قريب من الطبيعي'), right: t('**Generally the slowest method**', '**عمومًا أبطأ طريقة**') },
        { aspect: 'Example', left: t('VMware running WinXP guests, each running applications, all on a native WinXP host OS', 'VMware بيشغّل WinXP guests، كل واحد شغّال applications، فوق WinXP host OS native'), right: t('Running old PowerPC software on an Intel Mac; related: **interpretation** of languages not compiled to native code', 'تشغيل برامج PowerPC قديمة على Intel Mac؛ وقريب منها: **interpretation** للغات مش متعمل لها compile لـ native code') },
        { aspect: 'Provided by', left: t('The **VMM** (virtual machine manager)', 'الـ **VMM** (virtual machine manager)'), right: t('An emulator / interpreter', 'Emulator / interpreter') },
      ],
    },
    {
      kind: 'cards',
      title: t('Why people use virtual machines', 'الناس بتستخدم الـ virtual machines ليه'),
      columns: 4,
      items: [
        { icon: 'laptop', title: 'Several OSs on one laptop', body: t('Exploration or compatibility — e.g. an Apple laptop running a Mac OS X host with Windows as a guest.', 'للتجربة أو التوافق — زي Apple laptop شغّال Mac OS X host وWindows كـ guest.'), tone: 'cyan' },
        { icon: 'code', title: 'Develop for many OSs', body: t('Build apps for multiple OSs without having multiple systems.', 'تبني apps لكذا OS من غير ما يبقى عندك كذا جهاز.'), tone: 'violet' },
        { icon: 'check', title: 'QA testing', body: t('Test applications without having multiple systems.', 'تختبر الـ applications من غير كذا جهاز.'), tone: 'teal' },
        { icon: 'server', title: 'Data centers', body: t('Execute and manage compute environments within data centers.', 'تشغيل وإدارة compute environments جوه الـ data centers.'), tone: 'amber' },
      ],
    },
    {
      kind: 'callout',
      tone: 'insight',
      title: t('When the VMM is the host', 'لما الـ VMM يبقى هو الـ host'),
      body: t(
        '**VMMs can run natively**, in which case they are also the host — there is no separate host OS underneath.',
        '**الـ VMMs ممكن تشتغل natively**، وساعتها هي نفسها الـ host — مفيش host OS منفصل تحتها.',
      ),
    },

    part(
      t('Cloud computing', 'الـ Cloud computing'),
      t('Computing, storage and even apps delivered **as a service across a network**.', 'الحوسبة والتخزين وحتى الـ apps بتتقدّم **كخدمة عبر الشبكة**.'),
    ),
    {
      kind: 'lead',
      text: t(
        'Cloud computing is a **logical extension of virtualization** — it is based on it. Amazon **EC2** has thousands of servers, millions of VMs and petabytes of storage available across the Internet, and you **pay based on usage**. Cloud environments are built from the usual OSs **plus VMMs and cloud management tools**.',
        'الـ cloud computing **امتداد منطقي للـ virtualization** — ومبني عليها. Amazon **EC2** عنده آلاف الـ servers وملايين الـ VMs وpetabytes من الـ storage متاحة على الإنترنت، و**بتدفع على قد استخدامك**. وبيئات الـ cloud معمولة من الـ OSs العادية **+ VMMs وأدوات cloud management**.',
      ),
    },
    {
      kind: 'flow',
      title: t('A customer request through the cloud', 'طلب عميل جوه الـ cloud'),
      steps: [
        { icon: 'globe', label: 'Internet', detail: t('Customer requests arrive from the Internet.', 'طلبات العملاء جاية من الإنترنت.'), tone: 'cyan' },
        { icon: 'shield', label: 'Firewall', detail: t('Internet connectivity **requires security like firewalls**.', 'الاتصال بالإنترنت **محتاج security زي الـ firewalls**.'), tone: 'rose' },
        { icon: 'app', label: 'Cloud customer interface', detail: t('The entry point customers use.', 'نقطة الدخول اللي العملاء بيستخدموها.'), tone: 'violet' },
        { icon: 'scale', label: 'Load balancer', detail: t('**Spreads traffic across multiple applications.**', '**بيوزّع الـ traffic على كذا application.**'), tone: 'amber' },
        { icon: 'server', label: 'VMs, servers, storage', detail: t('Run the work; **cloud management services** control them via management commands.', 'بيشغّلوا الشغل؛ و**cloud management services** بتتحكم فيهم بـ management commands.'), tone: 'teal' },
      ],
    },
    {
      kind: 'cards',
      title: t('Who can use the cloud? (deployment models)', 'مين يقدر يستخدم الـ cloud؟ (deployment models)'),
      columns: 3,
      items: [
        { icon: 'globe', title: 'Public cloud', body: t('Available via the Internet to **anyone willing to pay**.', 'متاح عبر الإنترنت لـ **أي حد مستعد يدفع**.'), tone: 'cyan' },
        { icon: 'lock', title: 'Private cloud', body: t('Run by a company **for the company’s own use**.', 'شركة بتشغّله **لاستخدامها هي بس**.'), tone: 'violet' },
        { icon: 'split', title: 'Hybrid cloud', body: t('Includes **both public and private** cloud components.', 'فيه مكونات **public وprivate مع بعض**.'), tone: 'teal' },
      ],
    },
    {
      kind: 'cards',
      title: t('What does the cloud give you? (service models)', 'الـ cloud بيدّيك إيه؟ (service models)'),
      columns: 3,
      items: [
        { icon: 'app', tag: 'SaaS', title: 'Software as a Service', body: t('One or more **applications** available via the Internet.', '**Application** أو أكتر متاحة عبر الإنترنت.'), chips: ['e.g. word processor'], tone: 'amber' },
        { icon: 'database', tag: 'PaaS', title: 'Platform as a Service', body: t('A **software stack** ready for application use via the Internet.', '**Software stack** جاهز إن الـ applications تستخدمه عبر الإنترنت.'), chips: ['e.g. database server'], tone: 'violet' },
        { icon: 'server', tag: 'IaaS', title: 'Infrastructure as a Service', body: t('**Servers or storage** available over the Internet.', '**Servers أو storage** متاحين عبر الإنترنت.'), chips: ['e.g. storage for backup'], tone: 'teal' },
      ],
    },
    {
      kind: 'hook',
      title: t('Service models from the top down', 'الـ service models من فوق لتحت'),
      phrase: 'SaaS: use the app. PaaS: build on the platform. IaaS: rent the machines.',
      letters: [
        { letter: 'S', word: 'Software → an application' },
        { letter: 'P', word: 'Platform → a software stack' },
        { letter: 'I', word: 'Infrastructure → servers / storage' },
      ],
    },

    part(
      t('Real-time embedded systems and open source', 'الـ Real-time embedded systems والـ open source'),
      t('The most common computers of all, and operating systems you can read.', 'أكتر كمبيوترات منتشرة، وoperating systems تقدر تقرا كودها.'),
    ),
    {
      kind: 'cards',
      columns: 2,
      items: [
        {
          icon: 'car',
          title: 'Real-time embedded systems',
          tag: '',
          body: t(
            'The **most prevalent form of computers**. They vary considerably: special purpose, limited-purpose OS, **real-time OS**, usually **little or no user interface**. Some special environments have OSs; some perform their tasks without an OS.',
            '**أكتر شكل منتشر من الكمبيوترات**. بيختلفوا جدًا: special purpose، وOS محدود الغرض، و**real-time OS**، وغالبًا **user interface قليلة أو مفيش**. وفيه بيئات خاصة ليها OS، وبيئات بتعمل شغلها من غير OS.',
          ),
          tone: 'amber',
        },
        {
          icon: 'copyleft',
          title: 'Open-source operating systems',
          tag: '',
          body: t(
            'Made available in **source-code format** rather than just binary closed-source — counter to copy protection and **DRM**. Started by the **Free Software Foundation (FSF)**, which has the “**copyleft**” **GNU Public License (GPL)**. Examples: **GNU/Linux** and **BSD UNIX** (including the core of Mac OS X).',
            'متاحة بـ **صيغة source code** مش binary مقفول بس — عكس الـ copy protection والـ **DRM**. بدأتها **Free Software Foundation (FSF)**، وعندها الـ “**copyleft**” **GNU Public License (GPL)**. أمثلة: **GNU/Linux** و**BSD UNIX** (ومنها قلب Mac OS X).',
          ),
          chips: ['FSF', 'GPL', 'copyleft', 'GNU/Linux', 'BSD'],
          tone: 'teal',
        },
      ],
    },
    {
      kind: 'definition',
      term: 'Real-time OS',
      definition: t(
        'An OS with **well-defined, fixed time constraints**: processing **must be done within the constraint**, and correct operation **only if the constraints are met**.',
        'OS عنده **قيود زمنية ثابتة ومحددة**: المعالجة **لازم تخلص جوه القيد**، والتشغيل يبقى صح **بس لو القيود اتحققت**.',
      ),
      detail: t(
        'A correct answer delivered too late is a wrong answer for a real-time system.',
        'الإجابة الصح لو اتأخرت تبقى إجابة غلط في الـ real-time system.',
      ),
    },
    {
      kind: 'callout',
      tone: 'insight',
      title: t('Try an OS without installing it', 'جرّب OS من غير ما تسطّبه'),
      body: t(
        'You can use a VMM such as **VMware Player** (free on Windows) or **VirtualBox** (open source and free on many platforms) to run guest operating systems for exploration.',
        'تقدر تستخدم VMM زي **VMware Player** (مجاني على Windows) أو **VirtualBox** (open source ومجاني على منصات كتير) عشان تشغّل guest operating systems للتجربة.',
      ),
    },
    {
      kind: 'confusions',
      items: [
        {
          wrong: t('“Protection and security mean the same thing.”', '“الـ protection والـ security نفس المعنى.”'),
          right: t('Protection = **access-control mechanism**; security = **defense against attacks**.', 'الـ protection = **آلية تحكم في الوصول**؛ والـ security = **دفاع ضد الهجمات**.'),
        },
        {
          wrong: t('“In P2P there is a central server.”', '“في الـ P2P فيه server مركزي.”'),
          right: t('There may be a central **lookup** service, but every node can serve — there is no client/server distinction.', 'ممكن يبقى فيه **lookup** service مركزي، بس كل node تقدر تخدم — مفيش تفرقة client/server.'),
        },
        {
          wrong: t('“Emulation is the fastest way to run another OS.”', '“الـ emulation أسرع طريقة تشغّل بيها OS تاني.”'),
          right: t('Emulation is **generally the slowest**; virtualization of a natively compiled guest is much faster.', 'الـ emulation **عمومًا الأبطأ**؛ والـ virtualization لـ guest متعمل له compile native أسرع بكتير.'),
        },
        {
          wrong: t('“SaaS gives you raw servers.”', '“الـ SaaS بيدّيك servers خام.”'),
          right: t('Raw servers or storage = **IaaS**; a ready software stack = **PaaS**; an application = **SaaS**.', 'Servers أو storage خام = **IaaS**؛ software stack جاهز = **PaaS**؛ application = **SaaS**.'),
        },
      ],
    },
    {
      kind: 'exam',
      title: t('Exam radar: a wide topic with one past question', 'رادار الامتحان: موضوع واسع وسؤال قديم واحد'),
      body: t(
        'The supplied papers test this part once: a T/F about the **fundamental idea behind a virtual machine**. Use the lecture’s picture — how many hardware boxes, how many VMs. The rest of the section has no past-exam item, so expect definition-style questions (protection vs security, SaaS/PaaS/IaaS, real-time OS) to be fair game.',
        'الامتحانات اللي عندنا اختبرت الجزء ده مرة واحدة: T/F عن **الفكرة الأساسية ورا الـ virtual machine**. استخدم صورة المحاضرة — كام hardware box وكام VM. وباقي الجزء مفيهوش سؤال قديم، فتوقع أسئلة تعريفات (protection مقابل security، SaaS/PaaS/IaaS، real-time OS).',
      ),
      refs: ['s11-virtual-machine-tf'],
    },
    {
      kind: 'recap',
      items: [
        t('Protection: controls access to OS resources; security: defends against attacks.', 'الـ protection: بتتحكم في الوصول لموارد الـ OS؛ والـ security: بتدافع ضد الهجمات.'),
        t('UID (one per user) + GID attached to files and processes; escalation → effective ID.', 'الـ UID (واحد لكل مستخدم) + الـ GID مربوطين بالـ files والـ processes؛ والـ escalation ← effective ID.'),
        t('Client–server: fixed roles (compute/file server). P2P: all nodes peers.', 'Client–server: أدوار ثابتة (compute/file server). P2P: كل الـ nodes peers.'),
        t('Virtualization: VMM, guests share one machine natively; emulation translates, slowest.', 'الـ virtualization: VMM وguests بيشاركوا جهاز واحد natively؛ والـ emulation بتترجم، والأبطأ.'),
        t('Cloud: extension of virtualization; public/private/hybrid; SaaS/PaaS/IaaS.', 'الـ cloud: امتداد للـ virtualization؛ public/private/hybrid؛ SaaS/PaaS/IaaS.'),
        t('Real-time OS: fixed time constraints; open source: FSF, GPL copyleft, Linux, BSD.', 'الـ Real-time OS: قيود زمنية ثابتة؛ والـ open source: FSF وGPL copyleft وLinux وBSD.'),
      ],
    },
  ],
  examFocus: [
    t('Protection is a mechanism for controlling access; security is defense against internal and external attacks.', 'الـ protection آلية للتحكم في الوصول؛ والـ security دفاع ضد الهجمات الداخلية والخارجية.'),
    t('A virtual machine abstracts the hardware of one computer into several execution environments, managed by a VMM.', 'الـ virtual machine بتجرّد hardware كمبيوتر واحد لكذا execution environment، والـ VMM بيديرهم.'),
    t('Emulation is used when source and target CPU types differ and is generally the slowest method.', 'الـ emulation بتتستخدم لما نوع الـ CPU الأصلي والهدف يختلفوا، وعمومًا الأبطأ.'),
    t('Cloud service models: SaaS (applications), PaaS (software stack), IaaS (servers/storage).', 'الـ cloud service models: SaaS (applications) وPaaS (software stack) وIaaS (servers/storage).'),
  ],
  keyTerms: [
    { term: 'Protection', definition: t('Mechanism for controlling access of processes or users to OS resources.', 'آلية للتحكم في وصول الـ processes أو الـ users لموارد الـ OS.') },
    { term: 'Security', definition: t('Defense of the system against internal and external attacks.', 'الدفاع عن النظام ضد الهجمات الداخلية والخارجية.') },
    { term: 'Privilege escalation', definition: t('Changing to an effective ID with more rights.', 'التحول لـ effective ID بصلاحيات أكتر.') },
    { term: 'Peer-to-peer', definition: t('Distributed model where every node is a peer — client, server or both.', 'نموذج distributed كل node فيه peer — client أو server أو الاتنين.') },
    { term: 'VMM', definition: t('Virtual machine manager: provides virtualization services to guest OSs.', 'Virtual machine manager: بيقدّم خدمات الـ virtualization للـ guest OSs.') },
    { term: 'Emulation', definition: t('Running code built for one CPU type on a different CPU type by translation.', 'تشغيل كود معمول لنوع CPU على نوع تاني عن طريق الترجمة.') },
    { term: 'SaaS / PaaS / IaaS', definition: t('Application / software stack / servers or storage as a service.', 'Application / software stack / servers أو storage كخدمة.') },
    { term: 'Real-time OS', definition: t('OS with fixed time constraints; correct only if they are met.', 'OS بقيود زمنية ثابتة؛ صح بس لو اتحققت.') },
  ],
}
