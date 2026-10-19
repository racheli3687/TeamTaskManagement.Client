import { Link } from 'react-router'

export default function BrandMark() {
  return (
    <Link to="/" className="flex items-center gap-2.5">
      <svg viewBox="0 0 32 32" className="size-9" aria-hidden>
        <rect width="32" height="32" rx="8" fill="var(--brand)" />
        <rect x="7" y="7" width="18" height="18" rx="4" fill="none" stroke="var(--on-brand)" strokeWidth="2.5" />
        <path d="M11.5 16.5l3.2 3.2 6-7" fill="none" stroke="var(--marker)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="font-display text-lg leading-tight font-bold">
        משימות
        <span className="block text-xs font-medium text-ink-soft">ניהול צוותים</span>
      </span>
    </Link>
  )
}
