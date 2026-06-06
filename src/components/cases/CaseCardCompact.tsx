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
      className="group relative block h-[260px] rounded-[16px] overflow-hidden border-[0.5px] border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-fg"
    >
      <span className="sr-only">{title} — {label} — {category}</span>

      {/* Image area — slides up 80px on hover */}
      <div
        className="absolute inset-0 bg-surface-soft transition-transform duration-[420ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-[80px]"
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

      {/* Repose panel — 80px, title only, fades on hover */}
      <div
        className="absolute bottom-0 inset-x-0 h-[80px] bg-bg border-t border-[0.5px] border-border px-4 flex flex-col justify-center transition-opacity duration-200 group-hover:opacity-0"
        aria-hidden="true"
      >
        <p className="type-body-strong text-fg leading-snug">{title}</p>
      </div>

      {/* Hover panel — slides up from below */}
      <div
        className="absolute bottom-0 inset-x-0 bg-bg border-t border-[0.5px] border-border px-4 py-4 translate-y-full group-hover:translate-y-0 transition-transform duration-[420ms] ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col"
        aria-hidden="true"
      >
        <div className="flex items-center gap-2 mb-2">
          <p className="type-caption" style={{ color: accentText }}>{category}</p>
          <span className="type-caption text-fg-subtle border-[0.5px] border-border rounded-full px-1.5 py-1">
            {label}
          </span>
        </div>
        <p className="type-body-strong text-fg leading-snug mb-3">{title}</p>
        <div className="flex flex-wrap gap-1">
          {tags.map((tag) => (
            <span
              key={tag}
              className="type-caption text-fg-subtle border-[0.5px] border-border rounded-full px-2 py-1"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between gap-2 type-caption text-fg-muted">
          <span>Ver case</span>
          <ArrowUpRight size={14} aria-hidden="true" className="shrink-0 text-fg-muted group-hover:text-fg transition-colors" />
        </div>
      </div>
    </Link>
  );
}
