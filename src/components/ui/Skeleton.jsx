import { cn } from '../../lib/cn'

export default function Skeleton({ className }) {
  return <div className={cn('animate-pulse rounded-xl bg-surface-2', className)} aria-hidden />
}

export function SkeletonGrid({ count = 6, className = 'h-44' }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3" aria-busy="true" aria-label="טוען">
      {Array.from({ length: count }, (_, index) => (
        <Skeleton key={index} className={className} />
      ))}
    </div>
  )
}
