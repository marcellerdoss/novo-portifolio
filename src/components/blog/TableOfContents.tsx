'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import type { Heading } from '@/lib/mdx';

type Props = {
  headings: Heading[];
  label?: string;
};

export function TableOfContents({ headings, label = 'Neste artigo' }: Props) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    if (!headings.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: '-15% 0% -70% 0%' },
    );

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (!headings.length) return null;

  return (
    <nav aria-label={label} className="sticky top-24">
      <p className="type-caption text-fg mb-4">{label}</p>
      <ul className="space-y-2 border-l border-border pl-4">
        {headings.map(({ id, text, level }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className={cn(
                'type-body-sm block transition-colors duration-150 leading-snug',
                level === 3 && 'pl-3',
                activeId === id
                  ? 'text-fg font-[480]'
                  : 'text-fg-muted hover:text-fg',
              )}
            >
              {text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
