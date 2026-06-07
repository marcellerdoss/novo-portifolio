'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from '@/i18n/navigation';
import { Navigation } from './Navigation';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';
import { useFontSize } from '@/lib/hooks/useFontSize';
import { cn } from '@/lib/utils';

function FontSizeControls({ className }: { className?: string }) {
  const t = useTranslations('common');
  const { fontSize, applyFont } = useFontSize();

  const base = cn(
    'w-9 h-9 flex items-center justify-center rounded-full transition-colors duration-150',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fg',
  );

  return (
    <div className={cn('flex items-center', className)} role="group" aria-label={t('font_increase')}>
      <button
        type="button"
        onClick={() => applyFont('sm')}
        aria-label={t('font_decrease')}
        aria-pressed={fontSize === 'sm'}
        title={t('font_decrease')}
        className={cn(base, fontSize === 'sm' ? 'text-fg' : 'text-fg-subtle hover:text-fg')}
      >
        <span className="text-[11px] font-semibold leading-none select-none" aria-hidden="true">A-</span>
      </button>
      <button
        type="button"
        onClick={() => applyFont('lg')}
        aria-label={t('font_increase')}
        aria-pressed={fontSize === 'lg'}
        title={t('font_increase')}
        className={cn(base, fontSize === 'lg' ? 'text-fg' : 'text-fg-subtle hover:text-fg')}
      >
        <span className="text-[13px] font-semibold leading-none select-none" aria-hidden="true">A+</span>
      </button>
    </div>
  );
}

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
        className={cn(
          'fixed top-9 left-0 right-0 z-40 transition-all duration-200',
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
              <FontSizeControls />
              <LanguageSwitcher ariaLabel={t('toggle_language')} />
              <ThemeToggle ariaLabel={t('toggle_theme')} />
            </div>
          </div>

          {/* Mobile controls */}
          <div className="flex md:hidden items-center gap-1">
            <FontSizeControls />
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
