'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

type Props = {
  className?: string;
  onClick?: () => void;
};

export function Navigation({ className, onClick }: Props) {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const isAbout = pathname === '/sobre' || pathname === '/about';

  return (
    <nav id="main-nav" aria-label="Navegação principal" tabIndex={-1}>
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
