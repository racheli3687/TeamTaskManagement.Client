import { ROLES } from './constants'

// הרשאות התצוגה בלבד, לפי אותם כללים שבשרת. השרת נשאר הבדיקה הקובעת.
export function getTaskPermissions(task, user) {
  const sameTeam = user.teamId === task.teamId
  const isLead = user.role === ROLES.TeamLead && sameTeam
  const isMember = user.role === ROLES.Member && sameTeam
  const isHolder = isMember && task.assignedUserId === user.id
  const inProgress = task.status === 'InProgress'

  return {
    canClaim: isMember && task.status === 'Open',
    canComplete: inProgress && (isLead || isHolder),
    canRelease: inProgress && (isLead || isHolder),
    canReopen: isLead && task.status === 'Done',
    canEdit: isLead,
    canDelete: isLead,
  }
}

export const canManageMembers = (user, teamId) =>
  user.role === ROLES.Manager || (user.role === ROLES.TeamLead && user.teamId === teamId)

export const canViewMemberTasks = (user) => user.role === ROLES.Manager || user.role === ROLES.TeamLead
