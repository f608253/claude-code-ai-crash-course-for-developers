import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import '@testing-library/jest-dom/vitest'

import ResultRow from './ResultRow.tsx'

describe('ResultRow', () => {
  it('renders the label and value', () => {
    const { container } = render(<ResultRow label="Total" value="$120.00" />)

    expect(screen.getByText('Total')).toBeInTheDocument()
    expect(screen.getByText('$120.00')).toHaveClass('result-value')
    expect(container.firstChild).toHaveClass('result-row')
    expect(container.firstChild).not.toHaveClass('result-total')
  })

  it('adds the total modifier class when total is true', () => {
    const { container } = render(<ResultRow label="Total" value="$1.00" total />)

    expect(container.firstChild).toHaveClass('result-total')
  })
})