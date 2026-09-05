import { stepValue } from '../../utils/numbers.ts'

interface NumberFieldProps {
  label: string
  value: string
  error: string
  min: number
  max?: number
  placeholder?: string
  onValueChange: (value: string) => void
}

function NumberField({
  label,
  value,
  error,
  min,
  max,
  placeholder,
  onValueChange,
}: NumberFieldProps) {
  const step = (delta: number) => onValueChange(stepValue(value, delta, min, max))

  return (
    <label className="field">
      <span className="field-label">{label}</span>
      <input
        className="field-input"
        type="text"
        inputMode="numeric"
        placeholder={placeholder}
        value={value}
        aria-invalid={error !== '' ? true : undefined}
        onKeyDown={(event) => {
          if (event.key === 'ArrowUp') {
            event.preventDefault()
            step(1)
          } else if (event.key === 'ArrowDown') {
            event.preventDefault()
            step(-1)
          }
        }}
        onChange={(event) => onValueChange(event.target.value)}
      />
      {error !== '' && <span className="field-error">{error}</span>}
    </label>
  )
}

export default NumberField