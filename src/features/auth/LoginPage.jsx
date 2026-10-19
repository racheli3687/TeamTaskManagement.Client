import { useMutation } from '@tanstack/react-query'
import { LogIn } from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router'
import { login } from '../../api/auth'
import { useAuth } from '../../auth/useAuth'
import Button from '../../components/ui/Button'
import { PasswordField, TextField } from '../../components/ui/Field'
import { readForm } from '../../lib/forms'
import AuthCard from './AuthCard'

export default function LoginPage() {
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const loginMutation = useMutation({
    mutationFn: login,
    meta: { errorsShownInline: true },
    onSuccess: (auth) => {
      signIn(auth)
      navigate(location.state?.from?.pathname ?? '/', { replace: true })
    },
  })

  const error = loginMutation.error

  return (
    <AuthCard
      title="התחברות"
      subtitle="ברוכים השבים. יש להזין שם משתמש וסיסמה."
      error={error}
      onSubmit={(event) => loginMutation.mutate(readForm(event))}
      footer={
        <>
          חברה חדשה במערכת?{' '}
          <Link to="/register" className="font-semibold text-brand hover:underline">
            הרשמה כמנהל חברה
          </Link>
        </>
      }
    >
      <TextField
        label="שם משתמש"
        name="userName"
        autoComplete="username"
        dir="auto"
        required
        autoFocus
        error={error?.fieldError('userName')}
      />
      <PasswordField
        label="סיסמה"
        name="password"
        autoComplete="current-password"
        required
        error={error?.fieldError('password')}
      />
      <Button type="submit" size="lg" className="w-full" icon={LogIn} loading={loginMutation.isPending}>
        כניסה
      </Button>
    </AuthCard>
  )
}
