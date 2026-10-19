import { Copy, KeyRound, Save } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router'
import { toast } from 'sonner'
import { useAuth } from '../../auth/useAuth'
import Avatar from '../../components/ui/Avatar'
import { RoleBadge } from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import { PasswordField, TextField } from '../../components/ui/Field'
import FormError from '../../components/ui/FormError'
import PageHeader from '../../components/ui/PageHeader'
import Panel from '../../components/ui/Panel'
import { LIMITS } from '../../lib/constants'
import { readForm } from '../../lib/forms'
import { useTeam } from '../teams/queries'
import { useChangePassword, useUpdateProfile } from './queries'

function ProfileSummary({ user }) {
  const { data: team } = useTeam(user.teamId)

  async function copyId() {
    try {
      await navigator.clipboard.writeText(String(user.id))
      toast.success('מספר המשתמש הועתק.')
    } catch {
      toast.error('לא ניתן להעתיק. אפשר לסמן את המספר ולהעתיק ידנית.')
    }
  }

  return (
    <Panel className="flex flex-col items-center text-center">
      <Avatar name={user.userName} size="lg" />
      <h2 className="mt-4 font-display text-2xl font-bold" dir="auto">
        {user.userName}
      </h2>
      <div className="mt-2">
        <RoleBadge role={user.role} />
      </div>

      <dl className="mt-6 w-full space-y-3 text-start text-sm">
        <div className="flex items-center justify-between gap-2">
          <dt className="text-ink-soft">מספר משתמש</dt>
          <dd className="flex items-center gap-1 font-semibold tabular-nums">
            {user.id}
            <button
              type="button"
              onClick={copyId}
              className="rounded p-1 text-ink-soft hover:bg-surface-2 hover:text-ink"
              aria-label="העתקת מספר המשתמש"
            >
              <Copy className="size-3.5" aria-hidden />
            </button>
          </dd>
        </div>
        <div className="flex items-center justify-between gap-2">
          <dt className="text-ink-soft">צוות</dt>
          <dd className="font-semibold">
            {user.teamId ? (
              <Link to={`/teams/${user.teamId}`} className="text-brand hover:underline" dir="auto">
                {team?.name ?? `צוות ${user.teamId}`}
              </Link>
            ) : (
              'ללא צוות'
            )}
          </dd>
        </div>
      </dl>
      <p className="mt-5 text-xs leading-relaxed text-ink-soft">
        מספר המשתמש משמש לשליחת הודעה למי שאינו ברשימת הנמענים, למשל למנהל החברה.
      </p>
    </Panel>
  )
}

function UserNameForm({ user }) {
  const updateMutation = useUpdateProfile()
  const error = updateMutation.error

  return (
    <Panel title="שם משתמש" description="השם שמוצג לאחרים ומשמש לכניסה למערכת.">
      <form onSubmit={(event) => updateMutation.mutate(readForm(event))} className="space-y-4">
        <FormError error={error} />
        <TextField
          label="שם משתמש"
          name="userName"
          defaultValue={user.userName}
          required
          minLength={3}
          maxLength={LIMITS.userName}
          autoComplete="username"
          dir="auto"
          error={error?.fieldError('userName')}
        />
        <Button type="submit" icon={Save} loading={updateMutation.isPending}>
          שמירה
        </Button>
      </form>
    </Panel>
  )
}

function PasswordForm() {
  const passwordMutation = useChangePassword()
  const [mismatch, setMismatch] = useState(false)
  const error = passwordMutation.error

  function handleSubmit(event) {
    const form = event.currentTarget
    const { currentPassword, newPassword, confirmPassword } = readForm(event)
    const passwordsDiffer = newPassword !== confirmPassword
    setMismatch(passwordsDiffer)
    if (!passwordsDiffer) {
      passwordMutation.mutate({ currentPassword, newPassword }, { onSuccess: () => form.reset() })
    }
  }

  return (
    <Panel title="סיסמה" description="לאחר השינוי, הכניסה הבאה תהיה עם הסיסמה החדשה.">
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormError error={error} />
        <PasswordField
          label="סיסמה נוכחית"
          name="currentPassword"
          required
          autoComplete="current-password"
          error={error?.fieldError('currentPassword')}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <PasswordField
            label="סיסמה חדשה"
            name="newPassword"
            required
            minLength={6}
            maxLength={LIMITS.password}
            autoComplete="new-password"
            hint="לפחות 6 תווים."
            error={error?.fieldError('newPassword')}
          />
          <PasswordField
            label="אימות הסיסמה החדשה"
            name="confirmPassword"
            required
            autoComplete="new-password"
            error={mismatch ? 'הסיסמאות אינן זהות.' : undefined}
          />
        </div>
        <Button type="submit" icon={KeyRound} loading={passwordMutation.isPending}>
          עדכון הסיסמה
        </Button>
      </form>
    </Panel>
  )
}

export default function ProfilePage() {
  const { user } = useAuth()
  return (
    <>
      <PageHeader title="פרופיל" description="פרטי החשבון, שם המשתמש והסיסמה." />
      <div className="grid gap-6 lg:grid-cols-[18rem_minmax(0,1fr)]">
        <ProfileSummary user={user} />
        <div className="space-y-6">
          <UserNameForm key={user.userName} user={user} />
          <PasswordForm />
        </div>
      </div>
    </>
  )
}
