'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useLocale } from 'next-intl';
import { ArrowUpRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { buttonVariants } from '@/components/ui/Button';
import type { Case } from '@/lib/types';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type Props = { cases?: Case[] };

type LocaleStr = { pt: string; en: string };

type CaseItem = {
  company: string;
  category: LocaleStr;
  title: LocaleStr;
  description: LocaleStr;
  tags: { pt: string[]; en: string[] };
  href: string;
  imageSrc: string;
  imageAlt: string;
  accentBg: string;
  accentText: string;
  mockup: 'mobile' | 'desktop';
};

const allCases: CaseItem[] = [
  {
    company: 'Sellbie',
    category: { pt: 'Product Design', en: 'Product Design' },
    title: { pt: 'Redesign do core da plataforma', en: 'Core platform redesign' },
    description: {
      pt: 'Como unificamos três padrões de navegação incompatíveis e redesenhamos o fluxo de criação de envios, reduzindo o abandono no módulo principal da plataforma.',
      en: 'How we unified three incompatible navigation patterns and redesigned the campaign sending flow, reducing abandonment in the platform\'s main module.',
    },
    tags: { pt: ['UX Research', 'Redesign', 'Omnichannel'], en: ['UX Research', 'Redesign', 'Omnichannel'] },
    href: '/cases/sellbie-redesign',
    imageSrc: '/images/cases/sellbie/redesign/sellbie-redesign-preview.png',
    imageAlt: 'Tela principal do redesign da plataforma Sellbie',
    accentBg: 'var(--color-case-preview-bg)',
    accentText: 'var(--color-project-sellbie-redesign-text)',
    mockup: 'desktop',
  },
  {
    company: 'Sellbie',
    category: { pt: 'Product Design', en: 'Product Design' },
    title: { pt: 'Jornadas de automação multicanal', en: 'Multichannel automation journeys' },
    description: {
      pt: 'Design do módulo de automação multicanal do zero. Canvas com mais de 20 gatilhos, 3 canais e lógica de ramificação comportamental para jornadas de cliente.',
      en: 'Design of the multichannel automation module from scratch. Canvas with over 20 triggers, 3 channels, and behavioral branching logic for customer journeys.',
    },
    tags: { pt: ['Produto Novo', 'IA & Automação', 'Workflow'], en: ['New Product', 'AI & Automation', 'Workflow'] },
    href: '/cases/sellbie-jornadas',
    imageSrc: '/images/cases/sellbie/jornadas/sellbie-jornadas-preview.png',
    imageAlt: 'Canvas de criação de jornada na plataforma Sellbie',
    accentBg: 'var(--color-case-preview-bg)',
    accentText: 'var(--color-project-sellbie-jornadas-text)',
    mockup: 'desktop',
  },
  {
    company: 'Jovens Gênios',
    category: { pt: 'Product Design', en: 'Product Design' },
    title: { pt: 'Alfabetização com modelos pedagógicos', en: 'Literacy with pedagogical models' },
    description: {
      pt: 'Experiência de alfabetização infantil projetada sem histórico na plataforma. Imersão na BNCC, pesquisa com educadoras e validação pedagógica que habilitou a IA preditiva em um segmento novo.',
      en: 'Literacy experience designed without any platform history. BNCC immersion, research with educators, and pedagogical validation that enabled the predictive AI in a new segment.',
    },
    tags: { pt: ['UX Research', 'BNCC', 'Design System'], en: ['UX Research', 'BNCC', 'Design System'] },
    href: '/cases/jg-alfabetizacao',
    imageSrc: '/images/cases/jovens-genios/alfabetizacao/jg-alfabetizacao-preview.png',
    imageAlt: 'Modelos de questão do sistema de alfabetização',
    accentBg: 'var(--color-case-preview-bg)',
    accentText: 'var(--color-project-jg-alfabetizacao-text)',
    mockup: 'mobile',
  },
  {
    company: 'Jovens Gênios',
    category: { pt: 'Product Design', en: 'Product Design' },
    title: { pt: 'Central de Ajuda segmentada por perfil', en: 'Profile-segmented Help Center' },
    description: {
      pt: 'Reestruturação da central de ajuda com arquitetura segmentada por perfil — Educadores, Exploradores e Responsáveis — com busca dedicada e estrutura validada e implementada no Zendesk.',
      en: 'Help center restructured with profile-segmented architecture — Educators, Explorers, and Guardians — with dedicated search validated and implemented in Zendesk.',
    },
    tags: { pt: ['Arquitetura de Informação', 'Pesquisa', 'Personalização'], en: ['Information Architecture', 'Research', 'Personalization'] },
    href: '/cases/jg-central-ajuda',
    imageSrc: '/images/cases/jovens-genios/central-de-ajuda/jg-central-ajuda-preview.png',
    imageAlt: 'Página inicial da central de ajuda com atalhos por perfil',
    accentBg: 'var(--color-case-preview-bg)',
    accentText: 'var(--color-project-jg-central-ajuda-text)',
    mockup: 'desktop',
  },
  {
    company: 'Sellbie',
    category: { pt: 'Framework de métricas', en: 'Metrics framework' },
    title: { pt: 'Construção de métricas', en: 'Metrics framework' },
    description: {
      pt: 'Estruturação de métricas de produto embasada no framework HEART, conectando objetivos de negócio a sinais mensuráveis de experiência do usuário.',
      en: 'Product metrics structuring based on the HEART framework, connecting business objectives to measurable user experience signals.',
    },
    tags: { pt: ['HEART', 'OKR', 'Produto'], en: ['HEART', 'OKR', 'Product'] },
    href: '/cases/sellbie-metricas',
    imageSrc: '/images/cases/sellbie/metricas/sellbie-metricas-preview.png',
    imageAlt: 'Framework HEART estruturado no FigJam',
    accentBg: 'var(--color-case-preview-bg)',
    accentText: 'var(--color-project-sellbie-metricas-text)',
    mockup: 'desktop',
  },
  {
    company: 'Sellbie',
    category: { pt: 'Relatório estratégico', en: 'Strategic report' },
    title: { pt: 'Relatório de performance CRM', en: 'CRM performance report' },
    description: {
      pt: 'Estruturação de indicadores e consolidação de dados de CRM em relatório estratégico para apoiar decisões do time de Customer Success.',
      en: 'Indicator structuring and CRM data consolidation into a strategic report to support Customer Success team decisions.',
    },
    tags: { pt: ['Mapa de oportunidades', 'Figma Make', 'CS'], en: ['Opportunity mapping', 'Figma Make', 'CS'] },
    href: '/cases/sellbie-crm',
    imageSrc: '/images/cases/sellbie/crm/sellbie-crm-preview.png',
    imageAlt: 'Dashboard de diagnóstico CRM no Figma Make',
    accentBg: 'var(--color-case-preview-bg)',
    accentText: 'var(--color-project-sellbie-crm-text)',
    mockup: 'desktop',
  },
  {
    company: 'Sellbie',
    category: { pt: 'Relatório estratégico', en: 'Strategic report' },
    title: { pt: 'Otimização Cashback', en: 'Cashback Optimization' },
    description: {
      pt: 'Plano estratégico de otimização do programa de cashback com dashboard de ROAS, relatório de precificação automatizado e entrevistas com o time de CS.',
      en: 'Strategic optimization plan for the cashback program with ROAS dashboard, automated pricing report, and CS team interviews.',
    },
    tags: { pt: ['Entrevistas com CS', 'ROAS', 'Figma Make'], en: ['CS interviews', 'ROAS', 'Figma Make'] },
    href: '/cases/sellbie-cashback',
    imageSrc: '/images/cases/sellbie/cashback/sellbie-cashback-preview.png',
    imageAlt: 'Dashboard de ROAS do programa de cashback',
    accentBg: 'var(--color-case-preview-bg)',
    accentText: 'var(--color-project-sellbie-cashback-text)',
    mockup: 'desktop',
  },
  {
    company: 'Sellbie',
    category: { pt: 'Arquitetura de navegação', en: 'Navigation architecture' },
    title: { pt: 'Arquitetura de informação', en: 'Information Architecture' },
    description: {
      pt: 'Construção da arquitetura de navegação da plataforma com embasamento em card sorting com usuários, inventário de conteúdo e validação estruturada.',
      en: 'Platform navigation architecture built on user card sorting, content inventory, and structured validation.',
    },
    tags: { pt: ['Card Sorting', 'IA', 'Navegação'], en: ['Card Sorting', 'AI', 'Navigation'] },
    href: '/cases/sellbie-arq-info',
    imageSrc: '/images/cases/sellbie/arquitetura/sellbie-arq-info-preview.png',
    imageAlt: 'Board de card sorting da arquitetura de informação',
    accentBg: 'var(--color-case-preview-bg)',
    accentText: 'var(--color-project-sellbie-arq-info-text)',
    mockup: 'desktop',
  },
];

function CaseRow({ card, index, locale }: { card: CaseItem; index: number; locale: 'pt' | 'en' }) {
  const reversed = index % 2 !== 0;
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 md:items-center"
    >
      {/* Imagem */}
      <div
        className={`relative aspect-[4/3] rounded-xl overflow-hidden${reversed ? ' md:order-2' : ' md:order-1'}`}
        style={{ backgroundColor: card.accentBg }}
      >
        {card.mockup === 'mobile' && (
          <div className="absolute inset-0 flex items-start justify-center pt-6">
            <div
              className="relative rounded-[26px] border-[5px] border-neutral-900 dark:border-white shadow-2xl overflow-hidden"
              style={{ width: '42%', aspectRatio: '9 / 19.5' }}
            >
              <div className="absolute top-0 inset-x-0 z-10 flex justify-center">
                <div className="w-[36%] h-[10px] bg-neutral-900 dark:bg-white rounded-b-full" />
              </div>
              <Image src={card.imageSrc} alt={card.imageAlt} fill sizes="50vw" className="object-cover object-top" />
            </div>
          </div>
        )}
        {card.mockup === 'desktop' && (
          <div className="absolute inset-5 flex items-center justify-center">
            <div
              className="relative"
              style={{ aspectRatio: '16 / 10', width: '100%', maxWidth: '85%', maxHeight: 'calc(90% - 9px)' }}
            >
              <div className="absolute inset-0 rounded-t-[8px] overflow-hidden border-[5px] border-b-0 border-neutral-900 dark:border-white bg-neutral-100 dark:bg-white/10 shadow-xl">
                <div className="absolute top-0 inset-x-0 z-10 flex justify-center pt-[5px]">
                  <div className="w-1.5 h-1.5 rounded-full bg-neutral-500 dark:bg-white/60" />
                </div>
                <Image src={card.imageSrc} alt={card.imageAlt} fill sizes="50vw" className="object-cover object-top" />
              </div>
              <div className="absolute bottom-[-5px] left-0 right-0 h-[5px] bg-neutral-900 dark:bg-white" />
              <div className="absolute bottom-[-9px] left-0 right-0 flex justify-center">
                <div className="h-[4px] bg-neutral-700 dark:bg-white/70 rounded-b-md" style={{ width: '65%' }} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Texto */}
      <div className={reversed ? 'md:order-1' : 'md:order-2'}>
        <p className="type-caption text-accent-magenta mb-3">
          {card.company} · {card.category[locale]}
        </p>
        <h3 className="type-headline text-fg mb-4 leading-snug">
          {card.title[locale]}
        </h3>
        <div className="flex flex-wrap gap-2 mb-6">
          {card.tags[locale].map((tag) => (
            <span key={tag} className="type-caption text-fg-subtle rounded-full border border-border px-3 py-1 leading-none">
              {tag}
            </span>
          ))}
        </div>
        <p className="type-body text-fg-muted mb-6">
          {card.description[locale]}
        </p>
        <Link href={card.href} className={buttonVariants({ variant: 'secondary', size: 'sm' })}>
          {locale === 'en' ? 'See case' : 'Ver case'}{' '}
          <ArrowUpRight size={12} aria-hidden="true" className="shrink-0" />
        </Link>
      </div>
    </motion.div>
  );
}

function CompactCard({ card, locale }: { card: CaseItem; locale: 'pt' | 'en' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <Link href={card.href} className="group block">
        <div
          className="relative aspect-[4/3] rounded-xl overflow-hidden mb-4"
          style={{ backgroundColor: card.accentBg }}
        >
          {card.mockup === 'mobile' && (
            <div className="absolute inset-0 flex items-start justify-center pt-6">
              <div
                className="relative rounded-[26px] border-[5px] border-neutral-900 dark:border-white shadow-2xl overflow-hidden"
                style={{ width: '38%', aspectRatio: '9 / 19.5' }}
              >
                <div className="absolute top-0 inset-x-0 z-10 flex justify-center">
                  <div className="w-[36%] h-[10px] bg-neutral-900 dark:bg-white rounded-b-full" />
                </div>
                <Image src={card.imageSrc} alt={card.imageAlt} fill sizes="33vw" className="object-cover object-top" />
              </div>
            </div>
          )}
          {card.mockup === 'desktop' && (
            <div className="absolute inset-5 flex items-center justify-center">
              <div
                className="relative"
                style={{ aspectRatio: '16 / 10', width: '100%', maxWidth: '85%', maxHeight: 'calc(90% - 9px)' }}
              >
                <div className="absolute inset-0 rounded-t-[8px] overflow-hidden border-[5px] border-b-0 border-neutral-900 dark:border-white bg-neutral-100 dark:bg-white/10 shadow-xl">
                  <div className="absolute top-0 inset-x-0 z-10 flex justify-center pt-[5px]">
                    <div className="w-1.5 h-1.5 rounded-full bg-neutral-500 dark:bg-white/60" />
                  </div>
                  <Image src={card.imageSrc} alt={card.imageAlt} fill sizes="33vw" className="object-cover object-top" />
                </div>
                <div className="absolute bottom-[-5px] left-0 right-0 h-[5px] bg-neutral-900 dark:bg-white" />
                <div className="absolute bottom-[-9px] left-0 right-0 flex justify-center">
                  <div className="h-[4px] bg-neutral-700 dark:bg-white/70 rounded-b-md" style={{ width: '65%' }} />
                </div>
              </div>
            </div>
          )}
          {!card.mockup && (
            <Image
              src={card.imageSrc}
              alt={card.imageAlt}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover object-top"
            />
          )}
        </div>
        <p className="type-caption text-accent-magenta mb-1">
          {card.company} · {card.category[locale]}
        </p>
        <h3 className="type-body-strong text-fg mb-3 leading-snug group-hover:underline underline-offset-2">
          {card.title[locale]}
        </h3>
        <div className="flex flex-wrap gap-2 mb-4">
          {card.tags[locale].map((tag) => (
            <span key={tag} className="type-caption text-fg-subtle rounded-full border border-border px-3 py-1 leading-none">
              {tag}
            </span>
          ))}
        </div>
        <span className={buttonVariants({ variant: 'secondary', size: 'sm' })}>
          {locale === 'en' ? 'See case' : 'Ver case'}{' '}
          <ArrowUpRight size={12} aria-hidden="true" className="shrink-0" />
        </span>
      </Link>
    </motion.div>
  );
}

const mainCases = allCases.slice(0, 4);
const compactCases = allCases.slice(4);

export function CasesSection(_props: Props) {
  const locale = useLocale() as 'pt' | 'en';

  return (
    <section id="cases" aria-labelledby="cases-heading" className="py-section bg-[#FDFAF4] dark:bg-block-cream scroll-mt-28">
      <div className="max-w-6xl mx-auto px-6 space-y-12">

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

        {/* ── 4 cases principais em linha ── */}
        <div className="space-y-16 md:space-y-24">
          {mainCases.map((card, i) => (
            <CaseRow key={card.href} card={card} index={i} locale={locale} />
          ))}
        </div>

        {/* ── 4 cases compactos em grid 2×2 ── */}
        <div>
          <hr className="border-border mb-12" />
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-10"
          >
            {compactCases.map((card) => (
              <CompactCard key={card.href} card={card} locale={locale} />
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
}
