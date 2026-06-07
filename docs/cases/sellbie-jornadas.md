## Contexto

A Sellbie é uma plataforma omnichannel de CRM e marketing voltada para marcas de varejo que operam lojas físicas e e-commerce. Diferente das plataformas de automação que nascem no digital, a Sellbie integra comportamentos de PDV, histórico de compras em loja, relacionamento com vendedor e dados de navegação no e-commerce em um único lugar.

O produto mais próximo de automação que a plataforma tinha eram as Campanhas Recorrentes, que permitiam criar réguas básicas a partir de gatilhos como aniversário, pós-compra e reativação, mas dentro de uma lógica linear e sem reação ao comportamento do cliente. A demanda por algo mais sofisticado era recorrente: presente em dados de atendimento do time de CS, em resultados de pesquisa e nas entrevistas com usuários que conduzi na minha entrada na empresa.

Jornadas nasceu dessa demanda. Produto novo, com a Campanha Recorrente como referência de partida: o que existia, o que funcionava e onde estava o teto. O escopo era significativamente maior: mais de 20 gatilhos, 3 canais, regras de conexão não-lineares e feedbacks para cada estado possível.

O desafio não era só desenhar um workflow. Era garantir que um produto com essa complexidade fosse construível pelo usuário sem quebrar, e construído pelo time sem perder critério.

---

## Discovery

### O que as recorrentes não resolviam

O primeiro movimento foi imersão na Campanha Recorrente existente para entender o que estava lá e o teto do que era possível. O modelo era um formulário linear: o usuário selecionava um gatilho (1ª compra, compra, aniversário, inatividade, cashback, carrinho abandonado), definia um horário fixo, configurava D+ em dias e adicionava envios manualmente um a um. Um fluxo engessado, sem progressão e limitado para organizar uma régua consistente de relacionamento.

![Campanha Recorrente — o que existia antes das Jornadas: linear, sem ramificação, sem reação ao comportamento.](/images/cases/sellbie/jornadas/sellbie-jornadas-campanha-recorrente-antes.png)

Era funcional para réguas simples. Mas três limitações eram críticas e recorrentes:

**Sem acompanhamento do comportamento.** O fluxo executava o calendário independente do que o cliente tivesse feito. Quem já comprou recebia a mesma mensagem de quem estava há seis meses inativo.

**Sem ramificação.** Não havia como dizer "se engajou com o e-mail, vá por aqui; se não engajou, vá por lá." Linear por design.

**Cobertura limitada de e-commerce.** Carrinho abandonado existia como gatilho, mas a régua completa de comportamentos digitais ficava de fora: navegação em categoria, produto visitado, busca realizada.

### Benchmarking

Antes de propor qualquer arquitetura, mapeei como outras plataformas de automação estruturavam seus construtores de fluxo. O benchmark combinou dois formatos: acesso direto a uma plataforma que a equipe já utilizava por contrato, e análise de telas e documentação de outras ferramentas a partir de materiais disponíveis publicamente, como conteúdos sobre automação de marketing, capturas de tela e documentações de produto.

O padrão mais comum nas plataformas analisadas era uma boa cobertura de comportamentos digitais. Nos fluxos observados, não foram identificadas abordagens que integrassem a loja física com a profundidade que a Sellbie precisava, com vendedor preferencial, encarteiramento, cashback e segmentação por comportamento em PDV. Esse era o espaço de diferenciação real, e foi o que orientou as decisões de arquitetura.

Outra observação relevante: em algumas dessas plataformas, o feedback sobre configurações incorretas aparecia apenas no momento de salvar o fluxo. Isso orientou uma decisão de design da Sellbie de trabalhar prevenção de erro ao longo de toda a construção, não só no final.

Com diagnóstico e benchmarking consolidados, o escopo estava definido: um workflow visual, não-linear, livre o suficiente para cobrir jornadas complexas, mas estruturado o suficiente para guiar o usuário e evitar configurações que comprometessem os disparos.

---

## Define

### PRD e alinhamento com produto

Trabalhei junto ao time de produto na construção e revisão dos PRDs de cada módulo: cadastro e configurações, gatilhos, intervalos, canais, dividir caminho e biblioteca de templates. Cada PRD definia regras de negócio, estados, comportamentos e restrições por plano contratado, e foi o que permitiu que design e tecnologia falassem a mesma língua ao longo de todo o processo.

### A decisão de arquitetura: canvas livre com gramática estruturante

A alternativa mais simples seria um formulário em etapas sequenciais, mais fácil de construir, mais previsível. Mas não refletiria a realidade: um cliente pode entrar, abrir um e-mail, comprar e sair. Outro pode ignorar três envios, receber um SMS e converter. O modelo mental de jornada não é linear.

