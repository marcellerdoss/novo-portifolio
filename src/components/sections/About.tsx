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

  return (
    <section
      id="sobre"
      aria-labelledby="about-heading"
      className="min-h-screen flex flex-col bg-block-pink dark:bg-block-cream scroll-mt-28 py-6 pt-16 md:pt-10 2xl:pt-14"
    >
      <div className="max-w-6xl mx-auto px-6 w-full">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 md:gap-14 md:items-center">

          {/* Left — photo, 1/3 width at its natural ratio (never crops) */}
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
              sizes="(max-width: 768px) 60vw, 33vw"
              className="object-cover"
              priority={false}
            />
          </motion.div>

          {/* Right — tagline + CTA (2/3 width) */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="flex flex-col"
          >
            <motion.h2
              id="about-heading"
              variants={fadeInUp}
              className="type-display-lg text-fg mb-6 max-w-2xl"
            >
              {t('tagline')}
            </motion.h2>

            <motion.div variants={fadeInUp}>
              <LinkButton
                href={siteConfig.cv[locale]}
                download
                variant="secondary"
                size="sm"
              >
                {t('cta_resume')}
                <Download size={16} aria-hidden="true" />
              </LinkButton>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
