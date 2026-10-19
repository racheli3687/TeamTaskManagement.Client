import { Mail, Plus, UserRound, UsersRound } from 'lucide-react'
import { Link } from 'react-router'
import ButtonLink from '../../components/ui/ButtonLink'
import EmptyState from '../../components/ui/EmptyState'
import Panel from '../../components/ui/Panel'
import QueryView from '../../components/ui/QueryView'
import Skeleton from '../../components/ui/Skeleton'
import { MAX_PAGE_SIZE } from '../../lib/constants'
import { useUnreadCount } from '../messages/queries'
import { useTeams } from '../teams/queries'
import StatLink from './StatLink'

const ALL_TEAMS = { page: 1, pageSize: MAX_PAGE_SIZE }

export default function ManagerDashboard() {
  const teamsQuery = useTeams(ALL_TEAMS)
  const { data: unread } = useUnreadCount()
  const teams = teamsQuery.data?.items ?? []
  const membersTotal = teams.reduce((sum, team) => sum + team.membersCount, 0)
  const largestTeam = Math.max(1, ...teams.map((team) => team.membersCount))

  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-3">
        <StatLink to="/teams" icon={UsersRound} label="צוותים" value={teamsQuery.data?.totalCount} />
        <StatLink to="/teams" icon={UserRound} label="חברים בצוותים" value={teamsQuery.data && membersTotal} />
        <StatLink to="/messages" icon={Mail} label="הודעות שלא נקראו" value={unread} />
      </div>

      <Panel
        title="הצוותים בחברה"
        description="לחיצה על צוות פותחת את החברים והמשימות שלו."
        actions={
          <ButtonLink to="/teams" variant="secondary" size="sm" icon={Plus}>
            ניהול צוותים
          </ButtonLink>
        }
      >
        <QueryView query={teamsQuery} skeleton={<Skeleton className="h-40" />}>
          {() =>
            teams.length === 0 ? (
              <EmptyState
                icon={UsersRound}
                title="עדיין אין צוותים"
                description="הצעד הראשון: ליצור צוות ולצרף אליו חברים."
                action={<ButtonLink to="/teams">יצירת צוות</ButtonLink>}
              />
            ) : (
              <ul className="space-y-1">
                {teams.map((team) => (
                  <li key={team.id}>
                    <Link to={`/teams/${team.id}`} className="grid grid-cols-[minmax(0,10rem)_1fr_auto] items-center gap-4 rounded-lg px-2 py-2.5 hover:bg-surface-2">
                      <span className="truncate font-medium" dir="auto">
                        {team.name}
                      </span>
                      <span className="h-2 overflow-hidden rounded-full bg-surface-2" aria-hidden>
                        <span className="block h-full rounded-full bg-brand" style={{ width: `${(team.membersCount / largestTeam) * 100}%` }} />
                      </span>
                      <span className="text-sm text-ink-soft tabular-nums">{team.membersCount} חברים</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )
          }
        </QueryView>
      </Panel>
    </div>
  )
}
