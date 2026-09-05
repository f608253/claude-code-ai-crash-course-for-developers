import { isDigitsOnly } from './numbers.ts'

export const MAX_PEOPLE = 100

/** Returns an error message for the Bill field, or '' when valid. */
export function validateBill(bill: string): string {
  if (bill === '') return ''
  if (!isDigitsOnly(bill)) {
    return bill.startsWith('-')
      ? 'Bill amount cannot be less than 0.'
      : 'Bill amount must be a positive whole number.'
  }
  return ''
}

/** Returns an error message for the Tip Amount field, or '' when valid. */
export function validateTip(tip: string, billAmount: number): string {
  if (tip === '') return ''
  if (!isDigitsOnly(tip)) {
    return tip.startsWith('-')
      ? 'Tip amount cannot be less than 0.'
      : 'Tip amount must be a positive whole number.'
  }
  if (billAmount > 0 && parseInt(tip, 10) > billAmount) {
    return 'Tip amount cannot exceed the bill amount.'
  }
  return ''
}

/** Returns an error message for the Number of people field, or '' when valid. */
export function validatePeople(people: string): string {
  if (people === '') return ''
  if (!isDigitsOnly(people)) {
    return 'Number of people must be a positive whole number.'
  }
  const count = parseInt(people, 10)
  if (count < 1) return 'Number of people must be at least 1.'
  if (count > MAX_PEOPLE) {
    return `Split is limited to ${MAX_PEOPLE} people.`
  }
  return ''
}