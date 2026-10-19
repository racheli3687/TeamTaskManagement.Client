import Panel from '../../components/ui/Panel'
import QueryView from '../../components/ui/QueryView'
import Skeleton from '../../components/ui/Skeleton'
import { TASK_STATUS_LABELS } from '../../lib/constants'
import { cn } from '../../lib/cn'
import { useTaskCounts } from '../tasks/queries'

const SEGMENTS = [
  { status: 'Open', bar: 'bg-brand' },
  { status: 'InProgress', bar: 'bg-marker' },
  { status: 'Done', bar: 'bg-done' },
]

// התפלגות משימות הצוות לפי סטטוס: פס אחד מחולק, ומקרא עם המספרים
export default function TeamTaskSummary({ teamId, className }) {
  const countsQuery = useTaskCounts(teamId)

  return (
    <Panel title="מצב המשימות" className={className}>
      <QueryView query={countsQuery} skeleton={<Skeleton className="h-28" />}>
        {(counts) => {
          const total = counts.Open + counts.InProgress + counts.Done
          return (
            <>
              <p className="font-display text-4xl font-bold tabular-nums">
                {total}
                <span className="ms-2 text-base font-medium text-ink-soft">משימות</span>
              </p>
              <div className="mt-4 flex h-3 overflow-hidden rounded-full bg-surface-2" role="img" aria-label="התפלגות לפי סטטוס">
                {total > 0 &&
                  SEGMENTS.map(({ status, bar }) => (
                    <span key={status} className={cn('h-full', bar)} style={{ width: `${(counts[status] / total) * 100}%` }} />
                  ))}
              </div>
              <dl className="mt-4 space-y-2">
                {SEGMENTS.map(({ status, bar }) => (
                  <div key={status} className="flex items-center justify-between text-sm">
                    <dt className="flex items-center gap-2 text-ink-soft">
                      <span className={cn('size-2.5 rounded-full', bar)} aria-hidden />
                      {TASK_STATUS_LABELS[status]}
                    </dt>
                    <dd className="font-semibold tabular-nums">{counts[status]}</dd>
                  </div>
                ))}
              </dl>
            </>
          )
        }}
      </QueryView>
    </Panel>
  )
}
