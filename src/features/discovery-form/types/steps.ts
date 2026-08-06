export const STEP_IDS = [
  'contact',
  'business',
  'needs',
  'assets',
  'design',
  'technical',
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

export const DESIGN_STYLES = [
  'minimal',
  'modern',
  'classic',
  'bold',
  'elegant',
  'friendly',
  'editorial',
  'other',
] as const;

export type DesignStyle = (typeof DESIGN_STYLES)[number];

export const DOMAIN_STATUS = ['yes', 'buying', 'no', 'unsure'] as const;
export type DomainStatus = (typeof DOMAIN_STATUS)[number];

export const HOSTING_STATUS = ['yes', 'no', 'unsure'] as const;
export type HostingStatus = (typeof HOSTING_STATUS)[number];

export const CORPORATE_EMAIL_STATUS = ['yes', 'planning', 'no'] as const;
export type CorporateEmailStatus = (typeof CORPORATE_EMAIL_STATUS)[number];

export const SITE_ROLE = ['myself', 'team', 'external', 'undecided'] as const;
export type SiteRole = (typeof SITE_ROLE)[number];

export const TIMELINE_OPTIONS = [
  'asap',
  'oneMonth',
  'oneToThreeMonths',
  'flexible',
  'unsure',
] as const;
export type TimelineOption = (typeof TIMELINE_OPTIONS)[number];

export const INVESTMENT_RANGES = [
  'starter',
  'focused',
  'complete',
  'open',
  'discuss',
] as const;
export type InvestmentRange = (typeof INVESTMENT_RANGES)[number];
