import type { Metadata } from 'next';
import Link from 'next/link';
import PageShell from '../../src/components/pages/PageShell';
import { services } from '../../src/data/services';
import { buildMetadata, PERSON } from '../../src/lib/seo';
import { JsonLd, faqSchema, organizationSchema } from '../../src/lib/schema';

export const metadata: Metadata = buildMetadata({
  title: 'Hire Me — AI Agent Developer & Full Stack Engineer for Your Project',
  description:
    'Hire Pavan Sharma, an AI Agent Developer and Full Stack Engineer, for your next project: AI agents, automation, chatbots, RAG systems, SaaS, MVPs, and web applications. Remote-friendly for the USA, UK, Canada, Australia, Europe, and UAE.',
  path: '/hire-me',
});

const PROCESS = [
  {
    step: '01',
    title: 'Discovery Call',
    text: 'A free call (or async brief) where you describe the problem. I ask the questions that surface hidden scope early.',
  },
  {
    step: '02',
    title: 'Plan & Quote',
    text: 'You get a concrete proposal: scope, milestones, timeline, and a fixed quote. No vague estimates.',
  },
  {
    step: '03',
    title: 'Build in the Open',
    text: 'Weekly demos and a shared progress channel. You see working software early and steer while it’s cheap to change.',
  },
  {
    step: '04',
    title: 'Launch & Handover',
    text: 'Deployment, documentation, and full source-code ownership. Optional ongoing support after launch.',
  },
];

const REASONS = [
  {
    title: 'AI depth, not AI hype',
    text: 'I develop AI agents professionally at micro1 and built Sentinel AI, an LLM red-teaming framework. I know where LLMs fail — so what I ship for you doesn’t.',
  },
  {
    title: 'Full stack ownership',
    text: 'One engineer for frontend (React/Next.js), backend (Python/FastAPI), data (PostgreSQL/MongoDB), and deployment (Docker/AWS — Solution Architect certified).',
  },
  {
    title: 'Global remote experience',
    text: 'Remote collaboration with clear written communication, overlap-friendly scheduling, and async updates for clients in any timezone.',
  },
  {
    title: 'Engineering discipline',
    text: 'Published ML researcher (MMCITRE 2024), competitive programmer, and a portfolio of shipped, inspectable projects — not just claims.',
  },
];

const HIRE_FAQS = [
  {
    question: 'What kind of projects do you take on?',
    answer:
      'AI agents and automation, AI chatbots, RAG systems, LLM applications, SaaS products, MVPs, full stack builds, and modern websites. Both greenfield builds and adding AI capabilities to existing products.',
  },
  {
    question: 'How do you charge — hourly or fixed price?',
    answer:
      'For well-defined scopes I prefer fixed-price milestones so you know the cost upfront. For evolving or ongoing work, weekly or hourly engagement works better. We agree on the model before any work starts.',
  },
  {
    question: 'Do you work with clients outside India?',
    answer:
      'Yes — most of my target clients are in the USA, UK, Canada, Australia, Europe, UAE, and Singapore. I work remotely with overlap-friendly hours and clear async communication.',
  },
  {
    question: 'How quickly can you start?',
    answer:
      'Reach out via the contact form or email and I’ll respond within 24 hours. Depending on current commitments, most projects can start within one to two weeks.',
  },
  {
    question: 'Do you sign NDAs and provide source-code ownership?',
    answer:
      'Yes to both. I’m happy to sign an NDA before discussing your idea, and you receive full ownership of all code, infrastructure, and documentation at handover.',
  },
];

