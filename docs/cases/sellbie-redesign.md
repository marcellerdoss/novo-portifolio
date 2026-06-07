## Contexto

A Sellbie é uma plataforma SaaS de CRM e marketing multicanal voltada para marcas de varejo. O produto foi sendo construído de forma reativa ao longo dos anos, sem uma camada de design estruturando as decisões. Quando entrei, não havia definição de UX, nenhum Design System, navegação inconsistente entre módulos e jornadas fragmentadas. A empresa queria redesenhar a plataforma, sem PRD, sem base documental, sem por onde começar. O desafio não era só redesenhar telas. Era criar as condições para que o redesign fosse possível.

---

## Discovery: imersão, pesquisa e diagnóstico

### Imersão na plataforma existente

O primeiro movimento foi entender o que existia. Percorri a plataforma antiga tela a tela, analisando UI, fluxos de navegação, estrutura de informação, padrões de interação e pontos de ruptura na jornada. A plataforma não tinha consistência visual entre módulos: dois padrões de navegação coexistiam sem critério, ora superior, ora lateral, e a identidade visual variava entre áreas. As jornadas eram fragmentadas e não havia um racional de UX estruturando as decisões tomadas ao longo do tempo.

![Três padrões de navegação coexistindo sem critério — o problema de inconsistência antes do redesign.](/images/cases/sellbie/redesign/sellbie-redesign-navegacao-antes-1.png)

![Três padrões de navegação coexistindo sem critério — o problema de inconsistência antes do redesign.](/images/cases/sellbie/redesign/sellbie-redesign-navegacao-antes-2.png)

![Três padrões de navegação coexistindo sem critério — o problema de inconsistência antes do redesign.](/images/cases/sellbie/redesign/sellbie-redesign-navegacao-antes-3.png)

Também levantei o material que a empresa já possuía: dados sobre as marcas atendidas, histórico de funcionalidades desenvolvidas e registros de suporte. Esse material foi a base inicial para formular as hipóteses que guiariam a pesquisa com usuários.

### Pesquisa com usuários

Antes da minha entrada, o time de CS havia realizado uma pesquisa com clientes via formulário. O material apontava dores em torno de filtros, relatórios, distribuição de contatos e integrações de canal, e evidenciou que a experiência de uso variava muito entre perfis: cada marca tinha uma estrutura organizacional própria e jornadas distintas dentro da plataforma.

Estruturei e conduzi entrevistas semiestruturadas com usuários. O processo incluiu briefing, screener, Matriz CSD e roteiro com blocos temáticos: uso atual, desafios e pontos de confusão, operacionalização, necessidades e sugestões, recursos favoritos, funcionalidades ausentes e experiência com o time de suporte. Os perfis eram variados, analistas e gestores de diferentes marcas, cada uma com dinâmica própria.

![Clusterização das entrevistas — padrões que definiram o foco da primeira entrega.](/images/cases/sellbie/redesign/sellbie-redesign-board-entrevistas.png)

![Aprendizados da pesquisa — síntese que orientou as decisões do redesign.](/images/cases/sellbie/redesign/sellbie-redesign-board-aprendizados.png)

O padrão mais crítico que emergiu foi a fragmentação entre criar uma campanha e criar um envio. Na plataforma, os envios (chamados de "ações") eram criados a partir da tela de relatório de uma campanha já existente, que podia estar completamente vazia, sem nenhum envio associado e sem nenhuma informação útil exibida. Essa ruptura de contexto concentrava a maior parte da confusão relatada nas entrevistas. Os dados também apontaram dificuldade em compreender o status das campanhas e dos envios, além de demanda por maior autonomia dentro da ferramenta e integrações mais completas entre canais.

Com o levantamento consolidado, o foco estava definido: o módulo de campanhas e envios era onde concentrar o esforço da primeira entrega.

---

## Define: proposta de UI, Design System e PRD

### Proposta de UI — aprovação antes de construir

