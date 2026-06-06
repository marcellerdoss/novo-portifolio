'use client';

import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { LinkButton } from '@/components/ui/Button';
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
        <div className="flex items-end justify-between mb-xxl gap-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 id="blog-heading" className="type-display-lg text-fg">{t('title')}</h2>
            <p className="type-body text-fg-muted mt-2">{t('subtitle')}</p>
          </motion.div>

          <LinkButton href="https://medium.com/@marcelle.rdoss" variant="ghost" external className="shrink-0 hidden sm:flex">
            {t('see_all')} <ArrowRight size={16} aria-hidden="true" />
          </LinkButton>
        </div>

        {posts.length === 0 ? (
          <p className="type-body text-fg-muted">{t('subtitle')}</p>
        ) : (
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10"
          >
            {posts.map((post) => {
              const cardClass = "group block h-full bg-bg rounded-lg border border-border p-6 transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_4px_24px_rgba(0,0,0,0.06)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fg";
              const inner = (
                <>
                  <div className="flex items-center justify-between mb-3">
                    <span className="type-caption text-fg-subtle">{post.category}</span>
                    {post.externalUrl && (
                      <span className="type-caption text-fg-subtle flex items-center gap-1">
                        Medium <ExternalLink size={10} aria-hidden="true" />
                      </span>
                    )}
                  </div>
                  <h3 className="type-body-strong text-fg mb-3 group-hover:underline transition-all duration-150">
                    {post.title}
                  </h3>
                  <p className="type-body-sm text-fg-muted line-clamp-3 mb-4">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-3 type-caption text-fg-subtle">
                    <time dateTime={post.date}>{formatDate(post.date, locale)}</time>
                    <span aria-hidden="true">·</span>
                    <span>{post.readingTime} {t('min_read')}</span>
                  </div>
                </>
              );
              return (
                <motion.article key={post.slug} variants={fadeInUp}>
                  {post.externalUrl ? (
                    <a href={post.externalUrl} target="_blank" rel="noopener noreferrer" className={cardClass}>
                      {inner}
                    </a>
                  ) : (
                    <Link href={`/blog/${post.slug}`} className={cardClass}>
                      {inner}
                    </Link>
                  )}
                </motion.article>
              );
            })}
          </motion.div>
        )}

        <div className="sm:hidden text-center">
          <LinkButton href="https://medium.com/@marcelle.rdoss" variant="secondary" external>
            {t('see_all')}
          </LinkButton>
        </div>
      </div>
    </section>
  );
}
