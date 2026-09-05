import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'
import { describe, expect, it, vi } from 'vitest'

import '@testing-library/jest-dom/vitest'

import TipCalculatorCard from './TipCalculatorCard.tsx'

// Controlled harness so the fields behave like they do inside App.
function Harness() {
  const [bill, setBill] = useState('')
  const [tip, setTip] = useState('')

  return (
    <TipCalculatorCard
      bill={bill}
      tip={tip}
      billError=""
      tipError=""
      tipPercentLabel="0%"
      totalLabel="$0.00"
      onBillChange={setBill}
      onTipChange={setTip}
      onReset={() => {}}
    />
  )
}

const baseProps = {
  bill: '',
  tip: '',
  billError: '',
  tipError: '',
  tipPercentLabel: '0%',
  totalLabel: '$0.00',
  onBillChange: () => {},
  onTipChange: () => {},
  onReset: () => {},
}

describe('TipCalculatorCard', () => {
  it('renders the fields, results, and reset button', () => {
    render(<TipCalculatorCard {...baseProps} />)

    expect(screen.getByRole('heading', { name: 'Tip Calculator' })).toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: 'Bill' })).toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: 'Tip Amount' })).toBeInTheDocument()
    expect(screen.getByText('Tip Percentage')).toBeInTheDocument()
    expect(screen.getByText('0%')).toBeInTheDocument()
    expect(screen.getByText('Total')).toBeInTheDocument()
    expect(screen.getByText('$0.00')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Reset' })).toBeInTheDocument()
  })

  it('updates the bill field when the user types', async () => {
    const user = userEvent.setup()
    render(<Harness />)

    await user.type(screen.getByRole('textbox', { name: 'Bill' }), '100')

    expect(screen.getByRole('textbox', { name: 'Bill' })).toHaveValue('100')
  })

  it('updates the tip amount field when the user types', async () => {
    const user = userEvent.setup()
    render(<Harness />)

    await user.type(screen.getByRole('textbox', { name: 'Tip Amount' }), '20')

    expect(screen.getByRole('textbox', { name: 'Tip Amount' })).toHaveValue('20')
  })

  it('calls onReset when the reset button is clicked', async () => {
    const user = userEvent.setup()
    const onReset = vi.fn()
    render(<TipCalculatorCard {...baseProps} onReset={onReset} />)

    await user.click(screen.getByRole('button', { name: 'Reset' }))

    expect(onReset).toHaveBeenCalledTimes(1)
  })

  it('renders the field errors when provided', () => {
    render(
      <TipCalculatorCard
        {...baseProps}
        billError="Bill amount cannot be less than 0."
        tipError="Tip amount cannot exceed the bill amount."
      />,
    )

    expect(screen.getByText('Bill amount cannot be less than 0.')).toBeInTheDocument()
    expect(screen.getByText('Tip amount cannot exceed the bill amount.')).toBeInTheDocument()
  })
})