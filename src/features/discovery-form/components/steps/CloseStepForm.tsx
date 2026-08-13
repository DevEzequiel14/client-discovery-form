import { useState } from 'react';
import { useStore } from '@nanostores/react';
import { Alert } from '@components/feedback/Alert';
import { getMessages, type Locale } from '@i18n/index';
import {
  btnGhost,
  btnPrimary,
  optionBase,
  optionIdle,
  optionSelected,
  stepCard,
  stepNav,
} from '@lib/ui-classes';
import { zodErrorToFieldErrors } from '../../lib/field-errors';
import { createDiscoveryFormSchema, getFirstInvalidStep } from '../../schemas';
import { createExtrasSchema } from '../../schemas/extras.schema';
import { submitDiscoveryForm } from '../../services/submit-discovery-form';
import {
  $discoveryForm,
  editStepFromReview,
  markSubmitted,
  patchFormData,
  setCurrentStep,
  setFieldErrors,
  setFormStatus,
  setSubmitError,
} from '../../stores/discovery-form.store';
import { NOTE_PROMPTS, type NotePrompt } from '../../types/steps';
import { ReviewSummary } from '../ReviewSummary';

type CloseStepFormProps = {
  locale: Locale;
};

function appendPrompt(current: string, seed: string): string {
  const trimmed = current.trim();
  if (trimmed.includes(seed.trim())) return current;
  if (!trimmed) return seed;
  return `${trimmed}\n\n${seed}`;
}

export function CloseStepForm({ locale }: CloseStepFormProps) {
  const form = useStore($discoveryForm);
  const messages = getMessages(locale);
  const isSubmitting = form.status === 'submitting';
  const notes = form.data.additionalNotes ?? '';
  const [activePrompts, setActivePrompts] = useState<NotePrompt[]>([]);

  function togglePrompt(prompt: NotePrompt) {
    const seed = messages.extrasStep.prompts[prompt].seed;

    setActivePrompts((current) => {
      const isActive = current.includes(prompt);
      if (isActive) {
        return current.filter((item) => item !== prompt);
      }
      patchFormData({ additionalNotes: appendPrompt(notes, seed) });
      return [...current, prompt];
    });
  }

  async function handleSubmit(event: { preventDefault: () => void }) {
    event.preventDefault();
    setFormStatus('submitting');
    setSubmitError(null);

    const extras = createExtrasSchema(messages.validation).safeParse({
      additionalNotes: notes,
    });

    const payload = {
      ...form.data,
      additionalNotes: extras.success
        ? extras.data.additionalNotes
        : notes,
    };

    if (extras.success) {
      patchFormData({ additionalNotes: extras.data.additionalNotes });
    }

    const schema = createDiscoveryFormSchema(messages.validation);
    const result = schema.safeParse(payload);

    if (!result.success) {
      setFieldErrors(zodErrorToFieldErrors(result.error));
      const invalidStep = getFirstInvalidStep(payload, messages.validation);
      setFormStatus('error');
      setSubmitError(messages.form.submitError);
      if (invalidStep) setCurrentStep(invalidStep);
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
      <div className={['space-y-4', stepCard].join(' ')}>
        <div className="flex flex-col gap-2">
          <h2 className="text-sm font-medium text-cdf-ink">
            {messages.form.sections.notes}
          </h2>
          <label
            htmlFor="additionalNotes"
            className="text-sm font-medium text-cdf-ink"
          >
            {messages.extrasStep.writeLabel}
          </label>

          <div className="space-y-2">
            <p className="text-xs text-cdf-muted">
              {messages.extrasStep.promptsLabel}
            </p>
            <div className="flex flex-wrap gap-2">
              {NOTE_PROMPTS.map((prompt) => {
                const active = activePrompts.includes(prompt);
                return (
                  <button
                    key={prompt}
                    type="button"
                    aria-pressed={active}
                    className={[
                      'px-3 py-2 text-left text-sm',
                      optionBase,
                      active ? optionSelected : optionIdle,
                    ].join(' ')}
                    onClick={() => togglePrompt(prompt)}
                  >
                    {messages.extrasStep.prompts[prompt].label}
                  </button>
                );
              })}
            </div>
          </div>

          <textarea
            id="additionalNotes"
            name="additionalNotes"
            value={notes}
            rows={5}
            placeholder={messages.extrasStep.writePlaceholder}
            aria-describedby="additionalNotes-hint"
            className="min-h-32 w-full resize-y rounded-md border border-cdf-border bg-white px-3.5 py-3 text-base leading-relaxed text-cdf-ink shadow-sm transition placeholder:text-cdf-muted/70 hover:border-cdf-ink/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cdf-accent md:text-sm"
            onChange={(event) => {
              patchFormData({ additionalNotes: event.target.value });
            }}
          />

          <p
            id="additionalNotes-hint"
            className="text-xs leading-relaxed text-cdf-muted"
          >
            {messages.extrasStep.writeHint}
          </p>
        </div>
      </div>

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

      {form.submitError ? <Alert tone="error">{form.submitError}</Alert> : null}

      <div className={[stepNav, 'justify-between'].join(' ')}>
        <button
          type="button"
          className={btnGhost}
          onClick={() => setCurrentStep('approach')}
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
