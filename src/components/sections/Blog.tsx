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
    month: 'long',
    day: 'numeric',
  });
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

          {/* Editorial article rows */}
          {posts.length === 0 ? (
            <p className="type-body text-fg-muted border-t border-black/15 pt-6">{t('subtitle')}</p>
          ) : (
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="border-t border-black/15"
            >
              {posts.map((post) => {
                const rowClass =
                  'group grid grid-cols-[80px_1fr_24px] md:grid-cols-[120px_1fr_24px] gap-4 md:gap-8 py-6 border-b border-black/15 transition-opacity duration-150 hover:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fg rounded';

                const inner = (
                  <>
                    {/* Category — margin column */}
                    <span className="type-caption text-fg-muted pt-0.5 leading-snug">
                      {post.category}
                    </span>

                    {/* Content */}
                    <div>
                      <h3 className="type-body-strong text-fg mb-1.5">
                        {post.title}
                      </h3>
                      <p className="type-body-sm text-fg-muted line-clamp-2 mb-3">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center gap-3 type-caption text-fg-muted">
                        <time dateTime={post.date}>{formatDate(post.date, locale)}</time>
                        <span aria-hidden="true">·</span>
                        <span>{post.readingTime} {t('min_read')}</span>
                      </div>
                    </div>

                    {/* Arrow */}
                    <ArrowUpRight
                      size={16}
                      aria-hidden="true"
                      className="mt-0.5 shrink-0 text-fg-muted group-hover:text-fg transition-colors"
                    />
                  </>
                );

                return (
                  <motion.article key={post.slug} variants={fadeInUp}>
                    {post.externalUrl ? (
                      <a
                        href={post.externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={rowClass}
                      >
                        {inner}
                      </a>
                    ) : (
                      <Link href={`/blog/${post.slug}`} className={rowClass}>
                        {inner}
                      </Link>
                    )}
                  </motion.article>
                );
              })}
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
