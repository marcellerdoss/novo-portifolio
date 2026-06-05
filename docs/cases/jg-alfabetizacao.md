# De zero a produto: arquitetura pedagógica para IA adaptativa em alfabetização infantil

**Jovens Gênios · ago 2022 – jul 2024**

Empresa: Jovens Gênios
Função: Product Designer · UX Research
Tipo: Discovery · UX Research · Information Architecture · Interaction Design · Design System

**Tags:** UX Research · Entrevistas · Benchmarking · Arquitetura Pedagógica · Interaction Design · IA Adaptativa · BNCC

---

## Contexto

A Jovens Gênios é uma EdTech que combina inteligência artificial e gamificação para personalizar o aprendizado de cada aluno, adaptando conteúdo e progressão ao ritmo individual, com mais de 130 mil alunos ativos e ganho médio de 17,8% de proficiência em poucos meses de uso. Seu produto atendia do 5º ao 8º ano. Não havia nada para alfabetização infantil (1º e 2º ano): nenhuma jornada, nenhum modelo de interação, nenhum racional pedagógico para essa faixa etária e, consequentemente, nenhuma base para que a IA pudesse operar nesse contexto.

Expandir para alfabetização era entrar em um mercado novo com uma criança de perfil radicalmente diferente: ela ainda não sabe ler. Construir esse produto do zero era o desafio.

Conduzi o projeto sozinha, do discovery à entrega dos modelos de interação, reportando levantamentos e resultados de pesquisa para o time de produto. A única atuação externa foi de uma especialista em alfabetização contratada posteriormente para validar e refinar a proposta.

---

## Discovery

**Imersão no domínio**

O primeiro movimento foi aprender o domínio. Estudei a BNCC, Base Nacional Comum Curricular, o documento federal que define as competências e habilidades que cada criança deve desenvolver em cada etapa da educação básica no Brasil. Para o produto, ela funcionaria como a base normativa que determinaria o quê ensinar, em qual fase e com qual nível de complexidade. A própria BNCC já direciona as fases de desenvolvimento da alfabetização infantil, o que cada uma exige cognitivamente da criança e como essa progressão se organiza ao longo dos anos escolares.

**Benchmarking**

Antes de ir a campo, mapeei plataformas de alfabetização digital como referência, parte delas sinalizadas posteriormente pelas próprias entrevistadas:

Khan Academy Kids · Duolingo ABC · Netbil · IXL · Smartkids · GCompris

A análise mapeou como cada plataforma trabalhava som, apoio visual e progressão de conteúdo. Khan Academy Kids e Duolingo ABC se destacavam pela qualidade do feedback em áudio e pelo apoio visual consistente. IXL pela profundidade do sistema de progressão por habilidade. Netbil e Smartkids por serem referências nacionais com aderência ao currículo brasileiro. O que nenhuma oferecia no mesmo nível era o que a JG já fazia no produto para séries mais avançadas: progressão pedagógica estruturada com gamificação e nivelamento via IA. O benchmarking confirmou que esse era o diferencial a ser preservado e aprofundado no novo produto.

**Recrutamento e entrevistas**

Acionei professoras conhecidas de redes pública e particular, que me indicaram pessoas-chave com experiência direta em alfabetização infantil. Estruturei um roteiro de entrevista semiestruturado e conduzi sessões com professoras e coordenadoras pedagógicas dos dois contextos, perfis com realidades distintas tanto nas dinâmicas pedagógicas quanto no ambiente em que as crianças estão inseridas.

Os dados foram organizados por clusterização de temas recorrentes. Os padrões que emergiram com mais força:

O envolvimento familiar é estrutural no processo de alfabetização. Crianças com acompanhamento ativo apresentam melhor desempenho em leitura e escrita. A família é o primeiro ambiente de letramento, e atividades do cotidiano (rótulos, placas, histórias em casa) são parte do processo, não complemento.

Aproximar o conteúdo do contexto real da criança, como animais conhecidos, objetos do dia a dia, cantigas e parlendas, aumenta o engajamento e facilita a associação entre escrita e fala, especialmente nas fases iniciais.

Apoio visual é critério inegociável nessa faixa etária: a criança ainda não lê, então a imagem carrega o enunciado.

As entrevistas também validaram hipóteses observadas no benchmarking, especialmente a necessidade de som em todas as interações.

**Insight que definiu uma decisão de produto**

Um padrão emergiu com clareza: as crianças estão em processo de aprendizado da leitura, e a plataforma, no formato que se apresentava, não considerava isso como critério básico de design. Nessa faixa etária, a criança costuma realizar atividades com um adulto presente, seja na sala de aula com a professora, seja em casa com os responsáveis. O objetivo foi trazer o máximo de autonomia para a criança dentro desse contexto, simplificando sua jornada e reduzindo as dependências de leitura.

A decisão de produto: **som como elemento estrutural** em todas as atividades: instruções, enunciados e feedback disponíveis em áudio, não como recurso acessório, mas como requisito de design.

---

## Define

