import type { Lesson } from '../../types'
import { part, t } from '../helpers'

/** Slides 4–8: the scaling myth, Anthropic's SWE-bench case study, the agent harness and its moral. */
export const harness: Lesson = {
  id: 'w1-harness',
  weekId: 'week-1',
  order: 2,
  title: 'AI Needs Engineering: The Story of the Harness',
  shortTitle: 'AI & the Harness',
  slides: [4, 5, 6, 7, 8],
  minutes: 18,
  tldr: t(
    'Bigger models did **not** fix AI coding failures. Anthropic fixed them with classic software engineering: a **deterministic harness** (Initializer/Worker pattern, context compaction, progressive tooling, hard verification gates). The LLM is the **engine**; the harness is the **vehicle**.',
    'الموديلات الأكبر **مَحلّتش** مشاكل الـ AI في كتابة الكود. Anthropic حلّتها بهندسة سوفتوير كلاسيك: **harness محدد (deterministic)** حوالين الموديل (Initializer/Worker، وcontext compaction، وprogressive tooling، وhard verification gates). الـ LLM هو **الموتور**؛ والـ harness هو **العربية**.',
  ),
  blocks: [
    {
      kind: 'lead',
      text: t(
        'This lesson is one story in four acts: a wrong belief, a wall, a breakthrough, and a moral. Follow the story and every term will stick by itself.',
        'الدرس ده حكاية واحدة في 4 فصول: اعتقاد غلط، وحيطة اتخبطوا فيها، واكتشاف، وعبرة. امشِ ورا الحكاية وكل مصطلح هيثبت لوحده.',
      ),
    },

    part(t('Act 1 — The wrong beliefs', 'الفصل 1 — الاعتقادات الغلط')),
    {
      kind: 'cards',
      columns: 2,
      items: [
        {
          icon: 'up',
          title: 'The Scaling Myth',
          tone: 'rose',
          body: t(
            'A naive assumption early in the generative-AI boom: *scaling raw parameter sizes and training tokens would magically cure all structural and logic failures.*',
            'افتراض ساذج في أول موجة الـ generative AI: إن *تكبير عدد الـ parameters وكمية الـ training tokens هيعالج سحريًا كل الأخطاء الهيكلية والمنطقية.*',
          ),
        },
        {
          icon: 'hourglass',
          title: 'The “Wait for GPT-N” Cop-out',
          tone: 'amber',
          body: t(
            'If a model could not navigate a **50,000-line codebase** or fix a highly coupled, **multi-file regression**, the lazy engineering response was: *“Wait for the next model version.”*',
            'لو الموديل مش قادر يتعامل مع **codebase فيه 50,000 سطر** أو يصلّح **regression في كذا فايل** متشابكين، الرد الكسول كان: *“استنى الإصدار الجاي من الموديل.”*',
          ),
        },
      ],
    },
    {
      kind: 'memorize',
      label: 'The Black Box Fallacy',
      text: 'Treating an LLM as a magical oracle that can “one-shot” production-grade solutions without architectural boundaries is not engineering — it is wishful thinking.',
      note: t(
        '“One-shot” = getting a full, correct production solution from a single prompt, with no structure around it. An *oracle* is something you trust blindly. Engineers don’t trust blindly — they build boundaries and checks.',
        '“One-shot” = إنك تاخد حل production كامل وصح من prompt واحد من غير أي هيكل حواليه. والـ *oracle* هو حاجة بتصدقها وانت مغمّض. المهندس مبيصدقش وهو مغمّض — بيبني حدود وفحوصات.',
      ),
    },

    part(t('Act 2 — Hitting the wall at Anthropic', 'الفصل 2 — الخبطة في Anthropic')),
    {
      kind: 'case',
      label: 'Case study · Anthropic (Claude)',
      title: 'The limits of unconstrained AI',
      beats: [
        {
          label: 'The test',
          icon: 'flask',
          tone: 'blue',
          text: t(
            'Inside Anthropic, early versions of Claude were tested on **SWE-bench Verified** — **500 complex engineering tasks** from real repositories. They hit a hard wall: left **unconstrained**, even high-intelligence models suffered operational failures.',
            'جوّه Anthropic، نسخ Claude الأولى اتجرّبت على **SWE-bench Verified** — **500 مهمة هندسية معقدة** من repositories حقيقية. واتخبطوا في حيطة: لما الموديل يتساب **من غير قيود**، حتى لو ذكي جدًا، بيقع في أعطال تشغيلية.',
          ),
        },
        {
          label: 'Failure 1 · Premature Victory',
          icon: 'flag',
          tone: 'rose',
          text: t(
            'Declaring tasks **complete immediately upon simple compilation**, leaving **silent logic bugs** behind. (Compiles ≠ correct.)',
            'يعلن إن المهمة **خلصت أول ما الكود يعمل compile**، ويسيب وراه **bugs منطقية صامتة**. (اشتغل compile ≠ صح.)',
          ),
        },
        {
          label: 'Failure 2 · Context Rot & Drift',
          icon: 'refresh',
          tone: 'amber',
          text: t(
            'As execution horizons expanded, **context windows filled up** — the model started **overriding the initial architectural constraints** or running in **recursive repair loops**.',
            'كل ما المهمة تطوّل، **الـ context window تتملي** — فالموديل يبدأ **يكسر القيود المعمارية اللي اتقالت له في الأول** أو يلف في **لوب إصلاح مالوش آخر**.',
          ),
        },
        {
          label: 'Failure 3 · Overwhelmed Execution',
          icon: 'alert',
          tone: 'violet',
          text: t(
            'Exposing raw environment definitions and broad toolsets **upfront** caused **excessive token consumption on parsing** instead of problem-solving.',
            'لما تدّيله تعريفات البيئة كلها وكل الأدوات **مرة واحدة من الأول**، بيصرف **tokens كتير جدًا في إنه يقرا ويفهم** بدل ما يحل المشكلة.',
          ),
        },
      ],
      lesson: t(
        'Raw intelligence was not the bottleneck. The missing piece was **structure**: memory, checks, and controlled access to tools.',
        'الذكاء نفسه ماكانش المشكلة. الناقص كان **الهيكل**: ذاكرة، وفحص، وتحكم في الوصول للأدوات.',
      ),
    },
    {
      kind: 'quote',
      text: '“Claude was like a brilliant, world-class engineer suffering from severe short-term memory, trapped in a room with no pen, paper, or system processes.”',
      by: 'The Short-Term Memory Analogy',
      note: t(
        'Read each part as a failure: *short-term memory* → context rot; *no pen or paper* → nowhere to save progress; *no system processes* → nobody checks the work, so it declares victory too early.',
        'اقرا كل جزء كأنه عطل: *ذاكرة قصيرة* → context rot؛ *مفيش قلم وورقة* → مفيش مكان يحفظ فيه شغله؛ *مفيش system processes* → محدش بيراجع الشغل، فيعلن النصر بدري.',
      ),
    },

    part(t('Act 3 — Software engineering strikes back', 'الفصل 3 — هندسة السوفتوير بترد')),
    {
      kind: 'versus',
      title: t('The question that changed everything', 'السؤال اللي غيّر كل حاجة'),
      left: { title: 'Old question', icon: 'brain', tone: 'rose', tagline: t('“How do we make the model smarter?”', '“إزاي نخلّي الموديل أذكى؟”') },
      right: { title: 'New question', icon: 'workflow', tone: 'teal', tagline: t('“How do we build a deterministic system to keep the model on track?”', '“إزاي نبني سيستم deterministic يخلّي الموديل ماشي على الطريق؟”') },
      rows: [
        { aspect: 'Bet on', left: t('Bigger weights', 'موديل أكبر'), right: t('Engineering around the model', 'هندسة حوالين الموديل') },
        { aspect: 'Result', left: t('The wall stays', 'الحيطة فضلت موجودة'), right: t('The breakthrough', 'الاكتشاف اللي حل المشكلة') },
      ],
    },
    {
      kind: 'diagram',
      id: 'harness',
      title: t('The harness at a glance', 'الـ harness في صورة واحدة'),
      caption: t(
        'The initializer plans once; workers start fresh and remember through files on disk; nothing is “done” until the gate says so.',
        'الـ initializer بيخطط مرة واحدة؛ الـ workers بيبدأوا على نضافة ويفتكروا عن طريق فايلات على الديسك؛ ومفيش حاجة “خلصت” غير لما البوابة تقول كده.',
      ),
    },
    {
      kind: 'cards',
      title: t('The three engineering moves', 'التلات حركات الهندسية'),
      columns: 3,
      items: [
        {
          icon: 'split',
          title: 'Initializer/Worker Pattern',
          tone: 'violet',
          body: t(
            '**Decouple initialization from execution.** An *Initializer Agent* maps the repository and writes `feature_list.json`. *Worker Agents* run in **fresh, clean context windows**, synchronizing state via **git commits** and progress files (`NOTES.md`).',
            '**افصل التجهيز عن التنفيذ.** *Initializer Agent* بيرسم خريطة الـ repo ويكتب `feature_list.json`. والـ *Worker Agents* بيشتغلوا في **context windows نضيفة وجديدة**، وبيتزامنوا عن طريق **git commits** وفايلات التقدم (`NOTES.md`).',
          ),
        },
        {
          icon: 'layers',
          title: 'Context Compaction & Progressive Tooling',
          tone: 'lime',
          body: t(
            'Dynamically **prune dead context** and **load tool schemas on demand**, rather than saturating the token window.',
            '**شيل الكلام القديم اللي مالوش لازمة** من الـ context أول بأول، و**حمّل تعريفات الأدوات وقت الحاجة بس**، بدل ما تملا الـ token window.',
          ),
        },
        {
          icon: 'shield',
          title: 'Hard Verification Gates',
          tone: 'amber',
          body: t(
            '**Automated test suites and strict exit codes** gate completion, mathematically preventing premature declarations of victory.',
            '**test suites أوتوماتيك وexit codes صارمة** هي اللي تقرر إن المهمة خلصت، فيبقى مستحيل يعلن النصر بدري.',
          ),
        },
      ],
    },
    {
      kind: 'table',
      caption: t('Each failure has its fix', 'كل عطل ليه علاجه'),
      headers: ['Failure', 'What was missing', 'Harness fix'],
      rows: [
        [t('Premature Victory'), t('Nobody checks the work', 'محدش بيراجع الشغل'), t('Hard verification gates', 'Hard verification gates')],
        [t('Context Rot & Drift'), t('Memory overflows and constraints are forgotten', 'الذاكرة بتتملي والقيود بتتنسي'), t('Fresh worker contexts + git/NOTES.md + context compaction', 'workers بـ context جديد + git/NOTES.md + context compaction')],
        [t('Overwhelmed Execution'), t('Everything dumped in at once', 'كل حاجة متحطة مرة واحدة'), t('Progressive tooling: load tools on demand', 'Progressive tooling: الأدوات بتتحمّل وقت الحاجة')],
      ],
    },
    {
      kind: 'memorize',
      label: 'Architectural Inversion',
      text: 'Intelligence is not in the foundation weights alone; it is in the deterministic harness that constrains, coordinates, and verifies them.',
    },
    {
      kind: 'hook',
      title: t('What the harness does to the model', 'الـ harness بيعمل إيه للموديل'),
      phrase: 'C · C · V',
      letters: [
        { letter: 'C', word: 'Constrains it' },
        { letter: 'C', word: 'Coordinates it' },
        { letter: 'V', word: 'Verifies it' },
      ],
    },

    part(t('Act 4 — The moral', 'الفصل 4 — العبرة')),
    {
      kind: 'idea',
      title: 'An LLM is just an engine; the harness is the vehicle.',
      icon: 'car',
      tone: 'blue',
      text: t(
        'Anthropic’s experience demystified production AI: the model supplies raw power, but power alone moves nothing.',
        'تجربة Anthropic شالت الغموض عن الـ AI في الـ production: الموديل بيدّي قوة خام، بس القوة لوحدها مبتحرّكش حاجة.',
      ),
      analogy: t(
        'A 1,000-horsepower engine sitting on a garage floor goes nowhere. It needs a chassis, steering, brakes and a dashboard — that is the harness.',
        'موتور 1000 حصان مرمي على أرض الجراج مش هيروح في حتة. محتاج شاسيه ودركسيون وفرامل وتابلوه — ده الـ harness.',
      ),
    },
    {
      kind: 'cards',
      columns: 3,
      items: [
        {
          icon: 'skull',
          title: 'The Fallacy of Raw Scale',
          tone: 'amber',
          body: t(
            'Without **state management**, **error-recovery loops**, and **context garbage collection**, even a trillion-parameter model collapses under real-world entropy.',
            'من غير **state management** و**error-recovery loops** و**context garbage collection**، حتى موديل بتريليون parameter هيقع قدام فوضى الواقع.',
          ),
        },
        {
          icon: 'landmark',
          title: 'Classical Rigor Reaffirmed',
          tone: 'blue',
          body: t(
            'Software architecture, **bounded contexts**, and **automated quality gates** have **not** become obsolete.',
            'الـ software architecture والـ **bounded contexts** والـ **automated quality gates** **ماانتهاش** زمنها.',
          ),
        },
        {
          icon: 'refresh',
          title: 'The Strategic Inversion',
          tone: 'violet',
          body: t(
            'Classical system design is now the essential **lever** that converts **non-deterministic token streams** into **resilient production software**.',
            'تصميم السيستمات الكلاسيكي بقى **الرافعة** الأساسية اللي بتحوّل **سيل tokens مش مضمون** لـ **سوفتوير production متين**.',
          ),
        },
      ],
    },
    {
      kind: 'memorize',
      label: 'The Definitive Takeaway',
      text: 'In the age of AI, traditional software engineering hasn’t died — it has become the ultimate force multiplier for artificial intelligence.',
    },
    {
      kind: 'myths',
      items: [
        {
          myth: t('“AI makes software engineering obsolete.”', '“الـ AI هيلغي هندسة السوفتوير.”'),
          fact: t('AI makes it **more** valuable: engineering is what turns model output into production software.', 'الـ AI بيخلّيها **أهم**: الهندسة هي اللي بتحوّل كلام الموديل لسوفتوير production.'),
        },
        {
          myth: t('“If the code compiles, the task is done.”', '“لو الكود عمل compile يبقى المهمة خلصت.”'),
          fact: t('That is exactly **Premature Victory**. Done = the verification gate (tests + exit codes) passes.', 'ده بالظبط الـ **Premature Victory**. خلصت = الـ verification gate (tests + exit codes) عدّت.'),
        },
      ],
    },
  ],
  keyTerms: [
    { term: 'The Scaling Myth', definition: t('The belief that more parameters and training tokens would cure all structural and logic failures.', 'الاعتقاد إن parameters وtokens أكتر هتعالج كل الأخطاء الهيكلية والمنطقية.') },
    { term: '“Wait for GPT-N” cop-out', definition: t('The lazy response to a model failure: wait for the next model version instead of engineering a solution.', 'الرد الكسول على فشل الموديل: استنى الإصدار الجاي بدل ما تهندس حل.') },
    { term: 'Black Box Fallacy', definition: t('Treating an LLM as a magical oracle that can one-shot production solutions without architectural boundaries.', 'إنك تعامل الـ LLM كعرّاف سحري يطلّع حل production من أول مرة من غير حدود معمارية.') },
    { term: 'SWE-bench Verified', definition: t('A benchmark of 500 complex, real-repository engineering tasks used to test Claude.', 'benchmark فيه 500 مهمة هندسية معقدة من repositories حقيقية اتجرّب عليه Claude.') },
    { term: 'Premature Victory', definition: t('Declaring a task complete as soon as it compiles, leaving silent logic bugs.', 'إعلان إن المهمة خلصت أول ما تعمل compile، مع سيب bugs منطقية صامتة.') },
    { term: 'Context Rot & Drift', definition: t('As the context window fills, the model overrides early constraints or loops on repairs.', 'لما الـ context window تتملي، الموديل يكسر القيود الأولانية أو يلف في لوب إصلاح.') },
    { term: 'Overwhelmed Execution', definition: t('Too many environment details and tools upfront waste tokens on parsing instead of solving.', 'تفاصيل وأدوات كتير من الأول بتضيّع tokens في القراية بدل الحل.') },
    { term: 'Deterministic agent harness', definition: t('Deterministic code around the model that constrains, coordinates and verifies it.', 'كود deterministic حوالين الموديل بيقيّده وينسّقه ويتحقق منه.') },
    { term: 'Initializer/Worker pattern', definition: t('An initializer maps the repo and writes feature_list.json; workers run in fresh contexts and sync via git commits and NOTES.md.', 'initializer بيرسم الـ repo ويكتب feature_list.json؛ وworkers بيشتغلوا بـ context جديد ويتزامنوا بـ git commits وNOTES.md.') },
    { term: 'Context compaction', definition: t('Dynamically pruning dead context from the window.', 'شيل الـ context اللي مالوش لازمة أول بأول.') },
    { term: 'Progressive tooling', definition: t('Loading tool schemas on demand instead of all at once.', 'تحميل تعريفات الأدوات وقت الحاجة بدل مرة واحدة.') },
    { term: 'Hard verification gate', definition: t('Automated tests and strict exit codes that must pass before a task counts as complete.', 'tests أوتوماتيك وexit codes صارمة لازم تعدّي قبل ما المهمة تتحسب خلصت.') },
    { term: 'Architectural Inversion', definition: t('Intelligence lives not in the weights alone but in the harness that constrains, coordinates and verifies them.', 'الذكاء مش في الـ weights لوحدها، لكن في الـ harness اللي بيقيّدها وينسّقها ويتحقق منها.') },
  ],
  recap: [
    t('Scaling Myth: size alone does not cure structural/logic failures. “Wait for GPT-N” is a cop-out.', 'الـ Scaling Myth: الحجم لوحده مبيعالجش الأخطاء. و“استنى GPT-N” تهرّب.'),
    t('Black Box Fallacy: one-shotting production code without boundaries is wishful thinking, not engineering.', 'الـ Black Box Fallacy: إنك تطلّع كود production من أول مرة من غير حدود ده تمني، مش هندسة.'),
    t('SWE-bench Verified (500 tasks) exposed 3 failures: Premature Victory, Context Rot & Drift, Overwhelmed Execution.', 'SWE-bench Verified (500 مهمة) كشف 3 أعطال: Premature Victory وContext Rot & Drift وOverwhelmed Execution.'),
    t('Fixes: Initializer/Worker (feature_list.json, fresh contexts, git + NOTES.md), compaction + progressive tooling, hard verification gates.', 'العلاج: Initializer/Worker (feature_list.json وcontexts جديدة وgit + NOTES.md)، وcompaction + progressive tooling، وhard verification gates.'),
    t('Architectural Inversion: intelligence is in the harness that constrains, coordinates and verifies.', 'الـ Architectural Inversion: الذكاء في الـ harness اللي بيقيّد وينسّق ويتحقق.'),
    t('LLM = engine, harness = vehicle. Traditional SWE is the ultimate force multiplier for AI.', 'الـ LLM = موتور، والـ harness = العربية. والهندسة التقليدية أقوى مُضاعِف للـ AI.'),
  ],
}
