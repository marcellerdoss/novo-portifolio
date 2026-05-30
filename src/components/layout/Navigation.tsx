'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

type NavKey = 'about' | 'cases' | 'skills' | 'experience' | 'blog' | 'contact';

const links: { key: NavKey; href: string }[] = [
  { key: 'about',      href: '/#sobre' },
  { key: 'cases',      href: '/#cases' },
  { key: 'skills',     href: '/#skills' },
  { key: 'experience', href: '/#experiencia' },
  { key: 'blog',       href: '/blog' },
  { key: 'contact',    href: '/#contato' },
];

type Props = {
  className?: string;
  itemClassName?: string;
  onClick?: () => void;
};

export function Navigation({ className, itemClassName, onClick }: Props) {
  const t = useTranslations('nav');

  return (
    <nav aria-label="Navegação principal">
      <ul className={cn('flex items-center gap-6', className)}>
        {links.map(({ key, href }) => (
          <li key={key}>
            <Link
              href={href}
              onClick={onClick}
              className={cn(
                'type-caption text-fg-muted hover:text-fg transition-colors duration-150',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-focus rounded',
                itemClassName,
              )}
            >
              {t(key)}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
