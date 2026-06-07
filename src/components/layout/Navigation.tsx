'use client';

import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { House } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

type NavKey = 'about' | 'cases' | 'skills' | 'experience' | 'blog' | 'contact';

const links: { key: NavKey; href: string }[] = [
  { key: 'about',      href: '/#sobre' },
  { key: 'cases',      href: '/#cases' },
  { key: 'skills',     href: '/#skills' },
  { key: 'experience', href: '/#experiencia' },
  { key: 'blog',       href: '/#blog' },
  { key: 'contact',    href: '/#contato' },
];

type Props = {
  className?: string;
  itemClassName?: string;
  onClick?: () => void;
};

export function Navigation({ className, itemClassName, onClick }: Props) {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const isHome = pathname === '/' || pathname === '/en';

  const linkClass = cn(
    'type-body-sm text-fg hover:text-[#FF3D8B] dark:hover:text-[#FF78AC] transition-colors duration-150',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fg rounded',
    itemClassName,
  );

  return (
    <nav aria-label="Navegação principal">
      <ul className={cn('flex items-center gap-6', className)}>
        {!isHome && (
          <li>
            <Link
              href="/"
              onClick={onClick}
              aria-label="Página inicial"
              className={cn(linkClass, 'flex items-center')}
            >
              <House size={15} aria-hidden="true" />
            </Link>
          </li>
        )}
        {links.map(({ key, href }) => (
          <li key={key}>
            <Link
              href={href}
              onClick={onClick}
              className={linkClass}
            >
              {t(key)}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
