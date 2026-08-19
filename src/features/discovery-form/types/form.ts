import type {
  AssetKey,
  BrandStyleStatus,
  ContentAmount,
  CorporateEmailStatus,
  DesignStyle,
  HasReferences,
  InfraStatus,
  InvestmentRange,
  LogoStatus,
  ProjectType,
  SiteMaintenance,
  TimelineOption,
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
  expectedOutcome?: string;
};

export type AssetsData = {
  logo: LogoStatus;
  photos: ContentAmount;
  texts: ContentAmount;
  /** Colors / fonts — not a formal brand system. */
  visualIdentity: BrandStyleStatus;
  needsContentHelp: 'yes' | 'no';
};

export type DesignData = {
  designStyle: DesignStyle;
  /** Optional note when style is `other`, or extra nuance. */
  designStyleNote?: string;
  hasReferences: HasReferences;
  referenceUrls?: string;
  designTaste?: string;
};

export type TechnicalData = {
  infraStatus: InfraStatus;
  domainName?: string;
  corporateEmailStatus: CorporateEmailStatus;
  siteMaintenance: SiteMaintenance;
};

export type TimelineBudgetData = {
  timeline: TimelineOption;
  investmentRange: InvestmentRange;
};

export type ExtrasData = {
  additionalNotes?: string;
};

export type DiscoveryFormData = ContactData &
  BusinessData &
  NeedsData &
  AssetsData &
  DesignData &
  TechnicalData &
  TimelineBudgetData &
  ExtrasData;

export type PartialDiscoveryForm = Partial<DiscoveryFormData>;

export type FormStatus =
  | 'idle'
  | 'validating'
  | 'submitting'
  | 'success'
  | 'error';

export type FieldErrors = Partial<Record<keyof DiscoveryFormData, string>>;

export type { AssetKey };
