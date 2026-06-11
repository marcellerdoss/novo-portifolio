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
    <figure className="my-6 space-y-2 max-w-[552px] mx-auto">
      <div className="bg-white rounded-2xl p-2 shadow-sm ring-1 ring-black/5">
        <div className="relative rounded-[8px] overflow-hidden">
          <div
            className="flex overflow-x-auto snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {images.map((img, i) => (
              <div key={i} className="snap-start flex-shrink-0 w-full">
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={1200}
                  height={800}
                  sizes="(max-width: 1024px) 100vw, 552px"
                  quality={92}
                  className="w-full h-auto block"
                />
              </div>
            ))}
          </div>
        </div>

        {images.length > 1 && (
          <div className="flex justify-center gap-1.5 mt-2 mb-0.5">
            {images.map((_, i) => (
              <span
                key={i}
                className={`block h-1.5 rounded-full ${i === 0 ? 'w-4 bg-black/40' : 'w-1.5 bg-black/15'}`}
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
