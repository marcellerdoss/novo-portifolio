# Dados que viram decisão.

**Sellbie · UX Strategy · fev 2026 – presente**

Empresa: Sellbie
Função: UX Strategy & Product Experience
Tipo: Research · Business Intelligence · Proposta UX

*Dados nas telas são ilustrativos para fins de portfólio.*

**Tags:** Levantamento · Mapa de oportunidades · Proposta UX · Figma Make

---

## Problema

O CS da Sellbie acompanha a performance de CRM das marcas usando dados da plataforma, mas sem estrutura analítica clara. Cada reunião exigia montagem manual de análise, sem padrão e sem direcionamento estratégico. O produto também não tinha visibilidade consolidada do que funcionava nas operações de CRM.

A demanda chegou como um desafio aberto: estruturar um Relatório de Performance de CRM sem escopo definido, o que exigiu mergulhar no produto para construir o racional do zero — do levantamento dos indicadores à proposta de UX, transformando dados dispersos em inteligência acionável para CS e produto.

---

## Levantamento

O ponto de partida foi mapear tudo que existia — indicadores disponíveis na plataforma, o que o CS já reportava, como reportava e o que faltava para tornar esse reporte estratégico.

Esse levantamento incluiu análise dos materiais que o CS já usava em reuniões com clientes — apresentações, planilhas, relatórios exportados manualmente — e mapeamento dos indicadores disponíveis na plataforma, organizados em 6 dimensões:

**Perfil de clientes** Super VIPs, VIPs, Frequentes, Potencial, Inativos, Perdidos, Prospects

**Comportamento** Frequência, Recência, Retenção, Recompra, Resgate, Evolução de segmentos, Clientes novos

**Qualidade da base** Associação, Cadastros completos, Celular, E-mail, Nascimento, Endereço, Sexo

**Execução CRM** App, Impacto, Conversão, Campanhas, Jornadas ativas, Distribuição por loja

**Performance omni** Físico, Digital, Omni, Carrinho abandonado, Receita por canal, Comparativo com mercado

**Indicadores comerciais** Receita, Ticket médio, Atendimentos, Compradores, Peças, P/A, Variação vs anterior

A partir desse levantamento, também estruturei um **Healthscore de CRM** — pontuação de 0 a 40 por loja com 4 dimensões: Associação, Cadastro completo, Utilização do App e Conversão. Faixas: Saudável (29–40), Atenção (17–28) e Crítico (0–16). O objetivo era dar ao CS um número único que comunicasse maturidade operacional sem precisar abrir cada indicador individualmente.

![Materiais que o CS usava antes — ponto de partida para entender o esforço e as lacunas do processo.](/images/cases/sellbie/crm/sellbie-crm-relatorio-levantamento-materiais.png)

---

## Mapa de oportunidades

Com o levantamento em mãos, estruturei um mapa conectando problema observado, oportunidade, solução proposta e resultado esperado em 10 dimensões:

**Visibilidade executiva** sem um número único de saúde operacional, o CS não sabia por onde começar a análise.

**Funil sem clareza** os dados existiam por etapa, mas sem conexão visual entre causa e efeito.

**Base subutilizada** grande parte da base com potencial não era impactada por falta de visibilidade sobre quem priorizar.

**Segmentação sem uso prático** os segmentos existiam na plataforma, mas sem leitura de qualidade ou propensão integrada.

**Execução desconectada do resultado** o CS via o que foi enviado, mas não o gap entre o que foi feito e o que era possível.

**Canais sem comparativo de eficiência** não havia visão lado a lado de qual canal performava melhor para cada perfil.

**Alertas dispersos** problemas críticos não tinham visibilidade centralizada nem linguagem acionável.

**Oportunidades sem priorização financeira** o CS identificava oportunidades, mas sem estimativa de impacto para priorizar.

**Ação separada do diagnóstico** para montar uma campanha após identificar uma oportunidade, o CS precisava sair do relatório e ir a outro sistema.

**Planejamento sem suporte** não havia ferramenta para simular impacto ou estruturar um plano de comunicação dentro da plataforma.

O problema central era claro: o relatório existia como dado bruto, sem estrutura de leitura, sem conexão com ação. O CS gastava horas montando análise manual, e mesmo assim a entrega era inconsistente e difícil de escalar.

A oportunidade central: transformar o CRM de analítico para estratégico, com dados que geram direcionamento automático de ação, não só exibição de número.

![Mapa de oportunidades — cada problema conectado a uma solução e resultado esperado antes de qualquer tela.](/images/cases/sellbie/crm/sellbie-crm-relatorio-mapa-oportunidades.png)

---

## Proposta UX

