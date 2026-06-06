'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Globe, MessageCircle } from 'lucide-react';
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
    'w-full bg-white/10 border border-white/20 rounded-md px-4 py-3 type-body text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/40';

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
      <button
        type="submit"
        className="self-start inline-flex items-center gap-2 px-5 py-[10px] type-button bg-white text-[#1f1d3d] rounded-pill hover:opacity-90 active:scale-[0.97] transition-opacity duration-150"
      >
        Enviar mensagem
      </button>
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
                    className="group flex flex-col items-center gap-2 p-5 rounded-lg bg-transparent border border-accent-magenta min-w-[96px] transition-all duration-150 hover:-translate-y-[3px] hover:bg-accent-magenta/10 text-accent-magenta focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-magenta"
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