A decisão foi um canvas de arrastar e soltar com gramática de conexão que espelhasse as regras de negócio. Não por estética, mas porque erros de conexão entre steps se traduzem em disparos incorretos, bases erradas atingidas e resultados de campanha comprometidos. A liberdade de montar qualquer fluxo precisava coexistir com a impossibilidade de montar um fluxo inválido.

Os steps do canvas:

- **Gatilho de entrada** — o evento que insere o cliente na jornada
- **Intervalo** — o tempo de espera entre steps
- **Canal** — o envio (e-mail, SMS, WhatsApp)
- **Dividir / unir caminho / migrar / sair** — controle de fluxo em todas as dimensões

### Gramática de conexão e prevenção de erros

O mapeamento das regras de conexão foi um entregável central: não apenas documentação, mas a lógica que governa o que é possível construir:

- Gatilho de entrada conecta sempre a um **Intervalo**
- Intervalo conecta a **Canal**, **Dividir caminho** ou **Sair da jornada**
- Canal conecta a **Intervalo** ou **Sair da jornada**
- Dividir caminho entra de um **Intervalo**, sai por Sim/Não, e cada caminho conecta a **Canal**, **Unir caminho**, **Migrar jornada** ou **Sair da jornada**

Cada violação tem uma mensagem específica. Tentar conectar gatilho direto a canal retorna: *"Conecte o gatilho de entrada a um intervalo para iniciar a jornada."* Tentar conectar canal direto a dividir caminho retorna: *"Conecte seu step de canal a um intervalo. Apenas um intervalo pode se conectar a um step de dividir caminho."*

Steps com configuração incompleta exibem um alerta sobre o que falta, sem bloquear a navegação, mas impedindo ativar a jornada com pendências. Essa distinção foi deliberada: bloquear durante a construção aumenta fricção, bloquear na ativação garante integridade sem punir o processo iterativo.

---

## Develop

### Criação de jornadas

As jornadas configuram um modelo de campanha diferente das campanhas pontuais, organizadas em aba própria dentro de Campanhas. Ao criar uma nova campanha, o usuário escolhe entre os modelos disponíveis, um deles sendo Jornada. A visão geral exibe os fluxos em cards ou lista, com identificação, tipo, datas, status e contagem de envios por canal disponíveis para leitura rápida.

![Jornada como modelo de campanha — ponto de entrada integrado ao fluxo existente da plataforma.](/images/cases/sellbie/jornadas/sellbie-jornadas-menu-criacao.png)

![Visão geral em cards — status, canais e identificação de cada jornada em leitura rápida.](/images/cases/sellbie/jornadas/sellbie-jornadas-visao-geral-cards.png)

Ao selecionar Jornada, um painel lateral captura os dados básicos: nome (identificação interna, invisível ao cliente final), tipo de jornada, descrição, data de início e lojas participantes. O tipo carrega uma descrição pré-preenchida que orienta o propósito do modelo. Ao salvar, a jornada é criada como rascunho e o usuário entra no canvas.

![Painel de criação — dados básicos da jornada antes de entrar no canvas.](/images/cases/sellbie/jornadas/sellbie-jornadas-painel-criacao.png)

### Gatilhos de entrada

Com a jornada criada, o canvas abre com o step de gatilho de entrada já posicionado. É o único step fixo do canvas: sem ele nenhuma jornada funciona, e por isso não pode ser excluído. O painel lateral exibe os gatilhos organizados por categoria para que o usuário selecione e configure o comportamento de entrada.

Cada gatilho tem configuração específica e disponibilidade condicionada ao perfil da marca. Uma marca que opera apenas loja física não acessa os gatilhos de navegação digital. Uma que opera apenas e-commerce não acessa os gatilhos vinculados a vendedor. Os gatilhos de navegação exigem integração de tag no e-commerce da marca. O que não está disponível aparece desabilitado com indicação de upgrade, sem sumir da interface.

As categorias refletem a amplitude omnichannel do produto: **Compra** (Compra, Primeira compra, Sem compra), **Cadastro** (Aniversário, Cadastro de lead), **Navegação** (Abandono de carrinho), complementadas por CRM e Fidelização no conjunto completo.

![Mais de 20 gatilhos organizados por categoria — comportamentos de loja física e e-commerce no mesmo canvas.](/images/cases/sellbie/jornadas/sellbie-jornadas-gatilhos-canvas.png)

### Configurações da jornada

As regras globais da jornada ficam acessíveis via ícone de configuração no canvas, em qualquer momento da construção do fluxo:

