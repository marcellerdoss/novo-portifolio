## Problema

### Central genérica para três perfis radicalmente diferentes

A central de ajuda existia, mas servia a todos da mesma forma: um único conteúdo genérico que não resolvia as dúvidas específicas de cada perfil. A plataforma atendia simultaneamente Exploradores (alunos), Educadores (professores e coordenadores) e Responsáveis (pais e familiares), públicos com contextos de uso, vocabulário e dúvidas radicalmente diferentes. Uma dúvida de acesso de um responsável não tem nada a ver com uma dúvida pedagógica de um educador.

A ausência de estrutura segmentada gerava acionamento recorrente do time de atendimento para dúvidas que poderiam ser resolvidas por autoatendimento, e dificultava que cada perfil encontrasse as informações relevantes para ele de forma rápida e independente.

O desafio era transformar uma central de ajuda genérica em uma estrutura navegável, segmentada por persona e escalável, que permitisse a cada perfil encontrar a resposta certa sem precisar filtrar conteúdo que não era para ele.

Meu papel foi conduzir o benchmarking, estruturar a arquitetura de informação, definir fluxos e requisitos, e entregar o handoff para desenvolvimento.

---

## Benchmarking

### O que as plataformas de referência fazem diferente

O ponto de partida foi entender como centrais de ajuda com múltiplos perfis de usuário resolviam o problema de segmentação de conteúdo. O benchmarking incluiu referências como LinkedIn e outras plataformas com bases de conhecimento estruturadas para públicos distintos.

Os principais padrões identificados e o que cada um informou na solução:

**Navegação segmentada** por tipo de usuário como mecanismo principal de organização, o que apontou para a necessidade de a persona ser o ponto de entrada, não um filtro posterior

**Busca como discovery** principal, não só como alternativa à navegação, reforçando que a busca precisava ser contextualizada por perfil desde o início

**Hierarquia clara** de categorias e artigos dentro de cada perfil, para que o usuário soubesse onde estava e para onde podia ir

**Tratamento de erros** de digitação com sugestão de termos similares, para não abandonar o usuário no primeiro obstáculo

**Estados vazios** para buscas sem resultado, com direcionamento para alternativa em vez de beco sem saída

**Feedback de utilidade** dos artigos, como mecanismo de validação e melhoria contínua do conteúdo após o lançamento

---

## Mapa de oportunidades

### Três oportunidades que definiram a arquitetura

O problema central era estrutural: o conteúdo existia, mas a arquitetura não distinguia quem estava lendo. Um educador buscando como criar uma prova e um responsável buscando como acompanhar o filho chegavam no mesmo lugar, com o mesmo resultado, e precisavam filtrar manualmente o que era para eles.

A estrutura foi desenhada considerando que a Jovens Gênios opera duas plataformas distintas, uma para Educadores e uma para Exploradores, com necessidades de suporte específicas para cada contexto de uso. Isso reforçou a decisão de não criar uma central unificada genérica, mas sim um espaço com entradas independentes por persona. O benchmarking com plataformas de grandes empresas validou que esse modelo de segmentação era o padrão em produtos com bases de usuários heterogêneas.

Três oportunidades foram priorizadas a partir desse diagnóstico:

**Contexto como ponto de partida** organizar a central em torno de perfis desde a entrada, não como filtro opcional, reduzindo o esforço de cada usuário para chegar no conteúdo relevante para ele.

**Busca que entende o contexto** uma busca filtrada por perfil com fallback inteligente para a base geral, evitando que a segmentação criasse ilhas de conteúdo inacessíveis.

**Falha com saída** tratar os estados de erro da busca como momentos de retenção, não de abandono, com direcionamentos distintos para cada tipo de falha.

---

## Proposta de Arquitetura

### Perfil como ponto de entrada, contexto sempre preservado

A solução foi organizada em torno de um princípio central: o perfil do usuário define o contexto de toda a navegação, da busca aos artigos. Isso se traduziu em três decisões estruturais.

**Entrada por persona, não por conteúdo**
A página inicial não lista categorias genéricas: ela oferece três portas de entrada explícitas por perfil, com atalhos visuais para Educadores, Exploradores e Responsáveis logo abaixo da busca. O usuário que chega sem saber o que buscar encontra o caminho em um clique. A busca global existe para quem já sabe o que quer, mas não é o caminho principal.

