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
    title,
    description,
    openGraph: {
      title,
      description,
      locale: ogLocale,
      type: 'website',
      url: locale === 'en' ? 'https://marcellerocha.com.br/en' : 'https://marcellerocha.com.br',
      images: [{
        url: '/images/social/og-image-magenta.png',
        width: 1200,
        height: 630,
        alt: title,
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/images/social/og-image-magenta.png'],
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
      <BlogPreview posts={posts} />
      <Racional />
      <section
        id="experiencia"
        aria-labelledby="experience-heading"
        className="bg-block-cream py-section md:py-0"
      >
        <div className="max-w-6xl mx-auto px-6 md:px-0">
          <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="md:col-span-2 md:py-section md:pl-6 md:pr-16">
              <Experience items={experience} inline />
            </div>
            <div className="mt-16 md:mt-0 md:col-span-1 md:py-section md:bg-cream-200 md:dark:bg-navy-800 md:px-8">
              <Skills inline />
            </div>
          </div>
        </div>
      </section>
      <Contact />
      <BackToTop />
    </>
  );
}
