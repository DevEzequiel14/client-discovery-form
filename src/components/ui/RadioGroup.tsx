import {
  optionBase,
  optionError,
  optionIdle,
  optionPad,
  optionSelected,
} from '@lib/ui-classes';

type RadioOption = {
  value: string;
  label: string;
};

type RadioGroupProps = {
  name: string;
  legend: string;
  options: RadioOption[];
  value?: string;
  error?: string;
  required?: boolean;
  /** @deprecated Required fields show an asterisk; this prop is ignored. */
  requiredLabel?: string;
  hint?: string;
  /** Prefer stack for longer conversational options. */
  layout?: 'grid' | 'stack';
  onChange: (value: string) => void;
};

export function RadioGroup({
  name,
  legend,
  options,
  value,
  error,
  required,
  requiredLabel: _requiredLabel,
  hint,
  layout = 'grid',
  onChange,
}: RadioGroupProps) {
  const showHint = Boolean(hint && !error);
  const hintId = showHint ? `${name}-hint` : undefined;
  const errorId = error ? `${name}-error` : undefined;
  const describedBy =
    [errorId, hintId].filter(Boolean).join(' ') || undefined;

  return (
    <fieldset
      className="flex flex-col gap-2"
      aria-required={required}
      aria-invalid={error ? true : false}
      aria-describedby={describedBy}
    >
      <legend className="text-sm font-medium text-cdf-ink">
        {legend}
        {required ? (
          <span className="text-cdf-muted" aria-hidden="true">
            {' '}
            *
          </span>
        ) : null}
      </legend>

      {showHint ? (
        <p id={hintId} className="text-xs leading-relaxed text-cdf-muted">
          {hint}
        </p>
      ) : null}

      <div
        className={
          layout === 'stack' ? 'grid gap-2' : 'grid gap-2 sm:grid-cols-2'
        }
      >
        {options.map((option) => {
          const optionId = `${name}-${option.value}`;
          const selected = value === option.value;

          return (
            <label
              key={option.value}
              htmlFor={optionId}
              className={[
                'flex cursor-pointer items-center gap-3 text-sm',
                optionBase,
                optionPad,
                selected
                  ? optionSelected
                  : error
                    ? optionError
                    : optionIdle,
              ].join(' ')}
            >
              <input
                id={optionId}
                type="radio"
                name={name}
                value={option.value}
                checked={selected}
                className="size-4 accent-cdf-accent"
                onChange={() => onChange(option.value)}
              />
              <span className="font-medium text-cdf-ink">{option.label}</span>
            </label>
          );
        })}
      </div>

      {error ? (
        <p
          id={errorId}
          className="text-xs font-medium text-cdf-danger"
          role="alert"
        >
          {error}
        </p>
      ) : null}
    </fieldset>
  );
}