Com o diagnóstico em mãos, o primeiro passo foi estruturar uma proposta de UI da nova plataforma para apresentar ao dono da empresa. Não havia como avançar sem essa aprovação: qualquer decisão de DS ou de fluxo dependia de uma direção visual acordada. A proposta definia a nova identidade visual, a arquitetura de navegação unificada e os padrões de interação que substituiriam a inconsistência existente. Era também o momento de alinhar expectativas sobre o que o redesign significaria visualmente para o produto, antes de qualquer linha de componente ser construída.

### Design System — alinhado com os desenvolvedores

Aprovada a proposta, o próximo passo foi construir a base do Design System em conjunto com os desenvolvedores, alinhando quais bibliotecas de desenvolvimento utilizariam para garantir que os componentes definidos no Figma tivessem correspondência direta com o que seria implementado, reduzindo retrabalho e acelerando a entrega.

O trabalho envolveu definição de paleta de cores com papéis claros (primário, neutros, cores funcionais de status), tipografia, iconografia, grid, estados de componente e biblioteca de componentes. As heurísticas de Nielsen serviram como critério técnico para construir esses componentes com embasamento: badges de status para comunicar visibilidade do sistema; ícones ⓘ nos campos para garantir que todos os perfis de uso, independente do nível de familiaridade com marketing ou CRM, compreendessem a linguagem da plataforma sem depender de conhecimento prévio; placeholders e contadores de caracteres para prevenir erro antes da falha; resumo consolidado antes da aprovação porque reconhecimento é mais eficiente do que memória.

### PRD — orientando uma prática que não existia

Com a UI aprovada e a base do DS estruturada, orientei e requisitei ao time de produto a construção do PRD para o primeiro módulo que seria desenhado: campanhas e envios pontuais. Não havia nenhum documento de produto anterior à minha entrada e o time não tinha essa prática estabelecida. Conduzi o processo, instruí sobre o que precisava ser definido e trabalhei junto para estruturar fluxos, regras de negócio, estados, comportamentos e escopo da entrega. Foi o que permitiu alinhar expectativas entre design, produto e tecnologia e viabilizar uma entrega com critério.

O processo não foi linear. A ausência de práticas estruturadas de produto fez com que definições precisassem ser revisitadas ao longo do caminho, com fluxos e ajustes acontecendo em paralelo à construção. Navegar esse ambiente foi parte do trabalho.

---

## Develop: nova arquitetura e fluxo de campanhas

### Estrutura de navegação

A nova plataforma organizou o produto em grandes áreas acessíveis pela navegação superior com submódulos via dropdown, refletindo o modelo mental dos usuários identificado nas entrevistas. O header foi padronizado com logotipo, navegação principal, ícones de suporte e notificações e acesso ao perfil. Um banner superior facilitava o acesso à plataforma antiga, já que a maior parte das funcionalidades ainda estava em migração e precisava permanecer acessível durante a transição.

### Módulo de Campanhas

**Listagem de campanhas**

A visualização em cards é a visão padrão da listagem. Cada card exibe tipo, ID, nome, datas, status com tooltip explicativo e quantidade de envios por canal. O menu de contexto apresenta as ações disponíveis de acordo com o status da campanha, como ativar, editar, aprovar, ver relatório e pausar. A visualização em lista, alternável por controles na própria página, permite escaneamento de grandes volumes com ordenação por coluna: Status, Nome, ID, Tipo, Data de início, Criado em, Última edição, Envios e Ações.

A separação entre abas **Pontuais** e **Jornadas** (antes chamadas recorrentes, mas sem automação de fluxo) organiza dois modelos de campanha com lógicas distintas sem misturar os contextos.

![Listagem de campanhas antes e depois — de tabela fixa para visualização em cards como padrão.](/images/cases/sellbie/redesign/sellbie-redesign-campanhas-antes.png)

![Nova listagem em cards — visão padrão com status, tipo e envios por canal em destaque.](/images/cases/sellbie/redesign/sellbie-redesign-campanhas-cards-depois.png)

