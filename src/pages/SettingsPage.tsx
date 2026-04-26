import { useRef, useState } from 'react'
import {
  Download,
  FileDown,
  FileUp,
  RefreshCcw,
  ShieldCheck,
} from 'lucide-react'
import { jsPDF } from 'jspdf'
import PageHeader from '../components/PageHeader'
import { assessments } from '../data/assessments'
import { curriculum } from '../data/curriculum'
import { useProgress } from '../hooks/useProgress'

function downloadJsonFile(filename: string, content: string) {
  const blob = new Blob([content], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = filename
  anchor.click()
  URL.revokeObjectURL(url)
}

export default function SettingsPage() {
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const {
    progressState,
    curriculum: progress,
    currentWeekProgress,
    overallCompletion,
    streak,
    topicMastery,
    replaceProgressState,
    resetProgress,
  } = useProgress()

  const completedWeeks = curriculum.filter((week) => {
    const weekProgress = progress.weeks[week.weekNumber]
    return weekProgress.taskIdsCompleted.length === 5 && weekProgress.assessmentCompleted
  }).length

  const testsPassed = assessments.filter(
    (assessment) => progress.weeks[assessment.weekNumber].assessmentCompleted,
  ).length

  const averageScoreEntries = Object.values(progress.assessments)
    .map((assessment) => assessment.score)
    .filter((score): score is number => score !== null)

  const averageScore =
    averageScoreEntries.length === 0
      ? 0
      : averageScoreEntries.reduce((sum, score) => sum + score, 0) /
        averageScoreEntries.length

  function clearFeedback() {
    setMessage(null)
    setError(null)
  }

  function handleResetProgress() {
    clearFeedback()

    const confirmed = window.confirm(
      'Reset all local progress, test scores, and unlocks for this browser?',
    )

    if (!confirmed) {
      return
    }

    resetProgress()
    setMessage('Local progress was reset successfully.')
  }

  function handleExportProgress() {
    clearFeedback()

    downloadJsonFile(
      `ba-mastery-progress-${new Date().toISOString().slice(0, 10)}.json`,
      JSON.stringify(progressState, null, 2),
    )

    setMessage('Progress exported as JSON.')
  }

  function handleImportClick() {
    clearFeedback()
    fileInputRef.current?.click()
  }

  function handleImportProgress(event: React.ChangeEvent<HTMLInputElement>) {
    clearFeedback()
    const file = event.target.files?.[0]

    if (!file) {
      return
    }

    const reader = new FileReader()

    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result))
        const imported = replaceProgressState(parsed)

        if (!imported) {
          setError('That file does not contain a valid BA Mastery progress export.')
          return
        }

        setMessage('Progress imported successfully from JSON.')
      } catch {
        setError('The selected file could not be read as valid JSON.')
      } finally {
        event.target.value = ''
      }
    }

    reader.onerror = () => {
      setError('The selected file could not be read.')
      event.target.value = ''
    }

    reader.readAsText(file)
  }

  function handleGeneratePdf() {
    clearFeedback()

    const pdf = new jsPDF()
    const topMastery = [...topicMastery]
      .sort((left, right) => right.mastery - left.mastery)
      .slice(0, 5)

    const lines = [
      'Business Analyst Mastery Portal',
      'Local Progress Summary',
      '',
      `Generated: ${new Date().toLocaleString()}`,
      `Overall completion: ${overallCompletion.percentage}%`,
      `Completed weeks: ${completedWeeks}/26`,
      `Current week: ${currentWeekProgress.title}`,
      `Current week progress: ${currentWeekProgress.summary.percentage}%`,
      `Streak: ${streak} day${streak === 1 ? '' : 's'}`,
      `Tests passed: ${testsPassed}/${assessments.length}`,
      `Average score: ${averageScore.toFixed(1)}/5`,
      '',
      'Top topic mastery:',
      ...topMastery.map(
        (entry) =>
          `- ${entry.topic}: ${entry.mastery}% (${entry.passedAssessments} passed)`,
      ),
    ]

    pdf.setFontSize(16)
    pdf.text('BA Mastery Progress Summary', 20, 20)
    pdf.setFontSize(11)
    pdf.text(lines, 20, 32)
    pdf.save('ba-mastery-progress-summary.pdf')

    setMessage('Progress summary PDF generated locally.')
  }

  return (
    <section className="space-y-6">
      <PageHeader
        eyebrow="Settings"
        title="Manage local progress and exports"
        description="All settings on this page stay in the browser only. You can reset, export, import, and generate a PDF summary without any backend."
        accent="amber"
      />

      <input
        ref={fileInputRef}
        type="file"
        accept="application/json"
        className="hidden"
        onChange={handleImportProgress}
      />

      {message ? (
        <div className="rounded-2xl border border-[var(--color-success)]/30 bg-[var(--color-success)]/10 px-4 py-3 text-sm font-medium text-[var(--color-success)]">
          {message}
        </div>
      ) : null}

      {error ? (
        <div className="rounded-2xl border border-[var(--color-warning)]/30 bg-[var(--color-warning)]/10 px-4 py-3 text-sm font-medium text-[var(--color-warning)]">
          {error}
        </div>
      ) : null}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <article className="rounded-[1.75rem] border border-[var(--color-border)] bg-white p-5 shadow-[var(--shadow-card)]">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--color-primary)]/12 text-[var(--color-primary)]">
            <ShieldCheck size={18} />
          </div>
          <p className="mt-4 text-sm font-medium text-[var(--color-muted)]">Storage mode</p>
          <p className="mt-2 text-2xl font-semibold text-[var(--color-text)]">Local only</p>
          <p className="mt-3 text-sm leading-6 text-[var(--color-muted)]">
            Progress stays in browser localStorage on this device.
          </p>
        </article>

        <article className="rounded-[1.75rem] border border-[var(--color-border)] bg-white p-5 shadow-[var(--shadow-card)]">
          <p className="text-sm font-medium text-[var(--color-muted)]">Overall completion</p>
          <p className="mt-2 text-2xl font-semibold text-[var(--color-text)]">
            {overallCompletion.percentage}%
          </p>
          <p className="mt-3 text-sm leading-6 text-[var(--color-muted)]">
            {overallCompletion.completed} of {overallCompletion.total} total milestones completed.
          </p>
        </article>

        <article className="rounded-[1.75rem] border border-[var(--color-border)] bg-white p-5 shadow-[var(--shadow-card)]">
          <p className="text-sm font-medium text-[var(--color-muted)]">Completed weeks</p>
          <p className="mt-2 text-2xl font-semibold text-[var(--color-text)]">
            {completedWeeks}/26
          </p>
          <p className="mt-3 text-sm leading-6 text-[var(--color-muted)]">
            Weeks with all tasks complete and a passed weekly test.
          </p>
        </article>

        <article className="rounded-[1.75rem] border border-[var(--color-border)] bg-white p-5 shadow-[var(--shadow-card)]">
          <p className="text-sm font-medium text-[var(--color-muted)]">Average score</p>
          <p className="mt-2 text-2xl font-semibold text-[var(--color-text)]">
            {averageScore.toFixed(1)}/5
          </p>
          <p className="mt-3 text-sm leading-6 text-[var(--color-muted)]">
            Based on submitted weekly self-graded tests only.
          </p>
        </article>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <article className="rounded-[1.75rem] border border-[var(--color-border)] bg-white p-6 shadow-[var(--shadow-card)]">
          <p className="text-sm font-semibold text-[var(--color-primary)]">Data actions</p>
          <h3 className="mt-1 text-2xl font-semibold text-[var(--color-text)]">
            Export, import, and reset local progress
          </h3>

          <div className="mt-6 grid gap-4">
            <button
              type="button"
              onClick={handleExportProgress}
              className="flex items-center justify-between rounded-[1.5rem] border border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-4 text-left"
            >
              <div>
                <p className="text-base font-semibold text-[var(--color-text)]">
                  Export progress as JSON
                </p>
                <p className="mt-1 text-sm leading-6 text-[var(--color-muted)]">
                  Download a portable local backup of your current progress state.
                </p>
              </div>
              <Download size={18} className="text-[var(--color-primary)]" />
            </button>

            <button
              type="button"
              onClick={handleImportClick}
              className="flex items-center justify-between rounded-[1.5rem] border border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-4 text-left"
            >
              <div>
                <p className="text-base font-semibold text-[var(--color-text)]">
                  Import progress from JSON
                </p>
                <p className="mt-1 text-sm leading-6 text-[var(--color-muted)]">
                  Restore a previously exported file into this browser only.
                </p>
              </div>
              <FileUp size={18} className="text-[var(--color-primary)]" />
            </button>

            <button
              type="button"
              onClick={handleResetProgress}
              className="flex items-center justify-between rounded-[1.5rem] border border-[var(--color-warning)]/30 bg-[var(--color-warning)]/10 px-5 py-4 text-left"
            >
              <div>
                <p className="text-base font-semibold text-[var(--color-text)]">
                  Reset progress
                </p>
                <p className="mt-1 text-sm leading-6 text-[var(--color-muted)]">
                  Clear all local tasks, scores, unlocks, and stored progression after confirmation.
                </p>
              </div>
              <RefreshCcw size={18} className="text-[var(--color-warning)]" />
            </button>
          </div>
        </article>

        <article className="rounded-[1.75rem] border border-[var(--color-border)] bg-white p-6 shadow-[var(--shadow-card)]">
          <p className="text-sm font-semibold text-[var(--color-success)]">PDF summary</p>
          <h3 className="mt-1 text-2xl font-semibold text-[var(--color-text)]">
            Generate a local progress report
          </h3>

          <div className="mt-5 space-y-3 text-sm leading-6 text-[var(--color-muted)]">
            <p className="rounded-2xl bg-[var(--color-surface)] px-4 py-3">
              Current week: {currentWeekProgress.title}
            </p>
            <p className="rounded-2xl bg-[var(--color-surface)] px-4 py-3">
              Streak: {streak} day{streak === 1 ? '' : 's'}
            </p>
            <p className="rounded-2xl bg-[var(--color-surface)] px-4 py-3">
              Tests passed: {testsPassed}/{assessments.length}
            </p>
          </div>

          <button
            type="button"
            onClick={handleGeneratePdf}
            className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-[var(--color-success)] px-5 py-3 text-sm font-semibold text-white"
          >
            <FileDown size={16} />
            Generate summary PDF
          </button>
        </article>
      </div>
    </section>
  )
}
