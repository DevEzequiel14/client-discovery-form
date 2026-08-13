import { DESIGN_STYLES, INVESTMENT_RANGES, PROJECT_TYPES, TIMELINE_OPTIONS } from '../types/steps';

const RADIO_FOCUS_IDS: Record<string, string> = {
  hasWebsite: 'hasWebsite-yes',
  projectType: `projectType-${PROJECT_TYPES[0]}`,
  logo: 'logo-yes',
  photos: 'photos-all',
  texts: 'texts-all',
  visualIdentity: 'visualIdentity-defined',
  needsContentHelp: 'needsContentHelp-yes',
  designStyle: `designStyle-${DESIGN_STYLES[0]}`,
  hasReferences: 'hasReferences-yes',
  infraStatus: 'infraStatus-both',
  corporateEmailStatus: 'corporateEmailStatus-yes',
  siteMaintenance: 'siteMaintenance-client',
  timeline: `timeline-${TIMELINE_OPTIONS[0]}`,
  investmentRange: `investmentRange-${INVESTMENT_RANGES[0]}`,
};

export function focusIdForField(field: string): string {
  return RADIO_FOCUS_IDS[field] ?? field;
}
