import { useState } from 'react'

import './App.css'

import PageTitle from './components/PageTitle/PageTitle.tsx'
import SplitBillCard from './components/SplitBillCard/SplitBillCard.tsx'
import TipCalculatorCard from './components/TipCalculatorCard/TipCalculatorCard.tsx'
import { calculateTip } from './utils/calculator.ts'
import { formatCurrency } from './utils/money.ts'
import { validateBill, validatePeople, validateTip } from './utils/validation.ts'

function App() {
  const [bill, setBill] = useState('')
  const [tip, setTip] = useState('')
  const [people, setPeople] = useState('')

  const { billAmount, total, tipPercentLabel, tipPerPerson, totalPerPerson } =
    calculateTip(bill, tip, people)

  const billError = validateBill(bill)
  const tipError = validateTip(tip, billAmount)
  const peopleError = validatePeople(people)

  const reset = () => {
    setBill('')
    setTip('')
    setPeople('')
  }

  return (
    <main>
      <PageTitle />

      <TipCalculatorCard
        bill={bill}
        tip={tip}
        billError={billError}
        tipError={tipError}
        tipPercentLabel={tipPercentLabel}
        totalLabel={formatCurrency(total)}
        onBillChange={setBill}
        onTipChange={setTip}
        onReset={reset}
      />

      <SplitBillCard
        people={people}
        peopleError={peopleError}
        tipPerPersonLabel={formatCurrency(tipPerPerson)}
        totalPerPersonLabel={formatCurrency(totalPerPerson)}
        onPeopleChange={setPeople}
      />
    </main>
  )
}

export default App