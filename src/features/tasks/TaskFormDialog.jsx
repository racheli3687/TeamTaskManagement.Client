import Button from '../../components/ui/Button'
import DialogActions from '../../components/ui/DialogActions'
import { TextAreaField, TextField } from '../../components/ui/Field'
import FormError from '../../components/ui/FormError'
import Modal from '../../components/ui/Modal'
import { LIMITS } from '../../lib/constants'
import { fromDateInput, toDateInput, todayIsoDate } from '../../lib/format'
import { readForm } from '../../lib/forms'
import { useCreateTask, useUpdateTask } from './queries'

// יצירה (task חסר) או עריכה של משימה. ביצירה תאריך היעד לא יכול להיות בעבר; בעריכה מותר.
export default function TaskFormDialog({ open, onClose, teamId, task }) {
  const isEdit = Boolean(task)
  const createMutation = useCreateTask()
  const updateMutation = useUpdateTask()
  const mutation = isEdit ? updateMutation : createMutation
  const error = mutation.error

  function handleSubmit(event) {
    const { title, description, dueDate } = readForm(event)
    const body = { title, description: description || null, dueDate: fromDateInput(dueDate) }
    const options = { onSuccess: onClose }
    if (isEdit) updateMutation.mutate({ taskId: task.id, ...body }, options)
    else createMutation.mutate({ teamId, ...body }, options)
  }

  function handleClose() {
    mutation.reset()
    onClose()
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title={isEdit ? 'עריכת משימה' : 'משימה חדשה'}
      description={isEdit ? 'הסטטוס והשיוך לא משתנים בעריכה.' : 'המשימה תיפתח לתפיסה מיד לכל חברי הצוות.'}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormError error={error} />
        <TextField
          label="כותרת"
          name="title"
          defaultValue={task?.title}
          required
          minLength={2}
          maxLength={LIMITS.title}
          autoFocus
          dir="auto"
          error={error?.fieldError('title')}
        />
        <TextAreaField
          label="תיאור"
          name="description"
          defaultValue={task?.description ?? ''}
          maxLength={LIMITS.description}
          dir="auto"
          error={error?.fieldError('description')}
        />
        <TextField
          label="תאריך יעד"
          name="dueDate"
          type="date"
          defaultValue={toDateInput(task?.dueDate)}
          min={isEdit ? undefined : todayIsoDate()}
          hint="אופציונלי."
          error={error?.fieldError('dueDate')}
        />
        <DialogActions>
          <Button type="submit" loading={mutation.isPending}>
            {isEdit ? 'שמירת השינויים' : 'יצירת המשימה'}
          </Button>
          <Button variant="ghost" onClick={handleClose}>
            ביטול
          </Button>
        </DialogActions>
      </form>
    </Modal>
  )
}
