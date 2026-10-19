export default function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-dashed border-line px-6 py-14 text-center">
      {Icon && (
        <span className="mb-4 flex size-12 items-center justify-center rounded-xl bg-surface-2 text-ink-soft">
          <Icon className="size-6" aria-hidden />
        </span>
      )}
      <h2 className="font-display text-lg font-semibold">{title}</h2>
      {description && <p className="mt-1 max-w-sm text-sm text-ink-soft">{description}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  )
}
