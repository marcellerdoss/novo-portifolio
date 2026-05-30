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
    'inline-flex items-center type-caption rounded-pill px-3 py-1.5 transition-colors duration-150',
    variant === 'default' && 'bg-canvas border border-hairline text-ink dark:bg-surface-tile-2 dark:border-white/10 dark:text-body-on-dark',
    variant === 'category' && 'bg-canvas-parchment text-ink-muted-80 dark:bg-surface-tile-1 dark:text-body-muted',
    variant === 'active' && 'bg-primary text-white border-2 border-primary-focus',
    onClick && 'cursor-pointer hover:border-primary hover:text-primary',
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
