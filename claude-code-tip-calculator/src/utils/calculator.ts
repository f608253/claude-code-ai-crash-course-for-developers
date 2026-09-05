import { isDigitsOnly } from './numbers.ts'
import { roundToCents } from './money.ts'

export interface TipCalculation {
  billAmount: number
  tipAmount: number
  total: number
  tipPercent: number
  tipPercentLabel: string
  peopleCount: number
  tipPerPerson: number
  totalPerPerson: number
}

export function calculateTip(bill: string, tip: string, people: string): TipCalculation {
  const billAmount = isDigitsOnly(bill) ? parseInt(bill, 10) : 0
  const tipAmount = isDigitsOnly(tip) ? parseInt(tip, 10) : 0
  const total = roundToCents(billAmount + tipAmount)

  const tipPercent = billAmount > 0 ? (tipAmount / billAmount) * 100 : 0
  const tipPercentLabel = `${
    Number.isInteger(tipPercent) ? tipPercent : tipPercent.toFixed(1)
  }%`

  const peopleCount = parseInt(people, 10) || 1
  const tipPerPerson = roundToCents(tipAmount / peopleCount)
  const totalPerPerson = roundToCents(total / peopleCount)

  return {
    billAmount,
    tipAmount,
    total,
    tipPercent,
    tipPercentLabel,
    peopleCount,
    tipPerPerson,
    totalPerPerson,
  }
}