import { useParams } from 'react-router'
import { useAuth } from '../../auth/useAuth'
import { ROLES } from '../../lib/constants'
import { useTeam } from '../teams/queries'
import TaskBrowser from './TaskBrowser'

export default function TeamTasksPage() {
  const teamId = Number(useParams().teamId)
  const { user } = useAuth()
  const { data: team } = useTeam(teamId)
  const isLead = user.role === ROLES.TeamLead && user.teamId === teamId

  return (
    <TaskBrowser
      key={teamId}
      source={{ kind: 'team', id: teamId }}
      title={team ? `משימות ${team.name}` : 'משימות הצוות'}
      description={isLead ? 'יצירה, עריכה ומעקב אחרי משימות הצוות.' : 'משימה פתוחה פנויה לתפיסה על ידי חבר צוות אחד בלבד.'}
      back={{ to: `/teams/${teamId}`, label: 'לעמוד הצוות' }}
      createForTeamId={isLead ? teamId : undefined}
    />
  )
}
