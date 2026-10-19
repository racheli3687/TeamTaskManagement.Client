import { cn } from '../../lib/cn'
import { initials } from '../../lib/format'

const TONES = ['bg-brand-soft text-brand', 'bg-marker-soft text-ink', 'bg-done-soft text-done', 'bg-surface-2 text-ink']
const SIZES = { sm: 'size-7 text-[0.7rem]', md: 'size-9 text-xs', lg: 'size-16 text-xl' }

// הגוון נגזר מהשם, כך שאותו משתמש מקבל תמיד אותו צבע
const toneFor = (name) => TONES[[...name].reduce((sum, char) => sum + char.charCodeAt(0), 0) % TONES.length]

export default function Avatar({ name, size = 'md' }) {
  return (
    <span
      className={cn('inline-flex shrink-0 items-center justify-center rounded-full font-display font-bold', SIZES[size], toneFor(name))}
      aria-hidden
    >
      {initials(name)}
    </span>
  )
}
