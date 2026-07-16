## Context

### Building from scratch for children who can't read yet

Jovens Gênios is an EdTech that combines artificial intelligence and gamification to personalize each student's learning, adapting content and progression to individual pace, with more than 130 thousand active students and an average proficiency gain of 17.8% within a few months of use. Its product served 5th through 8th grade. There was nothing for early childhood literacy (1st and 2nd grade): no journey, no interaction model, no pedagogical rationale for that age group, and consequently no foundation for the AI to operate in that context.

Expanding into literacy meant entering a new market with a radically different child profile: one who can't read yet. Building that product from scratch was the challenge.

I led the project solo, from discovery to delivery of the interaction models, reporting findings and research results to the product team. The only outside involvement was a literacy specialist hired later to validate and refine the proposal.

---

## Discovery

### Domain immersion, benchmarking, and interviews with educators

**Domain immersion**

The first move was learning the domain. I studied the BNCC, Brazil's National Common Curricular Base, the federal document that defines the competencies and skills every child should develop at each stage of basic education in Brazil. For the product, it would work as the normative foundation determining what to teach, at which stage, and at what level of complexity. The BNCC itself already outlines the developmental stages of childhood literacy, what each one cognitively requires of the child, and how that progression is organized across school years.

**Benchmarking**

Before going into the field, I mapped digital literacy platforms as a reference, some of them later pointed out by the interviewees themselves:

Khan Academy Kids · Duolingo ABC · Netbil · IXL · Smartkids · GCompris

The analysis mapped how each platform worked with sound, visual support, and content progression. Khan Academy Kids and Duolingo ABC stood out for the quality of audio feedback and consistent visual support. IXL for the depth of its skill-based progression system. Netbil and Smartkids for being national references aligned with the Brazilian curriculum. What none of them offered at the same level was what JG already did in its product for more advanced grades: structured pedagogical progression with gamification and AI-based leveling. The benchmarking confirmed that this was the differentiator to preserve and deepen in the new product.

**Recruitment and interviews**

I reached out to teachers I knew from public and private school networks, who referred me to key people with direct experience in childhood literacy. I structured a semi-structured interview script and conducted sessions with teachers and pedagogical coordinators from both contexts, profiles with distinct realities both in pedagogical dynamics and in the environment children are part of.

The data was organized by clustering recurring themes. The patterns that emerged most strongly:

Family involvement is structural to the literacy process. Children with active support show better performance in reading and writing. The family is the first literacy environment, and everyday activities (labels, signs, stories at home) are part of the process, not a supplement.

Bringing content closer to the child's real context, such as familiar animals, everyday objects, songs, and nursery rhymes, increases engagement and makes it easier to associate writing with speech, especially in the early stages.

Visual support is a non-negotiable requirement at this age group: the child can't read yet, so the image carries the prompt.

The interviews also validated hypotheses observed in the benchmarking, especially the need for sound in every interaction.

**An insight that defined a product decision**

A pattern emerged clearly: children are in the process of learning to read, and the platform, as it stood, didn't treat that as a basic design criterion. At this age, the child typically does activities with an adult present, whether in the classroom with the teacher or at home with a parent or guardian. The goal was to bring as much autonomy to the child as possible within that context, simplifying their journey and reducing reliance on reading.

The product decision: **sound as a structural element** in every activity: instructions, prompts, and feedback available in audio, not as a secondary feature, but as a design requirement.

---

## Define

### Pedagogical architecture and coding system

With the findings consolidated, the central problem was clear: there was no structure connecting the child's developmental stage, the BNCC skill, and the interaction model. Without that rationale, the AI would have no foundation to operate on. It needed to know which stage the child was in and how to progress coherently to personalize each child's journey.

The decision was to build this architecture from scratch, as both the pedagogical and technical foundation of the product.

The proposal was presented internally to the product, pedagogy, and technology teams. Later, a literacy specialist hired by the company validated the direction and brought a critical refinement: literacy stages aren't fixed compartments — they're transitions. Each child has their own pace, and the process is continuous. That feedback led to the decision to structure the coding system around *transition* phases (Syllabic→Alphabetic, Alphabetic→Orthographic, Orthographic→Literate), not fixed stages, which made the system more faithful to pedagogical reality and more useful for the AI's leveling.

