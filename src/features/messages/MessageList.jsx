import Avatar from '../../components/ui/Avatar'
import { cn } from '../../lib/cn'
import { formatRelative } from '../../lib/format'
import { counterpart } from './counterpart'

export default function MessageList({ messages, box, selectedId, onSelect }) {
  return (
    <ul className="divide-y divide-line">
      {messages.map((message) => {
        const other = counterpart(message, box)
        const unread = box === 'Inbox' && message.status === 'Unread'
        const selected = message.id === selectedId
        return (
          <li key={message.id}>
            <button
              type="button"
              onClick={() => onSelect(message)}
              aria-current={selected || undefined}
              className={cn(
                'flex w-full items-start gap-3 px-4 py-3.5 text-start transition',
                selected ? 'bg-brand-soft' : 'hover:bg-surface-2',
              )}
            >
              <Avatar name={other.userName} />
              <span className="min-w-0 flex-1">
                <span className="flex items-baseline justify-between gap-2">
                  <span className={cn('truncate', unread ? 'font-bold' : 'font-medium')} dir="auto">
                    {box === 'Sent' && <span className="font-normal text-ink-soft">אל </span>}
                    {other.userName}
                  </span>
                  <time dateTime={message.sentAt} className="shrink-0 text-xs text-ink-soft">
                    {formatRelative(message.sentAt)}
                  </time>
                </span>
                <span className={cn('mt-0.5 line-clamp-1 text-sm', unread ? 'text-ink' : 'text-ink-soft')} dir="auto">
                  {message.text}
                </span>
              </span>
              {unread && <span className="mt-2 size-2 shrink-0 rounded-full bg-brand" aria-label="לא נקראה" />}
            </button>
          </li>
        )
      })}
    </ul>
  )
}
