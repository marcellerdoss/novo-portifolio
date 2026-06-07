'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from '@/i18n/navigation';
import { Navigation } from './Navigation';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';
import { cn } from '@/lib/utils';

export function Header() {
  const t = useTranslations('common');
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      const first = menuRef.current?.querySelector<HTMLElement>('a, button');
      first?.focus();
    } else {
      if (menuRef.current) hamburgerRef.current?.focus();
    }
  }, [menuOpen]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape' && menuOpen) setMenuOpen(false);
  }, [menuOpen]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      {/* Skip link */}
      <a
        href="#main-content"
        className={cn(
          'sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100]',
          'px-4 py-2 bg-primary text-on-primary rounded-pill type-caption',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fg',
        )}
      >
        {t('skip_to_content')}
      </a>

      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-40 transition-all duration-200',
          scrolled
            ? 'bg-bg/80 backdrop-blur-md border-b border-border'
            : 'bg-transparent',
        )}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link
            href="/"
            className={cn(
              'type-headline text-fg hover:opacity-70 transition-opacity duration-150',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fg rounded',
            )}
          >
            Marcelle
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-4">
            <Navigation />
            <div className="flex items-center gap-1 border-l border-border pl-4">
              <LanguageSwitcher ariaLabel={t('toggle_language')} />
              <ThemeToggle ariaLabel={t('toggle_theme')} />
            </div>
          </div>

          {/* Mobile controls */}
          <div className="flex md:hidden items-center gap-1">
            <LanguageSwitcher ariaLabel={t('toggle_language')} />
            <ThemeToggle ariaLabel={t('toggle_theme')} />
            <button
              ref={hamburgerRef}
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? t('close') : 'Menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className={cn(
                'w-11 h-11 flex items-center justify-center rounded-full',
                'text-fg-muted hover:text-fg transition-colors duration-150',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fg',
              )}
            >
              {menuOpen
                ? <X size={20} aria-hidden="true" />
                : <Menu size={20} aria-hidden="true" />}
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              ref={menuRef}
              id="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.18 }}
              className="md:hidden overflow-hidden bg-bg/95 backdrop-blur-md border-t border-border"
            >
              <div className="max-w-6xl mx-auto px-6 py-6">
                <Navigation
                  className="flex-col items-start gap-5"
                  itemClassName="text-lg"
                  onClick={closeMenu}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
