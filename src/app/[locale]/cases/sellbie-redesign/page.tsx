import type { Metadata } from 'next';
import fs from 'fs';
import path from 'path';
import { CaseImageFrame } from '@/components/case/CaseImageFrame';
import { Link } from '@/i18n/navigation';
import { CaseMdxContent } from '@/components/case/CaseMdxContent';
import { routing } from '@/i18n/routing';
import { ScrollProgress } from '@/components/ui/ScrollProgress';
import { CasePageShell } from '@/components/case/CasePageShell';
import { CaseEditorialWrapper } from '@/components/case/CaseEditorialWrapper';
import { getCaseNav } from '@/lib/casesConfig';
import { CaseOverviewLayout } from '@/components/case/CaseOverviewLayout';
import { CaseCarousel } from '@/components/case/CaseCarousel';
import { CaseBeforeAfter } from '@/components/case/CaseBeforeAfter';
import { buttonVariants } from '@/components/ui/Button';

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: 'Sellbie Redesign — Marcelle Rocha',
    description:
      'Redesign do core de campanhas: como unificamos três padrões de navegação e redesenhamos o fluxo de criação de envios da Sellbie.',
    openGraph: {
      title: 'Sellbie — Redesign do core de campanhas',
      description: 'Redesign do core de campanhas multicanal da Sellbie.',
      locale: locale === 'en' ? 'en_US' : 'pt_BR',
      type: 'article',
    },
  };
}

const ACCENT_BG   = 'var(--color-project-sellbie-redesign-bg)';
const ACCENT_TEXT = 'var(--color-project-sellbie-redesign-text)';

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
function CaseImgPair({ a, b }: { a: { src: string; alt: string; caption?: string }; b: { src: string; alt: string; caption?: string } }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <CaseImageFrame src={a.src} alt={a.alt} caption={a.caption} pair />
      <CaseImageFrame src={b.src} alt={b.alt} caption={b.caption} pair />
    </div>
  );
}

const sidebar = [
  { label: 'Empresa', content: 'Sellbie' },
  { label: 'Plataforma', content: 'B2B · Marketing multicanal com IA' },
  { label: 'Métodos', content: 'Discovery · Entrevistas com usuários · Benchmarking competitivo' },
  { label: 'Entregas', content: 'Redesign do fluxo de campanhas · Evolução dos fluxos multicanal · WhatsApp Oficial' },
];

