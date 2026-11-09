import type { Lesson } from '../../types'
import { part, t } from '../helpers'

/** Slides 6–9: the three kinds of structures, and why modules and components are not the same thing. */
export const kinds: Lesson = {
  id: 'w4-kinds',
  weekId: 'week-4',
  order: 2,
  title: 'Three Kinds of Structures — and Module vs Component',
  shortTitle: 'Module · C&C · Allocation',
  slides: [6, 7, 8, 9],
  minutes: 12,
  tldr: t(
    'Every architectural structure belongs to one of **three categories**, matching three kinds of design decisions: **module** structures (the code, static), **component-and-connector** structures (the running system, dynamic) and **allocation** structures (how software maps to hardware, files and teams). A **module** is a unit of implementation; a **component** is a runtime entity — and they are **not one-to-one**.',
    'أي structure معمارية بتتبع واحدة من **تلات فئات**، على قد تلات أنواع من قرارات التصميم: structures الـ **module** (الكود، ثابتة)، وstructures الـ **component-and-connector** (السيستم وهو شغال، متحركة)، وstructures الـ **allocation** (السوفتوير بيتوزع إزاي على الهاردوير والملفات والفرق). والـ **module** وحدة تنفيذ (كود)؛ والـ **component** كيان وقت التشغيل — و**مفيش بينهم علاقة واحد لواحد**.',
  ),
  blocks: [
    part(t('Three kinds of structures', 'تلات أنواع من الـ structures')),
    {
      kind: 'lead',
      text: t(
        'Architectural structures are divided into **three major categories** depending on the broad nature of the elements they show. The categories correspond to **three broad kinds of decisions** that architectural design involves.',
        'الـ structures المعمارية بتتقسم لـ **تلات فئات رئيسية** حسب طبيعة العناصر اللي بتعرضها. والفئات دي بتقابل **تلات أنواع كبيرة من القرارات** في التصميم المعماري.',
      ),
    },
    {
      kind: 'diagram',
      id: 'three-structures',
      title: t('Three lenses on one system', 'تلات عدسات على سيستم واحد'),
      caption: t(
        'Module = how it is **built** (code). C&C = how it **behaves** while running. Allocation = **where** it lives and **who** builds it. Each category has its own styles, detailed in the next lessons.',
        'الـ Module = **اتبنى** إزاي (الكود). والـ C&C = **بيتصرف** إزاي وهو شغال. والـ Allocation = **عايش فين** و**مين** بيبنيه. وكل فئة ليها styles خاصة بيها، متشرحة في الدروس الجاية.',
      ),
    },
    {
      kind: 'hook',
      title: t('Three questions, three categories', 'تلات أسئلة، تلات فئات'),
      phrase: 'Code · Runtime · Environment',
      letters: [
        { letter: 'M', word: 'Module — what is the code made of?' },
        { letter: 'C', word: 'C&C — what runs and who talks to whom?' },
        { letter: 'A', word: 'Allocation — on what, where, by whom?' },
      ],
    },

    part(t('Module vs component', 'الـ Module مقابل الـ Component')),
    {
      kind: 'versus',
      left: { title: 'Module', icon: 'code', tone: 'blue', tagline: t('Unit of implementation', 'وحدة تنفيذ (كود)') },
      right: { title: 'Component', icon: 'activity', tone: 'violet', tagline: t('Runtime entity', 'كيان وقت التشغيل') },
      rows: [
        { aspect: 'Nature', left: t('**Static** — exists in the source tree, at design / build time.', '**ثابت** — موجود في الكود، وقت التصميم والـ build.'), right: t('**Dynamic** — exists only while the system runs (a process, a server, an object instance).', '**متحرك** — موجود بس والسيستم شغال (process، سيرفر، instance).') },
        { aspect: 'Examples', left: t('Package, class, subsystem, layer.', 'package، class، subsystem، layer.'), right: t('Client, server, process, data store.', 'client، server، process، data store.') },
        { aspect: 'Appears in', left: t('**Module views** (decomposition, uses…).', '**Module views** (decomposition وuses…).'), right: t('**C&C views** (client-server, pipes, queues…).', '**C&C views** (client-server والـ pipes والـ queues…).') },
      ],
    },
    {
      kind: 'asks',
      title: t('Module vs component — the key questions', 'module ولا component — الأسئلة المهمة'),
      items: [
        { q: 'Static vs dynamic?', a: t('Module = **static** (code that sits still). Component = **dynamic** (something that executes).', 'الـ Module = **ثابت** (كود قاعد مكانه). والـ Component = **متحرك** (حاجة بتتنفذ).') },
        { q: 'Unit of implementation vs runtime entity?', a: t('Module = **unit of implementation**; component = **runtime entity**.', 'الـ Module = **وحدة تنفيذ**؛ والـ component = **كيان وقت التشغيل**.') },
        { q: 'Source code, XML files, config files, grammar files for parsers… where do they fit?', a: t('They are **implementation artefacts** → they belong to **modules** (what developers write and organise). Grammar files (such as BNF definitions) are what parser generators read.', 'دي **مخرجات تنفيذ** ← مكانها الـ **modules** (اللي المطورين بيكتبوه وينظّموه). وملفات الـ grammar (زي تعريفات BNF) هي اللي بيتولّد منها الـ parsers.') },
        { q: 'An executable binary… where does it fit?', a: t('It is neither: it is a **built artefact**. When **run**, it becomes one or more **components**; *where* it is installed and *which machine* runs it is shown by **allocation views** (install / deployment).', 'ولا ده ولا ده: ده **ناتج build**. ولما **يشتغل** بيبقى component واحد أو أكتر؛ و*فين* بيتسطّب و*أنهي جهاز* بيشغّله بتوريه الـ **allocation views** (install / deployment).') },
        { q: '“Who cares?! Every module becomes exactly one component at runtime…”', a: t('**No!** The mapping is not one-to-one — that is exactly why we need both kinds of views.', '**لأ!** العلاقة مش واحد لواحد — وده بالظبط ليه محتاجين النوعين من الـ views.') },
      ],
    },
    {
      kind: 'memorize',
      label: 'Module ↔ component',
      text: 'A single module may turn into many components. Many modules may turn into a single component.',
    },
    {
      kind: 'diagram',
      id: 'module-vs-component',
      title: t('Same system, two views', 'نفس السيستم، viewين'),
      caption: t(
        'The decomposition view shows **2 modules** (Client, Server). The client-server view of the same system shows **10 client components** (C1–C10) talking to **S1** over request-reply connectors: one Client module → ten running copies.',
        'الـ decomposition view بيورّي **2 modules** (Client وServer). والـ client-server view لنفس السيستم بيورّي **10 client components** (C1–C10) بيكلّموا **S1** بـ request-reply: module واحد اسمه Client ← عشر نسخ شغالة.',
      ),
    },
    {
      kind: 'cards',
      columns: 2,
      items: [
        { icon: 'split', title: 'One module → many components', tone: 'violet', body: t('The same `Client` code runs on 10 machines → 10 client components. A web-server module running as 4 replicas → 4 components.', 'نفس كود الـ `Client` شغال على 10 أجهزة ← 10 client components. وmodule سيرفر ويب شغال 4 نسخ ← 4 components.') },
        { icon: 'boxes', title: 'Many modules → one component', tone: 'blue', body: t('A UI module, a logic module and a utils module compiled into one executable → **one** running process.', 'module واجهة وmodule منطق وmodule أدوات اتعملهم compile في برنامج واحد ← process واحد **بس** شغال.') },
      ],
    },
  ],
  keyTerms: [
    { term: 'Module structures', definition: t('Structures of units of implementation (code): decomposition, uses, generalization, data model.', 'structures لوحدات التنفيذ (الكود): decomposition وuses وgeneralization وdata model.') },
    { term: 'Component-and-connector (C&C) structures', definition: t('Structures of runtime elements (components) and their interaction pathways (connectors).', 'structures لعناصر وقت التشغيل (components) وطرق تفاعلها (connectors).') },
    { term: 'Allocation structures', definition: t('Mapping of software elements to non-software environment elements (hardware, files, teams).', 'ربط عناصر السوفتوير بعناصر البيئة اللي مش سوفتوير (هاردوير، ملفات، فرق).') },
    { term: 'Module', definition: t('A static unit of implementation (package, class, subsystem).', 'وحدة تنفيذ ثابتة (package، class، subsystem).') },
    { term: 'Component', definition: t('A dynamic runtime entity (process, client, server, data store).', 'كيان متحرك وقت التشغيل (process، client، server، data store).') },
    { term: 'Module ↔ component mapping', definition: t('Not one-to-one: one module → many components; many modules → one component.', 'مش واحد لواحد: module واحد ← components كتير؛ وmodules كتير ← component واحد.') },
  ],
  recap: [
    t('Three categories of structures = three kinds of decisions: module, component-and-connector, allocation.', 'تلات فئات structures = تلات أنواع قرارات: module وcomponent-and-connector وallocation.'),
    t('Module = static unit of implementation; component = dynamic runtime entity.', 'الـ Module = وحدة تنفيذ ثابتة؛ والـ component = كيان متحرك وقت التشغيل.'),
    t('Source, XML, config and grammar files are module-side artefacts; a binary becomes components when run and is placed by allocation views.', 'الكود وملفات XML والإعدادات والـ grammar من ناحية الـ modules؛ والـ binary بيبقى components لما يشتغل ومكانه بتحدده الـ allocation views.'),
    t('One module may become many components; many modules may become one component — so “who cares?” → we do.', 'module واحد ممكن يبقى components كتير؛ وmodules كتير ممكن يبقوا component واحد — فـ “مين يهتم؟” ← إحنا.'),
    t('Example: Client + Server modules vs C1–C10 talking to S1.', 'مثال: modules الـ Client والـ Server ضد C1–C10 بيكلّموا S1.'),
  ],
}
