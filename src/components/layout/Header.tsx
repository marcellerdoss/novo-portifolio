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
      <div className="max-w-6xl mx-auto px-4 md:px-6 h-14 flex items-center justify-between gap-2 md:gap-4">

        {/* Logo — monograma no mobile, logo completo no desktop */}
        <Link
          href="/"
          className="flex items-center shrink-0 min-h-[44px] hover:opacity-70 transition-opacity duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fg rounded"
          aria-label="Marcelle Rocha"
        >
          {/* Mobile: só o monograma */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/social/favicon-navy.svg"
            alt="Marcelle Rocha"
            className="md:hidden dark:hidden"
            style={{ width: 'auto', height: '28px' }}
          />
          {/* Mobile dark */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/social/favicon-rosa.svg"
            alt="Marcelle Rocha"
            className="md:hidden hidden dark:block"
            style={{ width: 'auto', height: '28px' }}
          />

          {/* Desktop: logo completo */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/social/logo-header-marcelle-rocha-navy.svg"
            alt="Marcelle Rocha"
            className="hidden md:block dark:hidden"
            style={{ width: 'auto', height: '28px' }}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/social/logo-header-marcelle-rocha-bege.svg"
            alt="Marcelle Rocha"
            className="hidden md:dark:block"
            style={{ width: 'auto', height: '28px' }}
          />
        </Link>

        {/* Right side — nav + toggles */}
        <div className="flex items-center gap-2 md:gap-4 min-w-0">
          <Navigation />
          <div className="flex items-center gap-0.5 md:gap-1 border-l border-border pl-2 md:pl-4 shrink-0">
            <LanguageSwitcher ariaLabel={t('toggle_language')} />
            <ThemeToggle ariaLabel={t('toggle_theme')} />
          </div>
        </div>

      </div>
    </header>
  );
}
