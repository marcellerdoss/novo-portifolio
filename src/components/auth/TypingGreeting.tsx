'use client';

import { useEffect, useRef, useState } from 'react';

const LINE_1 = 'Olá!';
const LINE_2 = 'Que bom receber sua visita :)';
const TOTAL = LINE_1.length + LINE_2.length;

// velocidade de digitacao humana: intervalo randomico por caractere (nao
// um tick fixo e robotico), com uma pausa maior pra "respirar" depois do
// "Ola!" antes de continuar a segunda linha.
const MIN_CHAR_MS = 90;
const MAX_CHAR_MS = 190;
const BREATH_AFTER_LINE1_MS = 700;

function randomCharDelay() {
  return MIN_CHAR_MS + Math.random() * (MAX_CHAR_MS - MIN_CHAR_MS);
}

export function TypingGreeting({ onDone }: { onDone?: () => void }) {
  const [charsRevealed, setCharsRevealed] = useState(0);
  const onDoneRef = useRef(onDone);

  useEffect(() => {
    onDoneRef.current = onDone;
  }, [onDone]);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    let started = false;

    function scheduleNext(count: number) {
      if (count >= TOTAL) {
        onDoneRef.current?.();
        return;
      }
      // pausa maior logo apos terminar de digitar "Ola!" (count === 4)
      const delay = count === LINE_1.length ? BREATH_AFTER_LINE1_MS : randomCharDelay();
      timeoutId = setTimeout(() => {
        const next = count + 1;
        setCharsRevealed(next);
        scheduleNext(next);
      }, delay);
    }

    function startTyping() {
      if (started) return;
      started = true;
      // prefers-reduced-motion: pula pro texto completo direto
      // (sem setState direto no corpo do efeito, so dentro do callback)
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduceMotion) {
        timeoutId = setTimeout(() => {
          setCharsRevealed(TOTAL);
          onDoneRef.current?.();
        }, 0);
        return;
      }
      scheduleNext(0);
    }

    // a tela de senha fica atras do Preloader por ~3.8s (ver HOME_PATHS em
    // Preloader.tsx); sem isso, a digitacao termina escondida atras dele.
    // Espera o #preloader sumir do DOM antes de comecar a "digitar".
    if (!document.getElementById('preloader')) {
      startTyping();
      return () => clearTimeout(timeoutId);
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
      clearTimeout(timeoutId);
    };
  }, []);

  const revealedLine1 = Math.min(charsRevealed, LINE_1.length);
  const revealedLine2 = Math.max(0, charsRevealed - LINE_1.length);
  const typingLine1 = revealedLine1 < LINE_1.length;
  const typingLine2 = !typingLine1 && revealedLine2 < LINE_2.length;

  return (
    <h1 className="text-[1.125rem] leading-[1.05] tracking-[-2px] text-navy-600 dark:text-navy-200">
      <span className="block font-bold">
        {LINE_1.slice(0, revealedLine1)}
        {typingLine1 && <Caret />}
      </span>
      <span className="block font-bold">
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
