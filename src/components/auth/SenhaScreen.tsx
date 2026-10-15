'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { TypingGreeting } from './TypingGreeting';
import { PasswordGateForm } from './PasswordGateForm';
import { siteConfig } from '@/lib/config';

// curva suave de desaceleracao longa, pra transicao lenta/gradual
const EASE = [0.22, 1, 0.36, 1] as const;

export function SenhaScreen({ redirectTo }: { redirectTo: string }) {
  const [typingDone, setTypingDone] = useState(false);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-lg bg-bg px-6 text-center">
      {/* mensagem da "IA": titulo + instrucao + contato, tudo numa bolha de chat */}
      <motion.div
        layout="position"
        transition={{ duration: 5, ease: EASE }}
        className="w-full max-w-[26rem] rounded-lg bg-surface-soft px-lg py-lg text-left"
      >
        <TypingGreeting onDone={() => setTypingDone(true)} />
        {typingDone && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 5, ease: EASE }}
          >
            <p className="type-body-lg text-fg-muted mt-sm">
              Para conhecer meu trabalho,
              <br />
              digite o código de acesso:
            </p>
            <p className="type-body-xs text-fg-subtle mt-md">
              Não tem o código? Me chama pelo{' '}
              <a
                href={siteConfig.contact.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="text-fg underline underline-offset-4 hover:text-accent-magenta"
              >
                WhatsApp
              </a>{' '}
              ou{' '}
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="text-fg underline underline-offset-4 hover:text-accent-magenta whitespace-nowrap"
              >
                e-mail
              </a>
              .
              <br />
              Vou adorar conversar com você!
            </p>
          </motion.div>
        )}
      </motion.div>

      {/* resposta do usuario: a caixa de mensagem (composer) */}
      {typingDone && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 5, ease: EASE }}
          className="w-full max-w-[18rem]"
        >
          <PasswordGateForm redirectTo={redirectTo} focusWhenReady={typingDone} />
        </motion.div>
      )}
    </div>
  );
}
