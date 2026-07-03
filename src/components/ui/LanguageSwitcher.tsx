'use client';

import { useLocale } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

type Props = { ariaLabel?: string };

export function LanguageSwitcher({ ariaLabel = 'Mudar idioma' }: Props) {
  const locale = useLocale();
  const pathname = usePathname();
  const target = locale === 'pt' ? 'en' : 'pt';

  return (
    <Link
      href={pathname}
      locale={target}
      aria-label={ariaLabel}
      className={cn(
        'flex items-center justify-center w-9 h-9 rounded-full shrink-0',
        'type-body-sm uppercase text-fg-muted hover:text-fg hover:bg-fg/5 transition-colors duration-150',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fg',
      )}
    >
      {target}
    </Link>
  );
}
