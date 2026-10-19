import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../../theme/useTheme'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'
  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="flex size-9 items-center justify-center rounded-lg text-ink-soft hover:bg-surface-2 hover:text-ink"
      aria-label={isDark ? 'מעבר למצב בהיר' : 'מעבר למצב כהה'}
      title={isDark ? 'מצב בהיר' : 'מצב כהה'}
    >
      {isDark ? <Sun className="size-5" aria-hidden /> : <Moon className="size-5" aria-hidden />}
    </button>
  )
}
