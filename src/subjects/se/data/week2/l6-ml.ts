import type { Lesson } from '../../types'
import { part, t } from '../helpers'

/** Slides 28–33, 35–37: ML as a paradigm shift, when (not) to use it, the four pillars, SWE vs ML, Dilemmas 2–3, and the week summary. */
export const ml: Lesson = {
  id: 'w2-ml',
  weekId: 'week-2',
  order: 6,
  title: 'Machine Learning Systems: The Ultimate Test of Architecture',
  shortTitle: 'ML Systems',
  slides: [28, 29, 30, 31, 32, 33, 35, 36, 37],
  minutes: 20,
  tldr: t(
    'In ML the rules are **learned from data** instead of written by people, so **data is code** — when data drifts, behavior changes **silently**. Use ML only when rules are dynamic, scale is massive, or the mapping is too non-linear to hand-code; **default to rules** otherwise. Production ML needs **Reliability, Scalability, Maintainability, Adaptability**, and it fails **silently**, so it needs **statistical** verification.',
    'في الـ ML القواعد **بتتعلم من الداتا** بدل ما البشر يكتبوها، فـ **الداتا = كود** — ولما الداتا تتغير، السلوك بيتغير **من غير ما حد يحس**. استخدم ML بس لما القواعد متغيرة، أو الحجم ضخم، أو العلاقة معقدة ومش خطية مينفعش تتكتب بإيدك؛ وغير كده **ابدأ بالقواعد**. والـ ML في الـ production محتاج **Reliability وScalability وMaintainability وAdaptability**، وبيفشل **بصمت**، فمحتاج تحقق **إحصائي**.',
  ),
  blocks: [
    part(t('The probabilistic paradigm shift', 'النقلة للعالم الاحتمالي')),
    {
      kind: 'diagram',
      id: 'ml-inversion',
      title: t('A systemic inversion', 'قلب للمعادلة'),
      caption: t(
        '**Traditional SWE:** Input + Deterministic Rules (Code) → Output. **Production ML:** Historical Data (X and Y) → Statistical Model (Probabilistic Rules). The rules stop being something we write and become something we produce from data.',
        '**الهندسة التقليدية:** Input + قواعد deterministic (كود) → Output. **ML في الـ production:** داتا تاريخية (X وY) → موديل إحصائي (قواعد احتمالية). القواعد بطّلت حاجة بنكتبها وبقت حاجة بنطلّعها من الداتا.',
      ),
    },
    {
      kind: 'memorize',
      label: 'The architectural challenge',
      text: 'In ML, data is code. If the real-world data distribution drifts, the system’s runtime logic changes silently under the hood.',
    },
    {
      kind: 'idea',
      title: 'Same code, different behavior',
      icon: 'refresh',
      tone: 'violet',
      text: t(
        'Nobody edited a line, nobody deployed anything — yet the system now behaves differently, because the world it learned from has changed.',
        'محدش عدّل سطر، ومحدش نزّل حاجة — ومع ذلك السيستم بقى بيتصرف بشكل مختلف، لأن الدنيا اللي اتعلم منها اتغيرت.',
      ),
      analogy: t(
        'A model learned shopping habits before a pandemic. Overnight people buy differently; the model keeps confidently predicting the old world.',
        'موديل اتعلم عادات الشراء قبل وباء. فجأة الناس بقت تشتري بشكل تاني؛ والموديل لسه بيتوقع العالم القديم وهو واثق من نفسه.',
      ),
    },

    part(t('ML systems in production — when to use ML', 'الـ ML في الـ production — إمتى نستخدمه')),
    {
      kind: 'definition',
      term: 'Machine Learning',
      definition: t(
        'The use of complex models to **extract patterns from existing data** to **predict unseen data**.',
        'استخدام موديلات معقدة عشان **تطلّع patterns من داتا موجودة** و**تتوقع داتا لسه متشافتش**.',
      ),
      detail: t('ML systems revolutionized the traditional architectural constraints.', 'أنظمة الـ ML قلبت القيود المعمارية التقليدية.'),
    },
    {
      kind: 'cards',
      title: t('We deploy ML when…', 'بنستخدم ML لما…'),
      columns: 3,
      numbered: true,
      items: [
        { title: 'Rules are highly dynamic', tone: 'blue', body: t('Hand-written rules would keep going stale — **traditional code rots**.', 'القواعد المكتوبة باليد هتقدم بسرعة — **الكود التقليدي بيعفّن**.') },
        { title: 'Massive scale', tone: 'teal', body: t('The problem operates at **massive scale** (millions of decisions).', 'المشكلة شغالة على **حجم ضخم** (ملايين القرارات).') },
        { title: 'Non-linear mapping', tone: 'violet', body: t('The mapping is functionally **non-linear** — humans **cannot write the `if` statements**.', 'العلاقة **مش خطية** — البشر **مش هيقدروا يكتبوا الـ `if` statements**.') },
      ],
    },

    part(t('When NOT to use machine learning', 'إمتى منستخدمش ML')),
    {
      kind: 'lead',
      text: t(
        'Before deploying a probabilistic engine, an architect must **verify that ML is actually required**. Do **not** use ML if any of these five is true:',
        'قبل ما تنزّل موتور احتمالي، المعماري لازم **يتأكد إن الـ ML مطلوب فعلًا**. **متستخدمش** ML لو أي واحدة من الخمسة دول صح:',
      ),
    },
    {
      kind: 'cards',
      columns: 3,
      numbered: true,
      items: [
        { title: 'Simple rules suffice', tone: 'blue', body: t('A **regular expression, a lookup table** or a basic heuristic performs adequately and is **highly auditable**.', '**regex أو lookup table** أو قاعدة بسيطة بتأدي كويس و**سهل تراجعها**.') },
        { title: 'Data scarcity', tone: 'amber', body: t('Clean, representative, labelable historical data is **non-existent or financially prohibitive**.', 'الداتا التاريخية النضيفة والممثّلة والقابلة للتصنيف **مش موجودة أو غالية جدًا**.') },
        { title: 'Absolute interpretability is mandatory', tone: 'violet', body: t('Business or law requires a **100% trace** of exact logical execution (e.g. **medical diagnostics, aerospace triggers**).', 'البيزنس أو القانون عايز **تتبّع 100%** لكل خطوة منطقية (زي **التشخيص الطبي، وأوامر الطيران**).') },
        { title: 'Non-stationary environment (no patterns)', tone: 'rose', body: t('The data generator has **no statistical regularities** or shifts faster than retraining can adapt (e.g. **dice outcomes**).', 'مصدر الداتا **مفيهوش انتظام إحصائي** أو بيتغير أسرع من إعادة التدريب (زي **نتيجة رمي الزهر**).') },
        { title: 'High error penalty', tone: 'rose', body: t('The system cannot tolerate **probabilistic failure** under any circumstances (e.g. **critical hardware shut-off**, physical triggers where failure costs lives).', 'السيستم ميستحملش **فشل احتمالي** بأي شكل (زي **فصل هاردوير حرج**، أو أوامر فيزيائية الغلط فيها بأرواح).') },
      ],
    },
    {
      kind: 'hook',
      title: t('Five reasons to say “no ML”', 'خمس أسباب تقول فيها “لأ للـ ML”'),
      phrase: 'S · D · I · N · H',
      letters: [
        { letter: 'S', word: 'Simple rules suffice' },
        { letter: 'D', word: 'Data is scarce' },
        { letter: 'I', word: 'Interpretability required' },
        { letter: 'N', word: 'Non-stationary (no patterns)' },
        { letter: 'H', word: 'High error penalty' },
      ],
      body: t('Say it as “**S**orry, **D**on’t **I**nvent **N**eural **H**ype.”', 'قولها: “**S**orry, **D**on’t **I**nvent **N**eural **H**ype.”'),
    },
    {
      kind: 'memorize',
      label: 'Architecture default',
      text: 'Always default to clean, rule-based logic until empirical data proves rules cannot satisfy the system requirements.',
    },

    part(t('Four pillars of production ML systems', 'الأعمدة الأربعة لأنظمة الـ ML')),
    {
      kind: 'cards',
      columns: 4,
      items: [
        { icon: 'shield', title: 'Reliability', tone: 'blue', body: t('Keeps working despite hardware/network faults. In ML it is challenged by **silent failures**: valid schemas with stale, incorrect or highly biased predictions.', 'بيفضل شغال رغم أعطال الهاردوير والشبكة. وفي الـ ML التحدي هو **الفشل الصامت**: output شكله سليم بس التوقعات قديمة أو غلط أو متحيزة جدًا.') },
        { icon: 'up', title: 'Scalability', tone: 'teal', body: t('Managing growth in **data, QPS, or model count**: automate CPU/GPU auto-scaling and orchestrate **thousands of customized models**.', 'إدارة النمو في **الداتا أو الـ QPS أو عدد الموديلات**: auto-scaling أوتوماتيك للـ CPU/GPU وتنسيق **آلاف الموديلات المخصصة**.') },
        { icon: 'wrench', title: 'Maintainability', tone: 'violet', body: t('Clean **separation of concerns**, standardized **feature stores**, and collaborative interfaces for **Data Scientists and MLOps**.', '**فصل مسؤوليات** نضيف، و**feature stores** موحّدة، وواجهات تعاون بين **الـ Data Scientists والـ MLOps**.') },
        { icon: 'radar', title: 'Adaptability', tone: 'amber', body: t('Continuously **detect performance decay (drift)** and seamlessly **trigger continuous retraining**.', '**اكتشاف تدهور الأداء (drift)** باستمرار و**تشغيل إعادة تدريب** بسلاسة.') },
      ],
    },
    {
      kind: 'hook',
      title: t('The four pillars', 'الأعمدة الأربعة'),
      phrase: 'R · S · M · A',
      letters: [
        { letter: 'R', word: 'Reliability' },
        { letter: 'S', word: 'Scalability' },
        { letter: 'M', word: 'Maintainability' },
        { letter: 'A', word: 'Adaptability ← the ML-specific one' },
      ],
      body: t('The first three apply to any system; **Adaptability** (drift → retrain) is what ML adds.', 'أول تلاتة لأي سيستم؛ والـ **Adaptability** (drift → retrain) هي اللي الـ ML بيزوّدها.'),
    },

    part(t('Traditional SWE vs ML engineering', 'الهندسة التقليدية مقابل هندسة الـ ML')),
    {
      kind: 'table',
      caption: t('Five dimensions to compare', 'خمس أبعاد للمقارنة'),
      headers: ['Dimension', 'Traditional software engineering', 'Machine learning systems'],
      rows: [
        [t('Logic origin'), t('Explicitly coded by human engineers.', 'مكتوب صراحةً بإيد المهندسين.'), t('Emerges dynamically from **Code + Data + Hyperparameters**.', 'بيطلع ديناميكيًا من **Code + Data + Hyperparameters**.')],
        [t('Failure mode'), t('**Loud**: stack traces, null pointers, crashes.', '**عالي الصوت**: stack traces وnull pointers وcrashes.'), t('**Silent**: valid schemas, incorrect behavior / bias.', '**صامت**: شكل سليم، وسلوك غلط / تحيّز.')],
        [t('Testing'), t('Unit tests verify **deterministic** outputs.', 'الـ unit tests بتتأكد من outputs **محددة**.'), t('**Statistical evaluations** verify probabilistic boundaries.', '**تقييمات إحصائية** بتتأكد من حدود احتمالية.')],
        [t('Decay'), t('Rots when underlying **dependencies/APIs change**.', 'بيعفّن لما **الـ dependencies/APIs تتغير**.'), t('Rots **instantly** as real-world **data distributions drift**.', 'بيعفّن **فورًا** لما **توزيع الداتا في الواقع يتغير**.')],
        [t('Artifact size'), t('**Megabytes** (binaries, containers).', '**ميجابايتس** (binaries وcontainers).'), t('**Gigabytes/Terabytes** (massive tensor weights).', '**جيجا/تيرابايتس** (أوزان tensors ضخمة).')],
      ],
    },
    {
      kind: 'hook',
      title: t('The five rows', 'الخمس صفوف'),
      phrase: 'Origin · Failure · Testing · Decay · Size',
      body: t('Shortcut: ML = **data-born, quiet, statistical, drifting, heavy**.', 'اختصار: الـ ML = **مولود من الداتا، ساكت، إحصائي، بيتغير، تقيل**.'),
    },
    {
      kind: 'callout',
      tone: 'insight',
      title: t('Silent failure links back to Week 1', 'الفشل الصامت بيرجعنا لأسبوع 1'),
      body: t(
        'The float32 PID bug was a *silent* failure in classic code. ML makes silence the **default** failure mode — which is why it is “the ultimate test of architecture”.',
        'bug الـ float32 في الـ PID كان فشل *صامت* في كود تقليدي. الـ ML بيخلّي الصمت هو **الطبيعي** — وعشان كده هو “أصعب اختبار للـ architecture”.',
      ),
    },

    part(t('Think & defend: ML trade-offs', 'فكّر ودافع: trade-offs الـ ML')),
    {
      kind: 'dilemma',
      label: 'Think & Defend · Dilemma 2',
      title: 'Latency vs throughput',
      scenario: t(
        'You are building an **ML-driven high-frequency trading bot**. The model predicts price movements.',
        'بتبني **bot تداول عالي التردد معتمد على ML**. الموديل بيتوقع حركة الأسعار.',
      ),
      options: [
        { label: 'Option A · process trades individually', tone: 'blue', text: t('Latency = **10 ms** · Throughput = **100 QPS**.', 'Latency = **10 ms** · Throughput = **100 QPS**.') },
        { label: 'Option B · batch 50 trades', tone: 'violet', text: t('Latency = **45 ms** · Throughput = **1,000 QPS**.', 'Latency = **45 ms** · Throughput = **1,000 QPS**.') },
      ],
      question: 'Which do you choose?',
      lens: [
        t('First Law again: B buys 10× throughput by paying 4.5× latency. Neither is “better” in general — the **architecture characteristic that matters most** decides.', 'القانون الأول تاني: B بيشتري throughput أكتر 10 مرات وبيدفع latency أكتر 4.5 مرة. مفيش واحد “أحسن” في المطلق — الـ **characteristic الأهم** هي اللي تحكم.'),
        t('In high-frequency trading a prediction is only worth something if it arrives before the price moves, so **latency** usually dominates → the common defense is **A**.', 'في التداول عالي التردد التوقع ملوش قيمة غير لو وصل قبل ما السعر يتحرك، فالـ **latency** غالبًا هي الأهم → الدفاع المعتاد هو **A**.'),
        t('But check the load: if real traffic exceeds 100 QPS, A builds a queue and its effective latency explodes. Defend your choice with numbers, not taste.', 'بس بص على الحمل: لو الطلبات الحقيقية أكتر من 100 QPS، A هيعمل طابور والـ latency الفعلية هتنفجر. دافع عن اختيارك بالأرقام، مش بالذوق.'),
      ],
    },
    {
      kind: 'dilemma',
      label: 'Think & Defend · Dilemma 3',
      title: 'Accuracy vs maintainability — the ensembling paradox',
      scenario: t(
        'A Kaggle grandmaster builds a model from an **ensemble of 15 different deep-learning architectures**. It improves conversion accuracy by **0.5%** over a single, simple model.',
        'خبير Kaggle عمل موديل من **ensemble فيه 15 deep-learning architecture مختلفين**. حسّن دقة الـ conversion بـ **0.5%** بس عن موديل واحد بسيط.',
      ),
      options: [
        { label: 'Deploy the ensemble', tone: 'teal', text: t('+0.5% accuracy, but **triple the server budget** and **15 separate data pipelines** to maintain.', '+0.5% دقة، بس **الميزانية تتضرب في 3** و**15 data pipeline منفصلين** لازم يتصانوا.') },
        { label: 'Keep the simple model', tone: 'blue', text: t('Slightly less accurate, far cheaper and easier to maintain and retrain.', 'أقل دقة شوية، بس أرخص وأسهل في الصيانة وإعادة التدريب بكتير.') },
      ],
      question: 'Do you deploy the ensemble?',
      lens: [
        t('Turn it into money (architecture’s goal is economic): does 0.5% more conversions earn more than 3× servers plus the people-hours to run 15 pipelines?', 'حوّلها لفلوس (هدف الـ architecture اقتصادي): الـ 0.5% conversions زيادة هتجيب أكتر من 3 أضعاف السيرفرات + ساعات البشر اللي هتشغّل 15 pipeline؟'),
        t('Check the pillars: 15 pipelines hurt **Maintainability**, and 15 models must all be monitored for drift and retrained (**Adaptability**).', 'بص على الأعمدة: 15 pipeline بيضرّوا الـ **Maintainability**، و15 موديل كلهم محتاجين مراقبة drift وإعادة تدريب (**Adaptability**).'),
        t('Competition wins ≠ production wins. Netflix famously never deployed the full winning ensemble of its $1M prize: the extra accuracy did not justify the engineering cost. The usual defense is **no**, unless that 0.5% is worth a lot of money.', 'الفوز في مسابقة ≠ النجاح في الـ production. Netflix مشهورة إنها منزّلتش الـ ensemble الكامل اللي كسب جايزة المليون دولار: الدقة الزيادة ماتستاهلش تمن الهندسة. الدفاع المعتاد **لأ**، إلا لو الـ 0.5% دي بفلوس كتير.'),
      ],
    },

    part(t('Week 2 in three axioms', 'أسبوع 2 في تلات مسلّمات')),
    {
      kind: 'cards',
      columns: 3,
      numbered: true,
      items: [
        { title: 'One continuum', tone: 'blue', body: t('Architecture and design are an unbroken continuum. **Cleanliness is speed.**', 'الـ Architecture والـ design استمرارية واحدة. **النضافة = سرعة.**') },
        { title: 'Localized trade-offs', tone: 'violet', body: t('Architecture is a series of localized trade-offs; there is **no “perfect” system**.', 'الـ Architecture سلسلة trade-offs محلية؛ و**مفيش سيستم “مثالي”**.') },
        { title: 'ML fails silently', tone: 'rose', body: t('ML systems fail silently; they require **statistical**, not just deterministic, verification.', 'أنظمة الـ ML بتفشل بصمت؛ ومحتاجة تحقق **إحصائي**، مش deterministic بس.') },
      ],
    },
  ],
  keyTerms: [
    { term: 'Probabilistic paradigm shift', definition: t('Traditional: input + coded rules → output. ML: historical data (X, Y) → a model of probabilistic rules.', 'التقليدي: input + قواعد مكتوبة → output. الـ ML: داتا تاريخية (X وY) → موديل قواعد احتمالية.') },
    { term: '“Data is code”', definition: t('In ML the data shapes the logic; if its distribution drifts, runtime logic changes silently.', 'في الـ ML الداتا بتشكّل المنطق؛ ولو توزيعها اتغير المنطق بيتغير بصمت.') },
    { term: 'Machine learning', definition: t('Using complex models to extract patterns from existing data to predict unseen data.', 'استخدام موديلات معقدة لاستخراج patterns من داتا موجودة لتوقع داتا جديدة.') },
    { term: 'When to deploy ML', definition: t('Highly dynamic rules, massive scale, or a non-linear mapping humans cannot write as if-statements.', 'قواعد متغيرة جدًا، أو حجم ضخم، أو علاقة مش خطية البشر ميقدروش يكتبوها if-statements.') },
    { term: 'When NOT to use ML', definition: t('Simple rules suffice, data scarcity, mandatory interpretability, non-stationary environment, high error penalty.', 'قواعد بسيطة كفاية، ندرة الداتا، تفسير إلزامي، بيئة مش ثابتة، تمن غلط عالي.') },
    { term: 'Architecture default', definition: t('Default to clean rule-based logic until empirical data proves rules cannot meet the requirements.', 'ابدأ بقواعد نضيفة لحد ما الداتا تثبت إن القواعد مش كفاية.') },
    { term: 'Reliability (ML)', definition: t('Keeps working despite faults; threatened by silent failures (valid schema, wrong/stale/biased predictions).', 'بيفضل شغال رغم الأعطال؛ ومهدد بالفشل الصامت (شكل سليم وتوقعات غلط/قديمة/متحيزة).') },
    { term: 'Scalability (ML)', definition: t('Handling growth in data, QPS or model count via auto-scaling and orchestrating thousands of models.', 'التعامل مع نمو الداتا والـ QPS وعدد الموديلات بالـ auto-scaling وتنسيق آلاف الموديلات.') },
    { term: 'Maintainability (ML)', definition: t('Separation of concerns, standardized feature stores, collaborative interfaces for data scientists and MLOps.', 'فصل مسؤوليات، وfeature stores موحّدة، وواجهات تعاون بين الـ data scientists والـ MLOps.') },
    { term: 'Adaptability', definition: t('Continuously detecting drift (performance decay) and triggering retraining.', 'اكتشاف الـ drift (تدهور الأداء) باستمرار وتشغيل إعادة التدريب.') },
    { term: 'Data drift', definition: t('The real-world data distribution changing over time, silently changing an ML system’s behaviour.', 'تغيّر توزيع الداتا في الواقع مع الوقت، فيتغير سلوك نظام الـ ML بصمت.') },
    { term: 'Ensembling paradox', definition: t('A large ensemble may add a little accuracy at a large cost in servers and maintainability.', 'ensemble كبير ممكن يزوّد دقة شوية بتمن كبير في السيرفرات والصيانة.') },
  ],
  recap: [
    t('Traditional: input + rules → output. ML: data (X, Y) → model (rules). Data is code; drift changes logic silently.', 'التقليدي: input + قواعد → output. الـ ML: داتا (X وY) → موديل (قواعد). الداتا كود؛ والـ drift بيغيّر المنطق بصمت.'),
    t('Use ML for dynamic rules, massive scale, non-linear mappings.', 'استخدم ML للقواعد المتغيرة والحجم الضخم والعلاقات المش خطية.'),
    t('Avoid ML (SDINH): simple rules, data scarcity, interpretability, non-stationary, high error penalty. Default to rules.', 'تجنّب ML (SDINH): قواعد بسيطة، ندرة داتا، تفسير إلزامي، بيئة مش ثابتة، تمن غلط عالي. ابدأ بالقواعد.'),
    t('Four pillars: Reliability, Scalability, Maintainability, Adaptability (RSMA).', 'الأعمدة الأربعة: Reliability وScalability وMaintainability وAdaptability (RSMA).'),
    t('SWE vs ML: human vs data-born logic, loud vs silent failure, unit vs statistical tests, API rot vs drift rot, MB vs GB/TB.', 'التقليدي vs الـ ML: منطق بشري vs من الداتا، فشل عالي vs صامت، unit tests vs إحصائي، عفن APIs vs عفن drift، MB vs GB/TB.'),
    t('Dilemmas: speed vs structure, latency vs throughput, accuracy vs maintainability — pick the least worst and defend it.', 'المعضلات: سرعة vs هيكل، latency vs throughput، دقة vs صيانة — اختار الأقل سوءًا ودافع عنه.'),
  ],
}
