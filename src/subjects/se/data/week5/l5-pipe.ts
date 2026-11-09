import type { Lesson } from '../../types'
import { part, t } from '../helpers'

/** Slides 21–25: shared data added to the list, the pipe-and-filter style, its invariants, UNIX example, trade-offs and two views. */
export const pipeFilter: Lesson = {
  id: 'w5-pipe',
  weekId: 'week-5',
  order: 5,
  title: 'Pipe-and-Filter: Data Flowing Through Transformers',
  shortTitle: 'Pipe-and-Filter',
  slides: [21, 22, 23, 24, 25],
  minutes: 14,
  tldr: t(
    'Streams of data pass from one **filter** to the next through **pipes**. Filters **transform** input streams into output streams, possibly **incrementally**, and can run **concurrently** — a consumer doesn’t wait for its producer to finish. The key invariant: **filters are independent (no shared state)**. Classic example: the UNIX shell, `ls invoices | grep -e August | sort`. Great for reuse and throughput; poor for interactive systems.',
    'الداتا بتعدّي كـ streams من **filter** للتاني عن طريق **pipes**. والـ filters بـ **تحوّل** streams الدخل لـ streams خرج، ممكن **على دفعات**، وتقدر تشتغل **بالتوازي** — المستهلك مش لازم يستنى المنتج يخلص. والقاعدة الأساسية: **الـ filters مستقلة (مفيش state مشتركة)**. والمثال الكلاسيك: الـ UNIX shell، `ls invoices | grep -e August | sort`. ممتاز لإعادة الاستخدام والإنتاجية؛ وضعيف في الأنظمة التفاعلية.',
  ),
  blocks: [
    {
      kind: 'callout',
      tone: 'note',
      title: t('One more style: shared data', 'style كمان: shared data'),
      body: t(
        'The catalogue now also lists **shared data**: components communicate through a common data store (a repository or “blackboard”) rather than directly with each other.',
        'القايمة بقى فيها كمان **shared data**: الـ components بتتواصل عن طريق مخزن داتا مشترك (repository أو “blackboard”) بدل ما تكلّم بعض مباشرة.',
      ),
    },

    part(t('The style', 'الـ Style')),
    {
      kind: 'versus',
      left: { title: 'Components = filters', icon: 'workflow', tone: 'violet' },
      right: { title: 'Connectors = pipes', icon: 'route', tone: 'teal' },
      rows: [
        { aspect: 'Job', left: t('**Transform** input data streams into output data streams.', '**تحوّل** streams الدخل لـ streams خرج.'), right: t('**Conduits** for data streams.', '**قنوات** لنقل الـ streams.') },
        { aspect: 'Timing', left: t('Possibly **incremental** production of output — and filters may run **concurrently**: no need for a producer to finish before its consumer starts.', 'ممكن تطلّع الخرج **على دفعات** — والـ filters تقدر تشتغل **بالتوازي**: مش لازم المنتج يخلص قبل ما المستهلك يبدأ.'), right: t('Carry data as soon as it is produced.', 'بتنقل الداتا أول ما تطلع.') },
      ],
      verdict: t(
        '**Style invariant: filters are independent (no shared state).** A filter only knows its input and output streams — not who is upstream or downstream.',
        '**قاعدة الـ style: الـ filters مستقلة (مفيش state مشتركة).** الـ filter عارف بس الـ stream اللي داخله واللي خارج منه — مش عارف مين قبله ولا مين بعده.',
      ),
    },
    {
      kind: 'idea',
      title: 'An assembly line for data',
      icon: 'workflow',
      tone: 'violet',
      text: t(
        'Each station does one transformation and passes the item on. Stations work at the same time on different items.',
        'كل محطة بتعمل تحويل واحد وتعدّي الحاجة للي بعدها. والمحطات بتشتغل في نفس الوقت على حاجات مختلفة.',
      ),
      analogy: t(
        'A water treatment plant: water flows through a sand filter, then a carbon filter, then UV — each stage independent, connected by pipes. Add or swap a stage without redesigning the others.',
        'محطة تنقية مية: المية بتعدّي على فلتر رمل، وبعدين فلتر كربون، وبعدين UV — كل مرحلة مستقلة ومتوصلة بمواسير. تقدر تزوّد أو تبدّل مرحلة من غير ما تعيد تصميم الباقي.',
      ),
    },
    {
      kind: 'code',
      title: 'UNIX shell example',
      language: 'text',
      code: `$ ls invoices | grep -e August | sort`,
      notes: [
        t('`ls invoices` lists the files (filter 1) → `|` pipe → `grep -e August` keeps only lines containing “August” (filter 2) → `|` pipe → `sort` orders them (filter 3) → screen.', '`ls invoices` بتطلّع أسامي الملفات (filter 1) ← `|` pipe ← `grep -e August` بتسيب بس السطور اللي فيها “August” (filter 2) ← `|` pipe ← `sort` بترتّبهم (filter 3) ← الشاشة.'),
        t('Each program knows nothing about the others — you can swap `sort` for `sort -r` or insert `head` without touching the rest.', 'كل برنامج مش عارف حاجة عن التانيين — تقدر تبدّل `sort` بـ `sort -r` أو تحشر `head` من غير ما تلمس الباقي.'),
      ],
    },

    part(t('Disadvantages, cautions, qualities', 'العيوب والتحذيرات والجودة')),
    {
      kind: 'asks',
      items: [
        {
          q: 'Disadvantages?',
          a: t(
            '**Poor for interactive applications** (it is a batch / stream model). **Parsing overhead**: each filter must parse its input and format its output, often forcing a lowest-common-denominator data format (e.g. plain text). **Error handling** across a chain is awkward. Filters can’t cooperate through shared state.',
            '**ضعيف في التطبيقات التفاعلية** (هو نموذج batch / stream). **تكلفة الـ parsing**: كل filter لازم يفك الدخل ويجهّز الخرج، وده غالبًا بيفرض شكل داتا بسيط مشترك (زي النص العادي). **التعامل مع الأخطاء** في سلسلة طويلة متعب. والـ filters متقدرش تتعاون عن طريق state مشتركة.',
          ),
        },
        {
          q: 'Cautions?',
          a: t(
            'Keep filters truly **independent** (no hidden shared files or globals). Watch for filters that need **all their input before producing output** (like `sort`): they block streaming and kill concurrency. Agree on the **data format** between filters.',
            'خلّي الـ filters **مستقلة** بجد (من غير ملفات أو متغيرات عامة مشتركة في السر). وخد بالك من الـ filters اللي **محتاجة الدخل كله قبل ما تطلّع خرج** (زي `sort`): دي بتوقف الـ streaming وتقتل التوازي. واتفق على **شكل الداتا** بين الـ filters.',
          ),
        },
        {
          q: 'Qualities?',
          a: t(
            '**Reuse** (filters recombine freely), **modifiability** (add, remove or replace a filter), **concurrency / throughput** (filters run in parallel), **simplicity** (the whole is just a composition of filters) and **testability** (test each filter alone).',
            '**إعادة الاستخدام** (الـ filters بتتركب بأي شكل)، و**الـ modifiability** (زوّد أو شيل أو بدّل filter)، و**التوازي / الإنتاجية** (الـ filters بتشتغل مع بعض)، و**البساطة** (الكل مجرد تركيب filters)، و**سهولة الاختبار** (اختبر كل filter لوحده).',
          ),
        },
      ],
    },

    part(t('One system, two views', 'سيستم واحد، viewين')),
    {
      kind: 'diagram',
      id: 'pipe-filter',
      title: t('Pipe-and-filter in a C&C view and a module view', 'الـ Pipe-and-filter في C&C view وmodule view'),
      caption: t(
        '**C&C view** (key: filter, pipe, port): `Split` feeds `To-upper` and `To-lower`, whose outputs are joined by `Merge`. **Module view** (key: module, “X uses Y”): a `main` module uses `split`, `to_upper`, `to_lower` and `merge`, plus `config` and `stdio`. Same system — the runtime picture shows the **stream**, the code picture shows **who uses whom**.',
        '**الـ C&C view** (المفتاح: filter وpipe وport): `Split` بيغذّي `To-upper` و`To-lower`، وخرجهم بيتجمع في `Merge`. **والـ module view** (المفتاح: module و“X uses Y”): module اسمه `main` بيستخدم `split` و`to_upper` و`to_lower` و`merge`، ومعاهم `config` و`stdio`. نفس السيستم — صورة وقت التشغيل بتورّي **الـ stream**، وصورة الكود بتورّي **مين بيستخدم مين**.',
      ),
    },
    {
      kind: 'callout',
      tone: 'insight',
      title: t('Why this matters', 'ده مهم ليه'),
      body: t(
        'A style lives **inside a view** (Lesson 1): pipe-and-filter is a **C&C style**. The module view of the same program looks completely different — proof again that **modules ≠ components**.',
        'الـ style عايش **جوّه view** (الدرس 1): الـ pipe-and-filter **C&C style**. والـ module view لنفس البرنامج شكلها مختلف تمامًا — دليل تاني إن **الـ modules ≠ الـ components**.',
      ),
    },
  ],
  keyTerms: [
    { term: 'Pipe-and-filter', definition: t('Streams of data pass from filter to filter through pipes; filters can run concurrently.', 'streams داتا بتعدّي من filter لـ filter عن طريق pipes؛ والـ filters تقدر تشتغل بالتوازي.') },
    { term: 'Filter', definition: t('A component that transforms input data streams into output streams, possibly incrementally.', 'component بيحوّل streams الدخل لـ streams خرج، ممكن على دفعات.') },
    { term: 'Pipe', definition: t('A connector: a conduit for data streams.', 'connector: قناة لنقل الـ streams.') },
    { term: 'Style invariant', definition: t('Filters are independent — no shared state.', 'الـ filters مستقلة — مفيش state مشتركة.') },
    { term: 'Shared data style', definition: t('Components communicate through a common data store (repository / blackboard).', 'الـ components بتتواصل عن طريق مخزن داتا مشترك (repository / blackboard).') },
    { term: 'Pipe-and-filter trade-offs', definition: t('+ reuse, modifiability, concurrency, testability; − interactive apps, parsing overhead, error handling.', '+ إعادة استخدام وmodifiability وتوازي وسهولة اختبار؛ − التطبيقات التفاعلية وتكلفة الـ parsing والتعامل مع الأخطاء.') },
  ],
  recap: [
    t('Shared data: components communicate through a common data store.', 'الـ Shared data: الـ components بتتواصل عن طريق مخزن داتا مشترك.'),
    t('Filters transform streams (possibly incrementally) and run concurrently; pipes carry the streams.', 'الـ filters بتحوّل الـ streams (ممكن على دفعات) وبتشتغل بالتوازي؛ والـ pipes بتنقلها.'),
    t('Invariant: filters are independent, no shared state. Example: ls invoices | grep -e August | sort.', 'القاعدة: الـ filters مستقلة ومفيش state مشتركة. مثال: ls invoices | grep -e August | sort.'),
    t('Disadvantages: interactive apps, parsing overhead, error handling. Caution: blocking filters like sort. Qualities: reuse, modifiability, concurrency, testability.', 'العيوب: التطبيقات التفاعلية، وتكلفة الـ parsing، والأخطاء. التحذير: filters بتوقف زي sort. الجودة: إعادة الاستخدام، والـ modifiability، والتوازي، وسهولة الاختبار.'),
    t('Same system as a C&C view (split → to-upper/to-lower → merge) and a module view (main uses split, to_upper, to_lower, merge, config, stdio).', 'نفس السيستم كـ C&C view (split ← to-upper/to-lower ← merge) وكـ module view (main بيستخدم split وto_upper وto_lower وmerge وconfig وstdio).'),
  ],
}
