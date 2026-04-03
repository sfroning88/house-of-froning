# tech-research

Use this skill whenever the user wants to research an employer (investment firm, tech company, or startup) and assess technical fit for a role or opportunity. Triggers include mentions of a company name plus job opportunity, recruiter outreach, job descriptions, networking context, or any request to analyze fit between the user's engineering/technical background and a prospective employer. Also triggers for phrases like "research this firm for me", "how do I stack up against this JD", "what do I need to know before interviewing at X", "assess my fit for this role", "help me prep for this company", or any combination of firm name plus role context. Always use this skill before responding with company/role research. Do NOT skip this skill for firm research even if the request seems simple.

## Tech Research Skill

Produces a ~2000-word black-and-white printable PDF analyzing employer technical fit for the user. The output links the employer's actual technical stack, business model, and engineering practices to the user's documented background and current Rowan platform context — surfacing stack overlaps, honest gaps, learning priorities, and ATS keywords.

---

## Career Identity (Read This First — It Shapes Every Judgment Call)

Sean is building toward the archetypal **Founding Engineer / Full Stack AI Polymath**: the single person on a lean team who can own the entire solution — frontend, backend, agents, data infrastructure, financial modeling, and go-to-market technical work — without needing a specialist for each layer. The mental model is Leonardo da Vinci, not a narrowly optimized senior engineer: breadth enables innovation that depth alone cannot.

This identity has direct implications for how to frame gaps and learning priorities:

- A gap in a **foundational full-stack AI capability** (MLOps, distributed training, vector DB alternatives, cloud-native infra, LangChain, data pipeline orchestration) is **high-priority** regardless of whether this specific employer requires it. These are polymath table stakes.
- A gap in a **niche enterprise tool** (specific SaaS integration, legacy stack, compliance framework) is **lower priority** — learnable on the job, not worth frontloading.
- When assessing learnability, ask: _does closing this gap make Sean more capable across many future roles, or just this one?_ Prioritize the former.
- The target employers are **lean startups and investment firms applying full-stack AI to real problems** — not FAANG, not large enterprise. Optimize framing for that context.

Full-stack AI polymath domains (from the article "Full Stack AI Engineer: A Modern Day Polymath"):

1. AI Data Infrastructure: Modern Datalakes (Apache Iceberg, Hudi, Delta Lake), object storage, Open Table Formats, schema evolution, time travel / snapshots.
2. MLOps: experiment tracking, model versioning, packaging + deployment pipelines. Key tools: MLflow (Databricks), Kubeflow (Google), MLRun.
3. Distributed Training: multi-node/multi-GPU training. Key frameworks: Ray / Anyscale, TorchDistributor on Spark, spark-tensorflow-distributor.
4. Vector Databases: Pinecone, Milvus, Weaviate — beyond pgvector for production-scale RAG.
5. Traditional AI: supervised, unsupervised, reinforcement learning — scikit-learn for fast prototyping; PyTorch / TensorFlow for production neural networks.
6. Generative AI & LLM orchestration: RAG pipelines, fine-tuning, LangChain, HuggingFace.
7. Full-stack software: frontend (React/Next.js), backend (FastAPI/Express), databases, auth, background jobs, deployment — end-to-end ownership without handoffs.

Cross-reference this domain list against every gap identified in the research. If a gap falls inside one of these seven domains, flag it as a **polymath priority gap**, not just a job-fit gap.

---

## Step 0: Read Project Context First

**Before doing anything else**, extract the user's full background from the documents already in context. Do NOT rely on memory or prior session knowledge. Re-read every time — documents may have changed.

**Resume (Froning_Sean_Resume.md):**

