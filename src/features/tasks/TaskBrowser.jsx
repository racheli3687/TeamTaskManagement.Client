import { ClipboardList, Plus, SearchX } from 'lucide-react'
import { useState } from 'react'
import Button from '../../components/ui/Button'
import EmptyState from '../../components/ui/EmptyState'
import PageHeader from '../../components/ui/PageHeader'
import Pagination from '../../components/ui/Pagination'
import QueryView from '../../components/ui/QueryView'
import { SkeletonGrid } from '../../components/ui/Skeleton'
import { useUrlState } from '../../hooks/useUrlState'
import { cn } from '../../lib/cn'
import { useTaskList } from './queries'
import TaskFilters from './TaskFilters'
import TaskFormDialog from './TaskFormDialog'
import TaskGrid from './TaskGrid'

const DEFAULT_FILTERS = { status: '', search: '', sortBy: 'DueDate', descending: false, page: 1, pageSize: 12 }

// דף רשימת משימות עם סינון, מיון ו-pagination מול השרת.
// source: { kind: 'team' | 'member', id }. createForTeamId: מזהה הצוות כשמותר ליצור בו משימות.
export default function TaskBrowser({ source, title, description, back, createForTeamId }) {
  const [filters, setFilters] = useUrlState(DEFAULT_FILTERS)
  const [creating, setCreating] = useState(false)
  const tasksQuery = useTaskList(source, filters)
  const hasFilters = Boolean(filters.status || filters.search)

  return (
    <>
      <PageHeader
        title={title}
        description={description}
        back={back}
        actions={
          createForTeamId && (
            <Button icon={Plus} onClick={() => setCreating(true)}>
              משימה חדשה
            </Button>
          )
        }
      />

      <TaskFilters filters={filters} onChange={setFilters} />

      <QueryView query={tasksQuery} skeleton={<SkeletonGrid />}>
        {(page) => (
          <div className={cn('transition-opacity', tasksQuery.isPlaceholderData && 'opacity-60')}>
            <TaskGrid
              tasks={page.items}
              emptyState={
                hasFilters ? (
                  <EmptyState
                    icon={SearchX}
                    title="לא נמצאו משימות"
                    description="אין משימות שמתאימות לסינון. אפשר לשנות את החיפוש או את הסטטוס."
                    action={
                      <Button variant="secondary" onClick={() => setFilters({ status: '', search: '' })}>
                        ניקוי הסינון
                      </Button>
                    }
                  />
                ) : (
                  <EmptyState
                    icon={ClipboardList}
                    title="אין משימות עדיין"
                    description={createForTeamId ? 'משימה חדשה תופיע כאן ותהיה פנויה לתפיסה.' : 'משימות יופיעו כאן כשיהיו.'}
                  />
                )
              }
            />
            <Pagination
              page={page.page}
              pageSize={page.pageSize}
              totalCount={page.totalCount}
              onPageChange={(next) => setFilters({ page: next })}
            />
          </div>
        )}
      </QueryView>

      <TaskFormDialog open={creating} teamId={createForTeamId} onClose={() => setCreating(false)} />
    </>
  )
}
