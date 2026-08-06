import { TextArea } from '@components/ui/TextArea';
import { TextField } from '@components/ui/TextField';
import type { Messages } from '@i18n/types';
import type { FieldErrors, GoalsData } from '../../types/form';

type GoalsStepProps = {
  messages: Messages;
  value: Partial<GoalsData>;
  errors: FieldErrors;
  onChange: (patch: Partial<GoalsData>) => void;
};

export function GoalsStep({
  messages,
  value,
  errors,
  onChange,
}: GoalsStepProps) {
  return (
    <div className="grid gap-4">
      <TextArea
        name="goals"
        label={messages.fields.goals}
        value={value.goals ?? ''}
        error={errors.goals}
        onChange={(event) => onChange({ goals: event.target.value })}
      />
      <TextField
        name="targetAudience"
        label={messages.fields.targetAudience}
        value={value.targetAudience ?? ''}
        error={errors.targetAudience}
        onChange={(event) => onChange({ targetAudience: event.target.value })}
      />
    </div>
  );
}
