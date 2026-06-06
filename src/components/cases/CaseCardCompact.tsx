import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export interface CaseCardCompactProps {
  category: string;
  label: string;
  title: string;
  tags: string[];
  href: string;
  imageSrc: string;
  imageAlt: string;
  accentBg: string;
  accentText: string;
}

export function CaseCardCompact({
  category,
  label,
  title,
  tags,
  href,
  imageSrc,
  imageAlt,
  accentText,
}: CaseCardCompactProps) {
  return (
    <Link
      href={href}
      className="group relative block h-[220px] rounded-[16px] overflow-hidden border-[0.5px] border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-fg"
    >
      <span className="sr-only">{title} — {label} — {category}</span>

      {/* Image area — slides up 68px on hover */}
      <div
        className="absolute inset-0 bg-surface-soft transition-transform duration-[420ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-[68px]"
      >
        <div className="absolute inset-[20px]">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            sizes="(max-width: 640px) 50vw, 25vw"
            className="object-contain"
          />
        </div>
      </div>

      {/* Repose panel — 68px, fades on hover */}
      <div
        className="absolute bottom-0 inset-x-0 h-[68px] bg-bg border-t border-[0.5px] border-border px-4 flex flex-col justify-center gap-1.5 transition-opacity duration-200 group-hover:opacity-0"
        aria-hidden="true"
      >
        <p className="type-caption text-fg-subtle">{category}</p>
        <p className="type-body-sm text-fg font-[480] truncate">{title}</p>
      </div>

      {/* Hover panel — slides up from below */}
      <div
        className="absolute bottom-0 inset-x-0 bg-bg border-t border-[0.5px] border-border px-4 py-4 translate-y-full group-hover:translate-y-0 transition-transform duration-[420ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
        aria-hidden="true"
      >
        <div className="flex items-center gap-2 mb-2">
          <p className="type-caption" style={{ color: accentText }}>{category}</p>
          <span className="type-caption text-fg-subtle border-[0.5px] border-border rounded-full px-1.5 py-1">
            {label}
          </span>
        </div>
        <p className="type-body-sm text-fg font-[480] mb-2">{title}</p>
        <div className="flex flex-wrap gap-1 mb-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="type-caption text-fg-subtle border-[0.5px] border-border rounded-full px-2 py-1"
            >
              {tag}
            </span>
          ))}
        </div>
        <span className="inline-flex items-center gap-1 type-body-sm font-[480] text-fg">
          Ver case <ArrowUpRight size={14} aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}
