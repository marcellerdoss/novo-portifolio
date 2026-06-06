import type { Metadata } from 'next';
import fs from 'fs';
import path from 'path';
import { Link } from '@/i18n/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { routing } from '@/i18n/routing';
import { ScrollProgress } from '@/components/ui/ScrollProgress';
import { CaseHero } from '@/components/case/CaseHero';
import { CaseEditorial } from '@/components/case/CaseEditorial';
import { CaseLightbox } from '@/components/case/CaseLightbox';
import { CasePageShell } from '@/components/case/CasePageShell';
import { CaseEditorialWrapper } from '@/components/case/CaseEditorialWrapper';
import { getCaseNav } from '@/lib/casesConfig';
import { CaseOverviewLayout } from '@/components/case/CaseOverviewLayout';

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: 'Sellbie — Relatório CRM · Marcelle Rocha',
    description:
      'Design do relatório de diagnóstico CRM da Sellbie — Healthscore, funil integrado e gerador de base em uma ferramenta usada pelo time de Customer Success.',
    openGraph: {
      title: 'Sellbie — Relatório CRM',
      description:
        'Healthscore, funil integrado e gerador de base para o CS da Sellbie.',
      locale: locale === 'en' ? 'en_US' : 'pt_BR',
      type: 'article',
    },
  };
}

const ACCENT_BG   = 'var(--color-project-sellbie-crm-bg)';
const ACCENT_TEXT = 'var(--color-project-sellbie-crm-text)';

/* ─── Layout helpers ─────────────────────────────────────── */

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="type-caption text-fg-subtle mb-4">{children}</p>;
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return <h2 className="type-headline text-fg mb-6">{children}</h2>;
}

function Body({ children }: { children: React.ReactNode }) {
  return <p className="type-body text-fg-muted">{children}</p>;
}

function Divider() {
  return <hr className="border-border" />;
}

/* ─── Page ───────────────────────────────────────────────── */

