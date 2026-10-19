import { ROLE_LABELS, TASK_STATUS_LABELS } from '../../lib/constants'
import { cn } from '../../lib/cn'

const STATUS_TONES = {
  Open: 'bg-brand-soft text-brand',
  InProgress: 'bg-marker-soft text-ink',
  Done: 'bg-done-soft text-done',
}

const STATUS_DOTS = { Open: 'bg-brand', InProgress: 'bg-marker', Done: 'bg-done' }

const ROLE_TONES = {
  Manager: 'bg-ink text-canvas',
  TeamLead: 'bg-brand-soft text-brand',
  Member: 'bg-surface-2 text-ink-soft',
}

function Badge({ className, children }) {
  return (
    <span className={cn('inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold', className)}>
      {children}
    </span>
  )
}

export function StatusBadge({ status }) {
  return (
    <Badge className={STATUS_TONES[status]}>
      <span className={cn('size-1.5 rounded-full', STATUS_DOTS[status])} aria-hidden />
      {TASK_STATUS_LABELS[status]}
    </Badge>
  )
}

export function RoleBadge({ role }) {
  return <Badge className={ROLE_TONES[role]}>{ROLE_LABELS[role]}</Badge>
}

export function CountBadge({ count }) {
  if (!count) return null
  return (
    <span className="min-w-5 rounded-full bg-marker px-1.5 text-center text-xs leading-5 font-bold text-[#18202e] tabular-nums">
      {count > 99 ? '99+' : count}
    </span>
  )
}
