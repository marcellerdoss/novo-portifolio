'use client';

import { motion } from 'framer-motion';
import { useLocale } from 'next-intl';
import { fadeInUp, stagger } from '@/lib/animations';

type Lang = 'pt' | 'en';

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
    type:     { pt: 'Descobrir',  en: 'Discover' },
    question: { pt: 'Quais são e de onde vêm os problemas?', en: 'What are the problems and where do they come from?' },
    practiceCard: {
      title: { pt: 'Leitura de contexto',    en: 'Context reading' },
      text:  { pt: 'Exploro contextos por meio de pesquisas qualitativas e quantitativas, entrevistas e observação, além de desk research, benchmarking e análise de dados.',
               en: 'I explore contexts through qualitative and quantitative research, interviews and observation, as well as desk research, benchmarking and data analysis.' },
    },
    trajectoryCard: {
      title: { pt: 'Ampliação de repertório', en: 'Expanding repertoire' },
      text:  { pt: 'Atuação em diferentes contextos profissionais amplia a leitura de problemas, permitindo compreender como eles se manifestam na prática e não apenas na superfície das demandas.',
               en: 'Working in different professional contexts broadens problem reading, allowing me to understand how problems manifest in practice, not just on the surface of demands.' },
    },
  },
  {
    num: '2',
    type:     { pt: 'Definir', en: 'Define' },
    question: { pt: 'Qual problema devemos focar para resolver?', en: 'Which problem should we focus on solving?' },
    practiceCard: {
      title: { pt: 'Construção de foco',  en: 'Building focus' },
      text:  { pt: 'Sintetizo informações para identificar padrões, tensões e oportunidades, transformando sinais dispersos em um problema claro e priorizado.',
               en: 'I synthesize information to identify patterns, tensions and opportunities, turning scattered signals into a clear and prioritized problem.' },
    },
    trajectoryCard: {
      title: { pt: 'Evolução de visão estratégica', en: 'Strategic vision evolution' },
      text:  { pt: 'Minha trajetória amplia a capacidade de distinguir demandas pontuais de oportunidades reais de melhoria de experiência.',
               en: 'My journey expands the ability to distinguish one-off demands from real opportunities for experience improvement.' },
    },
  },
  {
    num: '3',
    type:     { pt: 'Desenvolver', en: 'Develop' },
    question: { pt: 'Quais são as soluções possíveis para esse problema?', en: 'What are the possible solutions to this problem?' },
    practiceCard: {
      title: { pt: 'Exploração de soluções', en: 'Exploring solutions' },
      text:  { pt: 'Exploro possibilidades de solução por meio de ideação, prototipação e validação inicial de caminhos, considerando intenção de experiência, viabilidade técnica e contexto de produto.',
               en: 'I explore solution possibilities through ideation, prototyping and initial path validation, considering experience intent, technical feasibility and product context.' },
    },
    trajectoryCard: {
      title: { pt: 'Construção de repertório aplicado', en: 'Building applied repertoire' },
      text:  { pt: 'Experiências em diferentes áreas permitem transitar entre ideias, necessidades de negócio e restrições técnicas, ampliando a capacidade de construir soluções consistentes.',
               en: 'Experiences in different areas allow me to move between ideas, business needs and technical constraints, expanding the ability to build consistent solutions.' },
    },
  },
  {
    num: '4',
    type:     { pt: 'Entregar', en: 'Deliver' },
    question: { pt: 'Nossa solução de fato resolve o problema?', en: 'Does our solution actually solve the problem?' },
    practiceCard: {
      title: { pt: 'Validação em uso', en: 'Validation in use' },
      text:  { pt: 'Participo de testes, validações e acompanhamento da implementação, garantindo alinhamento entre o que foi desenhado e o que é entregue.',
               en: 'I participate in testing, validation and implementation follow-through, ensuring alignment between what was designed and what is delivered.' },
    },
    trajectoryCard: {
      title: { pt: 'Aprendizado contínuo com entrega', en: 'Continuous learning through delivery' },
      text:  { pt: 'O acompanhamento da entrega reforça a visão de que o design não termina na solução, mas continua no comportamento real do produto e nos aprendizados gerados em uso.',
               en: 'Following delivery reinforces the view that design doesn\'t end at the solution, but continues in the product\'s real behavior and the learnings generated in use.' },
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
  const locale = useLocale() as Lang;
  const t = <T,>(v: { pt: T; en: T }): T => v[locale] ?? v.pt;

  return (
    <section
      id="racional"
      aria-labelledby="racional-heading"
      className="py-section bg-[#F9F7F8] dark:bg-bg scroll-mt-28"
    >
      <div className="max-w-6xl mx-auto px-6 space-y-8">

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 id="racional-heading" className="type-display-lg text-fg mb-3">
            {locale === 'en' ? 'Experience rationale' : 'Racional de experiência'}
          </h2>
          <p className="type-body text-fg-muted">
            {locale === 'en'
              ? 'Design reflects how I think and act professionally in building experiences.'
              : 'O design se reflete na forma como penso e atuo profissionalmente na construção de experiências.'}
          </p>
        </motion.div>

        {/* ── Desktop + Tablet (≥768px): 4 colunas alinhadas ── */}
        <div className="hidden md:block">

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-4 gap-5 items-start"
          >
            {phases.map(({ num, type }) => (
              <motion.div key={num} variants={fadeInUp} className="flex flex-col items-center text-center gap-6">
                <DiamondBadge num={num} />
                <p className="type-caption text-accent-magenta">{t(type)}</p>
              </motion.div>
            ))}
          </motion.div>

          <ArrowRow />

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
                  <p className="type-caption text-accent-magenta mb-3">
                    {locale === 'en' ? 'In practice' : 'Na prática'}
                  </p>
                  <p className="type-body-strong text-fg mb-2">{t(practiceCard.title)}</p>
                  <p className="type-body-sm text-fg-muted leading-relaxed">{t(practiceCard.text)}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <ArrowRow />

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
                  <p className="type-caption text-accent-magenta mb-3">
                    {locale === 'en' ? 'In my journey' : 'Na minha trajetória'}
                  </p>
                  <p className="type-body-strong text-fg mb-2">{t(trajectoryCard.title)}</p>
                  <p className="type-body-sm text-fg-muted leading-relaxed">{t(trajectoryCard.text)}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>

        {/* ── Mobile (<768px): timeline ── */}
        <div className="md:hidden space-y-10">
          {phases.map(({ num, type, practiceCard, trajectoryCard }) => (
            <div key={num} className="flex gap-4">
              <div className="flex flex-col items-center gap-2 pt-1">
                <DiamondBadge num={num} />
                <div className="flex-1 w-[2px] bg-black/10 dark:bg-white/10" />
              </div>

              <div className="flex-1 min-w-0 pb-4">
                <p className="type-caption text-accent-magenta mb-3">{t(type)}</p>

                <div className="rounded-[16px] border border-black/10 dark:border-white/10 p-5 bg-bg mb-3">
                  <p className="type-caption text-accent-magenta mb-1">
                    {locale === 'en' ? 'In practice' : 'Na prática'}
                  </p>
                  <p className="type-body-strong text-fg mb-2">{t(practiceCard.title)}</p>
                  <p className="type-body-sm text-fg-muted leading-relaxed">{t(practiceCard.text)}</p>
                </div>

                <div className="flex justify-center mb-3 text-accent-magenta">
                  <TriangleDown />
                </div>

                <div className="rounded-[16px] border border-black/10 dark:border-white/10 p-5 bg-pink-50 dark:bg-navy-800">
                  <p className="type-caption text-accent-magenta mb-1">
                    {locale === 'en' ? 'In my journey' : 'Na minha trajetória'}
                  </p>
                  <p className="type-body-strong text-fg mb-2">{t(trajectoryCard.title)}</p>
                  <p className="type-body-sm text-fg-muted leading-relaxed">{t(trajectoryCard.text)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
