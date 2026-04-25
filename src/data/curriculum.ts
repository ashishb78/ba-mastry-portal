import { assessments } from './assessments'
import type {
  AssessmentId,
  AssessmentProgress,
  CurriculumProgress,
  CurriculumWeek,
  LocalStorageProgressState,
  TaskId,
  TaskProgress,
  WeekNumber,
  WeekProgress,
} from '../types'

export const curriculum = [
  {
    id: 'week-1',
    weekNumber: 1,
    title: 'Week 1: BA Foundations',
    summary: 'Build the analyst mindset, understand the BA role, and connect business goals to requirements.',
    theme: 'Business analysis foundations',
    focusAreas: ['BA role', 'stakeholders', 'requirements basics'],
    tasks: [
      {
        id: 'w1-mon',
        weekNumber: 1,
        day: 'Monday',
        title: 'Understand the BA role',
        kind: 'lesson',
        objective: 'Define how business analysts create value across discovery, delivery, and change.',
        estimatedMinutes: 45,
        materialIds: ['sm-w1-ba-role'],
      },
      {
        id: 'w1-tue',
        weekNumber: 1,
        day: 'Tuesday',
        title: 'Map core stakeholders',
        kind: 'practice',
        objective: 'Identify sponsors, users, SMEs, and delivery partners for a sample initiative.',
        estimatedMinutes: 50,
        materialIds: ['sm-w1-stakeholder-map'],
      },
      {
        id: 'w1-wed',
        weekNumber: 1,
        day: 'Wednesday',
        title: 'Separate goals from solutions',
        kind: 'analysis',
        objective: 'Practice turning vague requests into clear business needs and desired outcomes.',
        estimatedMinutes: 45,
        materialIds: ['sm-w1-requirements-basics'],
      },
      {
        id: 'w1-thu',
        weekNumber: 1,
        day: 'Thursday',
        title: 'Draft foundational requirements',
        kind: 'workshop',
        objective: 'Create a first-pass requirement set from a short business problem statement.',
        estimatedMinutes: 55,
        materialIds: ['sm-w1-ba-role', 'sm-w1-requirements-basics'],
      },
      {
        id: 'w1-fri',
        weekNumber: 1,
        day: 'Friday',
        title: 'Reflect and refine',
        kind: 'review',
        objective: 'Review what makes a requirement useful, testable, and aligned to value.',
        estimatedMinutes: 30,
        materialIds: ['sm-w1-stakeholder-map', 'sm-w1-requirements-basics'],
      },
    ],
    weeklyTestId: 'test-week-1',
    materialIds: ['sm-w1-ba-role', 'sm-w1-stakeholder-map', 'sm-w1-requirements-basics'],
    isCapstone: false,
  },
  {
    id: 'week-2',
    weekNumber: 2,
    title: 'Week 2: Requirements in Motion',
    summary: 'Move from discovery into structured process analysis, user stories, and acceptance criteria.',
    theme: 'Requirements and workflow',
    focusAreas: ['process mapping', 'user stories', 'acceptance criteria'],
    tasks: [
      {
        id: 'w2-mon',
        weekNumber: 2,
        day: 'Monday',
        title: 'Map the current process',
        kind: 'analysis',
        objective: 'Document the present workflow and identify inefficiencies, delays, and handoffs.',
        estimatedMinutes: 50,
        materialIds: ['sm-w2-process-mapping'],
      },
      {
        id: 'w2-tue',
        weekNumber: 2,
        day: 'Tuesday',
        title: 'Design the future process',
        kind: 'workshop',
        objective: 'Outline a better target-state process with fewer blockers and clearer ownership.',
        estimatedMinutes: 55,
        materialIds: ['sm-w2-process-mapping'],
      },
      {
        id: 'w2-wed',
        weekNumber: 2,
        day: 'Wednesday',
        title: 'Write user stories',
        kind: 'practice',
        objective: 'Turn process needs into user stories that express role, need, and value.',
        estimatedMinutes: 45,
        materialIds: ['sm-w2-user-stories'],
      },
      {
        id: 'w2-thu',
        weekNumber: 2,
        day: 'Thursday',
        title: 'Add acceptance criteria',
        kind: 'deliverable',
        objective: 'Make stories testable with clear acceptance criteria and edge cases.',
        estimatedMinutes: 45,
        materialIds: ['sm-w2-acceptance-criteria', 'sm-w2-user-stories'],
      },
      {
        id: 'w2-fri',
        weekNumber: 2,
        day: 'Friday',
        title: 'Run a readiness review',
        kind: 'review',
        objective: 'Assess whether the week’s stories are clear enough for development and testing.',
        estimatedMinutes: 30,
        materialIds: ['sm-w2-acceptance-criteria'],
      },
    ],
    weeklyTestId: 'test-week-2',
    materialIds: ['sm-w2-process-mapping', 'sm-w2-user-stories', 'sm-w2-acceptance-criteria'],
    isCapstone: false,
  },
  {
    id: 'week-3',
    weekNumber: 3,
    title: 'Week 3: Data and Insight',
    summary: 'Learn how analysts use data to shape decisions, define KPIs, and support business change.',
    theme: 'Metrics and reporting',
    focusAreas: ['data thinking', 'KPIs', 'dashboard requirements'],
    tasks: [
      {
        id: 'w3-mon',
        weekNumber: 3,
        day: 'Monday',
        title: 'Frame analytical questions',
        kind: 'lesson',
        objective: 'Translate business problems into answerable questions and signals to monitor.',
        estimatedMinutes: 40,
        materialIds: ['sm-w3-data-thinking'],
      },
      {
        id: 'w3-tue',
        weekNumber: 3,
        day: 'Tuesday',
        title: 'Build a KPI tree',
        kind: 'practice',
        objective: 'Break a business objective into leading and lagging measures that matter.',
        estimatedMinutes: 45,
        materialIds: ['sm-w3-kpi-tree'],
      },
      {
        id: 'w3-wed',
        weekNumber: 3,
        day: 'Wednesday',
        title: 'Assess data usefulness',
        kind: 'analysis',
        objective: 'Evaluate what data is available, what is missing, and how trustworthy it is.',
        estimatedMinutes: 50,
        materialIds: ['sm-w3-data-thinking', 'sm-w3-dashboard-spec'],
      },
      {
        id: 'w3-thu',
        weekNumber: 3,
        day: 'Thursday',
        title: 'Draft a dashboard spec',
        kind: 'deliverable',
        objective: 'Define audience, decisions, measures, and views for a reporting solution.',
        estimatedMinutes: 50,
        materialIds: ['sm-w3-dashboard-spec'],
      },
      {
        id: 'w3-fri',
        weekNumber: 3,
        day: 'Friday',
        title: 'Review insight quality',
        kind: 'review',
        objective: 'Check whether recommendations are supported by evidence and meaningful metrics.',
        estimatedMinutes: 30,
        materialIds: ['sm-w3-kpi-tree', 'sm-w3-dashboard-spec'],
      },
    ],
    weeklyTestId: 'test-week-3',
    materialIds: ['sm-w3-data-thinking', 'sm-w3-kpi-tree', 'sm-w3-dashboard-spec'],
    isCapstone: false,
  },
  {
    id: 'week-4',
    weekNumber: 4,
    title: 'Week 4: Facilitation and Prioritization',
    summary: 'Practice workshop leadership, stakeholder alignment, and confident prioritization under constraints.',
    theme: 'Collaboration and decisions',
    focusAreas: ['facilitation', 'prioritization', 'risk management'],
    tasks: [
      {
        id: 'w4-mon',
        weekNumber: 4,
        day: 'Monday',
        title: 'Plan a discovery workshop',
        kind: 'lesson',
        objective: 'Prepare an agenda, outcomes, and prompts for a focused stakeholder session.',
        estimatedMinutes: 40,
        materialIds: ['sm-w4-facilitation'],
      },
      {
        id: 'w4-tue',
        weekNumber: 4,
        day: 'Tuesday',
        title: 'Facilitate conflicting inputs',
        kind: 'practice',
        objective: 'Work through a scenario where stakeholders disagree on scope and urgency.',
        estimatedMinutes: 45,
        materialIds: ['sm-w4-facilitation', 'sm-w4-prioritization'],
      },
      {
        id: 'w4-wed',
        weekNumber: 4,
        day: 'Wednesday',
        title: 'Prioritize options',
        kind: 'analysis',
        objective: 'Use a structured matrix to compare value, effort, and risk across requests.',
        estimatedMinutes: 50,
        materialIds: ['sm-w4-prioritization'],
      },
      {
        id: 'w4-thu',
        weekNumber: 4,
        day: 'Thursday',
        title: 'Create a risk log',
        kind: 'deliverable',
        objective: 'Capture assumptions, dependencies, and mitigations for the preferred path.',
        estimatedMinutes: 40,
        materialIds: ['sm-w4-risk-log'],
      },
      {
        id: 'w4-fri',
        weekNumber: 4,
        day: 'Friday',
        title: 'Summarize decisions',
        kind: 'review',
        objective: 'Produce a concise decision summary for leadership and delivery teams.',
        estimatedMinutes: 30,
        materialIds: ['sm-w4-prioritization', 'sm-w4-risk-log'],
      },
    ],
    weeklyTestId: 'test-week-4',
    materialIds: ['sm-w4-facilitation', 'sm-w4-prioritization', 'sm-w4-risk-log'],
    isCapstone: false,
  },
  {
    id: 'week-5',
    weekNumber: 5,
    title: 'Week 5: Delivery Readiness',
    summary: 'Bring analysis outputs together into a release-ready package and executive recommendation.',
    theme: 'Execution readiness',
    focusAreas: ['backlog refinement', 'readiness', 'communication'],
    tasks: [
      {
        id: 'w5-mon',
        weekNumber: 5,
        day: 'Monday',
        title: 'Refine the backlog',
        kind: 'analysis',
        objective: 'Sequence the most valuable work and identify sliceable increments for delivery.',
        estimatedMinutes: 45,
        materialIds: ['sm-w5-backlog-refinement'],
      },
      {
        id: 'w5-tue',
        weekNumber: 5,
        day: 'Tuesday',
        title: 'Check delivery readiness',
        kind: 'review',
        objective: 'Confirm that requirements, owners, dependencies, and evidence are all in place.',
        estimatedMinutes: 35,
        materialIds: ['sm-w5-delivery-readiness'],
      },
      {
        id: 'w5-wed',
        weekNumber: 5,
        day: 'Wednesday',
        title: 'Prepare recommendation pack',
        kind: 'deliverable',
        objective: 'Package insights, options, and tradeoffs into a format that leaders can act on.',
        estimatedMinutes: 50,
        materialIds: ['sm-w5-presentation-brief'],
      },
      {
        id: 'w5-thu',
        weekNumber: 5,
        day: 'Thursday',
        title: 'Practice the walkthrough',
        kind: 'workshop',
        objective: 'Rehearse the story of the work, including rationale, risks, and phased next steps.',
        estimatedMinutes: 45,
        materialIds: ['sm-w5-presentation-brief', 'sm-w5-delivery-readiness'],
      },
      {
        id: 'w5-fri',
        weekNumber: 5,
        day: 'Friday',
        title: 'Finalize the handoff',
        kind: 'deliverable',
        objective: 'Finish a delivery-ready artifact set suitable for portfolio review or team kickoff.',
        estimatedMinutes: 40,
        materialIds: ['sm-w5-backlog-refinement', 'sm-w5-delivery-readiness'],
      },
    ],
    weeklyTestId: 'test-week-5',
    materialIds: ['sm-w5-backlog-refinement', 'sm-w5-delivery-readiness', 'sm-w5-presentation-brief'],
    isCapstone: false,
  },
  {
    id: 'week-26',
    weekNumber: 26,
    title: 'Week 26: Capstone',
    summary: 'Complete and present the final end-to-end business analysis capstone.',
    theme: 'Portfolio capstone',
    focusAreas: ['integration', 'communication', 'delivery recommendation'],
    tasks: [
      {
        id: 'w26-mon',
        weekNumber: 26,
        day: 'Monday',
        title: 'Set the capstone charter',
        kind: 'deliverable',
        objective: 'Lock the problem statement, business outcomes, and stakeholder scope for the final project.',
        estimatedMinutes: 60,
        materialIds: ['sm-w26-capstone-charter'],
      },
      {
        id: 'w26-tue',
        weekNumber: 26,
        day: 'Tuesday',
        title: 'Assemble analysis evidence',
        kind: 'analysis',
        objective: 'Pull together discovery notes, process findings, requirements, and data insights.',
        estimatedMinutes: 75,
        materialIds: ['sm-w26-capstone-charter', 'sm-w26-capstone-rubric'],
      },
      {
        id: 'w26-wed',
        weekNumber: 26,
        day: 'Wednesday',
        title: 'Shape the recommendation',
        kind: 'workshop',
        objective: 'Turn the evidence into a coherent future-state recommendation and roadmap.',
        estimatedMinutes: 75,
        materialIds: ['sm-w26-capstone-rubric'],
      },
      {
        id: 'w26-thu',
        weekNumber: 26,
        day: 'Thursday',
        title: 'Rehearse the final demo',
        kind: 'review',
        objective: 'Validate flow, clarity, supporting evidence, and likely stakeholder questions.',
        estimatedMinutes: 60,
        materialIds: ['sm-w26-demo-checklist'],
      },
      {
        id: 'w26-fri',
        weekNumber: 26,
        day: 'Friday',
        title: 'Submit and present capstone',
        kind: 'deliverable',
        objective: 'Deliver the complete capstone package and present the final recommendation confidently.',
        estimatedMinutes: 90,
        materialIds: ['sm-w26-capstone-rubric', 'sm-w26-demo-checklist'],
      },
    ],
    weeklyTestId: 'test-week-26',
    materialIds: ['sm-w26-capstone-charter', 'sm-w26-capstone-rubric', 'sm-w26-demo-checklist'],
    isCapstone: true,
  },
] as const satisfies readonly CurriculumWeek[]

