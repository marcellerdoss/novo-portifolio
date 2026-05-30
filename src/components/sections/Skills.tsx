'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { fadeInUp, stagger, staggerFast } from '@/lib/animations';

type SkillCategory = {
  key: 'design' | 'research' | 'prototyping' | 'handoff' | 'soft';
  items: string[];
};

const categories: SkillCategory[] = [
  {
    key: 'design',
    items: ['Figma', 'Adobe XD', 'UI Design', 'UX Design', 'Design System', 'Tokens', 'Acessibilidade'],
  },
  {
    key: 'research',
    items: ['Entrevistas', 'Testes de Usabilidade', 'Pesquisa Quantitativa', 'Análise Heurística', 'Card Sorting', 'Tree Testing'],
  },
  {
    key: 'prototyping',
    items: ['Figma Prototype', 'Framer', 'ProtoPie', 'Micro-interações', 'Animação'],
  },
  {
    key: 'handoff',
    items: ['Figma Dev Mode', 'Zeplin', 'Storybook', 'Design Tokens', 'Documentação'],
  },
  {
    key: 'soft',
    items: ['Facilitação', 'Design Thinking', 'Storytelling', 'Agile', 'Liderança', 'Comunicação'],
  },
];

export function Skills() {
  const t = useTranslations('skills');

  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="py-section px-6 bg-canvas-parchment dark:bg-surface-tile-2"
    >
      <div className="max-w-6xl mx-auto">
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
              <h3 className="type-caption-strong text-fg mb-4 uppercase tracking-wider">
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
                    className="type-caption text-fg-muted bg-canvas dark:bg-surface-tile-1 border border-hairline dark:border-white/10 rounded-pill px-3 py-1.5"
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