- **Intervalos da jornada** — se os finais de semana são considerados ou não na contagem dos intervalos entre steps
- **Frequência de entrada** — quantas vezes o mesmo cliente pode entrar na jornada: apenas uma vez até concluir, sempre que o gatilho ocorrer, ou novamente após um período de descanso configurável
- **Saída da jornada** — quando o cliente deve sair do fluxo: ao concluir a última etapa, ao realizar uma compra durante a jornada, ou ao entrar em uma nova jornada

![Configurações globais da jornada — regras de entrada, frequência e saída definidas antes de construir o fluxo.](/images/cases/sellbie/jornadas/sellbie-jornadas-configuracoes-jornada.png)

**Nota — Biblioteca de templates:** as configurações específicas de cada envio são definidas na Biblioteca de Templates, um produto independente da plataforma. Os templates precisam existir antes de a jornada ser criada. Ao chegar num step de canal, o usuário seleciona um template já configurado e segue em frente, sem interromper o raciocínio da jornada. A biblioteca organiza os templates por canal (E-mail, WhatsApp, SMS) e por tipo (Pontuais / Jornadas), com criação guiada em etapas.

![Biblioteca de templates organizada por canal — o conteúdo existe antes da jornada ser construída.](/images/cases/sellbie/jornadas/sellbie-jornadas-biblioteca-templates-geral.png)

![Criação de template em etapas — tipo, canal e conteúdo definidos de forma guiada.](/images/cases/sellbie/jornadas/sellbie-jornadas-biblioteca-templates-criacao.png)

### Intervalos

O PRD original definia três tipos de intervalo, um para cada lógica de canal. Na prática, isso criava fricção: o usuário precisava conhecer as regras de cada canal antes de escolher o tipo certo de intervalo, e se mudasse o canal depois, teria que excluir o step, localizar o modelo correto e reconfigurar do zero.

Durante a aplicação e análise de usabilidade, identificamos que a complexidade estava no lugar errado. As restrições pertenciam ao canal, não ao step de intervalo. A decisão foi unificar em um único step configurável, que se adapta ao canal conectado e sinaliza quando a configuração não é compatível, sem exigir que o usuário saiba de antemão as regras de cada canal.

O step unificado oferece tempo de espera com seleção de quantidade e período (minutos, horas ou dias), e uma opção para agendar data e hora de início do envio. Se o usuário conectar uma configuração incompatível com o canal, o sistema sinaliza sem precisar excluir e recriar o step.

Considere a inclusão ou exclusão dos fins de semana ao programar o intervalo. Essa configuração fica no menu de configurações da jornada. O canal de WhatsApp 1:1 não identifica horas específicas, pois a base é distribuída sempre no primeiro horário da manhã; esse horário pode variar conforme as configurações de integração da marca.

![Step de intervalo — configuração de tempo de espera e horário de envio.](/images/cases/sellbie/jornadas/sellbie-jornadas-step-intervalo-1.png)

![Step de intervalo — sinalização de incompatibilidade com o canal conectado.](/images/cases/sellbie/jornadas/sellbie-jornadas-step-intervalo-2.png)

### Canais

A presença de múltiplos canais não é só uma questão técnica. Cada canal corresponde a uma forma diferente de o cliente final ser alcançado, e a escolha entre eles faz parte do planejamento estratégico das marcas para CRM, relacionamento e reengajamento. Uma régua que combina e-mail, WhatsApp e SMS permite trabalhar diferentes momentos da jornada com a linguagem e o grau de proximidade certos para cada um.

Ao configurar um step de canal, o usuário seleciona o template a ser utilizado. Cada canal tem suas próprias especificidades de configuração e alertas contextuais:

**E-mail** — além do template, o usuário configura remetente, rede de IP, UTM_campaign e assunto. Os envios começam no horário configurado no intervalo e podem levar alguns minutos dependendo do tamanho da base.

**WhatsApp 1:1** — canal do vendedor de loja física. Os envios são distribuídos no aplicativo pela manhã, entre 8h e 10h aproximadamente. A configuração se limita à seleção do template, pois o timing é controlado pelo processo de encarteiramento.

**SMS** — os envios começam no horário configurado. Apenas clientes com número de celular associado recebem os envios; os demais avançam para o próximo step sem travar o fluxo.

Canais não contratados aparecem desabilitados com indicação de upgrade, consistente com o comportamento dos gatilhos.

![Configuração de e-mail — template, remetente e rastreamento em um único painel.](/images/cases/sellbie/jornadas/sellbie-jornadas-canal-email.png)

![Canal WhatsApp 1:1 — envio pelo vendedor de loja física, distribuído no app pela manhã.](/images/cases/sellbie/jornadas/sellbie-jornadas-canal-whatsapp.png)

