import { Link } from 'react-router'

export default function WeeksPage() {
  const weeks = Array.from({ length: 12 }, (_, index) => ({
    number: index + 1,
    title: [
      'BA foundations',
      'Requirements discovery',
      'Stakeholder analysis',
      'Process modeling',
      'Data thinking',
      'Documentation quality',
      'Backlog refinement',
      'Solution evaluation',
      'Agile BA practices',
      'Metrics and reporting',
      'Presentation readiness',
      'Final capstone prep',
    ][index],
  }))

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--color-primary)]">
            Weeks
          </p>
          <h2 className="mt-2 text-3xl font-semibold text-[var(--color-text)]">
            Weekly learning map
          </h2>
        </div>
        <p className="max-w-xl text-sm leading-7 text-[var(--color-muted)]">
          Placeholder cards are ready for week-by-week curriculum details,
          assignments, and assessments.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {weeks.map((week) => (
          <Link
            key={week.number}
            to={`/week/${week.number}`}
            className="group rounded-[1.75rem] border border-[var(--color-border)] bg-white p-5 shadow-[var(--shadow-card)] transition hover:-translate-y-0.5 hover:border-[var(--color-primary)]/50"
          >
            <div className="inline-flex rounded-full bg-[var(--color-primary)]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-primary)]">
              Week {week.number}
            </div>
            <h3 className="mt-4 text-xl font-semibold text-[var(--color-text)]">
              {week.title}
            </h3>
            <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">
              Add learning objectives, reading lists, practice tasks, and review
              checkpoints for this week.
            </p>
            <div className="mt-5 text-sm font-medium text-[var(--color-accent)] transition group-hover:translate-x-1">
              Open week workspace
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
