import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageShell from '../../../src/components/pages/PageShell';
import { caseStudies, getCaseStudy } from '../../../src/data/caseStudies';
import { getService } from '../../../src/data/services';
import { blogPosts } from '../../../src/data/blog';
import { buildMetadata } from '../../../src/lib/seo';
import { JsonLd, articleSchema } from '../../../src/lib/schema';

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) return {};
  return buildMetadata({
    title: cs.metaTitle,
    description: cs.metaDescription,
    path: `/case-studies/${cs.slug}`,
    type: 'article',
  });
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) notFound();

  const relatedSvcs = cs.relatedServiceSlugs
    .map((s) => getService(s))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));
  const relatedPosts = cs.relatedBlogSlugs
    .map((s) => blogPosts.find((p) => p.slug === s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <PageShell
      breadcrumbs={[
        { name: 'Home', path: '/' },
        { name: 'Case Studies', path: '/case-studies' },
        { name: cs.title, path: `/case-studies/${cs.slug}` },
      ]}
    >
      <JsonLd
        data={articleSchema({
          title: cs.title,
          description: cs.metaDescription,
          path: `/case-studies/${cs.slug}`,
          datePublished: '2026-07-04',
        })}
      />

      <article className="max-w-3xl mx-auto">
        <header className="cyber-glass-strong p-6 md:p-8 mb-8">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 rounded-full bg-cyber-purple animate-pulse" />
            <span className="font-code text-[10px] text-cyber-purple uppercase tracking-widest">
              Mission Log — Case Study
            </span>
          </div>
          <h1 className="font-cyber text-xl md:text-2xl text-cyber-blue uppercase tracking-wider mb-3">
            {cs.title}
          </h1>
          <p className="font-code text-sm text-cyber-blue-dim">{cs.summary}</p>
          <div className="flex flex-wrap gap-1.5 mt-4">
            {cs.techStack.map((tech) => (
              <span key={tech} className="neon-badge text-[10px]">
                {tech}
              </span>
            ))}
          </div>
        </header>

        <section className="cyber-glass p-6 mb-6">
          <h2 className="font-cyber text-base text-cyber-red uppercase tracking-wider mb-3">
            ⚠ The Challenge
          </h2>
          <p className="font-code text-sm text-cyber-blue-dim leading-relaxed">{cs.challenge}</p>
        </section>

        <section className="cyber-glass p-6 mb-6">
          <h2 className="font-cyber text-base text-cyber-blue uppercase tracking-wider mb-3">
            ⚙ The Approach
          </h2>
          <p className="font-code text-sm text-cyber-blue-dim leading-relaxed">{cs.approach}</p>
        </section>

        <section className="cyber-glass p-6 mb-8">
          <h2 className="font-cyber text-base text-cyber-green uppercase tracking-wider mb-3">
            ✓ The Outcome
          </h2>
          <p className="font-code text-sm text-cyber-blue-dim leading-relaxed">{cs.outcome}</p>
        </section>

        {cs.links.length > 0 && (
          <section className="mb-10">
            <h2 className="font-cyber text-base text-cyber-blue uppercase tracking-wider mb-4">
              {'// Inspect the Work'}
            </h2>
            <div className="flex flex-wrap gap-3">
              {cs.links.map((l) => (
                <a
                  key={l.url}
                  href={l.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cyber-button text-xs px-5 py-2.5"
                >
                  ⟐ {l.label}
                </a>
              ))}
            </div>
          </section>
        )}

        {relatedSvcs.length > 0 && (
          <section className="mb-10">
            <h2 className="font-cyber text-base text-cyber-blue uppercase tracking-wider mb-4">
              {'// Need Something Similar?'}
            </h2>
            <div className="flex flex-wrap gap-3">
              {relatedSvcs.map((s) => (
                <Link key={s.slug} href={`/services/${s.slug}/`} className="cyber-button text-xs px-4 py-2">
                  {s.icon} {s.shortTitle}
                </Link>
              ))}
            </div>
          </section>
        )}

        {relatedPosts.length > 0 && (
          <section className="mb-10">
            <h2 className="font-cyber text-base text-cyber-blue uppercase tracking-wider mb-4">
              {'// Deep-Dive Reading'}
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

        <div className="mt-12 text-center">
          <Link href="/contact/" className="cyber-button-pink inline-block px-8 py-3 text-sm">
            ⚡ Start Your Project
          </Link>
          <p className="mt-4">
            <Link href="/case-studies/" className="font-code text-xs text-cyber-blue-dim hover:text-cyber-blue transition-colors">
              ← All mission logs
            </Link>
          </p>
        </div>
      </article>
    </PageShell>
  );
}
