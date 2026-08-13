import { t } from '@i18n/index';
import type { Messages } from '@i18n/types';
import type { StepId } from '../types/steps';

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
  const stepLabel = t(messages.form.stepOf, {
    current: currentIndex + 1,
    total,
  });

  return (
    <div className="space-y-3" aria-label={messages.form.progressLabel}>
      <div className="flex items-center justify-between gap-4 text-sm text-cdf-muted">
        <p>{stepLabel}</p>
        <p className="font-medium text-cdf-ink">
          {messages.form.phases[currentStepId]}
        </p>
      </div>
      <div
        className="h-1.5 overflow-hidden rounded-full bg-cdf-border/70"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={currentIndex + 1}
        aria-valuetext={stepLabel}
      >
        <div
          className="h-full rounded-full bg-cdf-accent transition-all duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
