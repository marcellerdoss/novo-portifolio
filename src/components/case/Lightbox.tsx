'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ChevronLeft, ChevronRight, Minus, Plus, RotateCcw, X } from 'lucide-react';

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
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef({ startX: 0, startY: 0, panX: 0, panY: 0 });

  useEffect(() => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, [src]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && hasPrev && onPrev) onPrev();
      if (e.key === 'ArrowRight' && hasNext && onNext) onNext();
      if ((e.key === '+' || e.key === '=')) setZoom(z => Math.min(z + 0.5, 5));
      if (e.key === '-') setZoom(z => { const n = Math.max(z - 0.5, 1); if (n <= 1) setPan({ x: 0, y: 0 }); return n; });
      if (e.key === '0') { setZoom(1); setPan({ x: 0, y: 0 }); }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
    };
  }, [onClose, onPrev, onNext, hasPrev, hasNext]);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.stopPropagation();
    const delta = e.deltaY < 0 ? 0.35 : -0.35;
    setZoom(z => {
      const next = Math.min(Math.max(z + delta, 1), 5);
      if (next <= 1) setPan({ x: 0, y: 0 });
      return next;
    });
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (zoom <= 1) return;
    e.preventDefault();
    setIsDragging(true);
    dragRef.current = { startX: e.clientX, startY: e.clientY, panX: pan.x, panY: pan.y };
  }, [zoom, pan]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return;
    setPan({
      x: dragRef.current.panX + (e.clientX - dragRef.current.startX),
      y: dragRef.current.panY + (e.clientY - dragRef.current.startY),
    });
  }, [isDragging]);

  const handleMouseUp = useCallback(() => setIsDragging(false), []);

  const handleDoubleClick = useCallback(() => {
    if (zoom > 1) { setZoom(1); setPan({ x: 0, y: 0 }); }
    else setZoom(2.5);
  }, [zoom]);

  const btnClass = 'flex items-center justify-center w-7 h-7 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed';

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={alt}
      className="fixed inset-0 z-[9999] flex flex-col select-none"
    >
      <div className="absolute inset-0 bg-black/92" onClick={zoom <= 1 ? onClose : undefined} />

      {/* Top bar */}
      <div className="relative z-10 flex items-center justify-between px-4 pt-3 pb-2 shrink-0">
        <div className="flex items-center gap-1">
          <button onClick={() => setZoom(z => { const n = Math.max(z - 0.5, 1); if (n <= 1) setPan({ x: 0, y: 0 }); return n; })} disabled={zoom <= 1} aria-label="Diminuir zoom" className={btnClass}>
            <Minus size={14} />
          </button>
          <span className="text-white/50 text-xs w-10 text-center tabular-nums">{Math.round(zoom * 100)}%</span>
          <button onClick={() => setZoom(z => Math.min(z + 0.5, 5))} disabled={zoom >= 5} aria-label="Aumentar zoom" className={btnClass}>
            <Plus size={14} />
          </button>
          {zoom > 1 && (
            <button onClick={() => { setZoom(1); setPan({ x: 0, y: 0 }); }} aria-label="Resetar zoom" className={btnClass + ' ml-1'}>
              <RotateCcw size={13} />
            </button>
          )}
        </div>

        <button onClick={onClose} aria-label="Fechar" className={btnClass}>
          <X size={18} />
        </button>
      </div>

      {/* Image area */}
      <div
        className="relative z-10 flex-1 overflow-hidden flex items-center justify-center"
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{ cursor: zoom > 1 ? (isDragging ? 'grabbing' : 'grab') : 'zoom-in' }}
      >
        {/* Nav arrows */}
        {hasPrev && onPrev && (
          <button
            onClick={(e) => { e.stopPropagation(); onPrev(); }}
            aria-label="Imagem anterior"
            className="absolute left-3 z-20 w-9 h-9 rounded-full bg-white/15 text-white flex items-center justify-center hover:bg-white/25 transition-colors shrink-0"
          >
            <ChevronLeft size={18} />
          </button>
        )}
        {hasNext && onNext && (
          <button
            onClick={(e) => { e.stopPropagation(); onNext(); }}
            aria-label="Próxima imagem"
            className="absolute right-3 z-20 w-9 h-9 rounded-full bg-white/15 text-white flex items-center justify-center hover:bg-white/25 transition-colors shrink-0"
          >
            <ChevronRight size={18} />
          </button>
        )}

        {/* Zoomable image */}
        <div
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
            transformOrigin: 'center center',
            transition: isDragging ? 'none' : 'transform 0.15s ease-out',
          }}
          onDoubleClick={handleDoubleClick}
        >
          <div className="bg-white rounded-2xl p-3 shadow-2xl">
            <Image
              src={src}
              alt={alt}
              width={1400}
              height={1000}
              sizes="90vw"
              quality={95}
              className="block rounded-[4px] w-auto h-auto"
              style={{ maxWidth: '86vw', maxHeight: '74vh' }}
              draggable={false}
            />
          </div>
        </div>

        {zoom <= 1 && (
          <p className="absolute bottom-3 left-1/2 -translate-x-1/2 text-white/30 text-xs pointer-events-none">
            scroll ou duplo clique para ampliar
          </p>
        )}
      </div>

      {/* Bottom: dots + caption */}
      <div className="relative z-10 shrink-0 pb-4 pt-2 flex flex-col items-center gap-2">
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
          <p className="type-body-xs text-white/40 text-center px-8 max-w-lg">
            {caption}
          </p>
        )}
      </div>
    </div>,
    document.body
  );
}
