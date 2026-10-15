'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowUp } from 'lucide-react';

export function PasswordGateForm({
  redirectTo,
  focusWhenReady,
  error,
  onError,
}: {
  redirectTo: string;
  focusWhenReady?: boolean;
  error: boolean;
  onError: (hasError: boolean) => void;
}) {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // so foca o campo quando o resto da tela e revelado (depois da digitacao
  // do titulo) - autoFocus estatico focaria um campo ainda invisivel.
  useEffect(() => {
    if (focusWhenReady) inputRef.current?.focus();
  }, [focusWhenReady]);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    onError(false);

    const response = await fetch('/api/site-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });

    if (!response.ok) {
      onError(true);
      setLoading(false);
      return;
    }

    // hard reload (nao router.push): o Preloader so ativa num mount novo de
    // verdade, entao o loader de entrada toca de novo depois do acesso.
    window.location.href = redirectTo;
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col items-center gap-sm">
      <label htmlFor="site-password" className="sr-only">
        Código de acesso
      </label>
      {/* barra de composicao tipo chat de IA: input + enviar, tudo num so campo pill */}
      <div className="flex w-full items-center gap-1 rounded-pill border border-fg/20 bg-bg py-1.5 pl-5 pr-1.5 focus-within:border-fg/50">
        <input
          ref={inputRef}
          id="site-password"
          type="password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
            onError(false);
          }}
          aria-describedby={error ? 'site-password-error' : undefined}
          aria-invalid={error || undefined}
          className="type-body w-full bg-transparent py-1.5 text-fg outline-none"
          placeholder="Digite o código"
        />
        <button
          type="submit"
          disabled={loading || !password}
          aria-label="Enviar"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent-magenta text-white transition-colors duration-150 hover:bg-magenta-500 disabled:bg-neutral-500 disabled:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fg"
        >
          <ArrowUp size={18} aria-hidden="true" />
        </button>
      </div>
    </form>
  );
}
