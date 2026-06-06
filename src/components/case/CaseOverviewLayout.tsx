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
    <div className="py-section px-6">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_240px] gap-12 lg:gap-16 items-start">
        <article className="space-y-24">{children}</article>
        <aside className="lg:sticky lg:top-28 rounded-[16px] border border-border overflow-hidden divide-y divide-border">
          {sidebar.map((block) => (
            <div key={block.label} className="px-5 py-5">
              <p className="type-caption text-fg-subtle uppercase tracking-wide mb-2">{block.label}</p>
              <p className="type-body-sm text-fg-muted leading-relaxed">{block.content}</p>
            </div>
          ))}
        </aside>
      </div>
    </div>
  );
}
