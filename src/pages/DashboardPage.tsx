import PlaceholderCard from '../components/PlaceholderCard'
import PageHeader from '../components/PageHeader'

export default function DashboardPage() {
  return (
    <section className="space-y-6">
      <div className="rounded-[2rem] bg-[linear-gradient(135deg,rgba(44,62,80,1)_0%,rgba(52,152,219,0.92)_100%)] px-6 py-8 text-white shadow-[var(--shadow-soft)] sm:px-8">
        <PageHeader
          eyebrow="Dashboard"
          title="Business Analyst Mastery at a glance"
          description="This dashboard is the landing shell for progress snapshots, learning highlights, and quick navigation into the course workspace."
        />
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <PlaceholderCard
          title="Weekly progress summary"
          description="Reserve this space for completion stats, pace tracking, and active learning goals."
          accent="blue"
        />
        <PlaceholderCard
          title="Capstone milestone tracker"
          description="Use this card later for project status, due dates, and deliverable health."
          accent="green"
        />
        <PlaceholderCard
          title="Upcoming reminders"
          description="Add deadlines, revision checkpoints, or mentor follow-ups here."
          accent="amber"
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
        <article className="rounded-[1.75rem] border border-[var(--color-border)] bg-white p-6 shadow-[var(--shadow-card)]">
          <h3 className="text-lg font-semibold text-[var(--color-text)]">
            Initial dashboard modules
          </h3>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              ['Overview', 'Course health, focus metrics, and current week context.'],
              ['Momentum', 'A home for streaks, notes, and assessment readiness.'],
              ['Actions', 'Quick links to the next task, file, or study session.'],
            ].map(([title, description]) => (
              <div
                key={title}
                className="rounded-[1.25rem] bg-[var(--color-surface)] p-4"
              >
                <p className="font-semibold text-[var(--color-text)]">{title}</p>
                <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-[1.75rem] border border-[var(--color-border)] bg-white p-6 shadow-[var(--shadow-card)]">
          <h3 className="text-lg font-semibold text-[var(--color-text)]">
            Shell notes
          </h3>
          <ul className="mt-5 space-y-3 text-sm leading-6 text-[var(--color-muted)]">
            <li className="rounded-2xl bg-[var(--color-surface)] px-4 py-3">
              The route structure is live and ready for real data wiring.
            </li>
            <li className="rounded-2xl bg-[var(--color-surface)] px-4 py-3">
              The layout already adapts from stacked mobile view to sidebar desktop view.
            </li>
            <li className="rounded-2xl bg-[var(--color-surface)] px-4 py-3">
              Placeholder blocks can be replaced without redesigning the shell.
            </li>
          </ul>
        </article>
      </div>
    </section>
  )
}
