'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from '@/i18n/navigation';
import { ArrowLeft } from 'lucide-react';

interface Props {
  children: React.ReactNode;
  backLabel?: string;
}

export function HorizontalScroll({ children, backLabel = 'Voltar' }: Props) {
  const router = useRouter();
  const routerRef = useRef(router);
  routerRef.current = router;

  const stripRef  = useRef<HTMLDivElement>(null);
  const targetX   = useRef(0);
  const currentX  = useRef(0);
  const rafId     = useRef(0);
  const returning = useRef(false);

  // rAF loop — lerp factor 0.1
  useEffect(() => {
    function tick() {
      const el = stripRef.current;
      if (el) {
        currentX.current += (targetX.current - currentX.current) * 0.1;
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

  // Wheel → horizontal
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

  function handleBack() {
    returning.current = true;
    targetX.current = 0;
  }

  return (
    <div className="fixed inset-0 z-[60] overflow-hidden bg-bg">
      <button
        onClick={handleBack}
        className="absolute top-6 left-6 z-10 flex items-center gap-2 px-4 py-2 type-btn bg-bg/90 backdrop-blur-sm border border-border rounded-pill text-fg hover:bg-fg/5 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fg"
        aria-label={backLabel}
      >
        <ArrowLeft size={14} aria-hidden="true" />
        {backLabel}
      </button>

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
