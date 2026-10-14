'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { TypingGreeting } from './TypingGreeting';
import { PasswordGateForm } from './PasswordGateForm';
import { fadeInUp } from '@/lib/animations';

export function SenhaScreen({ redirectTo }: { redirectTo: string }) {
  const [typingDone, setTypingDone] = useState(false);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-lg bg-bg px-6 text-center">
      <motion.div layout className="flex flex-col items-center gap-lg">
        <TypingGreeting onDone={() => setTypingDone(true)} />
        {typingDone && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
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
