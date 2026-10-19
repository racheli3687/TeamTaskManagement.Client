import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query'
import { queryKeys } from '../../api/queryKeys'
import {
  addMember,
  assignTeamLead,
  createTeam,
  deleteTeam,
  getMembers,
  getTeam,
  getTeams,
  removeMember,
  renameTeam,
} from '../../api/teams'
import { useAuth } from '../../auth/useAuth'
import { MAX_PAGE_SIZE, ROLES } from '../../lib/constants'

const teamsChanged = [queryKeys.teams.all]
// שינוי בחברי צוות משחרר את המשימות הפעילות שלהם בשרת, ולכן גם המשימות מתרעננות
const membershipChanged = [queryKeys.teams.all, queryKeys.tasks.all]

export const useTeams = (params) =>
  useQuery({
    queryKey: queryKeys.teams.list(params),
    queryFn: ({ signal }) => getTeams(params, signal),
    placeholderData: keepPreviousData,
  })

export const useTeam = (teamId) =>
  useQuery({
    queryKey: queryKeys.teams.detail(teamId),
    queryFn: ({ signal }) => getTeam(teamId, signal),
    enabled: Boolean(teamId),
  })

export const useMembers = (teamId, params) =>
  useQuery({
    queryKey: queryKeys.teams.members(teamId, params),
    queryFn: ({ signal }) => getMembers(teamId, params, signal),
    placeholderData: keepPreviousData,
    enabled: Boolean(teamId),
  })

// כל המשתמשים שהמשתמש המחובר רשאי לראות, מקובצים לפי צוות: מנהל רואה את כל הצוותים,
// אחרים את הצוות שלהם. משמש לבחירת נמען, לסינון הודעות ולמינוי ראש צוות.
// עד 100 צוותים ו-100 חברים בצוות (הגודל המקסימלי של עמוד בשרת).
export function useDirectory() {
  const { user } = useAuth()
  return useQuery({
    queryKey: queryKeys.teams.directory(user.role, user.teamId),
    queryFn: async ({ signal }) => {
      const firstPage = { page: 1, pageSize: MAX_PAGE_SIZE }
      let teams = []
      if (user.role === ROLES.Manager) teams = (await getTeams(firstPage, signal)).items
      else if (user.teamId) teams = [await getTeam(user.teamId, signal)]

      const memberPages = await Promise.all(teams.map((team) => getMembers(team.id, firstPage, signal)))
      return teams.map((team, index) => ({ team, members: memberPages[index].items }))
    },
    staleTime: 60_000,
  })
}

export const useCreateTeam = () =>
  useMutation({
    mutationFn: createTeam,
    meta: {
      invalidates: teamsChanged,
      successMessage: (team) => `הצוות "${team.name}" נוצר.`,
      errorsShownInline: true,
    },
  })

export const useRenameTeam = () =>
  useMutation({
    mutationFn: renameTeam,
    meta: { invalidates: teamsChanged, successMessage: 'שם הצוות עודכן.', errorsShownInline: true },
  })

export const useDeleteTeam = () =>
  useMutation({ mutationFn: deleteTeam, meta: { invalidates: teamsChanged, successMessage: 'הצוות נמחק.' } })

export const useAssignTeamLead = () =>
  useMutation({
    mutationFn: assignTeamLead,
    meta: { invalidates: membershipChanged, successMessage: 'ראש הצוות מונה.', errorsShownInline: true },
  })

export const useAddMember = () =>
  useMutation({
    mutationFn: addMember,
    meta: {
      invalidates: membershipChanged,
      successMessage: (member) => `${member.userName} צורף לצוות.`,
      errorsShownInline: true,
    },
  })

export const useRemoveMember = () =>
  useMutation({
    mutationFn: removeMember,
    meta: { invalidates: membershipChanged, successMessage: 'החבר הוסר מהצוות, והמשימות הפעילות שלו שוחררו.' },
  })
