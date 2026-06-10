'use client';

import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { ArrowUpRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { LinkButton } from '@/components/ui/Button';
import { fadeInUp, stagger } from '@/lib/animations';
import type { BlogPost } from '@/lib/types';

type Props = { posts: BlogPost[] };

function formatDate(dateStr: string, locale: string) {
  return new Date(dateStr).toLocaleDateString(locale === 'pt' ? 'pt-BR' : 'en-US', {
    month: 'short',
    day: 'numeric',
  });
}

function ArticleCard({ post, locale, t }: { post: BlogPost; locale: string; t: ReturnType<typeof useTranslations> }) {
  const inner = (
    <div className="group flex flex-col h-full rounded-[16px] bg-bg border border-black/10 dark:border-white/10 p-6 transition-all duration-200 hover:-translate-y-1 hover:border-black/20 dark:hover:border-white/15 hover:shadow-[0_4px_20px_rgba(0,0,0,0.07)] dark:hover:shadow-[0_4px_24px_rgba(0,0,0,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fg">
      {/* Category */}
      <span className="type-caption text-accent-magenta mb-4 block">
        {post.category}
      </span>

      {/* Title — fixed 3-line height so excerpts align across cards */}
      <div className="mb-3 min-h-[80px]">
        <h3 className="type-body-strong text-fg leading-snug line-clamp-3">
          {post.title}
        </h3>
      </div>

      {/* Excerpt */}
      <p className="type-body-sm text-fg-muted line-clamp-3 mb-6 flex-1">
        {post.excerpt}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between gap-2 type-caption text-fg-subtle mt-auto">
        <div className="flex items-center gap-2 whitespace-nowrap">
          <time dateTime={post.date}>{formatDate(post.date, locale)}</time>
          <span aria-hidden="true">·</span>
          <span>{post.readingTime} min</span>
        </div>
        <span className="w-9 h-9 rounded-full bg-bg border border-border flex items-center justify-center text-fg shrink-0 transition-all duration-150 group-hover:bg-fg/5" aria-hidden="true">
          <ArrowUpRight size={14} />
        </span>
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
      className="py-section bg-surface-soft"
    >
      <div className="max-w-6xl mx-auto px-6">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <h2 id="blog-heading" className="type-display-lg text-fg">{t('title')}</h2>
            <p className="type-body text-fg-muted mt-2 whitespace-nowrap">{t('subtitle')}</p>
          </motion.div>

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

          {/* CTA below cards */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="mt-8"
          >
            <LinkButton
              href="https://medium.com/@marcelle.rdoss"
              variant="secondary"
              size="sm"
              external
            >
              {t('see_all')} <ArrowUpRight size={12} aria-hidden="true" />
            </LinkButton>
          </motion.div>


      </div>
    </section>
  );
}
