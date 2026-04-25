import type { CapstoneProject } from '../types'

export const capstone = {
  id: 'capstone-project',
  weekNumber: 26,
  title: 'BA Mastery Transformation Capstone',
  brief:
    'Create a complete analysis package for a fictional business transformation initiative, including discovery outputs, requirements, data insights, prioritization, and an implementation recommendation.',
  outcome:
    'A portfolio-ready capstone that demonstrates end-to-end analyst capability using the methods practiced across the program.',
  milestones: [
    {
      id: 'capstone-1',
      title: 'Frame the problem',
      deliverable: 'Problem statement, goals, assumptions, and stakeholder map',
      successCriteria: [
        'Problem is measurable and business-relevant',
        'Stakeholders are clearly identified',
        'Assumptions and constraints are explicit',
      ],
    },
    {
      id: 'capstone-2',
      title: 'Define the current state',
      deliverable: 'Current-state process map and pain point summary',
      successCriteria: [
        'Process steps are logically sequenced',
        'Pain points are evidence-based',
        'Opportunities are linked to outcomes',
      ],
    },
    {
      id: 'capstone-3',
      title: 'Design the future state',
      deliverable: 'Future-state workflow, prioritized requirements, and story slices',
      successCriteria: [
        'Requirements are testable',
        'Prioritization method is visible',
        'Scope supports phased delivery',
      ],
    },
    {
      id: 'capstone-4',
      title: 'Support the case with data',
      deliverable: 'KPI tree, measurement plan, and reporting recommendation',
      successCriteria: [
        'Metrics align to business goals',
        'Leading and lagging indicators are balanced',
        'Reporting supports stakeholder decisions',
      ],
    },
    {
      id: 'capstone-5',
      title: 'Present the recommendation',
      deliverable: 'Final presentation deck with roadmap, risks, and next steps',
      successCriteria: [
        'Recommendation is concise and persuasive',
        'Risks and mitigations are realistic',
        'Next steps are actionable',
      ],
    },
  ],
  assessmentId: 'test-week-26',
  materialIds: ['sm-w26-capstone-charter', 'sm-w26-capstone-rubric', 'sm-w26-demo-checklist'],
} as const satisfies CapstoneProject
