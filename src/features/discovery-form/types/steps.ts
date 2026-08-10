export const STEP_IDS = [
  'contact',
  'business',
  'needs',
  'assets',
  'design',
  'technical',
  'timeline-budget',
  'extras',
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

/** Logo: binary — you have a usable file or you don't. */
export const LOGO_STATUS = ['yes', 'no'] as const;
export type LogoStatus = (typeof LOGO_STATUS)[number];

/** Photos / texts: how much material is ready. */
export const CONTENT_AMOUNT = ['all', 'some', 'none'] as const;
export type ContentAmount = (typeof CONTENT_AMOUNT)[number];

/** Colors & fonts: defined, some ideas, or nothing yet. */
export const BRAND_STYLE_STATUS = ['defined', 'ideas', 'none'] as const;
export type BrandStyleStatus = (typeof BRAND_STYLE_STATUS)[number];

export const ASSET_KEYS = [
  'logo',
  'photos',
  'texts',
  'visualIdentity',
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

export const NOTE_PROMPTS = [
  'deadline',
  'priorWork',
  'mustHave',
  'concern',
  'vision',
] as const;
export type NotePrompt = (typeof NOTE_PROMPTS)[number];
