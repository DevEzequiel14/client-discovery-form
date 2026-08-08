import { btnGhost, btnPrimary, stepNav } from '@lib/ui-classes';
import type { Messages } from '@i18n/types';

type StepNavigationProps = {
  messages: Messages;
  isFirstStep: boolean;
  isLastStep: boolean;
  isSubmitting: boolean;
  onBack: () => void;
  onNext: () => void;
  onSubmit: () => void;
};

export function StepNavigation({
  messages,
  isFirstStep,
  isLastStep,
  isSubmitting,
  onBack,
  onNext,
  onSubmit,
}: StepNavigationProps) {
  return (
    <div className={[stepNav, 'justify-between'].join(' ')}>
      <button
        type="button"
        className={btnGhost}
        onClick={onBack}
        disabled={isFirstStep || isSubmitting}
      >
        {messages.common.back}
      </button>

      {isLastStep ? (
        <button
          type="button"
          className={btnPrimary}
          onClick={onSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting
            ? messages.common.submitting
            : messages.common.submit}
        </button>
      ) : (
        <button
          type="button"
          className={btnPrimary}
          onClick={onNext}
          disabled={isSubmitting}
        >
          {messages.common.continue}
        </button>
      )}
    </div>
  );
}
