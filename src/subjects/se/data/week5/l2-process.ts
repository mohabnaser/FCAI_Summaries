import type { Lesson } from '../../types'
import { part, t } from '../helpers'

/** Slides 6–11: the role of the architect and the architecture process (requirements → design 2a/2b → validation). */
export const process: Lesson = {
  id: 'w5-process',
  weekId: 'week-5',
  order: 2,
  title: 'The Architect’s Role & the Architecture Process',
  shortTitle: 'The Architecture Process',
  slides: [6, 7, 8, 9, 10, 11],
  minutes: 12,
  tldr: t(
    'The architect works with the requirements team, the stakeholders, the design team and the project team. The process is **iterative**: (1) **determine architecture requirements** — the quality / non-functional requirements; (2) **design** — **2a** choose a framework of proven **patterns (styles)**, **2b** allocate components and responsibilities, producing views and a document; (3) **validate**, and loop back.',
    'المعماري بيشتغل مع فريق المتطلبات، وأصحاب المصلحة، وفريق التصميم، وفريق المشروع. والعملية **بتتكرر (iterative)**: (1) **تحديد متطلبات الـ architecture** — متطلبات الجودة / الـ non-functional؛ (2) **التصميم** — **2a** اختيار framework من **patterns (styles)** مجرّبة، و**2b** توزيع الـ components والمسؤوليات، والناتج views ومستند؛ (3) **التحقق**، وبعدين ترجع تاني.',
  ),
  blocks: [
    part(t('The role of the software architect', 'دور المعماري')),
    {
      kind: 'cards',
      columns: 4,
      items: [
        { icon: 'scroll', title: 'Requirements team', tone: 'blue', body: t('Work with the requirements team (explicit requirements?).', 'يشتغل مع فريق المتطلبات (متطلبات صريحة؟).') },
        { icon: 'users', title: 'Application stakeholders', tone: 'violet', body: t('Work with the various stakeholders (why?).', 'يشتغل مع أصحاب المصلحة المختلفين (ليه؟).') },
        { icon: 'compass', title: 'Technical design team', tone: 'teal', body: t('**Lead** the technical design team.', '**يقود** فريق التصميم التقني.') },
        { icon: 'handshake', title: 'Project team', tone: 'amber', body: t('Work with the project team (plans, schedule, risks).', 'يشتغل مع فريق المشروع (خطط، جدول، مخاطر).') },
      ],
    },
    {
      kind: 'asks',
      items: [
        { q: 'Explicit requirements?', a: t('Usually **not**. Functional requirements are written down; quality requirements (how fast, how available, how secure) are often vague or missing. The architect has to **draw them out** with the requirements team and make them measurable.', 'غالبًا **لأ**. المتطلبات الوظيفية بتتكتب؛ إنما متطلبات الجودة (قد إيه سريع، متاح، آمن) كتير بتبقى مش واضحة أو ناقصة. والمعماري لازم **يطلّعها** مع فريق المتطلبات ويخليها قابلة للقياس.') },
        { q: 'Work with stakeholders — why?', a: t('Each stakeholder holds different **quality concerns and constraints** (operations wants availability, finance wants low cost, security wants protection). They conflict, so the architect must understand them and **negotiate trade-offs** (Week 2: everything is a trade-off).', 'كل صاحب مصلحة عنده **اهتمامات جودة وقيود** مختلفة (التشغيل عايز availability، والمالية عايزة تكلفة قليلة، والأمن عايز حماية). وبيتعارضوا، فالمعماري لازم يفهمهم و**يتفاوض على الـ trade-offs** (أسبوع 2: كل حاجة trade-off).') },
      ],
    },

    part(t('The architecture process outline', 'ملخص عملية الـ architecture')),
    {
      kind: 'diagram',
      id: 'arch-process',
      title: t('Requirements → design → validation, iterated', 'متطلبات ← تصميم ← تحقق، وبيتكرر'),
      caption: t(
        'Three activities in sequence — **determine architectural requirements → architecture design → validation** — with feedback arrows, so validation sends you back to design or even to requirements.',
        'تلات أنشطة ورا بعض — **تحديد متطلبات الـ architecture ← التصميم ← التحقق** — ومعاهم أسهم رجوع، فالتحقق بيرجّعك للتصميم أو حتى للمتطلبات.',
      ),
    },
    {
      kind: 'memorize',
      label: 'Step 1 — architecture requirements',
      text: 'Architecture requirements (also called architecturally significant requirements or architecture use cases) are essentially the quality and nonfunctional requirements for the application.',
      note: t(
        'Inputs: **functional requirements** + **stakeholder requirements** → output: a set of **architecture requirements**.',
        'المدخلات: **المتطلبات الوظيفية** + **متطلبات أصحاب المصلحة** ← المخرج: مجموعة **متطلبات الـ architecture**.',
      ),
    },
    {
      kind: 'flow',
      title: t('Step 2 — architecture design', 'الخطوة 2 — التصميم'),
      steps: [
        { icon: 'scroll', label: 'Input', tone: 'blue', detail: t('Architecture requirements.', 'متطلبات الـ architecture.') },
        { icon: 'compass', label: '2a · Choose architecture framework', tone: 'violet', detail: t('An overall strategy based on **proven architecture patterns** (a.k.a. architectural styles).', 'استراتيجية عامة مبنية على **patterns مجرّبة** (يعني architectural styles).') },
        { icon: 'boxes', label: '2b · Allocate components', tone: 'teal', detail: t('Specify the individual components, how they fit the framework, and **allocate their responsibilities**.', 'حدّد الـ components، وإزاي بتركب على الـ framework، و**وزّع مسؤولياتها**.') },
        { icon: 'book', label: 'Output', tone: 'amber', detail: t('**Architecture views** and the **architecture document**.', '**Architecture views** و**مستند الـ architecture**.') },
      ],
    },

    part(t('Step 2a: choosing the architecture framework', 'الخطوة 2a: اختيار الـ framework')),
    {
      kind: 'cards',
      columns: 2,
      items: [
        { icon: 'shield', title: 'Reuse known solutions', tone: 'teal', body: t('Leveraging known solutions **minimizes the risk** that an application fails due to an inappropriate architecture.', 'استخدام حلول معروفة **بيقلّل خطر** إن التطبيق يفشل بسبب architecture مش مناسبة.') },
        { icon: 'scale', title: 'Known trade-offs', tone: 'violet', body: t('Architectural patterns have **clear pros/cons** with respect to specific quality attributes.', 'الـ patterns المعمارية ليها **مميزات وعيوب واضحة** بالنسبة لـ quality attributes معينة.') },
        { icon: 'package', title: 'Small applications', tone: 'blue', body: t('A **single pattern** like n-tier client-server may suffice.', '**pattern واحد** زي n-tier client-server ممكن يكفي.') },
        { icon: 'blocks', title: 'Complex applications', tone: 'amber', body: t('Combine **one or more** known patterns; the architect specifies **how they integrate** into the overall architecture.', 'اجمع **pattern أو أكتر**؛ والمعماري بيحدد **إزاي يتدمجوا** في الـ architecture الكلية.') },
      ],
    },
    {
      kind: 'idea',
      title: 'Don’t invent — choose, then combine',
      icon: 'puzzle',
      tone: 'blue',
      text: t(
        'Styles are tested recipes with known strengths and weaknesses. Step 2a is picking the recipes whose strengths match your architecture requirements from Step 1.',
        'الـ styles وصفات متجرّبة ومميزاتها وعيوبها معروفة. والخطوة 2a إنك تختار الوصفات اللي مميزاتها مطابقة لمتطلبات الـ architecture من الخطوة 1.',
      ),
      analogy: t(
        'A chef designing a menu doesn’t invent cooking from scratch: they pick grilling for this, baking for that — and plan how the dishes go together.',
        'الشيف وهو بيعمل منيو مش بيخترع الطبخ من الأول: بيختار الشوي لده والخبيز لده — ويخطط الأطباق هتمشي مع بعض إزاي.',
      ),
    },
  ],
  keyTerms: [
    { term: 'Role of the architect', definition: t('Work with requirements team and stakeholders, lead the technical design team, work with the project team.', 'يشتغل مع فريق المتطلبات وأصحاب المصلحة، ويقود فريق التصميم، ويشتغل مع فريق المشروع.') },
    { term: 'Architecture process', definition: t('Determine architectural requirements → architecture design → validation, iteratively.', 'تحديد متطلبات الـ architecture ← التصميم ← التحقق، بشكل متكرر.') },
    { term: 'Architecturally significant requirements', definition: t('Also “architecture use cases”: essentially the quality and non-functional requirements.', 'واسمها كمان “architecture use cases”: هي أساسًا متطلبات الجودة والـ non-functional.') },
    { term: 'Step 2a', definition: t('Choose the architecture framework: proven patterns / architectural styles.', 'اختيار الـ framework: patterns مجرّبة / architectural styles.') },
    { term: 'Step 2b', definition: t('Allocate components: specify them, fit them into the framework, assign responsibilities.', 'توزيع الـ components: تحديدها، وتركيبها على الـ framework، وتوزيع المسؤوليات.') },
    { term: 'Design outputs', definition: t('Architecture views and the architecture document.', 'الـ Architecture views ومستند الـ architecture.') },
  ],
  recap: [
    t('Architect: requirements team (requirements are rarely explicit), stakeholders (conflicting quality concerns), leads design team, project team.', 'المعماري: فريق المتطلبات (نادرًا ما تبقى صريحة)، أصحاب المصلحة (اهتمامات جودة متعارضة)، يقود فريق التصميم، فريق المشروع.'),
    t('Process: determine architecture requirements → design → validation, with feedback loops.', 'العملية: تحديد متطلبات الـ architecture ← التصميم ← التحقق، ومعاها رجوع.'),
    t('Architecture requirements = quality / non-functional requirements (from functional + stakeholder requirements).', 'متطلبات الـ architecture = متطلبات الجودة / الـ non-functional (من المتطلبات الوظيفية + أصحاب المصلحة).'),
    t('Design: 2a choose framework (patterns/styles), 2b allocate components → views + document.', 'التصميم: 2a اختيار framework (patterns/styles)، و2b توزيع الـ components ← views + مستند.'),
    t('Known patterns cut risk and have clear quality pros/cons; small apps: one pattern (n-tier); complex apps: integrate several.', 'الـ patterns المعروفة بتقلل الخطر وليها مميزات وعيوب جودة واضحة؛ التطبيقات الصغيرة: pattern واحد (n-tier)؛ والمعقدة: دمج كذا pattern.'),
  ],
}
