import { Suspense, useEffect, useState } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import { BookA, CircleCheck, Circle, House, Languages, LayoutGrid, Menu, Moon, ScrollText, Sun, X } from 'lucide-react'
import { allLessons, course, findLesson, findWeek, lessonPath, weekPath, weeks } from '../data/course'
import { useProgress } from '../context/ProgressContext'
import { usePrefs } from '../context/PrefsContext'
import { sePath, useSePathname, YEAR_HUB } from '../paths'

function useCrumb(pathname: string): { label: string; parent?: { label: string; to: string } } {
  const lesson = pathname.match(/^\/lesson\/([^/]+)/)?.[1]
  if (lesson) {
    const found = findLesson(lesson)
    const week = found ? findWeek(found.weekId) : undefined
    if (found && week) return { label: found.shortTitle, parent: { label: `Week ${week.number}`, to: weekPath(week) } }
  }
  const week = pathname.match(/^\/week\/([^/]+)(\/revision)?/)
  if (week) {
    const found = findWeek(week[1])
    if (found) {
      return week[2]
        ? { label: 'Revision sheet', parent: { label: `Week ${found.number}`, to: weekPath(found) } }
        : { label: `Week ${found.number}` }
    }
  }
  if (pathname === '/glossary') return { label: 'Key terms & flashcards' }
  if (pathname === '/') return { label: 'Course home' }
  return { label: 'Not found' }
}

function titleFor(pathname: string): string {
  const crumb = crumbTitle(pathname)
  return crumb ? `${crumb} · SE Blueprint` : 'SE Blueprint · Advanced Software Engineering'
}

function crumbTitle(pathname: string): string | null {
  const lesson = pathname.match(/^\/lesson\/([^/]+)/)?.[1]
  if (lesson) return findLesson(lesson)?.title ?? 'Not found'
  const week = pathname.match(/^\/week\/([^/]+)(\/revision)?/)
  if (week) {
    const found = findWeek(week[1])
    if (found) return week[2] ? `Week ${found.number} revision sheet` : `Week ${found.number}: ${found.title}`
  }
  if (pathname === '/glossary') return 'Key terms & flashcards'
  return null
}

function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { isDone, progress } = useProgress()
  const doneCount = allLessons.filter((lesson) => progress.done.includes(lesson.id)).length
  const percent = Math.round((doneCount / allLessons.length) * 100)

  return (
    <aside className="se-sidebar no-print" data-open={open} aria-label="Course navigation">
      <div className="flex items-start justify-between gap-2 border-b border-line-soft px-4 py-4">
        <Link to={sePath('/')} onClick={onClose} className="group flex items-center gap-3">
          <span className="icon-tile" data-tone="blue">
            <LayoutGrid className="h-5 w-5" />
          </span>
          <span>
            <span className="display block text-[1.02rem] font-bold text-ink">SE Blueprint</span>
            <span className="block font-mono text-[0.64rem] uppercase tracking-[0.14em] text-faint">
              {course.code} · Advanced SE
            </span>
          </span>
        </Link>
        <button type="button" className="icon-btn lg:hidden" onClick={onClose} aria-label="Close navigation">
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="border-b border-line-soft px-4 py-3">
        <div className="flex items-center justify-between text-[0.75rem] text-muted">
          <span>Course progress</span>
          <span className="font-mono">
            {doneCount}/{allLessons.length}
          </span>
        </div>
        <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-surface-2">
          <div className="h-full rounded-full transition-[width] duration-500" style={{ width: `${percent}%`, background: 'var(--se-teal)' }} />
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-3" aria-label="Weeks and lessons">
        <NavLink to={sePath('/')} end onClick={onClose} className="nav-link">
          <House className="mt-0.5 h-4 w-4 flex-none" />
          Course home
        </NavLink>
        {weeks.map((week) => (
          <div key={week.id} className="mt-4">
            <NavLink to={weekPath(week)} end onClick={onClose} className="nav-link !py-1">
              <span className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-faint">Week {week.number}</span>
            </NavLink>
            <p className="px-2.5 pb-1 text-[0.8rem] font-semibold text-ink">{week.title}</p>
            {week.lessons.map((lesson) => (
              <NavLink key={lesson.id} to={lessonPath(lesson)} onClick={onClose} className="nav-link">
                {isDone(lesson.id) ? (
                  <CircleCheck className="mt-0.5 h-4 w-4 flex-none" style={{ color: 'var(--se-teal)' }} />
                ) : (
                  <Circle className="mt-0.5 h-4 w-4 flex-none opacity-50" />
                )}
                <span>{lesson.shortTitle}</span>
              </NavLink>
            ))}
            <NavLink to={sePath(`/week/${week.id}/revision`)} onClick={onClose} className="nav-link">
              <ScrollText className="mt-0.5 h-4 w-4 flex-none" style={{ color: 'var(--se-amber)' }} />
              <span>Week {week.number} revision sheet</span>
            </NavLink>
          </div>
        ))}
        <div className="mt-4 border-t border-line-soft pt-3">
          <NavLink to={sePath('/glossary')} onClick={onClose} className="nav-link">
            <BookA className="mt-0.5 h-4 w-4 flex-none" style={{ color: 'var(--se-violet)' }} />
            <span>Key terms & flashcards</span>
          </NavLink>
        </div>
      </nav>
      <p className="border-t border-line-soft px-4 py-3 text-[0.7rem] leading-relaxed text-faint">
        {course.instructor} · progress is saved on this device only.
      </p>
    </aside>
  )
}

