import Image from 'next/image';

export interface CaseEditorialProps {
  imageSrc: string;
  imageAlt: string;
  title: string;
  body: string;
  reverse?: boolean;
  accentBg: string;
  accentText: string;
  unoptimized?: boolean;
}

export function CaseEditorial({
  imageSrc,
  imageAlt,
  title,
  body,
  reverse = false,
  accentBg,
  unoptimized,
}: CaseEditorialProps) {
  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 gap-10 items-center ${
        reverse ? 'md:[&>*:first-child]:order-2' : ''
      }`}
    >
      {/* Image block */}
      <div
        className="relative h-[260px] rounded-[12px] overflow-hidden"
        style={{ backgroundColor: accentBg }}
      >
        <div className="absolute inset-6">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 50vw"
            unoptimized={unoptimized}
          />
        </div>
      </div>

      {/* Text block */}
      <div>
        <h3 className="text-[18px] font-[500] text-fg mb-4 leading-snug">
          {title}
        </h3>
        <p className="text-[15px] text-fg-muted leading-[1.7]">{body}</p>
      </div>
    </div>
  );
}
