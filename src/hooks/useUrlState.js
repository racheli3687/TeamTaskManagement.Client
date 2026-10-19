import { useCallback, useMemo } from 'react'
import { useSearchParams } from 'react-router'

// מצב של סינון ועמוד ב-URL: נשמר ברענון, ניתן לשיתוף, וכפתור "אחורה" עובד.
// defaults: אובייקט קבוע (מחוץ לקומפוננטה). הטיפוס של כל ערך נקבע לפי ערך ברירת המחדל שלו.
export function useUrlState(defaults) {
  const [searchParams, setSearchParams] = useSearchParams()

  const state = useMemo(
    () =>
      Object.fromEntries(
        Object.entries(defaults).map(([key, fallback]) => {
          const raw = searchParams.get(key)
          if (raw === null) return [key, fallback]
          if (typeof fallback === 'number') return [key, Number(raw) || fallback]
          if (typeof fallback === 'boolean') return [key, raw === 'true']
          return [key, raw]
        }),
      ),
    [searchParams, defaults],
  )

  // כל שינוי בסינון מחזיר לעמוד הראשון, אלא אם השינוי הוא העמוד עצמו
  const update = useCallback(
    (changes) =>
      setSearchParams(
        (current) => {
          const next = new URLSearchParams(current)
          for (const [key, value] of Object.entries(changes)) {
            if (value === defaults[key] || value === '' || value == null) next.delete(key)
            else next.set(key, String(value))
          }
          if (!('page' in changes)) next.delete('page')
          return next
        },
        { replace: true },
      ),
    [setSearchParams, defaults],
  )

  return [state, update]
}
