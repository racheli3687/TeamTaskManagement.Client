import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { toast } from 'sonner'
import { setUnauthorizedHandler } from '../api/client'
import { queryKeys } from '../api/queryKeys'
import { getMyProfile } from '../api/users'
import { AuthContext } from './authContext'
import { clearSession, getSession, saveSession } from './session'

export default function AuthProvider({ children }) {
  const queryClient = useQueryClient()
  const [session, setSession] = useState(getSession)

  const signIn = useCallback((auth) => {
    saveSession(auth)
    setSession(auth)
  }, [])

  const signOut = useCallback(
    (reason) => {
      clearSession()
      setSession(null)
      queryClient.clear()
      // id קבוע: כמה בקשות שנדחו יחד מציגות הודעה אחת
      if (reason) toast.info(reason, { id: 'session-ended' })
    },
    [queryClient],
  )

  useEffect(() => {
    setUnauthorizedHandler(() => signOut('החיבור פג. יש להתחבר מחדש.'))
  }, [signOut])

  // התנתקות אוטומטית בתום תוקף ה-token
  useEffect(() => {
    if (!session) return undefined
    const timer = setTimeout(
      () => signOut('תוקף החיבור הסתיים. יש להתחבר מחדש.'),
      new Date(session.expiresAt) - Date.now(),
    )
    return () => clearTimeout(timer)
  }, [session, signOut])

  // התפקיד והצוות נטענים מהשרת, כמו בשרת עצמו: מינוי או העברה חלים בלי התחברות מחדש
  const { data: profile } = useQuery({
    queryKey: queryKeys.me,
    queryFn: ({ signal }) => getMyProfile(signal),
    enabled: Boolean(session),
  })

  const user = useMemo(
    () =>
      session && {
        id: session.userId,
        organizationId: session.organizationId,
        userName: profile?.userName ?? session.userName,
        role: profile?.role ?? session.role,
        teamId: profile ? profile.teamId : session.teamId,
      },
    [session, profile],
  )

  const value = useMemo(() => ({ user, signIn, signOut }), [user, signIn, signOut])
  return <AuthContext value={value}>{children}</AuthContext>
}
