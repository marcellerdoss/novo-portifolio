'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';

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

  useEffect(() => {
    if (lightboxIdx === null) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxIdx(null);
      if (e.key === 'ArrowLeft') setLightboxIdx(i => (i !== null && i > 0 ? i - 1 : i));
      if (e.key === 'ArrowRight') setLightboxIdx(i => (i !== null && i < total - 1 ? i + 1 : i));
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
    };
  }, [lightboxIdx, total]);

  const lbImg = lightboxIdx !== null ? images[lightboxIdx] : null;

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
                className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-fg text-bg dark:bg-accent-magenta dark:text-white flex items-center justify-center disabled:opacity-0 hover:opacity-90 transition-all shadow-sm"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={() => setCurrent(i => i + 1)}
                disabled={current === total - 1}
                aria-label="Próxima imagem"
                className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-fg text-bg dark:bg-accent-magenta dark:text-white flex items-center justify-center disabled:opacity-0 hover:opacity-90 transition-all shadow-sm"
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

      {lightboxIdx !== null && lbImg && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={lbImg.alt}
          className="fixed inset-0 z-[9999] overflow-y-auto"
          onClick={() => setLightboxIdx(null)}
        >
          <div className="absolute inset-0 bg-black/88 pointer-events-none" aria-hidden="true" />

          <div className="flex min-h-full items-center justify-center px-4 py-12">
            <div
              className="relative z-10 flex flex-col items-center w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-end w-full mb-2" style={{ maxWidth: '88vw' }}>
                <button
                  type="button"
                  onClick={() => setLightboxIdx(null)}
                  aria-label="Fechar"
                  className="text-white/70 hover:text-white transition-colors p-1 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <X size={20} aria-hidden="true" />
                </button>
              </div>

              <div className="relative flex items-center gap-3">
                {total > 1 && (
                  <button
                    onClick={() => setLightboxIdx(i => (i !== null && i > 0 ? i - 1 : i))}
                    disabled={lightboxIdx === 0}
                    aria-label="Imagem anterior"
                    className="w-8 h-8 rounded-full bg-white/20 text-white flex items-center justify-center disabled:opacity-0 hover:bg-white/30 transition-all shrink-0"
                  >
                    <ChevronLeft size={16} />
                  </button>
                )}

                <div className="bg-white rounded-2xl p-3 shadow-2xl" style={{ maxWidth: '80vw' }}>
                  <Image
                    src={lbImg.src}
                    alt={lbImg.alt}
                    width={1200}
                    height={800}
                    sizes="80vw"
                    quality={95}
                    className="block rounded-[4px] w-auto h-auto"
                    style={{ maxWidth: '76vw', maxHeight: '72vh' }}
                  />
                </div>

                {total > 1 && (
                  <button
                    onClick={() => setLightboxIdx(i => (i !== null && i < total - 1 ? i + 1 : i))}
                    disabled={lightboxIdx === total - 1}
                    aria-label="Próxima imagem"
                    className="w-8 h-8 rounded-full bg-white/20 text-white flex items-center justify-center disabled:opacity-0 hover:bg-white/30 transition-all shrink-0"
                  >
                    <ChevronRight size={16} />
                  </button>
                )}
              </div>

              {total > 1 && (
                <div className="flex justify-center gap-1.5 mt-4">
                  {images.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setLightboxIdx(i)}
                      aria-label={`Imagem ${i + 1} de ${total}`}
                      className={`h-1.5 rounded-full transition-all duration-200 ${
                        i === lightboxIdx ? 'w-4 bg-white/60' : 'w-1.5 bg-white/25 hover:bg-white/40'
                      }`}
                    />
                  ))}
                </div>
              )}

              {caption && (
                <p className="mt-4 type-body-xs text-white/50 text-center px-4" style={{ maxWidth: '88vw' }}>
                  {caption}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
