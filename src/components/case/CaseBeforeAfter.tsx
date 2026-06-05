import Image from 'next/image';

export interface CaseBeforeAfterProps {
  imageBefore: string;
  imageAfter: string;
  altBefore: string;
  altAfter: string;
  captionBefore?: string;
  captionAfter?: string;
  accentBg: string;
  accentText: string;
  unoptimized?: boolean;
}

const BADGE_BEFORE = {
  backgroundColor: 'var(--color-block-pink)',
  color: '#6b2020',
} as const;

const BADGE_AFTER = {
  backgroundColor: 'var(--color-block-mint)',
  color: '#1a5c29',
} as const;

export function CaseBeforeAfter({
  imageBefore,
  imageAfter,
  altBefore,
  altAfter,
  captionBefore,
  captionAfter,
  accentBg,
  unoptimized,
}: CaseBeforeAfterProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Before */}
      <figure>
        <div
          className="relative h-[240px] rounded-[12px] overflow-hidden"
          style={{ backgroundColor: accentBg }}
        >
          <span
            className="absolute top-3 left-3 z-10 text-[11px] font-medium rounded-full px-2.5 py-1 leading-none"
            style={BADGE_BEFORE}
          >
            Antes
          </span>
          <div className="absolute inset-6">
            <Image
              src={imageBefore}
              alt={altBefore}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 50vw"
              unoptimized={unoptimized}
            />
          </div>
        </div>
        {captionBefore && (
          <figcaption className="mt-2 text-[12px] text-fg-subtle">
            {captionBefore}
          </figcaption>
        )}
      </figure>

      {/* After */}
      <figure>
        <div
          className="relative h-[240px] rounded-[12px] overflow-hidden"
          style={{ backgroundColor: accentBg }}
        >
          <span
            className="absolute top-3 left-3 z-10 text-[11px] font-medium rounded-full px-2.5 py-1 leading-none"
            style={BADGE_AFTER}
          >
            Depois
          </span>
          <div className="absolute inset-6">
            <Image
              src={imageAfter}
              alt={altAfter}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 50vw"
              unoptimized={unoptimized}
            />
          </div>
        </div>
        {captionAfter && (
          <figcaption className="mt-2 text-[12px] text-fg-subtle">
            {captionAfter}
          </figcaption>
        )}
      </figure>
    </div>
  );
}
