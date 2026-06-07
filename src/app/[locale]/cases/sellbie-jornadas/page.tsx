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
    title: 'Sellbie Jornadas — Marcelle Rocha',
    description:
      'Design do módulo de automação de jornadas do cliente da Sellbie — canvas de fluxo multicanal com gatilhos, intervalos, canais e lógica de ramificação.',
    openGraph: {
      title: 'Sellbie — Jornadas do cliente',
      description: 'Canvas de automação multicanal com mais de 20 gatilhos, branches e biblioteca de templates.',
      locale: locale === 'en' ? 'en_US' : 'pt_BR',
      type: 'article',
    },
  };
}

const ACCENT_BG   = 'var(--color-project-sellbie-jornadas-bg)';
const ACCENT_TEXT = 'var(--color-project-sellbie-jornadas-text)';

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
      <Image src={src} alt={alt} width={1200} height={800} className="w-full h-auto" />
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
  { label: 'Período', content: '2024–2025' },
  { label: 'Papel', content: 'Product Designer · UX Strategy' },
  { label: 'Plataforma', content: 'B2B · Marketing multicanal com IA' },
  { label: 'Métodos', content: 'Discovery · Benchmarking · PRD · Interaction Design' },
  { label: 'Entregas', content: 'Canvas de fluxo · 20+ gatilhos · 3 canais · Biblioteca de templates' },
];

