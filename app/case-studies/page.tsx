import type { Metadata } from 'next';
import Link from 'next/link';
import PageShell from '../../src/components/pages/PageShell';
import { caseStudies } from '../../src/data/caseStudies';
import { buildMetadata } from '../../src/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Case Studies — AI, Automation & Full Stack Projects',
  description:
    'Deep dives into projects by Pavan Sharma: LLM red teaming with Sentinel AI, the HireOnix AI platform, CloudOps DevOps tooling, data analytics systems, and more.',
  path: '/case-studies',
});

export default function CaseStudiesPage() {
  return (
    <PageShell
      breadcrumbs={[
        { name: 'Home', path: '/' },
        { name: 'Case Studies', path: '/case-studies' },
      ]}
    >
      <div className="text-center mb-16">
        <p className="font-code text-xs text-cyber-blue-dim tracking-widest uppercase mb-3">
          {'// MISSION LOGS'}
        </p>
        <h1 className="cyber-heading text-3xl md:text-5xl neon-text-purple">Case Studies</h1>
        <p className="font-code text-cyber-blue-dim text-sm max-w-2xl mx-auto mt-4">
          How I approach real builds: the problem, the engineering decisions, and what
          shipped. Each study links to live code or deployments you can inspect.
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-6">
        {caseStudies.map((cs) => (
          <Link
            key={cs.slug}
            href={`/case-studies/${cs.slug}/`}
            className="cyber-glass p-6 block group relative overflow-hidden hover:shadow-neon transition-shadow"
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-cyber-purple animate-pulse" />
              <span className="font-code text-[10px] text-cyber-purple uppercase tracking-widest">
                Mission Log
              </span>
            </div>
            <h2 className="font-cyber text-base md:text-lg text-cyber-blue uppercase tracking-wider group-hover:text-neon-pink transition-colors mb-2">
              {cs.title}
            </h2>
            <p className="font-code text-xs text-cyber-blue-dim mb-4">{cs.summary}</p>
            <div className="flex flex-wrap gap-1.5">
              {cs.techStack.slice(0, 5).map((tech) => (
                <span key={tech} className="px-2 py-0.5 text-[10px] font-code bg-cyber-blue/10 text-cyber-blue border border-cyber-blue/20 rounded">
                  {tech}
                </span>
              ))}
            </div>
            <span className="font-code text-[10px] text-neon-pink tracking-widest uppercase mt-4 inline-block">
              {'> Read full log'}
            </span>
          </Link>
        ))}
      </div>

      <div className="text-center mt-16">
        <Link href="/contact/" className="cyber-button-pink inline-block px-8 py-3 text-sm">
          ⚡ Build Something With Me
        </Link>
      </div>
    </PageShell>
  );
}
