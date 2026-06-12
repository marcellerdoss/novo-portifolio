'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { Lightbox } from './Lightbox';

interface CarouselImage {
  src: string;
  alt: string;
}

interface CaseCarouselProps {
  images: CarouselImage[];
  caption?: string;
}

export function CaseCarousel({ images, caption }: CaseCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const total = images.length;

  return (
    <>
      <figure className={`space-y-2 mx-auto ${total > 1 ? 'max-w-[632px]' : 'max-w-[552px]'}`}>
        <div className={`relative${total > 1 ? ' px-10' : ''}`}>
          <button
            type="button"
            onClick={() => setLightboxIdx(current)}
            aria-label={`Ampliar: ${images[current].alt}`}
            className="group block w-full bg-white rounded-2xl p-2 shadow-sm ring-1 ring-black/5 cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fg"
          >
            <div className="relative rounded-[8px] overflow-hidden">
              <Image
                src={images[current].src}
                alt={images[current].alt}
                width={1200}
                height={800}
                sizes="(max-width: 1024px) 100vw, 552px"
                quality={92}
                className="w-full h-auto block"
              />
              <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                <span className="flex items-center gap-2 bg-black/50 backdrop-blur-sm text-white rounded-full px-3 py-1 type-caption">
                  <ZoomIn size={11} aria-hidden="true" />
                  ampliar
                </span>
              </div>
            </div>
          </button>

          {total > 1 && (
            <>
              <button
                onClick={() => setCurrent(i => i - 1)}
                disabled={current === 0}
                aria-label="Imagem anterior"
                className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-fg/10 dark:bg-white/10 text-fg dark:text-white flex items-center justify-center disabled:opacity-0 hover:bg-fg/20 dark:hover:bg-white/20 transition-all"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={() => setCurrent(i => i + 1)}
                disabled={current === total - 1}
                aria-label="Próxima imagem"
                className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-fg/10 dark:bg-white/10 text-fg dark:text-white flex items-center justify-center disabled:opacity-0 hover:bg-fg/20 dark:hover:bg-white/20 transition-all"
              >
                <ChevronRight size={16} />
              </button>
            </>
          )}
        </div>

        {total > 1 && (
          <div className="flex justify-center gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Imagem ${i + 1} de ${total}`}
                className={`h-1.5 rounded-full transition-all duration-200 ${
                  i === current ? 'w-4 bg-fg/40 dark:bg-white/40' : 'w-1.5 bg-fg/15 dark:bg-white/15 hover:bg-fg/30 dark:hover:bg-white/30'
                }`}
              />
            ))}
          </div>
        )}

        {caption && (
          <figcaption className={`type-body-xs text-fg-subtle px-1${total > 1 ? ' mx-10' : ''}`}>
            {caption}
          </figcaption>
        )}
      </figure>

      {lightboxIdx !== null && (
        <Lightbox
          src={images[lightboxIdx].src}
          alt={images[lightboxIdx].alt}
          caption={caption}
          onClose={() => setLightboxIdx(null)}
          onPrev={() => setLightboxIdx(i => (i !== null && i > 0 ? i - 1 : i))}
          onNext={() => setLightboxIdx(i => (i !== null && i < total - 1 ? i + 1 : i))}
          hasPrev={lightboxIdx > 0}
          hasNext={lightboxIdx < total - 1}
          total={total}
          currentIdx={lightboxIdx}
          onGoTo={setLightboxIdx}
        />
      )}
    </>
  );
}
