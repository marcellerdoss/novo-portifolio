import type { Metadata } from 'next';
import fs from 'fs';
import path from 'path';
import { CaseImageFrame } from '@/components/case/CaseImageFrame';
import { CaseCarousel } from '@/components/case/CaseCarousel';
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
    title: locale === 'en' ? 'Sellbie · Cashback & Loyalty · Marcelle Rocha' : 'Sellbie · Cashback · Marcelle Rocha',
    description: locale === 'en'
      ? 'Design of Sellbie\'s cashback module: operational ROAS, pricing and intelligence reports that transformed cashback into a decision tool.'
      : 'Design do módulo de cashback da Sellbie: ROAS operacional, precificação e relatórios de inteligência que transformaram cashback em ferramenta de decisão.',
    openGraph: {
      title: locale === 'en' ? 'Sellbie · Cashback & Loyalty' : 'Sellbie · Cashback',
      description: locale === 'en' ? 'Operational ROAS, pricing and intelligence reports for Sellbie\'s cashback module.' : 'ROAS operacional, precificação e relatórios de inteligência para o módulo de cashback da Sellbie.',
      locale: locale === 'en' ? 'en_US' : 'pt_BR',
      type: 'article',
    },
  };
}

const ACCENT_BG   = 'var(--color-project-sellbie-cashback-bg)';
const ACCENT_TEXT = 'var(--color-project-sellbie-cashback-text)';

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

