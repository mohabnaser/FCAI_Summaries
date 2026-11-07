import { Link, useParams } from 'react-router-dom'
import {
  ArrowRight,
  BookMarked,
  BookOpen,
  CheckCircle2,
  Clock3,
  FileSearch,
  GraduationCap,
  LayoutDashboard,
  Layers,
  ListChecks,
  Play,
  ScrollText,
  Sparkles,
  Target,
  Trophy,
} from 'lucide-react'
import { chaptersById } from '../data/chapters'
import { historicalForSection } from '../data/quizzes'
import type { ChapterId } from '../types'
import { NotFoundPage } from './NotFoundPage'
import { useProgress } from '../context/ProgressContext'
import { getProgressOverview, formatDuration, percent } from '../lib/progress'
import { ProgressRing } from '../components/ui/ProgressRing'
import { BilingualProse } from '../components/ui/Text'
import { cn } from '../lib/cn'
import { osPath } from '../paths'

const studyToolsFor = (base: string, assessmentSize: number) => [
  {
    to: `${base}/review`,
    title: 'Final review',
    description: 'The core idea, key terms and past-exam questions of every section.',
    icon: GraduationCap,
    tone: 'text-cyan-neon',
  },
  {
    to: `${base}/assessment`,
    title: 'Final assessment',
    description: `${assessmentSize} past-exam questions covering every section.`,
    icon: Target,
    tone: 'text-amber-neon',
  },
  {
    to: `${base}/cheat-sheet`,
    title: 'Cheat sheet',
    description: 'Definitions, comparison tables and common mistakes.',
    icon: ScrollText,
    tone: 'text-teal-neon',
  },
  {
    to: `${base}/coverage`,
    title: 'Coverage ledger',
    description: 'Every past-exam question with its source paper and the section that covers it.',
    icon: FileSearch,
    tone: 'text-violet-neon',
  },
  {
    to: osPath('/bookmarks'),
    title: 'Bookmarks & revision',
    description: 'Saved sections, and practice from saved questions.',
    icon: BookMarked,
    tone: 'text-rose-neon',
  },
  {
    to: osPath('/progress'),
    title: 'Progress dashboard',
    description: 'Study time, quiz scores and weak topics.',
    icon: LayoutDashboard,
    tone: 'text-lime-neon',
  },
]

