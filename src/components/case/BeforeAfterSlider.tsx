'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';

interface Side {
  src: string;
  alt: string;
  label?: string;
}

interface Props {
  before: Side;
  after: Side;
  caption?: string;
}

export function BeforeAfterSlider({ before, after, caption }: Props) {
  const [pos, setPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const update = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setPos(Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100)));
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => { if (dragging.current) update(e.clientX); };
    const onUp = () => { dragging.current = false; };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
  }, [update]);

  return (
    <figure className="flex-1 min-h-0 flex flex-col overflow-hidden select-none">
      <div
        ref={containerRef}
        className="flex-1 min-h-0 relative overflow-hidden cursor-ew-resize"
        onMouseDown={(e) => { e.preventDefault(); dragging.current = true; update(e.clientX); }}
        onTouchStart={(e) => update(e.touches[0].clientX)}
        onTouchMove={(e) => update(e.touches[0].clientX)}
      >
        {/* After — base layer */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Image
            src={after.src}
            alt={after.alt}
            width={1200}
            height={800}
            quality={92}
            sizes="(max-width: 1440px) 70vw, 1000px"
            className="max-h-full max-w-full w-auto h-auto block"
          />
        </div>

        {/* Before — clipped to left portion */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        >
          <Image
            src={before.src}
            alt={before.alt}
            width={1200}
            height={800}
            quality={92}
            sizes="(max-width: 1440px) 70vw, 1000px"
            className="max-h-full max-w-full w-auto h-auto block"
          />
        </div>

        {/* Divider */}
        <div
          className="absolute top-0 bottom-0 w-[2px] bg-white shadow pointer-events-none z-10"
          style={{ left: `${pos}%` }}
        />

        {/* Handle */}
        <div
          className="absolute top-1/2 z-10 w-10 h-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-md flex items-center justify-center pointer-events-none"
          style={{ left: `${pos}%` }}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <path
              d="M6 9H3M6 9L4.5 7.5M6 9L4.5 10.5M12 9h3M12 9l1.5-1.5M12 9l1.5 1.5"
              stroke="#111"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Labels */}
        {before.label && (
          <div
            className="absolute top-4 left-4 z-10 type-caption text-white bg-black/40 px-2 py-0.5 rounded pointer-events-none transition-opacity duration-200"
            style={{ opacity: pos > 12 ? 1 : 0 }}
          >
            {before.label}
          </div>
        )}
        {after.label && (
          <div
            className="absolute top-4 right-4 z-10 type-caption text-white bg-black/40 px-2 py-0.5 rounded pointer-events-none transition-opacity duration-200"
            style={{ opacity: pos < 88 ? 1 : 0 }}
          >
            {after.label}
          </div>
        )}
      </div>

      {caption && (
        <figcaption className="shrink-0 pt-3 type-body-xs text-fg-subtle text-center">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
