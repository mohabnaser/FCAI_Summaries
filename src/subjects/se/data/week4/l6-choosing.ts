import type { Lesson } from '../../types'
import { part, t } from '../helpers'

/** Slides 40–41 plus a synthesis: every view style on one page, which quality each serves, and the readings. */
export const choosing: Lesson = {
  id: 'w4-choosing',
  weekId: 'week-4',
  order: 6,
  title: 'All the Views on One Page',
  shortTitle: 'Views on One Page',
  slides: [40, 41],
  minutes: 8,
  tldr: t(
    'Three categories, nine styles: **module** (decomposition, uses, generalization, data model), **C&C** (components + connectors, e.g. concurrency) and **allocation** (deployment, install, work assignment). Pick the views whose qualities your stakeholders care about. Readings: *Documenting Software Architectures* — P3, Ch. 2, 3, 5, E.2.',
    'تلات فئات وتسع styles: **module** (decomposition وuses وgeneralization وdata model)، و**C&C** (components + connectors، زي الـ concurrency)، و**allocation** (deployment وinstall وwork assignment). اختار الـ views اللي بتخدم الجودة اللي أصحاب المصلحة مهتمين بيها. القراءات: *Documenting Software Architectures* — P3 وفصول 2 و3 و5 وE.2.',
  ),
  blocks: [
    part(t('Every style in one table', 'كل الـ styles في جدول واحد')),
    {
      kind: 'table',
      caption: t('Category · style · elements · relation · what it’s for', 'الفئة · الـ style · العناصر · العلاقة · بيستخدم في إيه'),
      headers: ['Category', 'Style', 'Elements', 'Relation', 'Main use'],
      rows: [
        [t('Module'), t('Decomposition'), t('Modules, sub-modules', 'modules وsub-modules'), t('is-a-part-of (tree: one parent, no loops)', 'is-a-part-of (شجرة: أب واحد، مفيش loops)'), t('Organizing code; partitioning responsibilities', 'تنظيم الكود؛ توزيع المسؤوليات')],
        [t('Module'), t('Uses'), t('Modules', 'Modules'), t('uses (correctness depends on)', 'uses (الصحة معتمدة على)'), t('Incremental development; impact of change', 'التطوير على مراحل؛ أثر التغيير')],
        [t('Module'), t('Generalization'), t('Modules', 'Modules'), t('is-a', 'is-a'), t('Reuse and extension (e.g. Cooler is an Actuator)', 'إعادة الاستخدام والتوسعة (زي Cooler نوع من Actuator)')],
        [t('Module'), t('Data model'), t('Data entities', 'كيانات الداتا'), t('Entity relationships', 'علاقات الكيانات'), t('Data structure and consistency', 'هيكل الداتا واتساقها')],
        [t('C&C'), t('C&C / concurrency'), t('Components, connectors', 'components وconnectors'), t('Attachment (who talks to whom)', 'التوصيل (مين بيكلّم مين)'), t('Performance, security, availability, parallelism', 'الـ performance والـ security والـ availability والتوازي')],
        [t('Allocation'), t('Deployment'), t('C&C elements + hardware', 'عناصر C&C + هاردوير'), t('allocated-to', 'allocated-to'), t('Performance, availability, capacity', 'الـ performance والـ availability والسعة')],
        [t('Allocation'), t('Install'), t('C&C components + files/folders', 'components + ملفات/فولدرات'), t('allocated-to', 'allocated-to'), t('Packaging and installation in production', 'التحزيم والتسطيب في الـ production')],
        [t('Allocation'), t('Work assignment'), t('Modules + teams', 'modules + فرق'), t('allocated-to', 'allocated-to'), t('Project planning, responsibilities', 'تخطيط المشروع والمسؤوليات')],
      ],
    },

    part(t('Choose views by the quality you care about', 'اختار الـ views حسب الجودة اللي تهمك')),
    {
      kind: 'table',
      caption: t('Quality attribute → views that expose it best', 'الـ quality attribute ← الـ views اللي بتكشفها أحسن'),
      headers: ['Stakeholder concern', 'Views to document'],
      rows: [
        [t('Modifiability'), t('Decomposition + uses (what a change touches)', 'Decomposition + uses (التغيير بيلمس إيه)')],
        [t('Performance'), t('C&C / concurrency + deployment (parallelism, network hops)', 'C&C / concurrency + deployment (التوازي وعبور الشبكة)')],
        [t('Availability'), t('C&C (replication) + deployment (separate nodes, failover)', 'C&C (التكرار) + deployment (nodes منفصلة، failover)')],
        [t('Security'), t('C&C (data flows) + deployment (network zones)', 'C&C (تدفق الداتا) + deployment (مناطق الشبكة)')],
        [t('Schedule, cost, team organization'), t('Work assignment + uses', 'Work assignment + uses')],
        [t('Installation / operations'), t('Install', 'Install')],
      ],
    },
    {
      kind: 'myths',
      items: [
        {
          myth: t('“Draw every possible view to be safe.”', '“ارسم كل view ممكنة عشان تبقى في الأمان.”'),
          fact: t('Document the **relevant** views — those that expose the qualities your stakeholders care about. Views cost effort to keep up to date.', 'وثّق الـ views **المهمة** — اللي بتكشف الجودة اللي أصحاب المصلحة مهتمين بيها. والـ views ليها تمن عشان تفضل محدّثة.'),
        },
        {
          myth: t('“A module and a component are the same box drawn twice.”', '“الـ module والـ component نفس الصندوق متترسم مرتين.”'),
          fact: t('Module = code (static); component = running thing (dynamic). One module → many components, many modules → one component.', 'الـ Module = كود (ثابت)؛ والـ component = حاجة شغالة (متحركة). module واحد ← components كتير، وmodules كتير ← component واحد.'),
        },
      ],
    },

    part(t('Readings & references', 'القراءات والمراجع')),
    {
      kind: 'cards',
      columns: 2,
      items: [
        { icon: 'book', title: 'Documenting Software Architectures', tag: 'REQUIRED', tone: 'blue', body: t('Prologue **P3 “Architecture Views”** · **Chapters 2 and 3** · **Chapter 5** · Epilogue **E.2**.', 'المقدمة **P3 “Architecture Views”** · **الفصول 2 و3** · **الفصل 5** · الخاتمة **E.2**.') },
        { icon: 'library', title: 'Taylor, Medvidovic & Dashofy (2010)', tag: 'REFERENCE', tone: 'violet', body: t('*Software Architecture: Foundations, Theory, and Practice*, Wiley.', '*Software Architecture: Foundations, Theory, and Practice*، دار Wiley.') },
      ],
    },
  ],
  keyTerms: [
    { term: 'Module styles', definition: t('Decomposition, uses, generalization, data model.', 'Decomposition وuses وgeneralization وdata model.') },
    { term: 'C&C styles', definition: t('Components and connectors at runtime (e.g. concurrency view; styles in Week 5).', 'components وconnectors وقت التشغيل (زي الـ concurrency view؛ والـ styles في أسبوع 5).') },
    { term: 'Allocation styles', definition: t('Deployment, install, work assignment.', 'Deployment وinstall وwork assignment.') },
    { term: 'Relevant views', definition: t('The views exposing the quality attributes your stakeholders care about most.', 'الـ views اللي بتكشف الـ quality attributes الأهم لأصحاب المصلحة.') },
    { term: 'Week 4 readings', definition: t('Documenting Software Architectures: P3, Ch. 2, 3, 5, E.2; reference: Taylor, Medvidovic & Dashofy (2010).', 'Documenting Software Architectures: P3 وفصول 2 و3 و5 وE.2؛ ومرجع: Taylor وMedvidovic وDashofy (2010).') },
  ],
  recap: [
    t('Module: decomposition (tree), uses (graph), generalization (is-a), data model.', 'الـ Module: decomposition (شجرة)، uses (رسمة)، generalization (is-a)، data model.'),
    t('C&C: components + connectors at runtime — performance, security, availability.', 'الـ C&C: components + connectors وقت التشغيل — performance وsecurity وavailability.'),
    t('Allocation: deployment (hardware), install (files), work assignment (teams).', 'الـ Allocation: deployment (هاردوير)، install (ملفات)، work assignment (فرق).'),
    t('Choose views by stakeholder quality concerns; don’t draw everything.', 'اختار الـ views حسب اهتمامات الجودة؛ متترسمش كل حاجة.'),
    t('Readings: DSA P3, Ch. 2, 3, 5, E.2; Taylor et al. 2010.', 'القراءات: DSA P3 وفصول 2 و3 و5 وE.2؛ وTaylor وزمايله 2010.'),
  ],
}
