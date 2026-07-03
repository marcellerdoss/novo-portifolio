'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

type Props = {
  className?: string;
  onClick?: () => void;
  orientation?: 'horizontal' | 'vertical';
};

export function Navigation({ className, onClick, orientation = 'horizontal' }: Props) {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const isAbout = pathname === '/sobre' || pathname === '/about';
  const isVertical = orientation === 'vertical';

  return (
    <nav
      id="main-nav"
      aria-label="Navegação principal"
      tabIndex={-1}
      className={cn('flex', isVertical ? 'flex-col items-start gap-4' : 'items-center gap-4')}
    >
      <Link
        href={{ pathname: '/', hash: '#cases' }}
        onClick={onClick}
        className={cn(
          'type-body-sm transition-colors duration-150',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fg rounded',
          'text-fg hover:text-accent-magenta dark:hover:text-magenta-300',
          className,
        )}
      >
        {t('cases')}
      </Link>
      <Link
        href="/sobre"
        onClick={onClick}
        aria-current={isAbout ? 'page' : undefined}
        className={cn(
          'type-body-sm transition-colors duration-150',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fg rounded',
          isAbout
            ? 'text-accent-magenta font-[540]'
            : 'text-fg hover:text-accent-magenta dark:hover:text-magenta-300',
          className,
        )}
      >
        {t('about')}
      </Link>
    </nav>
  );
}
