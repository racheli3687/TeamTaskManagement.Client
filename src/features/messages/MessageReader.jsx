import { ArrowRight, CheckCheck, Mail, Reply, Trash2 } from 'lucide-react'
import Avatar from '../../components/ui/Avatar'
import Button from '../../components/ui/Button'
import { formatDateTime } from '../../lib/format'
import { counterpart } from './counterpart'

export default function MessageReader({ message, box, onBack, onReply, onDelete, deleting }) {
  if (!message) {
    return (
      <div className="hidden h-full flex-col items-center justify-center gap-3 p-10 text-center text-ink-soft lg:flex">
        <Mail className="size-8" aria-hidden />
        <p>בחירת הודעה מהרשימה תציג אותה כאן.</p>
      </div>
    )
  }

  const other = counterpart(message, box)
  const isInbox = box === 'Inbox'

  return (
    <article className="flex h-full flex-col">
      <header className="flex items-start gap-3 border-b border-line p-5">
        <button
          type="button"
          onClick={onBack}
          className="rounded-lg p-1.5 text-ink-soft hover:bg-surface-2 lg:hidden"
          aria-label="חזרה לרשימה"
        >
          <ArrowRight className="size-5" aria-hidden />
        </button>
        <Avatar name={other.userName} />
        <div className="min-w-0 flex-1">
          <p className="font-semibold" dir="auto">
            {isInbox ? `מאת ${message.senderName}` : `אל ${message.recipientName}`}
          </p>
          <p className="text-xs text-ink-soft">{formatDateTime(message.sentAt)}</p>
        </div>
        {!isInbox && message.status === 'Read' && (
          <span className="inline-flex items-center gap-1 text-xs text-done" title="הנמען קרא את ההודעה">
            <CheckCheck className="size-4" aria-hidden />
            נקראה
          </span>
        )}
      </header>

      <p className="flex-1 p-5 leading-relaxed whitespace-pre-wrap" dir="auto">
        {message.text}
      </p>

      <footer className="flex flex-wrap gap-2 border-t border-line p-4">
        {isInbox && (
          <Button icon={Reply} onClick={() => onReply(other)}>
            תשובה
          </Button>
        )}
        <Button variant="danger" icon={Trash2} loading={deleting} onClick={() => onDelete(message)}>
          מחיקה
        </Button>
      </footer>
    </article>
  )
}
