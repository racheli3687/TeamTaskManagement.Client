import { request } from './client'

export const getTeams = (query, signal) => request('/api/teams', { query, signal })

export const getTeam = (teamId, signal) => request(`/api/teams/${teamId}`, { signal })

export const createTeam = (team) => request('/api/teams', { method: 'POST', body: team })

export const renameTeam = ({ teamId, name }) =>
  request(`/api/teams/${teamId}`, { method: 'PUT', body: { name } })

export const deleteTeam = (teamId) => request(`/api/teams/${teamId}`, { method: 'DELETE' })

export const assignTeamLead = ({ teamId, userId }) =>
  request(`/api/teams/${teamId}/lead`, { method: 'PUT', body: { userId } })

export const getMembers = (teamId, query, signal) =>
  request(`/api/teams/${teamId}/members`, { query, signal })

export const addMember = ({ teamId, ...member }) =>
  request(`/api/teams/${teamId}/members`, { method: 'POST', body: member })

export const removeMember = ({ teamId, userId }) =>
  request(`/api/teams/${teamId}/members/${userId}`, { method: 'DELETE' })
