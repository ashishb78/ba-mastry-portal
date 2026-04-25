import { assessmentsById, assessmentsByWeek } from '../data/assessments'
import {
  createInitialLocalStorageProgressState,
  curriculum,
  curriculumByWeek,
} from '../data/curriculum'
import { storage } from './storage'
import {
  LOCAL_STORAGE_KEYS,
  WEEK_NUMBERS,
  type AssessmentId,
  type AssessmentProgress,
  type CurriculumProgress,
  type LocalStorageProgressState,
  type ProgressSummary,
  type TaskId,
  type TaskProgress,
  type WeekNumber,
  type WeekProgress,
} from '../types'

export const WEEKLY_TEST_PASS_THRESHOLD = 3
export const WEEKLY_TEST_TOTAL_SCORE = 5

export interface CurrentWeekProgress {
  weekNumber: WeekNumber
  title: string
  unlocked: boolean
  tasksCompleted: number
  totalTasks: number
  testScore: number | null
  testPassed: boolean
  summary: ProgressSummary
}

export interface TopicMastery {
  topic: string
  mastery: number
  completedAssessments: number
  passedAssessments: number
}

function timestamp() {
  return new Date().toISOString()
}

function clampScore(score: number) {
  return Math.max(0, Math.min(WEEKLY_TEST_TOTAL_SCORE, Math.round(score)))
}

function isTaskCompleted(task: TaskProgress) {
  return task.status === 'completed'
}

function isAssessmentPassed(assessment: AssessmentProgress) {
  return (
    assessment.status === 'completed' &&
    assessment.score !== null &&
    assessment.score >= WEEKLY_TEST_PASS_THRESHOLD
  )
}

function createTaskLookup(
  tasks: Record<TaskId, TaskProgress>,
  taskId: TaskId,
  completed: boolean,
): Record<TaskId, TaskProgress> {
  const currentTask = tasks[taskId]

  return {
    ...tasks,
    [taskId]: {
      ...currentTask,
      status: completed ? 'completed' : 'not-started',
      completedAt: completed ? currentTask.completedAt ?? timestamp() : null,
    },
  }
}

function getWeekTaskIds(weekNumber: WeekNumber): readonly TaskId[] {
  return curriculumByWeek[weekNumber].tasks.map((task) => task.id)
}

function createWeekLookup(
  progress: CurriculumProgress,
  weekNumber: WeekNumber,
): Record<WeekNumber, WeekProgress> {
  const taskIds = getWeekTaskIds(weekNumber)
  const completedTaskIds = taskIds.filter((taskId) =>
    isTaskCompleted(progress.tasks[taskId]),
  )
  const assessmentId = curriculumByWeek[weekNumber].weeklyTestId
  const assessmentCompleted = isAssessmentPassed(progress.assessments[assessmentId])

  return {
    ...progress.weeks,
    [weekNumber]: {
      ...progress.weeks[weekNumber],
      taskIdsCompleted: completedTaskIds,
      assessmentCompleted,
      updatedAt: timestamp(),
    },
  }
}

function normalizeProgressState(
  state: LocalStorageProgressState,
): LocalStorageProgressState {
  const initialState = createInitialLocalStorageProgressState()
  const normalizedTasks = { ...initialState.curriculum.tasks }
  const normalizedAssessments = { ...initialState.curriculum.assessments }
  const normalizedWeeks = { ...initialState.curriculum.weeks }

  for (const taskId of Object.keys(normalizedTasks) as TaskId[]) {
    const current = state.curriculum.tasks[taskId]

    if (current) {
      normalizedTasks[taskId] = {
        taskId,
        status: current.status,
        completedAt: current.completedAt,
        minutesSpent:
          typeof current.minutesSpent === 'number' ? current.minutesSpent : 0,
      }
    }
  }

  for (const assessmentId of Object.keys(normalizedAssessments) as AssessmentId[]) {
    const current = state.curriculum.assessments[assessmentId]

    if (current) {
      normalizedAssessments[assessmentId] = {
        assessmentId,
        status: current.status,
        score: current.score,
        completedAt: current.completedAt,
      }
    }
  }

  const draftProgress: CurriculumProgress = {
    tasks: normalizedTasks,
    assessments: normalizedAssessments,
    weeks: normalizedWeeks,
  }

  for (const weekNumber of WEEK_NUMBERS) {
    draftProgress.weeks = createWeekLookup(draftProgress, weekNumber)
  }

  return {
    version: 1,
    savedAt:
      typeof state.savedAt === 'string' ? state.savedAt : initialState.savedAt,
    curriculum: draftProgress,
  }
}

