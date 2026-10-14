'use client';

import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { siteConfig } from '@/lib/config';

export function PasswordGateForm({ redirectTo }: { redirectTo: string }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

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

    // navegacao "dura" (nao router.push): o Preloader so toca em carregamento
    // real de pagina na home, entao a entrada no site precisa ser um load de
    // verdade pra manter a animacao de entrada depois do gate de senha.
    window.location.href = redirectTo;
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
    </form>
  );
}
