import {
  ArrowRight,
  Award,
  BarChart3,
  BookCheck,
  Flame,
  GraduationCap,
  Trophy,
} from 'lucide-react'
import { Link } from 'react-router'
import { assessments } from '../data/assessments'
import { curriculum } from '../data/curriculum'
import { useProgress } from '../hooks/useProgress'
import type { AssessmentId, WeekNumber } from '../types'

type TopicBadge = {
  label: 'SQL' | 'Excel' | 'Problem-solving' | 'Power BI' | 'Architecture'
  mastery: number
  detail: string
}

function formatHours(totalMinutes: number) {
  const hours = totalMinutes / 60

  if (hours < 1) {
    return `${totalMinutes} min`
  }

  return `${hours.toFixed(1)} hrs`
}

function getRequestedTopicMastery(
  masteryEntries: ReturnType<typeof useProgress>['topicMastery'],
): readonly TopicBadge[] {
  const masteryLookup = masteryEntries.reduce<Record<string, number>>(
    (lookup, entry) => {
      lookup[entry.topic.toLowerCase()] = entry.mastery
      return lookup
    },
    {},
  )

  const averageOf = (topics: readonly string[]) => {
    const scores = topics
      .map((topic) => masteryLookup[topic.toLowerCase()])
      .filter((score): score is number => typeof score === 'number')

    if (scores.length === 0) {
      return 0
    }

    return Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length)
  }

  return [
    {
      label: 'SQL',
      mastery: averageOf(['data thinking', 'metrics']),
      detail: 'Data thinking and KPI interpretation',
    },
    {
      label: 'Excel',
      mastery: averageOf([
        'stakeholder analysis',
        'acceptance criteria',
        'delivery readiness',
      ]),
      detail: 'Structured analysis and delivery readiness',
    },
    {
      label: 'Problem-solving',
      mastery: averageOf([
        'requirements basics',
        'prioritization',
        'risk management',
        'analysis',
      ]),
      detail: 'Requirements, prioritization, and case analysis',
    },
    {
      label: 'Power BI',
      mastery: averageOf(['dashboard requirements', 'metrics', 'presentation']),
      detail: 'Reporting design and insight communication',
    },
    {
      label: 'Architecture',
      mastery: averageOf([
        'process mapping',
        'requirements',
        'delivery recommendation',
      ]),
      detail: 'Process design and future-state thinking',
    },
  ] as const
}

