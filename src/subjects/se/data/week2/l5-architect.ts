import type { Lesson } from '../../types'
import { part, t } from '../helpers'

/** Slides 17, 18, 21, 22, 25, 26, 27: the eight expectations, breadth vs depth, process vs practices, the circle of life. */
export const architect: Lesson = {
  id: 'w2-architect',
  weekId: 'week-2',
  order: 5,
  title: 'Thinking Like an Architect',
  shortTitle: 'Thinking Like an Architect',
  slides: [17, 18, 21, 22, 25, 26, 27],
  minutes: 16,
  tldr: t(
    'An architect has **eight expectations** — four technical, four human — and the main task is **compliance** (“a whiteboard drawing no one follows is modern art”). Architects trade **depth for breadth**, pushing unknown unknowns into known unknowns. **Process (Scrum) cannot protect architecture; engineering practices (fitness functions) can.** Architects stay **hands-on** in a “circle of life” with developers — without becoming the bottleneck.',
    'المعماري عليه **8 توقعات** — 4 تقنية و4 إنسانية — وأهم مهمة هي **الالتزام (compliance)** (“رسمة على السبورة محدش بيمشي عليها دي فن حديث”). المعماري بيضحّي **بالعمق عشان الاتساع**، وبيحوّل الحاجات اللي مايعرفش إنه مايعرفهاش لحاجات عارف إنه مايعرفهاش. **الـ Process (Scrum) ميقدرش يحمي الـ architecture؛ الـ engineering practices (fitness functions) تقدر.** والمعماري بيفضل **بيكتب كود** في “دايرة حياة” مع المطورين — من غير ما يبقى عنق زجاجة.',
  ),
  blocks: [
    part(t('The eight core expectations of an architect', 'التمن توقعات الأساسية من المعماري')),
    {
      kind: 'cards',
      title: t('Part 1 · Beyond the whiteboard (technical)', 'الجزء 1 · أبعد من السبورة (تقني)'),
      columns: 4,
      numbered: true,
      items: [
        { title: 'Make Architecture Decisions', tone: 'blue', body: t('Define **structural boundaries and parameters** rather than micromanaging specific tools.', 'حدّد **الحدود والمعايير الهيكلية** بدل ما تتحكم في كل أداة بالتفصيل.') },
        { title: 'Continually Analyze', tone: 'teal', body: t('Monitor systemic viability and structural health over time to **halt structural decay**.', 'راقب صحة السيستم وهيكله على طول عشان **توقف التآكل الهيكلي**.') },
        { title: 'Keep Current with Trends', tone: 'violet', body: t('Monitor and prepare for **inevitable technical shifts**.', 'تابع واستعد لـ **التحولات التقنية اللي جاية جاية**.') },
        { title: 'Ensure Compliance', tone: 'amber', body: t('Establish **automated governance** and validation mechanisms (**fitness functions**).', 'اعمل **رقابة أوتوماتيك** وآليات تحقق (**fitness functions**).') },
      ],
    },
    {
      kind: 'cards',
      title: t('Part 2 · Leadership, breadth & politics (human)', 'الجزء 2 · قيادة واتساع وسياسة (إنساني)'),
      columns: 4,
      items: [
        { title: '5 · Diverse Exposure', tone: 'blue', icon: 'telescope', body: t('Cultivate **wide, heterogeneous technical breadth** over localized depth.', 'ابني **اتساع تقني واسع ومتنوع** بدل عمق في حتة واحدة.') },
        { title: '6 · Business Domain Knowledge', tone: 'teal', icon: 'coins', body: t('Understand domain **concepts, goals, vocabulary** and **market positioning**.', 'افهم **مفاهيم وأهداف ومصطلحات** البيزنس و**موقعه في السوق**.') },
        { title: '7 · Interpersonal Skills', tone: 'violet', icon: 'users', body: t('**Lead, facilitate, coach and mentor**, acting as a collaborative peer.', '**قود وسهّل ودرّب ووجّه**، كزميل متعاون مش كمدير.') },
        { title: '8 · Navigate Politics', tone: 'amber', icon: 'handshake', body: t('**Defend trade-offs objectively** against stakeholder pressure.', '**دافع عن الـ trade-offs بموضوعية** قدام ضغط أصحاب المصلحة.') },
      ],
    },
    {
      kind: 'hook',
      title: t('All eight in one sentence', 'التمانية في جملة واحدة'),
      phrase: 'Decide · Analyze · Keep current · Comply — Breadth · Business · People · Politics',
      body: t('First four = the technical job. Last four = the human job.', 'أول أربعة = الشغل التقني. آخر أربعة = الشغل الإنساني.'),
    },
    {
      kind: 'memorize',
      label: 'The compliance imperative',
      text: 'A whiteboard drawing that no one follows is not architecture; it’s modern art.',
      note: t('**Your primary task is ensuring compliance.**', '**مهمتك الأساسية إنك تضمن الالتزام.**'),
    },
    {
      kind: 'definition',
      term: 'Fitness function',
      definition: t(
        'An automated check that verifies the code still respects an architectural rule (e.g. a test that fails the build if the UI package imports the database package).',
        'فحص أوتوماتيك بيتأكد إن الكود لسه ماشي على قاعدة معمارية (زي test بيوقّع الـ build لو package الـ UI عمل import لـ package الداتابيز).',
      ),
    },

    part(t('Technical depth vs technical breadth', 'العمق التقني مقابل الاتساع التقني')),
    {
      kind: 'lead',
      text: t(
        'As developers you spent years building **technical depth** (expertise in one stack). As architects you must **sacrifice depth** to aggressively expand **technical breadth**.',
        'كمطورين قضيتوا سنين تبنوا **عمق تقني** (خبرة في stack واحد). كمعماريين لازم **تضحّوا بشوية عمق** عشان توسّعوا **الاتساع التقني** بقوة.',
      ),
    },
    {
      kind: 'diagram',
      id: 'knowledge-pyramid',
      title: t('The knowledge pyramid', 'هرم المعرفة'),
      caption: t(
        'Top: **stuff you know** (depth). Middle: **stuff you know you don’t know** (breadth — awareness of alternatives). Bottom: **stuff you don’t know you don’t know** (unknown unknowns — the danger zone).',
        'فوق: **حاجات تعرفها** (عمق). النص: **حاجات عارف إنك متعرفهاش** (اتساع — عارف إن فيه بدائل). تحت: **حاجات متعرفش إنك متعرفهاش** (المجهول المجهول — منطقة الخطر).',
      ),
    },
    {
      kind: 'memorize',
      label: 'The goal of architectural thinking',
      text: 'Constantly push the boundaries of the middle tier downwards into the bottom tier. You expand what you know you don’t know.',
      note: t(
        'Why it matters: **you cannot select the best architectural trade-off if you are unaware the pattern exists.** You don’t need to master every database — just know it exists and what it is good for.',
        'ليه ده مهم: **مينفعش تختار أحسن trade-off معماري لو إنت مش عارف إن الـ pattern موجود أصلًا.** مش لازم تحترف كل داتابيز — كفاية تعرف إنها موجودة وبتنفع في إيه.',
      ),
    },

    part(t('Process vs engineering practices', 'الـ Process مقابل الـ Engineering Practices')),
    {
      kind: 'versus',
      left: { title: 'Software development process', icon: 'users', tone: 'violet', tagline: t('Who does the work, and when', 'مين بيشتغل وإمتى') },
      right: { title: 'Software engineering practices', icon: 'wrench', tone: 'teal', tagline: t('How the code is constructed', 'الكود بيتبني إزاي') },
      rows: [
        {
          aspect: 'Nature',
          left: t('**Human-centric** workflows.', 'طرق شغل **بتتمحور حوالين البشر**.'),
          right: t('**Process-agnostic, objective, technical** techniques.', 'تقنيات **تقنية وموضوعية ومش فارق معاها الـ process**.'),
        },
        {
          aspect: 'Examples',
          left: t('Scrum, Kanban.', 'Scrum وKanban.'),
          right: t('Continuous Integration, TDD, automated linters, fitness functions.', 'Continuous Integration وTDD وautomated linters وfitness functions.'),
        },
        {
          aspect: 'Regulates',
          left: t('Meetings, cards, sprint retrospectives.', 'الاجتماعات والكروت والـ sprint retrospectives.'),
          right: t('How code is built and checked.', 'الكود بيتبني ويتراجع إزاي.'),
        },
      ],
      verdict: t(
        '**The Architectural Axiom:** process frameworks (like Scrum) **cannot** repair or preserve a decoupled architecture. Only disciplined **engineering practices** (like fitness functions) can.',
        '**الـ Architectural Axiom:** الـ process frameworks (زي Scrum) **مش هتقدر** تصلّح أو تحافظ على architecture مفصولة. اللي يقدر بس **engineering practices** منضبطة (زي الـ fitness functions).',
      ),
    },
    {
      kind: 'myths',
      items: [
        {
          myth: t('“We do Scrum, so our architecture is safe.”', '“إحنا شغالين Scrum، يبقى الـ architecture في أمان.”'),
          fact: t('Scrum organizes people and time. Only practices (CI, TDD, linters, fitness functions) protect the code’s structure.', 'الـ Scrum بيرتّب الناس والوقت. اللي بيحمي هيكل الكود هي الـ practices (CI وTDD وlinters وfitness functions).'),
        },
      ],
    },

    part(t('Architectural thinking: the “Circle of Life”', 'التفكير المعماري: “دايرة الحياة”')),
    {
      kind: 'callout',
      tone: 'warning',
      title: t('The catastrophic anti-pattern', 'الـ anti-pattern الكارثي'),
      body: t(
        'The traditional model — the **architect hands a blueprint to a developer** and walks away — is a catastrophic anti-pattern.',
        'النموذج التقليدي — **المعماري يسلّم رسمة للمطوّر** ويمشي — ده anti-pattern كارثي.',
      ),
    },
    {
      kind: 'diagram',
      id: 'circle-of-life',
      title: t('The collaborative view', 'النظرة التعاونية'),
      caption: t(
        'Architecture and design are a synchronized “Circle of Life”: **architects remain hands-on**, writing code and proving out POCs; **developers understand the architectural constraints** to inform their localized class designs.',
        'الـ Architecture والـ design “دايرة حياة” متزامنة: **المعماري بيفضل بيكتب كود** ويثبت الأفكار بـ POCs؛ و**المطوّر فاهم القيود المعمارية** عشان يصمّم الـ classes بتاعته صح.',
      ),
    },
    {
      kind: 'callout',
      tone: 'key',
      title: t('Avoid the Bottleneck Trap', 'خلّي بالك من فخ عنق الزجاجة'),
      body: t(
        'Do **not** take ownership of **critical-path framework code**. An architect who stops coding entirely becomes an **“Ivory Tower” architect**; one who owns critical code blocks the whole team when pulled into meetings.',
        '**متمسكش** **كود الـ framework اللي على الـ critical path**. المعماري اللي بيبطّل كود خالص بيبقى **معماري “برج عاجي”**؛ واللي ماسك كود حساس بيعطّل الفريق كله أول ما يتسحب لاجتماع.',
      ),
    },
    {
      kind: 'cards',
      title: t('Four hands-on preservation strategies (non-critical-path)', 'أربع طرق تفضل بيها بتكتب كود (بعيد عن الـ critical path)'),
      columns: 4,
      numbered: true,
      items: [
        { title: 'Targeted Feature Delivery', tone: 'blue', body: t('Code **non-critical business-domain features** planned **1–3 iterations in advance**. Never touch critical-path framework code.', 'اكتب **features بيزنس مش حرجة** متخططة **قبلها بـ 1–3 iterations**. ومتلمسش كود الـ framework الحرج أبدًا.') },
        { title: 'High-Quality POCs', tone: 'teal', body: t('Write **production-grade prototypes** to evaluate competing tools. **Throwaway code must remain reference-quality.**', 'اكتب **prototypes بجودة production** عشان تقيّم الأدوات المتنافسة. **حتى الكود اللي هيترمي لازم يبقى بجودة مرجعية.**') },
        { title: 'Technical Debt Stories', tone: 'amber', body: t('Own **low-priority technical debt** or infrastructure-enablement cards that **won’t stall the team if delayed**.', 'خد **technical debt قليل الأولوية** أو كروت تجهيز infrastructure **مش هتعطّل الفريق لو اتأخرت**.') },
        { title: 'Developer Tooling & Automation', tone: 'violet', body: t('Build **CLI utilities, custom linters, code generators** and **automated fitness functions** for the team.', 'ابني **CLI utilities وcustom linters وcode generators** و**fitness functions أوتوماتيك** للفريق.') },
      ],
    },
    {
      kind: 'hook',
      title: t('The four strategies', 'الأربع طرق'),
      phrase: 'Features · POCs · Debt · Tools',
      body: t('All four share one rule: **off the critical path**.', 'الأربعة ليهم قاعدة واحدة: **بعيد عن الـ critical path**.'),
    },
  ],
  keyTerms: [
    { term: 'Eight core expectations', definition: t('Make decisions, continually analyze, keep current, ensure compliance, diverse exposure, business domain knowledge, interpersonal skills, navigate politics.', 'اتخاذ القرارات، التحليل المستمر، متابعة الجديد، ضمان الالتزام، الاتساع، فهم البيزنس، مهارات التعامل، إدارة السياسة.') },
    { term: 'Compliance imperative', definition: t('A whiteboard drawing no one follows is modern art; the primary task is ensuring compliance.', 'رسمة محدش بيمشي عليها فن حديث؛ والمهمة الأساسية ضمان الالتزام.') },
    { term: 'Fitness function', definition: t('Automated governance: a check that verifies the code respects an architectural rule.', 'رقابة أوتوماتيك: فحص بيتأكد إن الكود ماشي على قاعدة معمارية.') },
    { term: 'Technical depth', definition: t('Expertise in one stack — “stuff you know”.', 'خبرة في stack واحد — “حاجات تعرفها”.') },
    { term: 'Technical breadth', definition: t('Awareness of alternatives — “stuff you know you don’t know”.', 'معرفة البدائل — “حاجات عارف إنك متعرفهاش”.') },
    { term: 'Unknown unknowns', definition: t('“Stuff you don’t know you don’t know” — the danger zone.', '“حاجات متعرفش إنك متعرفهاش” — منطقة الخطر.') },
    { term: 'Software development process', definition: t('Human-centric workflows (Scrum, Kanban) tracking who does the work and when.', 'طرق شغل بشرية (Scrum وKanban) بتتابع مين بيشتغل وإمتى.') },
    { term: 'Software engineering practices', definition: t('Process-agnostic technical techniques (CI, TDD, linters) dictating how code is constructed.', 'تقنيات تقنية مستقلة عن الـ process (CI وTDD وlinters) بتحدد الكود بيتبني إزاي.') },
    { term: 'Architectural Axiom', definition: t('Process frameworks cannot preserve a decoupled architecture; only disciplined engineering practices can.', 'الـ process frameworks متقدرش تحافظ على architecture مفصولة؛ الـ engineering practices المنضبطة بس اللي تقدر.') },
    { term: 'Circle of Life', definition: t('Architecture and design as a synchronized loop between hands-on architects and constraint-aware developers.', 'الـ architecture والـ design كدايرة متزامنة بين معماري بيكتب كود ومطوّر فاهم القيود.') },
    { term: 'Ivory Tower architect', definition: t('An architect who has stopped coding completely.', 'معماري بطّل كود خالص.') },
    { term: 'Bottleneck Trap', definition: t('An architect owning critical-path framework code and blocking the team.', 'معماري ماسك كود framework حرج ومعطّل الفريق.') },
  ],
  recap: [
    t('Technical expectations: decide, analyze, keep current, ensure compliance (fitness functions).', 'التوقعات التقنية: قرّر، حلّل، تابع الجديد، اضمن الالتزام (fitness functions).'),
    t('Human expectations: breadth, business domain, interpersonal skills, politics.', 'التوقعات الإنسانية: اتساع، فهم البيزنس، مهارات التعامل، السياسة.'),
    t('An unfollowed whiteboard drawing is modern art — compliance is the primary task.', 'الرسمة اللي محدش بيمشي عليها فن حديث — الالتزام هو المهمة الأساسية.'),
    t('Architects trade depth for breadth; push “know you don’t know” down into the unknown unknowns.', 'المعماري بيبدّل العمق بالاتساع؛ ويوسّع “عارف إني مش عارف” جوّه منطقة المجهول.'),
    t('Process (Scrum, Kanban) ≠ practices (CI, TDD, linters). Only practices preserve architecture.', 'الـ Process (Scrum وKanban) ≠ الـ practices (CI وTDD وlinters). الـ practices بس اللي بتحمي الـ architecture.'),
    t('Blueprint hand-off is an anti-pattern; work as a Circle of Life. Stay hands-on via features, POCs, debt stories, tooling — never critical-path code.', 'تسليم الرسمة anti-pattern؛ اشتغلوا كدايرة حياة. وفضل بتكتب كود عن طريق features وPOCs وdebt stories وأدوات — بس مش كود الـ critical path.'),
  ],
}
