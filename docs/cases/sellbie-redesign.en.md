## Context

### Redesigning a platform with no design structure

Sellbie is a SaaS CRM and multichannel marketing platform aimed at retail brands. The product had been built reactively over the years, with no design layer structuring decisions. When I joined, there was no defined UX, no Design System, inconsistent navigation between modules, and fragmented journeys. The company wanted to redesign the platform — with no PRD, no documentation base, no clear place to start. The challenge wasn't just redesigning screens. It was creating the conditions that would make the redesign possible.

---

## Discovery: immersion, research, and diagnosis

### Immersion in the existing platform

The first move was to understand what already existed. I went through the old platform screen by screen, analyzing UI, navigation flows, information structure, interaction patterns, and breakpoints in the journey. The platform had no visual consistency between modules: two navigation patterns coexisted with no clear criterion, sometimes top, sometimes side, and the visual identity varied between areas. Journeys were fragmented, and there was no UX rationale structuring the decisions made over time.

<Carousel
  images={[
    { "src": "/images/cases/sellbie/redesign/sellbie-redesign-navegacao-antes-1.png", "alt": "Top navigation pattern" },
    { "src": "/images/cases/sellbie/redesign/sellbie-redesign-navegacao-antes-2.png", "alt": "Side navigation pattern" },
    { "src": "/images/cases/sellbie/redesign/sellbie-redesign-navegacao-antes-3.png", "alt": "Third coexisting navigation pattern" }
  ]}
  caption="Three navigation patterns coexisting with no clear criterion — the inconsistency problem before the redesign"
/>

I also gathered the material the company already had: data on the brands served, a history of features developed, and support records. This material was the initial basis for formulating the hypotheses that would guide user research.

### User research

Before I joined, the CS team had run a survey with clients via a form. The material pointed to pain points around filters, reports, contact distribution, and channel integrations, and showed that the usage experience varied a lot between profiles: each brand had its own organizational structure and distinct journeys within the platform.

I structured and conducted semi-structured interviews with users. The process included a briefing, screener, CSD Matrix, and a script with thematic blocks: current use, challenges and points of confusion, day-to-day operation, needs and suggestions, favorite features, missing features, and experience with the support team. Profiles varied — analysts and managers from different brands, each with its own dynamics.

![Interview clustering — patterns that defined the focus of the first delivery.](/images/cases/sellbie/redesign/sellbie-redesign-board-entrevistas.png)

![Research learnings — synthesis that guided the redesign decisions.](/images/cases/sellbie/redesign/sellbie-redesign-board-aprendizados.png)

The most critical pattern that emerged was the fragmentation between creating a campaign and creating a send. On the platform, sends (called "actions") were created from the report screen of an already-existing campaign, which could be completely empty, with no send associated and no useful information displayed. This break in context accounted for most of the confusion reported in the interviews. The data also pointed to difficulty understanding the status of campaigns and sends, plus demand for more autonomy within the tool and more complete integrations between channels.

With the findings consolidated, the focus was set: the campaigns and sends module was where the effort of the first delivery should be concentrated.

---

## Define: UI proposal, Design System, and PRD

### UI proposal — approval before building

With the diagnosis in hand, the first step was to structure a UI proposal for the new platform to present to the company owner. There was no way to move forward without that approval: any Design System or flow decision depended on an agreed visual direction. The proposal defined the new visual identity, the unified navigation architecture, and the interaction patterns that would replace the existing inconsistency. It was also the moment to align expectations about what the redesign would mean visually for the product, before a single component line was built.

### Design System — aligned with the developers

Once the proposal was approved, the next step was to build the Design System foundation together with the developers, aligning on which development libraries they would use to ensure the components defined in Figma had a direct match with what would be implemented, reducing rework and speeding up delivery.

The work involved defining a color palette with clear roles (primary, neutrals, functional status colors), typography, iconography, grid, component states, and a component library. Nielsen's heuristics served as the technical criterion for building these components with a solid rationale: status badges to communicate system visibility; ⓘ icons on fields to make sure all user profiles, regardless of familiarity with marketing or CRM, understood the platform's language without relying on prior knowledge; placeholders and character counters to prevent errors before they happen; a consolidated summary before approval, because recognition is more efficient than recall.

