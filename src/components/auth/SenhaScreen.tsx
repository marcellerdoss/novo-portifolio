'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { TypingGreeting } from './TypingGreeting';
import { PasswordGateForm } from './PasswordGateForm';

// easing suave usado no resto do site (fadeInUp em lib/animations.ts);
// aqui com duracao maior e um atraso pra nao competir com o reflow do
// titulo subindo - a instrucao "entra" bem depois dele ja ter acomodado.
const EASE = [0, 0, 0.58, 1] as const;

export function SenhaScreen({ redirectTo }: { redirectTo: string }) {
  const [typingDone, setTypingDone] = useState(false);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-lg bg-bg px-6 text-center">
      <motion.div
        layout
        transition={{ duration: 0.7, ease: EASE }}
        className="flex flex-col items-center gap-lg"
      >
        <TypingGreeting onDone={() => setTypingDone(true)} />
        {typingDone && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.3 }}
            className="flex flex-col items-center gap-sm"
          >
            <p className="type-body-lg text-fg-muted">
              Para conhecer meu trabalho, digite o código de acesso:
            </p>
            <PasswordGateForm redirectTo={redirectTo} focusWhenReady={typingDone} />
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
