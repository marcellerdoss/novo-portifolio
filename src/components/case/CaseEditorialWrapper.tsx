import React from 'react';
import { CaseToggleBar } from './CaseToggleBar';

export interface SidebarBlock {
  label: string;
  content: string;
}

interface CaseEditorialWrapperProps {
  sidebar: SidebarBlock[];
  children: React.ReactNode;
}

export function CaseEditorialWrapper({ sidebar, children }: CaseEditorialWrapperProps) {
  return (
    <div className="px-6 pb-section">
      <div className="max-w-5xl mx-auto">

        <CaseToggleBar />

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_240px] gap-12 lg:gap-16 items-start">
          <article className="case-editorial-prose">{children}</article>

          <aside className="lg:sticky lg:top-28 rounded-[16px] border border-border overflow-hidden divide-y divide-border">
            {sidebar.map((block) => (
              <div key={block.label} className="px-5 py-5">
                <p className="type-caption text-block-navy uppercase tracking-wide mb-2">
                  {block.label}
                </p>
                <p className="type-body-sm text-fg-muted leading-relaxed">{block.content}</p>
              </div>
            ))}
          </aside>
        </div>

      </div>
    </div>
  );
}
