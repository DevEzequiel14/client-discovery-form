import { TextArea } from '@components/ui/TextArea';
import type { Messages } from '@i18n/types';
import type { FeaturesData, FieldErrors } from '../../types/form';

type FeaturesStepProps = {
  messages: Messages;
  value: Partial<FeaturesData>;
  errors: FieldErrors;
  onChange: (patch: Partial<FeaturesData>) => void;
};

export function FeaturesStep({
  messages,
  value,
  errors,
  onChange,
}: FeaturesStepProps) {
  return (
    <TextArea
      name="features"
      label={messages.fields.features}
      value={value.features ?? ''}
      error={errors.features}
      onChange={(event) => onChange({ features: event.target.value })}
    />
  );
}