![Canal SMS — restrições e comportamento do canal explícitos na configuração, sem surpresa no disparo.](/images/cases/sellbie/jornadas/sellbie-jornadas-canal-sms.png)

### Dividir caminho, unir, migrar e sair

**Dividir caminho** ramifica o fluxo em Sim/Não a partir do comportamento do cliente. Gatilhos de ação, como comprou, atingiu objetivo e upgrade de segmentação, estão sempre disponíveis. Gatilhos por canal, como recebeu, abriu e clicou para e-mail, aparecem apenas quando conectado a um envio anterior.

**Unir caminho** reconecta caminhos separados por um dividir, para quando a diferença de tratamento é temporária e o fluxo seguinte é o mesmo para ambos os perfis.

**Migrar jornada** transfere o cliente para outra jornada já cadastrada, sem exigir o mesmo gatilho de entrada, permitindo encadear jornadas com lógicas distintas sem concentrar toda a complexidade em um único fluxo.

**Sair da jornada** encerra o fluxo naquele ponto, posicionado pelo usuário, diferente das regras de saída globais configuradas no início.

![Dividir caminho — o fluxo reage ao comportamento do cliente, não só ao calendário.](/images/cases/sellbie/jornadas/sellbie-jornadas-acoes-steps.png)

### Entrada antecipada (D-)

Jornadas normais partem de um evento que já ocorreu. A Entrada Antecipada inverte: o cliente entra X dias antes do evento e a jornada conduz uma régua de comunicação progressiva até que ele chegue.

Um exemplo direto: uma marca quer trabalhar os aniversariantes do mês com uma oferta exclusiva para usar antes da data. Com a entrada antecipada configurada para 30 dias antes do aniversário, o cliente recebe uma sequência de comunicações ao longo do mês, com mensagem de ativação, lembrete e última chamada. A jornada sabe exatamente em que ponto da contagem cada cliente está.

O problema de design era a ambiguidade temporal: como o usuário sabe, enquanto monta o fluxo, se um envio acontece antes ou depois do evento? A solução foi sinalização automática nos cards. Steps após o evento exibem *"X dia(s) após o evento"* e o step no dia exibe *"Aqui é o dia do evento."* Em fluxos com ramificações, o alerta aparece em todos os primeiros envios pós-evento em cada caminho.

Quando o usuário configura saída imediata após o evento e tenta adicionar envios depois, o sistema bloqueia a conexão com feedback explicativo, impedindo uma configuração contraditória sem punir o processo de construção.

![Entrada antecipada — a jornada começa antes do evento e sinaliza automaticamente onde cada envio cai na linha do tempo.](/images/cases/sellbie/jornadas/sellbie-jornadas-entrada-antecipada.png)

---

## Resultados

Jornadas substituiu as Campanhas Recorrentes com uma camada de inteligência que o produto não tinha. Pela primeira vez, as marcas puderam construir fluxos que reagiam ao comportamento do cliente, não só ao calendário, e a Sellbie passou a oferecer automação de marketing como um diferencial real da plataforma, não uma promessa em aberto.

**Produto novo lançado:** workflow visual com canvas livre, gramática de conexão estruturante e prevenção ativa de erros ao longo de toda a construção. Um produto que a base de clientes vinha pedindo, que agora posicionava a Sellbie de forma competitiva frente às plataformas de automação do mercado.

**Mais de 20 gatilhos** em 6 categorias, combinando e-commerce em tempo real e loja física. Nos fluxos observados durante o benchmarking, não foram identificadas abordagens que integrassem esses contextos com a mesma profundidade. O diferencial omnichannel da Sellbie finalmente se traduzia num produto de automação.

**Entrada antecipada (D-):** modelo de automação inédito na plataforma, que permitiu às marcas planejarem réguas progressivas antes de eventos futuros como aniversário, expiração de cashback e fim de promoção.

O processo também estabeleceu infraestrutura para os ciclos seguintes: PRDs como prática documentada, Design System como linguagem compartilhada com desenvolvimento e um modelo de colaboração que permitiu ao time continuar construindo com critério e autonomia.

---

**Usuários atendidos:** Analistas e gestores de CRM e marketing de marcas de varejo · Times de e-commerce · Coordenadores de campanhas
**Processo:** Imersão na plataforma existente → Benchmarking competitivo → Mapeamento de regras de negócio e PRD → Arquitetura do workflow → Design dos gatilhos, configurações, intervalos, canais e controle de fluxo
**Entregáveis:** Canvas não-linear com gramática de conexão · Prevenção de erros por step · Mais de 20 gatilhos com configurações específicas · Configurações globais da jornada · Dividir / unir / migrar / sair · Entrada antecipada (D-)
**Ferramentas:** Figma · Benchmarking competitivo · PRD colaborativo · Design System
