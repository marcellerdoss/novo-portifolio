## Contexto

### Produto crescendo sem estrutura de métricas

O produto crescia em funcionalidades, algumas coisas já estavam sendo rastreadas no Amplitude, mas sem estrutura. A demanda veio do time: precisamos que os produtos tenham métricas.

O ponto de partida era esse: sem referência compartilhada, sem distinção clara entre evento, métrica e meta. Entrei para facilitar a construção junto com produto e dados.

---

## Por que o HEART

### Framework que conecta evento técnico à pergunta de produto

Antes de propor qualquer estrutura, precisava de uma base metodológica que fizesse sentido para a maturidade do time. O framework HEART, desenvolvido pelo Google, organiza métricas em cinco dimensões:

- **H**appiness: satisfação percebida pelo usuário
- **E**ngagement: profundidade e frequência de uso
- **A**doption: se novas funcionalidades estão sendo descobertas e utilizadas
- **R**etention: se os usuários continuam voltando
- **T**ask Success: se os usuários conseguem concluir o que precisam

O diferencial do HEART não é só a categorização. É a cadeia de raciocínio que ele exige: para cada dimensão, você define uma **meta** (intenção estratégica), um **sinal** (comportamento observável), uma **métrica** (o número) e como medir. Isso força o time a conectar o evento técnico à pergunta de produto, algo que ainda não existia como prática.

Adaptei o framework adicionando duas colunas: **Objetivo** (o que queremos entender com essa métrica) e **Como configurar** (como instrumentar o rastreamento na ferramenta).

---

## Como construímos

### Do framework por módulo ao plano de ação

Primeiro, montei a estrutura-mãe com o framework completo e exemplos reais para cada dimensão. Isso deu ao time uma linguagem comum antes de aplicar em cada módulo.

Depois, levamos para as sessões: trabalhamos módulo por módulo no FigJam, com produto e dados juntos. Para cada módulo, o time mapeava quais métricas faziam sentido naquele contexto, qual o objetivo de cada uma e como seriam medidas.

A restrição era real: não dava para mapear tudo. Tempo escasso, time pequeno, instrumentação parcial. Então a discussão também passou por priorização: o que é essencial rastrear agora, dentro da maturidade que temos.

Esse filtro foi importante para não criar um backlog impossível. Saímos de cada sessão com métricas priorizadas, não com uma lista completa que nunca sairia do papel.

---

## O que foi construído

### Estrutura-mãe, módulos e diagnóstico de instrumentação

**Framework HEART: estrutura-mãe**
Documento de referência com as cinco dimensões detalhadas. Para cada dimensão, entre duas e três métricas com a cadeia completa: meta → sinal → métrica → objetivo → como medir → como configurar. Funcionou como o "dicionário" do time, o lugar onde qualquer pessoa poderia buscar o que uma métrica significa e como configurar.

![Framework HEART adaptado — cada métrica conectada a uma meta, um sinal e um objetivo de produto.](/images/cases/sellbie/metricas/sellbie-metricas-heart-estrutura-mae.png)

**Aplicações por módulo (×5)**
Uma instância da estrutura para cada módulo: ChatCRM, Painel 360, Performance de Vendas, Campanhas e Jornadas e Relatório de Email, com métricas e parâmetros específicos daquele contexto. Manter a mesma estrutura visual em todos os módulos foi intencional: facilita comparação e reduz esforço cognitivo.

![Cinco módulos com a mesma estrutura — comparação fácil, esforço cognitivo reduzido.](/images/cases/sellbie/metricas/sellbie-metricas-heart-modulos-lado-a-lado.png)

**Diagnóstico de instrumentação**
Para o módulo mais avançado em discussão, cada métrica foi avaliada como mapeada ou não mapeada no Amplitude, com exemplos do que precisaria ser construído para rastrear. Transformou a estrutura em plano de ação técnico.

**Plano de encaminhamento: Fase 1, Adoção**
Artefato de priorização com meta da fase seguinte, critérios de sucesso, tarefas de usuários que ainda não chegavam à meta e como o time acompanharia semana a semana. Garantiu que a estrutura não ficasse só no FigJam.

---

## Resultado

### Vocabulário comum e backlog formal de instrumentação

**O time passou a ter vocabulário comum:** reuniões de priorização pararam de misturar sinal, métrica e meta como se fossem a mesma coisa.

**Instrumentação saiu do backlog informal:** cada módulo tinha um diagnóstico claro do que estava ou não rastreado, com o que precisaria ser feito para instrumentar.

**Produto com direção mensurável:** adoção, engajamento e abandono passaram a ter um lugar claro para ser acompanhados.

---

**Públicos atendidos:** Time de Produto · Time de Dados
**Processo:** Diagnóstico → Estruturação do framework → Facilitação por módulo → Priorização → Plano de ação
**Entregáveis:** Framework HEART adaptado · Aplicações por módulo (×5) · Diagnóstico de instrumentação · Plano de encaminhamento
**Ferramentas:** FigJam · Amplitude
