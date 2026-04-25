import { useState } from 'react'
import {
  ArrowLeft,
  BookOpen,
  CheckCheck,
  ClipboardCheck,
  ExternalLink,
  Lock,
} from 'lucide-react'
import { Link, useParams } from 'react-router'
import PageHeader from '../components/PageHeader'
import { assessmentsByWeek } from '../data/assessments'
import { curriculumByWeek } from '../data/curriculum'
import { studyMaterialsById } from '../data/studyMaterials'
import { WEEKLY_TEST_PASS_THRESHOLD, WEEKLY_TEST_TOTAL_SCORE } from '../lib/progress'
import { useProgress } from '../hooks/useProgress'
import type { MaterialId, WeekNumber } from '../types'

function isConfiguredWeekNumber(value: number): value is WeekNumber {
  return value === 1 || value === 2 || value === 3 || value === 4 || value === 5 || value === 26
}

export default function WeekPage() {
  const { weekNumber: weekNumberParam = '1' } = useParams()
  const parsedWeekNumber = Number.parseInt(weekNumberParam, 10)
  const weekNumber = isConfiguredWeekNumber(parsedWeekNumber) ? parsedWeekNumber : null

  const {
    curriculum: progress,
    isWeekUnlocked,
    markTaskComplete,
    markTaskIncomplete,
    submitWeeklyTest,
  } = useProgress()

  const [selectedScore, setSelectedScore] = useState('3')

  if (!weekNumber) {
    return (
      <section className="space-y-6">
        <div className="rounded-[2rem] border border-[var(--color-border)] bg-white p-6 shadow-[var(--shadow-card)] sm:p-8">
          <PageHeader
            eyebrow="Week"
            title={`Week ${weekNumberParam} is not available yet`}
            description="This route exists, but the curriculum content for this week has not been added to the portal yet."
            accent="amber"
          />
        </div>

        <Link
          to="/weeks"
          className="inline-flex items-center gap-2 rounded-2xl border border-[var(--color-border)] bg-white px-4 py-3 text-sm font-semibold text-[var(--color-text)]"
        >
          <ArrowLeft size={16} />
          Back to weeks
        </Link>
      </section>
    )
  }

  const week = curriculumByWeek[weekNumber]
  const unlocked = isWeekUnlocked(weekNumber)
  const assessment = assessmentsByWeek[weekNumber]
  const assessmentProgress = progress.assessments[assessment.id]
  const weekProgress = progress.weeks[weekNumber]
  const completedTaskIds = new Set(weekProgress.taskIdsCompleted)
  const testLocked = completedTaskIds.size < week.tasks.length
  const testSubmitted = assessmentProgress.score !== null

  if (!unlocked) {
    return (
      <section className="space-y-6">
        <div className="rounded-[2rem] border border-[var(--color-border)] bg-white p-6 shadow-[var(--shadow-card)] sm:p-8">
          <PageHeader
            eyebrow={`Week ${weekNumber}`}
            title="This week is locked"
            description="Complete all five tasks and pass the previous week’s test to unlock this workspace."
            accent="amber"
          />
        </div>

        <article className="rounded-[1.75rem] border border-[var(--color-border)] bg-white p-6 shadow-[var(--shadow-card)]">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--color-warning)]/12 text-[var(--color-warning)]">
              <Lock size={20} />
            </div>
            <div>
              <p className="text-lg font-semibold text-[var(--color-text)]">
                Unlock requirement
              </p>
              <p className="mt-1 text-sm leading-6 text-[var(--color-muted)]">
                The next week opens only after the previous week has all five tasks completed and a passed weekly test.
              </p>
            </div>
          </div>
        </article>

        <Link
          to="/weeks"
          className="inline-flex items-center gap-2 rounded-2xl border border-[var(--color-border)] bg-white px-4 py-3 text-sm font-semibold text-[var(--color-text)]"
        >
          <ArrowLeft size={16} />
          Back to weeks
        </Link>
      </section>
    )
  }

  return (
    <section className="space-y-6">
      <div className="rounded-[2rem] border border-[var(--color-border)] bg-white p-6 shadow-[var(--shadow-card)] sm:p-8">
        <PageHeader
          eyebrow={`Week ${weekNumber}`}
          title={week.title}
          description={week.summary}
        />

        <div className="mt-6 flex flex-wrap gap-3">
          {week.focusAreas.map((area) => (
            <span
              key={area}
              className="inline-flex rounded-full bg-[var(--color-primary)]/12 px-3 py-2 text-sm font-semibold text-[var(--color-primary)]"
            >
              {area}
            </span>
          ))}
        </div>
      </div>

      <article className="rounded-[1.75rem] border border-[var(--color-border)] bg-white p-6 shadow-[var(--shadow-card)]">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-[var(--color-primary)]">
              Monday to Friday tasks
            </p>
            <h3 className="mt-1 text-2xl font-semibold text-[var(--color-text)]">
              Daily learning checklist
            </h3>
          </div>
          <div className="rounded-full bg-[var(--color-surface)] px-4 py-2 text-sm font-medium text-[var(--color-muted)]">
            {completedTaskIds.size}/{week.tasks.length} tasks complete
          </div>
        </div>

        <div className="mt-6 grid gap-4">
          {week.tasks.map((task) => {
            const complete = completedTaskIds.has(task.id)
            const linkedMaterials = task.materialIds.map(
              (materialId: MaterialId) => studyMaterialsById[materialId],
            )

            return (
              <article
                key={task.id}
                className="rounded-[1.5rem] border border-[var(--color-border)] bg-[var(--color-surface)] p-5"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="inline-flex rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-primary)]">
                        {task.day}
                      </span>
                      <span className="inline-flex rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-muted)]">
                        {task.kind}
                      </span>
                      {complete ? (
                        <span className="inline-flex items-center gap-2 rounded-full bg-[var(--color-success)]/12 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-success)]">
                          <CheckCheck size={14} />
                          Completed
                        </span>
                      ) : null}
                    </div>

                    <h4 className="mt-4 text-xl font-semibold text-[var(--color-text)]">
                      {task.title}
                    </h4>
                    <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">
                      {task.objective}
                    </p>
                    <p className="mt-3 text-sm font-medium text-[var(--color-text)]">
                      Estimated time: {task.estimatedMinutes} minutes
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {complete ? (
                      <button
                        type="button"
                        onClick={() => markTaskIncomplete(task.id)}
                        className="inline-flex items-center justify-center rounded-2xl border border-[var(--color-border)] bg-white px-4 py-3 text-sm font-semibold text-[var(--color-text)]"
                      >
                        Mark Incomplete
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => markTaskComplete(task.id)}
                        className="inline-flex items-center justify-center rounded-2xl bg-[var(--color-success)] px-4 py-3 text-sm font-semibold text-white"
                      >
                        Mark Complete
                      </button>
                    )}
                  </div>
                </div>

                <div className="mt-5">
                  <div className="flex items-center gap-2 text-sm font-semibold text-[var(--color-text)]">
                    <BookOpen size={16} />
                    Study links
                  </div>

                  <div className="mt-3 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                    {linkedMaterials.map((material) => (
                      <div
                        key={material.id}
                        className="rounded-2xl border border-[var(--color-border)] bg-white p-4"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-sm font-semibold text-[var(--color-text)]">
                              {material.title}
                            </p>
                            <p className="mt-1 text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-primary)]">
                              {material.resourceLabel}
                            </p>
                          </div>
                          <ExternalLink size={16} className="text-[var(--color-muted)]" />
                        </div>
                        <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">
                          {material.description}
                        </p>
                        <p className="mt-3 text-sm font-medium text-[var(--color-text)]">
                          {material.estimatedMinutes} min
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </article>

      <article className="rounded-[1.75rem] border border-[var(--color-border)] bg-white p-6 shadow-[var(--shadow-card)]">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--color-warning)]/12 text-[var(--color-warning)]">
            <ClipboardCheck size={20} />
          </div>
          <div>
            <p className="text-sm font-semibold text-[var(--color-warning)]">
              Weekly test
            </p>
            <h3 className="mt-1 text-2xl font-semibold text-[var(--color-text)]">
              {assessment.title}
            </h3>
          </div>
        </div>

        <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">
          {assessment.prompt}
        </p>

        <div className="mt-5 flex flex-wrap gap-3">
          {assessment.topics.map((topic) => (
            <span
              key={topic}
              className="inline-flex rounded-full bg-[var(--color-surface)] px-3 py-2 text-sm font-medium text-[var(--color-text)]"
            >
              {topic}
            </span>
          ))}
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <label
              htmlFor="weekly-test-score"
              className="block text-sm font-semibold text-[var(--color-text)]"
            >
              Self-grade your weekly test
            </label>
            <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">
              Pass threshold: {WEEKLY_TEST_PASS_THRESHOLD}/{WEEKLY_TEST_TOTAL_SCORE}.
              Once submitted, the original score stays fixed unless progress is reset.
            </p>
            <select
              id="weekly-test-score"
              value={selectedScore}
              onChange={(event) => setSelectedScore(event.target.value)}
              disabled={testLocked || testSubmitted}
              className="mt-4 w-full rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 text-sm font-medium text-[var(--color-text)] outline-none"
            >
              {[0, 1, 2, 3, 4, 5].map((score) => (
                <option key={score} value={score}>
                  {score} / {WEEKLY_TEST_TOTAL_SCORE}
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            onClick={() => submitWeeklyTest(weekNumber, Number(selectedScore))}
            disabled={testLocked || testSubmitted}
            className="inline-flex items-center justify-center rounded-2xl bg-[var(--color-primary)] px-5 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:bg-[var(--color-border)]"
          >
            Submit test score
          </button>
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-3">
          <div className="rounded-2xl bg-[var(--color-surface)] px-4 py-3">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-muted)]">
              Tasks gate
            </p>
            <p className="mt-2 text-lg font-semibold text-[var(--color-text)]">
              {completedTaskIds.size}/{week.tasks.length}
            </p>
          </div>
          <div className="rounded-2xl bg-[var(--color-surface)] px-4 py-3">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-muted)]">
              Submitted score
            </p>
            <p className="mt-2 text-lg font-semibold text-[var(--color-text)]">
              {assessmentProgress.score ?? 'Not submitted'}
            </p>
          </div>
          <div className="rounded-2xl bg-[var(--color-surface)] px-4 py-3">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-muted)]">
              Next week unlock
            </p>
            <p className="mt-2 text-lg font-semibold text-[var(--color-text)]">
              {weekProgress.assessmentCompleted ? 'Unlocked' : 'Pending'}
            </p>
          </div>
        </div>
      </article>

      <Link
        to="/weeks"
        className="inline-flex items-center gap-2 rounded-2xl border border-[var(--color-border)] bg-white px-4 py-3 text-sm font-semibold text-[var(--color-text)]"
      >
        <ArrowLeft size={16} />
        Back to weeks
      </Link>
    </section>
  )
}
