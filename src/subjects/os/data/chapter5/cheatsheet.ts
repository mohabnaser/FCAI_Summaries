import type { LText } from '../../types'
import type { CheatSheetGroup } from '../cheatsheet'

const t = (en: string, ar: string): LText => ({ en, ar })

export const chapter5CheatSheetGroups: CheatSheetGroup[] = [
  {
    id: 'c5-race',
    title: 'Race condition',
    subtitle: 'Why synchronization exists',
    points: [
      t('Concurrent access to shared data may result in **data inconsistency**.', 'الوصول المتزامن للداتا المشتركة ممكن يعمل **data inconsistency**.'),
      t('counter++ = load, add, store; counter-- the same. Interleaving from 5 gives **4 or 6**.', 'الـ counter++ = load وadd وstore؛ والـ counter-- نفس الكلام. والتداخل من 5 بيدّي **4 أو 6**.'),
      t('**Race condition:** outcome depends on the order of access.', '**Race condition:** النتيجة بتعتمد على ترتيب الوصول.'),
    ],
  },
  {
    id: 'c5-cs',
    title: 'Critical-section problem',
    subtitle: 'entry → critical → exit → remainder',
    table: {
      headers: ['Requirement', 'Meaning'],
      rows: [
        [t('Mutual exclusion', 'Mutual exclusion'), t('Only one process in its critical section at a time', 'process واحدة بس في الـ critical section في المرة')],
        [t('Progress', 'Progress'), t('If none inside and some want in, the choice cannot be postponed indefinitely', 'لو مفيش حد جوه وفيه حد عايز يدخل، الاختيار ميتأجلش للأبد')],
        [t('Bounded waiting', 'Bounded waiting'), t('A bound on how many others enter after a request, before it is granted', 'حد أقصى لعدد اللي يدخلوا بعد طلبك وقبل ما يتقبل')],
      ],
    },
    traps: [t('All three are required — not “only bounded waiting”. Priority inversion is not a requirement.', 'التلاتة لازمين — مش “bounded waiting بس”. والـ priority inversion مش شرط.')],
  },
  {
    id: 'c5-solutions',
    title: 'Peterson & hardware',
    subtitle: 'Who meets what',
    table: {
      headers: ['Solution', 'ME · Progress · Bounded'],
      rows: [
        [t('Peterson (turn, flag[2])', 'Peterson (turn وflag[2])'), t('✓ · ✓ · ✓', '✓ · ✓ · ✓')],
        [t('test_and_set / compare_and_swap lock', 'lock بـ test_and_set / compare_and_swap'), t('✓ · ✓ · ✗', '✓ · ✓ · ✗')],
        [t('test_and_set + waiting[n]', 'test_and_set + waiting[n]'), t('✓ · ✓ · ✓', '✓ · ✓ · ✓')],
      ],
    },
    points: [
      t('Peterson entry: `flag[i] = true; turn = j; while (flag[j] && turn == j);` exit: `flag[i] = false;`', 'الدخول في Peterson: `flag[i] = true; turn = j; while (flag[j] && turn == j);` والخروج: `flag[i] = false;`'),
      t('Disabling interrupts: uniprocessors only. TAS / CAS are **atomic (non-interruptible)**.', 'تعطيل الـ interrupts: للـ uniprocessors بس. والـ TAS / CAS **atomic (مبتتقطعش)**.'),
    ],
  },
  {
    id: 'c5-semaphores',
    title: 'Mutex locks & semaphores',
    subtitle: 'Spinning vs sleeping',
    points: [
      t('**Mutex lock:** acquire() / release(), atomic, busy waits → **spinlock**.', '**الـ Mutex lock:** acquire() / release()، atomic، وبيعمل busy wait ← **spinlock**.'),
      t('**Semaphore:** integer S, only wait() (P) and signal() (V); counting or binary (= mutex).', '**الـ Semaphore:** رقم S، مبيتوصلوش غير بـ wait() (P) وsignal() (V)؛ counting أو binary (= mutex).'),
      t('**No busy waiting:** waiting queue; wait: value--, if < 0 block(); signal: value++, if ≤ 0 wakeup(P).', '**من غير busy waiting:** waiting queue؛ الـ wait: value--، ولو < 0 block()؛ والـ signal: value++، ولو ≤ 0 wakeup(P).'),
      t('**Deadlock:** waiting forever for an event only a waiting process can cause. **Starvation:** indefinite blocking. **Priority inversion:** low priority holds a lock high priority needs.', '**Deadlock:** انتظار للأبد لحدث مفيش غير process مستنية تقدر تعمله. **Starvation:** blocking للأبد. **Priority inversion:** أولوية قليلة ماسكة lock محتاجه أولوية أعلى.'),
    ],
    traps: [t('signal … wait → several in the critical section; wait … wait → deadlock.', 'signal … wait ← كذا واحد في الـ critical section؛ وwait … wait ← deadlock.')],
  },
  {
    id: 'c5-classic',
    title: 'Classic problems',
    subtitle: 'Bounded buffer · readers–writers · philosophers',
    points: [
      t('**Bounded buffer:** mutex = 1, full = 0, empty = n. Producer: wait(empty), wait(mutex) … signal(mutex), signal(full).', '**الـ Bounded buffer:** mutex = 1 وfull = 0 وempty = n. الـ Producer: wait(empty) وwait(mutex) … signal(mutex) وsignal(full).'),
      t('**Readers–writers:** rw_mutex = 1, mutex = 1, read_count = 0. First reader wait(rw_mutex), last reader signal(rw_mutex).', '**الـ Readers–writers:** rw_mutex = 1 وmutex = 1 وread_count = 0. أول reader بيعمل wait(rw_mutex)، وآخر reader بيعمل signal(rw_mutex).'),
      t('First variation: readers first (writers may starve). Second: writers ASAP. Kernel reader–writer locks.', 'النسخة الأولى: الـ readers الأول (الـ writers ممكن يتجوّعوا). التانية: الـ writers بأسرع وقت. وفيه reader–writer locks في الـ kernel.'),
      t('**Dining philosophers:** chopstick[5] = 1; everyone takes the left one → deadlock.', '**الـ Dining philosophers:** chopstick[5] = 1؛ لو الكل مسك الشمال ← deadlock.'),
    ],
  },
]

