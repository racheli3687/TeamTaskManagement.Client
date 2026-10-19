import { useMutation } from '@tanstack/react-query'
import { Building2 } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { register } from '../../api/auth'
import { useAuth } from '../../auth/useAuth'
import Button from '../../components/ui/Button'
import { PasswordField, TextField } from '../../components/ui/Field'
import { LIMITS } from '../../lib/constants'
import { readForm } from '../../lib/forms'
import AuthCard from './AuthCard'

export default function RegisterPage() {
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const [mismatch, setMismatch] = useState(false)

  const registerMutation = useMutation({
    mutationFn: register,
    meta: { errorsShownInline: true },
    onSuccess: (auth) => {
      signIn(auth)
      navigate('/', { replace: true })
    },
  })

  function handleSubmit(event) {
    const { confirmPassword, ...details } = readForm(event)
    const passwordsDiffer = confirmPassword !== details.password
    setMismatch(passwordsDiffer)
    if (!passwordsDiffer) registerMutation.mutate(details)
  }

  const error = registerMutation.error

  return (
    <AuthCard
      title="פתיחת חברה"
      subtitle="החברה והמשתמש של המנהל נוצרים יחד. אחר כך אפשר להקים צוותים ולצרף אליהם חברים."
      error={error}
      onSubmit={handleSubmit}
      footer={
        <>
          כבר רשומים?{' '}
          <Link to="/login" className="font-semibold text-brand hover:underline">
            התחברות
          </Link>
        </>
      }
    >
      <TextField
        label="שם החברה"
        name="organizationName"
        required
        minLength={2}
        maxLength={LIMITS.organizationName}
        autoFocus
        error={error?.fieldError('organizationName')}
      />
      <TextField
        label="שם משתמש"
        name="userName"
        autoComplete="username"
        dir="auto"
        required
        minLength={3}
        maxLength={LIMITS.userName}
        hint="ישמש לכניסה למערכת."
        error={error?.fieldError('userName')}
      />
      <PasswordField
        label="סיסמה"
        name="password"
        autoComplete="new-password"
        required
        minLength={6}
        maxLength={LIMITS.password}
        hint="לפחות 6 תווים."
        error={error?.fieldError('password')}
      />
      <PasswordField
        label="אימות סיסמה"
        name="confirmPassword"
        autoComplete="new-password"
        required
        error={mismatch ? 'הסיסמאות אינן זהות.' : undefined}
      />
      <Button type="submit" size="lg" className="w-full" icon={Building2} loading={registerMutation.isPending}>
        יצירת החברה
      </Button>
    </AuthCard>
  )
}
