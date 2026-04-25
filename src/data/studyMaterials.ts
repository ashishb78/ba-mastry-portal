import { WEEK_NUMBERS } from '../types'
import type { MaterialId, StudyMaterial, WeekNumber } from '../types'

export const studyMaterials = [
  {
    id: 'sm-w1-ba-role',
    weekNumber: 1,
    title: 'BA Role Primer',
    kind: 'article',
    description: 'Defines the analyst mindset, business value, and common delivery contexts.',
    estimatedMinutes: 35,
    resourceLabel: 'Reading guide',
  },
  {
    id: 'sm-w1-stakeholder-map',
    weekNumber: 1,
    title: 'Stakeholder Mapping Canvas',
    kind: 'template',
    description: 'A one-page canvas for mapping sponsors, users, and delivery partners.',
    estimatedMinutes: 20,
    resourceLabel: 'Workshop template',
  },
  {
    id: 'sm-w1-requirements-basics',
    weekNumber: 1,
    title: 'Requirements Basics Worksheet',
    kind: 'worksheet',
    description: 'A guided worksheet to separate business goals, needs, and solution ideas.',
    estimatedMinutes: 25,
    resourceLabel: 'Practice worksheet',
  },
  {
    id: 'sm-w2-process-mapping',
    weekNumber: 2,
    title: 'Process Mapping Essentials',
    kind: 'video',
    description: 'Walkthrough of current-state and future-state process mapping.',
    estimatedMinutes: 30,
    resourceLabel: 'Video walkthrough',
  },
  {
    id: 'sm-w2-user-stories',
    weekNumber: 2,
    title: 'User Story Structure Guide',
    kind: 'article',
    description: 'Shows how to frame user stories around goals, roles, and value.',
    estimatedMinutes: 25,
    resourceLabel: 'Story writing guide',
  },
  {
    id: 'sm-w2-acceptance-criteria',
    weekNumber: 2,
    title: 'Acceptance Criteria Checklist',
    kind: 'checklist',
    description: 'A checklist for clear, testable, and implementation-ready criteria.',
    estimatedMinutes: 15,
    resourceLabel: 'Quality checklist',
  },
  {
    id: 'sm-w3-data-thinking',
    weekNumber: 3,
    title: 'Data Thinking for Analysts',
    kind: 'article',
    description: 'Introduces business questions, data signals, and measurable decisions.',
    estimatedMinutes: 30,
    resourceLabel: 'Reading guide',
  },
  {
    id: 'sm-w3-kpi-tree',
    weekNumber: 3,
    title: 'KPI Tree Template',
    kind: 'template',
    description: 'A template to break outcomes into leading and lagging indicators.',
    estimatedMinutes: 20,
    resourceLabel: 'Template pack',
  },
  {
    id: 'sm-w3-dashboard-spec',
    weekNumber: 3,
    title: 'Dashboard Specification Worksheet',
    kind: 'worksheet',
    description: 'Helps define audience, decisions, filters, and measures for reporting.',
    estimatedMinutes: 25,
    resourceLabel: 'Specification worksheet',
  },
  {
    id: 'sm-w4-facilitation',
    weekNumber: 4,
    title: 'Facilitation Playbook',
    kind: 'article',
    description: 'Practical prompts for discovery sessions, alignment meetings, and retrospectives.',
    estimatedMinutes: 30,
    resourceLabel: 'Playbook',
  },
  {
    id: 'sm-w4-prioritization',
    weekNumber: 4,
    title: 'Prioritization Matrix',
    kind: 'template',
    description: 'A matrix for balancing value, effort, risk, and urgency.',
    estimatedMinutes: 20,
    resourceLabel: 'Decision template',
  },
  {
    id: 'sm-w4-risk-log',
    weekNumber: 4,
    title: 'Risk and Dependency Log',
    kind: 'worksheet',
    description: 'A structured log for assumptions, dependencies, blockers, and mitigations.',
    estimatedMinutes: 20,
    resourceLabel: 'Tracking worksheet',
  },
  {
    id: 'sm-w5-backlog-refinement',
    weekNumber: 5,
    title: 'Backlog Refinement Guide',
    kind: 'article',
    description: 'Covers sequencing, slicing, and readiness checks for delivery planning.',
    estimatedMinutes: 30,
    resourceLabel: 'Refinement guide',
  },
  {
    id: 'sm-w5-delivery-readiness',
    weekNumber: 5,
    title: 'Delivery Readiness Checklist',
    kind: 'checklist',
    description: 'Ensures stories, risks, owners, and measures are all release-ready.',
    estimatedMinutes: 15,
    resourceLabel: 'Readiness checklist',
  },
  {
    id: 'sm-w5-presentation-brief',
    weekNumber: 5,
    title: 'Stakeholder Presentation Brief',
    kind: 'template',
    description: 'A lightweight deck outline for recommendations, tradeoffs, and next steps.',
    estimatedMinutes: 20,
    resourceLabel: 'Deck template',
  },
  {
    id: 'sm-w26-capstone-charter',
    weekNumber: 26,
    title: 'Capstone Project Charter',
    kind: 'template',
    description: 'A charter template for framing the final business analysis initiative.',
    estimatedMinutes: 25,
    resourceLabel: 'Charter template',
  },
  {
    id: 'sm-w26-capstone-rubric',
    weekNumber: 26,
    title: 'Capstone Evaluation Rubric',
    kind: 'checklist',
    description: 'Explains how the final capstone will be reviewed across depth, clarity, and impact.',
    estimatedMinutes: 15,
    resourceLabel: 'Evaluation rubric',
  },
  {
    id: 'sm-w26-demo-checklist',
    weekNumber: 26,
    title: 'Final Demo Checklist',
    kind: 'worksheet',
    description: 'Covers walkthrough flow, evidence, recommendations, and Q&A readiness.',
    estimatedMinutes: 20,
    resourceLabel: 'Demo checklist',
  },
] as const satisfies readonly StudyMaterial[]

export const studyMaterialsById = studyMaterials.reduce<
  Record<MaterialId, StudyMaterial>
>((lookup, material) => {
  lookup[material.id] = material
  return lookup
}, {} as Record<MaterialId, StudyMaterial>)

export const studyMaterialsByWeek = WEEK_NUMBERS.reduce<
  Record<WeekNumber, readonly StudyMaterial[]>
>((lookup, weekNumber) => {
  lookup[weekNumber] = studyMaterials.filter(
    (material) => material.weekNumber === weekNumber,
  )
  return lookup
}, {} as Record<WeekNumber, readonly StudyMaterial[]>)
