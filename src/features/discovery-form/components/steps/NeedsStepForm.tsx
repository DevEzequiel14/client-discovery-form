import { useEffect, useRef, useState } from 'react';
import { useStore } from '@nanostores/react';
import { FormTextArea } from '@components/ui/FormTextArea';
import { getMessages, type Locale } from '@i18n/index';
import {
  btnGhost,
  btnPrimary,
  optionBase,
  optionError,
  optionIdle,
  optionPad,
  optionSelected,
  stepCard,
  stepNav,
} from '@lib/ui-classes';
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

    const payload: NeedsData = {
      goals: result.data.goals,
      projectType: result.data.projectType,
      expectedOutcome: result.data.expectedOutcome,
    };
    patchFormData(payload);
    setFieldErrors({});
    setErrors({});
    setFormStatus('idle');
    completeStepAndGo('assets');
  }

  const projectTypeHintId = errors.projectType
    ? 'projectType-error'
    : 'projectType-hint';

  return (
    <form className="space-y-5" noValidate onSubmit={handleContinue}>
      <div className={['space-y-5', stepCard].join(' ')}>
        <FormTextArea
          id="goals"
          name="goals"
          label={messages.fields.goals}
          value={values.goals}
          placeholder={messages.needsStep.goalsPlaceholder}
          hint={messages.needsStep.goalsHint}
          error={errors.goals}
          required
          rows={3}
          onChange={(event) => {
            setValues((current) => ({ ...current, goals: event.target.value }));
            clearError('goals');
          }}
        />

        <fieldset
          className="flex flex-col gap-2"
          aria-required
          aria-invalid={errors.projectType ? true : false}
          aria-describedby={projectTypeHintId}
        >
          <legend className="text-sm font-medium text-cdf-ink">
            {messages.needsStep.projectTypeLegend}
            <span className="text-cdf-muted" aria-hidden="true">
              {' '}
              *
            </span>
          </legend>

          {!errors.projectType ? (
            <p
              id="projectType-hint"
              className="text-xs leading-relaxed text-cdf-muted"
            >
              {messages.needsStep.projectTypeHint}
            </p>
          ) : null}

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
                    'flex cursor-pointer gap-3',
                    optionBase,
                    optionPad,
                    selected
                      ? optionSelected
                      : errors.projectType
                        ? optionError
                        : optionIdle,
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

          {errors.projectType ? (
            <p
              id="projectType-error"
              className="text-xs font-medium text-cdf-danger"
              role="alert"
            >
              {errors.projectType}
            </p>
          ) : null}
        </fieldset>

        <FormTextArea
          id="expectedOutcome"
          name="expectedOutcome"
          label={messages.fields.expectedOutcome}
          value={values.expectedOutcome}
          placeholder={messages.needsStep.expectedOutcomePlaceholder}
          hint={messages.needsStep.expectedOutcomeHint}
          error={errors.expectedOutcome}
          rows={3}
          onChange={(event) => {
            setValues((current) => ({
              ...current,
              expectedOutcome: event.target.value,
            }));
            clearError('expectedOutcome');
          }}
        />
      </div>

      <div className={[stepNav, 'justify-between'].join(' ')}>
        <button
          type="button"
          className={btnGhost}
          onClick={() => setCurrentStep('business')}
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
