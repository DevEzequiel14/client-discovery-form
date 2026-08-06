import type { TextareaHTMLAttributes } from 'react';

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  error?: string;
};

export function TextArea({
  id,
  label,
  error,
  className = '',
  ...props
}: TextAreaProps) {
  const fieldId = id ?? props.name;
  const errorId = error && fieldId ? `${fieldId}-error` : undefined;

  return (
    <label className="flex flex-col gap-1.5 text-sm" htmlFor={fieldId}>
      <span className="font-medium text-cdf-ink">{label}</span>
      <textarea
        id={fieldId}
        aria-invalid={Boolean(error)}
        aria-describedby={errorId}
        className={`min-h-28 rounded-md border bg-white px-3 py-2.5 text-cdf-ink placeholder:text-cdf-muted ${
          error ? 'border-cdf-danger' : 'border-cdf-border'
        } ${className}`}
        {...props}
      />
      {error ? (
        <span id={errorId} className="text-xs text-cdf-danger" role="alert">
          {error}
        </span>
      ) : null}
    </label>
  );
}
