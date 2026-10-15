'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { PasswordGateForm } from './PasswordGateForm';
import { siteConfig } from '@/lib/config';

// curva suave de desaceleracao longa, pra transicao lenta/gradual
const EASE = [0.22, 1, 0.36, 1] as const;
const INSTRUCTION_TEXT = 'Digite o código de acesso para conhecer meu trabalho';
const ERROR_TEXT = 'Quase lá! Confere o código e tenta mais uma vez. 💗';
const SUCCESS_TEXT = 'Prontinho! Fique à vontade ✨';
// digitacao das mensagens de chat: ritmo de streaming de IA, mas devagar o
// suficiente pra acompanhar lendo enquanto aparece
const MIN_CHAR_MS = 35;
const MAX_CHAR_MS = 70;
// pausa depois de cada bolha terminar, antes da proxima comecar a digitar -
// proporcional ao tamanho do texto, pra dar tempo real de ler cada linha
// (nao so um intervalo fixo, que fica curto demais pra frases longas)
const MIN_READ_PAUSE_MS = 1400;
const READ_PAUSE_MS_PER_CHAR = 55;

function randomCharDelay() {
  return MIN_CHAR_MS + Math.random() * (MAX_CHAR_MS - MIN_CHAR_MS);
}

function readPauseFor(text: string) {
  return Math.max(MIN_READ_PAUSE_MS, text.length * READ_PAUSE_MS_PER_CHAR);
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
        ou me manda um{' '}
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
  { id: 'adorar', kind: 'typed', text: 'Vou adorar conversar com você :)' },
];

// bolinha magenta (mesma usada no titulo da v1 e no #dot do Preloader),
// dimensionada em `em` pra acompanhar o tamanho da fonte de cada bolha.
function Cursor() {
  return (
    <span
      aria-hidden="true"
      className="ml-1 inline-block h-[0.45em] w-[0.45em] animate-pulse rounded-full bg-accent-magenta align-baseline"
    />
  );
}

