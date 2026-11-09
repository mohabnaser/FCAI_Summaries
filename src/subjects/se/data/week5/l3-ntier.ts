import type { Lesson } from '../../types'
import { part, t } from '../helpers'

/** Slides 12–17: the catalogue of styles, the n-tier client-server pattern, client-server, key properties and quality attributes. */
export const ntier: Lesson = {
  id: 'w5-ntier',
  weekId: 'week-5',
  order: 3,
  title: 'Layered (N-Tier) & Client-Server',
  shortTitle: 'N-Tier & Client-Server',
  slides: [12, 13, 14, 15, 16, 17],
  minutes: 16,
  tldr: t(
    'The **n-tier** pattern stacks four logical tiers — **client, web server, business logic, data management** — and requests flow in **one direction**, synchronously, from client down to data. It gives **separation of concerns** and **flexible deployment** (all tiers on one machine or each on its own). **Client-server**: clients invoke a server for data or resources; a server may itself be a client of another server. Availability comes from **replicating** tiers; performance depends on **links and data volume** between tiers.',
    'الـ pattern بتاع **n-tier** بيرصّ أربع طبقات منطقية — **client وweb server وbusiness logic وdata management** — والطلبات بتمشي **في اتجاه واحد** وبشكل متزامن من الـ client لحد الداتا. وبيدّي **فصل مسؤوليات** و**مرونة في النشر** (كل الطبقات على جهاز واحد أو كل طبقة على جهاز). والـ **Client-server**: الـ clients بتطلب من سيرفر داتا أو موارد؛ والسيرفر نفسه ممكن يبقى client لسيرفر تاني. والـ availability بتيجي من **تكرار** الطبقات؛ والـ performance معتمدة على **سرعة الروابط وحجم الداتا** بين الطبقات.',
  ),
  blocks: [
    part(t('The catalogue of styles', 'قايمة الـ styles')),
    {
      kind: 'cards',
      columns: 4,
      items: [
        { icon: 'layers', title: 'Layered (N-tier)', tag: 'THIS LESSON', tone: 'blue', body: t('Stacked tiers, each serving the one above. Includes **client-server**.', 'طبقات فوق بعض، كل واحدة بتخدم اللي فوقها. ومنها **client-server**.') },
        { icon: 'network', title: 'Peer-to-peer', tag: 'LESSON 4', tone: 'teal', body: t('Equal peers cooperating, no fixed server.', 'peers متساويين بيتعاونوا، من غير سيرفر ثابت.') },
        { icon: 'workflow', title: 'Pipe-and-filter', tag: 'LESSON 5', tone: 'violet', body: t('Data streams through a chain of transformers.', 'الداتا بتعدّي في سلسلة من المحوّلات.') },
        { icon: 'megaphone', title: 'Messaging', tag: 'LESSON 6', tone: 'amber', body: t('Components exchange messages through queues, asynchronously.', 'الـ components بتتبادل رسايل عن طريق queues، من غير انتظار.') },
        { icon: 'radar', title: 'Implicit invocation', tone: 'rose', body: t('Components react to **events** instead of being called directly: **publish-subscribe** (e.g. Spotify) and **event-based** (e.g. the Eclipse IDE).', 'الـ components بترد على **أحداث** بدل ما حد يناديها مباشرة: **publish-subscribe** (زي Spotify) و**event-based** (زي Eclipse IDE).') },
        { icon: 'route', title: 'Web services', tone: 'lime', body: t('Components expose functionality as services over standard web protocols.', 'الـ components بتعرض وظايفها كخدمات على بروتوكولات الويب القياسية.') },
        { icon: 'boxes', title: 'Microservices', tone: 'blue', body: t('Many small, independently deployable services (recall Week 2’s trade-off).', 'خدمات صغيرة كتير، كل واحدة بتتنشر لوحدها (افتكر الـ trade-off بتاع أسبوع 2).') },
      ],
    },
    {
      kind: 'callout',
      tone: 'note',
      title: t('Listed, not detailed', 'مذكورين، مش متشرحين'),
      body: t('Implicit invocation, web services and microservices are only introduced here; this week details **n-tier/client-server, peer-to-peer, pipe-and-filter and messaging**.', 'الـ implicit invocation والـ web services والـ microservices متعرّفين بس هنا؛ والأسبوع ده بيشرح بالتفصيل **n-tier/client-server وpeer-to-peer وpipe-and-filter وmessaging**.'),
    },

    part(t('The n-tier client-server pattern', 'الـ n-tier client-server pattern')),
    {
      kind: 'diagram',
      id: 'ntier',
      title: t('Four logical tiers and one possible deployment', 'أربع طبقات منطقية ونشر واحد ممكن'),
      caption: t('**Client tier** (web clients) ↔ **web server tier** ↔ **business logic tier** (application server) ↔ **data management tier** (databases). One deployment puts them on four machines: **A** web browser (thin client), **B** web server (presentation logic), **C** app server (application logic), **D** database server (data).', '**طبقة الـ client** (web clients) ↔ **طبقة الـ web server** ↔ **طبقة الـ business logic** (application server) ↔ **طبقة إدارة الداتا** (databases). ونشر واحد ممكن بيحطهم على أربع أجهزة: **A** المتصفح (thin client)، و**B** الـ web server (منطق العرض)، و**C** الـ app server (منطق التطبيق)، و**D** سيرفر الداتا.'),
    },
    {
      kind: 'idea',
      title: 'A restaurant in four tiers',
      icon: 'building',
      tone: 'blue',
      text: t(
        'Each tier talks only to its neighbours, and each has one job. You can change the kitchen without retraining the waiters.',
        'كل طبقة بتكلّم جيرانها بس، وكل واحدة ليها شغلانة واحدة. تقدر تغيّر المطبخ من غير ما تعيد تدريب الجرسونات.',
      ),
      analogy: t(
        'Customer (client) → waiter (web server, takes and presents orders) → kitchen (business logic, prepares) → storeroom (data). The customer never walks into the storeroom.',
        'الزبون (client) ← الجرسون (web server، بياخد الطلب ويقدّمه) ← المطبخ (business logic، بيحضّر) ← المخزن (data). والزبون عمره ما بيدخل المخزن.',
      ),
    },

    part(t('Client-server', 'Client-server')),
    {
      kind: 'diagram',
      id: 'client-server',
      title: t('Invocation and result', 'الطلب والنتيجة'),
      caption: t(
        'Client processes interact with individual server processes on **separate computers** to access data or resources. The server, in turn, **may use the services of other servers** — becoming a client itself.',
        'الـ client processes بتتعامل مع server processes على **أجهزة منفصلة** عشان توصل لداتا أو موارد. والسيرفر بدوره **ممكن يستخدم خدمات سيرفرات تانية** — فيبقى هو نفسه client.',
      ),
    },
    {
      kind: 'asks',
      items: [
        { q: 'Example?', a: t('A **web browser** and a **web server**; an **e-mail client** and a mail server; a banking app and the bank’s servers. The web server calling a **database server** is the “server uses another server” case.', '**المتصفح** و**الـ web server**؛ و**برنامج الإيميل** وسيرفر البريد؛ وتطبيق البنك وسيرفرات البنك. والـ web server وهو بيطلب من **سيرفر الداتابيز** ده مثال “سيرفر بيستخدم سيرفر تاني”.') },
      ],
    },

    part(t('Key properties of n-tier', 'الخصائص الأساسية للـ n-tier')),
    {
      kind: 'cards',
      columns: 3,
      items: [
        { icon: 'layers', title: 'Separation of concerns', tone: 'blue', body: t('Each tier has a distinct responsibility (presentation, business logic, data).', 'كل طبقة ليها مسؤولية مختلفة (العرض، منطق البيزنس، الداتا).') },
        { icon: 'clock', title: 'Synchronous communication', tone: 'violet', body: t('Requests emanate in a **single direction** from the client tier, through the web and business-logic tiers, to the data-management tier — the caller **waits** for the reply.', 'الطلبات بتطلع **في اتجاه واحد** من طبقة الـ client، وتعدّي على طبقتي الويب والـ business logic، لحد طبقة الداتا — والطالب **بيستنى** الرد.') },
        { icon: 'server', title: 'Flexible deployment', tone: 'teal', body: t('**No restrictions** on deployment: all tiers on the same machine, or at the other extreme each tier on its own machine.', '**مفيش قيود** على النشر: كل الطبقات على جهاز واحد، أو على الطرف التاني كل طبقة على جهاز.') },
      ],
    },

    part(t('Addressing quality attributes', 'التعامل مع الـ quality attributes')),
    {
      kind: 'table',
      caption: t('N-tier vs the quality attributes', 'الـ N-tier والـ quality attributes'),
      headers: ['Quality', 'How n-tier addresses it'],
      rows: [
        [t('Availability'), t('**Servers in each tier could be replicated** — if one fails, another serves.', '**السيرفرات في كل طبقة ممكن تتكرر** — لو واحد وقع، التاني يخدم.')],
        [t('Modifiability'), t('**Separation of concerns!** Change one tier without touching the others.', '**فصل المسؤوليات!** غيّر طبقة من غير ما تلمس الباقي.')],
        [t('Performance'), t('Depends on the **speed of connections** between tiers and the **amount of data transferred** across them.', 'معتمدة على **سرعة الروابط** بين الطبقات و**حجم الداتا** اللي بتعدّي بينها.')],
        [t('Scalability'), t('Does the tier type matter? — see below.', 'نوع الطبقة بيفرق؟ — شوف تحت.')],
      ],
    },
    {
      kind: 'asks',
      items: [
        {
          q: 'Scalability — does the tier type matter?',
          a: t(
            '**Yes.** Web and business-logic tiers are usually **stateless**: add more identical servers behind a load balancer and you scale (horizontal scaling). The **data tier holds state**, so copies must stay consistent — it is the hardest tier to scale (replication, partitioning) and often the bottleneck.',
            '**أيوه.** طبقات الويب والـ business logic غالبًا **stateless**: زوّد سيرفرات شبه بعض ورا load balancer وانت كده بتكبّر (horizontal scaling). إنما **طبقة الداتا شايلة state**، فالنسخ لازم تفضل متطابقة — وده بيخليها أصعب طبقة تكبر (replication وpartitioning) وغالبًا هي الـ bottleneck.',
          ),
        },
      ],
    },
  ],
  keyTerms: [
    { term: 'N-tier (layered) pattern', definition: t('Logical tiers — client, web server, business logic, data management — each talking to its neighbours.', 'طبقات منطقية — client وweb server وbusiness logic وdata management — كل واحدة بتكلّم جيرانها.') },
    { term: 'Thin client', definition: t('A client (e.g. a web browser) with little logic; the work is done in server tiers.', 'client (زي المتصفح) فيه منطق قليل؛ والشغل بيتعمل في طبقات السيرفر.') },
    { term: 'Client-server', definition: t('Client processes invoke server processes on separate computers to access data/resources; servers may use other servers.', 'client processes بتطلب من server processes على أجهزة منفصلة؛ والسيرفرات ممكن تستخدم سيرفرات تانية.') },
    { term: 'Synchronous communication', definition: t('The caller waits for the reply; in n-tier requests flow one way from client to data tier.', 'الطالب بيستنى الرد؛ وفي الـ n-tier الطلبات بتمشي في اتجاه واحد من الـ client للداتا.') },
    { term: 'Flexible deployment', definition: t('Tiers can share one machine or each run on its own.', 'الطبقات ممكن تبقى على جهاز واحد أو كل واحدة على جهاز.') },
    { term: 'Implicit invocation', definition: t('Components react to events instead of direct calls: publish-subscribe (Spotify), event-based (Eclipse IDE).', 'الـ components بترد على أحداث بدل النداء المباشر: publish-subscribe (Spotify)، وevent-based (Eclipse IDE).') },
  ],
  recap: [
    t('Styles list: layered (n-tier, client-server), P2P, pipe-and-filter, messaging, implicit invocation (pub-sub Spotify, event-based Eclipse), web services, microservices.', 'قايمة الـ styles: layered (n-tier وclient-server)، وP2P، وpipe-and-filter، وmessaging، وimplicit invocation (pub-sub زي Spotify وevent-based زي Eclipse)، وweb services، وmicroservices.'),
    t('N-tier: client ↔ web server ↔ business logic (app server) ↔ data management; machines A–D.', 'الـ N-tier: client ↔ web server ↔ business logic (app server) ↔ data management؛ والأجهزة A–D.'),
    t('Client-server: invocation → result; a server can be a client of another server (browser ↔ web server ↔ DB).', 'الـ Client-server: طلب ← نتيجة؛ والسيرفر ممكن يبقى client لسيرفر تاني (المتصفح ↔ الـ web server ↔ الداتابيز).'),
    t('Properties: separation of concerns, synchronous one-direction requests, flexible deployment.', 'الخصائص: فصل المسؤوليات، طلبات متزامنة في اتجاه واحد، مرونة في النشر.'),
    t('Qualities: availability by replicating tier servers; modifiability by separation; performance depends on links and data volume; stateless tiers scale easily, the data tier doesn’t.', 'الجودة: الـ availability بتكرار سيرفرات الطبقات؛ والـ modifiability بالفصل؛ والـ performance معتمدة على الروابط وحجم الداتا؛ والطبقات الـ stateless بتكبر بسهولة، وطبقة الداتا لأ.'),
  ],
}
