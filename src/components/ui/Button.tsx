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
    'bg-primary text-on-primary rounded-pill hover:opacity-85 active:scale-[0.97]',
  secondary:
    'border border-black/15 text-fg rounded-pill bg-transparent hover:border-black/40 active:scale-[0.97]',
  ghost:
    'text-fg bg-transparent rounded-full hover:underline underline-offset-4',
  icon:
    'w-10 h-10 rounded-full bg-surface-soft text-fg hover:bg-fg/10 active:scale-95',
};

const sizes: Record<Size, string> = {
  sm: 'px-5 py-2 type-body-sm',
  md: 'px-5 py-[10px] type-button',
  lg: 'px-7 py-[14px] type-button',
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
