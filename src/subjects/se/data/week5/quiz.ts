import type { QuizQuestion } from '../../types'
import { t } from '../helpers'

/** "Check your understanding" questions for Week 5, keyed by lesson id. Ordered easy → hard. */
export const week5Quiz: Record<string, QuizQuestion[]> = {
  'w5-styles': [
    {
      level: 'recall',
      question: t(
        'Which three basic properties define an architectural style?',
        'إيه التلات خصائص الأساسية اللي بتعرّف الـ architectural style؟',
      ),
      options: [
        'Performance, availability and security',
        'Modules, components and allocations',
        'A vocabulary of design elements, configuration rules, and a semantic interpretation',
        'Requirements, design and validation',
      ],
      answer: 2,
      explanation: t(
        '**V + R + S**: the vocabulary (which element types exist), the configuration rules (how they may be composed) and the semantic interpretation (what a composition means).',
        '**V + R + S**: الـ vocabulary (أنواع العناصر الموجودة)، والـ configuration rules (مسموح يتركّبوا إزاي)، والـ semantic interpretation (التركيبة معناها إيه).',
      ),
    },
    {
      level: 'understand',
      question: t('How do a **view** and a **style** relate?', 'إيه العلاقة بين الـ **view** والـ **style**؟'),
      options: [
        'A view is the angle you look from; a style is the set of constraints on the elements and relations you see there',
        'A view is used for small systems; a style for large ones',
        'They are synonyms: every view is a style',
        'A view is chosen by developers; a style by the customer',
      ],
      answer: 0,
      explanation: t(
        '“A view is the camera; a style is the building type.” The same kind of floor plan can show a villa, an apartment block or a hotel — within one view, different choices of allowed relations give different styles.',
        '“الـ view هو الكاميرا؛ والـ style هو نوع المبنى.” نفس نوع المسقط ممكن يورّي فيلا أو عمارة أو فندق — جوه view واحد، اختيارات مختلفة للعلاقات المسموحة بتدّي styles مختلفة.',
      ),
    },
    {
      level: 'understand',
      question: t(
        '“Filters may connect only through pipes, and may not share state.” Which of the three properties of the pipe-and-filter style is this?',
        '“الـ filters تتوصّل ببعض عن طريق pipes بس، ومتشاركش state.” دي أنهي خاصية من التلاتة في الـ pipe-and-filter style؟',
      ),
      options: [
        'The vocabulary',
        'The semantic interpretation',
        'The topology name',
        'A configuration rule',
      ],
      answer: 3,
      explanation: t(
        'It **constrains how elements may be composed**, so it is a configuration rule. The vocabulary would be “filters and pipes”; the semantics would be “data streams through and is transformed step by step”.',
        'دي **بتقيّد إزاي العناصر تتركّب**، فهي configuration rule. الـ vocabulary هو “filters وpipes”؛ والـ semantics هي “الداتا بتعدّي وتتحوّل خطوة خطوة”.',
      ),
    },
    {
      level: 'apply',
      question: t(
        'In a system, many clients each talk to one central server and never to each other. Which topology is this, and which style does it suggest?',
        'في سيستم، clients كتير كل واحد بيكلّم server مركزي واحد وعمرهم ما بيكلّموا بعض. دي أنهي topology، وبتشاور على أنهي style؟',
      ),
      options: [
        'A mesh — peer-to-peer',
        'A star — client-server',
        'A line — pipe-and-filter',
        'A bus — messaging',
      ],
      answer: 1,
      explanation: t(
        'One hub with spokes is a **star**, the shape of client-server. A mesh of equals points to P2P, a line or tree to pipe-and-filter, and a bus to messaging or publish-subscribe.',
        'مركز واحد وأطراف حواليه دي **star**، شكل الـ client-server. إنما الـ mesh بين متساويين بيشاور على P2P، والـ line أو tree على pipe-and-filter، والـ bus على messaging أو publish-subscribe.',
      ),
    },
  ],

  'w5-process': [
    {
      level: 'recall',
      question: t(
        'What are the three steps of the iterative architecture process?',
        'إيه التلات خطوات بتوع الـ architecture process التكراري؟',
      ),
      options: [
        'Coding, testing and deployment',
        'Determine architectural requirements, architecture design, validation',
        'Choose a framework, buy servers, hire a team',
        'Draw views, write code, write documentation',
      ],
      answer: 1,
      explanation: t(
        'Requirements → design → validation, with feedback arrows: what you learn in validation sends you back to refine the design or the requirements.',
        'Requirements ← design ← validation، ومعاهم أسهم feedback: اللي بتتعلمه في الـ validation بيرجّعك تحسّن الـ design أو الـ requirements.',
      ),
    },
    {
      level: 'understand',
      question: t('What are “architecture requirements” essentially?', 'الـ “architecture requirements” هي في الأساس إيه؟'),
      options: [
        'The complete list of features requested by users',
        'The hardware the system will be installed on',
        'The coding standards of the development team',
        'The quality and non-functional requirements of the system',
      ],
      answer: 3,
      explanation: t(
        'Also called architecturally significant requirements: how fast, how available, how secure, how modifiable. The features are an **input**; the qualities are what shape the architecture.',
        'اسمها كمان architecturally significant requirements: سريع قد إيه، متاح قد إيه، آمن قد إيه، سهل يتعدّل قد إيه. الـ features **مدخل**؛ إنما الـ qualities هي اللي بتشكّل الـ architecture.',
      ),
    },
    {
      level: 'understand',
      question: t(
        'Why does step 2a start from a **proven pattern** instead of an original design?',
        'ليه الخطوة 2a بتبدأ من **pattern مجرّب** بدل design أصلي؟',
      ),
      options: [
        'Known solutions with known pros and cons minimise the risk of failing through an inappropriate architecture',
        'Original designs are not permitted in commercial projects',
        'Patterns remove the need for the validation step',
        'A pattern guarantees that every quality attribute is satisfied at once',
      ],
      answer: 0,
      explanation: t(
        '“Don’t invent — choose, then combine.” Each pattern has clear strengths and weaknesses for the quality attributes, so the architect can match it to the requirements. It still has trade-offs, and validation is still needed.',
        '“متخترعش — اختار وبعدين ركّب.” كل pattern ليه نقط قوة وضعف واضحة في الـ quality attributes، فالـ architect يقدر يطابقه بالـ requirements. بس لسه فيه trade-offs، ولسه الـ validation مطلوب.',
      ),
    },
    {
      level: 'apply',
      question: t(
        'The requirements document says only: “The system must be fast and reliable.” What should the architect do?',
        'الـ requirements document مكتوب فيه بس: “السيستم لازم يبقى سريع وموثوق.” الـ architect يعمل إيه؟',
      ),
      options: [
        'Start the design: the statement is clear enough',
        'Pick the most powerful hardware available, to be safe',
        'Work with the requirements team and the stakeholders to make it measurable, and negotiate the conflicts',
        'Ignore it: quality requirements are not the architect’s concern',
      ],
      answer: 2,
      explanation: t(
        'Quality requirements usually arrive vague or missing. The architect **draws them out** (how fast, under which load? how many minutes of downtime?) and, since stakeholders’ concerns conflict, negotiates the trade-offs.',
        'الـ quality requirements غالبًا بتيجي مبهمة أو ناقصة. الـ architect **بيستخرجها** (سريع قد إيه وتحت أنهي حمل؟ كام دقيقة downtime؟) وبما إن اهتمامات الـ stakeholders بتتعارض، بيتفاوض على الـ trade-offs.',
      ),
    },
  ],

  'w5-ntier': [
    {
      level: 'recall',
      question: t('How do the tiers of an n-tier system communicate?', 'الـ tiers في الـ n-tier system بتتواصل إزاي؟'),
      options: [
        'Asynchronously, through one shared message queue',
        'Any tier may call any other tier, in both directions',
        'Synchronously, with requests going in one direction from the client tier towards the data tier',
        'Only through files exchanged once a day',
      ],
      answer: 2,
      explanation: t(
        'Requests flow **one way**, client → web → business logic → data, and each caller **waits** for the answer. Like a restaurant: customer → waiter → kitchen → storeroom, each talking only to its neighbour.',
        'الطلبات ماشية **في اتجاه واحد**، client ← web ← business logic ← data، وكل caller **بيستنى** الرد. زي المطعم: زبون ← جرسون ← مطبخ ← مخزن، وكل واحد بيكلّم جاره بس.',
      ),
    },
    {
      level: 'understand',
      question: t('What does “flexible deployment” mean for the n-tier style?', '“flexible deployment” معناها إيه في الـ n-tier style؟'),
      options: [
        'There are no restrictions: all tiers can run on one machine, or each on its own',
        'Each tier must always run on a separate machine',
        'Tiers can be written in any programming language',
        'The system can be deployed without a database',
      ],
      answer: 0,
      explanation: t(
        'A tier is a **logical** separation. You can start with everything on one server and later move each tier to its own machines as the load grows — without redesigning the application.',
        'الـ tier فصل **منطقي**. ممكن تبدأ بكل حاجة على server واحد وبعدين تنقل كل tier على أجهزته لما الحمل يكبر — من غير ما تعيد تصميم الـ application.',
      ),
    },
    {
      level: 'understand',
      question: t(
        'Why are the web and business-logic tiers easier to scale than the data tier?',
        'ليه الـ web tier والـ business-logic tier أسهل في الـ scaling من الـ data tier؟',
      ),
      options: [
        'They contain less code than the data tier',
        'They are closer to the user on the network',
        'They always run on faster hardware',
        'They are usually stateless, so identical servers can be added behind a load balancer; the data tier holds state',
      ],
      answer: 3,
      explanation: t(
        'Stateless servers are interchangeable, so you just add more. Copies of the data must stay **consistent** with each other, which makes the data tier the hardest to scale and often the bottleneck.',
        'السيرفرات الـ stateless زي بعض، فبتزوّد منها وخلاص. إنما نسخ الداتا لازم تفضل **متطابقة** مع بعض، وده اللي بيخلّي الـ data tier أصعب حاجة في الـ scaling وغالبًا هي الـ bottleneck.',
      ),
    },
    {
      level: 'apply',
      question: t(
        'Pages load slowly although the CPU on every server is nearly idle. The application server and the database are in different data centres and exchange very large result sets. What is the most likely cause?',
        'الصفحات بتحمّل ببطء مع إن الـ CPU على كل السيرفرات شبه فاضي. الـ application server والـ database في data centres مختلفة وبيتبادلوا result sets كبيرة جدًا. إيه السبب الأرجح؟',
      ),
      options: [
        'The web tier is not stateless',
        'N-tier performance depends on the speed of the links between tiers and on how much data crosses them',
        'The client tier is too thin',
        'Synchronous communication is impossible between data centres',
      ],
      answer: 1,
      explanation: t(
        'Idle CPUs rule out a processing problem. In this style every request crosses the tier boundaries, so a slow link carrying a lot of data dominates the response time. Fix: bring the tiers closer together, or transfer less.',
        'الـ CPU الفاضي بيستبعد إن المشكلة في الـ processing. في الـ style ده كل request بيعدّي على حدود الـ tiers، فالـ link البطيء اللي شايل داتا كتير هو اللي بيحدد زمن الرد. الحل: قرّب الـ tiers من بعض، أو انقل داتا أقل.',
      ),
    },
    {
      level: 'apply',
      question: t(
        'To “save a hop”, a developer lets the browser code send queries straight to the database. What does the system lose?',
        'عشان “يوفّر hop”، developer خلّى كود الـ browser يبعت queries مباشرة للـ database. السيستم بيخسر إيه؟',
      ),
      options: [
        'Nothing: fewer hops are always an improvement',
        'Flexible deployment, because the tiers must now share one machine',
        'Separation of concerns: the client now depends on the data tier, so a database change ripples up to it',
        'Synchronous communication, because the call becomes asynchronous',
      ],
      answer: 2,
      explanation: t(
        'The style’s modifiability comes from each tier talking **only to its neighbour**. Skipping tiers ties the client to the database schema — and bypasses the business rules that live in the middle.',
        'الـ modifiability في الـ style ده جاية من إن كل tier بيكلّم **جاره بس**. لما تنط tiers بتربط الـ client بالـ schema بتاعة الـ database — وبتعدّي من فوق الـ business rules اللي ساكنة في النص.',
      ),
    },
  ],

  'w5-p2p': [
    {
      level: 'recall',
      question: t('What is the defining feature of the peer-to-peer style?', 'إيه الخاصية اللي بتعرّف الـ peer-to-peer style؟'),
      options: [
        'One powerful server answers the requests of all peers',
        'All processes play similar roles: each peer both requests and serves',
        'Peers communicate only through a message queue',
        'Every peer stores a full copy of all the data',
      ],
      answer: 1,
      explanation: t(
        'There is **no distinction between clients and servers**. Like a study group instead of a lecture: everyone asks and everyone answers.',
        '**مفيش فرق بين clients وservers**. زي مجموعة مذاكرة بدل محاضرة: الكل بيسأل والكل بيجاوب.',
      ),
    },
    {
      level: 'understand',
      question: t(
        'In client-server, more users means more load on the server. Why can a P2P system’s capacity **grow** as users join?',
        'في الـ client-server، users أكتر معناها حمل أكتر على الـ server. ليه قدرة الـ P2P system ممكن **تكبر** كل ما users ينضموا؟',
      ),
      options: [
        'Because the central server is upgraded automatically',
        'Because peers never send requests to each other',
        'Because joining a P2P network is free of charge',
        'Because every new peer also brings resources and serves others',
      ],
      answer: 3,
      explanation: t(
        'Each peer is a consumer **and** a provider: it adds storage and bandwidth along with its own demand. That is also why no expensive central server is needed.',
        'كل peer مستهلك **و**مقدّم خدمة: بيضيف storage وbandwidth مع الطلب بتاعه. وده كمان سبب إن مفيش احتياج لـ central server غالي.',
      ),
    },
    {
      level: 'understand',
      question: t(
        'In Napster, what actually went through the central server?',
        'في Napster، إيه اللي كان بيعدّي فعلًا على الـ central server؟',
      ),
      options: [
        'Only the lookup: which peers have the file — the file itself moved directly between peers',
        'The whole file, which the server then forwarded to the requester',
        'Nothing: Napster had no central server at all',
        'Only the payment for each download',
      ],
      answer: 0,
      explanation: t(
        'Napster was a **hybrid**: client-server for *finding* (a central index) and peer-to-peer for *sharing* (direct transfer). The index solved P2P’s hardest problem, discovery.',
        'Napster كان **هجين**: client-server في *البحث* (central index) وpeer-to-peer في *المشاركة* (نقل مباشر). والـ index حلّ أصعب مشكلة في الـ P2P، اللي هي الـ discovery.',
      ),
    },
    {
      level: 'apply',
      question: t(
        'Napster could be stopped by shutting down one thing, while a pure P2P network is very hard to stop. What architectural property explains the difference?',
        'Napster اتوقف بقفل حاجة واحدة، إنما شبكة P2P خالصة صعب جدًا توقفها. أنهي خاصية معمارية بتفسّر الفرق؟',
      ),
      options: [
        'Napster’s peers used a slower transfer protocol',
        'Pure P2P networks keep every file in encrypted form',
        'Napster’s central index was a single point of failure — and of control',
        'Pure P2P networks have fewer users to shut down',
      ],
      answer: 2,
      explanation: t(
        'The price of easy discovery was a central element everything depended on. Pure P2P has no such element — which is its strength (no single point of failure) and also why it is hard to manage and monitor.',
        'تمن الـ discovery السهل كان عنصر مركزي كل حاجة معتمدة عليه. الـ P2P الخالص معندوش عنصر زي ده — ودي قوته (مفيش single point of failure) وبرضه سبب إنه صعب يتدار ويتراقب.',
      ),
    },
  ],

  'w5-pipe': [
    {
      level: 'recall',
      question: t('What is the key invariant of the pipe-and-filter style?', 'إيه الـ invariant الأساسي في الـ pipe-and-filter style؟'),
      options: [
        'Filters are independent: they share no state and do not know their neighbours',
        'Every filter must finish before the next one starts',
        'All filters read from one common data store',
        'A pipe may connect more than two filters at once',
      ],
      answer: 0,
      explanation: t(
        'A filter only knows its input and output streams — not who is upstream or downstream. Sharing a common data store is a different style (shared data).',
        'الـ filter عارف بس الـ input والـ output streams بتوعه — مش عارف مين قبله ولا مين بعده. إنما المشاركة في data store واحد ده style تاني (shared data).',
      ),
    },
    {
      level: 'understand',
      question: t(
        'In `ls invoices | grep -e August | sort`, you replace `sort` with `sort -r`. What else has to change?',
        'في `ls invoices | grep -e August | sort`، بدّلت `sort` بـ `sort -r`. إيه تاني لازم يتغيّر؟',
      ),
      options: [
        '`grep`, because its output format is now different',
        '`ls`, because it feeds the whole pipeline',
        'Nothing: filters do not know their neighbours, so one can be swapped alone',
        'The pipes, because the data now flows in reverse',
      ],
      answer: 2,
      explanation: t(
        'This is the modifiability and reuse the style buys: because filters are independent, you can replace one, or insert another such as `head`, without touching the rest.',
        'دي الـ modifiability والـ reuse اللي الـ style بيشتريهملك: عشان الـ filters مستقلة، تقدر تبدّل واحد أو تدخّل واحد زي `head` من غير ما تلمس الباقي.',
      ),
    },
    {
      level: 'understand',
      question: t(
        'Filters can normally run concurrently. Why is a filter like `sort` a problem for that?',
        'الـ filters في العادي بتشتغل concurrently. ليه filter زي `sort` مشكلة في ده؟',
      ),
      options: [
        'It uses more CPU than the other filters',
        'It changes the data format in the pipe',
        'It needs a shared file with the previous filter',
        'It needs all of its input before it can produce any output, so everything downstream waits',
      ],
      answer: 3,
      explanation: t(
        'An incremental filter emits output while input is still arriving, so its consumer starts early. `sort` cannot know the first line until it has seen the last, which **blocks the stream**.',
        'الـ filter الـ incremental بيطلّع output والـ input لسه جاي، فاللي بعده بيبدأ بدري. إنما `sort` ميعرفش أول سطر غير لما يشوف آخر سطر، وده **بيوقّف الـ stream**.',
      ),
    },
    {
      level: 'apply',
      question: t(
        'To pass a running count, two filters secretly write to the same temporary file. The output is correct. Why is this still a design problem?',
        'عشان يعدّوا عدّاد، اتنين filters بيكتبوا في السر في نفس الـ temporary file. والـ output صح. ليه دي برضه مشكلة design؟',
      ),
      options: [
        'Temporary files are slower than pipes',
        'It breaks the independence invariant, so the filters can no longer be safely reused, reordered or run concurrently',
        'A pipeline may not contain more than one counter',
        'It is not a problem as long as the output is correct',
      ],
      answer: 1,
      explanation: t(
        'Hidden shared state is exactly what the style forbids. All of its qualities — reuse, modifiability, concurrency, testability — follow from filters being truly independent; the hidden file quietly removes them.',
        'الـ shared state المستخبي هو بالظبط اللي الـ style بيمنعه. كل مميزاته — reuse وmodifiability وconcurrency وtestability — جاية من إن الـ filters مستقلة بجد؛ والـ file المستخبي بيشيلهم في هدوء.',
      ),
    },
  ],

  'w5-messaging': [
    {
      level: 'recall',
      question: t(
        'In the messaging style, what happens right after a client writes a message to the queue?',
        'في الـ messaging style، إيه اللي بيحصل بعد ما الـ client يكتب message في الـ queue على طول؟',
      ),
      options: [
        'The client blocks until a server has processed the message',
        'The message is discarded if no server is listening',
        'The queue forwards the message back to the client for confirmation',
        'The message is stored until an application removes it, and the client continues without waiting',
      ],
      answer: 3,
      explanation: t(
        'That is what **asynchronous** means here: a mailbox, not a phone call. The servers take messages from the queue at their own pace.',
        'ده معنى **asynchronous** هنا: صندوق بريد، مش مكالمة تليفون. والـ servers بياخدوا الـ messages من الـ queue على مهلهم.',
      ),
    },
    {
      level: 'understand',
      question: t(
        'The receiving server is down for five minutes. How do a synchronous call and a message queue differ?',
        'الـ server المستقبِل واقع 5 دقايق. إيه الفرق بين الـ synchronous call والـ message queue؟',
      ),
      options: [
        'Both fail in the same way',
        'The call fails; the message waits safely in the queue until the server is back',
        'The call waits safely; the message is lost',
        'Both succeed, because the client retries automatically',
      ],
      answer: 1,
      explanation: t(
        'A synchronous call needs both sides up at the same moment. A queue removes that requirement — and because queues can be replicated across messaging servers, the style is strong on **availability**.',
        'الـ synchronous call محتاج الطرفين شغالين في نفس اللحظة. والـ queue بيشيل الشرط ده — وعشان الـ queues ممكن تتكرر على messaging servers، الـ style ده قوي في الـ **availability**.',
      ),
    },
    {
      level: 'understand',
      question: t(
        'With messaging, what is the only thing a sender and a receiver have to share?',
        'مع الـ messaging، إيه الحاجة الوحيدة اللي الـ sender والـ receiver لازم يشتركوا فيها؟',
      ),
      options: [
        'The queue and the message format',
        'The same programming language',
        'Each other’s network address and interface',
        'The same uptime schedule',
      ],
      answer: 0,
      explanation: t(
        'The client does not know which server — or how many — will process its message. That **loose coupling** lets you add, replace or move servers freely.',
        'الـ client ميعرفش أنهي server — ولا كام واحد — هيعالج الـ message بتاعته. والـ **loose coupling** ده بيخلّيك تضيف أو تبدّل أو تنقل servers براحتك.',
      ),
    },
    {
      level: 'apply',
      question: t(
        'A team wants to (a) add three more order-processing servers and (b) rename a field in the order message. How risky is each change?',
        'فريق عايز (a) يضيف 3 order-processing servers زيادة و(b) يغيّر اسم field في الـ order message. كل تغيير خطورته قد إيه؟',
      ),
      options: [
        'Both are free: messaging decouples everything',
        'Both are risky: every sender must be redeployed in both cases',
        '(a) is free for the senders; (b) affects every sender and receiver, because the format is the contract',
        '(a) affects every sender; (b) is free, because queues ignore the content of messages',
      ],
      answer: 2,
      explanation: t(
        'Decoupling has a price: the **message format becomes the contract**. Servers can come and go unnoticed, but a format change touches everyone who writes or reads that message.',
        'الـ decoupling ليه تمن: الـ **message format بيبقى هو الـ contract**. الـ servers تيجي وتمشي من غير ما حد يحس، إنما تغيير الـ format بيلمس كل اللي بيكتب أو بيقرا الـ message دي.',
      ),
    },
  ],

  'w5-compare': [
    {
      level: 'recall',
      question: t(
        'In the hook “Layers · Star · Mesh · Line · Mailbox”, which style is the **mesh**?',
        'في الـ hook “Layers · Star · Mesh · Line · Mailbox”، أنهي style هو الـ **mesh**؟',
      ),
      options: ['N-tier', 'Client-server', 'Peer-to-peer', 'Pipe-and-filter'],
      answer: 2,
      explanation: t(
        'Layers = n-tier, star = client-server, **mesh = peer-to-peer** (equal peers connected directly), line = pipe-and-filter, mailbox = messaging.',
        'Layers = n-tier، وstar = client-server، و**mesh = peer-to-peer** (peers متساويين متوصلين مباشرة)، وline = pipe-and-filter، وmailbox = messaging.',
      ),
    },
    {
      level: 'understand',
      question: t(
        'Where should the choice of an architectural style start?',
        'اختيار الـ architectural style المفروض يبدأ منين؟',
      ),
      options: [
        'From the architecture requirements: the quality attributes the system must achieve',
        'From the style the team used in its last project',
        'From the style that the largest technology companies use',
        'From the programming language chosen for the project',
      ],
      answer: 0,
      explanation: t(
        'This is step 2a of the process. Each style is strong on some qualities and weak on others, so the requirements pick the style — and complex systems usually combine several.',
        'دي الخطوة 2a في الـ process. كل style قوي في qualities وضعيف في غيرها، فالـ requirements هي اللي بتختار الـ style — والأنظمة المعقدة غالبًا بتركّب كذا واحد.',
      ),
    },
    {
      level: 'apply',
      question: t(
        'A nightly job reads log files, parses them, drops irrelevant lines, aggregates the rest and writes a report. The team wants to reuse and reorder these steps freely. Which style fits best?',
        'Job بيشتغل كل ليلة: بيقرا log files، يعملها parsing، يشيل السطور اللي ملهاش لازمة، يجمّع الباقي، ويكتب report. والفريق عايز يعيد استخدام الخطوات دي ويغيّر ترتيبها براحته. أنهي style أنسب؟',
      ),
      options: ['Peer-to-peer', 'N-tier', 'Messaging', 'Pipe-and-filter'],
      answer: 3,
      explanation: t(
        'A stream of data transformed step by step, with independent and reusable steps, is exactly pipe-and-filter. Its weak spot — interactive applications — does not matter for a batch job.',
        'Stream داتا بيتحوّل خطوة خطوة، بخطوات مستقلة وقابلة لإعادة الاستخدام، هو بالظبط pipe-and-filter. ونقطة ضعفه — التطبيقات الـ interactive — مش فارقة في batch job.',
      ),
    },
    {
      level: 'apply',
      question: t(
        'A web shop must keep accepting orders even while the back-end order workers are briefly down or overloaded. Which style do you put between the front-end and the workers, and what does it cost?',
        'Web shop لازم يفضل يقبل orders حتى لو الـ order workers في الـ back-end واقعين شوية أو عليهم ضغط. تحط أنهي style بين الـ front-end والـ workers، وتمنه إيه؟',
      ),
      options: [
        'Client-server — the cost is a slower user interface',
        'Messaging — the cost is that the message format becomes a contract and there is no immediate reply',
        'Pipe-and-filter — the cost is parsing overhead',
        'Peer-to-peer — the cost is harder discovery',
      ],
      answer: 1,
      explanation: t(
        'Availability plus loose coupling points to **messaging**: orders wait in a queue until workers are ready. The trade-off — First Law again — is a stable message format and living without an instant answer.',
        'الـ availability مع الـ loose coupling بيشاوروا على **messaging**: الـ orders بتستنى في queue لحد ما الـ workers يجهزوا. والـ trade-off — الـ First Law تاني — هو message format ثابت وإنك تعيش من غير رد فوري.',
      ),
    },
  ],
}
