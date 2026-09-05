import Card from '../Card/Card.tsx'
import NumberField from '../NumberField/NumberField.tsx'
import ResultRow from '../ResultRow/ResultRow.tsx'

interface TipCalculatorCardProps {
  bill: string
  tip: string
  billError: string
  tipError: string
  tipPercentLabel: string
  totalLabel: string
  onBillChange: (value: string) => void
  onTipChange: (value: string) => void
  onReset: () => void
}

function TipCalculatorCard({
  bill,
  tip,
  billError,
  tipError,
  tipPercentLabel,
  totalLabel,
  onBillChange,
  onTipChange,
  onReset,
}: TipCalculatorCardProps) {
  return (
    <Card label="Tip calculator">
      <h2>Tip Calculator</h2>

      <div className="field-row">
        <NumberField
          label="Bill"
          value={bill}
          error={billError}
          min={0}
          placeholder="0"
          onValueChange={onBillChange}
        />

        <NumberField
          label="Tip Amount"
          value={tip}
          error={tipError}
          min={0}
          placeholder="0"
          onValueChange={onTipChange}
        />
      </div>

      <ResultRow label="Tip Percentage" value={tipPercentLabel} />
      <ResultRow label="Total" value={totalLabel} total />

      <button type="button" className="reset-btn" onClick={onReset}>
        Reset
      </button>
    </Card>
  )
}

export default TipCalculatorCard