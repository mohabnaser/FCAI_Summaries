import type { Lesson } from '../../types'
import { part, t } from '../helpers'

/** Slides 16–19: SRP in IVI — the media-library search, its smells, delegation to TrackFilter, and the gains. */
export const srpIvi: Lesson = {
  id: 'w3-srp-ivi',
  weekId: 'week-3',
  order: 3,
  title: 'SRP in Infotainment: Fixing Search with Delegation',
  shortTitle: 'SRP in IVI · Delegation',
  slides: [16, 17, 18, 19],
  minutes: 12,
  tldr: t(
    '`MediaLibrary.search()` digs into every field of `TrackMetadata` to decide matches — **Feature Envy**, two reasons to change, and a violation of **Information Expert**. The fix is **delegation**: `TrackFilter` owns the criteria, so `TrackFilter.matches()` decides. New filters now touch only `TrackFilter`; behaviour stays the same. Isolating what varies leads straight to **Open–Closed**.',
    '`MediaLibrary.search()` بيدخل في كل field في `TrackMetadata` عشان يقرر الأغنية مطابقة ولا لأ — ده **Feature Envy**، وسببين للتغيير، ومخالفة لـ **Information Expert**. والحل **delegation**: `TrackFilter` هو صاحب المعايير، فـ `TrackFilter.matches()` هو اللي يقرر. ودلوقتي أي فلتر جديد بيلمس `TrackFilter` بس؛ والسلوك فضل زي ما هو. وعزل اللي بيتغير بيوصّلنا على طول لـ **Open–Closed**.',
  ),
  blocks: [
    {
      kind: 'lead',
      text: t(
        'Scenario: the IVI head unit searches music from **USB, Bluetooth and streaming** sources. The search works — the problem is *where* the matching logic lives.',
        'السيناريو: شاشة الـ IVI بتدوّر على أغاني من **USB وBluetooth والـ streaming**. البحث شغال — المشكلة *فين* منطق المطابقة عايش.',
      ),
    },

    part(t('Before: the search code', 'قبل: كود البحث')),
    {
      kind: 'code',
      title: 'MediaLibrary.java — before',
      verdict: 'bad',
      highlight: [8, 9, 10, 11, 12, 13],
      code: `public class MediaLibrary {
    private List<Track> tracks;

    public List<Track> search(TrackFilter filter) {
        List<Track> results = new ArrayList<>();
        for (Track track : tracks) {
            TrackMetadata meta = track.getMetadata();
            String artist = filter.getArtist();
            if (artist != null && !artist.isEmpty()
                    && !artist.equalsIgnoreCase(meta.getArtist())) continue;
            if (filter.getGenre() != null && filter.getGenre() != meta.getGenre()) continue;
            if (filter.getSource() != null && filter.getSource() != meta.getSource()) continue;
            if (filter.getYear()   != 0    && filter.getYear()   != meta.getYear())   continue;
            results.add(track);
        }
        return results;
    }
}`,
      notes: [
        t('The highlighted lines are **matching rules**. `MediaLibrary` reads the filter’s fields *and* the metadata’s fields and compares them itself.', 'السطور المعلّم عليها هي **قواعد المطابقة**. `MediaLibrary` بيقرا fields الفلتر *و* fields الـ metadata ويقارنهم بنفسه.'),
      ],
    },

    part(t('What’s wrong? The code smells', 'إيه الغلط؟ ريحة الكود')),
    {
      kind: 'cards',
      columns: 2,
      items: [
        { icon: 'eye', title: 'Feature Envy', tone: 'rose', body: t('`MediaLibrary` reaches into **every attribute** of `TrackMetadata` (artist, genre, source, year). It is more interested in another class’s data than its own.', '`MediaLibrary` بيمد إيده على **كل attribute** في `TrackMetadata` (الفنان، النوع، المصدر، السنة). مهتم بداتا class تاني أكتر من الداتا بتاعته.') },
        { icon: 'split', title: 'Two distinct reasons to change', tone: 'amber', body: t('1. Managing and indexing the track storage collection. 2. Modifying metadata comparison and filtering rules.', '1. إدارة وفهرسة مجموعة الأغاني المخزّنة. 2. تعديل قواعد المقارنة والفلترة.') },
        { icon: 'scale', title: 'Violates Information Expert (GRASP)', tone: 'violet', body: t('The class that **owns the criteria** (`TrackFilter`) should decide whether an item matches.', 'الـ class اللي **عنده المعايير** (`TrackFilter`) هو اللي المفروض يقرر الحاجة مطابقة ولا لأ.') },
        { icon: 'bug', title: 'Maintenance nightmare', tone: 'blue', body: t('Adding audio formats (**FLAC / Dolby**) or **parental-control** filters forces edits to `MediaLibrary`.', 'إضافة صيغ صوت (**FLAC / Dolby**) أو فلاتر **رقابة أبوية** بتجبرك تعدّل في `MediaLibrary`.') },
      ],
    },
    {
      kind: 'callout',
      tone: 'warning',
      title: t('Smell summary', 'ملخص الريحة'),
      body: t(
        'When a class accesses the internal data of **another object more than its own**, coupling spikes and SRP is violated.',
        'لما class يستخدم الداتا الداخلية بتاعة **object تاني أكتر من بتاعته**، الترابط بيعلى والـ SRP بيتكسر.',
      ),
    },
    {
      kind: 'idea',
      title: 'Ask the one who knows',
      icon: 'search',
      tone: 'violet',
      text: t(
        '**Information Expert:** give a job to the class that already has the information needed to do it.',
        '**Information Expert:** ادّي الشغلانة للـ class اللي عنده المعلومات اللازمة يعملها.',
      ),
      analogy: t(
        'A shop clerk who grabs your shopping list, reads every line, and decides for you what you wanted — instead of letting **you** check each product against **your own** list.',
        'زي بيّاع ياخد منك ليستة الطلبات، ويقرا كل سطر، ويقرر هو إنت كنت عايز إيه — بدل ما يسيبك **إنت** تقارن كل منتج **بليستتك إنت**.',
      ),
    },

    part(t('After: delegate to the owner of the criteria', 'بعد: سيب القرار لصاحب المعايير')),
    {
      kind: 'code',
      title: 'MediaLibrary.java — after (responsibility: manage the track collection)',
      verdict: 'good',
      highlight: [8],
      code: `public class MediaLibrary {
    private List<Track> tracks;

    public List<Track> search(TrackFilter filter) {
        List<Track> results = new ArrayList<>();
        for (Track track : tracks) {
            // Delegate the matching decision
            if (filter.matches(track.getMetadata())) {
                results.add(track);
            }
        }
        return results;
    }
}`,
    },
    {
      kind: 'code',
      title: 'TrackFilter.java — after (responsibility: evaluate search criteria)',
      verdict: 'good',
      highlight: [5],
      code: `public class TrackFilter {
    private String artist; private Genre genre;
    private MediaSource source; private int year;

    public boolean matches(TrackMetadata meta) {
        if (artist != null && !artist.isEmpty()
                && !artist.equalsIgnoreCase(meta.getArtist()))
            return false;
        if (genre != null && genre != meta.getGenre())
            return false;
        if (source != null && source != meta.getSource())
            return false;
        if (year != 0 && year != meta.getYear())
            return false;
        return true;
    }
}`,
      notes: [
        t('Same rules, new home: they now sit next to the fields they read (`artist`, `genre`, `source`, `year`). `MediaLibrary` only asks “does it match?”', 'نفس القواعد، في مكان جديد: بقت جنب الـ fields اللي بتقراها (`artist` و`genre` و`source` و`year`). و`MediaLibrary` بيسأل بس “مطابقة ولا لأ؟”'),
      ],
    },
    {
      kind: 'definition',
      term: 'Delegation',
      definition: t(
        'An object **hands a task to another object** that is better placed to do it, and uses the result — without inheriting from it.',
        'الـ object **بيسلّم شغلانة لـ object تاني** أنسب يعملها، ويستخدم النتيجة — من غير ما يورث منه.',
      ),
    },

    part(t('What we gained', 'كسبنا إيه')),
    {
      kind: 'cards',
      columns: 2,
      items: [
        { icon: 'sparkles', title: 'New criteria touch one class', tone: 'teal', body: t('Audio format, bitrate, explicit content → **only `TrackFilter` changes**.', 'صيغة الصوت، الـ bitrate، المحتوى الصريح ← **`TrackFilter` بس اللي بيتغير**.') },
        { icon: 'lock', title: 'MediaLibrary untouched', tone: 'blue', body: t('Its **sole reason to change** is managing collection storage / indexing.', '**سببه الوحيد للتغيير** إدارة تخزين / فهرسة المجموعة.') },
        { icon: 'check', title: 'Feature Envy eliminated', tone: 'violet', body: t('The search loop simply delegates to `filter.matches()`.', 'لوب البحث بيسلّم القرار لـ `filter.matches()` وخلاص.') },
        { icon: 'shield', title: 'Behaviour preserved', tone: 'amber', body: t('Case-insensitive artist matching and wildcard semantics stay **exactly the same**.', 'مطابقة اسم الفنان من غير حساسية للحروف الكبيرة والصغيرة، ومعنى الـ wildcard (الفاضي = أي حاجة) فضلوا **زي ما هم بالظبط**.') },
      ],
    },
    {
      kind: 'memorize',
      label: 'Refactoring axiom',
      text: 'Refactoring improves internal structural cohesion and decouples reasons to change without altering observable external system behavior.',
    },
    {
      kind: 'callout',
      tone: 'insight',
      title: t('Design connection → Open–Closed', 'الربط بالمبدأ الجاي ← Open–Closed'),
      body: t(
        'Isolating what varies so that new capabilities can be added **without modifying existing classes** leads directly to the next principle: **Open–Closed (OCP)**.',
        'عزل اللي بيتغير عشان تضيف قدرات جديدة **من غير ما تعدّل classes موجودة** بيوصّلنا مباشرة للمبدأ الجاي: **Open–Closed (OCP)**.',
      ),
    },
  ],
  keyTerms: [
    { term: 'Feature Envy', definition: t('A method that uses another object’s data more than its own (MediaLibrary reading every TrackMetadata field).', 'method بيستخدم داتا object تاني أكتر من بتاعته (MediaLibrary بيقرا كل fields الـ TrackMetadata).') },
    { term: 'Information Expert (GRASP)', definition: t('Assign a responsibility to the class that has the information needed to fulfil it — TrackFilter owns the criteria, so it decides matches.', 'ادّي المسؤولية للـ class اللي عنده المعلومات — TrackFilter عنده المعايير، فهو اللي يقرر.') },
    { term: 'Delegation', definition: t('Handing a task to a helper object and using its result instead of doing it yourself or inheriting.', 'تسليم شغلانة لـ object مساعد واستخدام نتيجته بدل ما تعملها بنفسك أو تورث.') },
    { term: 'Two reasons to change (MediaLibrary)', definition: t('Managing/indexing the track collection, and changing the filtering rules.', 'إدارة/فهرسة الأغاني، وتغيير قواعد الفلترة.') },
    { term: 'Refactoring', definition: t('Improving internal structure and decoupling reasons to change without altering observable external behavior.', 'تحسين الهيكل الداخلي وفصل أسباب التغيير من غير ما السلوك الظاهر يتغير.') },
    { term: 'Behavioral preservation', definition: t('After refactoring, results are identical: case-insensitive artist match and wildcard (empty = any) semantics unchanged.', 'بعد إعادة الهيكلة النتايج هي هي: مطابقة الفنان من غير حساسية للحروف ومعنى الـ wildcard زي ما هم.') },
  ],
  recap: [
    t('IVI search across USB, Bluetooth, streaming: MediaLibrary.search() compares every metadata field itself.', 'بحث الـ IVI في USB وBluetooth والـ streaming: MediaLibrary.search() بيقارن كل field بنفسه.'),
    t('Smells: Feature Envy, two reasons to change, violates Information Expert, every new filter (FLAC/Dolby, parental control) edits MediaLibrary.', 'الريحة: Feature Envy، سببين للتغيير، مخالفة Information Expert، وأي فلتر جديد (FLAC/Dolby، رقابة أبوية) بيعدّل MediaLibrary.'),
    t('Fix by delegation: TrackFilter.matches(meta) decides; MediaLibrary just loops and asks.', 'الحل بالـ delegation: TrackFilter.matches(meta) هو اللي يقرر؛ وMediaLibrary بيلف ويسأل بس.'),
    t('Gains: new criteria change only TrackFilter; MediaLibrary has one reason to change; behaviour preserved.', 'المكسب: المعايير الجديدة بتغيّر TrackFilter بس؛ وMediaLibrary ليه سبب واحد؛ والسلوك محفوظ.'),
    t('Refactoring axiom: better cohesion, decoupled reasons to change, same observable behaviour. Next: OCP.', 'قاعدة الـ refactoring: تماسك أحسن، أسباب تغيير منفصلة، ونفس السلوك الظاهر. الجاي: OCP.'),
  ],
}
