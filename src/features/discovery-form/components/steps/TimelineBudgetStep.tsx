/**
 * Legacy stub. Active flow uses TimelineBudgetStepForm.
 */
import { FormField } from '@components/ui/FormField';
import { FormTextArea } from '@components/ui/FormTextArea';
import type { Messages } from '@i18n/types';
import type { FieldErrors, TimelineBudgetData } from '../../types/form';

type TimelineBudgetStepProps = {
  messages: Messages;
  value: Partial<TimelineBudgetData>;
  errors: FieldErrors;
  onChange: (patch: Partial<TimelineBudgetData>) => void;
};

/** @deprecated Prefer TimelineBudgetStepForm */
export function TimelineBudgetStep({
  messages,
  value,
  errors,
  onChange,
}: TimelineBudgetStepProps) {
  return (
    <div className="space-y-4">
      <FormField
        id="timeline"
        name="timeline"
        label={messages.fields.timeline}
        value={value.timeline ?? ''}
        error={errors.timeline}
        onChange={(event) =>
          onChange({ timeline: event.target.value as TimelineBudgetData['timeline'] })
        }
      />
      <FormField
        id="investmentRange"
        name="investmentRange"
        label={messages.fields.investmentRange}
        value={value.investmentRange ?? ''}
        error={errors.investmentRange}
        onChange={(event) =>
          onChange({
            investmentRange:
              event.target.value as TimelineBudgetData['investmentRange'],
          })
        }
      />
      <FormTextArea
        id="additionalNotes"
        name="additionalNotes"
        label={messages.fields.additionalNotes}
        optionalLabel={messages.common.optional}
        value={value.additionalNotes ?? ''}
        error={errors.additionalNotes}
        onChange={(event) =>
          onChange({ additionalNotes: event.target.value })
        }
      />
    </div>
  );
}
