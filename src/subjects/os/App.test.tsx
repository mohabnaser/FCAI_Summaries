import { describe, expect, it } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import OsApp from './App'
import { OS_BASE, osPath, YEAR_HUB } from './paths'

/** Mount the subject the way the FCAI site router does. */
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={`${OS_BASE}/*`} element={<OsApp />} />
      </Routes>
    </BrowserRouter>
  )
}

describe('application routes', () => {
  it('renders the course home with every chapter', async () => {
    window.history.pushState({}, '', osPath('/'))
    render(<App />)

    expect(
      await screen.findByRole('heading', { level: 1, name: /^Operating Systems$/i }, { timeout: 8000 }),
    ).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 3, name: /Introduction to Operating Systems/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 3, name: /Operating-System Structures/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 3, name: /^Processes$/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 3, name: /^Process Synchronization$/i })).toBeInTheDocument()
  }, 20000)

  it('renders a chapter home and navigates to its study tools', async () => {
    window.history.pushState({}, '', osPath('/chapter/chapter-1'))
    render(<App />)

    expect(
      await screen.findByRole('heading', { level: 1, name: /Chapter 1: Introduction to Operating Systems/i }, { timeout: 8000 }),
    ).toBeInTheDocument()

    fireEvent.click(screen.getByRole('link', { name: /Every past-exam question with its source paper/i }))

    expect(
      await screen.findByRole('heading', { level: 1, name: /Coverage ledger/i }, { timeout: 8000 }),
    ).toBeInTheDocument()
    expect(screen.getByText(/356 total/i)).toBeInTheDocument()
    // Two lazy route chunks load here; jsdom under parallel test load can exceed the 5 s default.
  }, 20000)

  it('renders a bookmark workspace and an empty practice state', async () => {
    window.history.pushState({}, '', osPath('/bookmarks'))
    render(<App />)

    expect(
      await screen.findByRole('heading', { level: 1, name: /Bookmarks & revision/i }),
    ).toBeInTheDocument()
    expect(screen.getByText('No sections bookmarked')).toBeInTheDocument()
    expect(screen.getByText('No questions bookmarked')).toBeInTheDocument()
  })

  it('shows the not-found page for an unknown route', async () => {
    window.history.pushState({}, '', osPath('/not-a-real-page'))
    render(<App />)

    expect(
      await screen.findByRole('heading', { level: 1, name: /does not exist/i }),
    ).toBeInTheDocument()
  })

  it('redirects the legacy review URL and sets a chapter-specific title', async () => {
    window.history.pushState({}, '', osPath('/review'))
    render(<App />)

    expect(
      await screen.findByRole('heading', { level: 1, name: /^Final review$/i }, { timeout: 8000 }),
    ).toBeInTheDocument()
    expect(window.location.pathname).toBe(osPath('/chapter/chapter-1/review'))
    expect(document.title).toBe('Final Review · Chapter 1 · OS Atlas')
  }, 20000)

  it('serves the Chapter 2 home in the bloom theme', async () => {
    window.history.pushState({}, '', osPath('/chapter/chapter-2'))
    render(<App />)

    expect(
      await screen.findByRole('heading', { level: 1, name: /Chapter 2: Operating-System Structures/i }, { timeout: 8000 }),
    ).toBeInTheDocument()
    expect(document.documentElement.dataset.theme).toBe('bloom')
  }, 20000)

  it('serves the Chapter 3 home in the sunset theme', async () => {
    window.history.pushState({}, '', osPath('/chapter/chapter-3'))
    render(<App />)

    expect(
      await screen.findByRole('heading', { level: 1, name: /Chapter 3: Processes/i }, { timeout: 8000 }),
    ).toBeInTheDocument()
    expect(document.documentElement.dataset.theme).toBe('sunset')
  }, 20000)

  it('removes its styles and theme when the student leaves for the 3rd-year hub', async () => {
    window.history.pushState({}, '', osPath('/chapter/chapter-2'))
    render(
      <BrowserRouter>
        <Routes>
          <Route path={`${OS_BASE}/*`} element={<OsApp />} />
          <Route path={YEAR_HUB} element={<h1>3rd Year hub</h1>} />
        </Routes>
      </BrowserRouter>,
    )

    await screen.findByRole('heading', { level: 1, name: /Chapter 2: Operating-System Structures/i }, { timeout: 8000 })
    expect(document.querySelector('style[data-subject="os"]')).not.toBeNull()
    expect(document.documentElement.dataset.theme).toBe('bloom')

    fireEvent.click(screen.getByRole('link', { name: '3rd Year' }))

    expect(await screen.findByRole('heading', { level: 1, name: '3rd Year hub' })).toBeInTheDocument()
    expect(window.location.pathname).toBe(YEAR_HUB)
    expect(document.querySelector('style[data-subject="os"]')).toBeNull()
    expect(document.documentElement.dataset.theme).toBeUndefined()
    expect(document.documentElement.dataset.lang).toBeUndefined()
  }, 20000)

  it('shows not-found for an unknown chapter', async () => {
    window.history.pushState({}, '', osPath('/chapter/chapter-9'))
    render(<App />)
    expect(await screen.findByRole('heading', { level: 1, name: /does not exist/i }, { timeout: 8000 })).toBeInTheDocument()
  }, 20000)
})
