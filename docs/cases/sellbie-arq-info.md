## Problema

O backlog de projetos da plataforma era priorizado por valor de negócio e capacidade do time, o que faz todo sentido em um produto em crescimento. Só que esse ritmo de entrega não vinha acompanhado de um processo para pensar navegação: cada novo módulo encontrava um lugar no header conforme chegava, e os agrupamentos foram se formando por proximidade de entrega, não por lógica de uso.

Arquitetura da Informação é uma disciplina específica, e sem esse olhar a estrutura vai crescendo de forma orgânica até o ponto em que começa a criar fricção real para quem usa. Na prática, isso se traduzia em um time sem critério claro para decidir onde encaixar cada nova funcionalidade, e usuários que precisavam conhecer a história do produto para encontrar o que precisavam.

Com o tempo, os agrupamentos foram ficando cada vez menos intuitivos. O time percebeu que o header não refletia mais como o produto funcionava, e a demanda chegou: precisávamos reorganizar. Entrei para facilitar esse processo.

---

## Discovery

O ponto de partida foi mapear o que existia: todas as telas e funcionalidades da plataforma levantadas em um inventário de conteúdo no FigJam. Antes de propor qualquer estrutura nova, era preciso ter clareza do que precisava ser organizado.

O inventário confirmou o que já se percebia no uso: os agrupamentos do header tinham se formado por ordem de entrega, sem um critério de navegação por trás. Não havia nada errado com as decisões que foram tomadas. Simplesmente não havia uma prática estabelecida de pensar navegação como parte do processo. Era algo que ainda precisava ser construído.

Esse diagnóstico orientou os passos seguintes: antes de reorganizar, fazia sentido criar uma linguagem comum sobre arquitetura da informação — entender quais princípios guiam boas decisões de navegação e como aplicar isso de forma prática.

![Inventário de conteúdo no FigJam — ponto de partida antes de qualquer decisão de reorganização.](/images/cases/sellbie/arquitetura/sellbie-arq-info-inventario-figjam.png)

---

## Base metodológica

Antes de partir para a execução, fazia sentido criar uma base comum. Arquitetura da Informação tem princípios e vocabulário próprios. Sem esse repertório, as decisões de agrupamento ficam mais intuitivas do que intencionais. Quis que todos soubessem o que estavam fazendo e por quê antes de organizar qualquer cartão.

Para isso, estruturei e facilitei uma apresentação das heurísticas da Abby Covert como etapa anterior ao card sorting. São 10 princípios para avaliar e orientar decisões de navegação de forma prática:

**Findable** (Encontrável) · **Accessible** (Acessível) · **Clear** (Claro) · **Communicative** (Comunicativo) · **Useful** (Útil) · **Credible** (Confiável) · **Controllable** (Controlável) · **Valuable** (Valioso) · **Learnable** (Fácil aprendizado) · **Delightful** (Agradável)

Com esse repertório em mãos, os participantes chegaram ao card sorting entendendo quais qualidades uma boa estrutura de navegação precisa ter. Isso tornou as escolhas de agrupamento mais conscientes e a discussão dos resultados mais rica.

![Heurísticas de Abby Covert como base comum — participantes chegaram ao card sorting sabendo o que faz uma boa navegação.](/images/cases/sellbie/arquitetura/sellbie-arq-info-heuristicas-abby-covert.png)

---

## Card Sorting

Com o inventário mapeado e os participantes instrumentalizados, conduzimos sessões de card sorting com 6 pessoas selecionadas por terem conhecimento profundo da plataforma, representando produto, dados e design. Cada participante recebia os cartões com as funcionalidades e organizava em grupos que fizessem sentido, nomeando cada grupo livremente.

O formato escolhido foi o card sorting aberto, sem categorias pré-definidas, para revelar os modelos mentais reais sem contaminação da estrutura existente.

A análise das sessões revelou onde havia consenso natural, com funcionalidades que todo mundo agrupava da mesma forma, e onde havia ambiguidade real, com itens migrando entre grupos dependendo de quem organizava. Os pontos de divergência foram os mais valiosos: não eram erros, eram sinais de que o rótulo ou o escopo daquela funcionalidade precisava de mais clareza antes de qualquer decisão de navegação. Esses casos viraram discussões explícitas, em vez de decisões tácitas tomadas sem critério.

![Card sorting de dois participantes lado a lado — consensos viraram agrupamentos, divergências viraram discussões explícitas.](/images/cases/sellbie/arquitetura/sellbie-arq-info-card-sorting-resultado.png)

---

## Proposta de estrutura

Com os dados do card sorting analisados, montei a proposta de reorganização do header e da arquitetura de navegação da plataforma. As decisões foram tomadas a partir de três critérios: onde havia consenso claro nos agrupamentos, qual era a frequência de uso de cada funcionalidade, e como resolver os casos de divergência, posicionados pela jornada mais recorrente, não pela lógica de entrega.

**Novo agrupamento do header**
Seções reorganizadas a partir dos clusters de consenso do card sorting, com rótulos revisados para refletir o modelo mental identificado. Funcionalidades que geravam divergência foram posicionadas com base na tarefa principal que motivava o acesso, criando consistência sem precisar de consenso perfeito.

**Hierarquia por frequência de uso**
Itens de uso recorrente no header principal; configurações e suporte deslocados para área de atalhos, reduzindo o peso cognitivo da navegação principal sem remover o acesso a nada.

**Inventário de conteúdo atualizado**
Cada funcionalidade mapeada com sua posição proposta, nível de hierarquia e grupo de pertencimento. Passou a funcionar como documento de referência para o time: onde encaixar novos módulos, como nomear, o que agrupa com o quê, evitando que o problema se repetisse com cada nova entrega.

---

## Resultado

**Navegação reorganizada e implementada**
A proposta saiu do FigJam e foi para a plataforma. O header passou a refletir como o produto realmente funciona, organizado por modelo mental e não por ordem de entrega.

**Time com critério compartilhado**
Pela primeira vez, havia um racional explícito e documentado para onde cada funcionalidade deveria estar, consultável por qualquer pessoa do time na hora de tomar decisões de navegação.

**Base para escalar**
O inventário de conteúdo e os critérios de agrupamento passaram a funcionar como referência viva para decisões futuras, quebrando o ciclo de navegação que crescia sem estrutura.

---

**Públicos atendidos:** Time de Produto · Time de Dados · Time de Design
**Processo:** Inventário de conteúdo → Discovery → Base metodológica → Card sorting → Análise → Proposta de estrutura → Implementação
**Entregáveis:** Inventário de conteúdo · Mapa de heurísticas · Card sorting (×2) · Proposta de navegação aprovada e implementada
**Ferramentas:** FigJam
