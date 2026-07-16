## Context

### A multichannel automation canvas with more than 20 triggers

Sellbie is an omnichannel CRM and marketing platform for retail brands that operate both physical stores and e-commerce. Unlike automation platforms born purely digital, Sellbie brings POS behavior, in-store purchase history, salesperson relationships, and e-commerce browsing data together in one place.

The closest thing to automation the platform had was Recurring Campaigns, which allowed building basic cadences from triggers like birthday, post-purchase, and reactivation, but within a linear logic with no reaction to customer behavior. Demand for something more sophisticated was recurring: present in CS support data, in research results, and in the user interviews I conducted when I joined the company.

Journeys was born from that demand. A brand-new product, with Recurring Campaign as the starting reference: what existed, what worked, and where the ceiling was. The scope was significantly larger: more than 20 triggers, 3 channels, non-linear connection rules, and feedback for every possible state.

The challenge wasn't just designing a workflow. It was making sure a product with this much complexity could be built by the user without breaking, and built by the team without losing rigor.

---

## Discovery

### What Recurring Campaigns didn't solve

The first move was immersion in the existing Recurring Campaign to understand what was there and the ceiling of what was possible. The model was a linear form: the user selected a trigger (first purchase, purchase, birthday, inactivity, cashback, abandoned cart), set a fixed time, configured D+ in days, and added sends manually one by one. A rigid flow, with no progression and limited for organizing a consistent relationship cadence.

![Recurring Campaign — what existed before Journeys: linear, no branching, no reaction to behavior.](/images/cases/sellbie/jornadas/sellbie-jornadas-campanha-recorrente-antes.png)

It was functional for simple cadences. But three limitations were critical and recurring:

**No behavior tracking.** The flow executed the calendar regardless of what the customer had done. Someone who had already bought received the same message as someone inactive for six months.

**No branching.** There was no way to say "if they engaged with the email, go this way; if not, go that way." Linear by design.

**Limited e-commerce coverage.** Abandoned cart existed as a trigger, but the full range of digital behaviors was left out: category browsing, product viewed, search performed.

### Benchmarking

Before proposing any architecture, I mapped how other automation platforms structured their flow builders. The benchmark combined two formats: direct access to a platform the team already used under contract, and analysis of screens and documentation from other tools based on publicly available materials, such as marketing automation content, screenshots, and product documentation.

The most common pattern across the platforms analyzed was good coverage of digital behaviors. In the flows observed, no approaches were identified that integrated the physical store with the depth Sellbie needed, with preferred salesperson, account assignment, cashback, and POS behavior segmentation. That was the real space for differentiation, and it's what guided the architecture decisions.

Another relevant observation: in some of these platforms, feedback about incorrect settings only appeared when saving the flow. That informed a Sellbie design decision to work on error prevention throughout the entire build, not just at the end.

With diagnosis and benchmarking consolidated, the scope was defined: a visual, non-linear workflow, free enough to cover complex journeys, but structured enough to guide the user and prevent settings that would compromise sends.

---

## Define

### PRD and alignment with product

I worked alongside the product team building and reviewing the PRDs for each module: registration and settings, triggers, intervals, channels, path split, and template library. Each PRD defined business rules, states, behaviors, and restrictions by contracted plan, and it's what let design and engineering speak the same language throughout the whole process.

### The architecture decision: a free canvas with structuring grammar

The simplest alternative would be a sequential-steps form, easier to build, more predictable. But it wouldn't reflect reality: one customer might come in, open an email, buy, and leave. Another might ignore three sends, receive an SMS, and convert. The mental model of a journey isn't linear.

The decision was a drag-and-drop canvas with a connection grammar that mirrored the business rules. Not for aesthetics, but because connection errors between steps translate into incorrect sends, wrong audiences reached, and compromised campaign results. The freedom to build any flow needed to coexist with the impossibility of building an invalid one.

The canvas steps:

- **Entry trigger** — the event that inserts the customer into the journey
- **Interval** — the wait time between steps
- **Channel** — the send (email, SMS, WhatsApp)
- **Split / join path / migrate / exit** — flow control across every dimension

### Connection grammar and error prevention

Mapping the connection rules was a central deliverable: not just documentation, but the logic that governs what's possible to build:

- Entry trigger always connects to an **Interval**
- Interval connects to a **Channel**, **Path split**, or **Exit journey**
- Channel connects to an **Interval** or **Exit journey**
- Path split comes from an **Interval**, branches out via Yes/No, and each path connects to a **Channel**, **Join path**, **Migrate journey**, or **Exit journey**

Each violation has a specific message. Trying to connect a trigger directly to a channel returns: *"Connect the entry trigger to an interval to start the journey."* Trying to connect a channel directly to a path split returns: *"Connect your channel step to an interval. Only an interval can connect to a path split step."*

Steps with incomplete configuration show an alert about what's missing, without blocking navigation, but preventing the journey from being activated with pending items. This distinction was deliberate: blocking during the build increases friction; blocking at activation ensures integrity without penalizing the iterative process.

---

## Develop

### Journey creation

