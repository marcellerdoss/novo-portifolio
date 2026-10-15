'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { TypingGreeting } from './TypingGreeting';
import { PasswordGateForm } from './PasswordGateForm';
import { siteConfig } from '@/lib/config';

// curva suave de desaceleracao longa, pra transicao lenta/gradual
const EASE = [0.22, 1, 0.36, 1] as const;
const MESSAGE_STAGGER_MS = 700;

// cada item do "texto da tela" vira sua propria mensagem, revelada uma de
// cada vez - simulando uma IA mandando varias mensagens em sequencia.
const MESSAGES: { id: string; content: ReactNode }[] = [
  {
    id: 'instrucao',
    content: (
      <>
        Para conhecer meu trabalho,
        <br />
        digite o código de acesso:
      </>
    ),
  },
  { id: 'sem-codigo', content: 'Não tem o código?' },
  {
    id: 'contato',
    content: (
      <>
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
        .
      </>
    ),
  },
  { id: 'adorar', content: 'Vou adorar conversar com você!' },
];

function MessageBubble({ children }: { children: ReactNode }) {
  return (
    <motion.div
      layout="position"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE }}
      className="type-body-sm max-w-full self-start rounded-2xl rounded-bl-sm bg-surface-soft px-4 py-2 text-left text-fg"
    >
      {children}
    </motion.div>
  );
}

export function SenhaScreen({ redirectTo }: { redirectTo: string }) {
  const [typingDone, setTypingDone] = useState(false);
  const [revealedCount, setRevealedCount] = useState(0);
  const [error, setError] = useState(false);

  // revela as mensagens estaticas uma de cada vez, feito a IA "mandando"
  // varias mensagens em sequencia apos o titulo terminar de digitar.
  useEffect(() => {
    if (!typingDone || revealedCount >= MESSAGES.length) return;
    const timeout = setTimeout(
      () => setRevealedCount((c) => c + 1),
      revealedCount === 0 ? 400 : MESSAGE_STAGGER_MS
    );
    return () => clearTimeout(timeout);
  }, [typingDone, revealedCount]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-lg bg-bg px-6 text-center">
      <motion.div layout="position" transition={{ duration: 0.6, ease: EASE }}>
        <TypingGreeting onDone={() => setTypingDone(true)} />
      </motion.div>

      {typingDone && (
        <motion.div
          layout="position"
          transition={{ duration: 0.6, ease: EASE }}
          className="flex w-full max-w-[26rem] flex-col items-start gap-sm"
        >
          {MESSAGES.map(
            (msg, i) => i < revealedCount && <MessageBubble key={msg.id}>{msg.content}</MessageBubble>
          )}
          {error && (
            <MessageBubble>
              <span className="text-accent-magenta dark:text-magenta-300">
                Código incorreto. Tente novamente.
              </span>
            </MessageBubble>
          )}
        </motion.div>
      )}

      {typingDone && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, ease: EASE }}
          className="w-full max-w-[18rem]"
        >
          <PasswordGateForm
            redirectTo={redirectTo}
            focusWhenReady={typingDone}
            error={error}
            onError={setError}
          />
        </motion.div>
      )}
    </div>
  );
}
