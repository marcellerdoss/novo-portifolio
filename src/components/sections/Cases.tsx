'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import { Badge } from '@/components/ui/Badge';
import { fadeInUp, stagger } from '@/lib/animations';
import type { Case } from '@/lib/types';

// Modal is loaded only when a case is opened — keeps initial bundle leaner
const Modal = dynamic(
  () => import('@/components/ui/Modal').then((m) => m.Modal),
  { ssr: false, loading: () => null },
);

type Props = { cases: Case[] };

export function CasesSection({ cases }: Props) {
  const t = useTranslations('cases');
  const locale = useLocale() as 'pt' | 'en';
  const [activeFilter, setActiveFilter] = useState('all');
  const [openCase, setOpenCase] = useState<Case | null>(null);

  const categories = ['all', ...Array.from(new Set(cases.map((c) => c.category)))];
  const filtered =
    activeFilter === 'all' ? cases : cases.filter((c) => c.category === activeFilter);

  return (
    <section id="cases" aria-labelledby="cases-heading" className="py-section px-6 bg-canvas dark:bg-surface-tile-2">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          id="cases-heading"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="type-display-lg text-fg mb-xl"
        >
          {t('title')}
        </motion.h2>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex flex-wrap gap-3 mb-xxl"
          role="group"
          aria-label="Filtrar por categoria"
        >
          {categories.map((cat) => (
            <Badge
              key={cat}
              variant={activeFilter === cat ? 'active' : 'default'}
              onClick={() => setActiveFilter(cat)}
              aria-pressed={activeFilter === cat}
            >
              {cat === 'all' ? t('filter_all') : cat}
            </Badge>
          ))}
        </motion.div>

        {/* Live region for screen readers */}
        <p className="sr-only" aria-live="polite" aria-atomic="true">
          {filtered.length} {filtered.length === 1 ? 'case encontrado' : 'cases encontrados'}
        </p>

        {/* Grid */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((c) => (
              <CaseCard
                key={c.slug}
                caseItem={c}
                locale={locale}
                seeLabel={t('see_case')}
                onOpen={() => setOpenCase(c)}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={!!openCase}
        onClose={() => setOpenCase(null)}
        title={openCase?.title[locale]}
        closeLabel={t('close')}
      >
        {openCase && (
          <CaseModalContent caseItem={openCase} locale={locale} t={t} />
        )}
      </Modal>
    </section>
  );
}

// ─── Case card ──────────────────────────────────────────────────────────────

type CardProps = {
  caseItem: Case;
  locale: 'pt' | 'en';
  seeLabel: string;
  onOpen: () => void;
};

function CaseCard({ caseItem: c, locale, seeLabel, onOpen }: CardProps) {
  return (
    <motion.article
      variants={fadeInUp}
      layout
      whileHover={{
        scale: 1.02,
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.10)',
        transition: { duration: 0.2 },
      }}
      className="group relative rounded-lg border border-hairline dark:border-white/10 bg-canvas dark:bg-surface-tile-1 cursor-pointer"
      onClick={onOpen}
    >
      {/* Full-area button — handles keyboard focus and activation */}
      <button
        type="button"
        className="absolute inset-0 z-10 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-focus rounded-lg"
        aria-label={`${seeLabel}: ${c.title[locale]}`}
      />

      {/* Cover image */}
      <div className="relative aspect-video bg-canvas-parchment dark:bg-surface-tile-2 overflow-hidden rounded-t-lg">
        {c.coverImage ? (
          <Image
            src={c.coverImage}
            alt={c.title[locale]}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="type-tagline text-fg-subtle opacity-30">{c.category}</span>
          </div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-surface-black/0 group-hover:bg-surface-black/50 transition-colors duration-200 flex items-center justify-center pointer-events-none">
          <span className="type-body text-white opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-200 bg-primary px-[22px] py-[11px] rounded-pill">
            {seeLabel}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <Badge variant="category" className="mb-3">{c.category}</Badge>
        <h3 className="type-body-strong text-fg mb-2">{c.title[locale]}</h3>
        <p className="type-caption text-fg-muted line-clamp-2">{c.summary[locale]}</p>
        <p className="type-fine-print text-fg-subtle mt-3">{c.year}</p>
      </div>
    </motion.article>
  );
}

// ─── Modal content ───────────────────────────────────────────────────────────

type ModalContentProps = {
  caseItem: Case;
  locale: 'pt' | 'en';
  t: ReturnType<typeof useTranslations<'cases'>>;
};

function CaseModalContent({ caseItem: c, locale, t }: ModalContentProps) {
  return (
    <div className="space-y-8">
      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {c.tags.map((tag) => (
          <Badge key={tag} variant="category">{tag}</Badge>
        ))}
      </div>

      {/* Summary */}
      <p className="type-body text-fg-muted">{c.summary[locale]}</p>

      {/* Metrics */}
      {c.metrics.length > 0 && (
        <div>
          <h3 className="type-caption-strong text-fg uppercase tracking-wider mb-4">{t('metrics')}</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {c.metrics.map((m) => (
              <div
                key={m.label}
                className="p-4 rounded-lg bg-canvas-parchment dark:bg-surface-tile-2 border border-hairline dark:border-white/10 text-center"
              >
                <p className="type-display-md text-primary">{m.value}</p>
                <p className="type-fine-print text-fg-muted mt-1">{m.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Problem */}
      <Section label={t('problem')} content={c.problem[locale]} />

      {/* Process */}
      <Section label={t('process')} content={c.process[locale]} />

      {/* Outcome */}
      <Section label={t('outcome')} content={c.outcome[locale]} />
    </div>
  );
}

function Section({ label, content }: { label: string; content: string }) {
  return (
    <div>
      <h3 className="type-caption-strong text-fg uppercase tracking-wider mb-3">{label}</h3>
      <p className="type-body text-fg-muted">{content}</p>
    </div>
  );
}
