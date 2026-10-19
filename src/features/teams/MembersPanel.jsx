import { Crown, ListTodo, UserMinus, UserPlus, UsersRound } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router'
import { useAuth } from '../../auth/useAuth'
import Avatar from '../../components/ui/Avatar'
import { RoleBadge } from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import ConfirmDialog from '../../components/ui/ConfirmDialog'
import EmptyState from '../../components/ui/EmptyState'
import Pagination from '../../components/ui/Pagination'
import Panel from '../../components/ui/Panel'
import QueryView from '../../components/ui/QueryView'
import Skeleton from '../../components/ui/Skeleton'
import { ROLES } from '../../lib/constants'
import { canManageMembers, canViewMemberTasks } from '../../lib/permissions'
import AddMemberDialog from './AddMemberDialog'
import { useMembers, useRemoveMember } from './queries'

const PAGE_SIZE = 10

export default function MembersPanel({ team }) {
  const { user } = useAuth()
  const [page, setPage] = useState(1)
  const [adding, setAdding] = useState(false)
  const [removing, setRemoving] = useState(null)
  const membersQuery = useMembers(team.id, { page, pageSize: PAGE_SIZE })
  const removeMutation = useRemoveMember()

  const canManage = canManageMembers(user, team.id)

  // קישור למשימות: החבר עצמו לדף שלו, ראש צוות ומנהל לדף המשימות של החבר
  const tasksLink = (member) => {
    if (member.id === user.id && user.role === ROLES.Member) return { to: '/my-tasks' }
    if (member.role === ROLES.Member && canViewMemberTasks(user)) {
      return { to: `/members/${member.id}/tasks`, state: { userName: member.userName, teamId: team.id } }
    }
    return null
  }

  return (
    <Panel
      title="חברי הצוות"
      description="ראש הצוות מסומן בכתר. הסרת חבר משחררת את המשימות שבביצוע אצלו."
      actions={
        canManage && (
          <Button size="sm" icon={UserPlus} onClick={() => setAdding(true)}>
            צירוף חבר
          </Button>
        )
      }
    >
      <QueryView query={membersQuery} skeleton={<Skeleton className="h-48" />}>
        {(members) =>
          members.items.length === 0 ? (
            <EmptyState icon={UsersRound} title="אין חברים בצוות" description="חברים שיצורפו יופיעו כאן." />
          ) : (
            <>
              <ul className="divide-y divide-line">
                {members.items.map((member) => {
                  const link = tasksLink(member)
                  return (
                    <li key={member.id} className="flex flex-wrap items-center gap-3 py-3">
                      <Avatar name={member.userName} />
                      <div className="min-w-0 flex-1">
                        <p className="flex items-center gap-1.5 font-medium" dir="auto">
                          {member.userName}
                          {member.role === ROLES.TeamLead && <Crown className="size-4 text-marker" aria-label="ראש הצוות" />}
                          {member.id === user.id && <span className="text-xs text-ink-soft">(אני)</span>}
                        </p>
                        <p className="text-xs text-ink-soft tabular-nums">מספר משתמש {member.id}</p>
                      </div>
                      <RoleBadge role={member.role} />
                      <div className="flex gap-1">
                        {link && (
                          <Link
                            to={link.to}
                            state={link.state}
                            className="flex size-9 items-center justify-center rounded-lg text-ink-soft hover:bg-surface-2 hover:text-ink"
                            aria-label={`המשימות של ${member.userName}`}
                            title="משימות"
                          >
                            <ListTodo className="size-4" aria-hidden />
                          </Link>
                        )}
                        {canManage && member.role === ROLES.Member && (
                          <Button
                            variant="ghost"
                            size="icon"
                            icon={UserMinus}
                            onClick={() => setRemoving(member)}
                            aria-label={`הסרת ${member.userName} מהצוות`}
                            title="הסרה מהצוות"
                          />
                        )}
                      </div>
                    </li>
                  )
                })}
              </ul>
              <Pagination page={members.page} pageSize={members.pageSize} totalCount={members.totalCount} onPageChange={setPage} />
            </>
          )
        }
      </QueryView>

      <AddMemberDialog open={adding} onClose={() => setAdding(false)} team={team} />
      <ConfirmDialog
        open={Boolean(removing)}
        onClose={() => setRemoving(null)}
        onConfirm={() =>
          removeMutation.mutate({ teamId: team.id, userId: removing.id }, { onSettled: () => setRemoving(null) })
        }
        loading={removeMutation.isPending}
        title="הסרה מהצוות"
        message={`${removing?.userName} יוסר מהצוות. משימות שבביצוע אצלו יחזרו להיות פנויות, ומשימות שהשלים יישארו רשומות על שמו.`}
        confirmLabel="הסרה"
      />
    </Panel>
  )
}
