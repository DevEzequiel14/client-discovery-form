import { useEffect, useRef, useState } from 'react';
import { useStore } from '@nanostores/react';
import { getMessages, type Locale } from '@i18n/index';
import {
  btnGhost,
  btnPrimary,
  optionBase,
  optionError,
  optionIdle,
  optionSelected,
  stepCard,
  stepNav,
} from '@lib/ui-classes';
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
  BRAND_STYLE_STATUS,
  CONTENT_AMOUNT,
  LOGO_STATUS,
  type AssetKey,
  type BrandStyleStatus,
  type ContentAmount,
  type LogoStatus,
} from '../../types/steps';

type AssetsStepFormProps = {
  locale: Locale;
};

type AssetsField = keyof AssetsData;

const FIELD_ORDER: AssetsField[] = [...ASSET_KEYS, 'needsContentHelp'];

type AssetValue = LogoStatus | ContentAmount | BrandStyleStatus | '';

function optionsForKey(
  key: AssetKey,
  messages: ReturnType<typeof getMessages>,
): Array<{ value: string; label: string }> {
  if (key === 'logo') {
    return LOGO_STATUS.map((value) => ({
      value,
      label: messages.assetsStep.logoOptions[value],
    }));
  }

  if (key === 'visualIdentity') {
    return BRAND_STYLE_STATUS.map((value) => ({
      value,
      label: messages.assetsStep.styleOptions[value],
    }));
  }

  return CONTENT_AMOUNT.map((value) => ({
    value,
    label: messages.assetsStep.contentOptions[value],
  }));
}

export function AssetsStepForm({ locale }: AssetsStepFormProps) {
  const form = useStore($discoveryForm);
  const messages = getMessages(locale);
  const firstErrorRef = useRef<string | null>(null);

  const [values, setValues] = useState({
    logo: (form.data.logo ?? '') as LogoStatus | '',
    photos: (form.data.photos ?? '') as ContentAmount | '',
    texts: (form.data.texts ?? '') as ContentAmount | '',
    visualIdentity: (form.data.visualIdentity ?? '') as BrandStyleStatus | '',
    needsContentHelp: (form.data.needsContentHelp ?? '') as 'yes' | 'no' | '',
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
      if (firstError === 'needsContentHelp') {
        firstErrorRef.current = 'needsContentHelp-yes';
      } else if (firstError === 'logo') {
        firstErrorRef.current = 'logo-yes';
      } else if (firstError === 'visualIdentity') {
        firstErrorRef.current = 'visualIdentity-defined';
      } else if (firstError) {
        firstErrorRef.current = `${firstError}-all`;
      } else {
        firstErrorRef.current = null;
      }

      setErrors(nextErrors);
      setFieldErrors(fieldErrors);
      setFormStatus('idle');
      return;
    }

    const payload: AssetsData = result.data;
    patchFormData(payload);
    setFieldErrors({});
    setErrors({});
    setFormStatus('idle');
    completeStepAndGo('design');
  }

  return (
    <form className="space-y-5" noValidate onSubmit={handleContinue}>
      <div className={['space-y-5', stepCard].join(' ')}>
        <div className="space-y-5">
          {ASSET_KEYS.map((key) => {
            const item = messages.assetsStep.items[key];
            const error = errors[key];
            const options = optionsForKey(key, messages);
            const cols =
              options.length === 2 ? 'grid-cols-2' : 'grid-cols-3';

            return (
              <fieldset
                key={key}
                className="space-y-1 border-b border-cdf-border/50 pb-5 last:border-b-0 last:pb-0"
                aria-invalid={error ? true : false}
                aria-describedby={error ? `${key}-error` : `${key}-hint`}
              >
                <legend className="text-sm font-medium text-cdf-ink">
                  {item.label}
                  <span className="text-cdf-muted" aria-hidden="true">
                    {' '}
                    *
                  </span>
                </legend>

                {!error && item.hint ? (
                  <p id={`${key}-hint`} className="text-xs text-cdf-muted">
                    {item.hint}
                  </p>
                ) : null}

                <div className={['grid gap-2', cols].join(' ')}>
                  {options.map((option) => {
                    const optionId = `${key}-${option.value}`;
                    const selected = values[key] === option.value;

                    return (
                      <label
                        key={option.value}
                        htmlFor={optionId}
                        className={[
                          'flex cursor-pointer items-center justify-center px-2 py-2.5 text-center text-xs font-medium sm:text-sm',
                          optionBase,
                          selected
                            ? optionSelected
                            : error
                              ? optionError
                              : [
                                  optionIdle,
                                  'text-cdf-muted hover:text-cdf-ink',
                                ].join(' '),
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
                              [key]: option.value as AssetValue,
                            }));
                            clearError(key);
                          }}
                        />
                        {option.label}
                      </label>
                    );
                  })}
                </div>

                {error ? (
                  <p
                    id={`${key}-error`}
                    className="text-xs font-medium text-cdf-danger"
                    role="alert"
                  >
                    {error}
                  </p>
                ) : null}
              </fieldset>
            );
          })}
        </div>

        <fieldset
          className="space-y-1"
          aria-required
          aria-invalid={errors.needsContentHelp ? true : false}
          aria-describedby={
            errors.needsContentHelp
              ? 'needsContentHelp-error'
              : 'needsContentHelp-hint'
          }
        >
          <legend className="text-sm font-medium text-cdf-ink">
            {messages.assetsStep.helpLegend}
            <span className="text-cdf-muted" aria-hidden="true">
              {' '}
              *
            </span>
          </legend>

          {!errors.needsContentHelp ? (
            <p
              id="needsContentHelp-hint"
              className="text-xs leading-relaxed text-cdf-muted"
            >
              {messages.assetsStep.helpHint}
            </p>
          ) : null}

          <div className="grid grid-cols-2 gap-2">
            {(
              [
                { value: 'yes', label: messages.businessStep.yes },
                { value: 'no', label: messages.businessStep.no },
              ] as const
            ).map((option) => {
              const optionId = `needsContentHelp-${option.value}`;
              const selected = values.needsContentHelp === option.value;
              const error = errors.needsContentHelp;

              return (
                <label
                  key={option.value}
                  htmlFor={optionId}
                  className={[
                    'flex cursor-pointer items-center justify-center px-2 py-2.5 text-center text-xs font-medium sm:text-sm',
                    optionBase,
                    selected
                      ? optionSelected
                      : error
                        ? optionError
                        : [
                            optionIdle,
                            'text-cdf-muted hover:text-cdf-ink',
                          ].join(' '),
                  ].join(' ')}
                >
                  <input
                    id={optionId}
                    type="radio"
                    name="needsContentHelp"
                    value={option.value}
                    checked={selected}
                    className="sr-only"
                    onChange={() => {
                      setValues((current) => ({
                        ...current,
                        needsContentHelp: option.value,
                      }));
                      clearError('needsContentHelp');
                    }}
                  />
                  {option.label}
                </label>
              );
            })}
          </div>

          {errors.needsContentHelp ? (
            <p
              id="needsContentHelp-error"
              className="text-xs font-medium text-cdf-danger"
              role="alert"
            >
              {errors.needsContentHelp}
            </p>
          ) : null}
        </fieldset>
      </div>

      <div className={[stepNav, 'justify-between'].join(' ')}>
        <button
          type="button"
          className={btnGhost}
          onClick={() => setCurrentStep('needs')}
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
