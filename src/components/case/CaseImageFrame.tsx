'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { X, ZoomIn } from 'lucide-react';

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

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const sizes = pair
    ? '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 360px'
    : '(max-width: 1024px) 100vw, 552px';

  // For portrait/fixed-height images: calculate display width from actual aspect ratio (rule of 4)
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
          aria-label={`Ampliar: ${alt}`}
          className={`group block bg-white rounded-2xl p-2 shadow-sm ring-1 ring-black/5 cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fg${fixedHeight != null ? '' : ' w-full'}`}
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
                ampliar
              </span>
            </div>
          </div>
        </button>
        {caption && (
          <figcaption className="type-body-xs text-fg-subtle px-1">{caption}</figcaption>
        )}
      </figure>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          className="fixed inset-0 z-[9999] overflow-y-auto"
          onClick={() => setOpen(false)}
        >
          <div className="absolute inset-0 bg-black/88 pointer-events-none" aria-hidden="true" />

          <div className="flex min-h-full items-center justify-center px-4 py-12">
            <div
              className="relative z-10 flex flex-col items-center w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Botão fechar alinhado à direita da imagem */}
              <div className="flex justify-end w-full mb-2" style={{ maxWidth: '88vw' }}>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Fechar"
                  className="text-white/70 hover:text-white transition-colors p-1 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <X size={20} aria-hidden="true" />
                </button>
              </div>

              <div className="bg-white rounded-2xl p-3 shadow-2xl" style={{ maxWidth: '88vw' }}>
                <Image
                  src={src}
                  alt={alt}
                  width={1200}
                  height={800}
                  sizes="88vw"
                  quality={95}
                  className="block rounded-[4px] w-auto h-auto"
                  style={{ maxWidth: '84vw', maxHeight: '72vh' }}
                />
              </div>

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
