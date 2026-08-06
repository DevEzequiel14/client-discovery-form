import { useEffect, useRef, useState } from 'react';
import { useStore } from '@nanostores/react';
import { FormTextArea } from '@components/ui/FormTextArea';
import { getMessages, type Locale } from '@i18n/index';
import { zodErrorToFieldErrors } from '../../lib/field-errors';
import { createDesignSchema } from '../../schemas/design.schema';
import {
  $discoveryForm,
  $formLocale,
  patchFormData,
  completeStepAndGo,
  setCurrentStep,
  setFieldErrors,
  setFormStatus,
} from '../../stores/discovery-form.store';
import type { DesignData } from '../../types/form';
import { DESIGN_STYLES, type DesignStyle } from '../../types/steps';

type DesignStepFormProps = {
  locale: Locale;
};

type DesignField = keyof DesignData;

const FIELD_ORDER: DesignField[] = [
  'designStyle',
  'referenceUrls',
  'designTaste',
];

export function DesignStepForm({ locale }: DesignStepFormProps) {
  const form = useStore($discoveryForm);
  const messages = getMessages(locale);
  const firstErrorRef = useRef<string | null>(null);

  const [values, setValues] = useState({
    designStyle: (form.data.designStyle ?? '') as DesignStyle | '',
    referenceUrls: form.data.referenceUrls ?? '',
    designTaste: form.data.designTaste ?? '',
  });
  const [errors, setErrors] = useState<Partial<Record<DesignField, string>>>(
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

  function clearError(field: DesignField) {
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

    const schema = createDesignSchema(messages.validation);
    const result = schema.safeParse({
      designStyle: values.designStyle || undefined,
      referenceUrls: values.referenceUrls,
      designTaste: values.designTaste,
    });

    if (!result.success) {
      const fieldErrors = zodErrorToFieldErrors(result.error);
      const nextErrors: Partial<Record<DesignField, string>> = {};

      for (const field of FIELD_ORDER) {
        if (fieldErrors[field]) {
          nextErrors[field] = fieldErrors[field];
        }
      }

      const firstError = FIELD_ORDER.find((field) => nextErrors[field]);
      firstErrorRef.current =
        firstError === 'designStyle'
          ? `designStyle-${DESIGN_STYLES[0]}`
          : (firstError ?? null);
      setErrors(nextErrors);
      setFieldErrors(fieldErrors);
      setFormStatus('idle');
      return;
    }

    patchFormData(result.data);
    setFieldErrors({});
    setErrors({});
    setFormStatus('idle');
    completeStepAndGo('technical');
  }

  return (
    <form className="space-y-6" noValidate onSubmit={handleContinue}>
      <div className="space-y-6 rounded-xl border border-cdf-border/80 bg-white/75 p-5 shadow-sm backdrop-blur sm:p-6">
        <fieldset
          className="flex flex-col gap-2"
          aria-required
          aria-invalid={errors.designStyle ? true : false}
          aria-describedby={
            errors.designStyle ? 'designStyle-error' : 'designStyle-hint'
          }
        >
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <legend className="text-sm font-medium text-cdf-ink">
              {messages.designStep.styleLegend}
            </legend>
            <span className="text-xs font-medium text-cdf-muted">
              {messages.common.required}
            </span>
          </div>

          <div className="grid gap-2">
            {DESIGN_STYLES.map((style) => {
              const option = messages.designStep.styleOptions[style];
              const optionId = `designStyle-${style}`;
              const selected = values.designStyle === style;

              return (
                <label
                  key={style}
                  htmlFor={optionId}
                  className={[
                    'flex cursor-pointer gap-3 rounded-md border bg-white px-3.5 py-3 transition',
                    selected
                      ? 'border-cdf-accent ring-1 ring-cdf-accent/30'
                      : errors.designStyle
                        ? 'border-cdf-danger/50'
                        : 'border-cdf-border hover:border-cdf-ink/25',
                  ].join(' ')}
                >
                  <input
                    id={optionId}
                    type="radio"
                    name="designStyle"
                    value={style}
                    checked={selected}
                    className="mt-1 size-4 shrink-0 accent-cdf-accent"
                    onChange={() => {
                      setValues((current) => ({
                        ...current,
                        designStyle: style,
                      }));
                      clearError('designStyle');
                    }}
                  />
                  <span className="min-w-0">
                    <span className="block text-sm font-medium text-cdf-ink">
                      {option.label}
                    </span>
                    <span className="mt-0.5 block text-xs leading-relaxed text-cdf-muted">
                      {option.description}
                    </span>
                  </span>
                </label>
              );
            })}
          </div>

          {!errors.designStyle ? (
            <p
              id="designStyle-hint"
              className="text-xs leading-relaxed text-cdf-muted"
            >
              {messages.designStep.styleHint}
            </p>
          ) : (
            <p
              id="designStyle-error"
              className="text-xs font-medium text-cdf-danger"
              role="alert"
            >
              {errors.designStyle}
            </p>
          )}
        </fieldset>

        <FormTextArea
          id="referenceUrls"
          name="referenceUrls"
          label={messages.fields.referenceUrls}
          value={values.referenceUrls}
          placeholder={messages.designStep.urlsPlaceholder}
          hint={messages.designStep.urlsHint}
          error={errors.referenceUrls}
          required
          requiredLabel={messages.common.required}
          rows={4}
          inputMode="url"
          onChange={(event) => {
            setValues((current) => ({
              ...current,
              referenceUrls: event.target.value,
            }));
            clearError('referenceUrls');
          }}
        />

        <FormTextArea
          id="designTaste"
          name="designTaste"
          label={messages.fields.designTaste}
          value={values.designTaste}
          placeholder={messages.designStep.tastePlaceholder}
          hint={messages.designStep.tasteHint}
          error={errors.designTaste}
          required
          requiredLabel={messages.common.required}
          rows={4}
          onChange={(event) => {
            setValues((current) => ({
              ...current,
              designTaste: event.target.value,
            }));
            clearError('designTaste');
          }}
        />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          className="inline-flex min-h-11 items-center justify-center rounded-md px-4 py-2.5 text-sm font-medium text-cdf-ink transition hover:bg-black/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cdf-accent"
          onClick={() => setCurrentStep('assets')}
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
