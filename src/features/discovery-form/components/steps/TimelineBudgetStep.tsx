import { TextArea } from '@components/ui/TextArea';
import { TextField } from '@components/ui/TextField';
import type { Messages } from '@i18n/types';
import type { FieldErrors, TimelineBudgetData } from '../../types/form';

type TimelineBudgetStepProps = {
  messages: Messages;
  value: Partial<TimelineBudgetData>;
  errors: FieldErrors;
  onChange: (patch: Partial<TimelineBudgetData>) => void;
};

export function TimelineBudgetStep({
  messages,
  value,
  errors,
  onChange,
}: TimelineBudgetStepProps) {
  return (
    <div className="grid gap-4">
      <TextField
        name="timeline"
        label={messages.fields.timeline}
        value={value.timeline ?? ''}
        error={errors.timeline}
        onChange={(event) => onChange({ timeline: event.target.value })}
      />
      <TextField
        name="budget"
        label={messages.fields.budget}
        value={value.budget ?? ''}
        error={errors.budget}
        onChange={(event) => onChange({ budget: event.target.value })}
      />
      <TextArea
        name="additionalNotes"
        label={`${messages.fields.additionalNotes} (${messages.common.optional})`}
        value={value.additionalNotes ?? ''}
        error={errors.additionalNotes}
        onChange={(event) =>
          onChange({ additionalNotes: event.target.value })
        }
      />
    </div>
  );
}
