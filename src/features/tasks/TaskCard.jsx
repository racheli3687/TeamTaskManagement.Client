import { StatusBadge } from '../../components/ui/Badge'
import { cn } from '../../lib/cn'
import TaskActionButtons from './TaskActionButtons'
import { Assignee, DueDate } from './TaskMeta'

const STRIPES = { Open: 'bg-brand', InProgress: 'bg-marker', Done: 'bg-done' }

export default function TaskCard({ task, permissions, actions, onOpen, onEdit, onDelete }) {
  return (
    <article
      className={cn(
        'relative flex h-full flex-col rounded-xl border border-line bg-surface p-4 ps-5 transition hover:border-ink-soft/40',
        actions.claimedTaskId === task.id && 'animate-claim',
        task.status === 'Done' && 'bg-surface/70',
      )}
    >
      <span className={cn('absolute inset-y-4 start-0 w-1 rounded-e-full', STRIPES[task.status])} aria-hidden />

      <div className="flex items-center justify-between gap-2">
        <StatusBadge status={task.status} />
        <DueDate task={task} />
      </div>

      <h3 className="mt-3 font-display text-lg leading-snug font-semibold">
        <button type="button" onClick={() => onOpen(task)} className="text-start hover:text-brand" dir="auto">
          {task.title}
        </button>
      </h3>
      {task.description && (
        <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-ink-soft" dir="auto">
          {task.description}
        </p>
      )}

      <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-4">
        <Assignee task={task} />
        <TaskActionButtons task={task} permissions={permissions} actions={actions} onEdit={onEdit} onDelete={onDelete} />
      </div>
    </article>
  )
}
