import { StatusBadge } from '../../components/ui/Badge'
import Modal from '../../components/ui/Modal'
import QueryView from '../../components/ui/QueryView'
import Skeleton from '../../components/ui/Skeleton'
import { formatDateTime } from '../../lib/format'
import { useTask } from './queries'
import TaskActionButtons from './TaskActionButtons'
import { Assignee, DueDate } from './TaskMeta'

function Detail({ label, children }) {
  return (
    <div>
      <dt className="text-xs text-ink-soft">{label}</dt>
      <dd className="mt-1">{children}</dd>
    </div>
  )
}

// פרטי משימה טריים מהשרת (GET api/tasks/{id}), עם אותן פעולות כמו בכרטיס
export default function TaskDetailsDialog({ taskId, onClose, getPermissions, actions, onEdit, onDelete }) {
  const taskQuery = useTask(taskId)

  return (
    <Modal open={taskId != null} onClose={onClose} title="פרטי המשימה" size="lg">
      <QueryView query={taskQuery} skeleton={<Skeleton className="h-56" />}>
        {(task) => (
          <div className="space-y-6">
            <div>
              <StatusBadge status={task.status} />
              <h3 className="mt-3 font-display text-2xl font-bold text-balance" dir="auto">
                {task.title}
              </h3>
              <p className="mt-3 leading-relaxed whitespace-pre-wrap text-ink-soft" dir="auto">
                {task.description || 'אין תיאור למשימה.'}
              </p>
            </div>

            <dl className="grid gap-4 rounded-xl bg-surface-2 p-4 sm:grid-cols-3">
              <Detail label="מחזיק במשימה">
                <Assignee task={task} />
              </Detail>
              <Detail label="תאריך יעד">
                <DueDate task={task} />
              </Detail>
              <Detail label="נוצרה">
                <span className="text-sm">{formatDateTime(task.createdAt)}</span>
              </Detail>
            </dl>

            <TaskActionButtons
              task={task}
              permissions={getPermissions(task)}
              actions={actions}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          </div>
        )}
      </QueryView>
    </Modal>
  )
}
