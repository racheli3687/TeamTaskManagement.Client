import { cn } from '../../lib/cn'

// משטח תוכן עם כותרת אופציונלית ופעולות בצד
export default function Panel({ title, description, actions, className, children }) {
  return (
    <section className={cn('rounded-2xl border border-line bg-surface p-5 sm:p-6', className)}>
      {(title || actions) && (
        <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
          <div>
            {title && <h2 className="font-display text-lg font-semibold">{title}</h2>}
            {description && <p className="mt-0.5 text-sm text-ink-soft">{description}</p>}
          </div>
          {actions}
        </div>
      )}
      {children}
    </section>
  )
}
