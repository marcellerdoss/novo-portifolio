## Problem

### Passive cashback, CS with no data, finance doing it by hand

Cashback was one of the most used products among brands on the platform, but it operated passively. Brands generated balance with no clarity on return. CS had no data ready for meetings. Finance calculated surpluses manually every month. And the product had no clear strategic direction.

My entry point was discovery: understanding the real problem for each team before structuring any proposal.

---

## Discovery

### Process survey and scripted interviews

The discovery combined two fronts.

The first was a survey of internal processes: how each team went after the data, how much time it consumed, which materials circulated — presentations, spreadsheets, manually exported reports. This survey revealed a lot about how information was produced, the effort involved, and how much was missing in terms of transparency and speed for those who needed to make decisions.

The second was analyzing the platform's screens — understanding what was visible, what was missing, and where the experience left context gaps for the user.

This set was combined with two semi-structured scripts with distinct audiences, each with different context and pain points.

![Discovery materials — the manual effort CS put in before any data structure existed.](/images/cases/sellbie/cashback/sellbie-cashback-discovery-materiais.png)

**Script 1 · CS and performance**

- "Today, when the client asks if cashback is paying off, what do you do?"
- "Can you confidently state cashback's ROI?"
- "At what point do you feel unsure on the call with the client?"
- "What would you like to have ready on screen during the meeting?"

**Script 2 · Financial diagnosis and pricing**

- "How do you generate the pricing report today?"
- "Where's the biggest risk of error in the current process?"
- "What consumes the most time in this process?"
- "What would bring more confidence and speed?"

---

## Opportunity map

### Seven opportunity dimensions identified

The discovery synthesis revealed 7 opportunity dimensions, organized by evidence and impact for each area.

**Fragmented visibility** CS consults multiple sources and has to build the analysis manually before every call. There's no cohesive narrative available on the platform.

**Information gaps** with no structured ROAS, CS can't show return with confidence. The argument is based on intuition, not data.

**Operational slowness** the pricing process consumes about 2 hours per brand every month, with manual compilation in spreadsheets and no automation.

**Billing risk** manually calculated surpluses create real risk of error. Contracts weren't registered in the system, with no frozen history.

**Confidence to recommend** CS doesn't feel secure suggesting strategy adjustments. There's not enough data to support the recommendation.

**Perceived product value** cashback was perceived as a discount, not as a growth engine. There was no structured value narrative for the client.

**Data with no context** CS had access to raw data but with no decision-oriented structure or visualization. Available data isn't the same as actionable insight.

![Opportunity map — seven dimensions that turned cashback from a discount into an intelligence product.](/images/cases/sellbie/cashback/sellbie-cashback-mapa-oportunidades.png)

---

## Cashback ecosystem

### Three pieces of the same intelligence problem

The request arrived as an open-ended challenge: build an optimization plan for cashback, a ROAS report, and a billing report. With no defined scope, which required diving into the product to structure the rationale from scratch.

Based on the discovery, it became clear these weren't three isolated deliverables — they were three pieces of the same problem. I structured a proposal for each one, connecting the subjects into a single intelligence ecosystem: the Optimization Plan defines the strategy, the ROAS Dashboard measures the impact, and the Pricing Report closes the cycle with monetization.

---

## Optimization Plan

### Three strategies, three behaviors, one integrated logic

**Context**
Cashback existed, but with no clear activation strategy. Brands didn't know when to act, who to communicate with, or what type of incentive to use. The result was idle balance, low redemption rate, and missed repurchase opportunities.

**Design decisions**
I structured three main strategies, each addressing a specific behavior identified in the discovery, designed to operate in an integrated way, with data from the ROAS Dashboard directing which action to apply in each scenario.

*Balance Reactivation* for customers with available cashback who don't come back. Urgency cadences, expiration alerts, and communication for inactive profiles, integrating CRM, WhatsApp, and Promo.

*Balance Top-up* for when the existing incentive isn't enough to drive conversion. A strategic bonus on top of the balance already granted raises perceived value and increases the average ticket.

*Cashback Duplication* for customers with available balance but no urgency to use it. Limited-time campaigns create urgency and speed up the repurchase cycle.

The decision not to create generic strategies was intentional: each action stems from an identified behavior, which lets CS recommend with more precision and lets the product team measure impact per initiative.

**Expected impact**
CS can recommend specific actions based on behavior, not intuition. Brands now have a structured activation plan, with strategies connected to the platform's other products.

---

## ROAS Dashboard

### ROAS in three layers: operational, strategy, and behavior

**Context**
CS had no way to confidently answer whether cashback was generating return. The data existed, but scattered, requiring manual compilation, spreadsheet cross-referencing, and interpretation with no context. The consequence was insecurity on the call with the client and difficulty recommending adjustments.

