'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { TypingGreeting } from './TypingGreeting';
import { PasswordGateForm } from './PasswordGateForm';
import { siteConfig } from '@/lib/config';

// curva suave de desaceleracao longa, pra transicao lenta/gradual
const EASE = [0.22, 1, 0.36, 1] as const;
const INSTRUCTION_TEXT = 'Digite o código de acesso para conhecer meu trabalho';
const ERROR_TEXT = 'Código incorreto. Tente novamente.';
// digitacao das mensagens de chat: mais rapida que a do titulo (resposta
// "da IA" streamando, igual GPT/Claude, nao o ritmo humano do greeting)
const MIN_CHAR_MS = 15;
const MAX_CHAR_MS = 35;

function randomCharDelay() {
  return MIN_CHAR_MS + Math.random() * (MAX_CHAR_MS - MIN_CHAR_MS);
}

// mensagens de ajuda: so aparecem depois de uma senha errada, uma de cada
// vez (cada uma so comeca quando a anterior termina). As de texto puro
// digitam igual a instrucao; a de contato (com links) so entra com fade,
// ja que nao da pra "digitar" um link.
type HelpMessage =
  | { id: string; kind: 'typed'; text: string }
  | { id: string; kind: 'static'; content: ReactNode };

const HELP_MESSAGES: HelpMessage[] = [
  { id: 'sem-codigo', kind: 'typed', text: 'Não tem o código?' },
  {
    id: 'contato',
    kind: 'static',
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
  { id: 'adorar', kind: 'typed', text: 'Vou adorar conversar com você!' },
];

function Cursor() {
  return (
    <span
      aria-hidden="true"
      className="ml-0.5 inline-block h-[0.85em] w-[0.08em] translate-y-[0.12em] animate-pulse bg-current align-middle"
    />
  );
}

function bubbleClassName(colorClass = 'text-fg') {
  return `type-body-sm max-w-full self-start rounded-2xl rounded-bl-sm bg-surface-soft px-4 py-2 text-left ${colorClass}`;
}

// bolha que digita um texto caractere por caractere (com cursor), e ao
// terminar da um "pop" de escala - igual a animacao de mensagem enviada
// de um chat de IA. Avisa o pai (onSent) quando termina.
function TypedBubble({
  text,
  enabled,
  onSent,
  colorClass,
}: {
  text: string;
  enabled: boolean;
  onSent?: () => void;
  colorClass?: string;
}) {
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
      if (count >= text.length) {
        timeoutId = setTimeout(finish, 250);
        return;
      }
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduceMotion) {
        setRevealed(text.length);
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
  }, [enabled, text]);

  const typing = enabled && revealed < text.length;

  return (
    <motion.div
      layout="position"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0, scale: sent ? [1, 1.035, 1] : 1 }}
      transition={{ duration: sent ? 0.32 : 0.4, ease: EASE }}
      className={bubbleClassName(colorClass)}
    >
      {text.slice(0, revealed)}
      {typing && <Cursor />}
    </motion.div>
  );
}

// bolha estatica (sem digitacao) - pro conteudo com link, que nao da pra
// "digitar". Avisa o pai depois de um instante, pra manter a sequencia.
function StaticBubble({ enabled, onSent, children }: { enabled: boolean; onSent?: () => void; children: ReactNode }) {
  // uma vez mostrada, a bolha fica (nao esconde quando enabled vira false
  // ao passar a vez pra proxima mensagem).
  const [shown, setShown] = useState(false);
  const onSentRef = useRef(onSent);

  useEffect(() => {
    onSentRef.current = onSent;
  }, [onSent]);

  useEffect(() => {
    if (!enabled) return;
    const showTimeout = setTimeout(() => setShown(true), 0);
    const advanceTimeout = setTimeout(() => onSentRef.current?.(), 500);
    return () => {
      clearTimeout(showTimeout);
      clearTimeout(advanceTimeout);
    };
  }, [enabled]);

  if (!shown) return null;

  return (
    <motion.div
      layout="position"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: EASE }}
      className={bubbleClassName()}
    >
      {children}
    </motion.div>
  );
}

export function SenhaScreen({ redirectTo }: { redirectTo: string }) {
  const [typingDone, setTypingDone] = useState(false);
  const [instructionSent, setInstructionSent] = useState(false);
  const [error, setError] = useState(false);
  const [errorKey, setErrorKey] = useState(0);
  const [hasFailedOnce, setHasFailedOnce] = useState(false);
  const [errorSent, setErrorSent] = useState(false);
  const [helpStage, setHelpStage] = useState(0);

  function handleError(hasError: boolean) {
    setError(hasError);
    if (hasError) {
      setHasFailedOnce(true);
      setErrorSent(false);
      setErrorKey((k) => k + 1);
    }
  }

  return (
    <>
      {/* area de mensagens: cresce normalmente, com espaco reservado
          embaixo pro composer fixo nao cobrir o conteudo */}
      <div className="flex min-h-screen flex-col items-center gap-lg bg-bg px-6 pb-36 pt-[14vh] text-center">
        <motion.div layout="position" transition={{ duration: 0.6, ease: EASE }}>
          <TypingGreeting onDone={() => setTypingDone(true)} />
        </motion.div>

        {typingDone && (
          <motion.div
            layout="position"
            transition={{ duration: 0.6, ease: EASE }}
            className="flex w-full max-w-[26rem] flex-col items-start gap-sm"
          >
            <TypedBubble text={INSTRUCTION_TEXT} enabled={typingDone} onSent={() => setInstructionSent(true)} />

            {error && (
              <TypedBubble
                key={errorKey}
                text={ERROR_TEXT}
                enabled={error}
                onSent={() => setErrorSent(true)}
                colorClass="text-accent-magenta dark:text-magenta-300"
              />
            )}

            {hasFailedOnce &&
              errorSent &&
              HELP_MESSAGES.map((msg, i) =>
                i > helpStage ? null : msg.kind === 'typed' ? (
                  <TypedBubble
                    key={msg.id}
                    text={msg.text}
                    enabled={i === helpStage}
                    onSent={() => setHelpStage((s) => s + 1)}
                  />
                ) : (
                  <StaticBubble key={msg.id} enabled={i === helpStage} onSent={() => setHelpStage((s) => s + 1)}>
                    {msg.content}
                  </StaticBubble>
                )
              )}
          </motion.div>
        )}
      </div>

      {/* composer fixo embaixo da tela, igual a barra de um chat de IA
          (nao acompanha o scroll das mensagens) */}
      {instructionSent && (
        <div className="fixed inset-x-0 bottom-0 z-10 bg-bg px-6 py-4">
          <div className="mx-auto w-full max-w-[18rem]">
            <PasswordGateForm
              redirectTo={redirectTo}
              focusWhenReady={instructionSent}
              error={error}
              onError={handleError}
            />
          </div>
        </div>
      )}
    </>
  );
}
