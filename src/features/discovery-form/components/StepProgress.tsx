import { t } from '@i18n/index';
import type { Messages } from '@i18n/types';
import type { StepId } from '../types/steps';
import { getStepPhase } from '../lib/step-phase';

type StepProgressProps = {
  messages: Messages;
  activeSteps: StepId[];
  currentStepId: StepId;
  currentIndex: number;
};

export function StepProgress({
  messages,
  activeSteps,
  currentStepId,
  currentIndex,
}: StepProgressProps) {
  const total = activeSteps.length;
  const percent = Math.round(((currentIndex + 1) / total) * 100);
  const phase = getStepPhase(currentStepId);
  // Single-step phases already match a clear H1; the label adds little.
  const showPhase =
    currentStepId !== 'contact' && currentStepId !== 'business';

  return (
    <div className="space-y-3" aria-label={messages.form.progressLabel}>
      <div
        className={[
          'flex items-center gap-4 text-sm text-cdf-muted',
          showPhase ? 'justify-between' : '',
        ].join(' ')}
      >
        <p>
          {t(messages.form.stepOf, {
            current: currentIndex + 1,
            total,
          })}
        </p>
        {showPhase ? (
          <p className="font-medium text-cdf-ink">
            {messages.form.phases[phase]}
          </p>
        ) : null}
      </div>
      <div
        className="h-1.5 overflow-hidden rounded-full bg-cdf-border/70"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percent}
      >
        <div
          className="h-full rounded-full bg-cdf-accent transition-all duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