Com o levantamento consolidado, o problema central estava claro: não havia estrutura que conectasse fase de desenvolvimento da criança, habilidade da BNCC e modelo de interação. Sem esse racional, a IA não teria base para operar. Ela precisava saber em qual fase a criança estava e como progredir de forma coerente para personalizar a jornada de cada uma.

A decisão foi criar essa arquitetura do zero, como fundação tanto pedagógica quanto técnica do produto.

A proposta foi apresentada internamente ao time de produto, pedagogia e tecnologia. Posteriormente, uma especialista em alfabetização contratada pela empresa validou o caminho e trouxe um refinamento crítico: as fases de alfabetização não são compartimentos fixos: são transições. Cada criança tem seu ritmo, e o processo é contínuo. Esse feedback gerou a decisão de estruturar o sistema de codificação em fases de *transição* (Silábico→Alfabético, Alfabético→Ortográfico, Ortográfico→Letrado), não em fases estanques, o que tornou o sistema mais fiel à realidade pedagógica e mais útil para o nivelamento da IA.

A especialista também fez a ponte com o time de conteúdo da plataforma, conectando a arquitetura à base de questões existente.

**As quatro fases e suas dinâmicas**

Quatro fases estruturam a jornada da criança no produto, seguindo a progressão da BNCC para o 1º e 2º ano do Ensino Fundamental:

**Pré-silábico** — a criança entende que a escrita está relacionada à fala, mas ainda não distingue completamente letra de desenho. Dinâmicas: letra inicial das palavras · palavras isoladas em contexto de histórias e cantigas · memorização, relacionar, completar, ligar · motricidade (desenho e formato da letra) · identificação fonético-silábica.

**Silábico** — primeiras associações entre escrita e fala. Dinâmicas: formação de palavras com apoio visual e sílabas · fonética silábica (consoante + vogal) · ditado relacionado a cantigas e parlendas · identificação de palavra com apoio visual e múltipla escolha com palavras verdadeiras.

**Alfabético** — a criança começa a compreender que as sílabas possuem mais de uma letra. Dinâmicas: letras móveis com omissão · ditados de letras · rimas · trava-língua · cópia de texto · escrita de carta, cartão, post.

**Ortográfico** — leitura mais fluente; a criança encontra prazer crescente na leitura e na escrita. Dinâmicas: leitura e interpretação de textos narrativos · ditado · escrita de rimas · stop.

![Fases de alfabetização mapeadas por ano escolar — recorte pedagógico que definiu o escopo do produto.](../../images/cases/jovens-genios/alfabetizacao/jg-alfabetizacao-slide-progressao.png)

![Fase Pré-silábica — atividades mapeadas e lacunas identificadas antes de qualquer tela ser desenhada.](../../images/cases/jovens-genios/alfabetizacao/jg-alfabetizacao-slide-pre-silabico.png)

![Fase Silábica — primeiras associações entre escrita e fala, com dinâmicas específicas para essa transição.](../../images/cases/jovens-genios/alfabetizacao/jg-alfabetizacao-slide-silabico.png)

![Fase Alfabética — a criança começa a entender que sílabas têm mais de uma letra.](../../images/cases/jovens-genios/alfabetizacao/jg-alfabetizacao-slide-alfabetico.png)

![Fase Ortográfica — leitura mais fluente, fase não contemplada na plataforma e questionada estrategicamente.](../../images/cases/jovens-genios/alfabetizacao/jg-alfabetizacao-slide-ortografico.png)

**Sistema de codificação — Fase × Modelo**

Para conectar a arquitetura pedagógica à estrutura técnica do produto e ao sistema de IA, criei um sistema de codificação baseado em fases de transição, uma linguagem operacional compartilhada entre design, pedagogia e tecnologia que permite nomear, classificar e rastrear qualquer atividade da plataforma a partir de dois eixos: fase de transição e modelo de questão.

Usar transições em vez de fases fixas foi uma decisão direta do feedback da especialista: reflete com mais precisão como a criança evolui na prática e permite à IA ajustar o nivelamento de forma gradual, sem saltos abruptos entre níveis.

![Código de fases — linguagem operacional compartilhada entre design, pedagogia e tecnologia.](../../images/cases/jovens-genios/alfabetizacao/jg-alfabetizacao-tabela-codigo-fases.png)

![Matriz de proficiência — todas as habilidades da BNCC organizadas por fase de transição, base para o sistema de IA.](../../images/cases/jovens-genios/alfabetizacao/jg-alfabetizacao-matriz-proficiencia.png)

![Esquema Matriz-Modelos — cada modelo codificado para que a IA saiba em qual fase aplicá-lo.](../../images/cases/jovens-genios/alfabetizacao/jg-alfabetizacao-esquema-matriz-modelos.png)

---

## Develop

Com a arquitetura definida e validada, o próximo passo foi casar essa estrutura com a base técnica existente na plataforma. A decisão de escopo foi deliberada: menos formatos, com maior potencial de aplicação. Modelos com alta versatilidade pedagógica que pudessem cobrir múltiplas fases com variações de interação, em vez de criar um modelo específico para cada habilidade. Isso reduzia complexidade técnica e maximizava o alcance pedagógico do MVP.

**A lógica de entrega por modelo**

