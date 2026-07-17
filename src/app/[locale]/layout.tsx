import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { AccessibilityBar } from '@/components/layout/AccessibilityBar';
import { LocaleLang } from '@/components/layout/LocaleLang';
import { CaseTransitionProvider } from '@/components/providers/CaseTransitionProvider';

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as 'pt' | 'en')) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <LocaleLang />
      <CaseTransitionProvider>
        <AccessibilityBar />
        <Header />
        <main id="main-content" className="flex-1 pt-[6.25rem]">
          {children}
        </main>
        <Footer />
      </CaseTransitionProvider>
    </NextIntlClientProvider>
  );
}
