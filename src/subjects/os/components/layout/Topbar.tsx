import { Link } from 'react-router-dom'
import { ArrowRight, Bookmark, Gem, Home, Menu, Moon, Palette, PanelLeftClose, PanelLeftOpen, SunMoon, Sunset, Trophy } from 'lucide-react'
import { LanguageToggle } from '../ui/LanguageToggle'
import { useProgress } from '../../context/ProgressContext'
import { resolveTheme, useThemePreference, type ThemePreference } from '../../context/ThemeContext'
import { getProgressOverview } from '../../lib/progress'
import { findSection } from '../../data/chapters'
import { chapterFromPath, useActiveChapter } from '../../lib/activeChapter'
import { osPath, useOsPathname, YEAR_HUB } from '../../paths'

const toolLabels: Record<string, string> = {
  review: 'Final review',
  assessment: 'Final assessment',
  'cheat-sheet': 'Cheat sheet',
  coverage: 'Coverage ledger',
}

const globalLabels: Record<string, string> = {
  '/': 'All chapters',
  '/bookmarks': 'Bookmarks & revision',
  '/bookmarks/practice': 'Bookmarked practice',
  '/progress': 'Progress dashboard',
}

function useCurrentLabel(): string {
  const pathname = useOsPathname()
  if (pathname.startsWith('/section/')) return findSection(pathname.split('/')[2] ?? '')?.shortTitle ?? 'Section'
  const tool = pathname.match(/^\/chapter\/[^/]+\/([^/]+)/)?.[1]
  if (tool) return toolLabels[tool] ?? 'Chapter'
  if (/^\/chapter\/[^/]+\/?$/.test(pathname)) return 'Chapter overview'
  return globalLabels[pathname] ?? 'Page'
}

const themeCopy: Record<ThemePreference, { label: string; icon: typeof Moon }> = {
  auto: { label: 'Theme: chapter default', icon: SunMoon },
  night: { label: 'Theme: night', icon: Moon },
  bloom: { label: 'Theme: bloom', icon: Palette },
  sunset: { label: 'Theme: sunset', icon: Sunset },
  jade: { label: 'Theme: jade', icon: Gem },
}

function ThemeToggle() {
  const { preference, cycle } = useThemePreference()
  const chapter = useActiveChapter()
  const copy = themeCopy[preference]
  const effective = resolveTheme(preference, chapter.meta.theme)
  return (
    <button
      type="button"
      className="icon-btn"
      onClick={cycle}
      title={`${copy.label} (showing ${effective}) — click to change`}
      aria-label={`${copy.label}. Currently showing the ${effective} theme. Click to change.`}
    >
      <copy.icon className="h-[1.05rem] w-[1.05rem]" aria-hidden="true" />
    </button>
  )
}

interface TopbarProps {
  onMenu: () => void
  sidebarCollapsed: boolean
  onToggleSidebar: () => void
}

export function Topbar({ onMenu, sidebarCollapsed, onToggleSidebar }: TopbarProps) {
  const label = useCurrentLabel()
  const pathname = useOsPathname()
  const { progress } = useProgress()
  const chapter = useActiveChapter()
  const inChapter = chapterFromPath(pathname) !== null
  const overview = getProgressOverview(progress, chapter)

  return (
    <header className="no-print sticky top-0 z-30 border-b border-line-soft bg-ink-950/85 backdrop-blur-xl">
      <div className="page-container flex h-[4.25rem] items-center gap-2.5 px-4 sm:px-6 lg:px-8 2xl:px-12">
        <button type="button" className="icon-btn lg:hidden" onClick={onMenu} aria-label="Open navigation">
          <Menu className="h-5 w-5" aria-hidden="true" />
        </button>
        <button
          type="button"
          className="icon-btn hidden lg:inline-flex"
          onClick={onToggleSidebar}
          aria-label={sidebarCollapsed ? 'Expand chapter navigation' : 'Collapse chapter navigation'}
          aria-pressed={sidebarCollapsed}
          title={sidebarCollapsed ? 'Expand navigation' : 'Collapse navigation'}
        >
          {sidebarCollapsed ? (
            <PanelLeftOpen className="h-[1.1rem] w-[1.1rem]" aria-hidden="true" />
          ) : (
            <PanelLeftClose className="h-[1.1rem] w-[1.1rem]" aria-hidden="true" />
          )}
        </button>

        <div className="min-w-0 flex-1">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-[0.78rem] text-mist-500">
            <Link
              to={YEAR_HUB}
              className="hidden whitespace-nowrap transition-colors hover:text-mist-200 sm:inline"
              title="All 3rd-year subjects"
            >
              3rd Year
            </Link>
            <span aria-hidden="true" className="hidden sm:inline">/</span>
            {inChapter ? (
              <Link to={chapter.path} className="whitespace-nowrap transition-colors hover:text-mist-200">
                Chapter {chapter.meta.number}
              </Link>
            ) : (
              <Link to={osPath('/')} className="whitespace-nowrap transition-colors hover:text-mist-200">
                OS Atlas
              </Link>
            )}
            <span aria-hidden="true">/</span>
            <span className="truncate text-mist-200">{label}</span>
          </nav>
          <p className="mt-0.5 hidden truncate text-[0.72rem] text-mist-500 sm:block">
            {inChapter ? chapter.meta.title : 'Operating Systems'}
          </p>
        </div>

        <Link
          to="/"
          className="btn btn-secondary btn-sm shrink-0"
          aria-label="Go to website home page"
          title="Website home page"
        >
          <Home className="h-3.5 w-3.5" aria-hidden="true" />
          <span className="hidden sm:inline">Home</span>
        </Link>

        <div className="hidden items-center gap-3.5 xl:flex">
          <Link
            to={osPath('/bookmarks')}
            className="inline-flex items-center gap-1.5 text-[0.8rem] font-medium text-mist-400 transition-colors hover:text-mist-100"
          >
            <Bookmark className="h-3.5 w-3.5" aria-hidden="true" />
            {progress.bookmarks.questions.length + progress.bookmarks.sections.length > 0
              ? `${progress.bookmarks.questions.length + progress.bookmarks.sections.length} saved`
              : 'Bookmarks'}
          </Link>
          <span className="h-4 w-px bg-line" aria-hidden="true" />
          <span
            className="inline-flex items-center gap-1.5 text-[0.8rem] text-mist-400"
            title={`Chapter ${Number(chapter.meta.number)} sections completed`}
          >
            <Trophy className="h-3.5 w-3.5 text-amber-neon" aria-hidden="true" />
            <span className="font-mono">
              {overview.sectionsCompleted}/{overview.totalSections}
            </span>
          </span>
        </div>

        <ThemeToggle />
        <span className="hidden h-4 w-px bg-line sm:block xl:hidden" aria-hidden="true" />
        <div className="hidden sm:block">
          <LanguageToggle />
        </div>
        <div className="sm:hidden">
          <LanguageToggle compact />
        </div>

        <Link to={`${chapter.path}/assessment`} className="btn btn-primary btn-sm hidden xl:inline-flex">
          Final assessment
          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
      </div>
    </header>
  )
}