export default async function SellbieJornadasPage() {
  const { prev, next } = getCaseNav('sellbie-jornadas');

  const mdPath = path.join(process.cwd(), 'docs', 'cases', 'sellbie-jornadas.md');
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
              Product Design
            </span>
            <span className="type-caption text-fg-subtle">2024</span>
            <span className="type-caption text-fg-subtle">Sellbie</span>
          </div>

          <h1 className="type-display-lg text-fg mb-6">Jornadas do cliente</h1>

          <p className="type-body-lg text-fg-muted max-w-2xl">
            Design do canvas de automação multicanal da Sellbie — um módulo
            inteiramente novo que permite criar fluxos de jornada com mais
            de 20 gatilhos, múltiplos canais e lógica de ramificação baseada
            no comportamento do cliente.
          </p>

          <div className="flex flex-wrap gap-2 mt-6">
            {['Product Design', 'Produto Novo', 'IA & Automação', 'Workflow', 'Omnichannel'].map(tag => (
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
              <Eyebrow>01 · Ponto de partida</Eyebrow>
              <SectionHeading>Antes das Jornadas, só existia linearidade</SectionHeading>
              <Body>
                A Campanha Recorrente era o máximo que a Sellbie oferecia em
                automação. Ela funcionava para casos simples — mas não
                permitia ramificação, condicional ou reação ao comportamento
                do cliente. Um cliente que não abriu o e-mail recebia
                exatamente a mesma sequência de quem comprou.
              </Body>
            </div>
            <CaseImg
              src="/images/cases/sellbie/jornadas/sellbie-jornadas-campanha-recorrente-antes.png"
              alt="Campanha Recorrente antes das Jornadas — linear sem ramificação"
              caption="Campanha Recorrente antes das Jornadas — linear, sem ramificação."
            />
          </section>

          <Divider />

          <section className="space-y-8">
            <div>
              <Eyebrow>02 · A solução</Eyebrow>
              <SectionHeading>Uma visão geral que comunica estado sem abrir cada jornada</SectionHeading>
              <Body>
                O ponto de entrada do módulo precisava responder de imediato:
                qual jornada está ativa, quais canais ela usa, quantos
                contatos estão percorrendo o fluxo agora. Os cards com status
                inline resolvem isso sem que o usuário precise entrar em
                nenhuma jornada para ter essa leitura.
              </Body>
            </div>
            <CaseImg
              src="/images/cases/sellbie/jornadas/sellbie-jornadas-visao-geral-cards.png"
              alt="Visão geral em cards com status e canais"
              caption="Visão geral em cards — status, canais e identificação em leitura rápida."
            />
          </section>

          <Divider />

          <section className="space-y-8">
            <div>
              <Eyebrow>03 · Criação</Eyebrow>
              <SectionHeading>Antes de construir o fluxo, definir o contexto</SectionHeading>
              <Body>
                Nenhum canvas começa do zero sem perguntas mal-respondidas
                depois. O painel de criação captura nome, objetivo e público
                antes de abrir o editor — decisões que impactam cada step do
                fluxo e que mudariam o design estrutural da jornada se
                deixadas para depois.
              </Body>
            </div>
            <CaseImg
              src="/images/cases/sellbie/jornadas/sellbie-jornadas-painel-criacao.png"
              alt="Painel de criação com dados básicos antes do canvas"
              caption="Painel de criação — dados básicos antes de entrar no canvas."
            />
          </section>

          <Divider />

          <section className="space-y-8">
            <div>
              <Eyebrow>04 · Gatilhos</Eyebrow>
              <SectionHeading>Mais de 20 gatilhos — loja física e e-commerce no mesmo canvas</SectionHeading>
              <Body>
                Um dos maiores desafios de conceito foi organizar a
                heterogeneidade dos gatilhos disponíveis. Comportamento de
                compra, engajamento com e-mail, abandono de carrinho, visita
                em loja — tudo no mesmo painel, sem parecer uma lista
                infinita. A organização por categoria com busca resolveu
                a descoberta sem sacrificar o alcance.
              </Body>
            </div>
            <CaseImg
              src="/images/cases/sellbie/jornadas/sellbie-jornadas-gatilhos-canvas.png"
              alt="Canvas com painel de gatilhos organizados por categoria"
              caption="Mais de 20 gatilhos organizados por categoria — loja física e e-commerce no mesmo canvas."
            />
          </section>

          <Divider />

          <section className="space-y-8">
            <div>
              <Eyebrow>05 · Configurações globais</Eyebrow>
              <SectionHeading>Configurações que governam a jornada inteira</SectionHeading>
              <Body>
                Frequência de entrada, critérios de saída antecipada e janelas
                de execução são decisões que afetam todos os contatos no
                fluxo. Tratá-las como configurações globais — separadas dos
                steps individuais — evita erros silenciosos e deixa claro que
                essas regras têm escopo de jornada, não de canal.
              </Body>
            </div>
            <CaseImg
              src="/images/cases/sellbie/jornadas/sellbie-jornadas-configuracoes-jornada.png"
              alt="Configurações globais de entrada, frequência e saída"
              caption="Configurações globais — entrada, frequência e saída antes de construir o fluxo."
            />
          </section>

          <Divider />

          <section className="space-y-8">
            <div>
              <Eyebrow>06 · Canais</Eyebrow>
              <SectionHeading>Cada canal com sua própria lógica — mesma linguagem visual</SectionHeading>
              <Body>
                E-mail, WhatsApp e SMS têm comportamentos e restrições
                completamente diferentes — mas precisam coexistir no mesmo
                canvas sem criar inconsistência de padrão. Cada painel de
                canal foi desenhado com as opções específicas do meio,
                mas compartilhando a mesma estrutura de configuração.
              </Body>
            </div>
            <CaseImg
              src="/images/cases/sellbie/jornadas/sellbie-jornadas-canal-email.png"
              alt="Canal E-mail com template, remetente e rastreamento"
              caption="E-mail — template, remetente e rastreamento em um painel"
            />
            <CaseImgPair
              a={{ src: '/images/cases/sellbie/jornadas/sellbie-jornadas-canal-whatsapp.png', alt: 'Canal WhatsApp 1:1 pelo vendedor', caption: 'WhatsApp 1:1 pelo vendedor' }}
              b={{ src: '/images/cases/sellbie/jornadas/sellbie-jornadas-canal-sms.png', alt: 'Canal SMS com restrições explícitas', caption: 'SMS — restrições explícitas' }}
            />
          </section>

          <Divider />

          <section className="space-y-8">
            <div>
              <Eyebrow>07 · Steps</Eyebrow>
              <SectionHeading>O intervalo que também valida compatibilidade de canal</SectionHeading>
              <Body>
                O step de intervalo parece simples — define quanto tempo
                esperar antes do próximo step. Mas quando o canal seguinte
                opera em janelas de horário específicas, o intervalo precisa
                sinalizar a incompatibilidade antes que o usuário publique
                a jornada com um erro silencioso embutido.
              </Body>
            </div>
            <CaseImgPair
              a={{ src: '/images/cases/sellbie/jornadas/sellbie-jornadas-step-intervalo-1.png', alt: 'Step de intervalo com tempo de espera e horário', caption: 'Intervalo — tempo de espera e horário' }}
              b={{ src: '/images/cases/sellbie/jornadas/sellbie-jornadas-step-intervalo-2.png', alt: 'Incompatibilidade de canal sinalizada no intervalo', caption: 'Incompatibilidade de canal sinalizada' }}
            />
          </section>

          <Divider />

          <section className="space-y-8">
            <div>
              <Eyebrow>08 · Lógica de fluxo</Eyebrow>
              <SectionHeading>O fluxo reage ao comportamento, não ao calendário</SectionHeading>
              <Body>
                O step de divisão de caminho é o coração do diferencial das
                Jornadas. Um cliente que abriu o e-mail segue um caminho;
                quem não abriu, outro. A jornada deixa de ser uma sequência
                linear e passa a ser um sistema que responde ao que cada
                pessoa realmente fez — ou deixou de fazer.
              </Body>
            </div>
            <CaseImg
              src="/images/cases/sellbie/jornadas/sellbie-jornadas-acoes-steps.png"
              alt="Dividir caminho — fluxo reage ao comportamento do cliente"
              caption="Dividir caminho — o fluxo reage ao comportamento, não ao calendário."
            />
          </section>

          <Divider />

          <section className="space-y-8">
            <div>
              <Eyebrow>09 · Timing</Eyebrow>
              <SectionHeading>Entrar na jornada antes do evento acontecer</SectionHeading>
              <Body>
                Jornadas de aniversário e datas especiais precisam de
                antecedência — uma mensagem no dia já é tarde demais para
                certas categorias. A entrada antecipada permite que o contato
                entre no fluxo dias antes do gatilho, com sinalização
                automática do estado para que o time saiba que a jornada
                está em preparação.
              </Body>
            </div>
            <CaseImg
              src="/images/cases/sellbie/jornadas/sellbie-jornadas-entrada-antecipada.png"
              alt="Entrada antecipada com sinalização automática"
              caption="Entrada antecipada — jornada começa antes do evento com sinalização automática."
            />
          </section>

          <Divider />

          <section className="space-y-8">
            <div>
              <Eyebrow>10 · Templates</Eyebrow>
              <SectionHeading>Biblioteca que acelera a criação sem travar o canal</SectionHeading>
              <Body>
                Criar uma jornada do zero requer templates para cada canal
                usado no fluxo. A biblioteca organizada por canal resolve
                a descoberta; o editor em etapas guiadas resolve a criação
                sem exigir conhecimento técnico de cada formato. Juntos,
                reduzem o tempo de criação de uma jornada completa.
              </Body>
            </div>
            <CaseImgPair
              a={{ src: '/images/cases/sellbie/jornadas/sellbie-jornadas-biblioteca-templates-geral.png', alt: 'Biblioteca de templates organizada por canal', caption: 'Biblioteca de templates organizada por canal' }}
              b={{ src: '/images/cases/sellbie/jornadas/sellbie-jornadas-biblioteca-templates-criacao.png', alt: 'Criação de template em etapas guiadas', caption: 'Criação de template em etapas guiadas' }}
            />
          </section>

          <Divider />

          <section className="space-y-6">
            <Eyebrow>Resultado</Eyebrow>
            <SectionHeading>Do canvas ao produto — o que esse módulo entregou</SectionHeading>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { stat: '20+', label: 'Gatilhos disponíveis no lançamento' },
                { stat: '3', label: 'Canais nativos — e-mail, WhatsApp e SMS' },
                { stat: '0→1', label: 'Módulo inteiramente novo — sem legado' },
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
