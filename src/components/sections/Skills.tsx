'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { fadeInUp, stagger, staggerFast } from '@/lib/animations';

type SkillCategory = {
  key: 'design' | 'research' | 'strategy' | 'ai' | 'soft';
  items: string[];
};

const categories: SkillCategory[] = [
  {
    key: 'design',
    items: ['Figma', 'UI Design', 'UX Design', 'Design System', 'Arquitetura da Informação', 'Design de Fluxos', 'Acessibilidade'],
  },
  {
    key: 'research',
    items: ['Entrevistas com Usuários', 'Testes de Usabilidade', 'Card Sorting', 'Análise Heurística', 'Benchmarking', 'Tree Testing'],
  },
  {
    key: 'strategy',
    items: ['CX Strategy', 'Consumer Insights', 'Estratégia de Produto', 'Facilitação', 'Design Thinking', 'Agile'],
  },
  {
    key: 'ai',
    items: ['Plataformas com IA', 'Figma Make', 'Framer', 'Dev Mode', 'IA Adaptativa'],
  },
  {
    key: 'soft',
    items: ['Comunicação', 'Storytelling', 'Liderança'],
  },
];

export function Skills() {
  const t = useTranslations('skills');

  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="py-section bg-surface-soft"
    >
      <div className="max-w-6xl mx-auto px-6">
        <motion.h2
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          id="skills-heading"
          className="type-display-lg text-fg mb-xxl"
        >
          {t('title')}
        </motion.h2>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
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
                {items.map((skill) => (
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
      </div>
    </section>
  );
}
