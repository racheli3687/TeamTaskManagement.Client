import Button from '../../components/ui/Button'
import DialogActions from '../../components/ui/DialogActions'
import { SelectField } from '../../components/ui/Field'
import FormError from '../../components/ui/FormError'
import Modal from '../../components/ui/Modal'
import QueryView from '../../components/ui/QueryView'
import Skeleton from '../../components/ui/Skeleton'
import { ROLES } from '../../lib/constants'
import { readForm } from '../../lib/forms'
import DirectoryOptions from './DirectoryOptions'
import { useAssignTeamLead, useDirectory } from './queries'

// מינוי ראש צוות מכל צוות בחברה. מי שעובר מצוות אחר: המשימות הפעילות שלו שם משתחררות.
// ראש הצוות הקודם חוזר להיות חבר צוות.
export default function AssignLeadDialog({ open, onClose, team }) {
  const directoryQuery = useDirectory()
  const assignMutation = useAssignTeamLead()

  function handleClose() {
    assignMutation.reset()
    onClose()
  }

  function handleSubmit(event) {
    const { userId } = readForm(event)
    assignMutation.mutate({ teamId: team.id, userId: Number(userId) }, { onSuccess: onClose })
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title={`מינוי ראש צוות ל${team.name}`}
      description="ראש הצוות הנוכחי, אם יש, יחזור להיות חבר בצוות."
      size="sm"
    >
      <QueryView query={directoryQuery} skeleton={<Skeleton className="h-24" />}>
        {(directory) => (
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <FormError error={assignMutation.error} />
              <SelectField label="משתמש" name="userId" required defaultValue="" hint="משתמש מצוות אחר יועבר לצוות הזה.">
                <option value="" disabled>
                  בחירת משתמש
                </option>
                <DirectoryOptions
                  directory={directory}
                  include={(member) => !(member.role === ROLES.TeamLead && member.teamId === team.id)}
                />
              </SelectField>
            </div>
            <DialogActions>
              <Button type="submit" loading={assignMutation.isPending}>
                מינוי
              </Button>
              <Button variant="ghost" onClick={handleClose}>
                ביטול
              </Button>
            </DialogActions>
          </form>
        )}
      </QueryView>
    </Modal>
  )
}
