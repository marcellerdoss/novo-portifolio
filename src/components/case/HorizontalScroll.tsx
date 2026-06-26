'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from '@/i18n/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface Props {
  children: React.ReactNode;
  backLabel?: string;
}

const LERP    = 0.1;
const EDGE    = 0.18; // 18% from each side triggers zone

export function HorizontalScroll({ children, backLabel = 'Voltar' }: Props) {
  const router    = useRouter();
  const routerRef = useRef(router);
  routerRef.current = router;

  const stripRef  = useRef<HTMLDivElement>(null);
  const targetX   = useRef(0);
  const currentX  = useRef(0);
  const rafId     = useRef(0);
  const returning = useRef(false);

  const [zone, setZone] = useState<'left' | 'right' | null>(null);

  // ── rAF loop — lerp ──────────────────────────────────────────────────────
  useEffect(() => {
    function tick() {
      const el = stripRef.current;
      if (el) {
        currentX.current += (targetX.current - currentX.current) * LERP;
        el.style.transform = `translateX(${-currentX.current}px)`;

        if (returning.current && currentX.current < 0.5) {
          el.style.transform = 'translateX(0)';
          routerRef.current.push('/');
          return;
        }
      }
      rafId.current = requestAnimationFrame(tick);
    }
    rafId.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId.current);
  }, []);

  // ── Wheel → horizontal ───────────────────────────────────────────────────
  useEffect(() => {
    function onWheel(e: WheelEvent) {
      e.preventDefault();
      if (returning.current || !stripRef.current) return;
      const max = stripRef.current.scrollWidth - window.innerWidth;
      targetX.current = Math.max(0, Math.min(max, targetX.current + e.deltaY));
    }
    window.addEventListener('wheel', onWheel, { passive: false });
    return () => window.removeEventListener('wheel', onWheel);
  }, []);

  // ── Mouse zone detection ─────────────────────────────────────────────────
  useEffect(() => {
    function onMove(e: MouseEvent) {
      const ratio = e.clientX / window.innerWidth;
      setZone(ratio < EDGE ? 'left' : ratio > 1 - EDGE ? 'right' : null);
    }
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  // ── Click on side zones → advance / retreat one viewport ────────────────
  function handleClick(e: React.MouseEvent) {
    if (returning.current || !stripRef.current) return;
    if ((e.target as HTMLElement).closest('button')) return; // back button handles itself

    const ratio = e.clientX / window.innerWidth;
    const max   = stripRef.current.scrollWidth - window.innerWidth;

    if (ratio < EDGE) {
      targetX.current = Math.max(0, targetX.current - window.innerWidth);
    } else if (ratio > 1 - EDGE) {
      targetX.current = Math.min(max, targetX.current + window.innerWidth);
    }
  }

  function handleBack() {
    returning.current = true;
    targetX.current = 0;
  }

  const cursor =
    zone === 'left'  ? 'w-resize' :
    zone === 'right' ? 'e-resize' :
    'default';

  return (
    <div
      className="fixed inset-0 z-[60] overflow-hidden bg-bg"
      style={{ cursor }}
      onClick={handleClick}
    >
      {/* Back button */}
      <button
        onClick={(e) => { e.stopPropagation(); handleBack(); }}
        className="absolute top-6 left-6 z-20 flex items-center gap-2 px-4 py-2 type-btn bg-bg/90 backdrop-blur-sm border border-border rounded-pill text-fg hover:bg-fg/5 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fg"
        aria-label={backLabel}
      >
        <ArrowLeft size={14} aria-hidden="true" />
        {backLabel}
      </button>

      {/* Left arrow indicator */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-6 top-1/2 -translate-y-1/2 z-10 transition-opacity duration-200"
        style={{ opacity: zone === 'left' ? 1 : 0 }}
      >
        <ArrowLeft size={22} className="text-fg-muted" />
      </div>

      {/* Right arrow indicator */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-6 top-1/2 -translate-y-1/2 z-10 transition-opacity duration-200"
        style={{ opacity: zone === 'right' ? 1 : 0 }}
      >
        <ArrowRight size={22} className="text-fg-muted" />
      </div>

      {/* Strip */}
      <div
        ref={stripRef}
        className="flex flex-row h-full"
        style={{ willChange: 'transform' }}
      >
        {children}
      </div>
    </div>
  );
}
