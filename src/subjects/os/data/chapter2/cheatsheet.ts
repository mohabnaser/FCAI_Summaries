import type { LText } from '../../types'
import type { CheatSheetGroup } from '../cheatsheet'

const t = (en: string, ar: string): LText => ({ en, ar })

export const chapter2CheatSheetGroups: CheatSheetGroup[] = [
  {
    id: 'c2-services',
    title: 'OS services',
    subtitle: 'Six help the user, three keep the system efficient',
    table: {
      headers: ['Family', 'Services'],
      rows: [
        [t('Helpful to the user', 'بتساعد المستخدم'), t('User interface (CLI, batch, GUI) · program execution · I/O operations · file-system manipulation · communications (shared memory / message passing) · error detection', 'User interface (CLI وbatch وGUI) · program execution · I/O operations · file-system manipulation · communications (shared memory / message passing) · error detection')],
        [t('Efficient operation of the system', 'لكفاءة تشغيل النظام'), t('Resource allocation · accounting · protection and security', 'Resource allocation · accounting · protection and security')],
      ],
    },
    traps: [
      t('“Program execution and resource allocation help the user” — resource allocation is a system-efficiency service.', '“Program execution وresource allocation بيساعدوا المستخدم” — الـ resource allocation خدمة كفاءة نظام.'),
    ],
  },
  {
    id: 'c2-interfaces',
    title: 'User interfaces',
    subtitle: 'CLI, GUI, touchscreen',
    points: [
      t('**Command interpreter (shell):** obtains the next user command and executes it; in the kernel or a systems program; many flavours = shells.', '**Command interpreter (shell):** بياخد الـ command الجاية وينفّذها؛ جوه الـ kernel أو systems program؛ وأنواعه كتير = shells.'),
      t('If commands are **program names**, new features need no shell modification.', 'لو الـ commands **أسامي programs**، الـ features الجديدة مش محتاجة تعديل الـ shell.'),
      t('**GUI:** user-friendly desktop metaphor, icons, mouse; Xerox PARC, 1970s. Windows = GUI + CLI; Mac OS X = Aqua + UNIX kernel; Linux = CLI + CDE/KDE/GNOME.', '**GUI:** desktop metaphor سهلة وأيقونات وmouse؛ Xerox PARC في السبعينات. Windows = GUI + CLI؛ Mac OS X = Aqua + UNIX kernel؛ Linux = CLI + CDE/KDE/GNOME.'),
      t('**Touchscreen:** no mouse, gestures, virtual keyboard.', '**Touchscreen:** من غير mouse، إيماءات، keyboard افتراضي.'),
    ],
  },
  {
    id: 'c2-system-calls',
    title: 'System calls & API',
    subtitle: 'The doorway into the kernel',
    points: [
      t('**System call** = programming interface to OS services (C/C++). Programs mostly use an **API**: Win32, POSIX, Java.', '**System call** = programming interface لخدمات الـ OS (C/C++). والبرامج غالبًا بتستخدم **API**: Win32 وPOSIX وJava.'),
      t('Each call has a **number**; the system-call interface indexes a **table**, runs the kernel code, returns status + values. The caller only follows the API.', 'كل call ليها **رقم**؛ والـ system-call interface بيدخل **جدول**، ويشغّل كود الـ kernel، ويرجّع الحالة والقيم. واللي بينادي بيمشي على الـ API بس.'),
      t('`read(fd, buf, count)` returns bytes read · 0 at end of file · −1 on error.', '`read(fd, buf, count)` بترجع عدد الـ bytes · 0 عند نهاية الـ file · −1 لو error.'),
    ],
    table: {
      headers: ['Parameter method', 'How', 'Limit'],
      rows: [
        [t('Registers', 'Registers'), t('Parameters in CPU registers — simplest', 'الـ parameters في الـ registers — الأبسط'), t('May be more parameters than registers', 'ممكن الـ parameters تبقى أكتر من الـ registers')],
        [t('Block / table', 'Block / table'), t('Block in memory; its address in a register (Linux, Solaris)', 'Block في الـ memory؛ وعنوانه في register (Linux وSolaris)'), t('No limit', 'من غير حد')],
        [t('Stack', 'Stack'), t('Pushed by the program, popped by the OS', 'البرنامج بيعمل push والـ OS بيعمل pop'), t('No limit', 'من غير حد')],
      ],
    },
  },
  {
    id: 'c2-syscall-types',
    title: 'Types of system calls',
    subtitle: 'Six families — Windows vs UNIX',
    table: {
      headers: ['Family', 'Windows', 'UNIX'],
      rows: [
        [t('Process control', 'Process control'), t('CreateProcess() ExitProcess() WaitForSingleObject()', 'CreateProcess() ExitProcess() WaitForSingleObject()'), t('fork() exit() wait()', 'fork() exit() wait()')],
        [t('File manipulation', 'File manipulation'), t('CreateFile() ReadFile() WriteFile() CloseHandle()', 'CreateFile() ReadFile() WriteFile() CloseHandle()'), t('open() read() write() close()', 'open() read() write() close()')],
        [t('Device manipulation', 'Device manipulation'), t('SetConsoleMode() ReadConsole() WriteConsole()', 'SetConsoleMode() ReadConsole() WriteConsole()'), t('ioctl() read() write()', 'ioctl() read() write()')],
        [t('Information maintenance', 'Information maintenance'), t('GetCurrentProcessID() SetTimer() Sleep()', 'GetCurrentProcessID() SetTimer() Sleep()'), t('getpid() alarm() sleep()', 'getpid() alarm() sleep()')],
        [t('Communication', 'Communication'), t('CreatePipe() CreateFileMapping() MapViewOfFile()', 'CreatePipe() CreateFileMapping() MapViewOfFile()'), t('pipe() shmget() mmap()', 'pipe() shmget() mmap()')],
        [t('Protection', 'Protection'), t('SetFileSecurity() InitializeSecurityDescriptor() SetSecurityDescriptorGroup()', 'SetFileSecurity() InitializeSecurityDescriptor() SetSecurityDescriptorGroup()'), t('chmod() umask() chown()', 'chmod() umask() chown()')],
      ],
    },
    points: [
      t('IPC models: **shared memory** (create / gain access to regions) and **message passing** (send / receive).', 'موديلات الـ IPC: **shared memory** (create / gain access لمناطق) و**message passing** (send / receive).'),
      t('`printf()` → standard C library → `write()` system call → kernel.', '`printf()` ← standard C library ← `write()` system call ← kernel.'),
    ],
  },
  {
    id: 'c2-design',
    title: 'System programs & design',
    subtitle: 'What users see; how designers decide',
    points: [
      t('**System programs**: a convenient environment for program development and execution; some are thin interfaces to system calls, others far more complex.', '**System programs**: بيئة مريحة لتطوير وتنفيذ البرامج؛ بعضها واجهات بسيطة للـ system calls وبعضها أعقد بكتير.'),
      t('Categories: file management · status (registry) · file modification · language support · loading & execution · communications · background services (daemons, user context) · application programs.', 'الفئات: file management · status (registry) · file modification · language support · loading & execution · communications · background services (daemons، user context) · application programs.'),
      t('**User goals**: convenient, easy to learn, reliable, safe, fast. **System goals**: easy to design/implement/maintain, flexible, reliable, error-free, efficient.', '**أهداف المستخدم**: مريح، سهل، reliable، آمن، سريع. **أهداف النظام**: سهل التصميم والتنفيذ والصيانة، مرن، reliable، من غير أخطاء، efficient.'),
      t('**Policy = what**, **mechanism = how**; separation → maximum flexibility when policies change.', '**Policy = إيه**، و**mechanism = إزاي**؛ والفصل ← أقصى مرونة لما الـ policies تتغير.'),
      t('Implementation: lowest levels assembly, body C, system programs C/C++/scripts; high-level = portable but slower.', 'التنفيذ: المستويات السفلى assembly، والجسم C، والـ system programs C/C++/scripts؛ والـ high-level = portable بس أبطأ.'),
    ],
  },
  {
    id: 'c2-structures',
    title: 'OS structures',
    subtitle: 'Simple → layered → microkernel → modules → hybrid',
    table: {
      headers: ['Structure', 'Remember'],
      rows: [
        [t('Simple (MS-DOS)', 'Simple (MS-DOS)'), t('Most functionality in least space; levels not well separated', 'أكبر وظايف في أقل مساحة؛ المستويات مش مفصولة كويس')],
        [t('Traditional UNIX', 'UNIX التقليدي'), t('Systems programs + one big kernel; beyond simple, not fully layered', 'Systems programs + kernel واحد كبير؛ أكتر من simple ومش layered بالكامل')],
        [t('Layered', 'Layered'), t('Layer 0 = hardware, layer N = user interface; use only lower layers', 'Layer 0 = hardware وlayer N = user interface؛ استخدام اللي تحت بس')],
        [t('Microkernel (Mach)', 'Microkernel (Mach)'), t('Services in user space; message passing; extensible, portable, reliable, secure; overhead', 'الخدمات في user space؛ message passing؛ سهل التوسيع وportable وreliable وsecure؛ وفيه overhead')],
        [t('Modules (Linux, Solaris)', 'Modules (Linux وSolaris)'), t('Loadable kernel modules over known interfaces; like layers but more flexible', 'Loadable kernel modules عن طريق interfaces معروفة؛ زي الـ layers بس أمرن')],
        [t('Hybrid', 'Hybrid'), t('Linux/Solaris monolithic + modular; Windows monolithic + microkernel; Mac OS X layered (Aqua, Cocoa, Mach, BSD, I/O kit, kernel extensions)', 'Linux/Solaris monolithic + modular؛ Windows monolithic + microkernel؛ Mac OS X layered (Aqua وCocoa وMach وBSD وI/O kit وkernel extensions)')],
        [t('iOS / Android', 'iOS / Android'), t('Cocoa Touch → Media Services → Core Services → Core OS · Linux kernel (+power mgmt) → libraries + Android runtime (Dalvik) → app framework', 'Cocoa Touch ← Media Services ← Core Services ← Core OS · Linux kernel (+power mgmt) ← libraries + Android runtime (Dalvik) ← app framework')],
      ],
    },
  },
  {
    id: 'c2-debug-boot',
    title: 'Debugging, generation & boot',
    subtitle: 'When things break, and how the OS starts',
    points: [
      t('Log files · **core dump** = process memory · **crash dump** = kernel memory · trace listings · **profiling** = periodic sampling of the instruction pointer · tuning tools: top, Task Manager.', 'Log files · **core dump** = memory الـ process · **crash dump** = memory الـ kernel · trace listings · **profiling** = عينات دورية من الـ instruction pointer · أدوات الـ tuning: top وTask Manager.'),
      t('**SYSGEN** reads the specific hardware configuration and builds a system-tuned kernel (more efficient than one general kernel).', '**SYSGEN** بيقرا إعدادات الـ hardware ويبني kernel متظبط للنظام (أكفأ من kernel عام واحد).'),
      t('**Boot**: execution starts at a fixed memory location → firmware ROM → **bootstrap loader** (ROM/EEPROM) locates, loads and starts the kernel. Two-step: ROM loads a **boot block**, which loads the loader from disk. **GRUB** chooses disk, version and options.', '**Boot**: التنفيذ بيبدأ من مكان ثابت في الـ memory ← firmware ROM ← **bootstrap loader** (ROM/EEPROM) بيلاقي الـ kernel ويحمّله ويشغّله. ذو الخطوتين: الـ ROM بيحمّل **boot block** وهو بيحمّل الـ loader من الـ disk. والـ **GRUB** بيختار الـ disk والنسخة والخيارات.'),
    ],
  },
]

