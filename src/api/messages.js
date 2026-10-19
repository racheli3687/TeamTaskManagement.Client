import { request } from './client'

export const getMessages = (query, signal) => request('/api/messages', { query, signal })

export const getUnreadCount = (signal) => request('/api/messages/unread-count', { signal })

export const sendMessage = (message) => request('/api/messages', { method: 'POST', body: message })

export const markMessageAsRead = (messageId) =>
  request(`/api/messages/${messageId}/read`, { method: 'PUT' })

export const deleteMessage = (messageId) => request(`/api/messages/${messageId}`, { method: 'DELETE' })
