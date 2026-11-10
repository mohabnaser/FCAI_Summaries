import type { QuizQuestion } from '../../types'
import { t } from '../helpers'

/** "Check your understanding" questions for Week 1, keyed by lesson id. Ordered easy → hard. */
export const week1Quiz: Record<string, QuizQuestion[]> = {
  'w1-compass': [
    {
      level: 'recall',
      question: t('In this course, what makes a decision *architectural*?', 'في المادة دي، إيه اللي بيخلّي القرار *معماري*؟'),
      options: [
        'It is taken by the most senior person on the team',
        'It is hard and expensive to change later',
        'It is about the choice of programming language',
        'It is written down in a formal design document',
      ],
      answer: 1,
      explanation: t(
        'Architecture is **the decisions that are hard to change later**. Who took the decision, or where it is written, does not matter — the test is: “how expensive would it be to change this in a year?”',
        'الـ Architecture هي **القرارات اللي صعب تتغيّر بعدين**. مين اللي خد القرار أو مكتوب فين مش مهم — الاختبار هو: “لو حبيت أغيّر ده بعد سنة، هيكلّفني قد إيه؟”',
      ),
    },
    {
      level: 'understand',
      question: t(
        'In the same week a team decides (1) the accent colour of the buttons and (2) that every service reads and writes one shared database. Which decision is architectural, and why?',
        'في نفس الأسبوع الفريق قرر (1) لون الزراير و(2) إن كل الـ services تقرا وتكتب في database واحدة مشتركة. أنهي قرار معماري، وليه؟',
      ),
      options: [
        'Both — every decision that reaches production is architectural',
        'The colour — users see it, so it carries the most risk',
        'The shared database — undoing it a year later would touch every service',
        'Neither — architecture only starts when the system has to scale',
      ],
      answer: 2,
      explanation: t(
        'Apply the one-year test. The colour is paint: you change it in minutes. The shared database is foundations: a year later every service is built on it, so reversing it is very expensive.',
        'طبّق اختبار السنة. اللون ده دهان: بيتغيّر في دقايق. إنما الـ database المشتركة دي أساسات: بعد سنة كل الـ services مبنية عليها، فالرجوع فيها غالي جدًا.',
      ),
    },
    {
      level: 'understand',
      question: t(
        'What does the Prime Directive “The only way to go fast, is to go well” claim?',
        'الـ Prime Directive “The only way to go fast, is to go well” بيقول إيه بالظبط؟',
      ),
      options: [
        'Lasting speed comes from keeping the code well-built',
        'Deadlines must always move when quality is at risk',
        'Speed comes mainly from picking the right tools',
        'Build quickly first, then clean up once the product is stable',
      ],
      answer: 0,
      explanation: t(
        'Quality is not the opposite of speed — it is what **produces** speed. A mess feels fast for a few days, then every change gets slower. It does not say “ignore deadlines”, and “clean up later” is exactly the trap it warns about.',
        'الجودة مش عكس السرعة — هي اللي **بتجيب** السرعة. الكركبة بتحسّسك إنك سريع كام يوم، وبعدين كل تعديل بيبقى أبطأ. المقولة مش بتقول “طنّش الـ deadlines”، و“هننضّف بعدين” هو بالظبط الفخ اللي بتحذّر منه.',
      ),
    },
    {
      level: 'apply',
      question: t(
        'A team lets an AI assistant write code with no reviews, no tests and no architectural rules. Lines of code per week triple. What does the course’s third objective predict?',
        'فريق ساب AI assistant يكتب كود من غير reviews ولا tests ولا قواعد معمارية، وعدد سطور الكود في الأسبوع بقى 3 أضعاف. الهدف التالت للمادة بيتوقع إيه؟',
      ),
      options: [
        'Technical debt falls, because generated code is more consistent',
        'Architecture matters less, because any part can be regenerated',
        'Nothing important changes: the AI only replaces typing',
        'Technical debt grows at the same tripled speed, because nothing governs the output',
      ],
      answer: 3,
      explanation: t(
        'LLMs write code fast — and **without governance they write technical debt just as fast**. The speed is real, but with nothing constraining and checking the output, the mess also arrives three times faster.',
        'الـ LLMs بتكتب كود بسرعة — و**من غير governance بتكتب technical debt بنفس السرعة**. السرعة حقيقية، بس طالما مفيش حاجة بتقيّد وتراجع اللي بيطلع، الكركبة كمان هتيجي أسرع 3 مرات.',
      ),
    },
  ],

  'w1-harness': [
    {
      level: 'recall',
      question: t('What did the **Scaling Myth** assume?', 'الـ **Scaling Myth** كان بيفترض إيه؟'),
      options: [
        'That models must be made smaller to fit inside a harness',
        'That larger context windows remove the need for tests',
        'That more parameters and training tokens would cure structural and logic failures',
        'That teams scale better when every developer has an AI agent',
      ],
      answer: 2,
      explanation: t(
        'The myth was that **raw size** (parameters, training tokens) would “magically” cure every failure. Anthropic’s experience showed the missing piece was structure around the model, not more size.',
        'الخرافة كانت إن **الحجم الخام** (parameters وtraining tokens) هيعالج “سحريًا” كل الأخطاء. وتجربة Anthropic بيّنت إن الناقص كان الهيكل اللي حوالين الموديل، مش حجم أكبر.',
      ),
    },
    {
      level: 'understand',
      question: t(
        'An agent edits three files, the project compiles, and it reports “task complete”. Two tests would have failed if anyone had run them. Which failure is this, and which harness move prevents it?',
        'Agent عدّل 3 فايلات، والمشروع عمل compile، فقال “المهمة خلصت”. وكان فيه 2 tests هيفشلوا لو حد شغّلهم. ده أنهي عطل، وأنهي حركة في الـ harness بتمنعه؟',
      ),
      options: [
        'Context Rot & Drift — prevented by context compaction',
        'Premature Victory — prevented by hard verification gates',
        'Overwhelmed Execution — prevented by progressive tooling',
        'The Black Box Fallacy — prevented by a larger model',
      ],
      answer: 1,
      explanation: t(
        'Declaring victory on compilation is **Premature Victory** (compiles ≠ correct). A **hard verification gate** — automated tests and strict exit codes — decides when a task is done, not the model.',
        'إعلان النصر أول ما الكود يعمل compile هو **Premature Victory** (compile ≠ صح). والـ **hard verification gate** — tests أوتوماتيك وexit codes صارمة — هي اللي تقرر إن المهمة خلصت، مش الموديل.',
      ),
    },
    {
      level: 'understand',
      question: t(
        'In the Initializer/Worker pattern every worker starts in a fresh, clean context window. How does it still know what earlier workers did?',
        'في الـ Initializer/Worker pattern كل worker بيبدأ بـ context window جديدة ونضيفة. إزاي بيعرف برضه الـ workers اللي قبله عملوا إيه؟',
      ),
      options: [
        'The initializer replays the whole conversation history into it',
        'All workers share one long context window kept by the harness',
        'It does not need to: every feature is independent of the others',
        'It reads state kept outside the model: git commits and files such as `NOTES.md`',
      ],
      answer: 3,
      explanation: t(
        'The memory lives **on disk, not in the context**: `feature_list.json` from the initializer, git commits and `NOTES.md`. That is the point — replaying history or sharing one window would bring context rot straight back.',
        'الذاكرة عايشة **على الديسك، مش في الـ context**: `feature_list.json` من الـ initializer، والـ git commits، و`NOTES.md`. وده المقصود — لو رجّعنا الـ history كله أو شاركنا window واحدة، الـ context rot هيرجع تاني.',
      ),
    },
    {
      level: 'apply',
      question: t(
        'Three hours into a long task, an agent starts calling the database directly from UI code — although its very first instruction forbade exactly that. What is the most likely failure, and the fix that fits it?',
        'بعد 3 ساعات في مهمة طويلة، الـ agent بدأ ينادي الـ database مباشرة من كود الـ UI — مع إن أول تعليمات خدها كانت بتمنع ده بالظبط. إيه العطل الأرجح، والعلاج المناسب ليه؟',
      ),
      options: [
        'Context Rot & Drift — fresh worker contexts, state on disk, compaction',
        'Premature Victory — stricter exit codes on the test suite',
        'Overwhelmed Execution — load tool schemas on demand',
        'The Scaling Myth — wait for a model with more parameters',
      ],
      answer: 0,
      explanation: t(
        'A long run filled the context window and the model **overrode an initial architectural constraint** — that is Context Rot & Drift. The fix is about memory: short-lived workers with fresh contexts, progress saved to disk, and dead context pruned.',
        'المهمة الطويلة ملت الـ context window والموديل **كسر قيد معماري اتقال له في الأول** — وده الـ Context Rot & Drift. والعلاج في الذاكرة: workers عمرهم قصير بـ context جديد، والتقدم محفوظ على الديسك، والـ context الميت بيتشال.',
      ),
    },
    {
      level: 'apply',
      question: t(
        'A colleague says: “The agent failed on our 50,000-line codebase. Let’s park the project until the next model is released.” What does this lesson answer?',
        'زميلك بيقول: “الـ agent فشل في الـ codebase بتاعنا اللي فيه 50,000 سطر. نركن المشروع لحد ما الموديل الجاي ينزل.” الدرس ده بيرد يقول إيه؟',
      ),
      options: [
        'Agree: raw intelligence was the bottleneck in Anthropic’s case too',
        'Agree, provided the next model has a much larger context window',
        'Disagree: what was missing was structure around the model — build the harness',
        'Disagree: first rewrite the codebase until it is small enough for the model',
      ],
      answer: 2,
      explanation: t(
        'That is the **“Wait for GPT-N” cop-out**. Raw intelligence was *not* the bottleneck; memory, checks and controlled tool access were. Architectural Inversion: the intelligence is in the deterministic harness that constrains, coordinates and verifies the model.',
        'ده بالظبط **تهرّب “استنى GPT-N”**. الذكاء الخام *ماكانش* هو المشكلة؛ المشكلة كانت الذاكرة والفحص والتحكم في الأدوات. الـ Architectural Inversion: الذكاء في الـ harness الـ deterministic اللي بيقيّد الموديل وينسّقه ويتحقق منه.',
      ),
    },
  ],

  'w1-aerospace': [
    {
      level: 'recall',
      question: t('In a PID controller, which term works on the **accumulated sum of past errors**?', 'في الـ PID controller، أنهي term بيشتغل على **مجموع الأخطاء اللي فاتت**؟'),
      options: ['Proportional', 'Integral', 'Derivative', 'All three equally'],
      answer: 1,
      explanation: t(
        'P reacts to the **present** error, I to the **past** (the running sum), and D to the **future** (the trend, acting as brakes against overshoot). The Integral’s ever-growing sum is where the bug lived.',
        'الـ P بيرد على الخطأ **الحالي**، والـ I على **الماضي** (المجموع المتراكم)، والـ D على **المستقبل** (الاتجاه، وبيشتغل كفرامل ضد الـ overshoot). والمجموع اللي بيكبر في الـ Integral هو المكان اللي الـ bug كان فيه.',
      ),
    },
    {
      level: 'understand',
      question: t(
        'Why did the altitude controller start failing only after about 12 hours of flight?',
        'ليه الـ altitude controller بدأ يبوظ بعد حوالي 12 ساعة طيران بس؟',
      ),
      options: [
        'The Derivative term overshot once the aircraft reached cruising altitude',
        'A memory leak slowly used up the flight computer’s RAM',
        'The sum had grown so large that a float32 could no longer register the tiny corrections added to it',
        'The sensor readings drifted, so the Proportional term got wrong input',
      ],
      answer: 2,
      explanation: t(
        'A float32 keeps only about **7 significant digits**. Once the accumulated sum is huge, adding 0.0000001 changes nothing — the correction is silently dropped, and the altitude is lost with no error raised.',
        'الـ float32 بيحتفظ بحوالي **7 أرقام معنوية** بس. أول ما المجموع المتراكم يبقى ضخم، إضافة 0.0000001 مبتغيّرش حاجة — التصحيح بيتشال في صمت، والارتفاع بيضيع من غير أي error.',
      ),
    },
    {
      level: 'understand',
      question: t(
        'The tests written by the LLM all passed. Why was that weak evidence that the controller was correct?',
        'الـ tests اللي كتبها الـ LLM كلها عدّت. ليه ده كان دليل ضعيف على إن الـ controller صح؟',
      ),
      options: [
        'The tests were written in a different language from the controller',
        'Short test runs cannot show a 12-hour effect, and tests from the same model share its blind spots',
        'The tests measured only code coverage, not behaviour',
        'A simulation cannot execute floating-point arithmetic',
      ],
      answer: 1,
      explanation: t(
        'The flaw only appears after hours of accumulation, so short runs never reach it. And the same model wrote both the code and its tests — it cannot test for a problem it did not think of.',
        'العيب بيظهر بعد ساعات من التراكم، فالتشغيل القصير عمره ما هيوصله. ونفس الموديل هو اللي كتب الكود والـ tests — فمش هيختبر مشكلة هو أصلًا مافكّرش فيها.',
      ),
    },
    {
      level: 'apply',
      question: t(
        'An AI assistant suggests `import fast_json_utils`. You have never heard of the package, but `pip install` finds it. What does the case study tell you to do?',
        'الـ AI assistant اقترح `import fast_json_utils`. انت عمرك ما سمعت عن الـ package دي، بس `pip install` لقاها. الـ case study بتقولك تعمل إيه؟',
      ),
      options: [
        'Install it: if it exists on the index, it was not a hallucination',
        'Install it, but only on a development machine where it can do no harm',
        'Verify the dependency first — a hallucinated name that “exists” may be a malicious typo-squatting package',
        'Ask the assistant to confirm that the package is safe',
      ],
      answer: 2,
      explanation: t(
        'In the case, the invented `yaml_config_parser` **was real** — attackers had published it. A blind `pip install` gave them remote code execution: a **supply chain attack**. “It installs” proves nothing, and a development machine is a perfectly good victim.',
        'في الـ case، الـ `yaml_config_parser` المتألفة **كانت موجودة فعلًا** — مهاجمين كانوا نشروها. والـ `pip install` العمياني إدّاهم remote code execution: **supply chain attack**. “بتتسطّب” مش دليل على حاجة، وجهاز الـ development ضحية ممتازة برضه.',
      ),
    },
    {
      level: 'apply',
      question: t(
        'Which statement best names the **root cause** shared by the numeric bug and the security breach?',
        'أنهي جملة بتسمّي أحسن **السبب الجذري** المشترك بين الـ bug الرقمي والاختراق الأمني؟',
      ),
      options: [
        'The junior engineer lacked a background in control theory',
        'The LLM was too small for safety-critical code',
        'Schedule pressure made any testing impossible',
        'AI output was trusted as a black box, with no governance verifying it',
      ],
      answer: 3,
      explanation: t(
        'Both failures come from the **Black Box Fallacy**: code that *looked* perfect was accepted, and a suggested dependency was installed, without independent verification. A bigger model or a more senior engineer does not replace governance.',
        'العطلين جايين من الـ **Black Box Fallacy**: كود *شكله* مثالي اتقبل، وdependency مقترحة اتسطّبت، من غير تحقق مستقل. وموديل أكبر أو مهندس أقدم مش بديل عن الـ governance.',
      ),
    },
  ],
}
