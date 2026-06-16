import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { GoogleAnalytics } from '@next/third-parties/google';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: 'variable',
  display: 'block',
});

const base =
  process.env.NEXT_PUBLIC_BASE_URL ??
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:3000');

export const metadata: Metadata = {
  metadataBase: new URL('https://marcellerocha.com.br'),
  title: {
    default: 'Marcelle Rocha | Produto estratégico',
    template: '%s | Marcelle Rocha',
  },
  description:
    'Design centrado em comportamento e decisão. Produtos digitais construídos com estratégia, intenção e foco em impacto.',
  openGraph: {
    type: 'website',
    siteName: 'Marcelle Rocha',
    url: 'https://marcellerocha.com.br',
    locale: 'pt_BR',
    alternateLocale: 'en_US',
    title: 'Marcelle Rocha | Produto estratégico',
    description: 'Design centrado em comportamento e decisão. Produtos digitais construídos com estratégia, intenção e foco em impacto.',
    images: [{
      url: '/images/social/og-image-navy-bege.png',
      width: 1200,
      height: 630,
      alt: 'Marcelle Rocha | Produto estratégico',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Marcelle Rocha | Produto estratégico',
    description: 'Design centrado em comportamento e decisão. Produtos digitais construídos com estratégia, intenção e foco em impacto.',
    images: ['/images/social/og-image-navy-bege.png'],
  },
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
    shortcut: '/icon.svg',
  },
  robots: { index: false, follow: false },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://vitals.vercel-insights.com" />
      </head>
      <body className="min-h-full flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
        <Analytics />
        <GoogleAnalytics gaId="G-Y7XWKZGYFB" />
      </body>
    </html>
  );
}
