import type { Messages } from '@i18n/types';

type FieldKey = keyof Messages['fields'];

export function formatDiscoveryFieldValue(
  key: FieldKey,
  value: string,
  messages: Messages,
): string {
  if (key === 'projectType') {
    return messages.needsStep.projectTypeOptions[
      value as keyof typeof messages.needsStep.projectTypeOptions
    ].label;
  }

  if (key === 'industry') {
    return messages.businessStep.industries[
      value as keyof typeof messages.businessStep.industries
    ];
  }

  if (key === 'hasWebsite' || key === 'needsContentHelp' || key === 'logo') {
    return value === 'yes'
      ? messages.businessStep.yes
      : messages.businessStep.no;
  }

  if (key === 'photos' || key === 'texts') {
    return messages.assetsStep.contentOptions[
      value as keyof typeof messages.assetsStep.contentOptions
    ];
  }

  if (key === 'visualIdentity') {
    return messages.assetsStep.styleOptions[
      value as keyof typeof messages.assetsStep.styleOptions
    ];
  }

  if (key === 'designStyle') {
    return messages.designStep.styleOptions[
      value as keyof typeof messages.designStep.styleOptions
    ].label;
  }

  if (key === 'domainStatus') {
    return messages.technicalStep.domainOptions[
      value as keyof typeof messages.technicalStep.domainOptions
    ];
  }

  if (key === 'hostingStatus') {
    return messages.technicalStep.hostingOptions[
      value as keyof typeof messages.technicalStep.hostingOptions
    ];
  }

  if (key === 'corporateEmailStatus') {
    return messages.technicalStep.emailOptions[
      value as keyof typeof messages.technicalStep.emailOptions
    ];
  }

  if (key === 'siteAdmin' || key === 'siteUpdates') {
    return messages.technicalStep.roleOptions[
      value as keyof typeof messages.technicalStep.roleOptions
    ];
  }

  if (key === 'timeline') {
    return messages.timelineBudgetStep.timelineOptions[
      value as keyof typeof messages.timelineBudgetStep.timelineOptions
    ];
  }

  if (key === 'investmentRange') {
    return messages.timelineBudgetStep.investmentOptions[
      value as keyof typeof messages.timelineBudgetStep.investmentOptions
    ].label;
  }

  return value;
}
