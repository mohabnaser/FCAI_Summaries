import type { Lesson } from '../../types'
import { part, t } from '../helpers'

/** Slide 29 plus a synthesis: the detailed styles compared, and the readings. */
export const compare: Lesson = {
  id: 'w5-compare',
  weekId: 'week-5',
  order: 7,
  title: 'The Styles Side by Side',
  shortTitle: 'Styles Compared',
  slides: [29],
  minutes: 8,
  tldr: t(
    'Each style is a different answer to “how do the parts connect and talk?”: **n-tier** (stacked tiers, synchronous, one direction), **client-server** (clients call servers), **peer-to-peer** (equal peers, mesh), **pipe-and-filter** (independent filters on a stream), **messaging** (asynchronous queues). Pick by the qualities you need, combine for complex systems. Reading: Gorton, *Essential Software Architecture* (2011), Ch. 7–8.',
    'كل style إجابة مختلفة على “الأجزاء بتتوصل وتتكلم إزاي؟”: **n-tier** (طبقات فوق بعض، متزامن، اتجاه واحد)، و**client-server** (الـ clients بتطلب من السيرفرات)، و**peer-to-peer** (peers متساويين، mesh)، و**pipe-and-filter** (filters مستقلة على stream)، و**messaging** (queues غير متزامنة). اختار حسب الجودة اللي محتاجها، وادمج في السيستمات المعقدة. القراءة: Gorton، *Essential Software Architecture* (2011)، فصول 7–8.',
  ),
  blocks: [
    part(t('The detailed styles compared', 'الـ styles المتشرحة جنب بعض')),
    {
      kind: 'table',
      caption: t('Style · shape · communication · strengths · weaknesses · example', 'الـ Style · الشكل · الاتصال · المميزات · العيوب · مثال'),
      headers: ['Style', 'Shape', 'Communication', 'Strengths', 'Weaknesses', 'Example'],
      rows: [
        [t('N-tier'), t('Stack of tiers', 'طبقات فوق بعض'), t('Synchronous, one direction', 'متزامن، اتجاه واحد'), t('Separation of concerns, flexible deployment, replicate tiers', 'فصل المسؤوليات، نشر مرن، تكرار الطبقات'), t('Performance tied to links/data volume; data tier hard to scale', 'الأداء مربوط بالروابط وحجم الداتا؛ طبقة الداتا صعب تكبر'), t('Web app: browser → web → app server → DB', 'تطبيق ويب: متصفح ← ويب ← app server ← DB')],
        [t('Client-server'), t('Star around servers', 'نجمة حوالين السيرفرات'), t('Request → result', 'طلب ← نتيجة'), t('Central control of data/resources', 'تحكم مركزي في الداتا والموارد'), t('Server can be a bottleneck / single point of failure', 'السيرفر ممكن يبقى bottleneck / نقطة فشل وحيدة'), t('E-mail client ↔ mail server', 'برنامج إيميل ↔ سيرفر بريد')],
        [t('Peer-to-peer'), t('Mesh of equal peers', 'شبكة peers متساويين'), t('Direct peer ↔ peer', 'مباشر peer ↔ peer'), t('No single point of failure, scales with peers', 'مفيش نقطة فشل وحيدة، وبيكبر مع الـ peers'), t('Discovery, trust, consistency', 'البحث، والثقة، والاتساق'), t('BitTorrent; Napster (central index)', 'BitTorrent؛ Napster (فهرس مركزي)')],
        [t('Pipe-and-filter'), t('Line / tree of filters', 'خط / شجرة filters'), t('Data streams through pipes', 'streams داتا عن طريق pipes'), t('Reuse, modifiability, concurrency', 'إعادة استخدام، modifiability، توازي'), t('Interactive apps, parsing overhead', 'التطبيقات التفاعلية، تكلفة الـ parsing'), t('ls invoices | grep -e August | sort')],
        [t('Messaging'), t('Bus / queue in the middle', 'bus / queue في النص'), t('Asynchronous messages', 'رسايل غير متزامنة'), t('Availability (replicated queues), loose coupling', 'الـ availability (queues متكررة)، وارتباط خفيف'), t('Message format becomes a contract; no immediate reply', 'شكل الرسالة بيبقى عقد؛ ومفيش رد فوري'), t('Order queue between web front-end and back-end workers', 'queue طلبات بين الواجهة والـ workers')],
      ],
    },
    {
      kind: 'hook',
      title: t('Five styles, five pictures', 'خمس styles، خمس صور'),
      phrase: 'Layers · Star · Mesh · Line · Mailbox',
      letters: [
        { letter: 'N', word: 'N-tier = layers of a cake' },
        { letter: 'C', word: 'Client-server = star around a server' },
        { letter: 'P', word: 'Peer-to-peer = mesh of equals' },
        { letter: 'F', word: 'Pipe-and-filter = assembly line' },
        { letter: 'M', word: 'Messaging = mailbox / queue' },
      ],
    },
    {
      kind: 'callout',
      tone: 'key',
      title: t('How to choose (Step 2a)', 'إزاي تختار (الخطوة 2a)'),
      body: t(
        'Start from the **architecture requirements** (Step 1). Need availability and loose coupling between parts? Consider **messaging**. Stream processing? **Pipe-and-filter**. Clear separation and simple deployment for a typical business app? **N-tier**. No central infrastructure? **P2P**. Complex systems **combine** several, and the architect defines how they integrate.',
        'ابدأ من **متطلبات الـ architecture** (الخطوة 1). محتاج availability وارتباط خفيف بين الأجزاء؟ فكّر في **الـ messaging**. معالجة streams؟ **Pipe-and-filter**. فصل واضح ونشر بسيط لتطبيق بيزنس عادي؟ **N-tier**. مفيش بنية مركزية؟ **P2P**. والسيستمات المعقدة **بتدمج** كذا واحد، والمعماري بيحدد إزاي يتدمجوا.',
      ),
    },

    part(t('Required reading', 'القراءة المطلوبة')),
    {
      kind: 'cards',
      columns: 2,
      items: [
        { icon: 'book', title: 'Essential Software Architecture', tag: 'CH. 7 & 8', tone: 'blue', body: t('Ian Gorton, 2011 edition — Chapters 7 and 8.', 'Ian Gorton، طبعة 2011 — الفصول 7 و8.') },
      ],
    },
  ],
  keyTerms: [
    { term: 'N-tier in one line', definition: t('Stacked tiers, synchronous one-direction requests; separation of concerns.', 'طبقات فوق بعض، وطلبات متزامنة في اتجاه واحد؛ فصل مسؤوليات.') },
    { term: 'Client-server in one line', definition: t('Clients invoke servers for data/resources; servers may call other servers.', 'الـ clients بتطلب من السيرفرات؛ والسيرفرات ممكن تطلب من سيرفرات تانية.') },
    { term: 'P2P in one line', definition: t('Equal peers, no client/server distinction.', 'peers متساويين، من غير فرق client/server.') },
    { term: 'Pipe-and-filter in one line', definition: t('Independent filters transforming a stream connected by pipes.', 'filters مستقلة بتحوّل stream ومتوصلة بـ pipes.') },
    { term: 'Messaging in one line', definition: t('Asynchronous messages stored in queues until removed.', 'رسايل غير متزامنة متخزنة في queues لحد ما حد ياخدها.') },
    { term: 'Week 5 reading', definition: t('Gorton, Essential Software Architecture (2011), Ch. 7 and 8.', 'Gorton، Essential Software Architecture (2011)، فصول 7 و8.') },
  ],
  recap: [
    t('N-tier: layers, synchronous, separation of concerns, flexible deployment.', 'الـ N-tier: طبقات، متزامن، فصل مسؤوليات، نشر مرن.'),
    t('Client-server: request/result, servers may be clients too.', 'الـ Client-server: طلب/نتيجة، والسيرفرات ممكن تبقى clients كمان.'),
    t('P2P: equal peers; Napster adds a central index.', 'الـ P2P: peers متساويين؛ وNapster بيضيف فهرس مركزي.'),
    t('Pipe-and-filter: independent filters, concurrent streams, poor for interactive apps.', 'الـ Pipe-and-filter: filters مستقلة، وstreams متوازية، وضعيف في التفاعلي.'),
    t('Messaging: asynchronous queues, replicated for availability, message format as contract. Reading: Gorton Ch. 7–8.', 'الـ Messaging: queues غير متزامنة، بتتكرر للـ availability، وشكل الرسالة عقد. القراءة: Gorton فصول 7–8.'),
  ],
}
