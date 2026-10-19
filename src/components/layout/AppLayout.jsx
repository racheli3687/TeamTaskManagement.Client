import { Menu } from 'lucide-react'
import { useState } from 'react'
import { Outlet } from 'react-router'
import BrandMark from './BrandMark'
import Sidebar from './Sidebar'
import ThemeToggle from './ThemeToggle'

export default function AppLayout() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="min-h-dvh lg:grid lg:grid-cols-[17rem_minmax(0,1fr)]">
      <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} />

      <div className="min-w-0">
        <header className="sticky top-0 z-20 flex items-center justify-between border-b border-line bg-surface/90 px-4 py-3 backdrop-blur lg:hidden">
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="rounded-lg p-2 text-ink-soft hover:bg-surface-2"
            aria-label="פתיחת התפריט"
          >
            <Menu className="size-5" aria-hidden />
          </button>
          <BrandMark />
          <ThemeToggle />
        </header>

        <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-8 lg:py-12">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