```markdown
Sean Froning — Full Stack AI Engineer @ Rowan (Jul 2025–Present), Chicago IL

- 25+ SMB owners, fractional CFOs, PE buyers; production agent $1M/month value
- Automated AR/receivables workflows (-8 hrs/week manual collection effort)
- Stack: Next.js, TypeScript/React, FastAPI/Python, Postgres/Supabase, Redis
- Agent workflows: embedding + reranking pipelines, pgvector vector DB integration
- Supported 3 lower-middle-market M&A transactions up to $50M EV

Data Engineer @ ND University Relations (Jan 2022–May 2025), Notre Dame IN

- Alumni engagement strategy: $5M+ donations, 10+ countries
- 5+ strategy presentations → $300K additional funding
- Tableau + PowerBI dashboards; 10% engagement rate improvement
- Python app: 130+ students, Google Sheets API, 100+ daily transactions
- Automated 5 legacy processes (Excel); -14 hrs/week manual work

Healthcare Investment Analyst @ Focus Healthcare Partners LLC (May–Aug 2024), Chicago IL

- 15+ acquisitions evaluated via 3-statement LBOs; $1B+ deal pipeline
- Built LLM RAG model (LlamaIndex, CrewAI, GPT-4o): 10K+ data points, expense forecasting
- 20+ senior housing targets; $300M+ investment opportunities identified
- Asset management: 4 portfolio companies ($250M), 12% EBITDA improvement
- $350M fund, 10+ client calls, high LP retention

Energy Systems Analyst @ South Bend Dept of Energy (Aug 2023–May 2024), South Bend IN

- Energy audit: $28–$40K annual savings identified
- $520K solar investment plan, 12-year ROI analysis
- Financial models across multiple energy systems; cross-functional student team
- 38–55% energy consumption savings recommendation

Projects:

- Financial Health Chatbot: Flask API, HTML/CSS/JS, pandas/regex pipeline, AP/AR/NWC analysis, dual-model architecture, financial time-series visualization
- AI Pokemon Team Builder: BeautifulSoup scraping (3000+ datasets, 1GB+), LlamaIndex + CrewAI, GPT-4o-Mini RAG, Google Drive automation, embedding tuning

Skills:

- Languages: Python, Next.js, TypeScript, C/C++, PostgreSQL/Supabase, Prisma ORM, HTML/CSS
- Data/Viz: Tableau, PowerBI, MatLab
- Hardware: LinuxOS, RISC-V, Verilog, DSLX Dataflow, Cadence Virtuoso
- AI/ML: RAG, LLMs, TensorFlow, CrewAI, LlamaIndex, OpenAI API, PyTorch
- Finance: LBOs, DCFs, Due Diligence, SaaS Valuation, Excel/Office

Education: BS Computer Engineering, University of Notre Dame (May 2025)

- Minors: Engineering Finance & Strategy, Accounting
- GPA: 3.87 / 4.00 | Cum Laude | Dean's List 5x
```

---

## Rowan Platform Stack Context

Sean currently builds on this monorepo. Use this to assess "familiar" vs "unfamiliar" when evaluating employer stacks. Tech Sean uses daily at Rowan is a strong signal; tech absent from this architecture represents a genuine gap.

