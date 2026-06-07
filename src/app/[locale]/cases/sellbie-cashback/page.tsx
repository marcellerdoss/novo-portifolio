import type { Metadata } from 'next';
import fs from 'fs';
import path from 'path';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { routing } from '@/i18n/routing';
import { ScrollProgress } from '@/components/ui/ScrollProgress';
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
    title: 'Sellbie — Cashback · Marcelle Rocha',
    description:
      'Design do módulo de cashback da Sellbie — ROAS operacional, precificação e relatórios de inteligência que transformaram cashback em ferramenta de decisão.',
    openGraph: {
      title: 'Sellbie — Cashback',
      description: 'ROAS operacional, precificação e relatórios de inteligência para o módulo de cashback da Sellbie.',
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
  return (
    <figure className="space-y-2">
      <Image src={src} alt={alt} width={1200} height={800} sizes="(max-width: 1024px) 100vw, 736px" className="w-full h-auto" />
      {caption && <figcaption className="type-body-sm text-fg-subtle mt-1">{caption}</figcaption>}
    </figure>
  );
}
function CaseImgPair({ a, b }: { a: { src: string; alt: string; caption?: string }; b: { src: string; alt: string; caption?: string } }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <CaseImg {...a} />
      <CaseImg {...b} />
    </div>
  );
}

const sidebar = [
  { label: 'Empresa', content: 'Sellbie' },
  { label: 'Período', content: '2024' },
  { label: 'Papel', content: 'Product Designer' },
  { label: 'Usuários', content: 'Comercial · Financeiro · CS' },
  { label: 'Métodos', content: 'Discovery · Entrevistas · Relatórios' },
  { label: 'Entregas', content: 'ROAS operacional · Precificação · Handoff' },
];

