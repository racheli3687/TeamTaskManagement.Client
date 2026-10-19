import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router'

export default function PageHeader({ title, description, actions, back }) {
  return (
    <header className="mb-8">
      {back && (
        <Link to={back.to} className="mb-3 inline-flex items-center gap-1.5 text-sm text-ink-soft hover:text-ink">
          <ArrowRight className="size-4" aria-hidden />
          {back.label}
        </Link>
      )}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="min-w-0">
          <h1 className="font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl">{title}</h1>
          {description && <p className="mt-2 max-w-2xl text-ink-soft">{description}</p>}
        </div>
        {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
      </div>
    </header>
  )
}
