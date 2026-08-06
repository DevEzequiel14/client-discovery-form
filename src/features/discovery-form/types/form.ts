import type { ProjectType } from './steps';
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
  /** What they want to achieve / problem to solve */
  goals: string;
  /** What kind of project they imagine */
  projectType: ProjectType;
  /** What they expect to get as a result */
  expectedOutcome: string;
};

export type FeaturesData = {
  features: string;
};

export type DesignData = {
  designStyle: string;
  references?: string;
};

export type TimelineBudgetData = {
  timeline: string;
  budget: string;
  additionalNotes?: string;
};

export type DiscoveryFormData = ContactData &
  BusinessData &
  NeedsData &
  FeaturesData &
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
