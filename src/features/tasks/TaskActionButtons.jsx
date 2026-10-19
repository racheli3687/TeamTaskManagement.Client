import { CircleCheck, Hand, Pencil, RotateCcw, Trash2, Undo2 } from 'lucide-react'
import Button from '../../components/ui/Button'

// הכפתורים שמוצגים למשתמש לפי ההרשאות שלו על המשימה
export default function TaskActionButtons({ task, permissions, actions, onEdit, onDelete }) {
  const busy = actions.pendingTaskId === task.id
  const { canClaim, canComplete, canRelease, canReopen, canEdit, canDelete } = permissions

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {canClaim && (
        <Button variant="marker" size="sm" icon={Hand} loading={busy} onClick={() => actions.claim(task)}>
          תפיסת המשימה
        </Button>
      )}
      {canComplete && (
        <Button size="sm" icon={CircleCheck} disabled={busy} onClick={() => actions.complete(task)}>
          סיום
        </Button>
      )}
      {canRelease && (
        <Button variant="secondary" size="sm" icon={Undo2} disabled={busy} onClick={() => actions.release(task)}>
          שחרור
        </Button>
      )}
      {canReopen && (
        <Button variant="secondary" size="sm" icon={RotateCcw} disabled={busy} onClick={() => actions.reopen(task)}>
          פתיחה מחדש
        </Button>
      )}
      {canEdit && (
        <Button variant="ghost" size="icon" icon={Pencil} onClick={() => onEdit(task)} aria-label="עריכת המשימה" title="עריכה" />
      )}
      {canDelete && (
        <Button variant="ghost" size="icon" icon={Trash2} onClick={() => onDelete(task)} aria-label="מחיקת המשימה" title="מחיקה" />
      )}
    </div>
  )
}
