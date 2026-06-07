'use client';

import { useCaseView } from './CaseViewContext';

export function CaseToggleBar() {
  const { view, switchView } = useCaseView();

  return (
    <div className="flex items-center gap-3 py-4 border-b border-border mb-10">
      <span className="type-caption text-fg-subtle hidden sm:inline whitespace-nowrap">
        Visualização do case:
      </span>
      <div className="inline-flex rounded-pill border border-black/15 overflow-hidden">
        <button
          onClick={() => switchView('overview')}
          className={`px-5 py-2 type-body-sm transition-all duration-150 leading-none ${
            view === 'overview'
              ? 'bg-fg text-bg'
              : 'text-fg-muted hover:text-fg hover:bg-black/5'
          }`}
        >
          Simplificada
        </button>
        <button
          onClick={() => switchView('detailed')}
          className={`px-5 py-2 type-body-sm transition-all duration-150 leading-none ${
            view === 'detailed'
              ? 'bg-fg text-bg'
              : 'text-fg-muted hover:text-fg hover:bg-black/5'
          }`}
        >
          Detalhada
        </button>
      </div>
    </div>
  );
}
