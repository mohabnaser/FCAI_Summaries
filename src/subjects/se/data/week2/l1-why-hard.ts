import type { Lesson } from '../../types'
import { part, t } from '../helpers'

/** Slides 1–4: cover, bibliography (repeat), the software crisis, No Silver Bullet and Brooks' four properties. */
export const whyHard: Lesson = {
  id: 'w2-why-hard',
  weekId: 'week-2',
  order: 1,
  title: 'Why Software Is Hard: No Silver Bullet',
  shortTitle: 'Why Software Is Hard',
  slides: [1, 2, 3, 4],
  minutes: 12,
  tldr: t(
    'Since the 1968 “Software Crisis”, we know there is **no silver bullet**: software has **essential complexity** (the real-world problem — can’t be removed) and **accidental complexity** (self-inflicted — our job is to eliminate it). Brooks names four properties that make software hard: **Complexity, Conformity, Changeability, Invisibility**.',
    'من “أزمة السوفتوير” سنة 1968 وإحنا عارفين إن **مفيش حل سحري (silver bullet)**: السوفتوير فيه **essential complexity** (صعوبة المشكلة نفسها — مينفعش تتشال) و**accidental complexity** (صعوبة إحنا اللي عاملينها — وشغلتنا نشيلها). وBrooks حدد 4 صفات بتخلّي السوفتوير صعب: **Complexity وConformity وChangeability وInvisibility**.',
  ),
  blocks: [

    part(t('The Software Crisis & “No Silver Bullet”', 'أزمة السوفتوير و“No Silver Bullet”')),
    {
      kind: 'flow',
      title: t('A short history', 'تاريخ في سطرين'),
      steps: [
        { icon: 'landmark', label: '1968 · NATO conference', tone: 'blue', detail: t('NATO convened to address the **“Software Crisis”**: projects late, over budget, unreliable.', 'الـ NATO عملت مؤتمر عشان **“أزمة السوفتوير”**: مشاريع متأخرة وفوق الميزانية ومش موثوقة.') },
        { icon: 'scroll', label: 'Decades later · Fred Brooks', tone: 'violet', detail: t('Argued there is **no silver bullet** for software engineering — because of its **essential complexity**.', 'قال إن **مفيش silver bullet** لهندسة السوفتوير — بسبب الـ **essential complexity** بتاعتها.') },
      ],
    },
    {
      kind: 'idea',
      title: 'What “no silver bullet” means',
      icon: 'crosshair',
      tone: 'violet',
      text: t(
        'No single tool, language or method will ever make software 10× easier, because part of the difficulty is **in the problem itself**, not in our tools.',
        'مفيش أداة ولا لغة ولا طريقة واحدة هتخلّي السوفتوير أسهل 10 مرات، لأن جزء من الصعوبة **في المشكلة نفسها**، مش في أدواتنا.',
      ),
      analogy: t(
        'In folklore, a silver bullet kills the werewolf in one shot. Software has no such magic shot — every new framework or AI tool helps a bit, none kills the monster.',
        'في الحواديت، الرصاصة الفضة بتموّت المستذئب من أول طلقة. السوفتوير مالوش الطلقة السحرية دي — كل framework أو أداة AI جديدة بتساعد شوية، بس ولا واحدة بتموّت الوحش.',
      ),
    },
    {
      kind: 'versus',
      left: { title: 'Essential Complexity', icon: 'mountain', tone: 'violet', tagline: t('Comes with the problem', 'جاية مع المشكلة') },
      right: { title: 'Accidental Complexity', icon: 'bug', tone: 'rose', tagline: t('Comes from us', 'جاية مننا إحنا') },
      rows: [
        {
          aspect: 'Definition',
          left: t('The **inherent** difficulty of modeling **complex, contradictory business realities**.', 'الصعوبة **الأصلية** في تمثيل **واقع بيزنس معقد ومتناقض**.'),
          right: t('The **self-inflicted damage** caused by poor architectural decisions, chaotic frameworks and undisciplined developers.', '**الضرر اللي عملناه في نفسنا** بسبب قرارات معمارية وحشة وframeworks فوضوية ومطورين مش منضبطين.'),
        },
        {
          aspect: 'Example',
          left: t('Tax rules that contradict each other in different countries.', 'قوانين ضرايب بتناقض بعض في دول مختلفة.'),
          right: t('Spaghetti code where one change breaks five unrelated screens.', 'كود spaghetti لما تغيّر حاجة يبوظ 5 شاشات مالهمش علاقة.'),
        },
        {
          aspect: 'Can we remove it?',
          left: t('No — only manage it.', 'لأ — بس نديرها.'),
          right: t('Yes — that is our job.', 'أيوه — ودي شغلتنا.'),
        },
      ],
      verdict: t(
        'Our entire discipline is dedicated to **eliminating accidental complexity**.',
        'المجال بتاعنا كله هدفه **إننا نشيل الـ accidental complexity**.',
      ),
    },
    {
      kind: 'diagram',
      id: 'complexity',
      title: t('Same problem, different total difficulty', 'نفس المشكلة، وصعوبة كلية مختلفة'),
      caption: t(
        'The essential part is identical for both teams; good engineering only shrinks the accidental part.',
        'الجزء الـ essential هو هو عند الفريقين؛ الهندسة الكويسة بتصغّر الجزء الـ accidental بس.',
      ),
    },

    part(t("Brooks' four inherent properties", 'الأربع صفات الأصلية بتوع Brooks')),
    {
      kind: 'cards',
      columns: 4,
      items: [
        { icon: 'network', title: 'Complexity', tone: 'blue', body: t('No two software parts are alike, and the **state space grows exponentially**.', 'مفيش جزئين في السوفتوير زي بعض، و**عدد الحالات الممكنة بيكبر أُسّيًا**.') },
        { icon: 'gavel', title: 'Conformity', tone: 'violet', body: t('Software has **no natural laws**; it must conform to **arbitrary** human interfaces, legacy systems and regulations.', 'السوفتوير **مالوش قوانين طبيعية**؛ لازم يتأقلم مع واجهات بشرية وأنظمة قديمة وقوانين **عشوائية**.') },
        { icon: 'refresh', title: 'Changeability', tone: 'amber', body: t('Because code is perceived as **malleable**, it is under constant, intense **pressure to change** (unlike physical buildings).', 'عشان الكود باين إنه **سهل التشكيل**، فهو تحت **ضغط تغيير** مستمر وشديد (عكس المباني).') },
        { icon: 'invisible', title: 'Invisibility', tone: 'rose', body: t('Software is **invisible and unvisualizable**, hiding its structural flaws **until execution**.', 'السوفتوير **مش متشاف ومينفعش يترسم بالكامل**، فعيوبه الهيكلية بتستخبى **لحد ما يشتغل**.') },
      ],
    },
    {
      kind: 'hook',
      title: t('Four C-ish words: “CCCI”', 'أربع كلمات: “CCCI”'),
      phrase: 'Complex · Conform · Change · Invisible',
      letters: [
        { letter: 'C', word: 'Complexity — exploding states' },
        { letter: 'C', word: 'Conformity — no natural laws' },
        { letter: 'C', word: 'Changeability — “it’s just code”' },
        { letter: 'I', word: 'Invisibility — flaws hide' },
      ],
      body: t(
        'Compare with a bridge: physics never changes (no conformity chaos), nobody asks to move it every month (low changeability), and you can see a crack (visible).',
        'قارنها بكوبري: الفيزيا مبتتغيرش (مفيش فوضى conformity)، ومحدش بيطلب ينقله كل شهر (changeability قليلة)، والشرخ بيبان بالعين (visible).',
      ),
    },
    {
      kind: 'myths',
      items: [
        {
          myth: t('“A better framework or AI tool will remove the difficulty.”', '“framework أحسن أو أداة AI هتشيل الصعوبة.”'),
          fact: t('Tools attack **accidental** complexity only. The **essential** part stays — no silver bullet.', 'الأدوات بتهاجم الـ **accidental** بس. الجزء الـ **essential** بيفضل — مفيش silver bullet.'),
        },
        {
          myth: t('“Changeability means software is easy to change.”', '“Changeability يعني السوفتوير سهل يتغير.”'),
          fact: t('It means software is under **constant pressure** to change *because people think* it is easy.', 'معناها إن السوفتوير تحت **ضغط مستمر** للتغيير *عشان الناس فاكرة* إنه سهل.'),
        },
      ],
    },
  ],
  keyTerms: [
    { term: 'Software Crisis (1968)', definition: t('The problem NATO convened to address: software projects failing to be delivered reliably.', 'المشكلة اللي الـ NATO اتجمعت عشانها: مشاريع سوفتوير مش بتتسلّم بشكل موثوق.') },
    { term: 'No Silver Bullet', definition: t('Fred Brooks: no single technique will make software engineering easy, because of essential complexity.', 'Fred Brooks: مفيش تقنية واحدة هتخلّي هندسة السوفتوير سهلة، بسبب الـ essential complexity.') },
    { term: 'Essential complexity', definition: t('The inherent difficulty of modeling complex, contradictory business realities.', 'الصعوبة الأصلية في تمثيل واقع بيزنس معقد ومتناقض.') },
    { term: 'Accidental complexity', definition: t('Self-inflicted damage from poor architectural decisions, chaotic frameworks and undisciplined developers.', 'ضرر إحنا اللي عاملينه من قرارات معمارية وحشة وframeworks فوضوية ومطورين مش منضبطين.') },
    { term: 'Complexity (Brooks)', definition: t('No two parts are alike; the state space grows exponentially.', 'مفيش جزئين زي بعض؛ والحالات بتكبر أُسّيًا.') },
    { term: 'Conformity', definition: t('Software has no natural laws and must conform to arbitrary interfaces, legacy systems and regulations.', 'السوفتوير مالوش قوانين طبيعية ولازم يتأقلم مع واجهات وأنظمة قديمة وقوانين عشوائية.') },
    { term: 'Changeability', definition: t('Perceived as malleable, software faces constant, intense pressure to change.', 'عشان باين سهل التشكيل، السوفتوير عليه ضغط تغيير مستمر وشديد.') },
    { term: 'Invisibility', definition: t('Software cannot be seen or visualized, so structural flaws hide until execution.', 'السوفتوير مش متشاف، فالعيوب الهيكلية بتستخبى لحد التشغيل.') },
  ],
  recap: [
    t('1968: NATO meets about the “Software Crisis”. Later, Brooks: “No Silver Bullet”.', '1968: الـ NATO بتتجمع عشان “أزمة السوفتوير”. وبعدين Brooks: “No Silver Bullet”.'),
    t('Essential complexity = the problem itself (business reality). Accidental = self-inflicted.', 'Essential = المشكلة نفسها (واقع البيزنس). Accidental = إحنا اللي عاملينها.'),
    t('Our whole discipline exists to eliminate accidental complexity.', 'المجال كله موجود عشان يشيل الـ accidental complexity.'),
    t('Brooks’ four properties: Complexity, Conformity, Changeability, Invisibility (CCCI).', 'صفات Brooks الأربعة: Complexity وConformity وChangeability وInvisibility (CCCI).'),
  ],
}
