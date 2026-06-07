import { CaseToggleBar } from './CaseToggleBar';

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
    <div className="px-6 pb-section">
      <div className="max-w-5xl mx-auto">

        {/* Toggle antes do conteúdo "01 ·" */}
        <CaseToggleBar />

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_240px] gap-12 lg:gap-16 items-start">
          <article className="space-y-24">{children}</article>
          <aside className="lg:sticky lg:top-28 rounded-[16px] border border-border overflow-hidden divide-y divide-border">
            {sidebar.map((block) => (
              <div key={block.label} className="px-5 py-5">
                <p className="type-caption text-block-navy mb-2">{block.label}</p>
                <p className="type-body-sm text-fg-muted leading-relaxed">{block.content}</p>
              </div>
            ))}
          </aside>
        </div>

      </div>
    </div>
  );
}
