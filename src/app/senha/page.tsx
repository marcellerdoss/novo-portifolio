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
    <div className="flex min-h-screen flex-col items-center justify-center gap-lg bg-bg px-6 text-center">
      <h1 className="text-fg">
        <span className="type-display-lg block">Olá!</span>
        <span className="type-subhead block mt-xxs">Que bom receber sua visita :)</span>
      </h1>
      <div className="flex flex-col items-center gap-sm">
        <p className="type-body-lg text-fg-muted">
          Digite o código de acesso para conhecer meu trabalho.
        </p>
        <PasswordGateForm redirectTo={redirectTo} />
      </div>
    </div>
  );
}
