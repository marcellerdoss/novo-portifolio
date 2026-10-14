'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function PasswordGateForm({ redirectTo }: { redirectTo: string }) {
  const router = useRouter();
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

    router.push(redirectTo);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-[24rem] flex-col gap-3">
      <label htmlFor="site-password" className="type-body-sm text-fg-subtle">
        Senha de acesso
      </label>
      <div className="relative">
        <input
          id="site-password"
          type={visible ? 'text' : 'password'}
          autoFocus
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
            setError(false);
          }}
          className="type-body w-full rounded-md border border-border bg-bg px-4 py-3 pr-12 text-fg outline-none focus:ring-2 focus:ring-accent-magenta"
          placeholder="Digite a senha"
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? 'Ocultar senha' : 'Mostrar senha'}
          aria-pressed={visible}
          className="absolute inset-y-0 right-0 flex w-12 items-center justify-center text-fg-muted hover:text-fg transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fg rounded-md"
        >
          {visible ? <EyeOff size={18} aria-hidden="true" /> : <Eye size={18} aria-hidden="true" />}
        </button>
      </div>
      {error && (
        <p className="type-body-sm text-accent-magenta">
          Senha incorreta. Tente novamente.
        </p>
      )}
      <Button type="submit" size="lg" disabled={loading || !password} className="mt-2 self-start">
        {loading ? 'Verificando...' : 'Entrar'}
      </Button>
    </form>
  );
}