export const curriculumByWeek = curriculum.reduce<
  Record<WeekNumber, CurriculumWeek>
>((lookup, week) => {
  lookup[week.weekNumber] = week
  return lookup
}, {} as Record<WeekNumber, CurriculumWeek>)

function createEmptyTaskProgress(taskId: TaskId): TaskProgress {
  return {
    taskId,
    status: 'not-started',
    completedAt: null,
    minutesSpent: 0,
  }
}

function createEmptyAssessmentProgress(
  assessmentId: AssessmentId,
): AssessmentProgress {
  return {
    assessmentId,
    status: 'not-started',
    score: null,
    completedAt: null,
  }
}

function createEmptyWeekProgress(weekNumber: WeekNumber): WeekProgress {
  return {
    weekNumber,
    taskIdsCompleted: [],
    assessmentCompleted: false,
    updatedAt: new Date(0).toISOString(),
  }
}

export function createInitialCurriculumProgress(): CurriculumProgress {
  const tasks = Object.fromEntries(
    curriculum.flatMap((week) =>
      week.tasks.map((task) => [task.id, createEmptyTaskProgress(task.id)]),
    ),
  ) as Record<TaskId, TaskProgress>

  const weeklyAssessments = Object.fromEntries(
    assessments.map((assessment) => [
      assessment.id,
      createEmptyAssessmentProgress(assessment.id),
    ]),
  ) as Record<AssessmentId, AssessmentProgress>

  const weeks = Object.fromEntries(
    curriculum.map((week) => [
      week.weekNumber,
      createEmptyWeekProgress(week.weekNumber),
    ]),
  ) as Record<WeekNumber, WeekProgress>

  return {
    tasks,
    assessments: weeklyAssessments,
    weeks,
  }
}

export function createInitialLocalStorageProgressState(): LocalStorageProgressState {
  return {
    version: 1,
    savedAt: new Date(0).toISOString(),
    curriculum: createInitialCurriculumProgress(),
  }
}
