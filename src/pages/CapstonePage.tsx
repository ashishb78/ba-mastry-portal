import { useEffect, useMemo, useState } from 'react'
import {
  BarChart3,
  CheckSquare,
  DatabaseZap,
  FileCheck2,
  Layers3,
  MonitorUp,
  Presentation,
} from 'lucide-react'
import PageHeader from '../components/PageHeader'
import { capstone } from '../data/capstone'
import { studyMaterialsById } from '../data/studyMaterials'
import { storage } from '../lib/storage'

const CAPSTONE_CHECKLIST_STORAGE_KEY = 'ba-mastery-capstone-checklist'

const deliverableDefinitions = [
  {
    title: 'SQL Analysis deliverable',
    icon: DatabaseZap,
    summary:
      'Use structured query thinking to validate pain points, isolate patterns, and support the business case with evidence.',
    milestoneIndex: 1,
  },
  {
    title: 'System Architecture deliverable',
    icon: Layers3,
    summary:
      'Show the current state, future state, and solution boundaries so stakeholders can see how the recommendation fits together.',
    milestoneIndex: 2,
  },
  {
    title: 'Excel Analytics deliverable',
    icon: BarChart3,
    summary:
      'Summarize KPI logic, assumptions, and scenario analysis in a lightweight analytical model that decision-makers can review quickly.',
    milestoneIndex: 3,
  },
  {
    title: 'Power BI Dashboard deliverable',
    icon: MonitorUp,
    summary:
      'Translate the measurement plan into a dashboard story with audience, key visuals, and decision-focused reporting.',
    milestoneIndex: 3,
  },
  {
    title: 'Presentation deliverable',
    icon: Presentation,
    summary:
      'Bring the recommendation together into a concise executive walkthrough with roadmap, tradeoffs, and next steps.',
    milestoneIndex: 4,
  },
] as const

const checklistItems = [
  'Project brief finalized',
  'SQL analysis drafted',
  'System architecture documented',
  'Excel analytics workbook outlined',
  'Power BI dashboard storyboard prepared',
  'Presentation deck completed',
  'Rubric reviewed before submission',
] as const

type ChecklistItem = (typeof checklistItems)[number]
type ChecklistState = Record<ChecklistItem, boolean>

function createInitialChecklistState(): ChecklistState {
  return checklistItems.reduce<ChecklistState>((lookup, item) => {
    lookup[item] = false
    return lookup
  }, {} as ChecklistState)
}

