import type { Lesson } from '../../types'
import { part, t } from '../helpers'

/** Slide 61 plus a synthesis of the week: the five principles side by side and how they reinforce each other. */
export const together: Lesson = {
  id: 'w3-together',
  weekId: 'week-3',
  order: 8,
  title: 'SOLID Together: One Page to Remember',
  shortTitle: 'SOLID Together',
  slides: [61],
  minutes: 8,
  tldr: t(
    'The five principles are one idea seen from five angles: **keep each change small and easy to verify**. SRP splits by actor, OCP adds features as new classes, LSP keeps those classes safely swappable, ISP keeps interfaces narrow, DIP points every dependency at the policy’s abstraction. Week 3 reads **CleanArch Ch. 7–11** and **HFOOAD Ch. 8**.',
    'الخمس مبادئ فكرة واحدة من خمس زوايا: **خلّي كل تغيير صغير وسهل التحقق منه**. الـ SRP بيقسّم حسب الـ actor، والـ OCP بيضيف المزايا كـ classes جديدة، والـ LSP بيخلّي الـ classes دي تتبدل بأمان، والـ ISP بيخلّي الـ interfaces ضيقة، والـ DIP بيوجّه كل اعتماد ناحية الـ abstraction بتاع الـ policy. وقراءات أسبوع 3: **CleanArch فصول 7–11** و**HFOOAD فصل 8**.',
  ),
  blocks: [
    part(t('The five principles side by side', 'الخمس مبادئ جنب بعض')),
    {
      kind: 'table',
      caption: t('Principle · question · smell · fix · this week’s car example', 'المبدأ · السؤال · الريحة · الحل · مثال العربية'),
      headers: ['Principle', 'Ask yourself', 'Smell', 'Fix', 'Week 3 example'],
      rows: [
        [t('S — SRP'), t('How many actors can ask me to change?', 'كام actor ممكن يطلب مني أتغير؟'), t('God class, Feature Envy, “itself” test fails', 'God class، Feature Envy، اختبار “itself” بيفشل'), t('Split by actor; move logic to the information expert', 'قسّم حسب الـ actor؛ وانقل المنطق لصاحب المعلومة'), t('FrontCamera → LaneDetector, DEM, HudRenderer…; TrackFilter.matches()', 'FrontCamera ← LaneDetector وDEM وHudRenderer…؛ TrackFilter.matches()')],
        [t('O — OCP'), t('Does a new feature mean editing old code?', 'ميزة جديدة معناها تعديل كود قديم؟'), t('switch / if-chains on type names or variants', 'switch / سلاسل if على أسامي الأنواع أو النسخ'), t('Put what varies behind an interface; new code = new class', 'حط اللي بيتغير ورا interface؛ كود جديد = class جديد'), t('AdasFunction plug-ins; RoutingStrategy', 'plug-ins بـ AdasFunction؛ RoutingStrategy')],
        [t('L — LSP'), t('Can every caller use my subtype without knowing?', 'أي caller يقدر يستخدم الـ subtype من غير ما يعرف؟'), t('instanceof checks, dummy overrides, ambiguous inherited methods', 'فحوصات instanceof، override وهمي، methods موروثة معناها مش واضح'), t('Keep the contract or delegate instead of inheriting', 'احترم العقد أو استخدم delegation بدل الوراثة'), t('OccupancyGrid3D contains 2D layers; DrivableSpaceMap', 'OccupancyGrid3D جواه طبقات 2D؛ DrivableSpaceMap')],
        [t('I — ISP'), t('Do my clients use every method I expose?', 'الـ clients بتوعي بيستخدموا كل method أنا عارضها؟'), t('return null / 0.0 / false, UnsupportedOperationException', 'return null / 0.0 / false، وUnsupportedOperationException'), t('Split into client-specific interfaces', 'قسّم لـ interfaces لكل client'), t('MotionControl, AttentionMonitorable, SelfDiagnosable, OtaUpdatable', 'MotionControl وAttentionMonitorable وSelfDiagnosable وOtaUpdatable')],
        [t('D — DIP'), t('Does my policy `new` or import concrete details?', 'الـ policy بتاعتي بتعمل `new` أو import لتفاصيل محددة؟'), t('Hard-coded drivers, byte decoding in core logic, untestable without hardware', 'drivers مكتوبة جوّه الكود، فك bytes في المنطق الأساسي، مينفعش يتجرّب من غير هاردوير'), t('Policy owns the interface; adapters implement it; wire at a composition root', 'الـ policy تملك الـ interface؛ والـ adapters تعمله implement؛ والتوصيل في composition root'), t('ObjectSensor + supplier adapters + SimulatedSensor', 'ObjectSensor + adapters الموردين + SimulatedSensor')],
      ],
    },

    part(t('How the principles reinforce each other', 'المبادئ بتقوّي بعض إزاي')),
    {
      kind: 'cards',
      columns: 2,
      items: [
        { icon: 'route', title: 'SRP → OCP', tone: 'blue', body: t('Isolating what varies (TrackFilter) is what lets you add capabilities without modifying existing classes.', 'عزل اللي بيتغير (TrackFilter) هو اللي بيخليك تضيف قدرات من غير ما تعدّل classes موجودة.') },
        { icon: 'shield', title: 'OCP needs LSP', tone: 'teal', body: t('Plug-ins only work if every `AdasFunction` / adapter can be substituted safely for the abstraction — otherwise “extension” brings surprises.', 'الـ plug-ins مبتشتغلش غير لو كل `AdasFunction` / adapter يقدر ياخد مكان الـ abstraction بأمان — وإلا “التوسعة” هتجيب مفاجآت.') },
        { icon: 'refresh', title: 'ISP + LSP', tone: 'violet', body: t('Narrow interfaces let both the human and the AD stack honestly implement `MotionControl` — the Level 3 handover is LSP-compliant.', 'الـ interfaces الضيقة بتخلّي الإنسان ونظام القيادة الذاتية يعملوا implement لـ `MotionControl` بصدق — فتسليم الـ Level 3 متوافق مع الـ LSP.') },
        { icon: 'up', title: 'DIP enables OCP (and protects SRP)', tone: 'rose', body: t('Without DIP, sensor fusion broke SRP and OCP; with it, adding LiDAR is “extended, not modified”.', 'من غير الـ DIP، دمج الحساسات كسر SRP وOCP؛ ومعاه، إضافة LiDAR بقت “اتوسّع مش اتعدّل”.') },
      ],
    },

    part(t('Summary & readings', 'الملخص والقراءات')),
    {
      kind: 'cards',
      title: t('Core axioms', 'المسلّمات الأساسية'),
      columns: 3,
      numbered: true,
      items: [
        { title: 'SRP', tone: 'blue', body: t('One reason to change, mapped to **one actor**.', 'سبب واحد للتغيير، مربوط بـ **actor واحد**.') },
        { title: 'OCP', tone: 'teal', body: t('Open for extension, **closed for modification**.', 'مفتوح للتوسعة، **مقفول للتعديل**.') },
        { title: 'LSP', tone: 'violet', body: t('Subtypes preserve the **full contract** — favour delegation.', 'الـ subtypes بتحافظ على **العقد كله** — وفضّل الـ delegation.') },
        { title: 'ISP', tone: 'amber', body: t('Clients **never depend on unused methods**.', 'الـ clients **عمرهم ما يعتمدوا على methods مش مستخدمة**.') },
        { title: 'DIP', tone: 'rose', body: t('High-level policy **owns domain abstractions**.', 'الـ policy العالية **تملك الـ abstractions بتاعة الدومين**.') },
        { title: 'Readings', tone: 'lime', body: t('**CleanArch** Ch. 7, 8, 9, 10, 11 · **HFOOAD** Ch. 8.', '**CleanArch** فصول 7 و8 و9 و10 و11 · **HFOOAD** فصل 8.') },
      ],
    },
    {
      kind: 'hook',
      title: t('SOLID as five analogies', 'الـ SOLID في خمس تشبيهات'),
      phrase: 'Spork · Mixer · Powerlifter · Remotes · Socket',
      letters: [
        { letter: 'S', word: 'Fork & spoon, not a spork' },
        { letter: 'O', word: 'Swap mixer attachments, not the engine' },
        { letter: 'L', word: 'A powerlifter is still a healthy sportsman' },
        { letter: 'I', word: 'Three small remotes, not one fat one' },
        { letter: 'D', word: 'Lamp plugs into a socket, not the plant' },
      ],
    },
    {
      kind: 'memorize',
      label: 'The week in one sentence',
      text: 'Good design principles keep the impact of each change small and easy to verify.',
      note: t(
        'If you can explain how each of the five principles serves this sentence, you understand Week 3.',
        'لو تقدر تشرح إزاي كل مبدأ من الخمسة بيخدم الجملة دي، يبقى فهمت أسبوع 3.',
      ),
    },
  ],
  keyTerms: [
    { term: 'SRP in one line', definition: t('One reason to change, mapped to one actor.', 'سبب واحد للتغيير، مربوط بـ actor واحد.') },
    { term: 'OCP in one line', definition: t('Open for extension, closed for modification: new behaviour = new code.', 'مفتوح للتوسعة مقفول للتعديل: سلوك جديد = كود جديد.') },
    { term: 'LSP in one line', definition: t('Subtypes preserve the full contract; favour delegation.', 'الـ subtypes بتحافظ على العقد كله؛ وفضّل الـ delegation.') },
    { term: 'ISP in one line', definition: t('Clients never depend on unused methods.', 'الـ clients عمرهم ما يعتمدوا على methods مش مستخدمة.') },
    { term: 'DIP in one line', definition: t('High-level policy owns domain abstractions; details implement them.', 'الـ policy العالية تملك الـ abstractions؛ والتفاصيل بتعملها implement.') },
  ],
  recap: [
    t('SRP: one actor. OCP: new class, not edits. LSP: full contract or delegate. ISP: narrow interfaces. DIP: policy owns the abstraction.', 'SRP: actor واحد. OCP: class جديد مش تعديل. LSP: العقد كله أو delegation. ISP: interfaces ضيقة. DIP: الـ policy تملك الـ abstraction.'),
    t('They reinforce each other: SRP → OCP, OCP needs LSP, ISP + LSP enable the L3 handover, DIP enables OCP.', 'بيقوّوا بعض: SRP ← OCP، والـ OCP محتاج LSP، وISP + LSP بيسمحوا بتسليم L3، والـ DIP بيسمح بالـ OCP.'),
    t('Analogies: spork, mixer, powerlifter, remotes, lamp socket.', 'التشبيهات: الـ spork، الخلاط، رافع الأثقال، الريموتات، بريزة اللمبة.'),
    t('Readings: CleanArch Ch. 7–11, HFOOAD Ch. 8.', 'القراءات: CleanArch فصول 7–11، وHFOOAD فصل 8.'),
  ],
}
