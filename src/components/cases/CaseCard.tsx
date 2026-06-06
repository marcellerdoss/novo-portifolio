import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export interface CaseCardProps {
  category: string;
  title: string;
  description: string;
  tags: string[];
  href: string;
  imageSrc: string;
  imageAlt: string;
  accentBg: string;
  accentText: string;
}

export function CaseCard({
  category,
  title,
  description,
  tags,
  href,
  imageSrc,
  imageAlt,
  accentText,
}: CaseCardProps) {
  return (
    <Link
      href={href}
      className="group relative block h-[300px] md:h-[340px] rounded-[16px] overflow-hidden border-[0.5px] border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-fg"
    >
      <span className="sr-only">{title} — {category}</span>

      {/* Image area — slides up 80px on hover */}
      <div
        className="absolute inset-0 bg-surface-soft transition-transform duration-[420ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-[80px]"
      >
        <div className="absolute inset-[24px]">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-contain"
          />
        </div>
      </div>

      {/* Repose panel — 80px, visible at rest, fades on hover */}
      <div
        className="absolute bottom-0 inset-x-0 h-[80px] bg-bg border-t border-[0.5px] border-border px-5 flex flex-col justify-center gap-1.5 transition-opacity duration-200 group-hover:opacity-0"
        aria-hidden="true"
      >
        <p className="type-caption text-fg-subtle">{category}</p>
        <p className="type-body-sm text-fg font-[480] truncate">{title}</p>
      </div>

      {/* Hover panel — slides up from below */}
      <div
        className="absolute bottom-0 inset-x-0 bg-bg border-t border-[0.5px] border-border px-5 py-5 translate-y-full group-hover:translate-y-0 transition-transform duration-[420ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
        aria-hidden="true"
      >
        <p className="type-caption mb-2" style={{ color: accentText }}>
          {category}
        </p>
        <p className="type-body-strong text-fg mb-2">{title}</p>
        <p className="type-body-sm text-fg-muted line-clamp-2 mb-3">{description}</p>
        <div className="flex flex-wrap gap-1.5 mb-3">
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