The specialist also bridged the work with the platform's content team, connecting the architecture to the existing question bank.

**The four phases and their dynamics**

Four phases structure the child's journey in the product, following the BNCC progression for 1st and 2nd grade of elementary school:

![Literacy phases mapped by school year — the pedagogical scope that defined the product.](../../images/cases/jovens-genios/alfabetizacao/jg-alfabetizacao-slide-progressao.png)

**Pre-syllabic** — the child understands that writing relates to speech, but doesn't yet fully distinguish letters from drawings. Dynamics: initial letter of words · isolated words in the context of stories and songs · memorizing, relating, completing, connecting · motor skills (drawing and letter shape) · phonetic-syllabic identification.

**Syllabic** — first associations between writing and speech. Dynamics: word formation with visual support and syllables · syllabic phonetics (consonant + vowel) · dictation linked to songs and nursery rhymes · word identification with visual support and multiple choice with real words.

**Alphabetic** — the child starts to understand that syllables have more than one letter. Dynamics: movable letters with omission · letter dictations · rhymes · tongue twisters · text copying · writing a letter, card, or post.

**Orthographic** — more fluent reading; the child finds growing pleasure in reading and writing. Dynamics: reading and interpreting narrative texts · dictation · writing rhymes · stop (word game).

<Carousel
  images={[
    { "src": "/images/cases/jovens-genios/alfabetizacao/jg-alfabetizacao-slide-pre-silabico.png", "alt": "Pre-syllabic phase — mapped activities and identified gaps" },
    { "src": "/images/cases/jovens-genios/alfabetizacao/jg-alfabetizacao-slide-silabico.png", "alt": "Syllabic phase — first associations between writing and speech" },
    { "src": "/images/cases/jovens-genios/alfabetizacao/jg-alfabetizacao-slide-alfabetico.png", "alt": "Alphabetic phase — the child starts to understand syllables have more than one letter" },
    { "src": "/images/cases/jovens-genios/alfabetizacao/jg-alfabetizacao-slide-ortografico.png", "alt": "Orthographic phase — more fluent reading" }
  ]}
  caption="Pre-syllabic, Syllabic, Alphabetic, and Orthographic — mapped activities and identified gaps per phase"
/>

**Coding system — Phase × Model**

To connect the pedagogical architecture to the product's technical structure and the AI system, I created a coding system based on transition phases, a shared operational language between design, pedagogy, and technology that makes it possible to name, classify, and track any activity on the platform along two axes: transition phase and question model.

Using transitions instead of fixed phases was a direct decision from the specialist's feedback: it more accurately reflects how the child progresses in practice and lets the AI adjust leveling gradually, without abrupt jumps between levels.

![Phase code — shared operational language between design, pedagogy, and technology.](../../images/cases/jovens-genios/alfabetizacao/jg-alfabetizacao-tabela-codigo-fases.png)

![Proficiency matrix — all BNCC skills organized by transition phase, the foundation for the AI system.](../../images/cases/jovens-genios/alfabetizacao/jg-alfabetizacao-matriz-proficiencia.png)

![Matrix-Models schema — each model coded so the AI knows which phase to apply it in.](../../images/cases/jovens-genios/alfabetizacao/jg-alfabetizacao-esquema-matriz-modelos.png)

---

## Develop

### Question models as systems of possibility

With the architecture defined and validated, the next step was to match this structure with the platform's existing technical foundation. The scoping decision was deliberate: fewer formats, with greater potential for application. Models with high pedagogical versatility that could cover multiple phases with interaction variations, instead of creating a specific model for each skill. This reduced technical complexity and maximized the MVP's pedagogical reach.

**The delivery logic per model**

Each model was delivered as a system of possibilities, not a single screen. Each model's documentation had three layers:

**Interaction variations** (axis of increasing complexity)
Variations evolved from the simplest to the most complex model within the same interaction pattern. In the Horizontal Ordering model: simple ordering (with correct and incorrect answer states), supported ordering (with letters and with words), and omission (simple, grapheme/number, and word).

