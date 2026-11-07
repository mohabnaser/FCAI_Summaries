import { describe, expect, it } from 'vitest'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import type { Quiz } from '../../types'
import { getQuestion } from '../../data/questions'
import { LanguageProvider } from '../../context/LanguageContext'
import { ProgressProvider } from '../../context/ProgressContext'
import { QuizEngine } from './QuizEngine'

const mcq = getQuestion('s1-kernel-not-true')
const secondMcq = getQuestion('s2-bootstrap-mcq')

const singleQuiz: Quiz = {
  id: 'test-single',
  sectionId: 'os-intro',
  title: 'Single-question check',
  description: 'A test quiz.',
  questionIds: [mcq.id],
}

const twoQuiz: Quiz = {
  id: 'test-two',
  sectionId: 'os-intro',
  title: 'Two-question check',
  description: 'A test quiz.',
  questionIds: [mcq.id, secondMcq.id],
}

function renderEngine(quiz: Quiz, questions = quiz.questionIds.map((id) => getQuestion(id))) {
  return render(
    <MemoryRouter>
      <LanguageProvider>
        <ProgressProvider>
          <QuizEngine quiz={quiz} questions={questions} />
        </ProgressProvider>
      </LanguageProvider>
    </MemoryRouter>,
  )
}

describe('QuizEngine', () => {
  it('grades a submitted answer, unlocks explanation, bookmarks, and retries', async () => {
    renderEngine(singleQuiz)

    const bookmarkButton = screen.getByRole('button', { name: 'Bookmark this question' })
    fireEvent.click(bookmarkButton)
    expect(
      screen.getByRole('button', { name: 'Remove question bookmark' }),
    ).toHaveAttribute('aria-pressed', 'true')

    const correctOption = screen.getByRole('radio', {
      name: /^The kernel is made of various modules which cannot be loaded/i,
    })
    fireEvent.click(correctOption)
    expect(correctOption).toBeChecked()

    fireEvent.click(screen.getByRole('button', { name: /submit quiz/i }))

    expect(await screen.findByRole('heading', { name: 'Exam-ready' })).toBeInTheDocument()
    expect(screen.getByText(/Option \(c\) is false/i)).toBeInTheDocument()
    expect(screen.getAllByText(/Correct answer/i).length).toBeGreaterThan(0)
    expect(screen.getByText('Best 1/1')).toBeInTheDocument()

    const retryButtons = screen.getAllByRole('button', { name: /retry quiz/i })
    fireEvent.click(retryButtons[0]!)

    await waitFor(() => {
      expect(screen.queryByRole('heading', { name: 'Exam-ready' })).not.toBeInTheDocument()
    })
    expect(
      screen.getByRole('radio', { name: /made of various modules which cannot be loaded/i }),
    ).not.toBeChecked()
  })

  it('reports answered incorrect questions separately from blanks', async () => {
    renderEngine(twoQuiz)

    fireEvent.click(
      screen.getByRole('radio', {
        name: /kernel remains in the memory during the entire computer session/i,
      }),
    )
    fireEvent.click(screen.getByRole('button', { name: 'Next' }))
    fireEvent.click(screen.getByRole('radio', { name: /^bootstrap program$/i }))
    fireEvent.click(screen.getByRole('button', { name: /submit quiz/i }))

    expect(await screen.findByRole('heading', { name: 'Needs revision' })).toBeInTheDocument()
    expect(screen.getByText('1 correct')).toBeInTheDocument()
    expect(screen.getByText('1 incorrect')).toBeInTheDocument()
    expect(screen.queryByText(/unanswered/i)).not.toBeInTheDocument()
  })

  it('warns about unanswered questions and requires an explicit submit-anyway', async () => {
    renderEngine(twoQuiz)

    fireEvent.click(
      screen.getByRole('radio', {
        name: /made of various modules which cannot be loaded/i,
      }),
    )
    fireEvent.click(screen.getByRole('button', { name: /submit quiz/i }))

    expect(screen.getByRole('alert')).toHaveTextContent(/1 question still unanswered/i)
    expect(screen.queryByRole('heading', { name: 'Needs revision' })).not.toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: /submit anyway/i }))

    expect(await screen.findByRole('heading', { name: 'Needs revision' })).toBeInTheDocument()
    expect(screen.getByText(/1 unanswered/i)).toBeInTheDocument()
    expect(screen.queryByText('1 incorrect')).not.toBeInTheDocument()
  })
})