export default function DashboardPage() {
  const { curriculum: progress, currentWeekProgress, overallCompletion, streak, topicMastery } =
    useProgress()

  const completedWeeks = curriculum.filter((week) => {
    const weekProgress = progress.weeks[week.weekNumber]
    return weekProgress.taskIdsCompleted.length === 5 && weekProgress.assessmentCompleted
  }).length

  const testsPassed = assessments.filter(
    (assessment) => progress.weeks[assessment.weekNumber].assessmentCompleted,
  ).length

  const completedScores = (
    Object.values(progress.assessments) as (typeof progress.assessments[AssessmentId])[]
  )
    .map((assessment) => assessment.score)
    .filter((score): score is number => score !== null)

  const averageScore =
    completedScores.length === 0
      ? 0
      : completedScores.reduce((sum, score) => sum + score, 0) / completedScores.length

  const taskMinutes = curriculum.reduce((sum, week) => {
    const completedWeekTaskIds = new Set(progress.weeks[week.weekNumber].taskIdsCompleted)

    return (
      sum +
      week.tasks.reduce(
        (weekSum, task) =>
          completedWeekTaskIds.has(task.id) ? weekSum + task.estimatedMinutes : weekSum,
        0,
      )
    )
  }, 0)

  const assessmentMinutes = assessments.reduce((sum, assessment) => {
    return progress.assessments[assessment.id].score !== null
      ? sum + assessment.durationMinutes
      : sum
  }, 0)

  const totalMinutesInvested = taskMinutes + assessmentMinutes
  const currentWeekNumber = currentWeekProgress.weekNumber as WeekNumber
  const topicCards = getRequestedTopicMastery(topicMastery)

  const summaryCards = [
    {
      title: 'Overall completion',
      value: `${overallCompletion.percentage}%`,
      supporting: `${overallCompletion.completed} of ${overallCompletion.total} milestones`,
      icon: Trophy,
      tone: 'text-[var(--color-primary)] bg-[var(--color-primary)]/12',
    },
    {
      title: 'Completed weeks',
      value: `${completedWeeks}/26`,
      supporting: 'Weeks with all 5 tasks and passed test',
      icon: BookCheck,
      tone: 'text-[var(--color-success)] bg-[var(--color-success)]/12',
    },
    {
      title: 'Current week progress',
      value: `${currentWeekProgress.summary.percentage}%`,
      supporting: `${currentWeekProgress.tasksCompleted}/${currentWeekProgress.totalTasks} tasks, test ${
        currentWeekProgress.testPassed ? 'passed' : 'pending'
      }`,
      icon: GraduationCap,
      tone: 'text-[var(--color-warning)] bg-[var(--color-warning)]/12',
    },
    {
      title: 'Streak',
      value: `${streak} day${streak === 1 ? '' : 's'}`,
      supporting: 'Consecutive active days',
      icon: Flame,
      tone: 'text-[var(--color-text)] bg-[var(--color-text)]/10',
    },
  ] as const

  return (
    <section className="space-y-6">
      <div className="rounded-[2rem] bg-[linear-gradient(135deg,rgba(44,62,80,1)_0%,rgba(52,152,219,0.92)_100%)] px-6 py-8 text-white shadow-[var(--shadow-soft)] sm:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/70">
              Dashboard
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Track progress across your BA mastery journey
            </h2>
            <p className="mt-3 text-sm leading-7 text-white/80 sm:text-base">
              See completion, momentum, test performance, and the next week to
              focus on from one clean dashboard.
            </p>
          </div>

          <Link
            to={`/week/${currentWeekNumber}`}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-[var(--color-text)] transition hover:translate-y-[-1px]"
          >
            Continue current week
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {summaryCards.map(({ title, value, supporting, icon: Icon, tone }) => (
          <article
            key={title}
            className="rounded-[1.75rem] border border-[var(--color-border)] bg-white p-5 shadow-[var(--shadow-card)]"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-[var(--color-muted)]">{title}</p>
                <p className="mt-3 text-3xl font-semibold tracking-tight text-[var(--color-text)]">
                  {value}
                </p>
              </div>
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-2xl ${tone}`}
              >
                <Icon size={18} />
              </div>
            </div>
            <p className="mt-4 text-sm leading-6 text-[var(--color-muted)]">
              {supporting}
            </p>
          </article>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.35fr_1fr]">
        <article className="rounded-[1.75rem] border border-[var(--color-border)] bg-white p-6 shadow-[var(--shadow-card)]">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-[var(--color-primary)]">
                Current focus
              </p>
              <h3 className="mt-1 text-2xl font-semibold text-[var(--color-text)]">
                {currentWeekProgress.title}
              </h3>
            </div>
            <div className="rounded-full bg-[var(--color-primary)]/12 px-4 py-2 text-sm font-semibold text-[var(--color-primary)]">
              Week {currentWeekNumber}
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <div>
              <div className="flex items-center justify-between gap-4 text-sm">
                <span className="font-medium text-[var(--color-text)]">
                  Current week progress
                </span>
                <span className="text-[var(--color-muted)]">
                  {currentWeekProgress.summary.completed}/
                  {currentWeekProgress.summary.total}
                </span>
              </div>
              <div className="mt-3 h-3 overflow-hidden rounded-full bg-[var(--color-surface)]">
                <div
                  className="h-full rounded-full bg-[linear-gradient(90deg,#3498DB_0%,#27AE60_100%)]"
                  style={{ width: `${currentWeekProgress.summary.percentage}%` }}
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-[1.5rem] bg-[var(--color-surface)] p-4">
                <p className="text-sm font-medium text-[var(--color-muted)]">Tasks</p>
                <p className="mt-2 text-2xl font-semibold text-[var(--color-text)]">
                  {currentWeekProgress.tasksCompleted}/{currentWeekProgress.totalTasks}
                </p>
              </div>
              <div className="rounded-[1.5rem] bg-[var(--color-surface)] p-4">
                <p className="text-sm font-medium text-[var(--color-muted)]">Weekly test</p>
                <p className="mt-2 text-2xl font-semibold text-[var(--color-text)]">
                  {currentWeekProgress.testScore ?? 0}/5
                </p>
              </div>
              <div className="rounded-[1.5rem] bg-[var(--color-surface)] p-4">
                <p className="text-sm font-medium text-[var(--color-muted)]">Status</p>
                <p className="mt-2 text-2xl font-semibold text-[var(--color-text)]">
                  {currentWeekProgress.testPassed ? 'Passed' : 'In progress'}
                </p>
              </div>
            </div>
          </div>
        </article>

        <article className="rounded-[1.75rem] border border-[var(--color-border)] bg-white p-6 shadow-[var(--shadow-card)]">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--color-warning)]/12 text-[var(--color-warning)]">
              <Award size={18} />
            </div>
            <div>
              <p className="text-sm font-semibold text-[var(--color-text)]">
                Performance snapshot
              </p>
              <p className="text-sm text-[var(--color-muted)]">
                Progress quality across tasks and tests
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
            <div className="rounded-[1.5rem] bg-[var(--color-surface)] p-4">
              <p className="text-sm font-medium text-[var(--color-muted)]">
                Time invested
              </p>
              <p className="mt-2 text-2xl font-semibold text-[var(--color-text)]">
                {formatHours(totalMinutesInvested)}
              </p>
            </div>
            <div className="rounded-[1.5rem] bg-[var(--color-surface)] p-4">
              <p className="text-sm font-medium text-[var(--color-muted)]">
                Tests passed
              </p>
              <p className="mt-2 text-2xl font-semibold text-[var(--color-text)]">
                {testsPassed}/{assessments.length}
              </p>
            </div>
            <div className="rounded-[1.5rem] bg-[var(--color-surface)] p-4">
              <p className="text-sm font-medium text-[var(--color-muted)]">
                Average score
              </p>
              <p className="mt-2 text-2xl font-semibold text-[var(--color-text)]">
                {averageScore.toFixed(1)}/5
              </p>
            </div>
          </div>
        </article>
      </div>

      <article className="rounded-[1.75rem] border border-[var(--color-border)] bg-white p-6 shadow-[var(--shadow-card)]">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-[var(--color-primary)]">
              Topic mastery
            </p>
            <h3 className="mt-1 text-2xl font-semibold text-[var(--color-text)]">
              SQL, Excel, Problem-solving, Power BI, Architecture
            </h3>
          </div>
          <div className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-muted)]">
            <BarChart3 size={16} />
            Based on submitted weekly tests
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {topicCards.map((topic) => (
            <div
              key={topic.label}
              className="rounded-[1.5rem] bg-[var(--color-surface)] p-4"
            >
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-semibold text-[var(--color-text)]">
                  {topic.label}
                </p>
                <span className="text-sm font-semibold text-[var(--color-primary)]">
                  {topic.mastery}%
                </span>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-white">
                <div
                  className="h-full rounded-full bg-[linear-gradient(90deg,#3498DB_0%,#27AE60_100%)]"
                  style={{ width: `${topic.mastery}%` }}
                />
              </div>
              <p className="mt-3 text-sm leading-6 text-[var(--color-muted)]">
                {topic.detail}
              </p>
            </div>
          ))}
        </div>
      </article>
    </section>
  )
}
