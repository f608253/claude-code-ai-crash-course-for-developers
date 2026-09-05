interface ResultRowProps {
  label: string
  value: string
  total?: boolean
}

function ResultRow({ label, value, total = false }: ResultRowProps) {
  return (
    <div className={total ? 'result-row result-total' : 'result-row'}>
      <span>{label}</span>
      <span className="result-value">{value}</span>
    </div>
  )
}

export default ResultRow