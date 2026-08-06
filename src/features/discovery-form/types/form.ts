import type {
  AssetKey,
  AssetReadiness,
  CorporateEmailStatus,
  DesignStyle,
  DomainStatus,
  HostingStatus,
  ProjectType,
  SiteRole,
} from './steps';
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
  needsContentHelp: 'yes' | 'no';
};

export type DesignData = {
  designStyle: DesignStyle;
  referenceUrls: string;
  designTaste: string;
};

export type TechnicalData = {
  domainStatus: DomainStatus;
  domainName?: string;
  hostingStatus: HostingStatus;
  corporateEmailStatus: CorporateEmailStatus;
  siteAdmin: SiteRole;
  siteUpdates: SiteRole;
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
  TechnicalData &
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
