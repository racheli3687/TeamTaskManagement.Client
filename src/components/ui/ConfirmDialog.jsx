import Button from './Button'
import DialogActions from './DialogActions'
import Modal from './Modal'

export default function ConfirmDialog({ open, onClose, onConfirm, title, message, confirmLabel, loading }) {
  return (
    <Modal open={open} onClose={onClose} title={title} size="sm">
      <p className="leading-relaxed text-ink-soft">{message}</p>
      <DialogActions>
        <Button variant="danger" onClick={onConfirm} loading={loading}>
          {confirmLabel}
        </Button>
        <Button variant="ghost" onClick={onClose}>
          ביטול
        </Button>
      </DialogActions>
    </Modal>
  )
}
