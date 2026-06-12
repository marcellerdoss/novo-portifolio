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
  const [grabbing, setGrabbing] = useState(false);
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0, px: 0, py: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setZoom(1); setPan({ x: 0, y: 0 }); }, [src]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && hasPrev && onPrev) onPrev();
      if (e.key === 'ArrowRight' && hasNext && onNext) onNext();
    };
    document.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = ''; document.removeEventListener('keydown', onKey); };
  }, [onClose, onPrev, onNext, hasPrev, hasNext]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      setZoom(z => {
        const next = Math.min(Math.max(z + (e.deltaY < 0 ? 0.3 : -0.3), 1), 6);
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
    setGrabbing(true);
    dragStart.current = { x: e.clientX, y: e.clientY, px: pan.x, py: pan.y };
  }, [zoom, pan]);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging.current) return;
    setPan({ x: dragStart.current.px + (e.clientX - dragStart.current.x), y: dragStart.current.py + (e.clientY - dragStart.current.y) });
  }, []);

  const onMouseUp = useCallback(() => { isDragging.current = false; setGrabbing(false); }, []);

  const onDoubleClick = useCallback(() => {
    if (zoom > 1) { setZoom(1); setPan({ x: 0, y: 0 }); } else setZoom(3);
  }, [zoom]);

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={alt}
      className="fixed inset-0 flex flex-col select-none"
      style={{ zIndex: 99999, background: 'rgba(0,0,0,0.93)' }}
    >
      {/* Top: close */}
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
        style={{ cursor: zoom > 1 ? (grabbing ? 'grabbing' : 'grab') : 'zoom-in' }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
      >
        {hasPrev && onPrev && (
          <button onClick={(e) => { e.stopPropagation(); onPrev(); }} aria-label="Imagem anterior"
            className="absolute left-3 z-10 w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition-colors">
            <ChevronLeft size={20} />
          </button>
        )}
        {hasNext && onNext && (
          <button onClick={(e) => { e.stopPropagation(); onNext(); }} aria-label="Próxima imagem"
            className="absolute right-3 z-10 w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition-colors">
            <ChevronRight size={20} />
          </button>
        )}

        <div
          style={{ transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`, transformOrigin: 'center center', transition: isDragging.current ? 'none' : 'transform 0.12s ease-out' }}
          onDoubleClick={onDoubleClick}
        >
          <div className="bg-white rounded-2xl p-3 shadow-2xl">
            <Image
              src={src} alt={alt}
              width={1600} height={1200}
              sizes="88vw" quality={95}
              className="block rounded-[4px]"
              style={{ maxWidth: '84vw', maxHeight: '64vh', width: 'auto', height: 'auto' }}
              draggable={false}
            />
          </div>
        </div>
      </div>

      {/* Bottom: hint + dots + caption */}
      <div className="shrink-0 flex flex-col items-center gap-2 pt-3 pb-5">
        {/* Hint chip */}
        <div className="pointer-events-none">
          {zoom <= 1 ? (
            <span className="flex items-center gap-1.5 bg-white/8 rounded-full px-3 py-1 text-white/50 text-xs whitespace-nowrap">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="shrink-0">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/><path d="M11 8v6M8 11h6"/>
              </svg>
              scroll para ampliar · duplo clique para 3×
            </span>
          ) : (
            <span className="flex items-center gap-1.5 bg-white/8 rounded-full px-3 py-1 text-white/50 text-xs whitespace-nowrap">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" className="shrink-0">
                <path d="M9 3a1 1 0 0 0-2 0v7.5a.5.5 0 0 1-1 0V8a1 1 0 0 0-2 0v9a7 7 0 0 0 14 0v-5a1 1 0 0 0-2 0v-1.5a1 1 0 0 0-2 0V9a1 1 0 0 0-2 0V3z"/>
              </svg>
              arraste · {Math.round(zoom * 100)}% · duplo clique para resetar
            </span>
          )}
        </div>

        {/* Dots */}
        {total && total > 1 && onGoTo && currentIdx !== undefined && (
          <div className="flex justify-center gap-1.5">
            {Array.from({ length: total }).map((_, i) => (
              <button key={i} onClick={() => onGoTo(i)} aria-label={`Imagem ${i + 1} de ${total}`}
                className={`h-1.5 rounded-full transition-all duration-200 ${i === currentIdx ? 'w-4 bg-white/60' : 'w-1.5 bg-white/25 hover:bg-white/40'}`} />
            ))}
          </div>
        )}

        {/* Caption */}
        {caption && (
          <p className="type-body-xs text-white/50 text-center px-12 max-w-lg">
            {caption}
          </p>
        )}
      </div>
    </div>,
    document.body
  );
}
