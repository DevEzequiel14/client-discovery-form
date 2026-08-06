import type { AssetKey, AssetReadiness, DesignStyle, ProjectType } from './steps';
import type { HasWebsite, Industry } from '../constants/industries';

export type ContactData = {
  fullName: string;
  email: string;
  phone?: string;
};

export type BusinessData = {
  company: string;
  industry: Industry;
  hasWebsite: HasWebsite;
  website?: string;
};

export type NeedsData = {
  goals: string;
  projectType: ProjectType;
  expectedOutcome: string;
};

export type AssetsData = {
  logo: AssetReadiness;
  photos: AssetReadiness;
  texts: AssetReadiness;
  visualIdentity: AssetReadiness;
  brandManual: AssetReadiness;
  /** Whether they want help creating what's missing */
  needsContentHelp: 'yes' | 'no';
};

export type DesignData = {
  /** Visual direction (no colors) */
  designStyle: DesignStyle;
  /** Favorite pages / reference URLs */
  referenceUrls: string;
  /** Likes, dislikes, overall taste */
  designTaste: string;
};

export type TimelineBudgetData = {
  timeline: string;
  budget: string;
  additionalNotes?: string;
};

export type DiscoveryFormData = ContactData &
  BusinessData &
  NeedsData &
  AssetsData &
  DesignData &
  TimelineBudgetData;

export type PartialDiscoveryForm = Partial<DiscoveryFormData>;

export type FormStatus =
  | 'idle'
  | 'validating'
  | 'submitting'
  | 'success'
  | 'error';

export type FieldErrors = Partial<Record<keyof DiscoveryFormData, string>>;

export type { AssetKey };