**Usage possibilities by phase** (axis of alphabetic evolution)
The same model covered more than one transition phase, depending on which variation was applied and with what content. The Ordering model, for example, served three distinct transition phases.

**BNCC skills by phase**
For each phase a model served, the specific skills developed were mapped: knowing the order of the alphabet, relating a letter to its corresponding sound, identifying relationships between phonemes and graphemes, recognizing spaces between words, among others.

This structure turned each model into a complete pedagogical tool and gave the AI system the mapping it needed to personalize each child's progression with explicit grounding in the BNCC.

**Question models**

<Carousel
  images={[
    { "src": "/images/cases/jovens-genios/alfabetizacao/jg-alfabetizacao-modelo-ordenacao-horizontal.png", "alt": "Horizontal Ordering model — one model, three transition phases, multiple interaction variations" },
    { "src": "/images/cases/jovens-genios/alfabetizacao/jg-alfabetizacao-modelo-multipla-escolha.png", "alt": "Multiple Choice model — image and audio as design requirements, not accessories" },
    { "src": "/images/cases/jovens-genios/alfabetizacao/jg-alfabetizacao-modelo-correlacao-ordenacao-vertical.png", "alt": "Correlation / Vertical Ordering model — a variation that expands pedagogical reach without multiplying technical complexity" },
    { "src": "/images/cases/jovens-genios/alfabetizacao/jg-alfabetizacao-modelo-ditado.png", "alt": "Dictation model — listening and writing as the foundation for different phases of progression" },
    { "src": "/images/cases/jovens-genios/alfabetizacao/jg-alfabetizacao-modelo-producao-textual.png", "alt": "Text Production — structured writing as the final stage" },
    { "src": "/images/cases/jovens-genios/alfabetizacao/jg-alfabetizacao-modelo-motricidade.png", "alt": "Handwriting — tracing and coordination as the foundation of writing" },
    { "src": "/images/cases/jovens-genios/alfabetizacao/jg-alfabetizacao-modelo-abaco.png", "alt": "Abacus — decimal numbering with visual support" },
    { "src": "/images/cases/jovens-genios/alfabetizacao/jg-alfabetizacao-org-fases.png", "alt": "Activities by phase — distribution of question models across the pedagogical progression" }
  ]}
  caption="Ordering, Multiple Choice, Correlation, Dictation, Text Production, Handwriting, Abacus, and Activities by phase"
/>

---

## Results

### A pedagogical foundation that enables the AI

**Product built from scratch, with a foundation for the AI to operate in literacy** — the pedagogical architecture structured the rationale that lets the AI identify each child's transition phase, personalize content delivery, and progress through question models according to performance. Without this structure, the adaptive system would have no basis to operate in this context.

**A research-driven product decision with direct impact on the journey** — incorporating sound as a structural element, derived directly from the interviews, simplified the child's journey and expanded their autonomy of use in a context where reading isn't possible yet.

**A deliberate scope that maximized pedagogical coverage** — the decision to work with fewer, more versatile models allowed the MVP to cover multiple phases with interaction variations, without multiplying technical complexity.

**Architecture that evolved through expert validation** — feedback from the literacy specialist refined the model from fixed stages to transition phases, making the system more faithful to the reality of child development and more precise for the AI's leveling.

**A shared operational language across teams** — the coding system and the per-model delivery structure (variations × phases × BNCC) created a foundation the content and technology teams could use autonomously after delivery.

---

**Audiences served:** Children (4–8 years old, 1st and 2nd grade) · Teachers · Pedagogical coordinators · Private schools · Municipal governments (B2Gov)

**Process:** Domain immersion (BNCC) → Benchmarking → Recruitment and interviews → Clustering → Pedagogical architecture → Expert validation → Scope decision → Interaction models → MVP

**Deliverables:**
- Interview script
- Theme clustering
- Proficiency Matrix
- Phase × Model coding system
- Activity organization by phase
- Question models (variations + phases + BNCC)
- Contributions to the Design System

**Tools:** Figma · Qualitative field research · Documentary analysis (BNCC) · Competitive benchmarking
