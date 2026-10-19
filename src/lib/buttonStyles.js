import { cn } from './cn'

const VARIANTS = {
  primary: 'bg-brand text-on-brand shadow-sm hover:brightness-110',
  secondary: 'border border-line bg-surface text-ink hover:bg-surface-2',
  ghost: 'text-ink-soft hover:bg-surface-2 hover:text-ink',
  danger: 'bg-danger-soft text-danger hover:brightness-95',
  // הפעולה של המשאב המוגבל (תפיסה): צבע המרקר, זהה בשני מצבי התצוגה
  marker: 'bg-marker text-[#18202e] shadow-[inset_0_-2px_0_rgb(0_0_0/0.14)] hover:brightness-105',
}

const SIZES = {
  sm: 'h-8 gap-1.5 px-3 text-sm',
  md: 'h-10 gap-2 px-4 text-sm',
  lg: 'h-12 gap-2 px-6 text-base',
  icon: 'size-9',
}

// משותף ל-Button ול-ButtonLink, כדי שקישור שנראה ככפתור יהיה זהה לו
export const buttonStyles = ({ variant = 'primary', size = 'md', className } = {}) =>
  cn(
    'inline-flex shrink-0 items-center justify-center rounded-lg font-medium whitespace-nowrap transition',
    'disabled:cursor-not-allowed disabled:opacity-55',
    VARIANTS[variant],
    SIZES[size],
    className,
  )
