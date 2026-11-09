import type { Lesson } from '../../types'
import { part, t } from '../helpers'

/** Slides 1–3: the core paradigm, the three course objectives, the prime directive and the reference library. */
export const compass: Lesson = {
  id: 'w1-compass',
  weekId: 'week-1',
  order: 1,
  title: 'The Course Compass: What This Course Is Really About',
  shortTitle: 'The Course Compass',
  slides: [1, 2, 3],
  minutes: 10,
  tldr: t(
    'Architecture = the decisions that are **hard to change later**. The course has three goals: drop toy examples, learn to **count the cost of every decision**, and keep AI-generated code under **governance**. Its motto: “The only way to go fast, is to go well.”',
    'الـ Architecture = القرارات اللي **صعب تغيّرها بعدين**. المادة ليها 3 أهداف: نبطّل أمثلة لعب، ونتعلم **نحسب تمن كل قرار**، ونحط الكود اللي الـ AI بيكتبه تحت **رقابة (governance)**. وشعارها: “الطريقة الوحيدة إنك تمشي بسرعة هي إنك تمشي صح”.',
  ),
  blocks: [
    {
      kind: 'lead',
      text: t(
        'Most courses teach you how to write code. This one teaches you how to make the **decisions** that let real systems survive for years — and how to stay in control when an AI writes much of the code for you.',
        'أغلب المواد بتعلّمك تكتب كود. المادة دي بتعلّمك تاخد **القرارات** اللي بتخلّي السيستم الحقيقي يعيش سنين — وإزاي تفضل ماسك الدفّة لما الـ AI يكتب جزء كبير من الكود بدالك.',
      ),
    },
    {
      kind: 'memorize',
      label: 'Core paradigm of the course',
      text: 'Architecture is the decisions that are hard to change later.',
      note: t(
        'Test any decision with one question: **“How expensive is it to change this in a year?”** Choosing the database, splitting the system into services, or how parts talk to each other → expensive → architectural. Changing a button colour → cheap → not architectural.',
        'اختبر أي قرار بسؤال واحد: **“لو عايز أغيّر ده بعد سنة هيكلفني قد إيه؟”** اختيار الداتابيز، تقسيم السيستم لـ services، طريقة كلام الأجزاء مع بعض → غالي → قرار معماري. تغيير لون زرار → رخيص → مش معماري.',
      ),
    },
    {
      kind: 'idea',
      title: 'Why “hard to change” is the whole story',
      icon: 'building',
      text: t(
        'Everything in software *can* change — but not at the same price. Architecture is the set of choices whose change cost is huge, so they must be made carefully and early.',
        'كل حاجة في السوفتوير *ممكن* تتغيّر — بس مش بنفس التمن. الـ Architecture هي مجموعة الاختيارات اللي تمن تغييرها ضخم، فلازم تتاخد بعناية ومن بدري.',
      ),
      analogy: t(
        'A house: you can repaint a wall any weekend, but moving the foundations after the building is finished means tearing it down. Foundations = architecture. Paint = detail.',
        'زي البيت: تقدر تدهن حيطة في أي أجازة، لكن تغيير الأساسات بعد ما البيت يخلص معناه تهدّه. الأساسات = architecture. الدهان = تفصيلة.',
      ),
    },

    part(t('The three course objectives', 'التلات أهداف بتوع المادة')),
    {
      kind: 'cards',
      numbered: true,
      items: [
        {
          title: 'Eliminate Toy Mental Models',
          tone: 'blue',
          body: t(
            'We do not build `Dog extends Animal`. We build **production-grade**, reliable, maintainable, scalable, distributed solutions.',
            'إحنا مش بنبني `Dog extends Animal`. إحنا بنبني حلول **production-grade**: reliable وmaintainable وscalable وdistributed.',
          ),
        },
        {
          title: 'Master Structural Trade-offs',
          tone: 'violet',
          body: t(
            'Every decision introduces **cost**. You will learn to **quantify** that cost **empirically** (with measurements, not opinions).',
            'كل قرار ليه **تمن**. هتتعلم **تقيس** التمن ده **بالتجربة والأرقام**، مش بالرأي.',
          ),
        },
        {
          title: 'Command the AI-Augmented SDLC',
          tone: 'amber',
          body: t(
            'LLMs generate code at unprecedented velocity. **Without governance**, they generate **technical debt** at unprecedented velocity.',
            'الـ LLMs بتكتب كود بسرعة غير مسبوقة. و**من غير governance** بتعمل **technical debt** بنفس السرعة غير المسبوقة.',
          ),
        },
      ],
    },
    {
      kind: 'hook',
      title: t('The three objectives in three words', 'التلات أهداف في تلات كلمات'),
      phrase: 'Real · Cost · Govern',
      letters: [
        { letter: 'R', word: 'Real systems, no toys' },
        { letter: 'C', word: 'Count the cost of every decision' },
        { letter: 'G', word: 'Govern the AI that writes code' },
      ],
    },
    {
      kind: 'memorize',
      label: 'The Prime Directive',
      text: 'The only way to go fast, is to go well.',
      source: 'Robert C. Martin (“Uncle Bob”), author of Clean Architecture',
      note: t(
        'Speed is not how fast you type today; it is how fast you can **still** move a year from now. Messy code feels fast for a week, then slows every change after it.',
        'السرعة مش إنك تكتب بسرعة النهارده؛ السرعة إنك **لسه** تقدر تتحرك بسرعة بعد سنة. الكود البايظ بيحسّسك إنك سريع أسبوع، وبعدين يبطّأ كل تعديل بعده.',
      ),
    },

    part(t('The reference library', 'مكتبة المراجع')),
    {
      kind: 'callout',
      tone: 'note',
      title: t('Why the short tags matter', 'ليه الاختصارات دي مهمة'),
      body: t('Readings are cited by tag, e.g. “CleanArch (Ch1, Ch2); FSA (Ch1, Ch2); DMLS (Ch1)”. Know which tag is which book.', 'القراءات بيتشار ليها بالاختصار، زي “CleanArch (Ch1, Ch2); FSA (Ch1, Ch2); DMLS (Ch1)”. اعرف كل اختصار يعني أنهي كتاب.'),
    },
    {
      kind: 'table',
      caption: t('Master reference bibliography', 'قايمة المراجع الأساسية'),
      headers: ['Tag', 'Book', 'Author(s) · year · edition', 'Publisher · ISBN'],
      rows: [
        [t('CleanArch'), t("Clean Architecture: A Craftsman's Guide to Software Structure and Design"), t('Martin, R. C. · 2017 · 1st'), t('Prentice Hall · 978-0134494166')],
        [t('DDIA'), t('Designing Data-Intensive Applications: The Big Ideas Behind Reliable, Scalable, and Maintainable Systems'), t('Kleppmann, M. · 2017 · 1st'), t("O'Reilly · 978-1449373320")],
        [t('HFDP-2e'), t('Head First Design Patterns: Building Extensible and Maintainable Object-Oriented Software'), t('Freeman, E. & Robson, E. · 2020 · 2nd'), t("O'Reilly · 978-1492078005")],
        [t('CD'), t('Continuous Delivery: Reliable Software Releases through Build, Test, and Deployment Automation'), t('Humble, J. & Farley, D. · 2010 · 1st'), t('Addison-Wesley · 978-0321601919')],
        [t('FSA'), t('Fundamentals of Software Architecture: An Engineering Approach'), t('Richards, M. & Ford, N. · 2020 · 1st'), t("O'Reilly · 978-1492043454")],
        [t('DMLS'), t('Designing Machine Learning Systems: An Iterative Process for Production-Ready Applications'), t('Huyen, C. · 2022 · 1st'), t("O'Reilly · 978-1098107963")],
        [t('SAiP-4e'), t('Software Architecture in Practice'), t('Bass, L., Clements, P. & Kazman, R. · 2021 · 4th'), t('Addison-Wesley · 978-0136886006')],
        [t('AIE'), t('AI Engineering: Building Applications with Foundation Models'), t('Huyen, C. · 2025 · 1st'), t("O'Reilly · 978-1098166304")],
        [t('BM-2e'), t('Building Microservices: Designing Fine-Grained Systems'), t('Newman, S. · 2021 · 2nd'), t("O'Reilly · 978-1492034025")],
      ],
    },
    {
      kind: 'cards',
      title: t('Readings for Weeks 1 & 2', 'القراءات المطلوبة للأسبوع 1 و2'),
      columns: 3,
      items: [
        { icon: 'book', tag: 'Ch 1 · Ch 2', title: 'CleanArch', tone: 'blue', body: t('Clean Architecture — Robert C. Martin.', 'Clean Architecture — روبرت مارتن.') },
        { icon: 'book', tag: 'Ch 1 · Ch 2', title: 'FSA', tone: 'violet', body: t('Fundamentals of Software Architecture — Richards & Ford.', 'Fundamentals of Software Architecture — ريتشاردز وفورد.') },
        { icon: 'book', tag: 'Ch 1', title: 'DMLS', tone: 'teal', body: t('Designing Machine Learning Systems — Chip Huyen.', 'Designing Machine Learning Systems — تشيب هوين.') },
      ],
    },
  ],
  keyTerms: [
    { term: 'Software architecture (course paradigm)', definition: t('The decisions that are hard to change later.', 'القرارات اللي صعب تتغيّر بعدين.') },
    { term: 'Toy mental model', definition: t('A classroom example (e.g. `Dog extends Animal`) that ignores the realities of production systems.', 'مثال فصل دراسي (زي `Dog extends Animal`) بيتجاهل واقع السيستمات الحقيقية.') },
    { term: 'Production-grade', definition: t('Reliable, maintainable, scalable and distributed enough to run real users and real money.', 'reliable وmaintainable وscalable وdistributed بما يكفي يشيل مستخدمين حقيقيين وفلوس حقيقية.') },
    { term: 'Structural trade-off', definition: t('Every structural decision introduces a cost; the skill is quantifying it empirically.', 'كل قرار في الهيكل ليه تمن؛ والمهارة إنك تقيسه بالتجربة.') },
    { term: 'AI-augmented SDLC', definition: t('A software lifecycle where LLMs generate code — fast, and without governance, fast technical debt too.', 'دورة حياة سوفتوير الـ LLMs بتكتب فيها كود — بسرعة، ومن غير governance بتعمل technical debt بسرعة برضه.') },
    { term: 'Technical debt', definition: t('The future cost you pay for shortcuts taken in the code today.', 'التمن اللي هتدفعه بعدين بسبب الاختصارات اللي عملتها في الكود النهارده.') },
    { term: 'Prime Directive', definition: t('“The only way to go fast, is to go well.” — Robert C. Martin.', '“الطريقة الوحيدة إنك تمشي بسرعة هي إنك تمشي صح.” — روبرت مارتن.') },
  ],
  recap: [
    t('Architecture = the decisions that are hard to change later.', 'الـ Architecture = القرارات اللي صعب تتغيّر بعدين.'),
    t('Objective 1: no toy models — real production-grade, distributed systems.', 'الهدف 1: مفيش أمثلة لعب — سيستمات production-grade وdistributed بجد.'),
    t('Objective 2: every decision has a cost; quantify it empirically.', 'الهدف 2: كل قرار ليه تمن؛ قيسه بالتجربة.'),
    t('Objective 3: LLMs write code fast — without governance they write technical debt just as fast.', 'الهدف 3: الـ LLMs بتكتب كود بسرعة — ومن غير governance بتعمل technical debt بنفس السرعة.'),
    t('Prime Directive: “The only way to go fast, is to go well.” — Robert C. Martin.', 'الـ Prime Directive: “The only way to go fast, is to go well.” — Robert C. Martin.'),
    t('Nine reference books; Weeks 1–2 read CleanArch Ch1–2, FSA Ch1–2, DMLS Ch1.', 'تسع كتب مرجعية؛ وقراءات أسبوع 1 و2: CleanArch فصل 1–2، وFSA فصل 1–2، وDMLS فصل 1.'),
  ],
}
