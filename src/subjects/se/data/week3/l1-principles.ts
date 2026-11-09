import type { Lesson } from '../../types'
import { part, t } from '../helpers'

/** Slides 1–7: the week's paradigm, the agenda, what a design principle is, why cars make it urgent, the OO recap and the SOLID map. */
export const principles: Lesson = {
  id: 'w3-principles',
  weekId: 'week-3',
  order: 1,
  title: 'Design Principles & the SOLID Map',
  shortTitle: 'Principles & SOLID Map',
  slides: [1, 2, 3, 4, 5, 6, 7],
  minutes: 14,
  tldr: t(
    'A **design principle** is a tool that makes code more **maintainable, flexible or extensible**. Car software lives 10–15+ years, changes constantly, has many variants and must be re-verified for safety — so every change must stay **small and easy to verify**. **SOLID** turns familiar OO ideas into five checkable principles: **S**ingle Responsibility, **O**pen–Closed, **L**iskov Substitution, **I**nterface Segregation, **D**ependency Inversion.',
    'الـ **design principle** أداة بتخلّي الكود **أسهل في الصيانة وأمرن وأسهل في التوسعة**. سوفتوير العربيات بيعيش 10–15 سنة وأكتر، وبيتغير على طول، وليه نسخ كتير، ولازم يتراجع أمانه بعد كل تعديل — فلازم كل تغيير يفضل **صغير وسهل التحقق منه**. والـ **SOLID** بتحوّل أفكار الـ OO اللي تعرفها لخمس مبادئ تقدر تقيس عليهم: **S**ingle Responsibility و**O**pen–Closed و**L**iskov Substitution و**I**nterface Segregation و**D**ependency Inversion.',
  ),
  blocks: [
    {
      kind: 'memorize',
      label: 'Core paradigm of Week 3',
      text: 'Good design principles keep the impact of each change small and easy to verify.',
      note: t(
        'Keep this sentence in mind for the whole week: every principle below is just a different way to make a change **touch fewer classes** and **need less re-testing**.',
        'خلّي الجملة دي في دماغك طول الأسبوع: كل مبدأ جاي ما هو إلا طريقة مختلفة إن التغيير **يلمس classes أقل** و**يحتاج re-testing أقل**.',
      ),
    },
    {
      kind: 'callout',
      tone: 'note',
      title: t('Where this week comes from', 'الأسبوع ده جاي منين'),
      body: t('This week builds on *Head First OOA&D* (Ch. 8), R. C. Martin’s *Agile Software Development* (2002) and *Clean Architecture* (Ch. 7–11), with every example set in **automotive software**: **ADAS** (driver-assistance: braking, lane keeping…) and **IVI** (in-vehicle infotainment: media, navigation).', 'الأسبوع ده مبني على *Head First OOA&D* (فصل 8) وكتاب R. C. Martin *Agile Software Development* (2002) و*Clean Architecture* (فصول 7–11)، وكل الأمثلة على **سوفتوير العربيات**: **ADAS** (مساعدة السواق: فرامل، ثبات في الحارة…) و**IVI** (الترفيه والمعلومات جوّه العربية: ميديا، ملاحة).'),
    },
    {
      kind: 'callout',
      tone: 'note',
      title: t('One new book in the library', 'كتاب جديد في المكتبة'),
      body: t(
        'Same reference list as before, plus **[HFOOAD]** — *Head First Object-Oriented Analysis and Design* (1st Ed.), Brett McLaughlin, Gary Pollice & David West, O’Reilly, 2007, ISBN 978-0596008673. This week reads **HFOOAD Ch. 8** and **CleanArch Ch. 7–11**.',
        'نفس قايمة المراجع، وزيادة عليها **[HFOOAD]** — *Head First Object-Oriented Analysis and Design* (الطبعة الأولى)، تأليف Brett McLaughlin وGary Pollice وDavid West، دار O’Reilly، سنة 2007، ISBN 978-0596008673. وقراءات الأسبوع ده: **HFOOAD فصل 8** و**CleanArch فصول 7–11**.',
      ),
    },
    {
      kind: 'table',
      caption: t('The agenda — one running car example per principle', 'الأجندة — مثال عربيات لكل مبدأ'),
      headers: ['#', 'Topic', 'Automotive running example'],
      rows: [
        [t('1'), t('What is a design principle?'), t('—')],
        [t('2'), t('**S** — Single Responsibility'), t('ADAS `FrontCamera` ECU · IVI media-library search', 'ECU الكاميرا الأمامية في الـ ADAS · البحث في مكتبة الأغاني في الـ IVI')],
        [t('3'), t('**O** — Open–Closed'), t('ADAS feature manager (AEB, LKA, ACC …)', 'مدير مزايا الـ ADAS (AEB وLKA وACC …)')],
        [t('4'), t('**L** — Liskov Substitution'), t('`OccupancyGrid` → `OccupancyGrid3D`', '`OccupancyGrid` ← `OccupancyGrid3D`')],
        [t('5'), t('Inheritance vs delegation'), t('Occupancy-grid refactoring', 'إعادة تصميم الـ occupancy grid')],
        [t('6'), t('**I** — Interface Segregation'), t('`VehicleOperator`: human driver vs autonomous driving stack', '`VehicleOperator`: سواق بشري ضد نظام القيادة الذاتية')],
        [t('7'), t('**D** — Dependency Inversion'), t('Sensor fusion ↔ radar / camera drivers', 'دمج الحساسات ↔ drivers الرادار والكاميرا')],
        [t('8'), t('Summary & references'), t('—')],
      ],
    },

    part(t('What is a design principle?', 'يعني إيه design principle؟')),
    {
      kind: 'memorize',
      label: 'Definition',
      text: 'A design principle is a basic tool or technique that can be applied to designing or writing code to make that code more maintainable, flexible, or extensible.',
      source: 'Head First OOA&D',
    },
    {
      kind: 'idea',
      title: 'Why cars make design principles urgent',
      icon: 'car',
      tone: 'blue',
      text: t(
        'A phone app that is badly designed costs money. A car’s software that is badly designed costs money **and** safety certifications — and it must survive for more than a decade.',
        'تطبيق موبايل متصمم وحش بيكلّف فلوس. إنما سوفتوير عربية متصمم وحش بيكلّف فلوس **و** شهادات أمان — ولازم يعيش أكتر من عشر سنين.',
      ),
      analogy: t(
        'Think of a car as a phone you cannot replace for 15 years, that receives updates over the air, comes in 40 versions, and needs a safety inspector to approve every single update.',
        'تخيّل العربية موبايل مينفعش تغيّره 15 سنة، وبيجيله تحديثات من الهوا، وليه 40 نسخة، ومحتاج مفتش أمان يوافق على كل تحديث لوحده.',
      ),
    },
    {
      kind: 'cards',
      title: t('Automotive software challenges', 'تحديات سوفتوير العربيات'),
      columns: 4,
      items: [
        { icon: 'hourglass', title: 'Long lifecycles', tone: 'blue', body: t('Vehicle software is maintained for **10–15+ years** after start of production.', 'سوفتوير العربية بيتصان **10–15 سنة أو أكتر** بعد بداية الإنتاج.') },
        { icon: 'refresh', title: 'Constant change', tone: 'teal', body: t('**OTA updates**, new ADAS features, new sensor suppliers, new infotainment apps.', '**تحديثات OTA** (من الهوا)، ومزايا ADAS جديدة، وموردين حساسات جداد، وتطبيقات ترفيه جديدة.') },
        { icon: 'boxes', title: 'Variant explosion', tone: 'violet', body: t('One codebase serves many **models, trims, markets and sensor configurations**.', 'codebase واحد بيخدم **موديلات وفئات وأسواق وتركيبات حساسات** كتير.') },
        { icon: 'shield', title: 'Safety & compliance', tone: 'rose', body: t('**ISO 26262** (functional safety), **ISO/SAE 21434** (cybersecurity), **UN R155/R156**. Every change must be analyzed, re-verified and traced.', '**ISO 26262** (السلامة الوظيفية)، و**ISO/SAE 21434** (الأمن السيبراني)، و**UN R155/R156**. وكل تغيير لازم يتحلّل ويتراجع ويتوثّق.') },
      ],
    },
    {
      kind: 'callout',
      tone: 'key',
      title: t('The whole argument in one line', 'الحجة كلها في سطر'),
      body: t(
        '**Poor design = expensive, risky change.** Good design principles keep the impact of each change small and easy to verify.',
        '**Design وحش = تغيير غالي وخطر.** ومبادئ التصميم الكويسة بتخلّي أثر كل تغيير صغير وسهل التحقق منه.',
      ),
    },
    {
      kind: 'table',
      caption: t('Car vocabulary used all week (a reading aid)', 'مصطلحات العربيات اللي هتقابلها طول الأسبوع (مساعدة للفهم)'),
      headers: ['Term', 'Meaning'],
      rows: [
        [t('ECU'), t('Electronic Control Unit — one of the car’s many small computers.', 'وحدة تحكم إلكترونية — واحد من الكمبيوترات الصغيرة الكتير جوّه العربية.')],
        [t('ADAS'), t('Advanced Driver-Assistance Systems: AEB (emergency braking), LKA (lane keeping), ACC (adaptive cruise), BSD (blind spot), TSR (traffic-sign recognition).', 'أنظمة مساعدة السواق: AEB (فرامل طوارئ)، LKA (ثبات في الحارة)، ACC (مثبت سرعة ذكي)، BSD (النقطة العمياء)، TSR (قراءة إشارات المرور).')],
        [t('IVI · HUD'), t('In-vehicle infotainment (media, navigation) · head-up display projected on the windscreen.', 'نظام الترفيه والمعلومات (ميديا، ملاحة) · شاشة بتتعرض على الزجاج الأمامي.')],
        [t('OTA'), t('Over-the-air software update.', 'تحديث السوفتوير من الهوا.')],
        [t('ISO 26262 · ASIL · QM'), t('Functional-safety standard. **ASIL** A–D = how safety-critical a part is; **QM** = not safety-related.', 'معيار السلامة الوظيفية. **ASIL** من A لـ D = الجزء ده خطير على السلامة قد إيه؛ و**QM** = مالوش علاقة بالسلامة.')],
        [t('ISO/SAE 21434'), t('Automotive cybersecurity standard.', 'معيار الأمن السيبراني للعربيات.')],
        [t('DTC · DMS'), t('Diagnostic Trouble Code (stored fault) · Driver Monitoring System (drowsiness, gaze).', 'كود عطل متسجّل · نظام مراقبة السواق (النعاس، اتجاه النظر).')],
        [t('SIL · HIL'), t('Software-in-the-loop / hardware-in-the-loop testing with simulated sensors.', 'اختبار software-in-the-loop / hardware-in-the-loop بحساسات متمثّلة.')],
      ],
    },

    part(t('OO principles: a quick recap', 'مبادئ الـ OO: مراجعة سريعة')),
    {
      kind: 'table',
      caption: t('Four OO principles, each with a car example', 'أربع مبادئ OO، كل واحد بمثال عربيات'),
      headers: ['OO principle', 'Automotive example'],
      rows: [
        [t('Encapsulate what varies'), t('Hide supplier-specific radar protocols behind one `RadarSensor` abstraction.', 'خبّي بروتوكولات الرادار الخاصة بكل مورد ورا abstraction واحد اسمه `RadarSensor`.')],
        [t('Code to an interface, not an implementation'), t('The navigation app depends on `IPositionProvider`, not directly on a specific GNSS chip driver.', 'تطبيق الملاحة بيعتمد على `IPositionProvider`، مش على driver شريحة GNSS معينة.')],
        [t('Each class should have only one reason to change'), t('`LaneDetector` changes when lane-detection algorithms change, not when the logging format changes.', '`LaneDetector` بيتغير لما خوارزمية اكتشاف الحارة تتغير، مش لما شكل الـ logging يتغير.')],
        [t('Classes are about behavior and functionality'), t('An `AdaptiveCruiseControl` class is defined by what it **does** (keep distance, adjust speed), not the data it stores.', 'الـ class `AdaptiveCruiseControl` بيتعرّف باللي **بيعمله** (يحافظ على المسافة، يظبط السرعة)، مش بالداتا اللي شايلها.')],
      ],
    },
    {
      kind: 'callout',
      tone: 'insight',
      title: t('From ideas to a checklist', 'من أفكار لـ checklist'),
      body: t(
        'SOLID turns these foundational ideas into **five concrete principles** that you can **check or evaluate a design against**.',
        'الـ SOLID بتحوّل الأفكار الأساسية دي لـ **خمس مبادئ واضحة** تقدر **تقيس أو تقيّم أي design عليهم**.',
      ),
    },

    part(t('SOLID: five principles of OO design', 'SOLID: خمس مبادئ لتصميم الـ OO')),
    {
      kind: 'table',
      caption: t('The five principles in one line each', 'الخمس مبادئ، كل واحد في سطر'),
      headers: ['Letter', 'Principle', 'One-line meaning'],
      rows: [
        [t('S'), t('Single Responsibility Principle'), t('A class should have only one reason to change.', 'الـ class لازم يبقى ليه سبب واحد بس للتغيير.')],
        [t('O'), t('Open–Closed Principle'), t('Software should be open for extension, but closed for modification.', 'السوفتوير مفتوح للتوسعة، ومقفول للتعديل.')],
        [t('L'), t('Liskov Substitution Principle'), t('Subtypes must be substitutable for their base types.', 'الـ subtype لازم يقدر ياخد مكان الـ base type.')],
        [t('I'), t('Interface Segregation Principle'), t('Clients should not be forced to depend on methods they do not use.', 'الـ client ميتجبرش يعتمد على methods مش بيستخدمها.')],
        [t('D'), t('Dependency Inversion Principle'), t('Depend on abstractions, not on concrete implementations.', 'اعتمد على abstractions، مش على implementations محددة.')],
      ],
    },
    {
      kind: 'diagram',
      id: 'solid-temple',
      title: t('The SOLID temple', 'معبد الـ SOLID'),
      caption: t('SOLID drawn as a temple: the roof says **SOLID** and five columns — **SRP, OCP, LSP, ISP, DIP** — hold it up. Proposed by Robert C. Martin (“Uncle Bob”). Remove one pillar and the roof leans.', 'الـ SOLID مرسومة كمعبد: السقف مكتوب عليه **SOLID** وخمس عواميد — **SRP وOCP وLSP وISP وDIP** — شايلينه. واللي اقترحها Robert C. Martin (“Uncle Bob”). شيل عمود والسقف يميل.'),
    },
    {
      kind: 'hook',
      title: t('One question per letter', 'سؤال واحد لكل حرف'),
      phrase: 'S-O-L-I-D',
      letters: [
        { letter: 'S', word: 'Who asks me to change?' },
        { letter: 'O', word: 'New feature = new class?' },
        { letter: 'L', word: 'Can I swap it safely?' },
        { letter: 'I', word: 'Do I use all of it?' },
        { letter: 'D', word: 'Do I point to an abstraction?' },
      ],
      body: t('Ask these five questions about any class and you have reviewed it against SOLID.', 'اسأل الخمس أسئلة دول على أي class وتبقى راجعته على الـ SOLID.'),
    },
  ],
  keyTerms: [
    { term: 'Design principle', definition: t('A basic tool or technique applied to designing or writing code to make it more maintainable, flexible or extensible.', 'أداة أو تقنية أساسية بتتطبق في التصميم أو كتابة الكود عشان يبقى أسهل في الصيانة وأمرن وأسهل في التوسعة.') },
    { term: 'Week 3 core paradigm', definition: t('Good design principles keep the impact of each change small and easy to verify.', 'مبادئ التصميم الكويسة بتخلّي أثر كل تغيير صغير وسهل التحقق منه.') },
    { term: 'Variant explosion', definition: t('One codebase serving many models, trims, markets and sensor configurations.', 'codebase واحد بيخدم موديلات وفئات وأسواق وتركيبات حساسات كتير.') },
    { term: 'ISO 26262', definition: t('The automotive functional-safety standard; every change must be analyzed, re-verified and traced.', 'معيار السلامة الوظيفية للعربيات؛ كل تغيير لازم يتحلّل ويتراجع ويتوثّق.') },
    { term: 'ISO/SAE 21434', definition: t('The automotive cybersecurity standard.', 'معيار الأمن السيبراني للعربيات.') },
    { term: 'Encapsulate what varies', definition: t('Hide the parts that change (e.g. supplier radar protocols) behind a stable abstraction.', 'خبّي الأجزاء اللي بتتغير (زي بروتوكولات الرادار) ورا abstraction ثابت.') },
    { term: 'Code to an interface', definition: t('Depend on an interface (`IPositionProvider`), not a concrete implementation (a GNSS chip driver).', 'اعتمد على interface (`IPositionProvider`)، مش على implementation محدد (driver شريحة GNSS).') },
    { term: 'SOLID', definition: t('Single Responsibility, Open–Closed, Liskov Substitution, Interface Segregation, Dependency Inversion — R. C. Martin (2002).', 'Single Responsibility وOpen–Closed وLiskov Substitution وInterface Segregation وDependency Inversion — R. C. Martin (2002).') },
  ],
  recap: [
    t('Paradigm: good design principles keep the impact of each change small and easy to verify.', 'الفكرة الأساسية: مبادئ التصميم الكويسة بتخلّي أثر كل تغيير صغير وسهل التحقق.'),
    t('Design principle = a tool/technique that makes code more maintainable, flexible or extensible.', 'الـ design principle = أداة بتخلّي الكود أسهل في الصيانة وأمرن وأسهل في التوسعة.'),
    t('Car challenges: 10–15+ year lifecycles, constant change (OTA), variant explosion, safety & compliance (ISO 26262, ISO/SAE 21434, UN R155/R156).', 'تحديات العربيات: عمر 10–15+ سنة، تغيير مستمر (OTA)، نسخ كتير، سلامة والتزام (ISO 26262 وISO/SAE 21434 وUN R155/R156).'),
    t('OO recap: encapsulate what varies, code to an interface, one reason to change, classes are about behavior.', 'مراجعة الـ OO: خبّي اللي بيتغير، اعتمد على interface، سبب واحد للتغيير، الـ classes عن السلوك.'),
    t('SOLID (R. C. Martin, 2002): S one reason to change · O open for extension, closed for modification · L subtypes substitutable · I no unused methods · D depend on abstractions.', 'الـ SOLID (R. C. Martin، 2002): S سبب واحد · O مفتوح للتوسعة مقفول للتعديل · L الـ subtype يقدر ياخد المكان · I مفيش methods مش مستخدمة · D اعتمد على abstractions.'),
  ],
}
