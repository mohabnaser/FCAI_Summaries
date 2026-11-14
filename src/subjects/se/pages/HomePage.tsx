import { Link } from 'react-router-dom'
import { ArrowRight, BookA, BookOpenCheck, Brain, CircleCheck, Clock3, Hourglass, Layers, Play, ScrollText, Shapes } from 'lucide-react'
import { allLessons, course, findLesson, lessonPath, weekMinutes, weekPath, weeks } from '../data/course'
import { useProgress } from '../context/ProgressContext'
import { usePrefs } from '../context/PrefsContext'
import { Inline } from '../components/Text'
import { weekTone } from '../lib/tones'
import { sePath } from '../paths'

const studySteps = [
  {
    icon: BookOpenCheck,
    tone: 'blue',
    title: 'Read the 20-second summary',
    en: 'Every lesson opens with the whole idea in two sentences. Read it first so you know where the lesson is going.',
    ar: 'كل درس بيبدأ بالفكرة كلها في جملتين. اقرأها الأول عشان تعرف الدرس رايح فين.',
  },
  {
    icon: Shapes,
    tone: 'violet',
    title: 'Understand with pictures',
    en: 'Diagrams, analogies and side-by-side comparisons explain every idea — not just list it.',
    ar: 'رسومات وتشبيهات ومقارنات جنب بعض بتشرح كل فكرة — مش بتسردها وبس.',
  },
  {
    icon: Brain,
    tone: 'amber',
    title: 'Lock it in',
    en: 'Purple “memorize” boxes hold the exact sentences worth knowing word for word; memory hooks turn lists into one phrase.',
    ar: 'المربعات البنفسجية فيها الجمل اللي تستاهل تتحفظ بالحرف؛ والـ memory hooks بتحوّل أي ليستة لجملة واحدة.',
  },
  {
    icon: ScrollText,
    tone: 'teal',
    title: 'Recall, then revise',
    en: 'Flip the key-term cards to test yourself, then use the one-page revision sheet the night before the exam.',
    ar: 'اقلب كروت المصطلحات تختبر نفسك، وبعدين استخدم الـ revision sheet (صفحة واحدة) ليلة الامتحان.',
  },
] as const

