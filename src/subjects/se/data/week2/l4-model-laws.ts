import type { Lesson } from '../../types'
import { part, t } from '../helpers'

/** Slides 16, 19, 20, 23, 24: the 4D model, two case studies, and the two laws of software architecture. */
export const modelLaws: Lesson = {
  id: 'w2-model-laws',
  weekId: 'week-2',
  order: 4,
  title: 'The 4D Model & The Two Laws of Architecture',
  shortTitle: '4D Model & Two Laws',
  slides: [16, 19, 20, 23, 24],
  minutes: 14,
  tldr: t(
    'Architecture has **four dimensions**: Structure (style), Characteristics (“-ilities”), Decisions (hard rules) and Design Principles (guidelines). Pets.com shows that **scale** must be built in from the start; the 2002 data center shows styles depend on their **era’s economics**. And two laws: **everything is a trade-off**, and **why is more important than how**.',
    'الـ Architecture ليها **أربع أبعاد**: Structure (الـ style)، وCharacteristics (الـ “-ilities”)، وDecisions (قواعد صارمة)، وDesign Principles (توجيهات). Pets.com بيورّينا إن الـ **scale** لازم يتبني من الأول؛ وداتا سنتر 2002 بيورّينا إن الـ styles معتمدة على **اقتصاد زمنها**. وقانونين: **كل حاجة trade-off**، و**“ليه” أهم من “إزاي”**.',
  ),
  blocks: [
    part(t('The 4D model of architecture', 'نموذج الأبعاد الأربعة')),
    {
      kind: 'cards',
      columns: 4,
      numbered: true,
      items: [
        { title: 'Structure', tag: 'THE STYLE', tone: 'blue', body: t('The architecture style: **Microservices, Event-Driven, Microkernel**…', 'الـ style: **Microservices أو Event-Driven أو Microkernel**…') },
        { title: 'Architecture Characteristics', tag: '“-ILITIES”', tone: 'teal', body: t('The qualities the system must have: **scalability, availability, security**…', 'الجودة اللي السيستم لازم يبقى عنده: **scalability وavailability وsecurity**…') },
        { title: 'Architecture Decisions', tag: 'HARD RULES', tone: 'rose', body: t('**Hard constraints**, e.g. *“The UI cannot query the DB.”*', '**قيود صارمة**، زي *“الـ UI ممنوع يكلّم الداتابيز.”*') },
        { title: 'Design Principles', tag: 'GUIDELINES', tone: 'violet', body: t('**Directional guidelines**, e.g. *“Prefer asynchronous messaging.”*', '**توجيهات للاتجاه**، زي *“يُفضّل asynchronous messaging.”*') },
      ],
    },
    {
      kind: 'hook',
      title: t('Remember the four dimensions', 'افتكر الأبعاد الأربعة'),
      phrase: 'Shape · Qualities · Rules · Hints',
      letters: [
        { letter: 'S', word: 'Structure — its shape' },
        { letter: 'C', word: 'Characteristics — its qualities' },
        { letter: 'D', word: 'Decisions — must (rules)' },
        { letter: 'P', word: 'Principles — should (hints)' },
      ],
      body: t(
        'Decision vs principle is the classic confusion: a **decision** is a *must* (“cannot”), a **principle** is a *should* (“prefer”).',
        'الخلط المشهور بين decision وprinciple: الـ **decision** “لازم/ممنوع”، والـ **principle** “يُفضّل”.',
      ),
    },

    part(t('Two case studies', 'حالتين واقعيتين')),
    {
      kind: 'case',
      label: 'Case study',
      title: 'Pets.com — the failure of elastic scale',
      beats: [
        { label: 'The setup', icon: 'megaphone', tone: 'blue', text: t('Launched a massive **national marketing campaign**, driving an immense surge in **concurrent orders**.', 'عملوا **حملة إعلانية قومية** ضخمة، فجالهم سيل رهيب من **الطلبات في نفس الوقت**.') },
        { label: 'The mistake', icon: 'scale', tone: 'amber', text: t('They prioritized **business behavior** (marketing, checkout features) over **operational architecture**.', 'إدّوا الأولوية لـ **behavior البيزنس** (الإعلانات وfeatures الدفع) على حساب **الـ architecture التشغيلية**.') },
        { label: 'The collapse', icon: 'siren', tone: 'rose', text: t('Lacking **elastic scale**: databases locked, transactions corrupted, order fulfillment choked → **business liquidation**.', 'من غير **elastic scale**: الداتابيز اتقفلت، والـ transactions باظت، وتنفيذ الطلبات اتخنق → **الشركة اتصفّت**.') },
      ],
      lesson: t(
        'Scale is **not a secondary feature** you add later. It is a **foundational characteristic** that must be baked into structural bounds.',
        'الـ Scale **مش feature ثانوية** تضيفها بعدين. ده **characteristic أساسية** لازم تتبني جوّه حدود الهيكل من الأول.',
      ),
    },
    {
      kind: 'case',
      label: 'Case study',
      title: 'The 2002 data center — architecture styles have a context',
      beats: [
        { label: 'Then (2002)', icon: 'money', tone: 'amber', text: t('Running **50 isolated services** cost **millions** in commercial server and DB licenses (Oracle, Windows Server, hardware racks).', 'تشغيل **50 service منفصلين** كان بيكلّف **ملايين** في رخص السيرفرات والداتابيز (Oracle وWindows Server ورفوف هاردوير).') },
        { label: 'Now', icon: 'container', tone: 'teal', text: t('Lightweight containerization (**Docker, Kubernetes**) reduces the marginal cost of spawning isolated containers to **near-zero**.', 'الـ containers الخفيفة (**Docker وKubernetes**) نزّلت تمن تشغيل container منفصل زيادة لـ **قريب من الصفر**.') },
      ],
      lesson: t(
        'Architectural styles are products of their **historical and socioeconomic context**. What was **reckless in 2002** is **industry standard today**.',
        'الـ Architecture styles نتاج **سياقها التاريخي والاقتصادي والاجتماعي**. اللي كان **تهوّر في 2002** بقى **العادي في الصناعة النهارده**.',
      ),
    },

    part(t('The First Law of software architecture', 'القانون الأول')),
    {
      kind: 'memorize',
      label: 'First Law',
      text: 'Everything in software architecture is a trade-off.',
      source: 'FSA',
      note: t(
        '**Corollary:** if you think you have found an architectural pattern that doesn’t have a massive trade-off, you just haven’t identified the trade-off yet.',
        '**النتيجة:** لو فاكر إنك لقيت pattern معماري مالوش trade-off كبير، يبقى إنت لسه مالقيتش الـ trade-off.',
      ),
    },
    {
      kind: 'versus',
      title: t('Example: microservices', 'مثال: الـ microservices'),
      left: { title: 'You gain', icon: 'up', tone: 'teal' },
      right: { title: 'You pay', icon: 'down', tone: 'rose' },
      rows: [
        {
          aspect: 'Trade-off',
          left: t('“Infinite” **independent scalability** of each service.', '**Scalability مستقلة** لكل service “بلا حدود”.'),
          right: t('Catastrophic **network latency**, **distributed transaction failures**, and extreme **deployment complexity**.', '**network latency** كارثية، و**فشل في الـ distributed transactions**، و**تعقيد deployment** شديد.'),
        },
      ],
    },

    part(t('The Second Law of software architecture', 'القانون التاني')),
    {
      kind: 'memorize',
      label: 'Second Law',
      text: 'Why is more important than how.',
      source: 'FSA',
      note: t(
        '**Corollary:** if you only document *how* an architecture is built without recording *why* it was designed that way, future teams will inevitably question the design, misunderstand its trade-offs, and risk dismantling its core strengths.',
        '**النتيجة:** لو وثّقت *إزاي* الـ architecture اتبنت من غير ما تسجّل *ليه* اتعملت كده، الفرق اللي جاية هتشك في الـ design، وتفهم الـ trade-offs غلط، وممكن تهدّ نقط قوته الأساسية.',
      ),
    },
    {
      kind: 'idea',
      title: 'You can see “how”; you can’t see “why”',
      icon: 'notebook',
      tone: 'amber',
      text: t(
        'Any architect can inspect an unfamiliar system’s topology diagrams and reverse-engineer **how** services communicate. But without **Architecture Decision Records (ADRs)** or recorded context, they cannot tell **why** a particular database, boundary or integration strategy was chosen over the alternatives.',
        'أي معماري يقدر يبص على رسومات سيستم ميعرفوش ويستنتج **إزاي** الـ services بتتكلم. بس من غير **Architecture Decision Records (ADRs)** أو سياق متسجّل، مش هيعرف **ليه** اختاروا الداتابيز دي أو الحد ده أو طريقة الربط دي بدل البدائل.',
      ),
      analogy: t(
        'A fence across a road: “how” is obvious (posts and wire). “Why” — keeping cattle off a cliff — is invisible. Remove the fence without knowing why, and you learn the hard way.',
        'سور في نص طريق: “إزاي” واضح (عواميد وسلك). إنما “ليه” — عشان البهايم متقعش من على الجرف — مش باين. شيل السور من غير ما تعرف ليه، وهتتعلم بالطريقة الصعبة.',
      ),
    },
    {
      kind: 'definition',
      term: 'Architecture Decision Record (ADR)',
      definition: t(
        'A short document that records an architectural decision **with its context and reasons** (and the alternatives rejected).',
        'مستند قصير بيسجّل قرار معماري **بسياقه وأسبابه** (والبدائل اللي اترفضت).',
      ),
    },
  ],
  keyTerms: [
    { term: '4D model of architecture', definition: t('Structure, architecture characteristics, architecture decisions, design principles.', 'Structure وarchitecture characteristics وarchitecture decisions وdesign principles.') },
    { term: 'Structure (style)', definition: t('The architecture style, e.g. microservices, event-driven, microkernel.', 'الـ style، زي microservices وevent-driven وmicrokernel.') },
    { term: 'Architecture characteristics (“-ilities”)', definition: t('Qualities such as scalability, availability, security.', 'جودة زي scalability وavailability وsecurity.') },
    { term: 'Architecture decision', definition: t('A hard constraint, e.g. “The UI cannot query the DB”.', 'قيد صارم، زي “الـ UI ممنوع يكلّم الداتابيز”.') },
    { term: 'Design principle', definition: t('A directional guideline, e.g. “Prefer asynchronous messaging”.', 'توجيه للاتجاه، زي “يُفضّل asynchronous messaging”.') },
    { term: 'Elastic scale', definition: t('The ability to grow and shrink capacity with load; Pets.com lacked it and collapsed.', 'القدرة إن السعة تكبر وتصغر مع الحمل؛ Pets.com ماكانش عندها فوقعت.') },
    { term: 'First Law', definition: t('Everything in software architecture is a trade-off.', 'كل حاجة في الـ software architecture هي trade-off.') },
    { term: 'Second Law', definition: t('Why is more important than how.', '“ليه” أهم من “إزاي”.') },
    { term: 'ADR', definition: t('Architecture Decision Record: documents why a decision was made.', 'Architecture Decision Record: بيوثّق ليه القرار اتاخد.') },
  ],
  recap: [
    t('4D: Structure (style), Characteristics (-ilities), Decisions (hard constraints), Principles (guidelines).', 'الأبعاد الأربعة: Structure وCharacteristics وDecisions (قيود) وPrinciples (توجيهات).'),
    t('Pets.com: behavior over architecture, no elastic scale → locked DBs, corrupted transactions → liquidation. Scale is foundational.', 'Pets.com: behavior قبل الـ architecture ومفيش elastic scale → داتابيز مقفولة وtransactions بايظة → تصفية. الـ Scale أساسي.'),
    t('2002: 50 services = millions in licenses; today containers ≈ free. Styles depend on their era.', '2002: 50 service = ملايين رخص؛ النهارده الـ containers تقريبًا ببلاش. الـ styles بنت زمنها.'),
    t('First Law: everything is a trade-off (e.g. microservices: scalability vs latency, distributed failures, deployment complexity).', 'القانون الأول: كل حاجة trade-off (مثلًا microservices: scalability قصاد latency وفشل موزّع وتعقيد deployment).'),
    t('Second Law: why > how. Record the why in ADRs.', 'القانون التاني: ليه > إزاي. سجّل الـ “ليه” في ADRs.'),
  ],
}
