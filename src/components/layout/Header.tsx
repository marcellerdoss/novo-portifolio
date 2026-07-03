'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { Navigation } from './Navigation';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';
import { cn } from '@/lib/utils';

export function Header() {
  const t = useTranslations('common');
  const [menuOpen, setMenuOpen] = useState(false);
  const prefersReduced = useReducedMotion();

  return (
    <header className="fixed top-11 left-0 right-0 z-40 bg-bg border-b border-border">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between gap-4">

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
            src="/images/social/favicon-navy.svg"
            alt="Marcelle Rocha"
            className="md:hidden hidden dark:block"
            style={{ width: 'auto', height: '28px', filter: 'brightness(0) invert(1)' }}
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
        <div className="flex items-center gap-3 md:gap-4">
          <Navigation className="hidden md:inline" />
          <div className="flex items-center gap-1 border-l border-border pl-3 md:pl-4">
            <LanguageSwitcher ariaLabel={t('toggle_language')} />
            <ThemeToggle ariaLabel={t('toggle_theme')} />
          </div>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? t('close_menu') : t('open_menu')}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            className={cn(
              'md:hidden flex items-center justify-center w-10 h-10 rounded-full shrink-0',
              'text-fg hover:bg-fg/5 transition-colors duration-150',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fg',
            )}
          >
            {menuOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
        </div>

      </div>

      {/* Mobile menu panel */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-nav"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: prefersReduced ? 0 : 0.2 }}
            className="md:hidden overflow-hidden border-t border-border bg-bg"
          >
            <div className="max-w-6xl mx-auto px-6 py-5">
              <Navigation orientation="vertical" onClick={() => setMenuOpen(false)} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
