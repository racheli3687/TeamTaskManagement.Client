import { CalendarDays, CircleDashed } from 'lucide-react'
import Avatar from '../../components/ui/Avatar'
import { cn } from '../../lib/cn'
import { formatDueDate, isOverdue } from '../../lib/format'

export function DueDate({ task }) {
  if (!task.dueDate) return <span className="text-xs text-ink-soft">ללא תאריך יעד</span>
  const overdue = isOverdue(task)
  return (
    <span className={cn('inline-flex items-center gap-1 text-xs', overdue ? 'font-semibold text-danger' : 'text-ink-soft')}>
      <CalendarDays className="size-3.5" aria-hidden />
      {overdue && 'באיחור, '}
      {formatDueDate(task.dueDate)}
    </span>
  )
}

// המחזיק במשימה מסומן במרקר: זה מה שהמשאב המוגבל מגן עליו
export function Assignee({ task }) {
  if (!task.assignedUserName) {
    return (
      <span className="inline-flex items-center gap-1.5 text-sm text-ink-soft">
        <CircleDashed className="size-4" aria-hidden />
        פנויה לתפיסה
      </span>
    )
  }
  return (
    <span className="inline-flex min-w-0 items-center gap-2 text-sm">
      <Avatar name={task.assignedUserName} size="sm" />
      <span className="marker-highlight truncate font-semibold" dir="auto">
        {task.assignedUserName}
      </span>
    </span>
  )
}
