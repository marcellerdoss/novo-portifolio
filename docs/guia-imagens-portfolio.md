# Guia de imagens do portfólio
### React / Next.js · Design system unificado

Este documento reúne os dois prompts para Claude Code que governam todas as imagens do portfólio:
**Parte 1** — card Reveal na home (lista de cases)
**Parte 2** — componentes de imagem dentro de cada case

Ambos compartilham o mesmo padrão visual, os mesmos tokens e a mesma lógica de exportação do Figma. Rode cada prompt separadamente no Claude Code, nesta ordem: primeiro a Parte 1, depois a Parte 2.

---

## PADRÃO VISUAL UNIFICADO (vale para tudo)

Todas as imagens do portfólio seguem uma única regra:

- A tela exportada do Figma é sempre um **PNG com fundo transparente**
- Ela flutua sobre um **fundo colorido** definido por token CSS do projeto
- `object-fit: contain` sempre — a imagem nunca é cortada
- Padding interno mínimo de 24px entre a imagem e a borda do container
- O fundo colorido garante contraste em light e dark mode sem precisar de dois assets
- Nenhum componente usa `box-shadow`
- Animações: `cubic-bezier(0.16, 1, 0.3, 1)` em todos os estados — consistência de sensação

---

## TOKENS DE COR POR PROJETO

Defina estes tokens no `globals.css` antes de rodar qualquer prompt.
Os mesmos tokens são usados na home e dentro dos cases.
As cores vêm dos `block-*` do design system — pastéis sobre fundo claro/escuro.

```css
/* globals.css */
:root {
  /* Sellbie */
  --color-project-sellbie-redesign-bg:   #c5b0f4;  /* block-lilac */
  --color-project-sellbie-redesign-text: #000000;

  --color-project-sellbie-jornadas-bg:   #dceeb1;  /* block-lime */
  --color-project-sellbie-jornadas-text: #000000;

  --color-project-sellbie-arq-info-bg:   #c8e6cd;  /* block-mint */
  --color-project-sellbie-arq-info-text: #000000;

  --color-project-sellbie-metricas-bg:   #f4ecd6;  /* block-cream */
  --color-project-sellbie-metricas-text: #000000;

  --color-project-sellbie-crm-bg:        #efd4d4;  /* block-pink */
  --color-project-sellbie-crm-text:      #000000;

  --color-project-sellbie-cashback-bg:   #f3c9b6;  /* block-coral */
  --color-project-sellbie-cashback-text: #000000;

  /* Jovens Gênios */
  --color-project-jg-alfabetizacao-bg:   #dceeb1;  /* block-lime */
  --color-project-jg-alfabetizacao-text: #000000;

  --color-project-jg-central-ajuda-bg:   #c8e6cd;  /* block-mint */
  --color-project-jg-central-ajuda-text: #000000;
}
```

Para trocar a cor de qualquer case depois: substitua o hex por outro `block-*`.
Opções: lime `#dceeb1`, lilac `#c5b0f4`, cream `#f4ecd6`, pink `#efd4d4`,
mint `#c8e6cd`, coral `#f3c9b6`, navy `#1f1d3d` (se navy, mude `-text` para `#ffffff`).

---

## EXPORTAÇÃO DO FIGMA (padrão unificado)

**Para telas de produto** (usado em todos os padrões exceto sitemaps):
- Selecione o frame da tela no Figma
- Remova o background do frame (deixe transparente)
- Export → PNG → 2x
- Salve em `/public/images/cases/[projeto]/[nome-da-tela].png`

**Para sitemaps e fluxos** (usado apenas no scroll horizontal):
- Mantenha o fundo do frame (não precisa ser transparente)
- Export → PNG → 1x
- Largura mínima: 2400px
- Salve em `/public/images/cases/[projeto]/sitemap.png`

---
---

# PARTE 1 — Card Reveal (home)

> Prompt para criar o componente `CaseCard` que aparece na grade de cases da home.

## Checklist antes de rodar

- [ ] Tokens definidos no `globals.css` (seção acima)
- [ ] PNG de preview de cada case exportado em `/public/images/cases/`
- [ ] `href` de cada case definido (mesmo que a página não exista ainda)
- [ ] Tags de cada projeto listadas

