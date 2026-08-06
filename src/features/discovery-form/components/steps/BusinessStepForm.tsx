import { useEffect, useRef, useState } from 'react';
import { useStore } from '@nanostores/react';
import { FormField } from '@components/ui/FormField';
import { RadioGroup } from '@components/ui/RadioGroup';
import { SelectField } from '@components/ui/SelectField';
import { getMessages, type Locale } from '@i18n/index';
import {
  INDUSTRIES,
  type HasWebsite,
  type Industry,
} from '../../constants/industries';
import { zodErrorToFieldErrors } from '../../lib/field-errors';
import { createBusinessSchema } from '../../schemas/business.schema';
import {
  $discoveryForm,
  $formLocale,
  patchFormData,
  setCurrentStep,
  setFieldErrors,
  setFormStatus,
} from '../../stores/discovery-form.store';
import type { BusinessData } from '../../types/form';

type BusinessStepFormProps = {
  locale: Locale;
};

type BusinessField = keyof BusinessData;

const FIELD_ORDER: BusinessField[] = [
  'company',
  'industry',
  'hasWebsite',
  'website',
];

export function BusinessStepForm({ locale }: BusinessStepFormProps) {
  const form = useStore($discoveryForm);
  const messages = getMessages(locale);
  const firstErrorRef = useRef<string | null>(null);

  const [values, setValues] = useState({
    company: form.data.company ?? '',
    industry: (form.data.industry ?? '') as Industry | '',
    hasWebsite: (form.data.hasWebsite ?? '') as HasWebsite | '',
    website: form.data.website ?? '',
  });
  const [errors, setErrors] = useState<Partial<Record<BusinessField, string>>>(
    {},
  );

  useEffect(() => {
    $formLocale.set(locale);
  }, [locale]);

  useEffect(() => {
    if (!firstErrorRef.current) return;
    const field = document.getElementById(firstErrorRef.current);
    field?.focus();
    firstErrorRef.current = null;
  }, [errors]);

  function clearError(field: BusinessField) {
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

    const schema = createBusinessSchema(messages.validation);
    const result = schema.safeParse({
      company: values.company,
      industry: values.industry || undefined,
      hasWebsite: values.hasWebsite || undefined,
      website: values.website,
    });

    if (!result.success) {
      const fieldErrors = zodErrorToFieldErrors(result.error);
      const nextErrors: Partial<Record<BusinessField, string>> = {};

      for (const field of FIELD_ORDER) {
        if (fieldErrors[field]) {
          nextErrors[field] = fieldErrors[field];
        }
      }

      const firstError = FIELD_ORDER.find((field) => nextErrors[field]);
      firstErrorRef.current =
        firstError === 'hasWebsite' ? 'hasWebsite-yes' : (firstError ?? null);
      setErrors(nextErrors);
      setFieldErrors(fieldErrors);
      setFormStatus('idle');
      return;
    }

    const payload: BusinessData = {
      company: result.data.company,
      industry: result.data.industry,
      hasWebsite: result.data.hasWebsite,
      website:
        result.data.hasWebsite === 'yes' ? result.data.website : undefined,
    };

    patchFormData({
      ...payload,
      website: payload.hasWebsite === 'yes' ? payload.website : '',
    });
    setFieldErrors({});
    setErrors({});
    setFormStatus('idle');
    setCurrentStep('needs');
  }

  const industryOptions = INDUSTRIES.map((industry) => ({
    value: industry,
    label: messages.businessStep.industries[industry],
  }));

  return (
    <form className="space-y-6" noValidate onSubmit={handleContinue}>
      <div className="space-y-5 rounded-xl border border-cdf-border/80 bg-white/75 p-5 shadow-sm backdrop-blur sm:p-6">
        <FormField
          id="company"
          name="company"
          label={messages.fields.company}
          type="text"
          value={values.company}
          placeholder={messages.businessStep.companyPlaceholder}
          error={errors.company}
          required
          requiredLabel={messages.common.required}
          autoComplete="organization"
          onChange={(event) => {
            setValues((current) => ({
              ...current,
              company: event.target.value,
            }));
            clearError('company');
          }}
        />

        <SelectField
          id="industry"
          name="industry"
          label={messages.fields.industry}
          value={values.industry}
          placeholder={messages.businessStep.industryPlaceholder}
          hint={messages.businessStep.industryHint}
          error={errors.industry}
          required
          requiredLabel={messages.common.required}
          options={industryOptions}
          onChange={(event) => {
            setValues((current) => ({
              ...current,
              industry: event.target.value as Industry,
            }));
            clearError('industry');
          }}
        />

        <RadioGroup
          name="hasWebsite"
          legend={messages.businessStep.hasWebsiteLegend}
          hint={messages.businessStep.hasWebsiteHint}
          value={values.hasWebsite}
          error={errors.hasWebsite}
          required
          requiredLabel={messages.common.required}
          options={[
            { value: 'yes', label: messages.businessStep.yes },
            { value: 'no', label: messages.businessStep.no },
          ]}
          onChange={(value) => {
            setValues((current) => ({
              ...current,
              hasWebsite: value as HasWebsite,
              website: value === 'no' ? '' : current.website,
            }));
            clearError('hasWebsite');
            if (value === 'no') clearError('website');
          }}
        />

        {values.hasWebsite === 'yes' ? (
          <FormField
            id="website"
            name="website"
            label={messages.fields.website}
            type="url"
            value={values.website}
            placeholder={messages.businessStep.websitePlaceholder}
            hint={messages.businessStep.websiteHint}
            error={errors.website}
            required
            requiredLabel={messages.common.required}
            autoComplete="url"
            inputMode="url"
            onChange={(event) => {
              setValues((current) => ({
                ...current,
                website: event.target.value,
              }));
              clearError('website');
            }}
          />
        ) : null}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          className="inline-flex min-h-11 items-center justify-center rounded-md px-4 py-2.5 text-sm font-medium text-cdf-ink transition hover:bg-black/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cdf-accent"
          onClick={() => setCurrentStep('contact')}
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
