import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageShell from '../../../src/components/pages/PageShell';
import { services, getService } from '../../../src/data/services';
import { projects } from '../../../src/data/projects';
import { blogPosts } from '../../../src/data/blog';
import { buildMetadata } from '../../../src/lib/seo';
import { JsonLd, serviceSchema, faqSchema } from '../../../src/lib/schema';

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return buildMetadata({
    title: service.metaTitle,
    description: service.metaDescription,
    path: `/services/${service.slug}`,
  });
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const relatedProjects = service.relatedProjectTitles
    .map((title) => projects.find((p) => p.title.includes(title) || title.includes(p.title)))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));
  const relatedPosts = service.relatedBlogSlugs
    .map((s) => blogPosts.find((p) => p.slug === s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));
  const relatedSvcs = service.relatedServiceSlugs
    .map((s) => getService(s))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  return (
    <PageShell
      breadcrumbs={[
        { name: 'Home', path: '/' },
        { name: 'Services', path: '/services' },
        { name: service.shortTitle, path: `/services/${service.slug}` },
      ]}
    >
      <JsonLd
        data={serviceSchema({
          name: service.title,
          description: service.metaDescription,
          path: `/services/${service.slug}`,
          serviceType: service.serviceType,
        })}
      />
      <JsonLd data={faqSchema(service.faqs)} />

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="text-center mb-14">
          <p className="font-code text-xs text-cyber-blue-dim tracking-widest uppercase mb-3">
            {'// SERVICE MODULE: '}{service.serviceType.toUpperCase()}
          </p>
          <h1 className="cyber-heading text-3xl md:text-4xl neon-text">
            {service.icon} {service.title}
          </h1>
          <p className="font-code text-cyber-blue-dim text-sm max-w-2xl mx-auto mt-5 leading-relaxed">
            {service.intro}
          </p>
          <div className="mt-7">
            <Link href="/contact/" className="cyber-button-pink inline-block px-8 py-3 text-sm">
              ⚡ Discuss Your Project
            </Link>
          </div>
        </header>

        {/* Problem / Solution */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <section className="cyber-glass p-6">
            <h2 className="font-cyber text-base text-cyber-red uppercase tracking-wider mb-3">
              ⚠ The Problem
            </h2>
            <p className="font-code text-sm text-cyber-blue-dim leading-relaxed">
              {service.problem}
            </p>
          </section>
          <section className="cyber-glass p-6">
            <h2 className="font-cyber text-base text-cyber-green uppercase tracking-wider mb-3">
              ✓ The Solution
            </h2>
            <p className="font-code text-sm text-cyber-blue-dim leading-relaxed">
              {service.solution}
            </p>
          </section>
        </div>

        {/* Tech stack */}
        <section className="mb-10">
          <h2 className="font-cyber text-lg text-cyber-blue uppercase tracking-wider mb-4">
            {'// Technologies Used'}
          </h2>
          <div className="flex flex-wrap gap-2">
            {service.techStack.map((tech) => (
              <span key={tech} className="neon-badge text-xs">
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* Deliverables */}
        <section className="cyber-glass p-6 mb-10">
          <h2 className="font-cyber text-lg text-cyber-blue uppercase tracking-wider mb-4">
            {'// What You Get'}
          </h2>
          <ul className="space-y-2">
            {service.deliverables.map((d) => (
              <li key={d} className="font-code text-sm text-cyber-blue-dim flex items-start gap-2">
                <span className="text-neon-pink mt-0.5">▸</span>
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Related projects */}
        {relatedProjects.length > 0 && (
          <section className="mb-10">
            <h2 className="font-cyber text-lg text-cyber-blue uppercase tracking-wider mb-4">
              {'// Related Work'}
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {relatedProjects.map((p) => (
                <div key={p.id} className="cyber-glass p-4">
                  <p className="font-cyber text-sm text-cyber-blue">{p.title}</p>
                  <p className="font-code text-xs text-cyber-blue-dim mt-2">{p.description}</p>
                  <div className="flex gap-3 mt-3 font-code text-[10px]">
                    {p.github && (
                      <a href={p.github} target="_blank" rel="noopener noreferrer" className="text-neon-pink hover:text-cyber-blue transition-colors">
                        ⟐ GitHub
                      </a>
                    )}
                    {p.live && (
                      <a href={p.live} target="_blank" rel="noopener noreferrer" className="text-cyber-green hover:text-cyber-blue transition-colors">
                        ▶ Live
                      </a>
                    )}
                    <Link href="/case-studies/" className="text-cyber-blue-dim hover:text-cyber-blue transition-colors">
                      Case studies →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* FAQ — visible text matching the FAQPage schema */}
        <section className="mb-10">
          <h2 className="font-cyber text-lg text-cyber-blue uppercase tracking-wider mb-4">
            {'// Frequently Asked Questions'}
          </h2>
          <div className="space-y-4">
            {service.faqs.map((faq) => (
              <details key={faq.question} className="cyber-glass p-5 group">
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

        {/* Related reading */}
        {relatedPosts.length > 0 && (
          <section className="mb-10">
            <h2 className="font-cyber text-lg text-cyber-blue uppercase tracking-wider mb-4">
              {'// From the Blog'}
            </h2>
            <ul className="space-y-2">
              {relatedPosts.map((p) => (
                <li key={p.slug}>
                  <Link href={`/blog/${p.slug}/`} className="font-code text-sm text-cyber-blue-dim hover:text-cyber-blue transition-colors">
                    <span className="text-neon-pink mr-2">▸</span>
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Related services */}
        {relatedSvcs.length > 0 && (
          <section className="mb-12">
            <h2 className="font-cyber text-lg text-cyber-blue uppercase tracking-wider mb-4">
              {'// Related Services'}
            </h2>
            <div className="flex flex-wrap gap-3">
              {relatedSvcs.map((s) => (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}/`}
                  className="cyber-button text-xs px-4 py-2"
                >
                  {s.icon} {s.shortTitle}
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Final CTA */}
        <div className="cyber-glass-strong p-8 text-center">
          <h2 className="font-cyber text-lg neon-text-pink uppercase tracking-wider mb-3">
            Ready to build?
          </h2>
          <p className="font-code text-sm text-cyber-blue-dim mb-6 max-w-xl mx-auto">
            Tell me about your project and I&apos;ll reply with a concrete plan, timeline,
            and quote — usually within 24 hours.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact/" className="cyber-button-pink px-8 py-3 text-sm">
              ⚡ Get in Touch
            </Link>
            <Link href="/hire-me/" className="cyber-button px-8 py-3 text-sm">
              📋 Why Hire Me
            </Link>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
