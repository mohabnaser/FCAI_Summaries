import { describe, expect, it } from 'vitest'
import { fireEvent, render, screen, within } from '@testing-library/react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SeApp from './App'
import { SE_BASE, sePath } from './paths'
import { allLessons, quizFor } from './data/course'

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

  it('lets the reader answer the lesson quiz, explains each answer and gives a score', async () => {
    const lesson = allLessons.find((entry) => entry.id === 'w1-compass')!
    const questions = quizFor(lesson.id)
    window.history.pushState({}, '', sePath(`/lesson/${lesson.id}`))
    render(<App />)
    expect(await screen.findByRole('heading', { level: 2, name: 'Check your understanding' }, { timeout: 8000 })).toBeInTheDocument()

    const choicesOf = (i: number) => within(screen.getByRole('group', { name: `Choices for question ${i + 1}` })).getAllByRole('button')

    // A wrong pick locks the question, points at the right choice and explains it.
    const wrong = (questions[0].answer + 1) % 4
    fireEvent.click(choicesOf(0)[wrong])
    expect(choicesOf(0)[wrong]).toHaveAttribute('data-state', 'wrong')
    expect(choicesOf(0)[questions[0].answer]).toHaveAttribute('data-state', 'correct')
    choicesOf(0).forEach((button) => expect(button).toBeDisabled())
    expect(screen.getByText(/Not quite/)).toBeInTheDocument()
    expect(screen.queryByText(/You scored/)).not.toBeInTheDocument()

    questions.slice(1).forEach((question, offset) => fireEvent.click(choicesOf(offset + 1)[question.answer]))
    expect(screen.getByText(`You scored ${questions.length - 1} out of ${questions.length}`)).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: /Try again/ }))
    choicesOf(0).forEach((button) => expect(button).toBeEnabled())
    expect(screen.queryByText(/You scored/)).not.toBeInTheDocument()
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
