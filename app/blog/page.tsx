import type { Metadata } from 'next';
import PageShell from '../../src/components/pages/PageShell';
import BlogIndexGrid from '../../src/components/Blog/BlogIndexGrid';
import { buildMetadata } from '../../src/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Blog — AI Engineering, LLMs, RAG & Full Stack Development',
  description:
    'Articles by Pavan Sharma on LLM red teaming, production RAG pipelines, agentic AI with LangGraph and n8n, data science workflows, and AWS architecture.',
  path: '/blog',
});

export default function BlogIndexPage() {
  return (
    <PageShell
      breadcrumbs={[
        { name: 'Home', path: '/' },
        { name: 'Blog', path: '/blog' },
      ]}
    >
      <div className="text-center mb-16">
        <p className="font-code text-xs text-cyber-blue-dim tracking-widest uppercase mb-3">
          {'// INTERCEPTED TRANSMISSIONS'}
        </p>
        <h1 className="cyber-heading text-3xl md:text-5xl neon-text-pink">Blog</h1>
        <p className="font-code text-cyber-blue-dim text-sm max-w-xl mx-auto mt-4">
          Decoded data streams from the digital underground. Thoughts on AI engineering,
          LLM systems, security, and full stack development.
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <BlogIndexGrid />
      </div>
    </PageShell>
  );
}
