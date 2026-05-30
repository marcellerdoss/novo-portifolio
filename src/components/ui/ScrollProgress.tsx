'use client';

import { useEffect, useState } from 'react';

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const total = scrollHeight - clientHeight;
      setProgress(total > 0 ? (scrollTop / total) * 100 : 0);
    };

    window.addEventListener('scroll', update, { passive: true });
    update();
    return () => window.removeEventListener('scroll', update);
  }, []);

  return (
    <div
      role="progressbar"
      aria-label="Progresso de leitura"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      className="fixed top-16 left-0 right-0 z-30 h-0.5 bg-transparent"
    >
      <div
        className="h-full bg-primary transition-none"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
