import PlaceholderCard from '../components/PlaceholderCard'
import PageHeader from '../components/PageHeader'

export default function SettingsPage() {
  return (
    <section className="space-y-6">
      <PageHeader
        eyebrow="Settings"
        title="Personalize your study environment"
        description="This page is prepared for learner preferences, profile data, reminders, and future export or sync controls."
        accent="amber"
      />

      <div className="grid gap-4 lg:grid-cols-2">
        <PlaceholderCard
          title="Study preferences"
          description="Control focus defaults, weekly pacing, and preferred learning rhythm."
          accent="amber"
        />
        <PlaceholderCard
          title="Profile details"
          description="Store your name, target role, and cohort information."
          accent="blue"
        />
        <PlaceholderCard
          title="Notifications"
          description="Reserve space for milestone reminders and deadline prompts."
          accent="green"
        />
        <PlaceholderCard
          title="Data and sync"
          description="Future home for export, backup, restore, and local persistence settings."
          accent="amber"
        />
      </div>
    </section>
  )
}
