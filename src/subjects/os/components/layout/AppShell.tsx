import { Suspense, useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { findSection } from '../../data/chapters'
import { chapterFromPath, rememberChapter, useActiveChapter } from '../../lib/activeChapter'
import { resolveTheme, useThemePreference } from '../../context/ThemeContext'
import { Sidebar } from './Sidebar'
import { Topbar } from './Topbar'
import { useOsPathname } from '../../paths'

const pageTitles: Record<string, string> = {
  '/': 'OS Atlas · Operating Systems',
  '/bookmarks': 'Bookmarks · OS Atlas',
  '/bookmarks/practice': 'Bookmarked Practice · OS Atlas',
  '/progress': 'Progress Dashboard · OS Atlas',
}

const toolTitles: Record<string, string> = {
  review: 'Final Review',
  assessment: 'Final Assessment',
  'cheat-sheet': 'Cheat Sheet',
  coverage: 'Coverage Ledger',
}

function titleFor(pathname: string): string {
  const section = pathname.match(/^\/section\/([^/]+)\/?$/)?.[1]
  if (section) {
    const found = findSection(section)
    if (found) return `${found.title} · OS Atlas`
  }
  const chapterMatch = pathname.match(/^\/chapter\/[^/]+(?:\/([^/]+))?\/?$/)
  const chapter = chapterFromPath(pathname)
  if (chapterMatch && chapter) {
    const tool = chapterMatch[1]
    if (!tool) return `OS Atlas · Chapter ${Number(chapter.meta.number)} — ${chapter.meta.shortTitle}`
    if (toolTitles[tool]) return `${toolTitles[tool]} · Chapter ${Number(chapter.meta.number)} · OS Atlas`
  }
  return pageTitles[pathname] ?? 'Page Not Found · OS Atlas'
}

const SIDEBAR_STORAGE_KEY = 'os-atlas:sidebar-collapsed:v1'

function readSidebarPreference(): boolean {
  try {
    return window.localStorage.getItem(SIDEBAR_STORAGE_KEY) === '1'
  } catch {
    return false
  }
}

export function AppShell() {
  const [navOpen, setNavOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(readSidebarPreference)
  const pathname = useOsPathname()
  const chapter = useActiveChapter()
  const { preference } = useThemePreference()
  const theme = resolveTheme(preference, chapter.meta.theme)

  useEffect(() => {
    const fromPath = chapterFromPath(pathname)
    if (fromPath) rememberChapter(fromPath)
  }, [pathname])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  const toggleSidebar = () => {
    setSidebarCollapsed((collapsed) => {
      const next = !collapsed
      try {
        window.localStorage.setItem(SIDEBAR_STORAGE_KEY, next ? '1' : '0')
      } catch {
        // The shell still works if storage is unavailable.
      }
      return next
    })
  }

  useEffect(() => {
    setNavOpen(false)
    const main = document.getElementById('main-content')
    if (main) {
      window.scrollTo({ top: 0, behavior: 'auto' })
    }
  }, [pathname])

  useEffect(() => {
    document.title = titleFor(pathname)
  }, [pathname])

  useEffect(() => {
    if (!navOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setNavOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = originalOverflow
    }
  }, [navOpen])

  return (
    <div
      className="app-shell min-h-screen"
      data-sidebar={sidebarCollapsed ? 'collapsed' : 'expanded'}
      data-chapter={chapter.meta.id}
    >
      <a
        href="#main-content"
        className="no-print sr-only z-[60] focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:rounded-lg focus:bg-cyan-neon focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-ink-950"
      >
        Skip to content
      </a>
      <Sidebar
        open={navOpen}
        collapsed={sidebarCollapsed}
        onClose={() => setNavOpen(false)}
      />
      <div className="app-content">
        <Topbar
          onMenu={() => setNavOpen(true)}
          sidebarCollapsed={sidebarCollapsed}
          onToggleSidebar={toggleSidebar}
        />
        <main id="main-content" tabIndex={-1}>
          <div className="page-container px-4 py-8 sm:px-6 lg:px-8 lg:py-10 2xl:px-12">
            <Suspense
              fallback={
                <div className="panel mx-auto mt-6 max-w-md p-8 text-center" role="status">
                  <p className="font-display text-sm font-semibold text-mist-100">
                    Loading chapter view…
                  </p>
                </div>
              }
            >
              <Outlet />
            </Suspense>
          </div>
        </main>
        <footer className="no-print border-t border-line-soft px-4 py-8 sm:px-6 lg:px-8 2xl:px-12">
          <div className="page-container flex flex-col gap-3 text-[0.78rem] text-mist-500 sm:flex-row sm:items-center sm:justify-between">
            <p>
              Operating Systems · Chapter {Number(chapter.meta.number)}: {chapter.meta.title}
            </p>
            <p>Reference: Silberschatz, Galvin and Gagne, Operating System Concepts, 9th edition</p>
          </div>
        </footer>
      </div>
    </div>
  )
}
