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
    <div className="pb-section">
      <CaseToggleBar />

      <div className="px-6 pt-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_240px] gap-12">
            <article className="case-editorial-prose">{children}</article>

            <aside className="hidden lg:block">
              <div className="sticky top-40">
                <div className="rounded-[16px] border border-border overflow-hidden divide-y divide-border">
                  {sidebar.map((block) => (
                    <div key={block.label} className="px-4 py-4">
                      <p className="type-caption text-accent-magenta mb-2">{block.label}</p>
                      <p className="type-body-xs text-fg-muted leading-relaxed">{block.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}