### PRD — guiding a practice that didn't exist

With the UI approved and the DS foundation structured, I guided and requested that the product team build the PRD for the first module to be designed: one-off campaigns and sends. There was no product document prior to my joining, and the team didn't have that practice established. I led the process, instructed on what needed to be defined, and worked alongside the team to structure flows, business rules, states, behaviors, and delivery scope. This is what made it possible to align expectations between design, product, and engineering, and to enable a well-grounded delivery.

The process wasn't linear. The absence of structured product practices meant definitions had to be revisited along the way, with flows and adjustments happening in parallel with the build. Navigating that environment was part of the work.

---

## Develop: new architecture and campaign flow

### Navigation structure

The new platform organized the product into broad areas accessible via top navigation, with submodules through dropdowns, reflecting the users' mental model identified in the interviews. The header was standardized with logo, main navigation, support and notification icons, and profile access. A top banner made it easy to access the old platform, since most features were still being migrated and needed to remain accessible during the transition.

### Campaigns Module

**Campaign listing**

The card view is the default listing view. Each card shows type, ID, name, dates, status with an explanatory tooltip, and send count per channel. The context menu shows available actions depending on the campaign's status, such as activate, edit, approve, view report, and pause. The list view, toggleable via controls on the page itself, allows scanning large volumes with column sorting: Status, Name, ID, Type, Start date, Created at, Last edited, Sends, and Actions.

The split between the **One-off** and **Journeys** tabs (previously called recurring, but without flow automation) organizes two campaign models with distinct logic without mixing contexts.

<Carousel
  images={[
    { src: "/images/cases/sellbie/redesign/sellbie-redesign-campanhas-antes.png", alt: "Campaign listing before — fixed table" },
    { src: "/images/cases/sellbie/redesign/sellbie-redesign-campanhas-cards-depois.png", alt: "New card listing — default view with status, type, and sends per channel" },
    { src: "/images/cases/sellbie/redesign/sellbie-redesign-campanhas-listagem-depois.png", alt: "New list view — column sorting for high volume" },
  ]}
  caption="Campaign listing: fixed table → cards as default + toggleable list"
/>

**Guiding empty state**

When there are no campaigns or sends, the screen shows an empty state with an illustration, a direct message, and a CTA. The pattern is consistent both in the campaign listing and on the sends screen within a campaign.

**Send creation — from the report screen to the contextual drawer**

On the old platform, the entry point for creating a send was the report screen of an already-created campaign, which could be completely empty with no send associated. Clicking "Create action" redirected to a separate page with a 4-step linear stepper: a flat form with no grouping, dense base selection with no context, and no consolidated summary before confirming. Any correction required redoing steps.

<Carousel
  images={[
    { src: "/images/cases/sellbie/redesign/sellbie-redesign-criacao-envio-antes-1.png", alt: "Old flow — separate page with no campaign context" },
    { src: "/images/cases/sellbie/redesign/sellbie-redesign-criacao-envio-antes-2.png", alt: "Old flow — steps on a separate page with no visible campaign context" },
    { src: "/images/cases/sellbie/redesign/sellbie-redesign-criacao-envio-antes-3.png", alt: "Old flow — dense base selection with no consolidated summary" },
  ]}
  caption="Old flow — four separate pages, zero campaign context"
/>

The redesign resolved this break by unifying campaign and send into one continuous journey. The campaign's sends screen shows the campaign's name and ID as a constant reference, and the creation flow opens in a side drawer over that screen. The campaign's context stays visible at all times.

![New contextual drawer — campaign visible at all times while the send is configured.](/images/cases/sellbie/redesign/sellbie-redesign-criacao-envio.png)

Clicking "+ Create send" opens a dropdown with the available channels: WhatsApp, Email, and SMS. Channels not contracted by the brand appear disabled. Each channel has a flow with its own specifics, but all follow the same progressive accordion structure with expandable steps, allowing navigation between already-completed sections without redoing the flow.

The documented flow is the email one, organized into three steps:

