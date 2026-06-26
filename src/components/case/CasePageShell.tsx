'use client';

import { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { CaseViewContext } from './CaseViewContext';
import { BackToTop } from '@/components/ui/BackToTop';
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
  const t = useTranslations('case');
  const locale = useLocale() as 'pt' | 'en';
  const [view, setView] = useState<'overview' | 'detailed'>('overview');

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

      {/* ── Case navigation inferior ── */}
      {(prevCase || nextCase) && (
        <nav
          aria-label={t('nav_label')}
          className="border-t border-border bg-surface-soft"
        >
          <div className="max-w-5xl mx-auto px-6 py-12 grid grid-cols-2 gap-3 md:gap-6">
            {prevCase ? (
              <Link href={prevCase.href} className="group flex flex-col gap-3">
                <span className="inline-flex items-center gap-1 md:gap-2 px-3 py-1.5 md:px-4 md:py-2 type-btn leading-none border border-fg text-fg rounded-pill bg-transparent group-hover:bg-fg/10 dark:group-hover:bg-white/10 active:scale-[0.97] transition-all duration-150 self-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-fg">
                  <ArrowLeft size={13} aria-hidden="true" /> {t('prev')}
                </span>
                <span className="type-body-sm text-fg-muted leading-snug pl-1">{prevCase.title[locale]}</span>
              </Link>
            ) : (
              <div />
            )}

            {nextCase ? (
              <Link href={nextCase.href} className="group flex flex-col gap-3 justify-self-end w-fit">
                <span className="inline-flex items-center gap-1 md:gap-2 px-3 py-1.5 md:px-4 md:py-2 type-btn leading-none border border-fg text-fg rounded-pill bg-transparent group-hover:bg-fg/10 dark:group-hover:bg-white/10 active:scale-[0.97] transition-all duration-150 self-end focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-fg">
                  {t('next')} <ArrowRight size={13} aria-hidden="true" />
                </span>
                <span className="type-body-sm text-fg-muted leading-snug">{nextCase.title[locale]}</span>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </nav>
      )}

      <BackToTop />
    </CaseViewContext.Provider>
  );
}
