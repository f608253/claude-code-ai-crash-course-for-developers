import { describe, expect, it } from 'vitest'

import { formatCurrency, roundToCents } from './money.ts'

describe('formatCurrency', () => {
  it('formats whole amounts as USD', () => {
    expect(formatCurrency(0)).toBe('$0.00')
    expect(formatCurrency(120)).toBe('$120.00')
  })

  it('includes thousands separators', () => {
    expect(formatCurrency(1234.5)).toBe('$1,234.50')
  })
})

describe('roundToCents', () => {
  it('rounds repeating decimals to the nearest cent', () => {
    expect(roundToCents(20 / 3)).toBe(6.67)
    expect(roundToCents(120 / 7)).toBe(17.14)
  })

  it('leaves whole amounts unchanged', () => {
    expect(roundToCents(10)).toBe(10)
  })

  it('cleans up floating point drift', () => {
    expect(roundToCents(0.1 + 0.2)).toBe(0.3)
  })
})