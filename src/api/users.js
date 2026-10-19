import { request } from './client'

export const getMyProfile = (signal) => request('/api/users/me', { signal })

export const updateProfile = (profile) => request('/api/users/me', { method: 'PUT', body: profile })

export const changePassword = (passwords) =>
  request('/api/users/me/password', { method: 'PUT', body: passwords })