export default async function SellbieCashbackPage() {
  const { prev, next } = getCaseNav('sellbie-cashback');

  const mdPath = path.join(process.cwd(), 'docs', 'cases', 'sellbie-cashback.md');
  const mdSource = fs.existsSync(mdPath)
    ? fs.readFileSync(mdPath, 'utf8').replace(/\]\(\.\.\/\.\.\//g, '](/')
    : '';

  const detailedContent = (
    <CaseEditorialWrapper sidebar={sidebar}>
      {mdSource ? <MDXRemote source={mdSource} /> : <p>Conteúdo detalhado em breve.</p>}
    </CaseEditorialWrapper>
  );

  return (
    <div className="min-h-screen bg-bg">
      <ScrollProgress />

      <header className="pt-section pb-8 px-6 border-b border-border">
        <div className="max-w-5xl mx-auto">
          <Link
            href="/#cases"
            className="inline-flex items-center gap-2 px-5 py-2 type-body-sm border border-fg text-fg rounded-pill bg-transparent hover:bg-fg/5 active:scale-[0.97] transition-all duration-150 mb-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-fg"
          >
            ← Todos os cases
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-8">
            <span className="type-caption rounded-full px-3 py-1.5 leading-none" style={{ backgroundColor: ACCENT_BG, color: ACCENT_TEXT }}>
              Cashback · Inteligência de dados
            </span>
            <span className="type-caption text-fg-subtle">2024</span>
            <span className="type-caption text-fg-subtle">Sellbie</span>
          </div>

          <h1 className="type-display-lg text-fg mb-6">
            Cashback como<br />produto de inteligência
          </h1>

          <p className="type-body-lg text-fg-muted max-w-2xl">
            Como transformamos o módulo de cashback da Sellbie de um
            benefício simples em uma ferramenta de decisão — com ROAS
            operacional, análise de precificação e relatórios que o time
            comercial e financeiro passaram a usar de verdade.
          </p>

          <div className="flex flex-wrap gap-2 mt-6">
            {['Entrevistas com CS', 'Plano estratégico', 'Dashboard de ROAS', 'Relatório de Precificação', 'Figma Make'].map(tag => (
              <span key={tag} className="type-caption rounded-full border border-border px-3 py-1.5 leading-none text-fg-subtle">
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
              <Eyebrow>01 · Discovery</Eyebrow>
              <SectionHeading>O esforço manual que antecedeu qualquer estrutura</SectionHeading>
              <Body>
                Antes de existir qualquer relatório, o time comercial
                calculava o retorno do cashback combinando exportações de
                planilha com dados do sistema financeiro de forma manual.
                O discovery mapeou esse esforço em detalhes — cada fonte,
                cada cálculo intermediário, cada pergunta que ficava sem
                resposta por falta de dado consolidado.
              </Body>
            </div>
            <CaseImg
              src="/images/cases/sellbie/cashback/sellbie-cashback-discovery-materiais.png"
              alt="Materiais do discovery antes de qualquer estrutura de dados"
              caption="Materiais do discovery — esforço manual antes de qualquer estrutura de dados."
            />
          </section>

          <Divider />

          <section className="space-y-8">
            <div>
              <Eyebrow>02 · Definição</Eyebrow>
              <SectionHeading>Sete dimensões que redefiniriam o produto</SectionHeading>
              <Body>
                O mapa de oportunidades estruturou tudo que o cashback poderia
                responder se os dados estivessem organizados corretamente.
                Sete dimensões — de comportamento de resgate a análise de
                churn por programa — definiram o escopo dos relatórios e a
                ordem de prioridade de construção. O cashback deixou de ser
                um benefício e passou a ser um vetor de inteligência
                comercial.
              </Body>
            </div>
            <CaseImg
              src="/images/cases/sellbie/cashback/sellbie-cashback-mapa-oportunidades.png"
              alt="Mapa de oportunidades com sete dimensões do cashback"
              caption="Mapa de oportunidades — sete dimensões que transformaram o cashback em produto de inteligência."
            />
          </section>

          <Divider />

          <section className="space-y-8">
            <div>
              <Eyebrow>03 · Retorno sobre investimento</Eyebrow>
              <SectionHeading>ROAS operacional — o retorno que o cashback realmente gera</SectionHeading>
              <Body>
                O primeiro relatório respondeu à pergunta mais urgente do
                time comercial: quanto o cashback retorna em faturamento para
                cada real concedido? O ROAS operacional consolida faturamento
                atribuído, volume de resgate e cashback expirado em um único
                painel — e detalha o retorno por estratégia de programa e por
                comportamento de cliente.
              </Body>
            </div>
            <CaseImg
              src="/images/cases/sellbie/cashback/sellbie-cashback-relatorio-roas-make-1-dashboard.png"
              alt="ROAS operacional com faturamento, resgate e cashback expirado"
              caption="ROAS operacional — faturamento, resgate e cashback expirado"
            />
            <CaseImgPair
              a={{ src: '/images/cases/sellbie/cashback/sellbie-cashback-relatorio-roas-make-2-dashboard.png', alt: 'ROAS por estratégia', caption: 'ROAS por estratégia' }}
              b={{ src: '/images/cases/sellbie/cashback/sellbie-cashback-relatorio-roas-make-3-dashboard.png', alt: 'ROAS por comportamento', caption: 'ROAS por comportamento' }}
            />
          </section>

          <Divider />

          <section className="space-y-8">
            <div>
              <Eyebrow>04 · Precificação</Eyebrow>
              <SectionHeading>Da margem ao contrato — tudo no mesmo relatório</SectionHeading>
              <Body>
                O relatório de precificação foi construído para o time
                financeiro e comercial que precisava acompanhar a rentabilidade
                de cada contrato de cashback ativo. O dashboard executivo dá
                a visão consolidada; o cadastro de contratos detalha as
                condições negociadas; o relatório de faturamento fecha o
                ciclo mostrando o realizado contra o contratado.
              </Body>
            </div>
            <CaseImg
              src="/images/cases/sellbie/cashback/sellbie-cashback-relatorio-precificacao-make-1-dashboard.png"
              alt="Dashboard executivo de precificação"
              caption="Dashboard executivo de precificação"
            />
            <CaseImgPair
              a={{ src: '/images/cases/sellbie/cashback/sellbie-cashback-relatorio-precificacao-make-2-cadastro-contratos.png', alt: 'Cadastro de contratos', caption: 'Cadastro de contratos' }}
              b={{ src: '/images/cases/sellbie/cashback/sellbie-cashback-relatorio-precificacao-make-3-faturamento.png', alt: 'Relatório de faturamento', caption: 'Relatório de faturamento' }}
            />
          </section>

          <Divider />

          <section className="space-y-6">
            <Eyebrow>Resultado</Eyebrow>
            <SectionHeading>Do benefício ao instrumento de decisão</SectionHeading>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { stat: '7', label: 'Dimensões de inteligência mapeadas no discovery' },
                { stat: '2', label: 'Relatórios entregues — ROAS e Precificação' },
                { stat: '3 times', label: 'Usando o módulo — Comercial, Financeiro e CS' },
              ].map(({ stat, label }) => (
                <div key={label} className="border border-border rounded-[16px] p-8" style={{ backgroundColor: ACCENT_BG }}>
                  <p className="type-headline mb-2" style={{ color: ACCENT_TEXT }}>{stat}</p>
                  <p className="type-body-sm opacity-70" style={{ color: ACCENT_TEXT }}>{label}</p>
                </div>
              ))}
            </div>
          </section>

        </CaseOverviewLayout>
      </CasePageShell>
    </div>
  );
}
