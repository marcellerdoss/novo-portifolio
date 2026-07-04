'use client';

import { useEffect } from 'react';
import './globals.css';

const RELOAD_FLAG = 'chunk-error-reloaded';

function isChunkLoadError(error: Error) {
  return (
    /ChunkLoadError/i.test(error.name) ||
    /loading chunk/i.test(error.message) ||
    /failed to fetch dynamically imported module/i.test(error.message) ||
    /failed to import/i.test(error.message)
  );
}

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    if (!isChunkLoadError(error)) return;
    if (sessionStorage.getItem(RELOAD_FLAG)) return;
    sessionStorage.setItem(RELOAD_FLAG, '1');
    window.location.reload();
  }, [error]);

  return (
    <html lang="pt-BR">
      <body className="min-h-screen flex items-center justify-center bg-bg text-fg px-6">
        <div className="max-w-sm text-center space-y-4">
          <h2 className="text-lg font-semibold">Ops, algo deu errado</h2>
          <p className="text-sm text-fg-subtle">
            O site acabou de ser atualizado. Recarregue a página para continuar.
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="inline-flex items-center justify-center rounded-md bg-fg text-bg px-4 py-2 text-sm font-medium"
          >
            Recarregar
          </button>
        </div>
      </body>
    </html>
  );
}
