import { cn } from '../../lib/cn'

// בחירה אחת מתוך כמה אפשרויות קצרות (סטטוס, תיבת הודעות)
export default function SegmentedControl({ label, options, value, onChange }) {
  return (
    <div role="radiogroup" aria-label={label} className="inline-flex rounded-xl bg-surface-2 p-1">
      {options.map((option) => {
        const selected = option.value === value
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(option.value)}
            className={cn(
              'flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium transition',
              selected ? 'bg-surface text-ink shadow-sm' : 'text-ink-soft hover:text-ink',
            )}
          >
            {option.label}
            {option.badge}
          </button>
        )
      })}
    </div>
  )
}
