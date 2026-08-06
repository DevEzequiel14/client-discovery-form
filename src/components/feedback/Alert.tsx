import type { PropsWithChildren } from 'react';

type AlertTone = 'error' | 'info' | 'success';

const tones: Record<AlertTone, string> = {
  error: 'border-cdf-danger/30 bg-red-50 text-cdf-danger',
  info: 'border-cdf-border bg-white text-cdf-ink',
  success: 'border-cdf-success/30 bg-green-50 text-cdf-success',
};

type AlertProps = PropsWithChildren<{
  tone?: AlertTone;
  title?: string;
}>;

export function Alert({ tone = 'info', title, children }: AlertProps) {
  return (
    <div
      role={tone === 'error' ? 'alert' : 'status'}
      className={`rounded-md border px-4 py-3 text-sm ${tones[tone]}`}
    >
      {title ? <p className="mb-1 font-medium">{title}</p> : null}
      <div>{children}</div>
    </div>
  );
}
