import { useLocation, useParams } from 'react-router'
import TaskBrowser from './TaskBrowser'

// משימות של חבר צוות, לצפייה של ראש הצוות או המנהל. השם מגיע מהקישור ברשימת החברים.
export default function MemberTasksPage() {
  const memberId = Number(useParams().memberId)
  const { state } = useLocation()
  const userName = state?.userName ?? `משתמש ${memberId}`

  return (
    <TaskBrowser
      key={memberId}
      source={{ kind: 'member', id: memberId }}
      title={`המשימות של ${userName}`}
      description="המשימות שמשויכות כרגע לחבר בצוות הנוכחי שלו."
      back={state?.teamId ? { to: `/teams/${state.teamId}`, label: 'לעמוד הצוות' } : undefined}
    />
  )
}
