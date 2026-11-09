import { lazy, useLayoutEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import '@fontsource-variable/inter'
import '@fontsource-variable/space-grotesk'
import '@fontsource-variable/jetbrains-mono'
import '@fontsource-variable/noto-sans-arabic'
// Mounted only while this subject is on screen, so Tailwind's reset never reaches other FCAI pages.
import subjectCss from './index.css?inline'
import { PrefsProvider } from './context/PrefsContext'
import { ProgressProvider } from './context/ProgressContext'
import { Shell } from './components/Shell'
import { NotFoundPage } from './pages/NotFoundPage'

const HomePage = lazy(async () => ({ default: (await import('./pages/HomePage')).HomePage }))
const WeekPage = lazy(async () => ({ default: (await import('./pages/WeekPage')).WeekPage }))
const LessonPage = lazy(async () => ({ default: (await import('./pages/LessonPage')).LessonPage }))
const RevisionPage = lazy(async () => ({ default: (await import('./pages/RevisionPage')).RevisionPage }))
const GlossaryPage = lazy(async () => ({ default: (await import('./pages/GlossaryPage')).GlossaryPage }))

/** Restore the <html> direction this subject changes when it unmounts. (The theme lives on the subject's root, not <html>.) */
function useSubjectDocument() {
  useLayoutEffect(() => {
    const html = document.documentElement
    const previousDir = html.getAttribute('dir')
    html.setAttribute('dir', 'ltr')
    return () => {
      if (previousDir === null) html.removeAttribute('dir')
      else html.setAttribute('dir', previousDir)
    }
  }, [])
}

/** Advanced Software Engineering (3rd year). The site router mounts it at `/3rd-year/se/*`. */
export default function SeApp() {
  useSubjectDocument()
  return (
    <>
      <style data-subject="se">{subjectCss}</style>
      <PrefsProvider>
        <ProgressProvider>
          <Routes>
            <Route element={<Shell />}>
              <Route index element={<HomePage />} />
              <Route path="week/:weekId" element={<WeekPage />} />
              <Route path="week/:weekId/revision" element={<RevisionPage />} />
              <Route path="lesson/:lessonId" element={<LessonPage />} />
              <Route path="glossary" element={<GlossaryPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </ProgressProvider>
      </PrefsProvider>
    </>
  )
}
