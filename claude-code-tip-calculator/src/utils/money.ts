const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

export function formatCurrency(amount: number): string {
  return currency.format(amount)
}

export function roundToCents(value: number): number {
  return Math.round(value * 100) / 100
}