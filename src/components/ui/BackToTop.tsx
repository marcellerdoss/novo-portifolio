'use client';

import { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function BackToTop() {
  const t = useTranslations('common');
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label={t('back_to_top')}
      className={`fixed bottom-8 right-8 z-[35] inline-flex items-center justify-center p-2.5 rounded-pill bg-fg text-bg dark:bg-accent-magenta dark:text-white shadow-lg transition-all duration-300 ${
        show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <ChevronUp size={16} aria-hidden="true" />
    </button>
  );
}
