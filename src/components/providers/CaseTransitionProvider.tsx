'use client';

import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { usePathname, useRouter } from '@/i18n/navigation';

type Phase = 'idle' | 'expanding' | 'covered' | 'revealing';

type CaseTransitionContextValue = {
  triggerCaseTransition: (x: number, y: number, href: string) => void;
};

const CaseTransitionContext = createContext<CaseTransitionContextValue | null>(null);

export function useCaseTransition() {
  const ctx = useContext(CaseTransitionContext);
  if (!ctx) throw new Error('useCaseTransition deve ser usado dentro de CaseTransitionProvider');
  return ctx;
}

export function CaseTransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [phase, setPhase] = useState<Phase>('idle');
  const [origin, setOrigin] = useState({ x: 0, y: 0 });
  const [radius, setRadius] = useState(0);
  const pendingHref = useRef<string | null>(null);
  const fallbackTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const triggerCaseTransition = useCallback((x: number, y: number, href: string) => {
    setOrigin({ x, y });
    setRadius(Math.hypot(window.innerWidth, window.innerHeight) + 40);
    pendingHref.current = href;
    setPhase('expanding');
  }, []);

  const handleCoverComplete = useCallback(() => {
    setPhase((current) => (current === 'expanding' ? 'covered' : current));
    if (pendingHref.current) {
      router.push(pendingHref.current);
      pendingHref.current = null;
    }
    // rede de seguranca: se a rota nao mudar (ex: mesma pagina), revela de qualquer forma
    fallbackTimer.current = setTimeout(() => setPhase('revealing'), 1400);
  }, [router]);

  const handleRevealComplete = useCallback(() => {
    setPhase((current) => (current === 'revealing' ? 'idle' : current));
  }, []);

  // pathname mudou enquanto a tela estava coberta: a navegacao terminou,
  // da um instante pro conteudo novo pintar e entao revela
  useEffect(() => {
    if (phase !== 'covered') return;
    if (fallbackTimer.current) clearTimeout(fallbackTimer.current);
    const t = setTimeout(() => setPhase('revealing'), 120);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    return () => {
      if (fallbackTimer.current) clearTimeout(fallbackTimer.current);
    };
  }, []);

  const covering = phase === 'expanding' || phase === 'covered';

  return (
    <CaseTransitionContext.Provider value={{ triggerCaseTransition }}>
      {children}
      {phase !== 'idle' && (
        <motion.div
          aria-hidden="true"
          className="fixed inset-0 z-[9990] pointer-events-none bg-bg"
          initial={{ clipPath: `circle(0px at ${origin.x}px ${origin.y}px)`, opacity: 1 }}
          animate={{
            clipPath: `circle(${radius}px at ${origin.x}px ${origin.y}px)`,
            opacity: covering ? 1 : 0,
          }}
          transition={
            phase === 'revealing'
              ? { duration: 0.45, ease: [0.4, 0, 0.2, 1] }
              : { duration: 0.55, ease: [0.65, 0, 0.35, 1] }
          }
          onAnimationComplete={() => {
            if (phase === 'expanding') handleCoverComplete();
            if (phase === 'revealing') handleRevealComplete();
          }}
        />
      )}
    </CaseTransitionContext.Provider>
  );
}
