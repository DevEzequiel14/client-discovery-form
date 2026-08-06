export const STEP_IDS = [
  'contact',
  'business',
  'project-type',
  'goals',
  'features',
  'design',
  'timeline-budget',
  'review',
] as const;

export type StepId = (typeof STEP_IDS)[number];

export const PROJECT_TYPES = [
  'website',
  'webApp',
  'ecommerce',
  'redesign',
  'other',
] as const;

export type ProjectType = (typeof PROJECT_TYPES)[number];
