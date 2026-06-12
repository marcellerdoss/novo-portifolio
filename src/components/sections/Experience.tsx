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
        className="relative space-y-12"
      >
        {/* Vertical line — centrada no dot (dot = 12px, center = 6px → line left = 5px) */}
        <div
          className="absolute top-0 bottom-0 left-[5px] w-[2px] bg-black/15 dark:bg-white/15"
          aria-hidden="true"
        />

        {items.map((item, i) => (
          <motion.li
            key={`${item.company}-${i}`}
            variants={slideInLeft}
            className="relative flex gap-8"
          >
            {/* Dot */}
            <div className="shrink-0 pt-[7px]">
              <span
                className="block w-3 h-3 rounded-full bg-accent-magenta border-2 border-block-cream"
                aria-hidden="true"
              />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-2">
                <div>
                  <h3 className="type-body-strong text-fg">{item.role[locale]}</h3>
                  <p className="type-body-sm text-fg-muted">{item.company}</p>
                </div>
                <time className="type-caption text-block-navy dark:text-fg-subtle shrink-0">
                  {item.period.includes('Presente') && locale === 'en'
                    ? item.period.replace('Presente', t('present'))
                    : item.period}
                </time>
              </div>
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
      className="py-section bg-block-cream scroll-mt-28"
    >
      <div className="max-w-6xl mx-auto px-6">
        {content}
      </div>
    </section>
  );
}
