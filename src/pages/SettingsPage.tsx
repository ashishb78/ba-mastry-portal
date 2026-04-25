export default function SettingsPage() {
  return (
    <section className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--color-warning)]">
          Settings
        </p>
        <h2 className="mt-2 text-3xl font-semibold text-[var(--color-text)]">
          Personalize your study environment
        </h2>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {[
          ['Study preferences', 'Control focus defaults, reminders, and pacing.'],
          ['Profile details', 'Store your name, role goals, and cohort metadata.'],
          ['Notifications', 'Reserve space for deadline and milestone alerts.'],
          ['Data and sync', 'Future home for export, backup, and restore actions.'],
        ].map(([title, description]) => (
          <article
            key={title}
            className="rounded-[1.5rem] border border-[var(--color-border)] bg-white p-5 shadow-[var(--shadow-card)]"
          >
            <h3 className="text-lg font-semibold text-[var(--color-text)]">
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
