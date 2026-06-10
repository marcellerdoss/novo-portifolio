import { cn } from '@/lib/utils';

type BadgeVariant = 'default' | 'category' | 'active';

type BadgeProps = {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
  onClick?: () => void;
  'aria-pressed'?: boolean;
};

export function Badge({
  children,
  variant = 'default',
  className,
  onClick,
  'aria-pressed': ariaPressed,
}: BadgeProps) {
  const classes = cn(
    'inline-flex items-center type-body-sm rounded-pill px-3 py-2 transition-colors duration-150',
    variant === 'default' && 'bg-bg border border-border text-fg',
    variant === 'category' && 'bg-bg-secondary text-fg-muted',
    variant === 'active' && 'bg-primary text-on-primary',
    onClick && 'cursor-pointer hover:border-fg hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fg',
    className,
  );

  if (onClick) {
    return (
      <button
        type="button"
        className={classes}
        onClick={onClick}
        aria-pressed={ariaPressed}
      >
        {children}
      </button>
    );
  }

  return <span className={classes}>{children}</span>;
}
