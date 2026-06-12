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
  const [root, setRoot] = useState<HTMLElement | null>(null);
  const [isTouch, setIsTouch] = useState(false);

  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0, px: 0, py: 0 });
  const canvasRef = useRef<HTMLDivElement>(null);

  // Refs to avoid stale closures in touch handlers
  const panRef = useRef({ x: 0, y: 0 });
  const zoomRef = useRef(1);
  const touchStartRef = useRef<{ x: number; y: number; px: number; py: number } | null>(null);
  const pinchStartRef = useRef<{ dist: number; zoom: number } | null>(null);
  const lastTapRef = useRef<number>(0);
  const didDoubleTapRef = useRef(false);

  useEffect(() => { panRef.current = pan; }, [pan]);
  useEffect(() => { zoomRef.current = zoom; }, [zoom]);

  useEffect(() => {
    const el = document.createElement('div');
    el.setAttribute('data-lightbox-root', '');
    Object.assign(el.style, {
      position: 'fixed', top: '0', left: '0', right: '0', bottom: '0',
      width: '100dvw', height: '100dvh', zIndex: '999999',
    });
    document.documentElement.appendChild(el);
    setRoot(el);
    setIsTouch(window.matchMedia('(hover: none) and (pointer: coarse)').matches);
    document.body.style.overflow = 'hidden';
    return () => {
      document.documentElement.removeChild(el);
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => { setZoom(1); setPan({ x: 0, y: 0 }); }, [src]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && hasPrev && onPrev) onPrev();
      if (e.key === 'ArrowRight' && hasNext && onNext) onNext();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose, onPrev, onNext, hasPrev, hasNext]);

  // Mouse wheel zoom (desktop)
  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      setZoom(z => {
        const next = Math.min(Math.max(z + (e.deltaY < 0 ? 0.25 : -0.25), 0.5), 6);
        if (next <= 1) setPan({ x: 0, y: 0 });
        return next;
      });
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [root]);

  // Touch: pinch-to-zoom, pan, double-tap
  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;

    function getTouchDist(t1: Touch, t2: Touch) {
      const dx = t1.clientX - t2.clientX;
      const dy = t1.clientY - t2.clientY;
      return Math.sqrt(dx * dx + dy * dy);
    }

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        const t = e.touches[0];
        const now = Date.now();
        if (now - lastTapRef.current < 300) {
          // Double tap — toggle zoom; flag prevents React onDoubleClick from also firing
          didDoubleTapRef.current = true;
          setTimeout(() => { didDoubleTapRef.current = false; }, 100);
          touchStartRef.current = null;
          const cur = zoomRef.current;
          if (cur !== 1) { setZoom(1); setPan({ x: 0, y: 0 }); }
          else { setZoom(2.5); setPan({ x: 0, y: 0 }); }
          lastTapRef.current = 0;
          return;
        }
        lastTapRef.current = now;
        touchStartRef.current = { x: t.clientX, y: t.clientY, px: panRef.current.x, py: panRef.current.y };
        pinchStartRef.current = null;
      } else if (e.touches.length === 2) {
        touchStartRef.current = null;
        pinchStartRef.current = { dist: getTouchDist(e.touches[0], e.touches[1]), zoom: zoomRef.current };
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      if (e.touches.length === 1 && touchStartRef.current) {
        const t = e.touches[0];
        setPan({
          x: touchStartRef.current.px + (t.clientX - touchStartRef.current.x),
          y: touchStartRef.current.py + (t.clientY - touchStartRef.current.y),
        });
      } else if (e.touches.length === 2 && pinchStartRef.current) {
        const newDist = getTouchDist(e.touches[0], e.touches[1]);
        const newZoom = Math.min(Math.max(pinchStartRef.current.zoom * (newDist / pinchStartRef.current.dist), 0.5), 6);
        setZoom(newZoom);
        if (newZoom <= 1) setPan({ x: 0, y: 0 });
      }
    };

    const onTouchEnd = () => { touchStartRef.current = null; };

    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchmove', onTouchMove, { passive: false });
    el.addEventListener('touchend', onTouchEnd, { passive: true });

    return () => {
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchmove', onTouchMove);
      el.removeEventListener('touchend', onTouchEnd);
    };
  }, [root]);

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    isDragging.current = true;
    setGrabbing(true);
    dragStart.current = { x: e.clientX, y: e.clientY, px: pan.x, py: pan.y };
  }, [pan]);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging.current) return;
    setPan({ x: dragStart.current.px + (e.clientX - dragStart.current.x), y: dragStart.current.py + (e.clientY - dragStart.current.y) });
  }, []);

  const onMouseUp = useCallback(() => { isDragging.current = false; setGrabbing(false); }, []);
  const onDoubleClick = useCallback(() => {
    if (didDoubleTapRef.current) return; // already handled by touch
    isDragging.current = false;
    setGrabbing(false);
    if (zoom !== 1) { setZoom(1); setPan({ x: 0, y: 0 }); }
    else { setZoom(2.5); setPan({ x: 0, y: 0 }); }
  }, [zoom]);

  if (!root) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={alt}
      style={{
        width: '100%', height: '100%',
        background: 'rgba(0,0,0,0.96)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        gap: '12px', padding: '16px',
        boxSizing: 'border-box',
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Close — alinhado à direita do canvas */}
      <div style={{ width: '100%', maxWidth: '90vw', display: 'flex', justifyContent: 'flex-end' }}>
        <button
          onClick={onClose}
          aria-label="Fechar"
          className="flex items-center justify-center w-8 h-8 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors"
        >
          <X size={18} />
        </button>
      </div>

      {/* Hint */}
      <div style={{ pointerEvents: 'none', flexShrink: 0 }}>
        {zoom === 1 ? (
          <span className="flex items-center gap-1.5 rounded-full px-3 py-1 text-white/40 text-xs whitespace-nowrap bg-white/5">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/><path d="M11 8v6M8 11h6"/>
            </svg>
            {isTouch
              ? 'arraste para ampliar · toque duplo para 2.5×'
              : 'scroll para ampliar · duplo clique para 2.5×'}
          </span>
        ) : (
          <span className="flex items-center gap-1.5 rounded-full px-3 py-1 text-white/40 text-xs whitespace-nowrap bg-white/5">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 3a1 1 0 0 0-2 0v7.5a.5.5 0 0 1-1 0V8a1 1 0 0 0-2 0v9a7 7 0 0 0 14 0v-5a1 1 0 0 0-2 0v-1.5a1 1 0 0 0-2 0V9a1 1 0 0 0-2 0V3z"/>
            </svg>
            arraste para navegar · {Math.round(zoom * 100)}% · {isTouch ? 'toque duplo' : 'duplo clique'} para resetar
          </span>
        )}
      </div>

      {/* Canvas estilo Figma */}
      <div style={{ position: 'relative', width: '90vw', flex: '1 1 0', minHeight: 0, maxHeight: '72vh' }}>
        {/* Nav arrows fora do canvas */}
        {hasPrev && onPrev && (
          <button
            onClick={(e) => { e.stopPropagation(); onPrev(); }}
            aria-label="Imagem anterior"
            style={{ position: 'absolute', left: '-44px', top: '50%', transform: 'translateY(-50%)', zIndex: 10 }}
            className="w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
        )}
        {hasNext && onNext && (
          <button
            onClick={(e) => { e.stopPropagation(); onNext(); }}
            aria-label="Próxima imagem"
            style={{ position: 'absolute', right: '-44px', top: '50%', transform: 'translateY(-50%)', zIndex: 10 }}
            className="w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        )}

        {/* Canvas area */}
        <div
          ref={canvasRef}
          style={{
            width: '100%', height: '100%',
            background: '#e8e8e8',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.05)',
            outline: 'none',
            cursor: grabbing ? 'grabbing' : 'grab',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            touchAction: 'none',
          }}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
          onDoubleClick={onDoubleClick}
        >
          <div
            style={{
              transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
              transformOrigin: 'top center',
              transition: isDragging.current ? 'none' : 'transform 0.12s ease-out',
              padding: '24px',
              flexShrink: 0,
            }}
          >
            <div style={{ background: 'white', borderRadius: '12px', padding: '12px', boxShadow: '0 2px 12px rgba(0,0,0,0.12)' }}>
              <Image
                src={src} alt={alt}
                width={1600} height={1200}
                sizes="88vw" quality={95}
                style={{ display: 'block', borderRadius: '6px', maxWidth: '82vw', maxHeight: '58vh', width: 'auto', height: 'auto' }}
                draggable={false}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Dots + Caption */}
      {total && total > 1 && onGoTo && currentIdx !== undefined && (
        <div className="flex justify-center gap-1.5" style={{ flexShrink: 0 }}>
          {Array.from({ length: total }).map((_, i) => (
            <button key={i} onClick={() => onGoTo(i)} aria-label={`Imagem ${i + 1} de ${total}`}
              className={`h-1.5 rounded-full transition-all duration-200 ${i === currentIdx ? 'w-4 bg-white/60' : 'w-1.5 bg-white/25 hover:bg-white/40'}`} />
          ))}
        </div>
      )}

      {caption && (
        <p style={{ flexShrink: 0, maxWidth: '560px', textAlign: 'center', color: 'rgba(255,255,255,0.45)', fontSize: '12px', lineHeight: '1.5', padding: '0 24px' }}>
          {caption}
        </p>
      )}
    </div>,
    root
  );
}
