'use client';

import { useEffect, useState } from 'react';

const LINE_1 = 'Olá!';
const LINE_2 = 'Que bom receber sua visita :)';
const TOTAL = LINE_1.length + LINE_2.length;
const TYPE_SPEED_MS = 45;

export function TypingGreeting() {
  const [charsRevealed, setCharsRevealed] = useState(0);

  useEffect(() => {
    let typingInterval: ReturnType<typeof setInterval> | undefined;
    let started = false;

    function startTyping() {
      if (started) return;
      started = true;
      // prefers-reduced-motion: pula pro texto completo no primeiro tick
      // (sem setState direto no corpo do efeito, so dentro do callback)
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      let count = 0;
      typingInterval = setInterval(() => {
        count = reduceMotion ? TOTAL : count + 1;
        setCharsRevealed(count);
        if (count >= TOTAL && typingInterval) clearInterval(typingInterval);
      }, TYPE_SPEED_MS);
    }

    // a tela de senha fica atras do Preloader por ~3.8s (ver HOME_PATHS em
    // Preloader.tsx); sem isso, a digitacao termina escondida atras dele.
    // Espera o #preloader sumir do DOM antes de comecar a "digitar".
    if (!document.getElementById('preloader')) {
      startTyping();
      return () => clearInterval(typingInterval);
    }

    const observer = new MutationObserver(() => {
      if (!document.getElementById('preloader')) {
        observer.disconnect();
        startTyping();
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
    // seguranca: se o preloader nunca sumir por algum motivo, comeca mesmo assim
    const fallback = setTimeout(startTyping, 5000);

    return () => {
      observer.disconnect();
      clearTimeout(fallback);
      clearInterval(typingInterval);
    };
  }, []);

  const revealedLine1 = Math.min(charsRevealed, LINE_1.length);
  const revealedLine2 = Math.max(0, charsRevealed - LINE_1.length);
  const typingLine1 = revealedLine1 < LINE_1.length;
  const typingLine2 = !typingLine1 && revealedLine2 < LINE_2.length;

  return (
    <h1 className="text-[clamp(2rem,4.5vw,4.5rem)] leading-[1.05] tracking-[-2px] text-navy-600 dark:text-navy-200">
      <span className="block font-bold">
        {LINE_1.slice(0, revealedLine1)}
        {typingLine1 && <Caret />}
      </span>
      <span className="block font-extrabold">
        {LINE_2.slice(0, revealedLine2)}
        {typingLine2 && <Caret />}
      </span>
    </h1>
  );
}

function Caret() {
  return (
    <span
      aria-hidden="true"
      className="ml-1 inline-block h-[0.85em] w-[0.06em] translate-y-[0.08em] animate-pulse bg-current align-middle"
    />
  );
}
