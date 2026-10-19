import { useAuth } from '../../auth/useAuth'
import TaskBrowser from './TaskBrowser'

export default function MyTasksPage() {
  const { user } = useAuth()
  return (
    <TaskBrowser
      source={{ kind: 'member', id: user.id }}
      title="המשימות שלי"
      description="כל המשימות שתפסת, כולל משימות שהושלמו בצוותים קודמים."
    />
  )
}