Com o mapa de oportunidades como base, estruturei uma proposta com 13 seções — cada uma com conteúdo definido, dor que resolve, oportunidades identificadas, resultado esperado e proposta de UX. A decisão de documentar cada seção com esse nível de detalhe foi intencional: garantir que cada tela tivesse propósito claro antes de qualquer pixel ser desenhado.

As 13 seções foram organizadas em 4 blocos funcionais:

**Diagnóstico e saúde operacional**
Healthscore, share de receita CRM, variação vs período anterior e resumo interpretativo. A decisão de abrir com um número único de saúde operacional foi para dar ao CS um ponto de partida rápido, sem precisar navegar pelo relatório inteiro para entender se a conta está bem ou mal.

**Funil e base**
Funil integrado da base total à receita, distribuição por segmento, comportamento do cliente e performance por segmento. O funil foi desenhado para tornar o gargalo visível automaticamente, sem o CS precisar calcular onde está a perda.

**Execução e performance**
Base impactada, campanhas, jornadas, canais, cashback e performance por loja. O foco aqui foi conectar execução a resultado, mostrando não só o que foi feito, mas o gap entre o que foi feito e o que era possível fazer.

**Inteligência e ação**
Alertas prioritários, oportunidades ordenadas por impacto financeiro, direcionamentos de ação e simulação de impacto. Essa camada foi a mais importante da proposta: transformar o dado em recomendação acionável, com potencial de receita estimado para cada oportunidade.

---

## Consolidação

Em consolidação com o PM, a proposta foi implementada no Figma Make com 4 módulos principais, cada um com um propósito distinto dentro da jornada do CS.

**Diagnóstico**
Ponto de entrada do relatório. Healthscore, participação da receita CRM, variação vs anterior e base com potencial em uma tela. Abaixo, 11 análises detalhadas navegáveis e recomendações estratégicas priorizadas por impacto financeiro, com link direto para a seção relevante.

A decisão de centralizar as recomendações no diagnóstico foi para que o CS chegasse na reunião com os direcionamentos já prontos, sem precisar navegar pelo relatório inteiro para montar o argumento.

**Funil Integrado**
Visão completa da jornada: Base Total → Base Válida → Com Potencial → Não Impactados → Impactados → Compradores → Receita. Cada etapa mostra a taxa de conversão e destaca automaticamente o maior gargalo identificado.

A decisão de usar funil horizontal, com percentual de queda visível entre etapas e destaque automático do problema, foi para reduzir o esforço cognitivo do CS — o gargalo aparece sem precisar calcular.

**Gerador de Base Alta Propensão**
Ferramenta para o CS montar a base de uma campanha diretamente no relatório. Seleção por período sem impacto, distribuição por segmento e canal preferencial, com filtragem por segmento, ticket médio e recência.

A decisão de incluir esse módulo veio de uma dor específica do levantamento: o CS precisava ir a outro sistema para montar a base de uma campanha depois de identificar a oportunidade. Trazer isso para dentro do relatório fecha o ciclo entre diagnóstico e ação.

**Calculadora de Plano de Comunicação**
Inputs da marca, premissas editáveis e régua inteligente por canal, transformando o relatório em ferramenta de planejamento, não só de análise.

![Dashboard de diagnóstico — CS chega na reunião com Healthscore, variação e recomendações já prontas na tela.](/images/cases/sellbie/crm/sellbie-crm-relatorio-make-1-dashboard.png)

![Funil integrado — o gargalo aparece automaticamente, sem o CS precisar calcular onde está a perda.](/images/cases/sellbie/crm/sellbie-crm-relatorio-make-2-analise-funil-integrado.png)

![Gerador de base dentro do relatório — diagnóstico e ação no mesmo lugar, sem precisar ir a outro sistema.](/images/cases/sellbie/crm/sellbie-crm-relatorio-make-3-gerador.png)

---

## Resultado

Proposta validada com PM e implementada no Figma Make.

**CS opera com estratégia** diagnóstico, oportunidades e direcionamentos prontos na tela, sem montagem manual. De reunião improvisada para argumento baseado em dado.

**Produto ganha visibilidade** padrões de comportamento, gargalos e oportunidades em estrutura coesa. O que funcionava nas operações de CRM passa a ser visível e replicável.

**De analítico para estratégico** cada seção conecta dado a ação, com simulação de impacto financeiro para priorização. O relatório deixa de ser arquivo e passa a ser ferramenta de decisão.

---

**Públicos atendidos:** CS · Produto
**Processo:** Levantamento → Mapa de oportunidades → Proposta UX (13 seções) → Consolidação com PM
**Módulos:** Diagnóstico · Funil Integrado · Gerador de Base Alta Propensão · Calculadora de Plano
**Ferramentas:** Figma · Figma Make
