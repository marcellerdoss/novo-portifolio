'use client';

import { useEffect, useState } from 'react';
import { useFontSize } from '@/lib/hooks/useFontSize';

export function AccessibilityBar() {
  const [highContrast, setHighContrast] = useState(false);
  const { fontSize, applyFont } = useFontSize();

  useEffect(() => {
    const on = localStorage.getItem('a11y-contrast') === '1';
    if (on) applyContrast(true, false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function applyContrast(on: boolean, save = true) {
    document.documentElement.classList.toggle('high-contrast', on);
    if (save) localStorage.setItem('a11y-contrast', on ? '1' : '0');
    setHighContrast(on);
  }

  const skipLinks = [
    { label: 'Ir para o conteúdo', num: '1', href: '#main-content' },
    { label: 'Ir para o menu',     num: '2', href: '#main-nav' },
    { label: 'Ir para o rodapé',   num: '3', href: '#footer' },
    { label: 'Acessibilidade',      num: '4', href: '/racional' },
  ];

  const btnBase =
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded transition-colors duration-150';

  return (
    <div
      role="navigation"
      aria-label="Barra de acessibilidade"
      className="fixed top-0 left-0 right-0 z-50 h-11 bg-[#131226] flex items-center select-none"
    >
      <div className="max-w-6xl mx-auto px-6 w-full flex items-center justify-between gap-4">

        {/* Skip links — WCAG 2.4.1, e-MAG 1.1 */}
        <ul className="flex items-center m-0 p-0 list-none -ml-3" role="list">
          {skipLinks.map(({ label, num, href }, i) => (
            <li key={num} className={`flex items-center ${i > 0 ? 'hidden sm:flex' : ''}`}>
              <a
                href={href}
                className={`text-white/80 hover:text-white text-[11px] font-medium tracking-[0.06em] uppercase px-3 py-1 hover:underline underline-offset-2 ${btnBase}`}
              >
                <span className="hidden sm:inline">{label}{' '}</span>
                <span className="sm:hidden">{i === 0 ? 'Conteúdo' : label}{' '}</span>
                <span className="opacity-40">[{num}]</span>
              </a>
              {i < skipLinks.length - 1 && (
                <span className="text-white/20 text-xs select-none hidden sm:inline" aria-hidden="true">|</span>
              )}
            </li>
          ))}
        </ul>

        {/* Controls */}
        <div className="flex items-center gap-5 shrink-0">

          {/* Contrast — WCAG 1.4.3, ABNT NBR 17060 */}
          <div className="flex items-center gap-2" role="group" aria-label="Contraste">
            <span className="text-white/40 text-[10px] font-semibold tracking-[0.1em] uppercase hidden sm:block">
              Contraste:
            </span>
            <button
              type="button"
              onClick={() => applyContrast(true)}
              aria-label="Alto contraste"
              aria-pressed={highContrast}
              title="Ativar alto contraste"
              className={`w-6 h-6 rounded-full bg-black border-2 ${highContrast ? 'border-white' : 'border-white/50 hover:border-white/80'} ${btnBase}`}
            />
            <button
              type="button"
              onClick={() => applyContrast(false)}
              aria-label="Contraste normal"
              aria-pressed={!highContrast}
              title="Contraste normal"
              className={`w-6 h-6 rounded-full bg-white border-2 ${!highContrast ? 'border-white' : 'border-white/50 hover:border-white/80'} ${btnBase}`}
            />
          </div>

          {/* Font size — WCAG 1.4.4, e-MAG 1.7 */}
          <div className="flex items-center gap-1" role="group" aria-label="Tamanho do texto">
            <button
              type="button"
              onClick={() => applyFont('sm')}
              aria-label="Diminuir tamanho do texto"
              aria-pressed={fontSize === 'sm'}
              title="Texto menor"
              className={`text-[11px] font-semibold tracking-[0.06em] uppercase px-2 py-1 ${fontSize === 'sm' ? 'text-white' : 'text-white/60 hover:text-white'} ${btnBase}`}
            >
              A-
            </button>
            <button
              type="button"
              onClick={() => applyFont('lg')}
              aria-label="Aumentar tamanho do texto"
              aria-pressed={fontSize === 'lg'}
              title="Texto maior"
              className={`text-[13px] font-semibold tracking-[0.06em] uppercase px-2 py-1 ${fontSize === 'lg' ? 'text-white' : 'text-white/60 hover:text-white'} ${btnBase}`}
            >
              A+
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