export default function CapstonePage() {
  const [checklist, setChecklist] = useState<ChecklistState>(() =>
    storage.get<ChecklistState>(
      CAPSTONE_CHECKLIST_STORAGE_KEY,
      createInitialChecklistState(),
    ),
  )

  useEffect(() => {
    storage.set(CAPSTONE_CHECKLIST_STORAGE_KEY, checklist)
  }, [checklist])

  const resources = capstone.materialIds.map((materialId) => studyMaterialsById[materialId])
  const completedChecklistCount = Object.values(checklist).filter(Boolean).length
  const checklistPercentage = Math.round(
    (completedChecklistCount / checklistItems.length) * 100,
  )

  const deliverables = useMemo(
    () =>
      deliverableDefinitions.map((definition) => {
        const milestone = capstone.milestones[definition.milestoneIndex]

        return {
          ...definition,
          milestone,
        }
      }),
    [],
  )

  return (
    <section className="space-y-6">
      <PageHeader
        eyebrow="Capstone"
        title={capstone.title}
        description={capstone.outcome}
        accent="green"
      />

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.9fr]">
        <article className="rounded-[1.75rem] bg-[linear-gradient(135deg,rgba(44,62,80,1)_0%,rgba(39,174,96,0.92)_100%)] p-6 text-white shadow-[var(--shadow-soft)]">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/70">
            Project brief
          </p>
          <h3 className="mt-3 text-2xl font-semibold">{capstone.title}</h3>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-white/85">
            {capstone.brief}
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl bg-white/10 px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
                Deliverables
              </p>
              <p className="mt-2 text-xl font-semibold">{deliverables.length}</p>
            </div>
            <div className="rounded-2xl bg-white/10 px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
                Rubric items
              </p>
              <p className="mt-2 text-xl font-semibold">
                {capstone.milestones.reduce(
                  (count, milestone) => count + milestone.successCriteria.length,
                  0,
                )}
              </p>
            </div>
            <div className="rounded-2xl bg-white/10 px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
                Checklist
              </p>
              <p className="mt-2 text-xl font-semibold">{checklistPercentage}%</p>
            </div>
          </div>
        </article>

        <article className="rounded-[1.75rem] border border-[var(--color-border)] bg-white p-6 shadow-[var(--shadow-card)]">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--color-success)]/12 text-[var(--color-success)]">
              <FileCheck2 size={18} />
            </div>
            <div>
              <p className="text-sm font-semibold text-[var(--color-text)]">
                Capstone resources
              </p>
              <p className="text-sm text-[var(--color-muted)]">
                Use these references to shape your final submission.
              </p>
            </div>
          </div>

          <div className="mt-5 grid gap-3">
            {resources.map((resource) => (
              <div
                key={resource.id}
                className="rounded-2xl bg-[var(--color-surface)] px-4 py-4"
              >
                <p className="text-sm font-semibold text-[var(--color-text)]">
                  {resource.title}
                </p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-primary)]">
                  {resource.resourceLabel}
                </p>
                <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">
                  {resource.description}
                </p>
              </div>
            ))}
          </div>
        </article>
      </div>

      <article className="rounded-[1.75rem] border border-[var(--color-border)] bg-white p-6 shadow-[var(--shadow-card)]">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-[var(--color-primary)]">
              Deliverables
            </p>
            <h3 className="mt-1 text-2xl font-semibold text-[var(--color-text)]">
              Capstone submission pack
            </h3>
          </div>
          <div className="rounded-full bg-[var(--color-surface)] px-4 py-2 text-sm font-medium text-[var(--color-muted)]">
            5 core outputs
          </div>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          {deliverables.map(({ title, summary, icon: Icon, milestone }) => (
            <article
              key={title}
              className="rounded-[1.5rem] border border-[var(--color-border)] bg-[var(--color-surface)] p-5"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-[var(--color-primary)]">
                  <Icon size={20} />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-[var(--color-text)]">
                    {title}
                  </h4>
                  <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">
                    {summary}
                  </p>
                </div>
              </div>

              <div className="mt-5 rounded-2xl bg-white px-4 py-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-primary)]">
                  Deliverable detail
                </p>
                <p className="mt-2 text-sm leading-6 text-[var(--color-text)]">
                  {milestone.deliverable}
                </p>
              </div>
            </article>
          ))}
        </div>
      </article>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <article className="rounded-[1.75rem] border border-[var(--color-border)] bg-white p-6 shadow-[var(--shadow-card)]">
          <p className="text-sm font-semibold text-[var(--color-warning)]">
            Rubrics
          </p>
          <h3 className="mt-1 text-2xl font-semibold text-[var(--color-text)]">
            What strong capstone work should demonstrate
          </h3>

          <div className="mt-6 grid gap-4">
            {capstone.milestones.map((milestone) => (
              <article
                key={milestone.id}
                className="rounded-[1.5rem] bg-[var(--color-surface)] p-5"
              >
                <p className="text-lg font-semibold text-[var(--color-text)]">
                  {milestone.title}
                </p>
                <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">
                  {milestone.deliverable}
                </p>
                <ul className="mt-4 space-y-2">
                  {milestone.successCriteria.map((criterion) => (
                    <li
                      key={criterion}
                      className="rounded-2xl bg-white px-4 py-3 text-sm leading-6 text-[var(--color-muted)]"
                    >
                      {criterion}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </article>

        <article className="rounded-[1.75rem] border border-[var(--color-border)] bg-white p-6 shadow-[var(--shadow-card)]">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--color-warning)]/12 text-[var(--color-warning)]">
              <CheckSquare size={18} />
            </div>
            <div>
              <p className="text-sm font-semibold text-[var(--color-text)]">
                Completion checklist
              </p>
              <p className="text-sm text-[var(--color-muted)]">
                Saved automatically in localStorage for this browser.
              </p>
            </div>
          </div>

          <div className="mt-5">
            <div className="flex items-center justify-between gap-4 text-sm">
              <span className="font-medium text-[var(--color-text)]">
                Checklist progress
              </span>
              <span className="text-[var(--color-muted)]">
                {completedChecklistCount}/{checklistItems.length}
              </span>
            </div>
            <div className="mt-3 h-3 overflow-hidden rounded-full bg-[var(--color-surface)]">
              <div
                className="h-full rounded-full bg-[linear-gradient(90deg,#3498DB_0%,#27AE60_100%)]"
                style={{ width: `${checklistPercentage}%` }}
              />
            </div>
          </div>

          <div className="mt-6 grid gap-3">
            {checklistItems.map((item) => (
              <label
                key={item}
                className="flex cursor-pointer items-start gap-3 rounded-2xl bg-[var(--color-surface)] px-4 py-4"
              >
                <input
                  type="checkbox"
                  checked={checklist[item]}
                  onChange={() =>
                    setChecklist((current) => ({
                      ...current,
                      [item]: !current[item],
                    }))
                  }
                  className="mt-1 h-4 w-4 rounded border-[var(--color-border)] text-[var(--color-success)]"
                />
                <span className="text-sm leading-6 text-[var(--color-text)]">
                  {item}
                </span>
              </label>
            ))}
          </div>
        </article>
      </div>
    </section>
  )
}
