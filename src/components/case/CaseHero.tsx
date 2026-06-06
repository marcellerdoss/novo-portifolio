import Image from 'next/image';

export interface CaseHeroProps {
  imageSrc: string;
  imageAlt: string;
  caption?: string;
  accentBg: string;
  accentText: string;
  unoptimized?: boolean;
}

export function CaseHero({
  imageSrc,
  imageAlt,
  caption,
  accentBg,
  unoptimized,
}: CaseHeroProps) {
  return (
    <figure className="w-full">
      <div
        className="group relative w-full h-[260px] md:h-[480px] rounded-[16px] overflow-hidden bg-surface-soft"
      >
        {/* Image — inset 32px on all sides */}
        <div className="absolute inset-8">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-contain"
            sizes="100vw"
            unoptimized={unoptimized}
          />
        </div>

        {/* Hover overlay */}
        <div
          className="absolute inset-0 bg-black/0 group-hover:bg-black/[0.06] transition-colors duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none"
          aria-hidden="true"
        />
      </div>

      {caption && (
        <figcaption className="mt-3 type-body-sm text-fg-subtle">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
