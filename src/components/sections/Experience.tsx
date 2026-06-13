'use client';

import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { slideInLeft, stagger } from '@/lib/animations';
import type { ExperienceItem } from '@/lib/types';

type Props = { items: ExperienceItem[]; inline?: boolean };

export function Experience({ items, inline }: Props) {
  const t = useTranslations('experience');
  const locale = useLocale() as 'pt' | 'en';

  const content = (
    <>
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        id="experience-heading"
        className="type-display-lg text-fg mb-xxl"
      >
        {t('title')}
      </motion.h2>

      <motion.ol
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="space-y-0"
      >
        {items.map((item, i) => (
          <motion.li
            key={`${item.company}-${i}`}
            variants={slideInLeft}
            className="grid grid-cols-[1fr_24px_1fr] md:grid-cols-[1fr_24px_2fr] gap-x-6 md:gap-x-8"
          >
            {/* Col 1 — Cargo + Empresa + Período (2/3 da largura) */}
            <div className="pb-10 pt-1">
              <h3 className="type-headline text-fg leading-snug">
                {item.role[locale]}
              </h3>
              <p className="type-body-sm text-fg-muted mt-0.5">{item.company}</p>
              <time className="type-caption text-block-navy dark:text-fg-subtle mt-2 block">
                {item.period.includes('Presente') && locale === 'en'
                  ? item.period.replace('Presente', t('present'))
                  : item.period}
              </time>
            </div>

            {/* Col 2 — Dot + linha vertical */}
            <div className="flex flex-col items-center">
              <div className="pt-[9px] shrink-0">
                <span
                  className="block w-3 h-3 rounded-full bg-accent-magenta border-2 border-block-cream dark:border-block-cream"
                  aria-hidden="true"
                />
              </div>
              {i < items.length - 1 && (
                <div className="flex-1 w-[2px] bg-black/15 dark:bg-white/15 mt-2" />
              )}
            </div>

            {/* Col 3 — Texto da experiência */}
            <div className="pb-10 pt-1">
              <p className="type-body text-fg-muted">{item.description[locale]}</p>
            </div>
          </motion.li>
        ))}
      </motion.ol>
    </>
  );

  if (inline) return <>{content}</>;

  return (
    <section
      id="experiencia"
      aria-labelledby="experience-heading"
      className="py-section bg-[#EFD4D4] dark:bg-block-cream scroll-mt-28"
    >
      <div className="max-w-6xl mx-auto px-6">
        {content}
      </div>
    </section>
  );
}
