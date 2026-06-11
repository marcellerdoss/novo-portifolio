import Image from 'next/image';

export interface CaseBeforeAfterProps {
  imageBefore: string;
  imageAfter: string;
  altBefore: string;
  altAfter: string;
  captionBefore?: string;
  captionAfter?: string;
  unoptimized?: boolean;
  // kept for backward compat — no longer used
  accentBg?: string;
  accentText?: string;
}

export function CaseBeforeAfter({
  imageBefore,
  imageAfter,
  altBefore,
  altAfter,
  captionBefore,
  captionAfter,
  unoptimized,
}: CaseBeforeAfterProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Before */}
      <figure className="space-y-2">
        <div className="bg-white rounded-2xl p-2 shadow-sm ring-1 ring-black/5">
          <div className="relative rounded-[8px] overflow-hidden">
            <span className="absolute top-2 left-2 z-10 type-caption rounded-full px-2.5 py-1 bg-black/55 text-white backdrop-blur-sm">
              Antes
            </span>
            <Image
              src={imageBefore}
              alt={altBefore}
              width={1200}
              height={800}
              sizes="(max-width: 768px) 100vw, 50vw"
              quality={92}
              className="w-full h-auto block"
              unoptimized={unoptimized}
            />
          </div>
        </div>
        {captionBefore && (
          <figcaption className="type-body-xs text-fg-subtle px-1">{captionBefore}</figcaption>
        )}
      </figure>

      {/* After */}
      <figure className="space-y-2">
        <div className="bg-white rounded-2xl p-2 shadow-sm ring-1 ring-black/5">
          <div className="relative rounded-[8px] overflow-hidden">
            <span className="absolute top-2 left-2 z-10 type-caption rounded-full px-2.5 py-1 bg-black/55 text-white backdrop-blur-sm">
              Depois
            </span>
            <Image
              src={imageAfter}
              alt={altAfter}
              width={1200}
              height={800}
              sizes="(max-width: 768px) 100vw, 50vw"
              quality={92}
              className="w-full h-auto block"
              unoptimized={unoptimized}
            />
          </div>
        </div>
        {captionAfter && (
          <figcaption className="type-body-xs text-fg-subtle px-1">{captionAfter}</figcaption>
        )}
      </figure>
    </div>
  );
}