Journeys configure a different campaign model from one-off campaigns, organized in their own tab within Campaigns. When creating a new campaign, the user chooses among the available models, one of them being Journey. The overview shows the flows in cards or a list, with identification, type, dates, status, and send count per channel available for a quick read.

![Journey as a campaign model — an entry point integrated into the platform's existing flow.](/images/cases/sellbie/jornadas/sellbie-jornadas-menu-criacao.png)

![Card overview — status, channels, and identification of each journey at a glance.](/images/cases/sellbie/jornadas/sellbie-jornadas-visao-geral-cards.png)

When selecting Journey, a side panel captures the basic data: name (internal identification, invisible to the end customer), journey type, description, start date, and participating stores. The type carries a pre-filled description that guides the model's purpose. On save, the journey is created as a draft and the user enters the canvas.

![Creation panel — basic journey data before entering the canvas.](/images/cases/sellbie/jornadas/sellbie-jornadas-painel-criacao.png)

### Entry triggers

With the journey created, the canvas opens with the entry trigger step already positioned. It's the canvas's only fixed step: no journey works without it, so it can't be deleted. The side panel shows triggers organized by category so the user can select and configure the entry behavior.

Each trigger has its own configuration and availability conditioned on the brand's profile. A brand that only operates a physical store doesn't have access to digital browsing triggers. One that only operates e-commerce doesn't have access to salesperson-linked triggers. Browsing triggers require a tag integration on the brand's e-commerce. What isn't available shows up disabled with an upgrade prompt, without disappearing from the interface.

The categories reflect the product's omnichannel scope: **Purchase** (Purchase, First purchase, No purchase), **Registration** (Birthday, Lead sign-up), **Browsing** (Cart abandonment), complemented by CRM and Loyalty in the full set.

![More than 20 triggers organized by category — physical store and e-commerce behaviors in the same canvas.](/images/cases/sellbie/jornadas/sellbie-jornadas-gatilhos-canvas.png)

### Journey settings

The journey's global rules are accessible via a settings icon on the canvas, at any point during the flow build:

- **Journey intervals** — whether weekends count or not toward the interval time between steps
- **Entry frequency** — how many times the same customer can enter the journey: only once until completion, every time the trigger occurs, or again after a configurable rest period
- **Journey exit** — when the customer should leave the flow: on completing the last step, on making a purchase during the journey, or on entering a new journey

![Global journey settings — entry, frequency, and exit rules defined before building the flow.](/images/cases/sellbie/jornadas/sellbie-jornadas-configuracoes-jornada.png)

**Note — Template library:** the specific settings for each send are defined in the Template Library, a product independent from the platform. Templates need to exist before the journey is created. When reaching a channel step, the user selects an already-configured template and moves on, without interrupting the journey's train of thought. The library organizes templates by channel (Email, WhatsApp, SMS) and by type (One-off / Journeys), with guided step-by-step creation.

![Template library organized by channel — the content exists before the journey is built.](/images/cases/sellbie/jornadas/sellbie-jornadas-biblioteca-templates-geral.png)

![Template creation in steps — type, channel, and content defined through a guided process.](/images/cases/sellbie/jornadas/sellbie-jornadas-biblioteca-templates-criacao.png)

### Intervals

The original PRD defined three interval types, one for each channel's logic. In practice, this created friction: the user had to know each channel's rules before choosing the right interval type, and if they changed the channel afterward, they'd have to delete the step, find the correct model, and reconfigure from scratch.

During usability testing and analysis, we identified that the complexity was in the wrong place. The restrictions belonged to the channel, not the interval step. The decision was to unify into a single configurable step, which adapts to the connected channel and signals when the configuration isn't compatible, without requiring the user to know each channel's rules beforehand.

The unified step offers wait time with quantity and period selection (minutes, hours, or days), plus an option to schedule a date and time for the send to start. If the user connects a configuration incompatible with the channel, the system signals it without needing to delete and recreate the step.

Consider whether weekends are included or excluded when scheduling the interval. This setting lives in the journey's settings menu. The 1:1 WhatsApp channel doesn't identify specific hours, since the audience is always distributed at the first time slot of the morning; that time may vary depending on the brand's integration settings.

<ImageGroup
  fixedHeight={320}
  images={[
    { "src": "/images/cases/sellbie/jornadas/sellbie-jornadas-step-intervalo-1.png", "alt": "Interval step — wait time and send schedule configuration.", "caption": "Interval — wait time and schedule", "imgWidth": 344, "imgHeight": 576 },
    { "src": "/images/cases/sellbie/jornadas/sellbie-jornadas-step-intervalo-2.png", "alt": "Interval step — incompatibility with the connected channel signaled.", "caption": "Channel incompatibility signaled", "imgWidth": 344, "imgHeight": 578 }
  ]}
/>

### Channels

The presence of multiple channels isn't just a technical matter. Each channel corresponds to a different way of reaching the end customer, and the choice between them is part of brands' strategic planning for CRM, relationship, and re-engagement. A cadence combining email, WhatsApp, and SMS makes it possible to work different moments of the journey with the right language and level of closeness for each one.

When configuring a channel step, the user selects the template to be used. Each channel has its own configuration specifics and contextual alerts:

**Email** — besides the template, the user configures sender, IP pool, UTM_campaign, and subject. Sends start at the time configured in the interval and may take a few minutes depending on the size of the audience.

**WhatsApp 1:1** — the physical store salesperson's channel. Sends are distributed in the app in the morning, roughly between 8am and 10am. Configuration is limited to template selection, since timing is controlled by the account-assignment process.

**SMS** — sends start at the configured time. Only customers with an associated phone number receive the sends; the rest move on to the next step without blocking the flow.

Channels not contracted appear disabled with an upgrade prompt, consistent with the trigger behavior.

<ImageGroup
  fixedHeight={320}
  images={[
    { "src": "/images/cases/sellbie/jornadas/sellbie-jornadas-canal-email.png", "alt": "Email configuration — template, sender, and tracking in a single panel.", "caption": "Email — template, sender, and tracking", "imgWidth": 336, "imgHeight": 550 },
    { "src": "/images/cases/sellbie/jornadas/sellbie-jornadas-canal-whatsapp.png", "alt": "WhatsApp 1:1 channel — sent by the physical store salesperson, distributed in the app in the morning.", "caption": "WhatsApp 1:1 through salesperson", "imgWidth": 344, "imgHeight": 558 },
    { "src": "/images/cases/sellbie/jornadas/sellbie-jornadas-canal-sms.png", "alt": "SMS channel — restrictions and channel behavior made explicit in the configuration, with no surprises at send time.", "caption": "SMS — explicit restrictions", "imgWidth": 344, "imgHeight": 558 }
  ]}
/>

### Split path, join, migrate, and exit

**Path split** branches the flow into Yes/No based on customer behavior. Action triggers, such as purchased, reached goal, and segmentation upgrade, are always available. Channel-based triggers, such as received, opened, and clicked for email, only appear when connected to a previous send.

**Join path** reconnects paths separated by a split, for when the difference in treatment is temporary and the following flow is the same for both profiles.

**Migrate journey** transfers the customer to another already-registered journey, without requiring the same entry trigger, allowing journeys with distinct logics to be chained without concentrating all the complexity in a single flow.

**Exit journey** ends the flow at that point, positioned by the user, distinct from the global exit rules configured at the start.

![Path split — the flow reacts to customer behavior, not just the calendar.](/images/cases/sellbie/jornadas/sellbie-jornadas-acoes-steps.png)

### Early entry (D-)

Normal journeys start from an event that has already occurred. Early Entry reverses this: the customer enters X days before the event, and the journey runs a progressive communication cadence until they reach it.

A direct example: a brand wants to work birthday customers of the month with an exclusive offer to use before the date. With early entry configured for 30 days before the birthday, the customer receives a sequence of communications throughout the month, with an activation message, a reminder, and a last call. The journey knows exactly where each customer is in the countdown.

The design problem was temporal ambiguity: how does the user know, while building the flow, whether a send happens before or after the event? The solution was automatic signaling on the cards. Steps after the event show *"X day(s) after the event"* and the step on the day shows *"This is the event day."* In flows with branches, the alert appears on every first post-event send in each path.

When the user configures immediate exit right after the event and tries to add sends afterward, the system blocks the connection with explanatory feedback, preventing a contradictory configuration without penalizing the build process.

![Early entry — the journey starts before the event and automatically signals where each send falls on the timeline.](/images/cases/sellbie/jornadas/sellbie-jornadas-entrada-antecipada.png)

---

## Results

### Automation as a real differentiator for the platform

Journeys replaced Recurring Campaigns with a layer of intelligence the product didn't have. For the first time, brands could build flows that reacted to customer behavior, not just the calendar, and Sellbie started offering marketing automation as a real platform differentiator, not an open-ended promise.

**New product launched:** a visual workflow with a free canvas, structuring connection grammar, and active error prevention throughout the entire build. A product the customer base had been asking for, which now positioned Sellbie competitively against automation platforms in the market.

**More than 20 triggers** across 6 categories, combining real-time e-commerce and physical store. In the flows observed during benchmarking, no approaches were identified that integrated these contexts with the same depth. Sellbie's omnichannel differentiator finally translated into an automation product.

**Early entry (D-):** an automation model unprecedented on the platform, which let brands plan progressive cadences ahead of future events like birthdays, cashback expiration, and end of promotion.

The process also established infrastructure for the following cycles: PRDs as a documented practice, Design System as a shared language with engineering, and a collaboration model that let the team keep building with rigor and autonomy.

---

**Users served:** CRM and marketing analysts and managers at retail brands · E-commerce teams · Campaign coordinators

**Process:** Immersion in the existing platform → Competitive benchmarking → Business rule mapping and PRD → Workflow architecture → Design of triggers, settings, intervals, channels, and flow control

**Deliverables:**
- Non-linear canvas with connection grammar
- Per-step error prevention
- More than 20 triggers with specific configurations
- Global journey settings
- Split / join / migrate / exit
- Early entry (D-)

**Tools:** Figma · Competitive benchmarking · Collaborative PRD · Design System
