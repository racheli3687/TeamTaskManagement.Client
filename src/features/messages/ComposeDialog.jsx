import { useState } from 'react'
import { useAuth } from '../../auth/useAuth'
import Button from '../../components/ui/Button'
import DialogActions from '../../components/ui/DialogActions'
import { SelectField, TextAreaField, TextField } from '../../components/ui/Field'
import FormError from '../../components/ui/FormError'
import Modal from '../../components/ui/Modal'
import { LIMITS } from '../../lib/constants'
import { readForm } from '../../lib/forms'
import DirectoryOptions from '../teams/DirectoryOptions'
import { useDirectory } from '../teams/queries'
import { useSendMessage } from './queries'

const BY_ID = 'by-id'

// הטופס נטען מחדש בכל פתיחה (Modal מרנדר את התוכן רק כשהוא פתוח), ולכן מתחיל נקי
function ComposeForm({ replyTo, onSent, onCancel }) {
  const { user } = useAuth()
  const { data: directory = [] } = useDirectory()
  const sendMutation = useSendMessage()
  const [recipient, setRecipient] = useState(replyTo ? String(replyTo.id) : '')
  const error = sendMutation.error

  const replyToListed = replyTo && directory.some(({ members }) => members.some((member) => member.id === replyTo.id))

  function handleSubmit(event) {
    const { recipientId, manualId, text } = readForm(event)
    const id = Number(recipientId === BY_ID ? manualId : recipientId)
    sendMutation.mutate({ recipientId: id, text }, { onSuccess: onSent })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-4">
        <FormError error={error} />
        <SelectField
          label="אל"
          name="recipientId"
          required
          value={recipient}
          onChange={(event) => setRecipient(event.target.value)}
          error={error?.fieldError('recipientId')}
        >
          <option value="" disabled>
            בחירת נמען
          </option>
          {replyTo && !replyToListed && <option value={replyTo.id}>{replyTo.userName}</option>}
          <DirectoryOptions directory={directory} include={(member) => member.id !== user.id} />
          <option value={BY_ID}>לפי מספר משתמש…</option>
        </SelectField>
        {recipient === BY_ID && (
          <TextField
            label="מספר משתמש"
            name="manualId"
            type="number"
            min={1}
            required
            inputMode="numeric"
            hint="המספר מופיע בעמוד הפרופיל של כל משתמש."
          />
        )}
        <TextAreaField
          label="תוכן ההודעה"
          name="text"
          required
          maxLength={LIMITS.message}
          autoFocus={Boolean(replyTo)}
          dir="auto"
          error={error?.fieldError('text')}
        />
      </div>
      <DialogActions>
        <Button type="submit" loading={sendMutation.isPending}>
          שליחה
        </Button>
        <Button variant="ghost" onClick={onCancel}>
          ביטול
        </Button>
      </DialogActions>
    </form>
  )
}

// הנמענים: אנשי הצוותים שהמשתמש רואה, או לפי מספר משתמש (כך חבר צוות יכול לכתוב למנהל,
// שאינו חבר באף צוות). השרת בודק מי רשאי לכתוב למי. replyTo: { id, userName } בתשובה להודעה.
export default function ComposeDialog({ open, onClose, replyTo }) {
  return (
    <Modal open={open} onClose={onClose} title={replyTo ? `תשובה ל-${replyTo.userName}` : 'הודעה חדשה'}>
      <ComposeForm replyTo={replyTo} onSent={onClose} onCancel={onClose} />
    </Modal>
  )
}
