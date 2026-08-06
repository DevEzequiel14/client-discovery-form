import { TextField } from '@components/ui/TextField';
import type { Messages } from '@i18n/types';
import type { BusinessData, FieldErrors } from '../../types/form';

type BusinessStepProps = {
  messages: Messages;
  value: Partial<BusinessData>;
  errors: FieldErrors;
  onChange: (patch: Partial<BusinessData>) => void;
};

export function BusinessStep({
  messages,
  value,
  errors,
  onChange,
}: BusinessStepProps) {
  return (
    <div className="grid gap-4">
      <TextField
        name="company"
        label={messages.fields.company}
        value={value.company ?? ''}
        error={errors.company}
        onChange={(event) => onChange({ company: event.target.value })}
      />
      <TextField
        name="industry"
        label={messages.fields.industry}
        value={value.industry ?? ''}
        error={errors.industry}
        onChange={(event) => onChange({ industry: event.target.value })}
      />
      <TextField
        name="website"
        type="url"
        label={`${messages.fields.website} (${messages.common.optional})`}
        value={value.website ?? ''}
        error={errors.website}
        placeholder="https://"
        onChange={(event) => onChange({ website: event.target.value })}
      />
    </div>
  );
}