export default function HireMePage() {
  return (
    <PageShell
      breadcrumbs={[
        { name: 'Home', path: '/' },
        { name: 'Hire Me', path: '/hire-me' },
      ]}
    >
      <JsonLd data={organizationSchema()} />
      <JsonLd data={faqSchema(HIRE_FAQS)} />

      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-14">
          <p className="font-code text-xs text-cyber-blue-dim tracking-widest uppercase mb-3">
            {'// RECRUITMENT CHANNEL OPEN'}
          </p>
          <h1 className="cyber-heading text-3xl md:text-4xl neon-text-pink">
            Hire an AI Agent Developer &amp; Full Stack Engineer
          </h1>
          <p className="font-code text-cyber-blue-dim text-sm max-w-2xl mx-auto mt-5 leading-relaxed">
            I&apos;m Pavan Sharma. I build AI agents, automation systems, chatbots, RAG
            pipelines, SaaS products, and MVPs for startups and businesses worldwide —
            end to end, from architecture to deployment.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-4">
            <Link href="/contact/" className="cyber-button-pink px-8 py-3 text-sm">
              ⚡ Start a Conversation
            </Link>
            <a href={`mailto:${PERSON.email}`} className="cyber-button px-8 py-3 text-sm">
              📧 Email Me Directly
            </a>
          </div>
        </header>

        {/* Why hire me */}
        <section className="mb-12">
          <h2 className="font-cyber text-lg text-cyber-blue uppercase tracking-wider mb-5">
            {'// Why Clients Choose Me'}
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {REASONS.map((r) => (
              <div key={r.title} className="cyber-glass p-5">
                <h3 className="font-cyber text-sm text-neon-pink uppercase tracking-wider mb-2">
                  {r.title}
                </h3>
                <p className="font-code text-xs text-cyber-blue-dim leading-relaxed">{r.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Services grid */}
        <section className="mb-12">
          <h2 className="font-cyber text-lg text-cyber-blue uppercase tracking-wider mb-5">
            {'// What I Can Build for You'}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {services.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}/`}
                className="cyber-glass p-4 block group hover:shadow-neon transition-shadow"
              >
                <p className="font-cyber text-xs text-cyber-blue group-hover:text-neon-pink transition-colors uppercase tracking-wider">
                  {s.icon} {s.shortTitle}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* Process */}
        <section className="mb-12">
          <h2 className="font-cyber text-lg text-cyber-blue uppercase tracking-wider mb-5">
            {'// How We Work Together'}
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {PROCESS.map((p) => (
              <div key={p.step} className="cyber-glass p-5 relative overflow-hidden">
                <span className="font-cyber text-3xl text-cyber-blue/15 absolute top-2 right-3">
                  {p.step}
                </span>
                <h3 className="font-cyber text-sm text-cyber-green uppercase tracking-wider mb-2">
                  {p.title}
                </h3>
                <p className="font-code text-xs text-cyber-blue-dim leading-relaxed">{p.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-12">
          <h2 className="font-cyber text-lg text-cyber-blue uppercase tracking-wider mb-5">
            {'// Hiring FAQ'}
          </h2>
          <div className="space-y-4">
            {HIRE_FAQS.map((faq) => (
              <details key={faq.question} className="cyber-glass p-5">
                <summary className="font-cyber text-sm text-cyber-blue cursor-pointer list-none flex items-start gap-2">
                  <span className="text-neon-pink">?</span>
                  {faq.question}
                </summary>
                <p className="font-code text-sm text-cyber-blue-dim leading-relaxed mt-3 pl-5">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* Proof links */}
        <section className="mb-12">
          <h2 className="font-cyber text-lg text-cyber-blue uppercase tracking-wider mb-5">
            {'// Verify Before You Trust'}
          </h2>
          <div className="flex flex-wrap gap-3">
            <Link href="/case-studies/" className="cyber-button text-xs px-4 py-2">
              📁 Case Studies
            </Link>
            <Link href="/blog/" className="cyber-button text-xs px-4 py-2">
              📡 Technical Blog
            </Link>
            <a href={PERSON.github} target="_blank" rel="noopener noreferrer" className="cyber-button text-xs px-4 py-2">
              ⟐ GitHub
            </a>
            <a href={PERSON.linkedin} target="_blank" rel="noopener noreferrer" className="cyber-button text-xs px-4 py-2">
              ◈ LinkedIn
            </a>
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="cyber-button text-xs px-4 py-2">
              📄 Resume
            </a>
          </div>
        </section>

        {/* Final CTA */}
        <div className="cyber-glass-strong p-8 text-center">
          <h2 className="font-cyber text-lg neon-text uppercase tracking-wider mb-3">
            Ready When You Are
          </h2>
          <p className="font-code text-sm text-cyber-blue-dim mb-6 max-w-xl mx-auto">
            Describe your project in two sentences — I&apos;ll reply within 24 hours with
            how I&apos;d approach it.
          </p>
          <Link href="/contact/" className="cyber-button-pink inline-block px-10 py-3 text-sm">
            ⚡ Open Secure Channel
          </Link>
        </div>
      </div>
    </PageShell>
  );
}
