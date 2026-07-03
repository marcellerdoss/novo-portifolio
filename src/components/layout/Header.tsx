'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Navigation } from './Navigation';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';

export function Header() {
  const t = useTranslations('common');

  return (
    <header className="fixed top-11 left-0 right-0 z-40 bg-bg border-b border-border">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center shrink-0 min-h-[44px] hover:opacity-70 transition-opacity duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fg rounded"
          aria-label="Marcelle Rocha"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/social/logo-header-marcelle-rocha-navy.svg"
            alt="Marcelle Rocha"
            className="dark:hidden"
            style={{ width: 'auto', height: '28px' }}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/social/logo-header-marcelle-rocha-bege.svg"
            alt="Marcelle Rocha"
            className="hidden dark:block"
            style={{ width: 'auto', height: '28px' }}
          />
        </Link>

        {/* Right side — Sobre + toggles */}
        <div className="flex items-center gap-4">
          <Navigation />
          <div className="flex items-center gap-1 border-l border-border pl-4">
            <LanguageSwitcher ariaLabel={t('toggle_language')} />
            <ThemeToggle ariaLabel={t('toggle_theme')} />
          </div>
        </div>
      </div>
    </header>
  );
}
