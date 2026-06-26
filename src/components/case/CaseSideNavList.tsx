'use client';

import { useLocale } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { casesOrder } from '@/lib/casesConfig';

export function CaseSideNavList() {
  const locale = useLocale() as 'pt' | 'en';
  const pathname = usePathname();

  return (
    <div className="mt-4 rounded-[16px] border border-border overflow-hidden divide-y divide-border">
      <div className="px-5 py-4">
        <p className="type-caption text-accent-magenta">Cases</p>
      </div>
      {casesOrder.map((item) => {
        const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
        return (
          <div key={item.slug}>
            <Link
              href={item.href}
              aria-current={isActive ? 'page' : undefined}
              className={`flex items-center gap-2 px-5 py-2.5 transition-colors duration-150 ${
                isActive
                  ? 'bg-fg/[0.05] dark:bg-white/[0.05]'
                  : 'hover:bg-fg/[0.04] dark:hover:bg-white/[0.04]'
              }`}
            >
              <span className="flex-1 min-w-0">
                <span className="type-caption text-fg-subtle block">{item.company}</span>
                <span
                  className={`type-body-xs leading-snug block truncate ${
                    isActive ? 'text-fg font-medium' : 'text-fg-muted'
                  }`}
                  title={item.title[locale]}
                >
                  {item.title[locale]}
                </span>
              </span>
              {isActive && (
                <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-accent-magenta" aria-hidden="true" />
              )}
            </Link>
          </div>
        );
      })}
    </div>
  );
}