**Contexto preservado dentro do perfil**
Ao entrar em um perfil, o filtro de busca é aplicado automaticamente. O header identifica visualmente a persona. A navegação lateral nos artigos lista toda a estrutura daquele perfil, permitindo explorar sem precisar voltar à categoria. A decisão de manter o contexto ativo em toda a jornada foi para evitar que o usuário saísse do seu espaço por acidente ao pesquisar ou navegar.

**Busca com dois tipos de fallback**
Dois estados de erro com direcionamentos distintos: quando o perfil selecionado não tem resultado, a sugestão é buscar na base geral; quando o termo tem erro de digitação, o sistema sugere a correção antes de declarar ausência. Cada empty state tem um próximo passo claro, nenhum abandona o usuário.

---

## Consolidação

### Fluxos completos e handoff para desenvolvimento

A proposta foi consolidada em Figma com fluxos completos para os três perfis, cobrindo os estados principais de cada página e os casos de borda da busca. O handoff para desenvolvimento incluiu a definição de requisitos comportamentais, não só o que cada elemento faz, mas quando e por quê.

**Página Inicial**
Busca com filtro por perfil, atalhos visuais por persona, perguntas frequentes gerais e artigos populares segmentados por Educadores e Exploradores na mesma tela.

![Três entradas por perfil logo na página inicial — o contexto define o caminho antes da primeira busca.](/images/cases/jovens-genios/central-de-ajuda/jg-central-ajuda-pagina-inicial.png)

**Páginas de Categoria — Educadores, Exploradores e Responsáveis**
Cada perfil com header visual próprio, filtro de busca pré-aplicado, navegação por abas para os outros perfis, artigos organizados por categoria e expansão progressiva via "Ver mais".

![Categoria Educadores — filtro pré-aplicado e identidade visual própria para cada perfil.](/images/cases/jovens-genios/central-de-ajuda/jg-central-ajuda-categorias-educadores.png)

![Categoria Exploradores — mesma estrutura, contexto diferente.](/images/cases/jovens-genios/central-de-ajuda/jg-central-ajuda-categorias-exploradores.png)

![Categoria Responsáveis — três perfis, três espaços distintos dentro da mesma central.](/images/cases/jovens-genios/central-de-ajuda/jg-central-ajuda-categorias-responsáveis.png)

**Páginas de Artigo**
Estrutura consistente entre perfis: breadcrumb, copiar link, navegação lateral com toda a hierarquia da central, conteúdo do artigo (texto, imagem e/ou vídeo), feedback de utilidade, artigos relacionados e botão "Me Ajuda JG" fixo no canto inferior direito para abertura do chat de suporte, garantindo que o usuário tenha sempre um caminho alternativo quando o conteúdo não resolve.

![Artigo com navegação lateral e suporte sempre acessível — se o conteúdo não resolver, o próximo passo está na mesma tela.](/images/cases/jovens-genios/central-de-ajuda/jg-central-ajuda-artigo-nav-lateral.png)

**Busca — estados de resultado e erro**
Resultados com filtro lateral por perfil e contagem por categoria; empty state com sugestão de filtro alternativo; empty state com sugestão de correção de digitação.

![Busca filtrada por perfil — resultados contextualizados e contagem por categoria.](/images/cases/jovens-genios/central-de-ajuda/jg-central-ajuda-busca-resultados.png)

![Erro de digitação com saída — o sistema sugere a correção antes de declarar que não encontrou nada.](/images/cases/jovens-genios/central-de-ajuda/jg-central-ajuda-busca-empty-states-sugestao.png)

![Sem resultado no perfil? A sugestão é ampliar para a base geral — nunca beco sem saída.](/images/cases/jovens-genios/central-de-ajuda/jg-central-ajuda-busca-empty-states-sugestao-filtro.png)

---

## Resultado

### Arquitetura validada e reaproveitada no Zendesk

**Arquitetura validada e reaproveitada** a solução foi validada internamente e a estrutura de segmentação por perfil serviu de referência direta para a implementação da central no Zendesk, plataforma adotada para não comprometer o time de desenvolvimento. A lógica de organização por persona, os fluxos de busca e o tratamento de estados vazios foram preservados na transição.

**Decisão que mostra maturidade de produto** o fato de a arquitetura ter sobrevivido à mudança de tecnologia evidencia que as decisões de estrutura foram sólidas o suficiente para serem replicadas em outro ambiente, independente da ferramenta.

---

**Públicos atendidos:** Educadores · Exploradores · Responsáveis
**Processo:** Benchmarking → Arquitetura de Informação → Definição de fluxos e requisitos → Handoff
**Páginas:** Inicial · Categorias por perfil · Artigo · Resultados de busca · Empty states
**Ferramentas:** Figma
