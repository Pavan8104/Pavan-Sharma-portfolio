import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageShell from '../../../src/components/pages/PageShell';
import { industries, getIndustry } from '../../../src/data/industries';
import { getService } from '../../../src/data/services';
import { getCaseStudy } from '../../../src/data/caseStudies';
import { blogPosts } from '../../../src/data/blog';
import { buildMetadata } from '../../../src/lib/seo';
import { JsonLd, serviceSchema, faqSchema } from '../../../src/lib/schema';

export function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) return {};
  return buildMetadata({
    title: industry.metaTitle,
    description: industry.metaDescription,
    path: `/industries/${industry.slug}`,
  });
}

export default async function IndustryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) notFound();

  const relatedSvcs = industry.relatedServiceSlugs
    .map((s) => getService(s))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));
  const relatedCases = industry.relatedCaseStudySlugs
    .map((s) => getCaseStudy(s))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));
  const relatedPosts = industry.relatedBlogSlugs
    .map((s) => blogPosts.find((p) => p.slug === s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <PageShell
      breadcrumbs={[
        { name: 'Home', path: '/' },
        { name: 'Solutions', path: '/industries' },
        { name: industry.shortTitle, path: `/industries/${industry.slug}` },
      ]}
    >
      <JsonLd
        data={serviceSchema({
          name: industry.h1,
          description: industry.metaDescription,
          path: `/industries/${industry.slug}`,
          serviceType: industry.serviceType,
        })}
      />
      <JsonLd data={faqSchema(industry.faqs)} />

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="text-center mb-14">
          <p className="font-code text-xs text-cyber-blue-dim tracking-widest uppercase mb-3">
            {'// SOLUTION: '}{industry.serviceType.toUpperCase()}
          </p>
          <h1 className="cyber-heading text-3xl md:text-4xl neon-text">
            {industry.icon} {industry.h1}
          </h1>
          <p className="font-code text-cyber-blue-dim text-sm max-w-2xl mx-auto mt-5 leading-relaxed">
            {industry.intro}
          </p>
          <div className="mt-7">
            <Link href="/contact/" className="cyber-button-pink inline-block px-8 py-3 text-sm">
              ⚡ Get a Fixed Quote
            </Link>
          </div>
        </header>

        {/* Pain points */}
        <section className="mb-10">
          <h2 className="font-cyber text-lg text-cyber-blue uppercase tracking-wider mb-4">
            {'// Sound Familiar?'}
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {industry.painPoints.map((p) => (
              <div key={p.title} className="cyber-glass p-5">
                <h3 className="font-cyber text-sm text-neon-pink uppercase tracking-wider mb-2">
                  {p.title}
                </h3>
                <p className="font-code text-xs text-cyber-blue-dim leading-relaxed">{p.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Approach */}
        <section className="cyber-glass p-6 mb-10">
          <h2 className="font-cyber text-lg text-cyber-green uppercase tracking-wider mb-3">
            ✓ How I Solve It
          </h2>
          <p className="font-code text-sm text-cyber-blue-dim leading-relaxed">
            {industry.approach}
          </p>
        </section>

        {/* Related services */}
        {relatedSvcs.length > 0 && (
          <section className="mb-10">
            <h2 className="font-cyber text-lg text-cyber-blue uppercase tracking-wider mb-4">
              {'// Services Behind This Solution'}
            </h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {relatedSvcs.map((s) => (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}/`}
                  className="cyber-glass p-4 block group hover:shadow-neon transition-shadow"
                >
                  <p className="font-cyber text-xs text-cyber-blue group-hover:text-neon-pink transition-colors uppercase tracking-wider">
                    {s.icon} {s.shortTitle}
                  </p>
                  <p className="font-code text-[10px] text-cyber-blue-dim mt-2 line-clamp-2">
                    {s.serviceType}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Proof: case studies */}
        {relatedCases.length > 0 && (
          <section className="mb-10">
            <h2 className="font-cyber text-lg text-cyber-blue uppercase tracking-wider mb-4">
              {'// Proof of Work'}
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {relatedCases.map((c) => (
                <Link
                  key={c.slug}
                  href={`/case-studies/${c.slug}/`}
                  className="cyber-glass p-4 block group hover:shadow-neon transition-shadow"
                >
                  <p className="font-cyber text-sm text-cyber-blue group-hover:text-neon-pink transition-colors line-clamp-2">
                    {c.title}
                  </p>
                  <p className="font-code text-xs text-cyber-blue-dim mt-2 line-clamp-2">
                    {c.summary}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* FAQ */}
        <section className="mb-10">
          <h2 className="font-cyber text-lg text-cyber-blue uppercase tracking-wider mb-4">
            {'// Frequently Asked Questions'}
          </h2>
          <div className="space-y-4">
            {industry.faqs.map((faq) => (
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

        {/* Related reading */}
        {relatedPosts.length > 0 && (
          <section className="mb-12">
            <h2 className="font-cyber text-lg text-cyber-blue uppercase tracking-wider mb-4">
              {'// Further Reading'}
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

        {/* Final CTA */}
        <div className="cyber-glass-strong p-8 text-center">
          <h2 className="font-cyber text-lg neon-text-pink uppercase tracking-wider mb-3">
            Let&apos;s Scope It
          </h2>
          <p className="font-code text-sm text-cyber-blue-dim mb-6 max-w-xl mx-auto">
            Describe your goal in two sentences — I&apos;ll reply within 24 hours with a
            concrete approach, timeline, and fixed quote.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact/" className="cyber-button-pink px-8 py-3 text-sm">
              ⚡ Get in Touch
            </Link>
            <Link href="/hire-me/" className="cyber-button px-8 py-3 text-sm">
              📋 How I Work
            </Link>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
