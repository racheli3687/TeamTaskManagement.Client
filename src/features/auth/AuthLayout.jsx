import { Outlet } from 'react-router'
import BrandMark from '../../components/layout/BrandMark'
import ThemeToggle from '../../components/layout/ThemeToggle'
import ClaimIllustration from './ClaimIllustration'

export default function AuthLayout() {
  return (
    <div className="grid min-h-dvh lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
      <div className="flex flex-col px-6 py-6 sm:px-12">
        <div className="flex items-center justify-between">
          <BrandMark />
          <ThemeToggle />
        </div>
        <main className="flex flex-1 items-center justify-center py-10">
          <div className="w-full max-w-sm">
            <Outlet />
          </div>
        </main>
      </div>

      <aside className="relative hidden overflow-hidden bg-brand lg:flex lg:flex-col lg:justify-center lg:px-16">
        <h2 className="max-w-md font-display text-5xl leading-[1.1] font-extrabold text-on-brand text-balance">
          כל משימה נתפסת פעם אחת.
        </h2>
        <p className="mt-5 max-w-md text-lg leading-relaxed text-on-brand/80">
          ראש הצוות מפרסם, חברי הצוות תופסים, והמערכת מוודאת שאף משימה לא נלקחת פעמיים, גם כששניים לוחצים באותו רגע.
        </p>
        <ClaimIllustration />
      </aside>
    </div>
  )
}
