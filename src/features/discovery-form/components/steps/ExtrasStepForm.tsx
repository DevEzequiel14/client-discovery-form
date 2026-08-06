import { useEffect, useState } from 'react';
import { useStore } from '@nanostores/react';
import { getMessages, type Locale } from '@i18n/index';
import { createExtrasSchema } from '../../schemas/extras.schema';
import {
  $discoveryForm,
  $formLocale,
  completeStepAndGo,
  patchFormData,
  setCurrentStep,
  setFieldErrors,
  setFormStatus,
} from '../../stores/discovery-form.store';
import { NOTE_PROMPTS, type NotePrompt } from '../../types/steps';

type ExtrasStepFormProps = {
  locale: Locale;
};

function appendPrompt(current: string, seed: string): string {
  const trimmed = current.trim();
  if (trimmed.includes(seed.trim())) return current;
  if (!trimmed) return `${seed} `;
  return `${trimmed}\n\n${seed} `;
}

export function ExtrasStepForm({ locale }: ExtrasStepFormProps) {
  const form = useStore($discoveryForm);
  const messages = getMessages(locale);

  const [notes, setNotes] = useState(form.data.additionalNotes ?? '');
  const [activePrompts, setActivePrompts] = useState<NotePrompt[]>([]);

  useEffect(() => {
    $formLocale.set(locale);
  }, [locale]);

  function togglePrompt(prompt: NotePrompt) {
    const seed = messages.extrasStep.prompts[prompt].seed;

    setActivePrompts((current) => {
      const isActive = current.includes(prompt);
      if (isActive) {
        return current.filter((item) => item !== prompt);
      }
      setNotes((value) => appendPrompt(value, seed));
      return [...current, prompt];
    });
  }

  function handleContinue(event: { preventDefault: () => void }) {
    event.preventDefault();
    setFormStatus('validating');

    const schema = createExtrasSchema(messages.validation);
    const result = schema.safeParse({ additionalNotes: notes });

    if (!result.success) {
      setFormStatus('idle');
      return;
    }

    patchFormData({
      additionalNotes: result.data.additionalNotes,
    });
    setFieldErrors({});
    setFormStatus('idle');
    completeStepAndGo('review');
  }

  const characterCount = notes.trim().length;

  return (
    <form className="space-y-6" noValidate onSubmit={handleContinue}>
      <div className="space-y-5 rounded-xl border border-cdf-border/80 bg-white/75 p-5 shadow-sm backdrop-blur sm:p-6">
        <div className="space-y-2">
          <p className="text-sm font-medium text-cdf-ink">
            {messages.extrasStep.listenLabel}
          </p>
          <ul className="space-y-1.5 text-sm leading-relaxed text-cdf-muted">
            {messages.extrasStep.listenPoints.map((point) => (
              <li key={point} className="flex gap-2">
                <span className="mt-2 size-1 shrink-0 rounded-full bg-cdf-accent/70" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium text-cdf-ink">
            {messages.extrasStep.promptsLabel}
          </p>
          <p className="text-xs leading-relaxed text-cdf-muted">
            {messages.extrasStep.promptsHint}
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
                    'rounded-md border px-3 py-2 text-left text-sm transition',
                    active
                      ? 'border-cdf-accent bg-cdf-accent/5 text-cdf-ink ring-1 ring-cdf-accent/25'
                      : 'border-cdf-border bg-white text-cdf-ink hover:border-cdf-ink/25',
                  ].join(' ')}
                  onClick={() => togglePrompt(prompt)}
                >
                  {messages.extrasStep.prompts[prompt].label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <label
              htmlFor="additionalNotes"
              className="text-sm font-medium text-cdf-ink"
            >
              {messages.extrasStep.writeLabel}
            </label>
            <span className="text-xs font-medium text-cdf-muted">
              {messages.common.optional}
            </span>
          </div>

          <textarea
            id="additionalNotes"
            name="additionalNotes"
            value={notes}
            rows={7}
            placeholder={messages.extrasStep.writePlaceholder}
            aria-describedby="additionalNotes-hint"
            className="min-h-44 w-full resize-y rounded-md border border-cdf-border bg-white px-3.5 py-3 text-base leading-relaxed text-cdf-ink shadow-sm transition placeholder:text-cdf-muted/70 hover:border-cdf-ink/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cdf-accent md:text-sm"
            onChange={(event) => {
              setNotes(event.target.value);
            }}
          />

          <div className="flex flex-wrap items-center justify-between gap-2">
            <p
              id="additionalNotes-hint"
              className="text-xs leading-relaxed text-cdf-muted"
            >
              {messages.extrasStep.writeHint}
            </p>
            {characterCount > 0 ? (
              <p className="text-xs text-cdf-muted">
                {messages.extrasStep.readingNote}
              </p>
            ) : null}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          className="inline-flex min-h-11 items-center justify-center rounded-md px-4 py-2.5 text-sm font-medium text-cdf-ink transition hover:bg-black/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cdf-accent"
          onClick={() => setCurrentStep('timeline-budget')}
        >
          {messages.common.back}
        </button>
        <button
          type="submit"
          className="inline-flex min-h-11 min-w-36 items-center justify-center rounded-md bg-cdf-accent px-5 py-2.5 text-sm font-medium text-white transition hover:bg-cdf-accent-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cdf-accent disabled:opacity-60"
          disabled={form.status === 'validating'}
        >
          {messages.common.continue}
        </button>
      </div>
    </form>
  );
}
