import type {
  ChangeEvent,
  InputHTMLAttributes,
} from 'react';

type FormFieldProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'id' | 'name'
> & {
  id: string;
  name: string;
  label: string;
  hint?: string;
  error?: string;
  requiredLabel?: string;
  optionalLabel?: string;
};

export function FormField({
  id,
  name,
  label,
  hint,
  error,
  required,
  requiredLabel,
  optionalLabel,
  className = '',
  ...props
}: FormFieldProps) {
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
        {!required && optionalLabel ? (
          <span className="text-xs font-medium text-cdf-muted">
            {optionalLabel}
          </span>
        ) : null}
      </div>

      <input
        id={id}
        name={name}
        required={required}
        aria-required={required}
        aria-invalid={error ? true : false}
        aria-describedby={describedBy}
        className={[
          'w-full rounded-md border bg-white px-3.5 py-3 text-base text-cdf-ink shadow-sm transition placeholder:text-cdf-muted/70 md:text-sm',
          'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cdf-accent',
          error
            ? 'border-cdf-danger ring-1 ring-cdf-danger/20'
            : 'border-cdf-border hover:border-cdf-ink/25',
          className,
        ].join(' ')}
        {...props}
      />

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

export type FormFieldChangeEvent = ChangeEvent<HTMLInputElement>;
