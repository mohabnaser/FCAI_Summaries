import type { Lesson } from '../../types'
import { part, t } from '../helpers'

/** Slides 5–9: the architecture/design continuum, the definition, architect vs developer, the house analogy. */
export const archDesign: Lesson = {
  id: 'w2-arch-design',
  weekId: 'week-2',
  order: 2,
  title: 'Architecture vs Design: One Continuous Fabric',
  shortTitle: 'Architecture vs Design',
  slides: [5, 6, 7, 8, 9],
  minutes: 14,
  tldr: t(
    'There is **no conceptual difference** between architecture and design — they are one continuous fabric of decisions. Architecture is the part of design you need to **reason about the system** (elements, relations, properties); the rest are **design details**. “Architecture is design, but not all design is architecture.” Like a house blueprint, high-level structure only works if the microscopic details are right.',
    'مفيش **فرق جوهري** بين الـ architecture والـ design — الاتنين نسيج واحد متصل من القرارات. الـ architecture هي الجزء من الـ design اللي محتاجه عشان **تفكّر في السيستم** (عناصر، علاقات، خصائص)؛ والباقي **تفاصيل design**. “كل architecture هي design، بس مش كل design هو architecture.” وزي رسم البيت، الهيكل الكبير مبيشتغلش غير لو التفاصيل الصغيرة مظبوطة.',
  ),
  blocks: [
    part(t('The continuum', 'الاستمرارية')),
    {
      kind: 'myths',
      items: [
        {
          myth: t('**Myth:** Architecture is high-level boundary boxes; design is low-level code.', '**خرافة:** الـ architecture مربعات وحدود من فوق؛ والـ design كود من تحت.'),
          fact: t('**Fact:** There is **no conceptual difference** between software architecture and software design. They form an **unbroken, continuous fabric of decisions**.', '**حقيقة:** **مفيش فرق جوهري** بين الاتنين. هما **نسيج واحد متصل من القرارات**.'),
        },
      ],
    },
    {
      kind: 'memorize',
      label: 'Axiom I',
      text: 'Low-level details directly support and define the high-level structures. One cannot exist without the other.',
      note: t(
        'Consequence: **you cannot be a “whiteboard architect.”** If your code is a mess, your architecture is a failure — no matter how pretty the boxes on the whiteboard look.',
        'النتيجة: **مينفعش تبقى “whiteboard architect”** (معماري سبورة بس). لو الكود بتاعك مكركب، يبقى الـ architecture فاشلة — مهما كانت المربعات على السبورة حلوة.',
      ),
    },
    {
      kind: 'diagram',
      id: 'design-ovals',
      title: t('Architecture lives inside design', 'الـ architecture جوّه الـ design'),
      caption: t('The nested ovals: the large blue oval is Software Design, the inner orange one is Software Architecture — one continuous decision-making process.', 'الدواير المتداخلة: الكبيرة الزرقا Software Design، والصغيرة البرتقاني جوّاها Software Architecture — عملية قرارات واحدة متصلة.'),
    },

    part(t('So what *is* architecture?', 'طب الـ architecture هي إيه بالظبط؟')),
    {
      kind: 'memorize',
      label: 'Definition of software architecture',
      text: 'The software architecture of the system is the set of structures needed to reason about the system, which comprises software elements, relations among them, and properties of both.',
      source: 'Bass, Clements & Kazman — SAiP',
    },
    {
      kind: 'hook',
      title: t('The definition in three words', 'التعريف في تلات كلمات'),
      phrase: 'Elements · Relations · Properties',
      letters: [
        { letter: 'E', word: 'Elements — the parts' },
        { letter: 'R', word: 'Relations — how they connect' },
        { letter: 'P', word: 'Properties — of both' },
      ],
      body: t('…all chosen because you need them **to reason about the system**.', '…وكلهم متحطين لأنك محتاجهم **عشان تفكّر في السيستم**.'),
    },
    {
      kind: 'versus',
      title: t('Where is the line?', 'الخط الفاصل فين؟'),
      left: { title: 'Architectural details', icon: 'compass', tone: 'amber', tagline: t('In the architecture model', 'جوّه نموذج الـ architecture') },
      right: { title: 'Design details', icon: 'wrench', tone: 'blue', tagline: t('In the full design only', 'في الـ design الكامل بس') },
      rows: [
        {
          aspect: 'Rule',
          left: t('Details you include **to reason about the failures** (and qualities) of the system.', 'تفاصيل بتحطها **عشان تفكّر في أعطال** (وجودة) السيستم.'),
          right: t('Details **necessary to build** the system, but **not needed to reason about the failures**.', 'تفاصيل **لازمة عشان تبني** السيستم، بس **مش لازمة عشان تفكّر في أعطاله**.'),
        },
        {
          aspect: 'Example',
          left: t('“Orders and Payments talk through a message queue” — affects what happens if Payments is down.', '“Orders وPayments بيتكلموا عن طريق message queue” — بتأثر على اللي يحصل لو Payments وقع.'),
          right: t('The name of a private helper method inside Payments.', 'اسم helper method جوّه Payments.'),
        },
      ],
      verdict: t(
        'Same kind of activity (deciding), different purpose: reasoning vs building.',
        'نفس النشاط (إنك تقرر)، بس الغرض مختلف: تفكير ولا بناء.',
      ),
    },

    part(t('Architect vs developer', 'المعماري والمطوّر')),
    {
      kind: 'diagram',
      id: 'architect-developer',
      title: t('Two sides of one continuum', 'وشّين لنفس الاستمرارية'),
      caption: t(
        'The architect shapes **architecture characteristics** (drawn as a flowchart), the **style** (a layered diagram: monolithic interface, API layer, service modules, databases) and the **component structure** (business components such as Purchase, Order, Payment, Promotion, Products, Deliver, Address, Management, Reports, Location…). The developer shapes **class design** (UML), the **user interface** (a wireframe) and the **source code**. An arrow joins both sides.',
        'المعماري بيشكّل **architecture characteristics** (مرسومة flowchart)، والـ **style** (رسمة طبقات: monolithic interface وAPI layer وservice modules وdatabases)، والـ **component structure** (components بيزنس زي Purchase وOrder وPayment وPromotion وProducts وDeliver وAddress وManagement وReports وLocation…). والمطوّر بيشكّل **class design** (UML) والـ **user interface** (wireframe) والـ **source code**. وفيه سهم بيربط الناحيتين.',
      ),
    },

    part(t('Architecture is design — but not all design is architecture', 'كل architecture هي design — بس مش كل design هو architecture')),
    {
      kind: 'memorize',
      label: 'Architecture vs design',
      text: 'Architecture is design, but not all design is architecture. Architecture consists of architectural design decisions, and all others are non-architectural.',
    },
    {
      kind: 'idea',
      title: 'Every square is a rectangle…',
      icon: 'shapes',
      tone: 'violet',
      text: t(
        'Every architectural decision is a design decision, but many design decisions are too local to be architectural.',
        'كل قرار معماري هو قرار design، بس قرارات design كتير محلية أوي إنها تبقى معمارية.',
      ),
      analogy: t(
        'Every square is a rectangle, but not every rectangle is a square. Architecture = the “squares” of design.',
        'كل مربع هو مستطيل، بس مش كل مستطيل مربع. الـ architecture = “المربعات” جوّه الـ design.',
      ),
    },
    {
      kind: 'list',
      title: t('Three questions to think about', 'تلات أسئلة للتفكير'),
      ordered: true,
      items: [
        t('What decisions are **non-architectural**? (e.g. local naming, the loop inside one method.)', 'إيه القرارات **اللي مش معمارية**؟ (زي التسمية المحلية، أو الـ loop جوّه method واحدة.)'),
        t('What design decisions does the architect **leave to the discretion of others**? (Local class design → the developers.)', 'إيه قرارات الـ design اللي المعماري **بيسيبها لغيره**؟ (تصميم الـ classes المحلي → للمطورين.)'),
        t('How about **detailed** decisions that are **still architectural**? (A small detail can be architectural if it affects reasoning about the system — e.g. “the UI may never query the DB directly”.)', 'وإيه رأيك في قرارات **تفصيلية** بس **لسه معمارية**؟ (تفصيلة صغيرة ممكن تبقى معمارية لو بتأثر على التفكير في السيستم — زي “الـ UI ممنوع يكلّم الداتابيز مباشرة”.)'),
      ],
    },

    part(t('The house architect analogy', 'تشبيه مهندس البيوت')),
    {
      kind: 'versus',
      left: { title: 'Macroscopic layout', icon: 'building', tone: 'blue', tagline: t('The big picture', 'الصورة الكبيرة') },
      right: { title: 'Microscopic specifications', icon: 'ruler', tone: 'amber', tagline: t('The tiny details', 'التفاصيل الصغيرة') },
      rows: [
        {
          aspect: 'In a house',
          left: t('Room flow, elevations, structural volume.', 'توزيع الأوض، والواجهات، والحجم الإنشائي.'),
          right: t('Diameter of the sump pump outlet, size of the foundation bolts, drywall thickness, placement of light switches.', 'قُطر مخرج طلمبة الصرف، ومقاس مسامير الأساس، وسُمك الجبس بورد، ومكان مفاتيح النور.'),
        },
        {
          aspect: 'In software',
          left: t('High-level decoupling between components.', 'الفصل (decoupling) بين الـ components من فوق.'),
          right: t('`import` statements and variable declarations.', 'جُمل الـ `import` وتعريف المتغيرات.'),
        },
      ],
      verdict: t(
        'A complete blueprint dictates **both**. If microscopic details are neglected, the macroscopic house fails. In software, high-level decoupling is realized **exclusively** by microscopic code choices.',
        'الرسم الكامل بيحدد **الاتنين**. لو التفاصيل الصغيرة اتهملت، البيت الكبير بيفشل. وفي السوفتوير، الـ decoupling الكبير بيتحقق **بس** عن طريق اختيارات صغيرة في الكود.',
      ),
    },
    {
      kind: 'callout',
      tone: 'insight',
      title: t('Why an `import` can be architectural', 'إزاي `import` ممكن يبقى قرار معماري'),
      body: t(
        'If the UI layer writes `import database`, the boundary “UI never touches the DB” is broken — one line of code destroys a high-level decision. That is Axiom I in action.',
        'لو طبقة الـ UI كتبت `import database`، الحد “الـ UI مبيلمسش الداتابيز” اتكسر — سطر كود واحد هدم قرار كبير. ده Axiom I على أرض الواقع.',
      ),
    },
  ],
  keyTerms: [
    { term: 'Architecture–design continuum', definition: t('No conceptual difference between architecture and design: one unbroken fabric of decisions.', 'مفيش فرق جوهري بين الـ architecture والـ design: نسيج قرارات واحد متصل.') },
    { term: 'Axiom I', definition: t('Low-level details directly support and define the high-level structures; one cannot exist without the other.', 'التفاصيل الصغيرة بتسند وتحدد الهياكل الكبيرة؛ ومينفعش واحد من غير التاني.') },
    { term: 'Whiteboard architect', definition: t('An architect who only draws boxes; if the code is a mess, the architecture has failed.', 'معماري بيرسم مربعات بس؛ ولو الكود مكركب يبقى الـ architecture فشلت.') },
    { term: 'Software architecture (SAiP)', definition: t('The set of structures needed to reason about the system: software elements, relations among them, and properties of both.', 'مجموعة الهياكل اللازمة للتفكير في السيستم: عناصر، وعلاقات بينها، وخصائص الاتنين.') },
    { term: 'Architectural details', definition: t('Details included in the architecture model to reason about the system’s failures.', 'تفاصيل في نموذج الـ architecture عشان تفكّر في أعطال السيستم.') },
    { term: 'Design details', definition: t('Details needed to build the system but not needed to reason about failures.', 'تفاصيل لازمة للبناء بس مش لازمة للتفكير في الأعطال.') },
    { term: 'Architectural design decision', definition: t('A design decision that is part of the architecture; all others are non-architectural.', 'قرار design جزء من الـ architecture؛ وأي حاجة تانية non-architectural.') },
    { term: 'Macroscopic vs microscopic', definition: t('High-level layout vs tiny specifications; a complete blueprint dictates both.', 'التوزيع الكبير مقابل المواصفات الصغيرة؛ والرسم الكامل بيحدد الاتنين.') },
  ],
  recap: [
    t('Myth: architecture = boxes, design = code. Fact: one continuous fabric of decisions.', 'خرافة: architecture = مربعات، design = كود. حقيقة: نسيج قرارات واحد.'),
    t('Axiom I: low-level details support and define high-level structure; no “whiteboard architects”.', 'Axiom I: التفاصيل بتسند الهيكل الكبير؛ ومفيش “whiteboard architect”.'),
    t('Architecture = structures needed to reason about the system: elements, relations, properties of both.', 'الـ Architecture = هياكل للتفكير في السيستم: عناصر وعلاقات وخصائص.'),
    t('Architectural details help reason about failures; design details are only needed to build.', 'التفاصيل المعمارية بتساعد تفكّر في الأعطال؛ وتفاصيل الـ design للبناء بس.'),
    t('Architect: characteristics, style, component structure. Developer: class design, UI, source code.', 'المعماري: characteristics وstyle وcomponent structure. المطوّر: class design وUI وsource code.'),
    t('Architecture is design, but not all design is architecture.', 'كل architecture هي design، بس مش كل design هو architecture.'),
    t('House analogy: a blueprint fixes both room flow and bolt sizes; in code, decoupling lives in imports and declarations.', 'تشبيه البيت: الرسم بيحدد توزيع الأوض ومقاس المسامير؛ وفي الكود الـ decoupling عايش في الـ imports والتعريفات.'),
  ],
}
