'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Globe, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { fadeInUp, stagger } from '@/lib/animations';
import { siteConfig } from '@/lib/config';

const WA_HREF = 'https://wa.me/5521979165494';

function ContactForm({ email }: { email: string }) {
  const [name, setName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [message, setMessage] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(`Contato do portfólio — ${name}`);
    const body = encodeURIComponent(`Nome: ${name}\nE-mail: ${userEmail}\n\n${message}`);
    window.open(`mailto:${email}?subject=${subject}&body=${body}`);
  }

  const inputClass =
    'w-full bg-white/60 border border-black/10 rounded-md px-4 py-3 type-body text-fg placeholder:text-fg-subtle focus:outline-none focus:ring-2 focus:ring-fg/40';

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          type="text"
          required
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={inputClass}
        />
        <input
          type="email"
          required
          placeholder="E-mail"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
          className={inputClass}
        />
      </div>
      <textarea
        required
        rows={4}
        placeholder="Mensagem"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className={`${inputClass} resize-none`}
      />
      <Button type="submit" className="self-start">
        Enviar mensagem
      </Button>
    </form>
  );
}

export function Contact() {
  const t = useTranslations('contact');

  const links = [
    {
      key: 'whatsapp',
      href: WA_HREF,
      icon: <MessageCircle size={22} aria-hidden="true" />,
      label: 'WhatsApp',
    },
    {
      key: 'linkedin',
      href: siteConfig.contact.linkedin,
      icon: <Globe size={22} aria-hidden="true" />,
      label: t('linkedin'),
    },
  ];

  return (
    <section
      id="contato"
      aria-labelledby="contact-heading"
      className="py-section bg-block-lime"
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
                className="type-display-lg text-fg mb-4"
              >
                {t('title')}
              </motion.h2>

              <motion.p
                variants={fadeInUp}
                className="type-body text-fg-muted mb-8"
              >
                {t('subtitle')}
              </motion.p>

              <motion.div
                variants={stagger}
                className="flex flex-wrap gap-4"
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
