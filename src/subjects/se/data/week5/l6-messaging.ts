import type { Lesson } from '../../types'
import { part, t } from '../helpers'

/** Slides 26–28: messaging — asynchronous communication through queues, and its quality attributes. */
export const messaging: Lesson = {
  id: 'w5-messaging',
  weekId: 'week-5',
  order: 6,
  title: 'Messaging: Send It and Move On',
  shortTitle: 'Messaging',
  slides: [26, 27, 28],
  minutes: 10,
  tldr: t(
    'In **messaging**, clients send requests to a **queue**, where the message is **stored until an application removes it**. After writing the message, the client **continues without waiting** — **asynchronous** communication. Availability: **queues can be replicated** across messaging servers. Modifiability: senders and receivers are coupled only by the **queue and the message format**.',
    'في الـ **messaging**، الـ clients بتبعت طلباتها لـ **queue**، والرسالة **بتفضل متخزنة لحد ما تطبيق ياخدها**. وبعد ما الـ client يكتب الرسالة، **بيكمّل من غير ما يستنى** — اتصال **غير متزامن (asynchronous)**. والـ Availability: **الـ queues ممكن تتكرر** على كذا messaging server. والـ Modifiability: المرسل والمستقبل مربوطين بس بـ **الـ queue وشكل الرسالة**.',
  ),
  blocks: [

    part(t('How messaging works', 'الـ messaging بيشتغل إزاي')),
    {
      kind: 'diagram',
      id: 'messaging',
      title: t('Clients → queue → servers', 'Clients ← queue ← servers'),
      caption: t(
        'Clients write messages into the **queue** and carry on; the queue holds each message until a server removes it; servers process messages at their own pace.',
        'الـ clients بتكتب الرسايل في الـ **queue** وتكمّل؛ والـ queue بتشيل كل رسالة لحد ما سيرفر ياخدها؛ والسيرفرات بتعالج الرسايل على سرعتها.',
      ),
    },
    {
      kind: 'memorize',
      label: 'Key property — asynchronous communication',
      text: 'Clients send requests to the queue, where the message is stored until an application removes it. After the client has written the message to the queue, it continues without waiting for the message to be removed.',
    },
    {
      kind: 'idea',
      title: 'A mailbox, not a phone call',
      icon: 'megaphone',
      tone: 'amber',
      text: t(
        'Sender and receiver don’t need to be available at the same time — the queue sits between them and remembers.',
        'المرسل والمستقبل مش محتاجين يبقوا متاحين في نفس الوقت — الـ queue قاعدة بينهم وفاكرة.',
      ),
      analogy: t(
        'Ordering at a busy restaurant: the waiter pins your order on the kitchen rail and goes to the next table. Cooks take orders off the rail when they are free. Nobody stands waiting.',
        'الطلب في مطعم زحمة: الجرسون بيعلّق طلبك على لوحة المطبخ ويروح للترابيزة اللي بعدها. والطباخين بياخدوا الطلبات من اللوحة لما يفضوا. ومحدش واقف مستني.',
      ),
    },
    {
      kind: 'versus',
      title: t('Synchronous (n-tier) vs asynchronous (messaging)', 'متزامن (n-tier) ضد غير متزامن (messaging)'),
      left: { title: 'Synchronous call', icon: 'clock', tone: 'blue' },
      right: { title: 'Asynchronous message', icon: 'megaphone', tone: 'amber' },
      rows: [
        { aspect: 'Caller', left: t('Waits for the reply.', 'بيستنى الرد.'), right: t('Writes the message and **continues**.', 'بيكتب الرسالة و**يكمّل**.') },
        { aspect: 'If receiver is down', left: t('The call fails.', 'الطلب بيفشل.'), right: t('The message waits safely in the queue.', 'الرسالة بتستنى بأمان في الـ queue.') },
        { aspect: 'Coupling', left: t('Both must be up and know each other’s interface.', 'الاتنين لازم يبقوا شغالين وعارفين interface بعض.'), right: t('Only the queue and the **message format** are shared.', 'المشترك بس الـ queue و**شكل الرسالة**.') },
      ],
    },

    part(t('Addressing quality attributes', 'التعامل مع الـ quality attributes')),
    {
      kind: 'table',
      caption: t('Messaging vs the quality attributes', 'الـ Messaging والـ quality attributes'),
      headers: ['Quality', 'How messaging addresses it'],
      rows: [
        [t('Availability'), t('**Queues can be replicated across messaging servers** — losing one server doesn’t lose the messages.', '**الـ queues ممكن تتكرر على كذا messaging server** — وقوع سيرفر مبيضيّعش الرسايل.')],
        [t('Modifiability'), t('**Asynchronous communication** and the **message format**: senders and receivers can change independently as long as the format holds.', '**الاتصال غير المتزامن** و**شكل الرسالة**: المرسل والمستقبل يقدروا يتغيروا كل واحد لوحده طالما الشكل ثابت.')],
      ],
    },
    {
      kind: 'asks',
      items: [
        {
          q: 'Modifiability — why do “asynchronous communication” and “message format” matter?',
          a: t(
            'Because they are the **only contract** between the two sides. A client doesn’t know which server (or how many) will process its message, so you can add, replace or move servers freely. But the **message format** becomes the thing you must keep stable — change it and every sender and receiver is affected.',
            'لأنهم **العقد الوحيد** بين الطرفين. الـ client مش عارف أنهي سيرفر (ولا كام واحد) هيعالج رسالته، فتقدر تزوّد أو تبدّل أو تنقل سيرفرات براحتك. بس **شكل الرسالة** بيبقى الحاجة اللي لازم تفضل ثابتة — غيّرها وكل مرسل ومستقبل هيتأثر.',
          ),
        },
      ],
    },
    {
      kind: 'callout',
      tone: 'insight',
      title: t('Connectors in action', 'الـ Connectors في الأكشن'),
      body: t(
        'Week 4 listed **message queues** as a connector type; here the connector *is* the style. Switching a call to a queue changes availability and modifiability without changing the components’ jobs.',
        'أسبوع 4 ذكر **الـ message queues** كنوع connector؛ وهنا الـ connector *هو* الـ style. وتبديل نداء بـ queue بيغيّر الـ availability والـ modifiability من غير ما شغل الـ components يتغير.',
      ),
    },
  ],
  keyTerms: [
    { term: 'Messaging style', definition: t('Clients send messages to a queue; servers remove and process them.', 'الـ clients بتبعت رسايل لـ queue؛ والسيرفرات بتاخدها وتعالجها.') },
    { term: 'Queue', definition: t('Stores each message until an application removes it.', 'بتخزّن كل رسالة لحد ما تطبيق ياخدها.') },
    { term: 'Asynchronous communication', definition: t('After writing the message, the client continues without waiting for it to be removed.', 'بعد ما الـ client يكتب الرسالة، بيكمّل من غير ما يستنى حد ياخدها.') },
    { term: 'Messaging availability', definition: t('Queues can be replicated across messaging servers.', 'الـ queues ممكن تتكرر على كذا messaging server.') },
    { term: 'Messaging modifiability', definition: t('Asynchronous communication and a shared message format decouple senders and receivers.', 'الاتصال غير المتزامن وشكل الرسالة المشترك بيفصلوا المرسل عن المستقبل.') },
  ],
  recap: [
    t('Messaging: clients → queue → servers.', 'الـ Messaging: الـ clients ← الـ queue ← السيرفرات.'),
    t('Asynchronous: the message is stored until removed; the client continues without waiting.', 'غير متزامن: الرسالة بتتخزن لحد ما حد ياخدها؛ والـ client بيكمّل من غير ما يستنى.'),
    t('Availability: replicate queues across messaging servers.', 'الـ Availability: كرّر الـ queues على كذا messaging server.'),
    t('Modifiability: asynchronous communication + message format; the format is the contract to keep stable.', 'الـ Modifiability: الاتصال غير المتزامن + شكل الرسالة؛ والشكل هو العقد اللي لازم يفضل ثابت.'),
  ],
}
