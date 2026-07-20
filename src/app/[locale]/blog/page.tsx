import type { Metadata } from 'next';
import { getAllPosts } from '@/lib/mdx';
import { BlogClient } from '@/components/blog/BlogClient';

type Props = { params: Promise<{ locale: string }> };

const titles: Record<string, string> = {
  pt: 'Blog · Reflexões sobre design e produto',
  en: 'Blog · Thoughts on design and product',
};
const descs: Record<string, string> = {
  pt: 'Artigos sobre UX, design de produto, research e design system.',
  en: 'Articles on UX, product design, research, and design systems.',
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: titles[locale] ?? titles.pt,
    description: descs[locale] ?? descs.pt,
    openGraph: {
      title: titles[locale] ?? titles.pt,
      description: descs[locale] ?? descs.pt,
      type: 'website',
    },
  };
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  const posts = await getAllPosts(locale as 'pt' | 'en');
  return <BlogClient posts={posts} />;
}
