import type { Metadata } from 'next';
import { Hero } from '@/components/sections/Hero';
import { MarqueeStrip } from '@/components/sections/MarqueeStrip';
import { About } from '@/components/sections/About';
import { CasesSection } from '@/components/sections/Cases';
import { Skills } from '@/components/sections/Skills';
import { Racional } from '@/components/sections/Racional';
import { Experience } from '@/components/sections/Experience';
import { BlogPreview } from '@/components/sections/Blog';
import { Contact } from '@/components/sections/Contact';
import { JsonLd } from '@/components/seo/JsonLd';
import { BackToTop } from '@/components/ui/BackToTop';
import { getCases } from '@/lib/cases';
import { getExperience } from '@/lib/experience';
import { getAllPosts } from '@/lib/mdx';
import { siteConfig } from '@/lib/config';

type Props = { params: Promise<{ locale: string }> };

const descriptions: Record<string, string> = {
  pt: 'Portfolio de UX & Product Designer especializada em criar produtos digitais com impacto. Cases, blog e experiência profissional.',
  en: 'UX & Product Designer portfolio focused on creating digital products with real impact. Cases, blog, and professional experience.',
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const description = descriptions[locale] ?? descriptions.pt;

  return {
    title: 'Marcelle — UX & Product Designer',
    description,
    openGraph: {
      title: 'Marcelle — UX & Product Designer',
      description,
      locale: locale === 'en' ? 'en_US' : 'pt_BR',
      type: 'website',
    },
    alternates: {
      canonical: locale === 'en' ? '/en' : '/',
      languages: { 'pt-BR': '/', 'en-US': '/en' },
    },
  };
}

export default async function Home({ params }: Props) {
  const { locale } = await params;

  const [cases, experience, posts] = await Promise.all([
    getCases(),
    getExperience(),
    getAllPosts(locale as 'pt' | 'en'),
  ]);

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
      <MarqueeStrip />
      <About />
      <CasesSection cases={cases} />
      <BlogPreview posts={posts.slice(0, 3)} />
      <Skills />
      <Racional />
      <Experience items={experience} />
      <Contact />
      <BackToTop />
    </>
  );
}
