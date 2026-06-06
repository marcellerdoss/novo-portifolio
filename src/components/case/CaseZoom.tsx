import Image from 'next/image';

export interface CaseZoomProps {
  imageSrc: string;
  imageZoomSrc?: string;
  imageAlt: string;
  zoomPosition?: string;
  zoomLabel: string;
  markerStyle: {
    top: string;
    left: string;
    width: string;
    height: string;
  };
  accentBg: string;
  accentText: string;
  unoptimized?: boolean;
}

export function CaseZoom({
  imageSrc,
  imageZoomSrc,
  imageAlt,
  zoomPosition = 'center',
  zoomLabel,
  markerStyle,
  accentBg,
  accentText,
  unoptimized,
}: CaseZoomProps) {
  const zoomSrc = imageZoomSrc ?? imageSrc;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Overview panel */}
      <div>
        <p className="type-caption text-fg-subtle mb-2">
          Visão geral
        </p>
        <div
          className="relative h-[260px] rounded-[12px] overflow-hidden"
          style={{ backgroundColor: accentBg }}
        >
          {/* Image at reduced opacity */}
          <div className="absolute inset-4 opacity-55">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 50vw"
              unoptimized={unoptimized}
            />
          </div>

          {/* Dashed marker showing the zoomed region */}
          <div
            className="absolute pointer-events-none rounded-[2px]"
            style={{
              top: markerStyle.top,
              left: markerStyle.left,
              width: markerStyle.width,
              height: markerStyle.height,
              border: `2px dashed ${accentText}`,
              opacity: 0.8,
            }}
            aria-hidden="true"
          />
        </div>
      </div>

      {/* Zoom panel */}
      <div>
        <p className="type-caption text-fg-subtle mb-2">
          Zoom — {zoomLabel}
        </p>
        <div
          className="relative h-[260px] rounded-[12px] overflow-hidden"
          style={{
            backgroundColor: accentBg,
            border: `2px solid ${accentText}`,
          }}
        >
          <div className="absolute inset-4">
            <Image
              src={zoomSrc}
              alt={`Zoom: ${imageAlt}`}
              fill
              className="object-contain"
              style={{ objectPosition: zoomPosition }}
              sizes="(max-width: 768px) 100vw, 50vw"
              unoptimized={unoptimized}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
