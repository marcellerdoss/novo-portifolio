'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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
  const total = images.length;

  return (
    <figure className="space-y-2 max-w-[552px] mx-auto">
      {/* px-10 reserves 40px on each side for the 32px arrows */}
      <div className={`relative${total > 1 ? ' px-10' : ''}`}>
        <div className="bg-white rounded-2xl p-2 shadow-sm ring-1 ring-black/5">
          <div className="rounded-[8px] overflow-hidden">
            <Image
              src={images[current].src}
              alt={images[current].alt}
              width={1200}
              height={800}
              sizes="(max-width: 1024px) 100vw, 552px"
              quality={92}
              className="w-full h-auto block"
            />
          </div>
        </div>

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
        <figcaption className="type-body-xs text-fg-subtle px-1">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