Cada modelo foi entregue como um sistema de possibilidades, não como uma tela única. A documentação de cada modelo tinha três camadas:

**Variações de interação** (eixo de complexidade crescente)
As variações evoluíam do modelo mais simples para o mais complexo dentro do mesmo padrão de interação. No modelo de Ordenação Horizontal: ordenação simples (com estados de resposta correta e incorreta), ordenação com apoio (com letras e com palavras) e omissão (simples, de grafema/número e de palavra).

**Possibilidades de uso por fase** (eixo de evolução alfabética)
Um mesmo modelo cobria mais de uma fase de transição, dependendo de qual variação era aplicada e com qual conteúdo. O modelo de Ordenação, por exemplo, atendia três fases de transição distintas.

**Habilidades da BNCC por fase**
Para cada fase atendida pelo modelo, foram mapeadas as habilidades específicas desenvolvidas: conhecer a ordem do alfabeto, relacionar letra ao som correspondente, identificar relações entre fonemas e grafemas, reconhecer espaços entre palavras, entre outras.

Essa estrutura transformou cada modelo em uma ferramenta pedagógica completa e forneceu ao sistema de IA o mapeamento necessário para personalizar a progressão de cada criança com ancoragem explícita na BNCC.

![Atividades por fase — distribuição dos modelos de questão ao longo da progressão pedagógica.](../../images/cases/jovens-genios/alfabetizacao/jg-alfabetizacao-org-fases.png)

**Modelos de questão**

![Modelo Ordenação Horizontal — um modelo, três fases de transição, múltiplas variações de interação.](../../images/cases/jovens-genios/alfabetizacao/jg-alfabetizacao-modelo-ordenacao-horizontal.png)

![Modelo Múltipla Escolha — imagem e áudio como requisitos de design, não acessórios.](../../images/cases/jovens-genios/alfabetizacao/jg-alfabetizacao-modelo-multipla-escolha.png)

![Modelo Correlação / Ordenação Vertical — variação que expande o alcance pedagógico sem multiplicar complexidade técnica.](../../images/cases/jovens-genios/alfabetizacao/jg-alfabetizacao-modelo-correlacao-ordenacao-vertical.png)

![Modelo Ditado — escuta e escrita como base para diferentes fases da progressão.](../../images/cases/jovens-genios/alfabetizacao/jg-alfabetizacao-modelo-ditado.png)

![Modelo Motricidade — traço e coordenação como parte da aprendizagem da escrita.](../../images/cases/jovens-genios/alfabetizacao/jg-alfabetizacao-modelo-motricidade.png)

![Modelo Ábaco — numeração decimal com suporte visual para diferentes níveis de abstração.](../../images/cases/jovens-genios/alfabetizacao/jg-alfabetizacao-modelo-abaco.png)

![Modelo Produção Textual — escrita estruturada como etapa final da progressão de alfabetização, com handoff documentado por modelo: base, progressão, fases atendidas e habilidades da BNCC.](../../images/cases/jovens-genios/alfabetizacao/jg-alfabetizacao-modelo-producao-textual.png)

---

## Resultados

**Produto criado do zero, com fundação para IA operar em alfabetização** — a arquitetura pedagógica estruturou o racional que permite à IA identificar a fase de transição de cada criança, personalizar a entrega de conteúdo e progredir nos modelos de questão conforme o desempenho. Sem essa estrutura, o sistema adaptativo não teria base para operar nesse contexto.

**Decisão de produto orientada por pesquisa com impacto direto na jornada** — a incorporação do som como elemento estrutural, derivada diretamente das entrevistas, simplificou a jornada da criança e ampliou sua autonomia de uso em um contexto onde leitura ainda não é possível.

**Escopo deliberado que maximizou cobertura pedagógica** — a decisão de trabalhar com menos modelos de maior versatilidade permitiu ao MVP cobrir múltiplas fases com variações de interação, sem multiplicar complexidade técnica.

**Arquitetura que evoluiu com validação especializada** — o feedback da especialista em alfabetização refinou o modelo de fases estanques para fases de transição, tornando o sistema mais fiel à realidade do desenvolvimento infantil e mais preciso para o nivelamento da IA.

**Linguagem operacional compartilhada entre times** — o sistema de codificação e a estrutura de entrega por modelo (variações × fases × BNCC) criaram uma base que o time de conteúdo e tecnologia poderia usar de forma autônoma após a entrega.

---

**Públicos atendidos:** Crianças (4–8 anos, 1º e 2º ano EF) · Professoras · Coordenadoras pedagógicas · Escolas particulares · Prefeituras (B2Gov)
**Processo:** Imersão no domínio (BNCC) → Benchmarking → Recrutamento e entrevistas → Clusterização → Arquitetura pedagógica → Validação com especialista → Decisão de escopo → Modelos de interação → MVP
**Entregáveis:** Roteiro de entrevistas · Clusterização de temas · Matriz de Proficiência · Sistema de codificação Fase × Modelo · Organização de atividades por fase · Modelos de questão (variações + fases + BNCC) · Contribuições ao Design System
**Ferramentas:** Figma · Pesquisa qualitativa em campo · Análise documental (BNCC) · Benchmarking competitivo
