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
  const [pendingScroll, setPendingScroll] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    if (!pendingScroll) return;
    setPendingScroll(false);
    const el = document.getElementById('case-toggle');
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 64;
      window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
    }
  }, [pendingScroll, view]);

  const switchView = (next: 'overview' | 'detailed') => {
    setView(next);
    setPendingScroll(true);
  };

  return (
    <CaseViewContext.Provider value={{ view, switchView }}>

      {/* ── Content area ── */}
      <div key={view}>
        {view === 'overview' ? children : detailedContent}
      </div>

      {/* ── Case navigation inferior ── */}
      {(prevCase || nextCase) && (
        <nav
          aria-label="Navegação entre cases"
          className="border-t border-border bg-surface-soft"
        >
          <div className="max-w-5xl mx-auto px-6 py-12 grid grid-cols-2 gap-6">
            {prevCase ? (
              <Link href={prevCase.href} className="group flex flex-col gap-3">
                <span className="inline-flex items-center gap-2 px-5 py-2 type-body-sm border border-fg text-fg dark:border-accent-magenta dark:text-accent-magenta rounded-pill bg-transparent group-hover:bg-fg/5 dark:group-hover:bg-accent-magenta/10 active:scale-[0.97] transition-all duration-150 self-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-fg">
                  <ArrowLeft size={14} aria-hidden="true" /> Anterior
                </span>
                <span className="type-body-sm text-fg-muted leading-snug pl-1">{prevCase.title}</span>
              </Link>
            ) : (
              <div />
            )}

            {nextCase ? (
              <Link href={nextCase.href} className="group flex flex-col gap-3 items-end">
                <span className="inline-flex items-center gap-2 px-5 py-2 type-body-sm border border-fg text-fg dark:border-accent-magenta dark:text-accent-magenta rounded-pill bg-transparent group-hover:bg-fg/5 dark:group-hover:bg-accent-magenta/10 active:scale-[0.97] transition-all duration-150 self-end focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-fg">
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
        className={`fixed bottom-8 right-8 z-50 inline-flex items-center gap-2 px-4 py-2.5 rounded-pill bg-fg text-bg dark:bg-accent-magenta dark:text-white type-caption shadow-lg transition-all duration-300 ${
          showTop
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <ChevronUp size={14} aria-hidden="true" />
        Voltar ao topo
      </button>
    </CaseViewContext.Provider>
  );
}
