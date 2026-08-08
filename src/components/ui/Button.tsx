import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost';

type ButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: Variant;
  }
>;

const variants: Record<Variant, string> = {
  primary:
    'bg-cdf-accent text-white hover:bg-cdf-accent-hover disabled:bg-cdf-accent/50',
  secondary:
    'border border-cdf-border bg-cdf-surface-elevated text-cdf-ink hover:bg-cdf-accent-soft disabled:opacity-50',
  ghost: 'text-cdf-ink hover:bg-black/5 disabled:opacity-50',
};

export function Button({
  variant = 'primary',
  className = '',
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-md px-4 py-2.5 text-sm font-medium transition ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
