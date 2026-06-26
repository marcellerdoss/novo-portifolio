import React from 'react';
import { CaseToggleBar } from './CaseToggleBar';
import { CaseSideNavList } from './CaseSideNavList';

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

      <div className="px-6 pt-10">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_240px] gap-12 lg:gap-16">
            <article className="case-editorial-prose">{children}</article>

            <aside>
              <div className="sticky top-40">
                <CaseSideNavList />
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}
