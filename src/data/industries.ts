export interface IndustryFaq {
  question: string;
  answer: string;
}

/** High-intent landing pages targeting non-branded searches. */
export interface Industry {
  slug: string;
  /** Search-intent H1 */
  h1: string;
  shortTitle: string;
  metaTitle: string;
  metaDescription: string;
  serviceType: string;
  icon: string;
  intro: string;
  painPoints: { title: string; text: string }[];
  approach: string;
  faqs: IndustryFaq[];
  relatedServiceSlugs: string[];
  relatedCaseStudySlugs: string[];
  relatedBlogSlugs: string[];
}

export const industries: Industry[] = [
  {
    slug: 'startup-mvp-development',
    h1: 'Startup MVP Development — From Idea to Working Product',
    shortTitle: 'Startup MVPs',
    metaTitle: 'Startup MVP Developer — Ship Your Product in Weeks',
    metaDescription:
      'Looking for a startup MVP developer? Pavan Sharma turns founder ideas into working products in 2–6 weeks: real auth, real data, AI features, and a stack investors respect. Fixed quotes, weekly demos.',
    serviceType: 'Startup MVP Development',
    icon: '🚀',
    intro:
      'You have the idea, the market insight, and maybe early users waiting. What you need is a working product — fast, without burning your runway on an agency or hitting the ceiling of no-code tools. I build startup MVPs end to end: one developer covering product scoping, AI features, backend, frontend, and deployment.',
    painPoints: [
      {
        title: 'Agencies quote months and inflate scope',
        text: 'A founder needs the one workflow that proves the idea — not a six-month platform build. I help you cut scope ruthlessly and ship the version that gets real user feedback.',
      },
      {
        title: 'No-code hits a wall exactly when investors look',
        text: 'Demo day questions about your tech stack shouldn\'t end the conversation. Your MVP is built on Next.js, Python FastAPI, and PostgreSQL — the same foundations serious companies scale on.',
      },
      {
        title: 'AI features feel out of reach',
        text: 'An AI assistant, smart document processing, or automation is often what makes an MVP feel like magic in a pitch. AI engineering is my specialty, not an add-on.',
      },
    ],
    approach:
      'We start with a scoping call to find the single workflow that proves your idea. You get a fixed quote and milestone plan, weekly demo links as the product takes shape, and at handover: a deployed product, full source-code ownership, and documentation your future team can build on. Most MVPs ship in 2–6 weeks.',
    faqs: [
      {
        question: 'How much does startup MVP development cost?',
        answer:
          'It depends on scope — a focused single-workflow MVP costs a fraction of a full platform. After a free scoping call you get a fixed quote, so there are no surprise invoices. Cutting scope to what actually proves the idea is where I save founders the most money.',
      },
      {
        question: 'How fast can my MVP be ready?',
        answer:
          'A focused MVP — one core workflow, authentication, and a clean UI — typically ships in 2 to 6 weeks. You see working software at weekly demos from the first week.',
      },
      {
        question: 'Can you add AI features to my startup MVP?',
        answer:
          'Yes — that is my core specialty. AI assistants, RAG-powered search, document processing, and workflow automation are the features that most often make an early product stand out to users and investors.',
      },
      {
        question: 'Will I own the code?',
        answer:
          'Completely. You receive the full source code, infrastructure access, and documentation. No lock-in, and I\'m happy to sign an NDA before you share your idea.',
      },
    ],
    relatedServiceSlugs: ['mvp-development', 'saas-development', 'full-stack-development'],
    relatedCaseStudySlugs: ['hireonix-ai-platform', 'cloudops-platform'],
    relatedBlogSlugs: ['building-a-saas-mvp', 'how-ai-agents-help-businesses'],
  },
  {
    slug: 'business-website-development',
    h1: 'Business Website Development — Fast, Modern, Found on Google',
    shortTitle: 'Business Websites',
    metaTitle: 'Business Website Developer — Custom Sites That Convert',
    metaDescription:
      'Need a business website developer? Pavan Sharma builds fast, SEO-optimized, mobile-responsive websites with Next.js — custom-designed, structured for Google and AI search, delivered in weeks.',
    serviceType: 'Business Website Development',
    icon: '🌐',
    intro:
      'Your website is the first employee most customers meet. If it loads slowly, looks like a template, or can\'t be found on Google, it costs you business every day. I build custom business websites with Next.js and Tailwind CSS — fast, mobile-first, and engineered so both search engines and AI assistants understand exactly what your business does.',
    painPoints: [
      {
        title: 'Template sites blend in and rank poorly',
        text: 'A custom-built site loads faster, matches your brand, and gives you full control over structure and SEO — advantages page builders can\'t match.',
      },
      {
        title: 'Visitors leave slow pages',
        text: 'Every page ships as pre-rendered static HTML with optimized assets, so your site scores well on Core Web Vitals — the speed metrics Google uses for ranking.',
      },
      {
        title: 'Invisible to AI search',
        text: 'Customers increasingly ask ChatGPT and Google AI for recommendations. I add the structured data, metadata, and content architecture that make your business legible to AI engines — the same techniques used on this site.',
      },
    ],
    approach:
      'We map your pages around what customers actually search for, then I build a custom design with semantic HTML, per-page metadata, structured data, and a sitemap — plus contact forms, analytics, and any integrations you need. You get a preview link early, and a simple content-update workflow at handover.',
    faqs: [
      {
        question: 'How long does a business website take to build?',
        answer:
          'A landing page takes about a week; a multi-page business website typically takes 2–4 weeks depending on content readiness and integrations. You review a live preview link throughout.',
      },
      {
        question: 'Will my website rank on Google?',
        answer:
          'Every site I build includes technical SEO as standard: semantic HTML, per-page metadata, JSON-LD structured data, sitemap, fast load times, and mobile-first layout — plus optimization for AI search engines like ChatGPT and Perplexity. Rankings also depend on your content and competition, and the technical foundation will never be the bottleneck.',
      },
      {
        question: 'Can you redesign or fix my existing website?',
        answer:
          'Yes. I can audit your current site for speed, SEO, and conversion issues, then either fix it in place or rebuild it on a modern stack while preserving what works.',
      },
      {
        question: 'Do you build web applications too, not just websites?',
        answer:
          'Yes — dashboards, customer portals, booking systems, and full web applications are part of my full stack development work with React, Next.js, and Python FastAPI.',
      },
    ],
    relatedServiceSlugs: ['web-development', 'full-stack-development', 'mvp-development'],
    relatedCaseStudySlugs: ['cloudops-platform', 'web-traffic-analyzer'],
    relatedBlogSlugs: ['choosing-a-website-developer'],
  },
  {
    slug: 'ai-automation-solutions',
    h1: 'AI Automation Solutions for Businesses — Stop Doing Repetitive Work',
    shortTitle: 'AI Automation',
    metaTitle: 'AI Automation Solutions — Automate Your Business Workflows',
    metaDescription:
      'AI automation solutions for businesses: automate document processing, lead handling, reporting, and internal workflows with custom AI systems built by Pavan Sharma. Practical, audited, and reliable.',
    serviceType: 'AI Automation Solutions',
    icon: '⚙️',
    intro:
      'Every business has work that eats hours but follows a pattern: reading emails, moving data between tools, processing documents, drafting the same reports. AI automation systems handle exactly this kind of work — and unlike old-school automation, they cope with messy, unstructured input. I design and build custom AI solutions that automate these workflows reliably.',
    painPoints: [
      {
        title: 'Your team\'s week disappears into copy-paste work',
        text: 'Data entry between CRM, spreadsheets, and email is judgment-light but time-heavy — the ideal target for automation systems that combine LLMs with workflow engines like n8n.',
      },
      {
        title: 'Traditional automation breaks on real-world input',
        text: 'Rule-based tools fail the moment an invoice, email, or form doesn\'t match the expected format. LLM-powered extraction and classification handle variation the way a person would.',
      },
      {
        title: 'Worried AI will make expensive mistakes',
        text: 'Every automation I build includes validation rules, confidence thresholds, human-approval gates for critical steps, and full run logging — so you can trust it and audit it.',
      },
    ],
    approach:
      'We start with a workflow audit: where the hours actually go. I identify the steps where AI adds judgment (classification, extraction, summarization, drafting) and wire them into pipelines with n8n or custom Python services, integrated with the tools you already use. Automations go live gradually — human-reviewed first, fully automatic once the accuracy is proven on your real data.',
    faqs: [
      {
        question: 'Which business processes should we automate first?',
        answer:
          'Start where volume is high and judgment is light: inbound email triage, document data extraction, report generation, lead qualification, and syncing data between systems. A short workflow audit usually surfaces two or three automations that pay for themselves within months.',
      },
      {
        question: 'Do we need to replace our existing software?',
        answer:
          'No. Automation systems work around your current tools — email, Google Sheets, Notion, CRMs, databases, and internal APIs — connected through n8n or lightweight custom services.',
      },
      {
        question: 'How do you prevent AI errors in automated workflows?',
        answer:
          'Critical steps get human-approval gates and validation rules; every run is logged; and I test against your real historical data before anything goes fully automatic. My background in LLM red teaming (Sentinel AI) means failure modes are engineered for, not discovered in production.',
      },
      {
        question: 'What does AI automation cost for a small company?',
        answer:
          'A single focused automation typically takes 1–3 weeks to build. After the workflow audit you get a fixed quote tied to a measurable outcome — hours saved per week — so ROI is visible from day one.',
      },
    ],
    relatedServiceSlugs: ['ai-automation', 'ai-agent-development', 'ai-chatbot-development'],
    relatedCaseStudySlugs: ['hireonix-ai-platform', 'sentinel-ai-llm-red-teaming'],
    relatedBlogSlugs: ['ai-automation-for-small-companies', 'how-ai-agents-help-businesses'],
  },
  {
    slug: 'saas-development',
    h1: 'SaaS Development for Founders — Build a Product Users Pay For',
    shortTitle: 'SaaS for Founders',
    metaTitle: 'SaaS MVP Developer — Build & Launch Your SaaS Product',
    metaDescription:
      'Hire a SaaS MVP developer to take your product from idea to paying customers: multi-tenant architecture, Stripe billing, dashboards, and AI features — built end to end by Pavan Sharma.',
    serviceType: 'SaaS Product Development',
    icon: '📦',
    intro:
      'A SaaS business lives or dies on shipping: getting a v1 in front of users, learning, and iterating faster than the market window closes. I build SaaS products end to end — multi-tenant data models, authentication, Stripe billing, admin dashboards, and the AI features that increasingly separate winning products from commodities.',
    painPoints: [
      {
        title: 'SaaS builds stall at the boring-but-critical parts',
        text: 'Auth edge cases, billing states, tenant isolation — the plumbing that kills timelines. I\'ve built these patterns before, so your budget goes to the features customers pay for.',
      },
      {
        title: 'Your differentiator is probably an AI feature',
        text: 'RAG-powered search over customer data, an in-product assistant, automated document handling — startup software development today usually wins on an AI capability competitors lack. That\'s my specialty.',
      },
      {
        title: 'Hiring a team is premature',
        text: 'Before product-market fit, one full stack developer who owns everything moves faster than a coordinated team — and hands over clean code when you do hire.',
      },
    ],
    approach:
      'We scope a focused v1: the one or two features worth paying for, on a proven stack (Next.js, TypeScript, Python FastAPI, PostgreSQL, Stripe, Docker/AWS). Weekly demos keep you steering. After launch, we iterate on real usage — and you own all code, infrastructure, and docs throughout.',
    faqs: [
      {
        question: 'What does it cost to build a SaaS MVP?',
        answer:
          'Scope drives cost: a focused single-feature SaaS is dramatically cheaper than a platform. After a discovery call you get a scoped v1 proposal with a fixed quote and a post-launch roadmap, so you can plan runway around real numbers.',
      },
      {
        question: 'Which stack do you use for SaaS development?',
        answer:
          'Next.js with TypeScript on the frontend, Python FastAPI on the backend, PostgreSQL for data, Stripe for subscriptions, Docker for packaging, and AWS for hosting — plus OpenAI API integration where AI features add value. Proven at scale, easy to hire for later.',
      },
      {
        question: 'Can you add AI features to an existing SaaS product?',
        answer:
          'Yes — AI assistants, RAG search over customer data, document processing, and workflow automation are the most common capabilities I add to products that already have users.',
      },
      {
        question: 'What happens after launch?',
        answer:
          'You own everything — code, infrastructure, documentation. Many founders keep me on for iteration sprints; others hand the codebase to their first hire. Both paths are supported by design.',
      },
    ],
    relatedServiceSlugs: ['saas-development', 'mvp-development', 'ai-agent-development'],
    relatedCaseStudySlugs: ['hireonix-ai-platform', 'finance-analytics-backend'],
    relatedBlogSlugs: ['building-a-saas-mvp', 'ai-agent-vs-chatbot'],
  },
];

export function getIndustry(slug: string): Industry | undefined {
  return industries.find((i) => i.slug === slug);
}