## Prompt

```
Crie um componente React chamado `CaseCard` para a home do meu portfólio.

## Comportamento

Card de case study com animação Reveal:
- Repouso: imagem do projeto ocupa todo o card. Na base, painel fixo e fino
  com categoria e título.
- Hover: a imagem desliza para cima (~72px) revelando painel completo embaixo
  com título, descrição, tags e link "Ver case →".
- Painel de repouso some com opacity 0 durante o hover.
- Todas as transições: cubic-bezier(0.16, 1, 0.3, 1) com 420ms.

## Estrutura visual

Altura fixa: 340px desktop / 300px mobile.
Border-radius: 16px. Overflow: hidden. Borda: 0.5px, token do design system.

### Área de imagem
- Fundo: prop `accentBg` (token CSS do projeto)
- PNG transparente centralizado, object-fit: contain, padding 24px
- A imagem flutua — nunca é cortada

### Painel de repouso (sempre visível no repouso)
- Altura: 72px
- Background: token de surface do design system
- Border-top: 0.5px
- Conteúdo: categoria 10px uppercase + título 14px/500
- Transição: opacity 0 no hover em 200ms

### Painel de hover (desliza de baixo)
- Background: mesmo token de surface
- Border-top: 0.5px
- Padding: 16px 20px
- Conteúdo:
  - Categoria: 10px uppercase, cor `accentText`
  - Título: 15px/500, linha 1.3
  - Descrição: 12px, cor secundária, linha 1.6, max 2 linhas
  - Tags: pills borda 0.5px, texto 10px, cor secundária
  - "Ver case →": 13px/500, cor primária, ícone de seta

## Props

```tsx
interface CaseCardProps {
  category:    string    // "Product Design"
  title:       string    // "Fluxos que não travavam"
  description: string    // "Redesign do core de campanhas multicanal"
  tags:        string[]  // ["Redesign", "Omnichannel"]
  href:        string    // "/cases/campanhas"
  imageSrc:    string    // "/images/cases/campanhas-preview.png"
  imageAlt:    string    // descrição de acessibilidade
  accentBg:    string    // "var(--color-project-campanhas-bg)"
  accentText:  string    // "var(--color-project-campanhas-text)"
}
```

## Requisitos técnicos

- React + TypeScript
- next/image com fill, next/link para o card inteiro ser clicável
- Tailwind: use `group` no container e `group-hover:` nos filhos
  Sem Tailwind: CSS Modules com `.card:hover .panel`
- Dark mode automático via tokens — não hardcode cores
- Acessibilidade: painel de repouso com aria-hidden no hover.
  Painel de hover sempre no DOM (só opacity/transform muda — nunca display:none)
- Sem box-shadow. Sem framer-motion (a menos que já instalado).

## Uso esperado

```tsx
<CaseCard
  category="Product Design"
  title="Fluxos que não travavam. Redesign do core de campanhas."
  description="Redesign do core — criação e gestão de campanhas multicanal"
  tags={["UX Research", "Redesign", "Omnichannel"]}
  href="/cases/campanhas"
  imageSrc="/images/cases/campanhas-preview.png"
  imageAlt="Tela principal do redesign de campanhas"
  accentBg="var(--color-project-campanhas-bg)"
  accentText="var(--color-project-campanhas-text)"
/>
```

## Grid da home

```tsx
<section className="grid grid-cols-1 md:grid-cols-2 gap-4">
  <CaseCard ... />
  <CaseCard ... />
  <CaseCard ... />
  <CaseCard ... />
</section>
```

## O que NÃO fazer

- Não hardcode nenhuma cor
- Não use display:none para esconder o painel de repouso
- Não use @keyframes complexos — só transform + opacity + transition
- Não use box-shadow
```

## Prompt de refinamento

```
Ajuste os seguintes pontos no CaseCard:
1. [descreva o ajuste]
2. [descreva o ajuste]
Mantém tudo que não foi mencionado igual.
```

---
---

# PARTE 2 — Componentes de imagem dentro dos cases

> Prompt para criar os 7 componentes usados dentro das páginas de case study.
> Rode após a Parte 1 — os tokens já estarão definidos.

