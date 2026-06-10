'use client';

import { motion } from 'framer-motion';
import { fadeInUp, stagger } from '@/lib/animations';

function TriangleDown() {
  return (
    <svg width="14" height="10" viewBox="0 0 14 10" fill="currentColor" aria-hidden="true">
      <path d="M2 0.5 L12 0.5 Q13.5 0.5 13 2 L7.8 8.5 Q7 9.5 6.2 8.5 L1 2 Q0.5 0.5 2 0.5Z" />
    </svg>
  );
}

const phases = [
  {
    num: '1',
    type: 'Descobrir',
    question: 'Quais são e de onde vêm os problemas?',
    practiceCard: {
      title: 'Leitura de contexto',
      text: 'Exploro contextos por meio de pesquisas qualitativas e quantitativas, entrevistas e observação, além de desk research, benchmarking e análise de dados.',
    },
    trajectoryCard: {
      title: 'Ampliação de repertório',
      text: 'Atuação em diferentes contextos profissionais amplia a leitura de problemas, permitindo compreender como eles se manifestam na prática e não apenas na superfície das demandas.',
    },
  },
  {
    num: '2',
    type: 'Definir',
    question: 'Qual problema devemos focar para resolver?',
    practiceCard: {
      title: 'Construção de foco',
      text: 'Sintetizo informações para identificar padrões, tensões e oportunidades, transformando sinais dispersos em um problema claro e priorizado.',
    },
    trajectoryCard: {
      title: 'Evolução de visão estratégica',
      text: 'Minha trajetória amplia a capacidade de distinguir demandas pontuais de oportunidades reais de melhoria de experiência.',
    },
  },
  {
    num: '3',
    type: 'Desenvolver',
    question: 'Quais são as soluções possíveis para esse problema?',
    practiceCard: {
      title: 'Exploração de soluções',
      text: 'Exploro possibilidades de solução por meio de ideação, prototipação e validação inicial de caminhos, considerando intenção de experiência, viabilidade técnica e contexto de produto.',
    },
    trajectoryCard: {
      title: 'Construção de repertório aplicado',
      text: 'Experiências em diferentes áreas permitem transitar entre ideias, necessidades de negócio e restrições técnicas, ampliando a capacidade de construir soluções consistentes.',
    },
  },
  {
    num: '4',
    type: 'Entregar',
    question: 'Nossa solução de fato resolve o problema?',
    practiceCard: {
      title: 'Validação em uso',
      text: 'Participo de testes, validações e acompanhamento da implementação, garantindo alinhamento entre o que foi desenhado e o que é entregue.',
    },
    trajectoryCard: {
      title: 'Aprendizado contínuo com entrega',
      text: 'O acompanhamento da entrega reforça a visão de que o design não termina na solução, mas continua no comportamento real do produto e nos aprendizados gerados em uso.',
    },
  },
];

function DiamondBadge({ num }: { num: string }) {
  return (
    <div className="relative w-10 h-10 flex-shrink-0">
      <div
        className="absolute inset-0 rotate-45 bg-block-navy dark:bg-accent-magenta rounded-sm"
        aria-hidden="true"
      />
      <span className="absolute inset-0 flex items-center justify-center text-white type-body-strong z-10 select-none">
        {num}
      </span>
    </div>
  );
}

/* Arrow row — symmetric vertical spacing via py-3 */
function ArrowRow() {
  return (
    <div className="grid grid-cols-4 gap-5 py-3">
      {phases.map(({ num }) => (
        <div key={num} className="flex justify-center text-accent-magenta">
          <TriangleDown />
        </div>
      ))}
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
      <div className="max-w-6xl mx-auto px-6 space-y-8">

        {/* Heading */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 id="racional-heading" className="type-display-lg text-fg mb-3">
            Racional de experiência
          </h2>
          <p className="type-body text-fg-muted whitespace-nowrap">
            O design se reflete na forma como penso e atuo profissionalmente na construção de experiências.
          </p>
        </motion.div>

        {/* ── Desktop + Tablet (≥768px): 4 colunas alinhadas ── */}
        <div className="hidden md:block">

          {/* Row 1: Phase headers */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-4 gap-5 items-start"
          >
            {phases.map(({ num, type, question }) => (
              <motion.div key={num} variants={fadeInUp} className="flex flex-col items-center text-center gap-6">
                <DiamondBadge num={num} />
                <p className="type-caption text-accent-magenta">{type}</p>
                <p className="type-body-strong text-fg leading-snug">{question}</p>
              </motion.div>
            ))}
          </motion.div>

          <ArrowRow />

          {/* Row 2: Na prática */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-4 gap-5"
          >
            {phases.map(({ num, practiceCard }) => (
              <motion.div key={num} variants={fadeInUp} className="h-full">
                <div className="rounded-[16px] border border-black/10 dark:border-white/10 p-6 bg-bg h-full">
                  <p className="type-caption text-accent-magenta mb-3">Na prática</p>
                  <p className="type-body-strong text-fg mb-2">{practiceCard.title}</p>
                  <p className="type-body-sm text-fg-muted leading-relaxed">{practiceCard.text}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <ArrowRow />

          {/* Row 3: Na minha trajetória */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-4 gap-5"
          >
            {phases.map(({ num, trajectoryCard }) => (
              <motion.div key={num} variants={fadeInUp} className="h-full">
                <div className="rounded-[16px] border border-black/10 dark:border-white/10 p-6 bg-pink-50 dark:bg-navy-800 h-full">
                  <p className="type-caption text-accent-magenta mb-3">Na minha trajetória</p>
                  <p className="type-body-strong text-fg mb-2">{trajectoryCard.title}</p>
                  <p className="type-body-sm text-fg-muted leading-relaxed">{trajectoryCard.text}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>

        {/* ── Mobile (<768px): timeline ── */}
        <div className="md:hidden space-y-10">
          {phases.map(({ num, type, question, practiceCard, trajectoryCard }) => (
            <div key={num} className="flex gap-4">
              <div className="flex flex-col items-center gap-2 pt-1">
                <DiamondBadge num={num} />
                <div className="flex-1 w-[2px] bg-black/10 dark:bg-white/10" />
              </div>

              <div className="flex-1 min-w-0 pb-4">
                <p className="type-caption text-accent-magenta mb-1">{type}</p>
                <p className="type-body-strong text-fg leading-snug mb-4">{question}</p>

                <div className="rounded-[16px] border border-black/10 dark:border-white/10 p-5 bg-bg mb-3">
                  <p className="type-caption text-accent-magenta mb-1">Na prática</p>
                  <p className="type-body-strong text-fg mb-2">{practiceCard.title}</p>
                  <p className="type-body-sm text-fg-muted leading-relaxed">{practiceCard.text}</p>
                </div>

                <div className="flex justify-center mb-3 text-accent-magenta">
                  <TriangleDown />
                </div>

                <div className="rounded-[16px] border border-black/10 dark:border-white/10 p-5 bg-pink-50 dark:bg-navy-800">
                  <p className="type-caption text-accent-magenta mb-1">Na minha trajetória</p>
                  <p className="type-body-strong text-fg mb-2">{trajectoryCard.title}</p>
                  <p className="type-body-sm text-fg-muted leading-relaxed">{trajectoryCard.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
