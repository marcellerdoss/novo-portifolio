'use client';

import { useState, useMemo } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { PostCard } from './PostCard';
import { Badge } from '@/components/ui/Badge';
import { fadeInUp, stagger } from '@/lib/animations';
import type { BlogPost } from '@/lib/types';

type Props = { posts: BlogPost[] };

export function BlogClient({ posts }: Props) {
  const t = useTranslations('blog');
  const locale = useLocale();
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = useMemo(
    () => ['all', ...Array.from(new Set(posts.map((p) => p.category)))],
    [posts],
  );

  const filtered = useMemo(() => {
    return posts.filter((p) => {
      const matchCat = activeCategory === 'all' || p.category === activeCategory;
      const matchQuery =
        !query ||
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.excerpt.toLowerCase().includes(query.toLowerCase());
      return matchCat && matchQuery;
    });
  }, [posts, activeCategory, query]);

  return (
    <div className="min-h-screen bg-bg py-section px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="mb-xxl"
        >
          <motion.h1 variants={fadeInUp} className="type-display-lg text-fg mb-4">
            {t('title')}
          </motion.h1>
          <motion.p variants={fadeInUp} className="type-body text-fg-muted">
            {t('subtitle')}
          </motion.p>
        </motion.div>

        {/* Search */}
        <div className="relative mb-xl">
          <Search
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-fg-subtle"
            aria-hidden="true"
          />
          <input
            type="search"
            placeholder={t('search_placeholder')}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label={t('search_placeholder')}
            className="w-full max-w-md pl-10 pr-4 py-3 bg-bg-secondary border border-border rounded-pill type-body text-fg placeholder:text-fg-subtle focus:outline-none focus:ring-2 focus:ring-fg transition-colors"
          />
        </div>

        {/* Category filters */}
        <div
          className="flex flex-wrap gap-3 mb-xxl"
          role="group"
          aria-label="Filtrar por categoria"
        >
          {categories.map((cat) => (
            <Badge
              key={cat}
              variant={activeCategory === cat ? 'active' : 'default'}
              onClick={() => setActiveCategory(cat)}
              aria-pressed={activeCategory === cat}
            >
              {cat === 'all' ? t('filter_all') : cat}
            </Badge>
          ))}
        </div>

        {/* Live region for screen readers */}
        <p className="sr-only" aria-live="polite" aria-atomic="true">
          {filtered.length} {filtered.length === 1 ? t('result_single') : t('results_plural')}
        </p>

        {/* Grid */}
        {filtered.length === 0 ? (
          <p className="type-body text-fg-muted text-center py-16">
            {t('no_results')}
          </p>
        ) : (
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((post) => (
              <motion.div key={post.slug} variants={fadeInUp}>
                <PostCard post={post} locale={locale} minRead={t('min_read')} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
