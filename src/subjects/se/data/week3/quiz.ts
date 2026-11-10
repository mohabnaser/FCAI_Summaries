import type { QuizQuestion } from '../../types'
import { t } from '../helpers'

/** "Check your understanding" questions for Week 3, keyed by lesson id. Ordered easy → hard. */
export const week3Quiz: Record<string, QuizQuestion[]> = {
  'w3-principles': [
    {
      level: 'recall',
      question: t('What is a **design principle**?', 'إيه هو الـ **design principle**؟'),
      options: [
        'A basic tool or technique applied to code to make it more maintainable, flexible or extensible',
        'A law the compiler enforces on every class',
        'A ready-made library that solves a common problem',
        'A diagram that must be drawn before coding starts',
      ],
      answer: 0,
      explanation: t(
        'A principle is a **technique you choose to apply** to keep code maintainable, flexible and extensible. The compiler does not enforce it, and it is advice about structure — not a library or a diagram.',
        'الـ principle هو **أسلوب انت بتختار تطبّقه** عشان الكود يفضل maintainable وflexible وextensible. الـ compiler مبيفرضوش، وهو نصيحة عن الـ structure — مش library ولا diagram.',
      ),
    },
    {
      level: 'understand',
      question: t(
        'Why is poor design especially expensive in automotive software?',
        'ليه الـ design الوحش مكلّف بالذات في سوفتوير العربيات؟',
      ),
      options: [
        'Because car ECUs are too slow to run well-structured code',
        'Because automotive code is written in older languages',
        'Because every change must be analysed, re-verified and traced, over a 10–15+ year life with many variants',
        'Because car software is never updated after the car is sold',
      ],
      answer: 2,
      explanation: t(
        'Safety and security standards (ISO 26262, ISO/SAE 21434) make each change costly to verify, and the code lives for 10–15+ years across many variants with OTA updates. A change that ripples widely multiplies all of that cost.',
        'معايير الـ safety والـ security (ISO 26262 وISO/SAE 21434) بتخلّي التحقق من كل تعديل مكلّف، والكود عايش 10–15+ سنة على variants كتير مع OTA updates. والتعديل اللي تأثيره واسع بيضرب التكلفة دي كلها.',
      ),
    },
    {
      level: 'understand',
      question: t(
        'The route planner asks an `IPositionProvider` for the car’s position instead of calling the GNSS driver directly. Which basic OO idea is this?',
        'الـ route planner بيطلب مكان العربية من `IPositionProvider` بدل ما ينادي الـ GNSS driver مباشرة. دي أنهي فكرة OO أساسية؟',
      ),
      options: [
        'Classes are about behavior, not data',
        'Code to an interface, not to an implementation',
        'Each class has only one reason to change',
        'Prefer inheritance wherever two classes look alike',
      ],
      answer: 1,
      explanation: t(
        'The planner depends on *what* it needs (a position), not on *who* provides it. The GNSS driver can then be replaced — by another supplier or by a simulator — without touching the planner.',
        'الـ planner معتمد على *إيه* اللي محتاجه (position)، مش على *مين* اللي بيجيبه. فالـ GNSS driver ممكن يتبدّل — بمورّد تاني أو بـ simulator — من غير ما تلمس الـ planner.',
      ),
    },
    {
      level: 'apply',
      question: t(
        'Adding Traffic Sign Recognition forces you to edit a manager class that was already verified and signed off. Which SOLID question did the design fail?',
        'إضافة Traffic Sign Recognition أجبرتك تعدّل manager class كان اتعمله verification واتوقّع عليه. الـ design فشل في أنهي سؤال من SOLID؟',
      ),
      options: [
        'S — “Who asks me to change?”',
        'L — “Can I swap it safely?”',
        'I — “Do I use all of it?”',
        'O — “Is a new feature a new class?”',
      ],
      answer: 3,
      explanation: t(
        'A new feature should arrive as **new code**, not as an edit to verified code — that is the Open-Closed question. The other questions are about actors (S), substitutability (L) and unused methods (I).',
        'الـ feature الجديدة المفروض تيجي في شكل **كود جديد**، مش تعديل في كود متحقّق منه — وده سؤال الـ Open-Closed. الأسئلة التانية عن الـ actors (S) والاستبدال (L) والـ methods اللي مش مستخدمة (I).',
      ),
    },
  ],

  'w3-srp': [
    {
      level: 'recall',
      question: t(
        'How does the refined (Clean Architecture) version state the Single Responsibility Principle?',
        'النسخة المنقّحة (Clean Architecture) بتصيغ الـ Single Responsibility Principle إزاي؟',
      ),
      options: [
        'A class should contain only one public method',
        'A module should be responsible to one, and only one, actor',
        'A module should do one thing and never be changed',
        'A class should have as few fields as possible',
      ],
      answer: 1,
      explanation: t(
        'SRP is not “one method” or “one thing”. It is about **who** can ask for a change: a module should answer to exactly one actor.',
        'الـ SRP مش “method واحدة” ولا “حاجة واحدة”. هو عن **مين** اللي ممكن يطلب تغيير: الـ module المفروض يرد على actor واحد بالظبط.',
      ),
    },
    {
      level: 'understand',
      question: t('In SRP, what does a “reason to change” really stand for?', 'في الـ SRP، الـ “reason to change” معناها الحقيقي إيه؟'),
      options: [
        'A bug that was reported against the class',
        'A method that has grown too long',
        'An actor: a team or stakeholder who asks for changes',
        'A new version of the programming language',
      ],
      answer: 2,
      explanation: t(
        'A reason to change is a **group of people**. The super-ECU class served four of them — perception, functional safety, diagnostics and HMI — so a HUD layout request could break lane keeping.',
        'الـ reason to change هي **مجموعة ناس**. الـ super-ECU class كان بيخدم أربعة — perception وfunctional safety وdiagnostics وHMI — فطلب تغيير في شكل الـ HUD كان ممكن يبوّظ الـ lane keeping.',
      ),
    },
    {
      level: 'understand',
      question: t(
        'Apply the “itself” test to a plain `FrontCamera`. Which method does **not** belong in the class?',
        'طبّق اختبار “itself” على `FrontCamera` عادية. أنهي method **مش** مكانها في الـ class؟',
      ),
      options: ['`renderOnHud`', '`captureFrame`', '`adjustExposure`', '`runSelfTest`'],
      answer: 0,
      explanation: t(
        '“The FrontCamera captures a frame / adjusts exposure / runs a self-test **itself**” all make sense. “The FrontCamera renders on the HUD itself” does not — that job belongs to `HudRenderer`.',
        '“الـ FrontCamera بتاخد frame / بتظبط الـ exposure / بتعمل self-test **بنفسها**” كلها منطقية. إنما “الـ FrontCamera بترسم على الـ HUD بنفسها” لأ — دي شغلة `HudRenderer`.',
      ),
    },
    {
      level: 'apply',
      question: t(
        'The camera’s self-test finds a dirty lens. Following the lesson’s refactoring, how should the responsibilities be split?',
        'الـ self-test بتاع الكاميرا لقى العدسة متوسّخة. حسب الـ refactoring اللي في الدرس، المسؤوليات تتقسّم إزاي؟',
      ),
      options: [
        'The camera detects the fault, stores the DTC and cleans its own lens',
        'The camera does none of it: even the self-test moves to the diagnostics module',
        'The HUD renderer stores the DTC, because the driver has to see it',
        'The camera detects the fault; `DiagnosticEventManager` stores the DTC; `SensorCleaningSystem` cleans the lens',
      ],
      answer: 3,
      explanation: t(
        '**Detecting** a fault is the camera’s own business (`runSelfTest`). **Storing and managing** DTCs answers to the diagnostics team, and cleaning is another system’s job. Detecting ≠ managing.',
        '**اكتشاف** العطل شغل الكاميرا نفسها (`runSelfTest`). إنما **تخزين وإدارة** الـ DTCs تبع فريق الـ diagnostics، والتنضيف شغل system تاني. الاكتشاف ≠ الإدارة.',
      ),
    },
    {
      level: 'apply',
      question: t(
        'To save 3.5 ms, someone proposes merging ASIL B obstacle perception and QM telemetry logging into one `FrontCameraPipeline` class. What is the best response?',
        'عشان يوفّر 3.5 ms، حد اقترح دمج الـ obstacle perception (ASIL B) مع الـ telemetry logging (QM) في class واحد `FrontCameraPipeline`. أحسن رد إيه؟',
      ),
      options: [
        'Accept: latency is a safety property, so it outranks structure',
        'Reject: it breaks SRP and Freedom from Interference — keep the boundary and hand data over through a lock-free ring buffer',
        'Accept, on condition that the logging code is commented clearly',
        'Reject: logging must simply be removed from the vehicle',
      ],
      answer: 1,
      explanation: t(
        'Merged, a slow flash write can stall obstacle detection, and the whole class must then be developed to ASIL B. A single-producer/single-consumer ring buffer keeps QM code away from ASIL code **and** wins back most of the latency.',
        'لو اتدمجوا، كتابة بطيئة على الـ flash ممكن توقّف الـ obstacle detection، والـ class كله لازم يتطوّر على ASIL B. والـ ring buffer (single producer/single consumer) بيبعد كود الـ QM عن الـ ASIL **و**بيرجّع أغلب الـ latency.',
      ),
    },
  ],

  'w3-srp-ivi': [
    {
      level: 'recall',
      question: t(
        '`MediaLibrary.search` reads every field of `TrackMetadata` and compares it with the filter by itself. What is this smell called?',
        '`MediaLibrary.search` بتقرا كل field في `TrackMetadata` وتقارنه بالـ filter بنفسها. الـ smell ده اسمه إيه؟',
      ),
      options: ['Dead Code', 'Shotgun Surgery', 'Feature Envy', 'Primitive Obsession'],
      answer: 2,
      explanation: t(
        '**Feature Envy**: a method that is more interested in another class’s data than in its own. It is the sign that the behavior lives in the wrong class.',
        '**Feature Envy**: method مهتمة بـ data بتاعة class تاني أكتر من الـ data بتاعتها. ودي علامة إن الـ behavior ساكن في الـ class الغلط.',
      ),
    },
    {
      level: 'understand',
      question: t(
        'After the refactoring, search calls `filter.matches(track.getMetadata())`. Product now wants a “lossless audio only” criterion. Which class has to change?',
        'بعد الـ refactoring، الـ search بتنادي `filter.matches(track.getMetadata())`. والـ product عايز معيار جديد “lossless audio only”. أنهي class لازم يتغيّر؟',
      ),
      options: [
        'Only `TrackFilter`, where the matching rules now live',
        'Only `MediaLibrary`, because it runs the search',
        'Both `MediaLibrary` and `TrackFilter`',
        'Neither: the criterion is handled by the audio player',
      ],
      answer: 0,
      explanation: t(
        'The matching rules moved into `TrackFilter`, so a new criterion touches only that class. `MediaLibrary` is left with a single reason to change: how the collection is stored and indexed.',
        'قواعد المطابقة اتنقلت جوه `TrackFilter`، فالمعيار الجديد بيلمس الـ class ده بس. والـ `MediaLibrary` فضل لها سبب واحد للتغيير: إزاي الـ collection بتتخزّن وتتفهرس.',
      ),
    },
    {
      level: 'understand',
      question: t('According to the refactoring axiom, what must a refactoring **never** change?', 'حسب الـ refactoring axiom، إيه اللي الـ refactoring **عمره** ما يغيّره؟'),
      options: [
        'The number of classes in the package',
        'The names of the private methods',
        'The internal cohesion of the classes',
        'The observable external behavior',
      ],
      answer: 3,
      explanation: t(
        'Refactoring improves internal structure — cohesion, and how reasons to change are separated — while the behavior seen from outside stays identical (here: case-insensitive artist match, and an empty field still acts as a wildcard).',
        'الـ refactoring بيحسّن الهيكل الداخلي — الـ cohesion وفصل أسباب التغيير — والسلوك اللي باين من برّه بيفضل زي ما هو (هنا: مطابقة الـ artist case-insensitive، والـ field الفاضي لسه wildcard).',
      ),
    },
    {
      level: 'apply',
      question: t(
        '`TripReport.fuelEfficiency()` calls ten getters on `TripData` and does all the arithmetic itself. Following this lesson, what is the fix?',
        '`TripReport.fuelEfficiency()` بتنادي 10 getters على `TripData` وتعمل كل الحسابات بنفسها. حسب الدرس ده، الحل إيه؟',
      ),
      options: [
        'Make the fields of `TripData` public, to avoid the getter calls',
        'Move the calculation into `TripData`, the class that owns the data, and let `TripReport` delegate to it',
        'Copy the ten fields into `TripReport` so that it becomes self-contained',
        'Merge the two classes into a single `Trip` class',
      ],
      answer: 1,
      explanation: t(
        'Same smell as `MediaLibrary`: Feature Envy. **Information Expert** says the class that has the data should do the work, so the report just asks. Public fields or copies only tighten the coupling.',
        'نفس الـ smell بتاع `MediaLibrary`: Feature Envy. والـ **Information Expert** بيقول إن الـ class اللي معاه الـ data هو اللي يعمل الشغل، والـ report يطلب بس. الـ public fields أو النسخ بيزوّدوا الـ coupling.',
      ),
    },
  ],

  'w3-ocp': [
    {
      level: 'recall',
      question: t('What does the Open-Closed Principle state?', 'الـ Open-Closed Principle بينص على إيه؟'),
      options: [
        'Software entities should be open for extension, but closed for modification',
        'Source code should be open, but binaries should be closed',
        'Classes should be open to subclasses, but closed to interfaces',
        'Modules should be open during development and closed after release',
      ],
      answer: 0,
      explanation: t(
        'You add behavior by **adding new code** (extension), not by editing code that already works (modification) — like a mixer that accepts new attachments without anyone touching its engine.',
        'بتضيف behavior عن طريق **كود جديد** (extension)، مش بتعديل كود شغال (modification) — زي الـ mixer اللي بيركّب أدوات جديدة من غير ما حد يلمس الموتور.',
      ),
    },
    {
      level: 'understand',
      question: t(
        '`AdasFeatureManager.runCycle` uses a `switch` on feature names (“AEB”, “LKA”, “ACC”). Why is this a real problem in a car, and not just ugly code?',
        '`AdasFeatureManager.runCycle` بيستخدم `switch` على أسماء الـ features (“AEB”، “LKA”، “ACC”). ليه دي مشكلة حقيقية في العربية، مش مجرد كود شكله وحش؟',
      ),
      options: [
        'A `switch` statement is slower than a method call',
        'String comparison is forbidden by ISO 26262',
        'Every new feature edits the verified manager, forcing full regression testing and invalidating safety sign-offs',
        'The manager cannot hold more than three features',
      ],
      answer: 2,
      explanation: t(
        'The cost is in **verification**: each added case reopens a class that was already tested and signed off. With `AdasFunction` plug-ins, verification focuses on the new class only.',
        'التكلفة في الـ **verification**: كل case بتتضاف بتفتح class كان اتختبر واتوقّع عليه. ومع الـ plug-ins بتاعة `AdasFunction`، التحقق بيركّز على الـ class الجديد بس.',
      ),
    },
    {
      level: 'understand',
      question: t(
        'After the refactoring you add `BlindSpotDetection implements AdasFunction`. Which existing code still has to be edited?',
        'بعد الـ refactoring ضفت `BlindSpotDetection implements AdasFunction`. أنهي كود موجود لسه لازم يتعدّل؟',
      ),
      options: [
        'The `runCycle` loop of the manager',
        'Every other class that implements `AdasFunction`',
        'The `AdasFunction` interface itself',
        'Only the composition root, where the new class is registered',
      ],
      answer: 3,
      explanation: t(
        'OCP is never 100%: something must create and register the new object. The goal is **containment** — that one edit lives in the composition root (factory, DI container or configuration), not in the business logic.',
        'الـ OCP عمره ما بيبقى 100%: لازم حاجة تعمل الـ object الجديد وتسجّله. الهدف هو **الحصر** — التعديل الوحيد ده يبقى في الـ composition root (factory أو DI container أو configuration)، مش في الـ business logic.',
      ),
    },
    {
      level: 'apply',
      question: t(
        'The driver must be able to switch from Fastest to Eco routing **while driving**, and an EV-charging-aware mode is coming next year. Which design fits?',
        'السواق لازم يقدر يبدّل من Fastest لـ Eco routing **وهو سايق**، وجاي السنة الجاية وضع EV-charging-aware. أنهي design مناسب؟',
      ),
      options: [
        'Subclasses `FastestNavigationService` and `EcoNavigationService`, chosen at build time',
        '`NavigationService` delegating to a `RoutingStrategy` that can be replaced with `setStrategy`',
        'One `NavigationService` with a `switch` on the routing mode',
        'A separate copy of the navigation code for every routing mode',
      ],
      answer: 1,
      explanation: t(
        'Inheritance binds the choice at compile or configuration time. **Delegation (Strategy)** lets the object swap behavior at runtime, and `EvChargingAwareRoute` arrives as one new class — OCP without inheritance.',
        'الـ inheritance بيربط الاختيار وقت الـ compile أو الـ configuration. إنما الـ **delegation (Strategy)** بيخلّي الـ object يبدّل الـ behavior وقت التشغيل، و`EvChargingAwareRoute` بييجي كـ class جديد واحد — OCP من غير inheritance.',
      ),
    },
    {
      level: 'apply',
      question: t(
        'A bug is found in the loop of the “closed” manager. A teammate says: “OCP means we may not touch that class.” Is that right?',
        'اتلقى bug في الـ loop بتاع الـ manager “المقفول”. زميلك بيقول: “الـ OCP معناه إننا ملمسش الـ class ده.” ده صح؟',
      ),
      options: [
        'Yes: closed means the source file is frozen for good',
        'Yes: the fix must be done by subclassing the manager',
        'No: closed means new features do not require editing it — bugs are still fixed in place',
        'No: OCP stops applying once a class reaches production',
      ],
      answer: 2,
      explanation: t(
        '“Closed” is about **new requirements**: they should not force edits to existing code. It never meant that a defect must be left alone or patched around with a subclass.',
        'الـ “Closed” عن **الـ requirements الجديدة**: مينفعش تجبرك تعدّل كود موجود. عمرها ما كان معناها إن العيب يتساب أو يتلفّ عليه بـ subclass.',
      ),
    },
  ],

  'w3-lsp': [
    {
      level: 'recall',
      question: t('What does the Liskov Substitution Principle require?', 'الـ Liskov Substitution Principle بيطلب إيه؟'),
      options: [
        'Base types must know all of their subtypes',
        'Subtypes must override every method of the base type',
        'Subtypes must be substitutable for their base types',
        'Subtypes must not add any new methods',
      ],
      answer: 2,
      explanation: t(
        'Code written against the base type must keep working, unchanged and unaware, when it is handed any subtype. A subtype may add methods; what it may not do is break the promises of the base type.',
        'الكود المكتوب على الـ base type لازم يفضل شغال، من غير تعديل ومن غير ما يعرف، لما يستلم أي subtype. الـ subtype ممكن يضيف methods؛ اللي ممنوع إنه يكسر وعود الـ base type.',
      ),
    },
    {
      level: 'understand',
      question: t('Which contract rule keeps a subtype substitutable?', 'أنهي قاعدة contract بتخلّي الـ subtype قابل للاستبدال؟'),
      options: [
        'It may not strengthen preconditions, and may not weaken postconditions',
        'It may strengthen preconditions, as long as it documents them',
        'It may weaken postconditions, as long as it throws no exception',
        'It must keep the same private fields as the base type',
      ],
      answer: 0,
      explanation: t(
        '“**Ask no more, deliver no less.**” A subtype that demands more from its callers, or promises less to them, surprises code that only knows the base contract.',
        '“**متطلبش أكتر، ومتسلّمش أقل.**” الـ subtype اللي بيطلب من اللي بينادوه أكتر، أو بيوعدهم بأقل، بيفاجئ كود ميعرفش غير الـ contract الأساسي.',
      ),
    },
    {
      level: 'understand',
      question: t(
        '`OccupancyGrid3D extends OccupancyGrid` compiles, and its unit tests may even pass. Why can the compiler not catch the LSP violation?',
        '`OccupancyGrid3D extends OccupancyGrid` بيعمل compile، وممكن الـ unit tests بتاعته تعدّي كمان. ليه الـ compiler ميقدرش يمسك مخالفة الـ LSP؟',
      ),
      options: [
        'Because Java does not check inheritance at compile time',
        'Because the 3D grid uses more memory than the 2D grid',
        'Because the violation only appears on real ECU hardware',
        'Because the signatures match; the violation is in what `isFree(x, y)` means, which types do not express',
      ],
      answer: 3,
      explanation: t(
        'The compiler checks **signatures**, not **behavior**. Whatever the 3D grid answers for `isFree(x, y)` — ground layer only, or all layers — is wrong for some caller. IS-A is not IS-SUBSTITUTABLE-FOR.',
        'الـ compiler بيراجع الـ **signatures**، مش الـ **behavior**. أي إجابة الـ 3D grid يرد بيها على `isFree(x, y)` — الـ ground layer بس أو كل الـ layers — غلط عند caller معيّن. الـ IS-A مش IS-SUBSTITUTABLE-FOR.',
      ),
    },
    {
      level: 'apply',
      question: t(
        'You find `if (grid instanceof OccupancyGrid3D) { … }` inside `PathPlanner`. What does it tell you, and what fix does the lesson propose?',
        'لقيت `if (grid instanceof OccupancyGrid3D) { … }` جوه `PathPlanner`. ده بيقولك إيه، والدرس بيقترح أنهي حل؟',
      ),
      options: [
        'Normal polymorphism: keep the check and add a comment',
        'The subtype is not substitutable: introduce an explicit contract such as `DrivableSpaceMap.isDrivable(x, y, vehicleHeightM)` and let the 3D grid delegate to its layers',
        'The planner is too slow: cache the result of the type check',
        'A missing import: add the 3D grid to the planner’s package',
      ],
      answer: 1,
      explanation: t(
        'Having to ask for the concrete type is the classic sign of misused inheritance. With an honest contract that includes the vehicle height, `Grid2DDrivableSpace` and `Grid3DDrivableSpace` are both truly substitutable and the planner needs no `instanceof`.',
        'إنك تضطر تسأل عن الـ concrete type دي العلامة الكلاسيكية لـ inheritance مستخدمة غلط. ومع contract صريح فيه ارتفاع العربية، `Grid2DDrivableSpace` و`Grid3DDrivableSpace` الاتنين قابلين للاستبدال فعلًا والـ planner مش محتاج `instanceof`.',
      ),
    },
    {
      level: 'apply',
      question: t(
        'A supplier’s `BrakeActuator` silently limits how fast braking force can rise, so a demand of 100 kN “in 10 ms” actually takes 2 s. The supplier says: “It compiles and throws no exception.” What is your verdict?',
        '`BrakeActuator` بتاع مورّد بيحدّ في صمت من سرعة زيادة قوة الفرملة، فطلب 100 kN “في 10 ms” بياخد فعليًا 2 s. والمورّد بيقول: “بيعمل compile ومبيرميش exception.” حكمك إيه؟',
      ),
      options: [
        'Compliant: no exception means the contract was honoured',
        'Compliant: timing is not part of an interface',
        'An LSP violation: the postcondition was silently weakened — the limit must be exposed and the achieved force reported',
        'An ISP violation: the interface has too many methods',
      ],
      answer: 2,
      explanation: t(
        'The planner relied on “the force I ask for is applied”. Delivering 0.5 kN after 10 ms, with no signal, **delivers less** than promised. An honest redesign exposes `maxSlewRateKNps()`, states the precondition, and reports saturation or raises a fault.',
        'الـ planner كان معتمد على “القوة اللي بطلبها بتتنفّذ”. إنه يدّي 0.5 kN بعد 10 ms من غير أي إشارة ده **بيدّي أقل** من الموعود. والـ redesign الأمين بيكشف `maxSlewRateKNps()` ويحدد الـ precondition ويبلّغ عن الـ saturation أو يرفع fault.',
      ),
    },
  ],

  'w3-isp': [
    {
      level: 'recall',
      question: t('What does the Interface Segregation Principle say?', 'الـ Interface Segregation Principle بيقول إيه؟'),
      options: [
        'Every class should implement exactly one interface',
        'Clients should not be forced to depend on methods they do not use',
        'Interfaces should never contain more than three methods',
        'Interfaces should be owned by the low-level module',
      ],
      answer: 1,
      explanation: t(
        'The principle is written from the **client’s** side: do not make a client see, and depend on, methods it never calls. No magic number of methods is involved.',
        'الـ principle مكتوب من ناحية الـ **client**: متخلّيش client يشوف ويعتمد على methods عمره ما بيناديها. ومفيش رقم سحري لعدد الـ methods.',
      ),
    },
    {
      level: 'understand',
      question: t(
        'Which symptom inside the **implementing** classes most clearly reveals a fat interface?',
        'أنهي عرَض جوه الـ classes اللي **بتعمل implement** بيكشف أوضح حاجة إن الـ interface تخين؟',
      ),
      options: [
        'Methods that are longer than one screen',
        'Private helper methods with unclear names',
        'A constructor with many parameters',
        'Methods that return `null`, `0.0` or `false`, or throw `UnsupportedOperationException`',
      ],
      answer: 3,
      explanation: t(
        'A class forced to implement something it cannot do has to fake it: a dummy value or an exception. In the lecture, `AutomatedDrivingStack.areHandsOnWheel()` returning `false` raised a spurious hands-off alarm.',
        'الـ class المجبور يعمل implement لحاجة ميقدرش يعملها لازم يزيّفها: قيمة وهمية أو exception. في المحاضرة، `AutomatedDrivingStack.areHandsOnWheel()` لما رجّعت `false` طلّعت إنذار hands-off كدّاب.',
      ),
    },
    {
      level: 'understand',
      question: t(
        'Why is the fat `VehicleOperator` interface a **cybersecurity** problem, and not only a design smell?',
        'ليه الـ `VehicleOperator` interface التخين مشكلة **cybersecurity**، مش مجرد design smell؟',
      ),
      options: [
        '`OtaUpdateManager`, which only needs to install updates, holds a reference through which it could call `steer` and `brake`',
        'Fat interfaces cannot be encrypted on the vehicle network',
        'The interface exposes the source code of the driving stack',
        'A long interface makes password checks slower',
      ],
      answer: 0,
      explanation: t(
        'Every method a client can reach is attack surface. If the update component is compromised, a fat interface hands the attacker motion control. Narrow interfaces enforce **least privilege**.',
        'كل method الـ client يقدر يوصلها تبقى attack surface. لو الـ component بتاع الـ updates اتخترق، الـ interface التخين بيسلّم المهاجم التحكم في الحركة. الـ interfaces الضيّقة بتفرض الـ **least privilege**.',
      ),
    },
    {
      level: 'apply',
      question: t(
        'After the split into `MotionControl`, `AttentionMonitorable`, `SelfDiagnosable` and `OtaUpdatable`, which of them should `HumanDriverModel` implement?',
        'بعد التقسيم لـ `MotionControl` و`AttentionMonitorable` و`SelfDiagnosable` و`OtaUpdatable`، أنهي منهم `HumanDriverModel` المفروض يعمله implement؟',
      ),
      options: [
        'All four, to stay compatible with existing clients',
        '`MotionControl`, `SelfDiagnosable` and `OtaUpdatable`',
        '`MotionControl` and `AttentionMonitorable`',
        '`AttentionMonitorable` only',
      ],
      answer: 2,
      explanation: t(
        'A human steers and brakes, and can be drowsy or look away — but cannot run a self-diagnosis or receive an OTA update. Each class now implements only what it can **honestly** do, so the dummy returns disappear.',
        'الإنسان بيسوق ويفرمل، وممكن ينعس أو يبص بعيد — بس ميقدرش يعمل self-diagnosis ولا يستقبل OTA update. كل class دلوقتي بيعمل implement للي يقدر يعمله **بأمانة** بس، فالقيم الوهمية اختفت.',
      ),
    },
    {
      level: 'apply',
      question: t(
        'The DMS team changes the format of gaze-direction data. With the segregated interfaces, what happens to `VehicleMotionController`?',
        'فريق الـ DMS غيّر format بيانات الـ gaze direction. مع الـ interfaces المقسّمة، إيه اللي بيحصل لـ `VehicleMotionController`؟',
      ),
      options: [
        'It must be recompiled, but not re-certified',
        'Nothing: it depends only on `MotionControl`, so it is neither recompiled nor re-certified',
        'It must be re-certified, because any interface change affects motion',
        'It breaks at runtime until its adapter is updated',
      ],
      answer: 1,
      explanation: t(
        'This is the **verification coupling** argument. With the fat interface, a gaze-format change forced recompilation and safety re-certification of motion controllers. After the split, the change stays with the clients of `AttentionMonitorable`.',
        'ده موضوع الـ **verification coupling**. مع الـ interface التخين، تغيير الـ gaze format كان بيجبر الـ motion controllers على recompilation وsafety re-certification. بعد التقسيم، التغيير بيفضل عند الـ clients بتوع `AttentionMonitorable` بس.',
      ),
    },
  ],

  'w3-dip': [
    {
      level: 'recall',
      question: t('What does the Dependency Inversion Principle state?', 'الـ Dependency Inversion Principle بينص على إيه؟'),
      options: [
        'Low-level modules should depend on high-level modules’ concrete classes',
        'Dependencies should be created with `new` inside the constructor',
        'High-level modules should call low-level modules only through static methods',
        'High-level modules should not depend on low-level modules; both should depend on abstractions',
      ],
      answer: 3,
      explanation: t(
        'Policy (high level) and detail (low level) both point at an **abstraction** — and details depend on abstractions, never the reverse. The lamp plugs into a socket, not straight into the power plant — and both sides depend on the socket.',
        'الـ policy (high level) والـ detail (low level) الاتنين بيشاوروا على **abstraction** — والـ details هي اللي تعتمد على الـ abstractions، مش العكس. اللمبة بتتركّب في بريزة، مش متوصّلة بمحطة الكهربا مباشرة — والطرفين معتمدين على البريزة.',
      ),
    },
    {
      level: 'understand',
      question: t(
        'In the corrected design, which package owns the `ObjectSensor` interface, and why does that matter?',
        'في الـ design المتصلّح، أنهي package مالك الـ `ObjectSensor` interface، وليه ده مهم؟',
      ),
      options: [
        'The radar supplier’s package, because the supplier knows the sensor best',
        'The fusion package: the high-level module defines what it needs, and the drivers adapt to it',
        'A shared utilities package, so that nobody owns it',
        'The composition root, because it wires the objects together',
      ],
      answer: 1,
      explanation: t(
        'Ownership is what **inverts** the dependency. Fusion states its contract (vehicle frame, SI units, timestamped, never null) and each supplier adapter conforms to it — so the source dependency points from detail to policy.',
        'الملكية هي اللي **بتعكس** الـ dependency. الـ fusion بيحدد الـ contract بتاعه (vehicle frame وSI units وtimestamp وعمره ما يبقى null) وكل supplier adapter يلتزم بيه — فالـ source dependency بتشاور من الـ detail للـ policy.',
      ),
    },
    {
      level: 'understand',
      question: t('How do DIP and Dependency Injection relate to each other?', 'إيه العلاقة بين الـ DIP والـ Dependency Injection؟'),
      options: [
        'DIP is a principle about the direction of dependencies; injection is a technique for wiring objects',
        'They are two names for exactly the same thing',
        'Injection is the principle; DIP is the framework that implements it',
        'DIP applies to interfaces; injection applies only to databases',
      ],
      answer: 0,
      explanation: t(
        'You can inject a concrete supplier driver and still violate DIP. Injection is only **how** the object arrives (for example through the constructor); DIP is about **what type** the high-level code depends on.',
        'ممكن تعمل inject لـ concrete supplier driver وتفضل مخالف للـ DIP. الـ injection هو بس **إزاي** الـ object بيوصل (مثلًا عن طريق الـ constructor)؛ والـ DIP عن **أنهي type** الكود الـ high-level معتمد عليه.',
      ),
    },
    {
      level: 'apply',
      question: t(
        'A team adds `ISupplierARadar` to the driver package. It mirrors the driver’s methods, including raw CAN frames, and `SensorFusion` now uses it. Has DIP been achieved?',
        'فريق ضاف `ISupplierARadar` في الـ driver package. الـ interface نسخة من methods الـ driver، بما فيها الـ raw CAN frames، و`SensorFusion` بقى يستخدمه. كده الـ DIP اتحقق؟',
      ),
      options: [
        'Yes: any interface between two modules inverts the dependency',
        'Yes: fusion no longer uses the keyword `new`',
        'No: the abstraction is shaped and owned by the low-level side, so fusion still depends on supplier details',
        'No: interfaces are not allowed inside a driver package',
      ],
      answer: 2,
      explanation: t(
        'An interface next to the driver, shaped like one supplier’s driver, inverts nothing: a Supplier C radar or a move from CAN to Ethernet still reopens fusion. The abstraction must speak the **high-level** language (an object list) and live with the high-level module.',
        'الـ interface اللي جنب الـ driver ومتفصّل على driver مورّد واحد مبيعكسش حاجة: رادار Supplier C أو النقل من CAN لـ Ethernet هيفتح الـ fusion تاني. الـ abstraction لازم يتكلم لغة الـ **high-level** (object list) ويعيش مع الـ high-level module.',
      ),
    },
    {
      level: 'apply',
      question: t(
        'The OTA gateway only needs the battery’s state of charge, but it is bound to the full `BatteryManagementSystem` (`calibrateCells`, `overrideThermalLimits`, `flashFirmware` …). Which redesign does the lecture defend?',
        'الـ OTA gateway محتاج الـ state of charge بتاع البطارية بس، لكنه مربوط بالـ `BatteryManagementSystem` كله (`calibrateCells` و`overrideThermalLimits` و`flashFirmware` …). أنهي redesign المحاضرة بتدافع عنه؟',
      ),
      options: [
        'Keep the binding and add a comment listing the methods that must not be called',
        'Copy the state-of-charge code into the gateway',
        'Have the BMS call the gateway every time the charge changes, over the same full interface',
        'The connectivity domain owns a read-only `StateOfChargeProvider`, and a BMS adapter implements it',
      ],
      answer: 3,
      explanation: t(
        'This fixes two principles at once: **ISP** (the gateway sees one read-only method — a far smaller attack surface) and **DIP** (the high-level side owns the abstraction, and the BMS detail adapts to it).',
        'ده بيصلّح مبدأين مع بعض: الـ **ISP** (الـ gateway شايف method واحدة read-only — attack surface أصغر بكتير) والـ **DIP** (الناحية الـ high-level مالكة الـ abstraction، والـ BMS كـ detail بيتكيّف عليه).',
      ),
    },
  ],

  'w3-together': [
    {
      level: 'recall',
      question: t(
        'Callers full of `instanceof` checks, and subclasses with dummy overrides, are the typical smell of which broken principle?',
        'Callers مليانين `instanceof` checks، وsubclasses فيها overrides وهمية، دي الريحة المعتادة لكسر أنهي principle؟',
      ),
      options: ['Single Responsibility', 'Open-Closed', 'Liskov Substitution', 'Dependency Inversion'],
      answer: 2,
      explanation: t(
        'When a subtype cannot stand in for its base type, callers start asking “which one are you, really?” — that is LSP. A `switch` on type names points to OCP; hard-coded drivers point to DIP; a god class points to SRP.',
        'لما الـ subtype ميقدرش يقف مكان الـ base type، الـ callers بيبدأوا يسألوا “انت أنهي واحد بالظبط؟” — وده LSP. إنما الـ `switch` على أسماء الـ types بيشاور على OCP؛ والـ drivers المكتوبة hard-coded على DIP؛ والـ god class على SRP.',
      ),
    },
    {
      level: 'understand',
      question: t('Why does OCP **need** LSP?', 'ليه الـ OCP **محتاج** الـ LSP؟'),
      options: [
        'Plugging in new implementations only works if each one can safely stand in for the abstraction',
        'Both principles forbid the use of inheritance',
        'LSP removes the need for a composition root',
        'OCP applies to interfaces, and LSP applies only to abstract classes',
      ],
      answer: 0,
      explanation: t(
        'OCP extends a system by adding new subtypes behind an abstraction. If a new subtype breaks the contract, the “closed” code has to be reopened to special-case it — so substitutability is what makes extension safe.',
        'الـ OCP بيمدّ السيستم بإضافة subtypes جديدة ورا abstraction. لو subtype جديد كسر الـ contract، الكود “المقفول” هيتفتح تاني عشان يعامله معاملة خاصة — فالقابلية للاستبدال هي اللي بتخلّي الـ extension آمن.',
      ),
    },
    {
      level: 'understand',
      question: t('How does DIP make OCP possible?', 'إزاي الـ DIP بيخلّي الـ OCP ممكن؟'),
      options: [
        'By letting high-level code create its own drivers with `new`',
        'By merging the high-level and low-level modules into one package',
        'By removing interfaces, so that there is less code to modify',
        'When high-level code depends on an abstraction it owns, new implementations plug in without editing it',
      ],
      answer: 3,
      explanation: t(
        'Once fusion depends on `ObjectSensor` rather than on a supplier driver, a LiDAR or a simulator is just one more adapter. The dependency direction is what turns “edit” into “add”.',
        'أول ما الـ fusion يعتمد على `ObjectSensor` بدل supplier driver، الـ LiDAR أو الـ simulator يبقى مجرد adapter زيادة. اتجاه الـ dependency هو اللي بيحوّل “عدّل” لـ “ضيف”.',
      ),
    },
    {
      level: 'apply',
      question: t(
        'In a review, `ChargingController` contains `new SupplierXChargerDriver("CAN2")` and a `switch (connectorType)` with one case per connector. Which two principles are most directly violated?',
        'في review، `ChargingController` فيه `new SupplierXChargerDriver("CAN2")` و`switch (connectorType)` فيه case لكل connector. أنهي مبدأين متكسّرين بشكل مباشر؟',
      ),
      options: [
        'SRP and LSP',
        'DIP and OCP',
        'ISP and LSP',
        'LSP and DIP',
      ],
      answer: 1,
      explanation: t(
        'A hard-coded supplier driver means high-level code depends on a detail (**DIP**) and cannot be tested without the hardware. A `switch` that grows with every new connector means every extension edits existing code (**OCP**).',
        'الـ supplier driver المكتوب hard-coded معناه إن الكود الـ high-level معتمد على detail (**DIP**) ومينفعش يتختبر من غير الـ hardware. والـ `switch` اللي بيكبر مع كل connector جديد معناه إن كل extension بيعدّل كود موجود (**OCP**).',
      ),
    },
  ],
}
