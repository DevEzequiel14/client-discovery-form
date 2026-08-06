export const INDUSTRIES = [
  'retail',
  'services',
  'technology',
  'health',
  'education',
  'food',
  'realEstate',
  'construction',
  'professional',
  'other',
] as const;

export type Industry = (typeof INDUSTRIES)[number];

export const HAS_WEBSITE_OPTIONS = ['yes', 'no'] as const;

export type HasWebsite = (typeof HAS_WEBSITE_OPTIONS)[number];
