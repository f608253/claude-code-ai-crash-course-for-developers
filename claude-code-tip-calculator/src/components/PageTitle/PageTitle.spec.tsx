import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import '@testing-library/jest-dom/vitest'

import PageTitle from './PageTitle.tsx'

describe('PageTitle', () => {
  it('renders the app title as a level-one heading', () => {
    render(<PageTitle />)

    const heading = screen.getByRole('heading', { level: 1, name: 'Tip Calculator App' })
    expect(heading).toBeInTheDocument()
    expect(heading).toHaveClass('page-title')
  })
})