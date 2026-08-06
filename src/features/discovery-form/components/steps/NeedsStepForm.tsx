import { useEffect, useRef, useState } from 'react';
import { useStore } from '@nanostores/react';
import { FormTextArea } from '@components/ui/FormTextArea';
import { getMessages, type Locale } from '@i18n/index';
import { zodErrorToFieldErrors } from '../../lib/field-errors';
import { createNeedsSchema } from '../../schemas/needs.schema';
import {
  $discoveryForm,
  $formLocale,
  patchFormData,
  completeStepAndGo,
  setCurrentStep,
  setFieldErrors,
  setFormStatus,
} from '../../stores/discovery-form.store';
import type { NeedsData } from '../../types/form';
import { PROJECT_TYPES, type ProjectType } from '../../types/steps';

type NeedsStepFormProps = {
  locale: Locale;
};

type NeedsField = keyof NeedsData;

const FIELD_ORDER: NeedsField[] = ['goals', 'projectType', 'expectedOutcome'];

export function NeedsStepForm({ locale }: NeedsStepFormProps) {
  const form = useStore($discoveryForm);
  const messages = getMessages(locale);
  const firstErrorRef = useRef<string | null>(null);

  const [values, setValues] = useState({
    goals: form.data.goals ?? '',
    projectType: (form.data.projectType ?? '') as ProjectType | '',
    expectedOutcome: form.data.expectedOutcome ?? '',
  });
  const [errors, setErrors] = useState<Partial<Record<NeedsField, string>>>(
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

  function clearError(field: NeedsField) {
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

    const schema = createNeedsSchema(messages.validation);
    const result = schema.safeParse({
      goals: values.goals,
      projectType: values.projectType || undefined,
      expectedOutcome: values.expectedOutcome,
    });

    if (!result.success) {
      const fieldErrors = zodErrorToFieldErrors(result.error);
      const nextErrors: Partial<Record<NeedsField, string>> = {};

      for (const field of FIELD_ORDER) {
        if (fieldErrors[field]) {
          nextErrors[field] = fieldErrors[field];
        }
      }

      const firstError = FIELD_ORDER.find((field) => nextErrors[field]);
      firstErrorRef.current =
        firstError === 'projectType'
          ? `projectType-${PROJECT_TYPES[0]}`
          : (firstError ?? null);
      setErrors(nextErrors);
      setFieldErrors(fieldErrors);
      setFormStatus('idle');
      return;
    }

    const payload: NeedsData = result.data;
    patchFormData(payload);
    setFieldErrors({});
    setErrors({});
    setFormStatus('idle');
    completeStepAndGo('assets');
  }

  return (
    <form className="space-y-6" noValidate onSubmit={handleContinue}>
      <div className="space-y-6 rounded-xl border border-cdf-border/80 bg-white/75 p-5 shadow-sm backdrop-blur sm:p-6">
        <FormTextArea
          id="goals"
          name="goals"
          label={messages.fields.goals}
          value={values.goals}
          placeholder={messages.needsStep.goalsPlaceholder}
          hint={messages.needsStep.goalsHint}
          error={errors.goals}
          required
          requiredLabel={messages.common.required}
          rows={4}
          onChange={(event) => {
            setValues((current) => ({ ...current, goals: event.target.value }));
            clearError('goals');
          }}
        />

        <fieldset
          className="flex flex-col gap-2"
          aria-required
          aria-invalid={errors.projectType ? true : false}
          aria-describedby={
            errors.projectType
              ? 'projectType-error'
              : 'projectType-hint'
          }
        >
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <legend className="text-sm font-medium text-cdf-ink">
              {messages.needsStep.projectTypeLegend}
            </legend>
            <span className="text-xs font-medium text-cdf-muted">
              {messages.common.required}
            </span>
          </div>

          <div className="grid gap-2">
            {PROJECT_TYPES.map((type) => {
              const option = messages.needsStep.projectTypeOptions[type];
              const optionId = `projectType-${type}`;
              const selected = values.projectType === type;

              return (
                <label
                  key={type}
                  htmlFor={optionId}
                  className={[
                    'flex cursor-pointer gap-3 rounded-md border bg-white px-3.5 py-3 transition',
                    selected
                      ? 'border-cdf-accent ring-1 ring-cdf-accent/30'
                      : errors.projectType
                        ? 'border-cdf-danger/50'
                        : 'border-cdf-border hover:border-cdf-ink/25',
                  ].join(' ')}
                >
                  <input
                    id={optionId}
                    type="radio"
                    name="projectType"
                    value={type}
                    checked={selected}
                    className="mt-1 size-4 shrink-0 accent-cdf-accent"
                    onChange={() => {
                      setValues((current) => ({
                        ...current,
                        projectType: type,
                      }));
                      clearError('projectType');
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

          {!errors.projectType ? (
            <p
              id="projectType-hint"
              className="text-xs leading-relaxed text-cdf-muted"
            >
              {messages.needsStep.projectTypeHint}
            </p>
          ) : (
            <p
              id="projectType-error"
              className="text-xs font-medium text-cdf-danger"
              role="alert"
            >
              {errors.projectType}
            </p>
          )}
        </fieldset>

        <FormTextArea
          id="expectedOutcome"
          name="expectedOutcome"
          label={messages.fields.expectedOutcome}
          value={values.expectedOutcome}
          placeholder={messages.needsStep.expectedOutcomePlaceholder}
          hint={messages.needsStep.expectedOutcomeHint}
          error={errors.expectedOutcome}
          required
          requiredLabel={messages.common.required}
          rows={4}
          onChange={(event) => {
            setValues((current) => ({
              ...current,
              expectedOutcome: event.target.value,
            }));
            clearError('expectedOutcome');
          }}
        />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          className="inline-flex min-h-11 items-center justify-center rounded-md px-4 py-2.5 text-sm font-medium text-cdf-ink transition hover:bg-black/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cdf-accent"
          onClick={() => setCurrentStep('business')}
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
