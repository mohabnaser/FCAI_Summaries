import { NavLink, Link } from 'react-router-dom'
import {
  BookMarked,
  BookOpen,
  BookOpenCheck,
  ClipboardList,
  FileSearch,
  GraduationCap,
  LayoutDashboard,
  ListChecks,
  ScrollText,
  Sparkles,
  Target,
  X,
  CheckCircle2,
  Circle,
} from 'lucide-react'
import { chapters } from '../../data/chapters'
import { useActiveChapter } from '../../lib/activeChapter'
import { useProgress } from '../../context/ProgressContext'
import { getProgressOverview } from '../../lib/progress'
import { cn } from '../../lib/cn'
import { osPath } from '../../paths'

interface SidebarProps {
  open: boolean
  collapsed: boolean
  onClose: () => void
}

function toolLinksFor(base: string) {
  return [
    { to: `${base}/review`, label: 'Final review', icon: GraduationCap },
    { to: `${base}/assessment`, label: 'Final assessment', icon: Target },
    { to: `${base}/cheat-sheet`, label: 'Cheat sheet', icon: ScrollText },
    { to: `${base}/coverage`, label: 'Coverage ledger', icon: FileSearch },
    { to: osPath('/bookmarks'), label: 'Bookmarks & revision', icon: BookMarked },
    { to: osPath('/progress'), label: 'Progress dashboard', icon: LayoutDashboard },
  ]
}

