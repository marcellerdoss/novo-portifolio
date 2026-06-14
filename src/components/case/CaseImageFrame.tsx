'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ZoomIn } from 'lucide-react';
import { useLocale } from 'next-intl';
import { Lightbox } from './Lightbox';

interface Props {
  src: string;
  alt: string;
  caption?: string;
  pair?: boolean;
  fixedHeight?: number;
  imgWidth?: number;
  imgHeight?: number;
}

export function CaseImageFrame({ src, alt, caption, pair, fixedHeight, imgWidth = 1200, imgHeight = 800 }: Props) {
  const [open, setOpen] = useState(false);
  const locale = useLocale();

  const sizes = pair
    ? '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 360px'
    : '(max-width: 1024px) 100vw, 552px';

  const displayW = fixedHeight != null
    ? Math.round(fixedHeight * (imgWidth / imgHeight) / 4) * 4
    : 0;

  return (
    <>
      <figure
        className={fixedHeight != null ? 'gap-2' : `space-y-2${pair ? '' : ' max-w-[552px] mx-auto'}`}
        style={fixedHeight != null ? { display: 'grid', gridTemplateColumns: 'min-content' } : undefined}
      >
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label={`${locale === 'en' ? 'Zoom in: ' : 'Ampliar: '}${alt}`}
          className={`group block bg-white dark:bg-surface-soft rounded-2xl p-2 shadow-sm ring-1 ring-black/5 dark:ring-white/10 cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fg${fixedHeight != null ? '' : ' w-full'}`}
        >
          <div
            className="relative rounded-[8px] overflow-hidden"
            style={fixedHeight != null ? { width: displayW, height: fixedHeight } : undefined}
          >
            {fixedHeight != null ? (
              <Image
                src={src}
                alt={alt}
                fill
                sizes={`${displayW}px`}
                quality={92}
                style={{ objectFit: 'contain', objectPosition: 'top' }}
              />
            ) : (
              <Image
                src={src}
                alt={alt}
                width={imgWidth}
                height={imgHeight}
                sizes={sizes}
                quality={92}
                className="w-full h-auto block"
              />
            )}
            <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
              <span className="flex items-center gap-2 bg-black/50 backdrop-blur-sm text-white rounded-full px-3 py-1 type-caption">
                <ZoomIn size={11} aria-hidden="true" />
                {locale === 'en' ? 'zoom in' : 'ampliar'}
              </span>
            </div>
          </div>
        </button>
        {caption && (
          <figcaption className="type-body-xs text-fg-subtle px-1">{caption}</figcaption>
        )}
      </figure>

      {open && (
        <Lightbox src={src} alt={alt} caption={caption} onClose={() => setOpen(false)} />
      )}
    </>
  );
}
