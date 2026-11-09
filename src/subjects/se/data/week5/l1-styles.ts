import type { Lesson } from '../../types'
import { part, t } from '../helpers'

/** Slides 1–5: views recap, styles vs views, the three properties of a style, topologies. */
export const stylesIntro: Lesson = {
  id: 'w5-styles',
  weekId: 'week-5',
  order: 1,
  title: 'From Views to Architectural Styles',
  shortTitle: 'Views → Styles',
  slides: [1, 2, 3, 4, 5],
  minutes: 10,
  tldr: t(
    'A **view** says *what kind* of elements you look at (code, runtime units, environment). Within a view many choices remain — **which relationships are allowed and which constraints are enforced** — and each set of choices is an **architectural style**. Every style has three parts: a **vocabulary** of element types, **configuration rules** (the allowed topology), and a **semantic interpretation** (what a composition means).',
    'الـ **view** بتقول بتبص على *أنهي نوع* من العناصر (كود، وحدات وقت تشغيل، بيئة). وجوّه الـ view لسه فيه اختيارات كتير — **أنهي علاقات مسموحة وأنهي قيود مفروضة** — وكل مجموعة اختيارات منهم هي **architectural style**. وأي style ليه تلات أجزاء: **مفردات** (أنواع العناصر)، و**قواعد تركيب** (الـ topology المسموحة)، و**معنى** (التركيبة دي معناها إيه).',
  ),
  blocks: [
    part(t('Terminology review: what is a view?', 'مراجعة: يعني إيه view؟')),
    {
      kind: 'cards',
      title: t('Views reflect three broad ways an architect looks at a system', 'الـ views بتعكس تلات طرق المعماري بيبص بيها على السيستم'),
      columns: 3,
      items: [
        { icon: 'code', title: 'Units of implementation', tag: 'MODULE VIEWS', tone: 'blue', body: t('How the code is organised.', 'الكود متنظّم إزاي.') },
        { icon: 'activity', title: 'Runtime units', tag: 'C&C VIEWS', tone: 'violet', body: t('What runs and how it interacts.', 'إيه اللي بيشتغل وبيتفاعل إزاي.') },
        { icon: 'server', title: 'Relation to non-software structures', tag: 'ALLOCATION VIEWS', tone: 'amber', body: t('Hardware, files, teams.', 'هاردوير، ملفات، فرق.') },
      ],
    },

    part(t('Architectural styles vs architectural views', 'الـ styles مقابل الـ views')),
    {
      kind: 'lead',
      text: t(
        'Within a view, many choices still remain: **What kinds of relationships are allowed? What kinds of constraints are enforced?** Different choices lead to **different architectural styles**. So a style can represent modules, runtime units, or software and non-software elements.',
        'جوّه الـ view لسه فيه اختيارات كتير: **أنهي أنواع علاقات مسموحة؟ وأنهي قيود مفروضة؟** والاختيارات المختلفة بتوصّل لـ **architectural styles مختلفة**. فالـ style ممكن يمثّل modules، أو وحدات وقت تشغيل، أو عناصر سوفتوير ومش سوفتوير.',
      ),
    },
    {
      kind: 'idea',
      title: 'A view is the camera; a style is the building type',
      icon: 'building',
      tone: 'violet',
      text: t(
        'The view decides *what* you photograph (structure of rooms, electricity, plumbing). The style is a proven **recipe** for that thing: its parts, how they may connect, and what that means.',
        'الـ view بتحدد *بتصوّر إيه* (الأوض، الكهربا، السباكة). والـ style **وصفة** مجرّبة للحاجة دي: أجزاءها، وإزاي تتوصل، ومعنى ده إيه.',
      ),
      analogy: t(
        'A floor plan (view) can show a villa, an apartment block or a hotel (styles). Each type has its own allowed parts and rules — a hotel has a reception and corridors of identical rooms.',
        'رسمة الدور (view) ممكن تورّي فيلا أو عمارة أو فندق (styles). وكل نوع ليه أجزاء وقواعد مسموحة — الفندق فيه ريسبشن وممرات أوض شبه بعض.',
      ),
    },

    part(t('Basic properties of styles', 'الخصائص الأساسية للـ styles')),
    {
      kind: 'cards',
      columns: 3,
      numbered: true,
      items: [
        { title: 'A vocabulary of design elements', tone: 'blue', body: t('Component and connector **types**; data elements. Examples: **pipes, filters, objects, servers**.', '**أنواع** الـ components والـ connectors؛ وعناصر الداتا. أمثلة: **pipes وfilters وobjects وservers**.') },
        { title: 'A set of configuration rules', tone: 'violet', body: t('**Topological constraints** that determine allowed compositions. Example: a component may be connected to **at most two** other components.', '**قيود topology** بتحدد التركيبات المسموحة. مثال: الـ component يتوصل بـ **اتنين بالكتير** من الـ components التانية.') },
        { title: 'A semantic interpretation', tone: 'teal', body: t('Compositions of design elements have **well-defined meanings**.', 'تركيبات العناصر ليها **معنى واضح ومحدد**.') },
      ],
    },
    {
      kind: 'hook',
      title: t('Every style = V + R + S', 'أي style = V + R + S'),
      phrase: 'Vocabulary · Rules · Semantics',
      letters: [
        { letter: 'V', word: 'Vocabulary — the LEGO pieces' },
        { letter: 'R', word: 'Rules — how pieces may snap together' },
        { letter: 'S', word: 'Semantics — what the build means' },
      ],
      body: t(
        'Example, pipe-and-filter: V = filters + pipes; R = filters connect only through pipes, no shared state; S = data streams through and is transformed step by step.',
        'مثال pipe-and-filter: الـ V = filters + pipes؛ والـ R = الـ filters بتتوصل عن طريق pipes بس ومن غير state مشتركة؛ والـ S = الداتا بتعدّي وتتحوّل خطوة خطوة.',
      ),
    },

    part(t('A topology?', 'يعني إيه topology؟')),
    {
      kind: 'diagram',
      id: 'topologies',
      title: t('Seven topologies', 'سبع topologies'),
      caption: t(
        'A **topology** is the shape of the connections between nodes: **ring, mesh, star, fully connected, line, tree, bus**. A style’s configuration rules say which shapes are allowed.',
        'الـ **topology** هي شكل التوصيلات بين الـ nodes: **ring وmesh وstar وfully connected وline وtree وbus**. وقواعد التركيب في الـ style بتقول أنهي أشكال مسموحة.',
      ),
    },
    {
      kind: 'callout',
      tone: 'insight',
      title: t('Spot the topology inside each style you’ll meet', 'دوّر على الـ topology جوّه كل style هتقابله'),
      body: t(
        'Pipe-and-filter ≈ a **line** (or tree) of filters · client-server ≈ a **star** around the server · peer-to-peer ≈ a **mesh** · messaging / publish-subscribe ≈ a **bus**. Thinking in shapes makes each style easier to remember.',
        'الـ Pipe-and-filter ≈ **خط** (أو شجرة) من الـ filters · والـ client-server ≈ **نجمة** حوالين السيرفر · والـ peer-to-peer ≈ **شبكة (mesh)** · والـ messaging / publish-subscribe ≈ **bus**. لما تفكر بالأشكال كل style بيبقى أسهل في الحفظ.',
      ),
    },
  ],
  keyTerms: [
    { term: 'Architectural style', definition: t('A set of choices within a view: allowed element types, relationships and constraints.', 'مجموعة اختيارات جوّه view: أنواع العناصر والعلاقات والقيود المسموحة.') },
    { term: 'Style vs view', definition: t('A view picks the kind of elements (module, runtime, environment); a style fixes the allowed relationships and constraints within it.', 'الـ view بتختار نوع العناصر (module، runtime، بيئة)؛ والـ style بيحدد العلاقات والقيود المسموحة جواها.') },
    { term: 'Vocabulary (of a style)', definition: t('Component and connector types and data elements — e.g. pipes, filters, objects, servers.', 'أنواع الـ components والـ connectors وعناصر الداتا — زي pipes وfilters وobjects وservers.') },
    { term: 'Configuration rules', definition: t('Topological constraints on allowed compositions (e.g. at most two connections per component).', 'قيود topology على التركيبات المسموحة (زي اتنين توصيلات بالكتير لكل component).') },
    { term: 'Semantic interpretation', definition: t('Compositions of design elements have well-defined meanings.', 'تركيبات العناصر ليها معنى محدد.') },
    { term: 'Topology', definition: t('The shape of connections: ring, mesh, star, fully connected, line, tree, bus.', 'شكل التوصيلات: ring وmesh وstar وfully connected وline وtree وbus.') },
  ],
  recap: [
    t('Views: module (implementation), C&C (runtime), allocation (non-software relations).', 'الـ Views: module (تنفيذ)، C&C (وقت التشغيل)، allocation (علاقات مش سوفتوير).'),
    t('Within a view, choices about allowed relationships and constraints = different architectural styles.', 'جوّه الـ view، الاختيارات عن العلاقات والقيود المسموحة = styles مختلفة.'),
    t('Style = vocabulary (pipes, filters, objects, servers) + configuration rules (topology) + semantic interpretation.', 'الـ Style = مفردات (pipes وfilters وobjects وservers) + قواعد تركيب (topology) + معنى.'),
    t('Topologies: ring, mesh, star, fully connected, line, tree, bus.', 'الـ Topologies: ring وmesh وstar وfully connected وline وtree وbus.'),
  ],
}
