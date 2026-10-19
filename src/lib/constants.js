export const ROLES = { Manager: 'Manager', TeamLead: 'TeamLead', Member: 'Member' }

export const ROLE_LABELS = {
  Manager: 'מנהל חברה',
  TeamLead: 'ראש צוות',
  Member: 'חבר צוות',
}

export const TASK_STATUS_LABELS = {
  Open: 'פתוחה',
  InProgress: 'בביצוע',
  Done: 'הושלמה',
}

export const TASK_SORT_OPTIONS = [
  { value: 'DueDate', label: 'תאריך יעד' },
  { value: 'CreatedAt', label: 'תאריך יצירה' },
  { value: 'Title', label: 'כותרת' },
]

// אורכים מקסימליים, זהים ל-Data Annotations בשרת
export const LIMITS = {
  title: 200,
  description: 2000,
  message: 2000,
  teamName: 100,
  organizationName: 100,
  userName: 50,
  password: 100,
}

// גודל העמוד המקסימלי שהשרת מאפשר ([Range(1, 100)])
export const MAX_PAGE_SIZE = 100
