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
}

export function CaseImageFrame({ src, alt, caption, pair, fixedHeight }: Props) {
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

  return (
    <>
      <figure className={`space-y-2${pair ? '' : ' max-w-[552px] mx-auto'}`}>
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label={`Ampliar: ${alt}`}
          className="group block w-full bg-white rounded-2xl p-2 shadow-sm ring-1 ring-black/5 cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fg"
        >
          <div
            className="relative rounded-[8px] overflow-hidden"
            style={fixedHeight ? { height: fixedHeight } : undefined}
          >
            <Image
              src={src}
              alt={alt}
              width={1200}
              height={800}
              sizes={sizes}
              quality={92}
              className={fixedHeight
                ? 'absolute inset-0 w-full h-full object-cover object-top'
                : 'w-full h-auto block'
              }
            />
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
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8"
          onClick={() => setOpen(false)}
        >
          <div className="absolute inset-0 bg-black/88" aria-hidden="true" />

          <div
            className="relative z-10 flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Fechar"
              className="absolute -top-10 right-0 text-white/70 hover:text-white transition-colors p-1 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <X size={20} aria-hidden="true" />
            </button>

            <div className="bg-white rounded-2xl p-3 shadow-2xl" style={{ maxWidth: '92vw', maxHeight: '88vh' }}>
              <Image
                src={src}
                alt={alt}
                width={1200}
                height={800}
                sizes="92vw"
                quality={95}
                className="block rounded-[4px] h-auto"
                style={{ maxWidth: '88vw', maxHeight: '82vh', width: 'auto' }}
              />
            </div>

            {caption && (
              <p className="mt-3 type-body-xs text-white/50 text-center max-w-lg">{caption}</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
