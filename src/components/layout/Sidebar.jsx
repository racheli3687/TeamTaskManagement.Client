import { LogOut, X } from 'lucide-react'
import { NavLink, useNavigate } from 'react-router'
import { useAuth } from '../../auth/useAuth'
import { useUnreadCount } from '../../features/messages/queries'
import { cn } from '../../lib/cn'
import Avatar from '../ui/Avatar'
import { CountBadge, RoleBadge } from '../ui/Badge'
import BrandMark from './BrandMark'
import ThemeToggle from './ThemeToggle'
import { getNavItems } from './navigation'

// בטלפון: מגירה שנפתחת מהכפתור בסרגל העליון. במסך רחב: עמודה קבועה.
export default function Sidebar({ open, onClose }) {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const { data: unread } = useUnreadCount()

  // התנתקות יזומה: למסך ההתחברות, בלי חזרה לעמוד הנוכחי בכניסה הבאה
  function handleSignOut() {
    signOut()
    navigate('/login', { replace: true })
  }

  return (
    <>
      {open && <div className="fixed inset-0 z-30 bg-ink/40 lg:hidden" onClick={onClose} aria-hidden />}
      <aside
        className={cn(
          'fixed inset-y-0 start-0 z-40 flex w-72 flex-col border-e border-line bg-surface transition-transform duration-200',
          'lg:sticky lg:top-0 lg:h-dvh lg:w-auto lg:translate-x-0',
          open ? 'translate-x-0' : 'translate-x-full',
        )}
        aria-label="ניווט ראשי"
      >
        <div className="flex items-center justify-between px-5 py-5">
          <BrandMark />
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-ink-soft hover:bg-surface-2 lg:hidden"
            aria-label="סגירת התפריט"
          >
            <X className="size-5" aria-hidden />
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-2">
          {getNavItems(user).map(({ to, label, icon: Icon, end, showUnread }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={onClose}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition',
                  isActive ? 'bg-brand-soft text-brand' : 'text-ink-soft hover:bg-surface-2 hover:text-ink',
                )
              }
            >
              <Icon className="size-5" aria-hidden />
              <span className="flex-1">{label}</span>
              {showUnread && <CountBadge count={unread} />}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-line p-4">
          <div className="flex items-center gap-3">
            <Avatar name={user.userName} />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold" dir="auto">
                {user.userName}
              </p>
              <RoleBadge role={user.role} />
            </div>
            <ThemeToggle />
          </div>
          <button
            type="button"
            onClick={handleSignOut}
            className="mt-3 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-ink-soft hover:bg-danger-soft hover:text-danger"
          >
            <LogOut className="size-4" aria-hidden />
            התנתקות
          </button>
        </div>
      </aside>
    </>
  )
}
