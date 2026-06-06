'use client';

import { motion } from 'framer-motion';
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

export function Racional() {
  return (
    <section
      id="racional"
      aria-labelledby="racional-heading"
      className="py-section bg-bg border-t border-border"
    >
      <div className="max-w-6xl mx-auto px-6">

        <motion.h2
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          id="racional-heading"
          className="type-display-lg text-fg mb-xxl"
        >
          Racional
        </motion.h2>

        {/* Design Journey label — desktop only */}
        <div className="hidden lg:flex items-center gap-3 mb-6">
          <div className="flex-1 border-t border-dashed border-border" />
          <span className="type-caption text-fg-subtle">Design Journey</span>
          <div className="flex-1 border-t border-dashed border-border" />
        </div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-5"
        >
          {phases.map(({ num, type, title, journeyCard, processCard }) => (
            <motion.div key={num} variants={fadeInUp} className="flex flex-col gap-4">

              {/* Phase header */}
              <div className="flex items-start gap-3">
                <div
                  className="w-7 h-7 bg-fg text-bg flex items-center justify-center rounded-sm flex-shrink-0 type-caption"
                  aria-hidden="true"
                >
                  {num}
                </div>
                <div>
                  <p className="type-caption text-fg-subtle mb-0.5">{type}</p>
                  <p className="type-body-sm text-fg font-[480] leading-snug">{title}</p>
                </div>
              </div>

              {/* Journey card */}
              <div className="rounded-xl border border-border p-4 bg-bg flex-1">
                <p className="type-body-sm text-fg font-[480] mb-1.5">{journeyCard.title}</p>
                <p className="type-body-sm text-fg-muted leading-relaxed">{journeyCard.text}</p>
              </div>

              {/* Como trabalho divider */}
              <div className="flex items-center gap-2">
                <div className="flex-1 border-t border-dashed border-border" />
                <span className="type-caption text-fg-subtle whitespace-nowrap">Como trabalho</span>
                <div className="flex-1 border-t border-dashed border-border" />
              </div>

              {/* Process card */}
              <div className="rounded-xl border border-border p-4 bg-surface-soft flex-1">
                <p className="type-body-sm text-fg font-[480] mb-1.5">{processCard.title}</p>
                <p className="type-body-sm text-fg-muted leading-relaxed">{processCard.text}</p>
              </div>

            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
