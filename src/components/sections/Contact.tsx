'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/Button';
import { fadeInUp, stagger } from '@/lib/animations';
import { siteConfig } from '@/lib/config';

function IconWhatsApp() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

function IconLinkedIn() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

const WA_HREF = 'https://wa.me/5521979165494';

function ContactForm({ email }: { email: string }) {
  const t = useTranslations('contact');
  const [name, setName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [message, setMessage] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(`${t('form_subject_prefix')}${name}`);
    const body = encodeURIComponent(`${t('form_name_label')}: ${name}\n${t('form_email_label')}: ${userEmail}\n\n${message}`);
    window.open(`mailto:${email}?subject=${subject}&body=${body}`);
  }

  const inputClass =
    'w-full bg-white/10 border border-white/20 rounded-md px-4 py-3 type-body text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/40';

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left" noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="contact-name" className="sr-only">{t('form_name_label')}</label>
          <input
            id="contact-name"
            type="text"
            required
            autoComplete="name"
            placeholder={t('form_name_label')}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="contact-email" className="sr-only">{t('form_email_label')}</label>
          <input
            id="contact-email"
            type="email"
            required
            autoComplete="email"
            placeholder={t('form_email_label')}
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            className={inputClass}
          />
        </div>
      </div>
      <div>
        <label htmlFor="contact-message" className="sr-only">{t('form_message_label')}</label>
        <textarea
          id="contact-message"
          required
          rows={4}
          placeholder={t('form_message_label')}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={`${inputClass} resize-none`}
        />
      </div>
      <Button
        type="submit"
        className="self-start bg-white text-primary hover:opacity-90 hover:bg-white dark:bg-white dark:text-primary dark:hover:bg-white dark:hover:opacity-90"
      >
        {t('form_submit')}
      </Button>
    </form>
  );
}

export function Contact() {
  const t = useTranslations('contact');

  const links = [
    { key: 'whatsapp', href: WA_HREF,                      icon: <IconWhatsApp />, label: 'WhatsApp' },
    { key: 'linkedin', href: siteConfig.contact.linkedin,  icon: <IconLinkedIn />, label: t('linkedin') },
  ];

  return (
    <section
      id="contato"
      aria-labelledby="contact-heading"
      className="py-section bg-block-navy"
    >
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start"
        >
          {/* Left — title + links */}
          <div>
            <motion.h2
              id="contact-heading"
              variants={fadeInUp}
              className="type-display-lg text-white mb-4"
            >
              {t('title')}
            </motion.h2>

            <motion.p
              variants={fadeInUp}
              className="type-body text-white/70 mb-8"
            >
              {t('subtitle')}
            </motion.p>

            <motion.div variants={stagger} className="flex flex-wrap gap-4">
              {links.map(({ key, href, icon, label }) => (
                <motion.a
                  key={key}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  title={label}
                  variants={fadeInUp}
                  className="group flex flex-col items-center gap-2 p-5 rounded-lg bg-transparent border border-white/30 min-w-[96px] transition-all duration-150 hover:-translate-y-[3px] hover:bg-white/10 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  {icon}
                  <span className="type-caption">{label}</span>
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Right — form */}
          <motion.div variants={fadeInUp}>
            <ContactForm email={siteConfig.contact.email} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
