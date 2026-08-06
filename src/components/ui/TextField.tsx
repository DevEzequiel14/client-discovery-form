import type { InputHTMLAttributes } from 'react';

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
  hint?: string;
};

export function TextField({
  id,
  label,
  error,
  hint,
  className = '',
  ...props
}: TextFieldProps) {
  const fieldId = id ?? props.name;
  const errorId = error && fieldId ? `${fieldId}-error` : undefined;
  const hintId = hint && fieldId ? `${fieldId}-hint` : undefined;

  return (
    <label className="flex flex-col gap-1.5 text-sm" htmlFor={fieldId}>
      <span className="font-medium text-cdf-ink">{label}</span>
      <input
        id={fieldId}
        aria-invalid={Boolean(error)}
        aria-describedby={[errorId, hintId].filter(Boolean).join(' ') || undefined}
        className={`rounded-md border bg-white px-3 py-2.5 text-cdf-ink placeholder:text-cdf-muted ${
          error ? 'border-cdf-danger' : 'border-cdf-border'
        } ${className}`}
        {...props}
      />
      {hint ? (
        <span id={hintId} className="text-xs text-cdf-muted">
          {hint}
        </span>
      ) : null}
      {error ? (
        <span id={errorId} className="text-xs text-cdf-danger" role="alert">
          {error}
        </span>
      ) : null}
    </label>
  );
}
