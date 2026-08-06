import { useStore } from '@nanostores/react';
import { getMessages } from '@i18n/index';
import { getActiveSteps } from '../constants/steps';
import { zodErrorToFieldErrors } from '../lib/field-errors';
import { getStepSchema, createDiscoveryFormSchema } from '../schemas';
import { submitDiscoveryForm } from '../services/submit-discovery-form';
import {
  $discoveryForm,
  $formLocale,
  markSubmitted,
  patchFormData,
  setCurrentStep,
  setFieldErrors,
  setFormStatus,
  setSubmitError,
} from '../stores/discovery-form.store';
import type { PartialDiscoveryForm } from '../types/form';
import type { StepId } from '../types/steps';

export function useDiscoveryForm() {
  const state = useStore($discoveryForm);
  const locale = useStore($formLocale);
  const messages = getMessages(locale);
  const activeSteps = getActiveSteps(state.data);
  const currentIndex = Math.max(0, activeSteps.indexOf(state.currentStepId));
  const isFirstStep = currentIndex <= 0;
  const isLastStep = state.currentStepId === 'review';

  function goToStep(stepId: StepId) {
    if (!activeSteps.includes(stepId)) return;
    setCurrentStep(stepId);
  }

  function update(patch: PartialDiscoveryForm) {
    patchFormData(patch);
  }

  function validateCurrentStep(): boolean {
    const schema = getStepSchema(
      state.currentStepId,
      messages.validation,
    );
    const result = schema.safeParse(state.data);

    if (!result.success) {
      setFieldErrors(zodErrorToFieldErrors(result.error));
      setFormStatus('idle');
      return false;
    }

    setFieldErrors({});
    return true;
  }

  function next() {
    setFormStatus('validating');

    if (!validateCurrentStep()) return;

    const nextStep = activeSteps[currentIndex + 1];
    if (nextStep) {
      setCurrentStep(nextStep);
    }

    setFormStatus('idle');
  }

  function back() {
    const prevStep = activeSteps[currentIndex - 1];
    if (prevStep) {
      setCurrentStep(prevStep);
    }
  }

  async function submit() {
    setFormStatus('submitting');
    setSubmitError(null);

    const schema = createDiscoveryFormSchema(messages.validation);
    const result = schema.safeParse(state.data);

    if (!result.success) {
      setFieldErrors(zodErrorToFieldErrors(result.error));
      setFormStatus('error');
      setSubmitError(messages.form.submitError);
      setCurrentStep('review');
      return;
    }

    const response = await submitDiscoveryForm({
      locale,
      data: result.data,
    });

    if (!response.ok) {
      setFormStatus('error');
      setSubmitError(messages.form.submitError);
      return;
    }

    markSubmitted(response.submissionId);
    window.location.assign(
      `/${locale}/gracias?ref=${encodeURIComponent(response.submissionId)}`,
    );
  }

  return {
    state,
    locale,
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
  };
}
