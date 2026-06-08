'use client';

import { motion } from 'framer-motion';
import { ChevronRight, ChevronDown } from 'lucide-react';
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
    <>
      {/* Mobile: label + linha vertical tracejada + seta para baixo */}
      <div className="sm:hidden flex flex-col gap-0">
        <span className="type-caption text-accent-magenta mb-2">{label}</span>
        <div className="relative ml-[3px] h-8">
          <div className="absolute inset-x-0 top-0 bottom-0 border-l border-dashed border-accent-magenta" />
          <ChevronDown
            size={12}
            className="absolute bottom-0 left-0 -translate-x-1/2 text-accent-magenta"
            aria-hidden="true"
          />
        </div>
      </div>
      {/* Desktop: linha tracejada horizontal com seta para a direita */}
      <div className="hidden sm:flex items-center gap-3">
        <span className="type-caption text-accent-magenta whitespace-nowrap">{label}</span>
        <div className="flex-1 border-t border-dashed border-accent-magenta" />
        <ChevronRight size={12} className="text-accent-magenta flex-shrink-0" aria-hidden="true" />
      </div>
    </>
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

        {/* ── Desktop: grids + RowDividers — oculto no mobile ── */}
        <div className="hidden sm:block space-y-6">

          <RowDivider label="Design Journey" />

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {phases.map(({ num, type, title, journeyCard }) => (
              <motion.div key={num} variants={fadeInUp} className="flex flex-col gap-4">

                <div className="flex items-start gap-3">
                  <div
                    className="w-7 h-7 bg-block-navy text-white flex items-center justify-center rounded-sm flex-shrink-0 type-caption"
                    aria-hidden="true"
                  >
                    {num}
                  </div>
                  <div>
                    <p className="type-caption text-accent-magenta mb-0.5">{type}</p>
                    <p className="type-body-sm font-[540] text-fg leading-snug">{title}</p>
                  </div>
                </div>

                <div className="rounded-[16px] border border-black/10 dark:border-white/10 p-6 bg-bg flex-1">
                  <p className="type-body-strong text-fg mb-2">{journeyCard.title}</p>
                  <p className="type-body-sm text-fg-muted leading-relaxed">{journeyCard.text}</p>
                </div>

              </motion.div>
            ))}
          </motion.div>

          <RowDivider label="Como trabalho" />

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {phases.map(({ num, processCard }) => (
              <motion.div key={num} variants={fadeInUp} className="h-full">
                <div className="rounded-[16px] border border-black/10 dark:border-white/10 p-6 bg-surface-soft h-full">
                  <p className="type-body-strong text-fg mb-2">{processCard.title}</p>
                  <p className="type-body-sm text-fg-muted leading-relaxed">{processCard.text}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>

        {/* ── Mobile: timeline com numeração ──────────────────── */}
        <div className="sm:hidden">

          {/* Label topo */}
          <div className="flex items-center gap-2 mb-6">
            <span className="type-caption text-accent-magenta">Design Journey</span>
          </div>

          {/* Linha vertical + itens */}
          <div className="relative">
            <div
              className="absolute top-0 bottom-0 left-[13px] w-[2px] bg-black/15 dark:bg-white/15"
              aria-hidden="true"
            />

            <div className="space-y-12">
              {phases.map(({ num, type, title, journeyCard, processCard }) => (
                <div key={num} className="relative flex gap-5">

                  {/* Número — marcador na linha */}
                  <div
                    className="shrink-0 w-7 h-7 bg-block-navy text-white flex items-center justify-center rounded-sm type-caption z-10"
                    aria-hidden="true"
                  >
                    {num}
                  </div>

                  {/* Conteúdo da fase */}
                  <div className="flex-1 min-w-0">
                    <p className="type-caption text-accent-magenta mb-0.5">{type}</p>
                    <p className="type-body-sm font-[540] text-fg leading-snug mb-5">{title}</p>

                    {/* Journey card */}
                    <div className="rounded-[16px] border border-black/10 dark:border-white/10 p-5 bg-bg mb-4">
                      <p className="type-body-strong text-fg mb-2">{journeyCard.title}</p>
                      <p className="type-body-sm text-fg-muted leading-relaxed">{journeyCard.text}</p>
                    </div>

                    {/* Mini divider "Como trabalho" */}
                    <div className="mb-4">
                      <span className="type-caption text-accent-magenta block mb-2">Como trabalho</span>
                      <div className="relative ml-[3px] h-6">
                        <div className="absolute inset-x-0 top-0 bottom-0 border-l border-dashed border-accent-magenta" />
                        <ChevronDown
                          size={12}
                          className="absolute bottom-0 left-0 -translate-x-1/2 text-accent-magenta"
                          aria-hidden="true"
                        />
                      </div>
                    </div>

                    {/* Process card */}
                    <div className="rounded-[16px] border border-black/10 dark:border-white/10 p-5 bg-surface-soft">
                      <p className="type-body-strong text-fg mb-2">{processCard.title}</p>
                      <p className="type-body-sm text-fg-muted leading-relaxed">{processCard.text}</p>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
