import { describe, expect, it } from 'vitest'

import { isDigitsOnly, stepValue } from './numbers.ts'

describe('isDigitsOnly', () => {
  it('accepts non-negative whole numbers', () => {
    expect(isDigitsOnly('0')).toBe(true)
    expect(isDigitsOnly('100')).toBe(true)
    expect(isDigitsOnly('007')).toBe(true)
  })

  it('rejects empty, decimals, signs, letters, and symbols', () => {
    expect(isDigitsOnly('')).toBe(false)
    expect(isDigitsOnly('1.5')).toBe(false)
    expect(isDigitsOnly('-5')).toBe(false)
    expect(isDigitsOnly('abc')).toBe(false)
    expect(isDigitsOnly('12$')).toBe(false)
    expect(isDigitsOnly(' ')).toBe(false)
  })
})

describe('stepValue', () => {
  it('steps up and down by the delta', () => {
    expect(stepValue('45', 1, 0)).toBe('46')
    expect(stepValue('45', -1, 0)).toBe('44')
  })

  it('clamps at the minimum', () => {
    expect(stepValue('0', -1, 0)).toBe('0')
    expect(stepValue('1', -1, 1)).toBe('1')
  })

  it('clamps at the maximum when provided', () => {
    expect(stepValue('100', 1, 1, 100)).toBe('100')
  })

  it('treats empty or invalid values as the minimum', () => {
    expect(stepValue('', 1, 0)).toBe('1')
    expect(stepValue('', -1, 0)).toBe('0')
    expect(stepValue('abc', 1, 0)).toBe('1')
  })
})