import { CaseToggleBar } from './CaseToggleBar';
import { CaseSideNavList } from './CaseSideNavList';

interface SidebarBlock {
  label: string;
  content: string;
}

interface CaseOverviewLayoutProps {
  sidebar: SidebarBlock[];
  children: React.ReactNode;
}

export function CaseOverviewLayout({ sidebar, children }: CaseOverviewLayoutProps) {
  return (
    <div className="pb-section">
      <CaseToggleBar />

      <div className="px-6 pt-10">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_240px] gap-12 lg:gap-16">
            <article className="space-y-24">{children}</article>

            <aside>
              <div className="sticky top-40 max-h-[calc(100vh-12rem)] overflow-y-auto">
                <div className="rounded-[16px] border border-border overflow-hidden divide-y divide-border">
                  {sidebar.map((block) => (
                    <div key={block.label} className="px-5 py-4">
                      <p className="type-caption text-accent-magenta mb-2">{block.label}</p>
                      <p className="type-body-xs text-fg-muted leading-relaxed">{block.content}</p>
                    </div>
                  ))}
                </div>
                <CaseSideNavList />
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}
