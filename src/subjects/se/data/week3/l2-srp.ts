import type { Lesson } from '../../types'
import { part, t } from '../helpers'

/** Slides 8–15 and 58: SRP, the actor model, the "itself" test on FrontCamera, FFI, and Dilemma 1. */
export const srp: Lesson = {
  id: 'w3-srp',
  weekId: 'week-3',
  order: 2,
  title: 'S — Single Responsibility: One Reason to Change',
  shortTitle: 'S · Single Responsibility',
  slides: [8, 9, 10, 11, 12, 13, 14, 15, 58],
  minutes: 18,
  tldr: t(
    'A class should have **only one reason to change** — and a “reason” is an **actor**: the one team/stakeholder who asks for changes. Spot violations with the **“itself” test** (“The FrontCamera … itself”). Splitting a do-everything class into focused ones keeps changes small, and in cars it allows **Freedom from Interference (FFI)** between safety (ASIL) and non-safety (QM) code.',
    'الـ class لازم يبقى ليه **سبب واحد بس للتغيير** — والـ “سبب” ده هو **actor**: الفريق أو صاحب المصلحة الوحيد اللي بيطلب تعديلات. واكتشف المخالفة بـ **اختبار “itself”** (“The FrontCamera … itself”). وتقسيم الـ class اللي بيعمل كل حاجة لـ classes مركّزة بيخلّي التعديلات صغيرة، وفي العربيات بيسمح بـ **Freedom from Interference (FFI)** بين كود السلامة (ASIL) والكود العادي (QM).',
  ),
  blocks: [
    part(t('The principle', 'المبدأ')),
    {
      kind: 'memorize',
      label: 'SRP — Head First OOA&D',
      text: 'Every object in your system should have a single responsibility, and all the object’s services should be focused on carrying out that single responsibility.',
    },
    {
      kind: 'memorize',
      label: 'SRP — R. C. Martin',
      text: 'A class should have only one reason to change.',
    },
    {
      kind: 'idea',
      title: 'Fork + spoon, not a spork',
      icon: 'wrench',
      tone: 'blue',
      text: t(
        'A class that does many jobs does each of them worse, and every job’s change risks breaking the others.',
        'الـ class اللي بيعمل شغلانات كتير بيعمل كل واحدة فيهم أسوأ، وأي تعديل في شغلانة ممكن يبوّظ الباقي.',
      ),
      analogy: t('Compare a fork and a spoon (each does one job well) with a **spork** (both jobs in one tool, neither done well). SRP says: build forks and spoons.', 'قارن شوكة ومعلقة (كل واحدة بتعمل شغلانة واحدة كويس) بـ **spork** (الاتنين في أداة واحدة، ومفيش ولا واحدة متعملة صح). الـ SRP بيقولك: اعمل شوكة ومعلقة.'),
    },

    part(t('What is a “responsibility”?', 'يعني إيه “responsibility”؟')),
    {
      kind: 'versus',
      left: { title: 'One “super-ECU” class', icon: 'cpu', tone: 'rose', tagline: t('Everything in one place', 'كل حاجة في مكان واحد') },
      right: { title: 'Focused classes', icon: 'blocks', tone: 'teal', tagline: t('One job each', 'كل واحد شغلانة واحدة') },
      rows: [
        {
          aspect: 'Does',
          left: t('Captures camera frames, detects lanes, decides on steering torque, logs diagnostics, **and** draws HUD graphics.', 'بيلقط صور الكاميرا، ويكتشف الحارات، ويقرر عزم الدركسيون، ويسجّل التشخيص، **و** يرسم على الـ HUD.'),
          right: t('`CameraDriver` · `LaneDetector` · `LaneKeepController` · `DiagnosticLogger` · `HudRenderer`', '`CameraDriver` · `LaneDetector` · `LaneKeepController` · `DiagnosticLogger` · `HudRenderer`'),
        },
        {
          aspect: 'Effect',
          left: t('A change to the **HUD layout can break lane keeping**.', 'تعديل **شكل الـ HUD ممكن يبوّظ ثبات الحارة**.'),
          right: t('Each class changes for **one reason only**.', 'كل class بيتغير **لسبب واحد بس**.'),
        },
      ],
      verdict: t(
        '**Key insight:** bundling disparate responsibilities into one module creates **hidden coupling**, making simple changes **high-risk and expensive to verify**.',
        '**الفكرة المهمة:** لمّ مسؤوليات مختلفة في module واحد بيعمل **ترابط مستخبي**، فالتعديلات البسيطة تبقى **خطيرة وغالية في التحقق**.',
      ),
    },

    part(t('The stakeholder & actor model', 'نموذج أصحاب المصلحة والـ actors')),
    {
      kind: 'table',
      caption: t('Who asks for which changes', 'مين بيطلب أنهي تعديلات'),
      headers: ['Actor', 'Asks for changes to…', 'Automotive focus'],
      rows: [
        [t('Perception algorithm team'), t('Lane / object detection', 'اكتشاف الحارات / الأجسام'), t('Computer vision, neural-net inference', 'رؤية بالكمبيوتر، تشغيل الشبكات العصبية')],
        [t('Functional safety team'), t('Plausibility checks, safe states', 'فحوصات المعقولية، والحالات الآمنة'), t('ISO 26262 ASIL ratings, safe fallback', 'تقييمات ASIL في ISO 26262، والرجوع لحالة آمنة')],
        [t('Diagnostics / service team'), t('DTCs, logging formats (UDS)', 'أكواد الأعطال (DTC)، وأشكال الـ logging (UDS)'), t('Diagnostic Event Manager (DEM)', 'Diagnostic Event Manager (DEM)')],
        [t('HMI / UX team'), t('HUD and cluster visualization', 'عرض الـ HUD والتابلوه'), t('Infotainment / head-up display (QM)', 'الترفيه / الـ head-up display (QM)')],
      ],
    },
    {
      kind: 'callout',
      tone: 'key',
      title: t('The rule', 'القاعدة'),
      body: t(
        'If **more than one actor** can ask for changes to a class, it has **more than one responsibility**.',
        'لو **أكتر من actor** يقدروا يطلبوا تعديلات على class، يبقى عنده **أكتر من مسؤولية**.',
      ),
    },
    {
      kind: 'memorize',
      label: 'Refined definition (Clean Architecture, 2017)',
      text: 'A module should be responsible to one, and only one, actor.',
      source: 'R. C. Martin, Clean Architecture',
      note: t(
        '“Reason to change” sounds vague; “actor” makes it concrete: **ask who would call you to change this class**. If two different teams would call, split it.',
        '“سبب للتغيير” كلمة مطاطة؛ إنما “actor” بتخليها واضحة: **اسأل مين هيكلّمك عشان تعدّل الـ class ده**. لو فريقين مختلفين هيكلّموك، قسّمه.',
      ),
    },
    {
      kind: 'diagram',
      id: 'srp-actors',
      title: t('Many actors → many reasons to change', 'actors كتير ← أسباب تغيير كتير'),
      caption: t(
        'Left: four teams all pull on one class, so any team’s request can break another team’s feature. Right: each class answers to one actor.',
        'على الشمال: أربع فرق كلهم بيشدّوا في class واحد، فأي طلب من فريق ممكن يبوّظ ميزة فريق تاني. على اليمين: كل class بيرد على actor واحد.',
      ),
    },

    part(t('The “itself” test', 'اختبار “itself”')),
    {
      kind: 'memorize',
      label: 'The heuristic',
      text: 'For each method, read out loud: “The [Class] [method]s itself.” If the sentence makes sense, the method probably belongs in the class. If it sounds wrong, move it.',
    },
    {
      kind: 'code',
      title: 'FrontCamera.java — class under analysis',
      verdict: 'bad',
      highlight: [5, 6, 7, 8],
      code: `public class FrontCamera {
    public Frame captureFrame()          { /* ... */ }
    public void adjustExposure()         { /* ... */ }
    public void runSelfTest()            { /* ... */ }
    public List<Lane> detectLanes()      { /* ... */ }
    public void reportFault(int dtc)     { /* ... */ }
    public void renderOnHud(Frame f)     { /* ... */ }
    public void cleanLens()              { /* ... */ }
}`,
      notes: [t('The highlighted methods fail the “itself” test below.', 'الـ methods المعلّم عليها بتفشل في اختبار “itself” اللي تحت.')],
    },
    {
      kind: 'table',
      caption: t('Applying the test to FrontCamera', 'تطبيق الاختبار على FrontCamera'),
      headers: ['Method', '“The FrontCamera … itself.”', 'Result', 'Move to'],
      rows: [
        [t('captureFrame()'), t('…captures a frame itself', '…بتلقط صورة بنفسها'), t('✓ belongs', '✓ مكانها هنا'), t('—')],
        [t('adjustExposure()'), t('…adjusts its exposure itself', '…بتظبط الإضاءة بنفسها'), t('✓ belongs', '✓ مكانها هنا'), t('—')],
        [t('runSelfTest()'), t('…runs its self-test itself', '…بتعمل self-test لنفسها'), t('✓ belongs', '✓ مكانها هنا'), t('—')],
        [t('detectLanes()'), t('…detects lanes itself', '…بتكتشف الحارات بنفسها'), t('✗ move', '✗ تتنقل'), t('`LaneDetector` (perception)', '`LaneDetector` (الإدراك)')],
        [t('reportFault(dtc)'), t('…stores and manages DTCs itself', '…بتخزّن وتدير أكواد الأعطال بنفسها'), t('✗ move', '✗ تتنقل'), t('`DiagnosticEventManager`', '`DiagnosticEventManager`')],
        [t('renderOnHud(f)'), t('…renders on the HUD itself', '…بترسم على الـ HUD بنفسها'), t('✗ move', '✗ تتنقل'), t('`HudRenderer` (HMI)', '`HudRenderer` (الـ HMI)')],
        [t('cleanLens()'), t('…cleans its lens itself', '…بتنضّف عدستها بنفسها'), t('✗ move', '✗ تتنقل'), t('`SensorCleaningSystem`', '`SensorCleaningSystem`')],
      ],
    },
    {
      kind: 'callout',
      tone: 'insight',
      title: t('Context matters', 'السياق بيفرق'),
      body: t(
        'A **“smart camera”** that runs perception on its own SoC *can* detect lanes itself — the test passes in that context. And the camera *detects* its internal faults (`runSelfTest` ✓), but *storing and managing* DTCs belongs to diagnostics.',
        'الـ **“smart camera”** اللي بتشغّل الإدراك على الـ SoC بتاعها *تقدر* تكتشف الحارات بنفسها — فالاختبار بيعدّي في السياق ده. والكاميرا *بتكتشف* أعطالها الداخلية (`runSelfTest` ✓)، إنما *تخزين وإدارة* أكواد الأعطال ده شغل التشخيص.',
      ),
    },

    part(t('The refactored design', 'التصميم بعد إعادة الهيكلة')),
    {
      kind: 'code',
      title: 'After the refactoring — five focused classes',
      verdict: 'good',
      code: `// Sensor hardware abstraction
public class FrontCamera {
    public Frame captureFrame()            { /* ... */ }
    public void adjustExposure()           { /* ... */ }
    public SelfTestResult runSelfTest()    { /* ... */ }
}

// Perception algorithm
public class LaneDetector {
    public List<Lane> detectLanes(Frame frame) { /* ... */ }
}

// Diagnostics (e.g. AUTOSAR DEM)
public class DiagnosticEventManager {
    public void reportFault(FaultEvent event) { /* ... */ }
}

// HMI visualization (QM)
public class HudRenderer {
    public void render(List<Lane> lanes) { /* ... */ }
}

// Actuator / body control
public class SensorCleaningSystem {
    public void clean(Sensor sensor) { /* ... */ }
}`,
      notes: [
        t('Notice the methods now take parameters (`detectLanes(Frame)`, `render(List<Lane>)`, `clean(Sensor)`): the work moved to the class that owns it, and the data is passed in.', 'لاحظ إن الـ methods بقت بتاخد parameters (`detectLanes(Frame)` و`render(List<Lane>)` و`clean(Sensor)`): الشغل اتنقل للـ class صاحبه، والداتا بتتبعتله.'),
      ],
    },

    part(t('Methods with parameters', 'Methods بـ parameters')),
    {
      kind: 'table',
      caption: t('The “itself” test with parameters', 'اختبار “itself” مع الـ parameters'),
      headers: ['Sentence', 'Assigned responsibility'],
      rows: [
        [t('“The LaneDetector detects lanes [in a frame] itself.” ✓'), t('Computer vision / perception algorithm', 'رؤية بالكمبيوتر / خوارزمية إدراك')],
        [t('“The HudRenderer renders [the lanes] itself.” ✓'), t('Driver HMI visualization', 'العرض للسواق (HMI)')],
        [t('“The SensorCleaningSystem cleans [a sensor] itself.” ✓'), t('Physical washer-fluid / wiper actuation', 'تشغيل سائل الغسيل / المساحات')],
      ],
    },
    {
      kind: 'callout',
      tone: 'key',
      title: t('ISO 26262 benefit: Freedom from Interference', 'فايدة ISO 26262: Freedom from Interference'),
      body: t(
        'Separating responsibilities into distinct classes enables clean **Freedom from Interference (FFI)** arguments: **perception (ASIL B)** and **HUD rendering (QM)** no longer share memory or execution context in a single **God Class**.',
        'فصل المسؤوليات في classes مختلفة بيسمح بإثبات **Freedom from Interference (FFI)** بشكل نضيف: **الإدراك (ASIL B)** و**رسم الـ HUD (QM)** مبقوش بيشاركوا memory أو سياق تنفيذ في **God Class** واحد.',
      ),
    },
    {
      kind: 'definition',
      term: 'Freedom from Interference (FFI)',
      definition: t(
        'Showing that a less-critical part (QM) **cannot disturb** a safety-critical part (ASIL) — not its memory, not its timing.',
        'إنك تثبت إن جزء أقل أهمية (QM) **ميقدرش يعطّل** جزء خطير على السلامة (ASIL) — لا في الـ memory بتاعته ولا في توقيته.',
      ),
      detail: t(
        'If you mix both in one God Class, you can’t argue that a HUD bug won’t corrupt lane detection.',
        'لو لمّيت الاتنين في God Class واحد، مش هتقدر تثبت إن bug في الـ HUD مش هيبوّظ اكتشاف الحارات.',
      ),
    },

    part(t('Think & defend: SRP vs latency', 'فكّر ودافع: SRP ضد الـ latency')),
    {
      kind: 'dilemma',
      label: 'Think & Defend · Dilemma 1',
      title: 'SRP vs latency: the mixed-criticality God Class',
      scenario: t(
        'In an ADAS domain controller, the **perception pipeline** detects obstacles (**ASIL B**), while **telemetry logging** writes diagnostic trace buffers to flash memory (**QM**, non-safety). A performance engineer merges both into one `FrontCameraPipeline` class to remove inter-thread queue latency (**saving 3.5 ms**). The safety architect objects: it violates **SRP** and ISO 26262 **Freedom From Interference (FFI)**.',
        'في domain controller بتاع الـ ADAS، الـ **perception pipeline** بيكتشف العوائق (**ASIL B**)، و**telemetry logging** بيكتب trace buffers على الـ flash (**QM**، مالوش علاقة بالسلامة). مهندس الأداء دمج الاتنين في class واحد `FrontCameraPipeline` عشان يشيل الـ latency بتاعة الـ queue بين الـ threads (**يوفّر 3.5 ms**). ومعماري السلامة اعترض: ده بيخالف الـ **SRP** والـ **FFI** بتاع ISO 26262.',
      ),
      options: [
        { label: 'Merge (performance engineer)', tone: 'rose', text: t('One class, one thread, **3.5 ms faster**.', 'class واحد وthread واحد، **أسرع بـ 3.5 ms**.') },
        { label: 'Keep separate (safety architect)', tone: 'teal', text: t('Two classes; accept 3.5 ms **or** use **lock-free message ring buffers**.', 'two classes؛ اقبل الـ 3.5 ms **أو** استخدم **lock-free message ring buffers**.') },
      ],
      question: 'Why is keeping them separate mandatory?',
      lens: [
        t('Two actors (perception team vs diagnostics team), two criticality levels (ASIL B vs QM) → two responsibilities. Merging is an SRP violation by definition.', 'actorين (فريق الإدراك وفريق التشخيص) ومستويين أمان (ASIL B وQM) ← مسؤوليتين. والدمج مخالفة SRP بالتعريف.'),
        t('FFI is lost: a flash write can block or stall for milliseconds, and in one class it now runs in the same execution context as obstacle detection — the QM code can delay or corrupt the ASIL B code (timing and memory interference).', 'الـ FFI بيضيع: الكتابة على الـ flash ممكن تقف أو تتأخر ميلي ثواني، ودلوقتي بقت في نفس سياق التنفيذ مع اكتشاف العوائق — فكود الـ QM ممكن يأخّر أو يبوّظ كود الـ ASIL B (تداخل في التوقيت والـ memory).'),
        t('Under ISO 26262, mixing criticalities without FFI means the **whole** class must be developed and verified to the higher level (ASIL B) — the logging code becomes far more expensive than 3.5 ms.', 'في ISO 26262، خلط مستويات الأمان من غير FFI معناه إن الـ class **كله** لازم يتطوّر ويتراجع على المستوى الأعلى (ASIL B) — فكود الـ logging يبقى تمنه أغلى بكتير من 3.5 ms.'),
        t('You don’t have to choose between speed and safety: a **lock-free ring buffer** (single producer, single consumer) passes data between the two without locks, recovering most of the latency while keeping the boundary.', 'مش لازم تختار بين السرعة والأمان: **lock-free ring buffer** (منتج واحد ومستهلك واحد) بينقل الداتا بين الاتنين من غير locks، فبيرجّع أغلب الـ latency ويحافظ على الفصل.'),
      ],
    },
  ],
  keyTerms: [
    { term: 'Single Responsibility Principle (SRP)', definition: t('A class should have only one reason to change.', 'الـ class لازم يبقى ليه سبب واحد بس للتغيير.') },
    { term: 'Responsibility (actor view)', definition: t('Responsibility = reason to change = the actor (stakeholder) who asks for it.', 'المسؤولية = سبب التغيير = الـ actor (صاحب المصلحة) اللي بيطلبه.') },
    { term: 'Refined SRP (Clean Architecture)', definition: t('A module should be responsible to one, and only one, actor.', 'الـ module لازم يكون مسؤول قدام actor واحد بس.') },
    { term: 'Hidden coupling', definition: t('Disparate responsibilities bundled in one module, so a change in one silently breaks another.', 'مسؤوليات مختلفة متلمّة في module واحد، فتعديل واحدة يبوّظ التانية من غير ما تاخد بالك.') },
    { term: '“Itself” test', definition: t('Read “The [Class] [method]s itself.” If it sounds wrong, move the method.', 'اقرا “The [Class] [method]s itself.” ولو باينة غلط، انقل الـ method.') },
    { term: 'God Class', definition: t('One class that does everything (e.g. a super-ECU), with many actors and many reasons to change.', 'class واحد بيعمل كل حاجة (زي super-ECU)، وليه actors كتير وأسباب تغيير كتير.') },
    { term: 'DTC / DEM', definition: t('Diagnostic Trouble Code / Diagnostic Event Manager — storing and managing faults belongs to diagnostics.', 'كود العطل / مدير أحداث التشخيص — تخزين وإدارة الأعطال شغل التشخيص.') },
    { term: 'ASIL vs QM', definition: t('ASIL = safety-rated (A–D); QM = not safety-related.', 'ASIL = متقيّم للسلامة (A–D)؛ QM = مالوش علاقة بالسلامة.') },
    { term: 'Freedom from Interference (FFI)', definition: t('Proof that QM code cannot disturb ASIL code; easy when they live in separate classes.', 'إثبات إن كود الـ QM ميقدرش يعطّل كود الـ ASIL؛ سهل لما يبقوا في classes منفصلة.') },
  ],
  recap: [
    t('SRP: one reason to change; all services focused on one responsibility (spork vs fork & spoon).', 'الـ SRP: سبب واحد للتغيير؛ وكل الخدمات مركزة على مسؤولية واحدة (spork ضد شوكة ومعلقة).'),
    t('Super-ECU: a HUD layout change can break lane keeping — hidden coupling, risky changes.', 'الـ super-ECU: تعديل شكل الـ HUD ممكن يبوّظ ثبات الحارة — ترابط مستخبي وتعديلات خطيرة.'),
    t('Responsibility = actor. Perception, functional safety, diagnostics, HMI are four actors. “Responsible to one, and only one, actor.”', 'المسؤولية = actor. الإدراك والسلامة الوظيفية والتشخيص والـ HMI أربع actors. “مسؤول قدام actor واحد بس.”'),
    t('“Itself” test on FrontCamera: keep capture/exposure/self-test; move detectLanes → LaneDetector, reportFault → DiagnosticEventManager, renderOnHud → HudRenderer, cleanLens → SensorCleaningSystem.', 'اختبار “itself” على FrontCamera: سيب capture/exposure/self-test؛ وانقل detectLanes ← LaneDetector وreportFault ← DiagnosticEventManager وrenderOnHud ← HudRenderer وcleanLens ← SensorCleaningSystem.'),
    t('Context matters: a smart camera may detect lanes itself; detecting faults ≠ storing DTCs.', 'السياق بيفرق: الـ smart camera ممكن تكتشف الحارات بنفسها؛ واكتشاف العطل ≠ تخزين الـ DTC.'),
    t('Separate classes enable Freedom from Interference: perception (ASIL B) and HUD (QM) no longer share memory or execution context.', 'الـ classes المنفصلة بتسمح بالـ FFI: الإدراك (ASIL B) والـ HUD (QM) مبقوش بيشاركوا memory أو سياق تنفيذ.'),
  ],
}
