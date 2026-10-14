'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { siteConfig } from '@/lib/config';

export function PasswordGateForm({ redirectTo }: { redirectTo: string }) {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [origin, setOrigin] = useState<{ x: number; y: number } | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // onda magenta expandindo do botao, ecoando o alvo/aneis do Preloader
  // sem reexecutar a animacao inteira (monograma + aneis) de novo.
  useEffect(() => {
    if (!transitioning) return;
    const raf = requestAnimationFrame(() => setExpanded(true));
    const timeout = setTimeout(() => {
      // router.push (navegacao client-side) em vez de hard reload: o layout
      // raiz nunca remonta, entao o Preloader (que so ativa num mount novo)
      // nao toca de novo depois da onda - sem precisar de nenhuma flag.
      router.push(redirectTo);
    }, 700);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timeout);
    };
  }, [transitioning, redirectTo, router]);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError(false);

    const response = await fetch('/api/site-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });

    if (!response.ok) {
      setError(true);
      setLoading(false);
      return;
    }

    const rect = buttonRef.current?.getBoundingClientRect();
    if (rect) {
      setOrigin({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
    }
    setTransitioning(true);
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-[24rem] flex-col gap-sm">
      <label htmlFor="site-password" className="sr-only">
        Código de acesso
      </label>
      <div className="flex gap-sm">
        <div className="relative flex-1">
          <input
            id="site-password"
            type={visible ? 'text' : 'password'}
            autoFocus
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
              setError(false);
            }}
            aria-describedby={error ? 'site-password-error' : undefined}
            aria-invalid={error || undefined}
            className="type-body h-full w-full rounded-md border border-border bg-bg px-4 py-3 pr-12 text-fg outline-none focus:ring-2 focus:ring-accent-magenta"
            placeholder="Digite o código"
          />
          <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            aria-label={visible ? 'Ocultar código' : 'Mostrar código'}
            aria-pressed={visible}
            className="absolute inset-y-0 right-0 flex w-12 items-center justify-center text-fg-muted hover:text-fg transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fg rounded-md"
          >
            {visible ? <EyeOff size={18} aria-hidden="true" /> : <Eye size={18} aria-hidden="true" />}
          </button>
        </div>
        <Button
          ref={buttonRef}
          type="submit"
          size="lg"
          disabled={loading || !password}
          className="shrink-0 disabled:opacity-70!"
        >
          {loading ? 'Verificando...' : 'Entrar'}
        </Button>
      </div>
      {error && (
        <p
          id="site-password-error"
          role="alert"
          className="type-body-sm text-accent-magenta dark:text-magenta-300 text-left"
        >
          Código incorreto. Tente novamente.
        </p>
      )}
      <p className="type-body-xs text-fg-subtle mt-md">
        Não tem o código? Me chama pelo{' '}
        <a
          href={siteConfig.contact.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="text-fg underline underline-offset-4 hover:text-accent-magenta"
        >
          WhatsApp
        </a>{' '}
        ou{' '}
        <a
          href={`mailto:${siteConfig.contact.email}`}
          className="text-fg underline underline-offset-4 hover:text-accent-magenta whitespace-nowrap"
        >
          e-mail
        </a>
        .
        <br />
        Vou adorar conversar com você!
      </p>

      {transitioning && origin && (
        <div
          aria-hidden="true"
          className="pointer-events-none fixed z-50 rounded-full bg-accent-magenta"
          style={{
            left: origin.x,
            top: origin.y,
            width: 24,
            height: 24,
            transform: `translate(-50%, -50%) scale(${expanded ? 100 : 0})`,
            transition: 'transform 700ms cubic-bezier(0.32, 0, 0.4, 1)',
          }}
        />
      )}
      <span className="sr-only" role="status">
        {transitioning ? 'Entrando...' : ''}
      </span>
    </form>
  );
}
