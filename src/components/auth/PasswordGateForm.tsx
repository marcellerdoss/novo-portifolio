'use client';

import { useEffect, useRef, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { siteConfig } from '@/lib/config';

export function PasswordGateForm({
  redirectTo,
  focusWhenReady,
}: {
  redirectTo: string;
  focusWhenReady?: boolean;
}) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // so foca o campo quando o resto da tela e revelado (depois da digitacao
  // do titulo) - autoFocus estatico focaria um campo ainda invisivel.
  useEffect(() => {
    if (focusWhenReady) inputRef.current?.focus();
  }, [focusWhenReady]);

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

    // hard reload (nao router.push): o Preloader so ativa num mount novo de
    // verdade, entao o loader de entrada toca de novo depois do acesso.
    window.location.href = redirectTo;
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-[24rem] flex-col gap-sm">
      <label htmlFor="site-password" className="sr-only">
        Código de acesso
      </label>
      <div className="relative">
        <input
          ref={inputRef}
          id="site-password"
          type={visible ? 'text' : 'password'}
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
            setError(false);
          }}
          aria-describedby={error ? 'site-password-error' : undefined}
          aria-invalid={error || undefined}
          className="type-body w-full rounded-md border border-fg/20 bg-bg px-4 py-3 pr-12 text-fg outline-none focus:border-fg/50"
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
        type="submit"
        size="lg"
        disabled={loading || !password}
        className="w-full bg-accent-magenta! hover:bg-magenta-500! disabled:bg-neutral-700! disabled:opacity-100!"
      >
        {loading ? 'Verificando...' : 'Entrar'}
      </Button>
      {error && (
        <p
          id="site-password-error"
          role="alert"
          className="type-body-sm text-accent-magenta dark:text-magenta-300"
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
    </form>
  );
}
