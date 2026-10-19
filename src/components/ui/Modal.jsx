import { X } from 'lucide-react'
import { useEffect, useId, useRef } from 'react'
import { cn } from '../../lib/cn'

const WIDTHS = { sm: 'max-w-md', md: 'max-w-lg', lg: 'max-w-2xl' }

// חלון על בסיס <dialog>: מלכודת פוקוס, Esc ושכבת רקע מובנים בדפדפן.
// התוכן נטען רק כשהחלון פתוח, כך שכל פתיחה מתחילה טופס נקי.
export default function Modal({ open, onClose, title, description, size = 'md', children }) {
  const dialogRef = useRef(null)
  const titleId = useId()

  useEffect(() => {
    const dialog = dialogRef.current
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      onClose={onClose}
      onClick={(event) => event.target === dialogRef.current && onClose()}
      className={cn(
        'm-auto w-[calc(100%-2rem)] rounded-2xl border border-line bg-surface p-0 text-ink shadow-2xl open:animate-dialog',
        WIDTHS[size],
      )}
    >
      {open && (
        <div className="p-6">
          <header className="mb-5 flex items-start justify-between gap-4">
            <div>
              <h2 id={titleId} className="font-display text-xl font-bold">
                {title}
              </h2>
              {description && <p className="mt-1 text-sm text-ink-soft">{description}</p>}
            </div>
            <button
              type="button"
              onClick={onClose}
              className="-m-1 rounded-lg p-1.5 text-ink-soft hover:bg-surface-2 hover:text-ink"
              aria-label="סגירה"
            >
              <X className="size-5" aria-hidden />
            </button>
          </header>
          {children}
        </div>
      )}
    </dialog>
  )
}
