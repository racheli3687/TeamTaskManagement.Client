import FormError from '../../components/ui/FormError'

// מבנה משותף להתחברות ולהרשמה
export default function AuthCard({ title, subtitle, error, onSubmit, footer, children }) {
  return (
    <>
      <h1 className="font-display text-3xl font-bold tracking-tight">{title}</h1>
      <p className="mt-2 text-ink-soft">{subtitle}</p>
      <form onSubmit={onSubmit} className="mt-8 space-y-4">
        <FormError error={error} />
        {children}
      </form>
      <p className="mt-8 text-sm text-ink-soft">{footer}</p>
    </>
  )
}
