import { CheckCircle2, ChevronRight, Lock, PauseCircle } from 'lucide-react'
import { Link } from 'react-router'
import PageHeader from '../components/PageHeader'
import { curriculum } from '../data/curriculum'
import { useProgress } from '../hooks/useProgress'
import type { WeekNumber } from '../types'

const allWeekNumbers = Array.from({ length: 26 }, (_, index) => index + 1)
const configuredWeekNumbers = new Set<number>(
  curriculum.map((week) => week.weekNumber),
)

function isConfiguredWeekNumber(value: number): value is WeekNumber {
  return value === 1 || value === 2 || value === 3 || value === 4 || value === 5 || value === 26
}

function getWeekStatusLabel(input: {
  configured: boolean
  unlocked: boolean
  completed: boolean
}) {
  if (!input.configured) {
    return {
      label: 'Coming soon',
      classes: 'bg-[var(--color-text)]/10 text-[var(--color-text)]',
    }
  }

  if (!input.unlocked) {
    return {
      label: 'Locked',
      classes: 'bg-[var(--color-warning)]/12 text-[var(--color-warning)]',
    }
  }

  if (input.completed) {
    return {
      label: 'Completed',
      classes: 'bg-[var(--color-success)]/12 text-[var(--color-success)]',
    }
  }

  return {
    label: 'In progress',
    classes: 'bg-[var(--color-primary)]/12 text-[var(--color-primary)]',
  }
}

export default function WeeksPage() {
  const { curriculum: progress, isWeekUnlocked } = useProgress()

  return (
    <section className="space-y-6">
      <PageHeader
        eyebrow="Weeks"
        title="Program roadmap across all 26 weeks"
        description="Track each week’s unlock status, task completion, and weekly test progress from one responsive learning map."
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {allWeekNumbers.map((weekNumber) => {
          const configured =
            configuredWeekNumbers.has(weekNumber) && isConfiguredWeekNumber(weekNumber)
          const configuredWeek = configured
            ? curriculum.find((week) => week.weekNumber === weekNumber)
            : undefined
          const typedWeekNumber = configured ? weekNumber : null
          const unlocked = typedWeekNumber ? isWeekUnlocked(typedWeekNumber) : false
          const weekProgress = typedWeekNumber ? progress.weeks[typedWeekNumber] : null
          const completed =
            weekProgress !== null &&
            weekProgress.taskIdsCompleted.length === 5 &&
            weekProgress.assessmentCompleted
          const testStatus = !configured
            ? 'Unavailable'
            : weekProgress?.assessmentCompleted
              ? 'Passed'
              : 'Pending'
          const taskProgress = !configured
            ? '0/5'
            : `${weekProgress?.taskIdsCompleted.length ?? 0}/5`
          const status = getWeekStatusLabel({ configured, unlocked, completed })

          const cardClassName = configured && unlocked
            ? 'group rounded-[1.75rem] border border-[var(--color-border)] bg-white p-5 shadow-[var(--shadow-card)] transition hover:-translate-y-0.5 hover:border-[var(--color-primary)]/50'
            : 'rounded-[1.75rem] border border-[var(--color-border)] bg-white/75 p-5 shadow-[var(--shadow-card)] opacity-85'

          const content = (
            <>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] ${status.classes}`}
                  >
                    Week {weekNumber}
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-[var(--color-text)]">
                    {configuredWeek?.title ?? `Week ${weekNumber}: Not configured yet`}
                  </h3>
                </div>

                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-2xl ${
                    completed
                      ? 'bg-[var(--color-success)]/12 text-[var(--color-success)]'
                      : unlocked
                        ? 'bg-[var(--color-primary)]/12 text-[var(--color-primary)]'
                        : 'bg-[var(--color-warning)]/12 text-[var(--color-warning)]'
                  }`}
                >
                  {completed ? (
                    <CheckCircle2 size={18} />
                  ) : unlocked ? (
                    <PauseCircle size={18} />
                  ) : (
                    <Lock size={18} />
                  )}
                </div>
              </div>

              <p className="mt-3 text-sm leading-6 text-[var(--color-muted)]">
                {configuredWeek?.summary ??
                  'This week card is reserved for future curriculum expansion and stays disabled for now.'}
              </p>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl bg-[var(--color-surface)] px-4 py-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-muted)]">
                    Tasks
                  </p>
                  <p className="mt-2 text-lg font-semibold text-[var(--color-text)]">
                    {taskProgress}
                  </p>
                </div>
                <div className="rounded-2xl bg-[var(--color-surface)] px-4 py-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-muted)]">
                    Weekly test
                  </p>
                  <p className="mt-2 text-lg font-semibold text-[var(--color-text)]">
                    {testStatus}
                  </p>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between gap-3">
                <span className="text-sm font-medium text-[var(--color-muted)]">
                  {status.label}
                </span>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-accent)]">
                  {configured && unlocked ? 'Open workspace' : 'Unavailable'}
                  <ChevronRight size={16} />
                </span>
              </div>
            </>
          )

          if (configured && unlocked) {
            return (
              <Link
                key={weekNumber}
                to={`/week/${weekNumber}`}
                className={cardClassName}
              >
                {content}
              </Link>
            )
          }

          return (
            <div key={weekNumber} className={cardClassName} aria-disabled="true">
              {content}
            </div>
          )
        })}
      </div>
    </section>
  )
}
