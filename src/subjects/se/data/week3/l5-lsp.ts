import type { Lesson } from '../../types'
import { part, t } from '../helpers'

/** Slides 28–38 and 59: LSP, contracts, the OccupancyGrid3D failure, the delegation fix, inheritance vs delegation, Dilemma 2. */
export const lsp: Lesson = {
  id: 'w3-lsp',
  weekId: 'week-3',
  order: 5,
  title: 'L — Liskov Substitution: Subtypes Must Keep the Promise',
  shortTitle: 'L · Liskov Substitution',
  slides: [28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 59],
  minutes: 22,
  tldr: t(
    'A subtype must work **anywhere its base type works**, keeping every promise: **preconditions can’t be strengthened, postconditions can’t be weakened**. `OccupancyGrid3D extends OccupancyGrid` compiles fine, but the inherited `isFree(x, y)` has no honest meaning in 3D — it can miss a roof-height barrier (collision) or brake for an overhead sign (phantom braking). The fix: **delegation** (a 3D grid *contains* 2D layers) plus an explicit contract `isDrivable(x, y, vehicleHeight)`. Golden rule: **prefer delegation to inheritance**.',
    'الـ subtype لازم يشتغل **في أي مكان الـ base type بيشتغل فيه**، ويحافظ على كل وعد: **الـ preconditions متتشددش، والـ postconditions متضعفش**. `OccupancyGrid3D extends OccupancyGrid` بيعمل compile عادي، بس `isFree(x, y)` الموروثة مالهاش معنى صادق في الـ 3D — ممكن تفوّت حاجز على ارتفاع السقف (تصادم) أو تفرمل عشان يافطة فوق الطريق (phantom braking). والحل: **delegation** (الـ grid الـ 3D *جواه* طبقات 2D) وعقد واضح `isDrivable(x, y, vehicleHeight)`. والقاعدة الذهبية: **فضّل الـ delegation على الـ inheritance**.',
  ),
  blocks: [
    part(t('The principle', 'المبدأ')),
    {
      kind: 'memorize',
      label: 'Liskov Substitution Principle',
      text: 'Subtypes must be substitutable for their base types.',
    },
    {
      kind: 'memorize',
      label: 'Barbara Liskov (1987)',
      text: 'If S is a subtype of T, then objects of type T may be replaced with objects of type S without breaking the correctness of the program.',
    },
    {
      kind: 'idea',
      title: 'A subtype must still be what its parent promises',
      icon: 'users',
      tone: 'violet',
      text: t(
        'Code that was written for the base type must keep working — **without knowing** it received a subtype.',
        'الكود اللي اتكتب للـ base type لازم يفضل شغال — **من غير ما يعرف** إنه استلم subtype.',
      ),
      analogy: t('A **Sportsman** base type and a **Sportsman-Powerlifter** subtype. If “Sportsman” means *healthy*, the powerlifter must also be healthy — otherwise something is wrong with the class hierarchy.', 'base type اسمه **Sportsman** (رياضي) وsubtype اسمه **Sportsman-Powerlifter** (رافع أثقال). لو “رياضي” معناها *صحته كويسة*، يبقى رافع الأثقال لازم صحته كويسة برضه — وإلا يبقى فيه غلط في شجرة الوراثة.'),
    },

    part(t('Contracts & automotive safety', 'العقود والسلامة في العربيات')),
    {
      kind: 'versus',
      left: { title: 'Well-designed inheritance', icon: 'check', tone: 'teal' },
      right: { title: 'Misused inheritance', icon: 'x', tone: 'rose' },
      rows: [
        {
          aspect: 'Callers',
          left: t('Code written against the base type **keeps working with any subtype**.', 'الكود المكتوب على الـ base type **بيفضل شغال مع أي subtype**.'),
          right: t('Callers must **check the concrete type** or suffer surprising behaviour.', 'الـ callers لازم **يتأكدوا من النوع الحقيقي** أو يتفاجئوا بسلوك غريب.'),
        },
        {
          aspect: 'Subtype',
          left: t('Keeps **every promise** the base type makes.', 'بيحافظ على **كل وعد** الـ base type بيقدّمه.'),
          right: t('**Overrides, disables or reinterprets** inherited behaviour.', 'بـ **يغيّر أو يعطّل أو يفسّر بشكل تاني** السلوك الموروث.'),
        },
      ],
    },
    {
      kind: 'cards',
      title: t('Why this matters in automotive', 'ليه ده مهم في العربيات'),
      columns: 2,
      items: [
        { icon: 'layers', title: 'Base abstractions everywhere', tone: 'blue', body: t('Sensor fusion, path planning and safety monitors are written against base abstractions (`Sensor`, `OccupancyGrid`, `ObjectList`).', 'دمج الحساسات وتخطيط المسار ومراقبات السلامة كلهم مكتوبين على abstractions أساسية (`Sensor` و`OccupancyGrid` و`ObjectList`).') },
        { icon: 'alert', title: 'Quiet contract breaks are hazards', tone: 'rose', body: t('A subtype that quietly breaks contracts (**units, coordinate frames, value ranges**) is a safety hazard under ISO 26262.', 'subtype بيكسر العقد في السر (**الوحدات، أنظمة الإحداثيات، نطاق القيم**) ده خطر على السلامة في ISO 26262.') },
      ],
    },
    {
      kind: 'memorize',
      label: 'Contract rule',
      text: 'Preconditions cannot be strengthened in a subtype, and postconditions cannot be weakened.',
      note: t(
        '**Precondition** = what a method *demands* from the caller; a subtype may not demand more (e.g. suddenly needing a `z` coordinate). **Postcondition** = what it *promises* back; a subtype may not promise less (e.g. `isFree` no longer really answering “can the car drive here?”). Shortcut: **ask no more, deliver no less**.',
        'الـ **Precondition** = اللي الـ method *بيطلبه* من اللي بينادي؛ والـ subtype ميطلبش أكتر (زي إنه فجأة يحتاج إحداثي `z`). والـ **Postcondition** = اللي *بيوعد* بيه؛ والـ subtype ميوعدش بأقل (زي إن `isFree` مبقتش بتجاوب فعلًا على “العربية تقدر تعدّي هنا؟”). اختصار: **متطلبش أكتر، ومتسلّمش أقل**.',
      ),
    },

    part(t('Violation: OccupancyGrid → OccupancyGrid3D', 'المخالفة: OccupancyGrid ← OccupancyGrid3D')),
    {
      kind: 'definition',
      term: 'Occupancy grid',
      definition: t(
        'A map of the area around the car split into cells; each cell says whether it is **free** or **occupied** by an obstacle. 2D = seen from above; 3D adds **height layers** (from LiDAR point clouds).',
        'خريطة للمكان حوالين العربية متقسمة خانات؛ كل خانة بتقول هي **فاضية** ولا **مشغولة** بعائق. الـ 2D = من فوق؛ والـ 3D بيزوّد **طبقات ارتفاع** (من الـ point clouds بتاعة الـ LiDAR).',
      ),
    },
    {
      kind: 'code',
      title: 'OccupancyGrid3D extends OccupancyGrid — before',
      verdict: 'bad',
      highlight: [9, 15],
      code: `public class OccupancyGrid {
    public Cell getCell(int x, int y)                     { /* ... */ }
    public void markOccupied(Obstacle o, int x, int y)    { /* ... */ }
    public void clearCell(int x, int y)                   { /* ... */ }
    public List<Obstacle> getObstacles(int x, int y)      { /* ... */ }
    public boolean isFree(int x, int y)                   { /* ... */ }
}

public class OccupancyGrid3D extends OccupancyGrid {      // "a 3D grid IS-A grid"... right?
    public Cell getCell(int x, int y, int z)                    { /* ... */ }
    public void markOccupied(Obstacle o, int x, int y, int z)   { /* ... */ }
    public void clearCell(int x, int y, int z)                  { /* ... */ }
    public List<Obstacle> getObstacles(int x, int y, int z)     { /* ... */ }
    public boolean isFree(int x, int y, int z)                  { /* ... */ }
    // The inherited 2D methods are still present. What do they mean now?
}`,
    },
    {
      kind: 'code',
      title: 'PathPlanner.java — the code that breaks',
      verdict: 'bad',
      highlight: [4, 11],
      code: `public class PathPlanner {
    public boolean isCorridorFree(OccupancyGrid grid, List<GridPoint> path) {
        for (GridPoint p : path) {
            if (!grid.isFree(p.x(), p.y())) return false;   // which height layer does this check?
        }
        return true;
    }
}

OccupancyGrid grid = new OccupancyGrid3D(lidarPointCloud);  // compiles without errors
planner.isCorridorFree(grid, plannedPath);                  // is the result correct?`,
      notes: [
        t('**The core hazard:** the code compiles cleanly, yet the safety contract is destroyed at runtime. Does `isFree(x, y)` check only the road surface, all layers, or throw?', '**الخطر الأساسي:** الكود بيعمل compile نضيف، بس عقد السلامة بيتكسر وقت التشغيل. `isFree(x, y)` بتفحص سطح الطريق بس؟ ولا كل الطبقات؟ ولا بترمي exception؟'),
      ],
    },
    {
      kind: 'diagram',
      id: 'lsp-height',
      title: t('Why isFree(x, y) cannot be right in 3D', 'ليه isFree(x, y) مينفعش تبقى صح في الـ 3D'),
      caption: t(
        'One 2D question can’t describe a 3D world. Only a question that includes the **vehicle’s height** gives the safe answer for both the barrier and the gantry.',
        'سؤال 2D واحد مينفعش يوصف عالم 3D. السؤال الوحيد اللي بيدّي إجابة آمنة للحاجز وللكوبري هو اللي فيه **ارتفاع العربية**.',
      ),
    },
    {
      kind: 'table',
      caption: t('What went wrong 1 — inherited 2D methods have no coherent meaning in 3D', 'الغلط 1 — الـ methods الـ 2D الموروثة مالهاش معنى متماسك في الـ 3D'),
      headers: ['Inherited method', 'Possible meaning in OccupancyGrid3D', 'Consequence', 'For PathPlanner'],
      rows: [
        [t('isFree(x, y)'), t('Checks the ground layer (z = 0)', 'بتفحص طبقة الأرض (z = 0)'), t('A roof-height barrier is reported as free', 'حاجز على ارتفاع السقف بيتقال إنه فاضي'), t('**Collision hazard** (false negative)', '**خطر تصادم** (false negative)')],
        [t('isFree(x, y)'), t('Checks all height layers', 'بتفحص كل طبقات الارتفاع'), t('An overhead bridge / sign marks the lane blocked', 'كوبري / يافطة فوق الطريق بتقفل الحارة'), t('**Phantom braking** (false positive)', '**فرملة وهمية** (false positive)')],
        [t('isFree(x, y)'), t('Throws an exception', 'بترمي exception'), t('Breaks the base contract unconditionally', 'بتكسر عقد الـ base في كل الأحوال'), t('**Runtime crash** in the motion planner', '**crash وقت التشغيل** في مخطط الحركة')],
        [t('markOccupied(o, x, y)'), t('Writes to which layer?', 'بتكتب في أنهي طبقة؟'), t('Ambiguous destination', 'مكان مش واضح'), t('**Inconsistent** spatial map state', 'حالة خريطة **مش متسقة**')],
      ],
    },
    {
      kind: 'table',
      caption: t('What went wrong 2 — the subtype weakens the base type’s guarantees', 'الغلط 2 — الـ subtype بيضعّف ضمانات الـ base type'),
      headers: ['Base type (OccupancyGrid) guarantee', 'Subtype (OccupancyGrid3D) reality'],
      rows: [
        [t('`isFree(x, y)` answers: *can the vehicle drive through?*', '`isFree(x, y)` بتجاوب: *العربية تقدر تعدّي؟*'), t('The meaning becomes **ambiguous or invalid**.', 'المعنى بقى **مش واضح أو غلط**.')],
        [t('Every cell is addressed completely by `(x, y)`.', 'كل خانة بتتحدد بالكامل بـ `(x, y)`.'), t('Requires `(x, y, z)`; a 2D coordinate is **incomplete**.', 'محتاج `(x, y, z)`؛ والإحداثي الـ 2D **ناقص**.')],
        [t('Callers need zero knowledge of the concrete implementation.', 'الـ callers مش محتاجين يعرفوا أي حاجة عن النوع الحقيقي.'), t('Forces callers to check `if (grid instanceof OccupancyGrid3D)`.', 'بيجبر الـ callers يفحصوا `if (grid instanceof OccupancyGrid3D)`.')],
      ],
    },
    {
      kind: 'callout',
      tone: 'warning',
      title: t('3 — The compiler cannot protect you', '3 — الـ compiler مش هيحميك'),
      body: t(
        'Type signatures match perfectly, the code compiles without warnings, and isolated unit tests may pass. The failure only surfaces when the subtype is substituted into production workflows — **during live autonomous driving**.',
        'الـ signatures مطابقة تمامًا، والكود بيعمل compile من غير warnings، والـ unit tests المعزولة ممكن تعدّي. والفشل مبيظهرش غير لما الـ subtype يتحط في الشغل الحقيقي — **أثناء القيادة الذاتية فعلًا**.',
      ),
    },
    {
      kind: 'memorize',
      label: 'Axiom',
      text: '“IS-A” in everyday language ≠ “IS-SUBSTITUTABLE-FOR” in software architecture.',
      note: t(
        'A 3D grid is *a kind of map*, but it does **not** behave like a 2D occupancy grid. Before inheriting, test **behaviour**, not wording.',
        'الـ grid الـ 3D *نوع من الخرايط*، بس **مش** بيتصرف زي occupancy grid 2D. قبل ما تورث، اختبر **السلوك**، مش الكلام.',
      ),
    },

    part(t('The fix in three steps', 'الحل في تلات خطوات')),
    {
      kind: 'code',
      title: 'Step 1 — OccupancyGrid3D uses 2D grids instead of extending one',
      verdict: 'good',
      highlight: [1, 2, 6],
      code: `public class OccupancyGrid3D {                     // no longer "extends OccupancyGrid"
    private final List<OccupancyGrid> layers;      // one 2D grid per height band
    private final double layerHeightM;             // e.g. 0.25 m per layer

    public boolean isFree(int x, int y, int z) {
        return layers.get(z).isFree(x, y);         // delegate to the 2D layer
    }
    public void markOccupied(Obstacle o, int x, int y, int z) {
        layers.get(z).markOccupied(o, x, y);       // delegate
    }
    public OccupancyGrid getLayer(int z) { return layers.get(z); }
}`,
      notes: [
        t('**Result:** zero meaningless inherited `isFree(x, y)` methods. Every method has an unambiguous contract, and 2D logic is reused **by delegation without inheritance baggage**.', '**النتيجة:** مفيش ولا `isFree(x, y)` موروثة من غير معنى. كل method ليها عقد واضح، ومنطق الـ 2D بيتعاد استخدامه **بالـ delegation من غير شيلة الـ inheritance**.'),
      ],
    },
    {
      kind: 'code',
      title: 'Step 2 — an explicit contract that states the exact question',
      verdict: 'good',
      highlight: [2, 3],
      code: `public interface DrivableSpaceMap {
    // Contract: true ONLY if cell free up to vehicleHeightM + clearance
    boolean isDrivable(int x, int y, double vehicleHeightM);
}

public class Grid2DDrivableSpace implements DrivableSpaceMap {   // camera/radar line
    private final OccupancyGrid grid;                            // 2D: conservative
    public boolean isDrivable(int x, int y, double h) { return grid.isFree(x, y); }
}

public class Grid3DDrivableSpace implements DrivableSpaceMap {   // LiDAR line
    private final OccupancyGrid3D grid;
    public boolean isDrivable(int x, int y, double h) {
        int topLayer = grid.layerIndexFor(h + SAFETY_CLEARANCE_M);
        for (int z = 0; z <= topLayer; z++) {
            if (!grid.isFree(x, y, z)) return false;  // barrier at roof height → blocked
        }
        return true;                                  // overhead gantry above car → free
    }
}`,
    },
    {
      kind: 'code',
      title: 'Step 3 — safe substitution in path planning',
      verdict: 'good',
      highlight: [2, 3],
      code: `public class PathPlanner {                          // works with ANY implementation
    public boolean isCorridorFree(DrivableSpaceMap map, List<GridPoint> path, double vehicleHeightM) {
        return path.stream().allMatch(p -> map.isDrivable(p.x(), p.y(), vehicleHeightM));
    }
}`,
    },
    {
      kind: 'table',
      caption: t('What we gained', 'كسبنا إيه'),
      headers: ['Problem before', 'Architecture now'],
      rows: [
        [t('Missed barrier / phantom braking'), t('The contract explicitly specifies drivability **including vehicle clearance**.', 'العقد بيحدد صراحةً قابلية المرور **ومعاها خلوص العربية**.')],
        [t('`instanceof` checks in the planner'), t('**Zero.** Any `DrivableSpaceMap` substitutes transparently.', '**صفر.** أي `DrivableSpaceMap` بياخد المكان من غير ما حد يحس.')],
        [t('3D grid shoehorned into a 2D hierarchy'), t('Honest dimensional APIs; both implementations honour the **identical behavioural contract**.', 'APIs صادقة في أبعادها؛ والاتنين بيحترموا **نفس العقد السلوكي**.')],
      ],
    },
    {
      kind: 'callout',
      tone: 'key',
      title: t('Conservative default', 'الافتراض الحذر'),
      body: t(
        'The 2D implementation is **intentionally conservative**: without height data, **all obstacles block** — ensuring safety without risking missed collisions.',
        'الـ implementation الـ 2D **حذر عن قصد**: من غير داتا ارتفاع، **أي عائق بيقفل الطريق** — فالأمان مضمون من غير خطر تفويت تصادم.',
      ),
    },

    part(t('Inheritance vs delegation: when to use which', 'Inheritance ولا delegation: إمتى تستخدم أنهي')),
    {
      kind: 'cards',
      title: t('Three ways objects use other objects', 'تلات طرق الـ objects بتستخدم بيها objects تانية'),
      columns: 3,
      items: [
        { icon: 'handshake', title: 'Delegation', tone: 'blue', body: t('An object hands a task to a helper. It **uses behaviour without becoming that type**.', 'الـ object بيسلّم شغلانة لمساعد. **بيستخدم السلوك من غير ما يبقى من نفس النوع**.') },
        { icon: 'boxes', title: 'Composition', tone: 'violet', body: t('An object **owns** its parts; the parts have **no independent lifecycle** (`OccupancyGrid3D` owns its height layers).', 'الـ object **بيمتلك** أجزاءه؛ والأجزاء **مالهاش حياة مستقلة** (`OccupancyGrid3D` بيمتلك طبقات الارتفاع).') },
        { icon: 'network', title: 'Aggregation', tone: 'teal', body: t('An object **uses independent parts** (`SensorFusion` uses `RadarSensor` and `FrontCamera`, which live on their own).', 'الـ object **بيستخدم أجزاء مستقلة** (`SensorFusion` بيستخدم `RadarSensor` و`FrontCamera`، وهم عايشين لوحدهم).') },
      ],
    },
    {
      kind: 'versus',
      title: t('Decision matrix', 'جدول القرار'),
      left: { title: 'Use inheritance when…', icon: 'layers', tone: 'violet' },
      right: { title: 'Use delegation / composition when…', icon: 'handshake', tone: 'teal' },
      rows: [
        { aspect: 'Contract', left: t('The subtype preserves the **entire behavioural contract** of the base (LSP ✓).', 'الـ subtype بيحافظ على **العقد السلوكي كله** بتاع الـ base (LSP ✓).'), right: t('You only need **partial behaviour** of another class.', 'محتاج **جزء من سلوك** class تاني بس.') },
        { aspect: 'Runtime', left: t('The relationship is **static and immutable** at runtime.', 'العلاقة **ثابتة ومش بتتغير** وقت التشغيل.'), right: t('Behaviour must be **swapped dynamically** at runtime.', 'السلوك لازم **يتبدل** وقت التشغيل.') },
        { aspect: 'Example', left: t('`EmergencyBraking implements AdasFunction`', '`EmergencyBraking implements AdasFunction`'), right: t('`OccupancyGrid3D` contains `OccupancyGrid` layers', '`OccupancyGrid3D` جواه طبقات `OccupancyGrid`') },
      ],
    },
    {
      kind: 'memorize',
      label: 'Golden rule',
      text: 'Prefer delegation to inheritance. Before typing extends, ask: “Can every caller of the base type safely use my subtype without knowing it?” If not, delegate!',
    },

    part(t('Think & defend: the actuator slew-rate trap', 'فكّر ودافع: فخ معدل الصعود في الـ actuator')),
    {
      kind: 'dilemma',
      label: 'Think & Defend · Dilemma 2',
      title: 'LSP & behavioural contracts: the actuator slew-rate trap',
      scenario: t(
        'A Tier-1 supplier delivers an electronic braking actuator implementing `BrakeActuator` with `void applyBrakingForce(double kilonewtons)`. Physical fluid-pressure rise time limits the **slew rate to 50 kN/s**. During an AEB manoeuvre the trajectory planner demands an immediate step (**100 kN in 10 ms**). The driver **silently clamps** the rise rate without reporting an error. The supplier argues: “We implemented the interface cleanly and never threw an exception (OCP compliant).”',
        'مورد Tier-1 سلّم actuator فرامل إلكتروني بيعمل implement لـ `BrakeActuator` بـ `void applyBrakingForce(double kilonewtons)`. ووقت ارتفاع ضغط السائل فيزيائيًا بيحدد **معدل الصعود بـ 50 kN/s**. وأثناء فرملة طوارئ (AEB) مخطط المسار طلب قفزة فورية (**100 kN في 10 ms**). والـ driver **قصّ المعدل في السر** من غير ما يبلّغ بأي غلط. والمورد بيقول: “عملنا الـ interface صح ومرميناش أي exception (متوافق مع OCP).”',
      ),
      options: [
        { label: 'What the planner believes', tone: 'blue', text: t('100 kN is applied within 10 ms — stopping distance planned on that.', 'الـ 100 kN اتطبقوا خلال 10 ms — ومسافة الوقوف اتحسبت على كده.') },
        { label: 'What really happens', tone: 'rose', text: t('At 50 kN/s, reaching 100 kN takes **2 seconds** (only 0.5 kN after 10 ms) — silently.', 'بمعدل 50 kN/s، الوصول لـ 100 kN بياخد **ثانيتين** (0.5 kN بس بعد 10 ms) — من غير أي إنذار.') },
      ],
      question: 'Why is this a catastrophic LSP violation, and how must the contract be redesigned?',
      lens: [
        t('LSP is about **behaviour, not signatures**. “Compiles and throws no exception” proves nothing: the subtype **weakened the postcondition** (“the requested force is applied”) without telling anyone.', 'الـ LSP عن **السلوك، مش الـ signatures**. “بيعمل compile ومبيرميش exception” مش بيثبت حاجة: الـ subtype **ضعّف الـ postcondition** (“القوة المطلوبة اتطبقت”) من غير ما يقول لحد.'),
        t('The caller (planner) cannot substitute this actuator for the base type safely — it plans braking that never happens. A silent failure in AEB means a collision. And “OCP compliant” is the wrong principle: OCP is about extending without modifying, not about honouring contracts.', 'الـ caller (المخطط) ميقدرش يحط الـ actuator ده مكان الـ base type بأمان — بيخطط لفرملة مش هتحصل. وفشل صامت في الـ AEB معناه تصادم. و“متوافق مع OCP” مبدأ غلط في الموضوع ده: الـ OCP عن التوسعة من غير تعديل، مش عن احترام العقود.'),
        t('Redesign: make the physical limit **part of the contract** — e.g. expose capabilities (`maxSlewRateKNps()`), state the precondition (requests beyond the slew rate are not instantly achievable), and **report what was actually achieved** (return the applied force / a saturation status, or raise a fault) so the planner plans with real dynamics.', 'إعادة التصميم: خلّي الحد الفيزيائي **جزء من العقد** — مثلًا اعرض القدرات (`maxSlewRateKNps()`)، ووضّح الـ precondition (الطلبات اللي أسرع من معدل الصعود مش هتتحقق فورًا)، و**بلّغ باللي اتحقق فعلًا** (رجّع القوة المطبّقة / حالة تشبّع، أو ارفع fault) عشان المخطط يخطط على الديناميكا الحقيقية.'),
      ],
    },
  ],
  keyTerms: [
    { term: 'Liskov Substitution Principle (LSP)', definition: t('Subtypes must be substitutable for their base types without breaking program correctness (Barbara Liskov, 1987).', 'الـ subtypes لازم تقدر تاخد مكان الـ base types من غير ما صحة البرنامج تتكسر (Barbara Liskov، 1987).') },
    { term: 'Precondition / postcondition', definition: t('What a method requires from callers / what it promises back. Subtypes: no stronger preconditions, no weaker postconditions.', 'اللي الـ method بيطلبه / اللي بيوعد بيه. الـ subtypes: preconditions مش أشد، وpostconditions مش أضعف.') },
    { term: 'Occupancy grid', definition: t('A grid map marking each cell free or occupied; 3D adds height layers from LiDAR.', 'خريطة خانات كل خانة فاضية أو مشغولة؛ والـ 3D بيزوّد طبقات ارتفاع من الـ LiDAR.') },
    { term: 'False negative vs phantom braking', definition: t('isFree on the ground layer misses a roof-height barrier (collision); on all layers it brakes for an overhead sign (false positive).', 'isFree على طبقة الأرض بتفوّت حاجز على ارتفاع السقف (تصادم)؛ وعلى كل الطبقات بتفرمل عشان يافطة فوق (false positive).') },
    { term: '“IS-A” ≠ “IS-SUBSTITUTABLE-FOR”', definition: t('Everyday “is a kind of” does not prove behavioural substitutability.', '“نوع من” في الكلام العادي مش بيثبت إنه يقدر ياخد المكان في السلوك.') },
    { term: 'DrivableSpaceMap', definition: t('Explicit contract: isDrivable(x, y, vehicleHeightM) is true only if free up to vehicle height + clearance.', 'عقد صريح: isDrivable(x, y, vehicleHeightM) بترجّع true بس لو فاضي لحد ارتفاع العربية + الخلوص.') },
    { term: 'Conservative default', definition: t('Without height data the 2D implementation treats every obstacle as blocking.', 'من غير داتا ارتفاع، الـ 2D بيعتبر أي عائق قافل الطريق.') },
    { term: 'Composition vs aggregation', definition: t('Composition: owned parts with no independent lifecycle. Aggregation: uses independent parts.', 'الـ Composition: أجزاء مملوكة مالهاش حياة مستقلة. الـ Aggregation: بيستخدم أجزاء مستقلة.') },
    { term: 'Golden rule', definition: t('Prefer delegation to inheritance; inherit only if every caller can safely use the subtype unknowingly.', 'فضّل الـ delegation على الـ inheritance؛ وورّث بس لو أي caller يقدر يستخدم الـ subtype بأمان من غير ما يعرف.') },
  ],
  recap: [
    t('LSP: subtypes substitutable for base types (Liskov 1987). Sportsman → Powerlifter must still be “healthy”.', 'الـ LSP: الـ subtype ياخد مكان الـ base (Liskov 1987). الرياضي ← رافع الأثقال لازم يفضل “صحته كويسة”.'),
    t('Contract rule: preconditions not strengthened, postconditions not weakened — ask no more, deliver no less.', 'قاعدة العقد: الـ preconditions متتشددش والـ postconditions متضعفش — متطلبش أكتر ومتسلّمش أقل.'),
    t('OccupancyGrid3D extends OccupancyGrid: inherited isFree(x, y) means ground (collision), all layers (phantom braking) or throws (crash).', 'OccupancyGrid3D extends OccupancyGrid: الـ isFree(x, y) الموروثة يا إما الأرض (تصادم)، يا كل الطبقات (فرملة وهمية)، يا بترمي (crash).'),
    t('The compiler can’t help: signatures match, tests may pass; it fails during live driving. IS-A ≠ IS-SUBSTITUTABLE-FOR.', 'الـ compiler مش هيساعد: الـ signatures مطابقة والـ tests ممكن تعدّي؛ والفشل وقت القيادة. IS-A ≠ IS-SUBSTITUTABLE-FOR.'),
    t('Fix: 3D grid contains 2D layers (delegation) + DrivableSpaceMap.isDrivable(x, y, vehicleHeight); PathPlanner works with any implementation, no instanceof.', 'الحل: الـ grid الـ 3D جواه طبقات 2D (delegation) + DrivableSpaceMap.isDrivable(x, y, vehicleHeight)؛ والـ PathPlanner بيشتغل مع أي implementation من غير instanceof.'),
    t('Delegation / composition / aggregation. Inherit only when the full contract is kept and the relation is static; prefer delegation.', 'Delegation وcomposition وaggregation. ورّث بس لما العقد كله محفوظ والعلاقة ثابتة؛ وفضّل الـ delegation.'),
  ],
}
