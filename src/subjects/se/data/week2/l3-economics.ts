import type { Lesson } from '../../types'
import { part, t } from '../helpers'

/** Slides 10–15 and 34: the economic goal, "clean up later", behaviour vs structure, cost-friction, Eisenhower, extreme trade-offs, Dilemma 1. */
export const economics: Lesson = {
  id: 'w2-economics',
  weekId: 'week-2',
  order: 3,
  title: 'Why Structure Pays: The Economics of Architecture',
  shortTitle: 'The Economics',
  slides: [10, 11, 12, 13, 14, 15, 34],
  minutes: 18,
  tldr: t(
    'Architecture is about **money, not beauty**: minimize the human effort to build and maintain the system. Good design keeps the 100th feature as cheap as the 1st. “We’ll clean it up later” never happens. Software has two values — **behavior** (today) and **structure** (tomorrow) — and structure is the **Important-but-not-urgent** quadrant that companies wrongly sacrifice.',
    'الـ Architecture موضوعها **فلوس، مش شكل حلو**: قلّل المجهود البشري اللازم لبناء وصيانة السيستم. الـ design الكويس بيخلّي الـ feature رقم 100 بنفس تمن الأولى. و“هننضّف بعدين” عمرها ما بتحصل. السوفتوير ليه قيمتين — **behavior** (النهارده) و**structure** (بكرة) — والـ structure هي خانة **مهم بس مش مستعجل** اللي الشركات بتضحّي بيها غلط.',
  ),
  blocks: [
    part(t('The fundamental goal', 'الهدف الأساسي')),
    {
      kind: 'memorize',
      label: 'The goal of architecture',
      text: 'Minimize the human resources required to build and maintain a system.',
      source: 'CleanArch Ch1',
      note: t('It is **not for aesthetics. It is purely economic.**', 'الموضوع **مش للشكل الحلو. ده اقتصادي بحت.**'),
    },
    {
      kind: 'diagram',
      id: 'cost-curve',
      title: t('Good vs bad design over time', 'design كويس ضد design وحش مع الوقت'),
      caption: t(
        '**Good design:** the cost of adding the 100th feature is identical to the 1st — effort stays stable. **Bad design:** the cost per line of code grows **exponentially** over the system’s lifetime.',
        '**Design كويس:** تمن الـ feature رقم 100 هو هو تمن الأولى — المجهود ثابت. **Design وحش:** تمن السطر الواحد بيكبر **أُسّيًا** على مدار عمر السيستم.',
      ),
    },

    part(t('The “Clean Up Later” fallacy', 'كدبة “هننضّف بعدين”')),
    {
      kind: 'idea',
      title: 'The Hare’s Overconfidence',
      icon: 'rabbit',
      tone: 'rose',
      text: t(
        'Developers constantly lie to themselves: *“We can clean it up later; we just have to get to market first!”* **The reality:** market pressures **never abate** — you will never be given permission to “stop and clean up.”',
        'المطورين بيضحكوا على نفسهم طول الوقت: *“هننضّفه بعدين؛ المهم ننزل السوق الأول!”* **الحقيقة:** ضغط السوق **عمره ما بيخف** — ومحدش هيدّيك إذن إنك “توقف وتنضّف”.',
      ),
      analogy: t(
        'The tortoise and the hare: the hare sprints, feels so far ahead that it naps, and loses. Messy code is the hare’s sprint.',
        'حدوتة الأرنب والسلحفاة: الأرنب بيجري، يحس إنه سابق بكتير فينام، ويخسر. الكود المكركب هو جري الأرنب ده.',
      ),
    },
    {
      kind: 'memorize',
      label: 'The truth about messes',
      text: 'Making messes is always slower than staying clean, on any time scale.',
    },

    part(t('A tale of two values: behavior vs structure', 'حكاية قيمتين: behavior و structure')),
    {
      kind: 'versus',
      left: { title: '1 · Behavior', icon: 'zap', tone: 'blue', tagline: t('Value for today', 'قيمة النهارده') },
      right: { title: '2 · Architecture (Structure)', icon: 'blocks', tone: 'teal', tagline: t('Value for tomorrow', 'قيمة بكرة') },
      rows: [
        {
          aspect: 'Meaning',
          left: t('The **immediate functional capability**: making the machine do what the stakeholders want **today**.', '**القدرة الوظيفية الحالية**: إن الجهاز يعمل اللي أصحاب المصلحة عايزينه **النهارده**.'),
          right: t('The **preservation of “softness”**: ensuring the machine can **easily** do what stakeholders want **tomorrow**.', '**الحفاظ على “الليونة”**: إن الجهاز يقدر يعمل **بسهولة** اللي هيطلبوه **بكرة**.'),
        },
        {
          aspect: 'Who notices',
          left: t('Everyone — it is visible right away.', 'الكل — بيبان على طول.'),
          right: t('Almost nobody — until change becomes impossible.', 'تقريبًا محدش — لحد ما التغيير يبقى مستحيل.'),
        },
      ],
      verdict: t(
        '“**Soft**ware” must stay soft. If machine behavior was meant to be hard to change, we would have built it in **hardware**.',
        'الـ “**Soft**ware” لازم يفضل soft (لين). لو سلوك الجهاز كان المفروض يبقى صعب التغيير، كنا عملناه **hardware**.',
      ),
    },

    part(t('The cost-friction principle', 'مبدأ تكلفة الاحتكاك')),
    {
      kind: 'cards',
      columns: 2,
      items: [
        { icon: 'ruler', title: 'Scope of change', tone: 'blue', body: t('The **logical size** of the requested feature (how much it does).', '**الحجم المنطقي** للـ feature المطلوبة (بتعمل قد إيه).') },
        { icon: 'shapes', title: 'Shape of change', tone: 'amber', body: t('How the request **aligns with the system’s structural design** (does it fit the existing structure or cut across it?).', 'الطلب **ماشي مع هيكل السيستم** ولا لأ (بيركب على الهيكل الموجود ولا بيقطع فيه بالعرض؟).') },
      ],
    },
    {
      kind: 'memorize',
      label: 'The principle',
      text: 'In a healthy system, the cost of change is proportional ONLY to the scope of the change, never to its shape.',
      note: t(
        'Measure **friction**: when a small request feels expensive “because of how the system is built”, the architecture is degrading.',
        'قيس **الاحتكاك**: لما طلب صغير يبقى غالي “بسبب طريقة بناء السيستم”، يبقى الـ architecture بتبوظ.',
      ),
    },
    {
      kind: 'diagram',
      id: 'scope-shape',
      title: t('Same scope, different shape', 'نفس الحجم، شكل مختلف'),
      caption: t(
        'Requests A and B are the same size. A healthy system charges the same for both; a decaying one charges far more for the request that cuts across its structure.',
        'الطلبين A وB نفس الحجم. السيستم السليم بياخد نفس التمن في الاتنين؛ والسيستم اللي بيبوظ بياخد أكتر بكتير في الطلب اللي بيقطع الهيكل بالعرض.',
      ),
    },

    part(t('The Eisenhower matrix in software', 'مصفوفة أيزنهاور في السوفتوير')),
    {
      kind: 'diagram',
      id: 'eisenhower',
      title: t('Four quadrants, one deadly mistake', 'أربع خانات، وغلطة واحدة قاتلة'),
      caption: t('President Dwight D. Eisenhower’s 2×2 urgency matrix (Figure 2.1). **Architecture lives in Q2: important but not urgent** — which is exactly why it gets postponed.', 'مصفوفة الاستعجال 2×2 بتاعة الرئيس Dwight D. Eisenhower (Figure 2.1). **الـ Architecture عايشة في Q2: مهمة بس مش مستعجلة** — وعشان كده بالظبط بتتأجل.'),
    },
    {
      kind: 'table',
      caption: t('The four quadrants in software', 'الأربع خانات في السوفتوير'),
      headers: ['Quadrant', 'Urgency × importance', 'In software'],
      rows: [
        [t('Q1'), t('Urgent & important', 'مستعجل ومهم'), t('Critical production bugs', 'bugs خطيرة في الـ production')],
        [t('Q2'), t('Not urgent, important', 'مش مستعجل بس مهم'), t('**Architecture & structural integrity**', '**الـ Architecture وسلامة الهيكل**')],
        [t('Q3'), t('Urgent, not important', 'مستعجل بس مش مهم'), t('Immediate but trivial stakeholder features', 'features فورية بس تافهة بيطلبها أصحاب المصلحة')],
        [t('Q4'), t('Not urgent, not important', 'لا مستعجل ولا مهم'), t('All other nice-to-have stuff', 'أي حاجة تانية “لو موجودة يبقى أحسن”')],
      ],
    },
    {
      kind: 'callout',
      tone: 'warning',
      title: t('The failure mode', 'الغلطة القاتلة'),
      body: t(
        'Elevating **Quadrant 3** features above **Quadrant 2** architecture. **This destroys companies.**',
        'إنك ترفع features الـ **Q3** فوق architecture الـ **Q2**. **ده بيدمّر شركات.**',
      ),
    },

    part(t('Extreme value trade-offs', 'الموازنة في أقصى الحالات')),
    {
      kind: 'versus',
      left: { title: 'Case A · Perfect behavior, rigid structure', icon: 'lock', tone: 'rose', tagline: t('Does exactly what is needed today; code heavily coupled and rigid', 'بيعمل المطلوب النهارده بالظبط؛ والكود متشابك وجامد') },
      right: { title: 'Case B · Defective behavior, soft structure', icon: 'puzzle', tone: 'teal', tagline: t('Has bugs today; architecture perfectly decoupled and modular', 'فيه bugs النهارده؛ والـ architecture مفصولة وmodular تمامًا') },
      rows: [
        {
          aspect: 'Immediate outcome',
          left: t('**Success:** stakeholders happy, immediate revenue captured.', '**نجاح:** أصحاب المصلحة مبسوطين، والفلوس جاية على طول.'),
          right: t('**Friction:** immediate stakeholder complaints and bug reports.', '**احتكاك:** شكاوي وbug reports على طول.'),
        },
        {
          aspect: 'Long-term survivability',
          left: t('**Death:** the moment requirements shift, the cost of refactoring approaches **infinity**. The system **freezes**.', '**موت:** أول ما المتطلبات تتغير، تمن الـ refactoring يقرّب من **مالانهاية**. السيستم **بيتجمّد**.'),
          right: t('**Immortal:** fixing the defects takes **near-zero effort** because the code has a **shape-agnostic design**.', '**خالد:** تصليح العيوب بياخد **مجهود قريب من الصفر** لأن الـ design **مش فارق معاه شكل التغيير**.'),
        },
      ],
      verdict: t(
        'A working-but-rigid program is worth less in the long run than a buggy-but-soft one: bugs in soft code are cheap to fix; rigidity is fatal.',
        'برنامج شغال بس جامد قيمته على المدى الطويل أقل من برنامج فيه bugs بس لين: الـ bugs في الكود اللين رخيصة التصليح؛ إنما الجمود قاتل.',
      ),
    },

    part(t('Think & defend: speed vs structure', 'فكّر ودافع: السرعة ولا الهيكل')),
    {
      kind: 'dilemma',
      label: 'Think & Defend · Dilemma 1',
      title: 'Speed vs structural integrity',
      scenario: t(
        'Your startup has **3 months of runway** left. The CEO demands a massive **pivot** to a new feature set.',
        'الـ startup بتاعتك فاضلها **فلوس تكفي 3 شهور**. والـ CEO عايز **pivot** ضخم لمجموعة features جديدة.',
      ),
      options: [
        { label: 'Build it cleanly (Architecture)', tone: 'teal', text: t('Takes **4 months** → the company dies before launch.', 'هياخد **4 شهور** → الشركة تموت قبل الإطلاق.') },
        { label: 'Hack it together (Behavior)', tone: 'rose', text: t('Takes **2 months**, but the code becomes an **unmaintainable mess**.', 'هياخد **شهرين**، بس الكود يبقى **مكركب ومينفعش يتصان**.') },
      ],
      question: 'What is the “least worst” decision?',
      lens: [
        t('There is no perfect answer — that is the point (First Law: everything is a trade-off). Your job is to pick the **least worst** and **defend it**.', 'مفيش إجابة مثالية — وده المقصود (القانون الأول: كل حاجة trade-off). شغلتك تختار **الأقل سوءًا** و**تدافع عنه**.'),
        t('A dead company has no architecture to protect: surviving the next 3 months is a hard constraint, so pure “clean” (4 months) fails it.', 'الشركة الميتة مالهاش architecture تحميها: إنك تعيش الـ 3 شهور دول شرط أساسي، فالـ “نضيف 100%” (4 شهور) مش بيحققه.'),
        t('But remember: “we’ll clean it up later” never happens. So a defensible answer **limits the mess on purpose**: hack the features, but protect the few hard-to-change decisions (data model, key boundaries) and record the debt (why you did it — Second Law).', 'بس افتكر إن “هننضّف بعدين” مبتحصلش. فالإجابة اللي تتدافع عنها **بتحدد الكركبة بقصد**: اعمل الـ features بسرعة، بس احمي القرارات القليلة الصعب تغييرها (الـ data model والحدود الأساسية)، وسجّل الـ debt وليه عملته (القانون التاني).'),
        t('Judge it with Q2 vs Q3: is the pivot truly important (survival) or just urgent? Survival is important *and* urgent (Q1) — that changes the calculus.', 'احكم عليها بـ Q2 وQ3: الـ pivot ده مهم فعلًا (حياة أو موت) ولا مستعجل وبس؟ البقاء مهم *ومستعجل* (Q1) — وده بيغيّر الحسبة.'),
      ],
    },
  ],
  keyTerms: [
    { term: 'Goal of architecture', definition: t('Minimize the human resources required to build and maintain a system — purely economic.', 'تقليل المجهود البشري اللازم لبناء وصيانة السيستم — اقتصادي بحت.') },
    { term: 'Good vs bad design (cost view)', definition: t('Good: the 100th feature costs the same as the 1st. Bad: cost per line grows exponentially.', 'الكويس: الـ feature رقم 100 بنفس تمن الأولى. الوحش: تمن السطر بيكبر أُسّيًا.') },
    { term: '“Clean up later” fallacy (Hare’s Overconfidence)', definition: t('Believing you can ship messy now and clean later; market pressure never stops, so it never happens.', 'إنك فاكر تنزّل كود مكركب دلوقتي وتنضّف بعدين؛ ضغط السوق مبيقفش فده مبيحصلش.') },
    { term: 'Behavior', definition: t('The immediate functional capability: doing what stakeholders want today.', 'القدرة الوظيفية الحالية: إنك تعمل اللي عايزينه النهارده.') },
    { term: 'Structure (architecture value)', definition: t('Preserving “softness” so the machine can easily do what stakeholders want tomorrow.', 'الحفاظ على “الليونة” عشان الجهاز يعمل بسهولة اللي هيطلبوه بكرة.') },
    { term: 'Scope of change', definition: t('The logical size of the requested feature.', 'الحجم المنطقي للـ feature المطلوبة.') },
    { term: 'Shape of change', definition: t('How a request aligns with the system’s structural design.', 'مدى توافق الطلب مع هيكل السيستم.') },
    { term: 'Cost-friction principle', definition: t('In a healthy system, cost of change is proportional only to its scope, never to its shape.', 'في السيستم السليم، تمن التغيير بيتناسب مع حجمه بس، عمره ما يتناسب مع شكله.') },
    { term: 'Eisenhower matrix (software)', definition: t('Q1 critical bugs, Q2 architecture, Q3 trivial urgent features, Q4 nice-to-have; failure mode = Q3 above Q2.', 'Q1 bugs خطيرة، Q2 architecture، Q3 features تافهة مستعجلة، Q4 كماليات؛ والغلطة = Q3 فوق Q2.') },
    { term: 'Shape-agnostic design', definition: t('A structure where the cost of a change does not depend on its shape — Case B’s secret to “immortality”.', 'هيكل تمن التغيير فيه مش معتمد على شكله — سر “خلود” Case B.') },
  ],
  recap: [
    t('Goal: minimize human resources to build and maintain — economics, not aesthetics.', 'الهدف: تقليل المجهود البشري — اقتصاد، مش شكل.'),
    t('Good design: 100th feature = 1st feature cost. Bad design: exponential cost per line.', 'Design كويس: feature 100 = تمن الأولى. وحش: تمن أُسّي للسطر.'),
    t('“Clean up later” never comes; making messes is always slower than staying clean.', '“هننضّف بعدين” مبتجيش؛ والكركبة دايمًا أبطأ من النضافة.'),
    t('Two values: behavior (today) and structure/softness (tomorrow). Else build it in hardware.', 'قيمتين: behavior (النهارده) وstructure/الليونة (بكرة). وإلا اعمله hardware.'),
    t('Cost-friction: cost ∝ scope only, never shape.', 'تكلفة الاحتكاك: التمن ∝ الحجم بس، مش الشكل.'),
    t('Eisenhower: architecture = Q2 (important, not urgent). Q3 above Q2 destroys companies.', 'أيزنهاور: الـ architecture = Q2 (مهم مش مستعجل). وQ3 فوق Q2 بيدمّر شركات.'),
    t('Table 1: rigid-but-working → dies when requirements shift; buggy-but-soft → immortal.', 'جدول 1: شغال بس جامد → يموت لما المتطلبات تتغير؛ فيه bugs بس لين → خالد.'),
  ],
}
