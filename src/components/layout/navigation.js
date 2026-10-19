import { ClipboardCheck, LayoutDashboard, ListTodo, Mail, UserRound, UsersRound } from 'lucide-react'
import { ROLES } from '../../lib/constants'

// פריטי הניווט לפי התפקיד והצוות של המשתמש
export function getNavItems(user) {
  const teamPath = user.teamId && `/teams/${user.teamId}`
  const items = [{ to: '/', label: 'לוח בקרה', icon: LayoutDashboard, end: true }]

  if (user.role === ROLES.Manager) items.push({ to: '/teams', label: 'צוותים', icon: UsersRound, end: true })

  if (teamPath) {
    items.push({ to: `${teamPath}/tasks`, label: 'משימות הצוות', icon: ListTodo })
    if (user.role === ROLES.Member) items.push({ to: '/my-tasks', label: 'המשימות שלי', icon: ClipboardCheck })
    items.push({ to: teamPath, label: 'הצוות שלי', icon: UsersRound, end: true })
  }

  items.push(
    { to: '/messages', label: 'הודעות', icon: Mail, showUnread: true },
    { to: '/profile', label: 'פרופיל', icon: UserRound },
  )
  return items
}
