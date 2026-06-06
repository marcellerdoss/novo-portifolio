'use client';

import { useRef } from 'react';

export interface CaseScrollCanvasProps {
  imageSrc: string;
  imageAlt: string;
  title: string;
  containerHeight?: number;
  accentBg: string;
  accentText: string;
}

export function CaseScrollCanvas({
  imageSrc,
  imageAlt,
  title,
  containerHeight = 400,
  accentBg,
  accentText,
}: CaseScrollCanvasProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  function handleMouseDown(e: React.MouseEvent<HTMLDivElement>) {
    if (!scrollRef.current) return;
    isDragging.current = true;
    startX.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeft.current = scrollRef.current.scrollLeft;
    scrollRef.current.style.cursor = 'grabbing';
  }

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!isDragging.current || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    scrollRef.current.scrollLeft = scrollLeft.current - walk;
  }

  function stopDrag() {
    isDragging.current = false;
    if (scrollRef.current) scrollRef.current.style.cursor = 'grab';
  }

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center gap-3 mb-3">
        <span className="type-body-sm text-fg font-[480]">{title}</span>
        <span
          className="type-caption rounded-full px-2.5 py-1"
          style={{ backgroundColor: accentBg, color: accentText }}
        >
          arraste para explorar
        </span>
      </div>

      {/* Scroll container */}
      <div
        ref={scrollRef}
        className="w-full overflow-x-auto overflow-y-hidden rounded-[16px] select-none"
        style={{
          backgroundColor: accentBg,
          height: containerHeight,
          cursor: 'grab',
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={stopDrag}
        onMouseLeave={stopDrag}
      >
        {/* Image at natural height — width is auto (proportional) */}
        {/* Using <img> here because next/image doesn't support natural-size */}
        {/* horizontal-scroll layouts where width depends on image aspect ratio */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageSrc}
          alt={imageAlt}
          style={{
            height: containerHeight,
            width: 'auto',
            maxWidth: 'none',
            display: 'block',
            userSelect: 'none',
            pointerEvents: 'none',
          }}
          draggable={false}
        />
      </div>

      {/* Scroll hint */}
      <div className="flex items-center gap-1.5 mt-2">
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          aria-hidden="true"
          className="text-fg-subtle"
        >
          <path
            d="M2 6h8M7 3l3 3-3 3"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="type-caption text-fg-subtle">scroll horizontal</span>
      </div>
    </div>
  );
}
