import type { TextareaHTMLAttributes } from 'react';

type FormTextAreaProps = Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  'id' | 'name'
> & {
  id: string;
  name: string;
  label: string;
  hint?: string;
  error?: string;
  /** @deprecated Required fields show an asterisk; this prop is ignored. */
  requiredLabel?: string;
  /** @deprecated Optional fields stay unmarked; this prop is ignored. */
  optionalLabel?: string;
};

export function FormTextArea({
  id,
  name,
  label,
  hint,
  error,
  required,
  requiredLabel: _requiredLabel,
  optionalLabel: _optionalLabel,
  className = '',
  ...props
}: FormTextAreaProps) {
  const showHint = Boolean(hint && !error);
  const hintId = showHint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy =
    [errorId, hintId].filter(Boolean).join(' ') || undefined;

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-cdf-ink">
        {label}
        {required ? (
          <span className="text-cdf-muted" aria-hidden="true">
            {' '}
            *
          </span>
        ) : null}
      </label>

      <textarea
        id={id}
        name={name}
        required={required}
        aria-required={required}
        aria-invalid={error ? true : false}
        aria-describedby={describedBy}
        className={[
          'min-h-28 w-full resize-y rounded-md border bg-cdf-surface-elevated px-3.5 py-3 text-base text-cdf-ink shadow-sm transition placeholder:text-cdf-muted/70 md:text-sm',
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
