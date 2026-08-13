import { useStore } from '@nanostores/react';
import { FormField } from '@components/ui/FormField';
import { RadioGroup } from '@components/ui/RadioGroup';
import { getMessages, type Locale } from '@i18n/index';
import { btnGhost, btnPrimary, stepCard, stepNav } from '@lib/ui-classes';
import { useStepErrors } from '../../hooks/use-step-errors';
import { createApproachSchema } from '../../schemas';
import {
  $discoveryForm,
  completeStepAndGo,
  patchFormData,
  setCurrentStep,
  setFormStatus,
} from '../../stores/discovery-form.store';
import type { TechnicalData, TimelineBudgetData } from '../../types/form';
import {
  INVESTMENT_RANGES,
  TIMELINE_OPTIONS,
  infraIncludesDomain,
  type CorporateEmailStatus,
  type InfraStatus,
  type InvestmentRange,
  type SiteMaintenance,
  type TimelineOption,
} from '../../types/steps';

type ApproachStepFormProps = {
  locale: Locale;
};

type ApproachField = keyof (TechnicalData & TimelineBudgetData);

const FIELD_ORDER = [
  'infraStatus',
  'domainName',
  'corporateEmailStatus',
  'siteMaintenance',
  'timeline',
  'investmentRange',
] as const satisfies readonly ApproachField[];

