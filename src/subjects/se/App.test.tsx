import { describe, expect, it } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SeApp from './App'
import { SE_BASE, sePath } from './paths'
import { allLessons } from './data/course'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={`${SE_BASE}/*`} element={<SeApp />} />
      </Routes>
    </BrowserRouter>
  )
}

describe('software engineering routes', () => {
  it('renders the course home with both weeks', async () => {
    window.history.pushState({}, '', sePath('/'))
    render(<App />)
    expect(await screen.findByRole('heading', { level: 1, name: 'Advanced Software Engineering' }, { timeout: 8000 })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 3, name: /Foundations & the AI-Augmented SDLC/ })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 3, name: /Foundations of Modern Engineering/ })).toBeInTheDocument()
  }, 20000)

  it('renders a lesson, its diagrams and lets the reader mark it done', async () => {
    window.history.pushState({}, '', sePath('/lesson/w1-harness'))
    render(<App />)
    expect(await screen.findByRole('heading', { level: 1, name: /The Story of the Harness/ }, { timeout: 8000 })).toBeInTheDocument()
    expect(screen.getByRole('img', { name: /Initializer agent writes a feature list/ })).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: /Mark lesson as done/ }))
    expect(screen.getAllByText(/Completed — mark as not done/).length).toBeGreaterThan(0)
  }, 20000)

  it('renders the week overview with its lessons and no slide references', async () => {
    window.history.pushState({}, '', sePath('/week/week-2'))
    render(<App />)
    expect(await screen.findByRole('heading', { level: 2, name: 'Lessons, in order' }, { timeout: 8000 })).toBeInTheDocument()
    expect(screen.getByText('Why Structure Pays: The Economics of Architecture')).toBeInTheDocument()
    expect(document.body.textContent ?? '').not.toMatch(/slides?/i)
  }, 20000)

  it('keeps its own theme even when another subject left data-theme on <html>', async () => {
    document.documentElement.dataset.theme = 'garnet' // e.g. left behind by the OS subject
    window.history.pushState({}, '', sePath('/week/week-1'))
    const { container, unmount } = render(<App />)
    await screen.findByRole('heading', { level: 2, name: 'Lessons, in order' }, { timeout: 8000 })
    expect(container.querySelector('.se-root')?.getAttribute('data-se-theme')).toBe('blueprint')
    unmount()
    delete document.documentElement.dataset.theme
  }, 20000)

  it('renders every lesson without crashing, as a standalone study page (no slide references)', async () => {
    for (const lesson of allLessons) {
      window.history.pushState({}, '', sePath(`/lesson/${lesson.id}`))
      const { container, unmount } = render(<App />)
      expect(await screen.findByRole('heading', { level: 1, name: lesson.title }, { timeout: 8000 })).toBeInTheDocument()
      expect(container.textContent ?? '', lesson.id).not.toMatch(/\bslides?\b|سلايد/i)
      unmount()
    }
  }, 90000)

  it('renders the flashcards page and the not-found page', async () => {
    window.history.pushState({}, '', sePath('/glossary'))
    const { unmount } = render(<App />)
    expect(await screen.findByRole('heading', { level: 1, name: /Key terms & flashcards/ }, { timeout: 8000 })).toBeInTheDocument()
    unmount()
    window.history.pushState({}, '', sePath('/nope'))
    render(<App />)
    expect(await screen.findByRole('heading', { level: 1, name: 'Page not found' })).toBeInTheDocument()
  }, 20000)
})
