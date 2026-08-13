import type { Messages } from '@i18n/types';
import { formatDiscoveryFieldValue } from '../lib/format-field-value';
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
  stepId: Exclude<StepId, 'close'>;
  keys: FieldKey[];
}> = [
  {
    stepId: 'identity',
    keys: [
      'fullName',
      'email',
      'phone',
      'company',
      'industry',
      'hasWebsite',
      'website',
    ],
  },
  { stepId: 'needs', keys: ['goals', 'projectType', 'expectedOutcome'] },
  {
    stepId: 'readiness',
    keys: [
      ...ASSET_KEYS,
      'needsContentHelp',
      'designStyle',
      'designStyleNote',
      'hasReferences',
      'referenceUrls',
      'designTaste',
    ],
  },
  {
    stepId: 'approach',
    keys: [
      'infraStatus',
      'domainName',
      'corporateEmailStatus',
      'siteMaintenance',
      'timeline',
      'investmentRange',
    ],
  },
];

export function ReviewSummary({
  messages,
  data,
  onEditStep,
}: ReviewSummaryProps) {
  return (
    <div className="space-y-3">
      {reviewFields.map((section) => {
        const entries = section.keys
          .map((key) => {
            const raw = data[key as keyof PartialDiscoveryForm];
            if (raw === undefined || raw === null || raw === '') return null;
            return {
              key,
              value: formatDiscoveryFieldValue(key, String(raw), messages),
            };
          })
          .filter((entry): entry is { key: FieldKey; value: string } =>
            Boolean(entry),
          );

        if (entries.length === 0) return null;

        return (
          <section
            key={section.stepId}
            className="rounded-xl border border-cdf-border/80 bg-cdf-surface-elevated p-4 shadow-sm"
          >
            <div className="mb-3 flex items-start justify-between gap-3">
              <h3 className="min-w-0 font-medium text-cdf-ink">
                {messages.steps[section.stepId].title}
              </h3>
              <button
                type="button"
                className="shrink-0 rounded-md px-2.5 py-1.5 text-sm font-medium text-cdf-accent transition hover:bg-cdf-accent-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cdf-accent"
                onClick={() => onEditStep(section.stepId)}
              >
                {messages.common.edit}
              </button>
            </div>
            <dl className="grid gap-3 text-sm">
              {entries.map((entry) => (
                <div
                  key={entry.key}
                  className="grid gap-0.5 border-t border-cdf-border/60 pt-3 first:border-t-0 first:pt-0 sm:grid-cols-[11rem_1fr] sm:gap-4"
                >
                  <dt className="text-cdf-muted">{messages.fields[entry.key]}</dt>
                  <dd className="whitespace-pre-wrap text-cdf-ink">
                    {entry.value}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        );
      })}
    </div>
  );
}
