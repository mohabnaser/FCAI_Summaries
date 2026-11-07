import type { Section } from '../../../types'
import { part, t } from '../../sections/helpers'

/** Slides 13–19: system calls, APIs, the read() example, implementation, parameter passing. */
export const systemCalls: Section = {
  id: 'c2-system-calls',
  chapterId: 'chapter-2',
  order: 2,
  kicker: 'Lesson 02',
  title: 'System Calls, APIs & Parameter Passing',
  shortTitle: 'System Calls & API',
  summary: t(
    'The doorway between a program and the kernel: what a system call is, why programs use an API instead, how one call is looked up by number and run in kernel mode, and the three ways its parameters reach the OS.',
    'الباب بين البرنامج والـ kernel: يعني إيه system call، ليه البرامج بتستخدم API بدلها، إزاي الـ call بتتدوّر برقمها وتتنفّذ في kernel mode، والتلات طرق اللي الـ parameters بتوصل بيها للـ OS.',
  ),
  objectives: [
    t('Define a system call and name the three common APIs.', 'تعرّف الـ system call وتذكر أشهر تلات APIs.'),
    t('Explain why programs use an API rather than calling system calls directly.', 'تشرح ليه البرامج بتستخدم API بدل ما تنادي الـ system calls مباشرة.'),
    t('Read the read() API: return value, function name and parameters.', 'تقرا الـ read() API: الـ return value واسم الـ function والـ parameters.'),
    t('Trace a call through the system-call interface and its table.', 'تتابع call جوه الـ system-call interface والجدول بتاعه.'),
    t('Describe the three parameter-passing methods and their limits.', 'توصف التلات طرق لتمرير الـ parameters وحدود كل واحدة.'),
  ],
  estimatedMinutes: 18,
  quizId: 'quiz-c2-system-calls',
  blocks: [
    part(
      t('What a system call is', 'يعني إيه system call'),
      t('Three facts, then a question the lecture leaves for you.', 'تلات حقائق، وبعدين سؤال المحاضرة سايبه ليك.'),
    ),
    {
      kind: 'definition',
      term: 'System call',
      definition: t(
        'The **programming interface to the services provided by the OS**. Typically written in a high-level language (C or C++).',
        'الـ **programming interface لخدمات الـ OS**. وغالبًا مكتوبة بلغة high-level (C أو C++).',
      ),
      detail: t(
        'System calls are **mostly accessed by programs via a high-level Application Programming Interface (API)** rather than direct system call use.',
        'الـ system calls **غالبًا البرامج بتوصلها عن طريق Application Programming Interface (API) عالية المستوى** بدل ما تناديها مباشرة.',
      ),
    },
    {
      kind: 'cards',
      title: t('The three most common APIs', 'أشهر تلات APIs'),
      columns: 3,
      items: [
        { icon: 'monitor', tag: 'Windows', title: 'Win32 API', body: t('For Windows.', 'لـ Windows.'), tone: 'cyan' },
        { icon: 'terminal', tag: 'POSIX-based', title: 'POSIX API', body: t('For POSIX-based systems — virtually all versions of **UNIX, Linux and Mac OS X**.', 'للأنظمة المبنية على POSIX — تقريبًا كل نسخ **UNIX وLinux وMac OS X**.'), tone: 'teal' },
        { icon: 'code', tag: 'JVM', title: 'Java API', body: t('For the **Java virtual machine (JVM)**.', 'للـ **Java virtual machine (JVM)**.'), tone: 'amber' },
      ],
    },
    {
      kind: 'versus',
      title: t('The lecture asks: why use APIs rather than system calls?', 'المحاضرة بتسأل: ليه نستخدم APIs بدل الـ system calls؟'),
      left: { title: 'Calling the API', icon: 'code', tone: 'teal', tagline: t('What programs usually do', 'اللي البرامج بتعمله عادة') },
      right: { title: 'Calling the system call directly', icon: 'chip', tone: 'rose', tagline: t('Possible, but rarely done', 'ممكن، بس نادرًا') },
      rows: [
        { aspect: 'Portability', left: t('The same program compiles on any system supporting the API', 'نفس البرنامج بيتعمل له compile على أي نظام بيدعم الـ API'), right: t('Tied to one kernel’s call numbers and conventions', 'مربوط بأرقام وطريقة kernel واحد') },
        { aspect: 'Ease of use', left: t('Simple, documented functions (e.g. `read()`)', 'Functions بسيطة وموثّقة (زي `read()`)'), right: t('More detailed and harder to work with', 'تفاصيل أكتر وأصعب في الاستخدام') },
        { aspect: 'Details', left: t('**Most details of the OS interface are hidden** by the API', '**معظم تفاصيل واجهة الـ OS مستخبية** ورا الـ API'), right: t('The programmer handles them all', 'المبرمج بيتعامل معاها كلها') },
      ],
      verdict: t(
        'The lecture only poses the question; portability and simplicity are the textbook’s answer.',
        'المحاضرة بتطرح السؤال بس؛ والـ portability والبساطة هما إجابة الكتاب.',
      ),
    },

    part(
      t('A system-call sequence, step by step', 'سلسلة system calls خطوة بخطوة'),
      t('Even copying one file needs a long sequence of system calls.', 'حتى نسخ file واحد محتاج سلسلة طويلة من الـ system calls.'),
    ),
    {
      kind: 'visual',
      id: 'file-copy-syscalls',
      title: t('Copy one file into another: count the system calls', 'انسخ file لـ file تاني: عِد الـ system calls'),
      caption: t(
        'Run it once with a missing input file and once normally. Every step talks to the OS — prompts, input, open, create, read, write, close, exit.',
        'شغّلها مرة والـ input file مش موجود ومرة عادي. كل خطوة بتكلّم الـ OS — prompts وinput وopen وcreate وread وwrite وclose وexit.',
      ),
    },

    part(
      t('Reading an API: read()', 'قراءة API: read()'),
      t('The UNIX/Linux `read()` function, from its man page (`man read`).', 'الـ function `read()` في UNIX/Linux، من الـ man page بتاعتها (`man read`).'),
    ),
    {
      kind: 'code',
      title: 'man read — standard API',
      language: 'c',
      code: `#include <unistd.h>

ssize_t   read(int fd, void *buf, size_t count);
// return    function
// value     name      ─────── parameters ───────`,
      caption: t(
        'The program must include `unistd.h`, which defines the `ssize_t` and `size_t` data types.',
        'البرنامج لازم يعمل include لـ `unistd.h`، اللي فيها تعريف الأنواع `ssize_t` و`size_t`.',
      ),
    },
    {
      kind: 'cards',
      columns: 3,
      items: [
        { icon: 'file', tag: 'int fd', title: 'File descriptor', body: t('The file to be read.', 'الـ file اللي هيتقري.'), tone: 'cyan' },
        { icon: 'inbox', tag: 'void *buf', title: 'Buffer', body: t('Where the data will be read into.', 'المكان اللي الداتا هتتقري فيه.'), tone: 'violet' },
        { icon: 'gauge', tag: 'size_t count', title: 'Count', body: t('The **maximum** number of bytes to read into the buffer.', '**أقصى** عدد bytes يتقري في الـ buffer.'), tone: 'amber' },
      ],
    },
    {
      kind: 'stats',
      title: t('What read() returns', 'الـ read() بترجع إيه'),
      items: [
        { value: 'n > 0', label: t('success: the number of bytes read', 'نجاح: عدد الـ bytes اللي اتقرت'), icon: 'check', tone: 'teal' },
        { value: '0', label: t('end of file', 'نهاية الـ file'), icon: 'file', tone: 'amber' },
        { value: '−1', label: t('an error occurred', 'حصل error'), icon: 'alert', tone: 'rose' },
      ],
    },

    part(
      t('How a system call is implemented', 'الـ system call بتتنفّذ إزاي'),
      t('A number, a table, and a crossing into kernel mode.', 'رقم، وجدول، وعبور لـ kernel mode.'),
    ),
    {
      kind: 'flow',
      steps: [
        { icon: 'list', label: 'A number per call', detail: t('Typically **a number is associated with each system call**.', 'عادةً **كل system call ليها رقم**.'), tone: 'violet' },
        { icon: 'database', label: 'A table indexed by number', detail: t('The **system-call interface maintains a table** indexed by these numbers.', 'الـ **system-call interface عنده جدول** مترتب بالأرقام دي.'), tone: 'cyan' },
        { icon: 'shield', label: 'Invoke in the kernel', detail: t('It **invokes the intended system call in the OS kernel**.', 'بي**نادي الـ system call المطلوبة في الـ kernel**.'), tone: 'amber' },
        { icon: 'refresh', label: 'Return status + values', detail: t('It **returns the status of the system call and any return values**.', 'بي**رجّع حالة الـ system call وأي return values**.'), tone: 'teal' },
      ],
      caption: t(
        'The caller **need know nothing** about how the call is implemented — just obey the API and understand what the OS will do.',
        'اللي بينادي **مش محتاج يعرف أي حاجة** عن طريقة التنفيذ — بس يمشي على الـ API ويفهم الـ OS هيعمل إيه.',
      ),
    },
    {
      kind: 'visual',
      id: 'system-call-flow',
      title: t('API → system-call interface → kernel, and back', 'API ← system-call interface ← kernel، والرجوع'),
      caption: t(
        'Two examples: open() called directly, and printf() through the C library. Watch the user/kernel line: the program never crosses it itself.',
        'مثالين: open() مباشرة، وprintf() عن طريق الـ C library. ركّز على خط user/kernel: البرنامج عمره ما بيعدّيه بنفسه.',
      ),
    },
    {
      kind: 'callout',
      tone: 'insight',
      title: t('Who hides the details?', 'مين اللي بيخبّي التفاصيل؟'),
      body: t(
        'Most details of the OS interface are hidden by the API and **managed by a set of functions built into libraries included with the compiler** (the run-time support library).',
        'معظم تفاصيل واجهة الـ OS مستخبية ورا الـ API و**بتديرها مجموعة functions موجودة في libraries جاية مع الـ compiler** (الـ run-time support library).',
      ),
    },

    part(
      t('Passing parameters to the OS', 'تمرير الـ parameters للـ OS'),
      t(
        'Often more information is needed than just which call — the exact type and amount vary by OS and call.',
        'كتير بنحتاج معلومات أكتر من مجرد رقم الـ call — ونوعها وكميتها بيختلفوا حسب الـ OS والـ call.',
      ),
    ),
    {
      kind: 'cards',
      title: t('Three general methods', 'تلات طرق عامة'),
      columns: 3,
      items: [
        {
          icon: 'cpu',
          tag: '1 · simplest',
          title: 'Registers',
          body: t('Pass the parameters **in registers**. In some cases there may be **more parameters than registers**.', 'مرّر الـ parameters **في registers**. وساعات يبقى فيه **parameters أكتر من الـ registers**.'),
          tone: 'cyan',
        },
        {
          icon: 'database',
          tag: '2 · Linux, Solaris',
          title: 'Block / table',
          body: t('Store the parameters in a **block or table in memory**; pass **the address of the block in a register**.', 'خزّن الـ parameters في **block أو table في الـ memory**؛ ومرّر **عنوان الـ block في register**.'),
          tone: 'violet',
        },
        {
          icon: 'layers',
          tag: '3',
          title: 'Stack',
          body: t('Parameters are **pushed onto the stack by the program** and **popped off by the operating system**.', 'الـ parameters **البرنامج بيعملها push على الـ stack** و**الـ OS بيعملها pop**.'),
          tone: 'amber',
        },
      ],
    },
    {
      kind: 'visual',
      id: 'parameter-passing',
      title: t('Parameter passing, three ways (“system call 13”)', 'تمرير الـ parameters بتلات طرق (“system call 13”)'),
      caption: t('Raise the number of parameters and see which method runs out of room.', 'زوّد عدد الـ parameters وشوف أنهي طريقة المكان بيخلص منها.'),
    },
    {
      kind: 'hook',
      title: t('Three methods, one limit', 'تلات طرق، وحد واحد'),
      phrase: 'Registers run out; Block and Stack don’t.',
      letters: [
        { letter: 'R', word: 'Registers — simplest, limited' },
        { letter: 'B', word: 'Block/table — address in a register' },
        { letter: 'S', word: 'Stack — push by program, pop by OS' },
      ],
      body: t(
        '“Block and stack methods do not limit the number or length of parameters being passed.”',
        '“Block and stack methods do not limit the number or length of parameters being passed.”',
      ),
    },
    {
      kind: 'confusions',
      items: [
        {
          wrong: t('“Programs normally call system calls directly.”', '“البرامج عادة بتنادي الـ system calls مباشرة.”'),
          right: t('Programs **mostly use an API** (Win32, POSIX, Java); the API calls the system calls.', 'البرامج **غالبًا بتستخدم API** (Win32 وPOSIX وJava)؛ والـ API هي اللي بتنادي الـ system calls.'),
        },
        {
          wrong: t('“In the table method, the whole table is copied into registers.”', '“في طريقة الـ table، الجدول كله بيتنسخ في الـ registers.”'),
          right: t('Only the **address** of the block goes in a register.', 'بس **عنوان** الـ block هو اللي بيتحط في register.'),
        },
        {
          wrong: t('“The OS pushes parameters and the program pops them.”', '“الـ OS بيعمل push للـ parameters والبرنامج بيعمل pop.”'),
          right: t('The **program pushes**, the **OS pops**.', '**البرنامج بيعمل push**، و**الـ OS بيعمل pop**.'),
        },
      ],
    },
    {
      kind: 'exam',
      title: t('Exam radar: system calls', 'رادار الامتحان: الـ system calls'),
      body: t(
        'Two fill-ins quote the lecture directly — what system calls are **mostly accessed via**, and what **provides an interface to the services** of the OS. Two written questions ask for the **three parameter-passing methods**; the longer one also asks for the purpose of system calls and of system programs (Section 4), so answer it in three labelled parts.',
        'اتنين fill-in بيقتبسوا المحاضرة بالحرف — الـ system calls **غالبًا بنوصلها عن طريق إيه**، وإيه اللي **بيوفّر interface لخدمات** الـ OS. وسؤالين مكتوبين بيطلبوا **التلات طرق لتمرير الـ parameters**؛ والأطول فيهم بيسأل كمان عن هدف الـ system calls والـ system programs (Section 4)، فجاوبه في تلات أجزاء متعلّمة.',
      ),
      refs: ['c2-api-fill', 'c2-system-call-interface-fill', 'c2-parameter-methods-short', 'c2-system-calls-essay'],
    },
    {
      kind: 'recap',
      items: [
        t('System call = programming interface to OS services, usually in C/C++.', 'الـ system call = programming interface لخدمات الـ OS، غالبًا بـ C/C++.'),
        t('Programs use an API: Win32, POSIX, Java API.', 'البرامج بتستخدم API: Win32 وPOSIX وJava API.'),
        t('read(fd, buf, count) returns bytes read, 0 at EOF, −1 on error.', 'الـ read(fd, buf, count) بترجع عدد الـ bytes، و0 عند EOF، و−1 لو error.'),
        t('Each call has a number; the system-call interface indexes a table and runs the kernel code.', 'كل call ليها رقم؛ والـ system-call interface بيدخل الجدول ويشغّل كود الـ kernel.'),
        t('The caller only follows the API; libraries hide the details.', 'اللي بينادي بيمشي على الـ API بس؛ والـ libraries بتخبّي التفاصيل.'),
        t('Parameters: registers, block/table (address in a register), stack (push/pop).', 'الـ parameters: registers، block/table (العنوان في register)، stack (push/pop).'),
      ],
    },
  ],
  examFocus: [
    t('System calls provide the interface to OS services and are mostly accessed via an API.', 'الـ system calls بتوفّر الواجهة لخدمات الـ OS وغالبًا بنوصلها عن طريق API.'),
    t('The system-call interface uses a table indexed by call number and returns status and values.', 'الـ system-call interface بيستخدم جدول بأرقام الـ calls وبيرجّع الحالة والقيم.'),
    t('Three parameter methods: registers; block/table with its address in a register (Linux, Solaris); stack pushed by the program, popped by the OS.', 'تلات طرق للـ parameters: registers؛ block/table وعنوانه في register (Linux وSolaris)؛ stack البرنامج بيعمل push والـ OS بيعمل pop.'),
  ],
  keyTerms: [
    { term: 'System call', definition: t('Programming interface to the services provided by the OS.', 'Programming interface لخدمات الـ OS.') },
    { term: 'API', definition: t('Application Programming Interface — the functions programs use instead of raw system calls.', 'Application Programming Interface — الـ functions اللي البرامج بتستخدمها بدل الـ system calls الخام.') },
    { term: 'POSIX', definition: t('API for UNIX, Linux and Mac OS X.', 'API لـ UNIX وLinux وMac OS X.') },
    { term: 'System-call interface', definition: t('Dispatches a call by its number through a table and returns its status.', 'بيوجّه الـ call برقمها عن طريق جدول ويرجّع حالتها.') },
    { term: 'Parameter block', definition: t('Parameters stored in memory; only the block address is passed in a register.', 'Parameters متخزنة في الـ memory؛ وبيتبعت عنوان الـ block بس في register.') },
  ],
}
