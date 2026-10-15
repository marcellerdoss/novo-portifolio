'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { PasswordGateForm } from './PasswordGateForm';
import { siteConfig } from '@/lib/config';

// curva suave de desaceleracao longa, pra transicao lenta/gradual
const EASE = [0.22, 1, 0.36, 1] as const;
const INSTRUCTION_TEXT = 'Para conhecer meu trabalho, digite o código de acesso';
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

function readPauseFor(length: number) {
  return Math.max(MIN_READ_PAUSE_MS, length * READ_PAUSE_MS_PER_CHAR);
}

// estado de digitacao compartilhado por qualquer bolha (texto puro ou com
// links) - conta so os caracteres (totalLength), quem desenha o conteudo
// e cada componente.
function useTypewriter(totalLength: number, enabled: boolean, onSent?: () => void) {
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
      if (count >= totalLength) {
        timeoutId = setTimeout(finish, readPauseFor(totalLength));
        return;
      }
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduceMotion) {
        setRevealed(totalLength);
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
  }, [enabled, totalLength]);

  return { revealed, sent };
}

// mensagem de ajuda: so aparece depois de uma senha errada. Digita igual
// as outras, em pedacos - os que tem `href` viram <a> assim que comecam
// a aparecer (o link ja funciona com a palavra parcialmente digitada).
type Segment = { text: string; href?: string; external?: boolean };

const HELP_SEGMENTS: Segment[] = [
  { text: 'Se não tiver o código, me chama pelo ' },
  { text: 'WhatsApp', href: siteConfig.contact.whatsapp, external: true },
  { text: ' ou me manda um ' },
  { text: 'e-mail', href: `mailto:${siteConfig.contact.email}` },
  { text: '. Vou adorar conversar com você :)' },
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
  const { revealed, sent } = useTypewriter(text.length, enabled, onSent);
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

// mesma digitacao caractere-a-caractere do TypedBubble, so que o texto e
// dividido em pedacos - os que tem `href` viram <a> assim que comecam a
// aparecer (o link ja funciona com a palavra parcialmente digitada).
function TypedLinkBubble({
  segments,
  enabled,
  onSent,
}: {
  segments: Segment[];
  enabled: boolean;
  onSent?: () => void;
}) {
  const totalLength = segments.reduce((sum, seg) => sum + seg.text.length, 0);
  const { revealed, sent } = useTypewriter(totalLength, enabled, onSent);
  const typing = enabled && revealed < totalLength;

  const offsets: number[] = [];
  segments.reduce((sum, seg) => {
    offsets.push(sum);
    return sum + seg.text.length;
  }, 0);

  const rendered = segments.map((seg, i) => {
    const segRevealed = Math.max(0, Math.min(seg.text.length, revealed - offsets[i]));
    const slice = seg.text.slice(0, segRevealed);
    if (!slice) return null;
    if (seg.href) {
      return (
        <a
          key={i}
          href={seg.href}
          target={seg.external ? '_blank' : undefined}
          rel={seg.external ? 'noopener noreferrer' : undefined}
          className="text-fg underline underline-offset-4 hover:text-accent-magenta"
        >
          {slice}
        </a>
      );
    }
    return <span key={i}>{slice}</span>;
  });

  return (
    <motion.div
      layout="position"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0, scale: sent ? [1, 1.035, 1] : 1 }}
      transition={{ duration: sent ? 0.32 : 0.4, ease: EASE }}
      className={bubbleClassName()}
    >
      {rendered}
      {typing && <Cursor />}
    </motion.div>
  );
}

export function SenhaScreen({ redirectTo }: { redirectTo: string }) {
  const [readyToType, setReadyToType] = useState(false);
  const [olaSent, setOlaSent] = useState(false);
  const [quebomSent, setQuebomSent] = useState(false);
  const [instructionSent, setInstructionSent] = useState(false);
  const [error, setError] = useState(false);
  const [errorBubbleVisible, setErrorBubbleVisible] = useState(false);
  const [errorKey, setErrorKey] = useState(0);
  const [hasFailedOnce, setHasFailedOnce] = useState(false);
  const [errorSent, setErrorSent] = useState(false);
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
      setErrorBubbleVisible(true);
      setErrorSent(false);
      setErrorKey((k) => k + 1);
    }
  }

  function handleSuccess() {
    setSuccess(true);
  }

  // janela de mensagens com altura travada (~3 bolhas visiveis por vez) -
  // conforme novas chegam, rola sozinha pro fim e as mais antigas saem de
  // vista por cima. Isso mantem a altura total do bloco (mensagens + campo)
  // constante desde o inicio, entao nada no centro da tela se desloca.
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  });

  const messages = (
    <div
      ref={scrollRef}
      className="flex h-40 w-full max-w-[30rem] flex-col items-start justify-end gap-sm overflow-y-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      <TypedBubble text="Olá!" enabled={readyToType} onSent={() => setOlaSent(true)} />

      {olaSent && (
        <TypedBubble text="Que bom receber sua visita :)" enabled={olaSent} onSent={() => setQuebomSent(true)} />
      )}

      {quebomSent && (
        <TypedBubble text={INSTRUCTION_TEXT} enabled={quebomSent} onSent={() => setInstructionSent(true)} />
      )}

      {/* uma vez mostrada, a bolha de erro fica no historico - nao some so
          porque o usuario comecou a editar a senha de novo (error volta a
          false so pra tirar o estado visual do campo, nao apaga a msg) */}
      {errorBubbleVisible && (
        <TypedBubble
          key={errorKey}
          text={ERROR_TEXT}
          enabled={errorBubbleVisible}
          onSent={() => setErrorSent(true)}
          colorClass="text-accent-magenta dark:text-magenta-300"
        />
      )}

      {hasFailedOnce && errorSent && <TypedLinkBubble segments={HELP_SEGMENTS} enabled={errorSent} />}

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
    </div>
  );

  const composer = !success && (
    <PasswordGateForm focusWhenReady={instructionSent} error={error} onError={handleError} onSuccess={handleSuccess} />
  );

  // bloco unico centralizado na tela (mensagens + campo). A janela de
  // mensagens tem altura travada (acima), entao esse bloco nunca cresce -
  // tudo fica parado no centro da tela o tempo todo, sem precisar de um
  // composer fixo separado.
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-lg bg-bg px-6 py-10 text-center">
      {readyToType && messages}

      {readyToType && composer && <div className="w-full max-w-[30rem]">{composer}</div>}
    </div>
  );
}