```markdown
rowan-platform/ (Turborepo + pnpm workspaces)
├── apps/
│ ├── receivables/ ← Next.js (TypeScript + React). Vercel.
│ │ receivables.trustrowan.com — AR/receivables dashboard, agent UI,
│ │ QuickBooks Online flows, server actions + Prisma.
│ │ Uses @rowan/auth + @rowan/iam for auth and org management.
│ ├── ready/ ← Next.js (TypeScript + React). Vercel.
│ │ ready.trustrowan.com — sale-readiness / prep product.
│ │ Org-scoped via [orgSlug] routing. Uses @rowan/auth + @rowan/iam.
│ ├── receivables-worker/ ← FastAPI (Python). Render.
│ │ Long-running API + workers: AR/AI agents, QBO sync, document
│ │ processing, Redis/RQ job queues.
│ │ DB via raw SQL (psycopg2 pool), NOT Prisma.
│ │ Shared code from packages/python (rowan_workers).
│ ├── ready-worker/ ← FastAPI (Python). Render.
│ │ Background worker for Ready product. Same rowan_workers stack
│ │ as receivables-worker (psycopg2, Redis/RQ).
│ ├── platform-express/ ← Express (Node.js + TypeScript). Render.
│ │ Integrations, cron-style work, Gmail-adjacent HTTP surface.
│ ├── collect-tool/ ← Next.js. Vercel. Embedded into trustrowan.com.
│ │ Redis-backed rate limiting. No auth.
│ ├── buyer-search-tool/ ← Next.js. Vercel. Embeddable (IframeHeightNotifier).
│ │ Uses @rowan/db (Prisma). Leaflet maps. No auth.
│ └── valuation-tool/ ← Next.js. Vercel. Embeddable (IframeHeightNotifier).
│ Uses @rowan/db (Prisma). No Redis. No auth.
├── packages/
│ ├── auth/ ← @rowan/auth — Shared Supabase Auth: SSO (Google, Azure/Outlook),
│ │ login/signup components, auth hooks, session guards, action guards,
│ │ route handlers. Three subpath exports:
│ │ @rowan/auth (client), @rowan/auth/server (guards, handlers),
│ │ @rowan/auth/middleware (Edge-safe updateSession).
│ ├── iam/ ← @rowan/iam — Shared IAM: OrgProvider, AuthProvider, UserProvider,
│ │ AppProvider, OrgSwitcher, UserMenu, org/user/profile components,
│ │ TanStack Query hooks, server actions, routes.
│ │ Two subpath exports: @rowan/iam (UI), @rowan/iam/server (actions).
│ ├── db/ ← Prisma: schema/\*.prisma, migrations, @rowan/db client
│ ├── config/ ← @rowan/config (env + shared settings)
│ ├── config-js/ ← @rowan/config-js
│ ├── types/ ← @rowan/types
│ ├── ui/ ← @rowan/ui
│ ├── utils/ ← @rowan/utils
│ ├── services/ ← @rowan/services
│ ├── analytics/ ← @rowan/analytics
│ ├── tsconfig/ ← Shared TypeScript bases
│ └── python/ ← Shared Python package used by workers (rowan_workers)

Infrastructure:

- DB: PostgreSQL (Supabase-hosted). Prisma (TS apps) vs psycopg2 raw SQL (Python workers).
- Auth: Supabase Auth via shared @rowan/auth package. SSO with Google and Azure/Outlook
  via Supabase OAuth. Auth is not app-local — receivables and ready both import from the
  shared package. Tool apps (collect-tool, buyer-search-tool, valuation-tool): no auth.
- IAM: Shared @rowan/iam package for org/user/profile management (providers, components,
  hooks, server actions). Apps extend with app-specific routes.
- Background jobs: Redis + RQ (Python workers); Redis rate limiting (collect-tool).
- Env: root .env files, pnpm use:[local|dev|prod] scripts.
- Deployments: Vercel (Next.js apps), Render (FastAPI + Express always-on services).
- Key integrations: QuickBooks Online, ElevenLabs, PostHog, Gmail (platform-express).
- AI surface: receivables-worker (FastAPI/Python) is primary agent/LLM execution layer. pgvector for vector storage, embedding + reranking pipelines.

Tech Sean uses daily (STRONG signal):
Next.js, TypeScript, React, FastAPI, Python, PostgreSQL, Supabase, Prisma ORM, Redis, RQ, pgvector, LlamaIndex, CrewAI, OpenAI API, TanStack Query, Turborepo, pnpm, Vercel, Render, QuickBooks Online integration, Tableau, PowerBI, LBOs/financial modeling.

Tech NOT present in current stack (potential gaps vs employer requirements):
Kubernetes / container orchestration, AWS/GCP/Azure (native cloud), Kafka/Celery/Airflow, dbt/Snowflake/BigQuery, LangChain, Pinecone/Weaviate/Qdrant, Terraform/IaC, GraphQL, Django/Flask (Flask used in older project, not current), Spark/Databricks, Java/Go/Rust.
```

