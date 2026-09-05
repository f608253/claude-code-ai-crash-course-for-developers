import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'
import { describe, expect, it } from 'vitest'

import '@testing-library/jest-dom/vitest'

import NumberField from './NumberField.tsx'

// Controlled harness so the field's value state lives in React, like in the real app.
function Harness({
  initial = '',
  min = 0,
  max,
}: {
  initial?: string
  min?: number
  max?: number
}) {
  const [value, setValue] = useState(initial)
  return (
    <NumberField label="Amount" value={value} error="" min={min} max={max} onValueChange={setValue} />
  )
}

describe('NumberField', () => {
  it('renders the label and the input value', () => {
    render(<NumberField label="Bill" value="10" error="" min={0} onValueChange={() => {}} />)

    const input = screen.getByRole('textbox', { name: 'Bill' })
    expect(input).toHaveValue('10')
  })

  it('updates the value when the user types', async () => {
    const user = userEvent.setup()
    render(<Harness />)

    await user.type(screen.getByRole('textbox'), '42')
    expect(screen.getByRole('textbox')).toHaveValue('42')
  })

  it('steps the value with the arrow keys', async () => {
    const user = userEvent.setup()
    render(<Harness initial="5" />)

    const input = screen.getByRole('textbox')
    await user.click(input)
    await user.keyboard('{ArrowUp}')
    expect(input).toHaveValue('6')
    await user.keyboard('{ArrowDown}')
    expect(input).toHaveValue('5')
  })

  it('does not step below the minimum', async () => {
    const user = userEvent.setup()
    render(<Harness initial="0" />)

    const input = screen.getByRole('textbox')
    await user.click(input)
    await user.keyboard('{ArrowDown}')
    expect(input).toHaveValue('0')
  })

  it('does not step above the maximum', async () => {
    const user = userEvent.setup()
    render(<Harness initial="100" min={1} max={100} />)

    const input = screen.getByRole('textbox')
    await user.click(input)
    await user.keyboard('{ArrowUp}')
    expect(input).toHaveValue('100')
  })

  it('shows the error message and marks the input as invalid', () => {
    render(
      <NumberField
        label="Bill"
        value="abc"
        error="Bill amount must be a positive whole number."
        min={0}
        onValueChange={() => {}}
      />,
    )

    expect(screen.getByText('Bill amount must be a positive whole number.')).toBeInTheDocument()
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true')
  })

  it('does not render an error or mark the input invalid when valid', () => {
    const { container } = render(
      <NumberField label="Bill" value="10" error="" min={0} onValueChange={() => {}} />,
    )

    expect(container.querySelector('.field-error')).toBeNull()
    expect(screen.getByRole('textbox')).not.toHaveAttribute('aria-invalid')
  })
})