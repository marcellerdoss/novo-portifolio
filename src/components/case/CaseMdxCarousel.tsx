import Image from 'next/image';

interface CarouselImage {
  src: string;
  alt: string;
}

interface CaseMdxCarouselProps {
  images: CarouselImage[];
  caption?: string;
}

export function CaseMdxCarousel({ images, caption }: CaseMdxCarouselProps) {
  return (
    <figure className="my-6">
      <div className="relative rounded-[12px] overflow-hidden">
        <div
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {images.map((img, i) => (
            <div key={i} className="snap-start flex-shrink-0 w-full">
              <Image
                src={img.src}
                alt={img.alt}
                width={1200}
                height={800}
                sizes="(max-width: 1024px) 100vw, 736px"
                quality={92}
                className="w-full h-auto block"
              />
            </div>
          ))}
        </div>
        {images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 pointer-events-none">
            {images.map((_, i) => (
              <span
                key={i}
                className={`block h-1.5 rounded-full ${i === 0 ? 'w-4 bg-white' : 'w-1.5 bg-white/50'}`}
              />
            ))}
          </div>
        )}
      </div>
      {caption && (
        <figcaption className="mt-2 type-body-xs text-fg-subtle px-1">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
