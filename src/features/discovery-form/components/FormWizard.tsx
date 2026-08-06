import { useEffect } from 'react';
import { Alert } from '@components/feedback/Alert';
import type { Locale } from '@i18n/locales';
import { useDiscoveryForm } from '../hooks/use-discovery-form';
import { $formLocale } from '../stores/discovery-form.store';
import { ReviewSummary } from './ReviewSummary';
import { StepNavigation } from './StepNavigation';
import { StepProgress } from './StepProgress';
import { BusinessStep } from './steps/BusinessStep';
import { ContactStep } from './steps/ContactStep';
import { DesignStep } from './steps/DesignStep';
import { FeaturesStep } from './steps/FeaturesStep';
import { GoalsStep } from './steps/GoalsStep';
import { ProjectTypeStep } from './steps/ProjectTypeStep';
import { TimelineBudgetStep } from './steps/TimelineBudgetStep';

type FormWizardProps = {
  locale: Locale;
};

export function FormWizard({ locale }: FormWizardProps) {
  const {
    state,
    messages,
    activeSteps,
    currentIndex,
    isFirstStep,
    isLastStep,
    goToStep,
    update,
    next,
    back,
    submit,
  } = useDiscoveryForm();

  useEffect(() => {
    $formLocale.set(locale);
  }, [locale]);

  const step = messages.steps[state.currentStepId];

  return (
    <div className="mx-auto w-full max-w-2xl space-y-8">
      <header className="space-y-2">
        <h1 className="font-display text-3xl text-cdf-ink md:text-4xl">
          {step.title}
        </h1>
        <p className="text-cdf-muted">{step.description}</p>
      </header>

      <StepProgress
        messages={messages}
        activeSteps={activeSteps}
        currentStepId={state.currentStepId}
        currentIndex={currentIndex}
      />

      <div className="rounded-xl border border-cdf-border/80 bg-white/70 p-5 shadow-sm backdrop-blur md:p-6">
        {state.currentStepId === 'contact' ? (
          <ContactStep
            messages={messages}
            value={state.data}
            errors={state.errors}
            onChange={update}
          />
        ) : null}

        {state.currentStepId === 'business' ? (
          <BusinessStep
            messages={messages}
            value={state.data}
            errors={state.errors}
            onChange={update}
          />
        ) : null}

        {state.currentStepId === 'project-type' ? (
          <ProjectTypeStep
            messages={messages}
            value={state.data}
            errors={state.errors}
            onChange={update}
          />
        ) : null}

        {state.currentStepId === 'goals' ? (
          <GoalsStep
            messages={messages}
            value={state.data}
            errors={state.errors}
            onChange={update}
          />
        ) : null}

        {state.currentStepId === 'features' ? (
          <FeaturesStep
            messages={messages}
            value={state.data}
            errors={state.errors}
            onChange={update}
          />
        ) : null}

        {state.currentStepId === 'design' ? (
          <DesignStep
            messages={messages}
            value={state.data}
            errors={state.errors}
            onChange={update}
          />
        ) : null}

        {state.currentStepId === 'timeline-budget' ? (
          <TimelineBudgetStep
            messages={messages}
            value={state.data}
            errors={state.errors}
            onChange={update}
          />
        ) : null}

        {state.currentStepId === 'review' ? (
          <ReviewSummary
            messages={messages}
            data={state.data}
            onEditStep={goToStep}
          />
        ) : null}

        {state.submitError ? (
          <div className="mt-4">
            <Alert tone="error">{state.submitError}</Alert>
          </div>
        ) : null}

        <div className="mt-6">
          <StepNavigation
            messages={messages}
            isFirstStep={isFirstStep}
            isLastStep={isLastStep}
            isSubmitting={state.status === 'submitting'}
            onBack={back}
            onNext={next}
            onSubmit={submit}
          />
        </div>
      </div>
    </div>
  );
}
