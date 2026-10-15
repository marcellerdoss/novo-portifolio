'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TypingGreeting } from './TypingGreeting';
import { PasswordGateForm } from './PasswordGateForm';

// mesmo easing suave usado no resto do site (fadeInUp em lib/animations.ts)
const EASE = [0, 0, 0.58, 1] as const;

// tempo de leitura da frase antes do campo/botao aparecerem
const READ_PAUSE_MS = 1800;

export function SenhaScreen({ redirectTo }: { redirectTo: string }) {
  const [typingDone, setTypingDone] = useState(false);
  const [formReady, setFormReady] = useState(false);

  useEffect(() => {
    if (!typingDone) return;
    const timeout = setTimeout(() => setFormReady(true), READ_PAUSE_MS);
    return () => clearTimeout(timeout);
  }, [typingDone]);

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
            initial={{ clipPath: 'inset(0% 0 100% 0)' }}
            animate={{ clipPath: 'inset(0% 0 0% 0)' }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}
            className="flex flex-col items-center gap-sm"
          >
            <p className="type-body-lg text-fg-muted">
              Para conhecer meu trabalho, digite o código de acesso:
            </p>
            {formReady && (
              <motion.div
                initial={{ clipPath: 'inset(0% 0 100% 0)' }}
                animate={{ clipPath: 'inset(0% 0 0% 0)' }}
                transition={{ duration: 1.6, ease: EASE }}
                className="flex w-full flex-col items-center gap-sm"
              >
                <PasswordGateForm redirectTo={redirectTo} focusWhenReady={formReady} />
              </motion.div>
            )}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
