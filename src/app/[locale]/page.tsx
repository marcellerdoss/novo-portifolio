import type { Metadata } from 'next';
import { Hero } from '@/components/sections/Hero';
import { MarqueeStrip } from '@/components/sections/MarqueeStrip';
import { CasesSection } from '@/components/sections/Cases';
import { BlogPreview } from '@/components/sections/Blog';
import { Contact } from '@/components/sections/Contact';
import { JsonLd } from '@/components/seo/JsonLd';
import { BackToTop } from '@/components/ui/BackToTop';
import { getAllPosts } from '@/lib/mdx';
import { siteConfig } from '@/lib/config';

type Props = { params: Promise<{ locale: string }> };

const titles: Record<string, string> = {
  pt: 'Marcelle Rocha | Produto estratégico',
  en: 'Marcelle Rocha | Strategic Product',
};

const descriptions: Record<string, string> = {
  pt: 'Design centrado em comportamento e decisão. Produtos digitais construídos com estratégia, intenção e foco em impacto.',
  en: 'Behavior- and decision-centered design. Digital products built with strategy, intention, and a focus on impact.',
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const title = titles[locale] ?? titles.pt;
  const description = descriptions[locale] ?? descriptions.pt;
  const ogLocale = locale === 'en' ? 'en_US' : 'pt_BR';

  return {
    title: { absolute: title },
    description,
    openGraph: {
      title,
      description,
      locale: ogLocale,
      type: 'website',
      url: locale === 'en' ? 'https://marcellerocha.com.br/en' : 'https://marcellerocha.com.br',
      images: [{
        url: '/images/social/og-image-navy-bege.png',
        width: 1200,
        height: 630,
        alt: title,
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/images/social/og-image-navy-bege.png'],
    },
    alternates: {
      canonical: locale === 'en' ? '/en' : '/',
      languages: { 'pt-BR': '/', 'en-US': '/en' },
    },
  };
}

export default async function Home({ params }: Props) {
  const { locale } = await params;

  const posts = await getAllPosts(locale as 'pt' | 'en');

  const base =
    process.env.NEXT_PUBLIC_BASE_URL ??
    (process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : 'http://localhost:3000');

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: siteConfig.name,
    jobTitle: siteConfig.role,
    url: base,
    email: `mailto:${siteConfig.contact.email}`,
    sameAs: [
      siteConfig.contact.linkedin,
      siteConfig.contact.behance,
      siteConfig.contact.github,
    ].filter(Boolean),
  };

  return (
    <>
      <JsonLd data={personSchema} />
      <Hero />
      <MarqueeStrip locale={locale} />
      <CasesSection />
      <BlogPreview posts={posts} />
      <Contact />
      <BackToTop />
    </>
  );
}
