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

  const headline2 = t('headline_2');
  const [headline2First, ...headline2Rest] = headline2.split(' ');
  const headline2Remainder = headline2Rest.join(' ');

  return (
    <section
      id="sobre"
      aria-labelledby="about-heading"
      className="min-h-screen flex flex-col bg-block-pink dark:bg-block-cream scroll-mt-28 py-6 pt-16 md:pt-8 2xl:pt-12"
    >
      <div className="max-w-6xl mx-auto px-6 w-full">
        <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-14">

          {/* Left — photo, cropped to a square, capped so it always fits the first viewport */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="relative w-full md:w-auto md:h-[min(74vh,680px)] aspect-square shrink-0 rounded-lg overflow-hidden border border-black/10 dark:border-white/10"
          >
            <Image
              src={siteConfig.about.photo}
              alt={`Foto de ${siteConfig.name}`}
              fill
              sizes="(max-width: 768px) 90vw, 680px"
              className="object-cover object-[center_32%]"
              priority={false}
            />
          </motion.div>

          {/* Right — eyebrow + headline + support text + CTA */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="flex flex-col flex-1"
          >
            <motion.span
              variants={fadeInUp}
              className="type-caption text-accent-magenta mb-2 block"
            >
              {t('caption')}
            </motion.span>

            <motion.h2
              id="about-heading"
              variants={fadeInUp}
              className="type-display-lg text-navy-600 dark:text-navy-200 mb-6 max-w-2xl"
            >
              <span className="block">{t('headline_1')}</span>
              <span className="block">
                <span>{headline2First}</span>
                {headline2Remainder && (
                  <span className="text-accent-magenta"> {headline2Remainder}</span>
                )}
              </span>
            </motion.h2>

            <motion.p
              variants={fadeInUp}
              className="type-body text-fg-muted mb-6 max-w-xl whitespace-pre-line"
            >
              {t('description')}
            </motion.p>

            <motion.div variants={fadeInUp}>
              <LinkButton
                href={siteConfig.cv[locale]}
                download
                variant="secondary"
                size="md"
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
