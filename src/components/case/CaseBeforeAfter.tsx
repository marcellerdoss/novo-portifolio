'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ZoomIn } from 'lucide-react';
import { Lightbox } from './Lightbox';

export interface CaseBeforeAfterProps {
  imageBefore: string;
  imageAfter: string;
  altBefore: string;
  altAfter: string;
  captionBefore?: string;
  captionAfter?: string;
  unoptimized?: boolean;
  // kept for backward compat — no longer used
  accentBg?: string;
  accentText?: string;
}

export function CaseBeforeAfter({
  imageBefore,
  imageAfter,
  altBefore,
  altAfter,
  captionBefore,
  captionAfter,
  unoptimized,
}: CaseBeforeAfterProps) {
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-[736px] mx-auto">

        {/* Before */}
        <figure className="space-y-1">
          <span className="ml-4 block type-caption text-fg-subtle">Antes</span>
          <button
            type="button"
            onClick={() => setLightbox({ src: imageBefore, alt: altBefore })}
            aria-label={`Ampliar: ${altBefore}`}
            className="group block w-full bg-white rounded-2xl p-2 shadow-sm ring-1 ring-black/5 cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fg"
          >
            <div className="relative rounded-[8px] overflow-hidden">
              <Image
                src={imageBefore}
                alt={altBefore}
                width={1200}
                height={800}
                sizes="(max-width: 768px) 100vw, 50vw"
                quality={92}
                className="w-full h-auto block"
                unoptimized={unoptimized}
              />
              <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                <span className="flex items-center gap-2 bg-black/50 backdrop-blur-sm text-white rounded-full px-3 py-1 type-caption">
                  <ZoomIn size={11} aria-hidden="true" />
                  ampliar
                </span>
              </div>
            </div>
          </button>
          {captionBefore && (
            <figcaption className="type-body-xs text-fg-subtle px-1">{captionBefore}</figcaption>
          )}
        </figure>

        {/* After */}
        <figure className="space-y-1">
          <span className="ml-4 block type-caption text-fg-subtle">Depois</span>
          <button
            type="button"
            onClick={() => setLightbox({ src: imageAfter, alt: altAfter })}
            aria-label={`Ampliar: ${altAfter}`}
            className="group block w-full bg-white rounded-2xl p-2 shadow-sm ring-1 ring-black/5 cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fg"
          >
            <div className="relative rounded-[8px] overflow-hidden">
              <Image
                src={imageAfter}
                alt={altAfter}
                width={1200}
                height={800}
                sizes="(max-width: 768px) 100vw, 50vw"
                quality={92}
                className="w-full h-auto block"
                unoptimized={unoptimized}
              />
              <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                <span className="flex items-center gap-2 bg-black/50 backdrop-blur-sm text-white rounded-full px-3 py-1 type-caption">
                  <ZoomIn size={11} aria-hidden="true" />
                  ampliar
                </span>
              </div>
            </div>
          </button>
          {captionAfter && (
            <figcaption className="type-body-xs text-fg-subtle px-1">{captionAfter}</figcaption>
          )}
        </figure>
      </div>

      {lightbox && (
        <Lightbox
          src={lightbox.src}
          alt={lightbox.alt}
          onClose={() => setLightbox(null)}
        />
      )}
    </>
  );
}