---

## Step 1: Gather Opportunity Context

The user must provide at minimum: **firm/company name**. Additionally collect (ask if not provided):

- Recruiter message, LinkedIn DM, or networking note (copy/paste)
- Job description or role blurb
- Role title and level (if known)
- Any specific technologies or tools mentioned

If only the company name is given, ask: _"Can you share the job description, recruiter message, or role blurb? Even a few sentences helps target the analysis."_

If nothing beyond company name is available, proceed with research but note the analysis is based on inferred role context.

---

## Step 2: Web Research (REQUIRED — Do Not Skip)

Use `web_search` to gather **fresh, cited sources only**. Do not rely on training knowledge. Cite a **minimum of 6 sources** inline.

Research targets:

### Business & Model

- Primary business model (AUM, product, revenue model, fund strategy, SaaS, marketplace, etc.)
- Recent transactions, fundraising rounds, press releases, or notable news (last 12–24 months)
- Key clients, verticals, or market positioning

### Technical Stack & Engineering

- GitHub org or repos (search `github.com/<firm>` or `site:github.com <firm>`)
- Job postings (especially eng/data/infra roles) — these reveal stack, tools, and infra preferences
- Engineering blog, tech blog, or Medium/Substack posts from their team
- Open source contributions or libraries published
- API documentation, developer portals, or product technical docs
- LinkedIn tech employee profiles for stack signals (tools, certifications, keywords)

### AI/ML & Data Pipelines

- Any public LLM, AI, or ML tooling mentioned (OpenAI, Anthropic, LangChain, vector DBs, etc.)
- Data warehouse or pipeline tools (Snowflake, dbt, Airflow, Spark, Kafka, etc.)
- Integrations or partner tech (Salesforce, Plaid, Bloomberg, etc.)

### Industry Context

- Key regulatory, compliance, or domain-specific technical knowledge relevant to their industry
- Competitors and how technical differentiation shows up in their positioning

---

## Step 3: Clarifying Questions (After Research, Before Writing)

After completing research, if there are specific technologies or integrations discovered that are material to fit assessment, ask the user targeted questions such as:

- _"Their stack appears to include [X]. Are you familiar with this? Used it in production?"_
- _"The role mentions [Y]. Can you tell me more about your experience there?"_
- _"I see [Z] in their infrastructure. Do you want this framed as a gap or a learning opportunity?"_

Limit to 2–4 targeted questions. Skip if context from the resume/JD is already sufficient.

---

## Step 4: Generate PDF Report (~2000 words body prose)

Use `reportlab` to produce a **black-and-white, printable PDF**. Follow the structure below exactly.

### PDF Design Constraints

- **No color.** All text, borders, backgrounds: black, white, or grayscale only.
- **No emoji.** Replace all emoji with text equivalents: `[+]`, `[-]`, `[!]`.
- **No Unicode subscripts/superscripts.** Use ReportLab `<sub>`/`<super>` tags only.
- **Font stack:** Helvetica (headings/labels) + Times-Roman (body prose). Built-in only — no external fonts.
- **Page size:** Letter (8.5" x 11"). Margins: 0.85" all sides.
- **No tables — ever.** Tables render inconsistently and are banned from the final PDF. Always use indented bullet lists with the `•` character and `--` separators instead.

Example format:

```markdown
Specific services to learn:
• Service X -- which does thing Y
• Service W -- which does thing Z
```

Apply this pattern to every list in the report: stack alignment, gap analysis, ATS keywords, priority rankings, and sources.

- **Page numbers:** Bottom center, format `Page N`.
- **Running header:** Firm name + "| Technical Fit Report" on all pages after page 1.

### ReportLab Implementation Pattern

