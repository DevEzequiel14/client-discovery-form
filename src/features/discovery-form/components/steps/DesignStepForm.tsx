import { useEffect, useRef, useState } from 'react';
import { useStore } from '@nanostores/react';
import { FormTextArea } from '@components/ui/FormTextArea';
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
import {
  DESIGN_STYLES,
  type DesignStyle,
  type HasReferences,
} from '../../types/steps';

type DesignStepFormProps = {
  locale: Locale;
};

type DesignField = keyof DesignData;

const FIELD_ORDER: DesignField[] = [
  'designStyle',
  'designStyleNote',
  'hasReferences',
  'referenceUrls',
  'designTaste',
];

export function DesignStepForm({ locale }: DesignStepFormProps) {
  const form = useStore($discoveryForm);
  const messages = getMessages(locale);
  const firstErrorRef = useRef<string | null>(null);

  const [values, setValues] = useState({
    designStyle: (form.data.designStyle ?? '') as DesignStyle | '',
    designStyleNote: form.data.designStyleNote ?? '',
    hasReferences: (form.data.hasReferences ?? '') as HasReferences | '',
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
      designStyleNote: values.designStyleNote,
      hasReferences: values.hasReferences || undefined,
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
          : firstError === 'hasReferences'
            ? 'hasReferences-yes'
            : (firstError ?? null);
      setErrors(nextErrors);
      setFieldErrors(fieldErrors);
      setFormStatus('idle');
      return;
    }

    const payload: DesignData = {
      designStyle: result.data.designStyle,
      designStyleNote:
        result.data.designStyle === 'other'
          ? result.data.designStyleNote
          : undefined,
      hasReferences: result.data.hasReferences,
      referenceUrls:
        result.data.hasReferences === 'yes'
          ? result.data.referenceUrls
          : undefined,
      designTaste: result.data.designTaste,
    };

    patchFormData({
      ...payload,
      designStyleNote:
        payload.designStyle === 'other' ? (payload.designStyleNote ?? '') : '',
      referenceUrls:
        payload.hasReferences === 'yes' ? (payload.referenceUrls ?? '') : '',
      designTaste: payload.designTaste ?? '',
    });
    setFieldErrors({});
    setErrors({});
    setFormStatus('idle');
    completeStepAndGo('technical');
  }

  const styleHintId = errors.designStyle
    ? 'designStyle-error'
    : 'designStyle-hint';

  return (
    <form className="space-y-5" noValidate onSubmit={handleContinue}>
      <div className={['space-y-4', stepCard].join(' ')}>
        <fieldset
          className="flex flex-col gap-2"
          aria-required
          aria-invalid={errors.designStyle ? true : false}
          aria-describedby={styleHintId}
        >
          <legend className="text-sm font-medium text-cdf-ink">
            {messages.designStep.styleLegend}
            <span className="text-cdf-muted" aria-hidden="true">
              {' '}
              *
            </span>
          </legend>

          {!errors.designStyle ? (
            <p
              id="designStyle-hint"
              className="text-xs leading-relaxed text-cdf-muted"
            >
              {messages.designStep.styleHint}
            </p>
          ) : null}

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
                    'flex cursor-pointer gap-3',
                    optionBase,
                    optionPad,
                    selected
                      ? optionSelected
                      : errors.designStyle
                        ? optionError
                        : optionIdle,
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
                        designStyleNote:
                          style === 'other' ? current.designStyleNote : '',
                      }));
                      clearError('designStyle');
                      if (style !== 'other') clearError('designStyleNote');
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

          {errors.designStyle ? (
            <p
              id="designStyle-error"
              className="text-xs font-medium text-cdf-danger"
              role="alert"
            >
              {errors.designStyle}
            </p>
          ) : null}
        </fieldset>

        {values.designStyle === 'other' ? (
          <FormTextArea
            id="designStyleNote"
            name="designStyleNote"
            label={messages.designStep.styleNoteLabel}
            value={values.designStyleNote}
            placeholder={messages.designStep.styleNotePlaceholder}
            hint={messages.designStep.styleNoteHint}
            error={errors.designStyleNote}
            rows={3}
            onChange={(event) => {
              setValues((current) => ({
                ...current,
                designStyleNote: event.target.value,
              }));
              clearError('designStyleNote');
            }}
          />
        ) : null}

        <RadioGroup
          name="hasReferences"
          legend={messages.designStep.hasReferencesLegend}
          hint={messages.designStep.hasReferencesHint}
          value={values.hasReferences}
          error={errors.hasReferences}
          required
          options={[
            { value: 'yes', label: messages.designStep.yes },
            { value: 'no', label: messages.designStep.no },
          ]}
          onChange={(value) => {
            setValues((current) => ({
              ...current,
              hasReferences: value as HasReferences,
              referenceUrls: value === 'no' ? '' : current.referenceUrls,
            }));
            clearError('hasReferences');
            if (value === 'no') clearError('referenceUrls');
          }}
        />

        {values.hasReferences === 'yes' ? (
          <FormTextArea
            id="referenceUrls"
            name="referenceUrls"
            label={messages.fields.referenceUrls}
            value={values.referenceUrls}
            placeholder={messages.designStep.urlsPlaceholder}
            hint={messages.designStep.urlsHint}
            error={errors.referenceUrls}
            required
            rows={3}
            inputMode="url"
            onChange={(event) => {
              setValues((current) => ({
                ...current,
                referenceUrls: event.target.value,
              }));
              clearError('referenceUrls');
            }}
          />
        ) : null}

        <FormTextArea
          id="designTaste"
          name="designTaste"
          label={messages.fields.designTaste}
          value={values.designTaste}
          placeholder={messages.designStep.tastePlaceholder}
          hint={messages.designStep.tasteHint}
          error={errors.designTaste}
          rows={3}
          onChange={(event) => {
            setValues((current) => ({
              ...current,
              designTaste: event.target.value,
            }));
            clearError('designTaste');
          }}
        />
      </div>

      <div className={[stepNav, 'justify-between'].join(' ')}>
        <button
          type="button"
          className={btnGhost}
          onClick={() => setCurrentStep('assets')}
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
