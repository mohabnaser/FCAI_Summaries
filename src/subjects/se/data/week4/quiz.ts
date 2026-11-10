import type { QuizQuestion } from '../../types'
import { t } from '../helpers'

/** "Check your understanding" questions for Week 4, keyed by lesson id. Ordered easy → hard. */
export const week4Quiz: Record<string, QuizQuestion[]> = {
  'w4-views': [
    {
      level: 'recall',
      question: t('What does an architecture document consist of?', 'الـ architecture document بيتكوّن من إيه؟'),
      options: [
        'One complete diagram that shows every element of the system',
        'A set of views, plus documentation beyond views',
        'The source code together with its comments',
        'The list of functional requirements',
      ],
      answer: 1,
      explanation: t(
        'It is a set of **views** plus the documentation **beyond views**: the rationale, how the views relate to each other, and a glossary. No single diagram can carry all of that.',
        'هو مجموعة **views** ومعاهم الـ documentation **beyond views**: الأسباب (rationale)، وعلاقة الـ views ببعض، والـ glossary. ومفيش diagram واحد يقدر يشيل كل ده.',
      ),
    },
    {
      level: 'understand',
      question: t('What is the difference between a **structure** and a **view**?', 'إيه الفرق بين الـ **structure** والـ **view**؟'),
      options: [
        'A structure is drawn by architects; a view is drawn by developers',
        'A structure describes hardware; a view describes software',
        'A structure is the set of elements itself, which exists whether drawn or not; a view is a representation of it',
        'A structure is a view that has been approved by all stakeholders',
      ],
      answer: 2,
      explanation: t(
        '“You **build** structures; you **document** views.” The modules and processes exist in the system even if nobody ever draws them; a view is the picture we make of one such structure.',
        '“انت **بتبني** structures و**بتوثّق** views.” الـ modules والـ processes موجودين في السيستم حتى لو محدش رسمهم؛ والـ view هو الصورة اللي بنعملها لـ structure منهم.',
      ),
    },
    {
      level: 'understand',
      question: t(
        'Why can a single diagram never document a whole architecture?',
        'ليه diagram واحد عمره ما يقدر يوثّق architecture كاملة؟',
      ),
      options: [
        'Different stakeholders have different concerns; putting everything in one picture makes it unreadable',
        'UML tools limit the number of boxes on a page',
        'Architecture documents are required to have at least three diagrams',
        'A single diagram can only show hardware',
      ],
      answer: 0,
      explanation: t(
        'A city has separate maps for roads, metro, electricity and water — each answers one kind of question. In the same way, the stakeholders’ quality concerns decide which views are worth drawing.',
        'المدينة ليها خرايط منفصلة للطرق والمترو والكهربا والمياه — كل واحدة بتجاوب نوع أسئلة. وبنفس الطريقة، اهتمامات الـ stakeholders بالـ quality هي اللي بتحدد أنهي views تستاهل تترسم.',
      ),
    },
    {
      level: 'apply',
      question: t(
        'The operations lead asks: “Will the system stay up if one machine dies, and is the hardware enough for the load?” Which view do you open first?',
        'مسؤول الـ operations بيسأل: “السيستم هيفضل شغال لو جهاز وقع، والـ hardware كفاية للحمل؟” تفتح أنهي view الأول؟',
      ),
      options: [
        'The decomposition view',
        'The generalization view',
        'The work assignment view',
        'The deployment view',
      ],
      answer: 3,
      explanation: t(
        'Availability and performance questions about machines are answered by the **deployment view** (what runs where). Decomposition and generalization are module views, which serve modifiability.',
        'أسئلة الـ availability والـ performance اللي عن الأجهزة بيجاوبها الـ **deployment view** (إيه شغال فين). والـ decomposition والـ generalization دول module views وبيخدموا الـ modifiability.',
      ),
    },
  ],

  'w4-kinds': [
    {
      level: 'recall',
      question: t('What are the three kinds of architectural views?', 'إيه التلات أنواع بتوع الـ architectural views؟'),
      options: [
        'Module, component-and-connector, and allocation',
        'Logical, physical, and temporal',
        'Static, dynamic, and hybrid',
        'Client, server, and database',
      ],
      answer: 0,
      explanation: t(
        '**Module** views: how the system is built (code). **Component-and-connector** views: how it behaves at runtime. **Allocation** views: where it lives and who builds it.',
        'الـ **Module** views: السيستم مبني إزاي (الكود). والـ **Component-and-connector** views: بيتصرف إزاي وهو شغال. والـ **Allocation** views: عايش فين ومين بيبنيه.',
      ),
    },
    {
      level: 'understand',
      question: t('What separates a **module** from a **component**?', 'إيه اللي بيفرّق الـ **module** عن الـ **component**؟'),
      options: [
        'A module is large; a component is small',
        'A module is written in Java; a component can be in any language',
        'A module is a static unit of implementation; a component is a runtime entity',
        'Nothing: they are two names for the same box',
      ],
      answer: 2,
      explanation: t(
        'A module is something you **write** (package, class, layer). A component is something that **runs** (client, server, process, data store). Size and language have nothing to do with it.',
        'الـ module حاجة انت **بتكتبها** (package أو class أو layer). والـ component حاجة **بتشتغل** (client أو server أو process أو data store). والحجم واللغة ملهمش علاقة.',
      ),
    },
    {
      level: 'understand',
      question: t(
        'One web-server module is started as 4 replicas behind a load balancer. How many boxes does it get in each kind of view?',
        'web-server module واحد اتشغّل 4 replicas ورا load balancer. هياخد كام box في كل نوع view؟',
      ),
      options: [
        'Four boxes in the module view and four in the C&C view',
        'One box in the module view and four in the C&C view',
        'Four boxes in the module view and one in the C&C view',
        'One box in each of the two views',
      ],
      answer: 1,
      explanation: t(
        'The code was written once (one module) but four instances are running (four components). The mapping between modules and components is **not one-to-one**.',
        'الكود اتكتب مرة واحدة (module واحد) بس فيه 4 instances شغالين (4 components). الـ mapping بين الـ modules والـ components **مش واحد لواحد**.',
      ),
    },
    {
      level: 'apply',
      question: t(
        'Which question can only be answered from a component-and-connector view?',
        'أنهي سؤال ميتجاوبش غير من component-and-connector view؟',
      ),
      options: [
        'Which package contains the `Invoice` class?',
        'Which classes inherit from `Actuator`?',
        'Which team is responsible for the billing code?',
        'What happens to clients when the server process stops answering?',
      ],
      answer: 3,
      explanation: t(
        'A process that stops answering is a **runtime** matter: it concerns components and how they interact. Packages and inheritance are module views; team responsibility is an allocation view.',
        'الـ process اللي بطّل يرد دي حاجة **runtime**: تخص الـ components وتفاعلهم. الـ packages والـ inheritance دول module views؛ ومسؤولية الفرق allocation view.',
      ),
    },
  ],

  'w4-module': [
    {
      level: 'recall',
      question: t('Which relation defines the **decomposition** style?', 'أنهي relation بتعرّف الـ **decomposition** style؟'),
      options: ['uses', 'is-a-part-of', 'is-a', 'allocated-to'],
      answer: 1,
      explanation: t(
        'Decomposition splits modules into sub-modules: **is-a-part-of**. “is-a” belongs to generalization, “uses” to the uses style, and “allocated-to” to allocation views.',
        'الـ decomposition بيقسّم الـ modules لـ sub-modules: **is-a-part-of**. إنما “is-a” تبع الـ generalization، و“uses” تبع الـ uses style، و“allocated-to” تبع الـ allocation views.',
      ),
    },
    {
      level: 'understand',
      question: t('When does module A **use** module B?', 'إمتى نقول إن module A **بيستخدم (uses)** module B؟'),
      options: [
        'When A calls at least one function of B',
        'When A and B are in the same package',
        'When A was written after B',
        'When A’s correctness depends on B’s correctness',
      ],
      answer: 3,
      explanation: t(
        '“Uses” is stronger than “calls”. A may call B without caring about the result — but if A cannot be correct unless B is correct, A **uses** B, and B must exist and work first.',
        'الـ “Uses” أقوى من “calls”. ممكن A ينادي B ومش فارق معاه النتيجة — إنما لو A ميبقاش صح غير لما B يبقى صح، يبقى A **بيستخدم** B، و B لازم يكون موجود وشغال الأول.',
      ),
    },
    {
      level: 'understand',
      question: t(
        'Why is a decomposition view a **tree**, while a uses view is a **graph**?',
        'ليه الـ decomposition view بيبقى **tree**، والـ uses view بيبقى **graph**؟',
      ),
      options: [
        'In decomposition a module has only one parent and no loops are allowed; a module may use many others',
        'Trees are easier to draw, so decomposition is always simplified',
        'A uses view is drawn at runtime, while decomposition is drawn at compile time',
        'Decomposition shows classes, while uses shows packages',
      ],
      answer: 0,
      explanation: t(
        'A part belongs to exactly one whole, and nothing contains itself — that gives a tree. Dependencies have no such limit: a module can use several modules and be used by several.',
        'الجزء تبع كل واحد بالظبط، ومفيش حاجة بتحتوي نفسها — وده بيدّي tree. إنما الـ dependencies ملهاش الحد ده: الـ module ممكن يستخدم كذا module وكذا module يستخدموه.',
      ),
    },
    {
      level: 'apply',
      question: t(
        'In the uses view, A uses B **and** B uses A. What is the practical consequence?',
        'في الـ uses view، A بيستخدم B **و** B بيستخدم A. إيه النتيجة العملية؟',
      ),
      options: [
        'The code does not compile, because loops are forbidden',
        'Nothing: loops in the uses relation are harmless',
        'Neither module can be built, tested or released on its own',
        'The two modules must be assigned to different teams',
      ],
      answer: 2,
      explanation: t(
        'Loops are not forbidden, but they are harmful: the two modules form one lump that must be delivered together, which defeats **incremental development** — the main thing the uses view is for.',
        'الـ loops مش ممنوعة، بس مضرّة: الـ modules الاتنين بيبقوا كتلة واحدة لازم تتسلّم مع بعض، وده بيبوّظ الـ **incremental development** — أهم حاجة الـ uses view معمول عشانها.',
      ),
    },
    {
      level: 'apply',
      question: t(
        'You are about to change the `Logging` module. Which view tells you what else might break, and how do you read it?',
        'انت هتعدّل الـ `Logging` module. أنهي view بيقولك إيه تاني ممكن يبوظ، وبتقراه إزاي؟',
      ),
      options: [
        'The decomposition view: check the parent of `Logging`',
        'The uses view: follow the arrows backwards to every module that uses `Logging`',
        'The generalization view: check which modules inherit from `Logging`',
        'The deployment view: check which node runs `Logging`',
      ],
      answer: 1,
      explanation: t(
        'Impact analysis is the job of the **uses view**: every module whose correctness depends on `Logging` may be affected. The same arrows read backwards also give the build order.',
        'الـ impact analysis شغلة الـ **uses view**: كل module صحته معتمدة على `Logging` ممكن يتأثر. ونفس الأسهم لو اتقرت بالعكس بتدّيك ترتيب الـ build.',
      ),
    },
  ],

  'w4-cc': [
    {
      level: 'recall',
      question: t('In a C&C view, what is a **connector**?', 'في الـ C&C view، إيه هو الـ **connector**؟'),
      options: [
        'A cable between two hardware nodes',
        'A class that inherits from two parents',
        'An interaction pathway between components, such as a service invocation, a message queue or a pipe',
        'A team that integrates the work of two other teams',
      ],
      answer: 2,
      explanation: t(
        'Components are the things that run; connectors are **how they interact**: service invocation, message queues, event multicast, pipes.',
        'الـ components هي الحاجات اللي شغالة؛ والـ connectors هي **طريقة تفاعلهم**: service invocation وmessage queues وevent multicast وpipes.',
      ),
    },
    {
      level: 'understand',
      question: t(
        'Two components stay exactly the same, but the synchronous call between them is replaced by a message queue. Why is this an architectural change?',
        'الـ components الاتنين زي ما هم بالظبط، بس الـ synchronous call اللي بينهم اتبدّل بـ message queue. ليه ده تغيير معماري؟',
      ),
      options: [
        'Connectors are first-class: the same components with a different connector give different performance and availability',
        'It is not: the architecture is defined by the components only',
        'Because a queue always makes the system faster',
        'Because the two components must now be rewritten in another language',
      ],
      answer: 0,
      explanation: t(
        'A phone call needs both sides at the same moment; a mailbox does not. Swapping the connector changes who waits and what happens when one side is down — so connectors deserve as much design attention as components.',
        'المكالمة محتاجة الطرفين في نفس اللحظة؛ إنما صندوق البريد لأ. تبديل الـ connector بيغيّر مين بيستنى وإيه اللي بيحصل لو طرف واقع — فالـ connectors تستاهل نفس اهتمام الـ components في الـ design.',
      ),
    },
    {
      level: 'understand',
      question: t(
        'Order System needs the `CustomerLookup` service, which Customer Repository offers. How is this drawn in UML?',
        'الـ Order System محتاج خدمة `CustomerLookup` اللي بيقدّمها الـ Customer Repository. دي بتترسم إزاي في UML؟',
      ),
      options: [
        'A lollipop on both components',
        'A socket on both components',
        'A lollipop on Order System and a socket on Customer Repository',
        'A socket on Order System and a lollipop on Customer Repository',
      ],
      answer: 3,
      explanation: t(
        'The **lollipop** (ball) is a *provided* interface — what a component gives. The **socket** (cup) is a *required* interface — what it needs. Order System needs, Customer Repository gives.',
        'الـ **lollipop** (الكورة) هي *provided* interface — اللي الـ component بيدّيه. والـ **socket** (الكوباية) هي *required* interface — اللي محتاجه. الـ Order System محتاج، والـ Customer Repository بيدّي.',
      ),
    },
    {
      level: 'apply',
      question: t(
        'Two questions about the climate-control system: (a) how hard is it to add a seat heater? (b) what happens if the temperature sensor stops responding? Which views answer them?',
        'سؤالين عن الـ climate-control system: (a) إضافة seat heater صعبة قد إيه؟ (b) إيه اللي بيحصل لو الـ temperature sensor بطّل يرد؟ أنهي views بتجاوبهم؟',
      ),
      options: [
        'Both are answered by the module view',
        '(a) the module view; (b) the C&C view',
        '(a) the C&C view; (b) the module view',
        'Both are answered by the C&C view',
      ],
      answer: 1,
      explanation: t(
        '(a) is **modifiability**: the module view shows that Cooler, Heater and Fan specialise `Actuator`, so a seat heater is one more subclass. (b) is **availability at runtime**: only the C&C view shows the Controller talking to the Sensor.',
        'الـ (a) دي **modifiability**: الـ module view بيورّي إن Cooler وHeater وFan أنواع من `Actuator`، فالـ seat heater subclass زيادة. والـ (b) دي **availability وقت التشغيل**: الـ C&C view بس هو اللي بيورّي الـ Controller بيكلّم الـ Sensor.',
      ),
    },
  ],

  'w4-allocation': [
    {
      level: 'recall',
      question: t('Which relation do all allocation views use?', 'أنهي relation كل الـ allocation views بتستخدمها؟'),
      options: ['is-a-part-of', 'uses', 'allocated-to', 'is-a'],
      answer: 2,
      explanation: t(
        'Allocation views map software elements onto something **non-software** — hardware, a file system, teams — with the relation **allocated-to**.',
        'الـ allocation views بتوزّع عناصر السوفتوير على حاجة **مش سوفتوير** — hardware أو file system أو فرق — بالـ relation **allocated-to**.',
      ),
    },
    {
      level: 'understand',
      question: t(
        'What does each allocation style map the software onto?',
        'كل allocation style بيوزّع السوفتوير على إيه؟',
      ),
      options: [
        'Deployment → hardware nodes; install → file-system structure; work assignment → teams',
        'Deployment → teams; install → hardware nodes; work assignment → file-system structure',
        'Deployment → file-system structure; install → teams; work assignment → hardware nodes',
        'All three map the software onto hardware nodes, at different levels of detail',
      ],
      answer: 0,
      explanation: t(
        '**Deployment**: which component runs on which node. **Install**: where the files sit in the production file system. **Work assignment**: which team implements and integrates which module.',
        'الـ **Deployment**: أنهي component شغال على أنهي node. والـ **Install**: الفايلات محطوطة فين في الـ file system بتاع الـ production. والـ **Work assignment**: أنهي فريق بينفّذ ويدمج أنهي module.',
      ),
    },
    {
      level: 'understand',
      question: t(
        'Deployment and install views allocate **components**. Why does the work assignment view allocate **modules** instead?',
        'الـ deployment والـ install views بيوزّعوا **components**. ليه الـ work assignment view بيوزّع **modules**؟',
      ),
      options: [
        'Because modules are smaller than components',
        'Because teams write and integrate units of code; runtime instances are not something a team implements',
        'Because components exist only in UML tools',
        'Because every team owns exactly one hardware node',
      ],
      answer: 1,
      explanation: t(
        'A team is given **code to implement** — a module. Ten running copies of that code are ten components, but still one piece of work. That is why work assignment starts from the module view.',
        'الفريق بياخد **كود ينفّذه** — يعني module. وعشر نسخ شغالة من الكود ده يبقوا عشر components، بس برضه شغلانة واحدة. عشان كده الـ work assignment بيبدأ من الـ module view.',
      ),
    },
    {
      level: 'apply',
      question: t(
        'A node provides 16 GB of RAM. Three components that each require 6 GB are allocated to it. What does the deployment view let you conclude?',
        'Node بيقدّم 16 GB RAM. واتوزّع عليه 3 components كل واحد محتاج 6 GB. الـ deployment view بيخلّيك تستنتج إيه؟',
      ),
      options: [
        'It fits: each component is far below the 16 GB limit',
        'Nothing: memory is not shown in architectural views',
        'It fits, provided the components are in the same module',
        'It does not fit: 18 GB required exceeds the 16 GB provided, so one component must move or the node must grow',
      ],
      answer: 3,
      explanation: t(
        'Software elements carry properties **required of** the environment; environmental elements carry properties **provided to** the software. Capacity analysis is comparing the two: 3 × 6 = 18 > 16.',
        'عناصر السوفتوير ليها خصائص **مطلوبة من** البيئة؛ وعناصر البيئة ليها خصائص **بتقدّمها** للسوفتوير. والـ capacity analysis هو مقارنة الاتنين: 3 × 6 = 18 > 16.',
      ),
    },
    {
      level: 'apply',
      question: t(
        'To improve availability, a service is replicated — but the deployment view shows both replicas on the same node. What is the problem?',
        'عشان يحسّنوا الـ availability عملوا replication لـ service — بس الـ deployment view بيورّي الـ replicas الاتنين على نفس الـ node. إيه المشكلة؟',
      ),
      options: [
        'Replicas on one node cannot communicate with each other',
        'The install view becomes invalid',
        'One node failure takes down both replicas, so availability has not improved',
        'There is none: availability depends only on the number of replicas',
      ],
      answer: 2,
      explanation: t(
        'Replication protects against a node failure only if the replicas sit on **separate nodes**. This is exactly the kind of flaw that is invisible in the C&C view and obvious in the deployment view.',
        'الـ replication بيحمي من وقوع node بس لو الـ replicas على **nodes منفصلة**. وده بالظبط نوع العيب اللي مش باين في الـ C&C view وواضح في الـ deployment view.',
      ),
    },
  ],

  'w4-choosing': [
    {
      level: 'recall',
      question: t(
        'Which views do you reach for when the main concern is **modifiability**?',
        'تروح لأنهي views لما الهم الأساسي يبقى الـ **modifiability**؟',
      ),
      options: [
        'Deployment and install',
        'Decomposition and uses',
        'Concurrency and deployment',
        'Work assignment and install',
      ],
      answer: 1,
      explanation: t(
        'Modifiability is about code: **decomposition** tells you where a responsibility lives, and **uses** tells you how far a change will ripple.',
        'الـ modifiability عن الكود: الـ **decomposition** بيقولك المسؤولية ساكنة فين، والـ **uses** بيقولك التعديل هيوصل لحد فين.',
      ),
    },
    {
      level: 'understand',
      question: t(
        'Why is “document every possible view” bad advice?',
        'ليه “وثّق كل view ممكن” نصيحة وحشة؟',
      ),
      options: [
        'Because stakeholders are not allowed to see more than three views',
        'Because views contradict each other when there are too many',
        'Because UML defines only a limited number of diagram types',
        'Because every view costs effort to create and keep current — document only the ones that serve a stakeholder concern',
      ],
      answer: 3,
      explanation: t(
        'A view that no stakeholder needs is pure cost, and an out-of-date view is worse than none. Start from the quality concerns and pick the views that answer them.',
        'الـ view اللي مفيش stakeholder محتاجه تكلفة على الفاضي، والـ view القديم أسوأ من عدمه. ابدأ من اهتمامات الـ quality واختار الـ views اللي بتجاوب عليها.',
      ),
    },
    {
      level: 'apply',
      question: t(
        'A security auditor asks where sensitive data travels and which network zones it crosses. Which pair of views do you hand over?',
        'Security auditor بيسأل الداتا الحساسة بتمشي فين وبتعدّي على أنهي network zones. تدّيله أنهي اتنين views؟',
      ),
      options: [
        'C&C (data flows) and deployment (network zones)',
        'Decomposition and generalization',
        'Work assignment and install',
        'Uses and data model',
      ],
      answer: 0,
      explanation: t(
        'Data flow between running components is a **C&C** matter; which machine and which zone each component sits in is a **deployment** matter. Together they show where to authenticate, encrypt and check.',
        'مشي الداتا بين الـ components الشغالة موضوع **C&C**؛ وكل component قاعد على أنهي جهاز وفي أنهي zone موضوع **deployment**. ومع بعض بيورّوك تعمل authentication وencryption وفحص فين.',
      ),
    },
    {
      level: 'apply',
      question: t(
        'A project manager has to plan the schedule and split a budget across teams. Which views help most?',
        'Project manager لازم يخطط الـ schedule ويقسّم الميزانية على الفرق. أنهي views تفيده أكتر؟',
      ),
      options: [
        'Concurrency and deployment',
        'Install and generalization',
        'Work assignment and uses',
        'C&C and data model',
      ],
      answer: 2,
      explanation: t(
        '**Work assignment** says who builds what; **uses** says what must exist before what, so it gives the order of increments. Modules with heavy uses relations between them are best owned by one team or by close teams.',
        'الـ **work assignment** بيقول مين بيبني إيه؛ والـ **uses** بيقول إيه لازم يبقى موجود قبل إيه، فبيدّي ترتيب الـ increments. والـ modules اللي بينها علاقات uses كتير أحسن يمسكها فريق واحد أو فرق قريبة من بعض.',
      ),
    },
  ],
}
