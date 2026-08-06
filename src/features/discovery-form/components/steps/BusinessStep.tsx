/**
 * Legacy presentational stub kept for FormWizard compatibility.
 * The active Paso 2 UI lives in BusinessStepForm.tsx.
 */
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
        onChange={(event) =>
          onChange({
            industry: event.target.value as BusinessData['industry'],
          })
        }
      />
    </div>
  );
}
