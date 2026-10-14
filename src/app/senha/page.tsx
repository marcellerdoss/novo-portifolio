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
      <h1 className="text-[clamp(2rem,4.5vw,4.5rem)] leading-[1.05] tracking-[-2px] text-navy-600 dark:text-navy-200">
        <span className="block font-bold">Olá!</span>
        <span className="block font-extrabold">Que bom receber sua visita :)</span>
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
