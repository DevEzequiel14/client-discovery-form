/**
 * Legacy presentational stub. Active Paso 5 UI: DesignStepForm.tsx
 */
import { FormTextArea } from '@components/ui/FormTextArea';
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
      <FormTextArea
        id="referenceUrls"
        name="referenceUrls"
        label={messages.fields.referenceUrls}
        value={value.referenceUrls ?? ''}
        error={errors.referenceUrls}
        onChange={(event) => onChange({ referenceUrls: event.target.value })}
      />
      <FormTextArea
        id="designTaste"
        name="designTaste"
        label={messages.fields.designTaste}
        value={value.designTaste ?? ''}
        error={errors.designTaste}
        onChange={(event) => onChange({ designTaste: event.target.value })}
      />
    </div>
  );
}
