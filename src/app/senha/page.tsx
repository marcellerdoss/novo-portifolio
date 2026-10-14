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
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 bg-[var(--bg)] px-6 text-center">
      <div className="flex flex-col gap-2">
        <h1 className="type-headline text-[var(--fg)]">Acesso restrito</h1>
        <p className="type-body-sm text-[var(--fg-subtle)]">
          Este portfólio está protegido por senha. Digite-a para continuar.
        </p>
      </div>
      <PasswordGateForm redirectTo={redirectTo} />
    </div>
  );
}