## Checklist antes de rodar

- [ ] Tokens definidos no `globals.css` (mesmos da Parte 1 — não duplicar)
- [ ] PNGs de cada tela exportados com fundo transparente
- [ ] Sitemaps/fluxos exportados com fundo (largura mínima 2400px)
- [ ] Legendas e textos ALT escritos para cada imagem

| Padrão | Imagens necessárias | Fundo transparente? |
|---|---|---|
| Hero full-width | 1 tela principal (1600px+) | Sim |
| Antes e depois | 2 telas da mesma seção | Sim |
| Editorial (colunas) | 1 tela por bloco editorial | Sim |
| Bento grid | 1 principal + 2–3 menores | Sim |
| Scroll horizontal | 1 sitemap/fluxo (2400px+) | Não |
| Visão geral + zoom | 1 tela (usada 2x) | Sim |
| Lightbox | 1 thumbnail (800px) + 1 full (2400px+) | Sim |

## Prompt

```
Implemente os 7 componentes de apresentação de imagens para as páginas de case
study do meu portfólio. Use React/Next.js com TypeScript e next/image em todas
as imagens. Os tokens CSS já estão definidos no globals.css do projeto.

## PADRÃO VISUAL (obrigatório em todos os componentes)

- PNG com fundo transparente flutuando sobre fundo colorido via prop `accentBg`
- object-fit: contain sempre — nunca cortar a imagem
- Padding interno mínimo 24px entre a imagem e a borda do container
- Props obrigatórias em todos: `accentBg: string` e `accentText: string`
- Transições: cubic-bezier(0.16, 1, 0.3, 1) com 300–420ms em todos os estados
- Dark mode automático via tokens — não hardcode cores
- Sem box-shadow

---

## COMPONENTE 1 — CaseHero

Container full-width com a tela principal do projeto.

- Fundo `accentBg`, altura 480px desktop / 260px mobile
- PNG centralizado, object-fit: contain, padding 32px
- Hover: overlay rgba(0,0,0,0.06) com transition 200ms
- Abaixo: legenda 13px, cor secundária, alinhada à esquerda

Props: `imageSrc`, `imageAlt`, `caption`, `accentBg`, `accentText`

---

## COMPONENTE 2 — CaseBeforeAfter

Grid 2 colunas com tela antes e depois.

- Grid 1fr 1fr, gap 16px, colapsa em 1 coluna no mobile
- Mesmo `accentBg` nos dois blocos — unidade visual
- Altura de cada bloco: 240px. PNG com object-fit: contain, padding 24px
- Badge "Antes": token semântico de erro suave do design system
- Badge "Depois": token semântico de sucesso suave do design system
- Legenda abaixo de cada bloco, 12px, cor secundária

Props: `imageBefore`, `imageAfter`, `altBefore`, `altAfter`,
       `captionBefore`, `captionAfter`, `accentBg`, `accentText`

---

## COMPONENTE 3 — CaseEditorial

Grid 2 colunas: imagem de um lado, texto explicativo do outro.

- Grid 1fr 1fr, gap 40px, alinhamento vertical centralizado
- Mobile: empilha (imagem em cima, texto embaixo)
- Bloco de imagem: fundo `accentBg`, border-radius 12px, altura 260px,
  PNG object-fit: contain, padding 24px
- Título: 18px/500, cor primária
- Parágrafo: 15px/400, linha 1.7, cor secundária
- Prop `reverse: boolean` inverte a ordem (texto | imagem)

Props: `imageSrc`, `imageAlt`, `title`, `body`, `reverse`, `accentBg`, `accentText`

---

## COMPONENTE 4 — CaseBento

Grid assimétrico: 1 imagem principal grande + 2–3 menores.

- CSS Grid: principal com grid-column: span 2 e grid-row: span 2.
  Menores: 1 célula cada. Gap 10px.
- Todos os blocos com fundo `accentBg` — unidade visual
- PNG object-fit: contain, padding 20px em cada célula
- Altura total: 340px desktop. Mobile: grid-cols-1
- Hover em cada célula: scale(1.02) no PNG interno, transition 300ms

Props: `mainImage`, `mainAlt`, `mainCaption`,
       `images: Array<{ src, alt, caption }>`,
       `accentBg`, `accentText`

---

## COMPONENTE 5 — CaseScrollCanvas

Container com scroll horizontal para sitemaps e fluxos largos.

- Fundo `accentBg`, altura configurável via prop, overflow-x: auto
- A imagem renderizada em tamanho natural — scroll revela o restante
- Cursor grab/grabbing com suporte a drag (mousedown + mousemove)
- Suporte a touch (touchstart + touchmove) para mobile
- Barra superior: título do artefato + badge "arraste para explorar"
  em cor `accentText`
- Barra inferior: ícone de seta, 11px, cor terciária

Nota: neste componente a imagem pode ter fundo (sitemaps exportados do Figma
com fundo branco). O `accentBg` é aplicado ao container, não à imagem.

Props: `imageSrc`, `imageAlt`, `title`, `containerHeight`, `accentBg`, `accentText`

---

## COMPONENTE 6 — CaseZoom

Overview à esquerda + recorte ampliado à direita.

- Grid 1fr 1fr, gap 16px. Mobile: empilha (overview em cima)
- Ambos com fundo `accentBg`, border-radius 12px
- Bloco overview: opacity 0.55, PNG object-fit: contain, padding 16px.
  Marcação retangular sobre a imagem: borda 2px tracejada em `accentText`
  indicando a região ampliada. Posição via prop `markerStyle`.
- Bloco zoom: borda 2px sólida em `accentText`, PNG object-fit: contain
  com object-position configurável via prop `zoomPosition`
- Labels "Visão geral" e "Zoom — [zoomLabel]" acima de cada bloco:
  11px uppercase, cor terciária

Props: `imageSrc`, `imageZoomSrc` (opcional, usa imageSrc se omitido),
       `imageAlt`, `zoomPosition`, `zoomLabel`,
       `markerStyle: { top, left, width, height }`,
       `accentBg`, `accentText`

---

## COMPONENTE 7 — CaseLightbox

Imagem inline com zoom ao clicar.

- Container inline: fundo `accentBg`, border-radius 12px, altura configurável
- PNG object-fit: contain, padding 24px
- Ícone "ampliar" no canto inferior direito, aparece no hover (opacity 0→1)
- Ao clicar: overlay rgba(0,0,0,0.85) com a imagem full centralizada
  (max 90vw × 85vh, object-fit: contain)
- Dentro do overlay: fundo `accentBg` ao redor da imagem — mantém
  identidade visual do projeto mesmo no lightbox
- Legenda 13px abaixo da imagem no overlay, cor terciária
- Botão X no canto superior direito. Fechar também via ESC ou clique fora.
- Transição de entrada: opacity + scale(0.96→1), 220ms cubic-bezier(0.16,1,0.3,1)
- body overflow:hidden enquanto aberto
- Suporte a múltiplos lightboxes na página via id único

Props: `imageSrc`, `imageFull` (opcional, usa imageSrc se omitido),
       `imageAlt`, `caption`, `height`, `accentBg`, `accentText`

---

## INSTRUÇÕES DE IMPLEMENTAÇÃO

1. Crie os componentes em `/components/case/`:
   CaseHero.tsx · CaseBeforeAfter.tsx · CaseEditorial.tsx · CaseBento.tsx
   CaseScrollCanvas.tsx · CaseZoom.tsx · CaseLightbox.tsx

2. Crie um arquivo de demonstração `CaseImagesDemo.tsx` com todos os 7
   em sequência usando imagens placeholder para visualização antes de
   substituir pelo conteúdo real.

3. Use next/image com `fill` dentro de container `position: relative`
   para as imagens com object-fit: contain. Defina `sizes` adequado.

4. Responsivo mobile-first em todos os componentes.

5. Dark mode automático via tokens — nenhum componente precisa de
   lógica de tema.
```

## Prompt de refinamento

```
Ajuste os seguintes pontos nos componentes de case:
1. [Componente X] — [o que mudar]
2. [Componente Y] — [o que mudar]
3. [Todos] — [o que mudar]
Mantém tudo que não foi mencionado igual.
```
