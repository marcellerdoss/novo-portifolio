'use client';

import { useTranslations } from 'next-intl';
import { useCaseView } from './CaseViewContext';

export function CaseToggleBar() {
  const t = useTranslations('case');
  const { view, switchView } = useCaseView();

  return (
    <div id="case-toggle" className="sticky top-[6.25rem] z-30 w-full bg-bg px-6">
      <div className="max-w-5xl mx-auto flex items-center gap-3 py-2">
        <span className="type-body-sm text-fg-subtle hidden sm:inline whitespace-nowrap">
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
            className={`px-3 py-1 type-btn leading-none transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-fg ${
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
            className={`px-3 py-1 type-btn leading-none transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-fg ${
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
