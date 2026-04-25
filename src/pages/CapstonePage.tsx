export default function CapstonePage() {
  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--color-success)]">
            Capstone
          </p>
          <h2 className="mt-2 text-3xl font-semibold text-[var(--color-text)]">
            Final project workspace
          </h2>
        </div>
        <div className="rounded-full bg-[var(--color-success)]/10 px-4 py-2 text-sm font-medium text-[var(--color-success)]">
          Placeholder state
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.25fr_0.95fr]">
        <article className="rounded-[1.75rem] bg-[var(--color-text)] p-6 text-white shadow-[var(--shadow-soft)]">
          <h3 className="text-xl font-semibold">Capstone structure</h3>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-white/80">
            Reserve this area for the business case, stakeholder map, process
            analysis, requirements package, and presentation materials that bring
            the course together.
          </p>
        </article>

        <article className="rounded-[1.75rem] border border-[var(--color-border)] bg-white p-6 shadow-[var(--shadow-card)]">
          <h3 className="text-lg font-semibold text-[var(--color-text)]">
            Suggested modules
          </h3>
          <ul className="mt-5 space-y-3 text-sm leading-6 text-[var(--color-muted)]">
            <li className="rounded-2xl bg-[var(--color-surface)] px-4 py-3">
              Problem statement and project scope
            </li>
            <li className="rounded-2xl bg-[var(--color-surface)] px-4 py-3">
              Stakeholder and process artifacts
            </li>
            <li className="rounded-2xl bg-[var(--color-surface)] px-4 py-3">
              Requirements pack and final presentation
            </li>
          </ul>
        </article>
      </div>
    </section>
  )
}
