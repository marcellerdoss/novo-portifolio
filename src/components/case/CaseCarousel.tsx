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
    <figure>
      <div className="relative rounded-[12px] overflow-hidden">
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
              className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-bg/80 backdrop-blur-sm flex items-center justify-center disabled:opacity-0 hover:bg-bg transition-all"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => setCurrent(i => i + 1)}
              disabled={current === total - 1}
              aria-label="Próxima imagem"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-bg/80 backdrop-blur-sm flex items-center justify-center disabled:opacity-0 hover:bg-bg transition-all"
            >
              <ChevronRight size={16} />
            </button>
          </>
        )}
      </div>

      {total > 1 && (
        <div className="flex justify-center gap-1.5 mt-3">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Imagem ${i + 1} de ${total}`}
              className={`h-1.5 rounded-full transition-all duration-200 ${
                i === current ? 'w-4 bg-fg' : 'w-1.5 bg-fg/25 hover:bg-fg/50'
              }`}
            />
          ))}
        </div>
      )}

      {caption && (
        <figcaption className="mt-2 type-body-xs text-fg-subtle px-1">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
