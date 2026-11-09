import type { Lesson } from '../../types'
import { part, t } from '../helpers'

/** Slides 26–39: allocation views and their three styles — deployment, install, work assignment. */
export const allocation: Lesson = {
  id: 'w4-allocation',
  weekId: 'week-4',
  order: 5,
  title: 'Allocation Views: Hardware, Files and Teams',
  shortTitle: 'Allocation Views',
  slides: [26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39],
  minutes: 20,
  tldr: t(
    'Allocation views map **software elements** (from module or C&C views) to **non-software elements** in the environment, with the relation **allocated-to**. Software elements *require* properties; environmental elements *provide* them. Three styles: **deployment** (C&C components → hardware: performance, availability, memory), **install** (components → files and folders in production) and **work assignment** (modules → development teams).',
    'الـ allocation views بتربط **عناصر السوفتوير** (من الـ module أو الـ C&C views) بـ **عناصر مش سوفتوير** في البيئة، بالعلاقة **allocated-to**. عناصر السوفتوير *بتحتاج* خصائص؛ وعناصر البيئة *بتوفّرها*. وفيه تلات styles: **deployment** (components الـ C&C ← الهاردوير: performance وavailability وmemory)، و**install** (الـ components ← ملفات وفولدرات في الـ production)، و**work assignment** (الـ modules ← فرق التطوير).',
  ),
  blocks: [
    part(t('What allocation views are', 'يعني إيه allocation views')),
    {
      kind: 'lead',
      text: t(
        'Allocation views embody decisions about how the system **relates to non-software structures** in its environment — CPUs, file systems, networks, development teams. They show the relationship between software elements and the external environments in which the software is **created and executed**.',
        'الـ allocation views بتمثّل قرارات عن علاقة السيستم بـ **structures مش سوفتوير** في بيئته — CPUs وأنظمة ملفات وشبكات وفرق تطوير. وبتورّي العلاقة بين عناصر السوفتوير والبيئات الخارجية اللي السوفتوير **بيتعمل وبيشتغل** فيها.',
      ),
    },
    {
      kind: 'list',
      title: t('Questions allocation structures help answer', 'أسئلة الـ allocation structures بتساعد تجاوبها'),
      items: [
        t('**What processor** does each software element execute on?', 'كل عنصر سوفتوير **بيشتغل على أنهي processor**؟'),
        t('In **what directories** is each element stored during development / testing / system building?', 'كل عنصر **متخزّن في أنهي فولدرات** أثناء التطوير / الاختبار / بناء السيستم؟'),
      ],
    },
    {
      kind: 'table',
      caption: t('The allocation style at a glance', 'الـ allocation style في جدول'),
      headers: ['Part', 'Value'],
      rows: [
        [t('Elements'), t('**Software element** and **environmental element**.', '**عنصر سوفتوير** و**عنصر بيئة**.')],
        [t('Properties'), t('A software element has properties **required of** the environment; an environmental element has properties **provided to** the software.', 'عنصر السوفتوير ليه خصائص **مطلوبة من** البيئة؛ وعنصر البيئة ليه خصائص **بيوفّرها** للسوفتوير.')],
        [t('Relation'), t('**Allocated-to**: a software element is mapped to an environmental element.', '**Allocated-to**: عنصر السوفتوير بيتربط بعنصر بيئة.')],
      ],
    },
    {
      kind: 'diagram',
      id: 'allocation-styles',
      title: t('Three allocation styles', 'تلات allocation styles'),
      caption: t(
        'Software elements from module or C&C views are mapped to: a **computing platform** (deployment style), a **production environment** (install style) and a **development organization** (work assignment style).',
        'عناصر السوفتوير من الـ module أو الـ C&C views بتتربط بـ: **منصة حوسبة** (deployment style)، و**بيئة الـ production** (install style)، و**منظمة التطوير** (work assignment style).',
      ),
    },
    {
      kind: 'hook',
      title: t('Three styles, three “where” questions', 'تلات styles، تلات أسئلة “فين”'),
      phrase: 'Runs on · Installed in · Built by',
      letters: [
        { letter: 'D', word: 'Deployment — runs on which hardware?' },
        { letter: 'I', word: 'Install — sits in which files/folders?' },
        { letter: 'W', word: 'Work assignment — built by which team?' },
      ],
    },

    part(t('Deployment style', 'الـ Deployment style')),
    {
      kind: 'definition',
      term: 'Deployment style',
      definition: t(
        'Describes the mapping of **components and connectors** in the software architecture to the **hardware of the computing platform**. Elements: software elements (from a **C&C view**) and environmental elements (nodes: servers, PCs, devices, networks).',
        'بيوصف ربط **الـ components والـ connectors** بـ **هاردوير منصة الحوسبة**. العناصر: عناصر سوفتوير (من **C&C view**) وعناصر بيئة (nodes: سيرفرات، أجهزة، شبكات).',
      ),
    },
    {
      kind: 'diagram',
      id: 'deployment',
      title: t('UML deployment diagrams', 'رسومات deployment بالـ UML'),
      caption: t('The **Internet user PC** (over «internet») and the «Win desktop» **Admin user PC** (over «intranet», running the `app-client.jar` artefact) connect to a «Win server» **Application server** whose «execution environment» **WebSphere** hosts `EnterpriseWebApp.ear`; it talks to a «linux server» **Database server**. On the right, nesting: `shopping.war` («web archive») inside **Apache Tomcat 5.5** («JSP server») inside **SUSE Linux Ent 10** («OS») on a **Sun Fire X4150** («device»).', '**جهاز مستخدم الإنترنت** (عن طريق «internet») و**جهاز الأدمن** «Win desktop» (عن طريق «intranet»، وشغّال عليه `app-client.jar`) متوصلين بـ **Application server** «Win server» جواه «execution environment» اسمها **WebSphere** شايلة `EnterpriseWebApp.ear`؛ وبيكلّم **Database server** «linux server». وعلى اليمين التداخل: `shopping.war` («web archive») جوّه **Apache Tomcat 5.5** («JSP server») جوّه **SUSE Linux Ent 10** («OS») على **Sun Fire X4150** («device»).'),
    },
    {
      kind: 'definition',
      term: 'Artifact · «deploy»',
      definition: t(
        'An **artifact** is a physical file produced by development (`.jar`, `.ear`, `.war`). A «deploy» relationship places an artifact on the node that runs it.',
        'الـ **artifact** ملف فعلي ناتج من التطوير (`.jar` و`.ear` و`.war`). وعلاقة «deploy» بتحط الـ artifact على الـ node اللي بيشغّله.',
      ),
    },
    {
      kind: 'asks',
      items: [
        { q: 'Usage? Performance?', a: t('Components that talk a lot should share a node or a fast link; you can see which connectors cross the network and estimate latency and bandwidth.', 'الـ components اللي بتتكلم كتير لازم تبقى على نفس الـ node أو على رابط سريع؛ وبتشوف أنهي connectors بتعدّي الشبكة وتقدّر الـ latency والـ bandwidth.') },
        { q: 'Availability?', a: t('You see whether critical components are **replicated on separate nodes** and what fails if one node goes down (failover).', 'بتشوف الـ components المهمة **متكررة على nodes منفصلة** ولا لأ، وإيه اللي يقع لو node واحدة وقعت (failover).') },
        { q: 'Can such a view help in memory capacity analysis?', a: t('**Yes.** Annotate **physical units** with what they provide (e.g. 16 GB RAM) and **software elements** with what they require (e.g. 6 GB each); the view shows whether everything allocated to a node fits.', '**أيوه.** حط على **الوحدات الفيزيائية** اللي بتوفّره (زي 16 GB RAM)، وعلى **عناصر السوفتوير** اللي محتاجاه (زي 6 GB لكل واحد)؛ والـ view بيورّيك كل اللي اتحط على الـ node هيكفي ولا لأ.') },
      ],
    },

    part(t('Install style', 'الـ Install style')),
    {
      kind: 'definition',
      term: 'Install style',
      definition: t(
        'Allocates components of a C&C style to a **file management system in the production environment**. Once implemented, the resulting files must be **packaged** to be installed on the target platform (a desktop, or a server running an application server).',
        'بيوزّع components الـ C&C على **نظام الملفات في بيئة الـ production**. وبعد التنفيذ، الملفات الناتجة لازم **تتحزّم** عشان تتسطّب على المنصة المستهدفة (جهاز مكتبي، أو سيرفر شغّال عليه application server).',
      ),
    },
    {
      kind: 'cards',
      title: t('Files an install view covers', 'الملفات اللي الـ install view بيغطيها'),
      columns: 4,
      items: [
        { icon: 'package', title: 'Code', tone: 'blue', body: t('Libraries, executable files, scripts.', 'مكتبات، ملفات تنفيذية، scripts.') },
        { icon: 'database', title: 'Data & logs', tone: 'teal', body: t('Data files, log files.', 'ملفات داتا، ملفات logs.') },
        { icon: 'wrench', title: 'Configuration', tone: 'violet', body: t('Configuration and version-control files, deployment descriptors, license files.', 'ملفات الإعدادات والـ version control، والـ deployment descriptors، وملفات الترخيص.') },
        { icon: 'book', title: 'Content & help', tone: 'amber', body: t('Help files and static content (HTML files, images).', 'ملفات المساعدة والمحتوى الثابت (HTML وصور).') },
      ],
    },
    {
      kind: 'callout',
      tone: 'key',
      title: t('What any install notation must show', 'أي رموز للـ install view لازم توريه'),
      body: t(
        'The **components**, the **files and folders**, the **mapping** between them — and the **tree structure** of the files and folders.',
        'الـ **components**، والـ **ملفات والفولدرات**، و**الربط** بينهم — و**شكل الشجرة** بتاع الملفات والفولدرات.',
      ),
    },
    {
      kind: 'code',
      title: 'DukesBankApp — install view as a file tree',
      language: 'text',
      code: `DukesBankApp.ear                       (JAR file)
├── account-ejb.jar
│   ├── Account Controller EJB          (EJB)
│   └── Account EJB                     (EJB)
├── customer-ejb.jar
│   ├── Customer Controller EJB
│   └── Customer EJB
├── tx-ejb.jar
│   ├── Tx Controller EJB
│   └── TxEJB
└── web-client.war
    ├── Dispatcher (servlet)            (web component)
    ├── JSPs
    ├── WebMessages.properties          (file)
    ├── .tld files
    ├── .gif and .html files
    └── struts.jar

app-client.jar                         (separate)
├── Bank Admin                          (Java application)
└── AdminMessages.properties`,
      notes: [
        t('The tree distinguishes JAR files, ordinary files, web components, EJBs and Java applications.', 'الشجرة بتفرّق بين ملفات JAR والملفات العادية والـ web components والـ EJBs والـ Java applications.'),
        t('In UML, the same tree uses «artifact» boxes linked by **«manifest»** (this file packages that component), with «sessionbean» controllers, «entitybean» data beans, the «J2EEapp.client» BankAdmin, the «servlet» Dispatcher and «JSP» `*.jsp` (shorthand for all JSP files).', 'وبالـ UML نفس الشجرة بتترسم بصناديق «artifact» مربوطة بـ **«manifest»** (الملف ده بيحزّم الـ component ده)، ومعاها controllers «sessionbean»، وdata beans «entitybean»، وBankAdmin «J2EEapp.client»، وDispatcher «servlet»، و«JSP» `*.jsp` (اختصار لكل ملفات الـ JSP).'),
      ],
    },

    part(t('Work assignment style', 'الـ Work assignment style')),
    {
      kind: 'definition',
      term: 'Work assignment style',
      definition: t(
        'Allocates **modules** of a module style to the **groups and individuals** responsible for realizing the system. It defines the responsibility for **implementing and integrating** the modules to the appropriate development teams.',
        'بيوزّع **الـ modules** على **الفرق والأفراد** المسؤولين عن تنفيذ السيستم. وبيحدد مسؤولية **التنفيذ والدمج** لكل module للفريق المناسب.',
      ),
    },
    {
      kind: 'asks',
      items: [
        { q: 'Software elements: modules or components?', a: t('**Modules.** Teams write code, so they are assigned units of implementation — not runtime components. (The definition itself says “allocates modules”.)', '**Modules.** الفرق بتكتب كود، فبيتوزّع عليهم وحدات تنفيذ — مش components وقت التشغيل. (التعريف نفسه بيقول “allocates modules”.)') },
      ],
    },
    {
      kind: 'table',
      caption: t('Work assignment for the ECS system', 'توزيع الشغل لسيستم ECS'),
      headers: ['Segment', 'Subsystem (module)', 'Organizational unit'],
      rows: [
        [t('Science Data Processing Segment (SDPS)'), t('Client'), t('Science team', 'فريق العلوم')],
        [t('SDPS'), t('Interoperability'), t('Prime contractor team 1', 'فريق المقاول الرئيسي 1')],
        [t('SDPS'), t('Ingest'), t('Prime contractor team 2', 'فريق المقاول الرئيسي 2')],
        [t('SDPS'), t('Data Management · Data Processing · Data Server'), t('Data team', 'فريق الداتا')],
        [t('SDPS'), t('Planning'), t('Orbital vehicle team', 'فريق المركبة المدارية')],
        [t('Flight Operations Segment (FOS)'), t('Planning and Scheduling'), t('Orbital vehicle team', 'فريق المركبة المدارية')],
        [t('FOS'), t('Data Management'), t('Database team', 'فريق قواعد البيانات')],
        [t('FOS'), t('User Interface'), t('User interface team', 'فريق الواجهة')],
      ],
    },
    {
      kind: 'callout',
      tone: 'insight',
      title: t('Why architects care who builds what', 'المعماري يهمه ليه مين بيبني إيه'),
      body: t(
        'The work assignment view drives scheduling, budgets and communication: modules with heavy **uses** relations between them are easiest when one team (or close teams) owns them.',
        'الـ work assignment view بيأثر على الجدول والميزانية والتواصل: الـ modules اللي بينها علاقات **uses** كتير أسهل لما فريق واحد (أو فرق قريبة) يمسكها.',
      ),
    },
  ],
  keyTerms: [
    { term: 'Allocation view', definition: t('Maps software elements (from module or C&C views) to non-software environmental elements.', 'بيربط عناصر السوفتوير (من module أو C&C views) بعناصر بيئة مش سوفتوير.') },
    { term: 'Allocated-to', definition: t('The relation of allocation styles: a software element is mapped to an environmental element.', 'علاقة الـ allocation styles: عنصر السوفتوير بيتربط بعنصر بيئة.') },
    { term: 'Required vs provided properties', definition: t('Software elements require properties from the environment; environmental elements provide them.', 'عناصر السوفتوير بتحتاج خصائص من البيئة؛ وعناصر البيئة بتوفّرها.') },
    { term: 'Deployment style', definition: t('C&C components and connectors → hardware of the computing platform; for performance, availability, capacity.', 'الـ components والـ connectors ← هاردوير منصة الحوسبة؛ للـ performance والـ availability والسعة.') },
    { term: 'Install style', definition: t('C&C components → files and folders of the production environment; must show components, files/folders, mapping and tree.', 'الـ components ← ملفات وفولدرات بيئة الـ production؛ ولازم يورّي الـ components والملفات والربط والشجرة.') },
    { term: 'Work assignment style', definition: t('Modules → teams and individuals responsible for implementing and integrating them.', 'الـ Modules ← الفرق والأفراد المسؤولين عن تنفيذها ودمجها.') },
    { term: 'Artifact / «manifest»', definition: t('A physical file (.jar/.ear/.war); «manifest» links an artifact to the component it packages.', 'ملف فعلي (.jar/.ear/.war)؛ و«manifest» بيربط الـ artifact بالـ component اللي بيحزّمه.') },
  ],
  recap: [
    t('Allocation views: software elements ↔ non-software environment (CPUs, file systems, networks, teams); relation allocated-to.', 'الـ Allocation views: عناصر السوفتوير ↔ بيئة مش سوفتوير (CPUs وملفات وشبكات وفرق)؛ والعلاقة allocated-to.'),
    t('Questions: which processor runs each element; which directories store it during dev/test/build.', 'الأسئلة: أنهي processor بيشغّل كل عنصر؛ وأنهي فولدرات بتخزّنه أثناء التطوير/الاختبار/البناء.'),
    t('Deployment: C&C → hardware (WebSphere/.ear on a Win server, Tomcat/shopping.war on SUSE on Sun Fire); helps performance, availability, memory capacity.', 'الـ Deployment: الـ C&C ← الهاردوير (WebSphere/.ear على Win server، وTomcat/shopping.war على SUSE على Sun Fire)؛ بيساعد في الـ performance والـ availability وسعة الذاكرة.'),
    t('Install: components → packaged files in production (DukesBankApp.ear, EJB jars, web-client.war, app-client.jar); show components, files, mapping, tree.', 'الـ Install: الـ components ← ملفات متحزّمة في الـ production (DukesBankApp.ear وEJB jars وweb-client.war وapp-client.jar)؛ وورّي الـ components والملفات والربط والشجرة.'),
    t('Work assignment: modules → teams (ECS: SDPS and FOS subsystems to science, data, database, UI, orbital-vehicle teams).', 'الـ Work assignment: الـ modules ← الفرق (ECS: subsystems الـ SDPS والـ FOS لفرق العلوم والداتا وقواعد البيانات والواجهة والمركبة).'),
  ],
}