export default async function SellbieCashbackPage({ params }: Props) {
  const { locale } = await params;
  const en = locale === 'en';
  const { prev, next } = getCaseNav('sellbie-cashback');

  const mdPath = path.join(process.cwd(), 'docs', 'cases', en ? 'sellbie-cashback.en.md' : 'sellbie-cashback.md');
  const mdSource = fs.existsSync(mdPath)
    ? fs.readFileSync(mdPath, 'utf8').replace(/\]\(\.\.\/\.\.\//g, '](/')
    : '';

  const sidebar = en
    ? [
        { label: 'Company',      content: 'Sellbie' },
        { label: 'Users',        content: 'Commercial · Finance · CS' },
        { label: 'Methods',      content: 'Discovery · Interviews · Reports' },
        { label: 'Deliverables', content: 'Operational ROAS · Pricing · Handoff' },
      ]
    : [
        { label: 'Empresa',   content: 'Sellbie' },
        { label: 'Usuários',  content: 'Comercial · Financeiro · CS' },
        { label: 'Métodos',   content: 'Discovery · Entrevistas · Relatórios' },
        { label: 'Entregas',  content: 'ROAS operacional · Precificação · Handoff' },
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
            {en
              ? <>Cashback as<br />an intelligence product</>
              : <>Cashback como<br />produto de inteligência</>}
          </h1>

          <p className="type-body-lg text-fg-muted max-w-2xl">
            {en
              ? 'How we transformed Sellbie\'s cashback module from a simple benefit into a decision-making tool, with operational ROAS, pricing analysis and reports that the commercial and financial teams started using for real.'
              : 'Como transformamos o módulo de cashback da Sellbie de um benefício simples em uma ferramenta de decisão, com ROAS operacional, análise de precificação e relatórios que o time comercial e financeiro passaram a usar de verdade.'}
          </p>

          <div className="flex flex-wrap gap-2 mt-6">
            {(en
              ? ['CS Interviews', 'Strategic plan', 'ROAS Dashboard', 'Pricing Report', 'Figma Make']
              : ['Entrevistas com CS', 'Plano estratégico', 'Dashboard de ROAS', 'Relatório de Precificação', 'Figma Make']
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
              <SectionHeading>{en ? 'The manual effort that preceded any structure' : 'O esforço manual que antecedeu qualquer estrutura'}</SectionHeading>
              <Body>
                {en
                  ? 'Before any report existed, the commercial team calculated cashback return by combining spreadsheet exports with financial system data manually. The discovery mapped this effort in detail: each source, each intermediate calculation, each question that remained unanswered due to lack of consolidated data.'
                  : 'Antes de existir qualquer relatório, o time comercial calculava o retorno do cashback combinando exportações de planilha com dados do sistema financeiro de forma manual. O discovery mapeou esse esforço em detalhes: cada fonte, cada cálculo intermediário, cada pergunta que ficava sem resposta por falta de dado consolidado.'}
              </Body>
            </div>
            <CaseImg
              src="/images/cases/sellbie/cashback/sellbie-cashback-discovery-materiais.png"
              alt={en ? 'Discovery materials before any data structure' : 'Materiais do discovery antes de qualquer estrutura de dados'}
              caption={en ? 'Discovery materials: manual effort before any data structure.' : 'Materiais do discovery: esforço manual antes de qualquer estrutura de dados.'}
            />
          </section>

          <Divider />

          <section className="space-y-8">
            <div>
              <Eyebrow>{en ? '02 · Definition' : '02 · Definição'}</Eyebrow>
              <SectionHeading>{en ? 'Seven dimensions that would redefine the product' : 'Sete dimensões que redefiniriam o produto'}</SectionHeading>
              <Body>
                {en
                  ? 'The opportunity map structured everything cashback could answer if the data were organized correctly. Seven dimensions (from redemption behavior to churn analysis by program) defined the report scope and the priority order of construction. Cashback stopped being a benefit and became a vector of commercial intelligence.'
                  : 'O mapa de oportunidades estruturou tudo que o cashback poderia responder se os dados estivessem organizados corretamente. Sete dimensões (de comportamento de resgate a análise de churn por programa) definiram o escopo dos relatórios e a ordem de prioridade de construção. O cashback deixou de ser um benefício e passou a ser um vetor de inteligência comercial.'}
              </Body>
            </div>
            <CaseImg
              src="/images/cases/sellbie/cashback/sellbie-cashback-mapa-oportunidades.png"
              alt={en ? 'Opportunity map with seven cashback dimensions' : 'Mapa de oportunidades com sete dimensões do cashback'}
              caption={en ? 'Opportunity map: seven dimensions that transformed cashback into an intelligence product.' : 'Mapa de oportunidades: sete dimensões que transformaram o cashback em produto de inteligência.'}
            />
          </section>

          <Divider />

          <section className="space-y-8">
            <div>
              <Eyebrow>{en ? '03 · Return on investment' : '03 · Retorno sobre investimento'}</Eyebrow>
              <SectionHeading>{en ? 'Operational ROAS: the return cashback actually generates' : 'ROAS operacional: o retorno que o cashback realmente gera'}</SectionHeading>
              <Body>
                {en
                  ? 'The first report answered the commercial team\'s most urgent question: how much does cashback return in revenue for each real granted? Operational ROAS consolidates attributed revenue, redemption volume and expired cashback in a single panel, and details the return by program strategy and customer behavior.'
                  : 'O primeiro relatório respondeu à pergunta mais urgente do time comercial: quanto o cashback retorna em faturamento para cada real concedido? O ROAS operacional consolida faturamento atribuído, volume de resgate e cashback expirado em um único painel, e detalha o retorno por estratégia de programa e por comportamento de cliente.'}
              </Body>
            </div>
            <CaseCarousel
              images={[
                { src: '/images/cases/sellbie/cashback/sellbie-cashback-relatorio-roas-make-1-dashboard.png', alt: en ? 'Operational ROAS: revenue, redemption and expired cashback on one screen' : 'ROAS operacional: faturamento, resgate e cashback expirado em uma tela' },
                { src: '/images/cases/sellbie/cashback/sellbie-cashback-relatorio-roas-make-2-dashboard.png', alt: en ? 'ROAS by strategy: which action performs best' : 'ROAS por estratégia: qual ação performa melhor' },
                { src: '/images/cases/sellbie/cashback/sellbie-cashback-relatorio-roas-make-3-dashboard.png', alt: en ? 'ROAS by behavior: does cashback actually change what the customer does?' : 'ROAS por comportamento: o cashback realmente muda o que o cliente faz?' },
              ]}
              caption={en ? 'Operational ROAS, by Strategy and by Behavior: the return cashback actually generates' : 'ROAS Operacional, por Estratégia e por Comportamento: o retorno que o cashback realmente gera'}
            />
          </section>

          <Divider />

          <section className="space-y-8">
            <div>
              <Eyebrow>{en ? '04 · Pricing' : '04 · Precificação'}</Eyebrow>
              <SectionHeading>{en ? 'From margin to contract: everything in the same report' : 'Da margem ao contrato: tudo no mesmo relatório'}</SectionHeading>
              <Body>
                {en
                  ? 'The pricing report was built for the financial and commercial team that needed to track the profitability of each active cashback contract. The executive dashboard gives the consolidated view; the contract register details the negotiated conditions; the billing report closes the cycle showing actual versus contracted.'
                  : 'O relatório de precificação foi construído para o time financeiro e comercial que precisava acompanhar a rentabilidade de cada contrato de cashback ativo. O dashboard executivo dá a visão consolidada; o cadastro de contratos detalha as condições negociadas; o relatório de faturamento fecha o ciclo mostrando o realizado contra o contratado.'}
              </Body>
            </div>
            <CaseCarousel
              images={[
                { src: '/images/cases/sellbie/cashback/sellbie-cashback-relatorio-precificacao-make-1-dashboard.png', alt: en ? 'Executive dashboard: consolidated period view' : 'Dashboard executivo: visão consolidada do período' },
                { src: '/images/cases/sellbie/cashback/sellbie-cashback-relatorio-precificacao-make-2-cadastro-contratos.png', alt: en ? 'Contract register: each brand\'s rules in the system' : 'Cadastro de contratos: regras de cada marca no sistema' },
                { src: '/images/cases/sellbie/cashback/sellbie-cashback-relatorio-precificacao-make-3-faturamento.png', alt: en ? 'Billing report: surplus calculated automatically' : 'Relatório de faturamento: excedente calculado automaticamente' },
              ]}
              caption={en ? 'Dashboard, Contract Register and Billing: from margin to contract in the same report' : 'Dashboard, Cadastro de Contratos e Faturamento: da margem ao contrato no mesmo relatório'}
            />
          </section>

          <Divider />

          <section className="space-y-6">
            <Eyebrow>{en ? 'Outcome' : 'Resultado'}</Eyebrow>
            <SectionHeading>{en ? 'From benefit to decision instrument' : 'Do benefício ao instrumento de decisão'}</SectionHeading>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { stat: '7',       label: { pt: 'Dimensões de inteligência mapeadas no discovery',                    en: 'Intelligence dimensions mapped in discovery' } },
                { stat: '2',       label: { pt: 'Relatórios entregues: ROAS e Precificação',                         en: 'Reports delivered: ROAS and Pricing' } },
                { stat: '3 times', label: { pt: 'Usando o módulo: Comercial, Financeiro e CS',                       en: 'Teams using the module: Commercial, Finance and CS' } },
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
