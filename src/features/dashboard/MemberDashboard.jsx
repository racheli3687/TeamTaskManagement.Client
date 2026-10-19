import { useAuth } from '../../auth/useAuth'
import TaskPreview from './TaskPreview'

const MY_ACTIVE = { status: 'InProgress', sortBy: 'DueDate', page: 1, pageSize: 3 }
const AVAILABLE = { status: 'Open', sortBy: 'DueDate', page: 1, pageSize: 6 }

export default function MemberDashboard() {
  const { user } = useAuth()
  return (
    <div className="space-y-10">
      <TaskPreview
        title="בביצוע אצלי"
        source={{ kind: 'member', id: user.id }}
        params={MY_ACTIVE}
        emptyTitle="אין משימות בביצוע"
        emptyDescription="אפשר לתפוס משימה מהרשימה שלמטה."
        link={{ to: '/my-tasks', label: 'כל המשימות שלי' }}
      />
      <TaskPreview
        title="פנויות לתפיסה"
        source={{ kind: 'team', id: user.teamId }}
        params={AVAILABLE}
        emptyTitle="אין כרגע משימות פנויות"
        emptyDescription="משימות חדשות שראש הצוות יפרסם יופיעו כאן."
        link={{ to: `/teams/${user.teamId}/tasks`, label: 'כל משימות הצוות' }}
      />
    </div>
  )
}
