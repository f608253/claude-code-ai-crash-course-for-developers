const digitRegExp = /^\d+$/

/** True if the value contains only digits (an empty string is false). */
export function isDigitsOnly(value: string): boolean {
  return digitRegExp.test(value)
}

/**
 * Clamped arrow-key stepping for numeric inputs.
 * Empty or invalid values are treated as `min`, so the first step always lands on a valid number.
 */
export function stepValue(current: string, delta: number, min: number, max?: number): string {
  const parsed = parseInt(current, 10)
  const base = current === '' || Number.isNaN(parsed) ? min : parsed
  const next = Math.max(min, base + delta)
  return String(max === undefined ? next : Math.min(max, next))
}