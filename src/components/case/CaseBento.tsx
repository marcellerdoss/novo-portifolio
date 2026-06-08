import Image from 'next/image';

export interface CaseBentoProps {
  mainImage: string;
  mainAlt: string;
  mainCaption?: string;
  images: Array<{ src: string; alt: string; caption?: string }>;
  accentBg: string;
  accentText: string;
  unoptimized?: boolean;
}

export function CaseBento({
  mainImage,
  mainAlt,
  mainCaption,
  images,
  accentBg,
  unoptimized,
}: CaseBentoProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 md:h-[340px] gap-[10px]">
      {/* Main image — spans 2 columns, full height on desktop */}
      <figure className="md:col-span-2 md:h-full">
        <div
          className="group relative h-[280px] md:h-full rounded-[12px] overflow-hidden bg-surface-soft"
        >
          <div className="absolute inset-5 transition-transform duration-[300ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02]">
            <Image
              src={mainImage}
              alt={mainAlt}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 66vw"
              unoptimized={unoptimized}
            />
          </div>
        </div>
        {mainCaption && (
          <figcaption className="mt-2 type-body-xs text-fg-subtle">
            {mainCaption}
          </figcaption>
        )}
      </figure>

      {/* Small images — flex column sharing remaining height */}
      <div className="flex flex-col gap-[10px] md:h-full">
        {images.map((img, i) => (
          <figure key={i} className="flex-1 min-h-[120px]">
            <div
              className="group relative h-full min-h-[120px] rounded-[12px] overflow-hidden bg-surface-soft"
            >
              <div className="absolute inset-5 transition-transform duration-[300ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02]">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  unoptimized={unoptimized}
                />
              </div>
            </div>
            {img.caption && (
              <figcaption className="mt-1.5 type-body-xs text-fg-subtle">
                {img.caption}
              </figcaption>
            )}
          </figure>
        ))}
      </div>
    </div>
  );
}
