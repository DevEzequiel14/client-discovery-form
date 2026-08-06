import { TextField } from '@components/ui/TextField';
import type { Messages } from '@i18n/types';
import type { ContactData, FieldErrors } from '../../types/form';

type ContactStepProps = {
  messages: Messages;
  value: Partial<ContactData>;
  errors: FieldErrors;
  onChange: (patch: Partial<ContactData>) => void;
};

export function ContactStep({
  messages,
  value,
  errors,
  onChange,
}: ContactStepProps) {
  return (
    <div className="grid gap-4">
      <TextField
        name="fullName"
        label={messages.fields.fullName}
        value={value.fullName ?? ''}
        error={errors.fullName}
        autoComplete="name"
        onChange={(event) => onChange({ fullName: event.target.value })}
      />
      <TextField
        name="email"
        type="email"
        label={messages.fields.email}
        value={value.email ?? ''}
        error={errors.email}
        autoComplete="email"
        onChange={(event) => onChange({ email: event.target.value })}
      />
      <TextField
        name="phone"
        type="tel"
        label={`${messages.fields.phone} (${messages.common.optional})`}
        value={value.phone ?? ''}
        error={errors.phone}
        autoComplete="tel"
        onChange={(event) => onChange({ phone: event.target.value })}
      />
    </div>
  );
}
