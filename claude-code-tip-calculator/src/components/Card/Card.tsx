import type { ReactNode } from 'react'

interface CardProps {
  label: string
  children: ReactNode
}

function Card({ label, children }: CardProps) {
  return (
    <section className="card" aria-label={label}>
      {children}
    </section>
  )
}

export default Card