import { Link } from 'react-router-dom'
import {
  ArrowRight,
  BookMarked,
  BookOpen,
  Clock3,
  GraduationCap,
  LayoutDashboard,
  Layers,
  Play,
  Sparkles,
} from 'lucide-react'
import { chapters } from '../data/chapters'
import { useProgress } from '../context/ProgressContext'
import { getProgressOverview, formatDuration } from '../lib/progress'
import { ProgressRing } from '../components/ui/ProgressRing'
import { BilingualProse } from '../components/ui/Text'
import { osPath } from '../paths'

export function CourseHomePage() {
  const { progress } = useProgress()
  const overall = getProgressOverview(progress)
  const totalMinutes = chapters.reduce((sum, chapter) => sum + chapter.totalEstimatedMinutes, 0)
  const chapterList = chapters.map((chapter) => Number(chapter.meta.number)).join(', ')
  const totalQuestions = new Set(chapters.flatMap((chapter) => chapter.ownedQuestions.map((question) => question.id))).size

  return (
    <div className="fade-up">
      <section className="lesson-hero">
        <div className="pointer-events-none absolute right-0 top-0 h-64 w-80 bg-grid opacity-35" aria-hidden="true" />
        <div className="relative p-6 sm:p-8 xl:p-12">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="eyebrow">3rd Year · Operating Systems</span>
          </div>
          <h1 className="lesson-title mt-5 max-w-4xl">Operating Systems</h1>
          <div className="lesson-lede mt-5 max-w-3xl">
            <BilingualProse
              text={{
                en: `Chapters ${chapterList} of Operating System Concepts (Silberschatz, Galvin and Gagne, 9th edition), with the questions of past examinations arranged by section.`,
                ar: `الفصول ${chapterList} من كتاب Operating System Concepts (Silberschatz وGalvin وGagne، الطبعة التاسعة)، مع أسئلة الامتحانات السابقة مرتبة حسب الأقسام.`,
              }}
            />
          </div>
          <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-line/60 pt-6 sm:grid-cols-4">
            {[
              { value: chapters.length, label: 'chapters', icon: BookOpen },
              { value: overall.totalSections, label: 'sections', icon: Layers },
              { value: totalMinutes, label: 'core minutes', icon: Clock3 },
              { value: totalQuestions, label: 'historical Qs', icon: GraduationCap },
            ].map((stat) => (
              <div key={stat.label}>
                <dt className="flex items-center gap-1.5 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-mist-500">
                  <stat.icon className="h-3.5 w-3.5 text-cyan-neon/80" aria-hidden="true" />
                  {stat.label}
                </dt>
                <dd className="mt-1.5 font-display text-2xl font-semibold leading-none text-mist-50">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="mt-10" aria-labelledby="chapters-heading">
        <p className="eyebrow">Contents</p>
        <h2 id="chapters-heading" className="mt-2 font-display text-[1.8rem] font-semibold tracking-tight text-mist-50">
          Chapters
        </h2>
        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          {chapters.map((chapter) => {
            const overview = getProgressOverview(progress, chapter)
            const next =
              chapter.sections.find((section) => !progress.sections[section.id]?.completed) ?? chapter.sections[0]
            const started = overview.sectionsVisited > 0
            return (
              <article
                key={chapter.meta.id}
                data-theme-preview={chapter.meta.theme}
                className="panel flex flex-col p-5 sm:p-6"
                style={{ backgroundColor: 'var(--color-ink-900)' }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-cyan-neon">
                      Chapter {chapter.meta.number}
                    </p>
                    <h3 className="mt-1.5 font-display text-[1.5rem] font-semibold leading-tight text-mist-50">
                      {chapter.meta.title}
                    </h3>
                    <p className="mt-2 text-[0.92rem] leading-relaxed text-mist-400">{chapter.meta.subtitle}</p>
                  </div>
                  <ProgressRing value={overview.completionPercent} size={72} stroke={6} sublabel="done" />
                </div>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  <span className="badge">
                    <Layers className="h-3 w-3" aria-hidden="true" />
                    {chapter.sections.length} sections
                  </span>
                  <span className="badge">
                    <Clock3 className="h-3 w-3" aria-hidden="true" />~{chapter.totalEstimatedMinutes} min
                  </span>
                  <span className="badge badge-amber">
                    <GraduationCap className="h-3 w-3" aria-hidden="true" />
                    {chapter.coverage.summary.unique} exam Qs
                  </span>
                </div>
                <ol className="mt-4 grid gap-1 text-[0.82rem] text-mist-400 sm:grid-cols-2">
                  {chapter.sections.map((section) => (
                    <li key={section.id} className="flex items-center gap-2">
                      <span className="font-mono text-[0.66rem] text-mist-600">{String(section.order).padStart(2, '0')}</span>
                      <Link to={osPath(`/section/${section.id}`)} className="truncate hover:text-cyan-neon">
                        {section.shortTitle}
                      </Link>
                    </li>
                  ))}
                </ol>
                <div className="mt-auto flex flex-wrap items-center gap-2 pt-5">
                  <Link to={osPath(`/section/${next.id}`)} className="btn btn-primary">
                    <Play className="h-4 w-4" aria-hidden="true" />
                    {started ? `Resume: ${next.shortTitle}` : `Start Chapter ${Number(chapter.meta.number)}`}
                  </Link>
                  <Link to={chapter.path} className="btn btn-secondary">
                    Chapter overview
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                  {overview.studySeconds > 0 ? (
                    <span className="text-[0.78rem] text-mist-500">{formatDuration(overview.studySeconds)} studied</span>
                  ) : null}
                </div>
              </article>
            )
          })}
        </div>
      </section>

      <section className="mt-10 grid gap-3 sm:grid-cols-3">
        {[
          { to: osPath('/progress'), title: 'Progress dashboard', body: 'Study time, scores and weak topics across every chapter.', icon: LayoutDashboard },
          { to: osPath('/bookmarks'), title: 'Bookmarks & revision', body: 'Saved sections and questions from any chapter.', icon: BookMarked },
          { to: chapters[chapters.length - 1].path, title: 'Newest chapter', body: `Chapter ${Number(chapters[chapters.length - 1].meta.number)}: ${chapters[chapters.length - 1].meta.title}.`, icon: Sparkles },
        ].map((tool) => (
          <Link key={tool.to} to={tool.to} className="group panel flex items-start gap-3.5 p-4 hover:border-line">
            <span className="mt-0.5 flex h-10 w-10 flex-none items-center justify-center rounded-xl border border-line bg-ink-950/45 text-cyan-neon">
              <tool.icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="min-w-0">
              <span className="block font-display text-[1rem] font-semibold text-mist-100 group-hover:text-white">
                {tool.title}
              </span>
              <span className="mt-1 block text-[0.86rem] leading-relaxed text-mist-500">{tool.body}</span>
            </span>
          </Link>
        ))}
      </section>
    </div>
  )
}
