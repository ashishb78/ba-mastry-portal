import { useEffect, useState } from 'react'
import type { CurriculumProgress, LocalStorageProgressState, TaskId, WeekNumber } from '../types'
import {
  calculateCurrentWeekProgress,
  calculateOverallCompletion,
  calculateStreak,
  calculateTopicMastery,
  createInitialProgress,
  isWeekUnlocked,
  loadProgress,
  markTaskComplete,
  markTaskIncomplete,
  resetProgress as resetStoredProgress,
  saveProgress,
  submitWeeklyTest,
} from '../lib/progress'

export function useProgress() {
  const [progressState, setProgressState] = useState<LocalStorageProgressState>(
    () => loadProgress(),
  )

  useEffect(() => {
    saveProgress(progressState)
  }, [progressState])

  function updateCurriculum(
    updater: (current: CurriculumProgress) => CurriculumProgress,
  ) {
    setProgressState((currentState) => ({
      ...currentState,
      curriculum: updater(currentState.curriculum),
    }))
  }

  function initializeProgress() {
    const initialState = createInitialProgress()
    setProgressState(initialState)
    return initialState
  }

  function reloadProgress() {
    const loadedState = loadProgress()
    setProgressState(loadedState)
    return loadedState
  }

  function resetProgress() {
    const resetState = resetStoredProgress()
    setProgressState(resetState)
    return resetState
  }

  function markComplete(taskId: TaskId) {
    updateCurriculum((current) => markTaskComplete(current, taskId))
  }

  function markIncomplete(taskId: TaskId) {
    updateCurriculum((current) => markTaskIncomplete(current, taskId))
  }

  function submitTest(weekNumber: WeekNumber, score: number) {
    updateCurriculum((current) => submitWeeklyTest(current, weekNumber, score))
  }

  function saveCurrentProgress() {
    const savedState = saveProgress(progressState)
    setProgressState(savedState)
    return savedState
  }

  return {
    progressState,
    curriculum: progressState.curriculum,
    overallCompletion: calculateOverallCompletion(progressState.curriculum),
    currentWeekProgress: calculateCurrentWeekProgress(progressState.curriculum),
    streak: calculateStreak(progressState.curriculum),
    topicMastery: calculateTopicMastery(progressState.curriculum),
    isWeekUnlocked: (weekNumber: WeekNumber) =>
      isWeekUnlocked(progressState.curriculum, weekNumber),
    initializeProgress,
    loadProgress: reloadProgress,
    saveProgress: saveCurrentProgress,
    resetProgress,
    markTaskComplete: markComplete,
    markTaskIncomplete: markIncomplete,
    submitWeeklyTest: submitTest,
  }
}
