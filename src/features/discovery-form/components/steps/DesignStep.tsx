import { TextArea } from '@components/ui/TextArea';
import { TextField } from '@components/ui/TextField';
import type { Messages } from '@i18n/types';
import type { DesignData, FieldErrors } from '../../types/form';

type DesignStepProps = {
  messages: Messages;
  value: Partial<DesignData>;
  errors: FieldErrors;
  onChange: (patch: Partial<DesignData>) => void;
};

export function DesignStep({
  messages,
  value,
  errors,
  onChange,
}: DesignStepProps) {
  return (
    <div className="grid gap-4">
      <TextField
        name="designStyle"
        label={messages.fields.designStyle}
        value={value.designStyle ?? ''}
        error={errors.designStyle}
        onChange={(event) => onChange({ designStyle: event.target.value })}
      />
      <TextArea
        name="references"
        label={`${messages.fields.references} (${messages.common.optional})`}
        value={value.references ?? ''}
        error={errors.references}
        onChange={(event) => onChange({ references: event.target.value })}
      />
    </div>
  );
}
