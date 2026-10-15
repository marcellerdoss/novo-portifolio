'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { TypingGreeting } from './TypingGreeting';
import { PasswordGateForm } from './PasswordGateForm';
import { siteConfig } from '@/lib/config';

// curva suave de desaceleracao longa, pra transicao lenta/gradual
const EASE = [0.22, 1, 0.36, 1] as const;
const MESSAGE_STAGGER_MS = 700;
const INSTRUCTION_TEXT = 'Digite o código de acesso para conhecer meu trabalho';
// digitacao da mensagem de chat: mais rapida que a do titulo (resposta
// "da IA" streamando, nao o ritmo humano do greeting)
const MIN_CHAR_MS = 20;
const MAX_CHAR_MS = 45;

function randomCharDelay() {
  return MIN_CHAR_MS + Math.random() * (MAX_CHAR_MS - MIN_CHAR_MS);
}

// mensagens de ajuda: so aparecem depois de uma senha errada (uma de cada
// vez, logo apos o feedback de erro) - nao fazem parte do fluxo inicial.
const HELP_MESSAGES: { id: string; content: ReactNode }[] = [
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

// bolha da instrucao: digita o texto caractere por caractere (com cursor),
// e quando termina faz um "pop" de escala, igual a animacao de mensagem
// enviada de um chat de IA. So entao avisa o pai (onSent) pra liberar o
// campo de resposta.
function TypedInstructionBubble({ enabled, onSent }: { enabled: boolean; onSent: () => void }) {
  const [revealed, setRevealed] = useState(0);
  const [sent, setSent] = useState(false);
  const onSentRef = useRef(onSent);

  useEffect(() => {
    onSentRef.current = onSent;
  }, [onSent]);

  useEffect(() => {
    if (!enabled) return;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    function finish() {
      setSent(true);
      onSentRef.current?.();
    }

    function scheduleNext(count: number) {
      if (count >= INSTRUCTION_TEXT.length) {
        timeoutId = setTimeout(finish, 250);
        return;
      }
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduceMotion) {
        setRevealed(INSTRUCTION_TEXT.length);
        finish();
        return;
      }
      timeoutId = setTimeout(() => {
        const next = count + 1;
        setRevealed(next);
        scheduleNext(next);
      }, randomCharDelay());
    }

    scheduleNext(0);
    return () => clearTimeout(timeoutId);
  }, [enabled]);

  const typing = enabled && revealed < INSTRUCTION_TEXT.length;

  return (
    <motion.div
      layout="position"
      initial={{ opacity: 0, y: 12, scale: 1 }}
      animate={
        sent
          ? { opacity: 1, y: 0, scale: [1, 1.035, 1] }
          : { opacity: enabled ? 1 : 0, y: 0, scale: 1 }
      }
      transition={sent ? { duration: 0.32, ease: EASE } : { duration: 0.4, ease: EASE }}
      className="type-body-sm max-w-full self-start rounded-2xl rounded-bl-sm bg-surface-soft px-4 py-2 text-left text-fg"
    >
      {INSTRUCTION_TEXT.slice(0, revealed)}
      {typing && (
        <span
          aria-hidden="true"
          className="ml-0.5 inline-block h-[0.85em] w-[0.08em] translate-y-[0.12em] animate-pulse bg-current align-middle"
        />
      )}
    </motion.div>
  );
}

export function SenhaScreen({ redirectTo }: { redirectTo: string }) {
  const [typingDone, setTypingDone] = useState(false);
  const [instructionSent, setInstructionSent] = useState(false);
  const [error, setError] = useState(false);
  const [hasFailedOnce, setHasFailedOnce] = useState(false);
  const [helpRevealedCount, setHelpRevealedCount] = useState(0);

  function handleError(hasError: boolean) {
    setError(hasError);
    if (hasError) setHasFailedOnce(true);
  }

  // mensagens de ajuda so comecam a aparecer (uma de cada vez) depois da
  // primeira senha errada, logo apos o feedback de erro.
  useEffect(() => {
    if (!hasFailedOnce || helpRevealedCount >= HELP_MESSAGES.length) return;
    const timeout = setTimeout(
      () => setHelpRevealedCount((c) => c + 1),
      helpRevealedCount === 0 ? 500 : MESSAGE_STAGGER_MS
    );
    return () => clearTimeout(timeout);
  }, [hasFailedOnce, helpRevealedCount]);

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
          <TypedInstructionBubble enabled={typingDone} onSent={() => setInstructionSent(true)} />

          {/* campo de resposta so libera depois que a mensagem "termina de
              enviar" - ancorado logo em seguida, sem atraso proprio */}
          {instructionSent && (
            <motion.div
              layout="position"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="w-full max-w-[18rem] self-center"
            >
              <PasswordGateForm
                redirectTo={redirectTo}
                focusWhenReady={instructionSent}
                error={error}
                onError={handleError}
              />
            </motion.div>
          )}

          {error && (
            <MessageBubble>
              <span className="text-accent-magenta dark:text-magenta-300">
                Código incorreto. Tente novamente.
              </span>
            </MessageBubble>
          )}

          {HELP_MESSAGES.map(
            (msg, i) => i < helpRevealedCount && <MessageBubble key={msg.id}>{msg.content}</MessageBubble>
          )}
        </motion.div>
      )}
    </div>
  );
}
