/**
 * CaseImagesDemo — visualização dos 7 componentes de case study
 *
 * Como usar: importe e renderize em qualquer página temporária.
 * Substitua PLACEHOLDER pelo src real de cada imagem antes do lançamento.
 *
 * Exemplo de rota de demo:
 *   src/app/[locale]/demo/page.tsx → <CaseImagesDemo />
 */

import { CaseHero } from './CaseHero';
import { CaseBeforeAfter } from './CaseBeforeAfter';
import { CaseEditorial } from './CaseEditorial';
import { CaseBento } from './CaseBento';
import { CaseScrollCanvas } from './CaseScrollCanvas';
import { CaseZoom } from './CaseZoom';
import { CaseLightbox } from './CaseLightbox';

// SVG transparente com borda tracejada — visível sobre qualquer accentBg
const PLACEHOLDER =
  'data:image/svg+xml,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500">' +
    '<rect width="800" height="500" fill="none" stroke="#00000030" stroke-width="2" stroke-dasharray="12,8" rx="6"/>' +
    '<text x="50%" y="50%" font-family="system-ui,sans-serif" font-size="16" fill="#00000050" text-anchor="middle" dominant-baseline="middle">placeholder</text>' +
    '</svg>',
  );

// Placeholder largo para o scroll canvas (simula sitemap)
const PLACEHOLDER_WIDE =
  'data:image/svg+xml,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="3200" height="800">' +
    '<rect width="3200" height="800" fill="none" stroke="#00000020" stroke-width="2" stroke-dasharray="16,10" rx="6"/>' +
    '<text x="50%" y="50%" font-family="system-ui,sans-serif" font-size="20" fill="#00000040" text-anchor="middle" dominant-baseline="middle">sitemap · arraste para explorar · 3200 × 800px</text>' +
    '</svg>',
  );

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section>
      <p className="type-caption text-fg-subtle mb-6">{label}</p>
      {children}
    </section>
  );
}

export function CaseImagesDemo() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-section space-y-24">
      <header>
        <h1 className="type-headline text-fg mb-2">
          Demo — Componentes de imagem para cases
        </h1>
        <p className="type-body-sm text-fg-muted">
          Todos os componentes usam a prop <code>accentBg</code> para o fundo colorido e{' '}
          <code>unoptimized</code> para os placeholders SVG. Remova{' '}
          <code>unoptimized</code> ao usar imagens reais.
        </p>
      </header>

      {/* 1 — CaseHero */}
      <Section label="1 — CaseHero · Full-width, 480px desktop / 260px mobile">
        <CaseHero
          imageSrc={PLACEHOLDER}
          imageAlt="Tela principal do projeto"
          caption="Tela de campanhas · Redesign · Figma"
          accentBg="var(--color-block-cream)"
          accentText="#000000"
          unoptimized
        />
      </Section>

      {/* 2 — CaseBeforeAfter */}
      <Section label="2 — CaseBeforeAfter · Grid 2 colunas com badges Antes / Depois">
        <CaseBeforeAfter
          imageBefore={PLACEHOLDER}
          imageAfter={PLACEHOLDER}
          altBefore="Tela antes do redesign"
          altAfter="Tela depois do redesign"
          captionBefore="Fluxo original — 7 etapas sem saída"
          captionAfter="Fluxo redesenhado — 3 etapas lineares"
          accentBg="var(--color-block-cream)"
          accentText="#000000"
          unoptimized
        />
      </Section>

      {/* 3 — CaseEditorial (normal) */}
      <Section label="3a — CaseEditorial · Imagem à esquerda, texto à direita">
        <CaseEditorial
          imageSrc={PLACEHOLDER}
          imageAlt="Tela de detalhes do produto"
          title="Do diagnóstico ao fluxo ideal"
          body="Antes do redesign, o usuário precisava navegar por 6 telas diferentes para concluir uma tarefa simples. Mapeamos os pontos de abandono com dados de sessão e redesenhamos o fluxo em 2 etapas diretas."
          accentBg="var(--color-block-cream)"
          accentText="#000000"
          unoptimized
        />
      </Section>

      {/* 3 — CaseEditorial (reversed) */}
      <Section label="3b — CaseEditorial · reverse — Texto à esquerda, imagem à direita">
        <CaseEditorial
          imageSrc={PLACEHOLDER}
          imageAlt="Componente de filtros"
          title="Sistema de filtros modular"
          body="Criamos um sistema de filtros baseado em componentes atômicos, permitindo que qualquer tela do produto use a mesma lógica de seleção sem duplicar código ou comportamento."
          reverse
          accentBg="var(--color-block-cream)"
          accentText="#000000"
          unoptimized
        />
      </Section>

      {/* 4 — CaseBento */}
      <Section label="4 — CaseBento · Grid assimétrico: 1 principal + 2 menores">
        <CaseBento
          mainImage={PLACEHOLDER}
          mainAlt="Tela principal do dashboard"
          mainCaption="Dashboard principal · v3"
          images={[
            { src: PLACEHOLDER, alt: 'Componente de métricas', caption: 'Widget de métricas' },
            { src: PLACEHOLDER, alt: 'Painel de filtros', caption: 'Painel lateral' },
          ]}
          accentBg="var(--color-block-coral)"
          accentText="#000000"
          unoptimized
        />
      </Section>

      {/* 5 — CaseScrollCanvas */}
      <Section label="5 — CaseScrollCanvas · Scroll horizontal para sitemaps e fluxos">
        <CaseScrollCanvas
          imageSrc={PLACEHOLDER_WIDE}
          imageAlt="Sitemap completo do produto"
          title="Arquitetura de informação · v2"
          containerHeight={320}
          accentBg="var(--color-block-cream)"
          accentText="#000000"
        />
      </Section>

      {/* 6 — CaseZoom */}
      <Section label="6 — CaseZoom · Visão geral com marcador + recorte ampliado">
        <CaseZoom
          imageSrc={PLACEHOLDER}
          imageAlt="Tela de configurações"
          zoomLabel="seção de permissões"
          zoomPosition="top center"
          markerStyle={{ top: '30%', left: '20%', width: '45%', height: '35%' }}
          accentBg="var(--color-block-pink)"
          accentText="#000000"
          unoptimized
        />
      </Section>

      {/* 7 — CaseLightbox */}
      <Section label="7 — CaseLightbox · Clique para ampliar em overlay">
        <div className="max-w-xl">
          <CaseLightbox
            imageSrc={PLACEHOLDER}
            imageAlt="Protótipo de alta fidelidade"
            caption="Protótipo · Figma · Fluxo de onboarding"
            height={340}
            accentBg="var(--color-block-navy)"
            accentText="#ffffff"
            unoptimized
          />
        </div>
      </Section>
    </div>
  );
}
