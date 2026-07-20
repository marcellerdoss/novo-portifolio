import type { Metadata } from 'next';
import fs from 'fs';
import path from 'path';
import { CaseImageFrame } from '@/components/case/CaseImageFrame';
import { Link } from '@/i18n/navigation';
import { CaseMdxContent } from '@/components/case/CaseMdxContent';
import { routing } from '@/i18n/routing';
import { ScrollProgress } from '@/components/ui/ScrollProgress';
import { CasePageShell } from '@/components/case/CasePageShell';
import { Contact } from '@/components/sections/Contact';
import { CaseEditorialWrapper } from '@/components/case/CaseEditorialWrapper';
import { getCaseNav } from '@/lib/casesConfig';
import { CaseOverviewLayout } from '@/components/case/CaseOverviewLayout';
import { buttonVariants } from '@/components/ui/Button';

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === 'en' ? 'Sellbie · CRM Diagnostic Report · Marcelle Rocha' : 'Sellbie · Relatório CRM · Marcelle Rocha',
    description: locale === 'en'
      ? 'Design of Sellbie\'s CRM diagnostic report: Healthscore, integrated funnel and base generator in a tool used by the Customer Success team.'
      : 'Design do relatório de diagnóstico CRM da Sellbie: Healthscore, funil integrado e gerador de base em uma ferramenta usada pelo time de Customer Success.',
    openGraph: {
      title: locale === 'en' ? 'Sellbie · CRM Diagnostic Report' : 'Sellbie · Relatório CRM',
      description: locale === 'en' ? 'Healthscore, integrated funnel and base generator for Sellbie\'s CS team.' : 'Healthscore, funil integrado e gerador de base para o CS da Sellbie.',
      locale: locale === 'en' ? 'en_US' : 'pt_BR',
      type: 'article',
    },
  };
}

const ACCENT_BG   = 'var(--color-project-sellbie-crm-bg)';
const ACCENT_TEXT = 'var(--color-project-sellbie-crm-text)';

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="type-caption text-accent-magenta mb-4">{children}</p>;
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
function CaseImg({ src, alt, caption }: { src: string; alt: string; caption?: string }) {
  return <CaseImageFrame src={src} alt={alt} caption={caption} />;
}

