'use client';

import { useTranslations } from 'next-intl';
import { useCaseView } from './CaseViewContext';

export function CaseToggleBar() {
  const t = useTranslations('case');
  const { view, switchView } = useCaseView();

  return (
    <div id="case-toggle" className="sticky top-[6.25rem] z-50 w-full bg-bg border-b border-border">
      <div className="max-w-5xl mx-auto px-6 flex items-center gap-3 py-3 md:py-0.5">
        <span className="type-body-sm text-fg-subtle hidden sm:inline md:hidden whitespace-nowrap">
          {t('view_label')}
        </span>
        <div
          role="group"
          aria-label={t('view_label')}
          className="inline-flex rounded-pill border border-black/15 dark:border-white/15 overflow-hidden"
        >
          <button
            onClick={() => switchView('overview')}
            aria-pressed={view === 'overview'}
            className={`px-5 py-2 md:px-4 md:py-1 type-body-sm md:text-[13px] transition-all duration-150 leading-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-fg ${
              view === 'overview'
                ? 'bg-fg text-bg'
                : 'text-fg-muted hover:text-fg hover:bg-black/5 dark:hover:bg-white/5'
            }`}
          >
            {t('simplified')}
          </button>
          <button
            onClick={() => switchView('detailed')}
            aria-pressed={view === 'detailed'}
            className={`px-5 py-2 md:px-4 md:py-1 type-body-sm md:text-[13px] transition-all duration-150 leading-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-fg ${
              view === 'detailed'
                ? 'bg-fg text-bg'
                : 'text-fg-muted hover:text-fg hover:bg-black/5 dark:hover:bg-white/5'
            }`}
          >
            {t('detailed')}
          </button>
        </div>
        <p className="sr-only" aria-live="polite" aria-atomic="true">
          {view === 'overview' ? t('simplified') : t('detailed')}
        </p>
      </div>
    </div>
  );
}
