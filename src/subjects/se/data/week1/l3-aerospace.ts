import type { Lesson } from '../../types'
import { part, t } from '../helpers'

/** Slides 9–12 (13 is blank): the aerospace PID case study, the float32 bug and the supply-chain attack. */
export const aerospace: Lesson = {
  id: 'w1-aerospace',
  weekId: 'week-1',
  order: 3,
  title: 'Case Study: The AI Code That Looked Perfect',
  shortTitle: 'Aerospace Case Study',
  slides: [9, 10, 11, 12, 13],
  minutes: 16,
  tldr: t(
    'An AI wrote a textbook-correct PID controller with passing tests. It still lost altitude: the **Integral** sum was a **32-bit float**, so after 12 hours tiny corrections (0.0000001) were silently **truncated** to nothing. The same AI also **hallucinated a dependency** that turned out to be a **malicious typo-squatting package** — a supply chain attack.',
    'الـ AI كتب PID controller صح زي الكتاب وكل الـ tests عدّت. ومع ذلك الطيارة فقدت ارتفاع: مجموع الـ **Integral** كان **float 32-bit**، فبعد 12 ساعة التصحيحات الصغيرة (0.0000001) كانت **بتتقص** وتختفي من غير أي إنذار. ونفس الـ AI **ألّف dependency** طلعت **package خبيثة بتعمل typo-squatting** — يعني supply chain attack.',
  ),
  blocks: [
    {
      kind: 'lead',
      text: t(
        'Remember this story whenever someone says “the AI code works, the tests pass”. Code can be syntactically perfect, mathematically correct and fully tested — and still fail in the real world.',
        'افتكر الحكاية دي كل ما حد يقول “كود الـ AI شغال والـ tests عدّت”. الكود ممكن يكون مظبوط في الـ syntax، وصح رياضيًا، ومتجرّب بالكامل — ويفشل برضه في الواقع.',
      ),
    },
    {
      kind: 'case',
      label: 'Case study context',
      title: 'Aerospace subsystem',
      beats: [
        { label: 'Domain', icon: 'plane', tone: 'blue', text: t('A **high-reliability aerospace control subsystem**.', '**subsystem تحكّم في الطيران** لازم يكون موثوق جدًا.') },
        { label: 'Task', icon: 'target', tone: 'violet', text: t('Implement a **PID** (Proportional, Integral, Derivative) controller for **rapid altitude stabilization**.', 'اعمل **PID** controller (Proportional وIntegral وDerivative) عشان **يثبّت الارتفاع بسرعة**.') },
        { label: 'Environment', icon: 'timer', tone: 'amber', text: t('The team was under **severe schedule pressure**.', 'الفريق كان تحت **ضغط مواعيد شديد**.') },
        { label: 'Action', icon: 'bot', tone: 'rose', text: t('A **junior engineer** used an **AI coding assistant** to generate the core loop.', '**مهندس junior** استخدم **AI coding assistant** يكتب الـ loop الأساسي.') },
      ],
      lesson: t(
        'Pressure + inexperience + unverified AI output: the classic recipe for a hidden failure.',
        'ضغط + قلة خبرة + كود AI محدش اتأكد منه: الوصفة الكلاسيكية لعطل مستخبي.',
      ),
    },

    part(t('PID in two minutes', 'الـ PID في دقيقتين')),
    {
      kind: 'idea',
      title: 'A feedback loop keeps correcting itself',
      icon: 'repeat',
      tone: 'teal',
      text: t(
        'A feedback control loop **constantly compares where you are to where you want to be**, making **continuous micro-corrections**.',
        'الـ feedback control loop **بيقارن طول الوقت إنت فين باللي عايز توصله**، وبيعمل **تصحيحات صغيرة مستمرة**.',
      ),
      analogy: t(
        'Adjusting a shower: water too cold *now* → turn the tap a lot (P). It has been slightly cold *for a while* → keep nudging (I). Temperature is rising *fast* → ease off before it scalds you (D).',
        'زي ما بتظبط الدُش: المية ساقعة *دلوقتي* → تلف الحنفية كتير (P). بقالها *فترة* ساقعة شوية → تفضل تزوّد حبة حبة (I). الحرارة *بتطلع بسرعة* → تهدّي قبل ما تتلسع (D).',
      ),
    },
    {
      kind: 'diagram',
      id: 'pid-loop',
      title: t('The closed loop', 'الـ closed loop'),
      caption: t(
        'Measure → compare with the target → the error goes into PID → push the actuator → measure again, forever.',
        'قيس → قارن بالهدف → الـ error يدخل الـ PID → زُق الـ actuator → قيس تاني، على طول.',
      ),
    },
    {
      kind: 'cards',
      title: t('The three intuitive voices of PID', 'التلات أصوات بتوع الـ PID'),
      columns: 3,
      items: [
        { title: 'P · Proportional', tag: 'THE PRESENT', tone: 'blue', icon: 'crosshair', body: t('“How far off are we **right now**?” → an **immediate** push.', '“إحنا بعيد قد إيه **دلوقتي**؟” → زقّة **فورية**.') },
        { title: 'I · Integral', tag: 'THE PAST', tone: 'amber', icon: 'hourglass', body: t('“Have we been drifting off-target **for too long**?” → a **persistent** push. It works by **adding up (accumulating)** the error over time.', '“بقالنا **كتير** بعيد عن الهدف؟” → زقّة **مستمرة**. وبيشتغل إنه **يجمّع (accumulate)** الـ error على مدار الوقت.') },
        { title: 'D · Derivative', tag: 'THE FUTURE', tone: 'teal', icon: 'telescope', body: t('“How **fast** are we closing the gap?” → **brakes** against overshooting.', '“بنقفل المسافة **بسرعة** قد إيه؟” → **فرامل** عشان منعدّيش الهدف.') },
      ],
    },
    {
      kind: 'hook',
      title: t('P-I-D = three tenses', 'P-I-D = تلات أزمنة'),
      phrase: 'Present · Past · Future',
      body: t(
        'P = now, I = history (a running **sum**), D = trend. Keep “I = a sum that keeps growing” in mind — it is the whole bug.',
        'P = دلوقتي، I = التاريخ (**مجموع** بيكبر)، D = الاتجاه. خلّي في دماغك إن “I = مجموع بيفضل يكبر” — ده الـ bug كله.',
      ),
    },

    part(t('The setup: AI-generated PID logic', 'التجهيز: PID كتبه الـ AI')),
    {
      kind: 'flow',
      steps: [
        { icon: 'bot', label: 'LLM writes the PID', tone: 'violet', detail: t('Syntactically perfect, mathematically correct **standard PID** in Python.', '**PID قياسي** في Python، مظبوط syntax وصح رياضيًا.') },
        { icon: 'check', label: 'Tests pass', tone: 'teal', detail: t('Unit tests — **also generated by the LLM** — **passed flawlessly**.', 'الـ unit tests — **اللي كتبها الـ LLM برضه** — **عدّت كلها**.') },
        { icon: 'search', label: 'Review & merge', tone: 'blue', detail: t('The engineer checked the math matched the **textbook** and merged the PR.', 'المهندس اتأكد إن الرياضة زي **الكتاب** وعمل merge للـ PR.') },
        { icon: 'plane', label: 'Deploy to simulation', tone: 'amber', detail: t('Deployed to a **hardware-in-the-loop** simulation environment.', 'اتنزّل على بيئة simulation من نوع **hardware-in-the-loop**.') },
      ],
      caption: t('Everything looks right. One question remains: **What could go wrong?**', 'كل حاجة باينة مظبوطة. فاضل سؤال واحد: **إيه اللي ممكن يبوظ؟**'),
    },
    {
      kind: 'definition',
      term: 'Hardware-in-the-loop (HIL) simulation',
      definition: t(
        'Testing the real control software against simulated physics/hardware, so failures show up before a real flight.',
        'إنك تجرّب software التحكم الحقيقي قدام فيزيا/هاردوير متمثّلين، عشان الأعطال تظهر قبل أي طيران حقيقي.',
      ),
    },

    part(t('The incident: a silent logic bug', 'الحادثة: bug منطقي صامت')),
    {
      kind: 'diagram',
      id: 'float-sequence',
      title: t('What happened, message by message', 'اللي حصل، رسالة رسالة'),
      caption: t(
        'The sensor did its job and the PID did its math — the correction died inside the 32-bit accumulator, so the actuator got **0.0** and the aircraft drifted.',
        'الـ sensor عمل شغله والـ PID عمل حسابه — التصحيح مات جوّه الـ accumulator الـ 32-bit، فالـ actuator استلم **0.0** والطيارة نزلت.',
      ),
    },
    {
      kind: 'definition',
      term: 'The flaw',
      definition: t(
        'The LLM used standard **32-bit floating-point accumulation** for the **Integral** term.',
        'الـ LLM استخدم **float 32-bit عادي للتجميع (accumulation)** في الـ **Integral** term.',
      ),
      detail: t(
        'Over a **12-hour simulation** the accumulated sum grew **massive**. When the sensor reported microscopic corrections (**0.0000001**), **catastrophic cancellation (type truncation)** occurred: the float could not represent the tiny delta against the massive sum, so the system ignored all minor corrections → a **silent, unrecoverable loss of altitude**.',
        'على مدار **simulation 12 ساعة** المجموع كبر **جدًا**. ولما الـ sensor بعت تصحيحات ميكروسكوبية (**0.0000001**) حصل **catastrophic cancellation (type truncation)**: الـ float مقدرش يمثّل الفرق الصغير ده جنب المجموع الضخم، فالسيستم تجاهل كل التصحيحات الصغيرة → **فقد ارتفاع صامت ومينفعش يتصلّح**.',
      ),
    },
    {
      kind: 'diagram',
      id: 'float-digits',
      title: t('Why the correction vanished', 'ليه التصحيح اختفى'),
      caption: t(
        'A float32 stores only about **7 significant digits**. 100000.0000001 needs 13, so the last digit — the correction — is cut off and the sum stays 100000.0.',
        'الـ float32 بيخزّن حوالي **7 أرقام معنوية** بس. والرقم 100000.0000001 محتاج 13، فآخر رقم — اللي هو التصحيح — بيتقص والمجموع يفضل 100000.0.',
      ),
    },
    {
      kind: 'idea',
      title: 'Small + huge = huge (in float32)',
      icon: 'scale',
      tone: 'rose',
      text: t(
        'The math was right; the **data type** was wrong. Adding a tiny number to a huge one in limited precision changes nothing — and **no error is raised**. That is what makes it *silent*.',
        'الرياضة كانت صح؛ **نوع الداتا** هو اللي غلط. لما تجمع رقم صغير جدًا على رقم ضخم بدقة محدودة، مفيش حاجة بتتغير — و**مفيش أي error بيطلع**. وده اللي بيخليه *صامت*.',
      ),
      analogy: t(
        'Put a grain of sand on a truck scale that only shows whole kilograms. Add one grain every second for hours: the display never moves — even though the truck keeps getting heavier.',
        'حط حبة رمل على ميزان عربيات نقل بيعرض كيلوهات صحيحة بس. زوّد حبة كل ثانية لساعات: الرقم مش هيتحرك أبدًا — مع إن العربية بتتقل فعلًا.',
      ),
    },
    {
      kind: 'callout',
      tone: 'key',
      title: t('The official term', 'المصطلح الرسمي'),
      body: t('The course calls this **“catastrophic cancellation (type truncation)”** — use that wording. (Numerical-analysis books often call this exact effect *absorption*.)', 'المادة بتسمّي ده **“catastrophic cancellation (type truncation)”** — استخدم الاسم ده. (كتب التحليل العددي غالبًا بتسمّي الظاهرة دي بالظبط *absorption*.)'),
    },
    {
      kind: 'callout',
      tone: 'warning',
      title: t('Why didn’t the tests catch it?', 'ليه الـ tests مامسكتهوش؟'),
      body: t(
        'The bug needs a **huge** accumulated sum — it only appears after hours of running. Short unit tests never get there, and tests written by the **same LLM** share the code’s blind spots.',
        'الـ bug محتاج مجموع **ضخم** — مبيظهرش غير بعد ساعات تشغيل. الـ unit tests القصيرة عمرها ما توصل للنقطة دي، والـ tests اللي كتبها **نفس الـ LLM** عندها نفس النقط العمياء بتاعة الكود.',
      ),
    },

    part(t('The security flaw: an AI supply chain attack', 'الثغرة الأمنية: supply chain attack بسبب الـ AI')),
    {
      kind: 'flow',
      title: t('How the attack got in', 'الهجوم دخل إزاي'),
      steps: [
        { icon: 'bot', label: 'Hallucinated import', tone: 'violet', detail: t('To format telemetry output, the LLM **hallucinated** a dependency: `import yaml_config_parser`.', 'عشان ينسّق الـ telemetry، الـ LLM **ألّف** dependency: `import yaml_config_parser`.') },
        { icon: 'terminal', label: 'Blind install', tone: 'amber', detail: t('The developer **blindly installed** it via `pip`.', 'المطوّر **سطّبها من غير ما يفكّر** بـ `pip`.') },
        { icon: 'package-x', label: 'Malicious package', tone: 'rose', detail: t('The package was **real** — a known malicious **typo-squatting** library.', 'الـ package كانت **موجودة فعلًا** — مكتبة خبيثة معروفة بتعمل **typo-squatting**.') },
        { icon: 'skull', label: 'Remote code runs', tone: 'rose', detail: t('It **executed remote code upon initialization**.', '**شغّلت كود من بعيد أول ما اتعملها initialization**.') },
      ],
      caption: t('The AI inadvertently acted as a **vector** for a **supply chain attack**.', 'الـ AI من غير قصد بقى **الطريق (vector)** لـ **supply chain attack**.'),
    },
    {
      kind: 'cards',
      columns: 3,
      items: [
        { icon: 'bot', title: 'Hallucinated dependency', tone: 'violet', body: t('A package name the model **invents** because it “sounds right”, not because it checked it exists or is safe.', 'اسم package الموديل **بيألفه** عشان “شكله صح”، مش عشان اتأكد إنه موجود أو آمن.') },
        { icon: 'search', title: 'Typo-squatting', tone: 'amber', body: t('Attackers publish packages with names that **look like** popular ones, waiting for someone to install the wrong name.', 'المهاجمين بينشروا packages أساميها **شبه** المشهورة، ومستنيين حد يسطّب الاسم الغلط.') },
        { icon: 'package', title: 'Supply chain attack', tone: 'rose', body: t('Attacking you **through something you depend on** (a library, a tool) instead of attacking your code directly.', 'إنهم يهاجموك **عن طريق حاجة إنت معتمد عليها** (مكتبة، أداة) بدل ما يهاجموا كودك مباشرة.') },
      ],
    },
    {
      kind: 'callout',
      tone: 'insight',
      title: t('Two bugs, one root cause', 'مشكلتين، وسبب واحد'),
      body: t(
        'Both failures came from treating AI output as automatically correct — the **Black Box Fallacy** from Lesson 2, and exactly what Objective 3 warns about: *without governance, AI generates technical debt (and risk) at unprecedented velocity.*',
        'العطلين جم من إننا عاملنا كلام الـ AI على إنه صح تلقائي — نفس الـ **Black Box Fallacy** بتاع الدرس 2، وبالظبط اللي الهدف 3 بيحذّر منه: *من غير governance، الـ AI بيعمل technical debt (ومخاطر) بسرعة غير مسبوقة.*',
      ),
    },
  ],
  keyTerms: [
    { term: 'PID controller', definition: t('A feedback controller combining Proportional (present), Integral (past) and Derivative (future) terms.', 'controller بالـ feedback بيجمع Proportional (الحاضر) وIntegral (الماضي) وDerivative (المستقبل).') },
    { term: 'Closed-loop (feedback) control', definition: t('Constantly comparing where you are with where you want to be and making continuous micro-corrections.', 'مقارنة مستمرة بين مكانك والمكان اللي عايزه، مع تصحيحات صغيرة على طول.') },
    { term: 'P — Proportional', definition: t('The present: “How far off are we right now?” — an immediate push.', 'الحاضر: “إحنا بعيد قد إيه دلوقتي؟” — زقّة فورية.') },
    { term: 'I — Integral', definition: t('The past: “Have we been drifting too long?” — a persistent push built from the accumulated error.', 'الماضي: “بقالنا كتير بعيد؟” — زقّة مستمرة من الـ error المتجمّع.') },
    { term: 'D — Derivative', definition: t('The future: “How fast are we closing the gap?” — brakes against overshooting.', 'المستقبل: “بنقفل المسافة بسرعة قد إيه؟” — فرامل ضد إننا نعدّي الهدف.') },
    { term: 'Hardware-in-the-loop simulation', definition: t('Running the real control software against simulated hardware/physics.', 'تشغيل software التحكم الحقيقي قدام هاردوير/فيزيا متمثّلين.') },
    { term: '32-bit float accumulation', definition: t('Summing values in a float32 (~7 significant digits): tiny additions to a huge sum are lost.', 'الجمع في float32 (حوالي 7 أرقام معنوية): الإضافات الصغيرة على مجموع ضخم بتضيع.') },
    { term: 'Catastrophic cancellation (type truncation)', definition: t('The course’s name for the tiny delta being lost against the massive float32 sum.', 'اسم المادة لضياع الفرق الصغير جنب مجموع الـ float32 الضخم.') },
    { term: 'Silent logic bug', definition: t('Wrong behaviour that raises no error or crash, so nobody notices until damage is done.', 'سلوك غلط من غير أي error أو crash، فمحدش ياخد باله غير بعد ما الضرر يحصل.') },
    { term: 'Hallucinated dependency', definition: t('A package the LLM invents in an import; here `yaml_config_parser`.', 'package الـ LLM بيألفها في import؛ هنا `yaml_config_parser`.') },
    { term: 'Typo-squatting', definition: t('Publishing malicious packages whose names imitate real ones.', 'نشر packages خبيثة أساميها بتقلّد أسامي حقيقية.') },
    { term: 'Supply chain attack', definition: t('An attack delivered through a dependency or tool you trust; here it executed remote code on initialization.', 'هجوم بيوصلك عن طريق dependency أو أداة واثق فيها؛ هنا شغّلت remote code أول ما اتعملها initialization.') },
  ],
  recap: [
    t('Context: aerospace altitude PID, severe schedule pressure, junior engineer + AI assistant.', 'السياق: PID لثبات الارتفاع في الطيران، ضغط مواعيد، مهندس junior + AI assistant.'),
    t('PID: P = present (how far off now), I = past (drifting too long; a running sum), D = future (how fast; brakes).', 'الـ PID: P = الحاضر، I = الماضي (مجموع بيكبر)، D = المستقبل (فرامل).'),
    t('Setup: perfect syntax, textbook math, LLM-written tests passed, PR merged, HIL simulation.', 'التجهيز: syntax مظبوط، رياضة زي الكتاب، tests كتبها الـ LLM عدّت، merge، وsimulation من نوع HIL.'),
    t('Flaw: 32-bit float for the Integral; after 12 h, 0.0000001 corrections were truncated → silent, unrecoverable altitude loss.', 'العيب: float 32-bit للـ Integral؛ بعد 12 ساعة تصحيحات 0.0000001 اتقصّت → فقد ارتفاع صامت ومينفعش يتصلّح.'),
    t('Course term: catastrophic cancellation (type truncation).', 'مصطلح المادة: catastrophic cancellation (type truncation).'),
    t('Security: hallucinated `import yaml_config_parser` → blind pip install → malicious typo-squatting package → remote code execution = supply chain attack.', 'الأمان: `import yaml_config_parser` متألف → pip install من غير تفكير → package خبيثة typo-squatting → تشغيل remote code = supply chain attack.'),
  ],
}
