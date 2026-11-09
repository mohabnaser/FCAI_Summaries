import type { Lesson } from '../../types'
import { part, t } from '../helpers'

/** Slides 20–27: OCP, the ADAS feature manager before/after, OCP's pragmatic limits, OCP via Strategy, inheritance vs delegation. */
export const ocp: Lesson = {
  id: 'w3-ocp',
  weekId: 'week-3',
  order: 4,
  title: 'O — Open–Closed: Add Features Without Touching Verified Code',
  shortTitle: 'O · Open–Closed',
  slides: [20, 21, 22, 23, 24, 25, 26, 27],
  minutes: 16,
  tldr: t(
    'Software should be **open for extension, closed for modification**: new behaviour = **new code**, never edits to tested code. The ADAS manager’s `switch` on feature names forces an edit (and a safety re-verification) for every new feature. Put the varying part behind an interface (`AdasFunction`) and each feature becomes a new class. OCP is achieved by **inheritance/polymorphism** (compile-time plug-ins) or **delegation/Strategy** (runtime swapping). It is never 100% — changes are confined to the **composition root**.',
    'السوفتوير لازم يبقى **مفتوح للتوسعة ومقفول للتعديل**: سلوك جديد = **كود جديد**، مش تعديل في كود متجرّب. الـ `switch` اللي في مدير الـ ADAS على أسامي المزايا بيجبرك تعدّل (وتعيد التحقق من السلامة) مع كل ميزة جديدة. حط الجزء اللي بيتغير ورا interface (`AdasFunction`) وكل ميزة تبقى class جديد. والـ OCP بيتحقق بـ **inheritance/polymorphism** (plug-ins وقت الـ compile) أو **delegation/Strategy** (تبديل وقت التشغيل). وعمره ما بيبقى 100% — التعديلات بتتحصر في الـ **composition root**.',
  ),
  blocks: [
    part(t('The principle', 'المبدأ')),
    {
      kind: 'memorize',
      label: 'Open–Closed Principle',
      text: 'Software entities (classes, modules, functions) should be open for extension, but closed for modification.',
    },
    {
      kind: 'versus',
      left: { title: 'Open for extension', icon: 'sparkles', tone: 'teal' },
      right: { title: 'Closed for modification', icon: 'lock', tone: 'blue' },
      rows: [
        {
          aspect: 'Means',
          left: t('You **can add new behavior** to meet new requirements.', '**تقدر تضيف سلوك جديد** عشان متطلبات جديدة.'),
          right: t('You add it **without changing existing, tested source code**.', 'وبتضيفه **من غير ما تغيّر كود موجود ومتجرّب**.'),
        },
      ],
    },
    {
      kind: 'idea',
      title: 'Swap the attachment, not the motor',
      icon: 'wrench',
      tone: 'teal',
      text: t(
        'The stable core is designed with a **socket** where new pieces plug in. New needs = new pieces.',
        'الجزء الثابت متصمم بـ **فتحة** القطع الجديدة بتتركب فيها. احتياج جديد = قطعة جديدة.',
      ),
      analogy: t('A hand mixer with a whisk, a beater and a dough hook. When you change attachments, **you do not need to change the mixer’s engine**.', 'خلاط يدوي ليه مضرب، وخفاقة، وخطاف عجين. لما تغيّر القطعة **مش محتاج تغيّر موتور الخلاط**.'),
    },

    part(t('Violation: the ADAS feature manager', 'المخالفة: مدير مزايا الـ ADAS')),
    {
      kind: 'code',
      title: 'AdasFeatureManager.java — before',
      verdict: 'bad',
      highlight: [4, 5, 8, 11, 14],
      code: `public class AdasFeatureManager {
    public void runCycle(List<String> activeFeatures, EnvironmentModel env) {
        for (String feature : activeFeatures) {
            switch (feature) {
                case "AEB":    // Autonomous Emergency Braking
                    if (env.timeToCollision() < 1.5) { brakeSystem.requestFullBraking(); }
                    break;
                case "LKA":    // Lane Keeping Assist
                    if (env.isDriftingOutOfLane()) { steering.applyCorrectiveTorque(env.laneOffset()); }
                    break;
                case "ACC":    // Adaptive Cruise Control
                    powertrain.setTargetSpeed(computeFollowingSpeed(env.leadVehicle()));
                    break;
                // TODO: add BSD, TSR, ... for the next model year
            }
        }
    }
}`,
      notes: [
        t('Every feature’s logic lives inside one `switch` on **string names**. The `TODO` line is the confession: the next model year means editing this class again.', 'منطق كل ميزة عايش جوّه `switch` واحد على **أسامي strings**. وسطر الـ `TODO` اعتراف صريح: الموديل الجاي معناه تعديل الـ class ده تاني.'),
      ],
    },
    {
      kind: 'table',
      caption: t('What happens when product management asks for something new?', 'إيه اللي يحصل لما الـ product management تطلب حاجة جديدة؟'),
      headers: ['New requirement', 'Direct impact on AdasFeatureManager'],
      rows: [
        [t('Add Blind Spot Detection (BSD)'), t('Edit `AdasFeatureManager`: add another `case`.', 'عدّل `AdasFeatureManager`: زوّد `case` كمان.')],
        [t('Add Traffic Sign Recognition (TSR) via OTA'), t('Edit `AdasFeatureManager` **again**.', 'عدّل `AdasFeatureManager` **تاني**.')],
        [t('Market variant without LKA'), t('Add `if (variant == …)` branches cluttering the core dispatch.', 'زوّد فروع `if (variant == …)` تكركب منطق التوزيع الأساسي.')],
      ],
    },
    {
      kind: 'callout',
      tone: 'warning',
      title: t('The safety hazard (ISO 26262)', 'خطر السلامة (ISO 26262)'),
      body: t(
        'Modifying verified classes forces **full regression testing** and **invalidates previously achieved safety sign-offs**. The class is *open for modification and closed for extension* — the exact **opposite** of OCP.',
        'تعديل classes اتراجعت بيجبرك على **regression testing كامل** و**بيلغي موافقات السلامة اللي خدتها قبل كده**. الـ class ده *مفتوح للتعديل ومقفول للتوسعة* — **عكس** الـ OCP بالظبط.',
      ),
    },

    part(t('Applied: put each feature behind an abstraction', 'التطبيق: حط كل ميزة ورا abstraction')),
    {
      kind: 'code',
      title: 'AdasFunction + AdasFeatureManager — after',
      verdict: 'good',
      highlight: [1, 17],
      code: `public interface AdasFunction {
    String id();
    boolean isAvailable(VehicleConfig config);
    void execute(EnvironmentModel env, ActuatorRequests out);
}

public class AdasFeatureManager {
    private final List<AdasFunction> functions;

    public AdasFeatureManager(List<AdasFunction> installed, VehicleConfig cfg) {
        this.functions = installed.stream()
            .filter(f -> f.isAvailable(cfg))
            .toList();
    }

    public void runCycle(EnvironmentModel env, ActuatorRequests out) {
        for (AdasFunction f : functions) f.execute(env, out); // polymorphic dispatch
    }
}`,
    },
    {
      kind: 'code',
      title: 'Features plug in as NEW classes',
      verdict: 'good',
      highlight: [12],
      code: `public class EmergencyBraking implements AdasFunction {
    public String id() { return "AEB"; }
    public boolean isAvailable(VehicleConfig c) { return c.hasRadar(); }
    public void execute(EnvironmentModel env, ActuatorRequests out) {
        if (env.timeToCollision() < 1.5) out.requestBrake();
    }
}
public class LaneKeepAssist implements AdasFunction { /* LKA */ }
public class AdaptiveCruise implements AdasFunction { /* ACC */ }

// NEW: added without touching the manager
public class BlindSpotDetection implements AdasFunction { /* BSD */ }`,
      notes: [
        t('`isAvailable(config)` replaces the `if (variant == …)` branches: a feature decides for itself whether this car can run it (e.g. AEB needs a radar).', '`isAvailable(config)` بدل فروع `if (variant == …)`: كل ميزة بتقرر بنفسها العربية دي تقدر تشغّلها ولا لأ (زي إن الـ AEB محتاج رادار).'),
      ],
    },
    {
      kind: 'diagram',
      id: 'ocp-plugin',
      title: t('Closed core, open sockets', 'قلب مقفول، وفتحات مفتوحة'),
      caption: t(
        'The manager only knows `AdasFunction`. Adding BSD is a new class that implements it — the verified manager is never re-opened.',
        'المدير مش عارف غير `AdasFunction`. وإضافة BSD معناها class جديد بيعمل implement ليه — والمدير اللي اتراجع عمره ما بيتفتح تاني.',
      ),
    },
    {
      kind: 'table',
      caption: t('Impact now', 'الأثر دلوقتي'),
      headers: ['Requirement change', 'Impact now'],
      rows: [
        [t('Add BSD / TSR (via OTA)'), t('Write one new class and register it. `AdasFeatureManager` is **unchanged**.', 'اكتب class جديد واحد وسجّله. `AdasFeatureManager` **مبيتغيرش**.')],
        [t('Market variant without LKA'), t('`isAvailable(config)` returns `false`. **Zero branching** inside the manager.', '`isAvailable(config)` بترجّع `false`. **ولا فرع** جوّه المدير.')],
        [t('Typo in a feature name'), t('**Compile-time safety:** features are strongly-typed interfaces, not string literals.', '**أمان وقت الـ compile:** المزايا interfaces متحددة النوع، مش strings.')],
      ],
    },
    {
      kind: 'callout',
      tone: 'key',
      title: t('Verification efficiency', 'كفاءة التحقق'),
      body: t(
        'Verification and safety sign-off focus **exclusively on the new feature class**. The core feature manager is closed to modification.',
        'التحقق وموافقة السلامة بيركزوا **على class الميزة الجديدة بس**. والمدير الأساسي مقفول للتعديل.',
      ),
    },
    {
      kind: 'callout',
      tone: 'note',
      title: t('The pragmatic reality of OCP', 'واقعية الـ OCP'),
      body: t(
        '**OCP is never 100% absolute:** registering new classes modifies a **composition root** (DI container, factory or config file). The goal is **boundary containment** — confine changes strictly to the configuration edges while keeping verified algorithms pristine.',
        '**الـ OCP عمره ما بيبقى 100%:** تسجيل classes جديدة بيعدّل في **composition root** (DI container أو factory أو ملف config). الهدف هو **حصر التعديل عند الحدود** — التعديلات تبقى في أطراف الإعدادات بس، والخوارزميات اللي اتراجعت تفضل نضيفة.',
      ),
    },

    part(t('OCP through delegation: IVI navigation routing', 'الـ OCP بالـ delegation: مسارات الملاحة في الـ IVI')),
    {
      kind: 'code',
      title: 'NavigationService + RoutingStrategy',
      verdict: 'good',
      highlight: [8, 15],
      code: `// Stable abstraction
public interface RoutingStrategy {
    Route calculate(Position from, Position to, MapData map, VehicleState state);
}

// Closed for modification
public class NavigationService {
    private RoutingStrategy strategy;

    public NavigationService(RoutingStrategy initial) { this.strategy = initial; }

    public void setStrategy(RoutingStrategy s) { this.strategy = s; } // dynamic runtime swap

    public Route navigate(Position from, Position to, MapData map, VehicleState state) {
        return strategy.calculate(from, to, map, state);
    }
}

// Concrete routing strategies
public class FastestRoute    implements RoutingStrategy { /* minimize travel time */ }
public class EcoRoute        implements RoutingStrategy { /* minimize energy / fuel */ }
public class AvoidTollsRoute implements RoutingStrategy { /* secondary roads only */ }

// NEW: plugs in without altering the navigation service
public class EvChargingAwareRoute implements RoutingStrategy { /* plan charging stops from battery SOC */ }`,
      notes: [
        t('The driver toggles “Eco” on the screen → `setStrategy(new EcoRoute())`. The service never changes; only the object it delegates to.', 'السواق يدوس “Eco” على الشاشة ← `setStrategy(new EcoRoute())`. الـ service عمره ما بيتغير؛ اللي بيتغير الـ object اللي بيسلّمه الشغل.'),
      ],
    },

    part(t('Inheritance vs delegation for OCP', 'Inheritance ولا delegation للـ OCP')),
    {
      kind: 'table',
      caption: t('Two ways to stay open for extension', 'طريقتين تفضل بيهم مفتوح للتوسعة'),
      headers: ['Dimension', 'Inheritance / polymorphism', 'Delegation (Strategy pattern)'],
      rows: [
        [t('Mechanism'), t('A new subtype is plugged into an execution framework (`AdasFunction`).', 'subtype جديد بيتركب في framework التنفيذ (`AdasFunction`).'), t('A new strategy object is injected / delegated to (`RoutingStrategy`).', 'object strategy جديد بيتحقن / بيتسلّمله الشغل (`RoutingStrategy`).')],
        [t('Binding time'), t('Build / compile / configuration time.', 'وقت الـ build / الـ compile / الإعدادات.'), t('Dynamic runtime swapping (the driver toggles the mode).', 'تبديل وقت التشغيل (السواق بيغيّر الوضع).')],
        [t('Coupling'), t('Subtype tied to the base type’s lifecycle.', 'الـ subtype مربوط بدورة حياة الـ base type.'), t('Loose: the service only knows `RoutingStrategy`.', 'خفيف: الـ service مش عارف غير `RoutingStrategy`.')],
        [t('Pattern'), t('Template Method / polymorphic plug-in.', 'Template Method / plug-in بالـ polymorphism.'), t('Strategy pattern.', 'Strategy pattern.')],
      ],
    },
    {
      kind: 'memorize',
      label: 'Key insight',
      text: 'In both paradigms, new behavior = new code. The existing, production-verified service is never modified.',
    },
    {
      kind: 'myths',
      items: [
        {
          myth: t('“Closed for modification” means the code can never change.', '“مقفول للتعديل” يعني الكود عمره ما يتغير.'),
          fact: t('Bugs still get fixed. It means **new features** arrive as new code, and wiring changes stay at the **composition root**.', 'الـ bugs بتتصلّح عادي. المقصود إن **المزايا الجديدة** تيجي ككود جديد، وتعديلات التوصيل تفضل في الـ **composition root**.'),
        },
        {
          myth: t('“OCP needs inheritance.”', '“الـ OCP لازمه inheritance.”'),
          fact: t('Delegation (Strategy) achieves OCP too — and allows swapping behaviour at runtime.', 'الـ delegation (Strategy) بيحقق الـ OCP برضه — وبيسمح بتبديل السلوك وقت التشغيل.'),
        },
      ],
    },
  ],
  keyTerms: [
    { term: 'Open–Closed Principle (OCP)', definition: t('Software entities should be open for extension, but closed for modification.', 'الـ entities لازم تبقى مفتوحة للتوسعة ومقفولة للتعديل.') },
    { term: 'Open for extension', definition: t('You can add new behavior to meet new requirements.', 'تقدر تضيف سلوك جديد لمتطلبات جديدة.') },
    { term: 'Closed for modification', definition: t('…without changing existing, tested source code.', '…من غير ما تغيّر كود موجود ومتجرّب.') },
    { term: 'Polymorphic dispatch', definition: t('Calling `f.execute()` on an interface and letting each concrete class run its own behavior — replaces the switch.', 'إنك تنادي `f.execute()` على interface وكل class يشغّل سلوكه — بدل الـ switch.') },
    { term: 'AdasFunction', definition: t('The abstraction (id, isAvailable, execute) every ADAS feature implements; new features are new classes.', 'الـ abstraction (id وisAvailable وexecute) اللي كل ميزة ADAS بتعمله implement؛ والمزايا الجديدة classes جديدة.') },
    { term: 'Composition root', definition: t('The one place (DI container, factory, config) where concrete classes are registered/wired; OCP confines change here.', 'المكان الواحد (DI container أو factory أو config) اللي بتتسجل/تتوصل فيه الـ classes؛ والـ OCP بيحصر التعديل هنا.') },
    { term: 'Boundary containment', definition: t('Confining changes to configuration edges while verified algorithms stay untouched.', 'حصر التعديلات في أطراف الإعدادات والخوارزميات المتراجعة تفضل زي ما هي.') },
    { term: 'Strategy pattern', definition: t('Delegate a varying algorithm to an interchangeable object (RoutingStrategy) that can be swapped at runtime.', 'سلّم الخوارزمية اللي بتتغير لـ object قابل للتبديل (RoutingStrategy) وقت التشغيل.') },
    { term: 'Template Method / polymorphic plug-in', definition: t('The inheritance route to OCP: new subtypes plugged into a framework, bound at build/config time.', 'طريق الـ inheritance للـ OCP: subtypes جديدة بتتركب في framework، وبتتحدد وقت الـ build/config.') },
  ],
  recap: [
    t('OCP: open for extension, closed for modification (mixer: swap attachments, not the engine).', 'الـ OCP: مفتوح للتوسعة مقفول للتعديل (الخلاط: غيّر القطعة مش الموتور).'),
    t('Before: a switch on feature strings — BSD, TSR or a variant without LKA all mean editing the manager and redoing safety sign-off.', 'قبل: switch على أسامي المزايا — BSD أو TSR أو نسخة من غير LKA كلهم معناهم تعديل المدير وإعادة موافقة السلامة.'),
    t('After: AdasFunction (id, isAvailable, execute); features are new classes; isAvailable handles variants; compile-time safety.', 'بعد: AdasFunction (id وisAvailable وexecute)؛ المزايا classes جديدة؛ isAvailable بيحل موضوع النسخ؛ وأمان وقت الـ compile.'),
    t('Verification focuses only on the new class. OCP is never 100%: changes are contained at the composition root.', 'التحقق بيركز على الـ class الجديد بس. والـ OCP مش 100%: التعديل محصور في الـ composition root.'),
    t('OCP via delegation: NavigationService + RoutingStrategy (Fastest, Eco, AvoidTolls, new EvChargingAware), swapped at runtime.', 'الـ OCP بالـ delegation: NavigationService + RoutingStrategy (Fastest وEco وAvoidTolls والجديد EvChargingAware)، بتتبدل وقت التشغيل.'),
    t('Inheritance (compile/config time, Template Method) vs delegation (runtime, Strategy): in both, new behaviour = new code.', 'الـ inheritance (وقت compile/config، Template Method) ضد الـ delegation (وقت التشغيل، Strategy): وفي الاتنين، سلوك جديد = كود جديد.'),
  ],
}
