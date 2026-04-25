import {
  ArrowRight,
  BookOpen,
  FolderKanban,
  Gauge,
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
      <header className="border-b border-[var(--color-border)] bg-[var(--color-panel)]/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-primary)]">
              Business Analyst Mastery Portal
            </p>
            <h1 className="mt-1 text-xl font-semibold text-[var(--color-text)]">
              Structured learning, weekly momentum
            </h1>
          </div>
          <div className="hidden rounded-full border border-[var(--color-border)] bg-white px-4 py-2 text-sm font-medium text-[var(--color-muted)] md:flex md:items-center md:gap-2">
            <span className="h-2 w-2 rounded-full bg-[var(--color-success)]" />
            Cohort workspace ready
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-7xl flex-col lg:flex-row">
        <aside className="border-b border-[var(--color-border)] bg-[var(--color-panel)] lg:min-h-[calc(100vh-89px)] lg:w-72 lg:border-b-0 lg:border-r">
          <div className="p-4 sm:p-6">
            <div className="rounded-3xl bg-[var(--color-text)] p-5 text-white shadow-[var(--shadow-soft)]">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/70">
                Learning Path
              </p>
              <p className="mt-3 text-2xl font-semibold">12-week BA roadmap</p>
              <p className="mt-2 text-sm leading-6 text-white/75">
                A focused portal for dashboards, weekly planning, capstone work,
                and personal study settings.
              </p>
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

            <div className="mt-6 hidden rounded-3xl border border-[var(--color-border)] bg-white p-5 lg:block">
              <p className="text-sm font-semibold text-[var(--color-text)]">
                Quick focus
              </p>
              <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">
                Keep the shell lightweight now, then plug in progress tracking,
                notes, and assessments route by route.
              </p>
              <div className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-[var(--color-accent)]">
                Placeholder-ready modules
                <ArrowRight size={16} />
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
