import type { Metadata } from 'next';
import { PasswordGateForm } from '@/components/auth/PasswordGateForm';

export const metadata: Metadata = {
  title: 'Acesso restrito',
  robots: { index: false, follow: false },
};

export default async function SenhaPage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string }>;
}) {
  const { from } = await searchParams;
  const redirectTo = from && from.startsWith('/') ? from : '/';

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 bg-bg px-6 text-center">
      <div className="flex flex-col gap-2">
        <h1 className="type-display-lg text-fg">Oi! Que bom receber sua visita. 💜</h1>
        <p className="type-body-sm text-fg-subtle">
          Digite o código de acesso para conhecer meu trabalho.
        </p>
      </div>
      <PasswordGateForm redirectTo={redirectTo} />
    </div>
  );
}