export const chapter2HighYieldTraps: LText[] = [
  t('Resource allocation, accounting and protection are system-efficiency services — not user-helpful ones.', 'الـ resource allocation والـ accounting والـ protection خدمات كفاءة نظام — مش خدمات بتساعد المستخدم.'),
  t('Command interpreter = get and execute the next user command (not the API interface).', 'الـ command interpreter = ياخد الـ command الجاية وينفّذها (مش واجهة الـ API).'),
  t('Programs reach system calls mostly via an API.', 'البرامج بتوصل للـ system calls غالبًا عن طريق API.'),
  t('Block and stack parameter passing have no limit; registers can run out.', 'تمرير الـ parameters بالـ block والـ stack مالوش حد؛ والـ registers ممكن تخلص.'),
  t('fork() creates, exit() terminates; exec() does neither.', 'الـ fork() بتنشئ والـ exit() بتنهي؛ والـ exec() ولا ده ولا ده.'),
  t('IPC = shared memory + message passing; message passing = send + receive.', 'الـ IPC = shared memory + message passing؛ والـ message passing = send + receive.'),
  t('Policy = what; mechanism = how; separation = flexibility.', 'الـ Policy = إيه؛ والـ mechanism = إزاي؛ والفصل = مرونة.'),
  t('Layer 0 is hardware, layer N is the user interface.', 'الـ Layer 0 هي الـ hardware، والـ layer N هي الـ user interface.'),
  t('Microkernel modules communicate by message passing.', 'الـ modules بتاعة الـ microkernel بتتواصل بالـ message passing.'),
  t('Linux, Windows and Mac OS X are all hybrids.', 'Linux وWindows وMac OS X كلهم hybrids.'),
  t('System boot loads and starts the OS; system generation configures it.', 'الـ System boot بيحمّل الـ OS ويشغّله؛ والـ system generation بيظبطه.'),
]
