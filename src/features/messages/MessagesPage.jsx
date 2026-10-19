import { Inbox, PenLine } from 'lucide-react'
import { useState } from 'react'
import { useAuth } from '../../auth/useAuth'
import { CountBadge } from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import EmptyState from '../../components/ui/EmptyState'
import PageHeader from '../../components/ui/PageHeader'
import Pagination from '../../components/ui/Pagination'
import QueryView from '../../components/ui/QueryView'
import SegmentedControl from '../../components/ui/SegmentedControl'
import Skeleton from '../../components/ui/Skeleton'
import { useUrlState } from '../../hooks/useUrlState'
import { cn } from '../../lib/cn'
import { fromDateInput } from '../../lib/format'
import { useDirectory } from '../teams/queries'
import ComposeDialog from './ComposeDialog'
import MessageFilters from './MessageFilters'
import MessageList from './MessageList'
import MessageReader from './MessageReader'
import { useDeleteMessage, useMarkAsRead, useMessages, useUnreadCount } from './queries'

const DEFAULT_FILTERS = {
  box: 'Inbox',
  status: '',
  search: '',
  otherUserId: '',
  fromDate: '',
  toDate: '',
  page: 1,
  pageSize: 15,
}

export default function MessagesPage() {
  const { user } = useAuth()
  const [filters, setFilters] = useUrlState(DEFAULT_FILTERS)
  const [selectedId, setSelectedId] = useState(null)
  const [compose, setCompose] = useState(null)

  // תאריך בלי שעה: השרת מפרש ToDate של חצות ככל היום
  const messagesQuery = useMessages({
    ...filters,
    status: filters.box === 'Inbox' ? filters.status : '',
    fromDate: fromDateInput(filters.fromDate),
    toDate: fromDateInput(filters.toDate),
  })
  const { data: unread } = useUnreadCount()
  const { data: directory = [] } = useDirectory()
  const markAsRead = useMarkAsRead()
  const deleteMutation = useDeleteMessage()

  const selected = messagesQuery.data?.items.find((message) => message.id === selectedId) ?? null

  function selectMessage(message) {
    setSelectedId(message.id)
    if (filters.box === 'Inbox' && message.status === 'Unread') markAsRead.mutate(message.id)
  }

  function changeFilters(changes) {
    setSelectedId(null)
    setFilters(changes)
  }

  const boxOptions = [
    { value: 'Inbox', label: 'נכנסות', badge: <CountBadge count={unread} /> },
    { value: 'Sent', label: 'יוצאות' },
  ]

  return (
    <>
      <PageHeader
        title="הודעות"
        description="הודעות פנימיות בתוך החברה: עם המנהל ועם חברי הצוות."
        actions={
          <Button icon={PenLine} onClick={() => setCompose({})}>
            הודעה חדשה
          </Button>
        }
      />

      <div className="mb-4 space-y-3">
        <SegmentedControl
          label="תיבה"
          options={boxOptions}
          value={filters.box}
          onChange={(box) => changeFilters({ box, status: '', otherUserId: '' })}
        />
        <MessageFilters filters={filters} onChange={changeFilters} directory={directory} userId={user.id} />
      </div>

      <div className="grid min-h-[28rem] overflow-hidden rounded-2xl border border-line bg-surface lg:grid-cols-[22rem_minmax(0,1fr)]">
        <div className={cn('border-line lg:border-e', selected && 'hidden lg:block')}>
          <QueryView query={messagesQuery} skeleton={<Skeleton className="m-4 h-64" />}>
            {(page) =>
              page.items.length === 0 ? (
                <div className="p-4">
                  <EmptyState
                    icon={Inbox}
                    title="אין הודעות"
                    description={filters.box === 'Inbox' ? 'הודעות שיישלחו אליך יופיעו כאן.' : 'הודעות ששלחת יופיעו כאן.'}
                  />
                </div>
              ) : (
                <>
                  <MessageList messages={page.items} box={filters.box} selectedId={selectedId} onSelect={selectMessage} />
                  <div className="px-4 pb-4">
                    <Pagination
                      page={page.page}
                      pageSize={page.pageSize}
                      totalCount={page.totalCount}
                      onPageChange={(next) => setFilters({ page: next })}
                    />
                  </div>
                </>
              )
            }
          </QueryView>
        </div>

        <div className={cn(!selected && 'hidden lg:block')}>
          <MessageReader
            message={selected}
            box={filters.box}
            onBack={() => setSelectedId(null)}
            onReply={(recipient) => setCompose({ replyTo: recipient })}
            onDelete={(message) => deleteMutation.mutate(message.id, { onSuccess: () => setSelectedId(null) })}
            deleting={deleteMutation.isPending}
          />
        </div>
      </div>

      <ComposeDialog open={Boolean(compose)} replyTo={compose?.replyTo} onClose={() => setCompose(null)} />
    </>
  )
}
