export const STEP_IDS = [
  'contact',
  'business',
  'needs',
  'assets',
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

export const ASSET_READINESS = ['ready', 'partial', 'none'] as const;

export type AssetReadiness = (typeof ASSET_READINESS)[number];

export const ASSET_KEYS = [
  'logo',
  'photos',
  'texts',
  'visualIdentity',
  'brandManual',
] as const;

export type AssetKey = (typeof ASSET_KEYS)[number];
