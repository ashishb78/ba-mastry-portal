type PageHeaderProps = {
  eyebrow: string
  title: string
  description: string
  accent?: 'blue' | 'green' | 'amber' | 'charcoal'
}

const accentClasses: Record<NonNullable<PageHeaderProps['accent']>, string> = {
  blue: 'text-[var(--color-primary)]',
  green: 'text-[var(--color-success)]',
  amber: 'text-[var(--color-warning)]',
  charcoal: 'text-[var(--color-text)]',
}

export default function PageHeader({
  eyebrow,
  title,
  description,
  accent = 'blue',
}: PageHeaderProps) {
  return (
    <div className="space-y-3">
      <p
        className={`text-xs font-semibold uppercase tracking-[0.28em] ${accentClasses[accent]}`}
      >
        {eyebrow}
      </p>
      <div className="space-y-2">
        <h2 className="text-3xl font-semibold tracking-tight text-[var(--color-text)] sm:text-4xl">
          {title}
        </h2>
        <p className="max-w-3xl text-sm leading-7 text-[var(--color-muted)] sm:text-base">
          {description}
        </p>
      </div>
    </div>
  )
}