export default async function SellbieRedesignPage() {
  const { prev, next } = getCaseNav('sellbie-redesign');

  const mdPath = path.join(process.cwd(), 'docs', 'cases', 'sellbie-redesign.md');
  const mdSource = fs.existsSync(mdPath)
    ? fs.readFileSync(mdPath, 'utf8').replace(/\]\(\.\.\/\.\.\//g, '](/')
    : '';

  const detailedContent = (
    <CaseEditorialWrapper sidebar={sidebar}>
      {mdSource ? <CaseMdxContent source={mdSource} /> : <p>Conteúdo detalhado em breve.</p>}
    </CaseEditorialWrapper>
  );

  return (
    <div className="min-h-screen bg-bg">
      <ScrollProgress />

      <header className="pt-section pb-8 px-6 border-b border-border">
        <div className="max-w-5xl mx-auto">
          <Link
            href="/#cases"
            className={buttonVariants({ variant: 'secondary', size: 'sm' }) + ' mb-10'}
          >
            ← Todos os cases
          </Link>

          <h1 className="type-display-lg text-fg mb-6">
            Redesign do core<br />de campanhas
          </h1>

          <p className="type-body-lg text-fg-muted max-w-2xl">
            Como unificamos três padrões de navegação incompatíveis e
            redesenhamos o fluxo de criação de envios — reduzindo o abandono
            no módulo principal da plataforma.
          </p>

          <div className="flex flex-wrap gap-2 mt-6">
            {['Product Design', 'UX Research', 'Multicanal', 'IA & Automação', 'Arquitetura de Info'].map(tag => (
              <span key={tag} className="type-caption rounded-full border border-border px-3 py-2 leading-none text-fg-subtle">
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
              <Eyebrow>01 · Diagnóstico</Eyebrow>
              <SectionHeading>A inconsistência estava por toda parte</SectionHeading>
              <Body>
                A Sellbie cresceu rápido demais. Cada squad adicionou sua
                própria lógica de navegação — e nenhuma conversava com as
                outras. A auditoria revelou três padrões incompatíveis
                coexistindo no mesmo produto, sem critério ou hierarquia clara.
              </Body>
            </div>
            <CaseCarousel
              images={[
                { src: '/images/cases/sellbie/redesign/sellbie-redesign-navegacao-antes-1.png', alt: 'Padrão de navegação superior' },
                { src: '/images/cases/sellbie/redesign/sellbie-redesign-navegacao-antes-2.png', alt: 'Padrão de navegação lateral' },
                { src: '/images/cases/sellbie/redesign/sellbie-redesign-navegacao-antes-3.png', alt: 'Terceiro padrão de navegação coexistindo' },
              ]}
              caption="Três padrões de navegação coexistindo sem critério ou hierarquia"
            />
          </section>

          <Divider />

          <section className="space-y-8">
            <div>
              <Eyebrow>02 · Pesquisa</Eyebrow>
              <SectionHeading>Antes de redesenhar, precisávamos ouvir</SectionHeading>
              <Body>
                Realizamos 12 entrevistas com usuários ativos em três perfis:
                gestores de marketing, operadores de campanha e
                administradores. Os clusters revelaram um padrão inesperado —
                o maior ponto de abandono não era a navegação, mas a criação
                de envios.
              </Body>
            </div>
            <CaseImg
              src="/images/cases/sellbie/redesign/sellbie-redesign-board-entrevistas.png"
              alt="Board de clusterização das entrevistas"
              caption="Clusterização das entrevistas — padrões que definiram o foco"
            />
            <CaseImg
              src="/images/cases/sellbie/redesign/sellbie-redesign-board-aprendizados.png"
              alt="Board de aprendizados da pesquisa"
              caption="Aprendizados da pesquisa — síntese que orientou o redesign"
            />
          </section>

          <Divider />

          <section className="space-y-8">
            <div>
              <Eyebrow>03 · Diagnóstico focado</Eyebrow>
              <SectionHeading>A listagem de campanhas era o sintoma mais visível</SectionHeading>
              <Body>
                A tabela fixa não escala para quem gerencia dezenas de
                campanhas ativas. Sem visualização alternativa, sem
                contexto rápido, sem hierarquia clara — o usuário perdia
                tempo procurando antes mesmo de criar. A mudança para cards
                com visualização alternável foi validada com seis usuários em
                dois dias de teste.
              </Body>
            </div>
            <CaseBeforeAfter
              imageBefore="/images/cases/sellbie/redesign/sellbie-redesign-campanhas-antes.png"
              imageAfter="/images/cases/sellbie/redesign/sellbie-redesign-campanhas-cards-depois.png"
              altBefore="Listagem de campanhas antes — tabela fixa sem visualização alternativa"
              altAfter="Nova listagem em cards com visualização alternável"
              captionBefore="Tabela fixa — sem visualização alternativa"
              captionAfter="Cards com visualização alternável"
            />
          </section>

          <Divider />

          <section className="space-y-8">
            <div>
              <Eyebrow>04 · A decisão de design</Eyebrow>
              <SectionHeading>A decisão que mudou o fluxo</SectionHeading>
              <Body>
                Toda a pesquisa apontava para o mesmo problema: o usuário
                perdia a referência da campanha ao criar um envio. Quatro
                páginas separadas, zero contexto. A solução foi trazer o
                envio para dentro da campanha — em um drawer contextual
                que mantém o produto visível ao fundo.
              </Body>
            </div>
            <CaseImg
              src="/images/cases/sellbie/redesign/sellbie-redesign-criacao-envio.png"
              alt="Novo drawer contextual com campanha visível"
              caption="A decisão central do redesign — criar o envio no contexto da campanha."
            />
          </section>

          <Divider />

          <section className="space-y-8">
            <div>
              <Eyebrow>05 · Estado anterior</Eyebrow>
              <SectionHeading>O que estava errado no fluxo antigo</SectionHeading>
              <Body>
                O fluxo antigo dispersava o usuário por quatro páginas
                independentes. Na etapa de seleção de base — a mais crítica —
                não havia nenhuma referência visual da campanha. Quem chegava
                ali não sabia mais exatamente o que estava disparando.
              </Body>
            </div>
            <CaseCarousel
              images={[
                { src: '/images/cases/sellbie/redesign/sellbie-redesign-criacao-envio-antes-1.png', alt: 'Fluxo antigo — página separada sem contexto da campanha' },
                { src: '/images/cases/sellbie/redesign/sellbie-redesign-criacao-envio-antes-2.png', alt: 'Etapa 2 do fluxo antigo' },
                { src: '/images/cases/sellbie/redesign/sellbie-redesign-criacao-envio-antes-3.png', alt: 'Etapa 3 — base densa sem resumo consolidado' },
              ]}
              caption="Fluxo antigo — quatro páginas separadas, zero contexto da campanha"
            />
          </section>

          <Divider />

          <section className="space-y-8">
            <div>
              <Eyebrow>06 · O redesign</Eyebrow>
              <SectionHeading>O drawer condensa o que antes eram quatro páginas</SectionHeading>
              <Body>
                Cada etapa do drawer de e-mail foi desenhada para manter o
                usuário orientado. O canal, o conteúdo, a base e a
                configuração — tudo em sequência linear, sem perder o
                contexto da campanha que está visível ao fundo.
              </Body>
            </div>
            <CaseImg
              src="/images/cases/sellbie/redesign/sellbie-redesign-envio-drawer-email-etapa-1.png"
              alt="Etapas do drawer de e-mail"
              caption="Etapas do drawer — E-mail"
            />
          </section>

          <Divider />

          <section className="space-y-8">
            <div>
              <Eyebrow>07 · Revisão e aprovação</Eyebrow>
              <SectionHeading>As duas etapas que fecham o ciclo</SectionHeading>
              <Body>
                O resumo consolida tudo em uma tela antes do disparo —
                permitindo edição inline sem voltar às etapas anteriores.
                A aprovação, quando necessária, formaliza a revisão e
                transfere a responsabilidade para quem tem autorização.
              </Body>
            </div>
            <CaseCarousel
              images={[
                { src: '/images/cases/sellbie/redesign/sellbie-redesign-envio-drawer-email-etapa-resumo.png', alt: 'Resumo consolidado — revisão completa com edição inline' },
                { src: '/images/cases/sellbie/redesign/sellbie-redesign-envio-drawer-email-etapa-aprovacao.png', alt: 'Aprovação — formaliza a revisão antes do disparo' },
              ]}
              caption="Resumo e aprovação — as duas etapas que fecham o ciclo de criação"
            />
          </section>

          <Divider />

          <section className="space-y-6">
            <Eyebrow>Resultado</Eyebrow>
            <SectionHeading>O que mudou depois do redesign</SectionHeading>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { stat: '−43%', label: 'Taxa de abandono na criação de envios' },
                { stat: '2×', label: 'Mais campanhas criadas por sessão' },
                { stat: '4 → 1', label: 'Páginas no fluxo de criação' },
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
