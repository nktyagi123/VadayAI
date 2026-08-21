/* ==========================================================================
   VadayAI Solutions — Editable Content Data
   Edit copy for the FAQ accordion, testimonial carousel and stats band here.
   Rendered into the page by main.js. Keep arrays valid JavaScript.
   ========================================================================== */

/* --------------------------- Stats counter band -------------------------- */
/* REPLACE WITH REAL VERIFIED NUMBERS BEFORE LAUNCH. "value" must be a plain
   integer; "suffix" (e.g. "+", "%") is appended after the count animates. */
const STATS_DATA = [
  { value: 40, suffix: "+", label: "Projects Delivered" },
  { value: 18, suffix: "+", label: "AI Engineers on Team" },
  { value: 25, suffix: "+", label: "Clients Served" },
  { value: 120, suffix: "+", label: "Workflows Automated" },
  { value: 92, suffix: "%", label: "Client Retention Rate" },
  { value: 6, suffix: "", label: "Countries Served" }
];

/* --------------------------------- FAQ data -------------------------------- */
const FAQ_DATA = [
  {
    q: "How quickly can we start?",
    a: "Most engagements kick off within one to two weeks of a signed scope. For a focused proof of concept, we can often begin discovery within days. We'll give you a concrete start date on our first call, not a vague estimate."
  },
  {
    q: "Do you work with our existing systems?",
    a: "Yes. We design around the tools you already run — your CRM, EHR, ERP, data warehouse or ticketing system — rather than asking you to replace them. Integration compatibility is one of the first things we assess in discovery."
  },
  {
    q: "How do you handle data privacy and patient data?",
    a: "We build with a HIPAA-conscious architecture from day one: encryption in transit and at rest, role-based access, audit logging and data residency options. We are careful to describe our practices accurately and do not claim a certification or audit the company has not completed."
  },
  {
    q: "Do we own the code and the models?",
    a: "Yes. Unless you choose an ongoing managed-support arrangement, you own the code, the fine-tuned models and the data produced during the engagement. There's no vendor lock-in by design."
  },
  {
    q: "What does a typical engagement cost?",
    a: "It depends on scope — a focused automation pilot and a multi-team agentic platform are very different builds. We favor fixed-scope pilots so you see working software and a clear cost before committing to a larger budget. Ask us for a range on your first call."
  },
  {
    q: "Can you work with our in-house dev team?",
    a: "Absolutely — we regularly work alongside internal engineering teams, either leading a workstream or embedding as staff augmentation. We document everything and hand off cleanly so your team can maintain what we build."
  },
  {
    q: "Which cloud platforms do you support?",
    a: "We build and operate on AWS, Azure and Google Cloud, and we'll recommend whichever fits your existing environment, compliance needs and budget rather than pushing a single preferred vendor."
  },
  {
    q: "What happens after launch?",
    a: "Every build ships with documentation and a handover session. From there you can maintain it in-house, or move to one of our managed-support plans for monitoring, model updates and iteration. Either way, the system is fully yours to run."
  }
];

/* ----------------------------- Testimonial data ---------------------------- */
/* PLACEHOLDER TESTIMONIALS: replace with real, permissioned client quotes
   before launch. Do not publish invented testimonials. */
const TESTIMONIALS_DATA = [
  {
    quote: "The documentation assistant they built has genuinely given our physicians time back at the end of the day. The rollout was careful and the team listened to how our clinic actually works.",
    name: "Client Name",
    role: "Clinic Director, Multi-specialty Practice",
    initials: "CD"
  },
  {
    quote: "We went from a messy, manual intake process to an automated pipeline in a few weeks. VadayAI's team was direct about what would and wouldn't work, which we appreciated.",
    name: "Client Name",
    role: "Operations Lead, Professional Services Firm",
    initials: "OL"
  },
  {
    quote: "Their agentic workflow now handles a category of support tickets end to end, with a human checkpoint before anything customer-facing goes out. Exactly the balance we wanted.",
    name: "Client Name",
    role: "Head of Support, SaaS Company",
    initials: "HS"
  }
];

/* --------------------------- Services (card grid) --------------------------- */
const SERVICES_CARDS_DATA = [
  {
    title: "AI Development",
    desc: "Custom model integration, fine-tuning and application development built around your data. We take AI from prototype to a system your team relies on daily.",
    href: "services.html#development",
    icon: "code"
  },
  {
    title: "AI Integration",
    desc: "We connect AI capabilities into the tools you already use — CRM, support desk, ERP — so new intelligence shows up inside existing workflows, not a separate app nobody opens.",
    href: "services.html#integration",
    icon: "link"
  },
  {
    title: "Data Engineering & RAG",
    desc: "Clean pipelines and retrieval-augmented architectures that ground AI output in your actual documents and data, cutting down hallucination and keeping answers current.",
    href: "services.html#data",
    icon: "database"
  },
  {
    title: "Managed AI Support",
    desc: "Ongoing monitoring, model updates and tuning after launch, so performance doesn't quietly drift as your data and usage patterns change.",
    href: "services.html#support",
    icon: "shield"
  },
  {
    title: "Cloud & DevOps",
    desc: "Secure, scalable infrastructure on AWS, Azure or GCP with CI/CD pipelines and cost governance built in, so your AI workloads run reliably without surprise bills.",
    href: "services.html#cloud",
    icon: "cloud"
  },
  {
    title: "Staff Augmentation",
    desc: "Senior AI engineers embedded directly in your team for the duration of a project, working in your tools and your process — not a black-box outsourced team.",
    href: "services.html#staffing",
    icon: "users"
  }
];