function Topbar({ onMenu }: { onMenu: () => void }) {
  const pathname = useSePathname()
  const crumb = useCrumb(pathname)
  const { showArabic, toggleLang, theme, toggleTheme } = usePrefs()

  return (
    <header className="se-topbar no-print">
      <div className="page flex h-16 items-center gap-2.5 px-4 sm:px-6 lg:px-8">
        <button type="button" className="icon-btn lg:hidden" onClick={onMenu} aria-label="Open navigation">
          <Menu className="h-5 w-5" />
        </button>
        <nav aria-label="Breadcrumb" className="flex min-w-0 flex-1 items-center gap-1.5 text-[0.8rem] text-faint">
          <Link to={YEAR_HUB} className="hidden whitespace-nowrap hover:text-ink sm:inline">
            3rd Year
          </Link>
          <span className="hidden sm:inline" aria-hidden="true">/</span>
          <Link to={sePath('/')} className="whitespace-nowrap hover:text-ink">
            Software Eng.
          </Link>
          {crumb.parent ? (
            <>
              <span aria-hidden="true">/</span>
              <Link to={crumb.parent.to} className="whitespace-nowrap hover:text-ink">
                {crumb.parent.label}
              </Link>
            </>
          ) : null}
          <span aria-hidden="true">/</span>
          <span className="truncate text-ink">{crumb.label}</span>
        </nav>

        <button
          type="button"
          onClick={toggleLang}
          aria-pressed={showArabic}
          className="btn btn-ghost btn-sm"
          title={showArabic ? 'Hide the Arabic explanations' : 'Show Arabic explanations under the English'}
        >
          <Languages className="h-4 w-4" style={{ color: showArabic ? 'var(--se-teal)' : undefined }} />
          <span className="hidden sm:inline">{showArabic ? 'EN + شرح عربي' : 'English only'}</span>
          <span className="sm:hidden">{showArabic ? 'ع' : 'EN'}</span>
        </button>
        <button
          type="button"
          className="icon-btn"
          onClick={toggleTheme}
          aria-label={theme === 'blueprint' ? 'Switch to light theme' : 'Switch to dark theme'}
          title={theme === 'blueprint' ? 'Light theme' : 'Dark theme'}
        >
          {theme === 'blueprint' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>
        <Link to="/" className="icon-btn" aria-label="Website home page" title="Website home page">
          <House className="h-4 w-4" />
        </Link>
      </div>
    </header>
  )
}

export function Shell() {
  const [open, setOpen] = useState(false)
  const pathname = useSePathname()
  const { theme } = usePrefs()

  useEffect(() => {
    setOpen(false)
    if (!window.location.hash) window.scrollTo({ top: 0, behavior: 'auto' })
    document.title = titleFor(pathname)
  }, [pathname])

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = previous
    }
  }, [open])

  return (
    <div className="se-root" data-se-theme={theme}>
      <a href="#se-main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-surface focus:px-4 focus:py-2">
        Skip to content
      </a>
      <div
        className={`no-print fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity lg:hidden ${open ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />
      <Sidebar open={open} onClose={() => setOpen(false)} />
      <div className="se-content">
        <Topbar onMenu={() => setOpen(true)} />
        <main id="se-main" tabIndex={-1} className="page px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
          <Suspense fallback={<p className="py-20 text-center text-muted">Loading…</p>}>
            <Outlet />
          </Suspense>
        </main>
        <footer className="no-print border-t border-line-soft">
          <div className="page flex flex-col gap-2 px-4 py-6 text-[0.75rem] text-faint sm:flex-row sm:justify-between sm:px-6 lg:px-8">
            <p>
              {course.code}: {course.title} · {course.instructor}
            </p>
            <p>A complete study guide for the course. Always double-check with the official material.</p>
          </div>
        </footer>
      </div>
    </div>
  )
}
