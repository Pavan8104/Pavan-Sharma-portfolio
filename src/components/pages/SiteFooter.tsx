import Link from 'next/link';
import { services } from '../../data/services';
import { PERSON } from '../../lib/seo';

const exploreLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about/' },
  { label: 'Services', href: '/services/' },
  { label: 'Solutions', href: '/industries/' },
  { label: 'Startup MVP Development', href: '/industries/startup-mvp-development/' },
  { label: 'Business Website Development', href: '/industries/business-website-development/' },
  { label: 'AI Automation Solutions', href: '/industries/ai-automation-solutions/' },
  { label: 'SaaS for Founders', href: '/industries/saas-development/' },
  { label: 'Case Studies', href: '/case-studies/' },
  { label: 'Blog', href: '/blog/' },
  { label: 'Hire Me', href: '/hire-me/' },
  { label: 'Contact', href: '/contact/' },
];

export default function SiteFooter() {
  return (
    <footer className="relative z-10 border-t border-cyan-900/30 bg-cyber-black/90 mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-10">
          {/* Identity */}
          <div>
            <p className="font-cyber text-lg text-cyber-blue tracking-wider mb-3">
              <span className="text-neon-pink">{'<'}</span>P/S<span className="text-neon-pink">{'/>'}</span>
            </p>
            <p className="font-code text-xs text-cyber-blue-dim leading-relaxed mb-4">
              Pavan Sharma — AI Agent Developer &amp; Full Stack Engineer helping global
              businesses build AI agents, automation systems, SaaS products, and modern
              web applications.
            </p>
            <div className="flex flex-col gap-1.5 font-code text-xs">
              <a href={`mailto:${PERSON.email}`} className="text-cyber-blue-dim hover:text-cyber-blue transition-colors">
                📧 {PERSON.email}
              </a>
              <a href={PERSON.github} target="_blank" rel="noopener noreferrer" className="text-cyber-blue-dim hover:text-cyber-blue transition-colors">
                ⟐ GitHub
              </a>
              <a href={PERSON.linkedin} target="_blank" rel="noopener noreferrer" className="text-cyber-blue-dim hover:text-cyber-blue transition-colors">
                ◈ LinkedIn
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <p className="font-code text-xs text-neon-pink tracking-widest uppercase mb-3">{'// Services'}</p>
            <ul className="space-y-1.5">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}/`}
                    className="font-code text-xs text-cyber-blue-dim hover:text-cyber-blue transition-colors"
                  >
                    <span className="text-cyber-blue-dim mr-1">{'>'}</span>
                    {s.shortTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Explore */}
          <div>
            <p className="font-code text-xs text-neon-pink tracking-widest uppercase mb-3">{'// Explore'}</p>
            <ul className="space-y-1.5">
              {exploreLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="font-code text-xs text-cyber-blue-dim hover:text-cyber-blue transition-colors"
                  >
                    <span className="text-cyber-blue-dim mr-1">{'>'}</span>
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-code text-xs text-cyber-blue-dim hover:text-cyber-blue transition-colors"
                >
                  <span className="text-cyber-blue-dim mr-1">{'>'}</span>
                  Resume (PDF)
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-cyan-900/20 mt-10 pt-6 text-center">
          <p className="font-code text-[10px] text-cyber-blue-dim tracking-widest">
            © {new Date().getFullYear()} PAVAN SHARMA — ALL SYSTEMS OPERATIONAL
          </p>
        </div>
      </div>
    </footer>
  );
}
