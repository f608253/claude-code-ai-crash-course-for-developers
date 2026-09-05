import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import '@testing-library/jest-dom/vitest'

import Card from './Card.tsx'

describe('Card', () => {
  it('renders a region with the given label and its children', () => {
    render(
      <Card label="Test card">
        <p>Hello</p>
      </Card>,
    )

    const section = screen.getByRole('region', { name: 'Test card' })
    expect(section).toBeInTheDocument()
    expect(section).toHaveClass('card')
    expect(screen.getByText('Hello')).toBeInTheDocument()
  })
})