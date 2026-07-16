## Problem

### Manual analysis, with no standard and no strategic direction

Sellbie's CS team tracks brands' CRM performance using platform data, but with no clear analytical structure. Every meeting required manually assembling analysis, with no standard and no strategic direction. Product also had no consolidated visibility into what was working in CRM operations.

The request arrived as an open-ended challenge: structure a CRM Performance Report with no defined scope, which required diving into the product to build the rationale from scratch — from surveying the indicators to the UX proposal, turning scattered data into actionable intelligence for CS and product.

---

## Discovery

### Indicators, Healthscore, and CS materials

The starting point was mapping everything that already existed — indicators available on the platform, what CS was already reporting, how they were reporting it, and what was missing to make that reporting strategic.

This discovery included analyzing the materials CS already used in client meetings — presentations, spreadsheets, manually exported reports — and mapping the indicators available on the platform, organized into 6 dimensions:

**Customer profile** Super VIPs, VIPs, Frequent, Potential, Inactive, Lost, Prospects

**Behavior** Frequency, Recency, Retention, Repurchase, Redemption, Segment evolution, New customers

**Base quality** Membership, Complete records, Phone, Email, Birthdate, Address, Gender

**CRM execution** App, Impact, Conversion, Campaigns, Active journeys, Distribution by store

**Omnichannel performance** Physical, Digital, Omni, Abandoned cart, Revenue by channel, Market comparison

**Business indicators** Revenue, Average ticket, Visits, Buyers, Items, Items per transaction, Variation vs. previous period

Based on this discovery, I also structured a **CRM Healthscore** — a 0-to-40 score per store across 4 dimensions: Membership, Complete registration, App usage, and Conversion. Bands: Healthy (29–40), Attention (17–28), and Critical (0–16). The goal was to give CS a single number that communicated operational maturity without needing to open every indicator individually.

---

## Opportunity map

### Ten problem dimensions, one central opportunity

With the discovery findings in hand, I structured a map connecting observed problem, opportunity, proposed solution, and expected outcome across 10 dimensions:

**Executive visibility** with no single number for operational health, CS didn't know where to start the analysis.

**Funnel without clarity** the data existed by stage, but with no visual connection between cause and effect.

**Underused base** a large part of the base with potential wasn't being impacted, due to a lack of visibility into who to prioritize.

**Segmentation with no practical use** segments existed on the platform, but with no integrated quality or propensity reading.

**Execution disconnected from outcome** CS could see what was sent, but not the gap between what was done and what was possible.

**Channels with no efficiency comparison** there was no side-by-side view of which channel performed better for each profile.

**Scattered alerts** critical issues had no centralized visibility or actionable language.

**Opportunities with no financial prioritization** CS identified opportunities, but with no impact estimate to prioritize them.

**Action separated from diagnosis** to set up a campaign after identifying an opportunity, CS had to leave the report and go to another system.

**Planning with no support** there was no tool to simulate impact or structure a communication plan within the platform.

The central problem was clear: the report existed as raw data, with no reading structure, no connection to action. CS spent hours assembling manual analysis, and the delivery was still inconsistent and hard to scale.

The central opportunity: turn CRM from analytical into strategic, with data that automatically generates direction for action, not just number display.

![Opportunity map — every problem connected to a solution and expected outcome before any screen was designed.](/images/cases/sellbie/crm/sellbie-crm-relatorio-mapa-oportunidades.png)

---

## UX proposal

### Thirteen sections in four functional blocks

With the opportunity map as a foundation, I structured a proposal with 13 sections — each with defined content, the pain point it solves, identified opportunities, expected outcome, and UX proposal. The decision to document each section at this level of detail was intentional: to make sure every screen had a clear purpose before a single pixel was designed.

The 13 sections were organized into 4 functional blocks:

**Diagnosis and operational health**
Healthscore, CRM revenue share, variation vs. previous period, and an interpretive summary. The decision to open with a single operational-health number was to give CS a quick starting point, without needing to navigate the entire report to understand whether the account is doing well or poorly.

**Funnel and base**
Integrated funnel from total base to revenue, distribution by segment, customer behavior, and performance by segment. The funnel was designed to make the bottleneck automatically visible, without CS having to calculate where the loss is.

**Execution and performance**
Impacted base, campaigns, journeys, channels, cashback, and performance by store. The focus here was connecting execution to outcome, showing not just what was done, but the gap between what was done and what was possible.

**Intelligence and action**
Priority alerts, opportunities ranked by financial impact, action recommendations, and impact simulation. This layer was the most important part of the proposal: turning data into actionable recommendations, with estimated revenue potential for each opportunity.

---

## Consolidation

### From proposal to operational dashboard in Figma Make

In consolidation with the PM, the proposal was implemented in Figma Make with 4 main modules, each with a distinct purpose within the CS journey.

**Diagnosis**
The report's entry point. Healthscore, CRM revenue share, variation vs. previous period, and base with potential, all on one screen. Below, 11 navigable detailed analyses and strategic recommendations prioritized by financial impact, with a direct link to the relevant section.

The decision to centralize recommendations in the diagnosis was so CS would arrive at the meeting with the direction already set, without needing to navigate the entire report to build the argument.

**Integrated Funnel**
Full view of the journey: Total base → Valid base → With potential → Not impacted → Impacted → Buyers → Revenue. Each stage shows the conversion rate and automatically highlights the biggest bottleneck identified.

The decision to use a horizontal funnel, with the drop percentage visible between stages and automatic highlighting of the problem, was to reduce CS's cognitive effort — the bottleneck shows up without needing to be calculated.

**High-Propensity Base Generator**
A tool for CS to assemble a campaign's base directly within the report. Period selection with no impact, distribution by segment and preferred channel, with filtering by segment, average ticket, and recency.

The decision to include this module came from a specific pain point in the discovery: CS had to go to another system to assemble a campaign's base after identifying the opportunity. Bringing this into the report closes the loop between diagnosis and action.

**Communication Plan Calculator**
Brand inputs, editable assumptions, and a smart cadence per channel, turning the report into a planning tool, not just an analysis one.

<Carousel
  images={[
    { "src": "/images/cases/sellbie/crm/sellbie-crm-relatorio-make-1-dashboard.png", "alt": "Diagnostic dashboard — CS arrives at the meeting with Healthscore, variation, and recommendations already on screen" },
    { "src": "/images/cases/sellbie/crm/sellbie-crm-relatorio-make-2-analise-funil-integrado.png", "alt": "Integrated funnel — the bottleneck appears automatically, without CS needing to calculate where the loss is" },
    { "src": "/images/cases/sellbie/crm/sellbie-crm-relatorio-make-3-gerador.png", "alt": "Base generator within the report — diagnosis and action in the same place, no need to switch systems" }
  ]}
  caption="Dashboard, Integrated Funnel, and Base Generator — from diagnosis to action in the same report"
/>

---

## Outcome

### From analytical to strategic

Proposal validated with the PM and implemented in Figma Make.

**CS operates strategically** diagnosis, opportunities, and recommendations ready on screen, with no manual assembly. From an improvised meeting to a data-based argument.

**Product gains visibility** behavior patterns, bottlenecks, and opportunities in a cohesive structure. What was working in CRM operations becomes visible and replicable.

**From analytical to strategic** every section connects data to action, with financial impact simulation for prioritization. The report stops being a file and becomes a decision-making tool.

---

**Audiences served:** CS · Product

**Process:** Discovery → Opportunity map → UX proposal (13 sections) → Consolidation with PM

**Modules:** Diagnosis · Integrated Funnel · High-Propensity Base Generator · Plan Calculator

**Tools:** Figma · Figma Make
