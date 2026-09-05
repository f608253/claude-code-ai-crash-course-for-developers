import { describe, expect, it } from 'vitest'

import { MAX_PEOPLE, validateBill, validatePeople, validateTip } from './validation.ts'

describe('validateBill', () => {
  it('returns no error for empty or valid amounts', () => {
    expect(validateBill('')).toBe('')
    expect(validateBill('0')).toBe('')
    expect(validateBill('120')).toBe('')
  })

  it('rejects negative values', () => {
    expect(validateBill('-5')).toBe('Bill amount cannot be less than 0.')
  })

  it('rejects non-whole amounts', () => {
    expect(validateBill('abc')).toBe('Bill amount must be a positive whole number.')
    expect(validateBill('20.5')).toBe('Bill amount must be a positive whole number.')
    expect(validateBill('20$')).toBe('Bill amount must be a positive whole number.')
  })
})

describe('validateTip', () => {
  it('returns no error for empty or valid tips', () => {
    expect(validateTip('', 0)).toBe('')
    expect(validateTip('20', 100)).toBe('')
    expect(validateTip('0', 100)).toBe('')
    expect(validateTip('100', 100)).toBe('')
  })

  it('rejects tips that exceed the bill', () => {
    expect(validateTip('25', 20)).toBe('Tip amount cannot exceed the bill amount.')
  })

  it('does not compare when the bill is zero', () => {
    expect(validateTip('50', 0)).toBe('')
  })

  it('rejects non-whole tips', () => {
    expect(validateTip('abc', 0)).toBe('Tip amount must be a positive whole number.')
    expect(validateTip('-5', 0)).toBe('Tip amount cannot be less than 0.')
  })
})

describe('validatePeople', () => {
  it('returns no error for empty or valid counts', () => {
    expect(validatePeople('')).toBe('')
    expect(validatePeople('1')).toBe('')
    expect(validatePeople(String(MAX_PEOPLE))).toBe('')
  })

  it('rejects fewer than one person', () => {
    expect(validatePeople('0')).toBe('Number of people must be at least 1.')
  })

  it('rejects counts above the limit', () => {
    expect(validatePeople(String(MAX_PEOPLE + 1))).toBe(
      `Split is limited to ${MAX_PEOPLE} people.`,
    )
  })

  it('rejects non-whole counts', () => {
    expect(validatePeople('2.5')).toBe('Number of people must be a positive whole number.')
    expect(validatePeople('abc')).toBe('Number of people must be a positive whole number.')
  })
})