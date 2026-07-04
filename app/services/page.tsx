import type { Metadata } from 'next';
import Link from 'next/link';
import PageShell from '../../src/components/pages/PageShell';
import { services } from '../../src/data/services';
import { buildMetadata } from '../../src/lib/seo';
import { JsonLd, organizationSchema } from '../../src/lib/schema';

export const metadata: Metadata = buildMetadata({
  title: 'Services — AI Agents, Automation, RAG & Full Stack Development',
  description:
    'AI and software development services by Pavan Sharma: AI agent development, AI automation, chatbots, RAG pipelines, LLM applications, full stack, web, SaaS, and MVP development for global clients.',
  path: '/services',
});

export default function ServicesPage() {
  return (
    <PageShell
      breadcrumbs={[
        { name: 'Home', path: '/' },
        { name: 'Services', path: '/services' },
      ]}
    >
      <JsonLd data={organizationSchema()} />

      <div className="text-center mb-16">
        <p className="font-code text-xs text-cyber-blue-dim tracking-widest uppercase mb-3">
          {'// AVAILABLE MODULES'}
        </p>
        <h1 className="cyber-heading text-3xl md:text-5xl neon-text">
          AI &amp; Full Stack Development Services
        </h1>
        <p className="font-code text-cyber-blue-dim text-sm max-w-2xl mx-auto mt-4">
          I help startups and businesses in the USA, UK, Canada, Australia, Europe, UAE,
          and worldwide build AI agents, automation systems, SaaS products, MVPs, and
          modern web applications — end to end.
        </p>
      </div>

      <div className="max-w-5xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((s) => (
          <Link
            key={s.slug}
            href={`/services/${s.slug}/`}
            className="cyber-glass p-6 block group relative overflow-hidden hover:shadow-neon transition-shadow"
          >
            <div className="text-2xl mb-3">{s.icon}</div>
            <h2 className="font-cyber text-sm text-cyber-blue uppercase tracking-wider mb-2 group-hover:text-neon-pink transition-colors">
              {s.shortTitle}
            </h2>
            <p className="font-code text-xs text-cyber-blue-dim line-clamp-3 mb-4">
              {s.intro}
            </p>
            <span className="font-code text-[10px] text-neon-pink tracking-widest uppercase">
              {'> Open module'}
            </span>
            <div className="absolute top-0 right-0 w-12 h-12 pointer-events-none">
              <div className="absolute top-2 right-2 w-4 h-[1px] bg-cyber-blue opacity-50" />
              <div className="absolute top-2 right-2 w-[1px] h-4 bg-cyber-blue opacity-50" />
            </div>
          </Link>
        ))}
      </div>

      <div className="text-center mt-16">
        <p className="font-code text-sm text-cyber-blue-dim mb-4">
          Not sure which service fits? Describe your problem and I&apos;ll tell you what it takes.
        </p>
        <Link href="/contact/" className="cyber-button-pink inline-block px-8 py-3 text-sm">
          ⚡ Start a Project
        </Link>
      </div>
    </PageShell>
  );
}
