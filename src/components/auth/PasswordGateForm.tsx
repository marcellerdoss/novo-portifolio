'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

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
      <label htmlFor="site-password" className="type-body-sm text-[var(--fg-subtle)]">
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
        className="rounded-md border border-[var(--border-token)] bg-[var(--bg)] px-4 py-3 text-[var(--fg)] outline-none focus:border-[var(--color-accent-magenta)]"
        placeholder="Digite a senha"
      />
      {error && (
        <p className="type-body-sm text-[var(--color-accent-magenta)]">
          Senha incorreta. Tente novamente.
        </p>
      )}
      <button
        type="submit"
        disabled={loading || !password}
        className="type-btn mt-2 rounded-md bg-primary px-4 py-3 text-white transition-opacity disabled:opacity-50"
      >
        {loading ? 'Verificando...' : 'Entrar'}
      </button>
    </form>
  );
}
