import { Crown, ListTodo, Pencil, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { useAuth } from '../../auth/useAuth'
import Button from '../../components/ui/Button'
import ButtonLink from '../../components/ui/ButtonLink'
import ConfirmDialog from '../../components/ui/ConfirmDialog'
import PageHeader from '../../components/ui/PageHeader'
import QueryView from '../../components/ui/QueryView'
import Skeleton from '../../components/ui/Skeleton'
import { ROLES } from '../../lib/constants'
import TeamTaskSummary from '../dashboard/TeamTaskSummary'
import AssignLeadDialog from './AssignLeadDialog'
import MembersPanel from './MembersPanel'
import { useDeleteTeam, useTeam } from './queries'
import TeamFormDialog from './TeamFormDialog'

export default function TeamPage() {
  const teamId = Number(useParams().teamId)
  const { user } = useAuth()
  const navigate = useNavigate()
  const teamQuery = useTeam(teamId)
  const deleteMutation = useDeleteTeam()
  const [dialog, setDialog] = useState(null)
  const closeDialog = () => setDialog(null)
  const isManager = user.role === ROLES.Manager

  return (
    <QueryView query={teamQuery} skeleton={<Skeleton className="h-96" />}>
      {(team) => (
        <>
          <PageHeader
            title={team.name}
            description={team.membersCount === 1 ? 'חבר אחד בצוות' : `${team.membersCount} חברים בצוות`}
            back={isManager ? { to: '/teams', label: 'כל הצוותים' } : undefined}
            actions={
              <>
                <ButtonLink to={`/teams/${team.id}/tasks`} icon={ListTodo}>
                  לוח המשימות
                </ButtonLink>
                {isManager && (
                  <>
                    <Button variant="secondary" icon={Crown} onClick={() => setDialog('lead')}>
                      מינוי ראש צוות
                    </Button>
                    <Button variant="secondary" icon={Pencil} onClick={() => setDialog('rename')}>
                      שינוי שם
                    </Button>
                    <Button variant="danger" icon={Trash2} onClick={() => setDialog('delete')}>
                      מחיקה
                    </Button>
                  </>
                )}
              </>
            }
          />

          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
            <MembersPanel team={team} />
            <TeamTaskSummary teamId={team.id} />
          </div>

          <TeamFormDialog open={dialog === 'rename'} onClose={closeDialog} team={team} />
          <AssignLeadDialog open={dialog === 'lead'} onClose={closeDialog} team={team} />
          <ConfirmDialog
            open={dialog === 'delete'}
            onClose={closeDialog}
            onConfirm={() =>
              deleteMutation.mutate(team.id, {
                onSuccess: () => navigate('/teams', { replace: true }),
                onSettled: closeDialog,
              })
            }
            loading={deleteMutation.isPending}
            title="מחיקת הצוות"
            message="אפשר למחוק רק צוות ריק, בלי חברים ובלי משימות. הפעולה אינה הפיכה."
            confirmLabel="מחיקת הצוות"
          />
        </>
      )}
    </QueryView>
  )
}
