'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { fadeInUp, stagger } from '@/lib/animations';
import { siteConfig } from '@/lib/config';

export function AboutStats() {
  const t = useTranslations('aboutStats');

  const stats = [
    { value: siteConfig.about.stats.years,    label: t('years_label'),    description: t('years_description') },
    { value: siteConfig.about.stats.projects, label: t('projects_label'), description: t('projects_description') },
    { value: siteConfig.about.stats.markets,  label: t('markets_label'),  description: t('markets_description') },
  ];

  return (
    <section
      aria-label="Números"
      className="py-section bg-block-navy"
    >
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-8"
        >
          {stats.map(({ value, label, description }) => (
            <motion.div key={label} variants={fadeInUp} className="flex flex-col">
              <p className="type-caption text-white/50 mb-4">{label}</p>
              <p className="text-[clamp(2.5rem,4vw,3.5rem)] font-extrabold leading-none text-white mb-3">
                {value}
              </p>
              <p className="type-body-sm text-white/70">{description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
