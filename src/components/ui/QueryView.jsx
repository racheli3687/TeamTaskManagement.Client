import { RefreshCw, TriangleAlert } from 'lucide-react'
import { errorReference } from '../../api/client'
import Button from './Button'
import Skeleton from './Skeleton'

// מצבי הטעינה והשגיאה של שאילתה במקום אחד. children מקבל את הנתונים כשהם זמינים.
export default function QueryView({ query, skeleton = <Skeleton className="h-40" />, children }) {
  if (query.isPending) return skeleton

  if (query.isError) {
    const reference = errorReference(query.error)
    return (
      <div role="alert" className="flex flex-col items-center rounded-2xl bg-danger-soft px-6 py-10 text-center">
        <TriangleAlert className="mb-3 size-7 text-danger" aria-hidden />
        <p className="font-medium text-danger">{query.error.message}</p>
        {reference && <p className="mt-1 text-xs text-danger/80">{reference}</p>}
        <Button variant="secondary" size="sm" icon={RefreshCw} className="mt-4" onClick={() => query.refetch()}>
          ניסיון נוסף
        </Button>
      </div>
    )
  }

  return children(query.data)
}
