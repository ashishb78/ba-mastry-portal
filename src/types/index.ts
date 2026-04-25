export type Weekday = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday'

export type WeekNumber = 1 | 2 | 3 | 4 | 5 | 26

export type TaskKind =
  | 'lesson'
  | 'practice'
  | 'analysis'
  | 'workshop'
  | 'review'
  | 'deliverable'

export type AssessmentKind = 'quiz' | 'scenario' | 'case-study' | 'capstone'

export type StudyMaterialKind =
  | 'article'
  | 'template'
  | 'video'
  | 'worksheet'
  | 'checklist'

export type ProgressStatus = 'not-started' | 'in-progress' | 'completed'

export type MaterialId =
  | 'sm-w1-ba-role'
  | 'sm-w1-stakeholder-map'
  | 'sm-w1-requirements-basics'
  | 'sm-w2-process-mapping'
  | 'sm-w2-user-stories'
  | 'sm-w2-acceptance-criteria'
  | 'sm-w3-data-thinking'
  | 'sm-w3-kpi-tree'
  | 'sm-w3-dashboard-spec'
  | 'sm-w4-facilitation'
  | 'sm-w4-prioritization'
  | 'sm-w4-risk-log'
  | 'sm-w5-backlog-refinement'
  | 'sm-w5-delivery-readiness'
  | 'sm-w5-presentation-brief'
  | 'sm-w26-capstone-charter'
  | 'sm-w26-capstone-rubric'
  | 'sm-w26-demo-checklist'

export type TaskId =
  | 'w1-mon'
  | 'w1-tue'
  | 'w1-wed'
  | 'w1-thu'
  | 'w1-fri'
  | 'w2-mon'
  | 'w2-tue'
  | 'w2-wed'
  | 'w2-thu'
  | 'w2-fri'
  | 'w3-mon'
  | 'w3-tue'
  | 'w3-wed'
  | 'w3-thu'
  | 'w3-fri'
  | 'w4-mon'
  | 'w4-tue'
  | 'w4-wed'
  | 'w4-thu'
  | 'w4-fri'
  | 'w5-mon'
  | 'w5-tue'
  | 'w5-wed'
  | 'w5-thu'
  | 'w5-fri'
  | 'w26-mon'
  | 'w26-tue'
  | 'w26-wed'
  | 'w26-thu'
  | 'w26-fri'

export type AssessmentId =
  | 'test-week-1'
  | 'test-week-2'
  | 'test-week-3'
  | 'test-week-4'
  | 'test-week-5'
  | 'test-week-26'

export interface StudyMaterial {
  id: MaterialId
  weekNumber: WeekNumber
  title: string
  kind: StudyMaterialKind
  description: string
  estimatedMinutes: number
  resourceLabel: string
}

export interface DailyTask {
  id: TaskId
  weekNumber: WeekNumber
  day: Weekday
  title: string
  kind: TaskKind
  objective: string
  estimatedMinutes: number
  materialIds: readonly MaterialId[]
}

export interface WeeklyAssessment {
  id: AssessmentId
  weekNumber: WeekNumber
  title: string
  kind: AssessmentKind
  durationMinutes: number
  passingScore: number
  prompt: string
  topics: readonly string[]
}

export interface CurriculumWeek {
  id: `week-${WeekNumber}`
  weekNumber: WeekNumber
  title: string
  summary: string
  theme: string
  focusAreas: readonly string[]
  tasks: readonly [
    DailyTask,
    DailyTask,
    DailyTask,
    DailyTask,
    DailyTask,
  ]
  weeklyTestId: AssessmentId
  materialIds: readonly MaterialId[]
  isCapstone: boolean
}

export interface CapstoneMilestone {
  id: `capstone-${number}`
  title: string
  deliverable: string
  successCriteria: readonly string[]
}

export interface CapstoneProject {
  id: 'capstone-project'
  weekNumber: 26
  title: string
  brief: string
  outcome: string
  milestones: readonly [
    CapstoneMilestone,
    CapstoneMilestone,
    CapstoneMilestone,
    CapstoneMilestone,
    CapstoneMilestone,
  ]
  assessmentId: 'test-week-26'
  materialIds: readonly MaterialId[]
}

export interface TaskProgress {
  taskId: TaskId
  status: ProgressStatus
  completedAt: string | null
  minutesSpent: number
}

export interface AssessmentProgress {
  assessmentId: AssessmentId
  status: ProgressStatus
  score: number | null
  completedAt: string | null
}

export interface WeekProgress {
  weekNumber: WeekNumber
  taskIdsCompleted: readonly TaskId[]
  assessmentCompleted: boolean
  updatedAt: string
}

export interface CurriculumProgress {
  tasks: Record<TaskId, TaskProgress>
  assessments: Record<AssessmentId, AssessmentProgress>
  weeks: Record<WeekNumber, WeekProgress>
}

export interface LocalStorageProgressState {
  version: 1
  savedAt: string
  curriculum: CurriculumProgress
}

export interface ProgressSummary {
  completed: number
  total: number
  percentage: number
}

export const LOCAL_STORAGE_KEYS = {
  progress: 'ba-mastery-progress',
} as const
