# PRD — Portfólio Profissional de UX & Product Design

**Versão:** 1.0  
**Data:** 2026-05-29  
**Destino:** Claude Code  
**Stack:** Next.js 14 (App Router) + Tailwind CSS + TypeScript  
**Deploy:** Vercel  

---

## 1. Visão Geral do Produto

Site de portfólio profissional pessoal para UX Designer / Product Designer. O objetivo é apresentar identidade profissional, cases de design, experiência e facilitar o contato via redes sociais. O site deve transmitir sofisticação minimalista, confiança técnica e sensibilidade estética — refletindo as próprias competências do profissional.

---

## 2. Objetivos de Negócio

- Atrair recrutadores, clientes e parceiros de mercado
- Demonstrar profundidade metodológica através dos cases
- Posicionar o profissional como referência em UX/Product Design
- Ser indexável por mecanismos de busca (SEO)
- Estar disponível em português (PT-BR) e inglês (EN)

---

## 3. Público-Alvo

| Persona | Objetivo ao visitar o site |
|---|---|
| Recrutador / Head de Design | Avaliar fit cultural e nível técnico rapidamente |
| Gerente de Produto / CTO | Entender raciocínio de design e impacto nos produtos |
| Cliente / Startup | Verificar portfólio antes de contratar |
| Colega Designer | Referência, networking, colaboração |

---

## 4. Stack Técnica

| Camada | Tecnologia |
|---|---|
| Framework | Next.js 14 com App Router |
| Linguagem | TypeScript |
| Estilização | Tailwind CSS |
| Animações | Framer Motion |
| Internacionalização | next-intl |
| Tema (dark/light) | next-themes |
| Ícones | Lucide React |
| Linting | ESLint + Prettier |
| Deploy | Vercel |
| Analytics | Vercel Analytics (privacy-first) |

---

## 5. Estrutura de Rotas

```
/                          → Home (todas as seções em SPA)
/cases/[slug]              → (reservado para expansão futura)
/blog                      → Listagem de artigos
/blog/[slug]               → Post individual
/en                        → Home em inglês
/en/blog                   → Blog em inglês
/en/blog/[slug]            → Post individual em inglês
```

A home é uma Single Page com scroll suave entre seções âncoras. O blog usa rotas separadas com MDX.

---

## 6. Seções da Home — Especificação

### 6.1 Header / Navbar
- Logo ou nome do profissional (texto tipográfico)
- Links de navegação âncora: Sobre, Cases, Skills, Experiência, Blog, Contato
- Toggle dark/light mode com ícone sun/moon
- Seletor de idioma PT | EN
- Navbar fixa no topo com backdrop blur ao fazer scroll
- Em mobile: hambúrguer menu com drawer lateral ou dropdown

### 6.2 Hero / Apresentação
- Título principal com nome e especialidade (ex: "UX & Product Designer")
- Subtítulo: proposta de valor em 1–2 linhas
- CTA primário: "Ver Cases" → ancora para a seção de cases
- CTA secundário: "Download CV" → link para PDF do currículo
- Animação de entrada: fade-in + slide-up suave no texto
- Sem imagem hero — foco em tipografia e espaço negativo
- Indicador visual de scroll (ícone com animação pulse)

### 6.3 Sobre Mim
- Foto profissional (otimizada com next/image)
- Parágrafo de apresentação: quem é, filosofia de design, contexto
- Destaques em cards pequenos: anos de experiência, projetos, países/mercados atendidos
- Layout: duas colunas em desktop, empilhado em mobile

### 6.4 Cases de UX/Product Design
- Grid de cards (2 colunas desktop, 1 coluna mobile)
- Cada card contém:
  - Imagem de capa (proporção 16:9)
  - Tag de categoria (ex: "Mobile App", "Design System", "Research")
  - Título do case
  - Breve descrição (2 linhas)
  - Hover: overlay com botão "Ver Case"
- Ao clicar: abre Modal/Overlay com conteúdo expandido do case
- Modal contém:
  - Título, descrição completa, problema, processo, resultado
  - Galeria de imagens com lightbox
  - Métricas de impacto (ex: "+32% NPS")
  - Botão de fechar (X) e suporte à tecla Escape
  - Scroll dentro do modal em mobile
- Filtros por categoria acima do grid (All, Mobile, Web, Research, etc.)
- Os dados dos cases são definidos em `/content/cases/` como arquivos JSON ou MDX

