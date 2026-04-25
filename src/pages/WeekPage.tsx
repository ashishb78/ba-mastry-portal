import { useParams } from 'react-router'

export default function WeekPage() {
  const { weekNumber = '1' } = useParams()

  return (
    <section className="space-y-6">
      <div className="rounded-[2rem] border border-[var(--color-border)] bg-white p-6 shadow-[var(--shadow-card)] sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--color-primary)]">
          Week {weekNumber}
        </p>
        <h2 className="mt-2 text-3xl font-semibold text-[var(--color-text)]">
          Weekly workspace placeholder
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--color-muted)]">
          This route is ready to become the detailed study page for week{' '}
          {weekNumber}, including objectives, exercises, notes, and progress
          check-ins.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {[
          ['Objectives', 'Define the BA skills and outcomes for this week.'],
          ['Practice tasks', 'Capture exercises, templates, and mini deliverables.'],
          ['Review checklist', 'Track confidence, blockers, and follow-up topics.'],
        ].map(([title, description], index) => (
          <article
            key={title}
            className="rounded-[1.5rem] border border-[var(--color-border)] bg-white p-5 shadow-[var(--shadow-card)]"
          >
            <div className="text-sm font-semibold text-[var(--color-accent)]">
              0{index + 1}
            </div>
            <h3 className="mt-3 text-lg font-semibold text-[var(--color-text)]">
              {title}
            </h3>
            <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">
              {description}
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}
