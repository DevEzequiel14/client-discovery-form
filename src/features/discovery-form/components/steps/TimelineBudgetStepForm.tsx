import { useEffect, useRef, useState } from 'react';
import { useStore } from '@nanostores/react';
import { RadioGroup } from '@components/ui/RadioGroup';
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
import { createTimelineBudgetSchema } from '../../schemas/timeline-budget.schema';
import {
  $discoveryForm,
  $formLocale,
  patchFormData,
  completeStepAndGo,
  setCurrentStep,
  setFieldErrors,
  setFormStatus,
} from '../../stores/discovery-form.store';
import type { TimelineBudgetData } from '../../types/form';
import {
  INVESTMENT_RANGES,
  TIMELINE_OPTIONS,
  type InvestmentRange,
  type TimelineOption,
} from '../../types/steps';

type TimelineBudgetStepFormProps = {
  locale: Locale;
};

type TimelineBudgetField = keyof TimelineBudgetData;

const FIELD_ORDER: TimelineBudgetField[] = ['timeline', 'investmentRange'];

export function TimelineBudgetStepForm({
  locale,
}: TimelineBudgetStepFormProps) {
  const form = useStore($discoveryForm);
  const messages = getMessages(locale);
  const firstErrorRef = useRef<string | null>(null);

  const [values, setValues] = useState({
    timeline: (form.data.timeline ?? '') as TimelineOption | '',
    investmentRange: (form.data.investmentRange ?? '') as InvestmentRange | '',
  });
  const [errors, setErrors] = useState<
    Partial<Record<TimelineBudgetField, string>>
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

  function clearError(field: TimelineBudgetField) {
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

    const schema = createTimelineBudgetSchema(messages.validation);
    const result = schema.safeParse({
      timeline: values.timeline || undefined,
      investmentRange: values.investmentRange || undefined,
    });

    if (!result.success) {
      const fieldErrors = zodErrorToFieldErrors(result.error);
      const nextErrors: Partial<Record<TimelineBudgetField, string>> = {};

      for (const field of FIELD_ORDER) {
        if (fieldErrors[field]) {
          nextErrors[field] = fieldErrors[field];
        }
      }

      const firstError = FIELD_ORDER.find((field) => nextErrors[field]);
      firstErrorRef.current =
        firstError === 'timeline'
          ? `timeline-${TIMELINE_OPTIONS[0]}`
          : firstError === 'investmentRange'
            ? `investmentRange-${INVESTMENT_RANGES[0]}`
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
    completeStepAndGo('extras');
  }

  return (
    <form className="space-y-6" noValidate onSubmit={handleContinue}>
      <div className={['space-y-6', stepCard].join(' ')}>
        <RadioGroup
          name="timeline"
          legend={messages.timelineBudgetStep.timelineLegend}
          hint={messages.timelineBudgetStep.timelineHint}
          value={values.timeline}
          error={errors.timeline}
          required
          requiredLabel={messages.common.required}
          layout="stack"
          options={TIMELINE_OPTIONS.map((option) => ({
            value: option,
            label: messages.timelineBudgetStep.timelineOptions[option],
          }))}
          onChange={(value) => {
            setValues((current) => ({
              ...current,
              timeline: value as TimelineOption,
            }));
            clearError('timeline');
          }}
        />

        <fieldset
          className="flex flex-col gap-2"
          aria-required
          aria-invalid={errors.investmentRange ? true : false}
          aria-describedby={
            errors.investmentRange
              ? 'investmentRange-error'
              : 'investmentRange-hint'
          }
        >
          <legend className="text-sm font-medium text-cdf-ink">
            {messages.timelineBudgetStep.investmentLegend}
            <span className="text-cdf-muted" aria-hidden="true">
              {' '}
              *
            </span>
          </legend>

          <p className="text-xs leading-relaxed text-cdf-muted">
            {messages.timelineBudgetStep.investmentIntro}
          </p>

          <div className="grid gap-2">
            {INVESTMENT_RANGES.map((range) => {
              const option = messages.timelineBudgetStep.investmentOptions[range];
              const optionId = `investmentRange-${range}`;
              const selected = values.investmentRange === range;

              return (
                <label
                  key={range}
                  htmlFor={optionId}
                  className={[
                    'flex cursor-pointer gap-3',
                    optionBase,
                    optionPad,
                    selected
                      ? optionSelected
                      : errors.investmentRange
                        ? optionError
                        : optionIdle,
                  ].join(' ')}
                >
                  <input
                    id={optionId}
                    type="radio"
                    name="investmentRange"
                    value={range}
                    checked={selected}
                    className="mt-1 size-4 shrink-0 accent-cdf-accent"
                    onChange={() => {
                      setValues((current) => ({
                        ...current,
                        investmentRange: range,
                      }));
                      clearError('investmentRange');
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

          {!errors.investmentRange ? (
            <p
              id="investmentRange-hint"
              className="text-xs leading-relaxed text-cdf-muted"
            >
              {messages.timelineBudgetStep.investmentHint}
            </p>
          ) : (
            <p
              id="investmentRange-error"
              className="text-xs font-medium text-cdf-danger"
              role="alert"
            >
              {errors.investmentRange}
            </p>
          )}
        </fieldset>
      </div>

      <div className={[stepNav, 'justify-between'].join(' ')}>
        <button
          type="button"
          className={btnGhost}
          onClick={() => setCurrentStep('technical')}
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
