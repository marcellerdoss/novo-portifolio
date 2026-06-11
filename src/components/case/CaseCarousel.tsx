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
    <figure className="space-y-2 max-w-[736px] mx-auto">
      <div className="bg-white rounded-2xl p-2 shadow-sm ring-1 ring-black/5">
        <div className="relative rounded-[8px] overflow-hidden">
          <Image
            src={images[current].src}
            alt={images[current].alt}
            width={1200}
            height={800}
            sizes="(max-width: 1024px) 100vw, 736px"
            quality={92}
            className="w-full h-auto block"
          />
          {total > 1 && (
            <>
              <button
                onClick={() => setCurrent(i => i - 1)}
                disabled={current === 0}
                aria-label="Imagem anterior"
                className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center disabled:opacity-0 hover:bg-white transition-all shadow-sm"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={() => setCurrent(i => i + 1)}
                disabled={current === total - 1}
                aria-label="Próxima imagem"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center disabled:opacity-0 hover:bg-white transition-all shadow-sm"
              >
                <ChevronRight size={16} />
              </button>
            </>
          )}
        </div>

        {total > 1 && (
          <div className="flex justify-center gap-1.5 mt-2 mb-0.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Imagem ${i + 1} de ${total}`}
                className={`h-1.5 rounded-full transition-all duration-200 ${
                  i === current ? 'w-4 bg-black/40' : 'w-1.5 bg-black/15 hover:bg-black/30'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {caption && (
        <figcaption className="type-body-xs text-fg-subtle px-1">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
