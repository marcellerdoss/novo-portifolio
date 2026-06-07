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
  mockup?: 'mobile' | 'desktop';
}

function PhoneMockup({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="absolute inset-0 flex items-end justify-center pb-5">
      <div
        className="relative rounded-[22px] border-[4px] border-neutral-900 shadow-xl overflow-hidden"
        style={{ width: '38%', aspectRatio: '9 / 19.5' }}
      >
        <div className="absolute top-0 inset-x-0 z-10 flex justify-center">
          <div className="w-[36%] h-[8px] bg-neutral-900 rounded-b-full" />
        </div>
        <Image src={src} alt={alt} fill sizes="20vw" className="object-cover object-top" />
      </div>
    </div>
  );
}

function LaptopMockup({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center px-5 pb-2">
      <div className="w-full">
        <div
          className="rounded-t-[6px] overflow-hidden border-[4px] border-b-0 border-neutral-900 bg-neutral-900 relative shadow-lg"
          style={{ aspectRatio: '16 / 10' }}
        >
          <div className="absolute top-0 inset-x-0 z-10 flex justify-center pt-[4px]">
            <div className="w-1 h-1 rounded-full bg-neutral-600" />
          </div>
          <Image src={src} alt={alt} fill sizes="33vw" className="object-cover object-top" />
        </div>
        <div className="h-[4px] bg-neutral-800" />
        <div className="flex justify-center">
          <div className="h-[3px] bg-neutral-700 rounded-b-md" style={{ width: '65%' }} />
        </div>
      </div>
    </div>
  );
}

export function CaseCardCompact({
  company,
  title,
  tags,
  href,
  imageSrc,
  imageAlt,
  accentBg,
  mockup,
}: CaseCardCompactProps) {
  return (
    <Link
      href={href}
      className="group relative block h-[260px] rounded-[16px] overflow-hidden border-[0.5px] border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-fg"
    >
      <span className="sr-only">{title}</span>

      {/* Image area — slides up 80px on hover */}
      <div
        className="absolute inset-0 transition-transform duration-[420ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-[80px]"
        style={{ backgroundColor: mockup ? accentBg : undefined }}
      >
        {mockup === 'mobile' && <PhoneMockup src={imageSrc} alt={imageAlt} />}
        {mockup === 'desktop' && <LaptopMockup src={imageSrc} alt={imageAlt} />}
        {!mockup && (
          <>
            <div className="absolute inset-0 bg-canvas" />
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              sizes="(max-width: 640px) 50vw, 25vw"
              className="object-cover object-left-top"
            />
          </>
        )}

        {/* Company badge */}
        {company && (
          <span className="absolute top-3 right-3 type-caption text-fg-muted">{company}</span>
        )}
      </div>

      {/* Repose panel */}
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
        <div className="mt-auto">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 type-body-sm border border-accent-magenta text-accent-magenta rounded-pill bg-transparent">
            Ver case <ArrowUpRight size={12} aria-hidden="true" className="shrink-0" />
          </span>
        </div>
      </div>
    </Link>
  );
}
