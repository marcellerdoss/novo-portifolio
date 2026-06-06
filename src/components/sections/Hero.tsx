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

  return (
    <section
      id="home"
      aria-label="Apresentação"
      className="relative min-h-screen flex flex-col px-6 bg-bg pt-32 pb-16"
    >
      <motion.div
        className="max-w-6xl mx-auto w-full flex-1 flex flex-col justify-center"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        {/* Role label — eyebrow */}
        <motion.p
          variants={fadeInUp}
          className="type-caption text-fg-muted mb-14"
        >
          {t('role')}
        </motion.p>

        {/* Name + Tagline — agrupados */}
        <div className="mb-12">
          <motion.p
            variants={fadeInUp}
            className="text-[2rem] font-[340] leading-[1.10] tracking-[-0.5px] text-accent-magenta mb-3"
          >
            {t('name')}
          </motion.p>

          <motion.h1
            variants={fadeInUp}
            className="text-[clamp(2rem,5vw,4rem)] font-bold leading-[1.05] tracking-[-1.5px] text-fg whitespace-pre-line"
          >
            {t('subtitle')}
          </motion.h1>
        </div>

        {/* CTAs */}
        <motion.div
          variants={fadeInUp}
          className="flex flex-wrap items-center gap-4"
        >
          <Button
            onClick={() =>
              document.getElementById('cases')?.scrollIntoView({ behavior: 'smooth' })
            }
          >
            {t('cta_primary')}
          </Button>
          <LinkButton
            href={siteConfig.cv[locale]}
            variant="secondary"
            download="CV-Marcelle.pdf"
          >
            {t('cta_secondary')} <Download size={16} aria-hidden="true" />
          </LinkButton>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center text-fg-subtle"
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
