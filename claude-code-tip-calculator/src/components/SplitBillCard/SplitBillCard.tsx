import Card from '../Card/Card.tsx'
import NumberField from '../NumberField/NumberField.tsx'
import ResultRow from '../ResultRow/ResultRow.tsx'
import { MAX_PEOPLE } from '../../utils/validation.ts'

interface SplitBillCardProps {
  people: string
  peopleError: string
  tipPerPersonLabel: string
  totalPerPersonLabel: string
  onPeopleChange: (value: string) => void
}

function SplitBillCard({
  people,
  peopleError,
  tipPerPersonLabel,
  totalPerPersonLabel,
  onPeopleChange,
}: SplitBillCardProps) {
  return (
    <Card label="Split the bill">
      <details className="split">
        <summary>
          <h2>Split the Bill</h2>
        </summary>
        <div className="split-body">
          <NumberField
            label="Number of people"
            value={people}
            error={peopleError}
            min={1}
            max={MAX_PEOPLE}
            placeholder="1"
            onValueChange={onPeopleChange}
          />

          <ResultRow label="Tip per person" value={tipPerPersonLabel} />
          <ResultRow label="Total per person" value={totalPerPersonLabel} total />
        </div>
      </details>
    </Card>
  )
}

export default SplitBillCard