export function createInitialProgress() {
  return createInitialLocalStorageProgressState()
}

export function saveProgress(state: LocalStorageProgressState) {
  const nextState = {
    ...state,
    savedAt: timestamp(),
  }

  storage.set(LOCAL_STORAGE_KEYS.progress, nextState)
  return nextState
}

export function loadProgress() {
  const initialState = createInitialProgress()
  const storedState = storage.get<LocalStorageProgressState | null>(
    LOCAL_STORAGE_KEYS.progress,
    null,
  )

  if (!storedState || storedState.version !== 1) {
    return initialState
  }

  return normalizeProgressState(storedState)
}

export function resetProgress() {
  const resetState = createInitialProgress()
  storage.remove(LOCAL_STORAGE_KEYS.progress)
  storage.set(LOCAL_STORAGE_KEYS.progress, resetState)
  return resetState
}

export function isWeekUnlocked(
  progress: CurriculumProgress,
  weekNumber: WeekNumber,
) {
  const weekIndex = WEEK_NUMBERS.indexOf(weekNumber)

  if (weekIndex <= 0) {
    return true
  }

  const previousWeek = WEEK_NUMBERS[weekIndex - 1]
  const previousWeekProgress = progress.weeks[previousWeek]
  const previousWeekTasks = getWeekTaskIds(previousWeek)

  return (
    previousWeekTasks.every((taskId) => isTaskCompleted(progress.tasks[taskId])) &&
    previousWeekProgress.assessmentCompleted
  )
}

export function markTaskComplete(
  progress: CurriculumProgress,
  taskId: TaskId,
) {
  const weekNumber = curriculum.find((week) =>
    week.tasks.some((task) => task.id === taskId),
  )?.weekNumber

  if (!weekNumber || !isWeekUnlocked(progress, weekNumber)) {
    return progress
  }

  const nextProgress: CurriculumProgress = {
    ...progress,
    tasks: createTaskLookup(progress.tasks, taskId, true),
    assessments: progress.assessments,
    weeks: progress.weeks,
  }

  nextProgress.weeks = createWeekLookup(nextProgress, weekNumber)
  return nextProgress
}

export function markTaskIncomplete(
  progress: CurriculumProgress,
  taskId: TaskId,
) {
  const weekNumber = curriculum.find((week) =>
    week.tasks.some((task) => task.id === taskId),
  )?.weekNumber

  if (!weekNumber) {
    return progress
  }

  const nextProgress: CurriculumProgress = {
    ...progress,
    tasks: createTaskLookup(progress.tasks, taskId, false),
    assessments: progress.assessments,
    weeks: progress.weeks,
  }

  nextProgress.weeks = createWeekLookup(nextProgress, weekNumber)
  return nextProgress
}

export function submitWeeklyTest(
  progress: CurriculumProgress,
  weekNumber: WeekNumber,
  score: number,
) {
  if (!isWeekUnlocked(progress, weekNumber)) {
    return progress
  }

  const assessmentId = curriculumByWeek[weekNumber].weeklyTestId
  const currentAssessment = progress.assessments[assessmentId]

  if (currentAssessment.status === 'completed' && currentAssessment.score !== null) {
    return progress
  }

  const normalizedScore = clampScore(score)
  const nextAssessments: Record<AssessmentId, AssessmentProgress> = {
    ...progress.assessments,
    [assessmentId]: {
      assessmentId,
      status: 'completed',
      score: normalizedScore,
      completedAt: currentAssessment.completedAt ?? timestamp(),
    },
  }

  const nextProgress: CurriculumProgress = {
    ...progress,
    tasks: progress.tasks,
    assessments: nextAssessments,
    weeks: progress.weeks,
  }

  nextProgress.weeks = createWeekLookup(nextProgress, weekNumber)
  return nextProgress
}

export function calculateProgress(completed: number, total: number) {
  if (total <= 0) {
    return 0
  }

  return Math.round((completed / total) * 100)
}

export function calculateOverallCompletion(
  progress: CurriculumProgress,
): ProgressSummary {
  const totalTasks = curriculum.reduce((count, week) => count + week.tasks.length, 0)
  const completedTasks = Object.values(progress.tasks).filter(isTaskCompleted).length
  const passedAssessments = Object.values(progress.assessments).filter(
    isAssessmentPassed,
  ).length
  const total = totalTasks + Object.keys(progress.assessments).length
  const completed = completedTasks + passedAssessments

  return {
    completed,
    total,
    percentage: calculateProgress(completed, total),
  }
}