export function Sidebar({ open, collapsed, onClose }: SidebarProps) {
  const { progress } = useProgress()
  const chapter = useActiveChapter()
  const { meta, sections, totalEstimatedMinutes } = chapter
  const overview = getProgressOverview(progress, chapter)
  const toolLinks = toolLinksFor(chapter.path)
  const coverageSummary = chapter.coverage.summary

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-ink-950/80 backdrop-blur-sm transition-opacity lg:hidden ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        className={`app-sidebar no-print fixed inset-y-0 left-0 z-50 flex w-[17.5rem] flex-col border-r border-line-soft bg-ink-900/97 transition-[transform,width] duration-200 lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
        aria-label="Course navigation"
        data-collapsed={collapsed ? 'true' : 'false'}
      >
        <div
          className={cn(
            'flex items-start justify-between gap-2 border-b border-line-soft px-4 pb-4 pt-4',
            collapsed && 'lg:justify-center lg:px-3',
          )}
        >
          <Link
            to={osPath('/')}
            className={cn('group flex items-start gap-2.5', collapsed && 'lg:justify-center')}
            onClick={onClose}
            title="OS Atlas — all chapters"
          >
            <span className="mt-0.5 flex h-10 w-10 flex-none items-center justify-center rounded-xl border border-cyan-neon/25 bg-cyan-neon/10 text-cyan-neon shadow-[0_0_28px_-12px_rgba(53,216,238,0.7)]">
              <BookOpen className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className={cn(collapsed && 'lg:hidden')}>
              <span className="block font-display text-base font-semibold tracking-tight text-mist-50 group-hover:text-white">
                OS Atlas
              </span>
              <span className="mt-0.5 block font-mono text-[0.65rem] uppercase tracking-[0.15em] text-mist-500">
                Operating Systems
              </span>
            </span>
          </Link>
          <button
            type="button"
            className="icon-btn lg:hidden"
            onClick={onClose}
            aria-label="Close navigation"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <nav
          aria-label="Chapters"
          className={cn('grid gap-1.5 border-b border-line-soft px-3 py-3', collapsed ? 'lg:grid-cols-1 lg:px-2' : 'grid-cols-2')}
        >
          {chapters.map((entry) => {
            const active = entry.meta.id === meta.id
            return (
              <Link
                key={entry.meta.id}
                to={entry.path}
                onClick={onClose}
                aria-current={active ? 'page' : undefined}
                title={`Chapter ${Number(entry.meta.number)}: ${entry.meta.title}`}
                className={cn(
                  'rounded-lg border px-2.5 py-1.5 text-left transition-colors',
                  active
                    ? 'border-cyan-neon/45 bg-cyan-neon/10 text-cyan-neon'
                    : 'border-line-soft bg-ink-950/40 text-mist-400 hover:border-line hover:text-mist-100',
                  collapsed && 'lg:px-0 lg:text-center',
                )}
              >
                <span className="block font-mono text-[0.6rem] uppercase tracking-[0.14em]">Ch {entry.meta.number}</span>
                <span className={cn('block truncate text-[0.74rem] font-semibold', collapsed && 'lg:hidden')}>
                  {entry.meta.shortTitle}
                </span>
              </Link>
            )
          })}
        </nav>

        <div className={cn('border-b border-line-soft px-4 py-4', collapsed && 'lg:hidden')}>
          <Link
            to={chapter.path}
            onClick={onClose}
            className="font-display text-[0.95rem] font-medium leading-snug text-mist-100 hover:text-cyan-neon"
          >
            {meta.title}
          </Link>
          <p className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.72rem] text-mist-500">
            <span>{sections.length} sections</span>
            <span aria-hidden="true">·</span>
            <span>{totalEstimatedMinutes} min core</span>
            <span aria-hidden="true">·</span>
            <span>{coverageSummary.unique} exam Qs</span>
          </p>
          <div className="mt-3">
            <div className="flex items-center justify-between text-[0.72rem] text-mist-500">
              <span>Chapter progress</span>
              <span className="font-mono text-mist-300">
                {overview.sectionsCompleted}/{overview.totalSections}
              </span>
            </div>
            <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-ink-700">
              <div
                className="h-full rounded-full bg-gradient-to-r from-cyan-neon to-teal-neon transition-[width] duration-500"
                style={{ width: `${overview.completionPercent}%` }}
              />
            </div>
          </div>
        </div>

        <nav
          className={cn('flex-1 overflow-y-auto px-2.5 py-4', collapsed && 'lg:px-2')}
          aria-label="Learning sections"
        >
          <p
            className={cn(
              'px-2 pb-2 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-mist-600',
              collapsed && 'lg:hidden',
            )}
          >
            Learn the chapter
          </p>
          <div className="space-y-0.5">
            {sections.map((section) => {
              const sectionProgress = progress.sections[section.id]
              return (
                <NavLink
                  key={section.id}
                  to={osPath(`/section/${section.id}`)}
                  onClick={onClose}
                  title={collapsed ? section.shortTitle : undefined}
                  aria-label={section.shortTitle}
                  className={({ isActive }) =>
                    cn(
                      'nav-link',
                      isActive && 'nav-link-active',
                      collapsed && 'lg:justify-center lg:px-0',
                    )
                  }
                >
                  <span className="flex h-5 w-5 flex-none items-center justify-center">
                    {sectionProgress?.completed ? (
                      <CheckCircle2 className="h-4 w-4 text-teal-neon" aria-label="Completed" />
                    ) : sectionProgress?.visited ? (
                      <Circle
                        className="h-3 w-3 fill-cyan-neon/30 text-cyan-neon"
                        aria-label="Visited"
                      />
                    ) : (
                      <span className="font-mono text-[0.68rem] text-mist-500">
                        {String(section.order).padStart(2, '0')}
                      </span>
                    )}
                  </span>
                  <span
                    className={cn('min-w-0 flex-1 leading-snug', collapsed && 'lg:hidden')}
                  >
                    {section.shortTitle}
                  </span>
                </NavLink>
              )
            })}
          </div>

          <p
            className={cn(
              'px-2 pb-2 pt-6 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-mist-600',
              collapsed && 'lg:hidden',
            )}
          >
            Exam preparation
          </p>
          <div className="mt-4 border-t border-line-soft/70 pt-3">
            {toolLinks.map((tool) => {
              const Icon = tool.icon
              return (
                <NavLink
                  key={tool.to}
                  to={tool.to}
                  onClick={onClose}
                  title={collapsed ? tool.label : undefined}
                  aria-label={tool.label}
                  className={({ isActive }) =>
                    cn(
                      'nav-link',
                      isActive && 'nav-link-active',
                      collapsed && 'lg:justify-center lg:px-0',
                    )
                  }
                >
                  <Icon className="h-4 w-4 flex-none opacity-75" aria-hidden="true" />
                  <span className={cn(collapsed && 'lg:hidden')}>{tool.label}</span>
                </NavLink>
              )
            })}
          </div>
        </nav>

        <div className={cn('border-t border-line-soft px-4 py-3.5', collapsed && 'lg:hidden')}>
          <div className="flex items-start gap-2 text-[0.72rem] leading-relaxed text-mist-500">
            <Sparkles className="mt-0.5 h-3.5 w-3.5 flex-none text-amber-neon" aria-hidden="true" />
            <p>
              Every historical question is mapped in the{' '}
              <Link
                to={`${chapter.path}/coverage`}
                onClick={onClose}
                className="text-mist-300 underline decoration-line underline-offset-2 hover:text-cyan-neon"
              >
                coverage ledger
              </Link>
              . Flagged items are shown but excluded from scoring.
            </p>
          </div>
          <div className="mt-3 flex items-center justify-between text-[0.65rem] text-mist-600">
            <span className="inline-flex items-center gap-1">
              <ListChecks className="h-3 w-3" aria-hidden="true" />
              {coverageSummary.unique} unique · {coverageSummary.implemented} mapped
            </span>
            <Link
              to={osPath('/progress')}
              onClick={onClose}
              className="transition-colors hover:text-mist-300"
              aria-label="Progress dashboard"
            >
              <BookOpenCheck className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
          <p className="mt-2 flex items-center gap-1 text-[0.65rem] text-mist-600">
            <ClipboardList className="h-3 w-3" aria-hidden="true" />
            Chapter {Number(meta.number)} · Silberschatz 9e
          </p>
        </div>

        <div className={cn('hidden border-t border-line-soft px-2 py-3', collapsed && 'lg:block')}>
          <Link
            to={`${chapter.path}/coverage`}
            onClick={onClose}
            title="Coverage ledger"
            aria-label="Coverage ledger"
            className="nav-link justify-center px-0"
          >
            <BookOpenCheck className="h-4 w-4" aria-hidden="true" />
          </Link>
          <p className="mt-1 text-center font-mono text-[0.6rem] text-mist-500">
            {overview.completionPercent}%
          </p>
        </div>
      </aside>
    </>
  )
}
