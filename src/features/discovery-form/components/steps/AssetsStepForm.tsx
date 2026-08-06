import { useEffect, useRef, useState } from 'react';
import { useStore } from '@nanostores/react';
import { RadioGroup } from '@components/ui/RadioGroup';
import { getMessages, type Locale } from '@i18n/index';
import { zodErrorToFieldErrors } from '../../lib/field-errors';
import { createAssetsSchema } from '../../schemas/assets.schema';
import {
  $discoveryForm,
  $formLocale,
  patchFormData,
  completeStepAndGo,
  setCurrentStep,
  setFieldErrors,
  setFormStatus,
} from '../../stores/discovery-form.store';
import type { AssetsData } from '../../types/form';
import {
  ASSET_KEYS,
  ASSET_READINESS,
  type AssetKey,
  type AssetReadiness,
} from '../../types/steps';

type AssetsStepFormProps = {
  locale: Locale;
};

type AssetsField = keyof AssetsData;

const FIELD_ORDER: AssetsField[] = [
  ...ASSET_KEYS,
  'needsContentHelp',
];

export function AssetsStepForm({ locale }: AssetsStepFormProps) {
  const form = useStore($discoveryForm);
  const messages = getMessages(locale);
  const firstErrorRef = useRef<string | null>(null);

  const [values, setValues] = useState<Record<AssetKey, AssetReadiness | ''> & {
    needsContentHelp: 'yes' | 'no' | '';
  }>({
    logo: form.data.logo ?? '',
    photos: form.data.photos ?? '',
    texts: form.data.texts ?? '',
    visualIdentity: form.data.visualIdentity ?? '',
    brandManual: form.data.brandManual ?? '',
    needsContentHelp: form.data.needsContentHelp ?? '',
  });
  const [errors, setErrors] = useState<Partial<Record<AssetsField, string>>>(
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

  function clearError(field: AssetsField) {
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

    const schema = createAssetsSchema(messages.validation);
    const result = schema.safeParse({
      logo: values.logo || undefined,
      photos: values.photos || undefined,
      texts: values.texts || undefined,
      visualIdentity: values.visualIdentity || undefined,
      brandManual: values.brandManual || undefined,
      needsContentHelp: values.needsContentHelp || undefined,
    });

    if (!result.success) {
      const fieldErrors = zodErrorToFieldErrors(result.error);
      const nextErrors: Partial<Record<AssetsField, string>> = {};

      for (const field of FIELD_ORDER) {
        if (fieldErrors[field]) {
          nextErrors[field] = fieldErrors[field];
        }
      }

      const firstError = FIELD_ORDER.find((field) => nextErrors[field]);
      firstErrorRef.current = firstError
        ? firstError === 'needsContentHelp'
          ? 'needsContentHelp-yes'
          : `${firstError}-ready`
        : null;
      setErrors(nextErrors);
      setFieldErrors(fieldErrors);
      setFormStatus('idle');
      return;
    }

    patchFormData(result.data);
    setFieldErrors({});
    setErrors({});
    setFormStatus('idle');
    completeStepAndGo('design');
  }

  const readinessOptions = ASSET_READINESS.map((value) => ({
    value,
    label: messages.assetsStep.readiness[value],
  }));

  return (
    <form className="space-y-6" noValidate onSubmit={handleContinue}>
      <div className="space-y-6 rounded-xl border border-cdf-border/80 bg-white/75 p-5 shadow-sm backdrop-blur sm:p-6">
        <div className="space-y-1">
          <p className="text-sm font-medium text-cdf-ink">
            {messages.assetsStep.matrixLegend}
          </p>
          <p className="text-xs text-cdf-muted">{messages.assetsStep.matrixHint}</p>
        </div>

        <div className="space-y-5">
          {ASSET_KEYS.map((key) => {
            const item = messages.assetsStep.items[key];
            const error = errors[key];

            return (
              <fieldset
                key={key}
                className="space-y-2 border-b border-cdf-border/50 pb-5 last:border-b-0 last:pb-0"
                aria-invalid={error ? true : false}
                aria-describedby={
                  error ? `${key}-error` : `${key}-hint`
                }
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <legend className="text-sm font-medium text-cdf-ink">
                    {item.label}
                  </legend>
                  <span className="text-xs font-medium text-cdf-muted">
                    {messages.common.required}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {readinessOptions.map((option) => {
                    const optionId = `${key}-${option.value}`;
                    const selected = values[key] === option.value;

                    return (
                      <label
                        key={option.value}
                        htmlFor={optionId}
                        className={[
                          'flex cursor-pointer items-center justify-center rounded-md border px-2 py-2.5 text-center text-xs font-medium transition sm:text-sm',
                          selected
                            ? 'border-cdf-accent bg-cdf-accent/5 text-cdf-ink ring-1 ring-cdf-accent/30'
                            : error
                              ? 'border-cdf-danger/40 text-cdf-ink'
                              : 'border-cdf-border bg-white text-cdf-muted hover:border-cdf-ink/25 hover:text-cdf-ink',
                        ].join(' ')}
                      >
                        <input
                          id={optionId}
                          type="radio"
                          name={key}
                          value={option.value}
                          checked={selected}
                          className="sr-only"
                          onChange={() => {
                            setValues((current) => ({
                              ...current,
                              [key]: option.value,
                            }));
                            clearError(key);
                          }}
                        />
                        {option.label}
                      </label>
                    );
                  })}
                </div>

                {!error ? (
                  <p id={`${key}-hint`} className="text-xs text-cdf-muted">
                    {item.hint}
                  </p>
                ) : (
                  <p
                    id={`${key}-error`}
                    className="text-xs font-medium text-cdf-danger"
                    role="alert"
                  >
                    {error}
                  </p>
                )}
              </fieldset>
            );
          })}
        </div>

        <RadioGroup
          name="needsContentHelp"
          legend={messages.assetsStep.helpLegend}
          hint={messages.assetsStep.helpHint}
          value={values.needsContentHelp}
          error={errors.needsContentHelp}
          required
          requiredLabel={messages.common.required}
          options={[
            { value: 'yes', label: messages.businessStep.yes },
            { value: 'no', label: messages.businessStep.no },
          ]}
          onChange={(value) => {
            setValues((current) => ({
              ...current,
              needsContentHelp: value as 'yes' | 'no',
            }));
            clearError('needsContentHelp');
          }}
        />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          className="inline-flex min-h-11 items-center justify-center rounded-md px-4 py-2.5 text-sm font-medium text-cdf-ink transition hover:bg-black/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cdf-accent"
          onClick={() => setCurrentStep('needs')}
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
