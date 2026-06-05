'use client';

import { motion } from 'framer-motion';
import { CaseCard } from '@/components/cases/CaseCard';
import { CaseCardCompact } from '@/components/cases/CaseCardCompact';
import type { Case } from '@/lib/types';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type Props = { cases?: Case[] };

export function CasesSection(_props: Props) {
  return (
    <section id="cases" aria-labelledby="cases-heading" className="py-section px-6 bg-canvas dark:bg-surface-tile-2">
      <div className="max-w-6xl mx-auto space-y-20">

        {/* ── Sellbie ──────────────────────────────────────────── */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h2
              id="cases-heading"
              className="type-display-lg text-fg"
            >
              Sellbie
            </h2>
            <p className="type-body text-fg-muted mt-2">
              Plataforma de CRM e marketing para o varejo
            </p>
          </motion.div>

          {/* Main cases — 2-col grid */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4"
          >
            <CaseCard
              category="Product Design"
              title="Redesign do core da plataforma Sellbie"
              description="Navegação, campanhas e criação de envio redesenhados do zero"
              tags={['UX Research', 'Redesign', 'Design System']}
              href="/cases/sellbie-redesign"
              imageSrc="/images/cases/sellbie-redesign-preview.png"
              imageAlt="Tela principal do redesign da plataforma Sellbie"
              accentBg="var(--color-project-sellbie-redesign-bg)"
              accentText="var(--color-project-sellbie-redesign-text)"
            />
            <CaseCard
              category="Product Design"
              title="Jornadas — automação de comunicação multicanal"
              description="Produto novo para orquestrar jornadas com gatilhos comportamentais"
              tags={['Produto Novo', 'Workflow', 'Multicanal']}
              href="/cases/sellbie-jornadas"
              imageSrc="/images/cases/sellbie-jornadas-preview.png"
              imageAlt="Canvas de criação de jornada na plataforma Sellbie"
              accentBg="var(--color-project-sellbie-jornadas-bg)"
              accentText="var(--color-project-sellbie-jornadas-text)"
            />
          </motion.div>

          {/* Compact cases — 2-col / 4-col grid */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4"
          >
            <CaseCardCompact
              category="Arquitetura de navegação"
              label="Foundations"
              title="Arquitetura de informação"
              tags={['Card Sorting', 'IA', 'Navegação']}
              href="/cases/sellbie-arq-info"
              imageSrc="/images/cases/sellbie-arq-info-preview.png"
              imageAlt="Board de card sorting da arquitetura de informação"
              accentBg="var(--color-project-sellbie-arq-info-bg)"
              accentText="var(--color-project-sellbie-arq-info-text)"
            />
            <CaseCardCompact
              category="Framework de métricas"
              label="Strategy"
              title="Métricas de produto com HEART"
              tags={['HEART', 'OKR', 'Produto']}
              href="/cases/sellbie-metricas"
              imageSrc="/images/cases/sellbie-metricas-preview.png"
              imageAlt="Framework HEART estruturado no FigJam"
              accentBg="var(--color-project-sellbie-metricas-bg)"
              accentText="var(--color-project-sellbie-metricas-text)"
            />
            <CaseCardCompact
              category="Relatório estratégico"
              label="Strategy"
              title="CRM — Relatório de performance"
              tags={['CRM', 'Figma Make', 'CS']}
              href="/cases/sellbie-crm"
              imageSrc="/images/cases/sellbie-crm-preview.png"
              imageAlt="Dashboard de diagnóstico CRM no Figma Make"
              accentBg="var(--color-project-sellbie-crm-bg)"
              accentText="var(--color-project-sellbie-crm-text)"
            />
            <CaseCardCompact
              category="Relatório estratégico"
              label="Strategy"
              title="Cashback — Relatório de ROAS"
              tags={['Cashback', 'ROAS', 'Figma Make']}
              href="/cases/sellbie-cashback"
              imageSrc="/images/cases/sellbie-cashback-preview.png"
              imageAlt="Dashboard de ROAS do programa de cashback"
              accentBg="var(--color-project-sellbie-cashback-bg)"
              accentText="var(--color-project-sellbie-cashback-text)"
            />
          </motion.div>
        </div>

        {/* ── Jovens Gênios ─────────────────────────────────────── */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h2 className="type-display-lg text-fg">Jovens Gênios</h2>
            <p className="type-body text-fg-muted mt-2">
              Plataforma de educação adaptativa para o Ensino Fundamental
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <CaseCard
              category="Product Design"
              title="JG Alfabetização — sistema pedagógico e modelos de questão"
              description="Fases, modelos de questão e matriz de proficiência para IA adaptativa"
              tags={['Educação', 'IA', 'Design System']}
              href="/cases/jg-alfabetizacao"
              imageSrc="/images/cases/jg-alfabetizacao-preview.png"
              imageAlt="Modelos de questão do sistema de alfabetização"
              accentBg="var(--color-project-jg-alfabetizacao-bg)"
              accentText="var(--color-project-jg-alfabetizacao-text)"
            />
            <CaseCard
              category="Product Design"
              title="Central de Ajuda — experiência segmentada por perfil"
              description="Três entradas de persona, busca contextual e empty states com saída"
              tags={['Help Center', 'UX', 'Navegação']}
              href="/cases/jg-central-ajuda"
              imageSrc="/images/cases/jg-central-ajuda-preview.png"
              imageAlt="Página inicial da central de ajuda com atalhos por perfil"
              accentBg="var(--color-project-jg-central-ajuda-bg)"
              accentText="var(--color-project-jg-central-ajuda-text)"
            />
          </motion.div>
        </div>

      </div>
    </section>
  );
}