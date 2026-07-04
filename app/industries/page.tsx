import type { Metadata } from 'next';
import Link from 'next/link';
import PageShell from '../../src/components/pages/PageShell';
import { industries } from '../../src/data/industries';
import { buildMetadata } from '../../src/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Solutions — MVPs, Business Websites, AI Automation & SaaS',
  description:
    'Development solutions by business need: startup MVP development, business website development, AI automation solutions, and SaaS product development for founders and companies worldwide.',
  path: '/industries',
});

export default function IndustriesPage() {
  return (
    <PageShell
      breadcrumbs={[
        { name: 'Home', path: '/' },
        { name: 'Solutions', path: '/industries' },
      ]}
    >
      <div className="text-center mb-16">
        <p className="font-code text-xs text-cyber-blue-dim tracking-widest uppercase mb-3">
          {'// MISSION PARAMETERS'}
        </p>
        <h1 className="cyber-heading text-3xl md:text-5xl neon-text">
          Solutions by Business Need
        </h1>
        <p className="font-code text-cyber-blue-dim text-sm max-w-2xl mx-auto mt-4">
          Start from your goal, not from a tech menu — whether you&apos;re launching a
          startup MVP, need a business website, want to automate operations, or are
          building a SaaS product.
        </p>
      </div>

      <div className="max-w-4xl mx-auto grid sm:grid-cols-2 gap-6">
        {industries.map((ind) => (
          <Link
            key={ind.slug}
            href={`/industries/${ind.slug}/`}
            className="cyber-glass p-6 block group relative overflow-hidden hover:shadow-neon transition-shadow"
          >
            <div className="text-2xl mb-3">{ind.icon}</div>
            <h2 className="font-cyber text-sm text-cyber-blue uppercase tracking-wider mb-2 group-hover:text-neon-pink transition-colors">
              {ind.shortTitle}
            </h2>
            <p className="font-code text-xs text-cyber-blue-dim line-clamp-3 mb-4">
              {ind.intro}
            </p>
            <span className="font-code text-[10px] text-neon-pink tracking-widest uppercase">
              {'> View solution'}
            </span>
          </Link>
        ))}
      </div>

      <div className="text-center mt-16">
        <Link href="/contact/" className="cyber-button-pink inline-block px-8 py-3 text-sm">
          ⚡ Discuss Your Project
        </Link>
      </div>
    </PageShell>
  );
}