```python
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer,
    HRFlowable, PageBreak
)
import datetime

PAGE_W, PAGE_H = letter
MARGIN = 0.85 * inch

def on_later_pages(canvas, doc):
    canvas.saveState()
    canvas.setFont("Helvetica", 8)
    canvas.drawString(MARGIN, PAGE_H - 0.55 * inch,
                      f"{firm_name}  |  Technical Fit Report")
    canvas.line(MARGIN, PAGE_H - 0.60 * inch, PAGE_W - MARGIN, PAGE_H - 0.60 * inch)
    canvas.drawCentredString(PAGE_W / 2, 0.55 * inch, f"Page {doc.page}")
    canvas.restoreState()

def on_first_page(canvas, doc):
    canvas.saveState()
    canvas.drawCentredString(PAGE_W / 2, 0.55 * inch, "Page 1")
    canvas.restoreState()

doc = SimpleDocTemplate(
    output_path,
    pagesize=letter,
    leftMargin=MARGIN, rightMargin=MARGIN,
    topMargin=MARGIN, bottomMargin=0.85 * inch,
    title=f"{firm_name} — Technical Fit Report"
)

H1 = ParagraphStyle("H1", fontName="Helvetica-Bold", fontSize=13,
                    spaceAfter=6, spaceBefore=14)
H2 = ParagraphStyle("H2", fontName="Helvetica-Bold", fontSize=10.5,
                    spaceAfter=4, spaceBefore=10)
BODY = ParagraphStyle("BODY", fontName="Times-Roman", fontSize=10,
                      spaceAfter=6, leading=14, alignment=4)   # 4 = JUSTIFY
MONO = ParagraphStyle("MONO", fontName="Courier", fontSize=8.5, spaceAfter=4)
CITE = ParagraphStyle("CITE", fontName="Times-Roman", fontSize=8.5,
                      spaceAfter=3, leftIndent=12)
LABEL = ParagraphStyle("LABEL", fontName="Helvetica-Bold", fontSize=9,
                       spaceAfter=2, spaceBefore=6)
ITEM = ParagraphStyle("ITEM", fontName="Times-Roman", fontSize=9,
                      spaceAfter=4, leftIndent=18)
```

---

### Report Section Structure (~2000 words body prose)

**1. Cover Block:**

- Firm name (large, bold), subtitle "Technical Fit Report", role title (if known), date generated.

**2. Firm Overview** (200–250 words)

- Business model, fund/product type, AUM or scale, key verticals.
- Recent notable transactions, fundraising, or press (cited).
- Market positioning and competitive context.
- Why this firm would be interesting to a founder-minded AI engineer.

**3. Technical Stack & Engineering Practices** (400–500 words)

- Inferred or confirmed stack: languages, frameworks, databases, cloud/infra, AI/ML tooling, data pipelines, third-party integrations.
- Development culture signals: open source activity, engineering blog cadence, team size, PR velocity, documentation quality.
- **Stack Overlap Analysis**: Explicitly compare their stack against Sean's Rowan platform stack. Call out each technology by name — do not summarize vaguely. For every major technology in their stack, state whether it is "Daily use @ Rowan", "Prior project/experience", "Adjacent (transferable concept)", or "Gap (not in current stack)".
- **Stack Alignment List**: Render as a bullet list using the `•` character — never a table. Include every major technology found (languages, frameworks, infra, AI/ML tools, data tools, cloud providers, integrations). Aim for 8–12 entries minimum. Format each entry as:

  ```markdown
  • Next.js -- Daily use @ Rowan
  • Kubernetes -- Gap (not in current stack)
  • Flask -- Prior project (Financial Health Chatbot)
  • LangChain -- Adjacent (transferable from LlamaIndex/CrewAI)
  ```

- Cite GitHub, job postings, blog posts, and docs inline as [N].

**4. Gap Analysis & Learning Roadmap** (400–500 words)

