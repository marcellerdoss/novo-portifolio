'use client';

import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { fadeInUp, stagger } from '@/lib/animations';

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

type EducationItem = { name: { pt: string; en: string }; institution: string };
type EducationCategory = { label: { pt: string; en: string }; items: EducationItem[] };

const educationColumn1: EducationCategory[] = [
  {
    label: { pt: 'Pós-graduação', en: 'Postgraduate Studies' },
    items: [
      { name: { pt: 'UX e Design de Produtos Digitais', en: 'UX and Digital Product Design' }, institution: 'PUC Minas' },
      { name: { pt: 'Gestão da Experiência do Consumidor', en: 'Consumer Experience Management' }, institution: 'ESPM' },
    ],
  },
  {
    label: { pt: 'Certificação', en: 'Certification' },
    items: [
      { name: { pt: 'Consumer Insights e UX', en: 'Consumer Insights and UX' }, institution: 'COPPEAD UFRJ' },
    ],
  },
  {
    label: { pt: 'Graduação', en: 'Undergraduate Studies' },
    items: [
      { name: { pt: 'Comunicação Social', en: 'Social Communication' }, institution: 'Estácio' },
    ],
  },
];

const educationCategories: EducationCategory[] = [
  {
    label: { pt: 'UX & Product Design', en: 'UX & Product Design' },
    items: [
      { name: { pt: 'UX Research', en: 'UX Research' }, institution: 'Mergo Escola de Design' },
      { name: { pt: 'UX Metrics', en: 'UX Metrics' }, institution: 'Mergo Escola de Design' },
      { name: { pt: 'UX Writing', en: 'UX Writing' }, institution: 'Mergo Escola de Design' },
      { name: { pt: 'Product Designer', en: 'Product Designer' }, institution: 'Mergo Escola de Design' },
      { name: { pt: 'Design de Serviço', en: 'Service Design' }, institution: 'Mergo Escola de Design' },
    ],
  },
  {
    label: { pt: 'Estratégia & Método', en: 'Strategy & Methods' },
    items: [
      { name: { pt: 'Product Manager', en: 'Product Manager' }, institution: 'Product Arena' },
      { name: { pt: 'Acessibilidade Digital no CX', en: 'Digital Accessibility in CX' }, institution: 'ESPM' },
      { name: { pt: 'Design Thinking', en: 'Design Thinking' }, institution: 'B2W Digital' },
      { name: { pt: 'Metodologias Ágeis', en: 'Agile Methodologies' }, institution: 'FGV Online' },
      { name: { pt: 'Customer Success', en: 'Customer Success' }, institution: 'SEBRAE' },
      { name: { pt: 'IA para Gestão de Produtos', en: 'AI for Product Management' }, institution: 'PRAGMA' },
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
          <div className="flex flex-wrap gap-2">
            {items[locale].map((skill) => (
              <span
                key={skill}
                className="type-caption text-fg-subtle rounded-full border border-border px-3 py-1 leading-none"
              >
                {skill}
              </span>
            ))}
          </div>
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
      <motion.div variants={fadeInUp} className="space-y-6">
        {educationColumn1.map(({ label, items }) => (
          <div key={label.pt}>
            <h3 className="type-caption text-accent-magenta mb-4">{label[locale]}</h3>
            <div className="space-y-3">
              {items.map((item) => (
                <div key={item.name.pt} className="flex flex-col gap-0.5">
                  <span className="type-body text-fg leading-snug">{item.name[locale]}</span>
                  <span className="type-body-sm text-fg-muted leading-snug">{item.institution}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </motion.div>
      {educationCategories.map(({ label, items }) => (
        <motion.div key={label.pt} variants={fadeInUp}>
          <h3 className="type-caption text-accent-magenta mb-4">{label[locale]}</h3>
          <div className="space-y-3">
            {items.map((item) => (
              <div key={item.name.pt} className="flex flex-col gap-0.5">
                <span className="type-body text-fg leading-snug">{item.name[locale]}</span>
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