![Nova listagem em lista — ordenação por coluna para quem trabalha com alto volume.](/images/cases/sellbie/redesign/sellbie-redesign-campanhas-listagem-depois.png)

**Empty state orientador**

Quando não há campanhas ou envios, a tela exibe um empty state com ilustração, mensagem direta e CTA. O padrão é consistente tanto na listagem de campanhas quanto na tela de envios dentro de uma campanha.

**Criação de envio — da tela de relatório ao drawer contextual**

Na plataforma antiga, o ponto de entrada para criar um envio era a tela de relatório de uma campanha já criada, que podia estar completamente vazia sem nenhum envio associado. Clicar em "Criar ação" redirecionava para uma página separada com stepper de 4 etapas lineares: formulário plano sem agrupamento, seleção de base densa sem contextualização e sem resumo consolidado antes de confirmar. Qualquer correção exigia refazer etapas.

![A decisão central do redesign: criar o envio dentro do contexto da campanha, não em uma página separada.](/images/cases/sellbie/redesign/sellbie-redesign-criacao-envio-antes-1.png)

![Fluxo antigo — etapas em página separada sem contexto da campanha visível.](/images/cases/sellbie/redesign/sellbie-redesign-criacao-envio-antes-2.png)

![Fluxo antigo — seleção de base densa sem resumo consolidado antes de confirmar.](/images/cases/sellbie/redesign/sellbie-redesign-criacao-envio-antes-3.png)

O redesign resolveu essa ruptura unificando campanha e envio em uma jornada contínua. A tela de envios da campanha exibe o nome e ID da campanha como referência constante, e o fluxo de criação abre em um drawer lateral sobre essa tela. O contexto da campanha permanece visível o tempo todo.

![Novo drawer contextual — campanha visível o tempo todo enquanto o envio é configurado.](/images/cases/sellbie/redesign/sellbie-redesign-criacao-envio-depois.png)

Ao clicar em "+ Criar envio", um dropdown apresenta os canais disponíveis: WhatsApp, E-mail e SMS. Canais não contratados pela marca aparecem desabilitados. Cada canal tem um fluxo com especificidades próprias, mas todos seguem a mesma estrutura de accordion progressivo com etapas expansíveis, permitindo navegar entre seções já concluídas sem refazer o fluxo.

O fluxo documentado é o de e-mail, organizado em três etapas:

**Etapa 1 — Dados primários:** Nome do envio (com tooltip explicando que não aparece para o cliente) e Data/hora de início, com inputs separados para data e hora.

**Etapa 2 — Conteúdo do envio:** Opções de conteúdo (Template salvo da biblioteca ou Criar conteúdo), Remetente, Rede de IP, UTM_campaign e Assunto com suporte a variáveis dinâmicas e emoji. Cada campo tem ícone ⓘ com explicação inline. A opção de visualizar o template antes de avançar está disponível diretamente na etapa.

**Etapa 3 — Base de clientes:** Opções de base (Todos os clientes, Bases salvas, Aniversariantes, Segmento, Base da promoção) com seleção de lojas participantes e toggle para excluir clientes que participam de outras campanhas. A base calculada exibe a quantidade antes de avançar.

![Etapa 1 — nome do envio e data/hora de início.](/images/cases/sellbie/redesign/sellbie-redesign-envio-drawer-email-etapa-1.png)

![Etapa 2 — template, remetente, UTM e assunto com variáveis dinâmicas.](/images/cases/sellbie/redesign/sellbie-redesign-envio-drawer-email-etapa-2.png)

![Etapa 3 — seleção de base com quantidade calculada antes de avançar.](/images/cases/sellbie/redesign/sellbie-redesign-envio-drawer-email-etapa-3.png)

**Validação e aprovação**

Antes de finalizar, o drawer exibe um Resumo do envio consolidando todas as informações configuradas: Dados da campanha, Dados primários, Conteúdo e Base de clientes, cada seção com edição inline. O usuário revê o conjunto completo e pode corrigir qualquer ponto sem refazer etapas.

