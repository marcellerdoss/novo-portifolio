'use client';

import { useLocale } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

type Props = { ariaLabel?: string };

export function LanguageSwitcher({ ariaLabel = 'Mudar idioma' }: Props) {
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <nav aria-label={ariaLabel} className="flex items-center gap-0.5">
      {(['pt', 'en'] as const).map((lang, i) => (
        <span key={lang} className="flex items-center">
          {i > 0 && (
            <span className="type-caption text-fg-subtle mx-1" aria-hidden="true">
              ·
            </span>
          )}
          <Link
            href={pathname}
            locale={lang}
            aria-current={locale === lang ? 'true' : undefined}
            className={cn(
              'type-body-sm uppercase px-1 md:px-2 py-2 rounded transition-colors duration-150',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fg',
              locale === lang
                ? 'text-accent-magenta font-[540]'
                : 'text-fg-muted hover:text-fg',
            )}
          >
            {lang}
          </Link>
        </span>
      ))}
    </nav>
  );
}
