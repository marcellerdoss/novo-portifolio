'use client';

import { useEffect, useRef, useState } from 'react';

const MIN_CHAR_MS = 90;
const MAX_CHAR_MS = 190;

function randomCharDelay() {
  return MIN_CHAR_MS + Math.random() * (MAX_CHAR_MS - MIN_CHAR_MS);
}

export function TypingText({
  text,
  enabled,
  onDone,
  className,
}: {
  text: string;
  enabled: boolean;
  onDone?: () => void;
  className?: string;
}) {
  const [revealed, setRevealed] = useState(0);
  const onDoneRef = useRef(onDone);

  useEffect(() => {
    onDoneRef.current = onDone;
  }, [onDone]);

  useEffect(() => {
    if (!enabled) return;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    function scheduleNext(count: number) {
      if (count >= text.length) {
        onDoneRef.current?.();
        return;
      }
      // prefers-reduced-motion: pula pro texto completo direto
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduceMotion) {
        setRevealed(text.length);
        onDoneRef.current?.();
        return;
      }
      timeoutId = setTimeout(() => {
        const next = count + 1;
        setRevealed(next);
        scheduleNext(next);
      }, randomCharDelay());
    }

    scheduleNext(0);
    return () => clearTimeout(timeoutId);
  }, [enabled, text]);

  const typing = enabled && revealed < text.length;

  return (
    <p className={className}>
      {text.slice(0, revealed)}
      {typing && (
        <span
          aria-hidden="true"
          className="ml-1 inline-block h-[0.85em] w-[0.06em] translate-y-[0.08em] animate-pulse bg-current align-middle"
        />
      )}
    </p>
  );
}
