import { ChevronLeft, Inbox } from 'lucide-react'
import { Link } from 'react-router'
import EmptyState from '../../components/ui/EmptyState'
import QueryView from '../../components/ui/QueryView'
import { SkeletonGrid } from '../../components/ui/Skeleton'
import { useTaskList } from '../tasks/queries'
import TaskGrid from '../tasks/TaskGrid'

// קטע משימות בלוח הבקרה: כמה משימות ראשונות וקישור לרשימה המלאה
export default function TaskPreview({ title, source, params, emptyTitle, emptyDescription, link }) {
  const tasksQuery = useTaskList(source, params)

  return (
    <section>
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="font-display text-xl font-semibold">
          {title}
          {tasksQuery.data && (
            <span className="ms-2 text-base font-medium text-ink-soft tabular-nums">{tasksQuery.data.totalCount}</span>
          )}
        </h2>
        {link && (
          <Link to={link.to} className="inline-flex items-center gap-1 text-sm font-medium text-brand hover:underline">
            {link.label}
            <ChevronLeft className="size-4" aria-hidden />
          </Link>
        )}
      </div>
      <QueryView query={tasksQuery} skeleton={<SkeletonGrid count={params.pageSize} />}>
        {(page) => (
          <TaskGrid tasks={page.items} emptyState={<EmptyState icon={Inbox} title={emptyTitle} description={emptyDescription} />} />
        )}
      </QueryView>
    </section>
  )
}
