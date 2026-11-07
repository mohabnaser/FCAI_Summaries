import type { Section } from '../../../types'
import { part, t } from '../../sections/helpers'

/** Slides 40–50: sockets, remote procedure calls, pipes and remote method invocation. */
export const clientServer: Section = {
  id: 'c3-client-server',
  chapterId: 'chapter-3',
  order: 5,
  kicker: 'Lesson 05',
  title: 'Client–Server Communication',
  shortTitle: 'Client–Server',
  summary: t(
    'Besides shared memory and message passing, client–server systems use four techniques: sockets (IP address + port), remote procedure calls with stubs and marshalling, pipes (ordinary and named) and Java’s remote method invocation.',
    'غير الـ shared memory والـ message passing، أنظمة الـ client–server بتستخدم أربع تقنيات: الـ sockets (IP address + port)، والـ remote procedure calls بالـ stubs والـ marshalling، والـ pipes (العادية والـ named)، والـ remote method invocation في Java.',
  ),
  objectives: [
    t('Name the four client–server techniques.', 'تذكر التقنيات الأربعة للـ client–server.'),
    t('Explain a socket, its address format, well-known ports and the loopback address.', 'تشرح الـ socket، وشكل العنوان بتاعه، والـ well-known ports، والـ loopback address.'),
    t('Describe what the client and server stubs do in an RPC.', 'توصف الـ client stub والـ server stub بيعملوا إيه في الـ RPC.'),
    t('Contrast ordinary and named pipes, and relate RMI to RPC.', 'تقارن الـ ordinary pipes بالـ named pipes، وتربط الـ RMI بالـ RPC.'),
  ],
  estimatedMinutes: 14,
  quizId: 'quiz-c3-client-server',
  blocks: [
    {
      kind: 'lead',
      text: t(
        'Shared memory and message passing can be used in client–server systems as well. The lecture adds **four other techniques**: sockets, remote procedure calls, pipes and remote method invocation (Java).',
        'الـ shared memory والـ message passing ينفع يتستخدموا في أنظمة الـ client–server برضه. والمحاضرة بتضيف **أربع تقنيات تانية**: sockets وremote procedure calls وpipes وremote method invocation (Java).',
      ),
    },
    {
      kind: 'hook',
      title: t('The four techniques, in lecture order', 'التقنيات الأربعة بترتيب المحاضرة'),
      phrase: 'Some Remote Programs Respond.',
      letters: [
        { letter: 'S', word: 'Sockets' },
        { letter: 'R', word: 'Remote Procedure Calls' },
        { letter: 'P', word: 'Pipes' },
        { letter: 'R', word: 'Remote Method Invocation' },
      ],
    },

    part(t('Sockets', 'الـ Sockets')),
    {
      kind: 'flow',
      title: t('Socket communication', 'التواصل بالـ Sockets'),
      caption: t(
        'A socket is an **endpoint for communication**, identified by an **IP address concatenated with a port number**. A pair of processes communicating over a network uses a **pair of sockets**.',
        'الـ socket هو **نقطة نهاية للتواصل**، وبيتعرّف بـ **IP address ومعاه port number**. واتنين processes بيتواصلوا عبر الشبكة بيستخدموا **اتنين sockets**.',
      ),
      steps: [
        { icon: 'laptop', label: 'Host X · 146.86.5.20', detail: t('Client socket **146.86.5.20:1625**.', 'الـ client socket هو **146.86.5.20:1625**.'), tone: 'cyan' },
        { icon: 'globe', label: 'Network', detail: t('The connection joins the two endpoints.', 'الاتصال بيربط النقطتين.'), tone: 'violet' },
        { icon: 'server', label: 'Web server · 161.25.19.8', detail: t('Server socket **161.25.19.8:80**, listening on its port.', 'الـ server socket هو **161.25.19.8:80**، وبيسمع على الـ port بتاعه.'), tone: 'amber' },
      ],
    },
    {
      kind: 'stats',
      items: [
        { value: 'IP:port', label: t('Socket address, e.g. 161.25.19.8:1625 = port 1625 on host 161.25.19.8', 'عنوان الـ socket، مثلًا 161.25.19.8:1625 = الـ port رقم 1625 على الـ host 161.25.19.8'), tone: 'cyan', icon: 'link' },
        { value: '< 1024', label: t('Well-known ports, used for standard services', 'الـ well-known ports، للخدمات القياسية'), tone: 'amber', icon: 'shield' },
        { value: '127.0.0.1', label: t('Loopback: a client and server on the same host refer to itself', 'الـ Loopback: client وserver على نفس الجهاز بيشاوروا على نفسه'), tone: 'teal', icon: 'repeat' },
      ],
    },
    {
      kind: 'cards',
      columns: 3,
      intro: t('Java offers three socket types:', 'Java فيها تلات أنواع sockets:'),
      items: [
        { icon: 'cable', tag: 'TCP', title: 'Socket', body: t('**Connection-oriented**.', '**Connection-oriented**.'), tone: 'cyan' },
        { icon: 'send', tag: 'UDP', title: 'DatagramSocket', body: t('**Connectionless**.', '**Connectionless**.'), tone: 'violet' },
        { icon: 'radio', tag: 'many receivers', title: 'MulticastSocket', body: t('Data can be sent to **multiple recipients**.', 'الداتا ممكن تتبعت لـ **أكتر من مستقبل**.'), tone: 'amber' },
      ],
    },
    {
      kind: 'code',
      title: 'The “Date” server',
      language: 'java',
      code: `import java.net.*;
import java.io.*;

public class DateServer
{
    public static void main(String[] args) {
        try {
            ServerSocket sock = new ServerSocket(6013);

            /* now listen for connections */
            while (true) {
                Socket client = sock.accept();

                PrintWriter pout = new
                    PrintWriter(client.getOutputStream(), true);

                /* write the Date to the socket */
                pout.println(new java.util.Date().toString());

                /* close the socket and resume */
                /* listening for connections */
                client.close();
            }
        }
        catch (IOException ioe) {
            System.err.println(ioe);
        }
    }
}`,
      caption: t(
        'The server listens on port 6013, accept() waits for a client, writes the date to the socket, closes it and resumes listening.',
        'الـ server بيسمع على الـ port رقم 6013، والـ accept() بتستنى client، وبعدين بيكتب التاريخ في الـ socket، ويقفله، ويرجع يسمع تاني.',
      ),
    },

    part(t('Remote procedure calls (RPC)', 'الـ Remote procedure calls (RPC)')),
    {
      kind: 'flow',
      title: t('Execution of an RPC', 'تنفيذ الـ RPC'),
      caption: t(
        'RPC **abstracts procedure calls between processes on networked systems** and again uses ports for service differentiation. The **stub** is the client-side proxy for the actual procedure on the server.',
        'الـ RPC **بيخلّي الـ procedure calls بين processes على أجهزة متوصلة بشبكة تبان عادية**، وبيستخدم الـ ports برضه عشان يفرّق بين الخدمات. والـ **stub** هو الـ proxy على جهة الـ client للـ procedure الحقيقية اللي على الـ server.',
      ),
      steps: [
        { icon: 'code', label: 'Client calls the procedure', detail: t('Looks like an ordinary local call.', 'شكلها call عادية local.'), tone: 'cyan' },
        { icon: 'package', label: 'Client stub', detail: t('**Locates the server** (port) and **marshalls the parameters** into a message.', '**بيحدد مكان الـ server** (الـ port) و**بيعمل marshalling للـ parameters** في رسالة.'), tone: 'violet' },
        { icon: 'send', label: 'Message over the network', detail: t('Sent to the server-side stub.', 'بتتبعت للـ server-side stub.'), tone: 'amber' },
        { icon: 'boxes', label: 'Server stub', detail: t('Receives the message, **unpacks the marshalled parameters** and performs the procedure.', 'بيستقبل الرسالة، و**يفك الـ parameters**، وينفّذ الـ procedure.'), tone: 'teal' },
        { icon: 'refresh', label: 'Result returns', detail: t('The reply travels back to the client.', 'الرد بيرجع للـ client.'), tone: 'cyan' },
      ],
    },

    part(t('Pipes', 'الـ Pipes')),
    {
      kind: 'lead',
      text: t(
        'A pipe acts as a **channel allowing two processes to communicate** — a simpler way, with limitations. Four design issues: is it **unidirectional or bidirectional**? for two-way traffic, **half- or full-duplex**? must the processes have a **relationship (parent–child)**? can it be used **over a network**, or only on the same machine?',
        'الـ pipe عبارة عن **قناة بتخلّي اتنين processes يتواصلوا** — طريقة أبسط، بس ليها حدود. وفيه أربع أسئلة تصميم: هو **اتجاه واحد ولا اتجاهين**؟ ولو اتجاهين، **half ولا full-duplex**؟ لازم يبقى فيه **علاقة (أب–ابن)** بين الـ processes؟ وينفع يتستخدم **على الشبكة** ولا على نفس الجهاز بس؟',
      ),
    },
    {
      kind: 'versus',
      left: { title: 'Ordinary pipe', icon: 'cable', tone: 'cyan', tagline: t('Producer → write-end · read-end → consumer', 'Producer ← write-end · read-end ← consumer') },
      right: { title: 'Named pipe', icon: 'split', tone: 'amber', tagline: t('“More powerful than ordinary pipes”', '“أقوى من الـ ordinary pipes”') },
      rows: [
        { aspect: 'Direction', left: t('**Unidirectional** (standard producer–consumer style)', '**اتجاه واحد** (بأسلوب الـ producer–consumer)'), right: t('Can be **bidirectional**', 'ممكن **اتجاهين**') },
        { aspect: 'Relationship', left: t('**Requires a parent–child** relationship: the parent creates the pipe to talk to its child', '**لازم علاقة أب–ابن**: الأب بيعمل الـ pipe عشان يكلّم ابنه'), right: t('**No parent–child** relationship required', '**مش لازم** علاقة أب–ابن') },
        { aspect: 'Users', left: t('The two related processes', 'الاتنين processes اللي بينهم علاقة'), right: t('**Several processes** can use it', '**كذا process** ممكن يستخدموه') },
        { aspect: 'In UNIX', left: t('A special type of file, accessed with **read()** and **write()**', 'نوع خاص من الـ files، بيتوصل له بـ **read()** و**write()**'), right: t('Called **FIFOs**; once created they appear as typical files, used with open(), read(), write(), close()', 'اسمها **FIFOs**؛ أول ما تتعمل بتبان كـ files عادية، وبتتستخدم بـ open() وread() وwrite() وclose()') },
        { aspect: 'In Windows', left: t('—', '—'), right: t('Richer: **full-duplex**, same **or different machines**, byte- or message-oriented data', 'أغنى: **full-duplex**، على نفس الجهاز **أو أجهزة مختلفة**، وداتا byte أو message-oriented') },
      ],
      verdict: t(
        'Both UNIX and Windows support named pipes, although the implementation details differ greatly.',
        'الـ UNIX والـ Windows الاتنين بيدعموا الـ named pipes، بس تفاصيل التنفيذ مختلفة جدًا.',
      ),
    },

    part(t('Remote method invocation (RMI)', 'الـ Remote method invocation (RMI)')),
    {
      kind: 'flow',
      title: t('Marshalling parameters in RMI', 'الـ Marshalling للـ parameters في الـ RMI'),
      caption: t(
        'RMI is a **Java mechanism similar to RPC**: a Java program on one machine (JVM) **invokes a method on a remote object** in another JVM.',
        'الـ RMI **آلية في Java شبه الـ RPC**: برنامج Java على جهاز (JVM) **بينادي method على remote object** في JVM تاني.',
      ),
      steps: [
        { icon: 'code', label: 'val = server.someMethod(A, B)', detail: t('The client calls the remote method.', 'الـ client بينادي الـ remote method.'), tone: 'cyan' },
        { icon: 'package', label: 'Stub', detail: t('Packages the **method name and parameters A, B**.', 'بيحزم **اسم الـ method والـ parameters A وB**.'), tone: 'violet' },
        { icon: 'boxes', label: 'Skeleton', detail: t('Unpacks them and calls **someMethod(Object x, Object y)** on the remote object.', 'بيفكّهم وينادي **someMethod(Object x, Object y)** على الـ remote object.'), tone: 'amber' },
        { icon: 'refresh', label: 'boolean return value', detail: t('The result is sent back to the client.', 'النتيجة بترجع للـ client.'), tone: 'teal' },
      ],
    },
    {
      kind: 'confusions',
      items: [
        {
          wrong: t('“RPC connects two processes on the same system.”', '“الـ RPC بيوصّل اتنين processes على نفس الجهاز.”'),
          right: t('RPC is for processes on **networked (separate) systems**.', 'الـ RPC للـ processes اللي على **أجهزة منفصلة متوصلة بشبكة**.'),
        },
        {
          wrong: t('“RMI = Remote Memory Invocation.”', '“الـ RMI = Remote Memory Invocation.”'),
          right: t('**Remote Method Invocation** — Java’s RPC for objects.', '**Remote Method Invocation** — الـ RPC بتاع Java للـ objects.'),
        },
        {
          wrong: t('“Any two processes can use an ordinary pipe.”', '“أي اتنين processes ينفع يستخدموا ordinary pipe.”'),
          right: t('Ordinary pipes need a **parent–child** relationship; named pipes do not.', 'الـ ordinary pipes محتاجة علاقة **أب–ابن**؛ الـ named pipes لأ.'),
        },
      ],
    },
    {
      kind: 'exam',
      title: t('Exam radar: stubs, RPC and RMI', 'رادار الامتحان: الـ stubs والـ RPC والـ RMI'),
      body: t(
        'Five items. The **client-side stub** (it does all three jobs), what **RPC** is used for (processes on separate systems), the **RMI full form** twice with the correct option in a different place, and a written question on the **four techniques** — sockets, RPC, pipes and RMI.',
        'خمس أسئلة. الـ **client-side stub** (بيعمل التلات حاجات)، والـ **RPC** بيتستخدم في إيه (processes على أجهزة منفصلة)، و**الاسم الكامل لـ RMI** مرتين والإجابة الصح في مكان مختلف، وسؤال مكتوب عن **التقنيات الأربعة** — sockets وRPC وpipes وRMI.',
      ),
      refs: ['c3-client-stub', 'c3-rpc-separate-systems', 'c3-rmi-2024', 'c3-rmi-2020', 'c3-client-server-essay'],
    },
    {
      kind: 'recap',
      items: [
        t('Four techniques: sockets, RPC, pipes, RMI.', 'أربع تقنيات: sockets وRPC وpipes وRMI.'),
        t('Socket = endpoint = IP + port; ports < 1024 well known; 127.0.0.1 loopback.', 'الـ Socket = نقطة نهاية = IP + port؛ الـ ports < 1024 well known؛ و127.0.0.1 loopback.'),
        t('Java: Socket (TCP), DatagramSocket (UDP), MulticastSocket.', 'Java: Socket (TCP) وDatagramSocket (UDP) وMulticastSocket.'),
        t('RPC: client stub locates the server and marshals; server stub unpacks and performs.', 'الـ RPC: الـ client stub بيحدد الـ server ويعمل marshal؛ والـ server stub بيفك وينفّذ.'),
        t('Ordinary pipe: one-way, parent–child. Named pipe (FIFO): two-way, no relation, many processes.', 'الـ Ordinary pipe: اتجاه واحد وأب–ابن. الـ Named pipe (FIFO): اتجاهين ومن غير علاقة وprocesses كتير.'),
        t('RMI: Java, invoke a method on a remote object; stub and skeleton marshal the parameters.', 'الـ RMI: في Java، تنادي method على remote object؛ والـ stub والـ skeleton بيعملوا marshal للـ parameters.'),
      ],
    },
  ],
  examFocus: [
    t('The client-side stub locates the server, marshals the parameters and sends them to the server-side stub.', 'الـ client-side stub بيحدد مكان الـ server، ويعمل marshal للـ parameters، ويبعتها للـ server-side stub.'),
    t('RPC is used for communication between processes on separate systems; RMI is Remote Method Invocation.', 'الـ RPC للتواصل بين processes على أجهزة منفصلة؛ والـ RMI هو Remote Method Invocation.'),
    t('Four client–server techniques: sockets, RPC, pipes and RMI.', 'أربع تقنيات للـ client–server: sockets وRPC وpipes وRMI.'),
  ],
  keyTerms: [
    { term: 'Socket', definition: t('An endpoint for communication, identified by an IP address and a port number.', 'نقطة نهاية للتواصل، بتتعرّف بـ IP address وport number.') },
    { term: 'Loopback', definition: t('127.0.0.1 — the address a host uses to refer to itself.', '127.0.0.1 — العنوان اللي الجهاز بيستخدمه عشان يشاور على نفسه.') },
    { term: 'Stub', definition: t('Client-side proxy that locates the server and marshals the parameters.', 'Proxy على جهة الـ client بيحدد الـ server ويعمل marshal للـ parameters.') },
    { term: 'Marshalling', definition: t('Packing parameters into a form that can be sent over the network.', 'تحزيم الـ parameters في شكل ينفع يتبعت على الشبكة.') },
    { term: 'Ordinary pipe', definition: t('One-way channel between a parent and its child.', 'قناة اتجاه واحد بين أب وابنه.') },
    { term: 'Named pipe (FIFO)', definition: t('Bidirectional pipe usable by several unrelated processes.', 'Pipe اتجاهين ينفع يستخدمه كذا process من غير علاقة بينهم.') },
    { term: 'RMI', definition: t('Remote Method Invocation: Java mechanism to invoke a method on a remote object.', 'Remote Method Invocation: آلية في Java لنداء method على remote object.') },
  ],
}
