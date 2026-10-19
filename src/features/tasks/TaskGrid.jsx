import { useState } from 'react'
import { useAuth } from '../../auth/useAuth'
import ConfirmDialog from '../../components/ui/ConfirmDialog'
import { getTaskPermissions } from '../../lib/permissions'
import ConflictDialog from './ConflictDialog'
import TaskCard from './TaskCard'
import TaskDetailsDialog from './TaskDetailsDialog'
import TaskFormDialog from './TaskFormDialog'
import { useTaskActions } from './useTaskActions'

// רשת משימות עם כל האינטראקציות: פרטים, עריכה, מחיקה, תפיסה, שחרור, סטטוס וחלון ההתנגשות.
// משמשת גם את דפי המשימות וגם את לוחות הבקרה, כך שההתנהגות זהה בכל מקום.
export default function TaskGrid({ tasks, emptyState }) {
  const { user } = useAuth()
  const actions = useTaskActions()
  const [openTaskId, setOpenTaskId] = useState(null)
  const [editingTask, setEditingTask] = useState(null)
  const [deletingTask, setDeletingTask] = useState(null)

  const getPermissions = (task) => getTaskPermissions(task, user)

  // מעבר מחלון הפרטים לעריכה או למחיקה: חלון אחד פתוח בכל רגע
  const startEdit = (task) => {
    setOpenTaskId(null)
    setEditingTask(task)
  }
  const startDelete = (task) => {
    setOpenTaskId(null)
    setDeletingTask(task)
  }

  return (
    <>
      {tasks.length === 0 ? (
        emptyState
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {tasks.map((task) => (
            <li key={task.id}>
              <TaskCard
                task={task}
                permissions={getPermissions(task)}
                actions={actions}
                onOpen={() => setOpenTaskId(task.id)}
                onEdit={startEdit}
                onDelete={startDelete}
              />
            </li>
          ))}
        </ul>
      )}

      <TaskDetailsDialog
        taskId={openTaskId}
        onClose={() => setOpenTaskId(null)}
        getPermissions={getPermissions}
        actions={actions}
        onEdit={startEdit}
        onDelete={startDelete}
      />
      <TaskFormDialog open={Boolean(editingTask)} task={editingTask} onClose={() => setEditingTask(null)} />
      <ConfirmDialog
        open={Boolean(deletingTask)}
        onClose={() => setDeletingTask(null)}
        onConfirm={() => actions.remove(deletingTask, { onSettled: () => setDeletingTask(null) })}
        loading={actions.isDeleting}
        title="מחיקת המשימה"
        message={`המשימה "${deletingTask?.title}" תימחק לצמיתות, כולל היסטוריית השיוכים שלה.`}
        confirmLabel="מחיקה"
      />
      <ConflictDialog conflict={actions.conflict} onClose={actions.closeConflict} />
    </>
  )
}
