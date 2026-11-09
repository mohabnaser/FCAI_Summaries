import type { Lesson } from '../../types'
import { part, t } from '../helpers'

/** Slides 19–25: C&C views, the concurrency view, UML component notation and the climate-control example. */
export const ccViews: Lesson = {
  id: 'w4-cc',
  weekId: 'week-4',
  order: 4,
  title: 'Component-and-Connector Views: The System While It Runs',
  shortTitle: 'C&C Views',
  slides: [19, 20, 21, 22, 23, 24, 25],
  minutes: 14,
  tldr: t(
    'C&C views show the **running** system: **components** (processes, clients, servers, data stores) and **connectors** (the interaction pathways: service invocation, message queues, event multicast, pipes). They answer runtime questions — what executes, what is shared, what is replicated, how data flows, what runs in parallel — so they serve **performance, security and availability**. In UML, components expose **provided (lollipop)** and **required (socket)** interfaces through **ports**.',
    'الـ C&C views بتورّي السيستم **وهو شغال**: **components** (processes وclients وservers وdata stores) و**connectors** (طرق التفاعل: service invocation وmessage queues وevent multicast وpipes). وبتجاوب أسئلة وقت التشغيل — إيه اللي بيتنفذ، إيه المشترك، إيه المتكرر، الداتا بتمشي إزاي، وإيه اللي يشتغل بالتوازي — فبتخدم الـ **performance والـ security والـ availability**. وفي الـ UML، الـ components بتعرض **provided interfaces (lollipop)** و**required interfaces (socket)** عن طريق **ports**.',
  ),
  blocks: [
    part(t('Components and connectors', 'الـ Components والـ Connectors')),
    {
      kind: 'versus',
      left: { title: 'Components', icon: 'server', tone: 'violet', tagline: t('The things that run', 'الحاجات اللي بتشتغل') },
      right: { title: 'Connectors', icon: 'network', tone: 'teal', tagline: t('How they interact', 'بيتفاعلوا إزاي') },
      rows: [
        { aspect: 'Examples', left: t('**Processes, clients, servers, data stores.**', '**Processes وclients وservers وdata stores.**'), right: t('**Service invocation, message queues, event multicast, pipes.**', '**Service invocation وmessage queues وevent multicast وpipes.**') },
        { aspect: 'Represent', left: t('Principal units of computation and data at runtime.', 'وحدات الحساب والداتا الأساسية وقت التشغيل.'), right: t('Possible **pathways of interaction**: communication links, protocols, information flows.', '**طرق التفاعل** الممكنة: روابط الاتصال، والبروتوكولات، وتدفق المعلومات.') },
      ],
      verdict: t(
        'Connectors “come to action” in **architectural styles** (Week 5): a style is largely a choice of components + connectors + rules.',
        'الـ connectors بتظهر “في الأكشن” في الـ **architectural styles** (أسبوع 5): الـ style أغلبه اختيار components + connectors + قواعد.',
      ),
    },
    {
      kind: 'idea',
      title: 'Connectors are first-class',
      icon: 'handshake',
      tone: 'teal',
      text: t(
        'In C&C views, *how* two parts talk is as important as the parts. A synchronous call and a message queue between the same two components give very different performance and availability.',
        'في الـ C&C views، *إزاي* جزئين بيتكلموا مهم زي الأجزاء نفسها. نداء متزامن وmessage queue بين نفس الـ components الاتنين بيدّوا performance وavailability مختلفين خالص.',
      ),
      analogy: t(
        'Two people can talk by phone (both must be free now) or by letters in a mailbox (each reads when ready). Same people, different “connector” — different behaviour.',
        'شخصين يقدروا يتكلموا بالتليفون (لازم الاتنين فاضيين دلوقتي) أو بجوابات في صندوق بريد (كل واحد يقرا لما يفضى). نفس الناس، و“connector” مختلف — فالسلوك مختلف.',
      ),
    },

    part(t('What C&C structures answer', 'الـ C&C structures بتجاوب على إيه')),
    {
      kind: 'list',
      title: t('Questions C&C structures help us answer', 'أسئلة الـ C&C structures بتساعدنا نجاوبها'),
      ordered: true,
      items: [
        t('What are the major **executing components** and how do they **interact**?', 'إيه أهم **الـ components اللي بتتنفذ** وبيتفاعلوا إزاي؟'),
        t('What are the major **shared data stores**?', 'إيه أهم **مخازن الداتا المشتركة**؟'),
        t('Which parts of the system are **replicated**?', 'أنهي أجزاء من السيستم **متكررة (replicated)**؟'),
        t('How does **data progress** through the system?', 'الداتا **بتمشي** في السيستم إزاي؟'),
        t('What parts of the system can **run in parallel**?', 'أنهي أجزاء تقدر **تشتغل بالتوازي**؟'),
      ],
    },
    {
      kind: 'asks',
      items: [
        { q: 'How can such structures be helpful? Performance?', a: t('You see what runs in parallel, where requests queue up and which connector is on the hot path → find **bottlenecks** and parallelism.', 'بتشوف إيه اللي بيشتغل بالتوازي، والطلبات بتتكدس فين، وأنهي connector على الطريق المزدحم ← تلاقي **الـ bottlenecks** وفرص التوازي.') },
        { q: 'Security?', a: t('You see **how data flows** between components and which connectors cross trust boundaries → where to authenticate, encrypt and check.', 'بتشوف **الداتا بتمشي إزاي** بين الـ components وأنهي connectors بتعدّي حدود الثقة ← فين تعمل authentication وتشفير وفحص.') },
        { q: 'Availability?', a: t('You see **which parts are replicated** and which single component everything depends on → spot **single points of failure**.', 'بتشوف **أنهي أجزاء متكررة** وأنهي component واحد الكل معتمد عليه ← تكتشف **نقط الفشل الوحيدة**.') },
      ],
    },
    {
      kind: 'definition',
      term: 'Concurrency view (a C&C view)',
      definition: t(
        'Lets the architect determine **opportunities for parallelism** and the locations where **resource contention** may occur. The units are **components**; the connectors are their **communication mechanisms**.',
        'بيخلّي المعماري يحدد **فرص التوازي** والأماكن اللي ممكن يحصل فيها **تزاحم على الموارد**. الوحدات **components**؛ والـ connectors هي **طرق الاتصال** بينهم.',
      ),
    },

    part(t('UML notation for C&C', 'رموز الـ UML للـ C&C')),
    {
      kind: 'diagram',
      id: 'uml-component',
      title: t('Ports, provided and required interfaces', 'الـ Ports والـ provided والـ required interfaces'),
      caption: t(
        'A component offers services through a **provided interface** (lollipop ○) and needs services through a **required interface** (socket ⊂), attached at **ports**. Example: *Order System* requires **CustomerLookup** (provided by *Customer Repository*) and **ProductAccessor** (provided by *Inventory System*).',
        'الـ component بيقدّم خدمات عن طريق **provided interface** (lollipop ○) ومحتاج خدمات عن طريق **required interface** (socket ⊂)، ومتوصلين على **ports**. مثال: *Order System* محتاج **CustomerLookup** (بيقدّمه *Customer Repository*) و**ProductAccessor** (بيقدّمه *Inventory System*).',
      ),
    },
    {
      kind: 'hook',
      title: t('Lollipop vs socket', 'Lollipop ولا socket'),
      phrase: 'Ball gives · Cup takes',
      body: t(
        'The **ball** (lollipop) is what a component **gives**; the **cup** (socket) is what it **needs**. Ball fits in cup = the connection works.',
        'الـ **كورة** (lollipop) هي اللي الـ component **بيدّيه**؛ والـ **كوباية** (socket) هي اللي **محتاجه**. الكورة تركب في الكوباية = التوصيل شغال.',
      ),
    },

    part(t('Example: vehicle climate control in two views', 'مثال: التكييف في العربية بـ viewين')),
    {
      kind: 'diagram',
      id: 'climate-views',
      title: t('Module view vs C&C view of the same system', 'module view ضد C&C view لنفس السيستم'),
      caption: t(
        '**Module view:** `Controller` (+start, +stop) works with `TemperatureSensor` (-senseData), `ReferenceModel` (setRequiredTemperature), `Display` (+display) and `Actuator` (+on, +off); `Cooler`, `Heater` and `Fan` (-speed) specialize `Actuator`. **C&C view:** the running `Controller` connects to `Sensor` (sense), `Actuator` (actuate) and `GUI` (display) — simplified relationships.',
        '**الـ Module view:** `Controller` (+start و+stop) بيشتغل مع `TemperatureSensor` (-senseData) و`ReferenceModel` (setRequiredTemperature) و`Display` (+display) و`Actuator` (+on و+off)؛ و`Cooler` و`Heater` و`Fan` (-speed) أنواع من `Actuator`. **الـ C&C view:** الـ `Controller` وهو شغال متوصل بـ `Sensor` (sense) و`Actuator` (actuate) و`GUI` (display) — علاقات مبسّطة.',
      ),
    },
    {
      kind: 'callout',
      tone: 'warning',
      title: t('Use lollipops, not arrows', 'استخدم lollipops مش أسهم'),
      body: t(
        'The plain arrows in the C&C example “**should be replaced by the correct lollipop notations**” — in a C&C view, connections are drawn with provided/required interfaces, not generic arrows. The diagram above already uses them.',
        'الأسهم العادية في مثال الـ C&C “**لازم تتبدل برموز الـ lollipop الصح**” — في الـ C&C view التوصيلات بتترسم بالـ provided/required interfaces، مش أسهم عامة. والرسمة اللي فوق مستخدماها فعلًا.',
      ),
    },
    {
      kind: 'versus',
      left: { title: 'Climate module view', icon: 'code', tone: 'blue' },
      right: { title: 'Climate C&C view', icon: 'activity', tone: 'violet' },
      rows: [
        { aspect: 'Shows', left: t('Classes, their methods/attributes, and **is-a** (Cooler, Heater, Fan → Actuator).', 'الـ classes بالـ methods والـ attributes، وعلاقة **is-a** (Cooler وHeater وFan ← Actuator).'), right: t('Runtime parts and **interactions** (sense, actuate, display).', 'الأجزاء وقت التشغيل و**التفاعلات** (sense وactuate وdisplay).') },
        { aspect: 'Helps with', left: t('Modifiability: add a new actuator type (e.g. a seat heater) as a new subclass.', 'الـ Modifiability: تضيف نوع actuator جديد (زي سخان كرسي) كـ subclass جديد.'), right: t('Performance and availability: what happens if the sensor stops responding?', 'الـ Performance والـ availability: إيه اللي يحصل لو الـ sensor بطّل يرد؟') },
      ],
    },
  ],
  keyTerms: [
    { term: 'Component (C&C)', definition: t('A runtime element: process, client, server, data store.', 'عنصر وقت التشغيل: process، client، server، data store.') },
    { term: 'Connector', definition: t('An interaction pathway: communication link, protocol, information flow — e.g. service invocation, message queue, event multicast, pipe.', 'طريق تفاعل: رابط اتصال، بروتوكول، تدفق معلومات — زي service invocation وmessage queue وevent multicast وpipe.') },
    { term: 'C&C questions', definition: t('Executing components and interactions, shared data stores, replication, data flow, parallelism.', 'الـ components اللي بتتنفذ وتفاعلاتها، مخازن الداتا المشتركة، التكرار، تدفق الداتا، التوازي.') },
    { term: 'Concurrency view', definition: t('Shows opportunities for parallelism and points of resource contention.', 'بيورّي فرص التوازي وأماكن التزاحم على الموارد.') },
    { term: 'Port', definition: t('A component’s interaction point where interfaces attach.', 'نقطة تفاعل الـ component اللي بتتوصل عليها الـ interfaces.') },
    { term: 'Provided interface (lollipop)', definition: t('Services a component offers.', 'الخدمات اللي الـ component بيقدّمها.') },
    { term: 'Required interface (socket)', definition: t('Services a component needs from others.', 'الخدمات اللي الـ component محتاجها من غيره.') },
  ],
  recap: [
    t('C&C views: components (processes, clients, servers, data stores) + connectors (invocation, queues, event multicast, pipes).', 'الـ C&C views: components (processes وclients وservers وdata stores) + connectors (invocation وqueues وevent multicast وpipes).'),
    t('They answer: what executes and interacts, shared stores, replication, data flow, parallelism.', 'بتجاوب على: إيه بيتنفذ ويتفاعل، المخازن المشتركة، التكرار، تدفق الداتا، التوازي.'),
    t('Helpful for performance (bottlenecks), security (data flows) and availability (replicas, single points of failure).', 'مفيدة للـ performance (الـ bottlenecks)، والـ security (تدفق الداتا)، والـ availability (النسخ ونقط الفشل الوحيدة).'),
    t('Concurrency view: parallelism and resource contention.', 'الـ Concurrency view: التوازي والتزاحم على الموارد.'),
    t('UML: ports; provided = lollipop, required = socket (Order System ↔ CustomerLookup, ProductAccessor).', 'الـ UML: ports؛ provided = lollipop، required = socket (Order System ↔ CustomerLookup وProductAccessor).'),
    t('Climate control: module view (classes, Cooler/Heater/Fan is-a Actuator) vs C&C view (sense, actuate, display; use lollipops, not arrows).', 'التكييف: module view (classes، وCooler/Heater/Fan نوع من Actuator) ضد C&C view (sense وactuate وdisplay؛ واستخدم lollipops مش أسهم).'),
  ],
}
