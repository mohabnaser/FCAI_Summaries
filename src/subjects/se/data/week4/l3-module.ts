import type { Lesson } from '../../types'
import { part, t } from '../helpers'

/** Slides 10–18: module structures, the decomposition style (ATIA-M) and the uses style. */
export const moduleViews: Lesson = {
  id: 'w4-module',
  weekId: 'week-4',
  order: 3,
  title: 'Module Views: Decomposition & Uses',
  shortTitle: 'Module Views',
  slides: [10, 11, 12, 13, 14, 15, 16, 17, 18],
  minutes: 16,
  tldr: t(
    'Module views describe the **code**: what each module is responsible for and what it depends on — mainly useful for **modifiability**. The **decomposition** style splits a system into modules and sub-modules (relation **is-a-part-of**, one parent, no loops). The **uses** style shows which module’s **correctness depends** on which other — used to **plan incremental development**.',
    'الـ module views بتوصف **الكود**: كل module مسؤول عن إيه وبيعتمد على إيه — ومفيدة أساسًا للـ **modifiability**. الـ style بتاع **decomposition** بيقسّم السيستم لـ modules وsub-modules (العلاقة **is-a-part-of**، وأب واحد، ومفيش loops). والـ style بتاع **uses** بيورّي **صحة** أنهي module **معتمدة** على أنهي module تاني — وبيتستخدم في **تخطيط التطوير على مراحل**.',
  ),
  blocks: [
    part(t('What module structures answer', 'الـ module structures بتجاوب على إيه')),
    {
      kind: 'list',
      title: t('Questions module structures help us answer', 'أسئلة الـ module structures بتساعدنا نجاوبها'),
      ordered: true,
      items: [
        t('What is the **primary functional responsibility** assigned to each module?', 'إيه **المسؤولية الوظيفية الأساسية** لكل module؟'),
        t('What other software elements is a module **allowed to use**?', 'إيه العناصر التانية اللي الـ module **مسموحله يستخدمها**؟'),
        t('What other software does the module **use / depend on**?', 'الـ module **بيستخدم / بيعتمد** على أنهي سوفتوير تاني؟'),
        t('What modules are related to others by **generalization or specialization**?', 'أنهي modules مرتبطة ببعض بعلاقة **تعميم أو تخصيص** (وراثة)؟'),
      ],
    },
    {
      kind: 'asks',
      items: [
        {
          q: 'How can such structures be helpful? Modifiability?',
          a: t(
            'Yes — **modifiability** is their main payoff. If you know each module’s responsibility and dependencies, you can predict **which modules a change will touch** (its ripple effect) before you make it, and keep changes local.',
            'أيوه — الـ **modifiability** هي أهم مكسب. لو عارف مسؤولية كل module واعتمادياته، تقدر تتوقع **التغيير هيلمس أنهي modules** (أثره المتسلسل) قبل ما تعمله، وتخلّي التعديلات محلية.',
          ),
        },
      ],
    },
    {
      kind: 'cards',
      title: t('Some useful module views', 'شوية module views مفيدة'),
      columns: 4,
      items: [
        { icon: 'boxes', title: 'Decomposition style', tone: 'blue', body: t('Modules and sub-modules: **is-a-part-of**. (Detailed below.)', 'modules وsub-modules: **is-a-part-of**. (متشرح تحت.)') },
        { icon: 'branch', title: 'Uses style', tone: 'violet', body: t('Which module **depends on** which. (Detailed below.)', 'أنهي module **بيعتمد** على أنهي. (متشرح تحت.)') },
        { icon: 'layers', title: 'Generalization style', tone: 'teal', body: t('Modules related by **is-a** (inheritance / specialization) — e.g. `Cooler` is an `Actuator`.', 'modules مرتبطة بـ **is-a** (وراثة / تخصيص) — زي إن `Cooler` نوع من `Actuator`.') },
        { icon: 'database', title: 'Data model style', tone: 'amber', body: t('The **data entities** and their relationships (like an ER diagram).', '**كيانات الداتا** والعلاقات بينها (زي الـ ER diagram).') },
      ],
    },

    part(t('Decomposition style', 'الـ Decomposition style')),
    {
      kind: 'definition',
      term: 'Decomposition style',
      definition: t(
        'Used for decomposing a system into **units of implementation**. A decomposition view describes the organization of the code as **modules and sub-modules** and shows how **system responsibilities are partitioned** across them.',
        'بيتستخدم لتقسيم السيستم لـ **وحدات تنفيذ**. والـ decomposition view بيوصف تنظيم الكود كـ **modules وsub-modules** وبيورّي **مسؤوليات السيستم اتوزعت** عليهم إزاي.',
      ),
    },
    {
      kind: 'table',
      caption: t('The decomposition style at a glance', 'الـ decomposition style في جدول'),
      headers: ['Part', 'Value'],
      rows: [
        [t('Relation'), t('**is-a-part-of**', '**is-a-part-of** (جزء من)')],
        [t('Elements'), t('Module (subsystem, package, class, etc.)', 'Module (subsystem، package، class، إلخ)')],
        [t('Constraint 1'), t('**No loops** are allowed in the decomposition graph.', '**مفيش loops** مسموحة في رسمة الـ decomposition.')],
        [t('Constraint 2'), t('A module can have **only one parent**.', 'الـ module ليه **أب واحد بس**.')],
      ],
    },
    {
      kind: 'idea',
      title: 'A tree, like folders on a disk',
      icon: 'map',
      tone: 'blue',
      text: t(
        'The two constraints make decomposition a **tree**: every module sits inside exactly one parent, and nothing can contain itself.',
        'القيدين دول بيخلّوا الـ decomposition **شجرة**: كل module جوّه أب واحد بالظبط، ومفيش حاجة ممكن تحتوي نفسها.',
      ),
      analogy: t(
        'Like folders: a folder lives in exactly one parent folder, and a folder can’t be inside its own sub-folder.',
        'زي الفولدرات: الفولدر جوّه فولدر أب واحد بس، ومينفعش فولدر يبقى جوّه فولدر من اللي جواه.',
      ),
    },
    {
      kind: 'diagram',
      id: 'decomposition',
      title: t('Containment: A ⊃ B–E, and the ATIA-M system', 'الاحتواء: A جواه B–E، وسيستم ATIA-M'),
      caption: t('Parent module A contains B, C, D, E. **ATIA-M** contains *Windows apps* (common code for thick clients, TDDT Windows app, UTMC Windows app), *ATIA server-side Web modules* and *ATIA server-side Java modules*.', 'الـ module الأب A جواه B وC وD وE. و**ATIA-M** جواه *Windows apps* (كود مشترك للـ thick clients، وتطبيق TDDT، وتطبيق UTMC)، و*ATIA server-side Web modules*، و*ATIA server-side Java modules*.'),
    },
    {
      kind: 'code',
      title: 'ATIA server-side Java modules — decomposition',
      language: 'text',
      code: `ATIA server-side Java modules
├── «subsystem» adlsc
├── controller
├── business
├── servlet
├── utils
├── «subsystem» itc
├── client
├── facades
├── entity
├── objects
├── test
├── «subsystem» tdc
├── taglibs
└── «subsystem» CCS
    ├── webservice
    ├── portal
    ├── security
    └── common`,
      notes: [
        t('A more detailed decomposition of the server-side Java modules: most modules are package-like boxes, and the **CCS** subsystem is a nested container (webservice, portal, security, common).', 'decomposition أدق للـ server-side Java modules: أغلب الـ modules صناديق زي الـ packages، والـ subsystem اللي اسمه **CCS** container متداخل (webservice وportal وsecurity وcommon).'),
      ],
    },

    part(t('Uses style', 'الـ Uses style')),
    {
      kind: 'memorize',
      label: 'Uses relation',
      text: 'A module uses another module if its correctness depends on the correctness of the other.',
      note: t(
        '“Uses” is stronger than “calls”: A uses B when **A cannot be correct unless B is correct**. The uses view makes explicit which modules use which others to achieve their responsibilities.',
        '“Uses” أقوى من “بينادي”: A بيستخدم B لما **A ميقدرش يبقى صح غير لو B صح**. والـ uses view بيوضّح صراحةً أنهي modules بتستخدم أنهي modules عشان تعمل مسؤولياتها.',
      ),
    },
    {
      kind: 'table',
      caption: t('The uses style at a glance', 'الـ uses style في جدول'),
      headers: ['Part', 'Value'],
      rows: [
        [t('Relation'), t('**uses** (depends on)', '**uses** (بيعتمد على)')],
        [t('Elements'), t('Module', 'Module')],
        [t('What it’s for'), t('**Planning incremental development** — which subsets can be built and tested first.', '**تخطيط التطوير على مراحل** — أنهي أجزاء تتبني وتتجرّب الأول.')],
        [t('Constraint?'), t('Using **loops**? (see below)', '**Loops** في الاستخدام؟ (شوف تحت)')],
      ],
    },
    {
      kind: 'asks',
      items: [
        {
          q: 'Constraints: using loops?',
          a: t(
            'Unlike decomposition, the uses graph does not forbid loops — but they are a **warning sign**. If A uses B and B uses A, neither can be built, tested or released without the other, which **destroys incremental development**. Architects try to keep the uses graph loop-free (layered) so a small working subset can be delivered first.',
            'عكس الـ decomposition، رسمة الـ uses مش بتمنع الـ loops — بس هي **علامة خطر**. لو A بيستخدم B وB بيستخدم A، يبقى ولا واحد فيهم يتبني أو يتجرّب أو يتسلّم من غير التاني، وده **بيبوّظ التطوير على مراحل**. فالمعماري بيحاول يخلّي رسمة الـ uses من غير loops (طبقات) عشان يسلّم جزء صغير شغال الأول.',
          ),
        },
      ],
    },
    {
      kind: 'diagram',
      id: 'uses',
      title: t('Uses view of ATIA-M', 'الـ uses view لسيستم ATIA-M'),
      caption: t(
        'Both Windows apps use the common thick-client code and the server-side Web modules; the Web modules use the server-side Java modules. Build order follows the arrows backwards: Java modules → Web modules → apps.',
        'تطبيقين الـ Windows بيستخدموا الكود المشترك والـ server-side Web modules؛ والـ Web modules بتستخدم الـ server-side Java modules. وترتيب البناء عكس الأسهم: Java modules ← Web modules ← التطبيقات.',
      ),
    },
    {
      kind: 'callout',
      tone: 'note',
      title: t('Another example: a UML uses graph (eStore)', 'مثال تاني: رسمة uses بالـ UML (eStore)'),
      body: t('A UML dependency graph with dashed **«use»** arrows between `estore.webapp`, `web::estore`, static Web artefacts, `admin.client`, `web::shared`, `estore.core`, `web::accessControl`, `admin.core`, `util` and `dao`; `admin.client`, `admin.core`, `dao` and `util` are highlighted. (The TDDT Windows app above is also referred to as TDDC.)', 'رسمة dependencies بالـ UML بأسهم متقطعة **«use»** بين `estore.webapp` و`web::estore` والملفات الثابتة و`admin.client` و`web::shared` و`estore.core` و`web::accessControl` و`admin.core` و`util` و`dao`؛ ومعلّم على `admin.client` و`admin.core` و`dao` و`util`. (وتطبيق TDDT اللي فوق بيتسمّى كمان TDDC.)'),
    },
    {
      kind: 'versus',
      title: t('Don’t confuse the two module styles', 'متلخبطش بين الـ module styles الاتنين'),
      left: { title: 'Decomposition', icon: 'boxes', tone: 'blue' },
      right: { title: 'Uses', icon: 'branch', tone: 'violet' },
      rows: [
        { aspect: 'Relation', left: t('is-a-part-of (containment)', 'is-a-part-of (احتواء)'), right: t('uses (correctness depends on)', 'uses (الصحة معتمدة على)') },
        { aspect: 'Shape', left: t('A **tree**: one parent, no loops.', '**شجرة**: أب واحد ومفيش loops.'), right: t('A **graph**; loops allowed but harmful.', '**رسمة بيانية**؛ الـ loops مسموحة بس مضرة.') },
        { aspect: 'Used for', left: t('Organizing code, partitioning responsibilities.', 'تنظيم الكود وتوزيع المسؤوليات.'), right: t('Planning increments, impact analysis.', 'تخطيط المراحل وتحليل أثر التغيير.') },
      ],
    },
  ],
  keyTerms: [
    { term: 'Module structures — questions', definition: t('Each module’s responsibility, what it may use, what it uses/depends on, generalization/specialization.', 'مسؤولية كل module، المسموحله يستخدمه، اللي بيستخدمه/بيعتمد عليه، والتعميم/التخصيص.') },
    { term: 'Decomposition style', definition: t('Splits a system into modules and sub-modules; relation is-a-part-of; no loops; one parent.', 'بيقسّم السيستم لـ modules وsub-modules؛ العلاقة is-a-part-of؛ مفيش loops؛ أب واحد.') },
    { term: 'Uses relation', definition: t('A uses B if A’s correctness depends on B’s correctness.', 'A بيستخدم B لو صحة A معتمدة على صحة B.') },
    { term: 'Uses style — purpose', definition: t('Planning incremental development (and analysing the impact of change).', 'تخطيط التطوير على مراحل (وتحليل أثر التغيير).') },
    { term: 'Generalization style', definition: t('Modules related by is-a (inheritance/specialization).', 'modules مرتبطة بـ is-a (وراثة/تخصيص).') },
    { term: 'Data model style', definition: t('Data entities and their relationships.', 'كيانات الداتا والعلاقات بينها.') },
    { term: 'ATIA-M', definition: t('An example system: Windows apps (common code, TDDT/TDDC, UTMC), server-side Web modules, server-side Java modules.', 'سيستم مثال: Windows apps (كود مشترك، TDDT/TDDC، UTMC)، وserver-side Web modules، وserver-side Java modules.') },
  ],
  recap: [
    t('Module structures answer: responsibility, allowed use, actual dependencies, generalization — mainly for modifiability.', 'الـ module structures بتجاوب على: المسؤولية، المسموح استخدامه، الاعتماديات الفعلية، والتعميم — وأساسًا للـ modifiability.'),
    t('Useful module views: decomposition, uses, generalization, data model.', 'module views مفيدة: decomposition وuses وgeneralization وdata model.'),
    t('Decomposition: units of implementation; is-a-part-of; elements = modules; no loops, one parent (a tree).', 'الـ Decomposition: وحدات تنفيذ؛ is-a-part-of؛ العناصر = modules؛ مفيش loops وأب واحد (شجرة).'),
    t('Uses: A uses B if A’s correctness depends on B; for planning incremental development; loops hurt increments.', 'الـ Uses: A بيستخدم B لو صحة A معتمدة على B؛ لتخطيط المراحل؛ والـ loops بتبوّظ المراحل.'),
    t('ATIA-M examples: nested decomposition and a uses graph (apps → common code & Web modules → Java modules).', 'أمثلة ATIA-M: decomposition متداخل ورسمة uses (التطبيقات ← الكود المشترك والـ Web modules ← الـ Java modules).'),
  ],
}
