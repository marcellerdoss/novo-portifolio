'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface LightboxProps {
  src: string;
  alt: string;
  caption?: string;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  hasPrev?: boolean;
  hasNext?: boolean;
  total?: number;
  currentIdx?: number;
  onGoTo?: (i: number) => void;
}

export function Lightbox({ src, alt, caption, onClose, onPrev, onNext, hasPrev, hasNext, total, currentIdx, onGoTo }: LightboxProps) {
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0, px: 0, py: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Reset on image change
  useEffect(() => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, [src]);

  // Body scroll lock + keyboard
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && hasPrev && onPrev) onPrev();
      if (e.key === 'ArrowRight' && hasNext && onNext) onNext();
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
    };
  }, [onClose, onPrev, onNext, hasPrev, hasNext]);

  // Wheel zoom — must be non-passive to call preventDefault
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const delta = e.deltaY < 0 ? 0.3 : -0.3;
      setZoom(z => {
        const next = Math.min(Math.max(z + delta, 1), 6);
        if (next <= 1) setPan({ x: 0, y: 0 });
        return next;
      });
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    if (zoom <= 1) return;
    e.preventDefault();
    isDragging.current = true;
    dragStart.current = { x: e.clientX, y: e.clientY, px: pan.x, py: pan.y };
  }, [zoom, pan]);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging.current) return;
    setPan({
      x: dragStart.current.px + (e.clientX - dragStart.current.x),
      y: dragStart.current.py + (e.clientY - dragStart.current.y),
    });
  }, []);

  const onMouseUp = useCallback(() => { isDragging.current = false; }, []);

  const onDoubleClick = useCallback(() => {
    if (zoom > 1) { setZoom(1); setPan({ x: 0, y: 0 }); }
    else setZoom(3);
  }, [zoom]);

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={alt}
      className="fixed inset-0 z-[99999] flex flex-col select-none"
      style={{ background: 'rgba(0,0,0,0.93)' }}
    >
      {/* Close */}
      <div className="shrink-0 flex justify-end px-4 pt-3 pb-1">
        <button
          onClick={onClose}
          aria-label="Fechar"
          className="flex items-center justify-center w-8 h-8 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors"
        >
          <X size={18} />
        </button>
      </div>

      {/* Image area */}
      <div
        ref={containerRef}
        className="relative flex-1 overflow-hidden flex items-center justify-center"
        style={{ cursor: zoom > 1 ? 'grab' : 'zoom-in' }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
      >
        {/* Nav prev */}
        {hasPrev && onPrev && (
          <button
            onClick={(e) => { e.stopPropagation(); onPrev(); }}
            aria-label="Imagem anterior"
            className="absolute left-3 z-10 w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
        )}
        {hasNext && onNext && (
          <button
            onClick={(e) => { e.stopPropagation(); onNext(); }}
            aria-label="Próxima imagem"
            className="absolute right-3 z-10 w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        )}

        {/* Zoomable image */}
        <div
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
            transformOrigin: 'center center',
            transition: isDragging.current ? 'none' : 'transform 0.12s ease-out',
          }}
          onDoubleClick={onDoubleClick}
        >
          <div className="bg-white rounded-2xl p-3 shadow-2xl">
            <Image
              src={src}
              alt={alt}
              width={1600}
              height={1200}
              sizes="92vw"
              quality={95}
              className="block rounded-[4px]"
              style={{ maxWidth: '88vw', maxHeight: '76vh', width: 'auto', height: 'auto' }}
              draggable={false}
            />
          </div>
        </div>

        {/* Hint */}
        {zoom <= 1 && (
          <span className="absolute bottom-3 left-1/2 -translate-x-1/2 text-white/30 text-xs pointer-events-none whitespace-nowrap">
            scroll para ampliar · duplo clique para 3×
          </span>
        )}
        {zoom > 1 && (
          <span className="absolute bottom-3 left-1/2 -translate-x-1/2 text-white/30 text-xs pointer-events-none whitespace-nowrap">
            {Math.round(zoom * 100)}% · duplo clique para resetar
          </span>
        )}
      </div>

      {/* Bottom */}
      <div className="shrink-0 pb-4 pt-1 flex flex-col items-center gap-2">
        {total && total > 1 && onGoTo && currentIdx !== undefined && (
          <div className="flex justify-center gap-1.5">
            {Array.from({ length: total }).map((_, i) => (
              <button
                key={i}
                onClick={() => onGoTo(i)}
                aria-label={`Imagem ${i + 1} de ${total}`}
                className={`h-1.5 rounded-full transition-all duration-200 ${
                  i === currentIdx ? 'w-4 bg-white/60' : 'w-1.5 bg-white/25 hover:bg-white/40'
                }`}
              />
            ))}
          </div>
        )}
        {caption && (
          <p className="type-body-xs text-white/35 text-center px-8 max-w-xl">
            {caption}
          </p>
        )}
      </div>
    </div>,
    document.body
  );
}
