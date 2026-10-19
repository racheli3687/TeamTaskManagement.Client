import { UserRoundX } from 'lucide-react'
import { useAuth } from '../../auth/useAuth'
import ButtonLink from '../../components/ui/ButtonLink'
import EmptyState from '../../components/ui/EmptyState'
import PageHeader from '../../components/ui/PageHeader'
import { ROLES } from '../../lib/constants'
import { greeting } from '../../lib/format'
import ManagerDashboard from './ManagerDashboard'
import MemberDashboard from './MemberDashboard'
import TeamLeadDashboard from './TeamLeadDashboard'

const DESCRIPTIONS = {
  Manager: 'תמונת מצב של הצוותים בחברה.',
  TeamLead: 'מה בעבודה בצוות, ומה עוד ממתין לתפיסה.',
  Member: 'המשימות שלך, ומשימות פנויות שאפשר לתפוס עכשיו.',
}

function DashboardContent({ user }) {
  if (user.role === ROLES.Manager) return <ManagerDashboard />

  // ראש צוות או חבר שהוסרו מהצוות: אין משימות נוכחיות
  if (!user.teamId) {
    return (
      <EmptyState
        icon={UserRoundX}
        title="החשבון עדיין לא משויך לצוות"
        description="מנהל החברה או ראש צוות יכולים לצרף את החשבון לצוות. בינתיים אפשר לשלוח להם הודעה."
        action={<ButtonLink to="/messages">להודעות</ButtonLink>}
      />
    )
  }

  return user.role === ROLES.TeamLead ? <TeamLeadDashboard /> : <MemberDashboard />
}

export default function DashboardPage() {
  const { user } = useAuth()
  return (
    <>
      <PageHeader title={`${greeting()}, ${user.userName}`} description={DESCRIPTIONS[user.role]} />
      <DashboardContent user={user} />
    </>
  )
}
