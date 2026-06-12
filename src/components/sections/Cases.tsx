'use client';

import { motion } from 'framer-motion';
import { useLocale } from 'next-intl';
import { CaseCard } from '@/components/cases/CaseCard';
import { CaseCardCompact } from '@/components/cases/CaseCardCompact';
import type { Case } from '@/lib/types';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type Props = { cases?: Case[] };

type LocaleStr = { pt: string; en: string };

function GroupHeader({ title, description }: { title: string; description: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="mb-8"
    >
      <h3 className="type-headline text-fg">{title}</h3>
      <p className="type-body text-fg-muted mt-2">{description}</p>
      <div className="mt-6 h-px bg-border" aria-hidden="true" />
    </motion.div>
  );
}

const productCards: {
  company: string;
  category: LocaleStr;
  title: LocaleStr;
  description: LocaleStr;
  tags: string[];
  href: string;
  imageSrc: string;
  imageAlt: string;
  accentBg: string;
  accentText: string;
  mockup: 'mobile' | 'desktop';
}[] = [
  {
    company: 'Sellbie',
    category: { pt: 'Product Design', en: 'Product Design' },
    title: {
      pt: 'Redesign do core da plataforma',
      en: 'Core platform redesign',
    },
    description: {
      pt: 'Navegação, campanhas e criação de envio redesenhados do zero',
      en: 'Navigation, campaigns and sending flow redesigned from scratch',
    },
    tags: ['UX Research', 'Redesign', 'Omnichannel'],
    href: '/cases/sellbie-redesign',
    imageSrc: '/images/cases/sellbie/redesign/sellbie-redesign-preview.png',
    imageAlt: 'Tela principal do redesign da plataforma Sellbie',
    accentBg: 'var(--color-surface-soft)',
    accentText: 'var(--color-project-sellbie-redesign-text)',
    mockup: 'desktop',
  },
  {
    company: 'Sellbie',
    category: { pt: 'Product Design', en: 'Product Design' },
    title: {
      pt: 'Jornadas de automação multicanal',
      en: 'Multichannel automation journeys',
    },
    description: {
      pt: 'Canvas de fluxo com lógica comportamental',
      en: 'Flow canvas with behavioral logic',
    },
    tags: ['Produto Novo', 'IA & Automação', 'Workflow'],
    href: '/cases/sellbie-jornadas',
    imageSrc: '/images/cases/sellbie/jornadas/sellbie-jornadas-preview.png',
    imageAlt: 'Canvas de criação de jornada na plataforma Sellbie',
    accentBg: 'var(--color-surface-soft)',
    accentText: 'var(--color-project-sellbie-jornadas-text)',
    mockup: 'desktop',
  },
  {
    company: 'Jovens Gênios',
    category: { pt: 'Product Design', en: 'Product Design' },
    title: {
      pt: 'Alfabetização com modelos pedagógicos',
      en: 'Literacy with pedagogical models',
    },
    description: {
      pt: 'Progressão de fases com estratégia',
      en: 'Phase progression with strategy',
    },
    tags: ['UX Research', 'BNCC', 'Design System'],
    href: '/cases/jg-alfabetizacao',
    imageSrc: '/images/cases/jovens-genios/alfabetizacao/jg-alfabetizacao-preview.png',
    imageAlt: 'Modelos de questão do sistema de alfabetização',
    accentBg: 'var(--color-surface-soft)',
    accentText: 'var(--color-project-jg-alfabetizacao-text)',
    mockup: 'mobile',
  },
  {
    company: 'Jovens Gênios',
    category: { pt: 'Product Design', en: 'Product Design' },
    title: {
      pt: 'Central de Ajuda segmentada por perfil',
      en: 'Profile-segmented Help Center',
    },
    description: {
      pt: 'Três perfis de uso com busca dedicada',
      en: 'Three usage profiles with dedicated search',
    },
    tags: ['Arquitetura de Informação', 'Pesquisa', 'Personalização'],
    href: '/cases/jg-central-ajuda',
    imageSrc: '/images/cases/jovens-genios/central-de-ajuda/jg-central-ajuda-preview.png',
    imageAlt: 'Página inicial da central de ajuda com atalhos por perfil',
    accentBg: 'var(--color-surface-soft)',
    accentText: 'var(--color-project-jg-central-ajuda-text)',
    mockup: 'desktop',
  },
];

