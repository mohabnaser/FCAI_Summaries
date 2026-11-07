import type { Section } from '../../../types'
import { part, t } from '../../sections/helpers'

/** Slides 19–24: process creation (tree, pid, options, fork/exec/wait) and termination. */
export const operations: Section = {
  id: 'c3-operations',
  chapterId: 'chapter-3',
  order: 3,
  kicker: 'Lesson 03',
  title: 'Creating & Ending Processes',
  shortTitle: 'Process Operations',
  summary: t(
    'Parents create children and form a tree of processes. The parent and child can share resources, run concurrently or wait, and the child can copy the parent or load a new program — fork(), exec() and wait() in UNIX. Processes end with exit(), or are aborted by their parent.',
    'الـ processes الأب بتعمل أبناء وبيتكوّن tree of processes. الأب والابن ممكن يشاركوا الموارد، ويشتغلوا مع بعض أو الأب يستنى، والابن ممكن يبقى نسخة من الأب أو يتحمّل فيه برنامج جديد — fork() وexec() وwait() في UNIX. والـ processes بتخلص بـ exit()، أو الأب بيعملها abort.',
  ),
  objectives: [
    t('Read a tree of processes and explain the role of the pid.', 'تقرا tree of processes وتشرح دور الـ pid.'),
    t('List the resource-sharing, execution and address-space options of a child.', 'تعدّ اختيارات الـ resource sharing والـ execution والـ address space للابن.'),
    t('Trace fork(), exec() and wait() through the lecture’s C program.', 'تتابع fork() وexec() وwait() في برنامج الـ C اللي في المحاضرة.'),
    t('Explain exit(), abort() and cascading termination.', 'تشرح exit() وabort() والـ cascading termination.'),
  ],
  estimatedMinutes: 13,
  quizId: 'quiz-c3-operations',
  crossRefQuestionIds: ['c2-fork-create', 'c2-fork-create-2020', 'c2-fork-exit'],
  blocks: [
    {
      kind: 'lead',
      text: t(
        'The system must provide mechanisms for **process creation and termination**. The lecture’s everyday example: in Google Chrome **each tab is a separate process**, so one crashed page does not take the others down.',
        'النظام لازم يوفّر طرق لـ **إنشاء الـ processes وإنهائها**. ومثال المحاضرة اليومي: في Google Chrome **كل tab عبارة عن process منفصلة**، فلو صفحة وقعت مش بتوقّع الباقي.',
      ),
    },

    part(t('A tree of processes', 'الـ Tree of processes'), t('Parents create children, which create other processes.', 'الأب بيعمل أبناء، والأبناء بيعملوا processes تانية.')),
    {
      kind: 'cards',
      columns: 3,
      intro: t(
        'Each process is identified and managed through a **process identifier (pid)**. In Linux the root is **init (pid = 1)**; the lecture shows three of its branches:',
        'كل process ليها **process identifier (pid)** بيتعرّف ويتدار بيه. في Linux الجذر هو **init (pid = 1)**؛ والمحاضرة بتوري تلات فروع منه:',
      ),
      items: [
        { icon: 'user', tag: 'pid 8415', title: 'login', body: t('→ **bash** (8416) → **ps** (9298) and **emacs** (9204).', '← **bash** (8416) ← **ps** (9298) و**emacs** (9204).'), tone: 'cyan' },
        { icon: 'settings', tag: 'pid 2', title: 'kthreadd', body: t('→ kernel helpers **khelper** (6) and **pdflush** (200).', '← kernel helpers: **khelper** (6) و**pdflush** (200).'), tone: 'violet' },
        { icon: 'network', tag: 'pid 3028', title: 'sshd', body: t('→ **sshd** (3610) for a remote session → **tcsch** (4005) shell.', '← **sshd** (3610) لجلسة remote ← shell اسمها **tcsch** (4005).'), tone: 'teal' },
      ],
    },
    {
      kind: 'table',
      caption: t('What a parent and its child can do', 'الأب والابن يقدروا يعملوا إيه'),
      headers: ['Choice', 'Options'],
      rows: [
        [t('Resource sharing'), t('Parent and children share **all** resources · children share a **subset** of the parent’s resources · parent and child share **no** resources', 'الأب والأبناء يشاركوا **كل** الموارد · الأبناء ياخدوا **جزء** من موارد الأب · الأب والابن **ميشاركوش** أي موارد')],
        [t('Execution'), t('Parent and children execute **concurrently** · parent **waits** until all or some children terminate', 'الأب والأبناء يشتغلوا **مع بعض** · الأب **يستنى** لحد ما كل الأبناء أو بعضهم يخلصوا')],
        [t('Address space'), t('Child is a **duplicate** of the parent program · child has a **new program loaded** into it', 'الابن **نسخة** من برنامج الأب · الابن **يتحمّل فيه برنامج جديد**')],
      ],
    },

    part(t('fork(), exec() and wait() in UNIX', 'الـ fork() والـ exec() والـ wait() في UNIX')),
    {
      kind: 'flow',
      title: t('Process creation', 'إنشاء الـ Process'),
      steps: [
        { icon: 'fork', label: 'fork()', detail: t('Creates a **new process** — a duplicate of the parent. Both continue after the call.', 'بتعمل **process جديدة** — نسخة من الأب. والاتنين بيكمّلوا بعد الـ call.'), tone: 'cyan' },
        { icon: 'package', label: 'child: exec()', detail: t('Used after fork() to **replace the process’s memory space with a new program**.', 'بتتستخدم بعد الـ fork() عشان **تبدّل memory space الـ process ببرنامج جديد**.'), tone: 'violet' },
        { icon: 'pause', label: 'parent: wait()', detail: t('The parent pauses until the child finishes.', 'الأب بيوقف لحد ما الابن يخلص.'), tone: 'amber' },
        { icon: 'check', label: 'child exit() → parent resumes', detail: t('The child’s status returns to the parent through wait().', 'الـ status بتاعة الابن بترجع للأب عن طريق الـ wait().'), tone: 'teal' },
      ],
    },
    {
      kind: 'code',
      title: 'C program forking a separate process',
      language: 'c',
      code: `#include <sys/types.h>
#include <stdio.h>
#include <unistd.h>

int main()
{
    pid_t pid;

    /* fork a child process */
    pid = fork();

    if (pid < 0) { /* error occurred */
        fprintf(stderr, "Fork Failed");
        return 1;
    }
    else if (pid == 0) { /* child process */
        execlp("/bin/ls", "ls", NULL);
    }
    else { /* parent process */
        /* parent will wait for the child to complete */
        wait(NULL);
        printf("Child Complete");
    }

    return 0;
}`,
      caption: t(
        'One call, two returns: fork() returns **0 in the child** and the **child’s pid (> 0) in the parent**; a negative value means it failed.',
        'Call واحدة ونتيجتين: الـ fork() بترجّع **0 في الابن** و**الـ pid بتاع الابن (> 0) في الأب**؛ والقيمة السالبة معناها إنها فشلت.',
      ),
    },
    {
      kind: 'visual',
      id: 'fork-trace',
      title: t('Trace the program: parent and child side by side', 'تابع البرنامج: الأب والابن جنب بعض'),
      caption: t(
        'Step through the lecture’s program. Watch the process split at fork(), the child become ls at execlp(), and the parent sleep in wait() until the child exits.',
        'امشي خطوة خطوة في برنامج المحاضرة. شوف الـ process وهي بتتقسم عند الـ fork()، والابن وهو بيتحوّل لـ ls عند الـ execlp()، والأب وهو نايم في الـ wait() لحد ما الابن يخلص.',
      ),
    },

    part(t('Process termination', 'إنهاء الـ Process')),
    {
      kind: 'cards',
      columns: 3,
      items: [
        {
          icon: 'check',
          tag: 'normal end',
          title: 'exit()',
          body: t('The process executes its last statement and asks the OS to delete it. It **returns its status to the parent (via wait())**, and the OS **deallocates its resources**.', 'الـ process بتنفّذ آخر سطر وبتطلب من الـ OS يمسحها. **بترجّع الـ status بتاعتها للأب (عن طريق wait())**، والـ OS **بيرجّع مواردها**.'),
          tone: 'teal',
        },
        {
          icon: 'x',
          tag: 'parent decides',
          title: 'abort()',
          body: t('A parent may terminate its children when the child has **exceeded its allocated resources**, the **task is no longer required**, or the **parent is exiting**.', 'الأب ممكن ينهي أبناؤه لو الابن **عدّى الموارد المسموحة له**، أو **المهمة مبقتش مطلوبة**، أو **الأب نفسه خارج**.'),
          tone: 'rose',
        },
        {
          icon: 'trash',
          tag: 'parent exits',
          title: 'Cascading termination',
          body: t('Some operating systems **do not allow a child to continue if its parent terminates**: all children must also be terminated.', 'بعض أنظمة التشغيل **مش بتسمح للابن يكمّل لو الأب خلص**: يبقى كل الأبناء لازم يخلصوا كمان.'),
          tone: 'amber',
        },
      ],
    },
    {
      kind: 'confusions',
      items: [
        {
          wrong: t('“exec() creates a new process.”', '“الـ exec() بتعمل process جديدة.”'),
          right: t('**fork()** creates it; exec() replaces the memory of an existing process with a new program.', '**الـ fork()** هي اللي بتعملها؛ والـ exec() بتبدّل ذاكرة process موجودة ببرنامج جديد.'),
        },
        {
          wrong: t('“fork() returns the child’s pid to the child.”', '“الـ fork() بترجّع الـ pid بتاع الابن للابن.”'),
          right: t('The child gets **0**; the parent gets the child’s pid.', 'الابن بياخد **0**؛ والأب هو اللي بياخد الـ pid بتاع الابن.'),
        },
        {
          wrong: t('“A process can only end by calling exit().”', '“الـ process مش بتخلص غير بـ exit().”'),
          right: t('Also by a **fatal error**, or by being **killed by another process** (abort() from its parent, cascading termination).', 'كمان بـ **fatal error**، أو لو **process تانية قتلتها** (abort() من الأب، cascading termination).'),
        },
      ],
    },
    {
      kind: 'exam',
      title: t('Exam radar: fork() in every final', 'رادار الامتحان: الـ fork() في كل final'),
      body: t(
        'Five items. Three ask for the UNIX create call (fork) or the create + terminate pair (fork and exit) — implemented in Chapter 2, where the system calls are introduced, and included here. Chapter 3 owns the two others: the child’s **execution and address-space possibilities** (all of them) and the **reasons a process is terminated** (all of them).',
        'خمس أسئلة. تلاتة بيسألوا عن الـ call اللي بتعمل process في UNIX (fork) أو الاتنين create وterminate (fork وexit) — متنفّذين في Chapter 2 اللي فيه اتشرحت الـ system calls، ومعروضين هنا. وChapter 3 عنده التانيين: **اختيارات التنفيذ والـ address space** للابن (كلهم)، و**أسباب إنهاء الـ process** (كلهم).',
      ),
      refs: ['c3-child-possibilities', 'c3-termination-reasons', 'c2-fork-create', 'c2-fork-create-2020', 'c2-fork-exit'],
    },
    {
      kind: 'recap',
      items: [
        t('Parents create children → a tree of processes; each has a pid; Linux root = init (pid 1).', 'الأب بيعمل أبناء ← tree of processes؛ كل واحدة ليها pid؛ والجذر في Linux هو init (pid 1).'),
        t('Resources: share all · a subset · none.', 'الموارد: يشاركوا الكل · جزء · ولا حاجة.'),
        t('Execution: concurrent · parent waits.', 'التنفيذ: مع بعض · الأب يستنى.'),
        t('Address space: duplicate of parent · new program loaded.', 'الـ Address space: نسخة من الأب · برنامج جديد.'),
        t('fork() creates (0 in child, pid in parent); exec() loads a new program; wait() collects the child.', 'الـ fork() بتعمل (0 في الابن، والـ pid في الأب)؛ والـ exec() بتحمّل برنامج جديد؛ والـ wait() بتستنى الابن.'),
        t('Termination: exit() normally; abort() by parent; cascading termination.', 'الإنهاء: exit() طبيعي؛ abort() من الأب؛ cascading termination.'),
      ],
    },
  ],
  examFocus: [
    t('In UNIX, fork() creates a new process and exit() terminates it.', 'في UNIX، الـ fork() بتعمل process جديدة والـ exit() بتنهيها.'),
    t('A child may run concurrently with its parent, be a duplicate of it, or have a new program loaded — all are possible.', 'الابن ممكن يشتغل مع الأب في نفس الوقت، أو يبقى نسخة منه، أو يتحمّل فيه برنامج جديد — كلهم ممكنين.'),
    t('A process can end by normal exit, a fatal error, or being killed by another process.', 'الـ process ممكن تخلص بـ normal exit، أو fatal error، أو process تانية تقتلها.'),
  ],
  keyTerms: [
    { term: 'pid', definition: t('Process identifier used to identify and manage a process.', 'الـ Process identifier اللي بيتعرّف ويتدار بيه الـ process.') },
    { term: 'fork()', definition: t('UNIX system call that creates a new (child) process.', 'System call في UNIX بتعمل process جديدة (ابن).') },
    { term: 'exec()', definition: t('Replaces the process’s memory space with a new program.', 'بتبدّل memory space الـ process ببرنامج جديد.') },
    { term: 'wait()', definition: t('Parent waits for a child to finish and receives its status.', 'الأب بيستنى الابن يخلص وبياخد الـ status بتاعته.') },
    { term: 'abort()', definition: t('Parent terminates a child process.', 'الأب بينهي process ابن.') },
    { term: 'Cascading termination', definition: t('When a parent terminates, all its children are terminated too.', 'لما الأب يخلص، كل أبناؤه بيخلصوا معاه.') },
  ],
}
