import { Button } from '@components/ui/Button';
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
    <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
      <Button
        type="button"
        variant="ghost"
        onClick={onBack}
        disabled={isFirstStep || isSubmitting}
      >
        {messages.common.back}
      </Button>

      {isLastStep ? (
        <Button
          type="button"
          onClick={onSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting
            ? messages.common.submitting
            : messages.common.submit}
        </Button>
      ) : (
        <Button type="button" onClick={onNext} disabled={isSubmitting}>
          {messages.common.continue}
        </Button>
      )}
    </div>
  );
}
