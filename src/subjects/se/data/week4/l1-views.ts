import type { Lesson } from '../../types'
import { part, t } from '../helpers'

/** Slides 1–5: an architecture is documented as views; which views; structures vs views; one system, many views. */
export const views: Lesson = {
  id: 'w4-views',
  weekId: 'week-4',
  order: 1,
  title: 'Architectural Views: One System, Many Pictures',
  shortTitle: 'What Views Are',
  slides: [1, 2, 3, 4, 5],
  minutes: 12,
  tldr: t(
    'An architecture is too rich for one drawing, so its document is **several views + documentation beyond views**. A **structure** is the set of elements itself; a **view** is a **representation** of one or more structures. No single view can represent the whole architecture — you choose views by the **quality attributes** your stakeholders care about.',
    'الـ architecture أغنى من إنها تترسم في رسمة واحدة، فالمستند بتاعها عبارة عن **كذا view + توثيق برّه الـ views**. والـ **structure** هي مجموعة العناصر نفسها؛ والـ **view** هي **تمثيل** لـ structure أو أكتر. ومفيش view واحدة تقدر تمثّل الـ architecture كلها — وبتختار الـ views حسب **الـ quality attributes** اللي أصحاب المصلحة مهتمين بيها.',
  ),
  blocks: [
    {
      kind: 'lead',
      text: t(
        'Remember the Week 2 definition: architecture is the **set of structures** needed to reason about a system. A *set* — never one. This week is about how we draw and document those structures.',
        'افتكر تعريف أسبوع 2: الـ architecture هي **مجموعة الـ structures** اللازمة للتفكير في السيستم. *مجموعة* — عمرها ما تبقى واحدة. والأسبوع ده عن إزاي بنرسم ونوثّق الـ structures دي.',
      ),
    },

    part(t('An architecture document is a set of views', 'مستند الـ architecture = مجموعة views')),
    {
      kind: 'diagram',
      id: 'views-equation',
      title: t('The documentation equation', 'معادلة التوثيق'),
      caption: t(
        'Software Architecture for System XYZ = Part 1: a view + Part 2: a view + … + Part n: a view + Part n+1: **documentation beyond views** (things that apply to all views: the rationale, how views relate, a glossary…).',
        'الـ Software Architecture لسيستم XYZ = جزء 1: view + جزء 2: view + … + جزء n: view + جزء n+1: **توثيق برّه الـ views** (حاجات بتخص كل الـ views: المبررات، علاقة الـ views ببعض، قاموس مصطلحات…).',
      ),
    },
    {
      kind: 'idea',
      title: 'Why not one big diagram?',
      icon: 'map',
      tone: 'blue',
      text: t(
        'One diagram that shows code, runtime behaviour, servers and teams at once becomes unreadable. Each view answers **one kind of question** clearly.',
        'رسمة واحدة فيها الكود والسلوك وقت التشغيل والسيرفرات والفرق مرة واحدة بتبقى مستحيلة تتقري. كل view بتجاوب على **نوع واحد من الأسئلة** بوضوح.',
      ),
      analogy: t(
        'A city has a road map, a metro map, an electricity map and a water-pipe map. Same city; each map is useful to a different person. Nobody wants them all printed on one sheet.',
        'المدينة ليها خريطة شوارع، وخريطة مترو، وخريطة كهربا، وخريطة مواسير مية. نفس المدينة؛ وكل خريطة مفيدة لشخص مختلف. ومحدش عايزهم مطبوعين كلهم في ورقة واحدة.',
      ),
    },

    part(t('Which views are relevant?', 'أنهي views مهمة؟')),
    {
      kind: 'cards',
      columns: 2,
      items: [
        { icon: 'gauge', title: 'Views expose qualities', tone: 'blue', body: t('Different views expose **different quality attributes to different degrees**.', 'الـ views المختلفة بتكشف **quality attributes مختلفة بدرجات مختلفة**.') },
        { icon: 'users', title: 'Stakeholder concerns decide', tone: 'violet', body: t('The quality attributes of **most concern to you and the other stakeholders** decide which views you document.', 'الـ quality attributes **الأهم ليك ولباقي أصحاب المصلحة** هي اللي بتحدد أنهي views توثّقها.') },
        { icon: 'target', title: 'Different goals', tone: 'teal', body: t('Different views support **different goals**.', 'الـ views المختلفة بتخدم **أهداف مختلفة**.') },
        { icon: 'eye', title: 'Different highlights', tone: 'amber', body: t('Different views **highlight different elements and/or relations**.', 'الـ views المختلفة **بتبرز عناصر و/أو علاقات مختلفة**.') },
      ],
    },
    {
      kind: 'asks',
      items: [
        {
          q: 'What are the relevant views? Examples — a deployment view?',
          a: t(
            'It depends on the qualities that matter. A **deployment view** (software → hardware) is relevant when you care about **performance** (which parts share a machine or cross the network), **availability** (replicas on separate machines) and **security** (which zone each part sits in). If modifiability matters most, **module views** (decomposition, uses) are the relevant ones.',
            'بتعتمد على الجودة المهمة. الـ **deployment view** (السوفتوير ← الهاردوير) مهمة لما تهتم بالـ **performance** (أنهي أجزاء على نفس الجهاز وأنهي بتعدّي الشبكة)، والـ **availability** (نسخ على أجهزة منفصلة)، والـ **security** (كل جزء في أنهي منطقة شبكة). ولو الـ modifiability هي الأهم، يبقى الـ **module views** (decomposition وuses) هي المهمة.',
          ),
        },
        {
          q: 'Can a single view represent an architecture?',
          a: t(
            '**No.** An architecture is a *set* of structures; every view shows only some elements and some relations. A code view says nothing about servers; a server view says nothing about who uses whose code.',
            '**لأ.** الـ architecture *مجموعة* structures؛ وكل view بتورّي جزء من العناصر وجزء من العلاقات. view الكود مبتقولش حاجة عن السيرفرات؛ وview السيرفرات مبتقولش مين بيستخدم كود مين.',
          ),
        },
      ],
    },
    {
      kind: 'memorize',
      label: 'Recall — the definition (Week 2)',
      text: 'The software architecture of the system is the set of structures needed to reason about the system, which comprises software elements, relations among them, and properties of both.',
    },

    part(t('Structures vs views', 'الـ Structures مقابل الـ Views')),
    {
      kind: 'versus',
      left: { title: 'Structure', icon: 'building', tone: 'violet', tagline: t('The thing itself', 'الحاجة نفسها') },
      right: { title: 'View', icon: 'map', tone: 'teal', tagline: t('A picture of the thing', 'صورة للحاجة') },
      rows: [
        { aspect: 'Definition', left: t('**The set of elements itself** (as it exists in the software).', '**مجموعة العناصر نفسها** (زي ما هي موجودة في السوفتوير).'), right: t('**A representation** of a coherent set of architectural elements and the relations among them.', '**تمثيل** لمجموعة متماسكة من العناصر المعمارية والعلاقات بينها.') },
        { aspect: 'Relation', left: t('Exists whether you draw it or not.', 'موجودة سواء رسمتها أو لأ.'), right: t('**A view is a representation of a structure(s)** — written by architects, read by stakeholders.', '**الـ view تمثيل لـ structure (أو أكتر)** — بيكتبها المعماري ويقراها أصحاب المصلحة.') },
      ],
      verdict: t(
        'You **build** structures; you **document** views. Many people use the words loosely, but the exam-safe sentence is: “a view is a representation of a structure.”',
        'إنت **بتبني** structures؛ و**بتوثّق** views. ناس كتير بتخلط الكلمتين، بس الجملة الآمنة: “الـ view تمثيل لـ structure.”',
      ),
    },
    {
      kind: 'memorize',
      label: 'Structure vs view',
      text: 'A view is a representation of a coherent set of architectural elements… A structure is the set of elements itself. A view is a representation of a structure(s).',
    },

    part(t('One system, many views', 'سيستم واحد، views كتير')),
    {
      kind: 'idea',
      title: 'The Gödel, Escher, Bach cover',
      icon: 'eye',
      tone: 'violet',
      text: t('Think of the cover of *Gödel, Escher, Bach* (Douglas R. Hofstadter): carved blocks whose **shadows** spell different letters from different directions. The whole object holds **all information**; a single shadow shows only **some information**.', 'فكّر في غلاف كتاب *Gödel, Escher, Bach* (Douglas R. Hofstadter): مجسّمات محفورة **ضلّها** بيكتب حروف مختلفة من اتجاهات مختلفة. المجسّم كله فيه **كل المعلومات**؛ والضل الواحد بيورّي **جزء منها** بس.'),
      analogy: t(
        'The 3D object is the **system**; each shadow is a **view**. Every shadow is true, none is complete — you understand the object only by looking at several.',
        'المجسّم الـ 3D هو **السيستم**؛ وكل ضل هو **view**. كل ضل صح، ومفيش واحد كامل — ومش هتفهم المجسّم غير لما تبص على كذا ضل.',
      ),
    },
  ],
  keyTerms: [
    { term: 'Architectural view', definition: t('A representation of a coherent set of architectural elements and the relations among them.', 'تمثيل لمجموعة متماسكة من العناصر المعمارية والعلاقات بينها.') },
    { term: 'Structure', definition: t('The set of architectural elements itself; a view represents one or more structures.', 'مجموعة العناصر المعمارية نفسها؛ والـ view بتمثّل structure أو أكتر.') },
    { term: 'Architecture document', definition: t('Part 1…n: views + Part n+1: documentation beyond views.', 'جزء 1…n: views + جزء n+1: توثيق برّه الـ views.') },
    { term: 'Documentation beyond views', definition: t('Information that applies across views (rationale, how views relate, glossary…).', 'معلومات بتخص كل الـ views (المبررات، علاقة الـ views ببعض، القاموس…).') },
    { term: 'Choosing views', definition: t('Driven by the quality attributes of most concern to the stakeholders.', 'بيتحدد حسب الـ quality attributes الأهم لأصحاب المصلحة.') },
    { term: 'All vs some information', definition: t('The system holds all information; each view shows only some (GEB cover).', 'السيستم فيه كل المعلومات؛ وكل view بتورّي جزء (غلاف GEB).') },
  ],
  recap: [
    t('Architecture doc = several views + documentation beyond views.', 'مستند الـ architecture = كذا view + توثيق برّه الـ views.'),
    t('Views expose different quality attributes to different degrees; stakeholder concerns choose them (deployment view → performance, availability, security).', 'الـ views بتكشف quality attributes مختلفة بدرجات مختلفة؛ واهتمامات أصحاب المصلحة بتختارها (الـ deployment view ← performance وavailability وsecurity).'),
    t('Different views → different goals, different elements/relations. One view can never represent the architecture.', 'views مختلفة ← أهداف مختلفة وعناصر/علاقات مختلفة. وview واحدة عمرها ما تمثّل الـ architecture.'),
    t('Structure = the set of elements itself; view = a representation of a structure(s).', 'الـ Structure = مجموعة العناصر نفسها؛ والـ view = تمثيل لـ structure.'),
    t('GEB cover: the object is all information, each shadow (view) some information.', 'غلاف GEB: المجسّم = كل المعلومات، وكل ضل (view) = جزء منها.'),
  ],
}
