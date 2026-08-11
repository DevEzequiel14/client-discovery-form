import { useEffect, useRef, useState } from 'react';
import { useStore } from '@nanostores/react';
import { RadioGroup } from '@components/ui/RadioGroup';
import { getMessages, type Locale } from '@i18n/index';
import { btnGhost, btnPrimary, stepCard, stepNav } from '@lib/ui-classes';
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
    <form className="space-y-5" noValidate onSubmit={handleContinue}>
      <div className={['space-y-4', stepCard].join(' ')}>
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
            setValues((current) => ({
              ...current,
              timeline: value as TimelineOption,
            }));
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
          options={INVESTMENT_RANGES.map((range) => ({
            value: range,
            label: messages.timelineBudgetStep.investmentOptions[range],
          }))}
          onChange={(value) => {
            setValues((current) => ({
              ...current,
              investmentRange: value as InvestmentRange,
            }));
            clearError('investmentRange');
          }}
        />
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
