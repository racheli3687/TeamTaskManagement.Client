import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '../../lib/cn'

// מספרי העמודים להצגה: הראשון, האחרון, והשכנים של העמוד הנוכחי. '…' במקום פער.
function pageNumbers(current, total) {
  const pages = [...new Set([1, current - 1, current, current + 1, total])]
    .filter((page) => page >= 1 && page <= total)
    .sort((a, b) => a - b)
  return pages.flatMap((page, index) => (index > 0 && page - pages[index - 1] > 1 ? ['…', page] : [page]))
}

export default function Pagination({ page, pageSize, totalCount, onPageChange }) {
  const totalPages = Math.ceil(totalCount / pageSize)
  if (totalPages <= 1) return null

  const from = (page - 1) * pageSize + 1
  const to = Math.min(page * pageSize, totalCount)
  const arrow = 'flex size-9 items-center justify-center rounded-lg text-ink-soft hover:bg-surface-2 disabled:opacity-40'

  return (
    <nav className="mt-6 flex flex-wrap items-center justify-between gap-3" aria-label="עמודים">
      <p className="text-sm text-ink-soft tabular-nums">
        {from}–{to} מתוך {totalCount}
      </p>
      <div className="flex items-center gap-1">
        <button type="button" className={arrow} onClick={() => onPageChange(page - 1)} disabled={page === 1} aria-label="העמוד הקודם">
          <ChevronRight className="size-4" aria-hidden />
        </button>
        {pageNumbers(page, totalPages).map((item, index) =>
          item === '…' ? (
            <span key={`gap-${index}`} className="px-1 text-ink-soft">
              …
            </span>
          ) : (
            <button
              key={item}
              type="button"
              onClick={() => onPageChange(item)}
              aria-current={item === page ? 'page' : undefined}
              className={cn(
                'min-w-9 rounded-lg px-2 py-1.5 text-sm font-medium tabular-nums',
                item === page ? 'bg-ink text-canvas' : 'text-ink-soft hover:bg-surface-2',
              )}
            >
              {item}
            </button>
          ),
        )}
        <button type="button" className={arrow} onClick={() => onPageChange(page + 1)} disabled={page === totalPages} aria-label="העמוד הבא">
          <ChevronLeft className="size-4" aria-hidden />
        </button>
      </div>
    </nav>
  )
}
