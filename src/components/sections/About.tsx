'use client';

import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import { Download } from 'lucide-react';
import { fadeInUp, stagger, fadeIn } from '@/lib/animations';
import { siteConfig } from '@/lib/config';
import { LinkButton } from '@/components/ui/Button';

export function About() {
  const t = useTranslations('about');
  const locale = useLocale() as 'pt' | 'en';

  const stats = [
    { value: siteConfig.about.stats.years,    label: t('years_label') },
    { value: siteConfig.about.stats.projects, label: t('projects_label') },
    { value: siteConfig.about.stats.markets,  label: t('markets_label') },
  ];

  return (
    <section
      id="sobre"
      aria-labelledby="about-heading"
      className="min-h-screen flex flex-col bg-block-pink dark:bg-block-cream scroll-mt-28 py-6 pt-16 md:pt-10 2xl:pt-14"
    >
      <div className="max-w-6xl mx-auto px-6 w-full">
        <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-8 md:gap-14 md:items-center">

          {/* Left — photo, fixed width at its natural ratio (never crops), stats below matching its width */}
          <div className="flex flex-col gap-3 w-full md:max-w-[260px]">
            <motion.div
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="relative w-full aspect-[3/4] rounded-lg overflow-hidden border border-black/10 dark:border-white/10"
            >
              <Image
                src={siteConfig.about.photo}
                alt={`Foto de ${siteConfig.name}`}
                fill
                sizes="(max-width: 768px) 60vw, 260px"
                className="object-cover"
                priority={false}
              />
            </motion.div>

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="grid grid-cols-3 gap-2 shrink-0"
            >
              {stats.map(({ value, label }) => (
                <motion.div
                  key={label}
                  variants={fadeInUp}
                  className="flex flex-col items-center justify-center text-center px-1.5 py-2.5 rounded-lg bg-white/70 dark:bg-white/5 border border-black/10 dark:border-white/10"
                >
                  <p className="type-body-strong text-fg shrink-0">{value}</p>
                  <p className="type-body-xs text-fg-subtle mt-0.5 whitespace-pre-line leading-snug">{label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right — bio + CV download */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="flex flex-col"
          >
            <motion.h2 id="about-heading" variants={fadeInUp} className="type-display-lg text-fg mb-3">
              {t('title')}
            </motion.h2>
            <motion.div variants={fadeInUp} className="space-y-2 mb-4 max-w-2xl">
              {t('bio').split('\n\n').map((paragraph, i) => (
                <p key={i} className="type-body-sm text-fg-muted">{paragraph}</p>
              ))}
            </motion.div>

            <motion.div variants={fadeInUp}>
              <LinkButton
                href={siteConfig.cv[locale]}
                download
                variant="secondary"
                size="sm"
              >
                {locale === 'en' ? 'Resume' : 'Currículo'}
                <Download size={16} aria-hidden="true" />
              </LinkButton>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
