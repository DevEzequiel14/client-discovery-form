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
  optionSelected,
  stepCard,
  stepNav,
} from '@lib/ui-classes';
import { StyleMoodboard } from '../StyleMoodboard';
import { useStepErrors } from '../../hooks/use-step-errors';
import { createReadinessSchema } from '../../schemas';
import {
  $discoveryForm,
  completeStepAndGo,
  patchFormData,
  setCurrentStep,
  setFormStatus,
} from '../../stores/discovery-form.store';
import type { AssetsData, DesignData } from '../../types/form';
import {
  ASSET_KEYS,
  BRAND_STYLE_STATUS,
  CONTENT_AMOUNT,
  DESIGN_STYLES,
  LOGO_STATUS,
  type AssetKey,
  type BrandStyleStatus,
  type ContentAmount,
  type DesignStyle,
  type HasReferences,
  type LogoStatus,
} from '../../types/steps';

type ReadinessStepFormProps = {
  locale: Locale;
};

type ReadinessField = keyof (AssetsData & DesignData);

const FIELD_ORDER = [
  ...ASSET_KEYS,
  'needsContentHelp',
  'designStyle',
  'designStyleNote',
  'hasReferences',
  'referenceUrls',
  'designTaste',
] as const satisfies readonly ReadinessField[];

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

export function ReadinessStepForm({ locale }: ReadinessStepFormProps) {
  const form = useStore($discoveryForm);
  const messages = getMessages(locale);
  const { errors, clearError, applyZodFailure, clearAll } =
    useStepErrors(FIELD_ORDER);

  const values = {
    logo: (form.data.logo ?? '') as LogoStatus | '',
    photos: (form.data.photos ?? '') as ContentAmount | '',
    texts: (form.data.texts ?? '') as ContentAmount | '',
    visualIdentity: (form.data.visualIdentity ?? '') as BrandStyleStatus | '',
    needsContentHelp: (form.data.needsContentHelp ?? '') as 'yes' | 'no' | '',
    designStyle: (form.data.designStyle ?? '') as DesignStyle | '',
    designStyleNote: form.data.designStyleNote ?? '',
    hasReferences: (form.data.hasReferences ?? '') as HasReferences | '',
    referenceUrls: form.data.referenceUrls ?? '',
    designTaste: form.data.designTaste ?? '',
  };

  function handleContinue(event: { preventDefault: () => void }) {
    event.preventDefault();
    setFormStatus('validating');

    const result = createReadinessSchema(messages.validation).safeParse({
      logo: values.logo || undefined,
      photos: values.photos || undefined,
      texts: values.texts || undefined,
      visualIdentity: values.visualIdentity || undefined,
      needsContentHelp: values.needsContentHelp || undefined,
      designStyle: values.designStyle || undefined,
      designStyleNote: values.designStyleNote,
      hasReferences: values.hasReferences || undefined,
      referenceUrls: values.referenceUrls,
      designTaste: values.designTaste,
    });

    if (!result.success) {
      applyZodFailure(result.error);
      setFormStatus('idle');
      return;
    }

    patchFormData({
      ...result.data,
      designStyleNote:
        result.data.designStyle === 'other'
          ? (result.data.designStyleNote ?? '')
          : '',
      referenceUrls:
        result.data.hasReferences === 'yes'
          ? (result.data.referenceUrls ?? '')
          : '',
      designTaste: result.data.designTaste ?? '',
    });
    clearAll();
    setFormStatus('idle');
    completeStepAndGo('approach');
  }

  const styleHintId = errors.designStyle
    ? 'designStyle-error'
    : 'designStyle-hint';

  return (
    <form className="space-y-5" noValidate onSubmit={handleContinue}>
      <div className={['space-y-5', stepCard].join(' ')}>
        <h2 className="text-sm font-medium text-cdf-ink">
          {messages.form.sections.assets}
        </h2>

        {ASSET_KEYS.map((key) => {
          const item = messages.assetsStep.items[key];
          const error = errors[key];
          const options = optionsForKey(key, messages);
          const cols = options.length === 2 ? 'grid-cols-2' : 'grid-cols-3';

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
                            : [optionIdle, 'text-cdf-muted hover:text-cdf-ink'].join(
                                ' ',
                              ),
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
                          patchFormData({ [key]: option.value as AssetValue });
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
                        : [optionIdle, 'text-cdf-muted hover:text-cdf-ink'].join(
                            ' ',
                          ),
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
                      patchFormData({ needsContentHelp: option.value });
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

      <div className={['space-y-4', stepCard].join(' ')}>
        <h2 className="text-sm font-medium text-cdf-ink">
          {messages.form.sections.design}
        </h2>

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

          <div className="grid gap-3 sm:grid-cols-2">
            {DESIGN_STYLES.map((style) => {
              const option = messages.designStep.styleOptions[style];
              const optionId = `designStyle-${style}`;
              const selected = values.designStyle === style;

              return (
                <label
                  key={style}
                  htmlFor={optionId}
                  className={[
                    'flex cursor-pointer flex-col overflow-hidden',
                    optionBase,
                    style === 'other' ? 'sm:col-span-2' : '',
                    selected
                      ? optionSelected
                      : errors.designStyle
                        ? optionError
                        : optionIdle,
                  ].join(' ')}
                >
                  <StyleMoodboard style={style} />
                  <span className="flex gap-3 px-3.5 py-3">
                    <input
                      id={optionId}
                      type="radio"
                      name="designStyle"
                      value={style}
                      checked={selected}
                      className="mt-1 size-4 shrink-0 accent-cdf-accent"
                      onChange={() => {
                        patchFormData({
                          designStyle: style,
                          designStyleNote:
                            style === 'other' ? values.designStyleNote : '',
                        });
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
              patchFormData({ designStyleNote: event.target.value });
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
            patchFormData({
              hasReferences: value as HasReferences,
              referenceUrls: value === 'no' ? '' : values.referenceUrls,
            });
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
              patchFormData({ referenceUrls: event.target.value });
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
            patchFormData({ designTaste: event.target.value });
            clearError('designTaste');
          }}
        />
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