export function HomePage() {
  const { progress, isDone } = useProgress()
  const { showArabic } = usePrefs()
  const last = progress.lastLessonId ? findLesson(progress.lastLessonId) : undefined
  const next = allLessons.find((lesson) => !isDone(lesson.id)) ?? allLessons[0]
  const resume = last && !isDone(last.id) ? last : next
  const started = progress.done.length > 0 || Boolean(last)
  const totalMinutes = weeks.reduce((sum, week) => sum + weekMinutes(week), 0)
  const totalTerms = allLessons.reduce((sum, lesson) => sum + lesson.keyTerms.length, 0)

  return (
    <div className="rise space-y-12">
      <section className="hero p-6 sm:p-10" data-tone="blue">
        <div className="relative z-10">
          <p className="eyebrow">3rd Year · {course.code} · {course.instructor}</p>
          <h1 className="display mt-4 max-w-3xl text-[2.4rem] font-bold leading-[1.05] text-ink sm:text-[3.4rem]">
            Advanced Software Engineering
          </h1>
          <p className="mt-4 max-w-2xl text-[1.08rem] leading-relaxed text-muted">
            The whole course, explained simply — with diagrams, analogies and memory hooks, so every idea makes sense the first time and stays with you.
            {showArabic ? (
              <span className="ar-inline !text-[1rem]" lang="ar" dir="rtl">
                المادة كلها متشرحة ببساطة — برسومات وتشبيهات وطرق حفظ، عشان كل فكرة تتفهم من أول مرة وتفضل في دماغك.
              </span>
            ) : null}
          </p>

          <figure className="memorize mt-7 max-w-3xl">
            <p className="eyebrow" data-tone="violet">The one sentence this course is built on</p>
            <blockquote className="memorize-text mt-2">“{course.paradigm}”</blockquote>
          </figure>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Link to={lessonPath(resume)} className="btn btn-primary">
              <Play className="h-4 w-4" />
              {started ? `Continue: ${resume.shortTitle}` : 'Start with Week 1'}
            </Link>
            <Link to={sePath('/glossary')} className="btn btn-ghost">
              <BookA className="h-4 w-4" style={{ color: 'var(--se-violet)' }} />
              Key-term flashcards
            </Link>
          </div>

          <dl className="mt-8 grid grid-cols-2 gap-4 border-t border-line-soft pt-6 sm:grid-cols-4">
            {[
              { label: 'weeks', value: weeks.length, icon: Layers },
              { label: 'lessons', value: allLessons.length, icon: BookOpenCheck },
              { label: 'study minutes', value: totalMinutes, icon: Clock3 },
              { label: 'key terms', value: totalTerms, icon: BookA },
            ].map((stat) => (
              <div key={stat.label}>
                <dt className="flex items-center gap-1.5 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-faint">
                  <stat.icon className="h-3.5 w-3.5" style={{ color: 'var(--se-blue)' }} />
                  {stat.label}
                </dt>
                <dd className="display mt-1 text-[1.8rem] font-bold text-ink">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section aria-labelledby="weeks-heading">
        <p className="eyebrow">Contents</p>
        <h2 id="weeks-heading" className="display mt-1 text-[1.9rem] font-bold text-ink">
          Weeks
        </h2>
        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          {weeks.map((week) => {
            const done = week.lessons.filter((lesson) => isDone(lesson.id)).length
            const tone = weekTone(week.number)
            return (
              <article key={week.id} className="panel flex flex-col p-6" data-tone={tone}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="eyebrow">Week {week.number}</p>
                    <h3 className="display mt-1 text-[1.45rem] font-bold leading-tight text-ink">{week.title}</h3>
                  </div>
                  <span className="chip">
                    {done}/{week.lessons.length} done
                  </span>
                </div>
                <div className="mt-2 text-[0.94rem] leading-relaxed text-muted">
                  <Inline text={week.lede} />
                </div>
                <ol className="mt-4 space-y-1.5">
                  {week.lessons.map((lesson) => (
                    <li key={lesson.id}>
                      <Link to={lessonPath(lesson)} className="flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-[0.9rem] text-[var(--se-reading)] hover:bg-surface-2 hover:text-ink">
                        {isDone(lesson.id) ? (
                          <CircleCheck className="h-4 w-4 flex-none" style={{ color: 'var(--se-teal)' }} />
                        ) : (
                          <span className="w-4 flex-none text-center font-mono text-[0.72rem] text-faint">{lesson.order}</span>
                        )}
                        <span className="flex-1">{lesson.title}</span>
                        <span className="font-mono text-[0.7rem] text-faint">{lesson.minutes}m</span>
                      </Link>
                    </li>
                  ))}
                </ol>
                <div className="mt-auto flex flex-wrap items-center gap-2 pt-5">
                  <Link to={weekPath(week)} className="btn btn-ghost btn-sm">
                    Week overview <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                  <Link to={sePath(`/week/${week.id}/revision`)} className="btn btn-ghost btn-sm">
                    <ScrollText className="h-3.5 w-3.5" style={{ color: 'var(--se-amber)' }} /> Revision sheet
                  </Link>
                  <span className="ms-auto flex items-center gap-1 font-mono text-[0.72rem] text-faint">
                    <Clock3 className="h-3.5 w-3.5" /> ~{weekMinutes(week)} min
                  </span>
                </div>
              </article>
            )
          })}
          <article className="panel flex items-center gap-4 border-dashed p-6 opacity-80">
            <span className="icon-tile" data-tone="amber">
              <Hourglass className="h-5 w-5" />
            </span>
            <div>
              <p className="display text-[1.1rem] font-semibold text-ink">More weeks coming</p>
              <p className="text-[0.9rem] text-muted">New weeks are added here as the lectures go on.</p>
            </div>
          </article>
        </div>
      </section>

      <section aria-labelledby="how-heading">
        <p className="eyebrow">Method</p>
        <h2 id="how-heading" className="display mt-1 text-[1.9rem] font-bold text-ink">
          How to study with this site
        </h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {studySteps.map((step, i) => (
            <article key={step.title} className="card card-top" data-tone={step.tone}>
              <div className="flex items-center justify-between">
                <span className="icon-tile">
                  <step.icon className="h-5 w-5" />
                </span>
                <span className="font-mono text-[0.75rem] text-faint">0{i + 1}</span>
              </div>
              <h3 className="display mt-3 text-[1.05rem] font-semibold text-ink">{step.title}</h3>
              <p className="mt-1 text-[0.9rem] leading-relaxed text-muted">{step.en}</p>
              {showArabic ? (
                <p className="ar-inline" lang="ar" dir="rtl">
                  {step.ar}
                </p>
              ) : null}
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