export default async function SellbieCrmPage() {
  const { prev, next } = getCaseNav('sellbie-crm');

  const mdPath = path.join(process.cwd(), 'docs', 'cases', 'sellbie-crm.md');
  const mdSource = fs.existsSync(mdPath)
    ? fs.readFileSync(mdPath, 'utf8').replace(/\]\(\.\.\/\.\.\//g, '](/')
    : '';

  const detailedContent = (
    <CaseEditorialWrapper
      sidebar={[
        { label: 'Empresa', content: 'Sellbie' },
        { label: 'Período', content: '2024' },
        { label: 'Papel', content: 'Product Designer' },
        { label: 'Usuário', content: 'Customer Success' },
        { label: 'Métodos', content: 'Discovery · Design · Handoff' },
        { label: 'Entregas', content: 'Healthscore · Funil integrado · Gerador de base' },
      ]}
    >
      {mdSource ? <MDXRemote source={mdSource} /> : <p>Conteúdo detalhado em breve.</p>}
    </CaseEditorialWrapper>
  );

  return (
    <>
      <ScrollProgress />

      <CasePageShell detailedContent={detailedContent} prevCase={prev} nextCase={next}>
        <div className="min-h-screen bg-bg">
        {/* ── Case header ───────────────────────────────── */}
        <header className="py-section px-6 border-b border-border">
          <div className="max-w-5xl mx-auto">
            <Link
              href="/#cases"
              className="type-caption text-fg-subtle hover:text-fg transition-colors mb-10 inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fg rounded"
            >
              ← Todos os cases
            </Link>

            <div className="flex flex-wrap items-start gap-3 mb-8">
              <span
                className="type-caption rounded-full px-3 py-1.5 leading-none"
                style={{ backgroundColor: ACCENT_BG, color: ACCENT_TEXT }}
              >
                CRM · Customer Success
              </span>
              <span className="type-caption text-fg-subtle">2024</span>
              <span className="type-caption text-fg-subtle">Sellbie</span>
            </div>

            <h1 className="type-display-lg text-fg mb-6">
              Relatório<br />de diagnóstico CRM
            </h1>

            <p className="type-body-lg text-fg-muted max-w-2xl">
              Design de uma ferramenta de diagnóstico para o time de Customer
              Success da Sellbie — Healthscore automático, funil integrado e
              gerador de base reunidos em um único relatório que o CS usa
              antes de cada reunião de acompanhamento.
            </p>

            <div className="flex flex-wrap gap-2 mt-6">
              {['Levantamento', 'Mapa de oportunidades', 'Proposta UX', 'Figma Make'].map(tag => (
                <span key={tag} className="type-caption rounded-full border border-border px-3 py-1.5 leading-none text-fg-subtle">
                  {tag}
                </span>
              ))}
            </div>

            <dl className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-12 pt-8 border-t border-border">
              {[
                { label: 'Papel', value: 'Product Designer' },
                { label: 'Usuário', value: 'Time de Customer Success' },
                { label: 'Entregas', value: 'Discovery · Design · Handoff' },
              ].map(({ label, value }) => (
                <div key={label}>
                  <dt className="type-caption text-fg-subtle mb-1">{label}</dt>
                  <dd className="type-body-sm text-fg font-[480]">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </header>

        {/* ── Sections ──────────────────────────────────── */}
        <CaseOverviewLayout
          sidebar={[
            { label: 'Empresa', content: 'Sellbie' },
            { label: 'Período', content: '2024' },
            { label: 'Papel', content: 'Product Designer' },
            { label: 'Usuário', content: 'Customer Success' },
            { label: 'Métodos', content: 'Discovery · Design · Handoff' },
            { label: 'Entregas', content: 'Healthscore · Funil integrado · Gerador de base' },
          ]}
        >

            {/* ── 1. Levantamento ──────────────────────── */}
            <section className="space-y-8">
              <div>
                <Eyebrow>01 · Discovery</Eyebrow>
                <SectionHeading>O que o CS usava antes de existir o relatório</SectionHeading>
                <Body>
                  Antes de qualquer wireframe, mapeamos o que o time de CS
                  realmente usava para preparar uma reunião de diagnóstico —
                  planilhas exportadas, prints de tela, anotações manuais e
                  dados fragmentados em três sistemas diferentes. O
                  levantamento deixou claro onde estava o atrito: não faltava
                  dado, faltava consolidação.
                </Body>
              </div>

              {/* [imagem: levantamento] */}
              <CaseHero
                imageSrc="/images/cases/sellbie/crm/sellbie-crm-relatorio-mapa-oportunidades.png"
                imageAlt="Materiais que o CS usava antes do relatório"
                caption="Materiais que o CS usava antes — ponto de partida para entender lacunas."
                accentBg={ACCENT_BG}
                accentText={ACCENT_TEXT}
              />
            </section>

            <Divider />

            {/* ── 2. Mapa de oportunidades ─────────────── */}
            <section className="space-y-8">
              <div>
                <Eyebrow>02 · Definição</Eyebrow>
                <SectionHeading>Do problema ao resultado esperado — sem pular etapas</SectionHeading>
                <Body>
                  O mapa de oportunidades traduziu cada atrito identificado no
                  discovery em uma lacuna do produto e conectou cada lacuna a
                  uma solução candidata e ao resultado esperado para o CS.
                  Esse mapeamento foi o que definiu o escopo do relatório —
                  e o que ficou de fora da primeira versão.
                </Body>
              </div>

              {/* [imagem: mapa-oportunidades] */}
              <CaseLightbox
                imageSrc="/images/cases/sellbie/crm/sellbie-crm-relatorio-mapa-oportunidades.png"
                imageAlt="Mapa de oportunidades com problemas e soluções conectados"
                caption="Mapa de oportunidades — cada problema conectado a solução e resultado esperado."
                height={360}
                accentBg={ACCENT_BG}
                accentText={ACCENT_TEXT}
              />
            </section>

            <Divider />

            {/* ── 3. Dashboard de diagnóstico ──────────── */}
            <section className="space-y-8">
              <div>
                <Eyebrow>03 · A solução</Eyebrow>
                <SectionHeading>O CS chega na reunião com o diagnóstico pronto</SectionHeading>
                <Body>
                  O dashboard centraliza o Healthscore do cliente, as
                  recomendações automáticas baseadas em comportamento e os
                  principais indicadores de uso em um único lugar. O CS não
                  precisa mais montar o diagnóstico — ele chega à reunião
                  para discutir o que o relatório já identificou.
                </Body>
              </div>

              {/* [imagem: dashboard-diagnostico] */}
              <CaseHero
                imageSrc="/images/cases/sellbie/crm/sellbie-crm-relatorio-make-1-dashboard.png"
                imageAlt="Dashboard de diagnóstico com Healthscore e recomendações"
                caption="Dashboard de diagnóstico — CS chega na reunião com Healthscore e recomendações prontas."
                accentBg={ACCENT_BG}
                accentText={ACCENT_TEXT}
              />
            </section>

            <Divider />

            {/* ── 4. Funil integrado ───────────────────── */}
            <section className="space-y-8">
              <div>
                <Eyebrow>04 · Funil</Eyebrow>
                <SectionHeading>O funil que revela onde está o problema</SectionHeading>
                <Body>
                  A pergunta mais recorrente nas reuniões de CS era sempre a
                  mesma: onde o cliente está perdendo contatos? O funil
                  integrado responde automaticamente, colorindo o estágio com
                  maior queda e sugerindo a ação correspondente. O gargalo
                  deixou de ser algo que o CS precisava calcular manualmente.
                </Body>
              </div>

              {/* [imagem: funil] */}
              <CaseEditorial
                imageSrc="/images/cases/sellbie/crm/sellbie-crm-relatorio-make-2-analise-funil-integrado.png"
                imageAlt="Funil integrado com gargalo visível automaticamente"
                title="O funil que revela onde está o problema"
                body="Funil integrado — o gargalo aparece automaticamente."
                reverse={true}
                accentBg={ACCENT_BG}
                accentText={ACCENT_TEXT}
              />
            </section>

            <Divider />

            {/* ── 5. Gerador de base ───────────────────── */}
            <section className="space-y-8">
              <div>
                <Eyebrow>05 · Ação integrada</Eyebrow>
                <SectionHeading>Diagnóstico e ação no mesmo lugar</SectionHeading>
                <Body>
                  O relatório não termina na leitura — ele termina na ação.
                  O gerador de base embutido permite que o CS crie um segmento
                  de contatos diretamente do diagnóstico, sem trocar de tela
                  ou exportar dados. O loop fecha dentro da ferramenta: ver o
                  problema, entender a causa e agir sobre ela.
                </Body>
              </div>

              {/* [imagem: gerador] */}
              <CaseLightbox
                imageSrc="/images/cases/sellbie/crm/sellbie-crm-relatorio-make-3-gerador.png"
                imageAlt="Gerador de base dentro do relatório"
                caption="Gerador de base dentro do relatório — diagnóstico e ação no mesmo lugar."
                height={340}
                accentBg={ACCENT_BG}
                accentText={ACCENT_TEXT}
              />
            </section>

            <Divider />

            {/* ── Resultado ─────────────────────────────── */}
            <section className="space-y-6">
              <Eyebrow>Resultado</Eyebrow>
              <SectionHeading>Uma reunião mais rápida e uma decisão mais fundamentada</SectionHeading>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { stat: '3 → 1', label: 'Sistemas consultados pelo CS antes de cada reunião' },
                  { stat: 'Healthscore', label: 'Automático — sem cálculo manual pelo analista' },
                  { stat: '1 tela', label: 'Do diagnóstico à geração de base de contatos' },
                ].map(({ stat, label }) => (
                  <div
                    key={label}
                    className="bg-block-mint border border-border rounded-[16px] p-8"
                  >
                    <p className="type-headline text-fg mb-2">{stat}</p>
                    <p className="type-body-sm text-fg-muted">{label}</p>
                  </div>
                ))}
              </div>
            </section>

        </CaseOverviewLayout>
      </div>
      </CasePageShell>
    </>
  );
}