**Step 1 — Primary data:** Send name (with a tooltip explaining it isn't shown to the customer) and Start date/time, with separate inputs for date and time.

![Step 1 — send name and start date/time.](/images/cases/sellbie/redesign/sellbie-redesign-envio-drawer-email-etapa-1.png)

**Step 2 — Send content:** Content options (Saved template from the library or Create content), Sender, IP pool, UTM_campaign, and Subject with support for dynamic variables and emoji. Each field has an ⓘ icon with an inline explanation. The option to preview the template before moving on is available directly in the step.

![Step 2 — template, sender, UTM, and subject with dynamic variables.](/images/cases/sellbie/redesign/sellbie-redesign-envio-drawer-email-etapa-2.png)

**Step 3 — Customer base:** Base options (All customers, Saved bases, Birthday customers, Segment, Promotion base) with selection of participating stores and a toggle to exclude customers who are part of other campaigns. The calculated base shows the count before moving on.

![Step 3 — base selection with the calculated count shown before moving on.](/images/cases/sellbie/redesign/sellbie-redesign-envio-drawer-email-etapa-3.png)

**Review and approval**

Before finishing, the drawer shows a Send summary consolidating all configured information: Campaign data, Primary data, Content, and Customer base, each section with inline editing. The user reviews the full set and can correct anything without redoing steps.

The approval step includes sending a test to a phone or email and two explicit options: Approve now (scheduled send, status changes to Scheduled) or Approve later (saved as Awaiting approval). This formal review and approval step didn't exist on the old platform.

![Consolidated summary — full send review with inline editing, no need to redo steps.](/images/cases/sellbie/redesign/sellbie-redesign-envio-drawer-email-etapa-resumo.png)

![Approval step — formalizes the review before sending, with two explicit options.](/images/cases/sellbie/redesign/sellbie-redesign-envio-drawer-email-etapa-aprovacao.png)

---

## Results

### A foundation that made continuity of the product possible

The first delivery was the one-off campaigns and sends module. Redesigning the entire platform at once would have been unfeasible given the product's complexity and the lack of any starting structure. Narrowing the scope was a deliberate decision, guided by the research and made viable by the PRD.

The campaign and send creation flow, the most critical one according to the research, went from a linear stepper on a separate page, with no context and no review, to a contextual drawer with a progressive accordion, a consolidated summary, and a structured approval step. Every field, grouping, and visual state is grounded in the heuristics that guided the Design System's construction.

Beyond the module delivery, the foundations built throughout the process now exist as infrastructure for the next cycles: the Design System as a shared language between design and engineering, the PRD as an institutionalized practice in the product team, and user research as an established process. The team is now equipped to keep building with rigor and autonomy.

**Improvement indicators**

CES, CSAT, and creation time are projections based on the flow's structural changes, to be validated with future data collection. The heuristics applied respond directly to gaps identified on the old platform.

| Indicator | Baseline (old platform) | Projection / improvement applied |
|---|---|---|
| **CES — Send creation** | High effort reported; flow on a separate page with no context | ~35% reduction in perceived effort: contextual drawer, progressive accordion, fields grouped by step |
| **CSAT — Overall usability** | Dissatisfaction with usability cited as a recurring pain point | ~25 to 30 percentage point improvement: consistency via Design System, unified navigation, status feedback |
| **Average creation time** | No formal measurement; 4-step flow on a separate page with redirection | ~40% reduction: elimination of redirection, navigable accordion, auto-fill |
| **Heuristics applied** | Lack of status visibility, consistency, error prevention, recognition, and contextual support | All of Nielsen's heuristics addressed in the Design System: status badges, ⓘ icons, placeholders, counters, consolidated summary, structured approval |

---

**Users served:** Marketing analysts and managers at retail brands · CRM teams · Campaign coordinators

**Process:** Immersion in the existing platform → Client research → User interviews → UI proposal → Design System → PRD → Redesign of the one-off campaigns and sends module

**Deliverables:**
- Mapping of existing flows
- Design System (Figma) and PRD
- Unified navigation architecture
- Campaign listing (cards and list) and empty states
- Send drawer with accordion (email, WhatsApp, SMS)
- Consolidated summary and send approval

**Tools:** Figma · Semi-structured interviews · Quantitative research (form via CS) · Nielsen's heuristics · CSD Matrix
