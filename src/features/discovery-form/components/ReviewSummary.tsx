import type { Messages } from '@i18n/types';
import type { PartialDiscoveryForm } from '../types/form';
import type { StepId } from '../types/steps';
import { ASSET_KEYS } from '../types/steps';

type ReviewSummaryProps = {
  messages: Messages;
  data: PartialDiscoveryForm;
  onEditStep: (stepId: StepId) => void;
};

type FieldKey = keyof Messages['fields'];

const reviewFields: Array<{
  stepId: StepId;
  keys: FieldKey[];
}> = [
  { stepId: 'contact', keys: ['fullName', 'email', 'phone'] },
  { stepId: 'business', keys: ['company', 'industry', 'hasWebsite', 'website'] },
  { stepId: 'needs', keys: ['goals', 'projectType', 'expectedOutcome'] },
  {
    stepId: 'assets',
    keys: [...ASSET_KEYS, 'needsContentHelp'],
  },
  { stepId: 'design', keys: ['designStyle', 'referenceUrls', 'designTaste'] },
  {
    stepId: 'technical',
    keys: [
      'domainStatus',
      'domainName',
      'hostingStatus',
      'corporateEmailStatus',
      'siteAdmin',
      'siteUpdates',
    ],
  },
  {
    stepId: 'timeline-budget',
    keys: ['timeline', 'investmentRange'],
  },
  {
    stepId: 'extras',
    keys: ['additionalNotes'],
  },
];

function formatValue(
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

  if (key === 'hasWebsite' || key === 'needsContentHelp') {
    return value === 'yes'
      ? messages.businessStep.yes
      : messages.businessStep.no;
  }

  if (
    key === 'logo' ||
    key === 'photos' ||
    key === 'texts' ||
    key === 'visualIdentity' ||
    key === 'brandManual'
  ) {
    return messages.assetsStep.readiness[
      value as keyof typeof messages.assetsStep.readiness
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

export function ReviewSummary({
  messages,
  data,
  onEditStep,
}: ReviewSummaryProps) {
  return (
    <div className="space-y-4">
      <p className="text-sm text-cdf-muted">{messages.form.reviewHint}</p>
      {reviewFields.map((section) => (
        <section
          key={section.stepId}
          className="rounded-md border border-cdf-border bg-white/80 p-4"
        >
          <div className="mb-3 flex items-center justify-between gap-3">
            <h3 className="font-medium text-cdf-ink">
              {messages.steps[section.stepId].title}
            </h3>
            <button
              type="button"
              className="text-sm font-medium text-cdf-accent hover:underline"
              onClick={() => onEditStep(section.stepId)}
            >
              {messages.common.edit}
            </button>
          </div>
          <dl className="grid gap-2 text-sm">
            {section.keys.map((key) => {
              const raw = data[key as keyof PartialDiscoveryForm];
              if (!raw) return null;

              return (
                <div key={key}>
                  <dt className="text-cdf-muted">{messages.fields[key]}</dt>
                  <dd className="text-cdf-ink">
                    {formatValue(key, String(raw), messages)}
                  </dd>
                </div>
              );
            })}
          </dl>
        </section>
      ))}
    </div>
  );
}
