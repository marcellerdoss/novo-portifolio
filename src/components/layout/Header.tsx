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
      <header
        className="fixed top-11 left-0 right-0 z-40 bg-bg border-b border-border"
      >
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link
            href="/"
            className={cn(
              'flex items-center min-h-[44px] hover:opacity-70 transition-opacity duration-150',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fg rounded',
            )}
            aria-label="Marcelle Rocha"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/social/logo-header-marcelle-rocha-navy.svg"
              alt="Marcelle Rocha"
              className="dark:hidden"
              style={{ width: 'auto', height: '24px' }}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/social/logo-header-marcelle-rocha-bege.svg"
              alt="Marcelle Rocha"
              className="hidden dark:block"
              style={{ width: 'auto', height: '24px' }}
            />
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-4">
            <Navigation />
            <div className="flex items-center gap-1 border-l border-border pl-4">
              <LanguageSwitcher ariaLabel={t('toggle_language')} />
              <ThemeToggle ariaLabel={t('toggle_theme')} />
            </div>
          </div>

          {/* Mobile controls — só hamburger na barra */}
          <button
            ref={hamburgerRef}
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? t('close') : 'Menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className={cn(
              'md:hidden w-11 h-11 flex items-center justify-center rounded-full',
              'text-fg-muted hover:text-fg transition-colors duration-150',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fg',
            )}
          >
            {menuOpen
              ? <X size={20} aria-hidden="true" />
              : <Menu size={20} aria-hidden="true" />}
          </button>
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
              className="md:hidden overflow-hidden bg-bg border-t border-border"
            >
              <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col gap-8">
                <Navigation
                  className="flex-col items-start gap-1"
                  itemClassName="text-xl py-3"
                  onClick={closeMenu}
                />
                <div className="border-t border-border pt-6 flex items-center justify-between">
                  <LanguageSwitcher ariaLabel={t('toggle_language')} />
                  <ThemeToggle ariaLabel={t('toggle_theme')} />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
