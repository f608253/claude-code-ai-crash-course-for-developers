import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import '@testing-library/jest-dom/vitest'

import SplitBillCard from './SplitBillCard.tsx'

const baseProps = {
  people: '2',
  peopleError: '',
  tipPerPersonLabel: '$6.67',
  totalPerPersonLabel: '$40.00',
  onPeopleChange: () => {},
}

describe('SplitBillCard', () => {
  it('renders collapsed by default', () => {
    const { container } = render(<SplitBillCard {...baseProps} />)

    expect(container.querySelector('.split')).not.toHaveAttribute('open')
    expect(screen.getByText('Split the Bill')).toBeInTheDocument()
  })

  it('expands when the header is clicked', async () => {
    const user = userEvent.setup()
    const { container } = render(<SplitBillCard {...baseProps} />)

    await user.click(screen.getByRole('heading', { name: 'Split the Bill' }))

    expect(container.querySelector('.split')).toHaveAttribute('open')
    expect(screen.getByRole('textbox', { name: 'Number of people' })).toBeInTheDocument()
  })

  it('calls onPeopleChange when the value changes', async () => {
    const user = userEvent.setup()
    const onPeopleChange = vi.fn()
    render(<SplitBillCard {...baseProps} people="" onPeopleChange={onPeopleChange} />)

    await user.click(screen.getByRole('heading', { name: 'Split the Bill' }))
    await user.type(screen.getByRole('textbox', { name: 'Number of people' }), '4')

    expect(onPeopleChange).toHaveBeenLastCalledWith('4')
  })

  it('renders the per-person results', () => {
    render(<SplitBillCard {...baseProps} />)

    expect(screen.getByText('Tip per person')).toBeInTheDocument()
    expect(screen.getByText('$6.67')).toBeInTheDocument()
    expect(screen.getByText('Total per person')).toBeInTheDocument()
    expect(screen.getByText('$40.00')).toBeInTheDocument()
  })

  it('renders the people error when provided', () => {
    render(<SplitBillCard {...baseProps} peopleError="Number of people must be at least 1." />)

    expect(screen.getByText('Number of people must be at least 1.')).toBeInTheDocument()
  })
})