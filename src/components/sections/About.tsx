'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { fadeInUp, stagger, fadeIn } from '@/lib/animations';
import { siteConfig } from '@/lib/config';

export function About() {
  const t = useTranslations('about');

  const stats = [
    { value: siteConfig.about.stats.years,    label: t('years_label') },
    { value: siteConfig.about.stats.projects, label: t('projects_label') },
    { value: siteConfig.about.stats.markets,  label: t('markets_label') },
  ];

  return (
    <section
      id="sobre"
      aria-labelledby="about-heading"
      className="py-section bg-block-pink dark:bg-block-cream scroll-mt-28"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:items-stretch">

          {/* Left — photo */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="relative w-full aspect-[4/3] sm:aspect-square md:aspect-auto md:h-full rounded-lg overflow-hidden border border-black/10 dark:border-white/10"
          >
            <Image
              src={siteConfig.about.photo}
              alt={`Foto de ${siteConfig.name}`}
              fill
              sizes="(max-width: 768px) 80vw, 320px"
              className="object-cover"
              priority={false}
            />
          </motion.div>

          {/* Right — bio + stats below text */}
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

            {/* Stats cards — below bio text, inside right column */}
            <motion.div variants={stagger} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {stats.map(({ value, label }) => (
                <motion.div
                  key={label}
                  variants={fadeInUp}
                  className="flex items-center gap-3 sm:flex-col sm:items-center sm:gap-0 sm:text-center p-4 rounded-lg bg-white/70 dark:bg-white/5 border border-black/10 dark:border-white/10"
                >
                  <p className="type-headline text-fg shrink-0">{value}</p>
                  <p className="type-body-sm text-fg-subtle sm:mt-1 sm:whitespace-pre-line sm:leading-normal">{label}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