A etapa de aprovação inclui envio de teste por celular ou e-mail e duas modalidades explícitas: Aprovar agora (envio agendado, status muda para Agendada) ou Aprovar mais tarde (salvo como Aguardando aprovação). Essa etapa formal de revisão e aprovação não existia na plataforma antiga.

![Resumo consolidado — revisão completa do envio com edição inline, sem precisar refazer etapas.](/images/cases/sellbie/redesign/sellbie-redesign-envio-drawer-email-etapa-resumo.png)

![Etapa de aprovação — formaliza a revisão antes do disparo, com duas modalidades explícitas.](/images/cases/sellbie/redesign/sellbie-redesign-envio-drawer-email-etapa-aprovacao.png)

---

## Resultados

A primeira entrega foi o módulo de campanhas e envios pontuais. Redesenhar a plataforma completa de uma vez seria inviável dada a complexidade do produto e a ausência de qualquer estrutura de partida. O recorte de escopo foi uma decisão deliberada, orientada pela pesquisa e viabilizada pelo PRD.

O fluxo de criação de campanhas e envios, o mais crítico segundo a pesquisa, saiu de um stepper linear em página separada, sem contexto e sem revisão, para um drawer contextual com accordion progressivo, resumo consolidado e etapa de aprovação estruturada. Cada campo, agrupamento e estado visual tem embasamento nas heurísticas que orientaram a construção do Design System.

Além da entrega do módulo, as fundações construídas ao longo do processo passaram a existir como infraestrutura para os próximos ciclos: o Design System como linguagem compartilhada entre design e desenvolvimento, o PRD como prática institucionalizada no time de produto e a pesquisa com usuários como processo estabelecido. O time passou a ter condições de continuar construindo com critério e autonomia.

**Indicadores de melhoria**

CES, CSAT e tempo de criação são projeções baseadas nas mudanças estruturais do fluxo, a serem validadas com coleta futura. As heurísticas aplicadas respondem diretamente a ausências identificadas na plataforma antiga.

| Indicador | Referência (plataforma antiga) | Projeção / melhoria aplicada |
|---|---|---|
| **CES — Criação de envio** | Alto esforço relatado; fluxo em página separada sem contexto | Redução de ~35% no esforço percebido: drawer contextual, accordion progressivo, campos agrupados por etapa |
| **CSAT — Usabilidade geral** | Insatisfação com usabilidade citada como dor recorrente | Melhora de ~25 a 30 pontos percentuais: consistência via Design System, navegação unificada, feedback de status |
| **Tempo médio de criação** | Sem medição formal; fluxo de 4 etapas em página separada com redirecionamento | Redução de ~40%: eliminação de redirecionamento, accordion navegável, auto-preenchimento |
| **Heurísticas aplicadas** | Ausência de visibilidade de status, consistência, prevenção de erros, reconhecimento e suporte contextual | Todas as heurísticas de Nielsen endereçadas no Design System: badges de status, ícones ⓘ, placeholders, contadores, resumo consolidado, aprovação estruturada |

---

**Usuários atendidos:** Analistas e gestores de marketing de marcas de varejo · Times de CRM · Coordenadores de campanhas
**Processo:** Imersão na plataforma existente → Pesquisa com clientes → Entrevistas com usuários → Proposta de UI → Design System → PRD → Redesign do módulo de campanhas e envios pontuais
**Entregáveis:** Mapeamento de fluxos existentes · Design System (Figma) · PRD · Arquitetura de navegação · Listagem de campanhas (cards e lista) · Empty states · Drawer de envio com accordion (e-mail, WhatsApp, SMS) · Resumo e aprovação de envio
**Ferramentas:** Figma · Pesquisa qualitativa (entrevistas semiestruturadas) · Pesquisa quantitativa (formulário via CS) · Heurísticas de Nielsen · Matriz CSD
