'use client';

import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { ArrowUpRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { fadeInUp, stagger } from '@/lib/animations';
import type { BlogPost } from '@/lib/types';

type Props = { posts: BlogPost[] };

function formatDate(dateStr: string, locale: string) {
  return new Date(dateStr).toLocaleDateString(locale === 'pt' ? 'pt-BR' : 'en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

function ArticleCard({ post, locale, t }: { post: BlogPost; locale: string; t: ReturnType<typeof useTranslations> }) {
  const inner = (
    <div className="group flex flex-col h-full rounded-[16px] bg-bg border border-black/10 p-6 transition-all duration-200 hover:-translate-y-1 hover:border-black/20 hover:shadow-[0_4px_20px_rgba(0,0,0,0.07)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fg">
      {/* Category */}
      <span className="type-caption text-fg-muted mb-4 inline-block">
        {post.category}
      </span>

      {/* Title */}
      <h3 className="type-body-strong text-fg mb-3 leading-snug flex-1">
        {post.title}
      </h3>

      {/* Excerpt */}
      <p className="type-body-sm text-fg-muted line-clamp-3 mb-6">
        {post.excerpt}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between gap-2 type-caption text-fg-muted mt-auto">
        <div className="flex items-center gap-2">
          <time dateTime={post.date}>{formatDate(post.date, locale)}</time>
          <span aria-hidden="true">·</span>
          <span>{post.readingTime} {t('min_read')}</span>
        </div>
        <ArrowUpRight
          size={14}
          aria-hidden="true"
          className="shrink-0 text-fg-muted group-hover:text-fg transition-colors"
        />
      </div>
    </div>
  );

  if (post.externalUrl) {
    return (
      <a href={post.externalUrl} target="_blank" rel="noopener noreferrer" className="block h-full">
        {inner}
      </a>
    );
  }

  return (
    <Link href={`/blog/${post.slug}`} className="block h-full">
      {inner}
    </Link>
  );
}

export function BlogPreview({ posts }: Props) {
  const t = useTranslations('blog');
  const locale = useLocale() as 'pt' | 'en';

  return (
    <section
      id="blog"
      aria-labelledby="blog-heading"
      className="py-section px-6 bg-bg"
    >
      <div className="max-w-6xl mx-auto">
        <div className="rounded-[24px] p-8 md:p-12 bg-block-cream">

          {/* Header */}
          <div className="flex items-end justify-between gap-6 mb-10">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 id="blog-heading" className="type-display-lg text-fg">{t('title')}</h2>
              <p className="type-body text-fg-muted mt-2">{t('subtitle')}</p>
            </motion.div>

            <a
              href="https://medium.com/@marcelle.rdoss"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 type-body-sm text-fg shrink-0 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fg rounded"
            >
              {t('see_all')} <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          </div>

          {/* Cards grid */}
          {posts.length === 0 ? (
            <p className="type-body text-fg-muted">{t('subtitle')}</p>
          ) : (
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {posts.map((post) => (
                <motion.article key={post.slug} variants={fadeInUp} className="h-full">
                  <ArticleCard post={post} locale={locale} t={t} />
                </motion.article>
              ))}
            </motion.div>
          )}

          {/* Mobile see all */}
          <div className="sm:hidden mt-8">
            <a
              href="https://medium.com/@marcelle.rdoss"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 type-body-sm text-fg hover:underline"
            >
              {t('see_all')} <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
