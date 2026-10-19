import Button from '../../components/ui/Button'
import DialogActions from '../../components/ui/DialogActions'
import { PasswordField, TextField } from '../../components/ui/Field'
import FormError from '../../components/ui/FormError'
import Modal from '../../components/ui/Modal'
import { LIMITS } from '../../lib/constants'
import { readForm } from '../../lib/forms'
import { useAddMember } from './queries'

// משתמש חדש נוצר ישירות בצוות, בתפקיד חבר צוות. את פרטי הכניסה מעבירים לו בנפרד.
export default function AddMemberDialog({ open, onClose, team }) {
  const addMutation = useAddMember()
  const error = addMutation.error

  function handleClose() {
    addMutation.reset()
    onClose()
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title={`צירוף חבר ל${team.name}`}
      description="נוצר משתמש חדש בתפקיד חבר צוות. את שם המשתמש והסיסמה יש להעביר לו."
      size="sm"
    >
      <form onSubmit={(event) => addMutation.mutate({ teamId: team.id, ...readForm(event) }, { onSuccess: onClose })}>
        <div className="space-y-4">
          <FormError error={error} />
          <TextField
            label="שם משתמש"
            name="userName"
            required
            minLength={3}
            maxLength={LIMITS.userName}
            autoComplete="off"
            autoFocus
            dir="auto"
            error={error?.fieldError('userName')}
          />
          <PasswordField
            label="סיסמה ראשונית"
            name="password"
            required
            minLength={6}
            maxLength={LIMITS.password}
            autoComplete="new-password"
            hint="לפחות 6 תווים. החבר יוכל לשנות אותה בעמוד הפרופיל."
            error={error?.fieldError('password')}
          />
        </div>
        <DialogActions>
          <Button type="submit" loading={addMutation.isPending}>
            צירוף לצוות
          </Button>
          <Button variant="ghost" onClick={handleClose}>
            ביטול
          </Button>
        </DialogActions>
      </form>
    </Modal>
  )
}
