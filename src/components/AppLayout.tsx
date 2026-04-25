import {
  BellDot,
  ArrowRight,
  BookOpen,
  FolderKanban,
  Gauge,
  MenuSquare,
  Settings,
} from 'lucide-react'
import { NavLink, Outlet } from 'react-router'

const navItems = [
  { to: '/', label: 'Dashboard', icon: Gauge, exact: true },
  { to: '/weeks', label: 'Weeks', icon: BookOpen },
  { to: '/capstone', label: 'Capstone', icon: FolderKanban },
  { to: '/settings', label: 'Settings', icon: Settings },
]

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-[var(--color-surface)] text-[var(--color-text)]">
      <header className="border-b border-[var(--color-border)] bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[var(--color-primary)]">
              Business Analyst Mastery Portal
            </p>
            <h1 className="mt-1 text-lg font-semibold text-[var(--color-text)] sm:text-xl">
              Clean app shell for structured BA learning
            </h1>
          </div>
          <div className="hidden items-center gap-3 md:flex">
            <div className="rounded-full border border-[var(--color-border)] bg-[var(--color-panel)] px-4 py-2 text-sm font-medium text-[var(--color-muted)]">
              Initial shell
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[var(--color-border)] bg-white text-[var(--color-primary)] shadow-[var(--shadow-card)]">
              <BellDot size={18} />
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-7xl flex-col lg:flex-row">
        <aside className="border-b border-[var(--color-border)] bg-[var(--color-panel)] lg:min-h-[calc(100vh-81px)] lg:w-80 lg:border-b-0 lg:border-r">
          <div className="p-4 sm:p-6">
            <div className="rounded-[2rem] bg-[var(--color-text)] p-6 text-white shadow-[var(--shadow-soft)]">
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/70">
                  Learning Path
                </p>
                <MenuSquare size={18} className="text-white/70" />
              </div>
              <p className="mt-4 text-2xl font-semibold">12-week BA roadmap</p>
              <p className="mt-2 text-sm leading-6 text-white/75">
                Responsive scaffolding for dashboards, weekly planning,
                capstone work, and settings.
              </p>
              <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-2xl bg-white/10 px-4 py-3">
                  <div className="text-white/65">Routes</div>
                  <div className="mt-1 font-semibold">5 ready</div>
                </div>
                <div className="rounded-2xl bg-white/10 px-4 py-3">
                  <div className="text-white/65">Design</div>
                  <div className="mt-1 font-semibold">Tailwind shell</div>
                </div>
              </div>
            </div>

            <nav
              aria-label="Primary"
              className="mt-6 flex gap-3 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible"
            >
              {navItems.map(({ to, label, icon: Icon, exact }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={exact}
                  className={({ isActive }) =>
                    [
                      'flex min-w-fit items-center gap-3 rounded-2xl border px-4 py-3 text-sm font-medium transition',
                      isActive
                        ? 'border-[var(--color-primary)] bg-[var(--color-primary)] text-white shadow-[var(--shadow-soft)]'
                        : 'border-[var(--color-border)] bg-white text-[var(--color-text)] hover:border-[var(--color-primary)]/40 hover:bg-[var(--color-surface)]',
                    ].join(' ')
                  }
                >
                  <Icon size={18} />
                  <span>{label}</span>
                </NavLink>
              ))}
            </nav>

            <div className="mt-6 grid gap-4">
              <div className="rounded-[1.75rem] border border-[var(--color-border)] bg-white p-5">
                <p className="text-sm font-semibold text-[var(--color-text)]">
                  What this shell includes
                </p>
                <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">
                  A professional baseline with routing, responsive layout, and
                  placeholders that are easy to replace route by route.
                </p>
              </div>

              <div className="rounded-[1.75rem] border border-[var(--color-border)] bg-white p-5">
                <p className="text-sm font-semibold text-[var(--color-text)]">
                  Suggested next step
                </p>
                <div className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-[var(--color-accent)]">
                  Connect real learning data
                  <ArrowRight size={16} />
                </div>
              </div>
            </div>
          </div>
        </aside>

        <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
