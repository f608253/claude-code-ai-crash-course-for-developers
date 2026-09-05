import { describe, expect, it } from 'vitest'

import { calculateTip } from './calculator.ts'

describe('calculateTip', () => {
  it('returns all-zero defaults for empty inputs', () => {
    const result = calculateTip('', '', '')

    expect(result.billAmount).toBe(0)
    expect(result.tipAmount).toBe(0)
    expect(result.total).toBe(0)
    expect(result.tipPercentLabel).toBe('0%')
    expect(result.peopleCount).toBe(1)
    expect(result.tipPerPerson).toBe(0)
    expect(result.totalPerPerson).toBe(0)
  })

  it('computes the total and tip percentage from bill and tip', () => {
    const result = calculateTip('100', '20', '')

    expect(result.billAmount).toBe(100)
    expect(result.tipAmount).toBe(20)
    expect(result.total).toBe(120)
    expect(result.tipPercentLabel).toBe('20%')
  })

  it('shows 100% when the tip equals the bill', () => {
    expect(calculateTip('100', '100', '').tipPercentLabel).toBe('100%')
  })

  it('formats non-whole percentages to one decimal', () => {
    expect(calculateTip('67', '20', '').tipPercentLabel).toBe('29.9%')
  })

  it('treats invalid bill text as zero', () => {
    const result = calculateTip('abc', '25', '')

    expect(result.billAmount).toBe(0)
    expect(result.tipAmount).toBe(25)
    expect(result.total).toBe(25)
  })

  it('defaults people to 1 when empty', () => {
    const result = calculateTip('100', '20', '')

    expect(result.peopleCount).toBe(1)
    expect(result.tipPerPerson).toBe(20)
    expect(result.totalPerPerson).toBe(120)
  })

  it('splits rounded per-person amounts', () => {
    const result = calculateTip('100', '20', '3')

    expect(result.peopleCount).toBe(3)
    expect(result.tipPerPerson).toBe(6.67) // 20 / 3 rounded to cents
    expect(result.totalPerPerson).toBe(40) // 120 / 3
  })

  it('handles uneven per-person totals', () => {
    expect(calculateTip('100', '20', '7').totalPerPerson).toBe(17.14) // 120 / 7
  })
})