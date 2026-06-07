'use client';

import { useRef } from 'react';
import { useCaseView } from './CaseViewContext';

export function CaseToggleBar() {
  const { view, switchView } = useCaseView();
  const barRef = useRef<HTMLDivElement>(null);

  const handleSwitch = (next: 'overview' | 'detailed') => {
    switchView(next);
    if (barRef.current) {
      // Scroll bar to top only if it hasn't reached the sticky position yet
      const barTop = barRef.current.getBoundingClientRect().top;
      if (barTop > 1) {
        barRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <div
      ref={barRef}
      className="sticky top-0 z-20 bg-bg flex items-center gap-3 py-4 border-b border-border mb-10"
    >
      <span className="type-body-sm text-fg-subtle hidden sm:inline whitespace-nowrap">
        Visualização do case:
      </span>
      <div className="inline-flex rounded-pill border border-black/15 overflow-hidden">
        <button
          onClick={() => handleSwitch('overview')}
          className={`px-5 py-2 type-body-sm transition-all duration-150 leading-none ${
            view === 'overview'
              ? 'bg-fg text-bg'
              : 'text-fg-muted hover:text-fg hover:bg-black/5'
          }`}
        >
          Simplificada
        </button>
        <button
          onClick={() => handleSwitch('detailed')}
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
