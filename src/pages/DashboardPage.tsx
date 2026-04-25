export default function DashboardPage() {
  const summaryCards = [
    {
      title: 'Current focus',
      value: 'Week 1 foundations',
      tone: 'bg-[var(--color-primary)]/10 text-[var(--color-primary)]',
    },
    {
      title: 'Completion target',
      value: '12 weeks',
      tone: 'bg-[var(--color-success)]/10 text-[var(--color-success)]',
    },
    {
      title: 'Capstone status',
      value: 'Scope pending',
      tone: 'bg-[var(--color-warning)]/10 text-[var(--color-warning)]',
    },
  ]

  return (
    <section className="space-y-6">
      <div className="rounded-[2rem] bg-[var(--color-text)] px-6 py-8 text-white shadow-[var(--shadow-soft)] sm:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/70">
          Dashboard
        </p>
        <h2 className="mt-3 text-3xl font-semibold">
          Your Business Analyst learning hub
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-white/80">
          This starter dashboard gives the portal a polished shell for routing,
          navigation, and future learning widgets without locking us into heavy
          data structures too early.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {summaryCards.map((card) => (
          <article
            key={card.title}
            className="rounded-[1.5rem] border border-[var(--color-border)] bg-white p-5 shadow-[var(--shadow-card)]"
          >
            <div
              className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] ${card.tone}`}
            >
              {card.title}
            </div>
            <p className="mt-4 text-xl font-semibold text-[var(--color-text)]">
              {card.value}
            </p>
          </article>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
        <article className="rounded-[1.75rem] border border-[var(--color-border)] bg-white p-6 shadow-[var(--shadow-card)]">
          <h3 className="text-lg font-semibold text-[var(--color-text)]">
            Portal roadmap
          </h3>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              ['Dashboard', 'Progress snapshots and study momentum'],
              ['Weekly learning', 'Structured topic-by-topic BA practice'],
              ['Capstone', 'A project area for synthesis and delivery'],
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
            Next build steps
          </h3>
          <ul className="mt-5 space-y-3 text-sm leading-6 text-[var(--color-muted)]">
            <li className="rounded-2xl bg-[var(--color-surface)] px-4 py-3">
              Wire real curriculum and completion tracking into dashboard cards.
            </li>
            <li className="rounded-2xl bg-[var(--color-surface)] px-4 py-3">
              Add week-level objectives, exercises, and downloadable templates.
            </li>
            <li className="rounded-2xl bg-[var(--color-surface)] px-4 py-3">
              Connect settings to local preferences for study behavior.
            </li>
          </ul>
        </article>
      </div>
    </section>
  )
}
