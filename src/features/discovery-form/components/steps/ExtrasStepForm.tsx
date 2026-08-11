import { useEffect, useState } from 'react';
import { useStore } from '@nanostores/react';
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
  if (!trimmed) return seed;
  return `${trimmed}\n\n${seed}`;
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

  return (
    <form className="space-y-5" noValidate onSubmit={handleContinue}>
      <div className={['space-y-4', stepCard].join(' ')}>
        <div className="flex flex-col gap-2">
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
            rows={6}
            placeholder={messages.extrasStep.writePlaceholder}
            aria-describedby="additionalNotes-hint"
            className="min-h-36 w-full resize-y rounded-md border border-cdf-border bg-white px-3.5 py-3 text-base leading-relaxed text-cdf-ink shadow-sm transition placeholder:text-cdf-muted/70 hover:border-cdf-ink/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cdf-accent md:text-sm"
            onChange={(event) => {
              setNotes(event.target.value);
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

      <div className={[stepNav, 'justify-between'].join(' ')}>
        <button
          type="button"
          className={btnGhost}
          onClick={() => setCurrentStep('timeline-budget')}
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
