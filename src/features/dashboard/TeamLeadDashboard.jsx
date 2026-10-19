import { useAuth } from '../../auth/useAuth'
import TaskPreview from './TaskPreview'
import TeamTaskSummary from './TeamTaskSummary'

const IN_PROGRESS = { status: 'InProgress', sortBy: 'DueDate', page: 1, pageSize: 4 }
const OPEN = { status: 'Open', sortBy: 'DueDate', page: 1, pageSize: 4 }

export default function TeamLeadDashboard() {
  const { user } = useAuth()
  const source = { kind: 'team', id: user.teamId }
  const boardLink = { to: `/teams/${user.teamId}/tasks`, label: 'ללוח המשימות' }

  return (
    <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_20rem]">
      <div className="space-y-10">
        <TaskPreview
          title="בעבודה עכשיו"
          source={source}
          params={IN_PROGRESS}
          emptyTitle="אף משימה לא בביצוע"
          emptyDescription="משימות שחברי הצוות יתפסו יופיעו כאן, לפי תאריך היעד."
          link={boardLink}
        />
        <TaskPreview
          title="ממתינות לתפיסה"
          source={source}
          params={OPEN}
          emptyTitle="אין משימות פתוחות"
          emptyDescription="אפשר ליצור משימה חדשה בלוח המשימות."
          link={boardLink}
        />
      </div>
      <TeamTaskSummary teamId={user.teamId} className="self-start" />
    </div>
  )
}