export default async function SellbieCrmPage({ params }: Props) {
  const { locale } = await params;
  const en = locale === 'en';
  const { prev, next } = getCaseNav('sellbie-crm');

  const mdPath = path.join(process.cwd(), 'docs', 'cases', en ? 'sellbie-crm.en.md' : 'sellbie-crm.md');
  const mdSource = fs.existsSync(mdPath)
    ? fs.readFileSync(mdPath, 'utf8').replace(/\]\(\.\.\/\.\.\//g, '](/')
    : '';

  const sidebar = en
    ? [
        { label: 'Company',      content: 'Sellbie' },
        { label: 'User',         content: 'Customer Success' },
        { label: 'Methods',      content: 'Discovery · Design · Handoff' },
        { label: 'Deliverables', content: 'Healthscore · Integrated funnel · Base generator' },
      ]
    : [
        { label: 'Empresa',  content: 'Sellbie' },
        { label: 'Usuário',  content: 'Customer Success' },
        { label: 'Métodos',  content: 'Discovery · Design · Handoff' },
        { label: 'Entregas', content: 'Healthscore · Funil integrado · Gerador de base' },
      ];

  const detailedContent = (
    <CaseEditorialWrapper sidebar={sidebar}>
      {mdSource ? <CaseMdxContent source={mdSource} /> : <p>{en ? 'Detailed content coming soon.' : 'Conteúdo detalhado em breve.'}</p>}
    </CaseEditorialWrapper>
  );

  return (
    <div className="min-h-screen bg-bg">
      <ScrollProgress />

      <header className="pt-section pb-8 px-6 border-b border-border">
        <div className="max-w-5xl mx-auto">
          <Link
            href={{ pathname: '/', hash: '#cases' }}
            className={buttonVariants({ variant: 'secondary', size: 'xs' }) + ' mb-10'}
          >
            {en ? '← All cases' : '← Todos os cases'}
          </Link>

          <h1 className="type-display-lg text-fg mb-6">
            {en ? <>CRM<br />diagnostic report</> : <>Relatório<br />de diagnóstico CRM</>}
          </h1>

          <p className="type-body-lg text-fg-muted max-w-2xl">
            {en
              ? 'Design of a diagnostic tool for Sellbie\'s Customer Success team, with automatic Healthscore, integrated funnel and base generator brought together in a single report that CS uses before each follow-up meeting.'
              : 'Design de uma ferramenta de diagnóstico para o time de Customer Success da Sellbie, com Healthscore automático, funil integrado e gerador de base reunidos em um único relatório que o CS usa antes de cada reunião de acompanhamento.'}
          </p>

          <div className="flex flex-wrap gap-2 mt-6">
            {(en
              ? ['Discovery', 'Opportunity map', 'UX Proposal', 'Figma Make']
              : ['Levantamento', 'Mapa de oportunidades', 'Proposta UX', 'Figma Make']
            ).map(tag => (
              <span key={tag} className="type-caption rounded-full border border-border px-3 py-1 leading-none text-fg-subtle">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </header>

      <CasePageShell detailedContent={detailedContent} prevCase={prev} nextCase={next}>
        <CaseOverviewLayout sidebar={sidebar}>

          <section className="space-y-8">
            <div>
              <Eyebrow>{en ? '01 · Discovery' : '01 · Discovery'}</Eyebrow>
              <SectionHeading>{en ? 'What CS used before the report existed' : 'O que o CS usava antes de existir o relatório'}</SectionHeading>
              <Body>
                {en
                  ? 'Before any wireframe, we mapped what the CS team actually used to prepare a diagnostic meeting: exported spreadsheets, screenshots, manual notes and data fragmented across three different systems. The survey made clear where the friction was: data wasn\'t lacking, consolidation was.'
                  : 'Antes de qualquer wireframe, mapeamos o que o time de CS realmente usava para preparar uma reunião de diagnóstico: planilhas exportadas, prints de tela, anotações manuais e dados fragmentados em três sistemas diferentes. O levantamento deixou claro onde estava o atrito: não faltava dado, faltava consolidação.'}
              </Body>
            </div>
            <CaseImg
              src="/images/cases/sellbie/crm/sellbie-crm-relatorio-mapa-oportunidades.png"
              alt={en ? 'Materials CS used before the report' : 'Materiais que o CS usava antes do relatório'}
              caption={en ? 'Materials CS used before: starting point for understanding gaps.' : 'Materiais que o CS usava antes: ponto de partida para entender lacunas.'}
            />
          </section>

          <Divider />

          <section className="space-y-8">
            <div>
              <Eyebrow>{en ? '02 · Definition' : '02 · Definição'}</Eyebrow>
              <SectionHeading>{en ? 'From problem to expected outcome, without skipping steps' : 'Do problema ao resultado esperado, sem pular etapas'}</SectionHeading>
              <Body>
                {en
                  ? 'The opportunity map translated each friction identified in the discovery into a product gap and connected each gap to a candidate solution and the expected outcome for CS. This mapping was what defined the report\'s scope, and what was left out of the first version.'
                  : 'O mapa de oportunidades traduziu cada atrito identificado no discovery em uma lacuna do produto e conectou cada lacuna a uma solução candidata e ao resultado esperado para o CS. Esse mapeamento foi o que definiu o escopo do relatório, e o que ficou de fora da primeira versão.'}
              </Body>
            </div>
          </section>

          <Divider />

          <section className="space-y-8">
            <div>
              <Eyebrow>{en ? '03 · The solution' : '03 · A solução'}</Eyebrow>
              <SectionHeading>{en ? 'CS arrives at the meeting with the diagnosis ready' : 'O CS chega na reunião com o diagnóstico pronto'}</SectionHeading>
              <Body>
                {en
                  ? 'The dashboard centralizes the client\'s Healthscore, automatic behavior-based recommendations and key usage indicators in one place. CS no longer needs to assemble the diagnosis. They arrive at the meeting to discuss what the report has already identified.'
                  : 'O dashboard centraliza o Healthscore do cliente, as recomendações automáticas baseadas em comportamento e os principais indicadores de uso em um único lugar. O CS não precisa mais montar o diagnóstico. Ele chega à reunião para discutir o que o relatório já identificou.'}
              </Body>
            </div>
            <CaseImg
              src="/images/cases/sellbie/crm/sellbie-crm-relatorio-make-1-dashboard.png"
              alt={en ? 'Diagnostic dashboard with Healthscore and recommendations' : 'Dashboard de diagnóstico com Healthscore e recomendações'}
              caption={en ? 'Diagnostic dashboard: CS arrives at the meeting with Healthscore and recommendations ready.' : 'Dashboard de diagnóstico: CS chega na reunião com Healthscore e recomendações prontas.'}
            />
          </section>

          <Divider />

          <section className="space-y-8">
            <div>
              <Eyebrow>{en ? '04 · Funnel' : '04 · Funil'}</Eyebrow>
              <SectionHeading>{en ? 'The funnel that reveals where the problem is' : 'O funil que revela onde está o problema'}</SectionHeading>
              <Body>
                {en
                  ? 'The most recurring question in CS meetings was always the same: where is the client losing contacts? The integrated funnel answers automatically, highlighting the stage with the biggest drop and suggesting the corresponding action. The bottleneck stopped being something CS had to manually calculate.'
                  : 'A pergunta mais recorrente nas reuniões de CS era sempre a mesma: onde o cliente está perdendo contatos? O funil integrado responde automaticamente, colorindo o estágio com maior queda e sugerindo a ação correspondente. O gargalo deixou de ser algo que o CS precisava calcular manualmente.'}
              </Body>
            </div>
            <CaseImg
              src="/images/cases/sellbie/crm/sellbie-crm-relatorio-make-2-analise-funil-integrado.png"
              alt={en ? 'Integrated funnel with bottleneck visible automatically' : 'Funil integrado com gargalo visível automaticamente'}
              caption={en ? 'Integrated funnel: the bottleneck appears automatically.' : 'Funil integrado: o gargalo aparece automaticamente.'}
            />
          </section>

          <Divider />

          <section className="space-y-8">
            <div>
              <Eyebrow>{en ? '05 · Integrated action' : '05 · Ação integrada'}</Eyebrow>
              <SectionHeading>{en ? 'Diagnosis and action in the same place' : 'Diagnóstico e ação no mesmo lugar'}</SectionHeading>
              <Body>
                {en
                  ? 'The report doesn\'t end at reading. It ends at action. The embedded base generator allows CS to create a contact segment directly from the diagnosis, without switching screens or exporting data. The loop closes within the tool: see the problem, understand the cause and act on it.'
                  : 'O relatório não termina na leitura. Ele termina na ação. O gerador de base embutido permite que o CS crie um segmento de contatos diretamente do diagnóstico, sem trocar de tela ou exportar dados. O loop fecha dentro da ferramenta: ver o problema, entender a causa e agir sobre ela.'}
              </Body>
            </div>
            <CaseImg
              src="/images/cases/sellbie/crm/sellbie-crm-relatorio-make-3-gerador.png"
              alt={en ? 'Base generator within the report' : 'Gerador de base dentro do relatório'}
              caption={en ? 'Base generator within the report: diagnosis and action in the same place.' : 'Gerador de base dentro do relatório: diagnóstico e ação no mesmo lugar.'}
            />
          </section>

          <Divider />

          <section className="space-y-6">
            <Eyebrow>{en ? 'Outcome' : 'Resultado'}</Eyebrow>
            <SectionHeading>{en ? 'A faster meeting and a more informed decision' : 'Uma reunião mais rápida e uma decisão mais fundamentada'}</SectionHeading>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { stat: '3 → 1',      label: { pt: 'Sistemas consultados pelo CS antes de cada reunião',         en: 'Systems consulted by CS before each meeting' } },
                { stat: 'Healthscore', label: { pt: 'Automático: sem cálculo manual pelo analista',              en: 'Automatic: no manual calculation by the analyst' } },
                { stat: '1 tela',     label: { pt: 'Do diagnóstico à geração de base de contatos',               en: 'From diagnosis to contact base generation' } },
              ].map(({ stat, label }) => (
                <div key={label.pt} className="border border-border rounded-[16px] p-8" style={{ backgroundColor: ACCENT_BG }}>
                  <p className="type-headline mb-2" style={{ color: ACCENT_TEXT }}>{stat}</p>
                  <p className="type-body-sm opacity-70" style={{ color: ACCENT_TEXT }}>{en ? label.en : label.pt}</p>
                </div>
              ))}
            </div>
          </section>

        </CaseOverviewLayout>
      </CasePageShell>

      <Contact />
    </div>
  );
}
