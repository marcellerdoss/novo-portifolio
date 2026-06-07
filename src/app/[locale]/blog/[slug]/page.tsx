import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import { getPostBySlug, getAllPosts, getRelatedPosts } from '@/lib/mdx';
import { TableOfContents } from '@/components/blog/TableOfContents';
import { RelatedPosts } from '@/components/blog/RelatedPosts';
import { ScrollProgress } from '@/components/ui/ScrollProgress';
import { Badge } from '@/components/ui/Badge';
import { JsonLd } from '@/components/seo/JsonLd';
import { routing } from '@/i18n/routing';
import { siteConfig } from '@/lib/config';
import { BackToTop } from '@/components/ui/BackToTop';

type Params = Promise<{ locale: string; slug: string }>;

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of routing.locales) {
    const posts = await getAllPosts(locale);
    posts.forEach((p) => params.push({ locale, slug: p.slug }));
  }
  return params;
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await getPostBySlug(slug, locale as 'pt' | 'en');
  if (!post) return {};

  const prefix = locale === 'pt' ? '' : `/${locale}`;
  const base =
    process.env.NEXT_PUBLIC_BASE_URL ??
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');

  return {
    title: post.frontmatter.title,
    description: post.frontmatter.excerpt,
    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.excerpt,
      type: 'article',
      publishedTime: post.frontmatter.date,
      locale: locale === 'en' ? 'en_US' : 'pt_BR',
      authors: [siteConfig.name],
    },
    alternates: {
      canonical: `${base}${prefix}/blog/${slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: { params: Params }) {
  const { locale, slug } = await params;
  const t = await getTranslations('blog');

  const post = await getPostBySlug(slug, locale as 'pt' | 'en');
  if (!post) notFound();

  const related = await getRelatedPosts(slug, post.frontmatter.category, locale as 'pt' | 'en');

  const formattedDate = new Date(post.frontmatter.date).toLocaleDateString(
    locale === 'pt' ? 'pt-BR' : 'en-US',
    { year: 'numeric', month: 'long', day: 'numeric' },
  );

  const base =
    process.env.NEXT_PUBLIC_BASE_URL ??
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.frontmatter.title,
    description: post.frontmatter.excerpt,
    datePublished: post.frontmatter.date,
    inLanguage: locale === 'en' ? 'en-US' : 'pt-BR',
    url: `${base}${locale === 'en' ? '/en' : ''}/blog/${slug}`,
    author: {
      '@type': 'Person',
      name: siteConfig.name,
      url: base,
    },
    publisher: {
      '@type': 'Person',
      name: siteConfig.name,
    },
  };

  return (
    <>
      <JsonLd data={articleSchema} />
      <ScrollProgress />
      <BackToTop />

      <div className="min-h-screen bg-bg py-section px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_240px] gap-12 xl:gap-16">

            {/* Article */}
            <article>
              {/* Header */}
              <header className="mb-12">
                <span className="type-caption text-accent-magenta mb-6 block">{post.frontmatter.category}</span>
                <h1 className="type-display-xl text-fg mb-6">{post.frontmatter.title}</h1>
                <p className="type-subhead text-fg-muted mb-8">{post.frontmatter.excerpt}</p>
                <div className="flex flex-wrap items-center gap-4 type-body-sm text-fg-subtle">
                  <time dateTime={post.frontmatter.date}>{formattedDate}</time>
                  <span aria-hidden="true">·</span>
                  <span>{post.readingTime} {t('min_read')}</span>
                </div>
                {post.frontmatter.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-6">
                    {post.frontmatter.tags.map((tag) => (
                      <Badge key={tag} variant="default">{tag}</Badge>
                    ))}
                  </div>
                )}
              </header>

              {/* MDX content */}
              <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-semibold prose-headings:text-fg prose-p:text-fg-muted prose-a:text-fg prose-a:underline prose-code:text-fg prose-pre:bg-bg-secondary dark:prose-pre:bg-bg-secondary">
                <MDXRemote
                  source={post.content}
                  options={{
                    mdxOptions: {
                      remarkPlugins: [remarkGfm],
                      rehypePlugins: [
                        rehypeSlug,
                        [rehypePrettyCode, {
                          theme: { dark: 'github-dark', light: 'github-light' },
                          keepBackground: false,
                        }],
                      ],
                    },
                  }}
                />
              </div>

              {/* Related posts */}
              <RelatedPosts
                posts={related}
                locale={locale}
                label={locale === 'pt' ? 'Artigos relacionados' : 'Related articles'}
                minRead={t('min_read')}
              />
            </article>

            {/* TOC — desktop only */}
            <aside className="hidden lg:block">
              <TableOfContents
                headings={post.headings}
                label={locale === 'pt' ? 'Neste artigo' : 'In this article'}
              />
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
