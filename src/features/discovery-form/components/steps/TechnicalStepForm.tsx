import { useEffect, useRef, useState } from 'react';
import { useStore } from '@nanostores/react';
import { FormField } from '@components/ui/FormField';
import { RadioGroup } from '@components/ui/RadioGroup';
import { getMessages, type Locale } from '@i18n/index';
import { btnGhost, btnPrimary, stepCard, stepNav } from '@lib/ui-classes';
import { zodErrorToFieldErrors } from '../../lib/field-errors';
import { createTechnicalSchema } from '../../schemas/technical.schema';
import {
  $discoveryForm,
  $formLocale,
  patchFormData,
  completeStepAndGo,
  setCurrentStep,
  setFieldErrors,
  setFormStatus,
} from '../../stores/discovery-form.store';
import type { TechnicalData } from '../../types/form';
import {
  infraIncludesDomain,
  type CorporateEmailStatus,
  type InfraStatus,
  type SiteMaintenance,
} from '../../types/steps';

type TechnicalStepFormProps = {
  locale: Locale;
};

type TechnicalField = keyof TechnicalData;

const FIELD_ORDER: TechnicalField[] = [
  'infraStatus',
  'domainName',
  'corporateEmailStatus',
  'siteMaintenance',
];

export function TechnicalStepForm({ locale }: TechnicalStepFormProps) {
  const form = useStore($discoveryForm);
  const messages = getMessages(locale);
  const firstErrorRef = useRef<string | null>(null);

  const [values, setValues] = useState({
    infraStatus: (form.data.infraStatus ?? '') as InfraStatus | '',
    domainName: form.data.domainName ?? '',
    corporateEmailStatus: (form.data.corporateEmailStatus ??
      '') as CorporateEmailStatus | '',
    siteMaintenance: (form.data.siteMaintenance ?? '') as SiteMaintenance | '',
  });
  const [errors, setErrors] = useState<
    Partial<Record<TechnicalField, string>>
  >({});

  useEffect(() => {
    $formLocale.set(locale);
  }, [locale]);

  useEffect(() => {
    if (!firstErrorRef.current) return;
    const field = document.getElementById(firstErrorRef.current);
    field?.focus();
    firstErrorRef.current = null;
  }, [errors]);

  function clearError(field: TechnicalField) {
    setErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
  }

  function handleContinue(event: { preventDefault: () => void }) {
    event.preventDefault();
    setFormStatus('validating');

    const schema = createTechnicalSchema(messages.validation);
    const result = schema.safeParse({
      infraStatus: values.infraStatus || undefined,
      domainName: values.domainName,
      corporateEmailStatus: values.corporateEmailStatus || undefined,
      siteMaintenance: values.siteMaintenance || undefined,
    });

    if (!result.success) {
      const fieldErrors = zodErrorToFieldErrors(result.error);
      const nextErrors: Partial<Record<TechnicalField, string>> = {};

      for (const field of FIELD_ORDER) {
        if (fieldErrors[field]) {
          nextErrors[field] = fieldErrors[field];
        }
      }

      const firstError = FIELD_ORDER.find((field) => nextErrors[field]);
      firstErrorRef.current =
        firstError === 'domainName'
          ? 'domainName'
          : firstError
            ? `${firstError}-${
                firstError === 'infraStatus'
                  ? 'both'
                  : firstError === 'corporateEmailStatus'
                    ? 'yes'
                    : 'client'
              }`
            : null;
      setErrors(nextErrors);
      setFieldErrors(fieldErrors);
      setFormStatus('idle');
      return;
    }

    const includesDomain = infraIncludesDomain(result.data.infraStatus);

    patchFormData({
      ...result.data,
      domainName: includesDomain ? (result.data.domainName ?? '') : '',
    });
    setFieldErrors({});
    setErrors({});
    setFormStatus('idle');
    completeStepAndGo('timeline-budget');
  }

  const showDomainName =
    values.infraStatus !== '' && infraIncludesDomain(values.infraStatus);

  return (
    <form className="space-y-5" noValidate onSubmit={handleContinue}>
      <div className={['space-y-4', stepCard].join(' ')}>
        <RadioGroup
          name="infraStatus"
          legend={messages.technicalStep.infraLegend}
          hint={messages.technicalStep.infraHint}
          value={values.infraStatus}
          error={errors.infraStatus}
          required
          layout="stack"
          options={[
            {
              value: 'both',
              label: messages.technicalStep.infraOptions.both,
            },
            {
              value: 'domainOnly',
              label: messages.technicalStep.infraOptions.domainOnly,
            },
            {
              value: 'hostingOnly',
              label: messages.technicalStep.infraOptions.hostingOnly,
            },
            {
              value: 'none',
              label: messages.technicalStep.infraOptions.none,
            },
            {
              value: 'unsure',
              label: messages.technicalStep.infraOptions.unsure,
            },
          ]}
          onChange={(value) => {
            const next = value as InfraStatus;
            setValues((current) => ({
              ...current,
              infraStatus: next,
              domainName: infraIncludesDomain(next) ? current.domainName : '',
            }));
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
              setValues((current) => ({
                ...current,
                domainName: event.target.value,
              }));
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
            {
              value: 'yes',
              label: messages.technicalStep.emailOptions.yes,
            },
            {
              value: 'unsure',
              label: messages.technicalStep.emailOptions.unsure,
            },
            {
              value: 'no',
              label: messages.technicalStep.emailOptions.no,
            },
          ]}
          onChange={(value) => {
            setValues((current) => ({
              ...current,
              corporateEmailStatus: value as CorporateEmailStatus,
            }));
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
            setValues((current) => ({
              ...current,
              siteMaintenance: value as SiteMaintenance,
            }));
            clearError('siteMaintenance');
          }}
        />
      </div>

      <div className={[stepNav, 'justify-between'].join(' ')}>
        <button
          type="button"
          className={btnGhost}
          onClick={() => setCurrentStep('design')}
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
