import { ArrowDownWideNarrow, ArrowUpNarrowWide } from 'lucide-react'
import SearchInput from '../../components/ui/SearchInput'
import SegmentedControl from '../../components/ui/SegmentedControl'
import { TASK_SORT_OPTIONS, TASK_STATUS_LABELS } from '../../lib/constants'

const STATUS_OPTIONS = [
  { value: '', label: 'הכול' },
  ...Object.entries(TASK_STATUS_LABELS).map(([value, label]) => ({ value, label })),
]

const SELECT = 'h-10 rounded-lg border border-line bg-surface px-3 text-sm focus:border-brand focus:outline-none'

// סינון, חיפוש ומיון. כולם מתבצעים בשרת (בשאילתה), לא בדפדפן.
export default function TaskFilters({ filters, onChange }) {
  const DirectionIcon = filters.descending ? ArrowDownWideNarrow : ArrowUpNarrowWide

  return (
    <div className="mb-6 flex flex-col gap-3 lg:flex-row lg:items-center">
      <SegmentedControl
        label="סטטוס"
        options={STATUS_OPTIONS}
        value={filters.status}
        onChange={(status) => onChange({ status })}
      />
      <SearchInput
        label="חיפוש בכותרת"
        placeholder="חיפוש בכותרת המשימה"
        value={filters.search}
        onChange={(search) => onChange({ search })}
      />
      <div className="flex items-center gap-2">
        <label className="sr-only" htmlFor="task-sort">
          מיון לפי
        </label>
        <select
          id="task-sort"
          className={SELECT}
          value={filters.sortBy}
          onChange={(event) => onChange({ sortBy: event.target.value })}
        >
          {TASK_SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              מיון: {option.label}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={() => onChange({ descending: !filters.descending })}
          className="flex size-10 items-center justify-center rounded-lg border border-line bg-surface text-ink-soft hover:text-ink"
          aria-label={filters.descending ? 'סדר יורד. מעבר לסדר עולה' : 'סדר עולה. מעבר לסדר יורד'}
          title={filters.descending ? 'סדר יורד' : 'סדר עולה'}
        >
          <DirectionIcon className="size-4" aria-hidden />
        </button>
      </div>
    </div>
  )
}
