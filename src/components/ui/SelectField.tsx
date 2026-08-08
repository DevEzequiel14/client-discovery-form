import type { SelectHTMLAttributes } from 'react';

type SelectOption = {
  value: string;
  label: string;
};

type SelectFieldProps = Omit<
  SelectHTMLAttributes<HTMLSelectElement>,
  'id' | 'name'
> & {
  id: string;
  name: string;
  label: string;
  options: SelectOption[];
  placeholder?: string;
  hint?: string;
  error?: string;
  requiredLabel?: string;
};

export function SelectField({
  id,
  name,
  label,
  options,
  placeholder,
  hint,
  error,
  required,
  requiredLabel,
  className = '',
  value,
  ...props
}: SelectFieldProps) {
  const showHint = Boolean(hint && !error);
  const hintId = showHint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy =
    [errorId, hintId].filter(Boolean).join(' ') || undefined;

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <label htmlFor={id} className="text-sm font-medium text-cdf-ink">
          {label}
        </label>
        {required && requiredLabel ? (
          <span className="text-xs font-medium text-cdf-muted">
            {requiredLabel}
          </span>
        ) : null}
      </div>

      <select
        id={id}
        name={name}
        required={required}
        aria-required={required}
        aria-invalid={error ? true : false}
        aria-describedby={describedBy}
        value={value}
        className={[
          'w-full appearance-none rounded-md border bg-cdf-surface-elevated bg-[length:1rem] bg-[right_0.75rem_center] bg-no-repeat px-3.5 py-3 pr-10 text-base text-cdf-ink shadow-sm transition md:text-sm',
          'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cdf-accent',
          error
            ? 'border-cdf-danger ring-1 ring-cdf-danger/20'
            : 'border-cdf-border hover:border-cdf-ink/25',
          !value ? 'text-cdf-muted/70' : '',
          className,
        ].join(' ')}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%234a5a6a'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
        }}
        {...props}
      >
        {placeholder ? (
          <option value="" disabled>
            {placeholder}
          </option>
        ) : null}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {showHint ? (
        <p id={hintId} className="text-xs leading-relaxed text-cdf-muted">
          {hint}
        </p>
      ) : null}

      {error ? (
        <p
          id={errorId}
          className="text-xs font-medium text-cdf-danger"
          role="alert"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}
