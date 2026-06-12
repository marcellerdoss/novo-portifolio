'use client';

import { useTranslations } from 'next-intl';
import { House } from 'lucide-react';
import { Link, usePathname } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

type NavKey = 'about' | 'cases' | 'racional' | 'skills' | 'experience' | 'blog' | 'contact';

const links: { key: NavKey; href: { pathname: string; hash: string } }[] = [
  { key: 'about',      href: { pathname: '/', hash: '#sobre' } },
  { key: 'cases',      href: { pathname: '/', hash: '#cases' } },
  { key: 'racional',   href: { pathname: '/', hash: '#racional' } },
  { key: 'skills',     href: { pathname: '/', hash: '#skills' } },
  { key: 'experience', href: { pathname: '/', hash: '#experiencia' } },
  { key: 'blog',       href: { pathname: '/', hash: '#blog' } },
  { key: 'contact',    href: { pathname: '/', hash: '#contato' } },
];

type Props = {
  className?: string;
  itemClassName?: string;
  onClick?: () => void;
};

export function Navigation({ className, itemClassName, onClick }: Props) {
  const t = useTranslations('nav');
  const tCommon = useTranslations('common');
  const pathname = usePathname();
  const isHome = pathname === '/';
  const isCasePage = pathname.startsWith('/cases/');

  return (
    <nav id="main-nav" aria-label={tCommon('nav_label')} tabIndex={-1}>
      <ul className={cn('flex items-center gap-6', className)}>
        {!isHome && (
          <li>
            <Link
              href="/"
              onClick={onClick}
              aria-label="Página inicial"
              className={cn(
                'type-body-sm text-fg hover:text-accent-magenta dark:hover:text-magenta-300 transition-colors duration-150',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fg rounded flex items-center',
                itemClassName,
              )}
            >
              <House size={18} aria-hidden="true" />
            </Link>
          </li>
        )}
        {links.map(({ key, href }) => {
          const isActive = isCasePage && key === 'cases';
          return (
            <li key={key}>
              <Link
                href={href}
                onClick={onClick}
                aria-current={isActive ? 'page' : undefined}
                className={cn(
                  'type-body-sm transition-colors duration-150',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fg rounded',
                  isActive
                    ? 'text-accent-magenta font-[540]'
                    : 'text-fg hover:text-accent-magenta dark:hover:text-magenta-300',
                  itemClassName,
                )}
              >
                {t(key)}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
