import { useEffect } from 'react';
import { useStore } from '@nanostores/react';
import { getMessages, type Locale } from '@i18n/index';
import { btnGhost, btnPrimary } from '@lib/ui-classes';
import { STEP_IDS, type StepId } from '../types/steps';
import {
  $discoveryForm,
  $formLocale,
  dismissDraftBanner,
  hydrateDiscoveryFormFromStorage,
  resetDiscoveryForm,
} from '../stores/discovery-form.store';
import { ApproachStepForm } from './steps/ApproachStepForm';
import { CloseStepForm } from './steps/CloseStepForm';
import { IdentityStepForm } from './steps/IdentityStepForm';
import { NeedsStepForm } from './steps/NeedsStepForm';
import { ReadinessStepForm } from './steps/ReadinessStepForm';
import { StepProgress } from './StepProgress';

type DiscoveryWizardProps = {
  locale: Locale;
};

function resolveActiveStep(stepId: StepId): StepId {
  return STEP_IDS.includes(stepId) ? stepId : 'identity';
}

export function DiscoveryWizard({ locale }: DiscoveryWizardProps) {
  const form = useStore($discoveryForm);
  const messages = getMessages(locale);

  useEffect(() => {
    $formLocale.set(locale);
    hydrateDiscoveryFormFromStorage();
  }, [locale]);

  const stepId = resolveActiveStep(form.currentStepId);
  const stepIndex = STEP_IDS.indexOf(stepId);
  const step = messages.steps[stepId];
  const stepDescription = step.description.trim();

  return (
    <section
      className={[
        'mx-auto w-full space-y-6',
        stepId === 'close' ? 'max-w-2xl' : 'max-w-xl',
      ].join(' ')}
      aria-labelledby="active-step-title"
    >
      {form.showDraftBanner ? (
        <div className="flex flex-col gap-3 rounded-xl border border-cdf-border/80 bg-cdf-surface-elevated px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-cdf-ink">{messages.form.draftBanner}</p>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              className={btnGhost}
              onClick={resetDiscoveryForm}
            >
              {messages.common.draftRestart}
            </button>
            <button
              type="button"
              className={btnPrimary}
              onClick={dismissDraftBanner}
            >
              {messages.common.draftContinue}
            </button>
          </div>
        </div>
      ) : null}

      <StepProgress
        messages={messages}
        activeSteps={[...STEP_IDS]}
        currentStepId={stepId}
        currentIndex={Math.max(0, stepIndex)}
      />

      <header className={stepDescription ? 'space-y-2' : undefined}>
        <h1
          id="active-step-title"
          className="font-display text-3xl leading-tight text-cdf-ink md:text-4xl"
        >
          {step.title}
        </h1>
        {stepDescription ? (
          <p className="max-w-prose text-base text-cdf-muted md:text-lg">
            {stepDescription}
          </p>
        ) : null}
      </header>

      {stepId === 'close' ? (
        <CloseStepForm locale={locale} />
      ) : stepId === 'approach' ? (
        <ApproachStepForm locale={locale} />
      ) : stepId === 'readiness' ? (
        <ReadinessStepForm locale={locale} />
      ) : stepId === 'needs' ? (
        <NeedsStepForm locale={locale} />
      ) : (
        <IdentityStepForm locale={locale} />
      )}
    </section>
  );
}
