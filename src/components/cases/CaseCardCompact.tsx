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
  ctaLabel?: string;
}

export function CaseCardCompact({
  company,
  label,
  title,
  tags,
  href,
  imageSrc,
  imageAlt,
  accentBg,
  mockup,
  ctaLabel = 'Ver case',
}: CaseCardCompactProps) {
  return (
    <Link
      href={href}
      className="group block rounded-[16px] overflow-hidden border border-black/15 dark:border-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-fg"
    >
      <span className="sr-only">{title}</span>

      {/* ── Mobile: layout empilhado ── */}
      <div className="md:hidden">
        <div
          className="relative w-full aspect-[4/3] overflow-hidden"
          style={{ backgroundColor: mockup ? accentBg : undefined }}
        >
          {mockup === 'mobile' && (
            /* Mobile preview: phone com margem no topo, corte embaixo */
            <div className="absolute inset-0 flex items-start justify-center pt-4">
              <div
                className="relative rounded-[22px] border-[4px] border-neutral-900 dark:border-white shadow-xl overflow-hidden"
                style={{ width: '38%', aspectRatio: '9 / 19.5' }}
              >
                <div className="absolute top-0 inset-x-0 z-10 flex justify-center">
                  <div className="w-[36%] h-[8px] bg-neutral-900 dark:bg-white rounded-b-full" />
                </div>
                <Image src={imageSrc} alt={imageAlt} fill sizes="100vw" className="object-cover object-top" />
              </div>
            </div>
          )}
          {mockup === 'desktop' && (
            <div className="absolute inset-0 flex items-center justify-center px-5 pb-2">
              <div className="w-full">
                <div
                  className="rounded-t-[6px] overflow-hidden border-[4px] border-b-0 border-neutral-900 dark:border-white bg-neutral-100 dark:bg-white/10 relative shadow-lg"
                  style={{ aspectRatio: '16 / 10' }}
                >
                  <div className="absolute top-0 inset-x-0 z-10 flex justify-center pt-[4px]">
                    <div className="w-1 h-1 rounded-full bg-neutral-500 dark:bg-white/60" />
                  </div>
                  <Image src={imageSrc} alt={imageAlt} fill sizes="100vw" className="object-cover object-top" />
                </div>
                <div className="h-[4px] bg-neutral-900 dark:bg-white" />
                <div className="flex justify-center">
                  <div className="h-[3px] bg-neutral-700 dark:bg-white/70 rounded-b-md" style={{ width: '65%' }} />
                </div>
              </div>
            </div>
          )}
          {!mockup && (
            <>
              <div className="absolute inset-0 bg-canvas" />
              <Image src={imageSrc} alt={imageAlt} fill sizes="100vw" className="object-cover object-left-top" />
              {company && (
                <span className="absolute top-3 right-3 type-caption text-fg-subtle">{company}</span>
              )}
            </>
          )}
        </div>
        <div className="bg-canvas dark:bg-surface-soft border-t border-black/10 dark:border-white/10 px-4 py-4">
          <p className="type-body-strong text-fg leading-snug mb-1">{title}</p>
          {label && <p className="type-body-sm text-fg-muted mb-3">{label}</p>}
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
          <div>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 type-body-sm border border-fg text-fg rounded-pill bg-transparent">
              {ctaLabel} <ArrowUpRight size={12} aria-hidden="true" className="shrink-0" />
            </span>
          </div>
        </div>
      </div>

      {/* ── Desktop: proporção 4:3, mockup fixo, só texto sobe ── */}
      <div className="hidden md:block relative" style={{ aspectRatio: '4 / 3' }}>

        {/* Flex layout: preview cresce, painel de texto fica na base */}
        <div className="absolute inset-0 flex flex-col">

          {/* Zona de preview — cresce para preencher o espaço disponível */}
          <div
            className="flex-1 min-h-0 relative"
            style={{ backgroundColor: mockup ? accentBg : undefined }}
          >
            <div className="absolute inset-4 flex items-center justify-center overflow-hidden">
              {mockup === 'mobile' && (
                <div
                  className="relative h-full rounded-[22px] border-[4px] border-neutral-900 dark:border-white shadow-xl overflow-hidden"
                  style={{ aspectRatio: '9 / 19.5' }}
                >
                  <div className="absolute top-0 inset-x-0 z-10 flex justify-center">
                    <div className="w-[36%] h-[8px] bg-neutral-900 dark:bg-white rounded-b-full" />
                  </div>
                  <Image src={imageSrc} alt={imageAlt} fill sizes="33vw" className="object-cover object-top" />
                </div>
              )}
              {mockup === 'desktop' && (
                <div className="w-[78%]">
                  <div
                    className="rounded-t-[6px] overflow-hidden border-[4px] border-b-0 border-neutral-900 dark:border-white bg-neutral-100 dark:bg-white/10 relative shadow-lg"
                    style={{ aspectRatio: '16 / 10' }}
                  >
                    <div className="absolute top-0 inset-x-0 z-10 flex justify-center pt-[4px]">
                      <div className="w-1 h-1 rounded-full bg-neutral-500 dark:bg-white/60" />
                    </div>
                    <Image src={imageSrc} alt={imageAlt} fill sizes="33vw" className="object-cover object-top" />
                  </div>
                  <div className="h-[4px] bg-neutral-900 dark:bg-white" />
                  <div className="flex justify-center">
                    <div className="h-[3px] bg-neutral-700 dark:bg-white/70 rounded-b-md" style={{ width: '65%' }} />
                  </div>
                </div>
              )}
              {!mockup && (
                <div className="absolute inset-0">
                  <Image src={imageSrc} alt={imageAlt} fill sizes="33vw" className="object-cover object-left-top" />
                  {company && (
                    <span className="absolute top-3 right-3 type-caption text-fg-subtle">{company}</span>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Painel repouso — título + label, fica na base */}
          <div
            className="shrink-0 bg-canvas dark:bg-surface-soft border-t border-black/10 dark:border-white/10 px-4 py-4 flex flex-col transition-opacity duration-200 group-hover:opacity-0"
            aria-hidden="true"
          >
            <p className="type-body-strong text-fg leading-snug mb-1">{title}</p>
            {label && <p className="type-body-sm text-fg-muted line-clamp-1">{label}</p>}
          </div>

        </div>

        {/* Painel hover — sobe do fundo (absolute, cobre o painel de repouso) */}
        <div
          className="absolute bottom-0 inset-x-0 bg-canvas dark:bg-surface-soft border-t border-black/10 dark:border-white/10 px-4 py-4 translate-y-full group-hover:translate-y-0 transition-transform duration-[420ms] ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col"
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
            <span className="inline-flex items-center gap-2 px-4 py-1.5 type-body-sm border border-fg text-fg rounded-pill bg-transparent">
              {ctaLabel} <ArrowUpRight size={12} aria-hidden="true" className="shrink-0" />
            </span>
          </div>
        </div>

      </div>
    </Link>
  );
}
