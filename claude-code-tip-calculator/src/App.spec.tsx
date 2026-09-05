import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import '@testing-library/jest-dom/vitest'

import App from './App.tsx'

function visitCalculatorCard() {
  return screen.getByRole('region', { name: 'Tip calculator' })
}

describe('App', () => {
  it('renders the page title and both sections', () => {
    render(<App />)

    expect(screen.getByRole('heading', { level: 1, name: 'Tip Calculator App' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Tip Calculator' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Split the Bill' })).toBeInTheDocument()

    const calcCard = visitCalculatorCard()
    expect(within(calcCard).getByText('0%')).toBeInTheDocument()
    expect(within(calcCard).getByText('$0.00')).toBeInTheDocument()
  })

  it('recalculates the tip percentage and total when bill and tip change', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.type(screen.getByRole('textbox', { name: 'Bill' }), '100')
    await user.type(screen.getByRole('textbox', { name: 'Tip Amount' }), '20')

    const calcCard = visitCalculatorCard()
    expect(within(calcCard).getByText('20%')).toBeInTheDocument()
    expect(within(calcCard).getByText('$120.00')).toBeInTheDocument()
  })

  it('recalculates per-person amounts when the number of people changes', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.type(screen.getByRole('textbox', { name: 'Bill' }), '100')
    await user.type(screen.getByRole('textbox', { name: 'Tip Amount' }), '20')

    await user.click(screen.getByRole('heading', { name: 'Split the Bill' }))
    await user.type(screen.getByRole('textbox', { name: 'Number of people' }), '4')

    expect(screen.getByText('$5.00')).toBeInTheDocument() // 20 / 4
    expect(screen.getByText('$30.00')).toBeInTheDocument() // 120 / 4
  })

  it('steps the bill value with the arrow keys', async () => {
    const user = userEvent.setup()
    render(<App />)

    const bill = screen.getByRole('textbox', { name: 'Bill' })
    await user.type(bill, '50')
    await user.keyboard('{ArrowUp}')
    expect(bill).toHaveValue('51')
    await user.keyboard('{ArrowDown}')
    expect(bill).toHaveValue('50')
  })

  it('shows validation messages for invalid bill and tip values', async () => {
    const user = userEvent.setup()
    render(<App />)

    const bill = screen.getByRole('textbox', { name: 'Bill' })
    const tip = screen.getByRole('textbox', { name: 'Tip Amount' })

    await user.type(bill, 'abc')
    expect(
      screen.getByText('Bill amount must be a positive whole number.'),
    ).toBeInTheDocument()

    await user.clear(bill)
    await user.type(bill, '-5')
    expect(screen.getByText('Bill amount cannot be less than 0.')).toBeInTheDocument()

    await user.clear(bill)
    await user.type(bill, '20')
    await user.type(tip, '25')
    expect(screen.getByText('Tip amount cannot exceed the bill amount.')).toBeInTheDocument()
  })

  it('shows validation messages for invalid people counts', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('heading', { name: 'Split the Bill' }))
    const people = screen.getByRole('textbox', { name: 'Number of people' })

    await user.type(people, '0')
    expect(screen.getByText('Number of people must be at least 1.')).toBeInTheDocument()

    await user.clear(people)
    await user.type(people, '101')
    expect(screen.getByText('Split is limited to 100 people.')).toBeInTheDocument()

    await user.clear(people)
    await user.type(people, '2.5')
    expect(
      screen.getByText('Number of people must be a positive whole number.'),
    ).toBeInTheDocument()
  })

  it('resets all inputs and results', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.type(screen.getByRole('textbox', { name: 'Bill' }), '100')
    await user.type(screen.getByRole('textbox', { name: 'Tip Amount' }), '20')
    await user.click(screen.getByRole('button', { name: 'Reset' }))

    expect(screen.getByRole('textbox', { name: 'Bill' })).toHaveValue('')
    expect(screen.getByRole('textbox', { name: 'Tip Amount' })).toHaveValue('')

    const calcCard = visitCalculatorCard()
    expect(within(calcCard).getByText('0%')).toBeInTheDocument()
    expect(within(calcCard).getByText('$0.00')).toBeInTheDocument()
  })
})