### 6.5 Skills & Ferramentas
- Dividido em categorias: Design, Research, Prototyping, Handoff, Soft Skills
- Exibição em grid de ícones + labels ou tags estilizadas
- Sem barras de progresso (evitar subjetividade)
- Animação: fade-in sequencial ao entrar na viewport (Intersection Observer)

### 6.6 Experiência Profissional
- Timeline vertical com:
  - Empresa, cargo, período, descrição breve
  - Ícone ou logotipo da empresa (se disponível)
- Ordenação cronológica reversa
- Em mobile: timeline simplificada (sem linha central)
- Os dados são definidos em `/content/experience.json`

### 6.7 Blog / Artigos
- Grid de 3 cards (desktop) / 1 card (mobile) com os posts mais recentes
- Cada card: imagem, categoria, título, data, tempo de leitura estimado
- Botão "Ver todos os artigos" → rota `/blog`
- Posts escritos em MDX em `/content/blog/`
- Suporte a syntax highlighting (Shiki ou Prism)
- Leitura estimada calculada automaticamente

### 6.8 Contato
- Headline convidativa: "Vamos trabalhar juntos?" / "Let's work together?"
- Parágrafo de contexto (aberto a freelas, posições CLT, palestras)
- Grid de links sociais com ícones:
  - LinkedIn
  - Behance
  - GitHub (opcional)
  - E-mail (mailto: link)
  - Dribbble (opcional)
- Cada ícone com tooltip e animação de hover
- Sem formulário de contato (decisão do produto)

### 6.9 Footer
- Nome + ano atual (dinâmico)
- Links rápidos de navegação
- Crédito: "Designed & built by [Nome]"
- Link para repositório GitHub (opcional)

---

## 7. Blog — Especificação

### Página de Listagem `/blog`
- Header com título "Blog" e subtítulo
- Filtros por tag/categoria
- Grid de posts com paginação ou infinite scroll (mínimo 6 por página)
- Campo de busca simples (client-side, sem backend)

### Página de Post `/blog/[slug]`
- Layout de artigo com largura máxima de leitura (~680px)
- Barra de progresso de leitura no topo
- Sumário lateral (Table of Contents) em desktop — sticky
- Tags clicáveis
- Posts relacionados ao final
- Open Graph e meta tags dinâmicas por post
- Schema.org Article markup para SEO

---

## 8. Internacionalização (i18n)

- Biblioteca: `next-intl`
- Idiomas suportados: `pt-BR` (padrão) e `en`
- Arquivos de tradução em `/messages/pt.json` e `/messages/en.json`
- Todo texto da UI (labels, CTAs, placeholders) deve ser traduzível
- URLs separadas: `/` para PT, `/en` para EN
- O conteúdo dos cases e blog pode ter versões separadas por idioma
- Detector de idioma do navegador na primeira visita + armazenamento em cookie
- Seletor de idioma visível no header

---

## 9. Dark / Light Mode

- Implementado com `next-themes`
- Padrão: respeitar preferência do sistema operacional (`prefers-color-scheme`)
- Toggle manual persistido em localStorage
- Transição CSS suave entre temas (transition: background-color 200ms)
- Design System (definido em `/docs/design.md`) deve especificar tokens para ambos os temas
- Sem flash de tema incorreto (FOUC) — usar `suppressHydrationWarning` no `<html>`

---

## 10. Design System

O design system completo está definido em `/docs/design.md`. O Claude Code deve:

1. Ler `/docs/design.md` como fonte primária de verdade para:
   - Paleta de cores (tokens para light e dark mode)
   - Tipografia (fontes, tamanhos, pesos, line-heights)
   - Espaçamento (escala de spacing)
   - Border radius, sombras, transições
   - Componentes base (botões, cards, badges, tags)

2. Configurar `tailwind.config.ts` estendendo os tokens do design system

3. Criar variáveis CSS em `globals.css` mapeando os tokens para dark/light mode com `[data-theme]` ou classes `dark:`

---

## 11. Animações e Microinterações

Nível: **Médio** — scroll animations + microinterações funcionais.

### Regras gerais
- Usar `Framer Motion` para animações de entrada e transições de página
- Respeitar `prefers-reduced-motion` — todas animações devem ter fallback estático
- Duração máxima de animações de entrada: 600ms
- Easing: `ease-out` para entradas, `ease-in-out` para transições

### Animações por componente