export function HomePage() {
  const { chapterId = '' } = useParams()
  const { progress } = useProgress()
  const chapter = chaptersById.get(chapterId as ChapterId)
  if (!chapter) return <NotFoundPage />

  const { meta, sections, totalEstimatedMinutes, path } = chapter
  const coverageSummary = chapter.coverage.summary
  const chapterNumber = Number(meta.number)
  const overview = getProgressOverview(progress, chapter)
  const nextSection = sections.find((section) => !progress.sections[section.id]?.completed) ?? sections[0]
  const hasStarted = overview.sectionsVisited > 0
  const finalBest = progress.bestScores[chapter.finalAssessment.id]
  const totalOccurrences = coverageSummary.relevant
  const uniqueHistorical = coverageSummary.unique
  const studyTools = studyToolsFor(path, chapter.finalAssessment.questionIds.length)
  const visualCount = sections.reduce(
    (total, section) => total + section.blocks.filter((block) => block.kind === 'visual').length,
    0,
  )

  return (
    <div className="fade-up">
      <section className="lesson-hero">
        <div
          className="pointer-events-none absolute right-0 top-0 h-64 w-80 bg-grid opacity-35"
          aria-hidden="true"
        />
        <div className="relative grid gap-8 p-6 sm:p-8 xl:grid-cols-[1.45fr_0.7fr] xl:gap-12 xl:p-12">
          <div>
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="eyebrow whitespace-nowrap">Operating Systems · Chapter {meta.number}</span>
            </div>
            <h1 className="lesson-title mt-5 max-w-4xl">
              Chapter {chapterNumber}: {meta.title}
            </h1>
            <div className="lesson-lede mt-5 max-w-3xl">
              <BilingualProse text={meta.lede} />
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-2.5">
              <Link to={osPath(`/section/${nextSection.id}`)} className="btn btn-primary">
                <Play className="h-4 w-4" aria-hidden="true" />
                {hasStarted ? `Resume: ${nextSection.shortTitle}` : `Start Chapter ${chapterNumber}`}
              </Link>
              <Link to={`${path}/assessment`} className="btn btn-secondary">
                <Target className="h-4 w-4" aria-hidden="true" />
                Final assessment
              </Link>
              <Link to={`${path}/review`} className="btn btn-ghost">
                Review first
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>

            <dl className="mt-9 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-line/60 pt-6 sm:grid-cols-4">
              {[
                { value: sections.length, label: 'major sections', icon: Layers },
                { value: `${totalEstimatedMinutes}`, label: 'core minutes', icon: Clock3 },
                { value: uniqueHistorical, label: 'historical Qs', icon: GraduationCap },
                { value: visualCount, label: 'diagrams', icon: ListChecks },
              ].map((stat) => {
                const Icon = stat.icon
                return (
                  <div key={stat.label}>
                    <dt className="flex items-center gap-1.5 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-mist-500">
                      <Icon className="h-3.5 w-3.5 text-cyan-neon/80" aria-hidden="true" />
                      {stat.label}
                    </dt>
                    <dd className="mt-1.5 font-display text-2xl font-semibold leading-none text-mist-50">
                      {stat.value}
                    </dd>
                  </div>
                )
              })}
            </dl>

          </div>

          <div className="relative self-start rounded-2xl border border-line-soft bg-ink-950/55 p-5 sm:p-6">
            <div className="pointer-events-none absolute inset-0 rounded-2xl bg-grid opacity-25" aria-hidden="true" />
            <div className="relative">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="block-label">Chapter progress</p>
                  <p className="mt-2 font-display text-xl font-semibold text-mist-50">
                    {overview.sectionsCompleted === sections.length
                      ? 'Chapter complete'
                      : hasStarted
                        ? 'In progress'
                        : 'Not started'}
                  </p>
                </div>
                <ProgressRing
                  value={overview.completionPercent}
                  size={78}
                  stroke={6}
                  sublabel="complete"
                />
              </div>

              <div className="mt-5 space-y-2">
                {[
                  {
                    label: 'Sections completed',
                    value: `${overview.sectionsCompleted} / ${overview.totalSections}`,
                  },
                  { label: 'Study time recorded', value: formatDuration(overview.studySeconds) },
                  {
                    label: 'Quiz attempts',
                    value: `${overview.quizzesAttempted}`,
                  },
                  {
                    label: 'Average best score',
                    value:
                      overview.averageBestPercent === null
                        ? 'Not scored yet'
                        : `${overview.averageBestPercent}%`,
                  },
                ].map((row) => (
                  <div
                    key={row.label}
                    className="flex items-center justify-between gap-3 border-b border-line-soft/60 pb-2 text-[0.82rem] last:border-0 last:pb-0"
                  >
                    <span className="text-mist-500">{row.label}</span>
                    <span className="font-mono text-mist-200">{row.value}</span>
                  </div>
                ))}
              </div>

              {finalBest ? (
                <div className="mt-4 flex items-center gap-2 rounded-xl border border-amber-neon/25 bg-amber-neon/[0.055] px-3 py-2.5 text-[0.8rem]">
                  <Trophy className="h-4 w-4 flex-none text-amber-neon" aria-hidden="true" />
                  <span className="text-mist-400">Final assessment best</span>
                  <span className="ms-auto font-mono text-amber-100">
                    {finalBest.score}/{finalBest.total} · {percent(finalBest.score, finalBest.total)}%
                  </span>
                </div>
              ) : (
                <Link
                  to={`${path}/assessment`}
                  className="mt-4 flex items-center gap-2 rounded-xl border border-line bg-ink-900/45 px-3 py-2.5 text-[0.8rem] text-mist-400 transition-colors hover:border-cyan-neon/30 hover:text-mist-100"
                >
                  <Target className="h-4 w-4 flex-none text-cyan-neon" aria-hidden="true" />
                  Final assessment
                  <ArrowRight className="ms-auto h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              )}

              <Link to={osPath('/progress')} className="link-arrow mt-4 text-[0.82rem]">
                Open progress dashboard
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <div className="panel flex items-start gap-3.5 p-4">
          <span className="flex h-10 w-10 flex-none items-center justify-center rounded-xl border border-cyan-neon/25 bg-cyan-neon/[0.07] text-cyan-neon">
            <BookOpen className="h-5 w-5" aria-hidden="true" />
          </span>
          <div>
            <p className="block-label">Lecture source</p>
            <p className="mt-1 text-[0.88rem] font-medium text-mist-200">{sections.length} lessons · Chapter {chapterNumber}</p>
            <p className="mt-0.5 text-[0.76rem] text-mist-500">Silberschatz 9e · Dr. Khaled Wassif</p>
          </div>
        </div>
        <div className="panel flex items-start gap-3.5 p-4">
          <span className="flex h-10 w-10 flex-none items-center justify-center rounded-xl border border-amber-neon/25 bg-amber-neon/[0.07] text-amber-neon">
            <GraduationCap className="h-5 w-5" aria-hidden="true" />
          </span>
          <div>
            <p className="block-label">Past papers</p>
            <p className="mt-1 text-[0.88rem] font-medium text-mist-200">7 examinations</p>
            <p className="mt-0.5 text-[0.76rem] text-mist-500">
              {totalOccurrences} relevant occurrences · {uniqueHistorical} unique
            </p>
          </div>
        </div>
        <div className="panel flex items-start gap-3.5 p-4">
          <span className="flex h-10 w-10 flex-none items-center justify-center rounded-xl border border-teal-neon/25 bg-teal-neon/[0.07] text-teal-neon">
            <ListChecks className="h-5 w-5" aria-hidden="true" />
          </span>
          <div>
            <p className="block-label">Question bank</p>
            <p className="mt-1 text-[0.88rem] font-medium text-mist-200">
              {uniqueHistorical} historical questions
            </p>
            <p className="mt-0.5 text-[0.76rem] text-mist-500">
              {coverageSummary.crossRef > 0
                ? `${coverageSummary.owned} own · ${coverageSummary.unique - coverageSummary.owned} shared with another chapter`
                : 'From past examinations'}
            </p>
          </div>
        </div>
        <div className="panel flex items-start gap-3.5 p-4">
          <span className="flex h-10 w-10 flex-none items-center justify-center rounded-xl border border-violet-neon/25 bg-violet-neon/[0.07] text-violet-neon">
            <Sparkles className="h-5 w-5" aria-hidden="true" />
          </span>
          <div>
            <p className="block-label">Diagrams</p>
            <p className="mt-1 text-[0.88rem] font-medium text-mist-200">
              {visualCount} interactive diagrams
            </p>
          </div>
        </div>
      </section>

      <section className="mt-12">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Contents</p>
            <h2 className="mt-2 font-display text-[1.8rem] font-semibold tracking-tight text-mist-50 sm:text-[2.1rem]">
              Sections
            </h2>
          </div>
        </div>

        <div className="mt-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {sections.map((section) => {
            const sectionProgress = progress.sections[section.id]
            const historical = historicalForSection(section.id).length
            const parts = section.blocks.filter((block) => block.kind === 'subsection').length
            const completed = sectionProgress?.completed
            const visited = sectionProgress?.visited
            return (
              <Link
                key={section.id}
                to={osPath(`/section/${section.id}`)}
                className={cn(
                  'group flex flex-col rounded-2xl border p-4 transition-colors',
                  completed
                    ? 'border-teal-neon/25 bg-teal-neon/[0.035] hover:border-teal-neon/40'
                    : visited
                      ? 'border-cyan-neon/20 bg-cyan-neon/[0.025] hover:border-cyan-neon/40'
                      : 'border-line-soft bg-ink-900/25 hover:border-line hover:bg-ink-900/55',
                )}
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="font-mono text-[0.7rem] text-mist-500">
                    Section {String(section.order).padStart(2, '0')}
                  </span>
                  {completed ? (
                    <CheckCircle2 className="h-4 w-4 text-teal-neon" aria-label="Completed" />
                  ) : visited ? (
                    <span className="badge badge-cyan">visited</span>
                  ) : null}
                </div>
                <h3 className="mt-2 font-display text-[1.08rem] font-semibold leading-snug text-mist-100 group-hover:text-white">
                  {section.shortTitle}
                </h3>
                <p className="mt-1.5 text-[0.86rem] leading-relaxed text-mist-500">
                  {section.summary.en}
                </p>
                <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1 pt-3 text-[0.76rem] text-mist-500">
                  <span className="inline-flex items-center gap-1">
                    <Clock3 className="h-3 w-3" aria-hidden="true" />
                    {section.estimatedMinutes}m
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Layers className="h-3 w-3" aria-hidden="true" />
                    {parts} parts
                  </span>
                  <span className="inline-flex items-center gap-1 text-amber-200/80">
                    <GraduationCap className="h-3 w-3" aria-hidden="true" />
                    {historical} exam {historical === 1 ? 'Q' : 'Qs'}
                  </span>
                  <ArrowRight
                    className="ms-auto h-4 w-4 text-mist-500 transition-transform group-hover:translate-x-0.5 group-hover:text-cyan-neon"
                    aria-hidden="true"
                  />
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      <section className="mt-12">
        <div>
          <p className="eyebrow">Study tools</p>
          <h2 className="mt-2 font-display text-[1.8rem] font-semibold tracking-tight text-mist-50 sm:text-[2.1rem]">
            Revision and assessment
          </h2>
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {studyTools.map((tool) => {
            const Icon = tool.icon
            return (
              <Link
                key={tool.to}
                to={tool.to}
                className="group panel flex items-start gap-3.5 p-4 transition-colors hover:border-line hover:bg-ink-800/50"
              >
                <span className={cn('mt-0.5 flex h-10 w-10 flex-none items-center justify-center rounded-xl border border-line bg-ink-950/45', tool.tone)}>
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="font-display text-[1rem] font-semibold text-mist-100 group-hover:text-white">
                    {tool.title}
                  </p>
                  <p className="mt-1 text-[0.86rem] leading-relaxed text-mist-500">{tool.description}</p>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

    </div>
  )
}
