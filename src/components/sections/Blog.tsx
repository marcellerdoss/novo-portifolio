'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { LinkButton } from '@/components/ui/Button';
import { fadeInUp, stagger } from '@/lib/animations';
import type { BlogPost } from '@/lib/types';

type Props = { posts: BlogPost[] };

const VISIBLE = 3;
const GAP = 16; // gap-4

function formatDate(dateStr: string, locale: string) {
  return new Date(dateStr).toLocaleDateString(locale === 'pt' ? 'pt-BR' : 'en-US', {
    month: 'short',
    day: 'numeric',
  });
}

function ArticleCard({ post, locale }: { post: BlogPost; locale: string }) {
  const inner = (
    <div className="group flex flex-col h-full rounded-[16px] bg-bg border border-black/10 dark:border-white/10 p-6 transition-all duration-200 hover:-translate-y-1 hover:border-black/20 dark:hover:border-white/15 hover:shadow-[0_4px_20px_rgba(0,0,0,0.07)] dark:hover:shadow-[0_4px_24px_rgba(0,0,0,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fg">
      <span className="type-caption text-accent-magenta mb-4 block">
        {post.category}
      </span>

      <div className="mb-3 min-h-[80px]">
        <h3 className="type-body-strong text-fg leading-snug line-clamp-3">
          {post.title}
        </h3>
      </div>

      <p className="type-body-sm text-fg-muted line-clamp-3 mb-6 flex-1">
        {post.excerpt}
      </p>

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
  const [index, setIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      setContainerWidth(entries[0].contentRect.width);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const hasSlider = posts.length > VISIBLE;
  const cardWidth = containerWidth > 0 ? (containerWidth - (VISIBLE - 1) * GAP) / VISIBLE : 0;
  const translateX = cardWidth > 0 ? -(index * (cardWidth + GAP)) : 0;
  const canPrev = index > 0;
  const canNext = index < posts.length - VISIBLE;
  const mobilePosts = posts.slice(0, VISIBLE);

  const prevLabel = locale === 'pt' ? 'Artigo anterior' : 'Previous article';
  const nextLabel = locale === 'pt' ? 'Próximo artigo' : 'Next article';

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

        {/* ── Desktop / Tablet: slider horizontal ── */}
        {posts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="hidden sm:flex items-center gap-3"
          >
            {/* Seta esquerda — espaço reservado para evitar layout shift */}
            <div className="flex-shrink-0 w-10 flex justify-center">
              {hasSlider && canPrev && (
                <button
                  onClick={() => setIndex((i) => i - 1)}
                  aria-label={prevLabel}
                  className="w-9 h-9 rounded-full border border-border bg-bg flex items-center justify-center text-fg hover:bg-fg/5 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fg focus-visible:ring-offset-2"
                >
                  <ChevronLeft size={16} aria-hidden="true" />
                </button>
              )}
            </div>

            {/* Área do slider — overflow-hidden bloqueia scroll manual */}
            <div ref={containerRef} className="flex-1 overflow-hidden">
              <div
                className="flex gap-4"
                style={{
                  transform: `translateX(${translateX}px)`,
                  transition: 'transform 420ms cubic-bezier(0.16,1,0.3,1)',
                  willChange: 'transform',
                }}
              >
                {posts.map((post) => (
                  <div
                    key={post.slug}
                    className="flex-shrink-0"
                    style={{
                      width: cardWidth > 0
                        ? `${cardWidth}px`
                        : `calc((100% - ${(VISIBLE - 1) * GAP}px) / ${VISIBLE})`,
                    }}
                  >
                    <ArticleCard post={post} locale={locale} />
                  </div>
                ))}
              </div>
            </div>

            {/* Seta direita */}
            <div className="flex-shrink-0 w-10 flex justify-center">
              {hasSlider && canNext && (
                <button
                  onClick={() => setIndex((i) => i + 1)}
                  aria-label={nextLabel}
                  className="w-9 h-9 rounded-full border border-border bg-bg flex items-center justify-center text-fg hover:bg-fg/5 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fg focus-visible:ring-offset-2"
                >
                  <ChevronRight size={16} aria-hidden="true" />
                </button>
              )}
            </div>
          </motion.div>
        )}

        {/* ── Mobile: 3 artigos mais recentes, empilhados ── */}
        {posts.length === 0 ? (
          <p className="sm:hidden type-body text-fg-muted">{t('no_results')}</p>
        ) : (
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="sm:hidden space-y-4"
          >
            {mobilePosts.map((post) => (
              <motion.article key={post.slug} variants={fadeInUp}>
                <ArticleCard post={post} locale={locale} />
              </motion.article>
            ))}
          </motion.div>
        )}

        {/* CTA */}
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
