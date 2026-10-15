'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { TypingGreeting } from './TypingGreeting';
import { PasswordGateForm } from './PasswordGateForm';

// curva suave de desaceleracao longa, pra transicao lenta/gradual
const EASE = [0.22, 1, 0.36, 1] as const;

export function SenhaScreen({ redirectTo }: { redirectTo: string }) {
  const [typingDone, setTypingDone] = useState(false);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-lg bg-bg px-6 text-center">
      <motion.div
        layout="position"
        transition={{ duration: 5, ease: EASE }}
        className="flex flex-col items-center gap-lg"
      >
        <TypingGreeting onDone={() => setTypingDone(true)} />
        {typingDone && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 5, ease: EASE }}
            className="flex flex-col items-center gap-sm"
          >
            <p className="type-body-lg text-fg-muted">
              Para conhecer meu trabalho,
              <br />
              digite o código de acesso:
            </p>
            <PasswordGateForm redirectTo={redirectTo} focusWhenReady={typingDone} />
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
