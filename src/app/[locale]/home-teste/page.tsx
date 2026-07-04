import { Hero } from '@/components/sections/Hero';
import { MarqueeStrip } from '@/components/sections/MarqueeStrip';
import { CasesSection } from '@/components/sections/Cases';
import { BlogPreview } from '@/components/sections/Blog';
import { Contact } from '@/components/sections/Contact';
import { BackToTop } from '@/components/ui/BackToTop';
import { DotNav } from '@/components/ui/DotNav';
import { getAllPosts } from '@/lib/mdx';

type Props = { params: Promise<{ locale: string }> };

export default async function HomeTeste({ params }: Props) {
  const { locale } = await params;

  const posts = await getAllPosts(locale as 'pt' | 'en');

  return (
    <>
      <DotNav />
      <Hero />
      <MarqueeStrip locale={locale} />
      <CasesSection />
      <BlogPreview posts={posts} />
      <Contact />
      <BackToTop />
    </>
  );
}
