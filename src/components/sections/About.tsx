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
      className="py-section bg-block-pink"
    >
      <div className="max-w-6xl mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

        {/* Left — photo + stats */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-col gap-8"
        >
          {/* Photo */}
          <motion.div
            variants={fadeIn}
            className="relative w-full aspect-square rounded-lg overflow-hidden border border-black/10"
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

          {/* Stats */}
          <motion.div
            variants={stagger}
            className="grid grid-cols-3 gap-4"
          >
            {stats.map(({ value, label }) => (
              <motion.div
                key={label}
                variants={fadeInUp}
                className="text-center p-4 rounded-lg bg-white/70 border border-black/10"
              >
                <p className="type-headline text-fg">{value}</p>
                <p className="type-caption text-fg-subtle mt-1">{label}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right — bio */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.h2 id="about-heading" variants={fadeInUp} className="type-display-lg text-fg mb-8">
            {t('title')}
          </motion.h2>
          <motion.p variants={fadeInUp} className="type-body text-fg-muted">
            {t('bio')}
          </motion.p>
        </motion.div>
      </div>
      </div>
    </section>
  );
}
