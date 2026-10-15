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
      {/* titulo solto, sem bolha - igual ao greeting do ChatGPT */}
      <motion.div layout="position" transition={{ duration: 5, ease: EASE }}>
        <TypingGreeting onDone={() => setTypingDone(true)} />
      </motion.div>

      {typingDone && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 5, ease: EASE }}
          className="flex w-full max-w-[26rem] flex-col gap-md text-left"
        >
          {/* resposta da "IA", texto solto, sem bolha */}
          <p className="type-body-lg text-fg-muted text-center">
            Para conhecer meu trabalho,
            <br />
            digite o código de acesso:
          </p>

          {/* mini-troca simulando chat: a "pergunta" vira bolha a direita,
              a resposta fica solta a esquerda, igual ao ChatGPT */}
          <div className="flex justify-end">
            <p className="type-body-sm inline-block rounded-2xl rounded-br-sm bg-accent-magenta/10 px-4 py-2 text-fg">
              Não tem o código?
            </p>
          </div>
          <p className="type-body-xs text-fg-subtle">
            Me chama pelo{' '}
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
            . Vou adorar conversar com você!
          </p>
        </motion.div>
      )}

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
