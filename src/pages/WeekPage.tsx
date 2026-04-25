import { useParams } from 'react-router'
import PlaceholderCard from '../components/PlaceholderCard'
import PageHeader from '../components/PageHeader'

export default function WeekPage() {
  const { weekNumber = '1' } = useParams()

  return (
    <section className="space-y-6">
      <div className="rounded-[2rem] border border-[var(--color-border)] bg-white p-6 shadow-[var(--shadow-card)] sm:p-8">
        <PageHeader
          eyebrow={`Week ${weekNumber}`}
          title={`Weekly workspace for week ${weekNumber}`}
          description={`This placeholder route is ready to become the focused study page for week ${weekNumber}, including objectives, exercises, notes, and progress check-ins.`}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <PlaceholderCard
          title="Objectives"
          description="Define the BA skills, learning outcomes, and expected deliverables for this week."
          accent="blue"
        />
        <PlaceholderCard
          title="Practice tasks"
          description="Capture exercises, workshop prompts, templates, and mini deliverables."
          accent="green"
        />
        <PlaceholderCard
          title="Review checklist"
          description="Track confidence, blockers, revision notes, and follow-up topics."
          accent="amber"
        />
      </div>
    </section>
  )
}
