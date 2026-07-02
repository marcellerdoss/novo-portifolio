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
      className="min-h-screen flex flex-col justify-center bg-block-pink dark:bg-block-cream scroll-mt-28 pt-24 pb-12 md:pt-16 2xl:pt-24"
    >
      <div className="max-w-6xl mx-auto px-6 w-full">
        <div className="grid grid-cols-1 md:grid-cols-[280px_1fr_200px] gap-12 md:items-start">

          {/* Left — photo (uncropped, natural ratio) */}
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
              sizes="(max-width: 768px) 80vw, 320px"
              className="object-contain"
              priority={false}
            />
          </motion.div>

          {/* Middle — bio + CV download */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="flex flex-col"
          >
            <motion.h2 id="about-heading" variants={fadeInUp} className="type-display-lg text-fg mb-8">
              {t('title')}
            </motion.h2>
            <motion.div variants={fadeInUp} className="space-y-4 mb-8">
              {t('bio').split('\n\n').map((paragraph, i) => (
                <p key={i} className="type-body text-fg-muted">{paragraph}</p>
              ))}
            </motion.div>

            <motion.div variants={fadeInUp}>
              <LinkButton
                href={siteConfig.cv[locale]}
                download
                variant="secondary"
              >
                {locale === 'en' ? 'Resume' : 'Currículo'}
                <Download size={16} aria-hidden="true" />
              </LinkButton>
            </motion.div>
          </motion.div>

          {/* Right — stats, stacked vertically as their own column */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="flex flex-col gap-4"
          >
            {stats.map(({ value, label }) => (
              <motion.div
                key={label}
                variants={fadeInUp}
                className="flex flex-col items-center justify-center text-center min-h-[112px] p-4 rounded-lg bg-white/70 dark:bg-white/5 border border-black/10 dark:border-white/10"
              >
                <p className="type-headline text-fg shrink-0">{value}</p>
                <p className="type-body-sm text-fg-subtle mt-1 whitespace-pre-line leading-normal">{label}</p>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
