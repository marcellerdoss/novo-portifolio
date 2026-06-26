'use client';

import { useLocale } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { casesOrder, type CaseNavItem } from '@/lib/casesConfig';

const groups: { company: string; slugs: string[] }[] = [
  {
    company: 'Sellbie',
    slugs: ['sellbie-redesign', 'sellbie-jornadas', 'sellbie-metricas', 'sellbie-crm', 'sellbie-cashback', 'sellbie-arq-info'],
  },
  {
    company: 'Jovens Gênios',
    slugs: ['jg-alfabetizacao', 'jg-central-ajuda'],
  },
];

export function CaseSideNavList() {
  const locale = useLocale() as 'pt' | 'en';
  const pathname = usePathname();

  return (
    <nav aria-label="Cases" className="space-y-6">
      {groups.map((group) => {
        const items = group.slugs
          .map((slug) => casesOrder.find((c) => c.slug === slug))
          .filter(Boolean) as CaseNavItem[];

        return (
          <div key={group.company}>
            <p className="type-body-sm font-medium text-fg mb-2">{group.company}</p>
            <ul className="space-y-0.5">
              {items.map((item) => {
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
          </div>
        );
      })}
    </nav>
  );
}
