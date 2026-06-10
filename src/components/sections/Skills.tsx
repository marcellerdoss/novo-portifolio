'use client';

import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { fadeInUp, stagger, staggerFast } from '@/lib/animations';

type SkillCategory = {
  key: 'design' | 'research' | 'strategy' | 'ai' | 'soft';
  items: { pt: string[]; en: string[] };
};

const categories: SkillCategory[] = [
  {
    key: 'design',
    items: {
      pt: ['Figma', 'UI Design', 'UX Design', 'Design System', 'Arquitetura da Informação', 'Design de Fluxos', 'Acessibilidade'],
      en: ['Figma', 'UI Design', 'UX Design', 'Design System', 'Information Architecture', 'User Flow Design', 'Accessibility'],
    },
  },
  {
    key: 'research',
    items: {
      pt: ['Entrevistas com Usuários', 'Testes de Usabilidade', 'Card Sorting', 'Análise Heurística', 'Benchmarking', 'Tree Testing'],
      en: ['User Interviews', 'Usability Testing', 'Card Sorting', 'Heuristic Analysis', 'Benchmarking', 'Tree Testing'],
    },
  },
  {
    key: 'strategy',
    items: {
      pt: ['CX Strategy', 'Consumer Insights', 'Estratégia de Produto', 'Facilitação', 'Design Thinking', 'Agile'],
      en: ['CX Strategy', 'Consumer Insights', 'Product Strategy', 'Facilitation', 'Design Thinking', 'Agile'],
    },
  },
  {
    key: 'ai',
    items: {
      pt: ['Plataformas com IA', 'Figma Make', 'Framer', 'Dev Mode', 'IA Adaptativa'],
      en: ['AI Platforms', 'Figma Make', 'Framer', 'Dev Mode', 'Adaptive AI'],
    },
  },
  {
    key: 'soft',
    items: {
      pt: ['Comunicação', 'Storytelling', 'Liderança'],
      en: ['Communication', 'Storytelling', 'Leadership'],
    },
  },
];

type Props = { inline?: boolean };

export function Skills({ inline }: Props) {
  const t = useTranslations('skills');
  const locale = useLocale() as 'pt' | 'en';

  const content = (
    <>
      <motion.h2
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        id="skills-heading"
        className="type-headline text-fg mb-xxl"
      >
        {t('title')}
      </motion.h2>

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className={inline ? 'grid grid-cols-1 gap-8' : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'}
      >
        {categories.map(({ key, items }) => (
          <motion.div key={key} variants={fadeInUp}>
            <h3 className="type-caption text-accent-magenta mb-4">
              {t(key)}
            </h3>
            <motion.div
              variants={staggerFast}
              className="flex flex-wrap gap-2"
            >
              {items[locale].map((skill) => (
                <motion.span
                  key={skill}
                  variants={fadeInUp}
                  className="type-caption text-fg-subtle border border-border rounded-full px-3 py-1.5 leading-none"
                >
                  {skill}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </>
  );

  if (inline) return <div id="skills">{content}</div>;

  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="py-section bg-surface-soft"
    >
      <div className="max-w-6xl mx-auto px-6">
        {content}
      </div>
    </section>
  );
}
