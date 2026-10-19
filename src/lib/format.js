const dueDateFormatter = new Intl.DateTimeFormat('he-IL', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
})
const dateTimeFormatter = new Intl.DateTimeFormat('he-IL', { dateStyle: 'medium', timeStyle: 'short' })
const relativeFormatter = new Intl.RelativeTimeFormat('he', { numeric: 'auto' })

const RELATIVE_UNITS = [
  ['year', 31_536_000],
  ['month', 2_592_000],
  ['week', 604_800],
  ['day', 86_400],
  ['hour', 3_600],
  ['minute', 60],
]

// תאריך יעד נשמר כתאריך בלבד (חצות UTC), ולכן מוצג ב-UTC
export const formatDueDate = (value) => (value ? dueDateFormatter.format(new Date(value)) : null)

export const formatDateTime = (value) => dateTimeFormatter.format(new Date(value))

export function formatRelative(value) {
  const seconds = (new Date(value) - Date.now()) / 1000
  const match = RELATIVE_UNITS.find(([, size]) => Math.abs(seconds) >= size)
  return match ? relativeFormatter.format(Math.round(seconds / match[1]), match[0]) : 'עכשיו'
}

export const todayIsoDate = () => new Date().toISOString().slice(0, 10)

// input type="date" עובד עם "YYYY-MM-DD"
export const toDateInput = (value) => (value ? value.slice(0, 10) : '')

// השרת מפרש תאריך ללא אזור זמן כ-UTC
export const fromDateInput = (value) => (value ? `${value}T00:00:00Z` : null)

export const isOverdue = (task) =>
  task.status !== 'Done' && Boolean(task.dueDate) && toDateInput(task.dueDate) < todayIsoDate()

export const initials = (name = '') => name.trim().slice(0, 2).toUpperCase()

export function greeting(date = new Date()) {
  const hour = date.getHours()
  if (hour < 5) return 'לילה טוב'
  if (hour < 12) return 'בוקר טוב'
  if (hour < 17) return 'צהריים טובים'
  if (hour < 21) return 'ערב טוב'
  return 'לילה טוב'
}
