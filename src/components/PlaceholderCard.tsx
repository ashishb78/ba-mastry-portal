type PlaceholderCardProps = {
  title: string
  description: string
  accent?: 'blue' | 'green' | 'amber'
}

const accents: Record<NonNullable<PlaceholderCardProps['accent']>, string> = {
  blue: 'bg-[var(--color-primary)]/12 text-[var(--color-primary)]',
  green: 'bg-[var(--color-success)]/12 text-[var(--color-success)]',
  amber: 'bg-[var(--color-warning)]/12 text-[var(--color-warning)]',
}

export default function PlaceholderCard({
  title,
  description,
  accent = 'blue',
}: PlaceholderCardProps) {
  return (
    <article className="rounded-[1.75rem] border border-[var(--color-border)] bg-white p-5 shadow-[var(--shadow-card)]">
      <div
        className={`inline-flex rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] ${accents[accent]}`}
      >
        Placeholder
      </div>
      <h3 className="mt-4 text-lg font-semibold text-[var(--color-text)]">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">
        {description}
      </p>
    </article>
  )
}
