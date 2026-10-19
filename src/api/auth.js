import { request } from './client'

export const login = (credentials) => request('/api/auth/login', { method: 'POST', body: credentials })

// הרשמה של מנהל חברה חדשה (החברה והמנהל נוצרים יחד)
export const register = (details) => request('/api/auth/register', { method: 'POST', body: details })
