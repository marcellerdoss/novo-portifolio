'use client';

import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { fadeInUp, stagger } from '@/lib/animations';

const phases = [
  {
    num: '01',
    type: 'Divergir',
    title: 'Explorar o campo',
    journeyCard: {
      title: 'Estudar de ponta a ponta',
      text: 'Mergulho em UX, CX, produto e design sem julgamento. Construir visão ampla antes de especializar.',
    },
    processCard: {
      title: 'Entender antes de assumir',
      text: 'O problema real raramente é o que achamos. Entrevistas, observação e dados revelam o que a superfície esconde.',
    },
  },
  {
    num: '02',
    type: 'Convergir',
    title: 'Definir o foco',
    journeyCard: {
      title: 'Escolher onde aprofundar',
      text: 'Direcionar carreira para campos que conectam comportamento do usuário, estratégia e produto.',
    },
    processCard: {
      title: 'O problema certo vale mais',
      text: 'Sintetizo dados em um problema claro antes de qualquer solução. A IA acelera — a leitura crítica ainda é humana.',
    },
  },
  {
    num: '03',
    type: 'Divergir',
    title: 'Ideação e propósito',
    journeyCard: {
      title: 'Definir propósito e intenção',
      text: 'O que quero fazer. Onde quero chegar. Explorar possibilidades com repertório e clareza.',
    },
    processCard: {
      title: 'Explorar amplo, decidir com critério',
      text: 'Múltiplas direções antes de convergir. Wireframes, protótipos, testes rápidos. Repertório define qualidade.',
    },
  },
  {
    num: '04',
    type: 'Convergir',
    title: 'Entregar e evoluir',
    journeyCard: {
      title: 'Entregar, aprender, reiniciar',
      text: 'Executar com embasamento. Testar, aprender. Melhorar processos e recomeçar o ciclo.',
    },
    processCard: {
      title: 'Lançar é o começo, não o fim',
      text: 'Testo, valido, lanço — e continuo acompanhando. Métricas mostram onde a experiência ainda quebra.',
    },
  },
];

function RowDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="type-caption text-accent-magenta whitespace-nowrap">{label}</span>
      <div className="flex-1 border-t border-dashed border-accent-magenta" />
      <ChevronRight size={12} className="text-accent-magenta flex-shrink-0" />
    </div>
  );
}

export function Racional() {
  return (
    <section
      id="racional"
      aria-labelledby="racional-heading"
      className="py-section bg-bg"
    >
      <div className="max-w-6xl mx-auto px-6 space-y-6">

        <motion.h2
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          id="racional-heading"
          className="type-display-lg text-fg"
        >
          Racional
        </motion.h2>

        {/* ── Design Journey row label ── */}
        <RowDivider label="Design Journey" />

        {/* ── Journey cards ── */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {phases.map(({ num, type, title, journeyCard }) => (
            <motion.div key={num} variants={fadeInUp} className="flex flex-col gap-4">

              {/* Phase header */}
              <div className="flex items-start gap-3">
                <div
                  className="w-7 h-7 bg-block-navy text-white flex items-center justify-center rounded-sm flex-shrink-0 type-caption"
                  aria-hidden="true"
                >
                  {num}
                </div>
                <div>
                  <p className="type-caption text-fg-subtle mb-0.5">{type}</p>
                  <p className="type-body-sm font-medium text-fg leading-snug">{title}</p>
                </div>
              </div>

              {/* Journey card */}
              <div className="rounded-[16px] border border-black/10 dark:border-white/10 p-6 bg-bg flex-1">
                <p className="type-body-strong text-fg mb-3">{journeyCard.title}</p>
                <p className="type-body-sm text-fg-muted leading-relaxed">{journeyCard.text}</p>
              </div>

            </motion.div>
          ))}
        </motion.div>

        {/* ── Como trabalho row label — full width, once ── */}
        <RowDivider label="Como trabalho" />

        {/* ── Process cards ── */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {phases.map(({ num, processCard }) => (
            <motion.div key={num} variants={fadeInUp} className="h-full">
              <div className="rounded-[16px] border border-black/10 dark:border-white/10 p-6 bg-surface-soft h-full">
                <p className="type-body-strong text-fg mb-3">{processCard.title}</p>
                <p className="type-body-sm text-fg-muted leading-relaxed">{processCard.text}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
