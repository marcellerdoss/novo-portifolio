'use client';

import { motion } from 'framer-motion';
import { CaseCard } from '@/components/cases/CaseCard';
import { CaseCardCompact } from '@/components/cases/CaseCardCompact';
import type { Case } from '@/lib/types';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type Props = { cases?: Case[] };

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
    </motion.div>
  );
}

export function CasesSection(_props: Props) {
  return (
    <section id="cases" aria-labelledby="cases-heading" className="py-section px-6 bg-surface-soft">
      <div className="max-w-6xl mx-auto space-y-20">

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
            title="Product Design"
            description="Interfaces, fluxos e produtos construídos ou redesenhados"
          />

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <CaseCard
              company="Sellbie"
              category="Product Design"
              title="Redesign do core da plataforma"
              description="Navegação, campanhas e criação de envio redesenhados do zero"
              tags={['UX Research', 'Redesign', 'Omnichannel']}
              href="/cases/sellbie-redesign"
              imageSrc="/images/cases/sellbie/redesign/sellbie-redesign-preview.png"
              imageAlt="Tela principal do redesign da plataforma Sellbie"
              accentBg="var(--color-block-cream)"
              accentText="var(--color-project-sellbie-redesign-text)"
              mockup="desktop"
            />
            <CaseCard
              company="Sellbie"
              category="Product Design"
              title="Jornadas de automação multicanal"
              description="Canvas de fluxo com 20+ gatilhos, múltiplos canais e lógica comportamental"
              tags={['Produto Novo', 'IA & Automação', 'Workflow']}
              href="/cases/sellbie-jornadas"
              imageSrc="/images/cases/sellbie/jornadas/sellbie-jornadas-preview.png"
              imageAlt="Canvas de criação de jornada na plataforma Sellbie"
              accentBg="var(--color-block-cream)"
              accentText="var(--color-project-sellbie-jornadas-text)"
              mockup="desktop"
            />
            <CaseCard
              company="Jovens Gênios"
              category="Product Design"
              title="JG Alfabetização: sistema pedagógico e modelos de questão"
              description="Fases, modelos de questão e matriz de proficiência para IA adaptativa"
              tags={['UX Research', 'BNCC', 'Design System']}
              href="/cases/jg-alfabetizacao"
              imageSrc="/images/cases/jovens-genios/alfabetizacao/jg-alfabetizacao-preview.png"
              imageAlt="Modelos de questão do sistema de alfabetização"
              accentBg="var(--color-block-cream)"
              accentText="var(--color-project-jg-alfabetizacao-text)"
              mockup="mobile"
            />
            <CaseCard
              company="Jovens Gênios"
              category="Product Design"
              title="Central de Ajuda segmentada por perfil"
              description="Três perfis, busca filtrada e empty states que mantêm o usuário no caminho"
              tags={['Arquitetura de Informação', 'Pesquisa', 'Personalização']}
              href="/cases/jg-central-ajuda"
              imageSrc="/images/cases/jovens-genios/central-de-ajuda/jg-central-ajuda-preview.png"
              imageAlt="Página inicial da central de ajuda com atalhos por perfil"
              accentBg="var(--color-block-cream)"
              accentText="var(--color-project-jg-central-ajuda-text)"
              mockup="desktop"
            />
          </motion.div>
        </div>

        {/* ── Strategy ────────────────────────────────────────── */}
        <div>
          <GroupHeader
            title="Strategy"
            description="Produto orientado por dados, métricas e decisão"
          />

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            <CaseCardCompact
              company="Sellbie"
              category="Framework de métricas"
              label="Strategy"
              title="Métricas de produto com HEART"
              tags={['HEART', 'OKR', 'Produto']}
              href="/cases/sellbie-metricas"
              imageSrc="/images/cases/sellbie/metricas/sellbie-metricas-preview.png"
              imageAlt="Framework HEART estruturado no FigJam"
              accentBg="var(--color-block-cream)"
              accentText="var(--color-project-sellbie-metricas-text)"
              mockup="desktop"
            />
            <CaseCardCompact
              company="Sellbie"
              category="Relatório estratégico"
              label="Strategy"
              title="Relatório de performance CRM"
              tags={['Mapa de oportunidades', 'Figma Make', 'CS']}
              href="/cases/sellbie-crm"
              imageSrc="/images/cases/sellbie/crm/sellbie-crm-preview.png"
              imageAlt="Dashboard de diagnóstico CRM no Figma Make"
              accentBg="var(--color-block-cream)"
              accentText="var(--color-project-sellbie-crm-text)"
              mockup="desktop"
            />
            <CaseCardCompact
              company="Sellbie"
              category="Relatório estratégico"
              label="Strategy"
              title="Cashback: Relatório de ROAS"
              tags={['Entrevistas com CS', 'ROAS', 'Figma Make']}
              href="/cases/sellbie-cashback"
              imageSrc="/images/cases/sellbie/cashback/sellbie-cashback-preview.png"
              imageAlt="Dashboard de ROAS do programa de cashback"
              accentBg="var(--color-block-cream)"
              accentText="var(--color-project-sellbie-cashback-text)"
              mockup="desktop"
            />
          </motion.div>
        </div>

        {/* ── Foundations ─────────────────────────────────────── */}
        <div>
          <GroupHeader
            title="Foundations"
            description="Estrutura e arquitetura que sustentam o produto"
          />

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            <CaseCardCompact
              company="Sellbie"
              category="Arquitetura de navegação"
              label="Foundations"
              title="Arquitetura de informação"
              tags={['Card Sorting', 'IA', 'Navegação']}
              href="/cases/sellbie-arq-info"
              imageSrc="/images/cases/sellbie/arquitetura/sellbie-arq-info-preview.png"
              imageAlt="Board de card sorting da arquitetura de informação"
              accentBg="var(--color-block-cream)"
              accentText="var(--color-project-sellbie-arq-info-text)"
              mockup="desktop"
            />
          </motion.div>
        </div>

      </div>
    </section>
  );
}
