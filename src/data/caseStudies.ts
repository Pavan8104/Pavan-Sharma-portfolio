export interface CaseStudy {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  /** Short card summary */
  summary: string;
  challenge: string;
  approach: string;
  outcome: string;
  techStack: string[];
  links: { label: string; url: string }[];
  relatedServiceSlugs: string[];
  relatedBlogSlugs: string[];
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'sentinel-ai-llm-red-teaming',
    title: 'Sentinel AI — LLM Red Teaming Framework for AI Safety',
    metaTitle: 'Case Study: Sentinel AI — LLM Red Teaming Framework',
    metaDescription:
      'How Pavan Sharma built Sentinel AI, a human-centric LLM red teaming framework that evaluates large language models through adversarial attacks, alignment checks, and safety mechanisms.',
    summary:
      'A human-centric AI safety system that stress-tests large language models with adversarial attacks, alignment checks, and safety mechanisms before they reach users.',
    challenge:
      'Most AI systems are tested for what they should do — almost none are systematically tested for what they should never do. Teams ship LLM features without knowing how they respond to prompt injection, jailbreaks, role-play exploits, or data-extraction attempts, and discover the failures in production.',
    approach:
      'I designed Sentinel AI as a structured red-teaming pipeline in Python: a library of attack strategies (prompt injection, jailbreak patterns, obfuscation, multi-turn manipulation), automated execution against target models, and scoring of responses for safety violations and alignment drift. The framework treats safety evaluation like software testing — repeatable suites instead of one-off manual poking.',
    outcome:
      'A reusable framework that surfaces concrete, reproducible failure cases in LLM systems before launch. The techniques behind it now inform every LLM feature I build for clients — guardrails, output validation, and adversarial pre-launch testing come standard.',
    techStack: ['Python', 'LLM APIs', 'Prompt Engineering', 'Adversarial Testing', 'AI Safety'],
    links: [{ label: 'GitHub Repository', url: 'https://github.com/Pavan8104/llm-red-teaming-framework' }],
    relatedServiceSlugs: ['llm-development', 'ai-agent-development', 'rag-development'],
    relatedBlogSlugs: ['llm-red-teaming-sentinel-ai'],
  },
  {
    slug: 'hireonix-ai-platform',
    title: 'HireOnix AI — AI Automation Platform',
    metaTitle: 'Case Study: HireOnix AI Platform — AI Automation in Production',
    metaDescription:
      'How Pavan Sharma contributed to HireOnix AI, a live AI web platform for intelligent automation, smart workflows, and AI-driven demos, as a Solution Architect and Software Engineer intern.',
    summary:
      'A live AI web platform showcasing intelligent automation, smart workflows, and AI-driven product demos — where I worked across architecture and engineering.',
    challenge:
      'Building an AI-first platform means solving two problems at once: the product itself (automation workflows users can trust) and the presentation layer that makes AI capabilities understandable to non-technical visitors.',
    approach:
      'Working with the HireOnix team as a Solution Architect intern and earlier as a Software Engineer intern, I analyzed platform data to derive product insights and contributed to the platform\'s architecture and engineering — structured problem-solving applied to a real, shipping AI product.',
    outcome:
      'A live platform at hireonixai.com demonstrating AI automation capabilities, and hands-on experience shipping AI features inside a team — the operating knowledge I now bring to client projects.',
    techStack: ['Python', 'AI Workflows', 'Data Analysis', 'Web Platform Engineering'],
    links: [{ label: 'Live Platform', url: 'https://hireonixai.com/' }],
    relatedServiceSlugs: ['ai-automation', 'saas-development', 'full-stack-development'],
    relatedBlogSlugs: ['agentic-ai-langgraph-n8n'],
  },
  {
    slug: 'cloudops-platform',
    title: 'CloudOps Platform — Deployment & DevOps Management',
    metaTitle: 'Case Study: CloudOps Platform — Docker & DevOps Workflows',
    metaDescription:
      'How Pavan Sharma built CloudOps, a cloud management platform for deployment, monitoring, and DevOps workflows with Docker and React.',
    summary:
      'A cloud management platform for deployment, monitoring, and DevOps workflows — full stack, containerized, and published as reusable Docker images.',
    challenge:
      'Deploying and monitoring applications involves scattered tools and manual steps. I wanted a single platform that turns deployment and DevOps workflows into a clear dashboard experience — and to build it the way production infrastructure tooling should be built.',
    approach:
      'I built the platform as a containerized full stack system: a React frontend dashboard and a backend service, both packaged as Docker images published to Docker Hub, deployable to any container host. The build exercised the full DevOps discipline: multi-stage Docker builds, environment configuration, and cloud deployment.',
    outcome:
      'A working cloud-management platform with public frontend and backend Docker images, demonstrating end-to-end ownership from UI to containerized infrastructure — the same skills I apply to client deployment and DevOps work.',
    techStack: ['React', 'Docker', 'DevOps', 'Cloud Deployment', 'CI/CD'],
    links: [
      { label: 'Frontend Docker Image', url: 'https://hub.docker.com/r/ps8104/cloudops-frontend' },
      { label: 'Backend Docker Image', url: 'https://hub.docker.com/r/ps8104/cloudops-backend' },
    ],
    relatedServiceSlugs: ['full-stack-development', 'saas-development', 'web-development'],
    relatedBlogSlugs: ['aws-solution-architect-real-lessons'],
  },
  {
    slug: 'web-traffic-analyzer',
    title: 'Web Traffic Analyzer — Data-Driven Behavior Insights',
    metaTitle: 'Case Study: Web Traffic Analyzer — Python Data Science',
    metaDescription:
      'How Pavan Sharma built a Python data application that analyzes user behavior and traffic trends to generate actionable insights.',
    summary:
      'A data-driven application that analyzes user behavior and traffic trends to generate insights — the full data science workflow from raw logs to visual answers.',
    challenge:
      'Raw traffic data is noisy and unreadable: timestamps, paths, and user agents in bulk. The value is in the questions it can answer — what do users actually do, where do they drop off, what\'s trending — and getting there requires a disciplined pipeline, not a one-off notebook.',
    approach:
      'I built the analyzer in Python using the end-to-end workflow I document in my writing: data cleaning and validation, exploratory analysis with Pandas, feature derivation (sessions, trends, segments), and clear visual reporting so non-technical stakeholders can read the results.',
    outcome:
      'A reusable analysis application that turns raw traffic data into behavior insights and trend reports — a template for the analytics and data-processing work I build into client dashboards and automations.',
    techStack: ['Python', 'Pandas', 'Data Analysis', 'Visualization', 'Streamlit'],
    links: [{ label: 'GitHub Repository', url: 'https://github.com/Pavan8104/web-traffic-analyzer' }],
    relatedServiceSlugs: ['ai-automation', 'full-stack-development'],
    relatedBlogSlugs: ['data-science-workflow-raw-data-to-deployed-model'],
  },
  {
    slug: 'finance-analytics-backend',
    title: 'Finance Analytics Backend — Python Data Processing System',
    metaTitle: 'Case Study: Finance Analytics Backend — Python & FastAPI',
    metaDescription:
      'How Pavan Sharma built a robust Python backend system for financial data analytics, forecasting, and processing.',
    summary:
      'A robust Python backend for financial data analytics, forecasting, and processing — engineered for correctness where the data actually matters.',
    challenge:
      'Financial data punishes sloppy engineering: missing values, edge cases, and silent calculation errors turn into wrong numbers people act on. A finance backend needs validated pipelines and predictable APIs, not notebook code moved to a server.',
    approach:
      'I built the system as a structured Python backend: typed data models, validation at ingestion, analytics and forecasting modules, and clean API endpoints for consumers. The design separates data processing from serving so each part can be tested and evolved independently.',
    outcome:
      'A dependable analytics backend demonstrating production backend discipline for data-heavy domains — the pattern I reuse for client systems where numbers must be right.',
    techStack: ['Python', 'FastAPI', 'Pandas', 'Data Engineering', 'Forecasting'],
    links: [{ label: 'GitHub Repository', url: 'https://github.com/Pavan8104/finance-analytics-backend' }],
    relatedServiceSlugs: ['full-stack-development', 'ai-automation', 'saas-development'],
    relatedBlogSlugs: ['data-science-workflow-raw-data-to-deployed-model'],
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}
