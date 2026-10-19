import { Link } from 'react-router'

// נתון אחד בלוח הבקרה, שמוביל לעמוד המתאים
export default function StatLink({ to, icon: Icon, label, value }) {
  return (
    <Link
      to={to}
      className="flex items-center gap-4 rounded-xl border border-line bg-surface p-4 transition hover:border-brand"
    >
      <span className="flex size-11 items-center justify-center rounded-lg bg-surface-2 text-ink-soft">
        <Icon className="size-5" aria-hidden />
      </span>
      <span>
        <span className="block font-display text-2xl leading-none font-bold tabular-nums">{value ?? '–'}</span>
        <span className="mt-1 block text-sm text-ink-soft">{label}</span>
      </span>
    </Link>
  )
}
