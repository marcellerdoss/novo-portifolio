'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';

export function PasswordGateForm({ redirectTo }: { redirectTo: string }) {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

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
      <input
        id="site-password"
        type="password"
        autoFocus
        value={password}
        onChange={(event) => {
          setPassword(event.target.value);
          setError(false);
        }}
        className="type-body rounded-md border border-border bg-bg px-4 py-3 text-fg outline-none focus:ring-2 focus:ring-accent-magenta"
        placeholder="Digite a senha"
      />
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
