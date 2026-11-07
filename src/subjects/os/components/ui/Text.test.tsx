import { describe, expect, it } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { LanguageProvider } from '../../context/LanguageContext'
import { BilingualProse } from './Text'
import { LanguageToggle } from './LanguageToggle'

describe('language modes', () => {
  it('starts in English and adds the Egyptian Arabic explanation on request', () => {
    render(
      <LanguageProvider>
        <BilingualProse
          text={{ en: 'The kernel is always resident.', ar: 'الـ kernel دايمًا resident.' }}
        />
        <LanguageToggle />
      </LanguageProvider>,
    )

    expect(screen.getByText('The kernel is always resident.')).toBeInTheDocument()
    expect(screen.queryByText('الـ kernel دايمًا resident.')).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'English' })).toHaveAttribute(
      'aria-pressed',
      'true',
    )

    fireEvent.click(screen.getByRole('button', { name: 'Arabic explanation' }))

    expect(screen.getByText('الـ kernel دايمًا resident.')).toBeInTheDocument()
    expect(screen.getByText('The kernel is always resident.')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Arabic explanation' })).toHaveAttribute(
      'aria-pressed',
      'true',
    )

    fireEvent.click(screen.getByRole('button', { name: 'English' }))
    expect(screen.queryByText('الـ kernel دايمًا resident.')).not.toBeInTheDocument()
  })
})
