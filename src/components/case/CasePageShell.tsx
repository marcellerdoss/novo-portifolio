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
              <Link href={prevCase.href} className="group flex flex-col gap-3">
                <span className="inline-flex items-center gap-2 px-5 py-2 type-body-sm border border-black/15 text-fg-muted rounded-pill bg-transparent group-hover:border-black/40 group-hover:text-fg active:scale-[0.97] transition-all duration-150 self-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-fg">
                  <ArrowLeft size={14} aria-hidden="true" /> Anterior
                </span>
                <span className="type-body-sm text-fg-muted leading-snug pl-1">{prevCase.title}</span>
              </Link>
            ) : (
              <div />
            )}

            {nextCase ? (
              <Link href={nextCase.href} className="group flex flex-col gap-3 items-end">
                <span className="inline-flex items-center gap-2 px-5 py-2 type-body-sm border border-black/15 text-fg-muted rounded-pill bg-transparent group-hover:border-black/40 group-hover:text-fg active:scale-[0.97] transition-all duration-150 self-end focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-fg">
                  Próximo <ArrowRight size={14} aria-hidden="true" />
                </span>
                <span className="type-body-sm text-fg-muted leading-snug pr-1 text-right">{nextCase.title}</span>
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
