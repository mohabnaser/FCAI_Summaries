import type { QuizQuestion } from '../../types'
import { t } from '../helpers'

/** "Check your understanding" questions for Week 2, keyed by lesson id. Ordered easy → hard. */
export const week2Quiz: Record<string, QuizQuestion[]> = {
  'w2-why-hard': [
    {
      level: 'recall',
      question: t(
        'According to Brooks, what should a team do with each kind of complexity?',
        'حسب Brooks، الفريق المفروض يعمل إيه مع كل نوع من الـ complexity؟',
      ),
      options: [
        'Eliminate the essential, and learn to live with the accidental',
        'Manage the essential, and eliminate the accidental',
        'Eliminate both with a sufficiently modern toolchain',
        'Manage both, because neither can ever be removed',
      ],
      answer: 1,
      explanation: t(
        '**Essential** complexity is inherent in the problem — you can only manage it. **Accidental** complexity is self-inflicted by our tools and choices — so it can, and should, be eliminated.',
        'الـ **Essential** complexity جزء من المشكلة نفسها — تقدر تديرها بس. والـ **Accidental** complexity احنا اللي جبناها لنفسنا بالأدوات والاختيارات — فتقدر، والمفروض، تشيلها.',
      ),
    },
    {
      level: 'understand',
      question: t(
        'A bank’s system must obey 14 different regulatory regimes. Its builds also fail randomly because of a home-grown build script. How do you classify the two?',
        'سيستم بنك لازم يلتزم بـ 14 نظام رقابي مختلف. وكمان الـ build بيفشل عشوائيًا بسبب build script معمول في البيت. تصنّف الاتنين إزاي؟',
      ),
      options: [
        'Both are essential: the bank cannot ship without either of them',
        'Both are accidental: better tooling would remove both',
        'The regulations are essential; the build script is accidental',
        'The regulations are accidental; the build script is essential',
      ],
      answer: 2,
      explanation: t(
        'The regulations are part of the problem itself (Conformity) — no tool removes them. The flaky script is a difficulty the team created, so it is accidental and can be fixed for good.',
        'القوانين جزء من المشكلة نفسها (Conformity) — مفيش أداة هتشيلها. إنما الـ script البايظ ده صعوبة الفريق هو اللي عملها، فهي accidental وتتصلّح نهائيًا.',
      ),
    },
    {
      level: 'understand',
      question: t(
        'A bridge with a missing support looks wrong to anyone walking past. A software design with a missing piece can look fine for months. Which essential property explains this?',
        'كوبري ناقصه عمود بيبان غلط لأي حد معدّي. إنما design سوفتوير ناقصه حتة ممكن يفضل شكله تمام شهور. أنهي خاصية essential بتفسّر ده؟',
      ),
      options: ['Complexity', 'Conformity', 'Changeability', 'Invisibility'],
      answer: 3,
      explanation: t(
        'Software has no physical shape you can look at, so structural flaws **hide until execution**. That is Invisibility — and it is why we need diagrams, views and tests to “see” a system at all.',
        'السوفتوير ملوش شكل مادي تبص عليه، فالعيوب الهيكلية **بتستخبى لحد التشغيل**. دي الـ Invisibility — وعشان كده بنحتاج diagrams وviews وtests عشان “نشوف” السيستم أصلًا.',
      ),
    },
    {
      level: 'apply',
      question: t(
        'A manager says: “It’s only software — changing it costs nothing, so add the new pricing model this week.” Which property is at work, and what does “No Silver Bullet” say about it?',
        'مدير بيقول: “ده سوفتوير بس — تغييره ببلاش، ضيفوا الـ pricing model الجديد الأسبوع ده.” أنهي خاصية شغالة هنا، و“No Silver Bullet” بيقول عنها إيه؟',
      ),
      options: [
        'Changeability — the pressure is inherent, and no single tool or technique makes it disappear',
        'Invisibility — a good diagram would remove the pressure',
        'Conformity — the pressure ends once legacy interfaces are replaced',
        'Complexity — a faster language would make the change free',
      ],
      answer: 0,
      explanation: t(
        'Software is *perceived* as infinitely malleable, so it is under constant pressure to change — that is Changeability, an essential property. Brooks’s point: no silver bullet removes essential difficulty; you manage it with good structure.',
        'السوفتوير الناس *شايفاه* إنه بيتشكّل بسهولة، فهو دايمًا تحت ضغط التغيير — ودي الـ Changeability، خاصية essential. وكلام Brooks: مفيش رصاصة فضية بتشيل الصعوبة الـ essential؛ بتديرها بـ structure كويس.',
      ),
    },
  ],

  'w2-arch-design': [
    {
      level: 'recall',
      question: t(
        'How does the course describe the relation between architecture and design?',
        'المادة بتوصف العلاقة بين الـ architecture والـ design إزاي؟',
      ),
      options: [
        'Architecture is finished first; design starts only after it is frozen',
        'Architecture is about hardware, design is about software',
        'Design is for developers and has no effect on architecture',
        'There is no conceptual difference: they form one continuous fabric',
      ],
      answer: 3,
      explanation: t(
        'There is no line where architecture stops and design begins. High-level structure and low-level detail are one **continuous fabric** — the details are what hold the structure up.',
        'مفيش خط الـ architecture بتقف عنده والـ design يبدأ. الهيكل العالي والتفاصيل الواطية **نسيج واحد متصل** — والتفاصيل هي اللي شايلة الهيكل.',
      ),
    },
    {
      level: 'understand',
      question: t(
        '“Architecture is design, but not all design is architecture.” Which decision is design but **not** architecture?',
        '“Architecture is design, but not all design is architecture.” أنهي قرار يعتبر design بس **مش** architecture؟',
      ),
      options: [
        'Splitting the system into independently deployed services',
        'Naming a private helper method inside one class',
        'Forbidding the UI from querying the database directly',
        'Choosing an event-driven style for communication between components',
      ],
      answer: 1,
      explanation: t(
        'A private method name is cheap to change and affects one class — pure design. The other three shape the structure of the whole system and are expensive to reverse, so they are architectural.',
        'اسم private method تغييره رخيص وبيأثر على class واحد — design بحت. إنما التلاتة التانيين بيشكّلوا هيكل السيستم كله والرجوع فيهم غالي، فهم معماريين.',
      ),
    },
    {
      level: 'understand',
      question: t(
        'Why does Axiom I reject the “whiteboard architect” who draws boxes and never looks at code?',
        'ليه الـ Axiom I بيرفض الـ “whiteboard architect” اللي بيرسم boxes ومبيبصش على الكود؟',
      ),
      options: [
        'Because diagrams are an outdated way of documenting systems',
        'Because architects are paid to write more code than developers',
        'Because low-level details support the high-level structure — one stray `import` can break a boundary',
        'Because developers refuse to follow decisions they did not make',
      ],
      answer: 2,
      explanation: t(
        'The structure only exists if the details respect it. A boundary on the whiteboard is destroyed by a single wrong `import` in the code — so you cannot own the structure while ignoring the details.',
        'الهيكل موجود بس لو التفاصيل محترماه. الـ boundary اللي على السبورة بيتهد بـ `import` واحد غلط في الكود — فمينفعش تبقى مسؤول عن الهيكل وانت مطنّش التفاصيل.',
      ),
    },
    {
      level: 'apply',
      question: t(
        'The diagram says “UI → Business Logic → Data”. In a code review you find `import data.OrderTable` inside a UI class. What is the right reading?',
        'الـ diagram بيقول “UI → Business Logic → Data”. وفي code review لقيت `import data.OrderTable` جوه UI class. القراءة الصح إيه؟',
      ),
      options: [
        'A real architectural boundary was broken: the architecture is what the code does, not what the diagram shows',
        'A minor style issue: the architecture is still intact on the diagram',
        'Acceptable, provided the class only reads from the table',
        'Not an architecture topic: imports are a developer-level detail',
      ],
      answer: 0,
      explanation: t(
        'This one line makes the UI depend on the data layer, so the layering no longer holds — whatever the diagram says. This is exactly why architect and developer work on the same fabric.',
        'السطر ده لوحده خلّى الـ UI معتمدة على الـ data layer، فالـ layering مبقاش حقيقي — مهما الـ diagram قال. وده بالظبط ليه الـ architect والـ developer شغالين على نفس النسيج.',
      ),
    },
  ],

  'w2-economics': [
    {
      level: 'recall',
      question: t('What is the goal of software architecture?', 'إيه هدف الـ software architecture؟'),
      options: [
        'To use the most modern technology stack available',
        'To minimize the human resources needed to build and maintain the system',
        'To document every class before coding starts',
        'To make the system run as fast as the hardware allows',
      ],
      answer: 1,
      explanation: t(
        'The measure of a design is **effort**: how many people and hours it takes to build the system and keep changing it. If that effort stays low over the system’s life, the design is good.',
        'مقياس الـ design هو **المجهود**: محتاج كام واحد وكام ساعة عشان تبني السيستم وتفضل تعدّل فيه. لو المجهود ده فضل قليل طول عمر السيستم، يبقى الـ design كويس.',
      ),
    },
    {
      level: 'understand',
      question: t(
        'Team A’s 100th feature costs about the same as its 1st. Team B’s 100th feature costs many times more than its 1st. What does this tell you?',
        'الـ feature رقم 100 عند فريق A بتكلّف تقريبًا زي الأولى. وعند فريق B بتكلّف أضعاف الأولى. ده بيقولك إيه؟',
      ),
      options: [
        'Team B is building a harder product than team A',
        'Team A’s developers are simply more experienced',
        'Team B’s structure has decayed; a good design keeps the cost of change flat',
        'Team A will slow down in the same way; it has just not happened yet',
      ],
      answer: 2,
      explanation: t(
        'A flat cost per feature is the signature of good design. A cost that keeps climbing means every change fights the existing mess — the structure, not the product or the people, is the cause.',
        'ثبات تكلفة الـ feature هو علامة الـ design الكويس. والتكلفة اللي بتفضل تطلع معناها إن كل تعديل بيحارب الكركبة الموجودة — السبب هو الـ structure، مش المنتج ولا الناس.',
      ),
    },
    {
      level: 'understand',
      question: t(
        'Why does the course rank **structure** above **behavior**?',
        'ليه المادة بتحط الـ **structure** فوق الـ **behavior**؟',
      ),
      options: [
        'A program that works but cannot change becomes useless when requirements move; one that can change can be made to work',
        'Users never notice incorrect behavior, but they do notice messy code',
        'Behavior is the testers’ job, structure is the developers’ job',
        'Structure can be finished once, while behavior is never finished',
      ],
      answer: 0,
      explanation: t(
        'Case A (perfect but rigid) dies at the first requirement change. Case B (buggy but soft) can be fixed and kept alive. So the ability to change is worth more than being correct today.',
        'الـ Case A (شغال تمام بس متخشّب) بيموت مع أول تغيير في الـ requirements. والـ Case B (فيه bugs بس طري) يتصلّح ويفضل عايش. فالقدرة على التغيير أغلى من إنه يكون صح النهارده.',
      ),
    },
    {
      level: 'apply',
      question: t(
        'Every sprint, a team does the “urgent” banner tweaks first and postpones untangling a module that slows down every feature. In Eisenhower-matrix terms, what is going wrong?',
        'كل sprint الفريق بيعمل تعديلات البانر “المستعجلة” الأول ويأجّل فكّ module معطّل كل الـ features. بلغة الـ Eisenhower matrix، إيه الغلط؟',
      ),
      options: [
        'They treat quadrant 1 work as if it were quadrant 4',
        'They spend too long on quadrant 2 planning',
        'Nothing: urgent work must always be done before anything else',
        'Urgent-but-unimportant work (quadrant 3) is outranking important-but-not-urgent architecture (quadrant 2)',
      ],
      answer: 3,
      explanation: t(
        'Architecture is important but rarely urgent (Q2); the banner tweaks are urgent but not important (Q3). The classic failure is letting Q3 climb above Q2 — urgency is not importance.',
        'الـ architecture مهمة بس قليل لما تبقى مستعجلة (Q2)؛ وتعديلات البانر مستعجلة بس مش مهمة (Q3). الغلطة الكلاسيكية إن Q3 تطلع فوق Q2 — المستعجل مش معناه مهم.',
      ),
    },
    {
      level: 'apply',
      question: t(
        'A startup has 3 months of money left. The clean solution takes 4 months; a hack takes 2. Which answer would the lecture defend?',
        'Startup فاضل معاها فلوس 3 شهور. الحل النضيف ياخد 4 شهور؛ والـ hack ياخد شهرين. أنهي إجابة المحاضرة تدافع عنها؟',
      ),
      options: [
        'Build the clean solution: making messes is always slower',
        'Ship the hack and clean everything up after launch',
        'Ship the hack, but limit the mess on purpose — protect the few hard-to-change decisions and record the debt',
        'Refuse both and ask the CEO for a different deadline',
      ],
      answer: 2,
      explanation: t(
        'Survival is a hard constraint, so the 4-month option kills the company. But “we’ll clean it up later” never happens — so choose the **least-worst** option and contain it: hack the features, keep the data model and key boundaries sound, and write the debt down.',
        'البقاء قيد صارم، فاختيار الـ 4 شهور بيموّت الشركة. بس “هننضّف بعدين” عمرها ما بتحصل — فاختار **أقل الضررين** وحاصره: اعمل hack في الـ features، وحافظ على الـ data model والـ boundaries الأساسية، واكتب الـ debt.',
      ),
    },
  ],

  'w2-model-laws': [
    {
      level: 'recall',
      question: t('What does the **First Law** of software architecture say?', 'الـ **First Law** في الـ software architecture بيقول إيه؟'),
      options: [
        'Why is more important than how',
        'Everything in software architecture is a trade-off',
        'Process frameworks cannot preserve a decoupled architecture',
        'Low-level details support high-level structures',
      ],
      answer: 1,
      explanation: t(
        'First Law: **everything is a trade-off** — if you think you found something with no downside, you have not found the downside yet. “Why is more important than how” is the Second Law.',
        'الـ First Law: **كل حاجة trade-off** — لو فاكر إنك لقيت حاجة ملهاش عيب، يبقى انت لسه ملقيتش العيب. و“Why is more important than how” ده الـ Second Law.',
      ),
    },
    {
      level: 'understand',
      question: t(
        'Classify these two statements: (1) “The UI may never query the database directly.” (2) “Prefer asynchronous messaging between services.”',
        'صنّف الجملتين دول: (1) “The UI may never query the database directly.” (2) “Prefer asynchronous messaging between services.”',
      ),
      options: [
        'Both are architecture decisions',
        'Both are design principles',
        '(1) is a design principle; (2) is an architecture decision',
        '(1) is an architecture decision; (2) is a design principle',
      ],
      answer: 3,
      explanation: t(
        'A **decision** is a hard constraint (“never”, “must”) — breaking it is a violation. A **design principle** is a guideline (“prefer”) that leaves room for judgement case by case.',
        'الـ **decision** قيد صارم (“never”، “must”) — كسره يبقى مخالفة. والـ **design principle** إرشاد (“prefer”) بيسيب مساحة للتقدير حسب الحالة.',
      ),
    },
    {
      level: 'understand',
      question: t(
        'A team adopts microservices “because a famous company uses them”. Under the First Law, what have they failed to look at?',
        'فريق اختار microservices “عشان شركة مشهورة بتستخدمها”. حسب الـ First Law، إيه اللي مابصّوش عليه؟',
      ),
      options: [
        'Whether their programming language supports microservices',
        'Whether the famous company open-sourced its code',
        'The price they pay: network latency, distributed transaction failures and deployment complexity',
        'How many services they are allowed to create',
      ],
      answer: 2,
      explanation: t(
        'Microservices buy independent scalability and deployment — and you pay with latency, distributed failures and operational complexity. Copying the gain without weighing the price in **your** context ignores the First Law.',
        'الـ microservices بتشتريلك scalability وdeployment مستقلين — وبتدفع latency وأعطال distributed وتعقيد في التشغيل. إنك تنقل المكسب من غير ما توزن التمن في **ظروفك** ده تجاهل للـ First Law.',
      ),
    },
    {
      level: 'understand',
      question: t(
        'In 2002, running 50 services meant paying for millions in server licences; today containers make it almost free. What does this story teach?',
        'في 2002 تشغيل 50 service كان معناه ملايين في تراخيص السيرفرات؛ النهارده الـ containers خلّته شبه ببلاش. القصة دي بتعلّم إيه؟',
      ),
      options: [
        'Architecture styles are products of their context: what was wrong then can be right now',
        'Older architectures were designed by less skilled engineers',
        'A good architecture style is right in every era',
        'Cost should never influence an architecture decision',
      ],
      answer: 0,
      explanation: t(
        'The 2002 architects were not foolish — their constraints were different. Judge an architecture against the context it was chosen in, and re-evaluate when the context changes.',
        'معماريين 2002 ماكانوش أغبيا — القيود بتاعتهم كانت مختلفة. احكم على الـ architecture بالظروف اللي اتاخدت فيها، وراجعها لما الظروف تتغيّر.',
      ),
    },
    {
      level: 'apply',
      question: t(
        'You find an odd rule in the codebase — “reports may only read from the replica database” — and nobody remembers why. It blocks your feature. What does the Second Law tell you to do?',
        'لقيت قاعدة غريبة في الـ codebase — “الـ reports تقرا من الـ replica database بس” — ومحدش فاكر ليه. وهي معطّلة الـ feature بتاعتك. الـ Second Law بيقولك تعمل إيه؟',
      ),
      options: [
        'Remove it: a rule nobody can justify is dead weight',
        'Keep it forever: old rules exist for good reasons',
        'Work around it quietly so that nobody has to decide',
        'Find out why it exists before touching it — and record decisions with their reasons in ADRs',
      ],
      answer: 3,
      explanation: t(
        '**Why is more important than how.** Like the fence across the road: do not remove it until you know why it was built. An ADR keeps the context, the reasons and the rejected alternatives, so the next person is not left guessing.',
        '**Why أهم من how.** زي السور اللي في نص الطريق: متشيلوش غير لما تعرف اتبنى ليه. والـ ADR بيحفظ السياق والأسباب والبدائل اللي اترفضت، عشان اللي بعدك ميفضلش يخمّن.',
      ),
    },
  ],

  'w2-architect': [
    {
      level: 'recall',
      question: t('What is a **fitness function**?', 'إيه هي الـ **fitness function**؟'),
      options: [
        'A meeting where the team reviews the architecture diagram',
        'An automated check that the code still respects an architectural rule',
        'A formula that estimates the cost of a new feature',
        'A performance benchmark run once before each release',
      ],
      answer: 1,
      explanation: t(
        'A fitness function turns an architectural rule into an **automated test** (for example “no UI class imports the data layer”). It is how an architect ensures compliance — a whiteboard drawing no one follows is modern art.',
        'الـ fitness function بتحوّل القاعدة المعمارية لـ **test أوتوماتيك** (مثلًا “مفيش UI class بيعمل import للـ data layer”). وبيها الـ architect بيضمن الالتزام — رسمة على السبورة محدش ماشي عليها تبقى فن حديث.',
      ),
    },
    {
      level: 'understand',
      question: t(
        'In the knowledge pyramid, what should change when a developer moves into an architect role?',
        'في الـ knowledge pyramid، إيه اللي المفروض يتغيّر لما developer يبقى architect؟',
      ),
      options: [
        'Deepen expertise in one technology until nothing about it is unknown',
        'Stop learning technology and focus only on people skills',
        'Give up some depth to widen breadth — know that many alternatives exist and what each costs',
        'Keep depth and breadth exactly as they were',
      ],
      answer: 2,
      explanation: t(
        'Developers build **depth** (stuff you know). Architects choose between options, so they need **breadth** (stuff you know you don’t know) — turning unknown unknowns, the danger zone, into known unknowns.',
        'الـ developers بيبنوا **depth** (حاجات عارفها). والـ architects بيختاروا بين بدائل، فمحتاجين **breadth** (حاجات عارف إنك مش عارفها) — يعني يحوّلوا الـ unknown unknowns، منطقة الخطر، لـ known unknowns.',
      ),
    },
    {
      level: 'understand',
      question: t(
        'A team runs Scrum by the book — stand-ups, sprints, retrospectives — yet its modules become more tangled every month. What does the Architectural Axiom say?',
        'فريق ماشي Scrum بالحرف — stand-ups وsprints وretrospectives — ومع ذلك الـ modules بتتعقّد كل شهر. الـ Architectural Axiom بيقول إيه؟',
      ),
      options: [
        'Process frameworks cannot preserve a decoupled architecture; only disciplined engineering practices can',
        'Scrum is the wrong process; Kanban would keep the modules clean',
        'The sprints are too short for architecture work',
        'Coupling is unavoidable in any iterative process',
      ],
      answer: 0,
      explanation: t(
        'Scrum and Kanban organise **work**, not code. What keeps a structure clean are engineering practices: continuous integration, TDD, linters and fitness functions.',
        'الـ Scrum والـ Kanban بينظّموا **الشغل**، مش الكود. اللي بيحافظ على الهيكل نضيف هو الـ engineering practices: continuous integration وTDD وlinters وfitness functions.',
      ),
    },
    {
      level: 'apply',
      question: t(
        'An architect writes the core framework that every feature depends on, and spends most of the week in meetings. Developers keep waiting for that code. What is this called?',
        'Architect بيكتب الـ core framework اللي كل الـ features معتمدة عليه، وأغلب أسبوعه في meetings. والـ developers مستنيين الكود ده. ده اسمه إيه؟',
      ),
      options: [
        'The Ivory Tower architect',
        'The blueprint hand-off anti-pattern',
        'The Circle of Life',
        'The Bottleneck Trap',
      ],
      answer: 3,
      explanation: t(
        'Owning code on the **critical path** while being pulled into meetings makes the architect the bottleneck. The Ivory Tower is the opposite failure: an architect who has stopped coding entirely.',
        'إنك تمسك كود على الـ **critical path** وانت مسحوب في meetings بيخلّيك انت الـ bottleneck. والـ Ivory Tower هو الغلطة العكسية: architect بطّل يكتب كود خالص.',
      ),
    },
    {
      level: 'apply',
      question: t(
        'Which task lets an architect stay hands-on **without** falling into that trap?',
        'أنهي مهمة تخلّي الـ architect يفضل hands-on **من غير** ما يقع في الفخ ده؟',
      ),
      options: [
        'Writing the shared authentication framework that every team is waiting for',
        'Building a custom linter that flags forbidden imports between layers',
        'Personally fixing every production bug on the checkout path',
        'Reviewing diagrams only, and leaving all code to developers',
      ],
      answer: 1,
      explanation: t(
        'All four recommended strategies stay **off the critical path**: non-critical features, high-quality proofs of concept, technical-debt stories, and tooling & automation. A linter is real code that helps everyone — and nobody is blocked if it is late.',
        'الأربع استراتيجيات المقترحة كلها **برّه الـ critical path**: features مش حرجة، وPOCs بجودة عالية، وtechnical-debt stories، وtooling & automation. الـ linter كود حقيقي بيفيد الكل — ومحدش هيتعطّل لو اتأخر.',
      ),
    },
  ],

  'w2-ml': [
    {
      level: 'recall',
      question: t(
        'What is the “paradigm inversion” between traditional software and machine learning?',
        'إيه هو الـ “paradigm inversion” بين السوفتوير التقليدي والـ machine learning؟',
      ),
      options: [
        'Traditional software runs on CPUs; ML runs on GPUs',
        'Traditional software is tested; ML is not',
        'Traditional: input + rules → output. ML: data (inputs with outputs) → the rules, as a model',
        'Traditional software needs data; ML needs only code',
      ],
      answer: 2,
      explanation: t(
        'In traditional software a human writes the rules. In ML you supply examples (X, Y) and training **produces** the rules as a model — the direction is inverted.',
        'في السوفتوير التقليدي الإنسان هو اللي بيكتب الـ rules. في الـ ML انت بتدّي أمثلة (X, Y) والـ training هو اللي **بيطلّع** الـ rules في شكل model — الاتجاه اتعكس.',
      ),
    },
    {
      level: 'understand',
      question: t('Why does the lecture say that in an ML system “data is code”?', 'ليه المحاضرة بتقول إن في الـ ML system “data is code”؟'),
      options: [
        'A change in the data changes the system’s behavior, with no code edit at all',
        'Training data is stored in the same repository as the source code',
        'Data scientists write more code than software engineers',
        'Data must be compiled before a model can read it',
      ],
      answer: 0,
      explanation: t(
        'The model’s logic comes from the data, so when the data drifts the logic changes **silently** — no commit, no failing build. That is why data needs the same care as code: versioning, review and monitoring.',
        'منطق الـ model جاي من الـ data، فلما الـ data تعمل drift المنطق بيتغيّر **في صمت** — لا commit ولا build بيفشل. عشان كده الـ data محتاجة نفس عناية الكود: versioning ومراجعة ومراقبة.',
      ),
    },
    {
      level: 'understand',
      question: t('Which of these problems should **not** be solved with ML?', 'أنهي مشكلة من دول **مينفعش** تتحل بـ ML؟'),
      options: [
        'Filtering spam whose patterns shift every week',
        'Recommending items from a catalogue of millions of products',
        'Recognising spoken commands from many different speakers',
        'Computing income tax from a fixed table of legal brackets',
      ],
      answer: 3,
      explanation: t(
        'The tax rule is simple, fixed, must be exactly right and must be explainable — **simple rules suffice**, so default to rule-based. The other three have dynamic rules, massive scale or a non-linear mapping, which is where ML earns its cost.',
        'قاعدة الضريبة بسيطة وثابتة ولازم تطلع صح بالظبط وتتفسّر — **الـ rules البسيطة كفاية**، فابدأ بـ rule-based. إنما التلاتة التانيين فيهم rules متغيّرة أو scale ضخم أو mapping مش linear، وهنا الـ ML بيستاهل تكلفته.',
      ),
    },
    {
      level: 'apply',
      question: t(
        'A high-frequency trading bot can serve its model as **A**: one request at a time (10 ms, 100 QPS) or **B**: batches of 50 (45 ms, 1,000 QPS). Expected load is about 80 requests per second. Which choice can you defend?',
        'HFT bot يقدر يشغّل الموديل بطريقة **A**: request واحد في المرة (10 ms، 100 QPS) أو **B**: batches من 50 (45 ms، 1,000 QPS). والحمل المتوقع حوالي 80 request في الثانية. أنهي اختيار تقدر تدافع عنه؟',
      ),
      options: [
        'B — ten times the throughput is always worth more than latency',
        'A — in trading latency dominates, and the load fits inside A’s capacity',
        'B — batching is the industry standard for model serving',
        'Either — the two options are equivalent at 80 requests per second',
      ],
      answer: 1,
      explanation: t(
        'B buys 10× throughput for 4.5× latency. In HFT every millisecond is money and 80 QPS is below A’s 100 QPS limit, so A wins. The defence must use the numbers: above 100 QPS, A would queue and its real latency would explode.',
        'الـ B بيشتري 10× throughput مقابل 4.5× latency. في الـ HFT كل millisecond بفلوس و80 QPS أقل من حد A اللي هو 100 QPS، فـ A يكسب. والدفاع لازم يبقى بالأرقام: فوق 100 QPS، الـ A هيعمل queue والـ latency الفعلي هينفجر.',
      ),
    },
    {
      level: 'apply',
      question: t(
        'A data scientist proposes an ensemble of 15 deep-learning models: +0.5% conversion accuracy, triple the server budget and 15 data pipelines to maintain. How should an architect respond?',
        'Data scientist اقترح ensemble من 15 deep-learning model: دقة الـ conversion تزيد 0.5%، وميزانية السيرفرات تبقى 3 أضعاف، و15 data pipeline محتاجين صيانة. الـ architect يرد إزاي؟',
      ),
      options: [
        'Approve: higher accuracy is the goal of every ML system',
        'Reject: ensembles are never used in production',
        'Turn the 0.5% into money and weigh it against the cost and the loss of maintainability — usually the answer is no',
        'Approve, but postpone building the pipelines until after launch',
      ],
      answer: 2,
      explanation: t(
        'A competition win is not a production win — Netflix never deployed the full prize-winning ensemble. Fifteen pipelines damage Maintainability and Adaptability, so the gain must be worth a lot of money to justify it. “Never” is too strong; “show me the numbers” is the architect’s answer.',
        'الفوز في مسابقة مش فوز في الـ production — Netflix عمرها ما شغّلت الـ ensemble الكامل اللي كسب الجايزة. و15 pipeline بيضرّوا الـ Maintainability والـ Adaptability، فالمكسب لازم يساوي فلوس كتير عشان يستاهل. “أبدًا” كلمة قوية؛ “ورّيني الأرقام” هو رد الـ architect.',
      ),
    },
  ],
}
