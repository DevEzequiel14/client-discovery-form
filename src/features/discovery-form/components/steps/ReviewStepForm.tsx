import { useEffect } from 'react';
import { useStore } from '@nanostores/react';
import { Alert } from '@components/feedback/Alert';
import { getMessages, type Locale } from '@i18n/index';
import { btnGhost, btnPrimary, stepNav } from '@lib/ui-classes';
import { zodErrorToFieldErrors } from '../../lib/field-errors';
import { createDiscoveryFormSchema } from '../../schemas/discovery-form.schema';
import { submitDiscoveryForm } from '../../services/submit-discovery-form';
import {
  $discoveryForm,
  $formLocale,
  editStepFromReview,
  markSubmitted,
  setCurrentStep,
  setFieldErrors,
  setFormStatus,
  setSubmitError,
} from '../../stores/discovery-form.store';
import { ReviewSummary } from '../ReviewSummary';

type ReviewStepFormProps = {
  locale: Locale;
};

export function ReviewStepForm({ locale }: ReviewStepFormProps) {
  const form = useStore($discoveryForm);
  const messages = getMessages(locale);
  const isSubmitting = form.status === 'submitting';

  useEffect(() => {
    $formLocale.set(locale);
  }, [locale]);

  async function handleSubmit(event: { preventDefault: () => void }) {
    event.preventDefault();
    setFormStatus('submitting');
    setSubmitError(null);

    const schema = createDiscoveryFormSchema(messages.validation);
    const result = schema.safeParse(form.data);

    if (!result.success) {
      setFieldErrors(zodErrorToFieldErrors(result.error));
      setFormStatus('error');
      setSubmitError(messages.form.submitError);
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

  return (
    <form className="space-y-5" noValidate onSubmit={handleSubmit}>
      <div className="space-y-3">
        <p className="text-sm text-cdf-muted">{messages.reviewStep.hint}</p>
        <ReviewSummary
          messages={messages}
          data={form.data}
          onEditStep={editStepFromReview}
        />
      </div>

      <div className="space-y-1.5">
        <p className="text-sm leading-relaxed text-cdf-muted">
          {messages.reviewStep.afterSend}
        </p>
        <p className="text-xs leading-relaxed text-cdf-muted">
          {messages.reviewStep.privacyNote}
        </p>
      </div>

      {form.submitError ? (
        <Alert tone="error">{form.submitError}</Alert>
      ) : null}

      <div className={[stepNav, 'justify-between'].join(' ')}>
        <button
          type="button"
          className={btnGhost}
          onClick={() => setCurrentStep('extras')}
          disabled={isSubmitting}
        >
          {messages.common.back}
        </button>
        <button
          type="submit"
          className={[btnPrimary, 'min-w-44'].join(' ')}
          disabled={isSubmitting}
        >
          {isSubmitting ? messages.common.submitting : messages.common.submit}
        </button>
      </div>
    </form>
  );
}
