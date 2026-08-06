import { useEffect } from 'react';
import { useStore } from '@nanostores/react';
import { t, getMessages, type Locale } from '@i18n/index';
import { STEP_IDS } from '../types/steps';
import {
  $discoveryForm,
  $formLocale,
} from '../stores/discovery-form.store';
import { BusinessStepForm } from './steps/BusinessStepForm';
import { ContactStepForm } from './steps/ContactStepForm';

type DiscoveryWizardProps = {
  locale: Locale;
};

const ACTIVE_STEPS = ['contact', 'business'] as const;

export function DiscoveryWizard({ locale }: DiscoveryWizardProps) {
  const form = useStore($discoveryForm);
  const messages = getMessages(locale);

  useEffect(() => {
    $formLocale.set(locale);
  }, [locale]);

  const stepId =
    form.currentStepId === 'business' ? 'business' : 'contact';
  const stepIndex = ACTIVE_STEPS.indexOf(stepId);
  const current = stepIndex + 1;
  const total = STEP_IDS.length;
  const percent = Math.round((current / total) * 100);
  const step = messages.steps[stepId];

  return (
    <section
      className="mx-auto w-full max-w-xl space-y-8"
      aria-labelledby="active-step-title"
    >
      <div className="space-y-3" aria-label={messages.form.progressLabel}>
        <div className="flex items-center justify-between gap-4 text-sm text-cdf-muted">
          <p>
            {t(messages.form.stepOf, {
              current,
              total,
            })}
          </p>
          <p className="font-medium text-cdf-ink">{step.title}</p>
        </div>
        <div
          className="h-1.5 overflow-hidden rounded-full bg-cdf-border/70"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={percent}
          aria-label={messages.form.progressLabel}
        >
          <div
            className="h-full rounded-full bg-cdf-accent transition-all duration-300"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>

      <header className="space-y-2">
        <h1
          id="active-step-title"
          className="font-display text-3xl leading-tight text-cdf-ink md:text-4xl"
        >
          {step.title}
        </h1>
        <p className="max-w-prose text-base text-cdf-muted md:text-lg">
          {step.description}
        </p>
      </header>

      {stepId === 'business' ? (
        <BusinessStepForm locale={locale} />
      ) : (
        <ContactStepForm locale={locale} />
      )}
    </section>
  );
}
