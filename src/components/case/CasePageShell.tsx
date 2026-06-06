'use client';

import { useState, useEffect, useCallback } from 'react';
import { ChevronUp, ArrowLeft, ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { CaseViewContext } from './CaseViewContext';
import type { CaseNavItem } from '@/lib/casesConfig';

interface CasePageShellProps {
  children: React.ReactNode;
  detailedContent: React.ReactNode;
  prevCase?: CaseNavItem;
  nextCase?: CaseNavItem;
}

export function CasePageShell({
  children,
  detailedContent,
  prevCase,
  nextCase,
}: CasePageShellProps) {
  const [view, setView] = useState<'overview' | 'detailed'>('overview');
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const switchView = (next: 'overview' | 'detailed') => {
    setView(next);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <CaseViewContext.Provider value={{ view, switchView }}>
      {/* ── Content area ── */}
      <div key={view}>
        {view === 'overview' ? children : detailedContent}
      </div>

      {/* ── Case navigation ── */}
      {(prevCase || nextCase) && (
        <nav
          aria-label="Navegação entre cases"
          className="border-t border-border bg-surface-soft"
        >
          <div className="max-w-5xl mx-auto px-6 py-12 grid grid-cols-2 gap-6">
            {prevCase ? (
              <Link href={prevCase.href} className="group flex flex-col gap-1">
                <span className="type-caption text-fg-subtle flex items-center gap-1">
                  <ArrowLeft size={12} aria-hidden="true" /> Anterior
                </span>
                <span className="type-body-strong text-fg group-hover:text-fg-muted transition-colors leading-snug">
                  {prevCase.title}
                </span>
                <span className="type-caption text-fg-muted">{prevCase.company}</span>
              </Link>
            ) : (
              <div />
            )}

            {nextCase ? (
              <Link href={nextCase.href} className="group flex flex-col gap-1 text-right items-end">
                <span className="type-caption text-fg-subtle flex items-center gap-1">
                  Próximo <ArrowRight size={12} aria-hidden="true" />
                </span>
                <span className="type-body-strong text-fg group-hover:text-fg-muted transition-colors leading-snug">
                  {nextCase.title}
                </span>
                <span className="type-caption text-fg-muted">{nextCase.company}</span>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </nav>
      )}

      {/* ── Back to top ── */}
      <button
        onClick={scrollToTop}
        aria-label="Voltar ao topo"
        className={`fixed bottom-8 right-8 z-50 w-11 h-11 rounded-full bg-fg text-bg flex items-center justify-center shadow-lg transition-all duration-300 ${
          showTop
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <ChevronUp size={18} aria-hidden="true" />
      </button>
    </CaseViewContext.Provider>
  );
}
