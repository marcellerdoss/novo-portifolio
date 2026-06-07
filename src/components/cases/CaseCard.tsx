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
  mockup?: 'mobile' | 'desktop';
  ctaLabel?: string;
}

function PhoneMockup({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="absolute inset-0 flex items-end justify-center pb-6">
      <div
        className="relative rounded-[26px] border-[5px] border-neutral-900 dark:border-white shadow-2xl overflow-hidden"
        style={{ width: '42%', aspectRatio: '9 / 19.5' }}
      >
        <div className="absolute top-0 inset-x-0 z-10 flex justify-center">
          <div className="w-[36%] h-[10px] bg-neutral-900 dark:bg-white rounded-b-full" />
        </div>
        <Image src={src} alt={alt} fill sizes="25vw" className="object-cover object-top" />
      </div>
    </div>
  );
}

function LaptopMockup({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center px-7 pb-2">
      <div className="w-full">
        <div
          className="rounded-t-[8px] overflow-hidden border-[5px] border-b-0 border-neutral-900 dark:border-white bg-neutral-100 dark:bg-white/10 relative shadow-xl"
          style={{ aspectRatio: '16 / 10' }}
        >
          <div className="absolute top-0 inset-x-0 z-10 flex justify-center pt-[5px]">
            <div className="w-1.5 h-1.5 rounded-full bg-neutral-500 dark:bg-white/60" />
          </div>
          <Image src={src} alt={alt} fill sizes="50vw" className="object-cover object-top" />
        </div>
        <div className="h-[5px] bg-neutral-900 dark:bg-white" />
        <div className="flex justify-center">
          <div className="h-[4px] bg-neutral-700 dark:bg-white/70 rounded-b-md" style={{ width: '65%' }} />
        </div>
      </div>
    </div>
  );
}

export function CaseCard({
  company,
  title,
  description,
  tags,
  href,
  imageSrc,
  imageAlt,
  accentBg,
  mockup,
  ctaLabel = 'Ver case',
}: CaseCardProps) {
  return (
    <Link
      href={href}
      className="group block rounded-[16px] overflow-hidden border border-black/15 dark:border-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-fg"
    >
      <span className="sr-only">{title}</span>

      {/* ── Mobile: layout empilhado, sem hover ── */}
      <div className="md:hidden">
        <div
          className="relative w-full aspect-[4/3]"
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
                sizes="100vw"
                className="object-cover object-left-top"
              />
              {company && (
                <span className="absolute top-3 right-4 type-caption text-fg-subtle">{company}</span>
              )}
            </>
          )}
        </div>
        <div className="bg-canvas dark:bg-surface-soft border-t border-black/10 dark:border-white/10 px-5 py-5">
          <p className="type-headline text-fg leading-snug mb-2">{title}</p>
          <p className="type-body-sm text-fg-muted mb-4">{description}</p>
          <div className="flex flex-wrap gap-1.5 mb-5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="type-caption text-fg-subtle border border-border rounded-full px-3 py-1.5 leading-none"
              >
                {tag}
              </span>
            ))}
          </div>
          <div>
            <span className="inline-flex items-center gap-2 px-5 py-2 type-body-sm border border-fg text-fg rounded-pill bg-transparent">
              {ctaLabel} <ArrowUpRight size={12} aria-hidden="true" className="shrink-0" />
            </span>
          </div>
        </div>
      </div>

      {/* ── Desktop: altura fixa + hover overlay ── */}
      <div className="hidden md:block relative h-[440px]">
        {/* Image area — slides up 96px on hover */}
        <div
          className="case-card-image-area absolute inset-0 transition-transform duration-[420ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-[96px]"
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
                sizes="50vw"
                className="object-cover object-left-top"
              />
            </>
          )}
          {company && !mockup && (
            <span className="absolute top-3 right-4 type-caption text-fg-subtle">{company}</span>
          )}
        </div>

        {/* Repose panel */}
        <div
          className="absolute bottom-0 inset-x-0 h-[96px] bg-canvas dark:bg-surface-soft border-t border-black/10 dark:border-white/10 px-5 flex flex-col justify-center transition-opacity duration-200 group-hover:opacity-0"
          aria-hidden="true"
        >
          <p className="type-headline text-fg leading-snug">{title}</p>
        </div>

        {/* Hover panel */}
        <div
          className="absolute bottom-0 inset-x-0 bg-canvas dark:bg-surface-soft border-t border-black/10 dark:border-white/10 px-5 py-5 translate-y-full group-hover:translate-y-0 transition-transform duration-[420ms] ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col"
          aria-hidden="true"
        >
          <p className="type-headline text-fg leading-snug mb-2">{title}</p>
          <p className="type-body-sm text-fg-muted line-clamp-2 mb-4">{description}</p>
          <div className="flex flex-wrap gap-1.5 mb-5">
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
            <span className="inline-flex items-center gap-2 px-5 py-2 type-body-sm border border-fg text-fg rounded-pill bg-transparent">
              {ctaLabel} <ArrowUpRight size={12} aria-hidden="true" className="shrink-0" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
