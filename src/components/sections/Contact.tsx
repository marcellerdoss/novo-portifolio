'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Mail, Globe, ExternalLink } from 'lucide-react';
import { fadeInUp, stagger } from '@/lib/animations';
import { siteConfig } from '@/lib/config';

type SocialLink = {
  key: string;
  href: string;
  icon: React.ReactNode;
  label: string;
};

export function Contact() {
  const t = useTranslations('contact');

  const links: SocialLink[] = [
    {
      key: 'email',
      href: `mailto:${siteConfig.contact.email}`,
      icon: <Mail size={22} aria-hidden="true" />,
      label: t('email'),
    },
    {
      key: 'linkedin',
      href: siteConfig.contact.linkedin,
      icon: <Globe size={22} aria-hidden="true" />,
      label: t('linkedin'),
    },
    {
      key: 'behance',
      href: siteConfig.contact.behance,
      icon: <ExternalLink size={22} aria-hidden="true" />,
      label: t('behance'),
    },
    {
      key: 'github',
      href: siteConfig.contact.github,
      icon: <Globe size={22} aria-hidden="true" />,
      label: t('github'),
    },
  ].filter((l) => l.href && l.href !== '');

  return (
    <section
      id="contato"
      aria-labelledby="contact-heading"
      className="py-section px-6 bg-bg"
    >
      <div className="max-w-6xl mx-auto">
      <div className="rounded-[24px] p-8 md:p-12 bg-block-lime text-center">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2
            id="contact-heading"
            variants={fadeInUp}
            className="type-display-lg text-fg mb-6"
          >
            {t('title')}
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="type-body text-fg-muted mb-12 max-w-lg mx-auto"
          >
            {t('subtitle')}
          </motion.p>

          <motion.div
            variants={stagger}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            {links.map(({ key, href, icon, label }) => (
              <motion.a
                key={key}
                href={href}
                target={key !== 'email' ? '_blank' : undefined}
                rel="noopener noreferrer"
                aria-label={label}
                title={label}
                variants={fadeInUp}
                className="group flex flex-col items-center gap-2 p-5 rounded-lg bg-white/60 border border-black/10 min-w-[96px] transition-all duration-150 hover:-translate-y-[3px] hover:border-black/30 hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)] text-fg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fg"
              >
                {icon}
                <span className="type-caption">{label}</span>
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>
      </div>
    </section>
  );
}
