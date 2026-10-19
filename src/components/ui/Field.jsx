import { Eye, EyeOff } from 'lucide-react'
import { useId, useState } from 'react'
import { cn } from '../../lib/cn'

const CONTROL =
  'w-full rounded-lg border border-line bg-surface px-3 text-ink transition placeholder:text-ink-soft/70 ' +
  'focus:border-brand focus:outline-none focus:ring-3 focus:ring-brand/20 ' +
  'aria-[invalid=true]:border-danger aria-[invalid=true]:ring-danger/15'

function FieldShell({ id, label, hint, error, aside, children }) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="text-sm font-medium">
          {label}
        </label>
        {aside}
      </div>
      {children}
      {error ? (
        <p id={`${id}-message`} className="text-sm text-danger">
          {error}
        </p>
      ) : (
        hint && (
          <p id={`${id}-message`} className="text-xs text-ink-soft">
            {hint}
          </p>
        )
      )}
    </div>
  )
}

// מאפייני נגישות משותפים: שדה שגוי מסומן, וההודעה מקושרת אליו
const controlProps = (id, error, hint) => ({
  id,
  'aria-invalid': Boolean(error),
  'aria-describedby': error || hint ? `${id}-message` : undefined,
})

export function TextField({ label, hint, error, className, ...props }) {
  const id = useId()
  return (
    <FieldShell id={id} label={label} hint={hint} error={error}>
      <input {...controlProps(id, error, hint)} className={cn(CONTROL, 'h-10', className)} {...props} />
    </FieldShell>
  )
}

export function PasswordField({ label, hint, error, ...props }) {
  const id = useId()
  const [visible, setVisible] = useState(false)
  return (
    <FieldShell id={id} label={label} hint={hint} error={error}>
      {/* הסיסמה נכתבת משמאל לימין, ולכן הכפתור והריפוד בכיוונים פיזיים (שמאל) ולא לוגיים */}
      <div className="relative">
        <input
          {...controlProps(id, error, hint)}
          type={visible ? 'text' : 'password'}
          className={cn(CONTROL, 'h-10 pl-11')}
          dir="ltr"
          {...props}
        />
        <button
          type="button"
          onClick={() => setVisible((current) => !current)}
          className="absolute inset-y-0 left-0 flex w-10 items-center justify-center rounded-l-lg text-ink-soft hover:text-ink"
          aria-label={visible ? 'הסתרת הסיסמה' : 'הצגת הסיסמה'}
          aria-pressed={visible}
        >
          {visible ? <EyeOff className="size-4" aria-hidden /> : <Eye className="size-4" aria-hidden />}
        </button>
      </div>
    </FieldShell>
  )
}

export function TextAreaField({ label, hint, error, maxLength, defaultValue = '', ...props }) {
  const id = useId()
  const [length, setLength] = useState(defaultValue.length)
  const counter = maxLength && (
    <span className="text-xs text-ink-soft tabular-nums" aria-live="polite">
      {length}/{maxLength}
    </span>
  )
  return (
    <FieldShell id={id} label={label} hint={hint} error={error} aside={counter}>
      <textarea
        {...controlProps(id, error, hint)}
        maxLength={maxLength}
        defaultValue={defaultValue}
        onInput={(event) => setLength(event.currentTarget.value.length)}
        className={cn(CONTROL, 'min-h-28 resize-y py-2 leading-relaxed')}
        {...props}
      />
    </FieldShell>
  )
}

export function SelectField({ label, hint, error, children, className, ...props }) {
  const id = useId()
  return (
    <FieldShell id={id} label={label} hint={hint} error={error}>
      <select {...controlProps(id, error, hint)} className={cn(CONTROL, 'h-10', className)} {...props}>
        {children}
      </select>
    </FieldShell>
  )
}
