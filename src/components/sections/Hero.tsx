'use client';

import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { ChevronDown, Download } from 'lucide-react';
import { Button, LinkButton } from '@/components/ui/Button';
import { fadeInUp, stagger } from '@/lib/animations';
import { siteConfig } from '@/lib/config';

export function Hero() {
  const t = useTranslations('hero');
  const locale = useLocale() as 'pt' | 'en';

  const stats = [
    { value: t('stat_1_value'), label: t('stat_1_label') },
    { value: t('stat_2_value'), label: t('stat_2_label') },
    { value: t('stat_3_value'), label: t('stat_3_label') },
  ];

  return (
    <section
      id="home"
      aria-label="Apresentação"
      className="relative min-h-screen flex flex-col bg-bg pt-12 md:pt-16 2xl:pt-24"
    >
      <motion.div
        className="max-w-6xl mx-auto px-6 w-full flex-1 flex flex-col"
        variants={stagger}
        initial={false}
        animate="visible"
      >
        {/* Upper zone — greeting + headline */}
        <div className="flex-1 flex flex-col justify-center gap-6 md:gap-8">
          <motion.span
            variants={fadeInUp}
            className="inline-flex items-center self-start gap-2 px-3 py-1.5 rounded-full border border-fg/10 bg-fg/5 type-caption text-fg-subtle"
          >
            👋 {t('greeting')}
          </motion.span>

          <motion.h1
            variants={fadeInUp}
            className="text-[clamp(2.5rem,5.5vw,5rem)] leading-[1.0] tracking-[-2px]"
          >
            <span className="block font-bold text-navy-600 dark:text-navy-200">
              {t('headline_1')}
            </span>
            <span className="block font-extrabold text-accent-magenta">
              {t('headline_2')}
            </span>
          </motion.h1>
        </div>

        {/* Lower zone — stats + description + CTAs */}
        <motion.div
          variants={fadeInUp}
          className="pb-20 flex flex-col md:flex-row md:items-end gap-10 md:gap-16"
        >
          {/* Stats */}
          <div className="flex gap-8 shrink-0">
            {stats.map(({ value, label }) => (
              <div key={label} className="flex flex-col gap-1">
                <span className="text-[clamp(1.75rem,3vw,2.5rem)] font-extrabold leading-none text-fg">
                  {value}
                </span>
                <span className="type-caption text-fg-subtle leading-snug max-w-[10ch]">
                  {label}
                </span>
              </div>
            ))}
          </div>

          {/* Description + CTAs */}
          <div className="flex flex-col gap-5 max-w-sm">
            <p className="text-sm leading-relaxed text-fg-subtle">
              {t('description')}
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Button
                size="md"
                onClick={() =>
                  document.getElementById('cases')?.scrollIntoView({ behavior: 'smooth' })
                }
              >
                {t('cta_primary')}
              </Button>
              <LinkButton
                href={siteConfig.cv[locale]}
                variant="secondary"
                size="md"
                download
              >
                {t('cta_secondary')} <Download size={16} aria-hidden="true" />
              </LinkButton>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center text-fg-subtle"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        aria-hidden="true"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
        >
          <ChevronDown size={22} />
        </motion.div>
      </motion.div>
    </section>
  );
}