| Componente | Animação |
|---|---|
| Hero | Fade-in + translateY(-20px → 0) em stagger para título, subtítulo, CTAs |
| Cards de cases | Fade-in ao entrar no viewport (Intersection Observer) |
| Skills | Fade-in sequencial com delay de 50ms entre itens |
| Timeline | Cada item aparece ao scrollar (slide-in lateral) |
| Modal | Scale(0.95 → 1) + opacity(0 → 1) com backdrop blur |
| Navbar | Transição de background ao fazer scroll |
| Hover em cards | Scale(1 → 1.02) + elevação de sombra |
| Links sociais | Translatey(-3px) no hover com transição de cor |
| Toggle de tema | Rotação + fade no ícone |

---

## 12. Performance

### Metas (Lighthouse)
- Performance: ≥ 90
- Accessibility: ≥ 95
- Best Practices: ≥ 95
- SEO: ≥ 95

### Estratégias
- `next/image` com lazy loading, `sizes` correto e formatos modernos (WebP/AVIF)
- `next/font` com `display: swap` para Google Fonts (ou fonte local)
- Code splitting automático pelo App Router
- Componentes pesados (Framer Motion, lightbox) com `dynamic(() => import(...), { ssr: false })`
- Imagens dos cases: máximo 200KB por imagem, usar compressão
- Bundle analyzer: `@next/bundle-analyzer` para auditoria
- `<link rel="preconnect">` para domínios externos

---

## 13. SEO

- `metadata` exportado em cada `page.tsx` (Next.js 14 Metadata API)
- Open Graph completo: título, descrição, imagem (1200×630px)
- Twitter Card tags
- `robots.txt` e `sitemap.xml` gerados automaticamente (`next-sitemap`)
- Schema.org `Person` markup na home
- Schema.org `Article` markup nos posts do blog
- URLs canônicas
- Alt text obrigatório em todas as imagens
- Heading hierarchy correta (um único H1 por página)

---

## 14. Acessibilidade (WCAG 2.1 AA)

- Contraste de texto mínimo 4.5:1 (normal) e 3:1 (grande)
- Todos os elementos interativos acessíveis via teclado (Tab, Enter, Escape)
- `aria-label` em ícones sem texto
- `aria-expanded`, `aria-controls` no menu mobile e acordeons
- Modal com focus trap e retorno de foco ao fechar
- `role="dialog"` e `aria-modal="true"` no modal de cases
- Skip link "Ir para o conteúdo principal" visível no foco (`:focus-visible`)
- Landmark roles: `<header>`, `<main>`, `<nav>`, `<footer>`, `<section>`
- Imagens decorativas com `alt=""`
- Formulário de idioma com `<label>` associado
- Testar com: axe DevTools, keyboard navigation, leitores de tela (VoiceOver/NVDA)

---

## 15. Segurança Web

### Headers HTTP (configurar em `next.config.ts`)
```
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://vercel.live; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https:; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://vitals.vercel-insights.com; frame-ancestors 'none'
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
```

### Outras práticas
- Nenhuma chave de API exposta no client-side
- Links externos com `rel="noopener noreferrer"`
- Dependências auditadas com `npm audit` antes do deploy
- `.env.local` no `.gitignore`, usar `.env.example` para documentação
- Não armazenar dados sensíveis em localStorage
- Rate limiting e CSRF não são necessários (site estático sem backend próprio)

---

## 16. Responsividade

### Breakpoints (Tailwind padrão)
| Nome | Largura |
|---|---|
| `sm` | 640px |
| `md` | 768px |
| `lg` | 1024px |
| `xl` | 1280px |
| `2xl` | 1536px |

### Comportamentos por dispositivo
- **Mobile first**: estilos base para mobile, modificadores para telas maiores
- Navbar: hambúrguer em `< md`, horizontal em `≥ md`
- Grid de cases: 1 coluna em mobile, 2 em `md+`
- Grid de blog: 1 coluna em mobile, 3 em `lg+`
- Timeline: linear em mobile, com linha central em `md+`
- Modal: tela inteira em mobile, centralizado (max-w-3xl) em desktop
- TOC do blog: oculta em mobile, sticky lateral em `lg+`
- Imagens: sempre `width: 100%` dentro do container

---

## 17. Estrutura de Pastas do Projeto

