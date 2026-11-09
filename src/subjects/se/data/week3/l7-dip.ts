import type { Lesson } from '../../types'
import { part, t } from '../helpers'

/** Slides 48–57 and 60: DIP, sensor fusion tied to supplier drivers, the three-step inversion, gains, DIP vs DI, Dilemma 3. */
export const dip: Lesson = {
  id: 'w3-dip',
  weekId: 'week-3',
  order: 7,
  title: 'D — Dependency Inversion: Policy Owns the Abstraction',
  shortTitle: 'D · Dependency Inversion',
  slides: [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 60],
  minutes: 18,
  tldr: t(
    '**High-level policy must not depend on low-level details — both depend on abstractions, and details depend on abstractions.** `SensorFusion` that `new`s supplier drivers and decodes CAN bytes must be re-opened for every new radar, bus or test. Invert it in three steps: (1) the fusion package **owns** an `ObjectSensor` interface, (2) supplier **adapters** implement it, (3) a **composition root** wires them. Now new suppliers, Ethernet, LiDAR or simulation = a new adapter. **DIP** is the principle; **Dependency Injection** is just the wiring technique.',
    '**الـ policy العالية ميعتمدش على التفاصيل الواطية — الاتنين بيعتمدوا على abstractions، والتفاصيل هي اللي بتعتمد على الـ abstractions.** `SensorFusion` اللي بيعمل `new` لـ drivers الموردين ويفك bytes الـ CAN لازم يتفتح مع كل رادار جديد أو bus أو اختبار. اقلبها في تلات خطوات: (1) package الـ fusion **بيمتلك** interface اسمه `ObjectSensor`، (2) **adapters** الموردين بتعمله implement، (3) **composition root** بيوصّلهم. ودلوقتي مورد جديد أو Ethernet أو LiDAR أو simulation = adapter جديد. والـ **DIP** هو المبدأ؛ والـ **Dependency Injection** مجرد طريقة التوصيل.',
  ),
  blocks: [
    part(t('The principle', 'المبدأ')),
    {
      kind: 'memorize',
      label: 'Dependency Inversion Principle — R. C. Martin',
      text: 'A. High-level modules should not depend on low-level modules. Both should depend on abstractions. B. Abstractions should not depend on details. Details should depend on abstractions.',
    },
    {
      kind: 'idea',
      title: 'Plug into a socket, don’t wire into the power plant',
      icon: 'zap',
      tone: 'rose',
      text: t(
        '**High-level** = the important business/safety logic (sensor fusion). **Low-level** = replaceable details (a specific supplier’s driver, CAN vs Ethernet).',
        '**High-level** = المنطق المهم للبيزنس/السلامة (دمج الحساسات). **Low-level** = تفاصيل ممكن تتبدل (driver مورد معين، CAN ولا Ethernet).',
      ),
      analogy: t('A lamp connects through an **interface (socket)**, not hard-wired to one power source. Grid, solar or battery can sit behind the socket. “Depend on abstractions, not on concretions” — **both sides depend on the socket**.', 'اللمبة بتتوصل عن طريق **interface (فيشة/بريزة)**، مش متوصلة سلك على مصدر كهربا واحد. الكهربا العمومية أو الطاقة الشمسية أو البطارية يقدروا يبقوا ورا البريزة. “اعتمد على abstractions مش على حاجات محددة” — **الطرفين بيعتمدوا على البريزة**.'),
    },

    part(t('Inverted dependencies in automotive architecture', 'الاعتماديات المقلوبة في معمار العربيات')),
    {
      kind: 'versus',
      left: { title: 'Traditional layering', icon: 'down', tone: 'rose' },
      right: { title: 'Inverted dependencies', icon: 'up', tone: 'teal' },
      rows: [
        { aspect: 'Who knows whom', left: t('High-level policy **calls low-level details** (supplier drivers) directly.', 'الـ policy العالية **بتنادي التفاصيل الواطية** (drivers الموردين) مباشرة.'), right: t('High-level policy **owns an abstraction**; low-level details **implement it**.', 'الـ policy العالية **بتمتلك abstraction**؛ والتفاصيل الواطية **بتعمله implement**.') },
        { aspect: 'New supplier', left: t('Forces a **rewrite of the fusion logic**.', 'بيجبرك **تعيد كتابة منطق الدمج**.'), right: t('= a **new implementation**. Fusion logic stays pristine.', '= **implementation جديد**. ومنطق الدمج بيفضل نضيف.') },
        { aspect: 'Source dependency', left: t('Follows the call direction: **policy → detail**.', 'ماشية مع اتجاه النداء: الـ policy بتعتمد على الـ detail.'), right: t('Points **against** the call direction: **detail → abstraction ← policy**.', 'عكس اتجاه النداء: الـ detail والـ policy الاتنين بيعتمدوا على الـ abstraction.') },
      ],
    },
    {
      kind: 'cards',
      title: t('Why this matters in automotive', 'ليه ده مهم في العربيات'),
      columns: 4,
      items: [
        { icon: 'handshake', title: 'Supplier independence', tone: 'blue', body: t('OEMs swap radar, camera or LiDAR suppliers between model generations **without breaking core logic**.', 'الشركات المصنّعة بتبدّل موردين الرادار والكاميرا والـ LiDAR بين الأجيال **من غير ما تكسر المنطق الأساسي**.') },
        { icon: 'cpu', title: 'HW/SW decoupling (SDVs)', tone: 'violet', body: t('The same ADAS application SWCs run on **diverse SoCs** via standardized abstractions (software-defined vehicles).', 'نفس مكونات سوفتوير الـ ADAS بتشتغل على **SoCs مختلفة** عن طريق abstractions موحّدة (العربيات المعرّفة بالسوفتوير).') },
        { icon: 'flask', title: 'SIL / HIL simulation', tone: 'amber', body: t('High-level policies are tested against **simulated virtual sensors** without physical hardware.', 'الـ policies العالية بتتجرّب على **حساسات افتراضية متمثّلة** من غير هاردوير حقيقي.') },
        { icon: 'scroll', title: 'Industry standards', tone: 'teal', body: t('**AUTOSAR ports / RTE** and **Android Automotive VHAL** are production instances of DIP.', '**AUTOSAR ports / RTE** و**Android Automotive VHAL** أمثلة حقيقية للـ DIP في الإنتاج.') },
      ],
    },

    part(t('Violation: sensor fusion tied to supplier drivers', 'المخالفة: دمج الحساسات مربوط بـ drivers الموردين')),
    {
      kind: 'code',
      title: 'SensorFusion.java — before',
      verdict: 'bad',
      highlight: [2, 3, 8, 9, 10, 14, 15],
      code: `public class SensorFusion {                                                    // HIGH-LEVEL policy
    private final SupplierARadarDriver radar = new SupplierARadarDriver("CAN1");   // concrete detail
    private final SupplierBCameraDriver camera = new SupplierBCameraDriver("ETH0"); // concrete detail

    public ObjectList fuse() {
        List<ObjectList> inputs = new ArrayList<>();
        // Parsing supplier-specific CAN frames inside high-level fusion logic
        CanFrame frame = radar.readFrame(0x3A5);
        double rangeM     = (frame.getBytes(0, 2) * 0.05);         // supplier A scaling
        double azimuthDeg = (frame.getBytes(2, 2) * 0.01) - 90.0;  // supplier A offset
        inputs.add(ObjectList.single(rangeM, azimuthDeg, SensorType.RADAR));

        // Supplier B camera: completely different API, coordinate frame and units
        SupplierBCameraDriver.Detection[] dets = camera.getDetectionsV2();
        inputs.add(convertSupplierBDetections(dets));               // mm → m, image frame → vehicle frame

        return associateAndTrack(inputs);                           // core safety fusion algorithm
    }
}`,
      notes: [
        t('The safety-critical heart (`associateAndTrack`) shares a class with CAN IDs, byte scaling and unit conversions of two specific suppliers.', 'قلب السلامة (`associateAndTrack`) شايل نفس الـ class مع CAN IDs وتحويل bytes ووحدات بتوع موردين محددين.'),
      ],
    },
    {
      kind: 'flow',
      title: t('The concrete dependency direction', 'اتجاه الاعتماد الحالي'),
      steps: [
        { icon: 'brain', label: 'SensorFusion', tone: 'violet', detail: t('high-level policy', 'الـ policy العالية') },
        { icon: 'package', label: 'SupplierARadarDriver / SupplierBCameraDriver', tone: 'rose', detail: t('low-level drivers', 'drivers واطية') },
        { icon: 'network', label: 'CAN bus / Automotive Ethernet', tone: 'rose', detail: t('physical buses', 'الـ buses الفيزيائية') },
      ],
    },
    {
      kind: 'table',
      caption: t('What happens when suppliers or hardware change?', 'إيه اللي يحصل لما الموردين أو الهاردوير يتغيروا؟'),
      headers: ['Hardware evolution', 'Impact on SensorFusion'],
      rows: [
        [t('Switch to Supplier C radar'), t('Re-open and rewrite fusion logic: new CAN IDs, drivers and byte decoders.', 'افتح وأعد كتابة منطق الدمج: CAN IDs جديدة وdrivers وطريقة فك bytes جديدة.')],
        [t('Radar moves from CAN to Ethernet'), t('Edit the fusion module **again**.', 'عدّل module الدمج **تاني**.')],
        [t('Automated SIL / HIL testing'), t('**Impossible** without physical hardware or dirty mocks (`new` is hard-coded).', '**مستحيل** من غير هاردوير حقيقي أو mocks وسخة (الـ `new` مكتوب جوّه الكود).')],
        [t('Add LiDAR for Level 3'), t('Intrusively splice another supplier protocol into the fusion loop.', 'تحشر بروتوكول مورد تالت جوّه لوب الدمج.')],
      ],
    },
    {
      kind: 'callout',
      tone: 'warning',
      title: t('Two principles broken at once', 'مبدأين مكسورين مرة واحدة'),
      body: t(
        'The most safety-critical asset (`associateAndTrack`) is **perpetually re-opened and re-tested** for every minor hardware swap — violating both **SRP** (many reasons to change) and **OCP** (modified instead of extended).',
        'أهم أصل للسلامة (`associateAndTrack`) **بيتفتح ويتعاد اختباره على طول** مع أي تبديل هاردوير بسيط — وده بيكسر **SRP** (أسباب تغيير كتير) و**OCP** (بيتعدّل بدل ما يتوسّع) في نفس الوقت.',
      ),
    },

    part(t('Applied in three steps', 'التطبيق في تلات خطوات')),
    {
      kind: 'code',
      title: 'Step 1 — the fusion package owns the abstraction',
      verdict: 'good',
      highlight: [1, 3, 4, 5, 6, 7, 12],
      code: `package adas.fusion;   // In the policy package!

public interface ObjectSensor {
    /** Contract: detections in VEHICLE frame (ISO 8855), SI units, timestamped.
     *  Returns empty list (never null). */
    ObjectList detectObjects(Timestamp cycle);
    SensorType type();
}

public class SensorFusion {
    private final List<ObjectSensor> sensors;
    public SensorFusion(List<ObjectSensor> sensors) { this.sensors = List.copyOf(sensors); } // injected

    public ObjectList fuse(Timestamp cycleTime) {
        List<ObjectList> inputs = sensors.stream()
            .map(s -> s.detectObjects(cycleTime))
            .toList();
        return associateAndTrack(inputs);   // 100% stable
    }
}`,
      notes: [
        t('The interface is written in the **policy’s own terms** (vehicle frame, SI units, never null) and lives in the **policy’s package** — that is the “inversion”: the detail now has to adapt to the policy, not the other way round.', 'الـ interface مكتوب **بلغة الـ policy نفسها** (إحداثيات العربية، وحدات SI، عمره ما يرجّع null) وعايش في **package الـ policy** — وده “القلب”: التفصيلة هي اللي لازم تتأقلم مع الـ policy، مش العكس.'),
      ],
    },
    {
      kind: 'code',
      title: 'Step 2 — adapters implement the abstraction',
      verdict: 'good',
      highlight: [2, 9, 12, 15],
      code: `package sensors.suppliera;
public class SupplierARadarAdapter implements ObjectSensor {   // decoding and scaling live HERE
    private final SupplierARadarDriver driver;
    public ObjectList detectObjects(Timestamp t) { /* read 0x3A5, apply supplier A scaling, convert frame */ }
    public SensorType type() { return SensorType.RADAR; }
}

package sensors.supplierc;
public class SupplierCRadarAdapter implements ObjectSensor { /* Ethernet / SOME/IP implementation */ }

package sensors.supplierb;
public class SupplierBCameraAdapter implements ObjectSensor { /* mm → m, image frame → vehicle frame */ }

package test.sil;
public class SimulatedSensor implements ObjectSensor { /* replays recorded drive datasets or CARLA sim */ }`,
    },
    {
      kind: 'code',
      title: 'Step 3 — wire everything at one composition root',
      verdict: 'good',
      code: `// Production vehicle configuration: Supplier C radar + Supplier B camera
SensorFusion fusion = new SensorFusion(List.of(
        new SupplierCRadarAdapter(new SupplierCRadarDriver("ETH1")),
        new SupplierBCameraAdapter(new SupplierBCameraDriver("ETH0"))));

// SIL test bench: identical fusion code, zero physical hardware required!
SensorFusion fusionUnderTest = new SensorFusion(List.of(
        new SimulatedSensor(Scenario.PEDESTRIAN_CROSSING_NIGHT)));`,
      notes: [
        t('**Architectural freedom:** the core fusion algorithms are completely agnostic of bus protocol (CAN vs Ethernet), supplier wire encodings, and physical vs virtual execution.', '**حرية معمارية:** خوارزميات الدمج الأساسية مش فارق معاها خالص الـ bus (CAN ولا Ethernet)، ولا طريقة ترميز المورد، ولا التشغيل حقيقي ولا افتراضي.'),
      ],
    },
    {
      kind: 'definition',
      term: 'Adapter',
      definition: t(
        'A small class that **translates** one specific thing (a supplier’s driver, units, frame) into the interface the policy expects.',
        'class صغير بـ **يترجم** حاجة معينة (driver مورد، وحدات، إحداثيات) للـ interface اللي الـ policy مستنياه.',
      ),
    },
    {
      kind: 'diagram',
      id: 'dip-inversion',
      title: t('The inverted dependency architecture', 'معمار الاعتماد المقلوب'),
      caption: t(
        'Before, arrows run from the fusion policy down to drivers and buses. After, `SensorFusion` **uses** `ObjectSensor`, and the three supplier adapters plus the SIL `SimulatedSensor` **realize** it — every arrow points toward the policy’s abstraction.',
        'قبل كده، الأسهم نازلة من الـ policy للـ drivers والـ buses. دلوقتي `SensorFusion` **بيستخدم** `ObjectSensor`، والتلات adapters بتوع الموردين ومعاهم `SimulatedSensor` بتاع الـ SIL **بيحققوه** — وكل سهم رايح ناحية الـ abstraction بتاع الـ policy.',
      ),
    },

    part(t('What we gained', 'كسبنا إيه')),
    {
      kind: 'table',
      caption: t('Change scenarios after the inversion', 'سيناريوهات التغيير بعد القلب'),
      headers: ['Change scenario', 'Architectural impact'],
      rows: [
        [t('Switch to Supplier C radar'), t('Write one new adapter. `SensorFusion` is **100% untouched**.', 'اكتب adapter جديد واحد. `SensorFusion` **ماتلمسش خالص**.')],
        [t('Migrate from CAN to Ethernet'), t('Only the adapter changes; domain policy remains completely unaware.', 'الـ adapter بس اللي بيتغير؛ والـ policy مش حاسة بحاجة.')],
        [t('SIL / HIL simulation'), t('Inject `SimulatedSensor`. **Identical production bytecode** runs in the test bench.', 'احقن `SimulatedSensor`. **نفس كود الإنتاج بالظبط** بيشتغل في بنش الاختبار.')],
        [t('Add LiDAR for Level 3'), t('Write `LidarAdapter implements ObjectSensor`. System **extended, not modified (OCP ✓)**.', 'اكتب `LidarAdapter implements ObjectSensor`. السيستم **اتوسّع مش اتعدّل (OCP ✓)**.')],
        [t('Safety re-certification'), t('Scoped **exclusively to the new adapter**. Core algorithm preserved.', 'محصورة **في الـ adapter الجديد بس**. والخوارزمية الأساسية محفوظة.')],
      ],
    },
    {
      kind: 'memorize',
      label: 'Crucial distinction',
      text: 'Dependency Inversion is the architectural principle (dependencies point toward high-level abstractions). Dependency Injection is merely the tactical wiring technique.',
    },
    {
      kind: 'myths',
      items: [
        {
          myth: t('“DIP and Dependency Injection are the same thing.”', '“الـ DIP والـ Dependency Injection نفس الحاجة.”'),
          fact: t('DIP = **which way** dependencies point (towards the policy’s abstraction). DI = **how** you hand in the concrete objects (e.g. the constructor in step 3).', 'الـ DIP = الاعتماديات **رايحة فين** (ناحية الـ abstraction بتاع الـ policy). والـ DI = **إزاي** بتسلّم الـ objects الحقيقية (زي الـ constructor في الخطوة 3).'),
        },
        {
          myth: t('“Any interface is enough — put it next to the driver.”', '“أي interface يكفي — حطه جنب الـ driver.”'),
          fact: t('The abstraction must be **owned by the high-level module** and written in its terms (`package adas.fusion`). An interface shaped like one supplier’s driver doesn’t invert anything.', 'الـ abstraction لازم **يملكه الـ module العالي** ومكتوب بلغته (`package adas.fusion`). interface متفصّل على driver مورد واحد مش بيقلب حاجة.'),
        },
      ],
    },

    part(t('Think & defend: the connected-vehicle “god service”', 'فكّر ودافع: “god service” في العربية المتصلة')),
    {
      kind: 'dilemma',
      label: 'Think & Defend · Dilemma 3',
      title: 'ISP & DIP: the connected-vehicle god service',
      scenario: t(
        'An OEM deploys an edge **OTA gateway**. The cloud connectivity service only needs the battery’s **State-of-Charge** to show charging progress on the owner’s phone app. A developer binds the gateway **directly to the internal `BatteryManagementSystem` (BMS) interface**, which contains `getStateOfCharge()`, `calibrateCells()`, `overrideThermalLimits()` and `flashFirmware()`. The developer claims: “It’s already implemented on CAN; why write extra interfaces and adapters?”',
        'شركة عربيات بتنزّل **OTA gateway** على العربية. خدمة الاتصال بالسحابة محتاجة بس **نسبة شحن البطارية (State-of-Charge)** عشان تعرض تقدم الشحن على موبايل صاحب العربية. مطوّر ربط الـ gateway **مباشرة بالـ interface الداخلي `BatteryManagementSystem` (BMS)** اللي فيه `getStateOfCharge()` و`calibrateCells()` و`overrideThermalLimits()` و`flashFirmware()`. وبيقول: “هي متعملة أصلًا على الـ CAN؛ ليه نكتب interfaces وadapters زيادة؟”',
      ),
      options: [
        { label: 'The shortcut', tone: 'rose', text: t('Gateway → full BMS interface (4 methods, 3 of them dangerous).', 'الـ gateway ← interface الـ BMS كله (4 methods، منهم 3 خطيرين).') },
        { label: 'What it needs', tone: 'teal', text: t('One read-only value: `getStateOfCharge()`.', 'قيمة واحدة للقراية بس: `getStateOfCharge()`.') },
      ],
      question: 'Does it violate ISP and DIP? What hazards appear, and what is your inverted design?',
      lens: [
        t('**ISP violated:** the gateway is forced to depend on `calibrateCells`, `overrideThermalLimits` and `flashFirmware`, which it never uses. **DIP violated:** a high-level cloud service depends directly on a low-level, concrete in-vehicle detail (the BMS on CAN) instead of an abstraction it owns.', '**الـ ISP مكسور:** الـ gateway متجبر يعتمد على `calibrateCells` و`overrideThermalLimits` و`flashFirmware` اللي عمره ما هيستخدمهم. **والـ DIP مكسور:** خدمة سحابة عالية المستوى بتعتمد مباشرة على تفصيلة واطية جوّه العربية (الـ BMS على الـ CAN) بدل abstraction هي اللي تملكه.'),
        t('**Cybersecurity (ISO/SAE 21434):** the gateway faces the internet. If it is compromised, the attacker inherits everything the gateway can call — overriding thermal limits or flashing malicious firmware. The attack surface grows from one harmless read to battery control.', '**الأمن السيبراني (ISO/SAE 21434):** الـ gateway مواجه للإنترنت. لو اتخترق، المهاجم بيورث كل حاجة الـ gateway يقدر ينادي عليها — يلغي حدود الحرارة أو ينزّل firmware خبيث. وسطح الهجوم بيكبر من قراية بريئة لتحكم في البطارية.'),
        t('**Safety:** overridden thermal limits can lead to battery overheating (thermal runaway, fire); a bad `flashFirmware` can disable the BMS. A phone progress bar should never be able to reach these.', '**السلامة:** إلغاء حدود الحرارة ممكن يوصّل لسخونة البطارية (thermal runaway وحريق)؛ و`flashFirmware` غلط ممكن يعطّل الـ BMS. شريط تقدم على موبايل عمره ما المفروض يوصل للحاجات دي.'),
        t('**Inverted design:** the connectivity domain owns a tiny read-only interface, e.g. `StateOfChargeProvider { double getStateOfCharge(); }`. A BMS adapter on the vehicle side implements it (read-only), and the gateway depends only on that. One small interface and one adapter is the price of least privilege — far cheaper than a recall.', '**التصميم المقلوب:** دومين الاتصال يملك interface صغير للقراية بس، مثلًا `StateOfChargeProvider { double getStateOfCharge(); }`. وadapter للـ BMS جوّه العربية بيعمله implement (قراية بس)، والـ gateway يعتمد عليه هو بس. interface صغير وadapter واحد هو تمن أقل صلاحية — وأرخص بكتير من استدعاء العربيات.'),
      ],
    },
  ],
  keyTerms: [
    { term: 'Dependency Inversion Principle (DIP)', definition: t('High-level modules don’t depend on low-level ones; both depend on abstractions, and details depend on abstractions.', 'الـ modules العالية متعتمدش على الواطية؛ الاتنين بيعتمدوا على abstractions، والتفاصيل بتعتمد على الـ abstractions.') },
    { term: 'High-level policy vs low-level detail', definition: t('Policy = core logic (sensor fusion); detail = replaceable specifics (supplier drivers, buses).', 'الـ Policy = المنطق الأساسي (دمج الحساسات)؛ والتفصيلة = حاجات ممكن تتبدل (drivers الموردين، الـ buses).') },
    { term: 'Inverted source dependency', definition: t('Source code dependency points against the call direction: detail → abstraction ← policy.', 'الاعتماد في الكود عكس اتجاه النداء: detail → abstraction ← policy.') },
    { term: 'ObjectSensor', definition: t('The abstraction owned by adas.fusion: vehicle frame (ISO 8855), SI units, timestamped, never null.', 'الـ abstraction اللي يملكه adas.fusion: إحداثيات العربية (ISO 8855)، وحدات SI، بتوقيت، وعمره ما يرجّع null.') },
    { term: 'Adapter', definition: t('Translates a supplier’s driver/units/frame into the policy’s interface (SupplierARadarAdapter…).', 'بيترجم driver/وحدات/إحداثيات المورد للـ interface بتاع الـ policy (SupplierARadarAdapter…).') },
    { term: 'Composition root', definition: t('The single place where concrete adapters are created and injected (production vs SIL configuration).', 'المكان الواحد اللي بتتعمل وتتحقن فيه الـ adapters (إعداد الإنتاج ضد إعداد الـ SIL).') },
    { term: 'SIL / HIL', definition: t('Testing the same policy code with simulated sensors (SimulatedSensor) instead of physical hardware.', 'اختبار نفس كود الـ policy بحساسات متمثّلة (SimulatedSensor) بدل هاردوير حقيقي.') },
    { term: 'DIP vs Dependency Injection', definition: t('DIP is the architectural principle (direction of dependencies); DI is the tactical wiring technique.', 'الـ DIP مبدأ معماري (اتجاه الاعتماديات)؛ والـ DI طريقة توصيل تكتيكية.') },
    { term: 'AUTOSAR RTE / Android Automotive VHAL', definition: t('Real production instances of DIP in the car industry.', 'أمثلة حقيقية للـ DIP في صناعة العربيات.') },
  ],
  recap: [
    t('DIP: A) high-level and low-level both depend on abstractions; B) details depend on abstractions (lamp + socket).', 'الـ DIP: أ) العالي والواطي الاتنين بيعتمدوا على abstractions؛ ب) التفاصيل بتعتمد على الـ abstractions (اللمبة والبريزة).'),
    t('Why cars: supplier independence, HW/SW decoupling on many SoCs, SIL/HIL simulation, AUTOSAR RTE & Android VHAL.', 'ليه العربيات: استقلال عن الموردين، فصل الهاردوير عن السوفتوير على SoCs كتير، simulation بالـ SIL/HIL، وAUTOSAR RTE وAndroid VHAL.'),
    t('Before: SensorFusion news supplier drivers and decodes CAN bytes — every radar, bus, test or LiDAR re-opens the core algorithm (breaks SRP and OCP).', 'قبل: SensorFusion بيعمل new لـ drivers الموردين ويفك bytes الـ CAN — وأي رادار أو bus أو اختبار أو LiDAR بيفتح الخوارزمية الأساسية (بيكسر SRP وOCP).'),
    t('Fix: 1) fusion owns ObjectSensor; 2) supplier adapters + SimulatedSensor implement it; 3) composition root wires production or SIL.', 'الحل: 1) الدمج يملك ObjectSensor؛ 2) adapters الموردين + SimulatedSensor بيعملوه implement؛ 3) الـ composition root بيوصّل الإنتاج أو الـ SIL.'),
    t('Gains: new supplier / Ethernet / LiDAR / simulation = a new adapter; re-certification scoped to the adapter.', 'المكاسب: مورد جديد / Ethernet / LiDAR / simulation = adapter جديد؛ وإعادة الاعتماد محصورة في الـ adapter.'),
    t('DIP is the principle; Dependency Injection is only the wiring technique.', 'الـ DIP هو المبدأ؛ والـ Dependency Injection مجرد طريقة التوصيل.'),
  ],
}