export function ApproachStepForm({ locale }: ApproachStepFormProps) {
  const form = useStore($discoveryForm);
  const messages = getMessages(locale);
  const { errors, clearError, applyZodFailure, clearAll } =
    useStepErrors(FIELD_ORDER);

  const values = {
    infraStatus: (form.data.infraStatus ?? '') as InfraStatus | '',
    domainName: form.data.domainName ?? '',
    corporateEmailStatus: (form.data.corporateEmailStatus ??
      '') as CorporateEmailStatus | '',
    siteMaintenance: (form.data.siteMaintenance ?? '') as SiteMaintenance | '',
    timeline: (form.data.timeline ?? '') as TimelineOption | '',
    investmentRange: (form.data.investmentRange ?? '') as InvestmentRange | '',
  };

  function handleContinue(event: { preventDefault: () => void }) {
    event.preventDefault();
    setFormStatus('validating');

    const result = createApproachSchema(messages.validation).safeParse({
      infraStatus: values.infraStatus || undefined,
      domainName: values.domainName,
      corporateEmailStatus: values.corporateEmailStatus || undefined,
      siteMaintenance: values.siteMaintenance || undefined,
      timeline: values.timeline || undefined,
      investmentRange: values.investmentRange || undefined,
    });

    if (!result.success) {
      applyZodFailure(result.error);
      setFormStatus('idle');
      return;
    }

    const includesDomain = infraIncludesDomain(result.data.infraStatus);
    patchFormData({
      ...result.data,
      domainName: includesDomain ? (result.data.domainName ?? '') : '',
    });
    clearAll();
    setFormStatus('idle');
    completeStepAndGo('close');
  }

  const showDomainName =
    values.infraStatus !== '' && infraIncludesDomain(values.infraStatus);

  return (
    <form className="space-y-5" noValidate onSubmit={handleContinue}>
      <div className={['space-y-4', stepCard].join(' ')}>
        <h2 className="text-sm font-medium text-cdf-ink">
          {messages.form.sections.technical}
        </h2>

        <RadioGroup
          name="infraStatus"
          legend={messages.technicalStep.infraLegend}
          hint={messages.technicalStep.infraHint}
          value={values.infraStatus}
          error={errors.infraStatus}
          required
          layout="stack"
          options={[
            { value: 'both', label: messages.technicalStep.infraOptions.both },
            {
              value: 'domainOnly',
              label: messages.technicalStep.infraOptions.domainOnly,
            },
            {
              value: 'hostingOnly',
              label: messages.technicalStep.infraOptions.hostingOnly,
            },
            { value: 'none', label: messages.technicalStep.infraOptions.none },
            {
              value: 'unsure',
              label: messages.technicalStep.infraOptions.unsure,
            },
          ]}
          onChange={(value) => {
            const next = value as InfraStatus;
            patchFormData({
              infraStatus: next,
              domainName: infraIncludesDomain(next) ? values.domainName : '',
            });
            clearError('infraStatus');
            if (!infraIncludesDomain(next)) clearError('domainName');
          }}
        />

        {showDomainName ? (
          <FormField
            id="domainName"
            name="domainName"
            label={messages.fields.domainName}
            type="text"
            value={values.domainName}
            placeholder={messages.technicalStep.domainNamePlaceholder}
            hint={messages.technicalStep.domainNameHint}
            error={errors.domainName}
            required
            autoComplete="url"
            inputMode="url"
            onChange={(event) => {
              patchFormData({ domainName: event.target.value });
              clearError('domainName');
            }}
          />
        ) : null}

        <RadioGroup
          name="corporateEmailStatus"
          legend={messages.technicalStep.emailLegend}
          hint={messages.technicalStep.emailHint}
          value={values.corporateEmailStatus}
          error={errors.corporateEmailStatus}
          required
          layout="stack"
          options={[
            { value: 'yes', label: messages.technicalStep.emailOptions.yes },
            {
              value: 'unsure',
              label: messages.technicalStep.emailOptions.unsure,
            },
            { value: 'no', label: messages.technicalStep.emailOptions.no },
          ]}
          onChange={(value) => {
            patchFormData({
              corporateEmailStatus: value as CorporateEmailStatus,
            });
            clearError('corporateEmailStatus');
          }}
        />

        <RadioGroup
          name="siteMaintenance"
          legend={messages.technicalStep.maintenanceLegend}
          hint={messages.technicalStep.maintenanceHint}
          value={values.siteMaintenance}
          error={errors.siteMaintenance}
          required
          layout="stack"
          options={[
            {
              value: 'client',
              label: messages.technicalStep.maintenanceOptions.client,
            },
            {
              value: 'agency',
              label: messages.technicalStep.maintenanceOptions.agency,
            },
            {
              value: 'undecided',
              label: messages.technicalStep.maintenanceOptions.undecided,
            },
          ]}
          onChange={(value) => {
            patchFormData({ siteMaintenance: value as SiteMaintenance });
            clearError('siteMaintenance');
          }}
        />
      </div>

      <div className={['space-y-4', stepCard].join(' ')}>
        <h2 className="text-sm font-medium text-cdf-ink">
          {messages.form.sections.timing}
        </h2>

        <RadioGroup
          name="timeline"
          legend={messages.timelineBudgetStep.timelineLegend}
          hint={messages.timelineBudgetStep.timelineHint}
          value={values.timeline}
          error={errors.timeline}
          required
          layout="stack"
          options={TIMELINE_OPTIONS.map((option) => ({
            value: option,
            label: messages.timelineBudgetStep.timelineOptions[option],
          }))}
          onChange={(value) => {
            patchFormData({ timeline: value as TimelineOption });
            clearError('timeline');
          }}
        />

        <RadioGroup
          name="investmentRange"
          legend={messages.timelineBudgetStep.investmentLegend}
          hint={messages.timelineBudgetStep.investmentHint}
          value={values.investmentRange}
          error={errors.investmentRange}
          required
          layout="stack"
          options={INVESTMENT_RANGES.map((range) => {
            const option = messages.timelineBudgetStep.investmentOptions[range];
            return {
              value: range,
              label: option.range
                ? `${option.label} · ${option.range}`
                : option.label,
              description: option.example,
            };
          })}
          onChange={(value) => {
            patchFormData({ investmentRange: value as InvestmentRange });
            clearError('investmentRange');
          }}
        />
      </div>

      <div className={[stepNav, 'justify-between'].join(' ')}>
        <button
          type="button"
          className={btnGhost}
          onClick={() => setCurrentStep('readiness')}
        >
          {messages.common.back}
        </button>
        <button
          type="submit"
          className={btnPrimary}
          disabled={form.status === 'validating'}
        >
          {messages.common.continue}
        </button>
      </div>
    </form>
  );
}
