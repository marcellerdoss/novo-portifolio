'use client';

import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { ChevronDown } from 'lucide-react';
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
      className="relative min-h-screen flex flex-col items-center justify-center px-6 bg-bg"
    >
      <motion.div
        className="max-w-5xl mx-auto text-center"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        <motion.p
          variants={fadeInUp}
          className="type-body-lg text-fg-muted mb-6"
        >
          {t('role')}
        </motion.p>

        <motion.h1
          variants={fadeInUp}
          className="type-display-xl text-fg mb-6"
        >
          {t('name')}
        </motion.h1>

        <motion.p
          variants={fadeInUp}
          className="text-[clamp(2.25rem,5.5vw,5.375rem)] font-[340] leading-[1.05] tracking-[-1.5px] text-accent-magenta mb-10"
        >
          {t('subtitle')}
        </motion.p>

        <motion.div
          variants={fadeInUp}
          className="flex flex-wrap items-center justify-center gap-4"
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
            {t('cta_secondary')}
          </LinkButton>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 flex flex-col items-center text-fg-subtle"
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
