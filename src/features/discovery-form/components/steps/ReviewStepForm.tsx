import { useEffect } from 'react';
import { useStore } from '@nanostores/react';
import { Alert } from '@components/feedback/Alert';
import { getMessages, type Locale } from '@i18n/index';
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
    <form className="space-y-6" noValidate onSubmit={handleSubmit}>
      <div className="rounded-xl border border-cdf-accent/20 bg-cdf-accent/[0.04] px-4 py-3.5 sm:px-5">
        <p className="text-sm font-medium text-cdf-ink">
          {messages.reviewStep.trustTitle}
        </p>
        <p className="mt-1 text-sm leading-relaxed text-cdf-muted">
          {messages.reviewStep.trustBody}
        </p>
      </div>

      <div className="space-y-2">
        <p className="text-sm text-cdf-muted">{messages.reviewStep.hint}</p>
        <ReviewSummary
          messages={messages}
          data={form.data}
          onEditStep={editStepFromReview}
        />
      </div>

      <div className="rounded-xl border border-cdf-border/80 bg-white/75 p-4 shadow-sm sm:p-5">
        <p className="text-sm font-medium text-cdf-ink">
          {messages.reviewStep.nextTitle}
        </p>
        <ul className="mt-2 space-y-1.5 text-sm leading-relaxed text-cdf-muted">
          {messages.reviewStep.nextPoints.map((point) => (
            <li key={point} className="flex gap-2">
              <span className="mt-2 size-1 shrink-0 rounded-full bg-cdf-accent/70" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-xs leading-relaxed text-cdf-muted">
          {messages.reviewStep.privacyNote}
        </p>
      </div>

      {form.submitError ? (
        <Alert tone="error">{form.submitError}</Alert>
      ) : null}

      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          className="inline-flex min-h-11 items-center justify-center rounded-md px-4 py-2.5 text-sm font-medium text-cdf-ink transition hover:bg-black/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cdf-accent"
          onClick={() => setCurrentStep('extras')}
          disabled={isSubmitting}
        >
          {messages.common.back}
        </button>
        <button
          type="submit"
          className="inline-flex min-h-11 min-w-44 items-center justify-center rounded-md bg-cdf-accent px-5 py-2.5 text-sm font-medium text-white transition hover:bg-cdf-accent-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cdf-accent disabled:opacity-60"
          disabled={isSubmitting}
        >
          {isSubmitting ? messages.common.submitting : messages.common.submit}
        </button>
      </div>
    </form>
  );
}
