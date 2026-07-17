'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';

type Phase = 'idle' | 'expanding' | 'covered' | 'revealing';
type View = 'home' | 'case';

// Sandbox isolado pra iterar no efeito de "abrir um case" sem mexer no site real.
// Aqui nao ha navegacao de verdade — so alterna entre dois mocks (home/case) por baixo
// do overlay, pra facilitar ajustar cor, timing e formato sem precisar recarregar rotas.
export function CaseExpandDemo() {
  const [phase, setPhase] = useState<Phase>('idle');
  const [view, setView] = useState<View>('home');
  const [origin, setOrigin] = useState({ x: 0, y: 0 });
  const [radius, setRadius] = useState(0);
  const pendingView = useRef<View | null>(null);
  const fallbackTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const trigger = useCallback((e: React.MouseEvent, nextView: View) => {
    const rect = (e.currentTarget as HTMLElement).closest('[data-demo-frame]')?.getBoundingClientRect();
    const x = e.clientX - (rect?.left ?? 0);
    const y = e.clientY - (rect?.top ?? 0);
    const w = rect?.width ?? window.innerWidth;
    const h = rect?.height ?? window.innerHeight;

    setOrigin({ x, y });
    setRadius(Math.hypot(w, h) + 40);
    pendingView.current = nextView;
    setPhase('expanding');
  }, []);

  const handleCoverComplete = useCallback(() => {
    setPhase((current) => (current === 'expanding' ? 'covered' : current));
    if (pendingView.current) {
      setView(pendingView.current);
      pendingView.current = null;
    }
    fallbackTimer.current = setTimeout(() => setPhase('revealing'), 1400);
  }, []);

  const handleRevealComplete = useCallback(() => {
    setPhase((current) => (current === 'revealing' ? 'idle' : current));
  }, []);

  useEffect(() => {
    if (phase !== 'covered') return;
    if (fallbackTimer.current) clearTimeout(fallbackTimer.current);
    const t = setTimeout(() => setPhase('revealing'), 120);
    return () => clearTimeout(t);
  }, [phase, view]);

  useEffect(() => () => {
    if (fallbackTimer.current) clearTimeout(fallbackTimer.current);
  }, []);

  const covering = phase === 'expanding' || phase === 'covered';

  return (
    <section className="w-full max-w-6xl mx-auto px-6 pb-24">
      <div className="border-t border-border pt-10 mb-6">
        <h2 className="type-headline text-fg mb-2">Teste: transição expansiva ao abrir um case</h2>
        <p className="type-body-sm text-fg-muted max-w-[36rem]">
          Sandbox isolado pra ajustar o efeito (cor, timing, ponto de origem) sem mexer na home real.
          Clique no card pra simular a abertura de um case; clique em &quot;Voltar&quot; pra simular o retorno.
        </p>
      </div>

      <div
        data-demo-frame
        className="relative h-[420px] md:h-[520px] w-full overflow-hidden rounded-xl border border-border bg-surface-soft"
      >
        {view === 'home' && (
          <div className="absolute inset-0 flex items-center justify-center p-10">
            <button
              type="button"
              onClick={(e) => trigger(e, 'case')}
              className="group relative aspect-[4/3] w-full max-w-[28rem] rounded-xl overflow-hidden text-left transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_4px_20px_rgba(0,0,0,0.07)]"
              style={{ backgroundColor: 'var(--color-case-preview-bg)' }}
            >
              <div className="absolute inset-5 flex items-center justify-center">
                <div className="relative w-full" style={{ aspectRatio: '16 / 10', maxWidth: '85%' }}>
                  <div className="absolute inset-0 rounded-t-[8px] border-[5px] border-b-0 border-neutral-900 dark:border-white bg-neutral-100 dark:bg-white/10 shadow-xl" />
                  <div className="absolute bottom-[-5px] left-0 right-0 h-[5px] bg-neutral-900 dark:bg-white" />
                </div>
              </div>
              <span className="absolute bottom-4 left-4 inline-flex items-center gap-1 type-caption text-fg-subtle bg-bg/80 rounded-full px-3 py-1">
                Clique pra abrir <ArrowUpRight size={12} aria-hidden="true" />
              </span>
            </button>
          </div>
        )}

        {view === 'case' && (
          <div className="absolute inset-0 flex flex-col gap-4 p-10 overflow-y-auto">
            <button
              type="button"
              onClick={(e) => trigger(e, 'home')}
              className="inline-flex items-center gap-1 w-fit type-caption text-fg-subtle hover:text-fg transition-colors"
            >
              <ArrowLeft size={12} aria-hidden="true" /> Voltar
            </button>
            <h3 className="type-headline text-fg">Mock — página de case</h3>
            <p className="type-body text-fg-muted max-w-[28rem]">
              Conteúdo simulado da página de case, só pra ver a transição cobrindo e revelando.
            </p>
          </div>
        )}

        {phase !== 'idle' && (
          <motion.div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none bg-bg"
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
      </div>
    </section>
  );
}
