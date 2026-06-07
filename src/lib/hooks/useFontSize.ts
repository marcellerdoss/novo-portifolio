'use client';

import { useState, useEffect } from 'react';

export type FontScale = 'sm' | 'md' | 'lg';
export const FONT_PX: Record<FontScale, number> = { sm: 14, md: 16, lg: 18 };

export function useFontSize() {
  const [fontSize, setFontSize] = useState<FontScale>('md');

  useEffect(() => {
    const stored = localStorage.getItem('a11y-font') as FontScale | null;
    if (stored && FONT_PX[stored]) {
      document.documentElement.style.fontSize = `${FONT_PX[stored]}px`;
      setFontSize(stored);
    }

    const handler = (e: Event) => {
      setFontSize((e as CustomEvent<FontScale>).detail);
    };
    window.addEventListener('a11y-font', handler);
    return () => window.removeEventListener('a11y-font', handler);
  }, []);

  function applyFont(scale: FontScale) {
    document.documentElement.style.fontSize = `${FONT_PX[scale]}px`;
    localStorage.setItem('a11y-font', scale);
    setFontSize(scale);
    window.dispatchEvent(new CustomEvent<FontScale>('a11y-font', { detail: scale }));
  }

  return { fontSize, applyFont };
}
