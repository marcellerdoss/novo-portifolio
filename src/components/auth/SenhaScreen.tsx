'use client';

import { useState } from 'react';
import { TypingGreeting } from './TypingGreeting';
import { PasswordGateForm } from './PasswordGateForm';

export function SenhaScreen({ redirectTo }: { redirectTo: string }) {
  const [typingDone, setTypingDone] = useState(false);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-lg bg-bg px-6 text-center">
      <TypingGreeting onDone={() => setTypingDone(true)} />
      <div
        aria-hidden={!typingDone}
        className={`flex flex-col items-center gap-sm transition-opacity duration-500 ${
          typingDone ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <p className="type-body-lg text-fg-muted">
          Digite o código de acesso para conhecer meu trabalho.
        </p>
        <PasswordGateForm redirectTo={redirectTo} focusWhenReady={typingDone} />
      </div>
    </div>
  );
}
