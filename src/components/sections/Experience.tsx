'use client';

import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { slideInLeft, stagger } from '@/lib/animations';
import type { ExperienceItem } from '@/lib/types';

type Props = { items: ExperienceItem[] };

export function Experience({ items }: Props) {
  const t = useTranslations('experience');
  const locale = useLocale() as 'pt' | 'en';

  return (
    <section
      id="experiencia"
      aria-labelledby="experience-heading"
      className="py-section bg-block-cream"
    >
      <div className="max-w-6xl mx-auto px-6">
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

        {/* Timeline */}
        <motion.ol
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="relative border-l-2 border-black/15 pl-8 space-y-12"
        >
          {items.map((item, i) => (
            <motion.li
              key={`${item.company}-${i}`}
              variants={slideInLeft}
              className="relative"
            >
              {/* Timeline dot */}
              <span
                className="absolute -left-[2.625rem] top-1 w-3 h-3 rounded-full bg-fg border-2 border-block-cream"
                aria-hidden="true"
              />

              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-2">
                <div>
                  <h3 className="type-body-strong text-fg">{item.role[locale]}</h3>
                  <p className="type-body-sm text-fg-muted">{item.company}</p>
                </div>
                <time className="type-caption text-block-navy shrink-0">
                  {item.period.includes('Presente') && locale === 'en'
                    ? item.period.replace('Presente', t('present'))
                    : item.period}
                </time>
              </div>

              <p className="type-body text-fg-muted">{item.description[locale]}</p>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}
