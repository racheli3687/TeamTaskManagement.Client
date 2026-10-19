import { CircleAlert } from 'lucide-react'
import { errorReference } from '../../api/client'

// שגיאה כללית של טופס (שגיאות של שדות מוצגות ליד השדה עצמו)
export default function FormError({ error }) {
  if (!error) return null
  const reference = errorReference(error)
  return (
    <div role="alert" className="flex gap-3 rounded-lg bg-danger-soft px-4 py-3 text-sm text-danger">
      <CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden />
      <div>
        <p className="font-medium">{error.message}</p>
        {reference && <p className="mt-0.5 text-xs opacity-80">{reference}</p>}
      </div>
    </div>
  )
}
