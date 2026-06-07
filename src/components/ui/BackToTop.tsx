'use client';

import { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

export function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Voltar ao topo"
      className={`fixed bottom-8 right-8 z-50 inline-flex items-center gap-2 px-4 py-2.5 rounded-pill bg-fg text-bg dark:bg-accent-magenta dark:text-white type-body-sm font-[480] shadow-lg transition-all duration-300 ${
        show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <ChevronUp size={14} aria-hidden="true" />
      Voltar ao topo
    </button>
  );
}