This section exists to help Sean make an honest self-assessment and decide what to learn. Write it as a senior engineer advising a junior — direct, specific, no sugarcoating.

- **Confirmed Gaps**: Technologies in their stack with "Gap" signal — not present at Rowan, not used in prior projects. For each gap:
  - Name the technology and what it does in their context.
  - Explain why it exists in their stack (what problem it solves, why experienced teams use it).
  - Flag whether this gap falls inside one of the seven polymath domains (see Career Identity section). If yes, label it **[Polymath Priority]** — relevant beyond this role alone.
  - Assess learnability: weekend project, month of study, or fundamental paradigm shift?
  - Suggest the most direct path to close the gap (specific docs, project idea, or course).
- **Adjacent Gaps**: Technologies where Sean has conceptual exposure but lacks production depth. Distinguish "I understand the concept" from "I've shipped this to production."
- **Structural Gaps**: Domain knowledge, seniority expectations, or non-technical requirements (certifications, compliance, clearances) that are harder to close quickly.
- **Priority Order**: End with a ranked list of which gaps matter most, ordered by: (1) whether it is a polymath domain gap (always rank higher), (2) likelihood the gap surfaces in interview, (3) ease of closing before outreach, (4) strategic value across future roles beyond this one.

**5. ATS & Keyword Strategy** (150–200 words)

- Extract high-signal keywords from the JD or inferred role context.
- Render as a bullet list using the `•` character — never a table. Format each entry as:

  ```markdown
  • Kubernetes -- Add to resume (learnable via Rowan infra migration)
  • RAG pipelines -- In resume (production use @ Rowan)
  • dbt -- Add to cover letter / outreach
  ```

- Note certifications, tools, or credentials worth highlighting or acquiring.

**6. Sources:**

- Numbered list of all cited URLs with brief description.
- Minimum 6 sources. Format: `[N] URL — description`.

---

## Step 5: PDF Generation Notes

- Save to `/mnt/user-data/outputs/tech_research_<firmname>.pdf`
- Present with `present_files` after generation.
- Install if needed: `pip install reportlab --break-system-packages`

---

## Output Requirements

- File: `/mnt/user-data/outputs/tech_research_<firmname>.pdf`
- Present via `present_files`
- Black and white only — no color, no shading, no images
- Fonts: Helvetica (headings) + Times-Roman (body). Built-in ReportLab only.
- Body prose: ~2000 words
- Printable on US Letter, 0.85-inch margins
- Page numbers on every page; running header on pages 2+
- All sources numbered and cited inline as [N]

---

## Quality Checklist (Before Outputting)

- [ ] Output is a `.pdf` file presented via `present_files`
- [ ] No color — strictly B&W/grayscale
- [ ] No emoji — replaced with `[+]` / `[-]` / `[!]`
- [ ] No external fonts — Helvetica + Times-Roman only
- [ ] Page numbers present on every page
- [ ] Running header on pages 2+
- [ ] At least 6 citations with full URLs in Sources
- [ ] Stack alignment list present in Section 3 (8–12 entries minimum)
- [ ] Gap Analysis section present with per-technology learnability assessment
- [ ] Priority-ordered gap list present at end of Section 4
- [ ] ATS keyword list present in Section 5
- [ ] Rowan platform stack explicitly referenced in stack comparison
- [ ] "Daily use @ Rowan" vs "Gap" signals called out by name
- [ ] Zero tables in the entire PDF — all lists use `•` bullet points with `--` separators
- [ ] Body prose is approximately 2000 words

---

## Error Handling

- No GitHub/engineering sources: note explicitly in Section 3 and rely on job postings + news.
- No JD provided: flag ATS section as "inferred from role/firm context", ask after first draft.
- Very small/obscure firm: use LinkedIn employee profiles, Crunchbase, and press as primaries.
- Always produce the PDF even if research is incomplete — note gaps explicitly in the document.
