'use client';

import { useCaseView } from './CaseViewContext';

export function CaseToggleBar() {
  const { view, switchView } = useCaseView();

  return (
    <div className="flex items-center gap-3 py-4 border-b border-border mb-10">
      <span className="type-caption text-fg-subtle hidden sm:inline">
        Visualização do conteúdo:
      </span>
      <div className="inline-flex rounded-full border border-border overflow-hidden">
        <button
          onClick={() => switchView('overview')}
          className={`px-4 py-1.5 type-caption transition-colors leading-none ${
            view === 'overview'
              ? 'bg-fg text-bg'
              : 'text-fg-muted hover:text-fg'
          }`}
        >
          Simplificada
        </button>
        <button
          onClick={() => switchView('detailed')}
          className={`px-4 py-1.5 type-caption transition-colors leading-none ${
            view === 'detailed'
              ? 'bg-fg text-bg'
              : 'text-fg-muted hover:text-fg'
          }`}
        >
          Detalhada
        </button>
      </div>
    </div>
  );
}
