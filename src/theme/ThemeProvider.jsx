import { useCallback, useEffect, useMemo, useState } from 'react'
import { ThemeContext } from './themeContext'

const STORAGE_KEY = 'theme'

// המצב ההתחלתי נקבע כבר ב-index.html (לפני הציור הראשון), כאן רק קוראים אותו
const readInitialTheme = () => (document.documentElement.classList.contains('dark') ? 'dark' : 'light')

export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(readInitialTheme)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  // נשמר רק בבחירה מפורשת. עד אז התצוגה עוקבת אחרי הגדרת המערכת.
  const toggleTheme = useCallback(() => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // אחסון חסום: הבחירה תחול עד רענון הדף
    }
  }, [theme])

  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme])
  return <ThemeContext value={value}>{children}</ThemeContext>
}
