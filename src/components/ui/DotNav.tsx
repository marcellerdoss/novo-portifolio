'use client';

import { useEffect, useState } from 'react';

type SectionInfo = {
  id: string;
  label: string;
};

export function DotNav() {
  const [sections, setSections] = useState<SectionInfo[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>('section[id][data-label]')
    );

    if (elements.length === 0) return;

    setSections(
      elements.map((el) => ({
        id: el.id,
        label: el.dataset.label ?? el.id,
      }))
    );
    setActiveId(elements[0].id);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-50% 0px -50% 0px', threshold: 0 }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  if (sections.length === 0) return null;

  const handleClick = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      aria-label="Navegação por seções"
      className="group fixed top-1/2 right-[40px] -translate-y-1/2 z-40 flex flex-col items-end gap-4"
    >
      {sections.map((section) => {
        const isActive = section.id === activeId;
        return (
          <button
            key={section.id}
            type="button"
            onClick={() => handleClick(section.id)}
            aria-current={isActive ? 'true' : undefined}
            aria-label={section.label}
            className="flex items-center gap-3 py-1"
          >
            <span
              className={`hidden sm:inline-block whitespace-nowrap rounded-md bg-bg/95 px-2 py-1 shadow-sm text-[11px] font-bold uppercase tracking-[0.12em] opacity-0 -translate-x-2 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:translate-x-0 ${
                isActive ? 'text-fg' : 'text-fg-subtle'
              }`}
            >
              {section.label}
            </span>
            <span
              className={`block w-2 shrink-0 transition-all duration-300 ease-out ${
                isActive
                  ? 'h-[22px] rounded-[4px] bg-accent-magenta'
                  : 'h-2 rounded-full bg-fg-subtle group-hover:bg-fg-muted'
              }`}
            />
          </button>
        );
      })}
    </nav>
  );
}
