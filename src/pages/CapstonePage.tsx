import PlaceholderCard from '../components/PlaceholderCard'
import PageHeader from '../components/PageHeader'

export default function CapstonePage() {
  return (
    <section className="space-y-6">
      <PageHeader
        eyebrow="Capstone"
        title="Final project workspace"
        description="This route reserves a focused area for the business case, stakeholder analysis, requirements pack, and final presentation assets."
        accent="green"
      />

      <div className="grid gap-6 xl:grid-cols-[1.25fr_0.95fr]">
        <article className="rounded-[1.75rem] bg-[var(--color-text)] p-6 text-white shadow-[var(--shadow-soft)]">
          <h3 className="text-xl font-semibold">Capstone structure</h3>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-white/80">
            Reserve this area for the business case, stakeholder map, process
            analysis, requirements package, and presentation materials that bring
            the course together.
          </p>
        </article>

        <div className="grid gap-4">
          <PlaceholderCard
            title="Problem framing"
            description="Use this section for the business need, project scope, and outcome definition."
            accent="green"
          />
          <PlaceholderCard
            title="Artifacts and analysis"
            description="Reserve space for process models, stakeholder maps, and requirement documentation."
            accent="blue"
          />
          <PlaceholderCard
            title="Presentation readiness"
            description="Track your final review, supporting evidence, and stakeholder presentation materials."
            accent="amber"
          />
        </div>
      </div>
    </section>
  )
}
