import { useEffect, useRef, useState } from 'react';
import { useStore } from '@nanostores/react';
import { FormField } from '@components/ui/FormField';
import { RadioGroup } from '@components/ui/RadioGroup';
import { getMessages, type Locale } from '@i18n/index';
import { zodErrorToFieldErrors } from '../../lib/field-errors';
import { createTechnicalSchema } from '../../schemas/technical.schema';
import {
  $discoveryForm,
  $formLocale,
  patchFormData,
  setCurrentStep,
  setFieldErrors,
  setFormStatus,
} from '../../stores/discovery-form.store';
import type { TechnicalData } from '../../types/form';
import type {
  CorporateEmailStatus,
  DomainStatus,
  HostingStatus,
  SiteRole,
} from '../../types/steps';

type TechnicalStepFormProps = {
  locale: Locale;
};

type TechnicalField = keyof TechnicalData;

const FIELD_ORDER: TechnicalField[] = [
  'domainStatus',
  'domainName',
  'hostingStatus',
  'corporateEmailStatus',
  'siteAdmin',
  'siteUpdates',
];

export function TechnicalStepForm({ locale }: TechnicalStepFormProps) {
  const form = useStore($discoveryForm);
  const messages = getMessages(locale);
  const firstErrorRef = useRef<string | null>(null);

  const [values, setValues] = useState({
    domainStatus: (form.data.domainStatus ?? '') as DomainStatus | '',
    domainName: form.data.domainName ?? '',
    hostingStatus: (form.data.hostingStatus ?? '') as HostingStatus | '',
    corporateEmailStatus: (form.data.corporateEmailStatus ??
      '') as CorporateEmailStatus | '',
    siteAdmin: (form.data.siteAdmin ?? '') as SiteRole | '',
    siteUpdates: (form.data.siteUpdates ?? '') as SiteRole | '',
  });
  const [saved, setSaved] = useState(false);
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
    setSaved(false);

    const schema = createTechnicalSchema(messages.validation);
    const result = schema.safeParse({
      domainStatus: values.domainStatus || undefined,
      domainName: values.domainName,
      hostingStatus: values.hostingStatus || undefined,
      corporateEmailStatus: values.corporateEmailStatus || undefined,
      siteAdmin: values.siteAdmin || undefined,
      siteUpdates: values.siteUpdates || undefined,
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
                firstError === 'domainStatus'
                  ? 'yes'
                  : firstError === 'hostingStatus'
                    ? 'yes'
                    : firstError === 'corporateEmailStatus'
                      ? 'yes'
                      : 'myself'
              }`
            : null;
      setErrors(nextErrors);
      setFieldErrors(fieldErrors);
      setFormStatus('idle');
      return;
    }

    patchFormData({
      ...result.data,
      domainName:
        result.data.domainStatus === 'yes' ? result.data.domainName : '',
    });
    setFieldErrors({});
    setErrors({});
    setSaved(true);
    setFormStatus('idle');
  }

  return (
    <form className="space-y-6" noValidate onSubmit={handleContinue}>
      <div className="space-y-6 rounded-xl border border-cdf-border/80 bg-white/75 p-5 shadow-sm backdrop-blur sm:p-6">
        <RadioGroup
          name="domainStatus"
          legend={messages.technicalStep.domainLegend}
          hint={messages.technicalStep.domainHint}
          value={values.domainStatus}
          error={errors.domainStatus}
          required
          requiredLabel={messages.common.required}
          layout="stack"
          options={[
            {
              value: 'yes',
              label: messages.technicalStep.domainOptions.yes,
            },
            {
              value: 'buying',
              label: messages.technicalStep.domainOptions.buying,
            },
            {
              value: 'no',
              label: messages.technicalStep.domainOptions.no,
            },
            {
              value: 'unsure',
              label: messages.technicalStep.domainOptions.unsure,
            },
          ]}
          onChange={(value) => {
            setSaved(false);
            setValues((current) => ({
              ...current,
              domainStatus: value as DomainStatus,
              domainName: value === 'yes' ? current.domainName : '',
            }));
            clearError('domainStatus');
            if (value !== 'yes') clearError('domainName');
          }}
        />

        {values.domainStatus === 'yes' ? (
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
            requiredLabel={messages.common.required}
            autoComplete="url"
            inputMode="url"
            onChange={(event) => {
              setSaved(false);
              setValues((current) => ({
                ...current,
                domainName: event.target.value,
              }));
              clearError('domainName');
            }}
          />
        ) : null}

        <RadioGroup
          name="hostingStatus"
          legend={messages.technicalStep.hostingLegend}
          hint={messages.technicalStep.hostingHint}
          value={values.hostingStatus}
          error={errors.hostingStatus}
          required
          requiredLabel={messages.common.required}
          layout="stack"
          options={[
            {
              value: 'yes',
              label: messages.technicalStep.hostingOptions.yes,
            },
            {
              value: 'no',
              label: messages.technicalStep.hostingOptions.no,
            },
            {
              value: 'unsure',
              label: messages.technicalStep.hostingOptions.unsure,
            },
          ]}
          onChange={(value) => {
            setSaved(false);
            setValues((current) => ({
              ...current,
              hostingStatus: value as HostingStatus,
            }));
            clearError('hostingStatus');
          }}
        />

        <RadioGroup
          name="corporateEmailStatus"
          legend={messages.technicalStep.emailLegend}
          hint={messages.technicalStep.emailHint}
          value={values.corporateEmailStatus}
          error={errors.corporateEmailStatus}
          required
          requiredLabel={messages.common.required}
          layout="stack"
          options={[
            {
              value: 'yes',
              label: messages.technicalStep.emailOptions.yes,
            },
            {
              value: 'planning',
              label: messages.technicalStep.emailOptions.planning,
            },
            {
              value: 'no',
              label: messages.technicalStep.emailOptions.no,
            },
          ]}
          onChange={(value) => {
            setSaved(false);
            setValues((current) => ({
              ...current,
              corporateEmailStatus: value as CorporateEmailStatus,
            }));
            clearError('corporateEmailStatus');
          }}
        />

        <RadioGroup
          name="siteAdmin"
          legend={messages.technicalStep.adminLegend}
          hint={messages.technicalStep.adminHint}
          value={values.siteAdmin}
          error={errors.siteAdmin}
          required
          requiredLabel={messages.common.required}
          layout="stack"
          options={[
            {
              value: 'myself',
              label: messages.technicalStep.roleOptions.myself,
            },
            {
              value: 'team',
              label: messages.technicalStep.roleOptions.team,
            },
            {
              value: 'external',
              label: messages.technicalStep.roleOptions.external,
            },
            {
              value: 'undecided',
              label: messages.technicalStep.roleOptions.undecided,
            },
          ]}
          onChange={(value) => {
            setSaved(false);
            setValues((current) => ({
              ...current,
              siteAdmin: value as SiteRole,
            }));
            clearError('siteAdmin');
          }}
        />

        <RadioGroup
          name="siteUpdates"
          legend={messages.technicalStep.updatesLegend}
          hint={messages.technicalStep.updatesHint}
          value={values.siteUpdates}
          error={errors.siteUpdates}
          required
          requiredLabel={messages.common.required}
          layout="stack"
          options={[
            {
              value: 'myself',
              label: messages.technicalStep.roleOptions.myself,
            },
            {
              value: 'team',
              label: messages.technicalStep.roleOptions.team,
            },
            {
              value: 'external',
              label: messages.technicalStep.roleOptions.external,
            },
            {
              value: 'undecided',
              label: messages.technicalStep.roleOptions.undecided,
            },
          ]}
          onChange={(value) => {
            setSaved(false);
            setValues((current) => ({
              ...current,
              siteUpdates: value as SiteRole,
            }));
            clearError('siteUpdates');
          }}
        />
      </div>

      {saved ? (
        <p
          className="rounded-md border border-cdf-success/30 bg-green-50 px-4 py-3 text-sm text-cdf-success"
          role="status"
        >
          {messages.technicalStep.savedMessage}
        </p>
      ) : null}

      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          className="inline-flex min-h-11 items-center justify-center rounded-md px-4 py-2.5 text-sm font-medium text-cdf-ink transition hover:bg-black/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cdf-accent"
          onClick={() => setCurrentStep('design')}
        >
          {messages.common.back}
        </button>
        <button
          type="submit"
          className="inline-flex min-h-11 min-w-36 items-center justify-center rounded-md bg-cdf-accent px-5 py-2.5 text-sm font-medium text-white transition hover:bg-cdf-accent-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cdf-accent disabled:opacity-60"
          disabled={form.status === 'validating'}
        >
          {messages.common.continue}
        </button>
      </div>
    </form>
  );
}
