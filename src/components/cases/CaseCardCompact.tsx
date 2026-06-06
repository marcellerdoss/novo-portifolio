import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export interface CaseCardCompactProps {
  company?: string;
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
  company,
  title,
  tags,
  href,
  imageSrc,
  imageAlt,
}: CaseCardCompactProps) {
  return (
    <Link
      href={href}
      className="group relative block h-[260px] rounded-[16px] overflow-hidden border-[0.5px] border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-fg"
    >
      <span className="sr-only">{title}</span>

      {/* Image area — slides up 80px on hover */}
      <div
        className="absolute inset-0 bg-canvas transition-transform duration-[420ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-[80px]"
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="(max-width: 640px) 50vw, 25vw"
          className="object-cover object-left-top"
        />

        {/* Company badge */}
        {company && (
          <span className="absolute top-3 right-3 type-caption text-fg-muted">{company}</span>
        )}
      </div>

      {/* Repose panel — título completo, sem categoria */}
      <div
        className="absolute bottom-0 inset-x-0 h-[80px] bg-bg border-t border-[0.5px] border-border px-4 flex flex-col justify-center transition-opacity duration-200 group-hover:opacity-0"
        aria-hidden="true"
      >
        <p className="type-body-strong text-fg leading-snug">{title}</p>
      </div>

      {/* Hover panel */}
      <div
        className="absolute bottom-0 inset-x-0 bg-bg border-t border-[0.5px] border-border px-4 py-4 translate-y-full group-hover:translate-y-0 transition-transform duration-[420ms] ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col"
        aria-hidden="true"
      >
        <p className="type-body-strong text-fg leading-snug mb-3">{title}</p>
        <div className="flex flex-wrap gap-1 mb-4">
          {tags.map((tag) => (
            <span
              key={tag}
              className="type-caption text-fg-subtle border border-border rounded-full px-3 py-1.5 leading-none"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-auto inline-flex items-center gap-1.5 type-caption text-accent-magenta">
          <span>Ver case</span>
          <ArrowUpRight size={12} aria-hidden="true" className="shrink-0" />
        </div>
      </div>
    </Link>
  );
}
