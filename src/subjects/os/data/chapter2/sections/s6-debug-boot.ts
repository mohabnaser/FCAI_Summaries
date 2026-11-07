import type { Section } from '../../../types'
import { part, t } from '../../sections/helpers'

/** Slides 47–50: debugging, performance tuning, OS generation (SYSGEN), system boot. */
export const debugBoot: Section = {
  id: 'c2-debug-boot',
  chapterId: 'chapter-2',
  order: 6,
  kicker: 'Lesson 06',
  title: 'Debugging, Generation & System Boot',
  shortTitle: 'Debugging & Boot',
  summary: t(
    'What happens when things go wrong (log files, core dumps, crash dumps), how performance is tuned, how one OS is configured for a specific machine (SYSGEN), and how the hardware finds and starts the kernel (bootstrap loader, boot block, GRUB).',
    'إيه اللي بيحصل لما حاجة تبوظ (log files وcore dumps وcrash dumps)، والأداء بيتظبط إزاي، وإزاي OS واحد بيتظبط لجهاز معيّن (SYSGEN)، والـ hardware بيلاقي الـ kernel ويشغّله إزاي (bootstrap loader وboot block وGRUB).',
  ),
  objectives: [
    t('Distinguish log files, core dumps and crash dumps.', 'تفرّق بين الـ log files والـ core dumps والـ crash dumps.'),
    t('Explain performance tuning, trace listings and profiling.', 'تشرح الـ performance tuning والـ trace listings والـ profiling.'),
    t('Explain what SYSGEN does and why a system-tuned kernel is more efficient.', 'تشرح الـ SYSGEN بيعمل إيه وليه الـ kernel المتظبط للنظام أكفأ.'),
    t('Trace the boot sequence: fixed location, firmware ROM, bootstrap loader, boot block, GRUB, kernel.', 'تتابع تسلسل الـ boot: مكان ثابت، firmware ROM، bootstrap loader، boot block، GRUB، kernel.'),
  ],
  estimatedMinutes: 13,
  quizId: 'quiz-c2-debug-boot',
  crossRefQuestionIds: ['s2-system-boot', 's2-bootstrap-mcq', 's2-bootstrap-fill', 's2-firmware-fill'],
  blocks: [
    part(
      t('Operating-system debugging', 'الـ Debugging في الـ operating system'),
      t('**debugging is finding and fixing errors, or bugs**.', '**الـ debugging هو إنك تلاقي الأخطاء (bugs) وتصلّحها**.'),
    ),
    {
      kind: 'cards',
      columns: 3,
      items: [
        { icon: 'list', tag: 'always', title: 'Log files', body: t('OSs generate **log files containing error information**.', 'الـ OSs بتعمل **log files فيها معلومات الأخطاء**.'), tone: 'cyan' },
        { icon: 'app', tag: 'application failure', title: 'Core dump', body: t('A failed application can generate a **core dump file capturing the memory of the process**.', 'الـ application اللي وقعت ممكن تعمل **core dump file فيه memory الـ process**.'), tone: 'amber' },
        { icon: 'chip', tag: 'OS failure', title: 'Crash dump', body: t('An operating-system failure can generate a **crash dump file containing kernel memory**.', 'وقوع الـ operating system ممكن يعمل **crash dump file فيه memory الـ kernel**.'), tone: 'rose' },
      ],
    },
    {
      kind: 'versus',
      left: { title: 'Core dump', icon: 'app', tone: 'amber', tagline: t('A process crashed', 'Process وقعت') },
      right: { title: 'Crash dump', icon: 'chip', tone: 'rose', tagline: t('The OS crashed', 'الـ OS وقع') },
      rows: [
        { aspect: 'Captures', left: t('Memory of the **process**', 'Memory الـ **process**'), right: t('**Kernel** memory', 'Memory الـ **kernel**') },
        { aspect: 'Caused by', left: t('Failure of an application', 'وقوع application'), right: t('Operating-system failure', 'وقوع الـ operating system') },
      ],
    },
    {
      kind: 'cards',
      title: t('Beyond crashes: performance tuning', 'بعد الـ crashes: الـ performance tuning'),
      columns: 4,
      items: [
        { icon: 'gauge', title: 'Remove bottlenecks', body: t('Performance tuning **improves performance by removing bottlenecks**.', 'الـ performance tuning **بيحسّن الأداء بإزالة الـ bottlenecks**.'), tone: 'teal' },
        { icon: 'monitor', title: 'Measure and display', body: t('The OS must provide means of **computing and displaying measures** of system behaviour — e.g. **top** or the **Windows Task Manager**.', 'الـ OS لازم يوفّر طرق **لحساب وعرض مقاييس** سلوك النظام — زي **top** أو **Windows Task Manager**.'), tone: 'cyan' },
        { icon: 'file', title: 'Trace listings', body: t('Sometimes using **trace listings** of activities, recorded for analysis.', 'ساعات باستخدام **trace listings** للأنشطة، بتتسجل عشان التحليل.'), tone: 'violet' },
        { icon: 'trending', title: 'Profiling', body: t('**Periodic sampling of the instruction pointer** to look for statistical trends.', '**أخذ عينات دورية من الـ instruction pointer** عشان تدوّر على اتجاهات إحصائية.'), tone: 'amber' },
      ],
    },

    part(
      t('Operating-system generation', 'الـ Operating-system generation'),
      t('OSs are designed to run on any of a class of machines, so each site must be configured.', 'الـ OSs متصممة تشتغل على أي جهاز من فئة أجهزة، فكل موقع لازم يتظبط.'),
    ),
    {
      kind: 'flow',
      title: t('SYSGEN', 'الـ SYSGEN'),
      steps: [
        { icon: 'boxes', label: 'One OS, many machines', detail: t('Designed to run on **any of a class of machines**.', 'متصمم يشتغل على **أي جهاز من فئة أجهزة**.'), tone: 'violet' },
        { icon: 'search', label: 'SYSGEN asks the hardware', detail: t('Obtains information about the **specific hardware configuration**.', 'بيجمع معلومات عن **إعدادات الـ hardware المحددة**.'), tone: 'cyan' },
        { icon: 'settings', label: 'Build a tuned kernel', detail: t('Builds a **system-specific compiled kernel** or system-tuned kernel.', 'بيبني **kernel متعمل له compile مخصوص للنظام** أو kernel متظبط.'), tone: 'amber' },
        { icon: 'zap', label: 'More efficient code', detail: t('Can generate **more efficient code than one general kernel**.', 'ممكن يطلّع **كود أكفأ من kernel عام واحد**.'), tone: 'teal' },
      ],
    },

    part(
      t('System boot', 'الـ System boot'),
      t(
        '**the operating system must be made available to the hardware so the hardware can start it**.',
        '**الـ operating system لازم يبقى متاح للـ hardware عشان الـ hardware يقدر يشغّله**.',
      ),
    ),
    {
      kind: 'visual',
      id: 'boot-sequence',
      title: t('From power-on to a running kernel', 'من التشغيل لحد kernel شغال'),
      caption: t(
        'Switch between the one-step and two-step boot, then choose a kernel in the GRUB menu.',
        'بدّل بين الـ boot ذو الخطوة الواحدة وذو الخطوتين، وبعدين اختار kernel من قايمة GRUB.',
      ),
    },
    {
      kind: 'cards',
      columns: 2,
      items: [
        {
          icon: 'chip',
          tag: 'firmware',
          title: 'Bootstrap loader',
          body: t('A **small piece of code**, stored in **ROM or EEPROM**, that **locates the kernel, loads it into memory, and starts it**.', '**كود صغير**، متخزن في **ROM أو EEPROM**، بي**لاقي الـ kernel ويحمّله في الـ memory ويشغّله**.'),
          tone: 'cyan',
        },
        {
          icon: 'disk',
          tag: 'two-step',
          title: 'Boot block',
          body: t('Sometimes a **boot block at a fixed location** is loaded by ROM code, and the boot block then **loads the bootstrap loader from disk**.', 'ساعات **boot block في مكان ثابت** بيتحمّل بكود الـ ROM، والـ boot block بعدها **بيحمّل الـ bootstrap loader من الـ disk**.'),
          tone: 'amber',
        },
        {
          icon: 'list',
          tag: 'common loader',
          title: 'GRUB',
          body: t('A common bootstrap loader that allows selection of the **kernel from multiple disks, kernel versions and kernel options**.', 'Bootstrap loader مشهور بيخلّيك تختار **kernel من أكتر من disk، ونسخ الـ kernel، وخيارات الـ kernel**.'),
          tone: 'violet',
        },
        {
          icon: 'play',
          tag: 'finally',
          title: 'Kernel runs',
          body: t('**The kernel loads and the system is then running.**', '**الـ kernel بيتحمّل والنظام بيبقى شغال.**'),
          tone: 'teal',
        },
      ],
    },
    {
      kind: 'callout',
      tone: 'insight',
      title: t('The same story as in Chapter 1', 'نفس حكاية Chapter 1'),
      body: t(
        'Chapter 1 calls it the **bootstrap program** (stored in ROM or EPROM — firmware); Chapter 2 calls it the **bootstrap loader** (ROM or EEPROM). Same job: initialize, locate the kernel, load it, start it. That is why the four boot questions in this quiz are shared with Chapter 1 Section 2.',
        'Chapter 1 بيسمّيه **bootstrap program** (متخزن في ROM أو EPROM — firmware)؛ وChapter 2 بيسمّيه **bootstrap loader** (ROM أو EEPROM). نفس الشغلانة: يهيّئ، يلاقي الـ kernel، يحمّله، يشغّله. وعشان كده الأربع أسئلة بتوع الـ boot في الـ quiz ده مشتركين مع Chapter 1 Section 2.',
      ),
    },
    {
      kind: 'confusions',
      items: [
        {
          wrong: t('“System generation loads the OS into memory at power-on.”', '“الـ system generation بيحمّل الـ OS في الـ memory وقت التشغيل.”'),
          right: t('Generation (SYSGEN) **configures/builds** a kernel for a site; **system boot** loads and starts it.', 'الـ generation (SYSGEN) بي**ظبط/يبني** kernel للموقع؛ والـ **system boot** هو اللي بيحمّله ويشغّله.'),
        },
        {
          wrong: t('“A core dump contains kernel memory.”', '“الـ core dump فيه memory الـ kernel.”'),
          right: t('Core dump = **process** memory; crash dump = **kernel** memory.', 'الـ core dump = memory الـ **process**؛ والـ crash dump = memory الـ **kernel**.'),
        },
        {
          wrong: t('“The bootstrap loader is stored on the disk only.”', '“الـ bootstrap loader متخزن على الـ disk بس.”'),
          right: t('It is stored in **ROM or EEPROM**; in a two-step boot, a boot block loads it from disk.', 'متخزن في **ROM أو EEPROM**؛ وفي الـ boot ذو الخطوتين الـ boot block بيحمّله من الـ disk.'),
        },
      ],
    },
    {
      kind: 'exam',
      title: t('Exam radar: boot questions shared with Chapter 1', 'رادار الامتحان: أسئلة الـ boot المشتركة مع Chapter 1'),
      body: t(
        'No paper tests debugging, profiling or SYSGEN directly — though “system generation” appears as a distractor. Four boot questions do appear: the name of the whole procedure of loading and starting the OS, the initial program run at power-up, the program that must locate the kernel, and the software stored in EPROM. They are Chapter 1 implementations, repeated here because the lecture teaches the same idea.',
        'مفيش ورقة بتختبر الـ debugging أو الـ profiling أو الـ SYSGEN مباشرة — بس “system generation” بتظهر كـ distractor. وفيه أربع أسئلة boot: اسم العملية كلها بتاعة تحميل وتشغيل الـ OS، وأول برنامج بيشتغل عند التشغيل، والبرنامج اللي لازم يلاقي الـ kernel، والـ software المتخزن في EPROM. دول implementations بتوع Chapter 1، متكررين هنا لأن المحاضرة بتشرح نفس الفكرة.',
      ),
      refs: ['s2-system-boot', 's2-bootstrap-mcq', 's2-bootstrap-fill', 's2-firmware-fill'],
    },
    {
      kind: 'recap',
      items: [
        t('Debugging = finding and fixing bugs; OSs keep log files.', 'الـ Debugging = تلاقي الـ bugs وتصلّحها؛ والـ OSs بتحتفظ بـ log files.'),
        t('Core dump = process memory; crash dump = kernel memory.', 'الـ Core dump = memory الـ process؛ والـ crash dump = memory الـ kernel.'),
        t('Performance tuning removes bottlenecks; top / Task Manager; tracing; profiling.', 'الـ Performance tuning بيشيل الـ bottlenecks؛ top / Task Manager؛ tracing؛ profiling.'),
        t('SYSGEN reads the hardware configuration and builds a system-tuned kernel.', 'الـ SYSGEN بيقرا إعدادات الـ hardware ويبني kernel متظبط للنظام.'),
        t('Boot: fixed memory location → firmware ROM → bootstrap loader → kernel.', 'الـ Boot: مكان ثابت في الـ memory ← firmware ROM ← bootstrap loader ← kernel.'),
        t('Two-step: ROM loads a boot block, which loads the loader from disk; GRUB picks the kernel.', 'ذو الخطوتين: الـ ROM بيحمّل boot block، وهو بيحمّل الـ loader من الـ disk؛ والـ GRUB بيختار الـ kernel.'),
      ],
    },
  ],
  examFocus: [
    t('System boot is the procedure that loads the OS into main memory and starts it.', 'الـ System boot هو العملية اللي بتحمّل الـ OS في الـ main memory وتشغّله.'),
    t('The bootstrap loader (ROM/EEPROM) locates the kernel, loads it into memory and starts it.', 'الـ bootstrap loader (ROM/EEPROM) بيلاقي الـ kernel ويحمّله في الـ memory ويشغّله.'),
    t('Core dump = process memory; crash dump = kernel memory.', 'الـ Core dump = memory الـ process؛ والـ crash dump = memory الـ kernel.'),
  ],
  keyTerms: [
    { term: 'Core dump', definition: t('File capturing the memory of a failed process.', 'File فيه memory process وقعت.') },
    { term: 'Crash dump', definition: t('File containing kernel memory after an OS failure.', 'File فيه memory الـ kernel بعد وقوع الـ OS.') },
    { term: 'Profiling', definition: t('Periodic sampling of the instruction pointer to find statistical trends.', 'أخذ عينات دورية من الـ instruction pointer عشان تلاقي اتجاهات إحصائية.') },
    { term: 'SYSGEN', definition: t('Program that reads the hardware configuration to build a system-specific kernel.', 'برنامج بيقرا إعدادات الـ hardware عشان يبني kernel مخصوص للنظام.') },
    { term: 'Bootstrap loader', definition: t('Small ROM/EEPROM code that locates, loads and starts the kernel.', 'كود صغير في ROM/EEPROM بيلاقي الـ kernel ويحمّله ويشغّله.') },
    { term: 'GRUB', definition: t('Common bootstrap loader for choosing kernel, version and options.', 'Bootstrap loader مشهور لاختيار الـ kernel ونسخته وخياراته.') },
  ],
}
