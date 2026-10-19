import { MutationCache, QueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { ApiError, errorReference } from '../api/client'

// שגיאת לקוח (4xx) לא תשתנה בניסיון חוזר. שגיאת רשת או שרת: עד שני ניסיונות נוספים.
const shouldRetry = (failureCount, error) =>
  failureCount < 2 && !(error instanceof ApiError && error.status >= 400 && error.status < 500)

// מוסכמת meta של mutation, כדי שכל mutation לא יחזור על אותו קוד:
// invalidates:     מפתחות לרענון בסיום. גם בכישלון: אחרי התנגשות הנתונים המקומיים כבר לא עדכניים.
// successMessage:  הודעת הצלחה (מחרוזת, או פונקציה של התשובה והקלט)
// errorsShownInline: טופס שמציג כל שגיאה בתוכו (ליד השדות), בלי הודעה קופצת
// handledStatuses: קודי שגיאה מסוימים שהקומפוננטה מציגה בעצמה (למשל חלון ההתנגשות ב-409)
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 30_000, retry: shouldRetry },
  },
  mutationCache: new MutationCache({
    onSuccess: (data, variables, _context, mutation) => {
      const { successMessage } = mutation.meta ?? {}
      const message = typeof successMessage === 'function' ? successMessage(data, variables) : successMessage
      if (message) toast.success(message)
    },
    onError: (error, _variables, _context, mutation) => {
      // 401 מטופל בהתנתקות (AuthProvider)
      const meta = mutation.meta ?? {}
      if (error.status === 401 || meta.errorsShownInline || meta.handledStatuses?.includes(error.status)) return
      toast.error(error.message, { description: errorReference(error) })
    },
    onSettled: (_data, _error, _variables, _context, mutation) =>
      Promise.all(
        (mutation.meta?.invalidates ?? []).map((queryKey) => queryClient.invalidateQueries({ queryKey })),
      ),
  }),
})
