import SearchInput from '../../components/ui/SearchInput'
import DirectoryOptions from '../teams/DirectoryOptions'

const CONTROL = 'h-10 rounded-lg border border-line bg-surface px-3 text-sm focus:border-brand focus:outline-none'

// סינון ההודעות. כל הסינונים מתבצעים בשרת.
export default function MessageFilters({ filters, onChange, directory, userId }) {
  const isInbox = filters.box === 'Inbox'

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[minmax(0,1fr)_auto_auto_auto_auto]">
      <SearchInput
        label="חיפוש בתוכן"
        placeholder="חיפוש בתוכן ההודעות"
        value={filters.search}
        onChange={(search) => onChange({ search })}
      />
      <select
        aria-label={isInbox ? 'סינון לפי שולח' : 'סינון לפי נמען'}
        className={CONTROL}
        value={filters.otherUserId}
        onChange={(event) => onChange({ otherUserId: event.target.value })}
      >
        <option value="">{isInbox ? 'מכל השולחים' : 'לכל הנמענים'}</option>
        <DirectoryOptions directory={directory} include={(member) => member.id !== userId} />
      </select>
      {isInbox && (
        <select
          aria-label="סינון לפי מצב קריאה"
          className={CONTROL}
          value={filters.status}
          onChange={(event) => onChange({ status: event.target.value })}
        >
          <option value="">נקראו ולא נקראו</option>
          <option value="Unread">לא נקראו</option>
          <option value="Read">נקראו</option>
        </select>
      )}
      <label className="flex items-center gap-2 text-sm text-ink-soft">
        מתאריך
        <input
          type="date"
          className={CONTROL}
          value={filters.fromDate}
          max={filters.toDate || undefined}
          onChange={(event) => onChange({ fromDate: event.target.value })}
        />
      </label>
      <label className="flex items-center gap-2 text-sm text-ink-soft">
        עד
        <input
          type="date"
          className={CONTROL}
          value={filters.toDate}
          min={filters.fromDate || undefined}
          onChange={(event) => onChange({ toDate: event.target.value })}
        />
      </label>
    </div>
  )
}
