import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export interface CaseCardProps {
  company?: string;
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
  company,
  title,
  description,
  tags,
  href,
  imageSrc,
  imageAlt,
}: CaseCardProps) {
  return (
    <Link
      href={href}
      className="group relative block h-[380px] md:h-[440px] rounded-[16px] overflow-hidden border-[0.5px] border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-fg"
    >
      <span className="sr-only">{title}</span>

      {/* Image area — slides up 96px on hover */}
      <div
        className="absolute inset-0 bg-surface-soft transition-transform duration-[420ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-[96px]"
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

        {/* Company badge */}
        {company && (
          <span className="absolute top-3 right-4 type-caption text-fg-muted">{company}</span>
        )}
      </div>

      {/* Repose panel — título completo, sem categoria */}
      <div
        className="absolute bottom-0 inset-x-0 h-[96px] bg-bg border-t border-[0.5px] border-border px-5 flex flex-col justify-center transition-opacity duration-200 group-hover:opacity-0"
        aria-hidden="true"
      >
        <p className="type-body-strong text-fg leading-snug">{title}</p>
      </div>

      {/* Hover panel — título completo, sem categoria, botão junto */}
      <div
        className="absolute bottom-0 inset-x-0 bg-bg border-t border-[0.5px] border-border px-5 py-5 translate-y-full group-hover:translate-y-0 transition-transform duration-[420ms] ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col"
        aria-hidden="true"
      >
        <p className="type-body-strong text-fg leading-snug mb-3">{title}</p>
        <p className="type-body-sm text-fg-muted line-clamp-2 mb-4">{description}</p>
        <div className="flex flex-wrap gap-1.5 mb-5">
          {tags.map((tag) => (
            <span
              key={tag}
              className="type-caption text-fg-subtle border-[0.5px] border-border rounded-full px-2 py-1"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-auto inline-flex items-center gap-1.5 type-caption text-fg-muted">
          <span>Ver case</span>
          <ArrowUpRight size={12} aria-hidden="true" className="shrink-0" />
        </div>
      </div>
    </Link>
  );
}