**Design decisions**
The three-layer organization was the main structural decision. Each layer answers a different question, letting CS navigate from general to specific as the conversation with the client requires, without overloading the screen with information that isn't relevant at that moment.

*Operational ROAS* an executive view of overall impact. Total revenue, cashback generated and redeemed, redemption rate, sales multiplier, and a transparent ROAS calculation. Includes visibility into expired and soon-to-expire cashback, identifying reactivation opportunities before the balance is lost.

*ROAS by Strategy* a comparison between Balance Reactivation, Balance Top-up, and Cashback Duplication, with conversion, revenue generated, and ROAS per campaign. Answers which strategy performs best.

*ROAS by Behavior* average ticket with and without cashback, repurchase frequency, and average time to redemption. Answers whether cashback actually changes customer behavior.

Another decision was to make the ROAS calculation transparent on screen, with the formula and its components visible. CS needed not just to see the number, but to understand and explain where it came from.

**Expected impact**
CS walks into the meeting with data ready, organized by question. From an argument based on intuition to real ROAS, by strategy and by behavior. Speed and confidence on the call.

<Carousel
  images={[
    { "src": "/images/cases/sellbie/cashback/sellbie-cashback-relatorio-roas-make-1-dashboard.png", "alt": "Operational ROAS — revenue, redemption, and expired cashback on one screen, ready for the meeting" },
    { "src": "/images/cases/sellbie/cashback/sellbie-cashback-relatorio-roas-make-2-dashboard.png", "alt": "ROAS by strategy — which action performs best, with data to support the recommendation" },
    { "src": "/images/cases/sellbie/cashback/sellbie-cashback-relatorio-roas-make-3-dashboard.png", "alt": "ROAS by behavior — does cashback actually change what the customer does?" }
  ]}
  caption="Operational ROAS, by Strategy, and by Behavior — the return cashback actually generates"
/>

---

## Pricing Report

### Automated monthly close with no risk of error

**Context**
Finance manually calculated cashback surpluses every month, brand by brand, with different contractual rules for each one. With no centralized system, the process consumed about 2 hours per brand, with real risk of error and recurring rework at closing.

**Design decisions**
The main decision was to separate contract parameterization from the billing report, creating two modules with distinct responsibilities.

The *Contract Register* centralizes each brand's rules in the system: contracted limit, unit surplus value, business model (store-by-store, pooled, or hybrid), and participating stores. This separation was intentional — rules change less often than consumption data, and mixing the two would create unnecessary complexity.

The *Billing Report* operates on top of these rules and delivers five views of generation: all generations per brand, extra cashback base, total surplus, applied business rule, and usage history. The amount to bill is calculated automatically — extra cashback, SMS, email, and add-ons consolidated per brand.

The *Executive Dashboard* closes the module with a consolidated view of the period: total generated, extra cashback, amount to bill, and records processed, so management can follow along without needing to open the full report.

**Expected impact**
Surplus calculated automatically, contracts in the system, frozen history. Risk of error eliminated and roughly 2 hours of monthly rework recovered per brand.

<Carousel
  images={[
    { "src": "/images/cases/sellbie/cashback/sellbie-cashback-relatorio-precificacao-make-1-dashboard.png", "alt": "Executive dashboard — consolidated view of the period with no need to open the full report" },
    { "src": "/images/cases/sellbie/cashback/sellbie-cashback-relatorio-precificacao-make-2-cadastro-contratos.png", "alt": "Contract register — each brand's rules in the system, separated from consumption data" },
    { "src": "/images/cases/sellbie/cashback/sellbie-cashback-relatorio-precificacao-make-3-faturamento.png", "alt": "Billing report — surplus calculated automatically, frozen history, risk of error eliminated" }
  ]}
  caption="Dashboard, Contract Register, and Billing — from margin to contract in the same report"
/>

---

## Outcome

### Strategic CS, automated finance, intelligence product

Proposal validated with the product team and in implementation.

**CS** data ready for the meeting. From an argument based on intuition to real ROAS, by strategy and by behavior. Speed and confidence on the call with the client.

**RevOps and Finance** automated billing process, centralized contracts, auditable history. Monthly closing stops being an operational risk.

**Product** cashback stops being an isolated discount and starts operating as an intelligence product: with a defined strategy, structured measurement, and automated monetization.

---

**Audiences served:** CS · RevOps · Finance · Product
**Methods:** Process survey · Screen analysis · Semi-structured interviews · Opportunity map
**Deliverables:** Optimization plan with 3 strategies · ROAS Dashboard (3 layers) · Pricing Report with 5 views · Contract register
**Tools:** Figma · Figma Make
