import Image from 'next/image';
import Link from 'next/link';

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
  accentBg,
  accentText,
}: CaseCardProps) {
  return (
    <Link
      href={href}
      className="group relative block h-[300px] md:h-[340px] rounded-[16px] overflow-hidden border-[0.5px] border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-focus"
    >
      <span className="sr-only">{title} — {category}</span>

      {/* Image area — slides up 72px on hover */}
      <div
        className="absolute inset-0 transition-transform duration-[420ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-[72px]"
        style={{ backgroundColor: accentBg }}
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

      {/* Repose panel — 72px, visible at rest, fades on hover */}
      <div
        className="absolute bottom-0 inset-x-0 h-[72px] bg-bg border-t border-[0.5px] border-border px-5 flex flex-col justify-center gap-1 transition-opacity duration-200 group-hover:opacity-0"
        aria-hidden="true"
      >
        <p className="text-[10px] font-medium uppercase tracking-wider text-fg-subtle leading-none">
          {category}
        </p>
        <p className="text-[14px] font-medium leading-tight text-fg truncate">
          {title}
        </p>
      </div>

      {/* Hover panel — slides up from below */}
      <div
        className="absolute bottom-0 inset-x-0 bg-bg border-t border-[0.5px] border-border px-5 py-4 translate-y-full group-hover:translate-y-0 transition-transform duration-[420ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
        aria-hidden="true"
      >
        <p
          className="text-[10px] font-medium uppercase tracking-wider leading-none mb-2"
          style={{ color: accentText }}
        >
          {category}
        </p>
        <p className="text-[15px] font-medium leading-[1.3] text-fg mb-2">
          {title}
        </p>
        <p className="text-[12px] text-fg-muted leading-[1.6] line-clamp-2 mb-3">
          {description}
        </p>
        <div className="flex flex-wrap gap-1.5 mb-3">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] text-fg-subtle border-[0.5px] border-border rounded-full px-2 py-0.5 leading-none"
            >
              {tag}
            </span>
          ))}
        </div>
        <span className="text-[13px] font-medium text-primary">
          Ver case →
        </span>
      </div>
    </Link>
  );
}