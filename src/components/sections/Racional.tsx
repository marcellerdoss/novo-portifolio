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
      text:  { pt: 'Conduzo pesquisas qualitativas, entrevistas com usuários, desk research e benchmarking para entender o contexto real — não só o que foi pedido, mas o problema que precisa ser resolvido.',
               en: 'I conduct qualitative research, user interviews, desk research and benchmarking to understand the real context — not just what was asked, but the problem that needs to be solved.' },
    },
    trajectoryCard: {
      title: { pt: 'Ampliação de repertório', en: 'Expanding repertoire' },
      text:  { pt: 'Varejo, martech, EdTech e produtos com IA me ensinaram a ler problemas pelo que são, não pelo que parecem.',
               en: 'Retail, martech, EdTech and AI products taught me to read problems for what they are, not what they seem.' },
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
      text:  { pt: 'Anos trabalhando com negócios distintos me deram calibração para distinguir o que é demanda pontual do que é oportunidade real de produto.',
               en: 'Years working across different businesses gave me the calibration to distinguish a one-off demand from a real product opportunity.' },
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
      text:  { pt: 'Estudos e experiências em contextos muito diferentes ampliaram minha capacidade de explorar soluções com mais consistência e menos tentativa e erro.',
               en: 'Studies and experiences across very different contexts expanded my ability to explore solutions with more consistency and less trial and error.' },
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
      text:  { pt: 'Acompanho a implementação porque o design não termina no Figma. Termina — ou começa de verdade — no comportamento real do usuário.',
               en: 'I follow implementation because design doesn\'t end in Figma. It ends — or truly begins — in real user behavior.' },
    },
  },
];

function DiamondBadge({ num }: { num: string }) {
  return (
    <div className="relative w-10 h-10 flex-shrink-0">
      <div
        className="absolute inset-0 rotate-45 bg-block-navy dark:bg-[#B4225E] rounded-sm"
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
      <div className="max-w-6xl mx-auto px-6 space-y-16">

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
              ? 'My way of working follows a rhythm: understand before defining, define before proposing, propose before building. Each step exists because the previous one matters.'
              : 'Minha forma de trabalhar segue um ritmo: entender antes de definir, definir antes de propor, propor antes de construir. Cada etapa existe porque a anterior importa.'}
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
                <div className="rounded-[16px] border border-black/10 dark:border-white/10 px-6 pt-6 pb-10 bg-pink-50 dark:bg-navy-800 h-full">
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

                <div className="rounded-[16px] border border-black/10 dark:border-white/10 px-5 pt-5 pb-8 bg-pink-50 dark:bg-navy-800">
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
