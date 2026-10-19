import { request } from './client'

export const getTeamTasks = (teamId, query, signal) =>
  request(`/api/teams/${teamId}/tasks`, { query, signal })

export const getMemberTasks = (memberId, query, signal) =>
  request(`/api/users/${memberId}/tasks`, { query, signal })

export const getTask = (taskId, signal) => request(`/api/tasks/${taskId}`, { signal })

export const createTask = ({ teamId, ...task }) =>
  request(`/api/teams/${teamId}/tasks`, { method: 'POST', body: task })

export const updateTask = ({ taskId, ...task }) =>
  request(`/api/tasks/${taskId}`, { method: 'PUT', body: task })

export const updateTaskStatus = ({ taskId, status }) =>
  request(`/api/tasks/${taskId}/status`, { method: 'PATCH', body: { status } })

export const deleteTask = (taskId) => request(`/api/tasks/${taskId}`, { method: 'DELETE' })

// המשאב המוגבל: תפיסה ושחרור הם יצירה ומחיקה של השיוך
export const claimTask = (taskId) => request(`/api/tasks/${taskId}/assignment`, { method: 'POST' })

export const releaseTask = (taskId) => request(`/api/tasks/${taskId}/assignment`, { method: 'DELETE' })
