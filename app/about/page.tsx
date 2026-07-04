import type { Metadata } from 'next';
import Link from 'next/link';
import PageShell from '../../src/components/pages/PageShell';
import { buildMetadata, PERSON } from '../../src/lib/seo';
import { experiences } from '../../src/data/experience';
import { skills } from '../../src/data/skills';
import { services } from '../../src/data/services';

export const metadata: Metadata = buildMetadata({
  title: 'About — AI Agent Developer & Full Stack Engineer',
  description:
    'Pavan Sharma is an AI Agent Developer and Full Stack Engineer from India — Computer Science undergraduate at Chandigarh University, AI agent developer at micro1, AWS certified, published ML researcher, and builder of Sentinel AI.',
  path: '/about',
});

export default function AboutPage() {
  return (
    <PageShell
      breadcrumbs={[
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
      ]}
    >
      <div className="max-w-3xl mx-auto">
        <header className="text-center mb-14">
          <p className="font-code text-xs text-cyber-blue-dim tracking-widest uppercase mb-3">
            {'// IDENTITY FILE DECRYPTED'}
          </p>
          <h1 className="cyber-heading text-3xl md:text-4xl neon-text">About Pavan Sharma</h1>
          <p className="font-code text-cyber-blue-dim text-sm max-w-2xl mx-auto mt-4">
            AI Agent Developer &amp; Full Stack Engineer — I build intelligent systems
            that turn data into decisions.
          </p>
        </header>

        {/* Bio */}
        <section className="cyber-glass p-6 md:p-8 mb-8">
          <h2 className="font-cyber text-lg text-cyber-blue uppercase tracking-wider mb-4">
            {'// Who I Am'}
          </h2>
          <div className="space-y-4 font-code text-sm text-cyber-blue-dim leading-relaxed">
            <p>
              I&apos;m Pavan Sharma (also known as Pavan Kumar Sharma), a Computer Science
              undergraduate at Chandigarh University, India, working professionally in AI
              engineering. At <strong className="text-cyber-blue">micro1</strong> I develop
              AI agents used in real-world deployments; at{' '}
              <strong className="text-cyber-blue">Outlier</strong> I work as a Coding Expert
              evaluating and improving AI models; and I&apos;m a Forward Learner with{' '}
              <strong className="text-cyber-blue">McKinsey &amp; Company</strong>&apos;s
              program, building Gen&nbsp;AI and structured problem-solving skills.
            </p>
            <p>
              My specialty is the intersection of AI and solid engineering: LLM systems,
              RAG pipelines, agentic workflows (LangChain, LangGraph, n8n), and the Python
              backends (FastAPI, PostgreSQL, Docker, AWS) that make them production-ready.
              I built <strong className="text-cyber-blue">Sentinel AI</strong>, an LLM
              red-teaming framework, and published research on Fake News Detection
              (MMCITRE 2024).
            </p>
            <p>
              I&apos;m AWS Solution Architect Associate certified, hold 54+ LinkedIn
              Learning certifications, and placed in the top 10 teams at the CSI eSuraksha
              Hackathon. I work remotely with startups and businesses in the USA, UK,
              Canada, Australia, Europe, UAE, and worldwide — building AI agents,
              automation systems, SaaS products, MVPs, and modern web applications.
            </p>
          </div>
        </section>

        {/* Core skills */}
        <section className="mb-8">
          <h2 className="font-cyber text-lg text-cyber-blue uppercase tracking-wider mb-4">
            {'// Core Skills'}
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {skills.map((skill) => (
              <div key={skill.name} className="cyber-glass p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-code text-sm text-cyber-blue">
                    {skill.icon} {skill.name}
                  </span>
                  <span className="font-code text-xs text-neon-pink">{skill.level}%</span>
                </div>
                <div className="w-full bg-cyber-dark rounded-full h-1 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-cyber-blue to-neon-pink"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Experience timeline */}
        <section className="mb-8">
          <h2 className="font-cyber text-lg text-cyber-blue uppercase tracking-wider mb-4">
            {'// Experience'}
          </h2>
          <div className="space-y-3">
            {experiences.map((exp) => (
              <div key={exp.id} className="cyber-glass p-4">
                <div className="flex items-baseline justify-between flex-wrap gap-2">
                  <h3 className="font-cyber text-sm text-cyber-blue">
                    {exp.role} — <span className="text-neon-pink">{exp.company}</span>
                  </h3>
                  <span className="font-code text-[10px] text-cyber-blue-dim uppercase">
                    {exp.period}
                  </span>
                </div>
                <p className="font-code text-xs text-cyber-blue-dim mt-2">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* What I do → services */}
        <section className="mb-12">
          <h2 className="font-cyber text-lg text-cyber-blue uppercase tracking-wider mb-4">
            {'// What I Build for Clients'}
          </h2>
          <div className="flex flex-wrap gap-3">
            {services.map((s) => (
              <Link key={s.slug} href={`/services/${s.slug}/`} className="cyber-button text-xs px-4 py-2">
                {s.icon} {s.shortTitle}
              </Link>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="cyber-glass-strong p-8 text-center">
          <h2 className="font-cyber text-lg neon-text-pink uppercase tracking-wider mb-3">
            Let&apos;s Build Together
          </h2>
          <p className="font-code text-sm text-cyber-blue-dim mb-6">
            Email me at{' '}
            <a href={`mailto:${PERSON.email}`} className="text-cyber-blue hover:text-neon-pink transition-colors">
              {PERSON.email}
            </a>{' '}
            or use the contact form.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact/" className="cyber-button-pink px-8 py-3 text-sm">
              ⚡ Contact Me
            </Link>
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="cyber-button px-8 py-3 text-sm">
              📄 Download Resume
            </a>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