export const chapter5HighYieldTraps: LText[] = [
  t('Concurrent access → data inconsistency; order-dependent result → race condition.', 'الوصول المتزامن ← data inconsistency؛ والنتيجة اللي بتعتمد على الترتيب ← race condition.'),
  t('Permission is requested in the entry section.', 'الإذن بيتطلب في الـ entry section.'),
  t('All three requirements, not only bounded waiting; priority inversion is not one.', 'التلات شروط، مش bounded waiting بس؛ والـ priority inversion مش منهم.'),
  t('Peterson meets all three; simple TAS/CAS locks miss bounded waiting.', 'Peterson بيحقق التلاتة؛ والـ locks البسيطة بـ TAS/CAS ناقصها الـ bounded waiting.'),
  t('compare_and_swap is atomic — never interruptible.', 'الـ compare_and_swap atomic — عمرها ما تتقطع.'),
  t('Synchronization: both hardware and software.', 'الـ Synchronization: hardware وsoftware الاتنين.'),
  t('Busy waiting wastes CPU cycles; semaphores (with a queue) avoid it.', 'الـ busy waiting بيضيّع CPU cycles؛ والـ semaphores (بالـ queue) بتتجنّبه.'),
  t('signal…wait → many inside; wait…wait → deadlock.', 'signal…wait ← كتير جوه؛ wait…wait ← deadlock.'),
  t('Producer–consumer: empty and full (+ mutex).', 'الـ Producer–consumer: empty وfull (+ mutex).'),
  t('Readers–writers: readCount 0, mutex 1, writeBlock 1; writers may starve.', 'الـ Readers–writers: readCount 0 وmutex 1 وwriteBlock 1؛ والـ writers ممكن يتجوّعوا.'),
]
