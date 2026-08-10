import { useEffect } from 'react';
import { useStore } from '@nanostores/react';
import { getMessages, type Locale } from '@i18n/index';
import type { StepId } from '../types/steps';
import {
  $discoveryForm,
  $formLocale,
} from '../stores/discovery-form.store';
import { AssetsStepForm } from './steps/AssetsStepForm';
import { BusinessStepForm } from './steps/BusinessStepForm';
import { ContactStepForm } from './steps/ContactStepForm';
import { DesignStepForm } from './steps/DesignStepForm';
import { ExtrasStepForm } from './steps/ExtrasStepForm';
import { NeedsStepForm } from './steps/NeedsStepForm';
import { ReviewStepForm } from './steps/ReviewStepForm';
import { TechnicalStepForm } from './steps/TechnicalStepForm';
import { TimelineBudgetStepForm } from './steps/TimelineBudgetStepForm';
import { StepProgress } from './StepProgress';

type DiscoveryWizardProps = {
  locale: Locale;
};

const ACTIVE_STEPS = [
  'contact',
  'business',
  'needs',
  'assets',
  'design',
  'technical',
  'timeline-budget',
  'extras',
  'review',
] as const;
type ActiveStep = (typeof ACTIVE_STEPS)[number];

function resolveActiveStep(stepId: StepId): ActiveStep {
  if (
    stepId === 'business' ||
    stepId === 'needs' ||
    stepId === 'assets' ||
    stepId === 'design' ||
    stepId === 'technical' ||
    stepId === 'timeline-budget' ||
    stepId === 'extras' ||
    stepId === 'review'
  ) {
    return stepId;
  }
  return 'contact';
}

export function DiscoveryWizard({ locale }: DiscoveryWizardProps) {
  const form = useStore($discoveryForm);
  const messages = getMessages(locale);

  useEffect(() => {
    $formLocale.set(locale);
  }, [locale]);

  const stepId = resolveActiveStep(form.currentStepId);
  const stepIndex = ACTIVE_STEPS.indexOf(stepId);
  const step = messages.steps[stepId];
  const stepDescription = step.description.trim();

  return (
    <section
      className={[
        'mx-auto w-full',
        stepId === 'contact' ||
        stepId === 'business' ||
        stepId === 'needs' ||
        stepId === 'assets' ||
        stepId === 'design'
          ? 'space-y-6'
          : 'space-y-8',
        stepId === 'review' ? 'max-w-2xl' : 'max-w-xl',
      ].join(' ')}
      aria-labelledby="active-step-title"
    >
      <StepProgress
        messages={messages}
        activeSteps={[...ACTIVE_STEPS]}
        currentStepId={stepId}
        currentIndex={stepIndex}
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

      {stepId === 'review' ? (
        <ReviewStepForm locale={locale} />
      ) : stepId === 'extras' ? (
        <ExtrasStepForm locale={locale} />
      ) : stepId === 'timeline-budget' ? (
        <TimelineBudgetStepForm locale={locale} />
      ) : stepId === 'technical' ? (
        <TechnicalStepForm locale={locale} />
      ) : stepId === 'design' ? (
        <DesignStepForm locale={locale} />
      ) : stepId === 'assets' ? (
        <AssetsStepForm locale={locale} />
      ) : stepId === 'needs' ? (
        <NeedsStepForm locale={locale} />
      ) : stepId === 'business' ? (
        <BusinessStepForm locale={locale} />
      ) : (
        <ContactStepForm locale={locale} />
      )}
    </section>
  );
}
