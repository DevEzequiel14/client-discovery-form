import type { ProjectType } from './steps';

export type ContactData = {
  fullName: string;
  email: string;
  phone?: string;
};

export type BusinessData = {
  company: string;
  industry: string;
  website?: string;
};

export type ProjectTypeData = {
  projectType: ProjectType;
};

export type GoalsData = {
  goals: string;
  targetAudience: string;
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
  ProjectTypeData &
  GoalsData &
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
