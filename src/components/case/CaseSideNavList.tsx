'use client';

import { useLocale } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { casesOrder } from '@/lib/casesConfig';

export function CaseSideNavList() {
  const locale = useLocale() as 'pt' | 'en';
  const pathname = usePathname();

  return (
    <nav aria-label="Cases">
      <p className="type-body-sm font-medium text-fg mb-2">
        {locale === 'pt' ? 'Ver outros cases' : 'See other cases'}
      </p>
      <ul className="space-y-0.5">
        {casesOrder.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          return (
            <li key={item.slug}>
              <Link
                href={item.href}
                aria-current={isActive ? 'page' : undefined}
                className={`block type-body-xs py-1 leading-snug transition-colors duration-150 ${
                  isActive
                    ? 'text-fg font-semibold'
                    : 'text-fg-muted hover:text-fg'
                }`}
              >
                {item.title[locale]}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
