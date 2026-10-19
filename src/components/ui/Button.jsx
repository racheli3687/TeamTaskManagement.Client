import { LoaderCircle } from 'lucide-react'
import { buttonStyles } from '../../lib/buttonStyles'

export default function Button({
  variant,
  size,
  icon: Icon,
  loading = false,
  disabled,
  className,
  type = 'button',
  children,
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={buttonStyles({ variant, size, className })}
      {...props}
    >
      {loading ? (
        <LoaderCircle className="size-4 animate-spin" aria-hidden />
      ) : (
        Icon && <Icon className="size-4" aria-hidden />
      )}
      {children}
    </button>
  )
}