const strategyCards: {
  company: string;
  category: LocaleStr;
  label: LocaleStr;
  title: LocaleStr;
  tags: string[];
  href: string;
  imageSrc: string;
  imageAlt: string;
  accentBg: string;
  accentText: string;
  mockup: 'mobile' | 'desktop';
}[] = [
  {
    company: 'Sellbie',
    category: { pt: 'Framework de métricas', en: 'Metrics framework' },
    label: { pt: 'Estruturação embasada no HEART', en: 'HEART-based structuring' },
    title: { pt: 'Construção de métricas', en: 'Metrics framework' },
    tags: ['HEART', 'OKR', 'Produto'],
    href: '/cases/sellbie-metricas',
    imageSrc: '/images/cases/sellbie/metricas/sellbie-metricas-preview.png',
    imageAlt: 'Framework HEART estruturado no FigJam',
    accentBg: 'var(--color-surface-soft)',
    accentText: 'var(--color-project-sellbie-metricas-text)',
    mockup: 'desktop',
  },
  {
    company: 'Sellbie',
    category: { pt: 'Relatório estratégico', en: 'Strategic report' },
    label: { pt: 'Estruturação de indicadores', en: 'indicator structuring' },
    title: { pt: 'Relatório de performance CRM', en: 'CRM performance report' },
    tags: ['Mapa de oportunidades', 'Figma Make', 'CS'],
    href: '/cases/sellbie-crm',
    imageSrc: '/images/cases/sellbie/crm/sellbie-crm-preview.png',
    imageAlt: 'Dashboard de diagnóstico CRM no Figma Make',
    accentBg: 'var(--color-surface-soft)',
    accentText: 'var(--color-project-sellbie-crm-text)',
    mockup: 'desktop',
  },
  {
    company: 'Sellbie',
    category: { pt: 'Relatório estratégico', en: 'Strategic report' },
    label: { pt: 'Plano estratégico e relatórios', en: 'Strategic plan and reports' },
    title: { pt: 'Otimização Cashback', en: 'Cashback Optimization' },
    tags: ['Entrevistas com CS', 'ROAS', 'Figma Make'],
    href: '/cases/sellbie-cashback',
    imageSrc: '/images/cases/sellbie/cashback/sellbie-cashback-preview.png',
    imageAlt: 'Dashboard de ROAS do programa de cashback',
    accentBg: 'var(--color-surface-soft)',
    accentText: 'var(--color-project-sellbie-cashback-text)',
    mockup: 'desktop',
  },
];

const foundationsCards: {
  company: string;
  category: LocaleStr;
  label: LocaleStr;
  title: LocaleStr;
  tags: string[];
  href: string;
  imageSrc: string;
  imageAlt: string;
  accentBg: string;
  accentText: string;
  mockup: 'mobile' | 'desktop';
}[] = [
  {
    company: 'Sellbie',
    category: { pt: 'Arquitetura de navegação', en: 'Navigation architecture' },
    label: { pt: 'Construção com embasamento', en: 'Foundations' },
    title: { pt: 'Arquitetura de informação', en: 'Information Architecture' },
    tags: ['Card Sorting', 'IA', 'Navegação'],
    href: '/cases/sellbie-arq-info',
    imageSrc: '/images/cases/sellbie/arquitetura/sellbie-arq-info-preview.png',
    imageAlt: 'Board de card sorting da arquitetura de informação',
    accentBg: 'var(--color-surface-soft)',
    accentText: 'var(--color-project-sellbie-arq-info-text)',
    mockup: 'desktop',
  },
];

const groups = {
  productDesign: {
    title: 'Product Design',
    description: {
      pt: 'Interfaces, fluxos e produtos construídos ou redesenhados',
      en: 'Interfaces, flows and products built or redesigned',
    },
  },
  strategy: {
    title: 'Strategy',
    description: {
      pt: 'Produto orientado por dados, métricas e decisão',
      en: 'Product driven by data, metrics and decisions',
    },
  },
  foundations: {
    title: 'Foundations',
    description: {
      pt: 'Estrutura e arquitetura que sustentam o produto',
      en: 'Structure and architecture that support the product',
    },
  },
};

export function CasesSection(_props: Props) {
  const locale = useLocale() as 'pt' | 'en';

  return (
    <section id="cases" aria-labelledby="cases-heading" className="py-section bg-[#FDFAF4] dark:bg-block-cream scroll-mt-28">
      <div className="max-w-6xl mx-auto px-6 space-y-12">

        {/* ── Título da seção ─────────────────────────────────── */}
        <motion.h2
          id="cases-heading"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="type-display-lg text-fg"
        >
          Cases
        </motion.h2>

        {/* ── Product Design ──────────────────────────────────── */}
        <div>
          <GroupHeader
            title={groups.productDesign.title}
            description={groups.productDesign.description[locale]}
          />

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {productCards.map((card) => (
              <CaseCard
                key={card.href}
                company={card.company}
                category={card.category[locale]}
                title={card.title[locale]}
                description={card.description[locale]}
                tags={card.tags}
                href={card.href}
                imageSrc={card.imageSrc}
                imageAlt={card.imageAlt}
                accentBg={card.accentBg}
                accentText={card.accentText}
                mockup={card.mockup}
                ctaLabel={locale === 'en' ? 'See case' : 'Ver case'}
              />
            ))}
          </motion.div>
        </div>

        {/* ── Strategy ────────────────────────────────────────── */}
        <div>
          <GroupHeader
            title={groups.strategy.title}
            description={groups.strategy.description[locale]}
          />

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {strategyCards.map((card) => (
              <CaseCardCompact
                key={card.href}
                company={card.company}
                category={card.category[locale]}
                label={card.label[locale]}
                title={card.title[locale]}
                tags={card.tags}
                href={card.href}
                imageSrc={card.imageSrc}
                imageAlt={card.imageAlt}
                accentBg={card.accentBg}
                accentText={card.accentText}
                mockup={card.mockup}
                ctaLabel={locale === 'en' ? 'See case' : 'Ver case'}
              />
            ))}
          </motion.div>
        </div>

        {/* ── Foundations ─────────────────────────────────────── */}
        <div>
          <GroupHeader
            title={groups.foundations.title}
            description={groups.foundations.description[locale]}
          />

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {foundationsCards.map((card) => (
              <CaseCardCompact
                key={card.href}
                company={card.company}
                category={card.category[locale]}
                label={card.label[locale]}
                title={card.title[locale]}
                tags={card.tags}
                href={card.href}
                imageSrc={card.imageSrc}
                imageAlt={card.imageAlt}
                accentBg={card.accentBg}
                accentText={card.accentText}
                mockup={card.mockup}
                ctaLabel={locale === 'en' ? 'See case' : 'Ver case'}
              />
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
}
