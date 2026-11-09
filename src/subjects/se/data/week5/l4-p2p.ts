import type { Lesson } from '../../types'
import { part, t } from '../helpers'

/** Slides 18–20: language-influenced styles added to the list, peer-to-peer, and P2P with a central index (Napster). */
export const p2p: Lesson = {
  id: 'w5-p2p',
  weekId: 'week-5',
  order: 4,
  title: 'Peer-to-Peer: Everyone Is Client and Server',
  shortTitle: 'Peer-to-Peer',
  slides: [18, 19, 20],
  minutes: 10,
  tldr: t(
    'In **peer-to-peer** all processes play **similar roles**, cooperating as peers with **no distinction between clients and servers**. It avoids a single point of failure and grows its capacity with every peer, but finding data, trusting peers and keeping things consistent are hard. **Napster** was a hybrid: a **central index server** for finding files, then **direct peer-to-peer** transfer.',
    'في الـ **peer-to-peer** كل الـ processes ليها **أدوار شبه بعض**، وبتتعاون كـ peers **من غير فرق بين client وserver**. بيتجنّب نقطة الفشل الوحيدة وقدرته بتكبر مع كل peer، بس إنك تلاقي الداتا، وتثق في الـ peers، وتحافظ على الاتساق — دي حاجات صعبة. و**Napster** كان هجين: **سيرفر فهرس مركزي** للبحث عن الملفات، وبعدين **نقل مباشر بين الـ peers**.',
  ),
  blocks: [
    part(t('Two more entries in the catalogue', 'إضافتين للقايمة')),
    {
      kind: 'cards',
      columns: 2,
      items: [
        { icon: 'workflow', title: 'Main program and sub-routines', tone: 'blue', body: t('A main program calls procedures, which call smaller ones — a hierarchy of calls, like classic C/Pascal programs.', 'برنامج رئيسي بينادي procedures، وهي بتنادي أصغر منها — شجرة نداءات، زي برامج C/Pascal الكلاسيك.') },
        { icon: 'shapes', title: 'Object-oriented (abstract data types)', tone: 'violet', body: t('Objects encapsulate data with the operations on it; they interact by calling each other’s methods.', 'الـ objects بتغلّف الداتا مع العمليات عليها؛ وبتتعامل مع بعض بنداء الـ methods.') },
      ],
    },

    part(t('Peer-to-peer', 'Peer-to-peer')),
    {
      kind: 'memorize',
      label: 'Peer-to-peer',
      text: 'All of the processes play similar roles, interacting cooperatively as peers to perform distributed activities or computations without distinction between clients and servers.',
    },
    {
      kind: 'idea',
      title: 'A study group instead of a lecture',
      icon: 'users',
      tone: 'teal',
      text: t(
        'Each peer runs the **application** and holds **shared objects**, and talks **directly** to other peers. Every peer both asks and answers.',
        'كل peer شغّال عليه **التطبيق** وشايل **objects مشتركة**، وبيكلّم الـ peers التانيين **مباشرة**. وكل peer بيسأل وبيجاوب في نفس الوقت.',
      ),
      analogy: t(
        'A lecture is client-server: one lecturer answers everyone, and if they are absent there is no class. A study group is P2P: everyone shares notes with everyone, and the group survives if one person stays home.',
        'المحاضرة client-server: دكتور واحد بيجاوب الكل، ولو غاب مفيش محاضرة. ومجموعة المذاكرة P2P: كل واحد بيشارك ملخصاته مع الكل، والمجموعة بتكمّل لو واحد قعد في البيت.',
      ),
    },
    {
      kind: 'diagram',
      id: 'p2p',
      title: t('Pure P2P vs P2P with a centralized index', 'P2P خالص ضد P2P بفهرس مركزي'),
      caption: t(
        'Left: Peers 1…N, each with the application and shared objects, connected directly. Right (the **Napster** architecture): peers ask a **central index server** who has a file, then transfer it **directly** between peers.',
        'على الشمال: Peers من 1 لـ N، كل واحد عليه التطبيق والـ objects المشتركة، ومتوصلين ببعض مباشرة. وعلى اليمين (معمار **Napster**): الـ peers بتسأل **سيرفر فهرس مركزي** مين عنده الملف، وبعدين بتنقله **مباشرة** بين بعض.',
      ),
    },
    {
      kind: 'asks',
      items: [
        { q: 'Examples?', a: t('**BitTorrent** file sharing, **Napster**, early **Skype** calls, **blockchain** networks such as Bitcoin.', 'مشاركة الملفات بـ **BitTorrent**، و**Napster**، ومكالمات **Skype** القديمة، وشبكات **البلوك تشين** زي Bitcoin.') },
        {
          q: 'Pros / cons?',
          a: t(
            '**Pros:** no single point of failure; **capacity grows with every new peer** (each brings storage and bandwidth); no expensive central server. **Cons:** **discovery** is hard (who has what?); **security and trust** (any peer can be malicious); **consistency** of shared data; individual peers come and go, so their availability is unreliable; harder to manage and monitor.',
            '**المميزات:** مفيش نقطة فشل وحيدة؛ **القدرة بتكبر مع كل peer جديد** (كل واحد بيجيب تخزين وbandwidth)؛ ومفيش سيرفر مركزي غالي. **العيوب:** **البحث** صعب (مين معاه إيه؟)؛ و**الأمان والثقة** (أي peer ممكن يبقى خبيث)؛ و**اتساق** الداتا المشتركة؛ والـ peers بتدخل وتخرج فوجود كل واحد مش مضمون؛ وأصعب في الإدارة والمراقبة.',
          ),
        },
      ],
    },

    part(t('P2P with a centralized index: Napster', 'P2P بفهرس مركزي: Napster')),
    {
      kind: 'flow',
      steps: [
        { icon: 'search', label: 'Ask the index', tone: 'violet', detail: t('A peer asks the central index server: “who has this song?”', 'الـ peer بيسأل سيرفر الفهرس: “مين معاه الأغنية دي؟”') },
        { icon: 'map', label: 'Get an address', tone: 'blue', detail: t('The index replies with peers that have it.', 'الفهرس بيرد بالـ peers اللي معاهم.') },
        { icon: 'handshake', label: 'Transfer peer-to-peer', tone: 'amber', detail: t('The file moves **directly** between the two peers — not through the server.', 'الملف بيتنقل **مباشرة** بين الـ peerين — مش عن طريق السيرفر.') },
      ],
    },
    {
      kind: 'versus',
      left: { title: 'Pure P2P', icon: 'network', tone: 'teal' },
      right: { title: 'Centralized index (Napster)', icon: 'server', tone: 'violet' },
      rows: [
        { aspect: 'Finding data', left: t('Hard: ask around the network.', 'صعب: تسأل في الشبكة كلها.'), right: t('Easy and fast: one lookup at the index.', 'سهل وسريع: سؤال واحد للفهرس.') },
        { aspect: 'Weak point', left: t('Discovery, trust.', 'البحث، والثقة.'), right: t('The index is a **single point of failure** (and of control: shutting it down stopped Napster).', 'الفهرس **نقطة فشل وحيدة** (ونقطة تحكم: قفله وقّف Napster).') },
        { aspect: 'Data transfer', left: t('Peer to peer.', 'من peer لـ peer.'), right: t('Still peer to peer.', 'برضه من peer لـ peer.') },
      ],
      verdict: t(
        'A **hybrid**: client-server for *finding*, peer-to-peer for *sharing* — combining styles, as Step 2a recommends for complex systems.',
        '**هجين**: client-server *للبحث*، وpeer-to-peer *للمشاركة* — دمج styles زي ما الخطوة 2a بتنصح في السيستمات المعقدة.',
      ),
    },
  ],
  keyTerms: [
    { term: 'Peer-to-peer (P2P)', definition: t('All processes play similar roles, cooperating as peers with no client/server distinction.', 'كل الـ processes ليها أدوار شبه بعض، وبتتعاون كـ peers من غير فرق client/server.') },
    { term: 'Peer', definition: t('A node running the application with shared objects; it both requests and serves.', 'node شغّال عليه التطبيق ومعاه objects مشتركة؛ بيطلب وبيخدم.') },
    { term: 'Centralized index (Napster)', definition: t('A central server only for discovery; transfers happen directly between peers.', 'سيرفر مركزي للبحث بس؛ والنقل بيحصل مباشرة بين الـ peers.') },
    { term: 'P2P pros', definition: t('No single point of failure, capacity grows with peers, no costly central server.', 'مفيش نقطة فشل وحيدة، القدرة بتكبر مع الـ peers، ومفيش سيرفر مركزي غالي.') },
    { term: 'P2P cons', definition: t('Discovery, security/trust, consistency, unreliable individual peers, hard management.', 'البحث، والأمان/الثقة، والاتساق، والـ peers مش مضمونين، وصعوبة الإدارة.') },
    { term: 'Language-influenced styles', definition: t('Main program and sub-routines; object-oriented (abstract data types).', 'Main program and sub-routines؛ وobject-oriented (abstract data types).') },
  ],
  recap: [
    t('Language-influenced styles: main program & sub-routines, object-oriented (ADTs).', 'styles متأثرة باللغات: main program & sub-routines، وobject-oriented (ADTs).'),
    t('P2P: all processes play similar roles, no client/server distinction; each peer = app + shared objects.', 'الـ P2P: كل الـ processes أدوارها شبه بعض، ومفيش client/server؛ وكل peer = تطبيق + objects مشتركة.'),
    t('Examples: BitTorrent, Napster, early Skype, blockchain.', 'أمثلة: BitTorrent وNapster وSkype القديم والبلوك تشين.'),
    t('Pros: no single point of failure, scales with peers. Cons: discovery, trust, consistency, unreliable peers.', 'المميزات: مفيش نقطة فشل وحيدة، وبيكبر مع الـ peers. العيوب: البحث، والثقة، والاتساق، والـ peers مش مضمونين.'),
    t('Napster: central index for discovery + direct P2P transfer (hybrid; the index is a single point of failure).', 'Napster: فهرس مركزي للبحث + نقل P2P مباشر (هجين؛ والفهرس نقطة فشل وحيدة).'),
  ],
}
