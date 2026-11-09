import type { Lesson } from '../../types'
import { part, t } from '../helpers'

/** Slides 39–47: ISP, why fat interfaces are dangerous in cars, the VehicleOperator god-interface and its split. */
export const isp: Lesson = {
  id: 'w3-isp',
  weekId: 'week-3',
  order: 6,
  title: 'I — Interface Segregation: Small Interfaces for Each Client',
  shortTitle: 'I · Interface Segregation',
  slides: [39, 40, 41, 42, 43, 44, 45, 46, 47],
  minutes: 16,
  tldr: t(
    'Clients should **not be forced to depend on methods they do not use**. One fat `VehicleOperator` interface (motion + driver monitoring + OTA) forces a human driver to fake OTA updates and the autonomous stack to fake eyes and hands — causing `null`s, false alarms and a **security hole** (the OTA manager can reach steering and braking). Split it into **client-specific interfaces**: `MotionControl`, `AttentionMonitorable`, `SelfDiagnosable`, `OtaUpdatable`.',
    'الـ client **ميتجبرش يعتمد على methods مش بيستخدمها**. interface واحد تخين `VehicleOperator` (حركة + مراقبة السواق + OTA) بيجبر السواق البشري يزيّف تحديثات OTA، ونظام القيادة الذاتية يزيّف عيون وإيدين — فيطلع `null` وإنذارات كدابة و**ثغرة أمنية** (مدير الـ OTA يقدر يوصل للدركسيون والفرامل). قسّمه لـ **interfaces خاصة بكل client**: `MotionControl` و`AttentionMonitorable` و`SelfDiagnosable` و`OtaUpdatable`.',
  ),
  blocks: [
    part(t('The principle', 'المبدأ')),
    {
      kind: 'memorize',
      label: 'Interface Segregation Principle',
      text: 'Clients should not be forced to depend on methods they do not use.',
    },
    {
      kind: 'memorize',
      label: 'R. C. Martin',
      text: 'Many client-specific interfaces are better than one general-purpose interface.',
    },
    {
      kind: 'idea',
      title: 'Three small remotes beat one giant remote',
      icon: 'radar',
      tone: 'amber',
      text: t(
        'Each user should see **only the buttons they need**. Extra buttons are not free: they confuse, they can be pressed by mistake, and they change for reasons that don’t concern you.',
        'كل مستخدم المفروض يشوف **الزراير اللي محتاجها بس**. الزراير الزيادة مش ببلاش: بتلخبط، وممكن تدوس عليها غلط، وبتتغير لأسباب ملكش دعوة بيها.',
      ),
      analogy: t('One **fat remote** for TV + AC + lights, split into **three small remotes** — TV, AC, LIGHTS. “Small, focused interfaces.”', 'ريموت **تخين** واحد للتلفزيون والتكييف والنور، متقسم لـ **تلات ريموتات صغيرة** — TV وAC وLIGHTS. “Interfaces صغيرة ومركّزة.”'),
    },

    part(t('Interface segregation in automotive software', 'فصل الـ interfaces في سوفتوير العربيات')),
    {
      kind: 'versus',
      left: { title: '“Fat” interface', icon: 'boxes', tone: 'rose' },
      right: { title: 'Segregated interfaces', icon: 'blocks', tone: 'teal' },
      rows: [
        { aspect: 'Shape', left: t('Describes **every kind of implementer** in one interface.', 'بيوصف **كل أنواع الـ implementers** في interface واحد.'), right: t('Small, focused interfaces built around **specific client needs**.', 'interfaces صغيرة ومركّزة مبنية حوالين **احتياج كل client**.') },
        { aspect: 'Implementers', left: t('Forced into **dummy methods** (`throw`, `return null`).', 'متجبرين على **methods وهمية** (`throw` و`return null`).'), right: t('Provide **only what they truly support**.', 'بيقدّموا **اللي بيدعموه فعلًا بس**.') },
        { aspect: 'Change impact', left: t('Changes force **recompilation and re-testing across all clients**.', 'التعديلات بتجبر **recompile وre-testing لكل الـ clients**.'), right: t('Changes affect **only the clients using that contract**.', 'التعديلات بتأثر **بس على الـ clients اللي بتستخدم العقد ده**.') },
      ],
    },
    {
      kind: 'cards',
      title: t('Why this matters in automotive', 'ليه ده مهم في العربيات'),
      columns: 3,
      items: [
        { icon: 'shield', title: 'Mixed criticality', tone: 'blue', body: t('A **QM** (non-safety) IVI app must **never** depend on an interface exposing **ASIL-rated motion control**.', 'تطبيق IVI من نوع **QM** (مش متعلق بالسلامة) **عمره ما** يعتمد على interface فيه **تحكم في الحركة متقيّم ASIL**.') },
        { icon: 'lock', title: 'Cybersecurity (ISO/SAE 21434)', tone: 'rose', body: t('Bloated interfaces **expand the attack surface**. Segregated interfaces enforce **least privilege**.', 'الـ interfaces التخينة **بتوسّع سطح الهجوم**. والـ interfaces المفصولة بتطبّق **أقل صلاحية لازمة**.') },
        { icon: 'network', title: 'SOA & AUTOSAR Adaptive', tone: 'violet', body: t('Services are deployed as **fine-grained interfaces** (SOME/IP, DDS), avoiding vehicle “god-interfaces”.', 'الخدمات بتتنشر كـ **interfaces صغيرة** (SOME/IP وDDS)، بعيد عن “god-interfaces” في العربية.') },
      ],
    },
    {
      kind: 'definition',
      term: 'Least privilege',
      definition: t(
        'Give each component **only the access it needs** to do its job — nothing more. A smaller interface is literally fewer things an attacker can call.',
        'ادّي كل component **الصلاحية اللي محتاجها بس** عشان يعمل شغله — ولا حاجة زيادة. والـ interface الأصغر معناه حرفيًا حاجات أقل المهاجم يقدر ينادي عليها.',
      ),
    },

    part(t('Violation: the “fat” VehicleOperator', 'المخالفة: VehicleOperator التخين')),
    {
      kind: 'definition',
      term: 'Level 3 automation',
      definition: t(
        'The car can drive itself in some conditions, but a human must be ready to **take over** — so control is handed between the human and the autonomous stack.',
        'العربية تقدر تسوق نفسها في ظروف معينة، بس الإنسان لازم يكون جاهز **ياخد التحكم** — فالتحكم بيتنقل بين الإنسان ونظام القيادة الذاتية.',
      ),
    },
    {
      kind: 'code',
      title: 'VehicleOperator.java — the god-interface',
      verdict: 'bad',
      highlight: [7, 8, 9, 12, 13],
      code: `public interface VehicleOperator {
    // Motion control
    void steer(double angleDeg);
    void accelerate(double mps2);
    void brake(double mps2);
    // Driver monitoring (DMS)
    double getDrowsinessLevel();
    GazeDirection getGazeDirection();
    boolean areHandsOnWheel();
    // Software lifecycle
    HealthStatus runSelfDiagnosis();
    void installOtaUpdate(SoftwarePackage pkg);
}`,
      notes: [
        t('**The smelly god-interface:** motion actuators, biometric driver monitoring and OTA deployment bundled into one bloated interface.', '**الـ god-interface اللي ريحته وحشة:** محركات الحركة، ومراقبة السواق البيومترية، وتنزيل الـ OTA كلهم متلمين في interface واحد منفوخ.'),
      ],
    },
    {
      kind: 'code',
      title: 'Both implementations are forced into fakes',
      verdict: 'bad',
      highlight: [4, 6, 12, 13, 14],
      code: `public class HumanDriverModel implements VehicleOperator {
    public void steer(double a)              { /* read steering-wheel input */ }
    public double getDrowsinessLevel()       { return dmsCamera.estimateDrowsiness(); }
    public HealthStatus runSelfDiagnosis()   { return null; }  // humans have no self-diagnosis!
    public void installOtaUpdate(SoftwarePackage p) {
        throw new UnsupportedOperationException();             // cannot OTA-update a human!
    }
}

public class AutomatedDrivingStack implements VehicleOperator {
    public void steer(double a)              { /* trajectory controller output */ }
    public HealthStatus runSelfDiagnosis()   { /* watchdog, sensor checks */ }
    public double getDrowsinessLevel()       { return 0.0; }   // AI "never gets tired"?
    public GazeDirection getGazeDirection()  { return null; }  // throws NullPointerException!
    public boolean areHandsOnWheel()         { return false; } // triggers false hands-off alarm!
}`,
      notes: [
        t('Every fake (`null`, `0.0`, `false`, `throw`) is a lie a client may believe. Note the link to LSP: these implementations don’t really honour the interface.', 'كل تزييف (`null` و`0.0` و`false` و`throw`) كدبة ممكن client يصدّقها. ولاحظ الربط بالـ LSP: الـ implementations دي مش محترمة الـ interface بجد.'),
      ],
    },

    part(t('The dangers of interface pollution', 'أخطار تلوّث الـ interface')),
    {
      kind: 'table',
      caption: t('Client dependency analysis', 'تحليل اعتماد الـ clients'),
      headers: ['Client', 'Truly needs…', 'Forced to depend on…', 'Risk exposure'],
      rows: [
        [t('DriverMonitoringSystem'), t('Drowsiness, gaze, hands', 'النعاس، النظر، الإيدين'), t('The entire interface, including OTA', 'الـ interface كله، ومعاه الـ OTA'), t('Re-tested on OTA refactors', 'بيتعاد اختباره مع أي تعديل في الـ OTA')],
        [t('VehicleMotionController'), t('Steer, accelerate, brake', 'دركسيون، تسارع، فرامل'), t('DMS & OTA maintenance', 'صيانة الـ DMS والـ OTA'), t('Safety-critical code churn', 'تعديلات مستمرة في كود حرج للسلامة')],
        [t('OtaUpdateManager'), t('Install update, diagnostics', 'تنزيل التحديث، التشخيص'), t('Motion actuators (`steer`, `brake`)', 'محركات الحركة (`steer` و`brake`)'), t('**Severe security vulnerability**', '**ثغرة أمنية خطيرة**')],
      ],
    },
    {
      kind: 'cards',
      title: t('Critical architectural hazards', 'أخطار معمارية حرجة'),
      columns: 3,
      items: [
        { icon: 'bug', title: 'Silent logic bugs', tone: 'amber', body: t('`areHandsOnWheel() == false` returned by the AD stack triggers a **spurious emergency alert**.', '`areHandsOnWheel() == false` اللي بيرجّعها نظام القيادة الذاتية بتشغّل **إنذار طوارئ كداب**.') },
        { icon: 'skull', title: 'Cybersecurity attack surface', tone: 'rose', body: t('The **OTA manager can invoke steering and braking** primitives directly (ISO/SAE 21434).', '**مدير الـ OTA يقدر ينادي على الدركسيون والفرامل** مباشرة (ISO/SAE 21434).') },
        { icon: 'refresh', title: 'Verification coupling', tone: 'violet', body: t('Changing DMS gaze-tracking formats triggers **recompilation and safety re-certification of motion controllers**!', 'تغيير شكل تتبع النظر في الـ DMS بيعمل **recompile وإعادة اعتماد سلامة لمتحكمات الحركة**!') },
      ],
    },

    part(t('Applied: client-specific interfaces', 'التطبيق: interfaces لكل client')),
    {
      kind: 'code',
      title: 'Split the monolith into focused contracts',
      verdict: 'good',
      highlight: [1, 7, 13, 17],
      code: `public interface MotionControl {          // client: VehicleMotionController (ASIL-rated)
    void steer(double angleDeg);
    void accelerate(double mps2);
    void brake(double mps2);
}

public interface AttentionMonitorable {   // client: DriverMonitoringSystem
    double getDrowsinessLevel();
    GazeDirection getGazeDirection();
    boolean areHandsOnWheel();
}

public interface SelfDiagnosable {        // client: health monitoring / safety supervisor
    HealthStatus runSelfDiagnosis();
}

public interface OtaUpdatable {           // client: OtaUpdateManager
    void installOtaUpdate(SoftwarePackage pkg);
}`,
    },
    {
      kind: 'code',
      title: 'Operators implement only what they support; clients depend only on what they use',
      verdict: 'good',
      highlight: [1, 5, 10, 14, 18],
      code: `public class HumanDriverModel implements MotionControl, AttentionMonitorable {
    /* Pure human behavior: no fake OTA or diagnostics */
}

public class AutomatedDrivingStack implements MotionControl, SelfDiagnosable, OtaUpdatable {
    /* Pure AD stack behavior: no fake eyes or hands */
}

public class DriverMonitoringSystem {
    public void check(AttentionMonitorable driver) { /* AD stack cannot even be passed here */ }
}

public class OtaUpdateManager {
    public void update(OtaUpdatable target, SoftwarePackage pkg) { /* cannot see steer()/brake() */ }
}

public class VehicleMotionController {
    public void apply(MotionControl operator) { /* works with human OR AD stack cleanly (LSP) */ }
}`,
    },
    {
      kind: 'diagram',
      id: 'isp-split',
      title: t('Who implements what, who uses what', 'مين بيعمل implement لإيه، ومين بيستخدم إيه'),
      caption: t(
        'Each interface has exactly one kind of client. The human implements two interfaces, the AD stack three — and both fit `MotionControl`.',
        'كل interface ليه نوع client واحد بالظبط. الإنسان بيعمل implement لاتنين، ونظام القيادة الذاتية لتلاتة — والاتنين بيركبوا على `MotionControl`.',
      ),
    },

    part(t('Safety & architectural wins', 'المكاسب في السلامة والمعمار')),
    {
      kind: 'table',
      caption: t('What we gained', 'كسبنا إيه'),
      headers: ['Problem before', 'Architecture now'],
      rows: [
        [t('Dummy returns (`null`, `0.0`, `false`) and exceptions'), t('Completely eliminated; enforced by **compiler type safety**.', 'اختفوا تمامًا؛ والـ **compiler** هو اللي بيضمن ده.')],
        [t('Spurious hands-off alarms'), t('The AD stack is **not** `AttentionMonitorable`; a **compile error** if mis-wired.', 'نظام القيادة الذاتية **مش** `AttentionMonitorable`؛ ولو اتوصّل غلط يطلع **compile error**.')],
        [t('OTA manager could access steering / braking'), t('The OTA manager sees only `OtaUpdatable`; **minimal attack surface**.', 'مدير الـ OTA شايف `OtaUpdatable` بس؛ **أقل سطح هجوم**.')],
        [t('DMS changes forced motion re-verification'), t('Isolated interfaces change on **independent lifecycles**.', 'الـ interfaces المفصولة بتتغير **كل واحد في وقته**.')],
      ],
    },
    {
      kind: 'callout',
      tone: 'key',
      title: t('Autonomous handover (Level 3)', 'تسليم التحكم (Level 3)'),
      body: t(
        'Transferring control between the human and the autonomous stack becomes seamless: `VehicleMotionController` simply switches **which `MotionControl` instance** it receives. Clean, type-safe and **LSP-compliant**.',
        'نقل التحكم بين الإنسان ونظام القيادة الذاتية بقى سلس: `VehicleMotionController` بيبدّل بس **أنهي `MotionControl`** بيستلمه. نضيف، وآمن في الأنواع، و**متوافق مع الـ LSP**.',
      ),
    },
  ],
  keyTerms: [
    { term: 'Interface Segregation Principle (ISP)', definition: t('Clients should not be forced to depend on methods they do not use.', 'الـ clients ميتجبروش يعتمدوا على methods مش بيستخدموها.') },
    { term: 'Fat (god) interface', definition: t('One interface describing every kind of implementer (VehicleOperator: motion + DMS + OTA).', 'interface واحد بيوصف كل أنواع الـ implementers (VehicleOperator: حركة + DMS + OTA).') },
    { term: 'Dummy implementation', definition: t('A forced fake: return null / 0.0 / false or throw UnsupportedOperationException.', 'تزييف إجباري: return null / 0.0 / false أو throw UnsupportedOperationException.') },
    { term: 'Mixed criticality', definition: t('QM and ASIL code in one system; a QM app must never depend on an interface exposing ASIL motion control.', 'كود QM وASIL في نفس السيستم؛ وتطبيق QM عمره ما يعتمد على interface فيه تحكم حركة ASIL.') },
    { term: 'Attack surface / least privilege', definition: t('Bloated interfaces expand what an attacker can reach; segregated ones grant only needed access.', 'الـ interfaces التخينة بتوسّع اللي المهاجم يوصله؛ والمفصولة بتدّي الصلاحية اللازمة بس.') },
    { term: 'Client-specific interfaces', definition: t('MotionControl, AttentionMonitorable, SelfDiagnosable, OtaUpdatable — each with one client.', 'MotionControl وAttentionMonitorable وSelfDiagnosable وOtaUpdatable — كل واحد ليه client واحد.') },
    { term: 'Verification coupling', definition: t('A change in one area (DMS gaze format) forcing re-verification of an unrelated one (motion control).', 'تعديل في حتة (شكل النظر في الـ DMS) بيجبر إعادة تحقق في حتة مالهاش علاقة (التحكم في الحركة).') },
    { term: 'Level 3 handover', definition: t('Switching control between human and AD stack by passing a different MotionControl instance.', 'تبديل التحكم بين الإنسان ونظام القيادة الذاتية بإنك تمرّر MotionControl مختلف.') },
  ],
  recap: [
    t('ISP: no client depends on methods it doesn’t use; many client-specific interfaces beat one general-purpose one (remotes).', 'الـ ISP: مفيش client يعتمد على methods مش بيستخدمها؛ وinterfaces كتير خاصة أحسن من واحد عام (الريموتات).'),
    t('In cars: mixed criticality (QM vs ASIL), least privilege for cybersecurity, fine-grained SOA services (SOME/IP, DDS).', 'في العربيات: خلط مستويات السلامة (QM وASIL)، وأقل صلاحية للأمن السيبراني، وخدمات SOA صغيرة (SOME/IP وDDS).'),
    t('Fat VehicleOperator forces fakes: human returns null / throws on OTA; AD stack returns 0.0, null, false.', 'الـ VehicleOperator التخين بيجبر على التزييف: الإنسان بيرجّع null / بيرمي في الـ OTA؛ ونظام القيادة بيرجّع 0.0 وnull وfalse.'),
    t('Hazards: false hands-off alarms, OTA manager can steer/brake, DMS changes re-certify motion control.', 'الأخطار: إنذارات كدابة، مدير الـ OTA يقدر يلف الدركسيون ويفرمل، وتعديلات الـ DMS بتعيد اعتماد التحكم في الحركة.'),
    t('Fix: MotionControl, AttentionMonitorable, SelfDiagnosable, OtaUpdatable. Human = Motion + Attention; AD stack = Motion + SelfDiag + OTA.', 'الحل: MotionControl وAttentionMonitorable وSelfDiagnosable وOtaUpdatable. الإنسان = Motion + Attention؛ ونظام القيادة = Motion + SelfDiag + OTA.'),
    t('Wins: no dummies (compiler-enforced), minimal attack surface, independent lifecycles, clean Level 3 handover.', 'المكاسب: مفيش تزييف (الـ compiler بيضمن)، أقل سطح هجوم، كل interface في وقته، وتسليم Level 3 نضيف.'),
  ],
}
