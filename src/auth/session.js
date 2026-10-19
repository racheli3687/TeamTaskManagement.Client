// החיבור הנוכחי (התשובה של login/register). נשמר ב-localStorage כדי לשרוד רענון.
const STORAGE_KEY = 'ttm.session'

function readStoredSession() {
  try {
    const session = JSON.parse(localStorage.getItem(STORAGE_KEY))
    return session?.token && new Date(session.expiresAt) > new Date() ? session : null
  } catch {
    return null
  }
}

let current = readStoredSession()

export const getSession = () => current

export const getToken = () => current?.token ?? null

export function saveSession(session) {
  current = session
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session))
  } catch {
    // אחסון חסום: החיבור נשמר בזיכרון עד רענון הדף
  }
}

export function clearSession() {
  current = null
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {
    // אחסון חסום: אין מה למחוק
  }
}
