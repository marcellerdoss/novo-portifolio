## Problem

### A generic center for three radically different profiles

The help center existed, but it served everyone the same way: a single generic set of content that didn't address the specific questions of each profile. The platform served Explorers (students), Educators (teachers and coordinators), and Guardians (parents and family members) simultaneously, audiences with radically different usage contexts, vocabulary, and questions. An access question from a guardian has nothing to do with a pedagogical question from an educator.

The lack of segmented structure led to recurring escalation to the support team for questions that could have been resolved through self-service, and made it harder for each profile to quickly and independently find information relevant to them.

The challenge was to turn a generic help center into a navigable, persona-segmented, scalable structure that let each profile find the right answer without having to filter out content that wasn't meant for them.

My role was to lead the benchmarking, structure the information architecture, define flows and requirements, and deliver the handoff to development.

---

## Benchmarking

### What reference platforms do differently

The starting point was understanding how help centers with multiple user profiles solved the content-segmentation problem. The benchmarking included references such as LinkedIn and other platforms with knowledge bases structured for distinct audiences.

The main patterns identified, and what each one informed in the solution:

**Segmented navigation** by user type as the main organizing mechanism, which pointed to the need for the persona to be the entry point, not a filter applied later

**Search as discovery**, the primary one, not just an alternative to navigation, reinforcing that search needed to be contextualized by profile from the start

**Clear hierarchy** of categories and articles within each profile, so the user knew where they were and where they could go

**Typo handling** with suggestions for similar terms, to avoid abandoning the user at the first obstacle

**Empty states** for searches with no result, directing to an alternative instead of a dead end

**Usefulness feedback** on articles, as a mechanism for validation and continuous content improvement after launch

---

## Opportunity map

### Three opportunities that defined the architecture

The central problem was structural: the content existed, but the architecture didn't distinguish who was reading it. An educator looking for how to create a test and a guardian looking for how to track their child arrived at the same place, with the same result, and had to manually filter what was for them.

The structure was designed considering that Jovens Gênios operates two distinct platforms, one for Educators and one for Explorers, with support needs specific to each usage context. This reinforced the decision not to create a generic unified center, but rather a space with independent entry points per persona. Benchmarking with large-company platforms validated that this segmentation model was the standard in products with heterogeneous user bases.

Three opportunities were prioritized from this diagnosis:

**Context as the starting point** organize the center around profiles from the entry point, not as an optional filter, reducing the effort for each user to reach content relevant to them.

**Search that understands context** search filtered by profile with a smart fallback to the general base, preventing segmentation from creating inaccessible content islands.

**Failure with an exit** treat search error states as moments of retention, not abandonment, with distinct directions for each type of failure.

---

## Architecture proposal

### Profile as the entry point, context always preserved

The solution was organized around a central principle: the user's profile defines the context of the entire navigation, from search to articles. This translated into three structural decisions.

**Entry by persona, not by content**
The home page doesn't list generic categories: it offers three explicit entry points by profile, with visual shortcuts for Educators, Explorers, and Guardians right below the search bar. A user who arrives without knowing what to look for finds their path in one click. Global search exists for those who already know what they want, but it isn't the main path.

**Context preserved within the profile**
Upon entering a profile, the search filter is applied automatically. The header visually identifies the persona. Side navigation on articles lists the entire structure of that profile, allowing exploration without needing to go back to the category. The decision to keep the context active throughout the journey was to prevent the user from accidentally leaving their space while searching or browsing.

**Search with two types of fallback**
Two error states with distinct directions: when the selected profile has no result, the suggestion is to search the general base; when the term has a typo, the system suggests the correction before declaring absence. Every empty state has a clear next step, none abandons the user.

---

## Consolidation

### Complete flows and handoff to development

The proposal was consolidated in Figma with complete flows for the three profiles, covering the main states of each page and the search's edge cases. The handoff to development included defining behavioral requirements, not just what each element does, but when and why.

**Home Page**
Search with profile filter, visual shortcuts by persona, general FAQs, and popular articles segmented by Educators and Explorers on the same screen.

![Three profile entries right on the home page — context defines the path before the first search.](/images/cases/jovens-genios/central-de-ajuda/jg-central-ajuda-pagina-inicial.png)

**Category Pages — Educators, Explorers, and Guardians**
Each profile with its own visual header, pre-applied search filter, tab navigation to the other profiles, articles organized by category, and progressive expansion via "See more."

<Carousel
  images={[
    { "src": "/images/cases/jovens-genios/central-de-ajuda/jg-central-ajuda-categorias-educadores.png", "alt": "Educators category — pre-applied filter and own visual identity for each profile" },
    { "src": "/images/cases/jovens-genios/central-de-ajuda/jg-central-ajuda-categorias-exploradores.png", "alt": "Explorers category — same structure, different context" },
    { "src": "/images/cases/jovens-genios/central-de-ajuda/jg-central-ajuda-categorias-responsaveis.png", "alt": "Guardians category — three profiles, three distinct spaces within the same center" }
  ]}
  caption="Educators, Explorers, and Guardians — same category system, three different readings"
/>

**Article Pages**
Consistent structure across profiles: breadcrumb, copy link, side navigation with the center's full hierarchy, article content (text, image, and/or video), usefulness feedback, related articles, and a "Help me JG" button fixed at the bottom right corner to open the support chat, ensuring the user always has an alternative path when the content doesn't solve their problem.

![Article with side navigation and always-accessible support — if the content doesn't resolve it, the next step is on the same screen.](/images/cases/jovens-genios/central-de-ajuda/jg-central-ajuda-artigo-nav-lateral.png)

**Search — result and error states**
Results with a side filter by profile and a count per category; empty state with an alternative filter suggestion; empty state with a typo correction suggestion.

<Carousel
  images={[
    { "src": "/images/cases/jovens-genios/central-de-ajuda/jg-central-ajuda-busca-resultados.png", "alt": "Profile-filtered search — contextualized results and count per category" },
    { "src": "/images/cases/jovens-genios/central-de-ajuda/jg-central-ajuda-busca-empty-states-sugestao.png", "alt": "Typo with an exit — the system suggests the correction before declaring it found nothing" },
    { "src": "/images/cases/jovens-genios/central-de-ajuda/jg-central-ajuda-busca-empty-states-sugestao-filtro.png", "alt": "No result in the profile — suggestion to expand to the general base, never a dead end" }
  ]}
  caption="Profile-filtered results, typo, and no result — all search states"
/>

---

## Outcome

### Validated architecture, reused in Zendesk

**Validated architecture, reused elsewhere** the solution was validated internally, and the profile-segmentation structure served as a direct reference for implementing the center in Zendesk, the platform adopted so as not to overload the development team. The persona-based organization logic, the search flows, and the empty-state handling were preserved in the transition.

**A decision that shows product maturity** the fact that the architecture survived the technology change shows that the structural decisions were solid enough to be replicated in another environment, independent of the tool.

---

**Audiences served:** Educators · Explorers · Guardians

**Process:** Benchmarking → Information Architecture → Flow and requirement definition → Handoff

**Pages:** Home · Categories by profile · Article · Search results · Empty states

**Tools:** Figma
