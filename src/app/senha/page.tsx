import type { Metadata } from 'next';
import { SenhaScreen } from '@/components/auth/SenhaScreen';

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

  return <SenhaScreen redirectTo={redirectTo} />;
}
