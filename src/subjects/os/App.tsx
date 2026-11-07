import { lazy, useLayoutEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import '@fontsource-variable/inter'
import '@fontsource-variable/space-grotesk'
import '@fontsource-variable/jetbrains-mono'
import '@fontsource-variable/noto-sans-arabic'
// Loaded as text and mounted only while this subject is on screen, so Tailwind's
// reset and the subject's :root/body rules never leak into the other FCAI pages.
import subjectCss from './index.css?inline'
import { LanguageProvider } from './context/LanguageContext'
import { ProgressProvider } from './context/ProgressContext'
import { ThemeProvider } from './context/ThemeContext'
import { AppShell } from './components/layout/AppShell'
import { NotFoundPage } from './pages/NotFoundPage'
import { osPath } from './paths'

const CourseHomePage = lazy(async () => ({ default: (await import('./pages/CourseHomePage')).CourseHomePage }))
const HomePage = lazy(async () => ({ default: (await import('./pages/HomePage')).HomePage }))
const SectionPage = lazy(async () => ({ default: (await import('./pages/SectionPage')).SectionPage }))
const FinalReviewPage = lazy(async () => ({
  default: (await import('./pages/FinalReviewPage')).FinalReviewPage,
}))
const FinalAssessmentPage = lazy(async () => ({
  default: (await import('./pages/FinalAssessmentPage')).FinalAssessmentPage,
}))
const CheatSheetPage = lazy(async () => ({
  default: (await import('./pages/CheatSheetPage')).CheatSheetPage,
}))
const CoveragePage = lazy(async () => ({
  default: (await import('./pages/CoveragePage')).CoveragePage,
}))
const BookmarksPage = lazy(async () => ({
  default: (await import('./pages/BookmarksPage')).BookmarksPage,
}))
const BookmarkedPracticePage = lazy(async () => ({
  default: (await import('./pages/BookmarkedPracticePage')).BookmarkedPracticePage,
}))
const ProgressPage = lazy(async () => ({
  default: (await import('./pages/ProgressPage')).ProgressPage,
}))

/** Chapter-scoped tools. The pre-multi-chapter URLs redirect to their Chapter 1 versions. */
const chapterTools = ['review', 'assessment', 'cheat-sheet', 'coverage'] as const

/** Restore the <html> attributes the subject changes (theme, language, direction) when it unmounts. */
function useSubjectDocument() {
  useLayoutEffect(() => {
    const html = document.documentElement
    const previousLang = html.getAttribute('lang')
    const previousDir = html.getAttribute('dir')
    html.setAttribute('dir', 'ltr')
    return () => {
      delete html.dataset.theme
      delete html.dataset.lang
      if (previousLang === null) html.removeAttribute('lang')
      else html.setAttribute('lang', previousLang)
      if (previousDir === null) html.removeAttribute('dir')
      else html.setAttribute('dir', previousDir)
    }
  }, [])
}

/** Operating Systems (3rd year). The site router mounts it at `/3rd-year/os/*`. */
export default function OsApp() {
  useSubjectDocument()

  return (
    <>
      <style data-subject="os">{subjectCss}</style>
      <LanguageProvider>
        <ThemeProvider>
          <ProgressProvider>
            <Routes>
              <Route element={<AppShell />}>
                <Route index element={<CourseHomePage />} />
                <Route path="chapter/:chapterId" element={<HomePage />} />
                <Route path="chapter/:chapterId/review" element={<FinalReviewPage />} />
                <Route path="chapter/:chapterId/assessment" element={<FinalAssessmentPage />} />
                <Route path="chapter/:chapterId/cheat-sheet" element={<CheatSheetPage />} />
                <Route path="chapter/:chapterId/coverage" element={<CoveragePage />} />
                {chapterTools.map((tool) => (
                  <Route
                    key={tool}
                    path={tool}
                    element={<Navigate to={osPath(`/chapter/chapter-1/${tool}`)} replace />}
                  />
                ))}
                <Route path="section/:sectionId" element={<SectionPage />} />
                <Route path="bookmarks" element={<BookmarksPage />} />
                <Route path="bookmarks/practice" element={<BookmarkedPracticePage />} />
                <Route path="progress" element={<ProgressPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Route>
            </Routes>
          </ProgressProvider>
        </ThemeProvider>
      </LanguageProvider>
    </>
  )
}