```
/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx
│   │   ├── page.tsx                 ← Home com todas as seções
│   │   └── blog/
│   │       ├── page.tsx             ← Listagem do blog
│   │       └── [slug]/
│   │           └── page.tsx         ← Post individual
│   └── api/                         ← Reservado para expansão
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Navigation.tsx
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Cases.tsx
│   │   ├── Skills.tsx
│   │   ├── Experience.tsx
│   │   ├── Blog.tsx
│   │   └── Contact.tsx
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Badge.tsx
│   │   ├── Modal.tsx
│   │   ├── ThemeToggle.tsx
│   │   ├── LanguageSwitcher.tsx
│   │   └── ScrollProgress.tsx
│   └── blog/
│       ├── PostCard.tsx
│       ├── TableOfContents.tsx
│       └── RelatedPosts.tsx
├── content/
│   ├── cases/
│   │   └── [slug].json              ← Dados de cada case
│   ├── experience.json
│   └── blog/
│       ├── pt/
│       │   └── [slug].mdx
│       └── en/
│           └── [slug].mdx
├── docs/
│   └── design.md                    ← Design System (fonte primária)
├── messages/
│   ├── pt.json
│   └── en.json
├── public/
│   ├── images/
│   ├── fonts/
│   ├── cv-pt.pdf
│   ├── cv-en.pdf
│   ├── robots.txt
│   └── og-image.png
├── lib/
│   ├── mdx.ts
│   ├── cases.ts
│   └── utils.ts
├── styles/
│   └── globals.css
├── tailwind.config.ts
├── next.config.ts
└── tsconfig.json
```

---

## 18. Dados de Conteúdo — Estrutura

### Case (`/content/cases/[slug].json`)
```json
{
  "slug": "nome-do-case",
  "title": { "pt": "Título PT", "en": "Title EN" },
  "category": "Mobile App",
  "tags": ["iOS", "Research", "DesignSystem"],
  "coverImage": "/images/cases/nome-do-case/cover.jpg",
  "summary": { "pt": "Resumo", "en": "Summary" },
  "problem": { "pt": "...", "en": "..." },
  "process": { "pt": "...", "en": "..." },
  "outcome": { "pt": "...", "en": "..." },
  "metrics": [
    { "label": "NPS", "value": "+32%", "description": "Aumento após redesign" }
  ],
  "images": ["/images/cases/nome-do-case/01.jpg", "..."],
  "year": 2024,
  "featured": true
}
```

### Experiência (`/content/experience.json`)
```json
[
  {
    "company": "Empresa",
    "role": { "pt": "UX Designer Senior", "en": "Senior UX Designer" },
    "period": "Jan 2022 – Present",
    "description": { "pt": "...", "en": "..." },
    "logo": "/images/companies/empresa.svg"
  }
]
```

---

## 19. Ordem de Implementação (para Claude Code)

1. **Setup inicial**: `create-next-app` com TypeScript + Tailwind + ESLint
2. **Ler `/docs/design.md`** e configurar `tailwind.config.ts` + `globals.css` com os tokens do design system
3. **Configurar `next-themes`** e `next-intl` com os arquivos de mensagem
4. **Configurar headers de segurança** em `next.config.ts`
5. **Componentes UI base**: Button, Badge, Card, Modal
6. **Layout**: Header com navbar responsiva, footer
7. **Seções da home** na ordem: Hero → About → Cases → Skills → Experience → Blog preview → Contact
8. **Modal de cases** com dados do JSON
9. **Rota do Blog**: listagem + posts MDX
10. **Animações** com Framer Motion (respeitar `prefers-reduced-motion`)
11. **SEO**: metadata, OG, sitemap, robots
12. **Acessibilidade**: auditoria com axe, ajustes de ARIA e contraste
13. **Testes de performance**: Lighthouse, otimização de imagens
14. **Deploy**: configurar projeto na Vercel com variáveis de ambiente

---

## 20. Critérios de Aceite

- [ ] Site abre sem erros em Chrome, Firefox, Safari (mobile e desktop)
- [ ] Lighthouse ≥ 90 em todas as categorias
- [ ] Dark/light mode funciona sem flash na primeira carga
- [ ] Troca de idioma PT ↔ EN funciona em todas as páginas
- [ ] Modal de cases abre, fecha com Escape e volta o foco ao card
- [ ] Navegação completa via teclado sem armadilhas de foco
- [ ] Todas as imagens têm `alt` text adequado
- [ ] `npm audit` sem vulnerabilidades críticas
- [ ] Headers de segurança validados em securityheaders.com
- [ ] `sitemap.xml` gerado e válido
- [ ] Deploy na Vercel com preview automático em PRs

---

*Este PRD deve ser lido em conjunto com `/docs/design.md`, que é a fonte primária de verdade para todas as decisões visuais e de tokens do design system.*
