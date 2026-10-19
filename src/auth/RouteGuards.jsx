import { Navigate, Outlet, useLocation } from 'react-router'
import { useAuth } from './useAuth'

// מסלולים מוגנים. בלי התחברות: מעבר להתחברות וחזרה לעמוד המבוקש. תפקיד לא מתאים: ללוח הבקרה.
// זו נוחות תצוגה בלבד; ההרשאה האמיתית נבדקת בשרת.
export function RequireAuth({ roles }) {
  const { user } = useAuth()
  const location = useLocation()

  if (!user) return <Navigate to="/login" replace state={{ from: location }} />
  if (roles && !roles.includes(user.role)) return <Navigate to="/" replace />
  return <Outlet />
}

// התחברות והרשמה: משתמש מחובר מועבר ללוח הבקרה
export function GuestOnly() {
  const { user } = useAuth()
  return user ? <Navigate to="/" replace /> : <Outlet />
}
