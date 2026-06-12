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
      className="relative min-h-screen flex flex-col bg-bg pt-12 md:pt-16 2xl:pt-24 pb-12"
    >
      <motion.div
        className="max-w-6xl mx-auto px-6 w-full flex-1 flex flex-col justify-center"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        {/* Role label — badge eyebrow */}
        <motion.span
          variants={fadeInUp}
          className="type-caption text-accent-magenta mb-8 2xl:mb-12"
        >
          {t('role')}
        </motion.span>

        {/* Tagline */}
        <div className="mb-8 md:mb-8 xl:mb-12">
          <motion.p
            variants={fadeInUp}
            className="text-[clamp(2rem,4vw,3.5rem)] leading-[1.05] tracking-[-1.5px]"
          >
            {t('subtitle').split('\n').map((line, i) => (
              <span
                key={i}
                className={`block ${i === 0
                  ? 'font-bold text-navy-600 dark:text-navy-200'
                  : 'font-extrabold text-accent-magenta'
                }`}
              >
                {line}
              </span>
            ))}
          </motion.p>
        </div>

        {/* CTAs */}
        <motion.div
          variants={fadeInUp}
          className="flex flex-wrap items-center gap-3"
        >
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
