import Button from '../../components/ui/Button'
import DialogActions from '../../components/ui/DialogActions'
import { TextField } from '../../components/ui/Field'
import FormError from '../../components/ui/FormError'
import Modal from '../../components/ui/Modal'
import { LIMITS } from '../../lib/constants'
import { readForm } from '../../lib/forms'
import { useCreateTeam, useRenameTeam } from './queries'

// יצירת צוות (team חסר) או שינוי שם
export default function TeamFormDialog({ open, onClose, team }) {
  const isRename = Boolean(team)
  const createMutation = useCreateTeam()
  const renameMutation = useRenameTeam()
  const mutation = isRename ? renameMutation : createMutation
  const error = mutation.error

  function handleSubmit(event) {
    const { name } = readForm(event)
    const options = { onSuccess: onClose }
    if (isRename) renameMutation.mutate({ teamId: team.id, name }, options)
    else createMutation.mutate({ name }, options)
  }

  function handleClose() {
    mutation.reset()
    onClose()
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title={isRename ? 'שינוי שם הצוות' : 'צוות חדש'}
      description={isRename ? undefined : 'אחרי היצירה אפשר לצרף חברים ולמנות ראש צוות.'}
      size="sm"
    >
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <FormError error={error} />
          <TextField
            label="שם הצוות"
            name="name"
            defaultValue={team?.name}
            required
            minLength={2}
            maxLength={LIMITS.teamName}
            autoFocus
            dir="auto"
            hint="ייחודי בתוך החברה."
            error={error?.fieldError('name')}
          />
        </div>
        <DialogActions>
          <Button type="submit" loading={mutation.isPending}>
            {isRename ? 'שמירה' : 'יצירת הצוות'}
          </Button>
          <Button variant="ghost" onClick={handleClose}>
            ביטול
          </Button>
        </DialogActions>
      </form>
    </Modal>
  )
}