function bubbleClassName(colorClass = 'text-fg') {
  // text-pretty evita palavra viuva sozinha na ultima linha quando o
  // texto quebra em mais de uma linha
  return `type-body-sm max-w-full self-start text-pretty rounded-2xl rounded-bl-sm bg-surface-soft px-4 py-2 text-left ${colorClass}`;
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
        timeoutId = setTimeout(finish, readPauseFor(text));
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
function StaticBubble({
  enabled,
  onSent,
  readPauseMs = MIN_READ_PAUSE_MS,
  children,
}: {
  enabled: boolean;
  onSent?: () => void;
  readPauseMs?: number;
  children: ReactNode;
}) {
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
    const advanceTimeout = setTimeout(() => onSentRef.current?.(), readPauseMs);
    return () => {
      clearTimeout(showTimeout);
      clearTimeout(advanceTimeout);
    };
  }, [enabled, readPauseMs]);

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
  const [readyToType, setReadyToType] = useState(false);
  const [olaSent, setOlaSent] = useState(false);
  const [quebomSent, setQuebomSent] = useState(false);
  const [instructionSent, setInstructionSent] = useState(false);
  const [error, setError] = useState(false);
  const [errorKey, setErrorKey] = useState(0);
  const [hasFailedOnce, setHasFailedOnce] = useState(false);
  const [errorSent, setErrorSent] = useState(false);
  const [helpStage, setHelpStage] = useState(0);
  const [success, setSuccess] = useState(false);

  // a tela de senha fica atras do Preloader por ~3.8s (ver HOME_PATHS em
  // Preloader.tsx); sem isso, a 1a bolha comeca a digitar escondida atras dele.
  // Espera o #preloader sumir do DOM antes de liberar a digitacao.
  useEffect(() => {
    let fallback: ReturnType<typeof setTimeout> | undefined;
    let observer: MutationObserver | undefined;

    function markReady() {
      fallback = setTimeout(() => setReadyToType(true), 0);
    }

    if (!document.getElementById('preloader')) {
      markReady();
    } else {
      observer = new MutationObserver(() => {
        if (!document.getElementById('preloader')) {
          observer?.disconnect();
          markReady();
        }
      });
      observer.observe(document.body, { childList: true, subtree: true });
      fallback = setTimeout(markReady, 5000);
    }

    return () => {
      observer?.disconnect();
      if (fallback) clearTimeout(fallback);
    };
  }, []);

  function handleError(hasError: boolean) {
    setError(hasError);
    if (hasError) {
      setHasFailedOnce(true);
      setErrorSent(false);
      setErrorKey((k) => k + 1);
    }
  }

  function handleSuccess() {
    setSuccess(true);
  }

  // igual ao ChatGPT: enquanto nao ha nenhuma troca ainda (so a saudacao
  // inicial), titulo + campo ficam centralizados juntos no meio da tela.
  // Assim que o usuario envia a 1a tentativa (certa ou errada), a conversa
  // "comeca de verdade" e o layout muda pro modo chat-log: mensagens no
  // topo, campo fixo na base da tela.
  const hasSubmitted = hasFailedOnce || success;

  const messages = (
    <motion.div
      layout="position"
      transition={{ duration: 0.6, ease: EASE }}
      className="flex w-full max-w-[30rem] flex-col items-start gap-sm"
    >
      <TypedBubble text="Olá!" enabled={readyToType} onSent={() => setOlaSent(true)} />

      {olaSent && (
        <TypedBubble text="Que bom receber sua visita :)" enabled={olaSent} onSent={() => setQuebomSent(true)} />
      )}

      {quebomSent && (
        <TypedBubble text={INSTRUCTION_TEXT} enabled={quebomSent} onSent={() => setInstructionSent(true)} />
      )}

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
            <StaticBubble
              key={msg.id}
              enabled={i === helpStage}
              onSent={() => setHelpStage((s) => s + 1)}
              readPauseMs={2400}
            >
              {msg.content}
            </StaticBubble>
          )
        )}

      {/* senha certa: mostra a msg de sucesso e só navega (com navegacao
          dura, pro Preloader tocar de novo) depois dela ser lida - evita
          pular direto pro preloader sem feedback */}
      {success && (
        <TypedBubble
          text={SUCCESS_TEXT}
          enabled={success}
          onSent={() => {
            window.location.href = redirectTo;
          }}
        />
      )}
    </motion.div>
  );

  const composer = !success && (
    <PasswordGateForm focusWhenReady={instructionSent} error={error} onError={handleError} onSuccess={handleSuccess} />
  );

  // importante: so um `return`/uma arvore de JSX pra tudo que envolve
  // `messages` - se existissem dois `return`s com wrappers diferentes pra
  // cada fase, o React desmontava e remontava TODAS as bolhas na hora da
  // transicao (title+mensagens digitadas do zero de novo). Trocar so a
  // className do mesmo container preserva o estado de cada bolha.
  return (
    <>
      <div
        className={
          hasSubmitted
            ? 'flex min-h-screen flex-col items-center gap-lg bg-bg px-6 pb-28 pt-16 text-center'
            : 'flex min-h-screen flex-col items-center justify-center gap-lg bg-bg px-6 py-10 text-center'
        }
      >
        {readyToType && messages}

        {/* enquanto a conversa nao "comecou de verdade" (1a tentativa),
            o campo fica junto do grupo centralizado - igual ao estado
            vazio do ChatGPT */}
        {!hasSubmitted && readyToType && composer && (
          <motion.div layout="position" transition={{ duration: 0.6, ease: EASE }} className="w-full max-w-[30rem]">
            {composer}
          </motion.div>
        )}
      </div>

      {/* a partir da 1a tentativa, o campo vira fixo na base da tela -
          chat de verdade, nao cola mais no grupo centralizado do inicio */}
      {hasSubmitted && composer && (
        <div className="fixed inset-x-0 bottom-0 z-10 bg-bg px-6 py-3">
          <div className="mx-auto w-full max-w-[30rem]">{composer}</div>
        </div>
      )}
    </>
  );
}
