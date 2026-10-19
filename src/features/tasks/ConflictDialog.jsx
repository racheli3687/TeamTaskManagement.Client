import { errorReference } from '../../api/client'
import Button from '../../components/ui/Button'
import DialogActions from '../../components/ui/DialogActions'
import Modal from '../../components/ui/Modal'

// 409 מהשרת: מישהו אחר שינה את המשימה בין הקריאה לשמירה. הרשימה כבר מתרעננת ברקע.
export default function ConflictDialog({ conflict, onClose }) {
  const reference = errorReference(conflict?.error)
  return (
    <Modal open={Boolean(conflict)} onClose={onClose} title={conflict?.title} size="sm">
      <div className="rounded-xl bg-marker-soft px-4 py-3 font-medium">{conflict?.error.message}</div>
      <p className="mt-4 leading-relaxed text-ink-soft">
        פעולה של משתמש אחר הקדימה את הפעולה שלך. הרשימה רועננה ומציגה עכשיו את המצב העדכני.
      </p>
      {reference && <p className="mt-3 text-xs text-ink-soft">{reference}</p>}
      <DialogActions>
        <Button onClick={onClose}>
          הבנתי, להמשיך
        </Button>
      </DialogActions>
    </Modal>
  )
}
