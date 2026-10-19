import { getToken } from '../auth/session'

const API_URL = (import.meta.env.VITE_API_URL ?? '').replace(/\/$/, '')

const FALLBACK_MESSAGES = {
  0: 'אין תקשורת עם השרת. יש לבדוק את החיבור ולנסות שוב.',
  400: 'יש לתקן את השדות המסומנים.',
  401: 'נדרשת התחברות מחדש.',
  403: 'אין הרשאה לפעולה זו.',
  404: 'הפריט לא נמצא.',
  409: 'הנתונים השתנו בינתיים. יש לרענן ולנסות שוב.',
  500: 'אירעה שגיאה בשרת. אפשר לנסות שוב בעוד רגע.',
}

const HEBREW = /[֐-׿]/

export class ApiError extends Error {
  constructor({ status, message, fieldErrors, correlationId }) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.fieldErrors = fieldErrors ?? {}
    this.correlationId = correlationId ?? null
  }

  // שגיאת ולידציה של שדה. השרת מחזיר את שמות השדות ב-PascalCase (UserName)
  fieldError(name) {
    const key = Object.keys(this.fieldErrors).find((k) => k.toLowerCase() === name.toLowerCase())
    return key ? this.fieldErrors[key][0] : undefined
  }
}

// מזהה הפנייה מה-ProblemDetails: מאפשר לאתר את הבקשה בלוג של השרת
export const errorReference = (error) =>
  error?.correlationId ? `מזהה פנייה: ${error.correlationId}` : undefined

let handleUnauthorized = () => {}
export const setUnauthorizedHandler = (handler) => {
  handleUnauthorized = handler
}

function buildUrl(path, query) {
  const url = new URL(API_URL + path, window.location.origin)
  for (const [key, value] of Object.entries(query ?? {})) {
    if (value !== undefined && value !== null && value !== '') url.searchParams.set(key, value)
  }
  return url
}

// הודעות השרת בעברית מוצגות כפי שהן. כותרות כלליות של ה-framework (באנגלית) מוחלפות.
function errorMessage(status, problem) {
  if (HEBREW.test(problem?.title ?? '')) return problem.title
  return FALLBACK_MESSAGES[status] ?? FALLBACK_MESSAGES[status >= 500 ? 500 : 400]
}

export async function request(path, { method = 'GET', body, query, signal } = {}) {
  const token = getToken()
  const headers = {}
  if (body !== undefined) headers['Content-Type'] = 'application/json'
  if (token) headers.Authorization = `Bearer ${token}`

  let response
  try {
    response = await fetch(buildUrl(path, query), {
      method,
      headers,
      signal,
      body: body === undefined ? undefined : JSON.stringify(body),
    })
  } catch (error) {
    if (error.name === 'AbortError') throw error
    throw new ApiError({ status: 0, message: FALLBACK_MESSAGES[0] })
  }

  const isJson = response.headers.get('Content-Type')?.includes('json')
  const data = isJson ? await response.json() : null
  if (response.ok) return data

  // token שנדחה (פג תוקף, משתמש שנמחק): התנתקות. בהתחברות אין token, ושם 401 פירושו פרטים שגויים.
  if (response.status === 401 && token) handleUnauthorized()

  throw new ApiError({
    status: response.status,
    message: errorMessage(response.status, data),
    fieldErrors: data?.errors,
    correlationId: data?.correlationId ?? response.headers.get('X-Correlation-Id'),
  })
}
