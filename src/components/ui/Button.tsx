import { forwardRef } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'secondary' | 'ghost' | 'icon';
type Size = 'sm' | 'md' | 'lg';

const base =
  'inline-flex items-center justify-center gap-2 cursor-pointer transition-all duration-150 ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-fg ' +
  'disabled:opacity-50 disabled:cursor-not-allowed select-none';

const variants: Record<Variant, string> = {
  primary:
    'bg-primary text-on-primary rounded-pill active:scale-95 hover:opacity-90',
  secondary:
    'border border-fg/30 text-fg rounded-pill bg-transparent active:scale-95 hover:bg-fg/5',
  ghost:
    'text-fg-muted hover:text-fg bg-transparent rounded-sm active:scale-95',
  icon:
    'w-11 h-11 rounded-full bg-fg/10 text-fg hover:bg-fg/20 active:scale-95',
};

const sizes: Record<Size, string> = {
  sm: 'px-4 py-2 type-body-sm',
  md: 'px-[22px] py-[11px] type-button',
  lg: 'px-7 py-3.5 type-button',
};

export function buttonVariants({
  variant = 'primary',
  size = 'md',
  className,
}: {
  variant?: Variant;
  size?: Size;
  className?: string;
}) {
  return cn(base, variants[variant], variant !== 'icon' && sizes[size], className);
}

// ─── <button> ────────────────────────────────────────────────────
type ButtonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children?: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className, children, ...props }, ref) => (
    <button
      ref={ref}
      className={buttonVariants({ variant, size, className })}
      {...props}
    >
      {children}
    </button>
  ),
);
Button.displayName = 'Button';

// ─── <a> or Next.js <Link> ───────────────────────────────────────
type LinkButtonProps = {
  href: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  children?: React.ReactNode;
  external?: boolean;
  download?: string | boolean;
  'aria-label'?: string;
};

export function LinkButton({
  href,
  variant = 'primary',
  size = 'md',
  className,
  children,
  external,
  download,
  'aria-label': ariaLabel,
}: LinkButtonProps) {
  const classes = buttonVariants({ variant, size, className });

  if (external || download) {
    return (
      <a
        href={href}
        className={classes}
        rel="noopener noreferrer"
        target={external ? '_blank' : undefined}
        download={download}
        aria-label={ariaLabel}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} aria-label={ariaLabel}>
      {children}
    </Link>
  );
}