export function calculateWeekProgress(
  progress: CurriculumProgress,
  weekNumber: WeekNumber,
): ProgressSummary {
  const taskIds = getWeekTaskIds(weekNumber)
  const tasksCompleted = taskIds.filter((taskId) =>
    isTaskCompleted(progress.tasks[taskId]),
  ).length
  const assessmentPassed = progress.weeks[weekNumber].assessmentCompleted ? 1 : 0
  const completed = tasksCompleted + assessmentPassed
  const total = taskIds.length + 1

  return {
    completed,
    total,
    percentage: calculateProgress(completed, total),
  }
}

export function calculateCurrentWeekProgress(
  progress: CurriculumProgress,
): CurrentWeekProgress {
  const fallbackWeek = WEEK_NUMBERS[0]
  const currentWeekNumber =
    WEEK_NUMBERS.find((weekNumber) => {
      if (!isWeekUnlocked(progress, weekNumber)) {
        return false
      }

      return calculateWeekProgress(progress, weekNumber).percentage < 100
    }) ??
    [...WEEK_NUMBERS].reverse().find((weekNumber) =>
      isWeekUnlocked(progress, weekNumber),
    ) ??
    fallbackWeek

  const week = curriculumByWeek[currentWeekNumber]
  const taskIds = getWeekTaskIds(currentWeekNumber)
  const tasksCompleted = taskIds.filter((taskId) =>
    isTaskCompleted(progress.tasks[taskId]),
  ).length
  const test = progress.assessments[week.weeklyTestId]

  return {
    weekNumber: currentWeekNumber,
    title: week.title,
    unlocked: isWeekUnlocked(progress, currentWeekNumber),
    tasksCompleted,
    totalTasks: taskIds.length,
    testScore: test.score,
    testPassed: isAssessmentPassed(test),
    summary: calculateWeekProgress(progress, currentWeekNumber),
  }
}

function getActivityDates(progress: CurriculumProgress) {
  const timestamps = [
    ...Object.values(progress.tasks)
      .map((task) => task.completedAt)
      .filter((value): value is string => Boolean(value)),
    ...Object.values(progress.assessments)
      .map((assessment) => assessment.completedAt)
      .filter((value): value is string => Boolean(value)),
  ]

  return [...new Set(timestamps.map((value) => value.slice(0, 10)))].sort()
}

function shiftDate(dateValue: string, offsetDays: number) {
  const date = new Date(`${dateValue}T00:00:00`)
  date.setDate(date.getDate() + offsetDays)
  return date.toISOString().slice(0, 10)
}

export function calculateStreak(progress: CurriculumProgress) {
  const activityDates = getActivityDates(progress)

  if (activityDates.length === 0) {
    return 0
  }

  const today = new Date().toISOString().slice(0, 10)
  const latestActivity = activityDates[activityDates.length - 1]

  if (latestActivity !== today && latestActivity !== shiftDate(today, -1)) {
    return 0
  }

  let streak = 1

  for (let index = activityDates.length - 1; index > 0; index -= 1) {
    const currentDate = activityDates[index]
    const previousDate = activityDates[index - 1]

    if (previousDate === shiftDate(currentDate, -1)) {
      streak += 1
      continue
    }

    break
  }

  return streak
}

export function calculateTopicMastery(
  progress: CurriculumProgress,
): readonly TopicMastery[] {
  const topicAccumulator = new Map<
    string,
    { totalPercent: number; completedAssessments: number; passedAssessments: number }
  >()

  for (const assessment of Object.values(assessmentsById)) {
    const progressEntry = progress.assessments[assessment.id]
    const scorePercent =
      progressEntry.score === null
        ? 0
        : calculateProgress(progressEntry.score, WEEKLY_TEST_TOTAL_SCORE)

    for (const topic of assessment.topics) {
      const current = topicAccumulator.get(topic) ?? {
        totalPercent: 0,
        completedAssessments: 0,
        passedAssessments: 0,
      }

      if (progressEntry.score !== null) {
        current.totalPercent += scorePercent
        current.completedAssessments += 1

        if (isAssessmentPassed(progressEntry)) {
          current.passedAssessments += 1
        }
      }

      topicAccumulator.set(topic, current)
    }
  }

  return [...topicAccumulator.entries()]
    .map(([topic, data]) => ({
      topic,
      mastery:
        data.completedAssessments === 0
          ? 0
          : Math.round(data.totalPercent / data.completedAssessments),
      completedAssessments: data.completedAssessments,
      passedAssessments: data.passedAssessments,
    }))
    .sort((left, right) => left.topic.localeCompare(right.topic))
}

export function getWeekTest(weekNumber: WeekNumber) {
  return assessmentsByWeek[weekNumber]
}
