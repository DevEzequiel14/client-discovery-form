import type { Messages } from '@i18n/types';
import { PROJECT_TYPES } from '../../types/steps';
import type { FieldErrors, ProjectTypeData } from '../../types/form';

type ProjectTypeStepProps = {
  messages: Messages;
  value: Partial<ProjectTypeData>;
  errors: FieldErrors;
  onChange: (patch: Partial<ProjectTypeData>) => void;
};

export function ProjectTypeStep({
  messages,
  value,
  errors,
  onChange,
}: ProjectTypeStepProps) {
  return (
    <fieldset className="grid gap-3">
      <legend className="mb-1 text-sm font-medium text-cdf-ink">
        {messages.fields.projectType}
      </legend>
      {PROJECT_TYPES.map((type) => (
        <label
          key={type}
          className="flex cursor-pointer items-center gap-3 rounded-md border border-cdf-border bg-white px-3 py-2.5 text-sm"
        >
          <input
            type="radio"
            name="projectType"
            value={type}
            checked={value.projectType === type}
            onChange={() => onChange({ projectType: type })}
          />
          <span>{messages.fields.projectTypeOptions[type]}</span>
        </label>
      ))}
      {errors.projectType ? (
        <p className="text-xs text-cdf-danger" role="alert">
          {errors.projectType}
        </p>
      ) : null}
    </fieldset>
  );
}
