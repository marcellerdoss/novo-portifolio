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
      pt: ['Figma', 'UI Design', 'UX Design', 'Design System', 'Arquitetura da Informação', 'Design de Interação', 'Wireframes', 'Prototipagem', 'UX Writing', 'Acessibilidade Digital'],
      en: ['Figma', 'UI Design', 'UX Design', 'Design System', 'Information Architecture', 'Interaction Design', 'Wireframes', 'Prototyping', 'UX Writing', 'Digital Accessibility'],
    },
  },
  {
    key: 'research',
    items: {
      pt: ['Entrevistas com Usuários', 'Testes de Usabilidade', 'Pesquisa Qualitativa', 'Desk Research', 'Card Sorting', 'Análise Heurística', 'Benchmarking', 'Mapeamento de Jornada', 'Tree Testing'],
      en: ['User Interviews', 'Usability Testing', 'Qualitative Research', 'Desk Research', 'Card Sorting', 'Heuristic Analysis', 'Benchmarking', 'Journey Mapping', 'Tree Testing'],
    },
  },
  {
    key: 'strategy',
    items: {
      pt: ['CX Strategy', 'Consumer Insights', 'Product Discovery', 'Estratégia de Produto', 'Service Design', 'Design Thinking', 'Omnichannel', 'Agile'],
      en: ['CX Strategy', 'Consumer Insights', 'Product Discovery', 'Product Strategy', 'Service Design', 'Design Thinking', 'Omnichannel', 'Agile'],
    },
  },
  {
    key: 'ai',
    items: {
      pt: ['Figma Make', 'Claude Design', 'Claude Code', 'AI Builder', 'Lovable'],
      en: ['Figma Make', 'Claude Design', 'Claude Code', 'AI Builder', 'Lovable'],
    },
  },
  {
    key: 'soft',
    items: {
      pt: ['Comunicação', 'Storytelling', 'Liderança', 'Colaboração Multidisciplinar', 'Facilitação', 'Geração de Insights'],
      en: ['Communication', 'Storytelling', 'Leadership', 'Multidisciplinary Collaboration', 'Facilitation', 'Insights Generation'],
    },
  },
];

type EducationItem = { name: string; institution: string };
type EducationCategory = { label: { pt: string; en: string }; items: EducationItem[] };

const educationCategories: EducationCategory[] = [
  {
    label: { pt: 'Pós-graduação', en: 'Graduate Education' },
    items: [
      { name: 'UX e Design de Produtos Digitais', institution: 'PUC Minas' },
      { name: 'Gestão da Experiência do Consumidor', institution: 'ESPM' },
      { name: 'Consumer Insights e UX', institution: 'COPPEAD UFRJ' },
      { name: 'Comunicação Social', institution: 'Estácio' },
    ],
  },
  {
    label: { pt: 'UX & Product Design', en: 'UX & Product Design' },
    items: [
      { name: 'UX Research', institution: 'Mergo Escola de Design' },
      { name: 'UX Metrics', institution: 'Mergo Escola de Design' },
      { name: 'UX Writing', institution: 'Mergo Escola de Design' },
      { name: 'Product Designer', institution: 'Mergo Escola de Design' },
      { name: 'Design de Serviço', institution: 'Mergo Escola de Design' },
    ],
  },
  {
    label: { pt: 'Estratégia & Método', en: 'Strategy & Methods' },
    items: [
      { name: 'Product Manager', institution: 'Product Arena' },
      { name: 'Acessibilidade Digital no CX', institution: 'ESPM' },
      { name: 'Design Thinking', institution: 'B2W Digital' },
      { name: 'Metodologias Ágeis', institution: 'FGV Online' },
      { name: 'Customer Success', institution: 'SEBRAE' },
      { name: 'IA para Gestão de Produtos', institution: 'PRAGMA' },
    ],
  },
];

type Props = { inline?: boolean };

export function Skills({ inline }: Props) {
  const t = useTranslations('skills');
  const locale = useLocale() as 'pt' | 'en';

  const skillsGrid = (
    <motion.div
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      className={inline ? 'grid grid-cols-1 gap-8' : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'}
    >
      {categories.map(({ key, items }) => (
        <motion.div key={key} variants={fadeInUp}>
          <h3 className="type-caption text-accent-magenta mb-4">{t(key)}</h3>
          <motion.div variants={staggerFast} className="flex flex-wrap gap-2">
            {items[locale].map((skill) => (
              <motion.span
                key={skill}
                variants={fadeInUp}
                className="type-caption text-fg-subtle rounded-full border border-border px-3 py-1 leading-none"
              >
                {skill}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      ))}
    </motion.div>
  );

  const educationGrid = (
    <motion.div
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      className="grid grid-cols-1 sm:grid-cols-3 gap-8"
    >
      {educationCategories.map(({ label, items }) => (
        <motion.div key={label.pt} variants={fadeInUp}>
          <h3 className="type-caption text-accent-magenta mb-4">{label[locale]}</h3>
          <div className="space-y-3">
            {items.map((item) => (
              <div key={item.name} className="flex flex-col gap-0.5">
                <span className="type-body text-fg leading-snug">{item.name}</span>
                <span className="type-body-sm text-fg-muted leading-snug">{item.institution}</span>
              </div>
            ))}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );

  if (inline) return (
    <div id="skills">
      <motion.h2 variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
        id="skills-heading" className="type-headline text-fg mb-xxl">
        {t('title')}
      </motion.h2>
      {skillsGrid}
      <hr className="border-border my-8" />
      <motion.h2 variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
        id="formacao-heading" className="type-headline text-fg mb-xxl">
        {locale === 'pt' ? 'Formação & Certificações' : 'Education & Certifications'}
      </motion.h2>
      {educationGrid}
    </div>
  );

  return (
    <>
      <section id="skills" aria-labelledby="skills-heading" className="py-section bg-[#FDF6F3] dark:bg-surface-soft scroll-mt-28">
        <div className="max-w-6xl mx-auto px-6 space-y-12">
          <motion.h2
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            id="skills-heading"
            className="type-display-lg text-fg"
          >
            {t('title')}
          </motion.h2>
          {skillsGrid}
        </div>
      </section>

      <div id="formacao" className="py-section bg-[#F9F7F8] dark:bg-block-cream scroll-mt-28">
        <div className="max-w-6xl mx-auto px-6 space-y-12">
          <motion.h2
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            id="formacao-heading"
            className="type-display-lg text-fg"
          >
            {locale === 'pt' ? 'Formação & Certificações' : 'Education & Certifications'}
          </motion.h2>
          {educationGrid}
        </div>
      </div>
    </>
  );
}
