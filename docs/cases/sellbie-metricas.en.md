## Context

### Product growing without a metrics structure

The product was growing in features, and some things were already being tracked in Amplitude, but without any structure. The demand came from the team: we need our products to have metrics.

The starting point was this: no shared reference, no clear distinction between event, metric, and goal. I joined to facilitate building this together with product and data.

---

## Why HEART

### A framework that connects the technical event to the product question

Before proposing any structure, I needed a methodological foundation that made sense for the team's maturity level. The HEART framework, developed by Google, organizes metrics into five dimensions:

- **H**appiness: perceived user satisfaction
- **E**ngagement: depth and frequency of use
- **A**doption: whether new features are being discovered and used
- **R**etention: whether users keep coming back
- **T**ask Success: whether users can complete what they need to do

HEART's real differentiator isn't just the categorization — it's the chain of reasoning it demands: for each dimension, you define a **goal** (strategic intent), a **signal** (observable behavior), a **metric** (the number), and how to measure it. This forces the team to connect the technical event to the product question, something that didn't yet exist as a practice.

I adapted the framework by adding two columns: **Objective** (what we want to understand with this metric) and **How to set up** (how to instrument tracking in the tool).

---

## How we built it

### From the per-module framework to the action plan

First, I put together the master structure with the full framework and real examples for each dimension. This gave the team a common language before applying it to each module.

Then we took it into sessions: we worked module by module in FigJam, with product and data together. For each module, the team mapped which metrics made sense in that context, the objective of each one, and how they would be measured.

The constraint was real: it wasn't possible to map everything. Time was scarce, the team was small, instrumentation was partial. So the discussion also had to cover prioritization: what's essential to track now, given the maturity we have.

That filter was important to avoid creating an impossible backlog. We left each session with prioritized metrics, not a complete list that would never leave the page.

---

## What was built

### Master structure, modules, and instrumentation diagnosis

**HEART Framework: master structure**
Reference document detailing the five dimensions. For each dimension, two to three metrics with the full chain: goal → signal → metric → objective → how to measure → how to set up. It worked as the team's "dictionary" — the place anyone could go to find out what a metric means and how to configure it.

![Adapted HEART framework — each metric connected to a goal, a signal, and a product objective.](/images/cases/sellbie/metricas/sellbie-metricas-heart-estrutura-mae.png)

**Applications per module (×5)**
One instance of the structure for each module — ChatCRM, 360 Panel, Sales Performance, Campaigns & Journeys, and Email Report — with metrics and parameters specific to that context. Keeping the same visual structure across all modules was intentional: it makes comparison easier and reduces cognitive effort.

![Five modules with the same structure — easy comparison, reduced cognitive effort.](/images/cases/sellbie/metricas/sellbie-metricas-heart-modulos-lado-a-lado.png)

**Instrumentation diagnosis**
For the module furthest along in the discussion, each metric was evaluated as mapped or not mapped in Amplitude, with examples of what would need to be built to track it. This turned the structure into a technical action plan.

**Rollout plan: Phase 1, Adoption**
Prioritization artifact with the goal for the next phase, success criteria, user tasks that hadn't yet reached the goal, and how the team would follow up week by week. It ensured the structure didn't stay stuck in FigJam.

---

## Outcome

### Common vocabulary and a formal instrumentation backlog

**The team gained a common vocabulary:** prioritization meetings stopped mixing up signal, metric, and goal as if they were the same thing.

**Instrumentation moved out of the informal backlog:** each module had a clear diagnosis of what was and wasn't being tracked, along with what needed to be done to instrument it.

**Product with measurable direction:** adoption, engagement, and drop-off now have a clear place to be tracked.

---

**Audiences served:** Product Team · Data Team
**Process:** Diagnosis → Framework structuring → Facilitation per module → Prioritization → Action plan
**Deliverables:** Adapted HEART Framework · Applications per module (×5) · Instrumentation diagnosis · Rollout plan
**Tools:** FigJam · Amplitude
