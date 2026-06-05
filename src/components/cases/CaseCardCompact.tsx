import Image from 'next/image';
import Link from 'next/link';

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
  accentBg,
  accentText,
}: CaseCardCompactProps) {
  return (
    <Link
      href={href}
      className="group relative block h-[220px] rounded-[16px] overflow-hidden border-[0.5px] border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-fg"
    >
      <span className="sr-only">{title} — {label} — {category}</span>

      {/* Image area — slides up 60px on hover */}
      <div
        className="absolute inset-0 transition-transform duration-[420ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-[60px]"
        style={{ backgroundColor: accentBg }}
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

      {/* Repose panel — 60px, fades on hover */}
      <div
        className="absolute bottom-0 inset-x-0 h-[60px] bg-bg border-t border-[0.5px] border-border px-4 flex flex-col justify-center gap-1 transition-opacity duration-200 group-hover:opacity-0"
        aria-hidden="true"
      >
        <p className="text-[10px] font-medium uppercase tracking-wider text-fg-subtle leading-none">
          {category}
        </p>
        <p className="text-[13px] font-medium leading-tight text-fg truncate">
          {title}
        </p>
      </div>

      {/* Hover panel — slides up from below */}
      <div
        className="absolute bottom-0 inset-x-0 bg-bg border-t border-[0.5px] border-border px-4 py-3 translate-y-full group-hover:translate-y-0 transition-transform duration-[420ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
        aria-hidden="true"
      >
        <div className="flex items-center gap-2 mb-1.5">
          <p
            className="text-[10px] font-medium uppercase tracking-wider leading-none"
            style={{ color: accentText }}
          >
            {category}
          </p>
          <span className="text-[10px] text-fg-subtle border-[0.5px] border-border rounded-full px-1.5 py-0.5 leading-none">
            {label}
          </span>
        </div>
        <p className="text-[13px] font-medium leading-tight text-fg mb-2">
          {title}
        </p>
        <div className="flex flex-wrap gap-1 mb-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] text-fg-subtle border-[0.5px] border-border rounded-full px-2 py-0.5 leading-none"
            >
              {tag}
            </span>
          ))}
        </div>
        <span className="text-[12px] font-medium text-fg">
          Ver case →
        </span>
      </div>
    </Link>
  );
}