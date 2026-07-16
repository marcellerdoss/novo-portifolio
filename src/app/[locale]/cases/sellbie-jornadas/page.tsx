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
    title: locale === 'en' ? 'Sellbie — Customer Journeys · Marcelle Rocha' : 'Sellbie Jornadas — Marcelle Rocha',
    description: locale === 'en'
      ? 'Design of Sellbie\'s customer journey automation module — multichannel flow canvas with triggers, intervals, channels and branching logic.'
      : 'Design do módulo de automação de jornadas do cliente da Sellbie — canvas de fluxo multicanal com gatilhos, intervalos, canais e lógica de ramificação.',
    openGraph: {
      title: locale === 'en' ? 'Sellbie — Customer Journeys' : 'Sellbie — Jornadas do cliente',
      description: locale === 'en' ? 'Multichannel automation canvas with 20+ triggers, branches and template library.' : 'Canvas de automação multicanal com mais de 20 gatilhos, branches e biblioteca de templates.',
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

export default async function SellbieJornadasPage({ params }: Props) {
  const { locale } = await params;
  const en = locale === 'en';
  const { prev, next } = getCaseNav('sellbie-jornadas');

  const mdPath = path.join(process.cwd(), 'docs', 'cases', en ? 'sellbie-jornadas.en.md' : 'sellbie-jornadas.md');
  const mdSource = fs.existsSync(mdPath)
    ? fs.readFileSync(mdPath, 'utf8').replace(/\]\(\.\.\/\.\.\//g, '](/')
    : '';

  const sidebar = en
    ? [
        { label: 'Company',      content: 'Sellbie' },
        { label: 'Platform',     content: 'B2B · AI-powered multichannel marketing' },
        { label: 'Methods',      content: 'Discovery · Benchmarking · PRD · Interaction Design' },
        { label: 'Deliverables', content: 'Flow canvas · 20+ triggers · 3 channels · Template library' },
      ]
    : [
        { label: 'Empresa',    content: 'Sellbie' },
        { label: 'Plataforma', content: 'B2B · Marketing multicanal com IA' },
        { label: 'Métodos',    content: 'Discovery · Benchmarking · PRD · Interaction Design' },
        { label: 'Entregas',   content: 'Canvas de fluxo · 20+ gatilhos · 3 canais · Biblioteca de templates' },
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
            {en ? 'Customer journeys' : 'Jornadas do cliente'}
          </h1>

          <p className="type-body-lg text-fg-muted max-w-2xl">
            {en
              ? 'Design of Sellbie\'s multichannel automation canvas, a completely new module that allows creating journey flows with more than 20 triggers, multiple channels and branching logic based on customer behavior.'
              : 'Design do canvas de automação multicanal da Sellbie, um módulo inteiramente novo que permite criar fluxos de jornada com mais de 20 gatilhos, múltiplos canais e lógica de ramificação baseada no comportamento do cliente.'}
          </p>

          <div className="flex flex-wrap gap-2 mt-6">
            {(en
              ? ['Product Design', 'New Product', 'AI & Automation', 'Workflow', 'Omnichannel']
              : ['Product Design', 'Produto Novo', 'IA & Automação', 'Workflow', 'Omnichannel']
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
              <Eyebrow>{en ? '01 · Starting point' : '01 · Ponto de partida'}</Eyebrow>
              <SectionHeading>{en ? 'Before Journeys, only linearity existed' : 'Antes das Jornadas, só existia linearidade'}</SectionHeading>
              <Body>
                {en
                  ? 'Recurring Campaign was the most Sellbie offered in automation. It worked for simple cases — but didn\'t allow branching, conditionals or reacting to customer behavior. A customer who didn\'t open the email received exactly the same sequence as someone who bought.'
                  : 'A Campanha Recorrente era o máximo que a Sellbie oferecia em automação. Ela funcionava para casos simples — mas não permitia ramificação, condicional ou reação ao comportamento do cliente. Um cliente que não abriu o e-mail recebia exatamente a mesma sequência de quem comprou.'}
              </Body>
            </div>
            <CaseImg
              src="/images/cases/sellbie/jornadas/sellbie-jornadas-campanha-recorrente-antes.png"
              alt={en ? 'Recurring Campaign before Journeys — linear without branching' : 'Campanha Recorrente antes das Jornadas — linear sem ramificação'}
              caption={en ? 'Recurring Campaign before Journeys — linear, without branching.' : 'Campanha Recorrente antes das Jornadas — linear, sem ramificação.'}
            />
          </section>

          <Divider />

          <section className="space-y-8">
            <div>
              <Eyebrow>{en ? '02 · The solution' : '02 · A solução'}</Eyebrow>
              <SectionHeading>{en ? 'An overview that communicates state without opening each journey' : 'Uma visão geral que comunica estado sem abrir cada jornada'}</SectionHeading>
              <Body>
                {en
                  ? 'The module\'s entry point needed to answer immediately: which journey is active, which channels it uses, how many contacts are flowing through it now. Cards with inline status solve this without the user needing to open any journey for this reading.'
                  : 'O ponto de entrada do módulo precisava responder de imediato: qual jornada está ativa, quais canais ela usa, quantos contatos estão percorrendo o fluxo agora. Os cards com status inline resolvem isso sem que o usuário precise entrar em nenhuma jornada para ter essa leitura.'}
              </Body>
            </div>
            <CaseImg
              src="/images/cases/sellbie/jornadas/sellbie-jornadas-visao-geral-cards.png"
              alt={en ? 'Overview cards with status and channels' : 'Visão geral em cards com status e canais'}
              caption={en ? 'Overview cards — status, channels and identification at a glance.' : 'Visão geral em cards — status, canais e identificação em leitura rápida.'}
            />
          </section>

          <Divider />

          <section className="space-y-8">
            <div>
              <Eyebrow>{en ? '03 · Creation' : '03 · Criação'}</Eyebrow>
              <SectionHeading>{en ? 'Before building the flow, define the context' : 'Antes de construir o fluxo, definir o contexto'}</SectionHeading>
              <Body>
                {en
                  ? 'No canvas starts from scratch without poorly answered questions later. The creation panel captures name, objective and audience before opening the editor — decisions that impact every step of the flow and would change the structural design of the journey if left for later.'
                  : 'Nenhum canvas começa do zero sem perguntas mal-respondidas depois. O painel de criação captura nome, objetivo e público antes de abrir o editor — decisões que impactam cada step do fluxo e que mudariam o design estrutural da jornada se deixadas para depois.'}
              </Body>
            </div>
            <CaseImg
              src="/images/cases/sellbie/jornadas/sellbie-jornadas-painel-criacao.png"
              alt={en ? 'Creation panel with basic data before the canvas' : 'Painel de criação com dados básicos antes do canvas'}
              caption={en ? 'Creation panel — basic data before entering the canvas.' : 'Painel de criação — dados básicos antes de entrar no canvas.'}
            />
          </section>

          <Divider />

          <section className="space-y-8">
            <div>
              <Eyebrow>{en ? '04 · Triggers' : '04 · Gatilhos'}</Eyebrow>
              <SectionHeading>{en ? 'More than 20 triggers — physical store and e-commerce in the same canvas' : 'Mais de 20 gatilhos — loja física e e-commerce no mesmo canvas'}</SectionHeading>
              <Body>
                {en
                  ? 'One of the biggest conceptual challenges was organizing the heterogeneity of available triggers. Purchase behavior, email engagement, cart abandonment, store visit — all in the same panel, without looking like an endless list. Category organization with search solved discoverability without sacrificing reach.'
                  : 'Um dos maiores desafios de conceito foi organizar a heterogeneidade dos gatilhos disponíveis. Comportamento de compra, engajamento com e-mail, abandono de carrinho, visita em loja — tudo no mesmo painel, sem parecer uma lista infinita. A organização por categoria com busca resolveu a descoberta sem sacrificar o alcance.'}
              </Body>
            </div>
            <CaseImg
              src="/images/cases/sellbie/jornadas/sellbie-jornadas-gatilhos-canvas.png"
              alt={en ? 'Canvas with triggers panel organized by category' : 'Canvas com painel de gatilhos organizados por categoria'}
              caption={en ? 'More than 20 triggers organized by category — physical store and e-commerce in the same canvas.' : 'Mais de 20 gatilhos organizados por categoria — loja física e e-commerce no mesmo canvas.'}
            />
          </section>

          <Divider />

          <section className="space-y-8">
            <div>
              <Eyebrow>{en ? '05 · Global settings' : '05 · Configurações globais'}</Eyebrow>
              <SectionHeading>{en ? 'Settings that govern the entire journey' : 'Configurações que governam a jornada inteira'}</SectionHeading>
              <Body>
                {en
                  ? 'Entry frequency, early exit criteria and execution windows are decisions that affect all contacts in the flow. Treating them as global configurations — separate from individual steps — avoids silent errors and makes clear that these rules have journey scope, not channel scope.'
                  : 'Frequência de entrada, critérios de saída antecipada e janelas de execução são decisões que afetam todos os contatos no fluxo. Tratá-las como configurações globais — separadas dos steps individuais — evita erros silenciosos e deixa claro que essas regras têm escopo de jornada, não de canal.'}
              </Body>
            </div>
            <CaseImg
              src="/images/cases/sellbie/jornadas/sellbie-jornadas-configuracoes-jornada.png"
              alt={en ? 'Global entry, frequency and exit settings' : 'Configurações globais de entrada, frequência e saída'}
              caption={en ? 'Global settings — entry, frequency and exit before building the flow.' : 'Configurações globais — entrada, frequência e saída antes de construir o fluxo.'}
            />
          </section>

          <Divider />

          <section className="space-y-8">
            <div>
              <Eyebrow>{en ? '06 · Channels' : '06 · Canais'}</Eyebrow>
              <SectionHeading>{en ? 'Each channel with its own logic — same visual language' : 'Cada canal com sua própria lógica — mesma linguagem visual'}</SectionHeading>
              <Body>
                {en
                  ? 'Email, WhatsApp and SMS have completely different behaviors and restrictions — but need to coexist in the same canvas without creating pattern inconsistency. Each channel panel was designed with the medium\'s specific options, but sharing the same configuration structure.'
                  : 'E-mail, WhatsApp e SMS têm comportamentos e restrições completamente diferentes — mas precisam coexistir no mesmo canvas sem criar inconsistência de padrão. Cada painel de canal foi desenhado com as opções específicas do meio, mas compartilhando a mesma estrutura de configuração.'}
              </Body>
            </div>
            <div className="flex flex-wrap justify-center gap-6">
              <CaseImageFrame
                src="/images/cases/sellbie/jornadas/sellbie-jornadas-canal-email.png"
                alt={en ? 'Email channel with template, sender and tracking' : 'Canal E-mail com template, remetente e rastreamento'}
                caption={en ? 'Email — template, sender and tracking' : 'E-mail — template, remetente e rastreamento'}
                pair fixedHeight={320} imgWidth={336} imgHeight={550}
              />
              <CaseImageFrame
                src="/images/cases/sellbie/jornadas/sellbie-jornadas-canal-whatsapp.png"
                alt={en ? 'WhatsApp 1:1 channel through salesperson' : 'Canal WhatsApp 1:1 pelo vendedor'}
                caption={en ? 'WhatsApp 1:1 through salesperson' : 'WhatsApp 1:1 pelo vendedor'}
                pair fixedHeight={320} imgWidth={344} imgHeight={558}
              />
              <CaseImageFrame
                src="/images/cases/sellbie/jornadas/sellbie-jornadas-canal-sms.png"
                alt={en ? 'SMS channel with explicit restrictions' : 'Canal SMS com restrições explícitas'}
                caption={en ? 'SMS — explicit restrictions' : 'SMS — restrições explícitas'}
                pair fixedHeight={320} imgWidth={344} imgHeight={558}
              />
            </div>
          </section>

          <Divider />

          <section className="space-y-8">
            <div>
              <Eyebrow>{en ? '07 · Steps' : '07 · Steps'}</Eyebrow>
              <SectionHeading>{en ? 'The interval that also validates channel compatibility' : 'O intervalo que também valida compatibilidade de canal'}</SectionHeading>
              <Body>
                {en
                  ? 'The interval step seems simple — it defines how long to wait before the next step. But when the following channel operates in specific time windows, the interval needs to signal the incompatibility before the user publishes the journey with a silent error embedded.'
                  : 'O step de intervalo parece simples — define quanto tempo esperar antes do próximo step. Mas quando o canal seguinte opera em janelas de horário específicas, o intervalo precisa sinalizar a incompatibilidade antes que o usuário publique a jornada com um erro silencioso embutido.'}
              </Body>
            </div>
            <div className="flex flex-wrap justify-center gap-6">
              <CaseImageFrame
                src="/images/cases/sellbie/jornadas/sellbie-jornadas-step-intervalo-1.png"
                alt={en ? 'Interval step with wait time and schedule' : 'Step de intervalo com tempo de espera e horário'}
                caption={en ? 'Interval — wait time and schedule' : 'Intervalo — tempo de espera e horário'}
                pair fixedHeight={320} imgWidth={344} imgHeight={576}
              />
              <CaseImageFrame
                src="/images/cases/sellbie/jornadas/sellbie-jornadas-step-intervalo-2.png"
                alt={en ? 'Channel incompatibility signaled in interval' : 'Incompatibilidade de canal sinalizada no intervalo'}
                caption={en ? 'Channel incompatibility signaled' : 'Incompatibilidade de canal sinalizada'}
                pair fixedHeight={320} imgWidth={344} imgHeight={578}
              />
            </div>
          </section>

          <Divider />

          <section className="space-y-8">
            <div>
              <Eyebrow>{en ? '08 · Flow logic' : '08 · Lógica de fluxo'}</Eyebrow>
              <SectionHeading>{en ? 'The flow reacts to behavior, not the calendar' : 'O fluxo reage ao comportamento, não ao calendário'}</SectionHeading>
              <Body>
                {en
                  ? 'The path split step is the heart of Journeys\' differentiator. A customer who opened the email follows one path; who didn\'t, another. The journey stops being a linear sequence and becomes a system that responds to what each person actually did — or didn\'t do.'
                  : 'O step de divisão de caminho é o coração do diferencial das Jornadas. Um cliente que abriu o e-mail segue um caminho; quem não abriu, outro. A jornada deixa de ser uma sequência linear e passa a ser um sistema que responde ao que cada pessoa realmente fez — ou deixou de fazer.'}
              </Body>
            </div>
            <CaseImg
              src="/images/cases/sellbie/jornadas/sellbie-jornadas-acoes-steps.png"
              alt={en ? 'Path split — flow reacts to customer behavior' : 'Dividir caminho — fluxo reage ao comportamento do cliente'}
              caption={en ? 'Path split — the flow reacts to behavior, not the calendar.' : 'Dividir caminho — o fluxo reage ao comportamento, não ao calendário.'}
            />
          </section>

          <Divider />

          <section className="space-y-8">
            <div>
              <Eyebrow>{en ? '09 · Timing' : '09 · Timing'}</Eyebrow>
              <SectionHeading>{en ? 'Entering the journey before the event happens' : 'Entrar na jornada antes do evento acontecer'}</SectionHeading>
              <Body>
                {en
                  ? 'Birthday journeys and special dates need advance notice — a message on the day is already too late for certain categories. Early entry allows the contact to enter the flow days before the trigger, with automatic state signaling so the team knows the journey is in preparation.'
                  : 'Jornadas de aniversário e datas especiais precisam de antecedência — uma mensagem no dia já é tarde demais para certas categorias. A entrada antecipada permite que o contato entre no fluxo dias antes do gatilho, com sinalização automática do estado para que o time saiba que a jornada está em preparação.'}
              </Body>
            </div>
            <CaseImg
              src="/images/cases/sellbie/jornadas/sellbie-jornadas-entrada-antecipada.png"
              alt={en ? 'Early entry with automatic signaling' : 'Entrada antecipada com sinalização automática'}
              caption={en ? 'Early entry — journey starts before the event with automatic signaling.' : 'Entrada antecipada — jornada começa antes do evento com sinalização automática.'}
            />
          </section>

          <Divider />

          <section className="space-y-8">
            <div>
              <Eyebrow>{en ? '10 · Templates' : '10 · Templates'}</Eyebrow>
              <SectionHeading>{en ? 'Library that speeds up creation without locking channels' : 'Biblioteca que acelera a criação sem travar o canal'}</SectionHeading>
              <Body>
                {en
                  ? 'Creating a journey from scratch requires templates for each channel used in the flow. The channel-organized library solves discoverability; the step-by-step guided editor solves creation without requiring technical knowledge of each format. Together, they reduce the time to create a complete journey.'
                  : 'Criar uma jornada do zero requer templates para cada canal usado no fluxo. A biblioteca organizada por canal resolve a descoberta; o editor em etapas guiadas resolve a criação sem exigir conhecimento técnico de cada formato. Juntos, reduzem o tempo de criação de uma jornada completa.'}
              </Body>
            </div>
            <CaseImgPair
              a={{ src: '/images/cases/sellbie/jornadas/sellbie-jornadas-biblioteca-templates-geral.png', alt: en ? 'Template library organized by channel' : 'Biblioteca de templates organizada por canal', caption: en ? 'Template library organized by channel' : 'Biblioteca de templates organizada por canal' }}
              b={{ src: '/images/cases/sellbie/jornadas/sellbie-jornadas-biblioteca-templates-criacao.png', alt: en ? 'Template creation in guided steps' : 'Criação de template em etapas guiadas', caption: en ? 'Template creation in guided steps' : 'Criação de template em etapas guiadas' }}
            />
          </section>

          <Divider />

          <section className="space-y-6">
            <Eyebrow>{en ? 'Outcome' : 'Resultado'}</Eyebrow>
            <SectionHeading>{en ? 'From canvas to product — what this module delivered' : 'Do canvas ao produto — o que esse módulo entregou'}</SectionHeading>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { stat: '20+',  label: { pt: 'Gatilhos disponíveis no lançamento',                      en: 'Triggers available at launch' } },
                { stat: '3',    label: { pt: 'Canais nativos — e-mail, WhatsApp e SMS',                  en: 'Native channels — email, WhatsApp and SMS' } },
                { stat: '0→1',  label: { pt: 'Módulo inteiramente novo — sem legado',                    en: 'Brand new module — no legacy' } },
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
