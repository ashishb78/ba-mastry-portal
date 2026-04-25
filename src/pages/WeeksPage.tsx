import { Link } from 'react-router'
import PageHeader from '../components/PageHeader'

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
      <PageHeader
        eyebrow="Weeks"
        title="12-week learning map"
        description="Each week route is ready for BA objectives, study tasks, assignments, and review checkpoints."
      />

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
              Placeholder page ready for learning objectives, reading lists,
              exercises, and review checkpoints.
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
